import { type LückentextCase } from "./lückentext";
import { type OffeneFrageCase } from "./offene-frage";
import { OF_CASES_BLANKOKREDIT } from "./offene-fragen";

export type OptionKey = "A" | "B" | "C" | "D";
export type LevelNum = 1 | 2 | 3;

export interface BlankokreditOption {
  key: OptionKey;
  text: string;
}

export type CalculatorRow =
  | { type: "data"; label: string; value: string }
  | { type: "divider" }
  | { type: "total"; label: string; value: string };

export interface CalculatorSection {
  heading?: string;
  rows: CalculatorRow[];
  verdict?: { text: string; ok: boolean; warning?: boolean };
}

export interface BlankokreditCase {
  id: string;
  level: LevelNum;
  briefing: string;
  inputData?: { label: string; value: string }[];
  calculator?: CalculatorSection[];
  question: string;
  options: BlankokreditOption[];
  correct: OptionKey;
  feedback: string;
}

export interface BlankokreditLevelConfig {
  level: LevelNum;
  label: string;
  badgeVariant: "green" | "orange" | "red";
  cases: (BlankokreditCase | LückentextCase | OffeneFrageCase)[];
}

export const MERKSATZ =
  "Kreditfähigkeit ist gegeben, wenn sämtliche Konsumkreditverpflichtungen innert 3 Jahren aus dem verfügbaren Freibetrag zurückbezahlt werden können.";

export const BK_LEVELS: BlankokreditLevelConfig[] = [
  {
    level: 1,
    label: "Einsteiger",
    badgeVariant: "green",
    cases: [
      {
        id: "1.1",
        level: 1,
        briefing: "Kunde Kevin Huber, ledig, keine Kinder, möchte Konsumkredit CHF 18'000.",
        inputData: [
          { label: "Nettoeinkommen", value: "CHF 5'200" },
          { label: "Partnereinkommen", value: "keines" },
          { label: "Miete", value: "CHF 1'400" },
          { label: "Krankenkasse", value: "CHF 380" },
          { label: "Fahrkosten", value: "CHF 200" },
          { label: "Steuern", value: "CHF 300" },
          { label: "Bestehende Kredite", value: "keine" },
        ],
        calculator: [
          {
            rows: [
              { type: "data", label: "Einkommen", value: "CHF 5'200" },
              { type: "data", label: "− Grundbetrag", value: "CHF 1'200" },
              { type: "data", label: "− Miete", value: "CHF 1'400" },
              { type: "data", label: "− Krankenkasse", value: "CHF 380" },
              { type: "data", label: "− Fahrkosten", value: "CHF 200" },
              { type: "data", label: "− Steuern", value: "CHF 300" },
              { type: "divider" },
              { type: "total", label: "Freibetrag", value: "CHF 1'720" },
            ],
          },
          {
            heading: "Kreditfähigkeit",
            rows: [
              { type: "data", label: "Neuer Kredit", value: "CHF 18'000" },
              { type: "data", label: "÷ 36 Monate", value: "= CHF 500 / Monat" },
            ],
            verdict: { text: "CHF 500 ≤ CHF 1'720 – Kreditfähigkeit gegeben ✅", ok: true },
          },
        ],
        question: "Was ist dein Entscheid?",
        options: [
          { key: "A", text: "Ablehnen – zu hohes Risiko" },
          {
            key: "B",
            text: "Bewilligen – Kreditfähigkeit gegeben. Monatliche Amortisation CHF 500 liegt unter Freibetrag CHF 1'720.",
          },
          { key: "C", text: "Zurückweisen – Unterlagen fehlen" },
          { key: "D", text: "Teilbewilligung CHF 10'000" },
        ],
        correct: "B",
        feedback:
          "Kreditfähigkeit klar gegeben. Freibetrag CHF 1'720 deckt Amortisation CHF 500 problemlos. Bewilligung möglich.",
      },
      {
        id: "1.2",
        level: 1,
        briefing: "Kundin Lisa Meier, ledig, möchte Kredit CHF 30'000.",
        inputData: [
          { label: "Nettoeinkommen", value: "CHF 4'200" },
          { label: "Partnereinkommen", value: "keines" },
          { label: "Miete", value: "CHF 1'600" },
          { label: "Krankenkasse", value: "CHF 420" },
          { label: "Fahrkosten", value: "CHF 300" },
          { label: "Steuern", value: "CHF 250" },
          { label: "Bestehende Kredite", value: "CHF 8'000 (Leasing)" },
        ],
        calculator: [
          {
            rows: [
              { type: "data", label: "Einkommen", value: "CHF 4'200" },
              { type: "data", label: "− Grundbetrag", value: "CHF 1'200" },
              { type: "data", label: "− Miete", value: "CHF 1'600" },
              { type: "data", label: "− Krankenkasse", value: "CHF 420" },
              { type: "data", label: "− Fahrkosten", value: "CHF 300" },
              { type: "data", label: "− Steuern", value: "CHF 250" },
              { type: "divider" },
              { type: "total", label: "Freibetrag", value: "CHF 430" },
            ],
          },
          {
            heading: "Kreditfähigkeit",
            rows: [
              { type: "data", label: "Bestehend (Leasing)", value: "CHF 8'000" },
              { type: "data", label: "Neuer Kredit", value: "CHF 30'000" },
              { type: "total", label: "Total", value: "CHF 38'000" },
              { type: "data", label: "÷ 36 Monate", value: "= CHF 1'056 / Monat" },
            ],
            verdict: {
              text: "CHF 1'056 > CHF 430 – Kreditfähigkeit nicht gegeben ❌",
              ok: false,
            },
          },
        ],
        question: "Was ist dein Entscheid?",
        options: [
          { key: "A", text: "Bewilligen – Einkommen vorhanden" },
          {
            key: "B",
            text: "Ablehnen – Kreditfähigkeit nicht gegeben. Monatliche Amortisation CHF 1'056 übersteigt Freibetrag CHF 430 massiv.",
          },
          { key: "C", text: "Teilbewilligung" },
          { key: "D", text: "Zurückweisen" },
        ],
        correct: "B",
        feedback:
          "Kreditfähigkeit klar nicht gegeben. Freibetrag CHF 430 reicht nicht für Amortisation CHF 1'056. Ablehnung zwingend.",
      },
      {
        id: "1.3",
        level: 1,
        briefing:
          "Kunde kommt für Kredit CHF 15'000. Im ZEK siehst du: er hat bereits eine Kreditkarte mit Limit CHF 10'000 und ein Leasing CHF 12'000.",
        question: "Was berücksichtigst du bei der Kreditfähigkeitsprüfung?",
        options: [
          { key: "A", text: "Nur den neuen Kredit" },
          { key: "B", text: "Nur die bestehenden Kredite" },
          {
            key: "C",
            text: "Alle Konsumkreditverpflichtungen: Kreditkarte CHF 10'000 + Leasing CHF 12'000 + Neuer Kredit CHF 15'000 = Total CHF 37'000",
          },
          { key: "D", text: "ZEK ist nicht relevant" },
        ],
        correct: "C",
        feedback:
          "Im ZEK sind ALLE bestehenden Konsumkreditverpflichtungen sichtbar. Diese müssen alle berücksichtigt werden – nicht nur der neue Kredit. Total CHF 37'000 ÷ 36 = CHF 1'028 / Monat.",
      },
    ],
  },
  {
    level: 2,
    label: "Fortgeschritten",
    badgeVariant: "orange",
    cases: [
      {
        id: "2.1",
        level: 2,
        briefing: "Ehepaar möchte Kredit CHF 25'000. Kreditnehmer ist der Mann.",
        inputData: [
          { label: "Einkommen Mann", value: "CHF 5'800 (59%)" },
          { label: "Einkommen Frau", value: "CHF 4'000 (41%)" },
          { label: "Gesamteinkommen", value: "CHF 9'800" },
          { label: "Miete", value: "CHF 2'200" },
          { label: "Krankenkasse", value: "CHF 800 (beide)" },
          { label: "Fahrkosten", value: "CHF 400" },
          { label: "Steuern", value: "CHF 600" },
          { label: "Kinder", value: "1 Kind" },
          { label: "Bestehende Kredite", value: "keine" },
        ],
        calculator: [
          {
            heading: "Anteil Kreditnehmer (59%)",
            rows: [
              { type: "data", label: "Einkommen (59% von CHF 9'800)", value: "CHF 5'782" },
              { type: "data", label: "− Grundbetrag Ehepaar", value: "CHF 1'700" },
              { type: "data", label: "− Kind", value: "CHF 400" },
              { type: "data", label: "− Miete (59%)", value: "CHF 1'298" },
              { type: "data", label: "− Krankenkasse (59%)", value: "CHF 472" },
              { type: "data", label: "− Fahrkosten (59%)", value: "CHF 236" },
              { type: "data", label: "− Steuern (59%)", value: "CHF 354" },
              { type: "divider" },
              { type: "total", label: "Freibetrag", value: "CHF 1'322" },
            ],
          },
          {
            heading: "Kreditfähigkeit",
            rows: [
              { type: "data", label: "Neuer Kredit", value: "CHF 25'000" },
              { type: "data", label: "÷ 36 Monate", value: "= CHF 694 / Monat" },
            ],
            verdict: { text: "CHF 694 ≤ CHF 1'322 – Kreditfähigkeit gegeben ✅", ok: true },
          },
        ],
        question: "Was ist dein Entscheid?",
        options: [
          { key: "A", text: "Gesamteinkommen CHF 9'800 für die Berechnung nehmen" },
          { key: "B", text: "Nur Einkommen Mann CHF 5'800 nehmen" },
          {
            key: "C",
            text: "Proportionalen Anteil des Kreditnehmers berechnen: 59% = CHF 5'782. Kreditfähigkeit gegeben.",
          },
          { key: "D", text: "Durchschnitt beider Einkommen nehmen" },
        ],
        correct: "C",
        feedback:
          "Bei Ehepaaren wird der proportionale Anteil des Kreditnehmers berechnet. Nicht das volle Gesamteinkommen und nicht nur sein eigenes Einkommen.",
      },
      {
        type: "lückentext",
        id: "2.2",
        level: 2,
        briefing:
          "Kunde möchte Kredit CHF 40'000 mit Laufzeit 5 Jahre. Er sagt: «Bei 5 Jahren sind das nur CHF 667 pro Monat – das ist doch günstig!»",
        question:
          "Die Kreditfähigkeitsprüfung erfolgt immer über ___ Monate – unabhängig von der Vertragslaufzeit.",
        answer: "36",
        unit: "Monate",
        feedback:
          "WICHTIG: Die Amortisationsprüfung erfolgt IMMER über 36 Monate – auch wenn der Vertrag 5 Jahre läuft. Das ist eine klassische Trickfrage in der LAP!",
      },
      {
        id: "2.3",
        level: 2,
        briefing: "Kunde möchte Kredit CHF 20'000. Der berechnete Freibetrag beträgt CHF 580.",
        calculator: [
          {
            heading: "Kreditfähigkeit",
            rows: [
              { type: "data", label: "Freibetrag", value: "CHF 580" },
              { type: "data", label: "Neuer Kredit", value: "CHF 20'000" },
              { type: "data", label: "÷ 36 Monate", value: "= CHF 556 / Monat" },
            ],
            verdict: {
              text: "CHF 556 ≤ CHF 580 – knapp, Kreditfähigkeit gegeben ✅",
              ok: true,
              warning: true,
            },
          },
        ],
        question: "Was machst du?",
        options: [
          { key: "A", text: "Ablehnen – zu knapp" },
          {
            key: "B",
            text: "Bewilligen – Kreditfähigkeit ist gegeben. CHF 556 ≤ CHF 580. Knapp aber klar innerhalb der Limite.",
          },
          { key: "C", text: "Teilbewilligung CHF 18'000" },
          { key: "D", text: "Weitere Unterlagen anfordern" },
        ],
        correct: "B",
        feedback:
          "Kreditfähigkeit ist gegeben – auch wenn knapp. Solange Amortisation unter Freibetrag liegt, ist Bewilligung möglich. Kein Ermessensspielraum bei klarer Regel.",
      },
    ],
  },
  {
    level: 3,
    label: "LAP-Niveau",
    badgeVariant: "red",
    cases: [
      {
        id: "3.1",
        level: 3,
        briefing: "Kunde Marco Ferretti, verheiratet, 2 Kinder, möchte Kredit CHF 35'000.",
        inputData: [
          { label: "Einkommen Marco", value: "CHF 6'200 (67%)" },
          { label: "Einkommen Frau", value: "CHF 3'000 (33%)" },
          { label: "Miete", value: "CHF 1'900" },
          { label: "Krankenkasse", value: "CHF 900" },
          { label: "Fahrkosten", value: "CHF 400" },
          { label: "Steuern", value: "CHF 700" },
          { label: "Unterhalt ex-Frau", value: "CHF 600" },
          { label: "Leasing", value: "CHF 12'000" },
          { label: "Kreditkarte Limit", value: "CHF 8'000" },
          { label: "Neuer Kredit", value: "CHF 35'000" },
        ],
        calculator: [
          {
            heading: "Anteil Marco (67%)",
            rows: [
              { type: "data", label: "Einkommen", value: "CHF 6'200" },
              { type: "data", label: "− Grundbetrag Ehepaar", value: "CHF 1'700" },
              { type: "data", label: "− 2 Kinder (2 × 400)", value: "CHF 800" },
              { type: "data", label: "− Miete (67%)", value: "CHF 1'273" },
              { type: "data", label: "− Krankenkasse (67%)", value: "CHF 603" },
              { type: "data", label: "− Fahrkosten (67%)", value: "CHF 268" },
              { type: "data", label: "− Steuern (67%)", value: "CHF 469" },
              { type: "data", label: "− Unterhaltsbeiträge", value: "CHF 600" },
              { type: "divider" },
              { type: "total", label: "Freibetrag", value: "CHF 487" },
            ],
          },
          {
            heading: "Total Konsumkredite",
            rows: [
              { type: "data", label: "Leasing", value: "CHF 12'000" },
              { type: "data", label: "Kreditkarte", value: "CHF 8'000" },
              { type: "data", label: "Neuer Kredit", value: "CHF 35'000" },
              { type: "total", label: "Total", value: "CHF 55'000" },
              { type: "data", label: "÷ 36 Monate", value: "= CHF 1'528 / Monat" },
            ],
            verdict: {
              text: "CHF 1'528 > CHF 487 – Kreditfähigkeit nicht gegeben ❌",
              ok: false,
            },
          },
        ],
        question: "Was ist dein Entscheid?",
        options: [
          { key: "A", text: "Bewilligen – Einkommen hoch genug" },
          { key: "B", text: "Teilbewilligung CHF 10'000" },
          {
            key: "C",
            text: "Ablehnen – Kreditfähigkeit nicht gegeben. Amortisation CHF 1'528 massiv über Freibetrag CHF 487.",
          },
          { key: "D", text: "Zurückweisen – Unterlagen prüfen" },
        ],
        correct: "C",
        feedback:
          "Trotz gutem Einkommen: Hohe Fixkosten, Unterhalt und bestehende Kredite fressen den Freibetrag auf. Ablehnung zwingend. ZEK-Einträge sorgfältig prüfen!",
      },
      {
        type: "lückentext",
        id: "3.2",
        level: 3,
        briefing:
          "Freibetrag: CHF 800. Keine bestehenden Kredite. Kunde fragt: «Wie viel Kredit kann ich maximal bekommen?»",
        question:
          "Maximaler Kredit = CHF 800 × 36 Monate = CHF ___",
        answer: "28800",
        unit: "CHF",
        tolerance: 1,
        feedback:
          "Maximaler Kredit = Freibetrag × 36 Monate. CHF 800 × 36 = CHF 28'800. Das ist die Obergrenze der Kreditfähigkeit.",
      },
      {
        id: "3.3",
        level: 3,
        briefing:
          "Kunde hat Freibetrag CHF 1'000. Bestehender Kredit CHF 18'000. Er möchte zusätzlich CHF 15'000.",
        calculator: [
          {
            heading: "Total Konsumkredite",
            rows: [
              { type: "data", label: "Bestehend", value: "CHF 18'000" },
              { type: "data", label: "Neu", value: "CHF 15'000" },
              { type: "total", label: "Total", value: "CHF 33'000" },
              { type: "data", label: "÷ 36 Monate", value: "= CHF 917 / Monat" },
            ],
            verdict: { text: "CHF 917 ≤ CHF 1'000 – Kreditfähigkeit gegeben ✅", ok: true },
          },
          {
            heading: "Zur Information",
            rows: [
              { type: "data", label: "Bestehender Kredit allein", value: "CHF 18'000" },
              { type: "data", label: "÷ 36 Monate", value: "= CHF 500 / Monat" },
            ],
          },
        ],
        question: "Ist Kreditfähigkeit gegeben?",
        options: [
          { key: "A", text: "Nein – bestehender Kredit reicht allein schon" },
          {
            key: "B",
            text: "Ja – CHF 917 ≤ CHF 1'000. Kreditfähigkeit für Gesamtbetrag CHF 33'000 gegeben.",
          },
          { key: "C", text: "Nur CHF 10'000 bewilligen" },
          { key: "D", text: "Bestehenden Kredit zuerst ablösen" },
        ],
        correct: "B",
        feedback:
          "Entscheidend ist immer der TOTAL-Betrag aller Kredite geteilt durch 36. Nicht jeder Kredit einzeln. CHF 33'000 ÷ 36 = CHF 917 ≤ Freibetrag CHF 1'000 = Kreditfähigkeit gegeben.",
      },
    ],
  },
];

OF_CASES_BLANKOKREDIT.forEach((c) => {
  BK_LEVELS.find((l) => l.level === c.level)!.cases.push(c);
});
