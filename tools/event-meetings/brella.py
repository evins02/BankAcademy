"""Brella adapter: the only platform-specific part.

Talks to Brella's private web API with your own account. Endpoints were observed in
the web app's devtools in autumn 2026 and may change; verify them in devtools before
an event and adjust the functions below. Other apps need a module with the same five
functions (list_attendees, my_timeslots, send_request, meetings, profile).
"""
from __future__ import annotations

import json
import os
import re
import stat
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path


class AdapterError(Exception):
    pass


class AuthError(AdapterError):
    pass


class SlotUnavailable(AdapterError):
    """HTTP 422 on a request: the slot is not free for both of you."""


def load_auth_headers(path: Path) -> dict[str, str]:
    """Read headers from a curl config file (header = "k: v" or -H "k: v" lines).

    Refuses files readable by group/others: the headers are a live session.
    """
    if not path.exists():
        raise AuthError(f"{path} not found; copy access-token, client and uid headers from devtools")
    mode = stat.S_IMODE(os.stat(path).st_mode)
    if mode & 0o077:
        raise AuthError(f"{path} has mode {oct(mode)}; run: chmod 600 {path}")
    headers: dict[str, str] = {}
    pat = re.compile(r"""^\s*(?:-H|--header|header)\s*[=\s]\s*(['"])(.+?)\1\s*$""")
    for line in path.read_text().splitlines():
        m = pat.match(line)
        if not m:
            continue
        k, _, v = m.group(2).partition(":")
        if v:
            headers[k.strip().lower()] = v.strip()
    missing = {"access-token", "client", "uid"} - headers.keys()
    if missing:
        raise AuthError(f"{path} is missing headers: {', '.join(sorted(missing))}")
    return headers


class Brella:
    def __init__(self, config: dict, auth_path: Path):
        self.base = config.get("base_url", "https://api.brella.io/api").rstrip("/")
        self.slug = config["event_id"]
        self.event_numeric_id = config.get("event_numeric_id")
        self.me = config["my_attendee_id"]
        self.headers = load_auth_headers(auth_path)

    # -- HTTP ---------------------------------------------------------------
    def _req(self, method: str, path: str, params: dict | None = None, body: dict | None = None):
        url = f"{self.base}/{path.lstrip('/')}"
        if params:
            url += "?" + urllib.parse.urlencode(params)
        data = json.dumps(body).encode() if body is not None else None
        req = urllib.request.Request(url, data=data, method=method)
        for k, v in self.headers.items():
            req.add_header(k, v)
        req.add_header("Accept", "application/json")
        if data is not None:
            req.add_header("Content-Type", "application/json")
        try:
            with urllib.request.urlopen(req, timeout=30) as resp:
                raw = resp.read()
        except urllib.error.HTTPError as e:
            detail = e.read().decode(errors="replace")[:300]
            if e.code in (401, 403):
                raise AuthError(f"{e.code} on {path}: headers expired or wrong organizer; copy fresh ones") from e
            if e.code == 422:
                raise SlotUnavailable(detail) from e
            raise AdapterError(f"{method} {path} -> {e.code}: {detail}") from e
        return json.loads(raw) if raw else {}

    # -- 1. attendees -------------------------------------------------------
    def list_attendees(self, per_page: int = 100, max_pages: int = 200):
        """Yield normalised attendee dicts, with the raw record under 'raw'."""
        for page in range(1, max_pages + 1):
            doc = self._req("GET", f"events/{self.slug}/attendees", {
                "page[number]": page,
                "per_page": per_page,
                "include": "interests,intents,persona",
            })
            data = doc.get("data") or []
            index = _included_index(doc.get("included") or [])
            for item in data:
                yield normalise_attendee(item, index)
            total_pages = (doc.get("meta") or {}).get("total-pages") or (doc.get("meta") or {}).get("total_pages")
            if not data or len(data) < per_page or (total_pages and page >= int(total_pages)):
                return

    # -- 2. own timeslots ---------------------------------------------------
    def my_timeslots(self):
        """Your timeslots with ids. Used by bootstrap help; send.py uses config slots."""
        return self._req("GET", f"me/events/{self.slug}/timeslots")

    # -- 3. send a request --------------------------------------------------
    def send_request(self, user_id: str, timeslot_id: str, message: str) -> str:
        """Returns the meeting/request id. Raises SlotUnavailable on 422."""
        body = {
            "meeting": {
                "user_id": user_id,
                "event_id": self.event_numeric_id or self.slug,
                "timeslot_id": timeslot_id,
                "message": message,
            }
        }
        doc = self._req("POST", "me/meetings", body=body)
        data = doc.get("data", doc)
        mid = data.get("id") if isinstance(data, dict) else None
        if not mid:
            raise AdapterError(f"request sent but no id in response: {str(doc)[:200]}")
        return str(mid)

    # -- 4. meeting states and notifications --------------------------------
    def meetings(self):
        return self._req("GET", f"me/events/{self.slug}/meetings")

    def notifications(self):
        return self._req("GET", f"me/events/{self.slug}/notifications/history")

    # -- 5. profile (for the card screenshot) -------------------------------
    def profile(self):
        return self._req("GET", f"events/{self.slug}/attendees/{self.me}",
                         {"include": "interests,intents,persona"})


# -- JSON:API normalisation ---------------------------------------------------

def _included_index(included: list[dict]) -> dict[tuple[str, str], dict]:
    return {(i.get("type", ""), str(i.get("id", ""))): i for i in included}


def _get(attrs: dict, *keys: str) -> str:
    for k in keys:
        for variant in (k, k.replace("_", "-"), k.replace("-", "_")):
            v = attrs.get(variant)
            if v not in (None, ""):
                return str(v)
    return ""


def _related_names(item: dict, rel: str, index: dict) -> list[str]:
    r = (item.get("relationships") or {}).get(rel) or {}
    data = r.get("data")
    if data is None:
        return []
    if isinstance(data, dict):
        data = [data]
    names = []
    for ref in data:
        inc = index.get((ref.get("type", ""), str(ref.get("id", ""))))
        if inc:
            a = inc.get("attributes") or {}
            name = _get(a, "name", "title", "label")
            if name:
                names.append(name)
    return names


def normalise_attendee(item: dict, index: dict) -> dict:
    a = item.get("attributes") or {}
    name = _get(a, "full_name", "name") or " ".join(
        x for x in (_get(a, "first_name"), _get(a, "last_name")) if x)
    return {
        "id": str(item.get("id", "")),
        "user_id": _get(a, "user_id") or str(item.get("id", "")),
        "name": name,
        "title": _get(a, "title", "job_title", "position"),
        "company": _get(a, "company_name", "company", "organization"),
        "persona": _related_names(item, "persona", index),
        "interests": _related_names(item, "interests", index),
        "intents": _related_names(item, "intents", index),
        "raw": item,
    }
