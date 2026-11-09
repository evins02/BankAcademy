#!/usr/bin/env python3
"""Gate 2: send meeting requests for round-1 rows you approved (go=yes).

    python3 send.py events/x            # dry run: shows what would go out
    python3 send.py events/x --send     # really sends

Sends only rows with round=1, status=planned and go=yes (or every round-1 planned row
when "automatik" is true in config.json). Refuses anyone on never.txt. Tries the
proposed slot first, then the next free slots; a 422 means the slot is not free for
both of you, so it moves on. Records the real slot and request id after every send.
"""
from __future__ import annotations

import argparse
import string

from common import ACTIVE_STATUSES, Event, die, is_never, now_iso


class RenderError(Exception):
    pass


def render(row: dict, messages: dict, cfg: dict, allow_no_hook: bool = False) -> str:
    lang = row.get("language") or cfg.get("default_language", "en")
    templates = messages.get("request", {})
    tpl = templates.get(lang) or templates.get(cfg.get("default_language", "en"))
    if not tpl:
        raise RenderError(f"no request template for language '{lang}'")
    hook = (row.get("hook") or "").strip()
    if not hook and not allow_no_hook:
        raise RenderError("no hook (one personal line from the dossier); fill 'hook' or pass --allow-no-hook")
    if hook and hook[-1] not in ".!?":
        hook += "."
    values = {
        "first_name": (row.get("name") or "").split(" ")[0],
        "hook": hook,
        "my_name": messages.get("my_name", ""),
        "my_company": messages.get("my_company", ""),
    }
    for _, field, _, _ in string.Formatter().parse(tpl):
        if field and field not in values:
            raise RenderError(f"unknown placeholder {{{field}}} in template")
    for k in ("my_name", "my_company"):
        if "{" + k + "}" in tpl and values[k] in ("", "FILL"):
            raise RenderError(f"{k} not filled in messages.json")
    return " ".join(tpl.format(**values).split())


def slot_order(proposed: str, cfg: dict, occupied: set[str]) -> list[str]:
    ids = [str(s["id"]) for s in cfg.get("slots", [])]
    blocked = {str(s) for s in cfg.get("blocked_slots", [])}
    if proposed in ids:
        i = ids.index(proposed)
        ids = ids[i:] + ids[:i]
    elif proposed:
        ids = [proposed] + ids
    return [s for s in ids if s not in blocked and s not in occupied]


def candidates(rows: list[dict], cfg: dict, never: set[str], automatik: bool):
    for r in rows:
        if r.get("round") != "1" or r.get("status") != "planned":
            continue
        if not (r.get("go") == "yes" or automatik):
            continue
        if is_never(r, never):
            print(f"REFUSED {r['name']}: on never.txt")
            continue
        yield r


def run(ev: Event, api, send: bool, automatik: bool, allow_no_hook: bool, limit: int) -> int:
    from brella import AdapterError, SlotUnavailable

    cfg = ev.config
    rows = ev.read_contacts()
    messages = ev.messages()
    never = ev.never_list()
    occupied = {r["slot"] for r in rows if r.get("status") in ACTIVE_STATUSES and r.get("slot")}
    sent = 0
    for r in candidates(rows, cfg, never, automatik):
        if sent >= limit:
            print(f"limit of {limit} sends reached; run again for the rest")
            break
        try:
            msg = render(r, messages, cfg, allow_no_hook)
        except RenderError as e:
            print(f"SKIP {r['name']}: {e}")
            continue
        order = slot_order(r.get("proposed_slot", ""), cfg, occupied)
        if not order:
            print(f"SKIP {r['name']}: no free slot left (withdraw a pending request?)")
            continue
        if not send:
            print(f"WOULD SEND {r['name']} on slot {order[0]} (fallbacks: {len(order) - 1})\n    {msg}")
            occupied.add(order[0])
            sent += 1
            continue
        for slot in order:
            try:
                rid = api.send_request(r.get("user_id") or r["id"], slot, msg)
            except SlotUnavailable:
                print(f"  slot {slot} not free for {r['name']}, trying next")
                continue
            except AdapterError as e:
                ev.write_contacts(rows)
                die(f"{r['name']}: {e}")
            r.update(status="requested", slot=slot, request_id=rid, updated_at=now_iso())
            if slot != r.get("proposed_slot"):
                r["notes"] = (r.get("notes", "") + f" [sent on {slot}, proposed {r.get('proposed_slot') or '-'}]").strip()
            occupied.add(slot)
            ev.write_contacts(rows)  # after every send, so a crash never loses a request id
            print(f"SENT {r['name']} on slot {slot} (request {rid})")
            sent += 1
            break
        else:
            print(f"SKIP {r['name']}: every free slot refused (422)")
    print(f"{'sent' if send else 'would send'}: {sent}")
    return sent


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("event_dir")
    ap.add_argument("--send", action="store_true", help="really send (default is a dry run)")
    ap.add_argument("--automatik", action="store_true", help="send round-1 rows without go=yes")
    ap.add_argument("--allow-no-hook", action="store_true")
    ap.add_argument("--limit", type=int)
    a = ap.parse_args()
    ev = Event(a.event_dir)
    automatik = a.automatik or bool(ev.config.get("automatik"))
    limit = a.limit or int(ev.config.get("max_sends_per_run", 10))
    api = None
    if a.send:
        from brella import AdapterError, Brella
        try:
            api = Brella(ev.config, ev.auth_path)
        except AdapterError as e:
            die(str(e))
    run(ev, api, a.send, automatik, a.allow_no_hook, limit)


if __name__ == "__main__":
    main()
