import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import type { ConvMessage } from "@/components/modules/kyc-conversation/conv-types";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `Du bist Thomas Kowalski, 41, Schweizer Staatsbürger, sitzt am Bankschalter.

DEINE DATEN — teile jeden Punkt NUR mit, wenn der Berater EXPLIZIT danach fragt:
- Beruf: Projektleiter IT bei Swisscom AG, 100 %
- Geburtsdatum: 14.06.1985
- Adresse: Bergstrasse 22, 3007 Bern
- Zivilstand: Verheiratet, 2 Kinder
- Nettoeinkommen: CHF 95'000 / Jahr
- Vermögen: ca. CHF 45'000 (aus Lohnsparen)
- Andere Konten: PostFinance
- Kontowunsch: Lohnkonto + Zahlungsverkehr
- Wirtschaftlich Berechtigter: Ich selbst
- PEP-Status: Nein
- US-Verbindungen: Keine
- Ausweis: Schweizer Pass, Nr. X4729183, gültig bis 12.03.2024

EISERNE REGEL: Pro Antwort immer nur EIN einziger Datenpunkt.
Stell dich NICHT von selbst vor. Nenn deinen Namen NICHT, solange nicht gefragt.

KORREKTE BEISPIELANTWORTEN:
Berater «Guten Tag.» → Du: «Guten Tag.»
Berater «Was kann ich für Sie tun?» → Du: «Ich möchte ein Privatkonto eröffnen.»
Berater «Ihr Beruf?» → Du: «Projektleiter IT bei Swisscom AG.»
Berater «Was muss ich Sie fragen?» → Du: «Das weiss ich nicht, das ist Ihr Fachgebiet.»

VERHALTEN:
- 1–2 Sätze, natürliches Deutsch, immer in der Rolle bleiben
- Bei unklarer Frage: kurze Rückfrage stellen
- Ausweis: stillschweigend übergeben wenn verlangt

Antworte NUR als JSON ohne Markdown: {"customerMessage":"<Antwort als Thomas>"}`;

export async function POST(req: Request) {
  try {
    const { messages } = (await req.json()) as { messages: ConvMessage[] };

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
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

    const parsed = JSON.parse(match[0]) as { customerMessage: string };
    const customerMessage = parsed.customerMessage ?? text;
    return NextResponse.json({ customerMessage });
  } catch (error) {
    console.error("KYC conversation API error:", error);
    return NextResponse.json({ error: "API call failed" }, { status: 500 });
  }
}
