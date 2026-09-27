import Anthropic from "@anthropic-ai/sdk";
import type { SubmoduleCase, LevelNum, OptionKey } from "@/lib/anlage-submodule-types";

const client = new Anthropic();

const LEVEL_DESC: Record<LevelNum, string> = {
  1: "Basis – Definitionen, Grundbegriffe, einfache Zusammenhänge",
  2: "Anwendung – Berechnung, Analyse, Entscheidung in konkreten Situationen",
  3: "Experte – Komplexe Fallanalyse, Querverbindungen, QV-Abschlussprüfungsniveau",
};

function generateId(moduleKey: string, level: number): string {
  const hex = Math.random().toString(16).slice(2, 8);
  return `gen-${moduleKey}-l${level}-${hex}`;
}

function buildPrompt(
  moduleKey: string,
  moduleLabel: string,
  topic: string,
  level: LevelNum,
  scenarioId: string,
): string {
  return `Du bist Fachexperte für die Schweizer Banklehre (KV-Lehre, QV Bankkauffrau/-mann).
Erstelle ein realistisches Multiple-Choice-Prüfungsszenario für:

Modul: ${moduleLabel}
Thema: ${topic}
Schwierigkeitsniveau: ${level}/3 – ${LEVEL_DESC[level]}
Szenario-ID: ${scenarioId}

Anforderungen:
- Situationstext: 2–4 Sätze, realistischer Kontext im Schweizer Banking
- Frage: präzise und eindeutig
- 4 Antwortoptionen (A–D), genau eine korrekt, falsche Optionen plausibel aber klar unterscheidbar
- Feedback: 2–3 Sätze, erklärt warum die Antwort richtig ist
- Rechtsbezug falls relevant: GwG, ZGB, OR, FINMA-Richtlinien, QV-Lernziele

Antworte NUR mit validem JSON (kein Markdown, keine Erklärungen):
{
  "id": "${scenarioId}",
  "level": ${level},
  "title": "kurzer prägnanter Titel (max 60 Zeichen)",
  "situation": "Situationstext…",
  "question": "Frage…",
  "options": [
    {"key": "A", "text": "…"},
    {"key": "B", "text": "…"},
    {"key": "C", "text": "…"},
    {"key": "D", "text": "…"}
  ],
  "correct": "A",
  "feedback": "Erklärung der richtigen Antwort…",
  "warum": "Tieferes Verständnis / Hintergrundwissen (optional, 1–2 Sätze)",
  "merksatz": "Kurzer Merksatz zum Einprägen"
}`;
}

export async function generateScenario(
  moduleKey: string,
  moduleLabel: string,
  topic: string,
  level: LevelNum,
): Promise<SubmoduleCase | null> {
  const scenarioId = generateId(moduleKey, level);
  const prompt = buildPrompt(moduleKey, moduleLabel, topic, level, scenarioId);

  try {
    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1024,
      messages: [{ role: "user", content: prompt }],
    });

    const text = response.content
      .filter((b) => b.type === "text")
      .map((b) => (b as { type: "text"; text: string }).text)
      .join("");

    // Strip any accidental markdown fences
    const cleaned = text.replace(/^```json?\s*/i, "").replace(/\s*```\s*$/, "").trim();
    const parsed = JSON.parse(cleaned);

    // Minimal validation
    if (
      typeof parsed.id !== "string" ||
      typeof parsed.title !== "string" ||
      typeof parsed.situation !== "string" ||
      typeof parsed.question !== "string" ||
      !Array.isArray(parsed.options) ||
      parsed.options.length !== 4 ||
      !["A", "B", "C", "D"].includes(parsed.correct)
    ) {
      console.error("[generate] invalid shape", parsed);
      return null;
    }

    return parsed as SubmoduleCase;
  } catch (err) {
    console.error("[generate] failed for", moduleKey, topic, level, err);
    return null;
  }
}
