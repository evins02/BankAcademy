/**
 * Option 2: HK-Mapping auf Modul + Level-Ebene.
 * Zeigt welche Handlungskompetenzen pro Schwierigkeitsstufe trainiert werden.
 * Bleibt in der App-Logik: Abteilung → Modul → Level.
 */

export type AbteilungId =
  | "privatkunde"
  | "anlage"
  | "firmenkunde"
  | "backoffice"
  | "simulationen";

export interface ModuleLevelHk {
  level: 1 | 2 | 3;
  hks: string[];
  /** Worum geht es auf dieser Stufe — ein Satz */
  fokus: string;
}

export interface AbteilungModul {
  moduleId: string;
  name: string;
  abteilung: AbteilungId;
  levels: ModuleLevelHk[];
}

/** HKs die in der Banklehre am direktesten trainiert werden — Matrix-Spalten */
export const MATRIX_HKS = ["b1", "b2", "c5", "d1", "d2", "d3", "d4", "d5", "e3"] as const;
export type MatrixHk = (typeof MATRIX_HKS)[number];

export const MATRIX_HK_LABELS: Record<MatrixHk, string> = {
  b1:  "Team & Compliance",
  b2:  "Schnittstellen",
  c5:  "Finanzielle Vorgänge",
  d1:  "Anliegen entgegennehmen",
  d2:  "Beratungsgespräch",
  d3:  "Verkaufs- & Verhandlungsgespräch",
  d4:  "Kundenbeziehung pflegen",
  d5:  "Anspruchsvolle Situationen",
  e3:  "Daten auswerten",
};

export const HK_LEVEL_MAPPING: AbteilungModul[] = [
  // ── Privatkunde ───────────────────────────────────────────────────────────
  {
    moduleId: "privatkunde-kontoeröffnung",
    name: "Kontoeröffnung",
    abteilung: "privatkunde",
    levels: [
      { level: 1, hks: ["d1", "b2"],       fokus: "Identifikation, Dokumentenprüfung" },
      { level: 2, hks: ["d1", "d2", "b2"], fokus: "Formular K, wirtschaftlich Berechtigte" },
      { level: 3, hks: ["d5", "b1", "b2"], fokus: "Sitzgesellschaft, PEP, Sonderformen" },
    ],
  },
  {
    moduleId: "privatkunde-zahlungsverkehr",
    name: "Zahlungsverkehr",
    abteilung: "privatkunde",
    levels: [
      { level: 1, hks: ["d1", "d2", "c5"],       fokus: "QR-Rechnung, IBAN, Dauerauftrag" },
      { level: 2, hks: ["d2", "d3", "c5"],       fokus: "SEPA, Auslandzahlungen, BIC/SWIFT" },
      { level: 3, hks: ["d3", "d5", "b1"],       fokus: "Vishing, Betrug, Eskalation" },
    ],
  },
  {
    moduleId: "privatkunde-sparen-konto",
    name: "Sparen & Konto",
    abteilung: "privatkunde",
    levels: [
      { level: 1, hks: ["d1", "d2"],             fokus: "Kontenarten, Zinsberechnung" },
      { level: 2, hks: ["d2", "d3"],             fokus: "Produktvergleich, Kundenbedürfnis" },
      { level: 3, hks: ["d3", "d5"],             fokus: "Konditionsverhandlung, Beschwerden" },
    ],
  },
  {
    moduleId: "privatkunde-vorsorge",
    name: "Vorsorge & 3a",
    abteilung: "privatkunde",
    levels: [
      { level: 1, hks: ["d1", "d2", "c5"],       fokus: "3-Säulen-System, steuerlicher Abzug" },
      { level: 2, hks: ["d2", "d3", "c5"],       fokus: "Produktvergleich, Vorsorgeziele" },
      { level: 3, hks: ["d3", "d4", "d5"],       fokus: "Ganzheitliche Vorsorgeplanung" },
    ],
  },
  {
    moduleId: "privatkunde-hypothek",
    name: "Hypothek",
    abteilung: "privatkunde",
    levels: [
      { level: 1, hks: ["d1", "c5"],             fokus: "Tragbarkeit, Belehnungswert" },
      { level: 2, hks: ["d3", "c5", "e3"],       fokus: "Zinsbindung, Amortisation, Produkte" },
      { level: 3, hks: ["d5", "c5", "e3"],       fokus: "Baukredit, Sonderklauseln, Risiken" },
    ],
  },
  {
    moduleId: "privatkunde-blankokredit",
    name: "Blankokredit",
    abteilung: "privatkunde",
    levels: [
      { level: 1, hks: ["d1", "c5"],             fokus: "Kreditgrundsätze, Tragbarkeit" },
      { level: 2, hks: ["d3", "c5"],             fokus: "Kreditgespräch, Konditionen" },
      { level: 3, hks: ["d5", "c5", "b1"],       fokus: "Risikoentscheidung, Compliance" },
    ],
  },

  // ── Anlagekunde ───────────────────────────────────────────────────────────
  {
    moduleId: "banking-operations-anlagekunde",
    name: "Anlageberatung",
    abteilung: "anlage",
    levels: [
      { level: 1, hks: ["d1", "d2"],             fokus: "Anlegerprofil, Risikoklassen" },
      { level: 2, hks: ["d2", "d3", "d4"],       fokus: "Produktempfehlung, Eignung" },
      { level: 3, hks: ["d3", "d4", "d5"],       fokus: "Komplexe Portfolioberatung, Rebalancing" },
    ],
  },
  {
    moduleId: "anlage-aktien",
    name: "Aktien",
    abteilung: "anlage",
    levels: [
      { level: 1, hks: ["d2", "e3"],             fokus: "Aktienarten, Kursentwicklung" },
      { level: 2, hks: ["d2", "d3", "e3"],       fokus: "KGV, Dividendenrendite, Bewertung" },
      { level: 3, hks: ["d3", "d5", "e3"],       fokus: "Marktsituation, Anlageentscheidung" },
    ],
  },
  {
    moduleId: "anlage-obligationen",
    name: "Obligationen",
    abteilung: "anlage",
    levels: [
      { level: 1, hks: ["d2", "e3"],             fokus: "Anleihengrundlagen, Coupon, Laufzeit" },
      { level: 2, hks: ["d2", "d3", "e3"],       fokus: "Duration, Kursrisiko, Bonitätsrating" },
      { level: 3, hks: ["d3", "d5", "e3"],       fokus: "Portfolioallokation, Zinsszenarien" },
    ],
  },
  {
    moduleId: "anlage-fonds",
    name: "Fonds & ETFs",
    abteilung: "anlage",
    levels: [
      { level: 1, hks: ["d2", "e3"],             fokus: "Fondsarten, TER, Diversifikation" },
      { level: 2, hks: ["d2", "d3", "e3"],       fokus: "ETF vs. aktiv, Produktauswahl" },
      { level: 3, hks: ["d3", "d5", "e3"],       fokus: "Komplexe Produkteignung, Suitability" },
    ],
  },

  // ── Firmenkunde ───────────────────────────────────────────────────────────
  {
    moduleId: "firmenkunde-kontoeröffnung",
    name: "Kontoeröffnung Firma",
    abteilung: "firmenkunde",
    levels: [
      { level: 1, hks: ["d1", "b2"],             fokus: "GmbH/AG, Vertretungsregeln, Handelsregister" },
      { level: 2, hks: ["d1", "d3", "b2"],       fokus: "Holdingstruktur, Zeichnungsberechtigte" },
      { level: 3, hks: ["d5", "b1", "b2"],       fokus: "Sitzgesellschaft, Sonderrisiken, Ablehnung" },
    ],
  },
  {
    moduleId: "firmenkunde-kmu-kredit",
    name: "KMU-Kredit",
    abteilung: "firmenkunde",
    levels: [
      { level: 1, hks: ["d1", "c5"],             fokus: "Grundlagen Kredit, Bilanzstruktur" },
      { level: 2, hks: ["d3", "c5", "e3"],       fokus: "Jahresabschluss, NWC, DSO, Cashflow" },
      { level: 3, hks: ["d5", "c5", "b1", "e3"], fokus: "Cross-Default, Rangrücktritt, Risikoentscheid" },
    ],
  },
  {
    moduleId: "firmenkunde-tragbarkeit",
    name: "Tragbarkeit & Finanzierung",
    abteilung: "firmenkunde",
    levels: [
      { level: 1, hks: ["c5", "e3"],             fokus: "Tragbarkeitsberechnung, 1/3-Regel" },
      { level: 2, hks: ["d3", "c5", "e3"],       fokus: "Renditeobjekt, Gesamtengagement" },
      { level: 3, hks: ["d5", "c5", "e3"],       fokus: "Gewerbeliegenschaft, Belastungsgrenzen" },
    ],
  },

  // ── Back Office ───────────────────────────────────────────────────────────
  {
    moduleId: "banking-operations-kyc",
    name: "KYC & Sorgfaltspflicht",
    abteilung: "backoffice",
    levels: [
      { level: 1, hks: ["d1", "b2"],             fokus: "Identifikation, GwG-Grundlagen" },
      { level: 2, hks: ["b1", "b2", "d5"],       fokus: "Wirtschaftlich Berechtigte, Sorgfaltspflicht" },
      { level: 3, hks: ["b1", "b2", "d5", "e3"], fokus: "PEP, TBML, Krypto, Terrorismusfinanzierung" },
    ],
  },
  {
    moduleId: "backoffice-kyc",
    name: "KYC Dossier-Prüfung",
    abteilung: "backoffice",
    levels: [
      { level: 1, hks: ["b2", "c5"],             fokus: "Vollständigkeit Dossier prüfen" },
      { level: 2, hks: ["b2", "d5"],             fokus: "Unstimmigkeiten erkennen, eskalieren" },
      { level: 3, hks: ["b1", "b2", "d5"],       fokus: "Hochrisiko-Dossiers, MROS-Meldung" },
    ],
  },
  {
    moduleId: "banking-operations-zahlungsverkehr",
    name: "Zahlungsverkehr Back Office",
    abteilung: "backoffice",
    levels: [
      { level: 1, hks: ["b2", "c5"],             fokus: "Zahlungsverarbeitung, Buchung" },
      { level: 2, hks: ["b2", "c5", "e3"],       fokus: "Retouren, SEPA R-Codes, Fehlerbehandlung" },
      { level: 3, hks: ["b1", "b2", "d5", "e3"], fokus: "SWIFT GPI, Korrespondenzbanken, Batch-Splitting" },
    ],
  },
  {
    moduleId: "banking-operations-mahnwesen",
    name: "Mahnwesen",
    abteilung: "backoffice",
    levels: [
      { level: 1, hks: ["b2", "c5"],             fokus: "Mahnprozess, Fristen" },
      { level: 2, hks: ["b2", "c5", "d5"],       fokus: "Betreibung, SchKG, Verlustschein" },
      { level: 3, hks: ["b1", "b2", "d5"],       fokus: "Komplexe Fälle, Sicherheitenverwertung" },
    ],
  },
  {
    moduleId: "credit-operations",
    name: "Credit Operations",
    abteilung: "backoffice",
    levels: [
      { level: 1, hks: ["b2", "c5"],             fokus: "Kreditvertrag, Auszahlung" },
      { level: 2, hks: ["b2", "c5", "d5"],       fokus: "Sicherheitenverwaltung, Schuldbrief" },
      { level: 3, hks: ["b1", "b2", "c5", "d5"], fokus: "Vorzeitige Rückzahlung, Neubewilligung" },
    ],
  },

  // ── Simulationen ──────────────────────────────────────────────────────────
  {
    moduleId: "simulation-kontoeröffnung",
    name: "Simulation: Kontoeröffnung",
    abteilung: "simulationen",
    levels: [
      { level: 1, hks: ["d1", "d2", "b1"],       fokus: "Gesprächseinstieg, Bedarfsermittlung" },
      { level: 2, hks: ["d2", "d3", "b1"],       fokus: "Produktpräsentation, Einwandbehandlung" },
      { level: 3, hks: ["d3", "d4", "d5", "b1"], fokus: "Anspruchsvolle Kunden, Abschluss" },
    ],
  },
  {
    moduleId: "simulation-hypothek",
    name: "Simulation: Hypothek",
    abteilung: "simulationen",
    levels: [
      { level: 1, hks: ["d1", "d3", "b1"],       fokus: "Beratungseinstieg, Bedürfnisklärung" },
      { level: 2, hks: ["d3", "d4", "b1"],       fokus: "Produktvergleich, Beratungsprotokoll" },
      { level: 3, hks: ["d3", "d5", "d4", "b1"], fokus: "Verhandlung, anspruchsvolle Situationen" },
    ],
  },
  {
    moduleId: "simulation-anlageberatung",
    name: "Simulation: Anlageberatung",
    abteilung: "simulationen",
    levels: [
      { level: 1, hks: ["d1", "d2", "b1"],       fokus: "Anlegerprofil aufnehmen, Grundberatung" },
      { level: 2, hks: ["d2", "d3", "d4", "b1"], fokus: "Produktempfehlung, Eignung begründen" },
      { level: 3, hks: ["d3", "d4", "d5", "b1"], fokus: "Komplexe Beratung, Portfolioanpassung" },
    ],
  },
];

export const ABTEILUNG_LABELS: Record<AbteilungId, string> = {
  privatkunde:   "Privatkunde",
  anlage:        "Anlagekunde",
  firmenkunde:   "Firmenkunde",
  backoffice:    "Back Office",
  simulationen:  "Simulationen",
};

export const ABTEILUNG_COLORS: Record<AbteilungId, string> = {
  privatkunde:  "#3B82F6",
  anlage:       "#8B5CF6",
  firmenkunde:  "#F59E0B",
  backoffice:   "#EF4444",
  simulationen: "#10B981",
};
