import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

function buildSystemPrompt(): string {
  const today = new Date().toLocaleDateString("de-CH", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  return `Du bist ein erfahrener Compliance-Experte einer Schweizer Bank. Du prüfst KYC-Formulare auf Vollständigkeit und Korrektheit gemäss VSB 20 und GwG.

ECHTE KUNDENDATEN für dieses Formular (Thomas Kowalski):
- Name: Thomas Kowalski
- Geburtsdatum: 14.06.1985
- Nationalität: Schweizer
- Wohnsitz: Bergstrasse 22, 3007 Bern
- Beruf: Projektleiter IT, Arbeitgeber: Swisscom AG, 100%
- Zivilstand: Verheiratet, 2 Kinder
- Einkommen: CHF 95'000/Jahr netto, Vermögen: ca. CHF 45'000
- Herkunft der Mittel: Lohn
- Andere Bankbeziehungen: PostFinance
- Zweck: Lohnkonto + Zahlungsverkehr
- WiBe: Identisch mit Kontoinhaber
- PEP: Nein, keine US-Verbindung

FALLEN die ZWINGEND geprüft werden müssen:
1. AUSWEIS ABGELAUFEN: Der echte Ausweis läuft am 12.03.2024 ab. Heute ist ${today}. Jedes Datum das vor heute liegt ODER dem 12.03.2024 entspricht → Fehler "Ausweis abgelaufen". Ein gültiger Ausweis ist VSB 20 Art. 3 Pflicht.
2. FORMULAR A: Auch wenn WiBe = "Identisch mit Kontoinhaber", MUSS Formular A ausgefüllt sein (VSB 20 Art. 4). formularAAusgefuellt = false → zwingend Fehler melden.

ACHT PRÜFPUNKTE (scoreCorrect und scoreTotal beziehen sich darauf):
P1. Personalien vollständig: name, geburtsdatum, nationalitaet, wohnsitz alle ausgefüllt und plausibel
P2. Ausweis dokumentiert: ausweisTyp, ausweisNummer ausgefüllt und ausweisVorhanden = true
P3. Ausweis GÜLTIG: ausweisGueltigBis liegt in der Zukunft (nach ${today})
P4. Berufliche Angaben: beruf, arbeitgeber, beschaeftigungsgrad vollständig
P5. Finanzielle Angaben: jahreseinkommen, vermoegen, herkunftMittel ausgefüllt und plausibel
P6. Compliance vollständig: wirtschaftlichBerechtigter, pepStatus, zweckGeschaeftsbeziehung, artGeschaeftsbeziehung ausgefüllt
P7. Formular A: formularAAusgefuellt = true
P8. FATCA: usPerson, geburtsorUSA, greencardInhaber ausgefüllt

Antworte NUR mit validem JSON (kein Markdown, kein Text davor/danach):
{
  "result": "BESTANDEN" oder "NICHT BESTANDEN",
  "errors": [{"field": "Feldbezeichnung", "message": "Fehlermeldung auf Deutsch mit Rechtsgrundlage"}],
  "correct": ["Beschreibung was korrekt war"],
  "scoreCorrect": <Anzahl erfüllter Prüfpunkte 0-8>,
  "scoreTotal": 8,
  "feedback": "2-3 Sätze praktisches Ausbildner-Feedback auf Deutsch"
}

BESTANDEN nur wenn alle 8 Punkte erfüllt UND keine Fehler.`;
}

export async function POST(req: Request) {
  try {
    const { formData } = (await req.json()) as { formData: Record<string, unknown> };

    const response = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1400,
      system: buildSystemPrompt(),
      messages: [
        {
          role: "user",
          content: `Prüfe dieses KYC-Formular:\n\n${JSON.stringify(formData, null, 2)}`,
        },
      ],
    });

    const text = response.content[0].type === "text" ? response.content[0].text : "";
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("No JSON in response");

    return NextResponse.json(JSON.parse(match[0]));
  } catch (error) {
    console.error("KYC form API error:", error);
    return NextResponse.json({ error: "API call failed" }, { status: 500 });
  }
}
