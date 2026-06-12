import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import type { ConvMessage } from "@/components/modules/kyc-conversation/conv-types";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `Du spielst Thomas Kowalski, 41 Jahre alt, Schweizer.
Du möchtest ein Privatkonto eröffnen.

Deine Daten (NUR auf direkte Frage preisgeben, nicht von selbst):
- Beruf: Projektleiter IT bei Swisscom AG, 100%
- Geburtsdatum: 14.06.1985
- Wohnsitz: Bergstrasse 22, 3007 Bern
- Zivilstand: Verheiratet, 2 Kinder
- Einkommen: CHF 95'000/Jahr netto
- Vermögen: ca. CHF 45'000 (aus Lohn)
- Andere Bankbeziehungen: PostFinance
- Zweck: Lohnkonto + Zahlungsverkehr
- Wirtschaftlich Berechtigter: Du selbst
- PEP: Nein
- US-Verbindungen: Keine
- Ausweis: Schweizer Pass, Nr. X4729183, gültig bis 12.03.2024

Verhalten:
- Beantworte NUR was direkt gefragt wird
- Antworte kurz und natürlich (1-3 Sätze auf Deutsch)
- Wenn Ausweis verlangt: übergib kommentarlos
- Bei unpräzisen Fragen: kurze Rückfrage stellen

revealedFields Schlüssel (nur setzen wenn Information tatsächlich preisgegeben):
"beruf" | "einkommen" | "herkunft" | "bankbeziehungen" | "zweck" | "wibe" | "pep" | "fatca" | "ausweis"

Antworte AUSSCHLIESSLICH als gültiges JSON:
{"customerMessage":"...", "revealedFields":[], "conversationComplete":false}

conversationComplete = true erst nach 12+ Nachrichten.`;

export async function POST(req: Request) {
  try {
    const { messages } = (await req.json()) as { messages: ConvMessage[] };

    const response = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 400,
      system: SYSTEM_PROMPT,
      messages: messages.map((m) => ({
        role: m.role === "student" ? ("user" as const) : ("assistant" as const),
        content: m.content,
      })),
    });

    const text = response.content[0].type === "text" ? response.content[0].text : "";
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("No JSON");

    return NextResponse.json(JSON.parse(match[0]));
  } catch (error) {
    console.error("KYC conversation API error:", error);
    return NextResponse.json({ error: "API call failed" }, { status: 500 });
  }
}
