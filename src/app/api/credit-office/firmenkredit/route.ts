import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM = `Du bist ein erfahrener Credit Officer einer Schweizer Kantonalbank.

DOSSIER MÜLLER BAU (Korrekte Werte):
- Cashflow: CHF 192'000
- Zinsaufwand: CHF 28'000
- 1.5% × langfr. FK (420'000): CHF 6'300
- Nenner: 28'000 + 6'300 = CHF 34'300
- Deckungsgrad: 192'000 / 34'300 = 5.6 → GUT (>1.2)
- EK: 180'000; Gesamtkapital: 600'000 → EK-Quote: 30% → Akzeptabel
- Branchenrisiko: Baugewerbe = HOCH (zyklisch, konjunkturabhängig)
- Track Record: Gründung 2018 = SCHWACH (nur ~7 Jahre)
- Sicherheiten: Zession Debitoren = SCHWACH für CHF 350'000
- Gesamtrisiko: ERHÖHT

KORREKTER ENTSCHEID: Bewilligen mit Auflagen (quantitativ OK, qualitative Risiken erhöht)
Mögliche Auflagen: Monatliche Umsatzmeldung, Debitoren-Reporting, jährlicher Abschluss

Antworte NUR als JSON:
{
  "result": "BESTANDEN"/"NICHT BESTANDEN",
  "calcResults": [
    {"label": "Deckungsgrad (5.6)", "isCorrect": bool, "correctValue": "192'000 / 34'300 = 5.6 – sehr gut (Min. 1.2)"},
    {"label": "EK-Quote (30%)", "isCorrect": bool, "correctValue": "180'000 / 600'000 = 30% – akzeptabel"}
  ],
  "calcScore": 0-2,
  "calcTotal": 2,
  "riskenErkannt": ["..."],
  "riskenUebersehen": ["..."],
  "riskScore": 0-3,
  "riskTotal": 3,
  "entscheidKorrekt": bool,
  "feedback": "3-4 Sätze auf Deutsch"
}
BESTANDEN: calcScore>=1 UND riskScore>=2 UND entscheidKorrekt=true (Bewilligen mit Auflagen oder Rückfrage)`;

export async function POST(req: Request) {
  try {
    const { formData } = await req.json();
    const resp = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1000,
      system: SYSTEM,
      messages: [{ role: "user", content: `EINGABEN LEHRLING:\n${JSON.stringify(formData, null, 2)}` }],
    });
    const text = resp.content[0].type === "text" ? resp.content[0].text : "";
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("No JSON");
    return NextResponse.json(JSON.parse(match[0]));
  } catch (error) {
    console.error("credit-office/firmenkredit error:", error);
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
