import { type LückentextCase } from "./lückentext";
import { type OffeneFrageCase } from "./offene-frage";
import { OF_CASES_CREDIT_OPERATIONS } from "./offene-fragen";

export type OptionKey = "A" | "B" | "C" | "D";
export type LevelNum = 1 | 2 | 3;

export interface CreditOpsOption {
  key: OptionKey;
  text: string;
}

export type CalcRow =
  | { type: "data"; label: string; value: string }
  | { type: "divider" }
  | { type: "total"; label: string; value: string };

export interface CalcSection {
  heading?: string;
  rows: CalcRow[];
  verdict?: { text: string; ok: boolean };
}

export interface CreditOpsScenario {
  id: string;
  level: LevelNum;
  situation: string;
  calculator?: CalcSection[];
  checklist?: { label: string; ok: boolean }[];
  question: string;
  options: CreditOpsOption[];
  correct: OptionKey;
  feedback: string;
  concepts?: string[];
}

export interface CreditOpsLevelConfig {
  level: LevelNum;
  label: string;
  badgeVariant: "green" | "orange" | "red";
  scenarios: (CreditOpsScenario | LückentextCase | OffeneFrageCase)[];
}

export const CO_LEVELS: CreditOpsLevelConfig[] = [
  {
    level: 1,
    label: "Einsteiger",
    badgeVariant: "green",
    scenarios: [
      {
        id: "1.1",
        level: 1,
        situation:
          "Hypothekarkredit bewilligt. Grundpfand noch nicht eingetragen. Kunde fragt wann das Geld kommt.",
        question: "Wann kann ausgezahlt werden?",
        options: [
          { key: "A", text: "Sofort – Bewilligung reicht" },
          {
            key: "B",
            text: "Erst wenn Grundpfand eingetragen, alle Dokumente unterschrieben und Versicherungsnachweis vorliegt.",
          },
          { key: "C", text: "In 3 Tagen automatisch" },
          { key: "D", text: "Das entscheidet die Front" },
        ],
        correct: "B",
        feedback:
          "Auszahlung erst wenn alle Sicherheiten bestellt sind. Grundpfand muss im Grundbuch eingetragen sein bevor ausgezahlt wird.",
      },
      {
        id: "1.2",
        level: 1,
        situation:
          "Du prüfst Kreditdossier vor Auszahlung. Kreditvertrag ist vorhanden aber nur vom Kunden unterschrieben – Bankunterschrift fehlt.",
        question: "Was machst du?",
        options: [
          { key: "A", text: "Auszahlen – Kunde hat unterschrieben" },
          {
            key: "B",
            text: "Nicht auszahlen – Kreditvertrag muss von beiden Parteien unterschrieben sein.",
          },
          { key: "C", text: "Kollegen fragen" },
          { key: "D", text: "Nachträglich unterschreiben lassen und sofort auszahlen" },
        ],
        correct: "B",
        feedback:
          "Kreditvertrag wird erst rechtsgültig wenn beide Parteien unterschrieben haben. Auszahlung ohne vollständige Unterschriften ist nicht möglich.",
      },
      {
        id: "1.3",
        level: 1,
        situation: "Kredit wurde ausgezahlt. Wann muss eine Wiedervorlage gesetzt werden?",
        question: "Wann setzt du die Wiedervorlage?",
        options: [
          { key: "A", text: "Nie – Kredit ist erledigt" },
          { key: "B", text: "Nur bei Problemen" },
          {
            key: "C",
            text: "Bei jeder Kreditgewährung – regelmässige Überprüfung der Bonität und Sicherheiten.",
          },
          { key: "D", text: "Nach 10 Jahren" },
        ],
        correct: "C",
        feedback:
          "Wiedervorlage ist Pflicht bei jedem Kredit. Regelmässige Überprüfung der Bonität, Sicherheiten und Kundensituation. Bei ETP-Fällen ist die Wiedervorlage kürzer.",
      },
    ],
  },
  {
    level: 2,
    label: "Fortgeschritten",
    badgeVariant: "orange",
    scenarios: [
      {
        type: "lückentext",
        id: "2.1",
        level: 2,
        briefing:
          "Hypothek CHF 700'000 auf Objekt Verkehrswert CHF 900'000. Berechne den Blankoanteil.",
        question:
          "Die 1. Hypothek deckt bis zu ___ % des Verkehrswertes.",
        answer: "65",
        unit: "%",
        feedback:
          "Alles über 65% Belehnung ist 2. Hypothek = Blankoanteil. Dieser Blankoanteil muss innert 15 Jahren zurückbezahlt werden – direkt oder indirekt via 3a.",
      },
      {
        id: "2.2",
        level: 2,
        situation:
          "Firmenkredit CHF 200'000. Als Sicherheit wurde eine Bürgschaft des Inhabers vereinbart. Du findest: Bürgschaftsvertrag ist nicht unterschrieben.",
        question: "Was machst du?",
        options: [
          { key: "A", text: "Auszahlen – mündliche Zusage reicht" },
          {
            key: "B",
            text: "Nicht auszahlen – Bürgschaft muss schriftlich und unterschrieben vorliegen bevor ausgezahlt wird.",
          },
          { key: "C", text: "Teilauszahlung CHF 100'000" },
          { key: "D", text: "Ohne Bürgschaft auszahlen" },
        ],
        correct: "B",
        feedback:
          "Sicherheiten müssen vollständig bestellt sein vor Auszahlung. Bürgschaft ohne Unterschrift ist rechtlich nicht gültig.",
      },
      {
        id: "2.3",
        level: 2,
        situation:
          "Hypothek CHF 800'000. EK CHF 200'000 (25%). Kunde sagt EK ist vorhanden aber du siehst keinen Nachweis im Dossier.",
        question: "Was machst du?",
        options: [
          { key: "A", text: "Vertrauen – Kunde sagt es ist da" },
          {
            key: "B",
            text: "Nicht auszahlen – Eigenmittel müssen vor Auszahlung nachgewiesen sein (Kontoauszug, Depotauszug etc.).",
          },
          { key: "C", text: "Auszahlen und später prüfen" },
          { key: "D", text: "50% auszahlen" },
        ],
        correct: "B",
        feedback:
          "Eigenmittel müssen vor Auszahlung belegt sein. Kontoauszug oder Depotauszug als Nachweis. Ohne Nachweis keine Auszahlung – egal was der Kunde sagt.",
      },
    ],
  },
  {
    level: 3,
    label: "Challenge-Niveau",
    badgeVariant: "red",
    scenarios: [
      {
        id: "3.1",
        level: 3,
        situation: "Du prüfst Auszahlung Hypothek CHF 1'200'000. Checkliste:",
        checklist: [
          { label: "Kreditvertrag unterschrieben", ok: true },
          { label: "Grundpfand eingetragen", ok: true },
          { label: "Versicherungsnachweis", ok: false },
          { label: "Eigenmittel nachgewiesen", ok: true },
          { label: "Wiedervorlage gesetzt", ok: false },
        ],
        question: "Was machst du?",
        options: [
          { key: "A", text: "Auszahlen – das meiste ist da" },
          {
            key: "B",
            text: "Nicht auszahlen – 2 Punkte fehlen: Versicherungsnachweis und Wiedervorlage müssen vor Auszahlung erledigt sein.",
          },
          { key: "C", text: "Teilauszahlung" },
          { key: "D", text: "Vorgesetzten fragen" },
        ],
        correct: "B",
        feedback:
          "Alle Auszahlungsvoraussetzungen müssen erfüllt sein – keine Ausnahmen. Versicherungsnachweis und Wiedervorlage nachholen, dann auszahlen.",
      },
      {
        id: "3.2",
        level: 3,
        situation:
          "Kredit wurde als ETP bewilligt. Normaler Kredit hat Wiedervorlage 2 Jahre. Was gilt beim ETP?",
        question: "Welche Wiedervorlage gilt für ETP?",
        options: [
          { key: "A", text: "Gleich wie normaler Kredit" },
          { key: "B", text: "Keine Wiedervorlage nötig" },
          {
            key: "C",
            text: "Kürzere Wiedervorlage – ETP ist Ausnahmefall und muss häufiger überprüft werden.",
          },
          { key: "D", text: "5 Jahre Wiedervorlage" },
        ],
        correct: "C",
        feedback:
          "ETP = Regelverstoss mit Begründung. Deshalb kürzere Wiedervorlage als normal. Bank muss häufiger prüfen ob Situation sich verbessert hat.",
      },
      {
        id: "3.3",
        level: 3,
        situation:
          "Bank hat 1. Grundpfand CHF 500'000 und 2. Grundpfand CHF 200'000. Objekt wird für CHF 600'000 verkauft. Wie viel erhält die Bank?",
        question: "Wie viel erhält die Bank aus dem Verkauf?",
        options: [
          { key: "A", text: "CHF 700'000 – voller Betrag" },
          {
            key: "B",
            text: "CHF 600'000 – 1. Grundpfand wird voll bedient (CHF 500'000), 2. Grundpfand nur teilweise (CHF 100'000).",
          },
          { key: "C", text: "CHF 350'000 – je 50%" },
          { key: "D", text: "Nur 1. Grundpfand CHF 500'000" },
        ],
        correct: "B",
        feedback:
          "Rangfolge ist entscheidend. 1. Grundpfand wird zuerst bedient. CHF 500'000 für 1. Pfand, restliche CHF 100'000 für 2. Pfand. CHF 100'000 der 2. Hypothek sind ungedeckt.",
      },
    ],
  },
];

OF_CASES_CREDIT_OPERATIONS.forEach((c) => {
  CO_LEVELS.find((l) => l.level === c.level)!.scenarios.push(c);
});
