export type OptionKey = "A" | "B" | "C" | "D";

export interface TragbarkeitOption {
  key: OptionKey;
  text: string;
}

export interface CalcRow {
  type: "row" | "divider" | "total-ok" | "total-error" | "total-neutral";
  label?: string;
  value?: string;
}

export interface DeckungsgradData {
  inputs: { label: string; value: string }[];
  calcLines: string[];
  resultLine: string;
  isOk: boolean;
}

export interface TragbarkeitCase {
  id: string;
  briefing: string;
  calcRows?: CalcRow[];
  deckungsgradData?: DeckungsgradData;
  question: string;
  options: TragbarkeitOption[];
  correct: OptionKey;
  feedback: string;
}

export type SectionId = "renditeobjekt" | "gesamtengagement" | "etp" | "gewerbe";

export interface TragbarkeitSectionConfig {
  id: SectionId;
  title: string;
  description: string;
  cases: TragbarkeitCase[];
}

export const TRAGBARKEIT_SECTIONS: TragbarkeitSectionConfig[] = [
  {
    id: "renditeobjekt",
    title: "Renditeobjekte – Objektebene",
    description: "Prüfe ob Mietobjekte sich auf Objektebene selbst tragen.",
    cases: [
      {
        id: "1.1",
        briefing:
          "Du bist Credit Officer. Du prüfst folgendes Renditeobjekt:",
        calcRows: [
          { type: "row", label: "Mieteinnahmen (netto)", value: "CHF 180'000" },
          { type: "row", label: "Zinsendienst", value: "− CHF 90'000" },
          { type: "row", label: "Amortisation", value: "− CHF 40'000" },
          { type: "row", label: "Nebenkosten", value: "− CHF 20'000" },
          { type: "divider" },
          { type: "total-ok", label: "Resultat", value: "= CHF 30'000" },
        ],
        question: "Was ist dein Entscheid?",
        options: [
          { key: "A", text: "Nicht tragbar – Kosten zu hoch" },
          {
            key: "B",
            text: "Tragbarkeit gegeben – Nettoertrag von CHF 30'000. Liegenschaft ist selbsttragend.",
          },
          { key: "C", text: "Weitere Prüfung nötig" },
          { key: "D", text: "ETP beantragen" },
        ],
        correct: "B",
        feedback:
          "Nettoertrag = Liegenschaft selbsttragend. Tragbarkeit auf Objektebene gegeben. Keine weitere Prüfung nötig. Grünes Licht für Kreditantrag.",
      },
      {
        id: "1.2",
        briefing: "Du prüfst folgendes Renditeobjekt:",
        calcRows: [
          { type: "row", label: "Mieteinnahmen (netto)", value: "CHF 120'000" },
          { type: "row", label: "Zinsendienst", value: "− CHF 90'000" },
          { type: "row", label: "Amortisation", value: "− CHF 40'000" },
          { type: "row", label: "Nebenkosten", value: "− CHF 25'000" },
          { type: "divider" },
          { type: "total-error", label: "Resultat", value: "= − CHF 35'000" },
        ],
        question: "Was ist dein Entscheid?",
        options: [
          { key: "A", text: "Ablehnen – Nettoaufwand" },
          { key: "B", text: "Bewilligen – Mieteinnahmen vorhanden" },
          {
            key: "C",
            text: "Nettoaufwand – Liegenschaft nicht selbsttragend. Prüfung auf Ebene Gesamtengagement nötig.",
          },
          { key: "D", text: "ETP beantragen" },
        ],
        correct: "C",
        feedback:
          "Nettoaufwand bedeutet die Liegenschaft trägt sich nicht selbst. Jetzt muss die Unternehmung als Ganzes geprüft werden – Stufe 2.",
      },
      {
        id: "1.3",
        briefing: "Du prüfst folgendes Renditeobjekt:",
        calcRows: [
          { type: "row", label: "Mieteinnahmen (netto)", value: "CHF 150'000" },
          { type: "row", label: "Zinsendienst", value: "− CHF 100'000" },
          { type: "row", label: "Amortisation", value: "− CHF 35'000" },
          { type: "row", label: "Nebenkosten", value: "− CHF 15'000" },
          { type: "divider" },
          { type: "total-neutral", label: "Resultat", value: "= CHF 0" },
        ],
        question: "Was ist dein Entscheid?",
        options: [
          { key: "A", text: "Tragbar – kein Verlust" },
          { key: "B", text: "Nicht tragbar – kein Gewinn" },
          {
            key: "C",
            text: "Resultat ist null – Liegenschaft gerade selbsttragend. Empfehlung: Prüfung Gesamtengagement zur Sicherheit.",
          },
          { key: "D", text: "Sofort ablehnen" },
        ],
        correct: "C",
        feedback:
          "Ein Resultat von null bedeutet die Liegenschaft trägt sich knapp selbst. In der Praxis wird bei Nullergebnis trotzdem das Gesamtengagement geprüft um Puffer sicherzustellen.",
      },
    ],
  },
  {
    id: "gesamtengagement",
    title: "Gesamtengagement – Deckungsgrad",
    description: "Berechne den Deckungsgrad und prüfe das Gesamtengagement.",
    cases: [
      {
        id: "2.1",
        briefing:
          "Die Objektprüfung ergab Nettoaufwand. Du prüfst jetzt das Gesamtengagement:",
        deckungsgradData: {
          inputs: [
            { label: "Ø Cashflow letzte 3 Jahre", value: "CHF 250'000" },
            { label: "Nettoaufwand Objekt", value: "CHF 80'000" },
            { label: "Langfristige Verbindlichkeiten", value: "CHF 5'000'000" },
          ],
          calcLines: [
            "Nenner = Nettoaufwand + (1.5% × langfr. VB)",
            "       = 80'000 + (0.015 × 5'000'000)",
            "       = 80'000 + 75'000 = 155'000",
          ],
          resultLine: "Deckungsgrad = 250'000 / 155'000 = 1.61",
          isOk: true,
        },
        question: "Was ist dein Entscheid?",
        options: [
          { key: "A", text: "Nicht tragbar – Schulden zu hoch" },
          {
            key: "B",
            text: "Deckungsgrad 1.61 – über Minimum von 1.2. Tragbarkeit gegeben.",
          },
          { key: "C", text: "ETP beantragen" },
          { key: "D", text: "Weitere Unterlagen anfordern" },
        ],
        correct: "B",
        feedback:
          "Deckungsgrad 1.61 > 1.2 = Tragbarkeit gegeben. Obwohl Liegenschaft nicht selbsttragend, trägt die Unternehmung das Gesamtengagement.",
      },
      {
        id: "2.2",
        briefing: "Du prüfst das Gesamtengagement:",
        deckungsgradData: {
          inputs: [
            { label: "Ø Cashflow letzte 3 Jahre", value: "CHF 180'000" },
            { label: "Nettoaufwand Objekt", value: "CHF 90'000" },
            { label: "Langfristige Verbindlichkeiten", value: "CHF 6'000'000" },
          ],
          calcLines: [
            "Nenner = Nettoaufwand + (1.5% × langfr. VB)",
            "       = 90'000 + (0.015 × 6'000'000)",
            "       = 90'000 + 90'000 = 180'000",
          ],
          resultLine: "Deckungsgrad = 180'000 / 180'000 = 1.0",
          isOk: false,
        },
        question: "Was ist dein Entscheid?",
        options: [
          { key: "A", text: "Tragbar – Cashflow deckt Aufwand" },
          {
            key: "B",
            text: "Deckungsgrad 1.0 – unter Minimum 1.2. Tragbarkeit nicht gegeben. ETP prüfen ob Ausnahme möglich.",
          },
          { key: "C", text: "Sofort ablehnen" },
          { key: "D", text: "Mehr Sicherheiten einfordern" },
        ],
        correct: "B",
        feedback:
          "Deckungsgrad 1.0 < 1.2 = Tragbarkeit nicht gegeben. Ablehnung oder ETP-Beantragung mit Begründung.",
      },
      {
        id: "2.3",
        briefing: "Du prüfst das Gesamtengagement:",
        deckungsgradData: {
          inputs: [
            { label: "Ø Cashflow letzte 3 Jahre", value: "CHF 214'200" },
            { label: "Nettoaufwand Objekt", value: "CHF 85'000" },
            { label: "Langfristige Verbindlichkeiten", value: "CHF 5'000'000" },
          ],
          calcLines: [
            "Nenner = Nettoaufwand + (1.5% × langfr. VB)",
            "       = 85'000 + (0.015 × 5'000'000)",
            "       = 85'000 + 75'000 = 160'000",
          ],
          resultLine: "Deckungsgrad = 214'200 / 160'000 = 1.34",
          isOk: true,
        },
        question: "Was ist dein Entscheid?",
        options: [
          { key: "A", text: "Knapp unter 1.2 – ablehnen" },
          {
            key: "B",
            text: "Deckungsgrad 1.34 – über 1.2. Tragbarkeit gegeben.",
          },
          { key: "C", text: "ETP beantragen" },
          { key: "D", text: "Weiteres Jahr Cashflow anfordern" },
        ],
        correct: "B",
        feedback:
          "Deckungsgrad 1.34 > 1.2 = Tragbarkeit knapp aber klar gegeben. Immer genau rechnen – Grenzfälle entscheiden sich in den Dezimalstellen.",
      },
    ],
  },
  {
    id: "etp",
    title: "Belastungsgrenze & ETP",
    description: "Erkenne wann ein ETP angebracht ist und wie er begründet wird.",
    cases: [
      {
        id: "3.1",
        briefing:
          "Deckungsgrad = 1.05. Der Kunde ist seit 15 Jahren Stammkunde, sehr gute Zahlungshistorie, temporäre Umsatzdelle wegen Covid.",
        question: "Was empfiehlst du?",
        options: [
          { key: "A", text: "Sofort ablehnen – unter 1.2" },
          { key: "B", text: "Bewilligen – guter Kunde" },
          {
            key: "C",
            text: "ETP beantragen – Ausnahme begründen mit guter Zahlungshistorie und temporärer Situation. Kürzere Wiedervorlage setzen.",
          },
          { key: "D", text: "Mehr Sicherheiten einfordern" },
        ],
        correct: "C",
        feedback:
          "ETP ist genau für solche Fälle. Nicht automatisch ablehnen – sondern prüfen ob Ausnahme begründbar ist. ETP braucht: klare Begründung, Genehmigung höhere Stelle, kürzere Wiedervorlage.",
      },
      {
        id: "3.2",
        briefing:
          "Deckungsgrad = 1.08. Du musst ETP beantragen. Welche Begründung ist korrekt?",
        question: "Wähle die korrekte ETP-Begründung:",
        options: [
          { key: "A", text: "\"Kunde ist nett und zahlt immer\"" },
          {
            key: "B",
            text: "\"Deckungsgrad temporär unter 1.2 aufgrund Investitionsphase. Cashflow-Prognose zeigt Erholung auf 1.3 in 18 Monaten. Wiedervorlage in 12 Monaten.\"",
          },
          { key: "C", text: "\"Ausnahme weil wichtiger Kunde\"" },
          { key: "D", text: "\"Chef hat gesagt es geht\"" },
        ],
        correct: "B",
        feedback:
          "ETP Begründung muss enthalten: Grund für Unterschreitung, zeitlicher Horizont der Erholung, konkrete Wiedervorlage. Keine persönlichen Argumente – nur sachliche Fakten.",
      },
      {
        id: "3.3",
        briefing:
          "Deckungsgrad = 0.7. Neukunde, keine Zahlungshistorie, Branche mit hohem Ausfallrisiko.",
        question: "Was empfiehlst du?",
        options: [
          { key: "A", text: "ETP beantragen" },
          {
            key: "B",
            text: "Ablehnen – Deckungsgrad zu tief, keine Basis für ETP-Begründung.",
          },
          { key: "C", text: "Bewilligen mit Sicherheiten" },
          { key: "D", text: "Mehr Unterlagen anfordern" },
        ],
        correct: "B",
        feedback:
          "ETP ist kein Freifahrtschein. Bei Deckungsgrad 0.7 und ohne positive Faktoren ist eine ETP-Begründung nicht haltbar. Hier muss abgelehnt werden.",
      },
    ],
  },
  {
    id: "gewerbe",
    title: "Selbstgenutzte Gewerbeliegenschaft",
    description: "Verstehe den Unterschied zur Prüfung von Renditeobjekten.",
    cases: [
      {
        id: "4.1",
        briefing:
          "Kunde betreibt eine Bäckerei im eigenen Gebäude. Er möchte das Gebäude mit CHF 500'000 belehnen.",
        question: "Wie prüfst du die Tragbarkeit?",
        options: [
          { key: "A", text: "Mieteinnahmen des Gebäudes prüfen" },
          {
            key: "B",
            text: "Primär Bonität der Bäckerei prüfen – Cashflow, Eigenkapital, Stabilität. Kein Objektertrag weil selbst genutzt.",
          },
          { key: "C", text: "Gleich wie Renditeobjekt" },
          { key: "D", text: "Nur Gebäudewert prüfen" },
        ],
        correct: "B",
        feedback:
          "Selbstgenutzte Gewerbeliegenschaft = kein externer Mieter = kein Objektertrag. Deshalb steht die Bonität des Kreditnehmers im Zentrum.",
      },
      {
        id: "4.2",
        briefing:
          "Du hast zwei Fälle:\nFall A: Bürogebäude vermietet an Dritte\nFall B: Lager selbst genutzt durch Firma",
        question: "Was ist der Unterschied in der Tragbarkeitsprüfung?",
        options: [
          { key: "A", text: "Kein Unterschied" },
          {
            key: "B",
            text: "Fall A: Objektertrag primär. Fall B: Kreditnehmer-Bonität primär.",
          },
          { key: "C", text: "Fall B ist immer einfacher" },
          { key: "D", text: "Beide nach Objektertrag prüfen" },
        ],
        correct: "B",
        feedback:
          "Das ist ein klassischer Prüfungspunkt in der LAP. Renditeobjekt = Objektertrag zuerst. Selbstgenutzt = Kreditnehmer zuerst. Nie verwechseln!",
      },
    ],
  },
];

export function getSectionConfig(id: SectionId): TragbarkeitSectionConfig {
  return TRAGBARKEIT_SECTIONS.find((s) => s.id === id)!;
}
