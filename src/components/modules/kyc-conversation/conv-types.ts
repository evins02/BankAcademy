export interface ConvMessage {
  role: "student" | "customer";
  content: string;
}

export interface CustomerApiResponse {
  customerMessage: string;
  irrelevant: boolean;
}

export interface ConvEvaluation {
  result: "BESTANDEN" | "NICHT BESTANDEN";
  conversationAsked: string[];
  conversationMissing: string[];
  formErrors: { field: string; message: string }[];
  formCorrect: string[];
  criticalErrors: string[];
  conversationScore: number;
  conversationTotal: number;
  formScore: number;
  formTotal: number;
  irrelevantCount: number;
  irrelevantPenalty: number;
  feedback: string;
}

export const REQUIRED_QUESTIONS: { key: string; label: string }[] = [
  { key: "beruf", label: "Beruf & Arbeitgeber" },
  { key: "einkommen", label: "Einkommen & Vermögen" },
  { key: "herkunft", label: "Herkunft der Mittel" },
  { key: "bankbeziehungen", label: "Andere Bankbeziehungen" },
  { key: "zweck", label: "Zweck der Kontobeziehung" },
  { key: "wibe", label: "Wirtschaftlich Berechtigter" },
  { key: "pep", label: "PEP Status" },
  { key: "fatca", label: "FATCA / US-Verbindungen" },
  { key: "ausweis", label: "Ausweis eingesehen" },
];

export const DEMO_MESSAGES: {
  student: string;
  customer: string;
  revealed: string[];
}[] = [
  {
    student: "Guten Tag, Herr Kowalski. Was kann ich für Sie tun?",
    customer: "Guten Tag. Ich möchte gerne ein Privatkonto eröffnen.",
    revealed: [],
  },
  {
    student: "Was ist Ihr Beruf und wo arbeiten Sie?",
    customer: "Ich bin Projektleiter IT bei der Swisscom AG, 100 Prozent.",
    revealed: ["beruf"],
  },
  {
    student: "Wie hoch ist Ihr Jahreseinkommen und haben Sie weiteres Vermögen?",
    customer:
      "Mein Nettoeinkommen beträgt CHF 95'000 pro Jahr. An Ersparnissen habe ich ungefähr CHF 45'000.",
    revealed: ["einkommen"],
  },
  {
    student: "Woher stammt dieses Vermögen?",
    customer: "Das kommt alles aus meinem Lohn.",
    revealed: ["herkunft"],
  },
  {
    student: "Haben Sie noch Konten bei anderen Banken?",
    customer: "Ja, ich habe ein Konto bei PostFinance.",
    revealed: ["bankbeziehungen"],
  },
  {
    student: "Für welchen Zweck möchten Sie dieses Konto nutzen?",
    customer: "Als Lohnkonto und für den allgemeinen Zahlungsverkehr.",
    revealed: ["zweck"],
  },
  {
    student: "Sind Sie der wirtschaftlich Berechtigte an diesem Konto?",
    customer: "Ja, das bin ich selbst.",
    revealed: ["wibe"],
  },
  {
    student: "Sind Sie eine politisch exponierte Person?",
    customer: "Nein, das bin ich nicht.",
    revealed: ["pep"],
  },
  {
    student: "Haben Sie Verbindungen in die USA – Staatsbürgerschaft, Geburtsort oder Greencard?",
    customer: "Nein, keine US-Verbindungen.",
    revealed: ["fatca"],
  },
  {
    student: "Darf ich bitte Ihren Ausweis sehen?",
    customer: "Natürlich, hier ist mein Pass.",
    revealed: ["ausweis"],
  },
];

export const DEMO_EVALUATION: ConvEvaluation = {
  result: "NICHT BESTANDEN",
  conversationAsked: [
    "Beruf & Arbeitgeber",
    "Einkommen & Vermögen",
    "Herkunft der Mittel",
    "Andere Bankbeziehungen",
    "Zweck der Kontobeziehung",
    "Wirtschaftlich Berechtigter",
    "PEP Status",
    "FATCA / US-Verbindungen",
    "Ausweis eingesehen",
  ],
  conversationMissing: [],
  formErrors: [
    {
      field: "Ausweis gültig bis",
      message:
        "Ausweis abgelaufen seit 12.03.2024. Gemäss VSB 20 Art. 3 ist ein gültiger Ausweis Pflicht – Kontoeröffnung muss abgebrochen werden.",
    },
    {
      field: "Formular A ausgefüllt",
      message:
        "Formular A fehlt. Auch wenn WiBe identisch mit Kontoinhaber, muss Formular A gemäss VSB 20 Art. 4 zwingend ausgefüllt und archiviert werden.",
    },
  ],
  formCorrect: [
    "Personalien vollständig und korrekt",
    "Berufliche Angaben vollständig",
    "Finanzielle Verhältnisse dokumentiert",
    "Compliance-Felder ausgefüllt (PEP, Zweck, Art)",
    "FATCA vollständig beantwortet",
  ],
  criticalErrors: [
    "Abgelaufener Ausweis – Kontoeröffnung nicht möglich (VSB 20 Art. 3)",
    "Formular A fehlt – Pflichtdokument auch bei WiBe = Kontoinhaber (VSB 20 Art. 4)",
  ],
  conversationScore: 9,
  conversationTotal: 9,
  formScore: 6,
  formTotal: 8,
  irrelevantCount: 0,
  irrelevantPenalty: 0,
  feedback:
    "Das Gespräch wurde sehr strukturiert und professionell geführt – alle neun Pflichtfragen wurden gestellt. Beim Formular wurden jedoch zwei kritische Fehler gemacht: Das abgelaufene Ablaufdatum des Ausweises wurde nicht erkannt, und Formular A wurde vergessen. Beide Fehler sind prüfungsrelevant und würden in der Praxis zur Ablehnung der Kontoeröffnung führen.",
};
