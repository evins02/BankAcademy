import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import type { HypothekFormData } from "@/components/modules/hypothek-antrag/hypothek-antrag-types";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `Du bist ein erfahrener Kreditexperte einer Schweizer Kantonalbank.

Prüfe diesen Hypothekarantrag der Familie Brandenberger:

KUNDENDATEN:
- Stefan Brandenberger, 42 J. | Anna Brandenberger, 39 J.
- Einkommen Stefan: CHF 110'000/Jahr brutto
- Einkommen Anna: CHF 45'000/Jahr brutto (80% Pensum, Vertrag läuft Ende Jahr aus)
- Kaufpreis / Verkehrswert: CHF 950'000
- Gewünschte Hypothek: CHF 770'000
  - 1. Hypothek: CHF 617'500 (65%)
  - 2. Hypothek: CHF 152'500 (16.05%)
- Eigenmittel total: CHF 180'000
  - davon PK-Vorbezug: CHF 80'000
  - davon Ersparnisse: CHF 100'000
- Amortisationsplan 2. Hypothek: nicht vorhanden

KORREKTE BERECHNUNGEN:
1. Belehnung: 770'000 / 950'000 × 100 = 81.05% → ÜBERSCHREITET Maximum 80% (kritisch!)
2. Echte Eigenmittel: 180'000 - 80'000 (PK) = CHF 100'000; Minimum 10% = CHF 95'000 → knapp erfüllt
3. Tragbarkeit (mit Anna): Zins 38'500 + NK 9'500 + Amort 10'167 = 58'167 / 155'000 = 37.5% → grenzwertig
   Tragbarkeit (nur Stefan): 58'167 / 110'000 = 52.9% → NICHT bestanden!
4. Amortisation 2. Hypothek: 152'500 / 15 = CHF 10'167/Jahr; Plan fehlt → kritisch!

KRITISCHE FEHLER IM ANTRAG:
A. Belehnung 81.05% > 80% Maximum (FINMA-Richtlinie)
B. Amortisationsplan für 2. Hypothek fehlt (SBVg-Richtlinien)
C. Einkommen Anna nicht gesichert (kündbar, läuft aus) → Tragbarkeit nur Stefan 52.9% → nicht bestanden
D. PK-Vorbezug CHF 80'000 zählt nicht als echte Eigenmittel (nur Ersparnisse zählen)

AUSWERTUNGSREGEL:
- Belehnung korrekt: Student muss 81.05% errechnen und als "Nicht bestanden" markieren (±2% Toleranz)
- Eigenmittel korrekt: Student muss echte EM = CHF 100'000 angeben (PK-Betrag abgezogen)
- Tragbarkeit korrekt: Student muss ~37-38% errechnen (±2% Toleranz) und korrekt bewerten
- Amortisation korrekt: Student muss CHF ~10'000-10'200/Jahr angeben UND Amortisationsplan als "nicht angegeben" markieren
- Richtige Empfehlung: "Ablehnen" oder "Bewilligen mit Auflagen" (beide akzeptabel, "Bewilligen" falsch)

Prüfe die Eingaben des Lehrlings und antworte NUR als gültiges JSON (kein Markdown):
{
  "result": "BESTANDEN" oder "NICHT BESTANDEN",
  "calcResults": [
    {"label": "Belehnung", "isCorrect": true/false, "correctValue": "81.05% – Nicht bestanden (>80%)"},
    {"label": "Echte Eigenmittel", "isCorrect": true/false, "correctValue": "CHF 100'000 (ohne PK-Vorbezug)"},
    {"label": "Tragbarkeit", "isCorrect": true/false, "correctValue": "37.5% mit Anna – grenzwertig"},
    {"label": "Amortisation 2. Hypothek", "isCorrect": true/false, "correctValue": "CHF 10'167/Jahr – Plan fehlt"}
  ],
  "calcScore": <0-4>,
  "calcTotal": 4,
  "riskenErkannt": ["Erkannte Risiken aus Freitext"],
  "riskenUebersehen": ["Nicht erkannte Risiken"],
  "riskScore": <0-4>,
  "riskTotal": 4,
  "criticalErrors": ["Kritische Fehler im Antrag (aus korrekten Berechnungen, nicht aus Lernerfehlern)"],
  "empfehlungKorrekt": true/false,
  "feedback": "3-4 Sätze praktisches Ausbildner-Feedback auf Deutsch"
}

BESTANDEN wenn: calcScore >= 3 UND riskScore >= 2 UND empfehlungKorrekt = true`;

export async function POST(req: Request) {
  try {
    const { formData } = (await req.json()) as { formData: HypothekFormData };

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1400,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: `EINGABEN DES LEHRLINGS:\n${JSON.stringify(formData, null, 2)}`,
        },
      ],
    });

    const text = response.content[0].type === "text" ? response.content[0].text : "";
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("No JSON");

    return NextResponse.json(JSON.parse(match[0]));
  } catch (error) {
    console.error("Hypothek evaluate API error:", error);
    return NextResponse.json({ error: "API call failed" }, { status: 500 });
  }
}
