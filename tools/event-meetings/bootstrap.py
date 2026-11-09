#!/usr/bin/env python3
"""Create an event directory with templates to fill.

    python3 bootstrap.py events/startup-days-2026
    python3 bootstrap.py events/next-event --from events/startup-days-2026

--from reuses messages.json and never.txt; only config.json has to be filled again.
"""
import argparse
import os
import shutil
from pathlib import Path

HERE = Path(__file__).resolve().parent
T = HERE / "templates"

AUTH_TEMPLATE = """\
# curl config with the auth headers of any API request in the event web app (devtools).
# Never commit, never paste into a chat. Tokens are scoped per organizer.
# header = "access-token: ..."
# header = "client: ..."
# header = "uid: ..."
"""


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("event_dir")
    ap.add_argument("--from", dest="src", help="previous event dir to copy texts and never-list from")
    a = ap.parse_args()

    d = Path(a.event_dir)
    if (d / "config.json").exists():
        raise SystemExit(f"{d}/config.json exists; not overwriting")
    (d / "dossiers").mkdir(parents=True, exist_ok=True)

    shutil.copy(T / "config.example.json", d / "config.json")
    src = Path(a.src) if a.src else None
    for name, fallback in (("messages.json", "messages.example.json"), ("never.txt", "never.example.txt")):
        s = src / name if src and (src / name).exists() else T / fallback
        shutil.copy(s, d / name)

    auth = d / "auth.curl"
    if not auth.exists():
        fd = os.open(auth, os.O_WRONLY | os.O_CREAT | os.O_EXCL, 0o600)
        with os.fdopen(fd, "w") as f:
            f.write(AUTH_TEMPLATE)

    print(f"created {d}/\n"
          f"  1. fill every FILL in {d}/config.json (slot ids per day, blocked slots)\n"
          f"  2. paste auth headers into {auth} (mode 600)\n"
          f"  3. fill {d}/messages.json and {d}/never.txt\n"
          f"  4. python3 pull.py {d}")


if __name__ == "__main__":
    main()
