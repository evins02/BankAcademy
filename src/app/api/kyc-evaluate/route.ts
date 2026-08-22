import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import type { KycFormData } from "@/components/modules/kyc-form/kyc-form-types";

type Message = { role: string; content: string };

export const runtime = "edge";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

function buildSystemPrompt(): string {
  const today = new Date().toLocaleDateString("de-CH", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  return `Du bist ein erfahrener Compliance-Experte einer Schweizer Bank.
Prüfe das KYC-Gespräch und das ausgefüllte Formular für Neukunde Thomas Kowalski.

ECHTE KUNDENDATEN:
- Name: Thomas Kowalski, geb. 14.06.1985, Polnisch
- Wohnsitz: Bergstrasse 22, 3007 Bern
- Beruf: Projektleiter IT, Swisscom AG, 100%
- Zivilstand: Verheiratet, 2 Kinder
- Einkommen: CHF 95'000/Jahr netto, Vermögen ca. CHF 45'000
- Herkunft: Lohn, andere Banken: PostFinance
- Zweck: Lohnkonto + Zahlungsverkehr, WiBe: selbst, PEP: Nein, keine US-Verbindung
- Ausweis: Ausländischer Reisepass X1234567, gültig bis 14.05.2027 (Demo-Falle: Formular oft mit 12.03.2024 vorausgefüllt → abgelaufen)

TEIL 1 – GESPRÄCH (9 Pflichtfragen):
Prüfe ob der Kundenberater folgende Fragen gestellt hat:
1. Beruf & Arbeitgeber
2. Einkommen & Vermögen
3. Herkunft der Mittel
4. Andere Bankbeziehungen
5. Zweck der Kontobeziehung
6. Wirtschaftlich Berechtigter
7. PEP Status
8. FATCA / US-Verbindungen
9. Ausweis eingesehen

TEIL 2 – FORMULAR (8 Prüfpunkte):
P1. Personalien vollständig
P2. Ausweis dokumentiert (Typ + Nummer + vorhanden)
P3. Ausweis GÜLTIG (ausweisGueltigBis muss nach ${today} liegen; 12.03.2024 = abgelaufen → FEHLER; korrekt: 14.05.2027)
P4. Berufliche Angaben vollständig
P5. Finanzielle Angaben vollständig
P6. Compliance vollständig (WiBe, PEP, Zweck, Art)
P7. Formular A ausgefüllt (formularAAusgefuellt = true; sonst KRITISCHER FEHLER)
P8. FATCA vollständig

Antworte NUR als gültiges JSON (kein Markdown):
{
  "result": "BESTANDEN" oder "NICHT BESTANDEN",
  "conversationAsked": ["Label der gestellten Pflichtfragen"],
  "conversationMissing": ["Label der fehlenden Pflichtfragen"],
  "formErrors": [{"field": "Feldbezeichnung", "message": "Erklärung + Rechtsgrundlage auf Deutsch"}],
  "formCorrect": ["Beschreibung korrekt ausgefüllter Punkte"],
  "criticalErrors": ["Kritische Fehler die zur Ablehnung führen"],
  "conversationScore": <0-9>,
  "conversationTotal": 9,
  "formScore": <0-8>,
  "formTotal": 8,
  "feedback": "3-4 Sätze Ausbildner-Feedback auf Deutsch"
}

BESTANDEN nur wenn conversationScore = 9 UND formScore = 8.`;
}

export async function POST(req: Request) {
  try {
    const { messages, formData } = (await req.json()) as {
      messages: Message[];
      formData: KycFormData;
    };

    const transcript = messages
      .map((m) => `${(m.role === "student" || m.role === "user") ? "Berater" : "Kunde"}: ${m.content}`)
      .join("\n");

    const response = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1600,
      system: buildSystemPrompt(),
      messages: [
        {
          role: "user",
          content: `GESPRÄCHSPROTOKOLL:\n${transcript}\n\nKYC-FORMULAR:\n${JSON.stringify(formData, null, 2)}`,
        },
      ],
    });

    const text = response.content[0].type === "text" ? response.content[0].text : "";
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("No JSON");

    return NextResponse.json(JSON.parse(match[0]));
  } catch (error) {
    console.error("KYC evaluate API error:", error);
    return NextResponse.json({ error: "API call failed" }, { status: 500 });
  }
}
