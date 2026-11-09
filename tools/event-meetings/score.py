#!/usr/bin/env python3
"""Gate 1: compute score and round from the triage columns.

score = 2*near + later + fit. Round 1 from round1_min_score (10), warm contacts from
round1_min_score_warm (9). An app self-label puts someone in round 1 unless their
category is excluded (VC employee, bank, corporate scout, service provider, founder).
The ticket gate parks people whose minimum ticket is >= factor x yours.
round_override always wins. Rows without near/later/fit stay untouched.
"""
import argparse

from common import Event, is_never, now_iso


def _int(v):
    try:
        return int(str(v).strip())
    except ValueError:
        return None


def decide(r: dict, cfg: dict) -> tuple[str, str, str]:
    """Return (score, round, reason). Empty round means: not triaged yet."""
    near, later, fit = _int(r.get("near")), _int(r.get("later")), _int(r.get("fit"))
    score = ""
    if None not in (near, later, fit):
        for v in (near, later, fit):
            if not 1 <= v <= 5:
                return "", "", "near/later/fit must be 1-5"
        score = str(2 * near + later + fit)

    cat = (r.get("category") or "").strip().lower()
    excluded = {c.lower() for c in cfg.get("self_label_excluded_categories", [])}

    if r.get("founder") == "yes" and cat in ("", "founder"):
        return score, "2", "founder (seeking investment)"
    if cat in excluded:
        return score, "2", f"category {cat}"

    tmin, mine = _int(r.get("ticket_min")), _int(cfg.get("my_ticket"))
    factor = _int(cfg.get("ticket_gate_factor", 10)) or 10
    if tmin and mine and tmin >= factor * mine:
        return score, "2", f"ticket gate (min {tmin})"

    if r.get("self_label"):
        return score, "1", f"self-label '{r['self_label']}'"
    if not score:
        return "", "", "not triaged"
    threshold = cfg.get("round1_min_score_warm", 9) if r.get("warm") == "yes" else cfg.get("round1_min_score", 10)
    return score, ("1" if int(score) >= int(threshold) else "2"), f"score {score} vs {threshold}"


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("event_dir")
    ap.add_argument("-v", "--verbose", action="store_true")
    a = ap.parse_args()
    ev = Event(a.event_dir)
    rows = ev.read_contacts()
    never = ev.never_list()
    counts = {"1": 0, "2": 0, "": 0}
    for r in rows:
        if is_never(r, never):
            if r["status"] in ("new", "planned"):
                r["status"], r["round"] = "excluded", "2"
            continue
        score, rnd, why = decide(r, ev.config)
        if r.get("round_override") in ("1", "2"):
            rnd, why = r["round_override"], "override"
        if (score, rnd) != (r["score"], r["round"]):
            r["score"], r["round"], r["updated_at"] = score, rnd, now_iso()
        if rnd == "1" and r["status"] == "new":
            r["status"] = "planned"
        counts[rnd] = counts.get(rnd, 0) + 1
        if a.verbose and rnd:
            print(f"{r['name']}: round {rnd} ({why})")
    ev.write_contacts(rows)
    print(f"round 1: {counts['1']}, round 2: {counts['2']}, untriaged: {counts['']}")
    print("round 1 rows are 'planned'. Set proposed_slot, language and hook, then go=yes per row.")


if __name__ == "__main__":
    main()
