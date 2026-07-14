import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

type FieldId = "belehnung" | "eigenmittel" | "amort-rate";

interface ErrorContext {
  field: string;
  shown: string;
  correct: string;
  type: string;
}

const ERROR_CONTEXT: Record<FieldId, ErrorContext> = {
  belehnung: {
    field: "Belehnung (LTV)",
    shown: "78.0 %",
    correct:
      "82.0 % (CHF 779'000 ÷ CHF 950'000 = 0.820). Die Belehnung überschreitet zudem die Schweizer Obergrenze von 80 % – der Antrag müsste in dieser Form abgelehnt werden.",
    type: "Rechenfehler + Grenzwertverletzung (80%-Regel)",
  },
  eigenmittel: {
    field: "Pensionskassen-Vorbezug (BVG) – Eigenmittel-Dokumentation",
    shown: "CHF 72'000 PK-Vorbezug mit ✓ Eigenmittel markiert",
    correct:
      "PK-Vorbezüge sind grundsätzlich als Eigenmittel zulässig. Es fehlt aber die Dokumentation, dass mindestens 10 % des Kaufpreises (CHF 95'000) aus echten Eigenmitteln ohne Pensionskasse stammen. Das Bankguthaben von CHF 99'000 erfüllt dies knapp, aber der 10%-Nachweis ist im Dossier nicht dokumentiert.",
    type: "Dokumentationsfehler (10%-Eigenmittel-Nachweis fehlt)",
  },
  "amort-rate": {
    field: "Amortisationsrate p.a. – Laufzeit der 2. Hypothek",
    shown: "CHF 9'733 (2. Hypothek über 15 Jahre)",
    correct:
      "Hans Müller (geb. 12.03.1971) ist 55 Jahre alt und pensioniert sich mit 65. Die 2. Hypothek muss spätestens bei Pensionierung amortisiert sein – die maximale Frist beträgt daher 10 Jahre, nicht 15. Die korrekte Jahresrate wäre CHF 146'000 ÷ 10 = CHF 14'600 (statt CHF 9'733).",
    type: "Fristfehler (Amortisationsfrist überschreitet Zeitraum bis Pensionierung)",
  },
};

interface FeedbackResult {
  correct: boolean;
  partial: boolean;
  feedback: string;
  hint: string | null;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { errorId: string; correction: string };
    const { errorId, correction } = body;

    if (!(errorId in ERROR_CONTEXT)) {
      return NextResponse.json({ error: "Ungültige Feld-ID" }, { status: 400 });
    }

    const ctx = ERROR_CONTEXT[errorId as FieldId];
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const msg = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 400,
      messages: [
        {
          role: "user",
          content: `Du bist ein Lerncoach für Schweizer Bankfachleute (KV-Ausbildung, Niveau Lehrling/Auszubildende).

Kontext – Hypothekarantrag Familie Müller:
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

    const rawText =
      msg.content[0].type === "text" ? msg.content[0].text.trim() : "{}";

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
    console.error("[test-interactive/evaluate]", err);
    return NextResponse.json(
      {
        correct: false,
        partial: false,
        feedback: "Technischer Fehler – bitte erneut versuchen.",
        hint: null,
      },
      { status: 500 }
    );
  }
}
