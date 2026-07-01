import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import type { OffeneFrageEvalResult } from "@/lib/offene-frage";

const client = new Anthropic();

export async function POST(req: NextRequest) {
  const { briefing, question, role, expectedApproach, studentText } = await req.json();

  if (!studentText?.trim() || studentText.trim().length < 15) {
    return NextResponse.json<OffeneFrageEvalResult>({
      ergebnis: "Nicht richtig",
      feedback: "Deine Antwort ist zu kurz. Beschreibe dein Vorgehen in 2-4 Sätzen.",
      korrektes_vorgehen: expectedApproach,
      merksatz: "Begründe immer dein Vorgehen – eine vollständige Antwort zeigt Fachkompetenz.",
    });
  }

  const systemPrompt = `Du bist ein erfahrener ${role} bei einer Schweizer Bank und bewertest Antworten von Banklehrlingen.

Szenario: ${briefing}
Frage: ${question}
Korrekte Vorgehensweise: ${expectedApproach}

Bewerte die Antwort des Lernenden in 3 Schritten:
1. Hat er das Kernproblem und die relevante Regel erkannt?
2. Ist sein Vorgehen fachlich korrekt und vollständig?
3. Was fehlt oder ist falsch?

Antworte AUSSCHLIESSLICH im folgenden JSON-Format ohne zusätzlichen Text:
{
  "ergebnis": "Richtig" | "Teilweise richtig" | "Nicht richtig",
  "feedback": "2-3 konkrete Sätze – was war gut, was fehlte",
  "korrektes_vorgehen": "Kurze Beschreibung der idealen Antwort (2-3 Sätze)",
  "merksatz": "1 einprägsamer Satz zur Regel"
}

Sei fair aber präzise. "Teilweise richtig" wenn das Kernproblem erkannt wurde, aber wichtige Schritte fehlen.`;

  try {
    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 400,
      messages: [
        {
          role: "user",
          content: `Antwort des Lernenden: "${studentText}"`,
        },
      ],
      system: systemPrompt,
    });

    const raw = (message.content[0] as { type: string; text: string }).text?.trim() ?? "";

    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]) as OffeneFrageEvalResult;
      return NextResponse.json(parsed);
    }

    return NextResponse.json<OffeneFrageEvalResult>({
      ergebnis: "Teilweise richtig",
      feedback: "Deine Antwort zeigt grundlegendes Verständnis.",
      korrektes_vorgehen: expectedApproach,
      merksatz: "Überprüfe die korrekte Vorgehensweise oben.",
    });
  } catch {
    return NextResponse.json<OffeneFrageEvalResult>({
      ergebnis: "Teilweise richtig",
      feedback: "Bewertung momentan nicht verfügbar. Vergleiche deine Antwort mit dem korrekten Vorgehen.",
      korrektes_vorgehen: expectedApproach,
      merksatz: "Überprüfe die korrekte Vorgehensweise oben.",
    });
  }
}
