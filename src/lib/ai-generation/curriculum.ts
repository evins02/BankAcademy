export interface CurriculumTopic {
  name: string;
  level: 1 | 2 | 3;
}

export interface CurriculumModule {
  moduleKey: string;
  moduleLabel: string;
  topics: CurriculumTopic[];
}

export const CURRICULUM: CurriculumModule[] = [
  {
    moduleKey: "anlage-fonds",
    moduleLabel: "Anlagefonds & ETF",
    topics: [
      { name: "Grundlagen Anlagefonds und Fondstypen", level: 1 },
      { name: "ETF vs aktiv verwaltete Fonds: Kosten und Performance", level: 2 },
      { name: "TER, Ausgabe- und Rücknahmegebühren berechnen", level: 2 },
      { name: "UCITS-Richtlinie, FINMA-Aufsicht und Anlegerschutz", level: 3 },
      { name: "Fondsselektion im Beratungsgespräch", level: 3 },
    ],
  },
  {
    moduleKey: "anlage-obligationen",
    moduleLabel: "Obligationen",
    topics: [
      { name: "Grundlagen Obligationen: Zinscoupon, Laufzeit, Emittent", level: 1 },
      { name: "Kursentwicklung bei Zinsänderungen verstehen", level: 2 },
      { name: "Duration und modifizierte Duration", level: 3 },
      { name: "Kreditrisiko, Ratingagenturen und Spread", level: 3 },
    ],
  },
  {
    moduleKey: "anlage-aktien",
    moduleLabel: "Aktien & Kennzahlen",
    topics: [
      { name: "Grundlagen Aktien: Dividende, Stimmrecht, Haftung", level: 1 },
      { name: "Bewertungskennzahlen: KGV, KBV, Dividendenrendite", level: 2 },
      { name: "Aktienanalyse: fundamentale vs. technische Analyse", level: 3 },
    ],
  },
  {
    moduleKey: "anlage-anlegerprofil",
    moduleLabel: "Anlegerprofil & Beratung",
    topics: [
      { name: "Risikoprofil und Anlagehorizont bestimmen", level: 1 },
      { name: "Anlagestrategien: defensiv, ausgewogen, wachstumsorientiert", level: 2 },
      { name: "FIDLEG Suitability und Appropriateness im Beratungsprozess", level: 3 },
    ],
  },
  {
    moduleKey: "anlage-esg",
    moduleLabel: "Nachhaltige Anlagen ESG",
    topics: [
      { name: "ESG-Grundbegriffe: Environmental, Social, Governance", level: 1 },
      { name: "ESG-Integration vs. Best-in-Class vs. Ausschlusskriterien", level: 2 },
      { name: "SFDR-Produktkategorien (Art. 6, 8, 9) und Kundengespräch", level: 3 },
    ],
  },
  {
    moduleKey: "anlage-strukturierte-produkte",
    moduleLabel: "Strukturierte Produkte",
    topics: [
      { name: "Produktkategorien: Kapitalschutz, Renditeoptimierung, Partizipation", level: 1 },
      { name: "Barrier Reverse Convertible: Funktionsweise und Risiken", level: 2 },
      { name: "SVSP-Kategorisierung und Einsatz im Beratungsgespräch", level: 3 },
    ],
  },
  {
    moduleKey: "privatkunde-hypotheken",
    moduleLabel: "Hypotheken Privatkunde",
    topics: [
      { name: "Hypothekarmodelle: SARON vs. Festhypothek", level: 1 },
      { name: "Tragbarkeit und Belehnung berechnen (80%/66% Regel)", level: 2 },
      { name: "Amortisationspflicht: direkt vs. indirekt", level: 2 },
      { name: "Belastungsgrenze, Risikobewertung und Bankrichtlinien", level: 3 },
    ],
  },
  {
    moduleKey: "privatkunde-vorsorge",
    moduleLabel: "Vorsorge & 3a",
    topics: [
      { name: "Drei-Säulen-System Schweiz: Überblick", level: 1 },
      { name: "Säule 3a: Einzahlung, Anlage, steuerbegünstigter Bezug", level: 2 },
      { name: "Pensionskasse: Einkauf, Überobligatorium, Vorbezug WEF", level: 3 },
    ],
  },
  {
    moduleKey: "privatkunde-konsumkredit",
    moduleLabel: "Konsumkredit & Blankokredit",
    topics: [
      { name: "Konsumkreditgesetz (KKG): Voraussetzungen und Pflichten", level: 1 },
      { name: "Kreditfähigkeit prüfen und ZEKB-Auskunft", level: 2 },
      { name: "Überschuldungsrisiko und Verantwortung der Bank", level: 3 },
    ],
  },
  {
    moduleKey: "backoffice-kyc",
    moduleLabel: "KYC / AML Compliance",
    topics: [
      { name: "Geldwäschereigesetz (GwG): Sorgfaltspflichten Überblick", level: 1 },
      { name: "Wirtschaftlich Berechtigte (Beneficial Owner): Identifikation", level: 2 },
      { name: "PEP-Abklärungen, erhöhte Risiken und Meldepflicht MROS", level: 3 },
    ],
  },
  {
    moduleKey: "credit-operations-grundpfand",
    moduleLabel: "Grundpfand & Schuldbrief",
    topics: [
      { name: "Grundpfandarten: Schuldbrief und Grundpfandverschreibung", level: 1 },
      { name: "Register- vs. Papierschuldbrief: Unterschiede und Verwaltung", level: 2 },
      { name: "Verwertung und Betreibung auf Grundpfand", level: 3 },
    ],
  },
  {
    moduleKey: "firmenkunde-tragbarkeit",
    moduleLabel: "Firmenkunde Tragbarkeit",
    topics: [
      { name: "Renditeliegenschaften: Nettomieteinnahmen und Belehnung", level: 2 },
      { name: "Gesamtengagement und Klumpenrisiken beurteilen", level: 3 },
    ],
  },
  {
    moduleKey: "banking-operations-zahlungsverkehr",
    moduleLabel: "Zahlungsverkehr",
    topics: [
      { name: "IBAN, BIC und Überweisungsarten in der Schweiz", level: 1 },
      { name: "SEPA, Swift und internationale Zahlungen", level: 2 },
      { name: "Fehlerfall, Rückruf und Haftung bei Zahlungsaufträgen", level: 3 },
    ],
  },
];
