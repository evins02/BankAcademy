import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic();

interface AiResult {
  richtig: string;
  fehlt: string;
  ideal: string;
}

const FALLBACK: AiResult = {
  richtig: "Deine Antwort wurde gespeichert.",
  fehlt: "Vergleiche deine Antwort mit der Erklärung unten.",
  ideal: "Lies die Erklärung sorgfältig durch.",
};

export async function POST(req: NextRequest) {
  const { feedback, studentText } = await req.json();

  if (!studentText?.trim()) {
    return NextResponse.json(FALLBACK);
  }

  try {
    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 300,
      messages: [
        {
          role: "user",
          content: `Du bist ein Banklehr-Coach. Bewerte die folgende Antwort eines Lernenden sachlich und konstruktiv.

Lerninhalt (korrekte Erklärung): "${feedback}"
Antwort des Lernenden: "${studentText}"

Antworte ausschliesslich mit einem JSON-Objekt (kein Markdown, keine Erklärungen darum):
{"richtig":"Was der Lernende korrekt erfasst hat (1 Satz)","fehlt":"Was fehlt oder ungenau ist (1 Satz)","ideal":"Die ideale Kurz-Antwort (1 Satz)"}

Regeln:
- Sei konstruktiv und wohlwollend
- Deutsch, Schweizer Schreibweise
- Wenn die Antwort sehr gut ist: fehlt = "Vollständig – nichts Wesentliches fehlt."`,
        },
      ],
    });

    const raw = (message.content[0] as { type: string; text: string }).text?.trim() ?? "";
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        const parsed = JSON.parse(jsonMatch[0]) as AiResult;
        if (parsed.richtig && parsed.fehlt && parsed.ideal) {
          return NextResponse.json(parsed);
        }
      } catch {
        // fall through to fallback
      }
    }
    return NextResponse.json(FALLBACK);
  } catch {
    return NextResponse.json(FALLBACK);
  }
}
