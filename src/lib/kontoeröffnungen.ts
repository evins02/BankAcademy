export type DocumentId =
  | "basisvertrag"
  | "formular-a"
  | "formular-k"
  | "eigenerklaerung-nat"
  | "eigenerklaerung-jur"
  | "ausweis"
  | "wohnsitznachweis"
  | "hr-auszug"
  | "aktienbuch";

export const DOCUMENT_LABELS: Record<DocumentId, string> = {
  basisvertrag: "Basisvertrag",
  "formular-a": "Formular A",
  "formular-k": "Formular K",
  "eigenerklaerung-nat": "Eigenerklärung natürliche Person",
  "eigenerklaerung-jur": "Eigenerklärung juristische Person",
  ausweis: "Ausweis / Passkopie",
  wohnsitznachweis: "Wohnsitznachweis",
  "hr-auszug": "HR-Auszug",
  aktienbuch: "Aktienbuch",
};

export const ALL_DOCUMENT_IDS = Object.keys(DOCUMENT_LABELS) as DocumentId[];

export type Difficulty = "einfach" | "mittel" | "schwer";

export interface Issue {
  type: "missing" | "wrong";
  documentId: DocumentId;
  explanation: string;
}

export interface KontoScenario {
  id: string;
  title: string;
  customerType: string;
  difficulty: Difficulty;
  description: string;
  /** Correct answer for Phase 1 */
  requiredDocuments: DocumentId[];
  /** What the bank employee prepared (may contain errors) */
  dossierDocuments: DocumentId[];
  /** The problems in the dossier */
  issues: Issue[];
}

export const KONTO_SCENARIOS: KontoScenario[] = [
  {
    id: "privatkunde",
    title: "Kontoeröffnung Privatkunde",
    customerType: "Privatkunde",
    difficulty: "einfach",
    description:
      "Ein neuer Privatkunde möchte ein Konto eröffnen. Wählen Sie alle erforderlichen Dokumente aus.",
    requiredDocuments: [
      "basisvertrag",
      "formular-a",
      "eigenerklaerung-nat",
      "ausweis",
      "wohnsitznachweis",
    ],
    dossierDocuments: [
      "basisvertrag",
      "formular-a",
      "eigenerklaerung-nat",
      "ausweis",
      // missing: wohnsitznachweis
    ],
    issues: [
      {
        type: "missing",
        documentId: "wohnsitznachweis",
        explanation:
          "Ohne Wohnsitznachweis kann die Identität des Kunden nicht vollständig verifiziert werden. Dies ist eine regulatorische Anforderung.",
      },
    ],
  },
  {
    id: "firmenkunde-ag",
    title: "Kontoeröffnung Firmenkunde AG",
    customerType: "Firmenkunde (AG)",
    difficulty: "mittel",
    description:
      "Eine Aktiengesellschaft möchte ein Geschäftskonto eröffnen. Stellen Sie das korrekte Dossier zusammen.",
    requiredDocuments: [
      "basisvertrag",
      "formular-k",
      "eigenerklaerung-jur",
      "hr-auszug",
      "aktienbuch",
    ],
    dossierDocuments: [
      "basisvertrag",
      "formular-k",
      "eigenerklaerung-jur",
      "hr-auszug",
      // missing: aktienbuch
    ],
    issues: [
      {
        type: "missing",
        documentId: "aktienbuch",
        explanation:
          "Das Aktienbuch ist bei einer AG zwingend erforderlich, um die wirtschaftlich Berechtigten identifizieren zu können.",
      },
    ],
  },
  {
    id: "sitzgesellschaft",
    title: "Kontoeröffnung Sitzgesellschaft",
    customerType: "Sitzgesellschaft",
    difficulty: "schwer",
    description:
      "Eine Sitzgesellschaft ohne operative Tätigkeit möchte ein Konto eröffnen. Prüfen Sie das vorbereitete Dossier auf Fehler.",
    requiredDocuments: [
      "basisvertrag",
      "formular-a",
      "eigenerklaerung-jur",
      "hr-auszug",
      "aktienbuch",
    ],
    dossierDocuments: [
      "basisvertrag",
      "formular-k", // wrong – should be formular-a
      "hr-auszug",
      "aktienbuch",
      // missing: eigenerklaerung-jur
    ],
    issues: [
      {
        type: "wrong",
        documentId: "formular-k",
        explanation:
          "Bei einer Sitzgesellschaft wird Formular A benötigt, nicht Formular K. Formular K ist für juristische Personen mit operativer Tätigkeit.",
      },
      {
        type: "missing",
        documentId: "eigenerklaerung-jur",
        explanation:
          "Die Eigenerklärung juristische Person ist obligatorisch, da es sich um eine juristische Person handelt.",
      },
    ],
  },
];

export const PRIVATKUNDE_KONTO_SCENARIOS = KONTO_SCENARIOS.filter(
  (s) => s.id === "privatkunde"
);

export const FIRMENKUNDE_KONTO_SCENARIOS = KONTO_SCENARIOS.filter(
  (s) => s.id === "firmenkunde-ag" || s.id === "sitzgesellschaft"
);
