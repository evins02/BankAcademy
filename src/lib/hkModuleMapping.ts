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
}

export const MODULES_WITH_HK: ModuleInfo[] = [
  {
    moduleId: "privatkunde-kontoeröffnung",
    name: "Kontoeröffnung Privatkunde",
    path: "/privatkunde/basis/kontoeroeffnung",
    bereich: "Privatkunde",
    hks: ["b2", "d1", "d5"],
  },
  {
    moduleId: "banking-operations-kyc",
    name: "KYC & Sorgfaltspflicht",
    path: "/privatkunde/basis/kyc",
    bereich: "Privatkunde",
    hks: ["b1", "b2", "d1", "d5"],
  },
  {
    moduleId: "backoffice-kyc",
    name: "KYC / Compliance Back Office",
    path: "/backoffice/kyc",
    bereich: "Back Office",
    hks: ["b2", "c2"],
  },
  {
    moduleId: "banking-operations-zahlungsverkehr",
    name: "Zahlungsverkehr Back Office",
    path: "/backoffice/zahlungsverkehr",
    bereich: "Back Office",
    hks: ["b2", "c5", "d5"],
  },
  {
    moduleId: "privatkunde-zahlungsverkehr",
    name: "Zahlungsverkehr Privatkunde",
    path: "/privatkunde/basis/zahlungsverkehr",
    bereich: "Privatkunde",
    hks: ["d1", "d2", "d3", "d5"],
  },
  {
    moduleId: "privatkunde-sparen-konto",
    name: "Sparen & Konto",
    path: "/privatkunde/basis/sparen-konto",
    bereich: "Privatkunde",
    hks: ["d1", "d2", "d3"],
  },
  {
    moduleId: "privatkunde-fonds",
    name: "Fonds & Anlageberatung",
    path: "/privatkunde/anlage/fonds",
    bereich: "Anlage",
    hks: ["d1", "d2", "d3", "d5"],
  },
  {
    moduleId: "banking-operations-anlagekunde",
    name: "Anlagekunde",
    path: "/anlage/anlagekunde",
    bereich: "Anlage",
    hks: ["d1", "d2", "d3", "d4", "d5"],
  },
  {
    moduleId: "banking-operations-blankokredit",
    name: "Blankokredit",
    path: "/kredit/blankokredit",
    bereich: "Kredit",
    hks: ["c5", "d1", "d3", "d5"],
  },
  {
    moduleId: "banking-operations-mahnwesen",
    name: "Mahnwesen",
    path: "/kredit/mahnwesen",
    bereich: "Kredit",
    hks: ["b2", "c5", "d5"],
  },
  {
    moduleId: "anlage-aktien",
    name: "Aktien",
    path: "/anlage/aktien",
    bereich: "Anlage",
    hks: ["d2", "d3", "e3"],
  },
  {
    moduleId: "anlage-obligationen",
    name: "Obligationen",
    path: "/anlage/obligationen",
    bereich: "Anlage",
    hks: ["d2", "d3", "e3"],
  },
  {
    moduleId: "anlage-fonds",
    name: "Fonds (Vertiefung)",
    path: "/anlage/fonds",
    bereich: "Anlage",
    hks: ["d2", "d3", "e3"],
  },
  {
    moduleId: "privatkunde-vorsorge",
    name: "Vorsorge",
    path: "/privatkunde/vorsorge",
    bereich: "Privatkunde",
    hks: ["c5", "d1", "d2", "d3"],
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
