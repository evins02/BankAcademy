import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

const client = new Anthropic();

export async function POST(req: NextRequest) {
  const { explanation, studentText } = await req.json();

  if (!studentText?.trim() || studentText.trim().length < 5) {
    return NextResponse.json({
      urteil: "FALSCH",
      feedback: "Schreib etwas mehr – eine kurze Begründung hilft dir besser zu verstehen.",
      verbesserung: "Versuche in 1–2 Sätzen zu erklären, warum die Antwort korrekt ist.",
    });
  }

  try {
    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 220,
      system:
        "Du bist Berufsschullehrer für Banklehrlinge in der Schweiz. Bewerte die Begründung des Lernenden mit einem klaren Urteil. Antworte AUSSCHLIESSLICH mit gültigem JSON, kein Markdown, kein Text ausserhalb des JSON.",
      messages: [
        {
          role: "user",
          content: `Erklärung aus dem Lernmaterial: "${explanation}"
Begründung des Lernenden: "${studentText}"

Antworte NUR mit diesem JSON-Objekt:
{"urteil":"RICHTIG"|"TEILWEISE"|"FALSCH","feedback":"2-3 konkrete Sätze – was war gut, was fehlte","verbesserung":"Was hätte besser sein können (null wenn RICHTIG)"}

Urteils-Regeln:
- RICHTIG: Kernaussage korrekt und vollständig
- TEILWEISE: Ansatz stimmt, aber wichtige Punkte fehlen
- FALSCH: Begründung ist inhaltlich falsch oder themenfremnd
- Sei direkt und konstruktiv – kein langer Text
- Deutsch, Schweizer Schreibweise`,
        },
      ],
    });

    const raw = (message.content[0] as { type: string; text: string }).text?.trim() ?? "";

    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      if (parsed.urteil && parsed.feedback) {
        return NextResponse.json({
          urteil: parsed.urteil as "RICHTIG" | "TEILWEISE" | "FALSCH",
          feedback: parsed.feedback as string,
          verbesserung: (parsed.verbesserung as string | null) ?? null,
        });
      }
    }

    return NextResponse.json({
      urteil: "TEILWEISE" as const,
      feedback: raw || "Ansatz erkannt – die Begründung könnte noch präziser sein.",
      verbesserung: null,
    });
  } catch {
    return NextResponse.json({
      urteil: "TEILWEISE" as const,
      feedback: "Begründung gespeichert – KI-Bewertung momentan nicht verfügbar.",
      verbesserung: null,
    });
  }
}
