import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import type { ConvMessage } from "@/components/modules/kyc-conversation/conv-types";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `Du bist Thomas Kowalski, 41 Jahre alt, Schweizer Staatsbürger.
Du sitzt am Schalter einer Bank und möchtest ein Privatkonto eröffnen.

DEINE PERSÖNLICHEN DATEN — gib sie NUR preis, wenn direkt danach gefragt wird:
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

VERHALTEN:
- Bleib jederzeit vollständig in der Rolle von Thomas Kowalski — verlasse sie nie
- Antworte kurz und natürlich auf Deutsch (1–3 Sätze)
- Gib nur die Information preis, nach der konkret gefragt wurde — keine Zusätze
- Bei unklaren Fragen: stelle eine kurze Rückfrage
- Wenn nach dem Ausweis gefragt wird: reiche ihn kommentarlos weiter
- Wenn du nach Themen gefragt wirst, die du nicht kennst (Übungsablauf, Checklisten, Formulare):
  Antworte im Charakter: «Das weiss ich nicht, das ist Ihr Bereich.»

Antworte AUSSCHLIESSLICH als gültiges JSON ohne Markdown:
{"customerMessage":"<deine Antwort als Thomas Kowalski>"}`;

// Detect which KYC fields Thomas revealed — done server-side so the AI
// never sees the compliance checklist and cannot accidentally recite it.
function detectRevealedFields(msg: string): string[] {
  const m = msg.toLowerCase();
  const revealed: string[] = [];
  if (/projektleiter|swisscom|100\s*%/.test(m)) revealed.push("beruf");
  if (/95['.]?000|45['.]?000|nettoeinkommen|ersparnisse/.test(m)) revealed.push("einkommen");
  if (/aus\s+(meinem\s+)?lohn|alles\s+aus\s+lohn|lohnsparen/.test(m)) revealed.push("herkunft");
  if (/postfinance/.test(m)) revealed.push("bankbeziehungen");
  if (/lohnkonto|zahlungsverkehr/.test(m)) revealed.push("zweck");
  if (/ich\s+selbst|bin\s+selbst\s+der|wirtschaftlich\s+berechtigt/.test(m)) revealed.push("wibe");
  if (/politisch\s+expon|kein.*pep|nein.*politisch/.test(m)) revealed.push("pep");
  if (/keine\s+us|keine\s+verbindung.*usa|us-verbindung|fatca/.test(m)) revealed.push("fatca");
  if (/hier\s+ist\s+mein\s+pass|bitte.*pass|natürlich.*pass|x4729183/.test(m)) revealed.push("ausweis");
  return revealed;
}


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

    const parsed = JSON.parse(match[0]) as { customerMessage: string };
    const customerMessage = parsed.customerMessage ?? text;
    return NextResponse.json({
      customerMessage,
      revealedFields: detectRevealedFields(customerMessage),
      conversationComplete: false,
    });
  } catch (error) {
    console.error("KYC conversation API error:", error);
    return NextResponse.json({ error: "API call failed" }, { status: 500 });
  }
}
