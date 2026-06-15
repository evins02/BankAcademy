import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM = `Du bist ein erfahrener Credit Officer einer Schweizer Kantonalbank.

DOSSIER MEIER (Korrekte Werte):
- Nettoeinkommen: CHF 4'800/Monat
- Freibetrag: 4'800 - 1'700 = CHF 3'100/Monat
- Autoleasing: CHF 450/Mt → Restsaldo: ca. CHF 450×36 = CHF 16'200 (Restlaufzeit geschätzt)
- Kreditkarte Limite: CHF 8'000 (zählt als Verpflichtung gemäss KKG!)
- Total bestehende Verpflichtungen: CHF 16'200 + 8'000 = CHF 24'200
- Neuer Kredit: CHF 25'000
- Total inkl. neu: CHF 49'200
- Geteilt durch 36: CHF 1'367/Monat
- Freibetrag CHF 3'100 > CHF 1'367 → Kreditfähigkeit GEGEBEN
- ZEK: vorhanden, keine Einträge → positiv

KRITISCHER PUNKT:
1. Laufzeit 48 Monate beantragt → KKG-Maximum 36 Monate → RÜCKFRAGE nötig!
2. Kreditkarte-Limite muss als Verpflichtung eingerechnet werden (oft vergessen!)
3. Kreditfähigkeit ist gegeben (wenn Laufzeit angepasst)

KORREKTER ENTSCHEID: Rückfrage an Berater (wegen Laufzeit 48>36 Monate)

Antworte NUR als JSON:
{
  "result": "BESTANDEN"/"NICHT BESTANDEN",
  "calcResults": [
    {"label": "Kreditfähigkeitsberechnung", "isCorrect": bool, "correctValue": "49'200/36 = 1'367 CHF/Mt; Freibetrag 3'100 > 1'367 → gegeben"},
    {"label": "Kreditkarte als Verpflichtung", "isCorrect": bool, "correctValue": "CHF 8'000 Limite zählt gemäss KKG als Verpflichtung"},
    {"label": "Laufzeit KKG-konform", "isCorrect": bool, "correctValue": "48 Monate > KKG-Maximum 36 Monate → nicht konform"}
  ],
  "calcScore": 0-3,
  "calcTotal": 3,
  "riskenErkannt": ["..."],
  "riskenUebersehen": ["..."],
  "riskScore": 0-2,
  "riskTotal": 2,
  "entscheidKorrekt": bool,
  "feedback": "3-4 Sätze auf Deutsch"
}
BESTANDEN: calcScore>=2 UND riskScore>=1 UND entscheidKorrekt=true (Rückfrage oder Bewilligen mit Auflagen)`;

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
    console.error("credit-office/blankokredit error:", error);
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
