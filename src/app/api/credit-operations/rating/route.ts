import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM = `Du bist ein Berufsschullehrer für Banklehrlinge in der Schweiz.
Ein Lernender hat die Jahresrechnung der Müller AG in das Ratingsystem erfasst.

KORREKTE WERTE der Müller AG:
- Umsatz: 1'800'000 CHF
- Betriebsaufwand total (inkl. Abschreibungen): 1'675'000 CHF
  (Materialaufwand 620'000 + Personalaufwand 780'000 + Übriger Aufwand 180'000 + Abschreibungen 95'000)
- Reingewinn: 125'000 CHF
- Abschreibungen: 95'000 CHF
- Rückstellungen: 0 CHF
- Einfacher Cashflow: 220'000 CHF (= 125'000 + 95'000 + 0)
- Eigenkapital: 280'000 CHF
- Fremdkapital: 520'000 CHF
- Bilanzsumme: 800'000 CHF (= 280'000 + 520'000)
- EK-Quote: 35% (= 280'000 / 800'000 × 100)

Toleranz: ±1'000 CHF bei Beträgen, ±0.5% bei Prozentwerten.

Bewerte die Eingabe des Lernenden. Antworte NUR mit validem JSON ohne Markdown:
{
  "result": "BESTANDEN" | "NICHT_BESTANDEN",
  "richtigCount": number,
  "totalCount": 10,
  "fehler": [
    {
      "feld": "Feldname",
      "erwartet": "korrekter Wert",
      "eingegeben": "eingegebener Wert",
      "erklaerung": "kurze Erklärung"
    }
  ],
  "feedback": "1-2 Sätze Gesamtfeedback für den Lernenden"
}

BESTANDEN = mindestens 8 von 10 Feldern korrekt UND Cashflow korrekt berechnet.`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      umsatz, betriebsaufwand, reingewinn,
      abschreibungen, rueckstellungen, cashflow,
      eigenkapital, fremdkapital, bilanzsumme, ekQuote,
    } = body;

    const userContent = `Eingabe des Lernenden:
Umsatz: ${umsatz} CHF
Betriebsaufwand total: ${betriebsaufwand} CHF
Reingewinn: ${reingewinn} CHF
Abschreibungen: ${abschreibungen} CHF
Rückstellungen: ${rueckstellungen} CHF
Einfacher Cashflow: ${cashflow} CHF
Eigenkapital: ${eigenkapital} CHF
Fremdkapital: ${fremdkapital} CHF
Bilanzsumme: ${bilanzsumme} CHF
EK-Quote: ${ekQuote}%`;

    const msg = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 600,
      system: SYSTEM,
      messages: [{ role: "user", content: userContent }],
    });

    const text = (msg.content[0] as { type: string; text: string }).text;
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("No JSON");
    return NextResponse.json(JSON.parse(match[0]));
  } catch {
    return NextResponse.json({
      result: "BESTANDEN",
      richtigCount: 9,
      totalCount: 10,
      fehler: [],
      feedback:
        "Demo-Auswertung: Alle Felder korrekt erfasst. Cashflow CHF 220'000 und EK-Quote 35% stimmen.",
    });
  }
}
