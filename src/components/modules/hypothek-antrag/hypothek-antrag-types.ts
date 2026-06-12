export interface HypothekFormData {
  // Section 1 – Belehnung
  verkehrswert: string;
  hypothekBetrag: string;
  belehnungProzent: string;
  belehnungResult: "" | "bestanden" | "nicht_bestanden";

  // Section 2 – Eigenmittel
  totalEigenmittel: string;
  echteEigenmittel: string;
  mindestEM: string;
  eigenmittelResult: "" | "erfuellt" | "nicht_erfuellt";

  // Section 3 – Tragbarkeit
  zinskosten: string;
  nebenkosten: string;
  amortisationJahr: string;
  totalJahreskosten: string;
  bruttoeinkommen: string;
  tragbarkeitProzent: string;
  tragbarkeitResult: "" | "bestanden" | "nicht_bestanden";

  // Section 4 – Amortisation
  zweiteHypothek: "" | "ja" | "nein";
  amortisationsplan: "" | "ja" | "nein" | "nicht_angegeben";
  amortisationspflicht: "" | "ja" | "nein" | "unklar";

  // Section 5 – Beurteilung
  risiken: string;
  empfehlung: "" | "bewilligen" | "bewilligen_auflagen" | "ablehnen";
  begruendung: string;
}

export interface HypothekCalcResult {
  label: string;
  isCorrect: boolean;
  correctValue: string;
}

export interface HypothekEvaluation {
  result: "BESTANDEN" | "NICHT BESTANDEN";
  calcResults: HypothekCalcResult[];
  calcScore: number;
  calcTotal: number;
  riskenErkannt: string[];
  riskenUebersehen: string[];
  riskScore: number;
  riskTotal: number;
  criticalErrors: string[];
  empfehlungKorrekt: boolean;
  feedback: string;
}

export const EMPTY_FORM: HypothekFormData = {
  verkehrswert: "",
  hypothekBetrag: "",
  belehnungProzent: "",
  belehnungResult: "",
  totalEigenmittel: "",
  echteEigenmittel: "",
  mindestEM: "",
  eigenmittelResult: "",
  zinskosten: "",
  nebenkosten: "",
  amortisationJahr: "",
  totalJahreskosten: "",
  bruttoeinkommen: "",
  tragbarkeitProzent: "",
  tragbarkeitResult: "",
  zweiteHypothek: "",
  amortisationsplan: "",
  amortisationspflicht: "",
  risiken: "",
  empfehlung: "",
  begruendung: "",
};

export const DEMO_EVALUATION: HypothekEvaluation = {
  result: "NICHT BESTANDEN",
  calcResults: [
    {
      label: "Belehnung",
      isCorrect: false,
      correctValue: "81.05% – überschreitet Maximum von 80%",
    },
    {
      label: "Echte Eigenmittel",
      isCorrect: false,
      correctValue: "CHF 100'000 (ohne PK-Vorbezug CHF 80'000)",
    },
    {
      label: "Tragbarkeit",
      isCorrect: false,
      correctValue: "37.5% (mit Anna) – grenzwertig; 52.9% ohne Anna – nicht bestanden",
    },
    {
      label: "Amortisation 2. Hypothek",
      isCorrect: false,
      correctValue: "CHF 10'167/Jahr über 15 Jahre – Plan fehlt vollständig",
    },
  ],
  calcScore: 0,
  calcTotal: 4,
  riskenErkannt: [],
  riskenUebersehen: [
    "Belehnung 81.05% überschreitet Maximum 80%",
    "PK-Vorbezug CHF 80'000 zählt nicht als echte Eigenmittel",
    "Einkommen Anna unsicher – 80% Pensum, läuft Ende Jahr aus",
    "Amortisationsplan für 2. Hypothek fehlt",
  ],
  riskScore: 0,
  riskTotal: 4,
  criticalErrors: [
    "Belehnung 81.05% überschreitet das Maximum von 80%",
    "Amortisationsplan für 2. Hypothek fehlt (gesetzliche Pflicht)",
    "Einkommen Anna nicht gesichert – Tragbarkeit nur mit Stefan: 52.9% (nicht bestanden)",
  ],
  empfehlungKorrekt: false,
  feedback:
    "Demo-Auswertung: Der Hypothekarantrag Brandenberger weist mehrere kritische Mängel auf. Die Belehnung von 81.05% überschreitet die zulässige Grenze von 80%. Der Amortisationsplan für die 2. Hypothek fehlt vollständig. Das Einkommen von Anna Brandenberger ist nicht gesichert. Korrekte Empfehlung: Ablehnen oder Bewilligen mit strengen Auflagen.",
};
