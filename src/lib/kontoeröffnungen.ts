export type DocumentId =
  | "basisvertrag"
  | "formular-a"
  | "formular-k"
  | "eigenerklaerung-nat"
  | "eigenerklaerung-jur-fatca"
  | "ausweis"
  | "wohnsitznachweis"
  | "hr-auszug"
  | "aktienbuch"
  | "beglaubigte-ausweiskopie"
  | "gesellschaftervertrag";

export const DOCUMENT_LABELS: Record<DocumentId, string> = {
  basisvertrag: "Basisvertrag",
  "formular-a": "Formular A",
  "formular-k": "Formular K",
  "eigenerklaerung-nat": "Eigenerklärung FATCA (juristische Person)",
  "eigenerklaerung-jur-fatca": "Eigenerklärung FATCA (juristische Person)",
  ausweis: "Ausweis / Passkopie",
  wohnsitznachweis: "Wohnsitznachweis",
  "hr-auszug": "HR-Auszug",
  aktienbuch: "Aktienbuch",
  "beglaubigte-ausweiskopie": "Beglaubigte Ausweiskopie Zeichnungsberechtigter",
  gesellschaftervertrag: "Gesellschaftervertrag (GmbH)",
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
  /** Documents shown in the Phase 1 checklist (curated per scenario) */
  checklistDocuments: DocumentId[];
  /** Correct answer for Phase 1 */
  requiredDocuments: DocumentId[];
  /** What the bank employee prepared (may contain errors) */
  dossierDocuments: DocumentId[];
  /** The problems in the dossier */
  issues: Issue[];
  /** Explicit list for Phase 2 "Möglicherweise fehlend" section (includes distractors).
   *  Falls back to requiredDocuments − dossierDocuments if absent. */
  possiblyMissingOptions?: DocumentId[];
  /** Learning block shown below the scenario (only from Phase 2 onward) */
  lernblock?: { title: string; items: Array<{ heading: string; body: string }> };
}

const LERNBLOCK_FORMULAR_AK = {
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
};

export const KONTO_SCENARIOS: KontoScenario[] = [
  // ─── Privatkunde ──────────────────────────────────────────────────────────
  {
    id: "privatkunde",
    title: "Kontoeröffnung Privatkunde",
    customerType: "Privatkunde",
    difficulty: "einfach",
    description:
      "Ein neuer Privatkunde möchte ein Konto eröffnen. Wählen Sie alle erforderlichen Dokumente aus.",
    checklistDocuments: [
      "basisvertrag",
      "formular-a",
      "formular-k",
      "eigenerklaerung-nat",
      "ausweis",
      "wohnsitznachweis",
      "hr-auszug",
      "aktienbuch",
    ],
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
      "wohnsitznachweis",          // correct – genuinely missing
      "formular-k",                // distractor – Firmenkunden-Formular
      "eigenerklaerung-jur-fatca", // distractor – Firmenkunden-FATCA
      "formular-a",                // trap – bereits im Dossier vorhanden
    ],
  },

  // ─── Firmenkunde GmbH (einfach) ───────────────────────────────────────────
  {
    id: "firmenkunde-gmbh",
    title: "Kontoeröffnung Firmenkunde GmbH",
    customerType: "Firmenkunde (GmbH)",
    difficulty: "einfach",
    description:
      "Eine GmbH möchte ein Geschäftskonto eröffnen. GmbH-Gesellschaften haben Stammanteile statt Aktien – kein Aktienbuch erforderlich. Wählen Sie die korrekten Dokumente aus und prüfen Sie das Dossier.",
    checklistDocuments: [
      // correct (5)
      "hr-auszug",
      "basisvertrag",
      "formular-k",
      "eigenerklaerung-jur-fatca",
      "beglaubigte-ausweiskopie",
      // distractors (4)
      "aktienbuch",           // trap: gehört zur AG, nicht zur GmbH
      "formular-a",           // trap: nur für Sitzgesellschaft
      "wohnsitznachweis",     // trap: nur für natürliche Personen
      "gesellschaftervertrag", // plausibel, aber nicht erforderlich
    ],
    requiredDocuments: [
      "hr-auszug",
      "basisvertrag",
      "formular-k",
      "eigenerklaerung-jur-fatca",
      "beglaubigte-ausweiskopie",
    ],
    dossierDocuments: [
      "hr-auszug",
      "basisvertrag",
      "formular-k",
      "eigenerklaerung-jur-fatca",
      "ausweis", // wrong – einfache Kopie statt beglaubigte Ausweiskopie
    ],
    issues: [
      {
        type: "wrong",
        documentId: "ausweis",
        explanation:
          "Eine einfache Ausweis- oder Passkopie ist nicht ausreichend. Bei Firmenkunden ist eine amtlich beglaubigte Ausweiskopie des Zeichnungsberechtigten erforderlich – die Person muss im HR als zeichnungsberechtigt eingetragen sein.",
      },
      {
        type: "missing",
        documentId: "beglaubigte-ausweiskopie",
        explanation:
          "Die beglaubigte Ausweiskopie des Zeichnungsberechtigten fehlt. Eine unbeglaubigte Fotokopie genügt regulatorisch nicht – nur die amtlich beglaubigte Kopie ist gültig.",
      },
    ],
    possiblyMissingOptions: [
      "beglaubigte-ausweiskopie",  // correct – fehlt im Dossier
      "aktienbuch",                // distractor – GmbH hat keine Aktien, kein Aktienbuch!
      "formular-a",                // distractor – falsche Formularart (Sitzgesellschaft)
      "eigenerklaerung-nat",       // distractor – Privatkunden-FATCA, nicht Firmenkunde
      "hr-auszug",                 // trap – bereits im Dossier vorhanden
    ],
    lernblock: {
      title: "GmbH: Kein Aktienbuch",
      items: [
        {
          heading: "GmbH hat Stammanteile – keine Aktien",
          body: "Eine GmbH emittiert keine Aktien, sondern Stammanteile. Daher ist kein Aktienbuch erforderlich. Merkhilfe: Nur die AG benötigt ein Aktienbuch.",
        },
        {
          heading: "Formular K — Für operativ tätige Gesellschaften (GmbH und AG)",
          body: "Listet wirtschaftlich Berechtigte mit mehr als 25% Beteiligung. Falls niemand über 25% hält: Geschäftsführer eintragen. Für Sitzgesellschaften gilt dagegen Formular A.",
        },
      ],
    },
  },

  // ─── Firmenkunde AG (mittel) ──────────────────────────────────────────────
  {
    id: "firmenkunde-ag",
    title: "Kontoeröffnung Firmenkunde AG",
    customerType: "Firmenkunde (AG)",
    difficulty: "mittel",
    description:
      "Eine operativ tätige Aktiengesellschaft möchte ein Geschäftskonto eröffnen. Wählen Sie die erforderlichen Dokumente aus und prüfen Sie das Dossier.",
    checklistDocuments: [
      // correct (6)
      "aktienbuch",
      "hr-auszug",
      "basisvertrag",
      "formular-k",
      "eigenerklaerung-jur-fatca",
      "beglaubigte-ausweiskopie",
      // distractors (3)
      "formular-a",            // trap: nur für Sitzgesellschaft
      "gesellschaftervertrag", // trap: plausibel für GmbH, aber nicht für AG relevant
    ],
    requiredDocuments: [
      "aktienbuch",
      "hr-auszug",
      "basisvertrag",
      "formular-k",
      "eigenerklaerung-jur-fatca",
      "beglaubigte-ausweiskopie",
    ],
    dossierDocuments: [
      "hr-auszug",
      "basisvertrag",
      "formular-k",
      "eigenerklaerung-jur-fatca",
      "beglaubigte-ausweiskopie",
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
      "aktienbuch",                // correct – genuinely missing
      "eigenerklaerung-nat",       // trap – Privatkunden-FATCA statt juristische Person
      "hr-auszug",                 // trap – bereits im Dossier vorhanden
      "ausweis",                   // distractor – einfache Kopie statt beglaubigte
      "formular-a",                // distractor – falsche Formularart für AG
    ],
    lernblock: LERNBLOCK_FORMULAR_AK,
  },

  // ─── Sitzgesellschaft (schwer) ────────────────────────────────────────────
  {
    id: "sitzgesellschaft",
    title: "Kontoeröffnung Sitzgesellschaft",
    customerType: "Sitzgesellschaft",
    difficulty: "schwer",
    description:
      "Eine Sitzgesellschaft ohne operative Tätigkeit möchte ein Konto eröffnen. Wählen Sie die erforderlichen Dokumente aus und prüfen Sie das vorbereitete Dossier auf Fehler.",
    checklistDocuments: [
      // correct (6)
      "aktienbuch",
      "hr-auszug",
      "basisvertrag",
      "formular-a",
      "eigenerklaerung-jur-fatca",
      "beglaubigte-ausweiskopie",
      // distractors (3)
      "formular-k",              // trap: nur für operativ tätige Gesellschaften
      "gesellschaftervertrag",   // trap: plausibel aber nicht erforderlich für Sitzgesellschaft
    ],
    requiredDocuments: [
      "aktienbuch",
      "hr-auszug",
      "basisvertrag",
      "formular-a",
      "eigenerklaerung-jur-fatca",
      "beglaubigte-ausweiskopie",
    ],
    dossierDocuments: [
      "basisvertrag",
      "formular-k",   // wrong – should be formular-a
      "hr-auszug",
      "aktienbuch",
      "beglaubigte-ausweiskopie",
      // missing: formular-a, eigenerklaerung-jur-fatca
    ],
    issues: [
      {
        type: "wrong",
        documentId: "formular-k",
        explanation:
          "Formular K gilt für operativ tätige Gesellschaften (AG/GmbH). Bei einer Sitzgesellschaft ohne operative Tätigkeit ist Formular A erforderlich — es erfasst ALLE im Aktienbuch eingetragenen Personen, unabhängig vom Beteiligungsanteil.",
      },
      {
        type: "missing",
        documentId: "formular-a",
        explanation:
          "Formular A fehlt. Es wurde fälschlicherweise durch Formular K ersetzt. Für Sitzgesellschaften ohne operative Tätigkeit ist Formular A — nicht Formular K — zwingend vorgeschrieben.",
      },
      {
        type: "missing",
        documentId: "eigenerklaerung-jur-fatca",
        explanation:
          "Die Eigenerklärung FATCA (juristische Person) fehlt. US-Verbindungen (Staatsbürgerschaft, Geburtsort USA, Greencard, US-Steuernummer) müssen bei jeder Firmenkonto-Eröffnung abgeklärt werden.",
      },
    ],
    possiblyMissingOptions: [
      "formular-a",                // correct – fehlt (formular-k ersetzt es fälschlich)
      "eigenerklaerung-jur-fatca", // correct – FATCA-Abklärung fehlt
      "hr-auszug",                 // trap – bereits im Dossier vorhanden
      "aktienbuch",                // trap – bereits im Dossier vorhanden
    ],
    lernblock: LERNBLOCK_FORMULAR_AK,
  },
];

export const PRIVATKUNDE_KONTO_SCENARIOS = KONTO_SCENARIOS.filter(
  (s) => s.id === "privatkunde"
);

export const FIRMENKUNDE_KONTO_SCENARIOS = KONTO_SCENARIOS.filter(
  (s) => s.id === "firmenkunde-gmbh" || s.id === "firmenkunde-ag" || s.id === "sitzgesellschaft"
);
