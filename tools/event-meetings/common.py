"""Shared helpers: event config, contacts.csv (the single source of truth), never-list."""
from __future__ import annotations

import csv
import json
import os
import sys
import tempfile
from datetime import datetime, timezone
from pathlib import Path

COLUMNS = [
    "id",            # attendee id in the event app
    "user_id",       # user id the app wants for meeting requests (often differs from id)
    "name",
    "title",
    "company",
    "app_url",
    "self_label",    # hard-rule signal from the app (e.g. "Angel"), filled by pull
    "founder",       # "yes" if the app profile says "seeking investment"
    "category",      # angel | family_office | vc_partner | vc_employee | bank | corporate | service | founder | other
    "warm",          # "yes" if there was prior contact
    "near",          # 1-5: can act before your near deadline
    "later",         # 1-5: can act before your later deadline
    "fit",           # 1-5: sector and region
    "ticket_min",    # minimum ticket in your currency, if known
    "score",         # 2*near + later + fit, written by score.py
    "round",         # 1 or 2, written by score.py
    "round_override",# set by you; wins over the computed round
    "verdict",       # "Name: category, score n, round 1, five-word reason"
    "evidence",      # one line of evidence
    "sources",       # source URLs, space separated
    "status",        # new | planned | requested | confirmed | declined | dead | excluded
    "go",            # "yes" = you approved the request (Gate 2)
    "language",      # template language, e.g. en, de, fr
    "hook",          # one personal hook from the dossier, used in the request
    "proposed_slot", # slot id you want
    "slot",          # slot id the request actually went out on
    "request_id",
    "linkedin",      # none | requested | connected | dm_sent (always manual)
    "notes",
    "updated_at",
]

ACTIVE_STATUSES = {"requested", "confirmed"}


def die(msg: str, code: int = 1) -> None:
    print(f"error: {msg}", file=sys.stderr)
    sys.exit(code)


def now_iso() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat()


class Event:
    """An event directory: config.json, contacts.csv, messages.json, never.txt, dossiers/."""

    def __init__(self, path: str | os.PathLike):
        self.dir = Path(path).resolve()
        cfg_path = self.dir / "config.json"
        if not cfg_path.exists():
            die(f"{cfg_path} not found; run bootstrap.py first")
        self.config = json.loads(cfg_path.read_text())
        unfilled = [k for k, v in self.config.items() if "FILL" in json.dumps(v)]
        if unfilled:
            die(f"config.json still has FILL values: {', '.join(unfilled)}")

    @property
    def contacts_path(self) -> Path:
        return self.dir / "contacts.csv"

    @property
    def auth_path(self) -> Path:
        return self.dir / self.config.get("auth_file", "auth.curl")

    def read_contacts(self) -> list[dict]:
        return read_csv(self.contacts_path)

    def write_contacts(self, rows: list[dict]) -> None:
        write_csv(self.contacts_path, rows)

    def never_list(self) -> set[str]:
        """Attendee ids or names (lowercased) that must never be requested."""
        p = self.dir / "never.txt"
        if not p.exists():
            return set()
        out = set()
        for line in p.read_text().splitlines():
            line = line.split("#", 1)[0].strip().lower()
            if line:
                out.add(line)
        return out

    def messages(self) -> dict:
        p = self.dir / "messages.json"
        if not p.exists():
            die(f"{p} not found; run bootstrap.py or copy templates/messages.example.json")
        return json.loads(p.read_text())


def is_never(row: dict, never: set[str]) -> bool:
    return row.get("id", "").lower() in never or row.get("name", "").strip().lower() in never


def read_csv(path: Path) -> list[dict]:
    if not path.exists():
        return []
    with path.open(newline="", encoding="utf-8") as f:
        rows = list(csv.DictReader(f))
    for r in rows:
        for c in COLUMNS:
            r.setdefault(c, "")
            if r[c] is None:
                r[c] = ""
    return rows


def write_csv(path: Path, rows: list[dict]) -> None:
    """Atomic write so the tracker, agent and scripts never see a half-written file."""
    extra = sorted({k for r in rows for k in r} - set(COLUMNS))
    fields = COLUMNS + extra
    fd, tmp = tempfile.mkstemp(dir=path.parent, prefix=".contacts.", suffix=".tmp")
    try:
        with os.fdopen(fd, "w", newline="", encoding="utf-8") as f:
            w = csv.DictWriter(f, fieldnames=fields)
            w.writeheader()
            for r in rows:
                w.writerow({k: r.get(k, "") for k in fields})
        os.replace(tmp, path)
    except BaseException:
        if os.path.exists(tmp):
            os.unlink(tmp)
        raise
