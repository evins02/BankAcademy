#!/usr/bin/env python3
"""Pull attendees into contacts.csv (step 1). Safe to re-run daily.

New people get status "new"; existing rows keep everything you or the agent wrote,
only app fields (name, title, company, self_label, founder) are refreshed.
The full raw records go to attendees.jsonl for the triage agent.
"""
import argparse
import json

from brella import AdapterError, Brella
from common import Event, die, now_iso


def signals(att: dict, cfg: dict) -> tuple[str, str]:
    text = " | ".join([att["title"], *att["persona"], *att["interests"], *att["intents"]]).lower()
    founder = any(k.lower() in text for k in cfg.get("founder_keywords", []))
    label = ""
    for k in cfg.get("self_label_keywords", []):
        if k.lower() in text:
            label = k
            break
    return label, "yes" if founder else ""


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("event_dir")
    a = ap.parse_args()
    ev = Event(a.event_dir)
    cfg = ev.config

    try:
        api = Brella(cfg, ev.auth_path)
        attendees = list(api.list_attendees())
    except AdapterError as e:
        die(str(e))

    rows = ev.read_contacts()
    by_id = {r["id"]: r for r in rows}
    me = str(cfg["my_attendee_id"])
    added = 0
    with (ev.dir / "attendees.jsonl").open("w", encoding="utf-8") as raw:
        for att in attendees:
            if att["id"] == me:
                continue
            raw.write(json.dumps({k: v for k, v in att.items()}, ensure_ascii=False) + "\n")
            label, founder = signals(att, cfg)
            r = by_id.get(att["id"])
            if r is None:
                r = {"id": att["id"], "status": "new", "updated_at": now_iso()}
                rows.append(r)
                by_id[att["id"]] = r
                added += 1
            r.update({
                "user_id": att["user_id"],
                "name": att["name"],
                "title": att["title"],
                "company": att["company"],
                "self_label": label,
                "founder": founder,
            })
    ev.write_contacts(rows)
    labelled = sum(1 for r in rows if r.get("self_label"))
    untriaged = sum(1 for r in rows if r.get("status") == "new")
    print(f"{len(attendees)} attendees, {added} new, {labelled} self-labelled, {untriaged} untriaged")
    print(f"next: triage with SCORING.md, then python3 score.py {a.event_dir}")


if __name__ == "__main__":
    main()
