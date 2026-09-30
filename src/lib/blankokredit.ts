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
  concepts?: string[];
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
          { key: "A", text: "Bewilligen – Nettolohn CHF 4'200 ist stabil und die ZEK zeigt zum Zeitpunkt der Prüfung keine negativen Einträge." },
          {
            key: "B",
            text: "Zurückweisen mit Hinweis: In 6 Monaten neu einreichen, nach Abbau der Kreditkarte steigt der Freibetrag auf über CHF 800.",
          },
          { key: "C", text: "Teilbewilligung CHF 20'000 auf 36 Monate – Amortisation sinkt auf CHF 556 und passt damit in den Freibetrag." },
          { key: "D", text: "Ablehnen – Kreditfähigkeit nicht gegeben. Monatliche Amortisation CHF 1'056 übersteigt Freibetrag CHF 430 massiv." },
        ],
        correct: "D",
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
      {
        id: "1.4",
        level: 1,
        briefing:
          "Kunde möchte Kredit CHF 12'000. Du schaust in den ZEK und siehst einen negativen Eintrag: ein Kredit aus 2022 wurde 4 Monate nicht bezahlt, inzwischen aber beglichen.",
        question: "Was bedeutet das für den Kreditentscheid?",
        options: [
          { key: "A", text: "Ablehnen – negativer ZEK-Eintrag bedeutet automatische Ablehnung. Keine Ausnahme möglich." },
          { key: "B", text: "Ignorieren – da der Kredit bereits bezahlt ist, ist der Eintrag hinfällig. Für die Kreditfähigkeit zählt nur der aktuelle Stand der Verpflichtungen." },
          { key: "C", text: "Kreditfähigkeit trotzdem prüfen – negativer ZEK-Eintrag erhöht das Risiko, muss dokumentiert werden. Je nach Schwere und Zeitpunkt kann es trotzdem eine Bewilligung geben. Entscheid liegt beim zuständigen Kreditgeber." },
          { key: "D", text: "Kredit in kleinerer Höhe CHF 5'000 bewilligen – negative ZEK-Einträge reduzieren automatisch die maximale Kredithöhe auf ein Drittel des beantragten Betrags." },
        ],
        correct: "C",
        feedback:
          "Ein negativer ZEK-Eintrag ist kein automatischer Ablehnungsgrund, aber ein wichtiges Risikosignal. Er muss dokumentiert und bewertet werden. Entscheidend ist: Wie lange her? Wie schwerwiegend? Wurde es bereinigt? Die Kreditfähigkeitsprüfung läuft trotzdem nach dem Standardverfahren. Der Entscheid liegt beim zuständigen Kompetenzträger.",
      },
      {
        id: "1.5",
        level: 1,
        briefing:
          "Neukundin fragt: «Was ist eigentlich dieser Grundbetrag, den Sie von meinem Einkommen abziehen? Was ist darin enthalten?»",
        question: "Was erklärst du ihr?",
        options: [
          { key: "A", text: "«Der Grundbetrag deckt Miete und Nebenkosten – alles andere wie Essen und Kleidung müssen Sie separat angeben.»" },
          { key: "B", text: "«Der Grundbetrag ist ein pauschaler Abzug für den täglichen Lebensunterhalt: Lebensmittel, Kleidung, Körperpflege, Haushalt. Er wird vom Gesetz festgelegt und variiert nach Zivilstand (Alleinstehend CHF 1'200, Ehepaar CHF 1'700, Kind CHF 400 extra).»" },
          { key: "C", text: "«Der Grundbetrag ist eine interne Bankgrösse, die wir nicht detailliert offenlegen können. Er basiert auf statistischen Durchschnittsdaten und deckt alle Lebenshaltungskosten.»" },
          { key: "D", text: "«Der Grundbetrag deckt nur Steuern und Krankenkasse – Miete, Fahrkosten und Lebenshaltung erfassen wir separat.»" },
        ],
        correct: "B",
        feedback:
          "Der Grundbetrag (gemäss Konsumkreditgesetz KKG und Richtlinien) ist eine Pauschale für die laufenden Lebenshaltungskosten: Essen, Kleidung, Körperpflege, Haushalt. Er ist nicht verhandelbar und variiert nach Zivilstand: Alleinstehend CHF 1'200, Ehepaar CHF 1'700, pro Kind + CHF 400. Miete, Krankenkasse, Fahrkosten und Steuern werden separat abgezogen.",
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
          "WICHTIG: Die Amortisationsprüfung erfolgt IMMER über 36 Monate – auch wenn der Vertrag 5 Jahre läuft. Das ist eine klassische Trickfrage in der Prüfung!",
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
          { key: "A", text: "Bewilligen – Kreditfähigkeit ist gegeben. CHF 556 ≤ CHF 580. Knapp aber klar innerhalb der Limite." },
          {
            key: "B",
            text: "Ablehnen – zu knapp",
          },
          { key: "C", text: "Teilbewilligung CHF 18'000" },
          { key: "D", text: "Weitere Unterlagen anfordern" },
        ],
        correct: "A",
        feedback:
          "Kreditfähigkeit ist gegeben – auch wenn knapp. Solange Amortisation unter Freibetrag liegt, ist Bewilligung möglich. Kein Ermessensspielraum bei klarer Regel.",
      },
      {
        id: "2.4",
        level: 2,
        briefing:
          "Kunde hat eine Kreditkarte mit Limit CHF 15'000. Er sagt: «Ich nutze die Karte aber nie – die ist fast immer bei null. Kann man das Limit weglassen?»",
        question: "Was sagst du?",
        options: [
          { key: "A", text: "«Ja – wenn die Karte effektiv nicht genutzt wird, kann das Limit aus der Berechnung weggelassen werden. Wir nehmen den tatsächlich ausstehenden Betrag.»" },
          { key: "B", text: "«Nein – gemäss ZEK-Regelung und KKG wird das volle Kreditkartenlimit angerechnet, unabhängig davon wie viel aktuell aussteht. Das Limit ist die potenzielle Verpflichtung.»" },
          { key: "C", text: "«Nur wenn er die Karte kündigt vor der Kreditvergabe – dann verschwindet das Limit aus dem ZEK innert 30 Tagen und wird nicht mehr angerechnet.»" },
          { key: "D", text: "«Wir rechnen nur 50% des Limits an – das ist die branchenübliche Pauschale für Kreditkarten mit nachweislich tiefer Nutzung.»" },
        ],
        correct: "B",
        feedback:
          "Das volle Kreditkartenlimit wird immer angerechnet – nicht der aktuell ausstehende Betrag. Das Limit ist eine bestehende Kreditverpflichtung im Sinne des KKG. Wenn der Kunde das Limit kündigt, muss der Eintrag tatsächlich erst aus dem ZEK verschwinden, bevor er aus der Berechnung fällt. ZEK-Löschung dauert je nach Institut 30–90 Tage.",
      },
      {
        id: "2.5",
        level: 2,
        briefing:
          "Kundin hat ein Nebeneinkommen: Sie arbeitet samstags als Verkäuferin und verdient CHF 700/Monat extra. Ihr reguläres Nettoeinkommen beträgt CHF 3'800. Sie möchte Kredit CHF 15'000.",
        question: "Kannst du das Nebeneinkommen anrechnen?",
        options: [
          { key: "A", text: "Ja – alle nachgewiesenen Einkommensquellen können summiert werden. Total CHF 4'500 als Berechnungsgrundlage." },
          { key: "B", text: "Nur wenn das Nebeneinkommen durch Lohnabrechnungen der letzten 12 Monate belegt ist und als dauerhaft und regelmässig gilt – dann kann es angerechnet werden." },
          { key: "C", text: "Nein – Nebeneinkommen ist per Gesetz nicht anrechenbar. Nur das Haupteinkommen des Arbeitgebers mit unbefristetem Vertrag zählt zur Kreditfähigkeitsberechnung." },
          { key: "D", text: "Nur die Hälfte – Nebeneinkommen wird pauschal mit 50% angerechnet, da es als weniger stabil gilt als das Haupteinkommen." },
        ],
        correct: "B",
        feedback:
          "Nebeneinkommen kann angerechnet werden, wenn es: 1) regelmässig ist (nicht nur einmalig), 2) durch Belege nachgewiesen wird (Lohnabrechnungen 12 Monate), 3) voraussichtlich dauerhaft ist. Ein Gelegenheitsjob der letzten 2 Monate würde nicht reichen. Eine stabile Teilzeitstelle mit nachgewiesenen Bezügen über mindestens 1 Jahr hingegen schon.",
      },
    ],
  },
  {
    level: 3,
    label: "Challenge-Niveau",
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
          "Wie hoch ist der maximale Blankokredit für diesen Kunden? CHF ___",
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
            text: "Bestehenden Kredit zuerst ablösen",
          },
          { key: "C", text: "Nur CHF 10'000 bewilligen" },
          { key: "D", text: "Ja – CHF 917 ≤ CHF 1'000. Kreditfähigkeit für Gesamtbetrag CHF 33'000 gegeben." },
        ],
        correct: "D",
        feedback:
          "Entscheidend ist immer der TOTAL-Betrag aller Kredite geteilt durch 36. Nicht jeder Kredit einzeln. CHF 33'000 ÷ 36 = CHF 917 ≤ Freibetrag CHF 1'000 = Kreditfähigkeit gegeben.",
      },
      {
        id: "3.4",
        level: 3,
        briefing:
          "Kunde möchte Kredit CHF 25'000. Freibetrag: CHF 450. Amortisation: CHF 694/Monat → Kreditfähigkeit nicht gegeben. Sein Vater (64 Jahre, Nettoeinkommen CHF 7'000, keine Schulden) bietet sich als Bürge an.",
        question: "Was bewirkt die Bürgschaft des Vaters?",
        options: [
          { key: "A", text: "Die Bürgschaft ersetzt die Kreditfähigkeitsprüfung vollständig – wenn der Bürge ausreichend Einkommen hat, kann der Kredit bewilligt werden, auch wenn der Hauptkreditnehmer kreditunfähig ist." },
          { key: "B", text: "Die Bürgschaft verbessert die Sicherheit der Bank, hebt aber die gesetzliche Kreditfähigkeitsprüfung nicht auf. Ist der Hauptkreditnehmer kreditunfähig, muss abgelehnt werden – unabhängig von Bürgschaften." },
          { key: "C", text: "Der Vater kann als Mitschuldner aufgenommen werden. Dann werden beide Einkommen summiert und die Kreditfähigkeit neu berechnet – das ist bankintern zulässig." },
          { key: "D", text: "Bürgschaft funktioniert nur bei Hypotheken, nicht bei Konsumkrediten. Für Blankokredit ist die Bürgschaft als Sicherheit gesetzlich nicht anerkannt." },
        ],
        correct: "B",
        feedback:
          "Wichtig: Die Kreditfähigkeitsprüfung nach KKG ist zwingend und kann durch keine Sicherheit – auch nicht eine Bürgschaft – ersetzt werden. Ist der Hauptkreditnehmer kreditunfähig (Amortisation > Freibetrag), muss abgelehnt werden. Ausnahme: Wird der Vater als gleichberechtigter Mitantragsteller (solidarischer Kreditnehmer) aufgenommen, werden beide Einkommen und Ausgaben zusammengerechnet und eine neue Kreditfähigkeit berechnet.",
      },
      {
        id: "3.5",
        level: 3,
        briefing:
          "Kunde, 45 Jahre, kaufmännischer Angestellter, hat seinen Job verloren. Er lebt von ALV-Taggeldern (CHF 3'600/Monat netto). Er möchte Kredit CHF 10'000 um die Überganszeit zu überbrücken.",
        question: "Was gilt für ALV-Bezüger?",
        options: [
          { key: "A", text: "Bewilligen – ALV-Taggelder sind staatlich garantiert und genauso stabil wie Lohn. Die Kreditfähigkeit wird normal mit CHF 3'600 berechnet." },
          { key: "B", text: "Grundsätzlich ablehnen – ALV-Bezüger können gemäss KKG keine Konsumkredite beantragen, da das Einkommen als nicht nachhaltig gilt. Erst nach Wiederaufnahme einer Arbeitstätigkeit ist ein Kredit möglich." },
          { key: "C", text: "Kreditfähigkeit prüfen, aber höchste Vorsicht walten lassen: ALV-Taggelder sind befristet (max. 2 Jahre). Das Kredit-Laufzeitrisiko übersteigt die verbleibende ALV-Bezugsdauer typischerweise. Ablehnung ist in den meisten Fällen angemessen." },
          { key: "D", text: "Nur CHF 5'000 bewilligen – bei Arbeitslosigkeit wird die Kredithöhe automatisch auf 50% begrenzt, da das verfügbare Einkommen volatiler ist." },
        ],
        correct: "C",
        feedback:
          "ALV-Taggelder können als Einkommen angerechnet werden – technisch. Das Hauptproblem: ALV ist befristet (max. 520 Taggelder = ca. 2 Jahre). Ein Kredit mit 36 Monaten Laufzeit übersteigt die gesicherte Einkommensperiode massiv. In der Praxis wird bei laufendem ALV-Bezug fast immer abgelehnt oder eine sehr kurze Laufzeit vereinbart. Kreditfähigkeit rechnerisch prüfen, dann Gesamtbild beurteilen.",
      },
    ],
  },
];

OF_CASES_BLANKOKREDIT.forEach((c) => {
  BK_LEVELS.find((l) => l.level === c.level)!.cases.push(c);
});
