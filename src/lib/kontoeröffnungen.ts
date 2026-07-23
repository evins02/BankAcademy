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
  | "konzernstruktur"
  | "vereinsstatuten"
  | "gruendungsurkunde"
  | "auslaendischer-hr-auszug"
  | "herkunftsnachweis"
  | "vollmachtswiderruf"
  | "gv-protokoll";

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
  vereinsstatuten: "Vereinsstatuten / Vorstandsbeschluss",
  gruendungsurkunde: "Gründungsurkunde (öffentliche Beurkundung)",
  "auslaendischer-hr-auszug": "Ausländischer Registerauszug (legalisiert / apostilliert)",
  herkunftsnachweis: "Herkunftsnachweis der Vermögenswerte",
  vollmachtswiderruf: "Widerruf der bisherigen Zeichnungsberechtigung",
  "gv-protokoll": "Protokoll der Generalversammlung (Vorstandswahl)",
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

  // ─── GmbH PEP-Gesellschafter (schwer / Challenge) ───────────────────────────────
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
        {
          heading: "Gesellschaftervertrag: bei EDD zusätzlich erforderlich",
          body: "Bei einer Standard-GmbH ist der Gesellschaftervertrag kein Pflichtdokument. Bei PEP-Verbindung und EDD ist er jedoch zwingend: Er belegt die genauen Beteiligungsverhältnisse aller Gesellschafter (hier: Stefan König 60%, Barbara König 40%) und ermöglicht die vollständige Identifikation der wirtschaftlich Berechtigten. EDD bedeutet höhere Dokumentationspflicht.",
        },
      ],
    },
  },

  // ─── Holding-Tochter-Trick (schwer / Challenge) ─────────────────────────────────
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
        {
          heading: "Gesellschaftervertrag: bei komplexen Strukturen erforderlich",
          body: "Bei einer Standard-GmbH ist der Gesellschaftervertrag kein Pflichtdokument. Bei Holdingstrukturen und erhöhtem Risiko ist er als Teil der EDD-Dokumentation zwingend: Er belegt die Beteiligungsverhältnisse der Schweizer GmbH (hier: 100% SwissOp International Ltd.) und ergänzt das Konzernstrukturdiagramm auf der Ebene der Tochtergesellschaft.",
        },
      ],
    },
  },

  // ─── Eingetragener Verein ─────────────────────────────────────────────────
  {
    id: "verein-geschaeftskonto",
    title: "Eingetragener Verein – Vereinskonto eröffnen",
    customerType: "Eingetragener Verein (ZGB Art. 60)",
    difficulty: "mittel",
    description:
      "Der FC Bergdorf, ein lokaler Fussballverein (eingetragen, nicht HR-pflichtig), möchte ein Vereinskonto eröffnen. Präsident Markus Suter und Kassier Sandra Huber haben laut Statuten Kollektivunterschrift zu zweien. Die Beraterin hat das Dossier für «eine Gesellschaft» vorbereitet, ohne die Besonderheiten eines Vereins zu beachten.",
    checklistDocuments: [
      // correct (6)
      "basisvertrag",
      "vereinsstatuten",
      "formular-a",
      "eigenerklaerung-jur-fatca",
      "beglaubigte-ausweiskopie",
      "beglaubigte-ausweiskopie-2",
      // distractors / traps (4)
      "hr-auszug",                    // trap: Verein ist nicht im HR eingetragen
      "formular-k",                   // trap: nur für operativ tätige juristische Personen (AG/GmbH)
      "aktienbuch",                   // trap: Verein hat kein Aktienbuch
      "eigenerklaerung-nat",          // trap: Verein ist juristische Person → jur. FATCA
    ],
    requiredDocuments: [
      "basisvertrag",
      "vereinsstatuten",
      "formular-a",
      "eigenerklaerung-jur-fatca",
      "beglaubigte-ausweiskopie",
      "beglaubigte-ausweiskopie-2",
    ],
    dossierDocuments: [
      "basisvertrag",
      "hr-auszug",                    // wrong – Verein ist nicht im HR, Statuten fehlen
      "formular-k",                   // wrong – Verein braucht Formular A, nicht K
      "eigenerklaerung-jur-fatca",
      "beglaubigte-ausweiskopie",     // Suter identifiziert
      // missing: vereinsstatuten, formular-a, beglaubigte-ausweiskopie-2 (Huber)
    ],
    issues: [
      {
        type: "wrong",
        documentId: "hr-auszug",
        explanation:
          "Ein eingetragener Verein (ZGB Art. 60) ist nicht im Handelsregister eingetragen – die HR-Eintragungspflicht gilt nur für kommerzielle Unternehmen ab einem bestimmten Umsatz. Statt des HR-Auszugs sind die Vereinsstatuten und ein Vorstandsbeschluss (mit Liste der zeichnungsberechtigten Vorstandsmitglieder) beizubringen.",
      },
      {
        type: "missing",
        documentId: "vereinsstatuten",
        explanation:
          "Die Vereinsstatuten (inkl. Vorstandsbeschluss) fehlen. Sie sind das Äquivalent zum HR-Auszug für eingetragene Vereine: Sie belegen die Rechtsform, die Vertretungsregelung und wer zeichnungsberechtigt ist.",
      },
      {
        type: "wrong",
        documentId: "formular-k",
        explanation:
          "Formular K gilt für operativ tätige juristische Personen (AG/GmbH). Ein gemeinnütziger Verein ist keine operativ tätige Gesellschaft im Sinne der VSB. Korrekt ist Formular A, in dem die Vorstandsmitglieder als kontrollierende Personen erfasst werden.",
      },
      {
        type: "missing",
        documentId: "formular-a",
        explanation:
          "Formular A fehlt. Es wurde fälschlicherweise durch Formular K ersetzt. Bei einem Verein ohne operative Geschäftstätigkeit sind die kontrollierenden Vorstandsmitglieder (Präsident und Kassier) als wirtschaftlich Berechtigte via Formular A zu erfassen.",
      },
      {
        type: "missing",
        documentId: "beglaubigte-ausweiskopie-2",
        explanation:
          "Sandra Huber (Kassier, Kollektivunterschrift) wurde nicht identifiziert. Alle zeichnungsberechtigten Personen müssen gemäss GwG Art. 3 mit einer beglaubigten Ausweiskopie erfasst werden – unabhängig davon, ob sie persönlich anwesend waren.",
      },
    ],
    possiblyMissingOptions: [
      "vereinsstatuten",              // correct – fehlt (hr-auszug ist falsch)
      "formular-a",                   // correct – fehlt (formular-k ist falsch)
      "beglaubigte-ausweiskopie-2",   // correct – Huber nicht identifiziert
      "gesellschaftervertrag",        // distractor – für GmbH, nicht Verein
      "aktienbuch",                   // distractor – für AG, nicht Verein
    ],
    lernblock: {
      title: "Eingetragener Verein: Kein HR, kein Aktienbuch, Formular A",
      items: [
        {
          heading: "Verein ist juristische Person – aber kein HR-Eintrag",
          body: "Ein eingetragener Verein (ZGB Art. 60) hat eigene Rechtspersönlichkeit, ist aber nicht im Handelsregister eingetragen (ausser bei kommerziellem Betrieb). Statt HR-Auszug sind die Vereinsstatuten und ein Vorstandsbeschluss erforderlich, der die Vertretungsregelung und zeichnungsberechtigten Personen belegt.",
        },
        {
          heading: "Formular A – Vorstandsmitglieder als kontrollierende Personen",
          body: "Ein Verein ohne operative Geschäftstätigkeit verwendet Formular A (nicht K). Die zeichnungsberechtigten Vorstandsmitglieder (Präsident, Kassier etc.) werden als kontrollierende Personen erfasst. Formular K gilt ausschliesslich für kommerzielle juristische Personen (AG, GmbH).",
        },
        {
          heading: "Alle Zeichnungsberechtigten müssen identifiziert werden",
          body: "Auch beim Verein gilt GwG Art. 3: Alle im Vorstandsbeschluss als zeichnungsberechtigt genannten Personen müssen mit einer beglaubigten Ausweiskopie identifiziert werden – unabhängig davon, wer persönlich anwesend war.",
        },
      ],
    },
  },

  // ─── GmbH in Gründung ──────────────────────────────────────────────────────
  {
    id: "gmbh-neugruendung",
    title: "GmbH in Gründung – Kapitaleinzahlungskonto",
    customerType: "Firmenkunde (GmbH in Gründung)",
    difficulty: "einfach",
    description:
      "Peter Notz möchte für die «Notz Consulting GmbH» (in Gründung) ein Konto eröffnen, um das Stammkapital von CHF 20'000 einzuzahlen, bevor die Eintragung im Handelsregister erfolgt. Er legt einen HR-Auszug vor, den er «schon vorbereitet» habe.",
    checklistDocuments: [
      // correct (5)
      "basisvertrag",
      "gruendungsurkunde",
      "formular-k",
      "eigenerklaerung-jur-fatca",
      "beglaubigte-ausweiskopie",
      // distractors (4)
      "hr-auszug",             // trap: existiert bei einer Gesellschaft in Gründung noch nicht
      "aktienbuch",            // trap: gehört zur AG, nicht zur GmbH
      "formular-a",            // trap: nur für Sitzgesellschaft
      "gesellschaftervertrag", // trap: plausibel, aber nicht erforderlich für Kapitaleinzahlung
    ],
    requiredDocuments: [
      "basisvertrag",
      "gruendungsurkunde",
      "formular-k",
      "eigenerklaerung-jur-fatca",
      "beglaubigte-ausweiskopie",
    ],
    dossierDocuments: [
      "basisvertrag",
      "hr-auszug",     // wrong – existiert noch nicht
      "formular-k",
      "eigenerklaerung-jur-fatca",
      "beglaubigte-ausweiskopie",
      // missing: gruendungsurkunde
    ],
    issues: [
      {
        type: "wrong",
        documentId: "hr-auszug",
        explanation:
          "Eine GmbH entsteht rechtlich erst mit der Eintragung ins Handelsregister (OR Art. 779). Vor der Eintragung existiert kein HR-Auszug – ein vorgelegtes Dokument mit diesem Titel kann zu diesem Zeitpunkt nicht echt sein und darf nicht akzeptiert werden.",
      },
      {
        type: "missing",
        documentId: "gruendungsurkunde",
        explanation:
          "Die öffentlich beurkundete Gründungsurkunde fehlt. Sie ist vor der HR-Eintragung das massgebliche Dokument, um Gründer, Stammkapital und Statuten nachzuweisen und das Kapitaleinzahlungskonto zu eröffnen.",
      },
    ],
    possiblyMissingOptions: [
      "gruendungsurkunde",     // correct – ersetzt den (noch nicht existierenden) HR-Auszug
      "jahresrechnung",        // distractor
      "gesellschaftervertrag", // distractor
      "vollmacht",             // distractor
      "konzernstruktur",       // distractor
    ],
    lernblock: {
      title: "GmbH in Gründung: Kapitaleinzahlungskonto statt Geschäftskonto",
      items: [
        {
          heading: "Vor der HR-Eintragung: kein HR-Auszug möglich",
          body: "Eine GmbH erlangt ihre Rechtspersönlichkeit erst mit dem Eintrag ins Handelsregister (OR Art. 779). Bis dahin dient die öffentlich beurkundete Gründungsurkunde als Nachweis von Gründern, Stammkapital und Statuten.",
        },
        {
          heading: "Sperrkonto zur Kapitaleinzahlung",
          body: "Das Konto wird zunächst als Kapitaleinzahlungskonto (Sperrkonto) geführt, auf das die Gründer das Stammkapital einzahlen. Erst nach erfolgter HR-Eintragung wird es zum ordentlichen Geschäftskonto freigegeben – der definitive HR-Auszug ist dann nachzureichen.",
        },
      ],
    },
  },

  // ─── Freelancer ohne HR-Pflicht ────────────────────────────────────────────
  {
    id: "einzelunternehmen-freelancer",
    title: "Freelancerin ohne HR-Eintrag – Privat- oder Geschäftskonto?",
    customerType: "Selbständigerwerbende (nicht HR-pflichtig)",
    difficulty: "mittel",
    description:
      "Laura Frei (29), Grafikdesignerin, arbeitet seit einem Jahr als Freelancerin (Jahresumsatz ca. CHF 45'000, nicht im Handelsregister eingetragen). Sie möchte ein separates Konto für ihre Design-Einnahmen. Der Kollege am Schalter hat direkt ein Dossier mit HR-Auszug-Anforderung vorbereitet.",
    checklistDocuments: [
      // correct (5)
      "basisvertrag",
      "ausweis",
      "wohnsitznachweis",
      "eigenerklaerung-nat",
      "formular-a",
      // distractors / traps (4)
      "hr-auszug",                 // trap: nicht eintragungspflichtig unter CHF 100'000 Umsatz
      "eigenerklaerung-jur-fatca", // trap: Freelancerin ist natürliche Person
      "beglaubigte-ausweiskopie",  // trap: nur bei juristischen Personen nötig
      "formular-k",                // trap: nur für operative juristische Personen
    ],
    requiredDocuments: [
      "basisvertrag",
      "ausweis",
      "wohnsitznachweis",
      "eigenerklaerung-nat",
      "formular-a",
    ],
    dossierDocuments: [
      "basisvertrag",
      "hr-auszug",   // wrong – kann bei fehlendem Eintrag nicht vorliegen
      "ausweis",
      "wohnsitznachweis",
      "eigenerklaerung-nat",
      // missing: formular-a
    ],
    issues: [
      {
        type: "wrong",
        documentId: "hr-auszug",
        explanation:
          "Einzelunternehmen sind gemäss OR Art. 931a erst ab einem Jahresumsatz von CHF 100'000 zur Eintragung ins Handelsregister verpflichtet. Bei CHF 45'000 Umsatz besteht kein Eintrag – ein HR-Auszug kann nicht verlangt werden, weil er nicht existiert.",
      },
      {
        type: "missing",
        documentId: "formular-a",
        explanation:
          "Formular A fehlt. Es ist gemäss VSB 20 bei jeder Kontoeröffnung zwingend auszufüllen – unabhängig von der HR-Pflicht. Laura Frei ist als Inhaberin selbst als wirtschaftlich Berechtigte einzutragen.",
      },
    ],
    possiblyMissingOptions: [
      "formular-a",                // correct – genuinely missing
      "beglaubigte-ausweiskopie",  // distractor – nur für juristische Personen
      "gesellschaftervertrag",     // distractor – für GmbH
      "aktienbuch",                // distractor – für AG
      "eigenerklaerung-jur-fatca", // distractor – falsche Personenart
    ],
    lernblock: {
      title: "Einzelunternehmen: HR-Pflicht erst ab CHF 100'000 Umsatz",
      items: [
        {
          heading: "OR Art. 931a – Eintragungspflicht erst ab Umsatzschwelle",
          body: "Einzelunternehmen müssen sich erst ab einem Jahresumsatz von CHF 100'000 ins Handelsregister eintragen lassen (darunter freiwillig möglich). Ohne Eintrag existiert kein HR-Auszug, der verlangt werden könnte.",
        },
        {
          heading: "Formular A bleibt trotzdem zwingend",
          body: "Unabhängig von der HR-Pflicht ist Formular A gemäss VSB 20 bei jeder Kontoeröffnung Pflicht. Bei nicht eingetragenen Einzelunternehmern wird die Inhaberin selbst als wirtschaftlich Berechtigte eingetragen.",
        },
      ],
    },
  },

  // ─── Verein: Vorstandswechsel bei bestehendem Konto ───────────────────────
  {
    id: "verein-vorstandswechsel",
    title: "Vereinsvorstand neu gewählt – alte Zeichnungsberechtigung nicht widerrufen",
    customerType: "Eingetragener Verein / Mutation Zeichnungsberechtigung",
    difficulty: "mittel",
    description:
      "Der Kulturverein Klangwerk hat an der Generalversammlung einen neuen Vorstand gewählt: Neue Präsidentin Melanie Vogt löst den bisherigen Präsidenten ab, Kassier Urs Bär bleibt im Amt. Die Bank erhält den Auftrag, Vogt neu als zeichnungsberechtigt zu erfassen. Der Berater hat lediglich eine neue Vollmacht für Vogt hinzugefügt.",
    checklistDocuments: [
      // correct (4)
      "gv-protokoll",
      "formular-a",
      "beglaubigte-ausweiskopie",
      "vollmachtswiderruf",
      // distractors / traps (4)
      "basisvertrag",              // trap: Konto besteht bereits, kein neuer Basisvertrag nötig
      "hr-auszug",                 // trap: Verein ist nicht im HR eingetragen
      "vereinsstatuten",           // trap: Statuten ändern sich durch Vorstandswahl nicht
      "eigenerklaerung-jur-fatca", // trap: FATCA-Abklärung liegt bereits vor, keine Neueröffnung
    ],
    requiredDocuments: [
      "gv-protokoll",
      "formular-a",
      "beglaubigte-ausweiskopie",
      "vollmachtswiderruf",
    ],
    dossierDocuments: [
      "gv-protokoll",
      "formular-a",
      "beglaubigte-ausweiskopie",   // Vogt neu identifiziert
      // missing: vollmachtswiderruf
    ],
    issues: [
      {
        type: "missing",
        documentId: "vollmachtswiderruf",
        explanation:
          "Die Zeichnungsberechtigung des abgewählten Präsidenten wurde nicht widerrufen. Eine neue Vollmacht für Vogt ersetzt die alte Berechtigung nicht automatisch – ohne ausdrücklichen Widerruf könnte die abgewählte Person weiterhin über das Konto verfügen.",
      },
    ],
    possiblyMissingOptions: [
      "vollmachtswiderruf", // correct – genuinely missing
      "basisvertrag",       // distractor
      "hr-auszug",          // distractor
      "vereinsstatuten",    // distractor
      "jahresrechnung",     // distractor
    ],
    lernblock: {
      title: "Vorstandswechsel: Alte Zeichnungsberechtigung ausdrücklich widerrufen",
      items: [
        {
          heading: "Eine neue Vollmacht ersetzt die alte nicht automatisch",
          body: "Wird ein neues Vorstandsmitglied zeichnungsberechtigt, bleibt die Berechtigung der abgewählten Person bankintern bestehen, bis sie ausdrücklich widerrufen wird. Das blosse Hinzufügen einer neuen Vollmacht genügt nicht.",
        },
        {
          heading: "GV-Protokoll als Nachweis der neuen Vertretungsregelung",
          body: "Das Protokoll der Generalversammlung mit dem Vorstandswahlbeschluss ist der massgebliche Nachweis für die neue Vertretungsregelung – analog zum HR-Auszug bei Handelsgesellschaften.",
        },
      ],
    },
  },

  // ─── Ausländische Offshore-Gesellschaft (schwer / EDD) ────────────────────
  {
    id: "auslaendische-offshore-gesellschaft",
    title: "Offshore-Gesellschaft (BVI) eröffnet Konto – erhöhte Sorgfaltspflicht",
    customerType: "Ausländische Gesellschaft (British Virgin Islands)",
    difficulty: "schwer",
    description:
      "Die «Meridian Trading Ltd.» (British Virgin Islands) möchte über ihren Direktor Marco Rinaldi ein Geschäftskonto eröffnen. Die Gesellschaft hat keine operative Tätigkeit in der Schweiz. Rinaldi legt einen englischsprachigen «Certificate of Incorporation» vor, kann aber keine Angaben zur Herkunft der geplanten Einlage (CHF 800'000) machen.",
    checklistDocuments: [
      // correct (6)
      "basisvertrag",
      "auslaendischer-hr-auszug",
      "formular-a",
      "eigenerklaerung-jur-fatca",
      "beglaubigte-ausweiskopie",
      "herkunftsnachweis",
      // distractors (4)
      "hr-auszug",              // trap: Schweizer HR-Auszug nicht anwendbar
      "formular-k",             // trap: Sitzgesellschaft ohne operative Tätigkeit → Formular A
      "aktienbuch",             // trap: nicht das Schweizer Pendant
      "gesellschaftervertrag",  // trap: nicht einschlägig für ausländische Gesellschaft
    ],
    requiredDocuments: [
      "basisvertrag",
      "auslaendischer-hr-auszug",
      "formular-a",
      "eigenerklaerung-jur-fatca",
      "beglaubigte-ausweiskopie",
      "herkunftsnachweis",
    ],
    dossierDocuments: [
      "basisvertrag",
      "hr-auszug",   // wrong – falsches Dokument für ausländische Gesellschaft
      "formular-k",  // wrong – sollte formular-a sein
      "eigenerklaerung-jur-fatca",
      "beglaubigte-ausweiskopie",
      // missing: herkunftsnachweis
    ],
    issues: [
      {
        type: "wrong",
        documentId: "hr-auszug",
        explanation:
          "Ein Schweizer HR-Auszug existiert für eine BVI-Gesellschaft nicht. Erforderlich ist ein legalisierter bzw. mit Apostille versehener ausländischer Registerauszug (Certificate of Incorporation / Incumbency).",
      },
      {
        type: "wrong",
        documentId: "formular-k",
        explanation:
          "Formular K gilt für operativ tätige Gesellschaften. Die Meridian Trading Ltd. hat keine operative Tätigkeit in der Schweiz und gilt damit als Sitzgesellschaft – hier ist Formular A erforderlich, das alle im Register eingetragenen Personen erfasst.",
      },
      {
        type: "missing",
        documentId: "herkunftsnachweis",
        explanation:
          "Die British Virgin Islands gelten als Offshore-Jurisdiktion mit erhöhtem Geldwäschereirisiko. Zusammen mit der fehlenden Erklärung zur Herkunft der geplanten Einlage von CHF 800'000 liegt ein klares Risikomerkmal vor, das eine erweiterte Sorgfaltspflicht (EDD) inkl. Herkunftsnachweis der Vermögenswerte auslöst.",
      },
    ],
    possiblyMissingOptions: [
      "auslaendischer-hr-auszug", // correct – ersetzt den falschen hr-auszug
      "formular-a",               // correct – ersetzt das falsche formular-k
      "herkunftsnachweis",        // correct – genuinely missing (EDD)
      "jahresrechnung",           // distractor
      "vollmacht",                // distractor
      "aktienbuch",               // distractor
    ],
    lernblock: {
      title: "Offshore-Gesellschaften: Erhöhte Sorgfaltspflicht (EDD)",
      items: [
        {
          heading: "Hochrisikojurisdiktionen erfordern EDD",
          body: "Gesellschaften aus Offshore-Zentren mit tiefer Transparenz (z.B. BVI, Cayman Islands, Panama) gelten als erhöhtes Risiko. Fehlende Angaben zur Herkunft der Vermögenswerte verstärken diesen Verdacht – ein Herkunftsnachweis ist vor Kontoeröffnung zwingend einzuholen.",
        },
        {
          heading: "Ausländischer Registerauszug muss legalisiert sein",
          body: "Für ausländische Gesellschaften ersetzt ein legalisierter bzw. mit Apostille versehener Registerauszug den Schweizer HR-Auszug. Eine einfache, nicht beglaubigte Kopie genügt nicht.",
        },
        {
          heading: "Formular A statt K bei Sitzgesellschaften ohne operative Tätigkeit",
          body: "Wie bei inländischen Sitzgesellschaften gilt auch bei ausländischen Gesellschaften ohne eigene Geschäftstätigkeit Formular A – nicht Formular K.",
        },
      ],
    },
  },

  // ─── Vollmachtsänderung bei bestehender Firma ─────────────────────────────
  {
    id: "vollmachtsaenderung-neuer-gf",
    title: "Neue Geschäftsführerin – Vollmacht des Vorgängers erloschen",
    customerType: "Firmenkunde (GmbH) / Mutation Geschäftsführung",
    difficulty: "mittel",
    description:
      "Bei der Bergmann Logistik GmbH hat der bisherige Geschäftsführer Urs Bergmann sein Amt niedergelegt; neue Geschäftsführerin ist seine Tochter Nina Bergmann. Die Bank erhält lediglich eine E-Mail mit der Bitte, «Nina neu auch aufs Konto zu lassen» – Urs bleibe laut Kundenwunsch weiterhin zeichnungsberechtigt, da er «noch mithelfen» wolle. Der alte HR-Auszug ist noch im Dossier.",
    checklistDocuments: [
      // correct (4)
      "hr-auszug",
      "beglaubigte-ausweiskopie",
      "formular-k",
      "vollmacht",
      // distractors (4)
      "basisvertrag",              // trap: Konto besteht bereits
      "eigenerklaerung-jur-fatca", // trap: FATCA-Abklärung liegt bereits vor
      "gesellschaftervertrag",     // trap: nicht einschlägig bei reinem GF-Wechsel
      "pep-erklaerung",            // trap: kein PEP-Hinweis vorliegend
    ],
    requiredDocuments: [
      "hr-auszug",
      "beglaubigte-ausweiskopie",
      "formular-k",
      "vollmacht",
    ],
    dossierDocuments: [
      "hr-auszug",   // wrong – veraltet, zeigt noch Urs als GF
      "formular-k",
      // missing: beglaubigte-ausweiskopie (Nina), vollmacht (für Urs)
    ],
    issues: [
      {
        type: "wrong",
        documentId: "hr-auszug",
        explanation:
          "Der vorhandene HR-Auszug ist veraltet und zeigt noch Urs Bergmann als Geschäftsführer. Es muss ein aktueller HR-Auszug eingeholt werden, der Nina Bergmann als neue Geschäftsführerin ausweist – die organschaftliche Zeichnungsberechtigung von Urs Bergmann erlischt automatisch mit der Löschung im Handelsregister.",
      },
      {
        type: "missing",
        documentId: "beglaubigte-ausweiskopie",
        explanation:
          "Nina Bergmann muss als neue Geschäftsführerin und Zeichnungsberechtigte mit einer beglaubigten Ausweiskopie identifiziert werden – eine formlose E-Mail-Anfrage genügt nicht.",
      },
      {
        type: "missing",
        documentId: "vollmacht",
        explanation:
          "Möchte Urs Bergmann trotz Rücktritt als Geschäftsführer weiterhin zeichnungsberechtigt bleiben, ist dafür eine neue, ausdrückliche Vollmacht der aktuellen Geschäftsführung erforderlich. Seine bisherige organschaftliche Zeichnungsberechtigung ist mit dem HR-Austrag erloschen und lebt nicht automatisch als Vollmacht weiter.",
      },
    ],
    possiblyMissingOptions: [
      "beglaubigte-ausweiskopie", // correct – Nina nicht identifiziert
      "vollmacht",                // correct – Urs' Vollmacht fehlt
      "gesellschaftervertrag",    // distractor
      "pep-erklaerung",           // distractor
      "jahresrechnung",           // distractor
    ],
    lernblock: {
      title: "Organwechsel: Zeichnungsberechtigung erlischt mit HR-Löschung",
      items: [
        {
          heading: "Zeichnungsberechtigung als Organ erlischt automatisch",
          body: "Scheidet ein Geschäftsführer aus dem Amt aus, erlischt seine organschaftliche Zeichnungsberechtigung mit der Löschung im Handelsregister – unabhängig vom Kundenwunsch. Eine formlose Anfrage per E-Mail ändert daran nichts.",
        },
        {
          heading: "Neue Vollmacht nötig, falls die Person weiterhin zeichnen soll",
          body: "Soll eine ausgeschiedene Person weiterhin zeichnungsberechtigt bleiben, muss die aktuelle Geschäftsführung eine neue, ausdrückliche Vollmacht ausstellen. Diese ist rechtlich unabhängig von der früheren organschaftlichen Vertretung.",
        },
        {
          heading: "Neue Geschäftsführerin muss identifiziert werden",
          body: "Die neue Geschäftsführerin ist wie bei einer Neueröffnung mit beglaubigter Ausweiskopie zu identifizieren, bevor ihr Zeichnungsrecht eingeräumt wird.",
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
    "verein-geschaeftskonto",
    "gmbh-neugruendung",
    "einzelunternehmen-freelancer",
    "verein-vorstandswechsel",
    "auslaendische-offshore-gesellschaft",
    "vollmachtsaenderung-neuer-gf",
  ].includes(s.id)
);
