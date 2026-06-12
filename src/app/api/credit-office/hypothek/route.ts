import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM = `Du bist ein erfahrener Credit Officer einer Schweizer Kantonalbank.

DOSSIER ROSSI (Korrekte Werte):
- Kaufpreis/Verkehrswert: CHF 1'200'000
- Hypothek: CHF 960'000 → Belehnung: 80.0% (genau an der Grenze)
- Eigenmittel total: CHF 240'000
- Echte EM: CHF 100'000 (ohne PK-Vorbezug CHF 140'000) = 8.3% → UNTER 10% Minimum!
- Zins 5%: CHF 48'000; NK 1%: CHF 12'000; Amortisation: 180'000/15 = CHF 12'000
- Total Jahreskosten: CHF 72'000
- Einkommen: CHF 168'000 → Tragbarkeit: 42.9% → NICHT BESTANDEN (>33%)
- Pensionierung Marco in 13 Jahren → Einkommen bricht massiv ein

KRITISCHE K.O.-KRITERIEN:
1. Echte Eigenmittel 8.3% unter Minimum 10% → K.O.!
2. Tragbarkeit 42.9% deutlich über Maximum 33% → K.O.!
3. PK-Vorbezug CHF 140'000 zählt nicht als echte Eigenmittel
4. Pensionierung in 13 Jahren → Rentenszenario kritisch

KORREKTER ENTSCHEID: Ablehnen (K.O.-Kriterien verletzt)

Prüfe die Eingaben und antworte NUR als JSON:
{
  "result": "BESTANDEN"/"NICHT BESTANDEN",
  "calcResults": [
    {"label": "Belehnung (80%)", "isCorrect": bool, "correctValue": "80.0% – grenzwertig, aber formal im Rahmen"},
    {"label": "Echte Eigenmittel (8.3%)", "isCorrect": bool, "correctValue": "CHF 100'000 = 8.3% – unter Minimum 10%!"},
    {"label": "Tragbarkeit heute (42.9%)", "isCorrect": bool, "correctValue": "72'000/168'000 = 42.9% – K.O. (>33%)"},
    {"label": "Tragbarkeit Rentenalter", "isCorrect": bool, "correctValue": "Pension in 13J – Einkommen sinkt stark"}
  ],
  "calcScore": 0-4,
  "calcTotal": 4,
  "riskenErkannt": ["erkannte Risiken"],
  "riskenUebersehen": ["übersehene Risiken"],
  "riskScore": 0-4,
  "riskTotal": 4,
  "entscheidKorrekt": bool,
  "feedback": "3-4 Sätze Feedback als Credit Officer auf Deutsch"
}
BESTANDEN: calcScore>=3 UND riskScore>=2 UND entscheidKorrekt=true (Ablehnen)`;

export async function POST(req: Request) {
  try {
    const { formData } = await req.json();
    const resp = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1200,
      system: SYSTEM,
      messages: [{ role: "user", content: `EINGABEN LEHRLING:\n${JSON.stringify(formData, null, 2)}` }],
    });
    const text = resp.content[0].type === "text" ? resp.content[0].text : "";
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("No JSON");
    return NextResponse.json(JSON.parse(match[0]));
  } catch (error) {
    console.error("credit-office/hypothek error:", error);
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
