import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

const client = new Anthropic();

type Verdict = "RICHTIG" | "TEILWEISE" | "FALSCH";

interface AiResult {
  verdict: Verdict;
  richtig: string;
  fehlt: string;
  ideal: string;
}

const FALLBACK: AiResult = {
  verdict: "TEILWEISE",
  richtig: "Deine Antwort wurde gespeichert.",
  fehlt: "Vergleiche deine Antwort mit der Erklärung unten.",
  ideal: "Lies die Erklärung sorgfältig durch.",
};

const NO_STORE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
};

function jsonNoStore(body: unknown) {
  return NextResponse.json(body, { headers: NO_STORE_HEADERS });
}

export async function POST(req: NextRequest) {
  const { feedback, studentText } = await req.json();

  if (!studentText?.trim()) {
    return jsonNoStore(FALLBACK);
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
{"verdict":"RICHTIG"|"TEILWEISE"|"FALSCH","richtig":"Was der Lernende korrekt erfasst hat (1-2 Sätze) – schreibe '–' falls nichts korrekt war","fehlt":"Was fehlt oder ist ungenau (1-2 Sätze)","ideal":"Die ideale Kurz-Antwort (1-2 Sätze)"}

Regeln:
- verdict = RICHTIG: Kernaussage vollständig und korrekt erfasst
- verdict = TEILWEISE: Ansatz stimmt, aber wichtige Punkte fehlen oder sind ungenau
- verdict = FALSCH: Die Antwort ist inhaltlich falsch, irrelevant oder geht nicht auf die Frage ein
- Halte das Feedback kurz und klar
- Deutsch, Schweizer Schreibweise
- Wenn die Antwort sehr gut ist: fehlt = "Vollständig – nichts Wesentliches fehlt."
- Wenn der Lernende etwas überspringt oder nur oberflächlich antwortet, weise im fehlt-Feld darauf hin, dass das Verständnis der Begründungen im echten Bankalltag und in der Prüfung entscheidend ist`,
        },
      ],
    });

    const raw = (message.content[0] as { type: string; text: string }).text?.trim() ?? "";
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        const parsed = JSON.parse(jsonMatch[0]) as AiResult;
        if (parsed.richtig && parsed.fehlt && parsed.ideal) {
          const validVerdicts: Verdict[] = ["RICHTIG", "TEILWEISE", "FALSCH"];
          const verdict = validVerdicts.includes(parsed.verdict) ? parsed.verdict : "TEILWEISE";
          return jsonNoStore({ ...parsed, verdict });
        }
        return jsonNoStore({ ...FALLBACK, error: true, debugError: `Felder fehlen. raw=${raw.slice(0, 200)}` });
      } catch (e) {
        return jsonNoStore({ ...FALLBACK, error: true, debugError: `JSON.parse failed: ${String(e)}. raw=${raw.slice(0, 200)}` });
      }
    }
    return jsonNoStore({ ...FALLBACK, error: true, debugError: `Kein JSON im Modelloutput. raw=${raw.slice(0, 200)}` });
  } catch (e) {
    return jsonNoStore({ ...FALLBACK, error: true, debugError: `Anthropic call failed: ${String(e)}` });
  }
}
