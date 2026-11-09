# Event meetings: minimal v1

Steps 1 and 2 of the AI-assisted event meeting workflow: pull the attendees of a
conference matchmaking app into one CSV, triage them with a written rubric, and send
meeting requests only for the rows you approved. Python 3 stdlib only, no installs.

Calendar sync, poller, tracker UI, daily report and follow-up drafting are not in v1.

## Ground rules this code enforces

- **One source of truth:** `events/<name>/contacts.csv`, one row per person.
- **Gate 1 (triage):** only `score.py` puts people into round 1 (score, self-label,
  ticket gate). Round 2 is never contacted.
- **Gate 2 (GO):** `send.py` sends only `round=1`, `status=planned`, `go=yes` rows.
  It is a dry run unless you pass `--send`. `"automatik": true` in config.json (or
  `--automatik`) drops the `go=yes` requirement for round-1 rows only.
- **never.txt:** existing investors, customers, vendors. `send.py` refuses them.
- **Never automated:** LinkedIn, chat replies, follow-ups, anything about your company.
- **Privacy:** `events/` is gitignored (attendee data, dossiers, auth headers). The
  auth file must be mode 600 or the scripts refuse it. Delete `events/<name>` after the event.

## Per event

```bash
cd tools/event-meetings
python3 bootstrap.py events/startup-days            # first event
python3 bootstrap.py events/next --from events/startup-days   # reuses texts + never.txt
```

1. **Access (10 min).** Log into the event web app, open devtools, copy the
   `access-token`, `client` and `uid` headers of any API request into
   `events/<name>/auth.curl` as `header = "access-token: ..."` lines. Tokens are scoped
   per organizer.
2. **Config (15 min).** Fill every `FILL` in `config.json`: event slug, numeric event
   id, your attendee id, slot ids, `blocked_slots` (arrival, talks, lunch, your pitch).
   Fill `my_name` / `my_company` and the master request text in `messages.json`
   (no pitch, no numbers, no flattery; `{hook}` carries the personal line).
3. **Pull** (re-run daily, the list grows until the event):
   `python3 pull.py events/<name>` writes `contacts.csv` and `attendees.jsonl`.
   Existing rows keep everything you wrote; new people get `status=new`.
4. **Triage:** have the agent follow [SCORING.md](SCORING.md) on the `new` rows, then
   `python3 score.py events/<name> -v`. Round-1 rows become `planned`.
5. **Plan:** per round-1 row set `proposed_slot` (60 min away from their own talk),
   `language` and `hook`; check the dossier; set `go=yes`.
6. **Send:** `python3 send.py events/<name>` (dry run, read the texts), then
   `python3 send.py events/<name> --send`. On a 422 it tries the next free slot and
   records the real slot and request id after every single send.
7. **LinkedIn:** by hand. Track it in the `linkedin` column.

Never cancel a pending request for age; people accept on the day itself.

## Files

| File | Purpose |
|------|---------|
| `brella.py` | Platform adapter (Brella private web API). The only part to rebuild for another app. |
| `common.py` | CSV columns, atomic CSV writes, config and never-list loading |
| `bootstrap.py` | Creates an event directory from `templates/` |
| `pull.py` | Attendees to `contacts.csv` + `attendees.jsonl`, with self-label and founder signals |
| `score.py` | Gate 1: `2*near + later + fit`, thresholds, hard rules, ticket gate, `round_override` |
| `send.py` | Gate 2: sends approved requests with slot fallback |
| `SCORING.md` | The triage prompt for the agent (swap it to target customers, partners or hires) |
| `tests/` | `python3 -m unittest discover -s tests` |

## Brella notes (autumn 2026, may change: verify in devtools)

- Attendees: `GET events/<slug>/attendees?page[number]=N&per_page=100&include=interests,intents,persona`.
- Requests: `POST me/meetings` with user id, event id, message, timeslot id. 422 = slot
  not free for both. The exact body shape in `Brella.send_request` should be checked
  against one request made in the web app before the first `--send`.
- A pending request blocks your slot; `send.py` treats `requested` and `confirmed`
  rows as occupied rather than trusting the app's is-free flag.
- `my_timeslots`, `meetings`, `notifications` and `profile` endpoints are best guesses
  for v2 (poller); confirm their paths in devtools.

## Another app

Write a module with the same five methods as `Brella` (`list_attendees`,
`my_timeslots`, `send_request`, `meetings`/`notifications`, `profile`), raising
`SlotUnavailable` when a slot is refused. If the app allows several meetings per slot,
the occupied-slot check in `send.py` is what prevents double-booking; keep it.
