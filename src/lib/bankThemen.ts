/**
 * Banking-specific topic areas (Fachkompetenzen Banklehre) for QV alignment.
 * These complement the cross-industry KV21 Handlungskompetenzen and map
 * directly aligned with the Qualifikationsverfahren Banklehre.
 */

export interface BankThema {
  id: string;
  titel: string;
  beschreibung: string;
  icon: string;
  color: string;
  moduleIds: string[];
  totalScenarios: number;
  /** Sub-topics / Lernziele this area covers */
  subthemen: string[];
}

export const BANK_THEMEN: BankThema[] = [
  {
    id: "bt-zv",
    titel: "Konten & Zahlungsverkehr",
    beschreibung: "Inländischer und internationaler Zahlungsverkehr, IBAN, SEPA, SWIFT, Retouren und Back-Office-Verarbeitung",
    icon: "CreditCard",
    color: "#3B82F6",
    moduleIds: [
      "privatkunde-zahlungsverkehr",
      "banking-operations-zahlungsverkehr",
      "privatkunde-sparen-konto",
      "privatkunde-kontoeröffnung",
    ],
    totalScenarios: 58,
    subthemen: [
      "Inländischer Zahlungsverkehr (IBAN, QR-Rechnung)",
      "Internationaler Zahlungsverkehr (SWIFT, BIC, SEPA)",
      "Zahlungsarten und Kontoarten",
      "Back-Office Verarbeitung und Fehlerbehandlung",
      "SEPA R-Codes und Retouren",
      "Korrespondenzbanken und Due Diligence",
    ],
  },
  {
    id: "bt-anlage",
    titel: "Anlegen & Investieren",
    beschreibung: "Anlegerprofil, Obligationen, Aktien, Fonds & ETFs, Anlageberatungsprozess und Portfoliomanagement",
    icon: "TrendingUp",
    color: "#8B5CF6",
    moduleIds: [
      "banking-operations-anlagekunde",
      "anlage-aktien",
      "anlage-obligationen",
      "anlage-fonds",
      "privatkunde-fonds",
    ],
    totalScenarios: 48,
    subthemen: [
      "Anlegerprofil und Risikofähigkeit",
      "Obligationen und Anleihen",
      "Aktien und Kennzahlen (KGV, Dividendenrendite)",
      "Anlagefonds und ETFs",
      "Portfoliotheorie und Diversifikation",
      "Anlageberatungsprozess",
    ],
  },
  {
    id: "bt-kyc",
    titel: "KYC & Compliance",
    beschreibung: "Geldwäschereiprävention, Sorgfaltspflichten nach GwG/VSB, FATF, Terrorismusfinanzierung und PEP",
    icon: "Shield",
    color: "#EF4444",
    moduleIds: [
      "banking-operations-kyc",
      "backoffice-kyc",
    ],
    totalScenarios: 33,
    subthemen: [
      "Know Your Customer (KYC) Prozess",
      "Geldwäschereigesetz (GwG) und VSB 20",
      "Identifikation wirtschaftlich Berechtigter",
      "Politisch exponierte Personen (PEP)",
      "FATF und internationale Standards",
      "Terrorismusfinanzierung und MROS-Meldepflicht",
      "Virtuelle Assets und Kryptowährungen",
    ],
  },
  {
    id: "bt-kredit",
    titel: "Unternehmensfinanzierung",
    beschreibung: "KMU-Kredit, Betriebskredit, Jahresabschlussanalyse, Tragbarkeit und Firmenkunde-Geschäfte",
    icon: "Building2",
    color: "#F59E0B",
    moduleIds: [
      "firmenkunde-kmu-kredit",
      "banking-operations-blankokredit",
      "firmenkunde-kontoeröffnung",
      "firmenkunde-tragbarkeit",
    ],
    totalScenarios: 49,
    subthemen: [
      "KMU-Kreditprüfung und Bonitätsanalyse",
      "Jahresabschluss-Analyse (Bilanz, ER, Cashflow)",
      "Tragbarkeit und DSO-Berechnung",
      "Betriebskredit und Working Capital",
      "Firmenkunde-Kontoeröffnung und Vertretungsregeln",
      "Sicherheiten und Rangrücktritt",
    ],
  },
  {
    id: "bt-hypothek",
    titel: "Hypotheken & Finanzierungen",
    beschreibung: "Hypothekarrecht, Tragbarkeit, Amortisation, Schuldbrief und Privat-/Gewerbeimmobilienfinanzierung",
    icon: "Home",
    color: "#10B981",
    moduleIds: [
      "privatkunde-hypothek",
      "privatkunde-blankokredit",
      "firmenkunde-tragbarkeit",
      "credit-operations",
    ],
    totalScenarios: 42,
    subthemen: [
      "Tragbarkeitsberechnung (1/3-Regel)",
      "Amortisation (direkt / indirekt)",
      "Schuldbrief und Grundpfandrecht",
      "Hypothekarzinsen und Produkte",
      "Baukredit und Finanzierungsphasen",
      "Renditeobjekte und Gewerbeliegenschaften",
    ],
  },
  {
    id: "bt-vorsorge",
    titel: "Vorsorge & 3a",
    beschreibung: "3-Säulen-System, Säule 3a, steuerliche Aspekte und Vorsorgeprodükte im Bankkontext",
    icon: "Umbrella",
    color: "#06B6D4",
    moduleIds: [
      "privatkunde-vorsorge",
    ],
    totalScenarios: 15,
    subthemen: [
      "3-Säulen-System der Schweiz",
      "Gebundene Vorsorge (Säule 3a)",
      "Steuerliche Abzugsfähigkeit",
      "Vorsorgeprodukte der Bank",
      "Pensionskasse und BVG-Grundlagen",
    ],
  },
  {
    id: "bt-credit-ops",
    titel: "Credit Operations",
    beschreibung: "Kreditabwicklung, Sicherheitenverwaltung, Mahnwesen, Betreibung und Schuldbrief-Management",
    icon: "FileText",
    color: "#EC4899",
    moduleIds: [
      "banking-operations-mahnwesen",
      "credit-operations",
    ],
    totalScenarios: 32,
    subthemen: [
      "Mahnprozess und Betreibungsrecht",
      "Kreditvertragsabwicklung",
      "Sicherheitenverwaltung und -verwertung",
      "Grundpfandverwaltung (Schuldbrief)",
      "Vorzeitige Rückzahlung und Vorfälligkeitsentschädigung",
      "Periodische Neubewilligung",
    ],
  },
  {
    id: "bt-beratung",
    titel: "Kundengespräch & Beratung",
    beschreibung: "Interaktive Simulationen für Kontoeröffnung, Anlageberatung und Hypothekengespräch mit KI-Auswertung",
    icon: "MessageSquare",
    color: "#6366F1",
    moduleIds: [
      "simulation-kontoeröffnung",
      "simulation-hypothek",
      "simulation-anlageberatung",
    ],
    totalScenarios: 12,
    subthemen: [
      "Kontoeröffnungsgespräch",
      "Anlageberatungsgespräch",
      "Hypothekengespräch",
      "Gesprächsstruktur und Kommunikation",
      "Beratungsprotokoll nach MiFID/FIDLEG",
    ],
  },
];

/** Total scenarios across all banking topics */
export const BT_TOTAL_SCENARIOS = BANK_THEMEN.reduce(
  (sum, t) => sum + t.totalScenarios,
  0
);

/** Lookup a banking theme by id */
export function getBankThema(id: string): BankThema | undefined {
  return BANK_THEMEN.find((t) => t.id === id);
}
