import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { DOKUMENT_REGISTRY } from "@/lib/dokument-pruefen/registry";

interface FeedbackResult {
  correct: boolean;
  partial: boolean;
  feedback: string;
  hint: string | null;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { documentId: string; fieldId: string; correction: string };
    const { documentId, fieldId, correction } = body;

    const config = DOKUMENT_REGISTRY[documentId];
    if (!config) {
      return NextResponse.json({ error: "Unbekanntes Dokument" }, { status: 400 });
    }

    const ctx = config.errorContext[fieldId];
    if (!ctx) {
      return NextResponse.json({ error: "Ungültige Feld-ID" }, { status: 400 });
    }

    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const msg = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 400,
      messages: [
        {
          role: "user",
          content: `Du bist ein Lerncoach für Schweizer Bankfachleute (KV-Ausbildung, Niveau Lehrling/Auszubildende).

Kontext – ${config.title}:
Feld unter Prüfung: ${ctx.field}
Was im Dokument steht: ${ctx.shown}
Fehlertyp: ${ctx.type}
Vollständig korrekte Antwort: ${ctx.correct}

Antwort des Lernenden: "${correction}"

Aufgabe: Bewerte die Antwort des Lernenden auf Deutsch. Sei konstruktiv, präzise und ermutigend.
- "correct": true wenn die wesentlichen Punkte korrekt erkannt wurden
- "partial": true wenn der Fehler teilweise erkannt wurde, aber Details fehlen
- "feedback": 2-3 klare Sätze zur Bewertung
- "hint": knapper Hinweis zur Verbesserung (null wenn correct=true)

Gib NUR gültiges JSON zurück, kein Markdown, kein Text außerhalb des JSON:
{"correct":bool,"partial":bool,"feedback":"...","hint":"...oder null"}`,
        },
      ],
    });

    const rawText = msg.content[0].type === "text" ? msg.content[0].text.trim() : "{}";

    let result: FeedbackResult;
    try {
      const cleaned = rawText.replace(/^```[a-z]*\n?/, "").replace(/\n?```$/, "").trim();
      result = JSON.parse(cleaned) as FeedbackResult;
    } catch {
      result = {
        correct: false,
        partial: false,
        feedback: "Die Antwort konnte nicht ausgewertet werden. Bitte erneut versuchen.",
        hint: null,
      };
    }

    return NextResponse.json(result);
  } catch (err) {
    console.error("[dokument-pruefen/evaluate]", err);
    return NextResponse.json(
      { correct: false, partial: false, feedback: "Technischer Fehler – bitte erneut versuchen.", hint: null },
      { status: 500 }
    );
  }
}
