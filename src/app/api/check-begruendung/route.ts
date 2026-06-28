import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic();

export async function POST(req: NextRequest) {
  const { explanation, studentText } = await req.json();

  if (!studentText?.trim() || studentText.trim().length < 5) {
    return NextResponse.json({ feedback: "Schreib etwas mehr – du bist auf dem richtigen Weg!" });
  }

  try {
    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 60,
      messages: [
        {
          role: "user",
          content: `Du bist Berufsschullehrer für Banklehrlinge in der Schweiz.

Erklärung aus dem Lernmaterial: "${explanation}"
Antwort des Lernenden: "${studentText}"

Antworte mit EINEM kurzen deutschen Satz (max. 10 Wörter):
- Wenn der Lernende das Konzept grob verstanden hat: z.B. "Gut erklärt! ✓" oder "Super, du hast es verstanden! ✓"
- Wenn die Antwort zu kurz, leer oder themenfremnd ist: "Schau dir die Erklärung oben nochmal an."
Sei grosszügig beim Bewerten. Nur der eine Satz, nichts anderes.`,
        },
      ],
    });

    const text = (message.content[0] as { type: string; text: string }).text?.trim() ?? "";
    return NextResponse.json({ feedback: text || "Gut erklärt! ✓" });
  } catch {
    return NextResponse.json({ feedback: "Gut erklärt! ✓" });
  }
}
