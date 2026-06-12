import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM = `Du bist ein erfahrener Credit Officer einer Schweizer Kantonalbank.

DOSSIER SCHNEIDER (Korrekte Werte):
- Aktueller Schätzwert: CHF 820'000 (war 900'000 bei Bewilligung → gesunken!)
- Hypothek: CHF 680'000
- Aktuelle Belehnung: 680'000 / 820'000 = 82.9% → ÜBER Maximum 80%!
- Belehnung bei Bewilligung 2019: 680'000/900'000 = 75.6%
- Zins 5%: 680'000×5% = CHF 34'000
- NK 1%: 820'000×1% = CHF 8'200
- Total Kosten: CHF 42'200
- Aktuelles Einkommen: CHF 95'000 (war 115'000 → gesunken durch Teilpension!)
- Tragbarkeit: 42'200/95'000 = 44.4% → DEUTLICH ZU HOCH (>33%)!
- Neue Verpflichtung: Autoleasing CHF 12'000

KRITISCHE PUNKTE:
1. Belehnung 82.9% → über Maximum 80% (Liegenschaftswert gesunken)
2. Tragbarkeit 44.4% → weit über Maximum 33%
3. Einkommen gesunken um CHF 20'000
4. Neue Verpflichtung Autoleasing

KORREKTER ENTSCHEID: Amortisation verlangen + Gespräch mit Kunden + erhöhte Überwachung

Antworte NUR als JSON:
{
  "result": "BESTANDEN"/"NICHT BESTANDEN",
  "calcResults": [
    {"label": "Aktuelle Belehnung (82.9%)", "isCorrect": bool, "correctValue": "680'000/820'000 = 82.9% – über Maximum 80%!"},
    {"label": "Aktuelle Tragbarkeit (44.4%)", "isCorrect": bool, "correctValue": "42'200/95'000 = 44.4% – weit über 33%!"}
  ],
  "calcScore": 0-2,
  "calcTotal": 2,
  "riskenErkannt": ["..."],
  "riskenUebersehen": ["..."],
  "riskScore": 0-4,
  "riskTotal": 4,
  "entscheidKorrekt": bool,
  "feedback": "3-4 Sätze auf Deutsch"
}
BESTANDEN: calcScore>=1 UND riskScore>=2 UND entscheidKorrekt=true (Massnahmen: amortisation/gespraech/ueberwachung)`;

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
    console.error("credit-office/neubewilligung error:", error);
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
