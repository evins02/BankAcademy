import csv
import json
import os
import shutil
import sys
import tempfile
import unittest
from pathlib import Path

HERE = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(HERE))

import brella  # noqa: E402
import score  # noqa: E402
import send  # noqa: E402
from common import COLUMNS, Event  # noqa: E402

CFG = {
    "event_id": "demo", "event_numeric_id": "1", "my_attendee_id": "999",
    "slots": [{"id": "s1"}, {"id": "s2"}, {"id": "s3"}, {"id": "s4"}],
    "blocked_slots": ["s2"], "my_ticket": 25000, "ticket_gate_factor": 10,
    "self_label_excluded_categories": ["vc_employee", "bank", "corporate", "service", "founder"],
    "round1_min_score": 10, "round1_min_score_warm": 9, "default_language": "en",
}
MSG = {"my_name": "Eva", "my_company": "X",
       "request": {"en": "Hi {first_name}, {hook} 15 minutes? {my_name}"}}


def row(**kw):
    r = {c: "" for c in COLUMNS}
    r.update(kw)
    return r


class FakeApi:
    def __init__(self, refuse=()):
        self.refuse, self.calls = set(refuse), []

    def send_request(self, user_id, slot, msg):
        self.calls.append((user_id, slot, msg))
        if slot in self.refuse:
            raise brella.SlotUnavailable("422")
        return f"m{len(self.calls)}"


class Base(unittest.TestCase):
    def setUp(self):
        self.d = Path(tempfile.mkdtemp())
        (self.d / "config.json").write_text(json.dumps(CFG))
        (self.d / "messages.json").write_text(json.dumps(MSG))
        self.ev = Event(self.d)

    def tearDown(self):
        shutil.rmtree(self.d)


class ScoreTest(unittest.TestCase):
    def test_score_threshold(self):
        self.assertEqual(score.decide(row(near="3", later="2", fit="2"), CFG)[:2], ("10", "1"))
        self.assertEqual(score.decide(row(near="3", later="1", fit="1"), CFG)[:2], ("8", "2"))

    def test_warm_threshold(self):
        self.assertEqual(score.decide(row(near="3", later="2", fit="1", warm="yes"), CFG)[1], "1")
        self.assertEqual(score.decide(row(near="3", later="2", fit="1"), CFG)[1], "2")

    def test_self_label_and_exclusions(self):
        self.assertEqual(score.decide(row(self_label="angel"), CFG)[1], "1")
        self.assertEqual(score.decide(row(self_label="angel", category="bank"), CFG)[1], "2")
        self.assertEqual(score.decide(row(founder="yes", near="5", later="5", fit="5"), CFG)[1], "2")

    def test_ticket_gate(self):
        self.assertEqual(score.decide(row(near="5", later="5", fit="5", ticket_min="250000"), CFG)[1], "2")

    def test_untriaged_and_invalid(self):
        self.assertEqual(score.decide(row(), CFG)[1], "")
        self.assertEqual(score.decide(row(near="7", later="1", fit="1"), CFG)[1], "")


class SendTest(Base):
    def test_slot_order_skips_blocked_and_occupied(self):
        self.assertEqual(send.slot_order("s3", CFG, {"s4"}), ["s3", "s1"])

    def test_render_requires_hook(self):
        with self.assertRaises(send.RenderError):
            send.render(row(name="Ann Muster"), MSG, CFG)
        msg = send.render(row(name="Ann Muster", hook="Saw your talk on payments"), MSG, CFG)
        self.assertEqual(msg, "Hi Ann, Saw your talk on payments. 15 minutes? Eva")

    def test_only_go_rows_and_never_list(self):
        (self.d / "never.txt").write_text("Bob Never\n")
        self.ev.write_contacts([
            row(id="1", name="Ann A", round="1", status="planned", go="yes", hook="h", proposed_slot="s1"),
            row(id="2", name="Bob Never", round="1", status="planned", go="yes", hook="h"),
            row(id="3", name="Cid C", round="1", status="planned", hook="h"),
            row(id="4", name="Dee D", round="2", status="planned", go="yes", hook="h"),
        ])
        api = FakeApi()
        send.run(self.ev, api, send=True, automatik=False, allow_no_hook=False, limit=10)
        self.assertEqual([c[0] for c in api.calls], ["1"])
        rows = {r["id"]: r for r in self.ev.read_contacts()}
        self.assertEqual((rows["1"]["status"], rows["1"]["slot"], rows["1"]["request_id"]), ("requested", "s1", "m1"))
        self.assertEqual(rows["2"]["status"], "planned")

    def test_422_falls_back_and_records_real_slot(self):
        self.ev.write_contacts([
            row(id="1", user_id="u1", name="Ann A", round="1", status="planned", go="yes", hook="h", proposed_slot="s3"),
            row(id="2", name="Old O", status="confirmed", slot="s1"),
        ])
        api = FakeApi(refuse={"s3"})
        send.run(self.ev, api, send=True, automatik=False, allow_no_hook=False, limit=10)
        self.assertEqual([c[1] for c in api.calls], ["s3", "s4"])
        r = self.ev.read_contacts()[0]
        self.assertEqual((r["slot"], r["status"]), ("s4", "requested"))
        self.assertIn("sent on s4", r["notes"])

    def test_dry_run_sends_nothing(self):
        self.ev.write_contacts([row(id="1", name="A", round="1", status="planned", go="yes", hook="h")])
        send.run(self.ev, None, send=False, automatik=False, allow_no_hook=False, limit=10)
        self.assertEqual(self.ev.read_contacts()[0]["status"], "planned")

    def test_automatik_needs_no_go(self):
        self.ev.write_contacts([row(id="1", name="A", round="1", status="planned", hook="h")])
        api = FakeApi()
        send.run(self.ev, api, send=True, automatik=True, allow_no_hook=False, limit=10)
        self.assertEqual(len(api.calls), 1)


class AdapterTest(unittest.TestCase):
    def test_auth_file_permissions_and_parse(self):
        d = Path(tempfile.mkdtemp())
        try:
            p = d / "auth.curl"
            p.write_text('header = "access-token: a"\n-H "client: b"\n--header \'uid: c@d\'\n')
            os.chmod(p, 0o644)
            with self.assertRaises(brella.AuthError):
                brella.load_auth_headers(p)
            os.chmod(p, 0o600)
            self.assertEqual(brella.load_auth_headers(p), {"access-token": "a", "client": "b", "uid": "c@d"})
        finally:
            shutil.rmtree(d)

    def test_normalise_jsonapi(self):
        item = {"id": "7", "type": "attendee",
                "attributes": {"first-name": "Ann", "last-name": "Muster", "company-name": "Acme", "user-id": 42},
                "relationships": {"persona": {"data": {"type": "persona", "id": "p1"}},
                                  "interests": {"data": [{"type": "interest", "id": "i1"}]}}}
        idx = brella._included_index([
            {"type": "persona", "id": "p1", "attributes": {"name": "Investor"}},
            {"type": "interest", "id": "i1", "attributes": {"name": "Fintech"}},
        ])
        a = brella.normalise_attendee(item, idx)
        self.assertEqual((a["name"], a["company"], a["user_id"]), ("Ann Muster", "Acme", "42"))
        self.assertEqual((a["persona"], a["interests"]), (["Investor"], ["Fintech"]))


if __name__ == "__main__":
    unittest.main()
