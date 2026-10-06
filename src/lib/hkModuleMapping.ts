/**
 * Maps training modules to the Handlungskompetenzen (HKs) they cover.
 * First-pass mapping based on content — subject to domain-expert review.
 */

export interface ModuleInfo {
  moduleId: string;
  name: string;
  path: string;
  bereich: string;
  hks: string[];
  bankThemaId?: string;
  scenarioCount: number;
}

export const MODULES_WITH_HK: ModuleInfo[] = [
  // ── Privatkunde ─────────────────────────────────────────────────────────
  {
    moduleId: "privatkunde-kontoeröffnung",
    name: "Kontoeröffnung Privatkunde",
    path: "/privatkunde/basis/kontoeröffnung",
    bereich: "Privatkunde",
    hks: ["b2", "d1", "d5"],
    bankThemaId: "bt-zv",
    scenarioCount: 15,
  },
  {
    moduleId: "privatkunde-zahlungsverkehr",
    name: "Zahlungsverkehr Privatkunde",
    path: "/privatkunde/basis/zahlungsverkehr",
    bereich: "Privatkunde",
    hks: ["d1", "d2", "d3", "d5"],
    bankThemaId: "bt-zv",
    scenarioCount: 15,
  },
  {
    moduleId: "privatkunde-sparen-konto",
    name: "Sparen & Konto",
    path: "/privatkunde/basis/sparen-konto",
    bereich: "Privatkunde",
    hks: ["d1", "d2", "d3"],
    bankThemaId: "bt-zv",
    scenarioCount: 15,
  },
  {
    moduleId: "privatkunde-vorsorge",
    name: "Vorsorge & 3a",
    path: "/privatkunde/vorsorge",
    bereich: "Privatkunde",
    hks: ["c5", "d1", "d2", "d3"],
    bankThemaId: "bt-vorsorge",
    scenarioCount: 15,
  },
  {
    moduleId: "privatkunde-hypothek",
    name: "Hypothek Privatkunde",
    path: "/privatkunde/individual/hypothek",
    bereich: "Privatkunde",
    hks: ["c5", "d1", "d3", "d5"],
    bankThemaId: "bt-hypothek",
    scenarioCount: 12,
  },
  {
    moduleId: "privatkunde-blankokredit",
    name: "Blankokredit / Konsumkredit",
    path: "/privatkunde/individual/blankokredit",
    bereich: "Privatkunde",
    hks: ["c5", "d1", "d3"],
    bankThemaId: "bt-hypothek",
    scenarioCount: 10,
  },

  // ── Anlage ───────────────────────────────────────────────────────────────
  {
    moduleId: "banking-operations-anlagekunde",
    name: "Anlageberatung",
    path: "/anlage/anlagekunde",
    bereich: "Anlage",
    hks: ["d1", "d2", "d3", "d4", "d5"],
    bankThemaId: "bt-anlage",
    scenarioCount: 12,
  },
  {
    moduleId: "anlage-aktien",
    name: "Aktien & Kennzahlen",
    path: "/anlage/aktien",
    bereich: "Anlage",
    hks: ["d2", "d3", "e3"],
    bankThemaId: "bt-anlage",
    scenarioCount: 9,
  },
  {
    moduleId: "anlage-obligationen",
    name: "Obligationen",
    path: "/anlage/obligationen",
    bereich: "Anlage",
    hks: ["d2", "d3", "e3"],
    bankThemaId: "bt-anlage",
    scenarioCount: 9,
  },
  {
    moduleId: "anlage-fonds",
    name: "Fonds & ETFs (Vertiefung)",
    path: "/anlage/fonds",
    bereich: "Anlage",
    hks: ["d2", "d3", "e3"],
    bankThemaId: "bt-anlage",
    scenarioCount: 9,
  },
  {
    moduleId: "privatkunde-fonds",
    name: "Fonds & ETFs (Basis)",
    path: "/privatkunde/anlage/fonds",
    bereich: "Anlage",
    hks: ["d1", "d2", "d3", "d5"],
    bankThemaId: "bt-anlage",
    scenarioCount: 9,
  },

  // ── Firmenkunde ──────────────────────────────────────────────────────────
  {
    moduleId: "firmenkunde-kontoeröffnung",
    name: "Kontoeröffnung Firmenkunde",
    path: "/firmenkunde/kontoeröffnung",
    bereich: "Firmenkunde",
    hks: ["b2", "d1", "d5"],
    bankThemaId: "bt-kredit",
    scenarioCount: 10,
  },
  {
    moduleId: "firmenkunde-kmu-kredit",
    name: "KMU-Kredit",
    path: "/firmenkunde/kredit/kmu-kredit",
    bereich: "Firmenkunde",
    hks: ["c5", "d1", "d3", "d5", "e3"],
    bankThemaId: "bt-kredit",
    scenarioCount: 30,
  },
  {
    moduleId: "firmenkunde-tragbarkeit",
    name: "Tragbarkeit & Finanzierungsanalyse",
    path: "/firmenkunde/tragbarkeit",
    bereich: "Firmenkunde",
    hks: ["c5", "d1", "d5", "e3"],
    bankThemaId: "bt-hypothek",
    scenarioCount: 14,
  },

  // ── Back Office: KYC & ZV ────────────────────────────────────────────────
  {
    moduleId: "banking-operations-kyc",
    name: "KYC & Sorgfaltspflicht",
    path: "/backoffice/kyc",
    bereich: "Back Office",
    hks: ["b1", "b2", "d1", "d5"],
    bankThemaId: "bt-kyc",
    scenarioCount: 24,
  },
  {
    moduleId: "backoffice-kyc",
    name: "KYC Dossier-Prüfung",
    path: "/backoffice/kyc-dossier",
    bereich: "Back Office",
    hks: ["b2", "c2"],
    bankThemaId: "bt-kyc",
    scenarioCount: 9,
  },
  {
    moduleId: "banking-operations-zahlungsverkehr",
    name: "Zahlungsverkehr Back Office",
    path: "/backoffice/zahlungsverkehr",
    bereich: "Back Office",
    hks: ["b2", "c5", "d5"],
    bankThemaId: "bt-zv",
    scenarioCount: 28,
  },
  {
    moduleId: "banking-operations-mahnwesen",
    name: "Mahnwesen & Betreibung",
    path: "/backoffice/mahnwesen",
    bereich: "Back Office",
    hks: ["b2", "c5", "d5"],
    bankThemaId: "bt-credit-ops",
    scenarioCount: 13,
  },

  // ── Credit Operations ────────────────────────────────────────────────────
  {
    moduleId: "credit-operations",
    name: "Credit Operations",
    path: "/backoffice/credit-operations",
    bereich: "Back Office",
    hks: ["b2", "c5", "d5"],
    bankThemaId: "bt-credit-ops",
    scenarioCount: 19,
  },

  // ── Simulationen ─────────────────────────────────────────────────────────
  {
    moduleId: "simulation-kontoeröffnung",
    name: "Simulation: Kontoeröffnung",
    path: "/privatkunde/simulation/kontoeroeffnung",
    bereich: "Privatkunde",
    hks: ["b1", "d1", "d2", "d3", "d5"],
    bankThemaId: "bt-beratung",
    scenarioCount: 4,
  },
  {
    moduleId: "simulation-hypothek",
    name: "Simulation: Hypothekengespräch",
    path: "/privatkunde/simulation/hypothek",
    bereich: "Privatkunde",
    hks: ["b1", "d1", "d3", "d5"],
    bankThemaId: "bt-beratung",
    scenarioCount: 4,
  },
  {
    moduleId: "simulation-anlageberatung",
    name: "Simulation: Anlageberatung",
    path: "/anlage/simulation",
    bereich: "Anlage",
    hks: ["b1", "d1", "d2", "d3", "d4", "d5"],
    bankThemaId: "bt-beratung",
    scenarioCount: 4,
  },
];

/** Returns all modules that cover a given HK code. */
export function getModulesForHk(hkCode: string): ModuleInfo[] {
  return MODULES_WITH_HK.filter((m) => m.hks.includes(hkCode));
}

/** Lookup module by moduleId. */
export function getModuleInfo(moduleId: string): ModuleInfo | undefined {
  return MODULES_WITH_HK.find((m) => m.moduleId === moduleId);
}
