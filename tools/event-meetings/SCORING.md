# Triage skill (Gate 1)

Prompt for the agent that triages `contacts.csv`. The target persona is configurable:
this version is written for early-stage investors. For customers, partners or hires,
rewrite the three dimensions and the hard rules; the pipeline stays the same.

## Task

For every row with `status=new` in `<event>/contacts.csv`, decide whether the person
goes to round 1 (request a meeting) or round 2 (parked, never contacted automatically).
Raw app data for each person is in `<event>/attendees.jsonl`.

Do not contact anyone. Do not log into LinkedIn or scrape it with the user's session.
Do not invent facts: every score needs evidence with a source.

## Sources, in this order

1. **App signals** in `attendees.jsonl`: investor type, investment stage, "investing in"
   interests, persona. "Seeking investment" means founder: category `founder`, round 2.
2. **Company register** (CH: Moneyhouse, Zefix): holdings, board seats, own investment
   vehicles, residence to confirm identity.
3. **Web research** by a cheaper sub-agent, **max 3 searches per person**: name + company
   first; name + "angel OR invest OR board" only if a signal appeared. Startup news and
   portfolio pages beat LinkedIn snippets.
4. **Prior contact**: the user's chats, mail, call notes. Prior contact sets `warm=yes`
   and changes tone and channel, not the score.
5. **Side events**: note people likely at the investor brunch or angel dinner in `notes`.

## Score, 1 to 5 each

| Column  | Weight | 5 means                                   | 1 means                              |
|---------|--------|-------------------------------------------|--------------------------------------|
| `near`  | 2      | Fresh vehicle or "looking for deals now"  | Gateway only, or raising themselves  |
| `later` | 1      | Active, plus a club or committee route    | No sign of activity                  |
| `fit`   | 1      | Our sector and region                     | Neither                              |

`score.py` computes `2*near + later + fit` and the round (10+, warm 9+). Fill only the
inputs; do not write `score` or `round` yourself.

## Columns to fill per person

- `category`: angel | family_office | vc_partner | vc_employee | bank | corporate | service | founder | other
  (an app self-label is overridden by vc_employee, bank, corporate, service, founder)
- `warm`: yes or empty
- `near`, `later`, `fit`: 1-5
- `ticket_min`: minimum ticket if found (the ticket gate parks people at 10x ours)
- `evidence`: one line
- `sources`: URLs, space separated
- `verdict`: `Name: category, score n, round 1, five-word reason`
- `language`: language for the request (en, de, fr, ...)
- for likely round-1 people only: `hook` (one personal line, no flattery, no pitch) and
  a dossier `<event>/dossiers/<id>.md`

Vendors (agencies, dev shops) and anyone on `never.txt`: `category=service`, no research.

## Dossier template (half a page)

```markdown
# <Name>, <title>, <company>
- Who: two lines
- Evidence: bullet per fact, each with a source URL
- How they can help: one or two lines
- Conversation hooks: two or three bullets
- Prior contact: none / where and when
```

## Close every report with

"Input needed:" and the open decisions, or "No input needed."
