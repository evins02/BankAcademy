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
          content: `Du bist ein Banklehr-Coach. Bewerte die Antwort des Lernenden sachlich und konstruktiv auf Deutsch.

Musterlösung: "${feedback}"
Antwort des Lernenden: "${studentText}"

Antworte ausschliesslich mit einem JSON-Objekt (kein Markdown, keine Erklärungen darum):
{"richtig":"Was der Lernende korrekt erfasst hat (1-2 Sätze)","fehlt":"Was fehlt oder ist ungenau (1-2 Sätze)","ideal":"Die ideale Kurz-Antwort (1-2 Sätze)"}

Regeln:
- Halte das Feedback kurz und klar
- Deutsch, Schweizer Schreibweise
- Wenn die Antwort sehr gut ist: fehlt = "Vollständig – nichts Wesentliches fehlt."
- Wenn der Lernende etwas überspringt oder nur oberflächlich antwortet, weise im fehlt-Feld darauf hin, dass das Verständnis der Begründungen im echten Bankalltag und in der LAP entscheidend ist`,
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
