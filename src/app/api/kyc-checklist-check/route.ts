import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { KYC_PFLICHTFRAGEN } from "@/lib/kyc-conversation";

type Message = { role: string; content: string };

export const runtime = "edge";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const NO_STORE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
};

function jsonNoStore(body: unknown) {
  return NextResponse.json(body, { headers: NO_STORE_HEADERS });
}

const FALLBACK = { covered: [] as string[] };

export async function POST(req: Request) {
  const { messages } = (await req.json()) as { messages: Message[] };

  if (!messages?.length) {
    return jsonNoStore(FALLBACK);
  }

  const transcript = messages
    .map((m) => `${m.role === "user" ? "Berater" : "Kunde"}: ${m.content}`)
    .join("\n");

  try {
    const response = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 300,
      system: `Du prüfst ein KYC-Gespräch eines Bankberaters mit Neukunde Thomas Kowalski (Projektleiter IT bei Swisscom, verheiratet, Einkommen CHF 95'000/Jahr, Vermögen CHF 45'000 aus Lohn, andere Bankbeziehung PostFinance, Zweck Lohnkonto, wirtschaftlich Berechtigter = er selbst, kein PEP, keine US-Verbindung, ausländischer Reisepass gültig bis 14.05.2027).

Die 9 Pflichtfragen-Kategorien sind: ${KYC_PFLICHTFRAGEN.join(", ")}.

Prüfe anhand des Gesprächsprotokolls, welche dieser Kategorien der Berater tatsächlich gezielt erfragt UND eine Antwort dazu erhalten hat. Reine Nebenerwähnungen ohne gezielte Frage zählen nicht.

Antworte NUR mit einem JSON-Objekt (kein Markdown):
{"covered": ["exakte Labels aus der Liste oben, die abgedeckt wurden"]}`,
      messages: [
        {
          role: "user",
          content: `Gesprächsprotokoll:\n${transcript}`,
        },
      ],
    });

    const text = response.content[0].type === "text" ? response.content[0].text : "";
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) return jsonNoStore(FALLBACK);

    const parsed = JSON.parse(match[0]) as { covered?: unknown };
    const covered = Array.isArray(parsed.covered)
      ? parsed.covered.filter((c): c is string => typeof c === "string")
      : [];
    return jsonNoStore({ covered });
  } catch {
    return jsonNoStore(FALLBACK);
  }
}
