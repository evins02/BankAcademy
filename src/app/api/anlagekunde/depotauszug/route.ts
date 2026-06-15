import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// Correct answers with tolerances
// Nestlé: 50 × 108.50 = 5425 | Einstand 50×95=4750 | Perf CHF=+675 | Perf%=+14.2105...≈14.21%
// UBS ETF: 100 × 108 = 10800 | Einstand 100×112=11200 | Perf CHF=-400 | Perf%=-3.5714...≈-3.57%
// Total: 5425+10800=16225

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { pos1Marktwert, pos1PerfCHF, pos1PerfPct, pos2Marktwert, pos2PerfCHF, pos2PerfPct, totalDepot } = body;

  const systemPrompt = `Du bist ein Schweizer Bankausbildner und prüfst Depotauszug-Berechnungen. Antworte NUR mit validem JSON, ohne Markdown oder Code-Blöcke.

Korrekte Werte:
- Position 1 (Nestlé AG, 50 Stück, Kurs 108.50, Einstand 95.00):
  * Marktwert: 5425 CHF (Toleranz ±10)
  * Performance CHF: +675 (Toleranz ±10)
  * Performance %: +14.21% (Toleranz ±0.5%)
- Position 2 (UBS ETF SMI, 100 Stück, Kurs 108.00, Einstand 112.00):
  * Marktwert: 10800 CHF (Toleranz ±10)
  * Performance CHF: -400 (Toleranz ±10)
  * Performance %: -3.57% (Toleranz ±0.5%)
- Total Depot Marktwert: 16225 CHF (Toleranz ±20)

Prüfe die eingereichten Werte. Gib zurück:
{
  "result": "BESTANDEN" oder "NICHT BESTANDEN",
  "richtigCount": Anzahl korrekter Felder (0-7),
  "totalCount": 7,
  "fehler": ["Beschreibung Fehler 1", ...],
  "feedback": "Kurzes Gesamtfeedback auf Deutsch (1-2 Sätze)"
}

BESTANDEN wenn: ≥6 von 7 Feldern korrekt.`;

  const userMessage = `Eingereichte Werte:
Position 1 (Nestlé):
- Marktwert: ${pos1Marktwert}
- Performance CHF: ${pos1PerfCHF}
- Performance %: ${pos1PerfPct}

Position 2 (UBS ETF SMI):
- Marktwert: ${pos2Marktwert}
- Performance CHF: ${pos2PerfCHF}
- Performance %: ${pos2PerfPct}

Total Depot: ${totalDepot}`;

  try {
    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 512,
      system: systemPrompt,
      messages: [{ role: "user", content: userMessage }],
    });

    const text = message.content[0].type === "text" ? message.content[0].text : "";
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("No JSON");
    const data = JSON.parse(match[0]);
    return NextResponse.json(data);
  } catch {
    // Fallback: evaluate locally
    const CHF_TOL = 10;
    const PCT_TOL = 0.5;

    const checks = [
      { label: "Nestlé Marktwert", val: parseFloat(pos1Marktwert), target: 5425, tol: CHF_TOL },
      { label: "Nestlé Performance CHF", val: parseFloat(pos1PerfCHF), target: 675, tol: CHF_TOL },
      { label: "Nestlé Performance %", val: parseFloat(pos1PerfPct), target: 14.21, tol: PCT_TOL },
      { label: "UBS ETF Marktwert", val: parseFloat(pos2Marktwert), target: 10800, tol: CHF_TOL },
      { label: "UBS ETF Performance CHF", val: parseFloat(pos2PerfCHF), target: -400, tol: CHF_TOL },
      { label: "UBS ETF Performance %", val: parseFloat(pos2PerfPct), target: -3.57, tol: PCT_TOL },
      { label: "Total Depot", val: parseFloat(totalDepot), target: 16225, tol: 20 },
    ];

    const fehler: string[] = [];
    let richtigCount = 0;
    for (const c of checks) {
      if (!isNaN(c.val) && Math.abs(c.val - c.target) <= c.tol) {
        richtigCount++;
      } else {
        fehler.push(`${c.label}: erwartet ${c.target}, eingegeben ${isNaN(c.val) ? "leer" : c.val}`);
      }
    }

    const passed = richtigCount >= 6;
    return NextResponse.json({
      result: passed ? "BESTANDEN" : "NICHT BESTANDEN",
      richtigCount,
      totalCount: 7,
      fehler,
      feedback: passed
        ? "Sehr gut! Du kannst einen Depotauszug korrekt lesen und berechnen."
        : "Überprüfe deine Berechnungen. Marktwert = Stück × Kurs, Performance CHF = Marktwert − Einstandswert.",
    });
  }
}
