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
  | "gesellschaftervertrag"
  | "jahresrechnung"
  | "vollmacht"
  | "wohnsitznachweis-gf"
  | "beglaubigte-ausweiskopie-2"
  | "pep-erklaerung"
  | "konzernstruktur";

export const DOCUMENT_LABELS: Record<DocumentId, string> = {
  basisvertrag: "Basisvertrag",
  "formular-a": "Formular A",
  "formular-k": "Formular K",
  "eigenerklaerung-nat": "Eigenerklärung FATCA (natürliche Person)",
  "eigenerklaerung-jur-fatca": "Eigenerklärung FATCA (juristische Person)",
  ausweis: "Ausweis / Passkopie",
  wohnsitznachweis: "Wohnsitznachweis",
  "hr-auszug": "HR-Auszug",
  aktienbuch: "Aktienbuch",
  "beglaubigte-ausweiskopie": "Beglaubigte Ausweiskopie Zeichnungsberechtigter",
  gesellschaftervertrag: "Gesellschaftervertrag (GmbH)",
  jahresrechnung: "Jahresrechnung",
  vollmacht: "Vollmacht",
  "wohnsitznachweis-gf": "Wohnsitznachweis Geschäftsführer",
  "beglaubigte-ausweiskopie-2": "Beglaubigte Ausweiskopie 2. Zeichnungsberechtigter",
  "pep-erklaerung": "PEP-Erklärung / EDD-Formular",
  konzernstruktur: "Konzernstrukturdiagramm / UBO-Nachweis",
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
      "jahresrechnung",            // distractor – plausibel, aber nicht für Kontoeröffnung
      "gesellschaftervertrag",     // distractor – plausibel, aber nicht erforderlich
      "vollmacht",                 // distractor – nur bei Vertretung nötig
      "wohnsitznachweis-gf",       // distractor – nicht standard bei Firmenkonto
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
      "jahresrechnung",            // distractor – plausibel, aber nicht für Kontoeröffnung
      "gesellschaftervertrag",     // distractor – plausibel, aber nicht erforderlich
      "vollmacht",                 // distractor – nur bei Vertretung nötig
      "wohnsitznachweis-gf",       // distractor – nicht standard bei Firmenkonto
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
      "jahresrechnung",            // distractor – plausibel, aber nicht für Kontoeröffnung
      "gesellschaftervertrag",     // distractor – plausibel, aber nicht erforderlich
      "vollmacht",                 // distractor – nur bei Vertretung nötig
      "wohnsitznachweis-gf",       // distractor – nicht standard bei Firmenkonto
    ],
    lernblock: LERNBLOCK_FORMULAR_AK,
  },

  // ─── Einzelfirma (mittel) ─────────────────────────────────────────────────
  {
    id: "einzelfirma-geschaeftskonto",
    title: "Einzelunternehmer – Geschäftskonto eröffnen",
    customerType: "Einzelunternehmer (Einzelfirma)",
    difficulty: "mittel",
    description:
      "Thomas Berger (42), selbständiger Elektriker mit im HR eingetragener Einzelfirma (Umsatz CHF 180'000 p.a.), möchte ein Geschäftskonto eröffnen. Die Kundenberaterin hat das Dossier vorbereitet – prüfen Sie es auf Fehler.",
    checklistDocuments: [
      // correct (6)
      "basisvertrag",
      "hr-auszug",
      "eigenerklaerung-nat",
      "formular-a",
      "ausweis",
      "wohnsitznachweis",
      // distractors / traps (4)
      "eigenerklaerung-jur-fatca",    // trap: falsche FATCA-Erklärung
      "formular-k",                    // trap: nur für juristische Personen
      "aktienbuch",                    // trap: nur für AG
      "beglaubigte-ausweiskopie",      // trap: nur für juristische Personen
    ],
    requiredDocuments: [
      "basisvertrag",
      "hr-auszug",
      "eigenerklaerung-nat",
      "formular-a",
      "ausweis",
      "wohnsitznachweis",
    ],
    dossierDocuments: [
      "basisvertrag",
      "hr-auszug",
      "eigenerklaerung-jur-fatca",    // wrong – should be eigenerklaerung-nat
      "formular-a",
      "ausweis",
      // missing: wohnsitznachweis, eigenerklaerung-nat
    ],
    issues: [
      {
        type: "wrong",
        documentId: "eigenerklaerung-jur-fatca",
        explanation:
          "Der Einzelunternehmer ist rechtlich eine natürliche Person – die Einzelfirma hat keine eigene Rechtspersönlichkeit. Die korrekte FATCA-Erklärung ist diejenige für natürliche Personen (Eigenerklärung FATCA natürliche Person).",
      },
      {
        type: "missing",
        documentId: "eigenerklaerung-nat",
        explanation:
          "Die Eigenerklärung FATCA für natürliche Personen fehlt. Sie muss die fälschlicherweise verwendete FATCA-Erklärung für juristische Personen ersetzen.",
      },
      {
        type: "missing",
        documentId: "wohnsitznachweis",
        explanation:
          "Der Wohnsitznachweis von Thomas Berger fehlt. Als natürliche Person muss sein aktueller Wohnsitz belegt werden (z.B. aktuelle Rechnung, Wohnsitzbescheinigung der Gemeinde).",
      },
    ],
    possiblyMissingOptions: [
      "eigenerklaerung-nat",          // correct – Ersatz für falsche jur-FATCA
      "wohnsitznachweis",             // correct – genuinely missing
      "beglaubigte-ausweiskopie",     // distractor – für juristische Personen
      "gesellschaftervertrag",        // distractor – für GmbH
      "aktienbuch",                   // distractor – für AG
    ],
    lernblock: {
      title: "Einzelunternehmer: natürliche Person – keine juristische Person",
      items: [
        {
          heading: "Einzelfirma hat keine eigene Rechtspersönlichkeit",
          body: "Ein Einzelunternehmer ist rechtlich eine natürliche Person. Die Einzelfirma ist kein eigenständiges Rechtssubjekt. Daraus folgt: FATCA-Erklärung für natürliche Personen, Ausweis + Wohnsitznachweis – keine beglaubigte Ausweiskopie.",
        },
        {
          heading: "Formular A – der Inhaber ist der wirtschaftlich Berechtigte",
          body: "Bei Einzelunternehmen ist der Inhaber gleichzeitig der wirtschaftlich Berechtigte. Formular A wird mit dem Inhaber als einziger Person ausgefüllt. Formular K gilt ausschliesslich für operative juristische Personen (AG / GmbH).",
        },
      ],
    },
  },

  // ─── Kollektivgesellschaft (mittel) ──────────────────────────────────────
  {
    id: "kollektivgesellschaft",
    title: "Kollektivgesellschaft – beide Partner identifizieren",
    customerType: "Kollektivgesellschaft (KG)",
    difficulty: "mittel",
    description:
      "Die Müller & Huber Haustechnik KG möchte ein Geschäftskonto eröffnen. Laut HR-Auszug haben beide Inhaber, Beat Müller und Roland Huber, Kollektivunterschrift zu zweien. Die Kundenberaterin hat nur Beat Müller persönlich empfangen und das Dossier vorbereitet.",
    checklistDocuments: [
      // correct (6)
      "basisvertrag",
      "hr-auszug",
      "formular-k",
      "eigenerklaerung-jur-fatca",
      "beglaubigte-ausweiskopie",
      "beglaubigte-ausweiskopie-2",
      // distractors / traps (4)
      "formular-a",                   // trap: nur für Sitzgesellschaften
      "gesellschaftervertrag",        // trap: plausibel, aber nicht für KG
      "aktienbuch",                   // trap: nur für AG
      "vollmacht",                    // trap: nicht nötig bei eigenem Auftritt der Partner
    ],
    requiredDocuments: [
      "basisvertrag",
      "hr-auszug",
      "formular-k",
      "eigenerklaerung-jur-fatca",
      "beglaubigte-ausweiskopie",
      "beglaubigte-ausweiskopie-2",
    ],
    dossierDocuments: [
      "basisvertrag",
      "hr-auszug",
      "formular-k",
      "eigenerklaerung-jur-fatca",
      "beglaubigte-ausweiskopie",     // Müller identifiziert
      // missing: beglaubigte-ausweiskopie-2 (Roland Huber)
    ],
    issues: [
      {
        type: "missing",
        documentId: "beglaubigte-ausweiskopie-2",
        explanation:
          "Roland Huber ist mit Kollektivunterschrift zu zweien im HR eingetragen und muss als zweiter Zeichnungsberechtigter identifiziert werden. Alle zeichnungsberechtigten Personen sind gemäss GwG Art. 3 zu identifizieren – ohne Ausnahme.",
      },
    ],
    possiblyMissingOptions: [
      "beglaubigte-ausweiskopie-2",   // correct – Huber nicht identifiziert
      "gesellschaftervertrag",        // distractor
      "jahresrechnung",               // distractor
      "vollmacht",                    // distractor
      "aktienbuch",                   // distractor
    ],
    lernblock: {
      title: "GwG Art. 3: Alle zeichnungsberechtigten Personen identifizieren",
      items: [
        {
          heading: "Jeder Zeichnungsberechtigte muss identifiziert werden",
          body: "Unabhängig davon, ob eine Person Einzel- oder Kollektivunterschrift hat – alle im HR als zeichnungsberechtigt eingetragenen Personen müssen mit einer beglaubigten Ausweiskopie erfasst werden (GwG Art. 3).",
        },
        {
          heading: "Kollektivunterschrift: Konto erst nach vollständiger Identifikation",
          body: "Bei Kollektivunterschrift zu zweien müssen alle beteiligten Personen identifiziert und unterzeichnet haben. Das Konto darf erst eröffnet werden, wenn die Identifikation aller Zeichnungsberechtigten vollständig abgeschlossen ist.",
        },
      ],
    },
  },

  // ─── AG Kollektivunterschrift (mittel) ────────────────────────────────────
  {
    id: "ag-kollektivunterschrift",
    title: "AG mit Kollektivunterschrift – fehlende Identifikation",
    customerType: "Firmenkunde (AG)",
    difficulty: "mittel",
    description:
      "Die Bautech Muster AG möchte ein Geschäftskonto eröffnen. Laut HR-Auszug haben Verwaltungsrat Peter Schmidt (CEO) und Anna Tanner (CFO) Kollektivunterschrift zu zweien. Die Kundenberaterin hat nur Peter Schmidt empfangen – Anna Tanner könne «wegen eines Auslandaufenthalts später kommen». Trotzdem wurde das Dossier vorbereitet.",
    checklistDocuments: [
      // correct (7)
      "basisvertrag",
      "hr-auszug",
      "aktienbuch",
      "formular-k",
      "eigenerklaerung-jur-fatca",
      "beglaubigte-ausweiskopie",
      "beglaubigte-ausweiskopie-2",
      // distractors / traps (3)
      "formular-a",                   // trap: nur für Sitzgesellschaft
      "ausweis",                      // trap: nicht ausreichend für Firmenkunden
      "gesellschaftervertrag",        // trap: für GmbH, nicht AG
    ],
    requiredDocuments: [
      "basisvertrag",
      "hr-auszug",
      "aktienbuch",
      "formular-k",
      "eigenerklaerung-jur-fatca",
      "beglaubigte-ausweiskopie",
      "beglaubigte-ausweiskopie-2",
    ],
    dossierDocuments: [
      "basisvertrag",
      "hr-auszug",
      "aktienbuch",
      "formular-k",
      "eigenerklaerung-jur-fatca",
      "beglaubigte-ausweiskopie",     // Schmidt korrekt identifiziert
      "ausweis",                      // wrong – einfache Kopie für Tanner statt beglaubigte
    ],
    issues: [
      {
        type: "wrong",
        documentId: "ausweis",
        explanation:
          "Für Anna Tanner wurde lediglich eine einfache Ausweiskopie eingereicht. Bei Firmenkunden ist für alle Zeichnungsberechtigten eine amtlich beglaubigte Ausweiskopie erforderlich – eine unbeglaubigte Kopie genügt regulatorisch nicht.",
      },
      {
        type: "missing",
        documentId: "beglaubigte-ausweiskopie-2",
        explanation:
          "Die beglaubigte Ausweiskopie von Anna Tanner (CFO, Kollektivunterschrift) fehlt. Das Argument «Sie kommt später» ist kein Grund, eine Kontoeröffnung mit unvollständiger Identifikation zu verarbeiten. Alle Zeichnungsberechtigten müssen vor Kontoeröffnung vollständig identifiziert sein.",
      },
    ],
    possiblyMissingOptions: [
      "beglaubigte-ausweiskopie-2",   // correct – Tanner korrekt identifizieren
      "jahresrechnung",               // distractor
      "vollmacht",                    // distractor
      "gesellschaftervertrag",        // distractor
      "wohnsitznachweis-gf",          // distractor
    ],
    lernblock: {
      title: "Firmenkunde: Beglaubigte Ausweiskopie ist Pflicht",
      items: [
        {
          heading: "Einfache Kopie genügt nicht",
          body: "Bei Firmenkunden ist für jeden Zeichnungsberechtigten eine amtlich beglaubigte Ausweiskopie erforderlich. Eine nicht-beglaubigte Fotokopie oder ein eingescannter Ausweis reicht regulatorisch nicht aus.",
        },
        {
          heading: "Keine Vorabkontoeröffnung bei unvollständiger Identifikation",
          body: "Das Konto darf erst eröffnet werden, wenn alle zeichnungsberechtigten Personen vollständig und korrekt identifiziert sind. Ein «provisorisches» Vorgehen oder späteres Nachreichen ist nicht zulässig.",
        },
      ],
    },
  },

  // ─── GmbH PEP-Gesellschafter (schwer / LAP) ───────────────────────────────
  {
    id: "gmbh-pep-gesellschafter",
    title: "GmbH-Gesellschafterin mit PEP-Verbindung – EDD übersehen",
    customerType: "Firmenkunde (GmbH) / PEP-Risiko",
    difficulty: "schwer",
    description:
      "Die Reisen König GmbH möchte ein Geschäftskonto eröffnen. Gesellschafter: Stefan König (60%, Geschäftsführer) und Barbara König (40%, Ehefrau). Barbaras Ehemann war bis 2023 Stadtpräsident von Bern – sie gilt als PEP-assoziierte Person. Die Kundenberaterin hat das Standarddossier vorbereitet, ohne die PEP-Verbindung zu flaggen.",
    checklistDocuments: [
      // correct (7)
      "basisvertrag",
      "hr-auszug",
      "gesellschaftervertrag",
      "formular-k",
      "eigenerklaerung-jur-fatca",
      "beglaubigte-ausweiskopie",
      "pep-erklaerung",
      // distractors / traps (4)
      "formular-a",                   // trap: nur für Sitzgesellschaft
      "aktienbuch",                   // trap: für AG, nicht GmbH
      "jahresrechnung",               // trap: plausibel, aber kein Pflichtdokument
      "vollmacht",                    // trap: keine Vertretung vorliegend
    ],
    requiredDocuments: [
      "basisvertrag",
      "hr-auszug",
      "gesellschaftervertrag",
      "formular-k",
      "eigenerklaerung-jur-fatca",
      "beglaubigte-ausweiskopie",
      "pep-erklaerung",
    ],
    dossierDocuments: [
      "basisvertrag",
      "hr-auszug",
      "gesellschaftervertrag",
      "formular-k",
      "eigenerklaerung-jur-fatca",
      "beglaubigte-ausweiskopie",
      // missing: pep-erklaerung
    ],
    issues: [
      {
        type: "missing",
        documentId: "pep-erklaerung",
        explanation:
          "Barbara König ist Ehefrau des ehemaligen Stadtpräsidenten Stefan König (PEP). Familienangehörige und nahestehende Personen von PEPs gelten gemäss GwG Art. 2a als PEP-assoziierte Personen. Die Geschäftsbeziehung unterliegt einer erweiterten Sorgfaltspflicht (EDD) und muss durch die Compliance-Stelle genehmigt werden.",
      },
    ],
    possiblyMissingOptions: [
      "pep-erklaerung",               // correct – EDD-Pflicht bei PEP-Verbindung
      "beglaubigte-ausweiskopie-2",   // distractor – plausibel für Barbara König
      "jahresrechnung",               // distractor
      "aktienbuch",                   // distractor – für AG, nicht GmbH
      "vollmacht",                    // distractor
    ],
    lernblock: {
      title: "PEP: Familienangehörige und nahestehende Personen",
      items: [
        {
          heading: "PEP-Status gilt für das gesamte Umfeld",
          body: "Gemäss GwG Art. 2a gelten als PEP-assoziiert: Familienangehörige (Ehepartner, Kinder, Eltern, Geschwister) und nahestehende Personen (enge Geschäftspartner) von politisch exponierten Personen. Der PEP-Status endet nicht automatisch bei Amtsniederlegung.",
        },
        {
          heading: "EDD: Erweiterte Sorgfaltspflicht und Compliance-Genehmigung",
          body: "Geschäftsbeziehungen mit PEPs oder PEP-assoziierten Personen erfordern eine erweiterte Sorgfaltspflicht (Enhanced Due Diligence). Die Kontoeröffnung muss durch die Compliance-Stelle genehmigt werden – die Beraterin darf nicht eigenständig entscheiden.",
        },
      ],
    },
  },

  // ─── Holding-Tochter-Trick (schwer / LAP) ─────────────────────────────────
  {
    id: "holding-tochter-trick",
    title: "Schweizer GmbH – 100% Tochter einer Offshore-Holding (Cayman Islands)",
    customerType: "Firmenkunde (GmbH) / Holdingstruktur",
    difficulty: "schwer",
    description:
      "Die SwissOp GmbH (IT-Dienstleistungen, Zürich) möchte ein Geschäftskonto eröffnen. Einziger Gesellschafter: «SwissOp International Ltd.» (Cayman Islands, 100%). Geschäftsführer Beat Zimmermann erklärt, der wahre Eigentümer wohne in Hongkong und wünsche anonym zu bleiben. Die Kundenberaterin hat das Standarddossier vorbereitet, als handle es sich um eine gewöhnliche GmbH.",
    checklistDocuments: [
      // correct (7)
      "basisvertrag",
      "hr-auszug",
      "gesellschaftervertrag",
      "formular-k",
      "eigenerklaerung-jur-fatca",
      "beglaubigte-ausweiskopie",
      "konzernstruktur",
      // distractors / traps (4)
      "formular-a",                   // plausibel (Holding = Sitzgesellschaft), aber falsch für die GmbH selbst
      "aktienbuch",                   // trap: GmbH hat kein Aktienbuch
      "jahresrechnung",               // trap: kein Pflichtdokument für Kontoeröffnung
      "vollmacht",                    // trap: Zimmermann ist GF, keine Vollmacht nötig
    ],
    requiredDocuments: [
      "basisvertrag",
      "hr-auszug",
      "gesellschaftervertrag",
      "formular-k",
      "eigenerklaerung-jur-fatca",
      "beglaubigte-ausweiskopie",
      "konzernstruktur",
    ],
    dossierDocuments: [
      "basisvertrag",
      "hr-auszug",
      "gesellschaftervertrag",
      "formular-k",
      "eigenerklaerung-jur-fatca",
      "beglaubigte-ausweiskopie",
      // missing: konzernstruktur
    ],
    issues: [
      {
        type: "missing",
        documentId: "konzernstruktur",
        explanation:
          "Die SwissOp GmbH ist 100%-Tochter einer Cayman Islands Holding. Das Look-Through-Prinzip (GwG Art. 4) verpflichtet die Bank, die Eigentümerkette bis zur natürlichen Person (UBO) zu verfolgen. Ohne vollständige Konzernstruktur und UBO-Dokumentation ist die Kontoeröffnung unzulässig. Der geäusserte Anonymitätswunsch ist ein klares Red Flag – die Geschäftsbeziehung ist an die Compliance zu eskalieren oder abzulehnen.",
      },
    ],
    possiblyMissingOptions: [
      "konzernstruktur",              // correct – Look-Through-Prinzip
      "formular-a",                   // distractor – plausibel für Holding-Ebene
      "jahresrechnung",               // distractor
      "aktienbuch",                   // distractor – für AG
      "vollmacht",                    // distractor
    ],
    lernblock: {
      title: "Look-Through-Prinzip: UBO bei Holdingstrukturen identifizieren",
      items: [
        {
          heading: "Wirtschaftlich Berechtigter ist immer eine natürliche Person",
          body: "Gemäss GwG Art. 4 muss die Bank den wirtschaftlich Berechtigten – stets eine natürliche Person – identifizieren. Bei Holdingstrukturen muss die Eigentümerkette vollständig verfolgt werden, bis eine natürliche Person als UBO festgestellt ist («Look-Through-Prinzip»).",
        },
        {
          heading: "Offshore-Holding und Anonymitätswunsch: Red Flags",
          body: "Eine Holding in einem Hochrisikogebiet (z.B. Cayman Islands) und der ausdrückliche Wunsch nach Anonymität des Eigentümers sind klare Red Flags für Geldwäscherei. In solchen Fällen muss die Geschäftsbeziehung abgelehnt oder unverzüglich an die Compliance eskaliert werden.",
        },
      ],
    },
  },
];

export const PRIVATKUNDE_KONTO_SCENARIOS = KONTO_SCENARIOS.filter(
  (s) => s.id === "privatkunde"
);

export const FIRMENKUNDE_KONTO_SCENARIOS = KONTO_SCENARIOS.filter((s) =>
  [
    "firmenkunde-gmbh",
    "firmenkunde-ag",
    "sitzgesellschaft",
    "einzelfirma-geschaeftskonto",
    "kollektivgesellschaft",
    "ag-kollektivunterschrift",
    "gmbh-pep-gesellschafter",
    "holding-tochter-trick",
  ].includes(s.id)
);
