// ── Shared evaluation types ────────────────────────────────────────────────

export interface CreditEvaluation {
  result: "BESTANDEN" | "NICHT BESTANDEN";
  calcResults: Array<{ label: string; isCorrect: boolean; correctValue: string }>;
  calcScore: number;
  calcTotal: number;
  riskenErkannt: string[];
  riskenUebersehen: string[];
  riskScore: number;
  riskTotal: number;
  entscheidKorrekt: boolean;
  feedback: string;
}

// ── Hypothek Rossi ─────────────────────────────────────────────────────────

export interface HypothekRossiForm {
  // Section 1 – Belehnung
  verkehrswert: string;
  hypothekTotal: string;
  belehnungProzent: string;
  belehnungResult: "" | "im_rahmen" | "grenzwertig" | "ueberschritten";
  // Section 2 – Eigenmittel
  totalEM: string;
  echteEM: string;
  mindestEM: string;
  eigenmittelResult: "" | "erfuellt" | "nicht_erfuellt";
  // Section 3 – Tragbarkeit heute
  zinskosten: string;
  nebenkosten: string;
  amortisation: string;
  totalJahreskosten: string;
  jahreseinkommen: string;
  tragbarkeitProzent: string;
  tragbarkeitResult: "" | "bestanden" | "nicht_bestanden";
  // Section 4 – Tragbarkeit Rentenalter
  jahreBisPension: string;
  geschaetztesRenteneinkommen: string;
  tragbarkeitRenteProzent: string;
  tragbarkeitRenteResult: "" | "bestanden" | "nicht_bestanden";
  // Section 5 – Risiken
  risiken: string;
  // Section 6 – Entscheid
  entscheid: "" | "bewilligen" | "bewilligen_auflagen" | "rueckfrage" | "ablehnen";
  begruendung: string;
}

export const EMPTY_HYPOTHEK_ROSSI: HypothekRossiForm = {
  verkehrswert: "", hypothekTotal: "", belehnungProzent: "", belehnungResult: "",
  totalEM: "", echteEM: "", mindestEM: "", eigenmittelResult: "",
  zinskosten: "", nebenkosten: "", amortisation: "", totalJahreskosten: "",
  jahreseinkommen: "", tragbarkeitProzent: "", tragbarkeitResult: "",
  jahreBisPension: "", geschaetztesRenteneinkommen: "", tragbarkeitRenteProzent: "",
  tragbarkeitRenteResult: "", risiken: "",
  entscheid: "", begruendung: "",
};

// ── Blankokredit Meier ─────────────────────────────────────────────────────

export interface BlankokreditMeierForm {
  // Section 1 – Kreditfähigkeit
  nettoeinkommenMonat: string;
  betreibungsregister: "" | "vorhanden" | "fehlt";
  zekAuskunft: "" | "vorhanden" | "fehlt" | "eintraege";
  leasingRestsaldo: string;
  kreditkarteLimite: string;
  andereKredite: string;
  totalVerpflichtungen: string;
  neuerKredit: string;
  totalInklNeu: string;
  geteiltDurch36: string;
  freibetrag: string;
  kreditfaehigkeit: "" | "gegeben" | "nicht_gegeben";
  // Section 2 – Kreditwürdigkeit
  zekBeurteilung: string;
  allgemeineBeurteilung: string;
  // Section 3 – Laufzeit
  beantragteLaufzeit: string;
  laufzeitResult: "" | "konform" | "nicht_konform";
  // Section 4 – Entscheid
  entscheid: "" | "bewilligen" | "bewilligen_auflagen" | "rueckfrage" | "ablehnen";
  begruendung: string;
}

export const EMPTY_BLANKOKREDIT_MEIER: BlankokreditMeierForm = {
  nettoeinkommenMonat: "", betreibungsregister: "", zekAuskunft: "",
  leasingRestsaldo: "", kreditkarteLimite: "", andereKredite: "",
  totalVerpflichtungen: "", neuerKredit: "", totalInklNeu: "",
  geteiltDurch36: "", freibetrag: "", kreditfaehigkeit: "",
  zekBeurteilung: "", allgemeineBeurteilung: "",
  beantragteLaufzeit: "", laufzeitResult: "",
  entscheid: "", begruendung: "",
};

// ── Firmenkredit Müller Bau ─────────────────────────────────────────────────

export interface FirmenkreditMuellerForm {
  // Section 1 – Deckungsgrad
  cashflow: string;
  zinsaufwand: string;
  anderthalbProzentFK: string;
  nennerTotal: string;
  deckungsgrad: string;
  deckungsgradResult: "" | "erfuellt" | "nicht_erfuellt";
  // Section 2 – EK-Quote
  eigenkapital: string;
  gesamtkapital: string;
  ekQuote: string;
  ekQuoteResult: "" | "stark" | "akzeptabel" | "schwach";
  // Section 3 – Qualitative Risiken
  branchenrisiko: "" | "tief" | "mittel" | "hoch";
  trackRecord: "" | "gut" | "akzeptabel" | "schwach";
  sicherheiten: "" | "stark" | "akzeptabel" | "schwach";
  weitereRisiken: string;
  // Section 4 – Gesamtrisiko
  gesamtrisiko: "" | "tief" | "mittel" | "erhoeht" | "hoch";
  // Section 5 – Entscheid
  entscheid: "" | "bewilligen" | "bewilligen_auflagen" | "rueckfrage" | "ablehnen";
  auflagenBegruendung: string;
}

export const EMPTY_FIRMENKREDIT_MUELLER: FirmenkreditMuellerForm = {
  cashflow: "", zinsaufwand: "", anderthalbProzentFK: "",
  nennerTotal: "", deckungsgrad: "", deckungsgradResult: "",
  eigenkapital: "", gesamtkapital: "", ekQuote: "", ekQuoteResult: "",
  branchenrisiko: "", trackRecord: "", sicherheiten: "", weitereRisiken: "",
  gesamtrisiko: "",
  entscheid: "", auflagenBegruendung: "",
};

// ── Neubewilligung Schneider ─────────────────────────────────────────────

export interface NeubewilligungSchneiderForm {
  // Section 1 – Aktuelle Belehnung
  aktuellerSchaetzwert: string;
  hypothek: string;
  belehnungProzent: string;
  veraenderungProzent: string;
  belehnungResult: "" | "im_rahmen" | "grenzwertig" | "ueberschritten";
  // Section 2 – Aktuelle Tragbarkeit
  zins5: string;
  nebenkosten1: string;
  totalKosten: string;
  aktuellesEinkommen: string;
  tragbarkeitProzent: string;
  tragbarkeitResult: "" | "bestanden" | "grenzwertig" | "nicht_bestanden";
  // Section 3 – Veränderungen
  einkommenVeraendert: "" | "gestiegen" | "gleich" | "gesunken";
  liegenschaftswert: "" | "gestiegen" | "gleich" | "gesunken";
  neueVerpflichtungen: "" | "ja" | "nein";
  details: string;
  // Section 4 – Massnahmen
  massnahmen: "" | "keine" | "ueberwachung" | "amortisation" | "gespraech" | "kuendigung";
  begruendungMassnahmen: string;
}

export const EMPTY_NEUBEWILLIGUNG_SCHNEIDER: NeubewilligungSchneiderForm = {
  aktuellerSchaetzwert: "", hypothek: "", belehnungProzent: "",
  veraenderungProzent: "", belehnungResult: "",
  zins5: "", nebenkosten1: "", totalKosten: "",
  aktuellesEinkommen: "", tragbarkeitProzent: "", tragbarkeitResult: "",
  einkommenVeraendert: "", liegenschaftswert: "", neueVerpflichtungen: "",
  details: "", massnahmen: "", begruendungMassnahmen: "",
};

// ── Demo evaluations ────────────────────────────────────────────────────────

export const DEMO_EVAL_HYPOTHEK: CreditEvaluation = {
  result: "NICHT BESTANDEN",
  calcResults: [
    { label: "Belehnung (80%)", isCorrect: false, correctValue: "80.0% – exakt an der Grenze; verschlechtert sich bei Wertverlust" },
    { label: "Echte Eigenmittel (8.3%)", isCorrect: false, correctValue: "CHF 100'000 = 8.3% – unter Minimum 10%!" },
    { label: "Tragbarkeit heute (42.9%)", isCorrect: false, correctValue: "72'000/168'000 = 42.9% – deutlich über Maximum 33%" },
    { label: "Tragbarkeit Rentenalter", isCorrect: false, correctValue: "Einkommen sinkt massiv – kritisch, da Pension in nur 13 Jahren" },
  ],
  calcScore: 0, calcTotal: 4,
  riskenErkannt: [],
  riskenUebersehen: [
    "Echte Eigenmittel unter 10%-Minimum (nur 8.3%)",
    "Tragbarkeit heute 42.9% – klar nicht bestanden",
    "Pensionierung Marco in 13 Jahren – Einkommen bricht ein",
    "PK-Vorbezug CHF 140'000 zählt nicht als echte Eigenmittel",
  ],
  riskScore: 0, riskTotal: 4,
  entscheidKorrekt: false,
  feedback: "Demo-Auswertung: Der Antrag Rossi hat zwei kritische K.O.-Kriterien: Die echten Eigenmittel unterschreiten das Minimum von 10%, und die Tragbarkeit von 42.9% liegt klar über dem Maximum von 33%. Korrekte Entscheidung: Ablehnen.",
};

export const DEMO_EVAL_BLANKOKREDIT: CreditEvaluation = {
  result: "NICHT BESTANDEN",
  calcResults: [
    { label: "Kreditfähigkeitsberechnung", isCorrect: false, correctValue: "(24'200 + 25'000) / 36 = CHF 1'367/Mt; Freibetrag CHF 3'100 > CHF 1'367 → Gegeben" },
    { label: "Kreditkarte als Verpflichtung", isCorrect: false, correctValue: "Kreditkarte-Limite CHF 8'000 zählt als Verpflichtung gemäss KKG" },
    { label: "Laufzeit KKG-konform", isCorrect: false, correctValue: "48 Monate beantragt, KKG-Maximum 36 Monate → Rückfrage nötig" },
  ],
  calcScore: 0, calcTotal: 3,
  riskenErkannt: [],
  riskenUebersehen: [
    "Laufzeit 48 Monate überschreitet KKG-Maximum 36 Monate",
    "Kreditkarte-Limite muss als Verpflichtung eingerechnet werden",
  ],
  riskScore: 0, riskTotal: 2,
  entscheidKorrekt: false,
  feedback: "Demo-Auswertung: Kreditfähigkeit ist gegeben, aber die beantragte Laufzeit von 48 Monaten überschreitet das KKG-Maximum. Korrekte Entscheidung: Rückfrage an Berater wegen Laufzeit.",
};

export const DEMO_EVAL_FIRMENKREDIT: CreditEvaluation = {
  result: "NICHT BESTANDEN",
  calcResults: [
    { label: "Deckungsgrad", isCorrect: false, correctValue: "192'000 / 34'300 = 5.6 – sehr gut (Minimum 1.2)" },
    { label: "EK-Quote", isCorrect: false, correctValue: "180'000 / 600'000 = 30% – akzeptabel" },
  ],
  calcScore: 0, calcTotal: 2,
  riskenErkannt: [],
  riskenUebersehen: [
    "Baugewerbe = zyklische Branche (erhöhtes Branchenrisiko)",
    "Gründung 2018 = wenig Track Record",
    "Zession Debitoren = schwache Sicherheit für CHF 350'000",
  ],
  riskScore: 0, riskTotal: 3,
  entscheidKorrekt: false,
  feedback: "Demo-Auswertung: Die finanziellen Kennzahlen sind solide, aber die qualitativen Risiken (Branche, Alter, Sicherheit) müssen klar benannt werden. Korrekte Entscheidung: Bewilligen mit Auflagen.",
};

export const DEMO_EVAL_NEUBEWILLIGUNG: CreditEvaluation = {
  result: "NICHT BESTANDEN",
  calcResults: [
    { label: "Aktuelle Belehnung", isCorrect: false, correctValue: "680'000 / 820'000 = 82.9% – über Maximum 80%!" },
    { label: "Aktuelle Tragbarkeit", isCorrect: false, correctValue: "42'200 / 95'000 = 44.4% – deutlich zu hoch!" },
  ],
  calcScore: 0, calcTotal: 2,
  riskenErkannt: [],
  riskenUebersehen: [
    "Belehnung 82.9% überschreitet Maximum (Liegenschaftswert gesunken)",
    "Tragbarkeit 44.4% weit über Maximum 33%",
    "Einkommen um CHF 20'000 gesunken seit Bewilligung",
    "Neue Verpflichtung Autoleasing hinzugekommen",
  ],
  riskScore: 0, riskTotal: 4,
  entscheidKorrekt: false,
  feedback: "Demo-Auswertung: Der Kredit Schneider verletzt heute sowohl die Belehnungs- als auch die Tragbarkeitsgrenze. Erforderliche Massnahmen: Sofortgespräch mit Kunden, Amortisation verlangen, erhöhte Überwachung.",
};
