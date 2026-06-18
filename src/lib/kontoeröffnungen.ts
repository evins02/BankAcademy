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
  "eigenerklaerung-nat": "Eigenerklärung Steuerstatus (FATCA)",
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
  /** Explicit list of DocumentIds shown in the "Möglicherweise fehlend" section.
   *  Include the genuinely missing docs AND plausible distractors.
   *  If absent, falls back to requiredDocuments − dossierDocuments. */
  possiblyMissingOptions?: DocumentId[];
  /** Optional learning block shown alongside the scenario */
  lernblock?: { title: string; items: Array<{ heading: string; body: string }> };
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
    possiblyMissingOptions: [
      "wohnsitznachweis",     // correct – genuinely missing
      "formular-k",           // distractor – Firmenkunden-Formular, hier nicht zutreffend
      "eigenerklaerung-jur",  // distractor – für juristische Personen, nicht für Privatkunden
      "formular-a",           // trap – bereits im Dossier vorhanden
    ],
  },
  {
    id: "firmenkunde-ag",
    title: "Kontoeröffnung Firmenkunde AG",
    customerType: "Firmenkunde (AG)",
    difficulty: "mittel",
    description:
      "Eine operativ tätige Aktiengesellschaft möchte ein Geschäftskonto eröffnen. Wählen Sie die erforderlichen Dokumente aus und prüfen Sie das Dossier.",
    requiredDocuments: [
      "basisvertrag",
      "formular-k",
      "eigenerklaerung-nat",
      "hr-auszug",
      "aktienbuch",
    ],
    dossierDocuments: [
      "basisvertrag",
      "formular-k",
      "eigenerklaerung-nat",
      "hr-auszug",
      // missing: aktienbuch
    ],
    issues: [
      {
        type: "missing",
        documentId: "aktienbuch",
        explanation:
          "Das Aktienbuch ist bei einer AG zwingend erforderlich, um die wirtschaftlich Berechtigten mit mehr als 25% Beteiligung identifizieren zu können.",
      },
    ],
    possiblyMissingOptions: [
      "aktienbuch",           // correct – genuinely missing
      "eigenerklaerung-jur",  // trap – klingt plausibel, aber FATCA (nat) ist hier korrekt
      "hr-auszug",            // trap – bereits im Dossier vorhanden, testet Aufmerksamkeit
      "ausweis",              // distractor – Privatkundendokument, nicht für AG
      "formular-a",           // distractor – falsche Formularart für operativ tätige AG
    ],
    lernblock: {
      title: "Formular A vs. Formular K",
      items: [
        {
          heading: "Formular K — Operativ tätige Gesellschaft (AG/GmbH)",
          body: "Bei Gesellschaften mit eigener Geschäftstätigkeit. Listet wirtschaftlich Berechtigte mit mehr als 25% Beteiligung. Falls niemand über 25% hält: Geschäftsführer eintragen.",
        },
        {
          heading: "Formular A — Sitzgesellschaft ohne operative Tätigkeit",
          body: "Bei Holdinggesellschaften und Sitzgesellschaften ohne eigene Geschäftstätigkeit. Listet ALLE im Aktienbuch eingetragenen Personen — unabhängig vom Beteiligungsanteil.",
        },
      ],
    },
  },
  {
    id: "sitzgesellschaft",
    title: "Kontoeröffnung Sitzgesellschaft",
    customerType: "Sitzgesellschaft",
    difficulty: "schwer",
    description:
      "Eine Sitzgesellschaft ohne operative Tätigkeit möchte ein Konto eröffnen. Wählen Sie die erforderlichen Dokumente aus und prüfen Sie das vorbereitete Dossier auf Fehler.",
    requiredDocuments: [
      "basisvertrag",
      "formular-a",
      "eigenerklaerung-nat",
      "hr-auszug",
      "aktienbuch",
    ],
    dossierDocuments: [
      "basisvertrag",
      "formular-k", // wrong – should be formular-a
      "hr-auszug",
      "aktienbuch",
      // missing: eigenerklaerung-nat
    ],
    issues: [
      {
        type: "wrong",
        documentId: "formular-k",
        explanation:
          "Formular K gilt für operativ tätige Gesellschaften (AG/GmbH). Bei einer Sitzgesellschaft ist Formular A erforderlich — es erfasst ALLE im Aktienbuch eingetragenen Personen, unabhängig vom Beteiligungsanteil.",
      },
      {
        type: "missing",
        documentId: "formular-a",
        explanation:
          "Formular A fehlt im Dossier. Es wurde fälschlicherweise durch Formular K ersetzt. Für Sitzgesellschaften ohne operative Tätigkeit ist Formular A — nicht Formular K — zwingend vorgeschrieben.",
      },
      {
        type: "missing",
        documentId: "eigenerklaerung-nat",
        explanation:
          "Die Eigenerklärung Steuerstatus (FATCA) fehlt. US-Verbindungen (Staatsbürgerschaft, Geburtsort USA, Greencard, US-Steuernummer) müssen bei jeder Kontoeröffnung abgeklärt werden.",
      },
    ],
    possiblyMissingOptions: [
      "eigenerklaerung-jur",  // distractor – veraltetes Formular, klingt plausibel
      "formular-a",           // correct – fehlt, weil formular-k es fälschlich ersetzt hat
      "eigenerklaerung-nat",  // correct – FATCA-Abklärung fehlt
      "aktienbuch",           // trap – bereits im Dossier vorhanden
      "ausweis",              // distractor – Privatkundendokument, nicht für Sitzgesellschaft
    ],
    lernblock: {
      title: "Formular A vs. Formular K",
      items: [
        {
          heading: "Formular K — Operativ tätige Gesellschaft (AG/GmbH)",
          body: "Bei Gesellschaften mit eigener Geschäftstätigkeit. Listet wirtschaftlich Berechtigte mit mehr als 25% Beteiligung. Falls niemand über 25% hält: Geschäftsführer eintragen.",
        },
        {
          heading: "Formular A — Sitzgesellschaft ohne operative Tätigkeit",
          body: "Bei Holdinggesellschaften und Sitzgesellschaften ohne eigene Geschäftstätigkeit. Listet ALLE im Aktienbuch eingetragenen Personen — unabhängig vom Beteiligungsanteil.",
        },
      ],
    },
  },
];

export const PRIVATKUNDE_KONTO_SCENARIOS = KONTO_SCENARIOS.filter(
  (s) => s.id === "privatkunde"
);

export const FIRMENKUNDE_KONTO_SCENARIOS = KONTO_SCENARIOS.filter(
  (s) => s.id === "firmenkunde-ag" || s.id === "sitzgesellschaft"
);
