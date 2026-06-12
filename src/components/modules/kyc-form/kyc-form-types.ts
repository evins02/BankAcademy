export interface KycFormData {
  // Section 1 – Zur Person
  name: string;
  geburtsdatum: string;
  nationalitaet: string;
  wohnsitz: string;
  ausweisTyp: string;
  ausweisNummer: string;
  ausweisGueltigBis: string;

  // Section 2 – Beruflich
  beruf: string;
  arbeitgeber: string;
  beschaeftigungsgrad: string;

  // Section 3 – Finanziell
  jahreseinkommen: string;
  vermoegen: string;
  herkunftMittel: string;
  andereBankbeziehungen: string;

  // Section 4 – Familiär
  zivilstand: string;
  anzahlKinder: string;

  // Section 5 – Compliance
  wirtschaftlichBerechtigter: string;
  wibeName: string;
  pepStatus: string;
  pepErklaerung: string;
  zweckGeschaeftsbeziehung: string[];
  artGeschaeftsbeziehung: string;

  // Section 6 – Dokumente & Steuerstatus
  ausweisVorhanden: boolean;
  formularAAusgefuellt: boolean;
  unterschriftVorhanden: boolean;
  usPerson: string;
  usTin: string;
  geburtsorUSA: string;
  greencardInhaber: string;
}

export interface KycEvaluation {
  result: "BESTANDEN" | "NICHT BESTANDEN";
  errors: Array<{ field: string; message: string }>;
  correct: string[];
  scoreCorrect: number;
  scoreTotal: number;
  feedback: string;
}

export const EMPTY_FORM: KycFormData = {
  name: "",
  geburtsdatum: "",
  nationalitaet: "",
  wohnsitz: "",
  ausweisTyp: "",
  ausweisNummer: "",
  ausweisGueltigBis: "",
  beruf: "",
  arbeitgeber: "",
  beschaeftigungsgrad: "",
  jahreseinkommen: "",
  vermoegen: "",
  herkunftMittel: "",
  andereBankbeziehungen: "",
  zivilstand: "",
  anzahlKinder: "",
  wirtschaftlichBerechtigter: "",
  wibeName: "",
  pepStatus: "",
  pepErklaerung: "",
  zweckGeschaeftsbeziehung: [],
  artGeschaeftsbeziehung: "",
  ausweisVorhanden: false,
  formularAAusgefuellt: false,
  unterschriftVorhanden: false,
  usPerson: "",
  usTin: "",
  geburtsorUSA: "",
  greencardInhaber: "",
};

// Demo evaluation result shown when no API key is available
export const DEMO_EVALUATION: KycEvaluation = {
  result: "NICHT BESTANDEN",
  errors: [
    {
      field: "Ausweis gültig bis",
      message:
        "Der Ausweis ist am 12.03.2024 abgelaufen. Ein gültiges Ausweisdokument ist gemäss VSB 20 Art. 3 zwingend erforderlich. Die Kontoeröffnung kann nicht durchgeführt werden, bis ein gültiger Ausweis vorgelegt wird.",
    },
    {
      field: "Formular A ausgefüllt",
      message:
        "Formular A wurde nicht als ausgefüllt markiert. Auch wenn der wirtschaftlich Berechtigte identisch mit dem Kontoinhaber ist, muss Formular A gemäss VSB 20 Art. 4 zwingend ausgefüllt und archiviert werden. Keine Ausnahmen.",
    },
  ],
  correct: [
    "Personalien vollständig und korrekt erfasst",
    "Ausweis dokumentiert (Typ, Nummer, Vorhandensein)",
    "Berufliche Angaben vollständig und plausibel",
    "Finanzielle Verhältnisse nachvollziehbar dokumentiert",
    "Compliance-Felder ausgefüllt (PEP, Zweck, Art)",
    "FATCA-Fragen vollständig beantwortet",
  ],
  scoreCorrect: 6,
  scoreTotal: 8,
  feedback:
    "Das Formular ist grösstenteils korrekt ausgefüllt – gute Arbeit bei den Personalien und der Compliance-Abklärung. Zwei kritische Punkte wurden jedoch übersehen: Der abgelaufene Ausweis und das fehlende Formular A. Beide Fehler würden in der Praxis dazu führen, dass die Kontoeröffnung gestoppt werden muss.",
};
