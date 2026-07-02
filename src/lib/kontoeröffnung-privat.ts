export type LevelNum = 1 | 2 | 3;
export type DocStatus = "required" | "forbidden" | "optional";

export interface KontoPrivatDoc {
  id: string;
  label: string;
  status: DocStatus;
  feedbackSelected: string;
  feedbackNotSelected: string;
}

export interface DocumentCase {
  id: string;
  type: "document-select";
  level: LevelNum;
  title: string;
  briefing: string;
  today?: string;
  documents: KontoPrivatDoc[];
  requiredOneOf?: string[][];
  generalFeedback: string;
  recallMusterlösung?: string;
}

export interface McqOption {
  key: string;
  text: string;
}

export interface McqCase {
  id: string;
  type: "multiple-choice";
  level: LevelNum;
  title: string;
  briefing: string;
  today?: string;
  question: string;
  options: McqOption[];
  correct: string;
  feedback: string;
  feedbackPerOption?: Record<string, string>;
}

export type KontoPrivatCase = DocumentCase | McqCase;

export interface KontoPrivatLevel {
  level: LevelNum;
  label: string;
  description: string;
  badgeVariant: "green" | "orange" | "red";
  cases: KontoPrivatCase[];
}

export function scoreDocumentCase(
  c: DocumentCase,
  selected: Set<string>
): { score: number; correct: boolean } {
  let errors = 0;
  let total = 0;

  for (const doc of c.documents) {
    if (doc.status === "required") {
      total++;
      if (!selected.has(doc.id)) errors++;
    } else if (doc.status === "forbidden") {
      total++;
      if (selected.has(doc.id)) errors++;
    }
  }

  for (const group of c.requiredOneOf ?? []) {
    total++;
    if (!group.some((id) => selected.has(id))) errors++;
  }

  const score = total === 0 ? 100 : Math.round(((total - errors) / total) * 100);
  return { score, correct: errors === 0 };
}

// ─────────────────────────────────────────────────────────
// LEVEL 1 – Grundlagen
// ─────────────────────────────────────────────────────────

const L1_STANDARD: DocumentCase = {
  id: "l1-standard-ch",
  type: "document-select",
  level: 1,
  title: "Standardfall – Schweizer Privatkunde",
  briefing:
    "Herr Müller (32), Schweizer Staatsbürger, wohnhaft in Bern, möchte ein Privatkonto eröffnen. Er hat einen gültigen Schweizer Pass dabei. Keine besonderen Risikomerkmale erkennbar.",
  documents: [
    {
      id: "basisvertrag",
      label: "Basisvertrag",
      status: "required",
      feedbackSelected: "Korrekt – der Basisvertrag regelt die Geschäftsbeziehung und ist bei jeder Kontoeröffnung zwingend.",
      feedbackNotSelected: "Fehler: Der Basisvertrag ist das Grunddokument jeder Kontoeröffnung und darf nicht fehlen.",
    },
    {
      id: "ausweis-ch",
      label: "Gültiger CH-Ausweis / Reisepass",
      status: "required",
      feedbackSelected: "Korrekt – primäres Identifikationsdokument gemäss GwG.",
      feedbackNotSelected: "Fehler: Identifikation mit gültigem Ausweis ist zwingend erforderlich.",
    },
    {
      id: "eigenerklarung-np",
      label: "Eigenerklärung FATCA (natürliche Person)",
      status: "required",
      feedbackSelected: "Korrekt – US-Person Abklärung (Staatsbürgerschaft, Geburtsort USA, Greencard) ist bei jeder Kontoeröffnung zwingend.",
      feedbackNotSelected: "Fehler: FATCA-Abklärung muss bei jeder Neueröffnung erfolgen – Fragen zu US-Staatsbürgerschaft, Geburtsort USA, Greencard und US-Steuernummer.",
    },
    {
      id: "formular-a",
      label: "Formular A (wirtschaftlich Berechtigter, VSB 20)",
      status: "required",
      feedbackSelected: "Korrekt – Formular A dokumentiert den wirtschaftlich Berechtigten gemäss VSB 20, auch wenn er identisch mit dem Kontoinhaber ist.",
      feedbackNotSelected: "Fehler: Formular A ist nach VSB 20 zwingend – auch wenn Kontoinhaber = wirtschaftlich Berechtigter.",
    },
    {
      id: "wohnsitzbestatigung",
      label: "Wohnsitzbestätigung / Meldebestätigung",
      status: "forbidden",
      feedbackSelected: "Fehler: Eine Wohnsitzbestätigung ist für diesen Standardfall nicht erforderlich.",
      feedbackNotSelected: "Korrekt – keine Wohnsitzbestätigung nötig beim Standardfall.",
    },
    {
      id: "unterschriftenprobe",
      label: "Unterschriftenprobe",
      status: "forbidden",
      feedbackSelected: "Fehler: Die Unterschriftenprobe ist kein Pflichtdokument der regulatorischen Kontoeröffnung.",
      feedbackNotSelected: "Korrekt – nicht zu den zwingenden Dokumenten des Standardfalls gehörend.",
    },
    {
      id: "kontaktdaten",
      label: "Telefon / E-Mail-Adresse",
      status: "forbidden",
      feedbackSelected: "Fehler: Kontaktdaten sind kein Dokument der regulatorischen Kontoeröffnung.",
      feedbackNotSelected: "Korrekt – nicht erforderlich.",
    },
    {
      id: "handelsregister",
      label: "Handelsregisterauszug",
      status: "forbidden",
      feedbackSelected: "Fehler: Handelsregisterauszüge sind nur für Firmenkunden relevant.",
      feedbackNotSelected: "Korrekt – irrelevant bei Privatpersonen.",
    },
    {
      id: "jahresabschluss",
      label: "Jahresabschluss / Bilanz",
      status: "forbidden",
      feedbackSelected: "Fehler: Nur für Geschäfts- und Firmenkonten zutreffend.",
      feedbackNotSelected: "Korrekt – nicht zutreffend bei Privatkonto.",
    },
    {
      id: "herkunft-vermoegen",
      label: "Herkunftsnachweis Vermögen",
      status: "forbidden",
      feedbackSelected: "Fehler: Nur bei erhöhtem Risiko oder grossen Einlagen erforderlich – hier nicht zutreffend.",
      feedbackNotSelected: "Korrekt – Standardfall ohne Risikomerkmale, kein EDD nötig.",
    },
    {
      id: "pep-formular",
      label: "PEP-Prüfungsformular",
      status: "forbidden",
      feedbackSelected: "Fehler: Nur bei politisch exponierten Personen relevant.",
      feedbackNotSelected: "Korrekt – kein Hinweis auf PEP-Status.",
    },
    {
      id: "vollmacht",
      label: "Vollmacht",
      status: "forbidden",
      feedbackSelected: "Fehler: Keine Vollmacht beantragt – Kunde handelt selbst.",
      feedbackNotSelected: "Korrekt – nicht erforderlich.",
    },
    {
      id: "reisepass-ausl",
      label: "Ausländischer Reisepass",
      status: "forbidden",
      feedbackSelected: "Fehler: Kunde ist Schweizer Staatsbürger – ausländischer Pass nicht zutreffend.",
      feedbackNotSelected: "Korrekt – Kunde ist Schweizer.",
    },
  ],
  generalFeedback:
    "Beim Standardfall Schweizer Privatkunde benötigen Sie: Basisvertrag, gültiger CH-Ausweis, Eigenerklärung FATCA (natürliche Person) und Formular A (VSB 20 – wirtschaftlich Berechtigter). Firmendokumente, EDD, PEP-Formulare, Wohnsitzbestätigungen oder Unterschriftenproben gehören nicht zu den zwingenden regulatorischen Dokumenten dieses Standardfalls.",
  recallMusterlösung:
    "Basisvertrag: Rechtliche Grundlage der Geschäftsbeziehung zwischen Bank und Kunde. Ohne Basisvertrag keine gültige Vertragsbeziehung — die Bank darf kein Konto führen.\n\nGültiger CH-Ausweis / Reisepass: Gesetzliche Pflicht gemäss GwG Art. 3 — die Bank muss die Identität jedes Kunden zweifelsfrei feststellen. Ein abgelaufener Ausweis reicht nicht, da die Identifikation zum Zeitpunkt der Eröffnung gültig sein muss.\n\nEigenerklärung FATCA (natürliche Person): FATCA ist ein US-Steuergesetz, das Schweizer Banken verpflichtet zu prüfen, ob ein Kunde eine US-Person ist (Staatsbürgerschaft, Geburtsort USA, Green Card). Ohne diese Erklärung riskiert die Bank Strafzahlungen an die US-Steuerbehörde IRS.\n\nFormular A (wirtschaftlich Berechtigter, VSB 20): Gemäss VSB 20 muss die Bank wissen, wem das Geld wirtschaftlich gehört — auch wenn jemand anderes das Konto hält. Zentrales Instrument gegen Geldwäscherei und Terrorismusfinanzierung.",
};

const L1_AUSWEIS_ABGELAUFEN: DocumentCase = {
  id: "l1-ausweis-abgelaufen",
  type: "document-select",
  level: 1,
  title: "Achtung – Abgelaufener Ausweis",
  briefing:
    "Frau Keller möchte ein Privatkonto eröffnen. Sie legt ihren Schweizer Ausweis vor – bei näherer Prüfung stellen Sie fest, dass das Ablaufdatum vor 3 Monaten war. Frau Keller sagt: 'Das ist doch egal, das Foto stimmt noch.'",
  documents: [
    {
      id: "gultig-ausweis-anfordern",
      label: "Gültigen Ausweis / Reisepass einfordern",
      status: "required",
      feedbackSelected: "Korrekt – abgelaufene Dokumente sind kein gültiges Identifikationsmittel.",
      feedbackNotSelected: "Fehler: Sie müssen zwingend einen gültigen Ausweis verlangen.",
    },
    {
      id: "termin-neu",
      label: "Neuen Termin vereinbaren, sobald gültiger Ausweis vorliegt",
      status: "required",
      feedbackSelected: "Korrekt – Frau Keller muss den Ausweis erneuern und danach zurückkommen.",
      feedbackNotSelected: "Fehler: Frau Keller muss auf einen neuen Termin mit gültigem Ausweis verwiesen werden.",
    },
    {
      id: "basisvertrag",
      label: "Basisvertrag",
      status: "forbidden",
      feedbackSelected: "Falsch – ohne gültige Identifikation darf kein Vertrag abgeschlossen werden. Genau das ist der Lernpunkt dieses Falls.",
      feedbackNotSelected: "Korrekt nicht ausgewählt – kein Vertragsabschluss ohne gültigen Ausweis möglich.",
    },
    {
      id: "formular-a",
      label: "Formular A (wirtschaftlich Berechtigter, VSB 20)",
      status: "forbidden",
      feedbackSelected: "Falsch – solange kein gültiger Ausweis vorliegt, darf der Prozess gar nicht bis zu diesem Schritt fortschreiten.",
      feedbackNotSelected: "Korrekt nicht ausgewählt – der Prozess stoppt vorher beim ungültigen Ausweis.",
    },
    {
      id: "eigenerklarung-np",
      label: "Eigenerklärung FATCA (natürliche Person)",
      status: "forbidden",
      feedbackSelected: "Falsch – der FATCA-Prozess setzt eine abgeschlossene Identifikation voraus. Ohne gültigen Ausweis wird dieser Schritt nicht erreicht.",
      feedbackNotSelected: "Korrekt nicht ausgewählt – der Prozess stoppt beim ungültigen Ausweis, bevor FATCA relevant wird.",
    },
    {
      id: "wohnsitzbestatigung",
      label: "Wohnsitzbestätigung",
      status: "forbidden",
      feedbackSelected: "Falsch – Wohnsitznachweis ist erst nach gültiger Identifikation relevant. Der Prozess stoppt vorher.",
      feedbackNotSelected: "Korrekt nicht ausgewählt – ohne gültige Identifikation kein weiterer Dokumentenprozess.",
    },
    {
      id: "unterschriftenprobe",
      label: "Unterschriftenprobe",
      status: "forbidden",
      feedbackSelected: "Falsch – Unterschriftenprobe gehört in den Eröffnungsprozess, der erst nach gültiger Identifikation beginnt.",
      feedbackNotSelected: "Korrekt nicht ausgewählt – der Prozess stoppt vorher.",
    },
    {
      id: "ausweis-abgelaufen-akzeptieren",
      label: "Abgelaufenen Ausweis trotzdem akzeptieren",
      status: "forbidden",
      feedbackSelected:
        "Schwerer Fehler: Ein abgelaufenes Dokument ist kein gültiges Identifikationsmittel – dies verstösst gegen GwG Art. 3.",
      feedbackNotSelected: "Korrekt – abgelaufene Ausweise dürfen nie akzeptiert werden.",
    },
    {
      id: "kopie-abgelaufen",
      label: "Kopie des abgelaufenen Ausweises erstellen und weiterfahren",
      status: "forbidden",
      feedbackSelected: "Fehler: Eine Kopie macht ein ungültiges Dokument nicht gültig.",
      feedbackNotSelected: "Korrekt – Kopie eines abgelaufenen Dokuments ist wertlos.",
    },
    {
      id: "ausnahme-compliance",
      label: "Ausnahme beim Compliance-Bereich beantragen",
      status: "forbidden",
      feedbackSelected:
        "Fehler: Ein abgelaufener Ausweis ist eine Hard-Regel ohne Ermessensspielraum – es gibt keine Compliance-Ausnahme.",
      feedbackNotSelected: "Korrekt – keine Ausnahme möglich, das ist eine absolute Regel.",
    },
  ],
  generalFeedback:
    "Ein abgelaufener Ausweis ist kein gültiges Identifikationsdokument – auch wenn 'das Foto noch stimmt'. Der gesamte weitere Prozess (Formular A, Basisvertrag, FATCA etc.) darf erst nach Vorlage eines gültigen Ausweises fortgesetzt werden. Es gibt keine Ausnahme über Compliance.",
};

const L1_VOLLMACHT_MCQ: McqCase = {
  id: "l1-vollmacht-mcq",
  type: "multiple-choice",
  level: 1,
  title: "Rechtsfrage: Kontoeröffnung per Vollmacht",
  briefing:
    "Herr Huber ruft an und möchte ein Privatkonto eröffnen. Er kann jedoch nicht persönlich in die Filiale kommen. Er schlägt vor, seinen Bruder mit einer Vollmacht zu schicken.",
  question: "Was ist in diesem Fall korrekt?",
  options: [
    {
      key: "A",
      text: "Der Bruder kann mit Vollmacht kommen. Die Bank identifiziert den Bruder und eröffnet das Konto auf den Namen von Herrn Huber.",
    },
    {
      key: "B",
      text: "Die Erstidentifikation muss persönlich durch Herrn Huber erfolgen. Eine Vollmacht ersetzt die persönliche Identifikation bei Kontoeröffnung nicht.",
    },
    {
      key: "C",
      text: "Eine notariell beglaubigte Vollmacht reicht aus – damit ist die Identifikation vollzogen.",
    },
    {
      key: "D",
      text: "Das Konto kann auch per Online-Antrag oder per Post eröffnet werden, ohne persönliches Erscheinen.",
    },
  ],
  correct: "B",
  feedback:
    "Gemäss GwG muss der wirtschaftlich Berechtigte (Herr Huber) bei der Kontoeröffnung persönlich identifiziert werden. Eine Vollmacht berechtigt den Bevollmächtigten, das Konto später zu bedienen – sie ersetzt aber niemals die Erstidentifikation des Kontoinhabers.",
  feedbackPerOption: {
    A: "Falsch – durch Identifikation des Bruders wird nur der Bruder erfasst, nicht Herr Huber. Die GwG-Pflicht zur Identifikation des wirtschaftlich Berechtigten bleibt unerfüllt.",
    B: "Korrekt – GwG Art. 3 verlangt die persönliche Identifikation des Kontoinhabers. Herr Huber muss selbst erscheinen.",
    C: "Falsch – eine notarielle Beglaubigung der Vollmacht ändert nichts an der Pflicht zur persönlichen Identifikation des wirtschaftlich Berechtigten.",
    D: "Falsch – für Neukunden ist in der Schweiz grundsätzlich die persönliche Identifikation in der Filiale oder per Video-Ident erforderlich.",
  },
};

// ─────────────────────────────────────────────────────────
// LEVEL 2 – Spezialfälle
// ─────────────────────────────────────────────────────────

const L2_AUSLAENDER: DocumentCase = {
  id: "l2-auslaendischer-kunde",
  type: "document-select",
  level: 2,
  title: "Ausländischer Neukunde – Aufenthaltsbewilligung B",
  briefing:
    "Herr Antonescu (35) aus Rumänien wohnt seit 6 Monaten in der Schweiz und arbeitet als Software-Entwickler. Er hat sowohl seinen rumänischen Reisepass als auch seine Aufenthaltsbewilligung B dabei. Einkommen und Anlass sind klar und plausibel.",
  documents: [
    {
      id: "basisvertrag",
      label: "Basisvertrag",
      status: "required",
      feedbackSelected: "Korrekt – der Basisvertrag regelt die Geschäftsbeziehung und ist bei jeder Kontoeröffnung zwingend.",
      feedbackNotSelected: "Fehler: Der Basisvertrag ist das Grunddokument jeder Kontoeröffnung und darf nicht fehlen.",
    },
    {
      id: "reisepass-ausl",
      label: "Ausländischer Reisepass (gültig)",
      status: "optional",
      feedbackSelected: "Korrekt – ein gültiger ausländischer Pass ist ein anerkanntes Identifikationsdokument.",
      feedbackNotSelected:
        "Hinweis: Reisepass ist ebenfalls gültig. Sie haben die Aufenthaltsbewilligung gewählt – das ist auch korrekt.",
    },
    {
      id: "aufenthalt-b",
      label: "Aufenthaltsbewilligung B",
      status: "optional",
      feedbackSelected: "Korrekt – die Aufenthaltsbewilligung B ist ein anerkanntes Identifikationsmittel.",
      feedbackNotSelected:
        "Hinweis: Aufenthaltsbewilligung B ist ebenfalls gültig. Sie haben den Reisepass gewählt – das ist auch korrekt.",
    },
    {
      id: "eigenerklarung-np",
      label: "Eigenerklärung FATCA (natürliche Person)",
      status: "required",
      feedbackSelected: "Korrekt – FATCA gilt auch für EU-Bürger: US-Verbindungen müssen aktiv abgeklärt werden.",
      feedbackNotSelected: "Fehler: FATCA-Abklärung ist bei jeder Neueröffnung zwingend – unabhängig der Nationalität.",
    },
    {
      id: "formular-a",
      label: "Formular A (wirtschaftlich Berechtigter, VSB 20)",
      status: "required",
      feedbackSelected: "Korrekt – Formular A ist unabhängig von der Nationalität bei jeder Kontoeröffnung zwingend.",
      feedbackNotSelected: "Fehler: Formular A (VSB 20 – wirtschaftlich Berechtigter) ist auch bei ausländischen Kunden obligatorisch.",
    },
    {
      id: "wohnsitzbestatigung",
      label: "Wohnsitzbestätigung / Meldebestätigung",
      status: "required",
      feedbackSelected: "Korrekt – Wohnsitz muss belegt werden.",
      feedbackNotSelected: "Fehler: Wohnsitznachweis nicht vergessen.",
    },
    {
      id: "unterschriftenprobe",
      label: "Unterschriftenprobe",
      status: "required",
      feedbackSelected: "Korrekt.",
      feedbackNotSelected: "Fehler: Unterschriftenprobe wird benötigt.",
    },
    {
      id: "arbeitsvertrag",
      label: "Arbeitsvertrag / Lohnausweis",
      status: "optional",
      feedbackSelected: "Gut – bestätigt Einkommen und Aufenthaltsgrund, zeigt proaktiven Kundenservice.",
      feedbackNotSelected: "Akzeptabel – bei plausiblem Anlass nicht zwingend.",
    },
    {
      id: "ausweis-ch",
      label: "Schweizer Ausweis / Schweizer Pass",
      status: "forbidden",
      feedbackSelected: "Fehler: Herr Antonescu ist rumänischer Staatsbürger – er hat keinen Schweizer Ausweis.",
      feedbackNotSelected: "Korrekt – Kunde ist kein Schweizer Bürger.",
    },
    {
      id: "herkunft-vermoegen",
      label: "Herkunftsnachweis Vermögen (EDD)",
      status: "forbidden",
      feedbackSelected:
        "Fehler: Kein erhöhtes Risiko erkennbar. Normaler Angestellter mit plausiblem Einkommen – kein EDD erforderlich.",
      feedbackNotSelected: "Korrekt – Standardfall, kein erhöhtes Risiko.",
    },
    {
      id: "pep-formular",
      label: "PEP-Prüfungsformular",
      status: "forbidden",
      feedbackSelected: "Fehler: Kein Hinweis auf politisch exponierte Stellung.",
      feedbackNotSelected: "Korrekt – kein PEP-Status erkennbar.",
    },
  ],
  requiredOneOf: [["reisepass-ausl", "aufenthalt-b"]],
  generalFeedback:
    "Für ausländische Kunden gilt: Entweder der ausländische Pass ODER die Aufenthaltsbewilligung reicht für die Identifikation. Zusätzlich sind Basisvertrag, Eigenerklärung FATCA (natürliche Person), Formular A (VSB 20 – wirtschaftlich Berechtigter), Wohnsitznachweis und Unterschriftenprobe erforderlich. Bei einem normalen Angestelltenverhältnis besteht kein erhöhtes Risiko – kein EDD nötig.",
};

const L2_BAREINLAGE: DocumentCase = {
  id: "l2-verdaechtige-bareinlage",
  type: "document-select",
  level: 2,
  title: "GwG-Fall: Verdächtige Bareinlage",
  briefing:
    "Herr X betritt die Filiale und möchte ein Privatkonto eröffnen. Unmittelbar nach der Begrüssung legt er CHF 48'000 in bar auf den Tisch: 'Das kommt aufs Konto.' Er wird nervös und ausweichend, wenn Sie nach der Herkunft fragen. Keine glaubhafte Erklärung.",
  documents: [
    {
      id: "basisvertrag",
      label: "Basisvertrag",
      status: "required",
      feedbackSelected: "Korrekt – der Basisvertrag regelt die Geschäftsbeziehung und ist bei jeder Kontoeröffnung zwingend.",
      feedbackNotSelected: "Fehler: Der Basisvertrag ist das Grunddokument jeder Kontoeröffnung und darf nicht fehlen.",
    },
    {
      id: "ausweis-identifikation",
      label: "Ausweis genau prüfen und Kopie erstellen",
      status: "required",
      feedbackSelected: "Korrekt – besonders bei Risikofällen ist die sorgfältige Identifikation entscheidend.",
      feedbackNotSelected: "Fehler: Identifikation ist Pflicht – gerade bei auffälligen Fällen.",
    },
    {
      id: "eigenerklarung-np",
      label: "Eigenerklärung FATCA (natürliche Person)",
      status: "required",
      feedbackSelected: "Korrekt – FATCA-Abklärung ist auch in diesem Fall zwingend.",
      feedbackNotSelected: "Fehler: FATCA-Abklärung nicht vergessen.",
    },
    {
      id: "formular-a",
      label: "Formular A (wirtschaftlich Berechtigter, VSB 20)",
      status: "required",
      feedbackSelected: "Korrekt – Formular A ist auch in Risikofällen zwingend auszufüllen.",
      feedbackNotSelected: "Fehler: Formular A (VSB 20) ist immer erforderlich – besonders wichtig bei unklarer Mittelherkunft.",
    },
    {
      id: "herkunft-abklaeren",
      label: "Herkunft der Gelder schriftlich abklären (GwG Art. 6)",
      status: "required",
      feedbackSelected:
        "Korrekt – bei ungewöhnlichen Bareinlagen besteht eine gesetzliche Abklärungspflicht gemäss GwG Art. 6.",
      feedbackNotSelected:
        "Schwerer Fehler: GwG Art. 6 verpflichtet zur Abklärung der Mittelherkunft bei ungewöhnlichen Transaktionen.",
    },
    {
      id: "vorgesetzte-informieren",
      label: "Vorgesetzte/n und Compliance informieren",
      status: "required",
      feedbackSelected: "Korrekt – bei konkretem Verdacht muss intern eskaliert werden.",
      feedbackNotSelected:
        "Fehler: Interne Eskalation bei Geldwäscheverdacht ist zwingend – Sie dürfen nicht alleine entscheiden.",
    },
    {
      id: "transaktion-dokumentieren",
      label: "Vorfall und Abklärungsresultat intern dokumentieren",
      status: "required",
      feedbackSelected: "Korrekt – lückenlose Dokumentation ist ein zentrales GwG-Element.",
      feedbackNotSelected: "Fehler: Dokumentation ist Pflicht und schützt die Bank.",
    },
    {
      id: "konto-sofort-eroeffnen",
      label: "Konto sofort eröffnen und Einzahlung verbuchen",
      status: "forbidden",
      feedbackSelected:
        "Schwerer Fehler: Konto ohne Abklärung zu eröffnen verstösst gegen GwG Art. 6 – mögliche Beihilfe zur Geldwäscherei.",
      feedbackNotSelected: "Korrekt – zuerst abklären, dann entscheiden.",
    },
    {
      id: "geld-diskret-annehmen",
      label: "Geld diskret annehmen, um den Kunden nicht zu vergraulen",
      status: "forbidden",
      feedbackSelected:
        "Schwerer Fehler: Diskrete Annahme ohne Abklärung ist potenziell Beihilfe zur Geldwäscherei.",
      feedbackNotSelected: "Korrekt – niemals ohne Abklärung.",
    },
    {
      id: "sofort-polizei",
      label: "Sofort die Polizei rufen",
      status: "forbidden",
      feedbackSelected:
        "Fehler: Nicht die richtige Reihenfolge. Zuerst intern eskalieren, Compliance informieren. Ggf. MROS-Meldung via Compliance – nicht direkt Polizei.",
      feedbackNotSelected: "Korrekt – direkte Polizei ist nicht der korrekte Weg.",
    },
  ],
  generalFeedback:
    "Bei ungewöhnlichen Bareinlagen greift GwG Art. 6 (Abklärungspflicht der Mittelherkunft). Reihenfolge: 1) Identifizieren, 2) Herkunft schriftlich abklären, 3) intern eskalieren (Compliance), 4) dokumentieren. Konto erst nach positiver Abklärung eröffnen. MROS-Meldung via Compliance – nicht direkt zur Polizei.",
};

const L2_MINDERJAEHRIG: DocumentCase = {
  id: "l2-minderjaehrig",
  type: "document-select",
  level: 2,
  title: "Minderjährige Kundin – Jugendkonto",
  briefing:
    "Lena Zimmermann (14 Jahre) kommt alleine in die Filiale und möchte ein Jugendkonto eröffnen. Sie sagt, ihre Eltern seien einverstanden, hätten aber heute keine Zeit gekommen zu sein.",
  documents: [
    {
      id: "basisvertrag",
      label: "Basisvertrag",
      status: "required",
      feedbackSelected: "Korrekt – der Basisvertrag regelt die Geschäftsbeziehung und ist bei jeder Kontoeröffnung zwingend.",
      feedbackNotSelected: "Fehler: Der Basisvertrag ist das Grunddokument jeder Kontoeröffnung und darf nicht fehlen.",
    },
    {
      id: "ausweis-lena",
      label: "Ausweis / Pass von Lena (Minderjährige)",
      status: "required",
      feedbackSelected: "Korrekt – auch Minderjährige werden identifiziert.",
      feedbackNotSelected: "Fehler: Identifikation der Minderjährigen ist erforderlich.",
    },
    {
      id: "ausweis-elternteil",
      label: "Ausweis eines Elternteils (gesetzlicher Vertreter)",
      status: "required",
      feedbackSelected:
        "Korrekt – der gesetzliche Vertreter muss persönlich erscheinen und identifiziert werden.",
      feedbackNotSelected:
        "Fehler: Ein Elternteil muss persönlich erscheinen und sich ausweisen.",
    },
    {
      id: "unterschrift-elternteil",
      label: "Unterschrift des Elternteils / gesetzlichen Vertreters",
      status: "required",
      feedbackSelected:
        "Korrekt – Minderjährige sind nicht voll handlungsfähig; Eltern müssen die Eröffnung unterzeichnen.",
      feedbackNotSelected:
        "Fehler: Die Kontoeröffnung muss vom Elternteil unterzeichnet werden.",
    },
    {
      id: "konto-erst-mit-elternteil",
      label: "Konto erst eröffnen, wenn Elternteil persönlich anwesend ist",
      status: "required",
      feedbackSelected: "Korrekt – ohne persönlich anwesenden Elternteil darf das Konto nicht eröffnet werden.",
      feedbackNotSelected:
        "Fehler: Ohne persönlich anwesenden Elternteil ist die Kontoeröffnung nicht möglich.",
    },
    {
      id: "geburtsurkunde",
      label: "Geburtsurkunde von Lena",
      status: "optional",
      feedbackSelected: "Sinnvoll – bestätigt das Alter, obwohl der Ausweis ausreichend ist.",
      feedbackNotSelected: "Akzeptabel – der Ausweis belegt das Alter bereits.",
    },
    {
      id: "eigenerklarung-lena-selbst",
      label: "Eigenerklärung von Lena selbst unterschreiben lassen",
      status: "forbidden",
      feedbackSelected:
        "Fehler: Minderjährige sind nicht voll handlungsfähig und dürfen keine verbindlichen Bankdokumente unterzeichnen. Die Eltern vertreten sie.",
      feedbackNotSelected: "Korrekt – Lena unterschreibt nicht selbst.",
    },
    {
      id: "muendliche-zustimmung-reicht",
      label: "Mündliche Zustimmung der Eltern am Telefon reicht aus",
      status: "forbidden",
      feedbackSelected:
        "Fehler: Mündliche Aussagen – auch am Telefon – sind nicht rechtsgültig. Schriftliche Unterschrift vor Ort ist zwingend.",
      feedbackNotSelected: "Korrekt – mündliche Zustimmung ist nicht bindend.",
    },
    {
      id: "konto-ohne-eltern",
      label: "Konto trotzdem eröffnen, Zustimmung nachreichen lassen",
      status: "forbidden",
      feedbackSelected:
        "Fehler: Konto ohne Eltern-Unterschrift zu eröffnen ist rechtlich nicht zulässig.",
      feedbackNotSelected: "Korrekt – keine Kontoeröffnung ohne vollständige Unterlagen.",
    },
  ],
  generalFeedback:
    "Bei Minderjährigen (unter 18 Jahren): Mindestens ein Elternteil muss persönlich erscheinen, sich ausweisen und die Kontoeröffnung unterzeichnen. Die Minderjährige selbst unterzeichnet keine Bankdokumente. Mündliche Zustimmung – auch per Telefon – genügt nicht.",
};

const L2_PEP_SCHMID: DocumentCase = {
  id: "l2-pep-schmid",
  type: "document-select",
  level: 2,
  title: "PEP-Kunde – ehemaliger Nationalrat",
  briefing:
    "Herr Schmid (58), Schweizer Staatsbürger, wohnhaft in Bern, möchte ein Privatkonto eröffnen. Er ist ehemaliger Nationalrat (bis vor 2 Jahren im Amt) und derzeit als Verwaltungsratspräsident einer mittelständischen Firma tätig. Er hat einen gültigen Schweizer Pass dabei. Auf Nachfrage nach seinem Beruf erwähnt er nur 'Unternehmer' – die politische Vergangenheit erwähnt er nicht von sich aus.",
  documents: [
    {
      id: "ausweis-ch",
      label: "Gültiger CH-Ausweis / Reisepass",
      status: "required",
      feedbackSelected: "Richtig, die Identität muss immer mit einem gültigen Ausweis geprüft werden.",
      feedbackNotSelected: "Ohne gültigen Ausweis darf keine Kontoeröffnung erfolgen.",
    },
    {
      id: "basisvertrag",
      label: "Basisvertrag",
      status: "required",
      feedbackSelected: "Korrekt, der Basisvertrag ist Grundlage jeder Kontobeziehung.",
      feedbackNotSelected: "Der Basisvertrag fehlt – ohne ihn keine gültige Kontoeröffnung.",
    },
    {
      id: "formular-a",
      label: "Formular A (wirtschaftlich Berechtigter, VSB 20)",
      status: "required",
      feedbackSelected: "Richtig, der wirtschaftlich Berechtigte muss immer festgestellt werden.",
      feedbackNotSelected: "Formular A fehlt – die wirtschaftliche Berechtigung wurde nicht dokumentiert.",
    },
    {
      id: "eigenerklarung-np",
      label: "Eigenerklärung FATCA (natürliche Person)",
      status: "required",
      feedbackSelected: "Korrekt, als natürliche Person muss der FATCA-Status erklärt werden.",
      feedbackNotSelected: "FATCA-Erklärung fehlt – diese ist bei jeder Kontoeröffnung einer natürlichen Person Pflicht.",
    },
    {
      id: "pep-formular",
      label: "PEP-Prüfungsformular",
      status: "required",
      feedbackSelected:
        "Richtig erkannt: Herr Schmid ist als ehemaliger Nationalrat ein PEP, auch nach Amtsende gilt verstärkte Sorgfaltspflicht.",
      feedbackNotSelected:
        "Übersehen: Herr Schmid ist ehemaliger Nationalrat und gilt damit als PEP – die politische Funktion wurde im Gespräch bagatellisiert, muss aber erkannt werden.",
    },
    {
      id: "herkunft-vermoegen",
      label: "Herkunftsnachweis Vermögen",
      status: "required",
      feedbackSelected: "Korrekt, bei PEP gilt eine verstärkte Pflicht zur Prüfung der Vermögensherkunft.",
      feedbackNotSelected: "Bei PEP-Kunden ist der Herkunftsnachweis Vermögen zwingend – wurde hier übersehen.",
    },
    {
      id: "kontaktdaten",
      label: "Telefon / E-Mail-Adresse",
      status: "optional",
      feedbackSelected: "Sinnvolle Zusatzangabe, aber nicht zwingend für die Kontoeröffnung selbst.",
      feedbackNotSelected: "Nicht zwingend nötig für die Kontoeröffnung.",
    },
    {
      id: "unterschriftenprobe",
      label: "Unterschriftenprobe",
      status: "optional",
      feedbackSelected: "Üblicher Standardprozess, aber hier nicht der entscheidende Punkt.",
      feedbackNotSelected: "Kein zwingendes Dokument im Kern dieses Falls.",
    },
    {
      id: "wohnsitzbestatigung",
      label: "Wohnsitzbestätigung / Meldebestätigung",
      status: "optional",
      feedbackSelected: "Der Wohnsitz ist durch den Ausweis bereits ausreichend dokumentiert.",
      feedbackNotSelected: "Nicht zwingend, da der Ausweis den Wohnsitz bereits belegt.",
    },
    {
      id: "vollmacht",
      label: "Vollmacht",
      status: "forbidden",
      feedbackSelected: "Falsch – im Fall ist keine Vollmacht erwähnt oder nötig, Herr Schmid handelt selbst.",
      feedbackNotSelected: "Korrekt nicht ausgewählt – keine Vollmacht im Spiel.",
    },
    {
      id: "steuerausweis",
      label: "Steuerausweis / Steuererklärung",
      status: "forbidden",
      feedbackSelected:
        "Falsch – für die Vermögensherkunft bei PEP ist der spezifische Herkunftsnachweis nötig, nicht der allgemeine Steuerausweis.",
      feedbackNotSelected: "Korrekt nicht ausgewählt – nicht das richtige Dokument für diesen Zweck.",
    },
    {
      id: "lohnausweis",
      label: "Lohnausweis",
      status: "forbidden",
      feedbackSelected: "Falsch – bei PEP geht es um die Herkunft des Vermögens, nicht um das Einkommen.",
      feedbackNotSelected: "Korrekt nicht ausgewählt – nicht relevant für die Vermögensherkunfts-Prüfung.",
    },
    {
      id: "handelsregister",
      label: "Handelsregisterauszug",
      status: "forbidden",
      feedbackSelected: "Falsch – das ist ein Privatkonto, kein Firmenkonto.",
      feedbackNotSelected: "Korrekt nicht ausgewählt – kein Firmenbezug in diesem Fall.",
    },
    {
      id: "reisepass-ausl",
      label: "Ausländischer Reisepass",
      status: "forbidden",
      feedbackSelected: "Falsch – Herr Schmid ist Schweizer Staatsbürger mit gültigem CH-Pass.",
      feedbackNotSelected: "Korrekt nicht ausgewählt – nicht zutreffend.",
    },
    {
      id: "jahresabschluss",
      label: "Jahresabschluss / Bilanz",
      status: "forbidden",
      feedbackSelected: "Falsch – relevant für Firmenkunden, nicht für ein Privatkonto.",
      feedbackNotSelected: "Korrekt nicht ausgewählt – kein Firmenbezug.",
    },
  ],
  generalFeedback:
    "Der zentrale Lernpunkt: Auch wenn ein Kunde seine politische Vergangenheit bagatellisiert ('nur Unternehmer'), muss die Bank selbst erkennen, dass ein ehemaliger Nationalrat als PEP gilt. Das löst verstärkte Sorgfaltspflichten aus – insbesondere PEP-Prüfung und Herkunftsnachweis Vermögen.",
};

const L2_ERBSCHAFT_KELLER: DocumentCase = {
  id: "l2-erbschaft-keller",
  type: "document-select",
  level: 2,
  title: "Erbschaft – Kontoauflösung nach Todesfall",
  briefing:
    "Frau Keller ist vor 3 Wochen verstorben. Sie hatte ein Privatkonto bei Ihrer Bank. Herr Keller (Sohn) meldet sich am Schalter, legt eine Todesurkunde vor und möchte das Konto seiner verstorbenen Mutter auflösen und das Guthaben auf sein eigenes Konto überweisen lassen. Er erwähnt, dass er noch eine Schwester hat, die 'aber damit nichts zu tun haben will'.",
  documents: [
    {
      id: "erbenschein",
      label: "Erbenbescheinigung / Erbschein",
      status: "required",
      feedbackSelected: "Richtig, der Erbschein weist die Erbberechtigung rechtsgültig nach.",
      feedbackNotSelected: "Ohne Erbschein kann die Erbberechtigung nicht zweifelsfrei festgestellt werden.",
    },
    {
      id: "todesurkunde",
      label: "Todesurkunde",
      status: "required",
      feedbackSelected: "Korrekt, die Todesurkunde ist Grundvoraussetzung für jede Bearbeitung des Nachlasses.",
      feedbackNotSelected: "Die Todesurkunde fehlt – ohne sie kann der Erbfall nicht bestätigt werden.",
    },
    {
      id: "zustimmung-alle-erben",
      label: "Zustimmung / Unterschrift aller Erben",
      status: "required",
      feedbackSelected:
        "Richtig erkannt: Die mündliche Aussage, die Schwester wolle 'nichts damit zu tun haben', ersetzt keine formelle Zustimmung oder einen Erbverzicht.",
      feedbackNotSelected:
        "Übersehen: Auch wenn die Schwester laut Aussage 'nichts damit zu tun haben will', braucht es ihre formelle Zustimmung oder einen dokumentierten Verzicht – eine mündliche Aussage reicht nicht.",
    },
    {
      id: "ausweis-ch",
      label: "Gültiger CH-Ausweis / Reisepass",
      status: "required",
      feedbackSelected: "Korrekt, die Identität des sich meldenden Erben muss geprüft werden.",
      feedbackNotSelected: "Der Ausweis des Erben fehlt – die Identität muss zwingend geprüft werden.",
    },
    {
      id: "kontaktdaten",
      label: "Telefon / E-Mail-Adresse",
      status: "optional",
      feedbackSelected: "Sinnvolle Zusatzangabe, aber nicht der Kernpunkt dieses Falls.",
      feedbackNotSelected: "Nicht zwingend für die Abwicklung des Erbfalls.",
    },
    {
      id: "heiratsurkunde",
      label: "Heiratsurkunde / Familienbüchlein",
      status: "forbidden",
      feedbackSelected: "Falsch – im Fall wird kein Ehepartner erwähnt, der mitberechtigt sein könnte.",
      feedbackNotSelected: "Korrekt nicht ausgewählt – kein Ehepartner im Fall relevant.",
    },
    {
      id: "testament",
      label: "Testament / Erbvertrag",
      status: "forbidden",
      feedbackSelected:
        "Falsch in diesem Fall – im Briefing wird kein Testament erwähnt; ohne ein solches regelt der Erbschein bereits die gesetzliche Erbfolge ausreichend.",
      feedbackNotSelected: "Korrekt nicht ausgewählt – kein Testament im Fall erwähnt, der Erbschein reicht hier aus.",
    },
    {
      id: "pep-formular",
      label: "PEP-Prüfungsformular",
      status: "forbidden",
      feedbackSelected: "Falsch – keine PEP-Indizien in diesem Fall.",
      feedbackNotSelected: "Korrekt nicht ausgewählt – nicht relevant in diesem Fall.",
    },
    {
      id: "eigenerklarung-np",
      label: "Eigenerklärung FATCA (natürliche Person)",
      status: "forbidden",
      feedbackSelected:
        "Falsch – es geht um die Auflösung eines bestehenden Kontos, nicht um eine Neueröffnung mit FATCA-Pflicht.",
      feedbackNotSelected: "Korrekt nicht ausgewählt – nicht der Kernpunkt bei einer Kontoauflösung im Erbfall.",
    },
    {
      id: "wohnsitzbestatigung",
      label: "Wohnsitzbestätigung / Meldebestätigung",
      status: "forbidden",
      feedbackSelected: "Falsch – nicht zwingend bei der Abwicklung eines Erbfalls.",
      feedbackNotSelected: "Korrekt nicht ausgewählt – nicht zwingend in diesem Fall.",
    },
  ],
  generalFeedback:
    "Der zentrale Lernpunkt: Eine mündliche Aussage wie 'meine Schwester will nichts damit zu tun haben' hat keine rechtliche Wirkung. Es braucht immer die formelle Zustimmung aller Erben oder einen dokumentierten Erbverzicht, bevor das Konto aufgelöst und das Guthaben ausgezahlt werden darf.",
};

// ─────────────────────────────────────────────────────────
// LEVEL 3 – LAP-Niveau
// ─────────────────────────────────────────────────────────

const L3_GEMEINSCHAFTSKONTO: DocumentCase = {
  id: "l3-gemeinschaftskonto",
  type: "document-select",
  level: 3,
  title: "Gemeinschaftskonto – Ehepaar Berger",
  briefing:
    "Das Ehepaar Stefan und Maria Berger (beide Schweizer Bürger, beide anwesend) möchte gemeinsam ein Privatkonto eröffnen. Sie möchten, dass jeder von ihnen alleine über das Konto verfügen kann – ohne dass der andere unterschreiben muss.",
  documents: [
    {
      id: "basisvertrag",
      label: "Basisvertrag",
      status: "required",
      feedbackSelected: "Korrekt – der Basisvertrag regelt die Geschäftsbeziehung und ist bei jeder Kontoeröffnung zwingend.",
      feedbackNotSelected: "Fehler: Der Basisvertrag ist das Grunddokument jeder Kontoeröffnung und darf nicht fehlen.",
    },
    {
      id: "ausweis-stefan",
      label: "Ausweis / Pass von Stefan Berger",
      status: "required",
      feedbackSelected: "Korrekt – beide Kontoinhaber müssen einzeln identifiziert werden.",
      feedbackNotSelected: "Fehler: Stefan Berger muss identifiziert werden.",
    },
    {
      id: "ausweis-maria",
      label: "Ausweis / Pass von Maria Berger",
      status: "required",
      feedbackSelected: "Korrekt – beide Kontoinhaber müssen einzeln identifiziert werden.",
      feedbackNotSelected: "Fehler: Maria Berger muss identifiziert werden.",
    },
    {
      id: "eigenerklarung-stefan",
      label: "Eigenerklärung FATCA (natürliche Person) – Stefan Berger",
      status: "required",
      feedbackSelected: "Korrekt – FATCA-Abklärung für jeden Kontoinhaber separat erforderlich.",
      feedbackNotSelected: "Fehler: FATCA-Abklärung für Stefan Berger fehlt.",
    },
    {
      id: "eigenerklarung-maria",
      label: "Eigenerklärung FATCA (natürliche Person) – Maria Berger",
      status: "required",
      feedbackSelected: "Korrekt – FATCA-Abklärung für jeden Kontoinhaber separat erforderlich.",
      feedbackNotSelected: "Fehler: FATCA-Abklärung für Maria Berger fehlt.",
    },
    {
      id: "formular-a",
      label: "Formular A (wirtschaftlich Berechtigter, VSB 20)",
      status: "required",
      feedbackSelected: "Korrekt – Formular A wird einmal pro Konto ausgestellt und dokumentiert beide wirtschaftlich Berechtigten.",
      feedbackNotSelected: "Fehler: Formular A (VSB 20) ist auch beim Gemeinschaftskonto zwingend – ein Formular für beide Inhaber.",
    },
    {
      id: "einzel-vereinbarung",
      label: "Einzelzeichnungsvereinbarung (jeder verfügt alleine)",
      status: "required",
      feedbackSelected:
        "Korrekt – entspricht dem Wunsch des Ehepaars: beide dürfen alleine verfügen.",
      feedbackNotSelected:
        "Fehler: Das Ehepaar möchte Einzelzeichnung – diese Vereinbarung ist zwingend.",
    },
    {
      id: "kollektiv-vereinbarung",
      label: "Kollektivzeichnungsvereinbarung (beide müssen gemeinsam unterschreiben)",
      status: "forbidden",
      feedbackSelected:
        "Fehler: Das Ehepaar möchte ausdrücklich Einzelzeichnung. Kollektivzeichnung widerspricht dem Kundenwunsch.",
      feedbackNotSelected: "Korrekt – Kollektivzeichnung entspricht nicht dem Kundenwunsch.",
    },
    {
      id: "wohnsitzbestatigung",
      label: "Wohnsitzbestätigung",
      status: "optional",
      feedbackSelected: "Gut – Wohnsitznachweis ist empfehlenswert.",
      feedbackNotSelected: "Akzeptabel – nicht zwingend bei bekanntem Kundenstamm.",
    },
    {
      id: "heiratszeugnis",
      label: "Heiratsurkunde",
      status: "optional",
      feedbackSelected: "Sinnvoll – bestätigt die Beziehung der Kontoinhaber.",
      feedbackNotSelected: "Akzeptabel – nicht zwingend für die Kontoeröffnung.",
    },
    {
      id: "nur-ein-ausweis",
      label: "Nur einen Ausweis (z.B. nur Stefan) kopieren",
      status: "forbidden",
      feedbackSelected:
        "Fehler: Beim Gemeinschaftskonto müssen BEIDE Kontoinhaber identifiziert werden.",
      feedbackNotSelected: "Korrekt – beide müssen identifiziert werden.",
    },
    {
      id: "nur-eine-eigenerklarung",
      label: "Nur eine Eigenerklärung ausfüllen (für beide)",
      status: "forbidden",
      feedbackSelected:
        "Fehler: GwG verlangt eine Eigenerklärung pro wirtschaftlich Berechtigtem.",
      feedbackNotSelected: "Korrekt – jede Person braucht eine separate Eigenerklärung.",
    },
  ],
  generalFeedback:
    "Beim Gemeinschaftskonto: Basisvertrag + BEIDE Inhaber identifiziert (je Ausweis + Eigenerklärung FATCA (natürliche Person)). Zusätzlich: Formular A einmal pro Konto (VSB 20). Die Zeichnungsregelung richtet sich nach dem Kundenwunsch – hier Einzelzeichnung. Kollektivzeichnung wäre falsch, da das Ehepaar explizit einzeln verfügen möchte.",
};

const L3_AUSWEIS_TRICK_MCQ: McqCase = {
  id: "l3-ausweis-trickfall-mcq",
  type: "multiple-choice",
  level: 3,
  title: "LAP-Trickfall: Ausweis seit 5 Tagen abgelaufen",
  briefing:
    "Heute ist der 20.06.2026. Herr Novak legt seinen Ausweis vor. Sie prüfen das Ablaufdatum: 15.06.2026 – also exakt 5 Tage abgelaufen. Herr Novak argumentiert: 'Das ist fast noch gültig, nur 5 Tage! Das Foto stimmt doch noch.'",
  today: "20.06.2026",
  question: "Was ist rechtlich und gemäss GwG korrekt?",
  options: [
    {
      key: "A",
      text: "Ausweis gilt noch für 30 Tage nach dem Ablaufdatum – also akzeptierbar.",
    },
    {
      key: "B",
      text: "Ausweis ist ungültig. Das Konto kann nicht eröffnet werden. Herrn Novak zur Ausweis-Erneuerung auffordern.",
    },
    {
      key: "C",
      text: "Bei weniger als 3 Monaten seit Ablauf kann die Bank nach internem Ermessen eine Ausnahme gewähren.",
    },
    {
      key: "D",
      text: "Mit einer Kopie des Ablaufdatums und schriftlicher Compliance-Freigabe ist der Ausweis noch verwendbar.",
    },
  ],
  correct: "B",
  feedback:
    "Das GwG kennt keine Toleranzfrist für abgelaufene Identifikationsdokumente. 1 Tag oder 1 Jahr macht keinen Unterschied: Ein abgelaufener Ausweis ist kein gültiges Identifikationsmittel. Herr Novak muss seinen Ausweis beim Einwohneramt / Passbüro erneuern und dann zurückkommen.",
  feedbackPerOption: {
    A: "Falsch – es gibt keine 30-Tage-Toleranzfrist im Schweizer Recht oder in der GwG.",
    B: "Korrekt – das GwG kennt keine Toleranzfristen. Ein abgelaufener Ausweis ist ungültig, unabhängig davon, wie kurz er abgelaufen ist.",
    C: "Falsch – es gibt keinerlei interne oder externe Ausnahmeregelung für 'knapp abgelaufene' Ausweise.",
    D: "Falsch – weder eine Kopie noch eine Compliance-Freigabe kann ein ungültiges Dokument gültig machen.",
  },
};

const L3_HOCHRISIKO_PEP: DocumentCase = {
  id: "l3-hochrisiko-pep",
  type: "document-select",
  level: 3,
  title: "Hochrisiko: PEP aus dem Ausland",
  briefing:
    "Herr Okeke (55) aus Nigeria möchte ein Privatkonto eröffnen. Er beschreibt sich als 'Geschäftsmann mit engen Verbindungen zur nigerianischen Regierung'. Er möchte USD 480'000 aus einem 'Geschäftsdeal' einzahlen und wird ungeduldig bei Nachfragen.",
  documents: [
    {
      id: "basisvertrag",
      label: "Basisvertrag",
      status: "required",
      feedbackSelected: "Korrekt – der Basisvertrag regelt die Geschäftsbeziehung und ist bei jeder Kontoeröffnung zwingend.",
      feedbackNotSelected: "Fehler: Der Basisvertrag ist das Grunddokument jeder Kontoeröffnung und darf nicht fehlen.",
    },
    {
      id: "reisepass-international",
      label: "Reisepass (international gültig)",
      status: "required",
      feedbackSelected: "Korrekt – primäres Identifikationsdokument.",
      feedbackNotSelected: "Fehler: Identifikation ist Pflicht.",
    },
    {
      id: "eigenerklarung-np",
      label: "Eigenerklärung FATCA (natürliche Person)",
      status: "required",
      feedbackSelected: "Korrekt – FATCA-Abklärung ist bei jeder Kontoeröffnung zwingend.",
      feedbackNotSelected: "Fehler: FATCA-Abklärung nicht vergessen.",
    },
    {
      id: "formular-a",
      label: "Formular A (wirtschaftlich Berechtigter, VSB 20)",
      status: "required",
      feedbackSelected: "Korrekt – Formular A ist zwingend, besonders kritisch bei PEP-Verdacht.",
      feedbackNotSelected: "Fehler: Formular A (VSB 20) ist immer obligatorisch – bei PEP-Verdacht besonders wichtig.",
    },
    {
      id: "wohnsitzbestatigung",
      label: "Adressnachweis / Wohnsitzbestätigung",
      status: "required",
      feedbackSelected: "Korrekt.",
      feedbackNotSelected: "Fehler: Adressnachweis ist nötig.",
    },
    {
      id: "pep-pruefung",
      label: "PEP-Prüfung durchführen (Politically Exposed Person)",
      status: "required",
      feedbackSelected:
        "Korrekt – erwähnte Regierungsverbindungen = PEP-Verdacht, Prüfung ist zwingend.",
      feedbackNotSelected:
        "Schwerer Fehler: Regierungsverbindungen lösen PEP-Prüfungspflicht aus.",
    },
    {
      id: "herkunft-gelder",
      label: "Herkunftsnachweis der Gelder (schriftlich, belegt)",
      status: "required",
      feedbackSelected:
        "Korrekt – USD 480'000 erfordert lückenlose Dokumentation der Mittelherkunft.",
      feedbackNotSelected:
        "Schwerer Fehler: Bei grossen Einlagen aus risikoreichen Ländern ist Herkunftsnachweis zwingend.",
    },
    {
      id: "edd-formular",
      label: "Enhanced Due Diligence (EDD) Formular ausfüllen",
      status: "required",
      feedbackSelected:
        "Korrekt – Nigeria gilt als FATF-Risikoland + PEP-Status = EDD obligatorisch.",
      feedbackNotSelected:
        "Fehler: EDD ist bei PEP und Hochrisiko-Ländern (Nigeria / FATF) zwingend.",
    },
    {
      id: "genehmigung-vorgesetzte",
      label: "Genehmigung durch Vorgesetzte/n einholen",
      status: "required",
      feedbackSelected:
        "Korrekt – PEP-Konten müssen durch eine höhere Stelle (Senior Management) genehmigt werden.",
      feedbackNotSelected:
        "Fehler: PEP-Konten bedürfen der Freigabe durch Vorgesetzte, nicht allein durch den Kundenberater.",
    },
    {
      id: "konto-normal-eroeffnen",
      label: "Konto mit dem Standardprozess eröffnen",
      status: "forbidden",
      feedbackSelected:
        "Schwerer Fehler: Standardprozess bei PEP + Hochrisikoland + USD 480k ist ein GwG-Verstoss.",
      feedbackNotSelected: "Korrekt – Standardprozess ist hier völlig unzureichend.",
    },
    {
      id: "sofort-ablehnen",
      label: "Konto sofort und pauschal ablehnen ohne Prüfung",
      status: "forbidden",
      feedbackSelected:
        "Fehler: Pauschalablehnung ist nicht korrekt. Erst vollständig prüfen, dann entscheiden.",
      feedbackNotSelected: "Korrekt – Ablehnung ohne Prüfung ist nicht die richtige Reaktion.",
    },
    {
      id: "pass-allein-reicht",
      label: "Nur Reisepass ist ausreichend – Standardidentifikation genügt",
      status: "forbidden",
      feedbackSelected:
        "Fehler: Bei PEP und Hochrisiko reicht der Pass alleine nicht. EDD, Herkunftsnachweis und Vorgesetzte-Freigabe sind zusätzlich zwingend.",
      feedbackNotSelected: "Korrekt – Pass alleine reicht hier bei weitem nicht.",
    },
  ],
  generalFeedback:
    "Nigeria gilt als FATF-Risikoland. Regierungsverbindungen = PEP-Prüfung zwingend. Bei USD 480'000 aus einem unbekannten 'Deal': EDD-Formular + lückenloser Herkunftsnachweis + Freigabe durch Vorgesetzte. Das Konto darf erst nach vollständiger positiver Prüfung eröffnet werden.",
};

// ─────────────────────────────────────────────────────────
// LEVEL 2 – zusätzliche Spezialfälle
// ─────────────────────────────────────────────────────────

const L2_NIEDERLASSUNGSBEWILLIGUNG_C: DocumentCase = {
  id: "l2-niederlassungsbewilligung-c",
  type: "document-select",
  level: 2,
  title: "Niederlassungsbewilligung C – gleiche Regeln?",
  briefing:
    "Frau Popescu (48), rumänische Staatsbürgerin, lebt seit 12 Jahren in der Schweiz und besitzt die Niederlassungsbewilligung C. Sie möchte ein Privatkonto eröffnen und legt ihren C-Ausweis vor. Sie fragt: 'Ich bin fast wie eine Schweizerin – brauche ich wirklich noch alle diese Dokumente?'",
  documents: [
    {
      id: "basisvertrag",
      label: "Basisvertrag",
      status: "required",
      feedbackSelected: "Korrekt – Grunddokument jeder Kontoeröffnung.",
      feedbackNotSelected: "Fehler: Der Basisvertrag ist bei jeder Kontoeröffnung zwingend.",
    },
    {
      id: "ausweis-c",
      label: "Niederlassungsbewilligung C (Ausweis C)",
      status: "optional",
      feedbackSelected: "Korrekt – der C-Ausweis ist ein anerkanntes Identifikationsdokument gemäss GwG.",
      feedbackNotSelected: "Hinweis: Der C-Ausweis wäre als Identifikationsmittel gültig. Sie haben den Reisepass gewählt – ebenfalls korrekt.",
    },
    {
      id: "reisepass-rum",
      label: "Rumänischer Reisepass (gültig)",
      status: "optional",
      feedbackSelected: "Korrekt – ein gültiger ausländischer Reisepass ist ein anerkanntes Identifikationsmittel.",
      feedbackNotSelected: "Hinweis: Reisepass wäre ebenfalls gültig. Sie haben den C-Ausweis gewählt – auch korrekt.",
    },
    {
      id: "eigenerklarung-np",
      label: "Eigenerklärung FATCA (natürliche Person)",
      status: "required",
      feedbackSelected: "Korrekt – FATCA gilt unabhängig von Aufenthaltsstatus und Nationalität.",
      feedbackNotSelected: "Fehler: FATCA-Abklärung ist bei jeder Kontoeröffnung Pflicht – auch für C-Ausweis-Inhaberinnen.",
    },
    {
      id: "formular-a",
      label: "Formular A (wirtschaftlich Berechtigter, VSB 20)",
      status: "required",
      feedbackSelected: "Korrekt – Formular A ist unabhängig von der Aufenthaltsbewilligung zwingend.",
      feedbackNotSelected: "Fehler: Formular A (VSB 20) ist bei jeder Kontoeröffnung obligatorisch.",
    },
    {
      id: "wohnsitzbestatigung",
      label: "Wohnsitzbestätigung / Meldebestätigung",
      status: "required",
      feedbackSelected: "Korrekt – Wohnsitznachweis ist auch für C-Ausweis-Inhaberinnen erforderlich.",
      feedbackNotSelected: "Fehler: Wohnsitznachweis nicht vergessen – auch der C-Ausweis ersetzt diesen nicht vollständig.",
    },
    {
      id: "vereinfachter-prozess",
      label: "Vereinfachten Prozess anwenden (wie bei Schweizer Staatsbürger)",
      status: "forbidden",
      feedbackSelected: "Fehler: Die Niederlassungsbewilligung C verleiht keinen vereinfachten Bankprozess. Der Ablauf ist identisch mit einer Aufenthaltsbewilligung B.",
      feedbackNotSelected: "Korrekt – es gibt keinen Sonderstatus oder vereinfachten Prozess für C-Ausweis-Inhaber.",
    },
    {
      id: "ausweis-ch",
      label: "Schweizer Ausweis / Pass anfordern",
      status: "forbidden",
      feedbackSelected: "Fehler: Frau Popescu ist rumänische Staatsbürgerin und hat keinen Schweizer Ausweis.",
      feedbackNotSelected: "Korrekt – Frau Popescu ist nicht eingebürgert.",
    },
    {
      id: "herkunft-vermoegen",
      label: "Herkunftsnachweis Vermögen (EDD)",
      status: "forbidden",
      feedbackSelected: "Fehler: Keine Risikomerkmale erkennbar – normaler Standardfall ohne erhöhtes Risiko.",
      feedbackNotSelected: "Korrekt – kein EDD erforderlich.",
    },
    {
      id: "pep-formular",
      label: "PEP-Prüfungsformular",
      status: "forbidden",
      feedbackSelected: "Fehler: Kein Hinweis auf politisch exponierte Stellung.",
      feedbackNotSelected: "Korrekt – kein PEP-Status erkennbar.",
    },
  ],
  requiredOneOf: [["ausweis-c", "reisepass-rum"]],
  generalFeedback:
    "Der C-Ausweis (Niederlassungsbewilligung) ist ein anerkanntes Identifikationsdokument – gleichwertig mit einem ausländischen Reisepass. Trotzdem gilt: Der Kontoeröffnungsprozess ist identisch mit dem für B-Ausweis-Inhaber. Kein vereinfachter Prozess, kein Sonderstatus gegenüber Schweizern. Pflichtdokumente: Basisvertrag, Identifikation (C-Ausweis oder Reisepass), Eigenerklärung FATCA (natürliche Person), Formular A, Wohnsitznachweis.",
};

const L2_BEISTANDSCHAFT: DocumentCase = {
  id: "l2-beistandschaft",
  type: "document-select",
  level: 2,
  title: "Kunde unter Beistandschaft (ZGB Art. 393)",
  briefing:
    "Herr Zimmermann (67) kommt mit Frau Huber in die Filiale. Frau Huber stellt sich als seine Beiständin vor und legt eine Beistandsurkunde vor – Herr Zimmermann steht unter Begleit-Beistandschaft gemäss Art. 393 ZGB (die leichteste Form) aufgrund beginnender Vergesslichkeit. Er möchte selbst ein einfaches Privatkonto eröffnen. Er ist kommunikationsfähig, orientiert und möchte selbst unterschreiben.",
  documents: [
    {
      id: "basisvertrag",
      label: "Basisvertrag",
      status: "required",
      feedbackSelected: "Korrekt – Grunddokument jeder Kontoeröffnung.",
      feedbackNotSelected: "Fehler: Basisvertrag ist immer erforderlich.",
    },
    {
      id: "ausweis-zimmermann",
      label: "Ausweis / Pass von Herrn Zimmermann",
      status: "required",
      feedbackSelected: "Korrekt – die Identifikation des Kontoinhabers ist zwingend.",
      feedbackNotSelected: "Fehler: Herr Zimmermann muss identifiziert werden.",
    },
    {
      id: "beistandsurkunde",
      label: "Beistandsurkunde einsehen und Art der Beistandschaft prüfen",
      status: "required",
      feedbackSelected: "Korrekt – die Beistandsurkunde zeigt die Art der Beistandschaft und bestimmt, ob der Kunde selbst handlungsfähig ist. Ohne diese Prüfung weiss die Bank nicht, wie weit die Handlungsfähigkeit eingeschränkt ist.",
      feedbackNotSelected: "Fehler: Die Beistandsurkunde muss zwingend eingesehen werden – sie definiert den rechtlichen Handlungsrahmen des Kunden.",
    },
    {
      id: "eigenerklarung-np",
      label: "Eigenerklärung FATCA (natürliche Person) – von Herrn Zimmermann unterzeichnet",
      status: "required",
      feedbackSelected: "Korrekt – bei Begleit-Beistandschaft ist Herr Zimmermann voll handlungsfähig und unterzeichnet selbst.",
      feedbackNotSelected: "Fehler: FATCA-Abklärung ist Pflicht. Bei Begleit-Beistandschaft unterzeichnet der Kunde selbst.",
    },
    {
      id: "formular-a",
      label: "Formular A (wirtschaftlich Berechtigter, VSB 20)",
      status: "required",
      feedbackSelected: "Korrekt – Formular A ist auch hier zwingend.",
      feedbackNotSelected: "Fehler: Formular A (VSB 20) ist obligatorisch.",
    },
    {
      id: "beistaendin-mitunterschreibt",
      label: "Beiständin muss alle Dokumente mitunterzeichnen",
      status: "forbidden",
      feedbackSelected: "Fehler: Bei Begleit-Beistandschaft (Art. 393 ZGB) bleibt der Kunde voll handlungsfähig – die Beiständin unterstützt nur beratend, ein Co-Unterzeichnungsrecht besteht nicht.",
      feedbackNotSelected: "Korrekt – Mitunterzeichnung der Beiständin ist bei Art. 393 ZGB nicht erforderlich.",
    },
    {
      id: "konto-ablehnen-beistandschaft",
      label: "Kontoeröffnung ablehnen wegen Beistandschaft",
      status: "forbidden",
      feedbackSelected: "Fehler: Eine Beistandschaft alleine ist kein Ablehnungsgrund. Bei Begleit-Beistandschaft ist der Kunde handlungsfähig. Ablehnung wäre Diskriminierung einer schutzbedürftigen Person.",
      feedbackNotSelected: "Korrekt – Ablehnung wäre diskriminierend und rechtlich falsch.",
    },
    {
      id: "ausweis-beistaendin",
      label: "Ausweis der Beiständin Frau Huber aufnehmen",
      status: "forbidden",
      feedbackSelected: "Fehler: Die Beiständin ist weder Kontoinhaberin noch wirtschaftlich Berechtigte – ihre Identifikation ist hier nicht erforderlich.",
      feedbackNotSelected: "Korrekt – Frau Huber ist Begleitperson, nicht Vertragspartei.",
    },
    {
      id: "beistaendin-als-inhaberin",
      label: "Beiständin als Kontoinhaberin erfassen",
      status: "forbidden",
      feedbackSelected: "Schwerer Fehler: Das Konto gehört Herrn Zimmermann, nicht der Beiständin. Falsche Erfassung der Vertragspartei.",
      feedbackNotSelected: "Korrekt – Herr Zimmermann ist der Kontoinhaber.",
    },
  ],
  generalFeedback:
    "Beistandschaft nach ZGB kennt verschiedene Stufen: Begleit-Beistandschaft (Art. 393) lässt den Kunden voll handlungsfähig – die Beiständin unterstützt, hat aber kein Mitspracherecht bei Vertragsabschlüssen. Vertretungs-Beistandschaft (Art. 394) oder Umfassende Beistandschaft (Art. 398) schränken die Handlungsfähigkeit ein und würden ein anderes Vorgehen erfordern. Deshalb ist das Einsehen der Beistandsurkunde der entscheidende erste Schritt.",
};

const L2_KLEINKIND_SORGE: DocumentCase = {
  id: "l2-kleinkind-elterliche-sorge",
  type: "document-select",
  level: 2,
  title: "Sparkonto für Kleinkind – ungeklärte elterliche Sorge",
  briefing:
    "Herr Krause möchte für seine 3-jährige Tochter Mia ein Sparkonto eröffnen. Er ist mit der Kindsmutter nicht verheiratet und lebt von ihr getrennt. Auf die Frage nach dem Sorgerecht antwortet er: 'Das ist irgendwie gemeinsam geregelt, glaube ich – die Mutter weiss davon.' Die Kindsmutter ist nicht anwesend.",
  documents: [
    {
      id: "basisvertrag",
      label: "Basisvertrag",
      status: "required",
      feedbackSelected: "Korrekt – der Basisvertrag regelt die Geschäftsbeziehung und ist bei jeder Kontoeröffnung zwingend.",
      feedbackNotSelected: "Fehler: Der Basisvertrag ist das Grunddokument jeder Kontoeröffnung und darf nicht fehlen.",
    },
    {
      id: "ausweis-mia",
      label: "Ausweis / Pass von Mia (Kind)",
      status: "required",
      feedbackSelected: "Korrekt – auch für Kleinkinder muss ein amtliches Ausweisdokument zur Identifikation vorliegen.",
      feedbackNotSelected: "Fehler: Auch ein Kleinkind benötigt ein gültiges Identifikationsdokument.",
    },
    {
      id: "ausweis-krause",
      label: "Ausweis / Pass von Herrn Krause",
      status: "required",
      feedbackSelected: "Korrekt – die Identität des handelnden gesetzlichen Vertreters muss geprüft werden.",
      feedbackNotSelected: "Fehler: Herr Krause muss als handelnder Vertreter identifiziert werden.",
    },
    {
      id: "nachweis-elterliche-sorge",
      label: "Schriftlicher Nachweis der elterlichen Sorge (Auszug Zivilstandsregister / Sorgerechtsbescheinigung)",
      status: "required",
      feedbackSelected:
        "Korrekt – da Herr Krause unverheiratet ist und sich beim Sorgerecht selbst unsicher zeigt, muss die Bank die elterliche Sorge amtlich belegen lassen, bevor sie ihn als Vertreter des Kindes akzeptiert.",
      feedbackNotSelected:
        "Schwerer Fehler: Eine unsichere mündliche Aussage zum Sorgerecht reicht nicht – die Bank muss die Vertretungsbefugnis amtlich prüfen.",
    },
    {
      id: "zustimmung-kindsmutter",
      label: "Schriftliche Zustimmung der Kindsmutter (bei gemeinsamer elterlicher Sorge)",
      status: "required",
      feedbackSelected:
        "Korrekt – besteht gemeinsame elterliche Sorge, muss die nicht anwesende Kindsmutter der Kontoeröffnung schriftlich zustimmen.",
      feedbackNotSelected:
        "Fehler: Bei gemeinsamer elterlicher Sorge kann nicht ein Elternteil allein über eine Kontoeröffnung für das Kind entscheiden, ohne dass die Zustimmung des anderen Elternteils dokumentiert ist.",
    },
    {
      id: "eigenerklarung-np",
      label: "Eigenerklärung FATCA (natürliche Person) – für Mia",
      status: "required",
      feedbackSelected: "Korrekt – die FATCA-Abklärung ist bei jeder Kontoeröffnung zwingend, auch bei Kleinkindern.",
      feedbackNotSelected: "Fehler: FATCA-Abklärung nicht vergessen – sie gilt auch für minderjährige Kontoinhaber.",
    },
    {
      id: "formular-a",
      label: "Formular A (wirtschaftlich Berechtigter, VSB 20)",
      status: "required",
      feedbackSelected: "Korrekt – Formular A ist auch bei Konten für Minderjährige zwingend.",
      feedbackNotSelected: "Fehler: Formular A (VSB 20) ist bei jeder Kontoeröffnung obligatorisch.",
    },
    {
      id: "muendliche-zusicherung-reicht",
      label: "Mündliche Zusicherung 'die Mutter weiss davon' akzeptieren und Konto eröffnen",
      status: "forbidden",
      feedbackSelected: "Schwerer Fehler: Eine unbelegte mündliche Aussage ersetzt keinen Nachweis der Vertretungsbefugnis.",
      feedbackNotSelected: "Korrekt – eine solche Aussage reicht nicht aus.",
    },
    {
      id: "unterschrift-mia",
      label: "Unterschrift von Mia auf dem Kontoeröffnungsantrag",
      status: "forbidden",
      feedbackSelected: "Fehler: Ein Kleinkind kann keine rechtsgültige Unterschrift leisten; die gesetzlichen Vertreter unterzeichnen.",
      feedbackNotSelected: "Korrekt – Mia unterschreibt nicht selbst.",
    },
    {
      id: "vollmacht",
      label: "Vollmacht",
      status: "forbidden",
      feedbackSelected: "Fehler: Mia ist minderjährig und kann keine Vollmacht erteilen – die gesetzliche Vertretung ergibt sich aus der elterlichen Sorge.",
      feedbackNotSelected: "Korrekt – keine Vollmacht relevant in diesem Fall.",
    },
    {
      id: "herkunft-vermoegen",
      label: "Herkunftsnachweis Vermögen",
      status: "forbidden",
      feedbackSelected: "Fehler: Kein Risikomerkmal erkennbar – ein einfaches Sparkonto für ein Kind löst kein EDD aus.",
      feedbackNotSelected: "Korrekt – kein erhöhtes Risiko, kein EDD nötig.",
    },
    {
      id: "pep-formular",
      label: "PEP-Prüfungsformular",
      status: "forbidden",
      feedbackSelected: "Fehler: Kein Hinweis auf politisch exponierte Personen in diesem Fall.",
      feedbackNotSelected: "Korrekt – kein PEP-Status erkennbar.",
    },
  ],
  generalFeedback:
    "Bei unverheirateten oder getrennten Eltern darf die Bank die elterliche Sorge nicht einfach mündlich abfragen, sondern muss sie amtlich belegen lassen (z.B. Auszug Zivilstandsregister). Besteht gemeinsame elterliche Sorge, braucht die Kontoeröffnung für das Kind die dokumentierte Zustimmung beider Elternteile – auch wenn nur einer persönlich erscheint. Die Standarddokumente (Basisvertrag, Ausweis des Kindes, FATCA, Formular A) bleiben zusätzlich zwingend.",
};

const L2_SCHEIDUNG: DocumentCase = {
  id: "l2-scheidung-namensaenderung",
  type: "document-select",
  level: 2,
  title: "Nach der Scheidung – Namensänderung und Kontotrennung",
  briefing:
    "Frau Meier (41, vormals 'Huber-Meier') war bis vor zwei Monaten mit Herrn Huber verheiratet und führte mit ihm ein gemeinsames Privatkonto. Die Scheidung ist rechtskräftig, sie trägt wieder ihren Ledignamen. Sie legt ihren neuen Ausweis mit dem Namen 'Meier' vor und möchte 1) den Namen auf dem bestehenden Konto anpassen lassen sowie 2) ein neues, alleiniges Privatkonto eröffnen.",
  documents: [
    {
      id: "ausweis-neuer-name",
      label: "Aktueller Ausweis mit neuem Namen 'Meier'",
      status: "required",
      feedbackSelected: "Korrekt – die Identifikation erfolgt anhand des aktuell gültigen Ausweises.",
      feedbackNotSelected: "Fehler: Ohne aktuellen Ausweis kann weder die Identität noch die Namensänderung geprüft werden.",
    },
    {
      id: "scheidungsurkunde",
      label: "Rechtskräftiges Scheidungsurteil / Scheidungsurkunde",
      status: "required",
      feedbackSelected:
        "Korrekt – die Namensänderung und die veränderte Rechtslage müssen mit dem Scheidungsurteil belegt werden.",
      feedbackNotSelected:
        "Fehler: Ohne Scheidungsurkunde kann die Bank die Namensänderung und die veränderte Rechtslage nicht nachvollziehen.",
    },
    {
      id: "basisvertrag",
      label: "Basisvertrag (neues Einzelkonto)",
      status: "required",
      feedbackSelected: "Korrekt – der Basisvertrag ist bei jeder Kontoeröffnung zwingend, auch beim neuen Einzelkonto.",
      feedbackNotSelected: "Fehler: Der Basisvertrag ist das Grunddokument jeder Kontoeröffnung und darf nicht fehlen.",
    },
    {
      id: "formular-a",
      label: "Formular A (wirtschaftlich Berechtigter, VSB 20)",
      status: "required",
      feedbackSelected: "Korrekt – Formular A ist auch beim neuen Einzelkonto zwingend.",
      feedbackNotSelected: "Fehler: Formular A (VSB 20) ist bei jeder Kontoeröffnung obligatorisch.",
    },
    {
      id: "eigenerklarung-np",
      label: "Eigenerklärung FATCA (natürliche Person)",
      status: "required",
      feedbackSelected: "Korrekt – FATCA-Abklärung ist beim neuen Einzelkonto zwingend, unabhängig vom bisherigen Gemeinschaftskonto.",
      feedbackNotSelected: "Fehler: FATCA-Abklärung nicht vergessen – sie gilt für jede Neueröffnung.",
    },
    {
      id: "zeichnungsberechtigung-ex-partner-loeschen",
      label: "Zeichnungsberechtigung von Herrn Huber auf dem bisherigen Gemeinschaftskonto löschen bzw. anpassen",
      status: "required",
      feedbackSelected:
        "Korrekt – nach der Scheidung muss die Zeichnungsberechtigung des Ex-Partners aktiv angepasst werden. Das geschieht nicht automatisch.",
      feedbackNotSelected:
        "Schwerer Fehler: Die Zeichnungsberechtigung des Ex-Partners bleibt ohne aktive Anpassung bestehen – ein häufig übersehenes Risiko.",
    },
    {
      id: "altes-konto-unveraendert",
      label: "Bestehendes Gemeinschaftskonto unverändert weiterlaufen lassen",
      status: "forbidden",
      feedbackSelected: "Schwerer Fehler: Der Ex-Partner bliebe weiterhin zeichnungsberechtigt – ein erhebliches Risiko für Frau Meier.",
      feedbackNotSelected: "Korrekt – das alte Konto darf nicht unverändert bleiben.",
    },
    {
      id: "namensaenderung-ohne-urkunde",
      label: "Namensänderung allein aufgrund mündlicher Aussage vornehmen",
      status: "forbidden",
      feedbackSelected: "Fehler: Eine Namensänderung im Kundenstamm erfordert immer ein amtliches Dokument, keine mündliche Aussage.",
      feedbackNotSelected: "Korrekt – ohne Scheidungsurkunde keine Namensänderung.",
    },
    {
      id: "neues-konto-alter-name",
      label: "Neues Konto unter dem alten Namen 'Huber-Meier' eröffnen",
      status: "forbidden",
      feedbackSelected: "Fehler: Der aktuelle Ausweis lautet auf 'Meier' – das neue Konto muss auf den aktuellen, amtlichen Namen lauten.",
      feedbackNotSelected: "Korrekt – das Konto muss auf den aktuellen Namen lauten.",
    },
    {
      id: "zustimmung-ex-mann-einholen",
      label: "Zustimmung von Herrn Huber für das neue Einzelkonto einholen",
      status: "forbidden",
      feedbackSelected: "Fehler: Für ein neues, alleiniges Konto von Frau Meier ist keine Zustimmung des Ex-Partners nötig.",
      feedbackNotSelected: "Korrekt – Herr Huber hat mit dem neuen Konto nichts zu tun.",
    },
    {
      id: "herkunft-vermoegen",
      label: "Herkunftsnachweis Vermögen",
      status: "forbidden",
      feedbackSelected: "Fehler: Kein Risikomerkmal erkennbar – Namensänderung nach Scheidung löst kein EDD aus.",
      feedbackNotSelected: "Korrekt – kein erhöhtes Risiko, kein EDD nötig.",
    },
    {
      id: "pep-formular",
      label: "PEP-Prüfungsformular",
      status: "forbidden",
      feedbackSelected: "Fehler: Kein Hinweis auf politisch exponierte Personen in diesem Fall.",
      feedbackNotSelected: "Korrekt – kein PEP-Status erkennbar.",
    },
    {
      id: "handelsregister",
      label: "Handelsregisterauszug",
      status: "forbidden",
      feedbackSelected: "Fehler: Handelsregisterauszüge sind nur für Firmenkunden relevant.",
      feedbackNotSelected: "Korrekt – irrelevant bei Privatpersonen.",
    },
  ],
  generalFeedback:
    "Nach einer Scheidung sind zwei getrennte Schritte nötig: 1) Die Namensänderung im Kundenstamm erfolgt nur gestützt auf die Scheidungsurkunde und den neuen Ausweis. 2) Die Zeichnungsberechtigung des Ex-Partners auf dem bisherigen Gemeinschaftskonto muss aktiv gelöscht oder angepasst werden – sie erlischt nicht automatisch mit der Scheidung. Das neue Einzelkonto wird unabhängig vom Ex-Partner eröffnet.",
};

const L2_VERDAECHTIGES_VERHALTEN: DocumentCase = {
  id: "l2-verdaechtiges-verhalten",
  type: "document-select",
  level: 2,
  title: "Widersprüchliche Angaben – auffälliges Kundenverhalten",
  briefing:
    "Herr Roth (44) möchte ein Privatkonto eröffnen und eine Ersteinzahlung von CHF 15'000 per Überweisung aus dem Ausland vornehmen. Auf die Frage nach seiner beruflichen Tätigkeit antwortet er zunächst 'Berater', nennt auf Nachfrage nach der Branche innert weniger Minuten drei unterschiedliche Tätigkeiten. Er wirkt nervös, vermeidet Blickkontakt und drängt darauf, das Gespräch rasch zu beenden.",
  documents: [
    {
      id: "basisvertrag",
      label: "Basisvertrag",
      status: "required",
      feedbackSelected: "Korrekt – der Basisvertrag regelt die Geschäftsbeziehung und ist bei jeder Kontoeröffnung zwingend.",
      feedbackNotSelected: "Fehler: Der Basisvertrag ist das Grunddokument jeder Kontoeröffnung und darf nicht fehlen.",
    },
    {
      id: "ausweis-pruefen",
      label: "Ausweis genau prüfen und Kopie erstellen",
      status: "required",
      feedbackSelected: "Korrekt – besonders bei Auffälligkeiten ist die sorgfältige Identifikation entscheidend.",
      feedbackNotSelected: "Fehler: Identifikation ist Pflicht – gerade bei auffälligem Verhalten.",
    },
    {
      id: "eigenerklarung-np",
      label: "Eigenerklärung FATCA (natürliche Person)",
      status: "required",
      feedbackSelected: "Korrekt – FATCA-Abklärung ist auch in diesem Fall zwingend.",
      feedbackNotSelected: "Fehler: FATCA-Abklärung nicht vergessen.",
    },
    {
      id: "formular-a",
      label: "Formular A (wirtschaftlich Berechtigter, VSB 20)",
      status: "required",
      feedbackSelected: "Korrekt – Formular A ist auch bei Auffälligkeiten zwingend auszufüllen.",
      feedbackNotSelected: "Fehler: Formular A (VSB 20) ist immer erforderlich.",
    },
    {
      id: "plausibilitaet-erwerbstaetigkeit-abklaeren",
      label: "Plausibilität der Erwerbstätigkeit und Mittelherkunft schriftlich abklären (GwG Art. 6)",
      status: "required",
      feedbackSelected:
        "Korrekt – widersprüchliche Angaben zur Tätigkeit sind ein Risikomerkmal und lösen die Abklärungspflicht nach GwG Art. 6 aus, unabhängig von der Höhe der Einzahlung.",
      feedbackNotSelected:
        "Schwerer Fehler: Widersprüchliche Angaben zur beruflichen Tätigkeit müssen abgeklärt werden – die Abklärungspflicht hängt nicht nur vom Betrag ab.",
    },
    {
      id: "herkunftsnachweis",
      label: "Herkunftsnachweis der Mittel (z.B. Lohnausweis, Vertragsunterlagen) einfordern",
      status: "required",
      feedbackSelected:
        "Korrekt – bei unplausiblen Angaben zur Tätigkeit ist ein Beleg der Mittelherkunft angezeigt, auch bei moderaten Beträgen.",
      feedbackNotSelected: "Fehler: Die widersprüchlichen Angaben sind ein konkretes Risikomerkmal, das einen Herkunftsnachweis erfordert.",
    },
    {
      id: "edd-formular",
      label: "Enhanced Due Diligence (EDD) Formular ausfüllen",
      status: "required",
      feedbackSelected: "Korrekt – widersprüchliches Verhalten und unplausible Angaben lösen verstärkte Sorgfaltspflichten (EDD) aus.",
      feedbackNotSelected: "Fehler: Bei konkreten Risikomerkmalen wie widersprüchlichen Angaben ist EDD zwingend.",
    },
    {
      id: "vorgesetzte-informieren",
      label: "Vorgesetzte/n und Compliance informieren",
      status: "required",
      feedbackSelected: "Korrekt – bei Verdachtsmomenten muss intern eskaliert werden.",
      feedbackNotSelected: "Fehler: Interne Eskalation bei Auffälligkeiten ist zwingend – Sie dürfen nicht alleine entscheiden.",
    },
    {
      id: "dokumentation",
      label: "Beobachtungen und Abklärungsresultat intern dokumentieren",
      status: "required",
      feedbackSelected: "Korrekt – lückenlose Dokumentation ist ein zentrales GwG-Element.",
      feedbackNotSelected: "Fehler: Dokumentation ist Pflicht und schützt die Bank.",
    },
    {
      id: "konto-sofort-eroeffnen",
      label: "Konto ohne weitere Abklärung sofort eröffnen",
      status: "forbidden",
      feedbackSelected: "Schwerer Fehler: Konto ohne Abklärung zu eröffnen verstösst gegen GwG Art. 6.",
      feedbackNotSelected: "Korrekt – zuerst abklären, dann entscheiden.",
    },
    {
      id: "verhalten-ignorieren",
      label: "Nervosität und widersprüchliche Angaben als unbedeutend abtun",
      status: "forbidden",
      feedbackSelected: "Fehler: Verhaltensauffälligkeiten und widersprüchliche Angaben sind relevante Risikoindikatoren und dürfen nicht ignoriert werden.",
      feedbackNotSelected: "Korrekt – solche Signale dürfen nicht ignoriert werden.",
    },
    {
      id: "sofort-ablehnen",
      label: "Konto sofort und pauschal ablehnen ohne Prüfung",
      status: "forbidden",
      feedbackSelected: "Fehler: Pauschalablehnung ist nicht korrekt. Erst vollständig prüfen, dann entscheiden.",
      feedbackNotSelected: "Korrekt – Ablehnung ohne Prüfung ist nicht die richtige Reaktion.",
    },
    {
      id: "sofort-polizei",
      label: "Sofort die Polizei rufen",
      status: "forbidden",
      feedbackSelected: "Fehler: Nicht die richtige Reihenfolge. Zuerst intern eskalieren, Compliance informieren. Ggf. MROS-Meldung via Compliance – nicht direkt Polizei.",
      feedbackNotSelected: "Korrekt – direkte Polizei ist nicht der korrekte Weg.",
    },
    {
      id: "pep-formular",
      label: "PEP-Prüfungsformular",
      status: "forbidden",
      feedbackSelected: "Fehler: Kein Hinweis auf politisch exponierte Stellung in diesem Fall.",
      feedbackNotSelected: "Korrekt – kein PEP-Status erkennbar.",
    },
  ],
  generalFeedback:
    "Auch ohne grosse Bareinlage lösen widersprüchliche Angaben zur Erwerbstätigkeit und auffälliges Verhalten (Nervosität, Vermeiden von Blickkontakt, Drängen auf rasches Gesprächsende) die Abklärungspflicht nach GwG Art. 6 aus. Massgebend ist die Plausibilität der Angaben, nicht allein die Höhe des Betrags. Vorgehen: abklären, dokumentieren, Vorgesetzte/Compliance einbeziehen – keine Pauschalablehnung und keine sofortige Kontoeröffnung ohne Prüfung.",
};

// ─────────────────────────────────────────────────────────
// LEVEL 3 – zusätzliche LAP-Fälle
// ─────────────────────────────────────────────────────────

const L3_US_STAATSBUERGER_MCQ: McqCase = {
  id: "l3-us-staatsbuerger-mcq",
  type: "multiple-choice",
  level: 3,
  title: "LAP-Trickfall: Doppelstaatsbürger CH / USA",
  briefing:
    "Herr Thompson (42) möchte ein Privatkonto eröffnen. Er legt sowohl seinen Schweizer als auch seinen amerikanischen Pass vor. Auf die FATCA-Frage antwortet er: 'Ich wohne und zahle meine Steuern ausschliesslich in der Schweiz. Ich bin doch Schweizer – das FATCA-Thema betrifft mich nicht.'",
  question: "Was ist aus FATCA-Sicht korrekt?",
  options: [
    {
      key: "A",
      text: "Herr Thompson hat recht: Da er in der Schweiz steuerpflichtig ist und keinen Wohnsitz in den USA hat, ist er keine US Person im Sinne von FATCA.",
    },
    {
      key: "B",
      text: "Er erhält die Standard-FATCA-Eigenerklärung für natürliche Personen – wie jeder andere Schweizer Kunde.",
    },
    {
      key: "C",
      text: "Herr Thompson ist eine US Person (US Citizen) gemäss FATCA. Die Bank muss seine US Tax Identification Number (TIN) erfassen und das Konto dem IRS melden – unabhängig von Wohnort oder Steuerpflicht in der Schweiz.",
    },
    {
      key: "D",
      text: "FATCA gilt nur für Greencard-Inhaber (Resident Aliens), nicht für US-Staatsbürger mit zusätzlichem Schweizer Pass.",
    },
  ],
  correct: "C",
  feedback:
    "FATCA (Foreign Account Tax Compliance Act) definiert 'US Persons' nach Staatsbürgerschaft – nicht nach Wohnort oder Steuerpflicht. Jeder US-Staatsbürger ist weltweit eine US Person. Die Schweizer Bank muss das Konto dem IRS melden, und Herr Thompson muss seine US-TIN angeben. Die Standard-FATCA-Eigenerklärung reicht nicht – für US Citizens gilt ein separater Prozess.",
  feedbackPerOption: {
    A: "Falsch – FATCA richtet sich nach der Staatsbürgerschaft, nicht nach Wohnsitz oder Steuerpflicht. Ein US-Bürger bleibt US Person, egal wo er lebt.",
    B: "Falsch – die Standard-Eigenerklärung für natürliche Personen genügt bei einer US Person nicht. Eine US Person muss als solche deklariert werden (US-TIN erforderlich, Meldepflicht an IRS).",
    C: "Korrekt – US Citizenship = US Person = volle FATCA-Meldepflicht, unabhängig vom Schweizer Pass.",
    D: "Falsch – US Persons umfassen: US-Staatsbürger (Citizenship, unabhängig vom Wohnort), Greencard-Inhaber (Resident Aliens) und Personen, die den Substantial Presence Test erfüllen.",
  },
};

const L3_SELBSTAENDIGER: DocumentCase = {
  id: "l3-selbstaendiger-privatkonto",
  type: "document-select",
  level: 3,
  title: "Selbständigerwerbender – Privatkonto eröffnen",
  briefing:
    "Herr Bauer (38) ist IT-Freelancer (Einzelunternehmer, kein HR-Eintrag). Er möchte ein Privatkonto für persönliche Ausgaben eröffnen – Miete, Einkauf, Freizeit. Er hat bereits ein Geschäftskonto bei einer anderen Bank. Er ist Schweizer Staatsbürger, legt seinen CH-Pass vor. Einkommen ist plausibel und stabil. Keine besonderen Risikomerkmale.",
  documents: [
    {
      id: "basisvertrag",
      label: "Basisvertrag",
      status: "required",
      feedbackSelected: "Korrekt – Grunddokument jeder Kontoeröffnung.",
      feedbackNotSelected: "Fehler: Basisvertrag ist immer erforderlich.",
    },
    {
      id: "ausweis-ch",
      label: "Gültiger CH-Ausweis / Reisepass",
      status: "required",
      feedbackSelected: "Korrekt – Identifikation ist Pflicht.",
      feedbackNotSelected: "Fehler: Identifikation des Kontoinhabers ist zwingend.",
    },
    {
      id: "eigenerklarung-np",
      label: "Eigenerklärung FATCA (natürliche Person)",
      status: "required",
      feedbackSelected: "Korrekt – Herr Bauer ist als Einzelunternehmer eine natürliche Person. Die Eigenerklärung für natürliche Personen ist korrekt.",
      feedbackNotSelected: "Fehler: FATCA-Abklärung ist Pflicht – auch für Selbständige als natürliche Personen.",
    },
    {
      id: "formular-a",
      label: "Formular A (wirtschaftlich Berechtigter, VSB 20)",
      status: "required",
      feedbackSelected: "Korrekt – Formular A ist auch beim Selbständigen zwingend.",
      feedbackNotSelected: "Fehler: Formular A (VSB 20) ist bei jeder Kontoeröffnung obligatorisch.",
    },
    {
      id: "eigenerklarung-jur-fatca",
      label: "Eigenerklärung FATCA (juristische Person)",
      status: "forbidden",
      feedbackSelected: "Schwerer Fehler: Herr Bauer ist Einzelunternehmer = natürliche Person. Die FATCA-Erklärung für juristische Personen gilt nur für GmbH, AG, Genossenschaften etc. – nicht für Einzelunternehmer.",
      feedbackNotSelected: "Korrekt – Einzelunternehmer sind natürliche Personen, die Erklärung für juristische Personen ist falsch.",
    },
    {
      id: "hr-auszug",
      label: "Handelsregisterauszug",
      status: "forbidden",
      feedbackSelected: "Fehler: Für ein Privatkonto ist kein HR-Auszug nötig. Ausserdem sind Einzelunternehmen mit unter CHF 100'000 Jahresumsatz nicht eintragspflichtig.",
      feedbackNotSelected: "Korrekt – kein HR-Auszug für ein Privatkonto erforderlich.",
    },
    {
      id: "jahresabschluss",
      label: "Jahresabschluss / Buchhaltungsabschluss verlangen",
      status: "forbidden",
      feedbackSelected: "Fehler: Für ein Privatkonto ohne Kreditantrag ist kein Jahresabschluss erforderlich – auch nicht bei Selbständigen.",
      feedbackNotSelected: "Korrekt – kein Jahresabschluss für ein einfaches Privatkonto nötig.",
    },
    {
      id: "herkunft-vermoegen",
      label: "Herkunftsnachweis Vermögen (EDD)",
      status: "forbidden",
      feedbackSelected: "Fehler: Keine Risikomerkmale erkennbar – normaler IT-Freelancer ohne auffällige Einlagen. Kein EDD erforderlich.",
      feedbackNotSelected: "Korrekt – kein erhöhtes Risiko, kein EDD.",
    },
  ],
  generalFeedback:
    "Der zentrale LAP-Lernpunkt: Ein Einzelunternehmer (Selbständigerwerbender) ist immer eine natürliche Person – steuerlich und im Sinne des GwG. Für sein Privatkonto gelten exakt die gleichen Regeln wie für jeden anderen Schweizer Privatkunden. Kein HR-Auszug, kein Jahresabschluss, und vor allem: FATCA-Eigenerklärung für 'natürliche Person' – nicht für 'juristische Person'. Das ist der klassische LAP-Trickfehler.",
};

const L3_WIRTSCHAFTLICH_BERECHTIGTER_DRITTER: McqCase = {
  id: "l3-wirtschaftlich-berechtigter-dritter",
  type: "multiple-choice",
  level: 3,
  title: "LAP-Fall: Wirtschaftlich Berechtigter ist Dritte Person",
  briefing:
    "Herr Meier möchte ein Privatkonto eröffnen. Auf die Standardfrage 'Handeln Sie auf eigene Rechnung?' antwortet er: 'Nein – das Konto ist für meinen Bruder Bruno. Bruno lebt in Dubai und kann nicht persönlich kommen. Ich verwalte das Konto für ihn.'",
  question: "Was ist das korrekte Vorgehen gemäss VSB 20 / GwG?",
  options: [
    {
      key: "A",
      text: "Herr Meier unterschreibt alles als Kontoinhaber – Formular A wird auf seinen Namen ausgestellt. Bruno muss nicht erfasst werden.",
    },
    {
      key: "B",
      text: "Das Konto kann nicht eröffnet werden: Bruno muss persönlich erscheinen und sich identifizieren.",
    },
    {
      key: "C",
      text: "Herr Meier eröffnet das Konto als Vertragspartner, aber die Bank erfasst Bruno via Formular A als wirtschaftlich Berechtigten (Name, Geburtsdatum, Nationalität, Wohnadresse). Da Bruno in Dubai lebt, ist erhöhte Sorgfalt geboten.",
    },
    {
      key: "D",
      text: "Das Konto wird direkt auf Bruno eröffnet – Herr Meier erhält eine Vollmacht.",
    },
  ],
  correct: "C",
  feedback:
    "VSB 20 Art. 4: Erklärt der Vertragspartner, nicht auf eigene Rechnung zu handeln, muss die Bank den wirtschaftlich Berechtigten via Formular A erfassen. Bruno muss nicht persönlich erscheinen, wird aber vollständig dokumentiert. Dubai / UAE gilt als risikoreicher Finanzplatz – zusätzliche Sorgfaltsprüfung nach GwG Art. 6 ist angebracht.",
  feedbackPerOption: {
    A: "Falsch – wenn der Vertragspartner erklärt, für einen Dritten zu handeln, darf Formular A nicht auf den Vertragspartner ausgestellt werden. Das wäre eine falsche Deklaration des wirtschaftlich Berechtigten.",
    B: "Falsch – der wirtschaftlich Berechtigte muss nicht persönlich erscheinen. Seine Angaben werden durch den Vertragspartner via Formular A deklariert und von der Bank dokumentiert.",
    C: "Korrekt – Herr Meier ist Vertragspartner (Kontoinhaber), Bruno ist der wirtschaftlich Berechtigte gemäss Formular A. Die UAE-Adresse erhöht das Risikoprofil und erfordert zusätzliche Abklärung.",
    D: "Falsch – das Konto wird auf den Vertragspartner (Herrn Meier) eröffnet, nicht auf den wirtschaftlich Berechtigten. Bruno kann separat eine Vollmacht erhalten, ist aber nicht Kontoinhaber.",
  },
};

const L3_DOPPELBUERGER_FATCA: DocumentCase = {
  id: "l3-doppelbuerger-fatca",
  type: "document-select",
  level: 3,
  title: "Doppelbürgerin CH/USA – FATCA-Zusatzdokumentation",
  briefing:
    "Frau Wagner (29) möchte ein Privatkonto eröffnen. Sie legt ihren Schweizer Pass vor. Bei der FATCA-Abklärung gibt sie offen an, in Boston (USA) geboren zu sein und als Kind mit den Eltern in die Schweiz gezogen zu sein. Sie besitzt weiterhin die US-Staatsbürgerschaft, lebt aber seit über 25 Jahren ausschliesslich in der Schweiz.",
  documents: [
    {
      id: "basisvertrag",
      label: "Basisvertrag",
      status: "required",
      feedbackSelected: "Korrekt – der Basisvertrag regelt die Geschäftsbeziehung und ist bei jeder Kontoeröffnung zwingend.",
      feedbackNotSelected: "Fehler: Der Basisvertrag ist das Grunddokument jeder Kontoeröffnung und darf nicht fehlen.",
    },
    {
      id: "ausweis-ch",
      label: "Gültiger CH-Ausweis / Reisepass",
      status: "required",
      feedbackSelected: "Korrekt – primäres Identifikationsdokument gemäss GwG.",
      feedbackNotSelected: "Fehler: Identifikation mit gültigem Ausweis ist zwingend erforderlich.",
    },
    {
      id: "eigenerklarung-np",
      label: "Eigenerklärung FATCA (natürliche Person)",
      status: "required",
      feedbackSelected:
        "Korrekt – die FATCA-Grunderklärung ist immer der erste Schritt; sie deckt hier auf, dass Frau Wagner als in den USA Geborene eine US-Person ist.",
      feedbackNotSelected: "Fehler: Ohne die FATCA-Grunderklärung wird die US-Personen-Eigenschaft gar nicht erst erkannt.",
    },
    {
      id: "formular-a",
      label: "Formular A (wirtschaftlich Berechtigter, VSB 20)",
      status: "required",
      feedbackSelected: "Korrekt – Formular A ist unabhängig vom FATCA-Status bei jeder Kontoeröffnung zwingend.",
      feedbackNotSelected: "Fehler: Formular A (VSB 20) ist bei jeder Kontoeröffnung obligatorisch.",
    },
    {
      id: "w9-formular",
      label: "W-9 Formular / US-Steueridentifikationsnummer (TIN) erfassen",
      status: "required",
      feedbackSelected:
        "Korrekt – als US-Person (Geburtsort USA) muss Frau Wagner unabhängig von ihrem Wohnsitz ihre US-TIN angeben; das W-9 Formular dokumentiert dies.",
      feedbackNotSelected: "Schwerer Fehler: US-Staatsbürgerschaft löst unabhängig vom Wohnsitz die Pflicht zur Erfassung der US-TIN aus.",
    },
    {
      id: "us-person-kennzeichnung",
      label: "Konto intern als US-Person kennzeichnen (FATCA-Reporting an IRS vorbereiten)",
      status: "required",
      feedbackSelected: "Korrekt – US-Personen-Konten müssen dem IRS gemeldet werden (FATCA-Reportingpflicht der Schweizer Bank).",
      feedbackNotSelected: "Fehler: Ohne interne Kennzeichnung als US-Person wird die jährliche IRS-Meldepflicht verletzt.",
    },
    {
      id: "geburtsort-ignorieren",
      label: "Geburtsort USA im System nicht vermerken, da Kundin nur den Schweizer Pass vorlegt",
      status: "forbidden",
      feedbackSelected:
        "Schwerer FATCA-Verstoss: Der Geburtsort in den USA macht Frau Wagner unabhängig vom vorgelegten Pass zu einer US-Person – dies zu verschweigen verletzt die FATCA-Sorgfaltspflicht der Bank.",
      feedbackNotSelected: "Korrekt – der Geburtsort muss immer erfasst und ausgewertet werden.",
    },
    {
      id: "konto-ablehnen-us-person",
      label: "Kontoeröffnung ablehnen, weil Kundin US-Staatsbürgerin ist",
      status: "forbidden",
      feedbackSelected:
        "Fehler: Eine US-Staatsbürgerschaft ist kein automatischer Ablehnungsgrund. Korrekt ist die vollständige FATCA-Dokumentation, nicht die pauschale Ablehnung.",
      feedbackNotSelected: "Korrekt – keine pauschale Ablehnung, sondern korrekte Dokumentation.",
    },
    {
      id: "eigenerklarung-jur-fatca",
      label: "Eigenerklärung FATCA (juristische Person)",
      status: "forbidden",
      feedbackSelected: "Fehler: Frau Wagner ist eine natürliche Person – die Erklärung für juristische Personen ist hier falsch.",
      feedbackNotSelected: "Korrekt nicht ausgewählt – nicht zutreffend bei einer natürlichen Person.",
    },
    {
      id: "handelsregister",
      label: "Handelsregisterauszug",
      status: "forbidden",
      feedbackSelected: "Fehler: Handelsregisterauszüge sind nur für Firmenkunden relevant.",
      feedbackNotSelected: "Korrekt – irrelevant bei Privatpersonen.",
    },
    {
      id: "jahresabschluss",
      label: "Jahresabschluss / Bilanz",
      status: "forbidden",
      feedbackSelected: "Fehler: Nur für Geschäfts- und Firmenkonten zutreffend.",
      feedbackNotSelected: "Korrekt – nicht zutreffend bei Privatkonto.",
    },
    {
      id: "pep-formular",
      label: "PEP-Prüfungsformular",
      status: "forbidden",
      feedbackSelected: "Fehler: Kein Hinweis auf politisch exponierte Stellung.",
      feedbackNotSelected: "Korrekt – kein PEP-Status erkennbar.",
    },
    {
      id: "herkunft-vermoegen",
      label: "Herkunftsnachweis Vermögen",
      status: "forbidden",
      feedbackSelected: "Fehler: Kein erhöhtes GwG-Risiko erkennbar – die FATCA-Pflicht ist unabhängig von einem Vermögensrisiko.",
      feedbackNotSelected: "Korrekt – Standardfall ohne GwG-Risikomerkmale, kein EDD nötig.",
    },
  ],
  generalFeedback:
    "FATCA definiert 'US Person' über die Staatsbürgerschaft bzw. den Geburtsort, nicht über den Wohnsitz. Auch wer seit Jahrzehnten ausschliesslich in der Schweiz lebt und nur den Schweizer Pass vorlegt, bleibt als in den USA geborene Person FATCA-pflichtig: W-9-Formular mit US-TIN und interne Kennzeichnung fürs IRS-Reporting sind zwingend zusätzlich zur Standard-Eigenerklärung. Eine pauschale Ablehnung ist nicht der korrekte Weg.",
};

const L3_VORSORGEAUFTRAG: DocumentCase = {
  id: "l3-vorsorgeauftrag",
  type: "document-select",
  level: 3,
  title: "Vorsorgeauftrag – Handeln für eine urteilsunfähige Person",
  briefing:
    "Frau Bucher legt einen Vorsorgeauftrag vor, mit dem sie von ihrem Onkel, Herrn Wyss (79), als Vorsorgebeauftragte eingesetzt wurde. Herr Wyss ist seit einem Schlaganfall vor vier Monaten urteilsunfähig. Frau Bucher legt zudem eine Bestätigung der Kindes- und Erwachsenenschutzbehörde (KESB) über die Wirksamkeit des Vorsorgeauftrags vor und möchte für Herrn Wyss ein neues Sparkonto eröffnen.",
  documents: [
    {
      id: "vorsorgeauftrag",
      label: "Vorsorgeauftrag (Original oder beglaubigte Kopie)",
      status: "required",
      feedbackSelected: "Korrekt – der Vorsorgeauftrag regelt, wer im Fall der Urteilsunfähigkeit handeln darf.",
      feedbackNotSelected: "Fehler: Ohne den Vorsorgeauftrag selbst kann der Umfang der Vertretungsbefugnis nicht geprüft werden.",
    },
    {
      id: "kesb-wirksamkeitsbestaetigung",
      label: "Bestätigung der KESB über die Wirksamkeit des Vorsorgeauftrags",
      status: "required",
      feedbackSelected:
        "Korrekt – ein Vorsorgeauftrag entfaltet erst mit der Wirksamkeitsbestätigung der KESB rechtliche Wirkung (Art. 360 ff. ZGB). Ohne diese Bestätigung darf die Bank Frau Bucher nicht als Vertreterin anerkennen.",
      feedbackNotSelected:
        "Schwerer Fehler: Der Vorsorgeauftrag allein genügt nicht – die KESB muss seine Wirksamkeit förmlich bestätigen, bevor die Bank ihn anerkennen darf.",
    },
    {
      id: "ausweis-bucher",
      label: "Ausweis / Pass von Frau Bucher (Vorsorgebeauftragte)",
      status: "required",
      feedbackSelected: "Korrekt – die Identität der handelnden Vorsorgebeauftragten muss geprüft werden.",
      feedbackNotSelected: "Fehler: Frau Bucher muss als handelnde Vertreterin identifiziert werden.",
    },
    {
      id: "ausweis-wyss",
      label: "Ausweis / Pass von Herrn Wyss (Kontoinhaber)",
      status: "required",
      feedbackSelected: "Korrekt – Herr Wyss bleibt Kontoinhaber und muss identifiziert werden, auch wenn er selbst nicht handeln kann.",
      feedbackNotSelected: "Fehler: Auch bei Vertretung muss der Kontoinhaber selbst identifiziert werden.",
    },
    {
      id: "basisvertrag",
      label: "Basisvertrag (unterzeichnet durch Frau Bucher als Vorsorgebeauftragte)",
      status: "required",
      feedbackSelected: "Korrekt – der Basisvertrag ist bei jeder Kontoeröffnung zwingend.",
      feedbackNotSelected: "Fehler: Der Basisvertrag ist das Grunddokument jeder Kontoeröffnung und darf nicht fehlen.",
    },
    {
      id: "formular-a",
      label: "Formular A (wirtschaftlich Berechtigter, VSB 20)",
      status: "required",
      feedbackSelected: "Korrekt – Formular A ist auch bei Vertretung durch eine Vorsorgebeauftragte zwingend.",
      feedbackNotSelected: "Fehler: Formular A (VSB 20) ist bei jeder Kontoeröffnung obligatorisch.",
    },
    {
      id: "eigenerklarung-np",
      label: "Eigenerklärung FATCA (natürliche Person) – für Herrn Wyss, unterzeichnet durch die Vorsorgebeauftragte",
      status: "required",
      feedbackSelected: "Korrekt – FATCA-Abklärung ist zwingend; die Vorsorgebeauftragte unterzeichnet an Stelle von Herrn Wyss.",
      feedbackNotSelected: "Fehler: FATCA-Abklärung nicht vergessen – sie gilt auch bei Vertretung.",
    },
    {
      id: "konto-ohne-kesb-bestaetigung",
      label: "Konto allein gestützt auf den Vorsorgeauftrag eröffnen, ohne KESB-Bestätigung",
      status: "forbidden",
      feedbackSelected:
        "Schwerer Fehler: Ohne die förmliche Wirksamkeitsbestätigung der KESB ist der Vorsorgeauftrag noch nicht rechtswirksam.",
      feedbackNotSelected: "Korrekt – ohne KESB-Bestätigung darf das Konto nicht eröffnet werden.",
    },
    {
      id: "wyss-muss-unterschreiben",
      label: "Herr Wyss muss die Kontoeröffnung persönlich mitunterzeichnen",
      status: "forbidden",
      feedbackSelected:
        "Fehler: Herr Wyss ist urteilsunfähig und kann keine rechtsgültige Unterschrift mehr leisten – genau dafür wurde der Vorsorgeauftrag wirksam.",
      feedbackNotSelected: "Korrekt – Herr Wyss kann urteilsunfähig nicht mehr selbst unterzeichnen.",
    },
    {
      id: "bucher-als-kontoinhaberin",
      label: "Frau Bucher als Kontoinhaberin erfassen",
      status: "forbidden",
      feedbackSelected: "Schwerer Fehler: Das Konto gehört Herrn Wyss – Frau Bucher handelt nur als Vertreterin, nicht als Kontoinhaberin.",
      feedbackNotSelected: "Korrekt – Herr Wyss ist der Kontoinhaber.",
    },
    {
      id: "beistandsurkunde",
      label: "Beistandsurkunde einfordern",
      status: "forbidden",
      feedbackSelected:
        "Fehler: Hier liegt kein behördlich angeordnetes Beistandsverhältnis vor, sondern ein privater Vorsorgeauftrag – die KESB-Wirksamkeitsbestätigung ersetzt die Beistandsurkunde.",
      feedbackNotSelected: "Korrekt – in diesem Fall ist keine Beistandsurkunde relevant, sondern die KESB-Wirksamkeitsbestätigung.",
    },
    {
      id: "pep-formular",
      label: "PEP-Prüfungsformular",
      status: "forbidden",
      feedbackSelected: "Fehler: Kein Hinweis auf politisch exponierte Personen in diesem Fall.",
      feedbackNotSelected: "Korrekt – kein PEP-Status erkennbar.",
    },
    {
      id: "herkunft-vermoegen",
      label: "Herkunftsnachweis Vermögen",
      status: "forbidden",
      feedbackSelected: "Fehler: Die Urteilsunfähigkeit allein ist kein GwG-Risikomerkmal – kein EDD erforderlich.",
      feedbackNotSelected: "Korrekt – kein erhöhtes Risiko, kein EDD nötig.",
    },
  ],
  generalFeedback:
    "Ein Vorsorgeauftrag (Art. 360 ff. ZGB) ist eine private Vorausverfügung für den Fall der Urteilsunfähigkeit. Er entfaltet aber erst Wirkung, wenn die KESB die Urteilsunfähigkeit feststellt und die Wirksamkeit des Auftrags bestätigt – erst dann darf die Bank die vorsorgebeauftragte Person als Vertreterin anerkennen. Der urteilsunfähige Kontoinhaber bleibt Vertragspartei, unterschreibt aber nicht mehr selbst; die Vorsorgebeauftragte handelt in seinem Namen.",
};

// ─────────────────────────────────────────────────────────
// LEVEL CONFIG
// ─────────────────────────────────────────────────────────

export const KONTO_PRIVAT_LEVELS: KontoPrivatLevel[] = [
  {
    level: 1,
    label: "Grundlagen",
    description: "Standardfälle, Pflichtdokumente, GwG-Basics",
    badgeVariant: "green",
    cases: [L1_STANDARD, L1_AUSWEIS_ABGELAUFEN, L1_VOLLMACHT_MCQ],
  },
  {
    level: 2,
    label: "Spezialfälle",
    description: "Ausländer, GwG-Risiko, Minderjährige, Beistandschaft, Scheidung",
    badgeVariant: "orange",
    cases: [
      L2_AUSLAENDER,
      L2_BAREINLAGE,
      L2_MINDERJAEHRIG,
      L2_PEP_SCHMID,
      L2_ERBSCHAFT_KELLER,
      L2_NIEDERLASSUNGSBEWILLIGUNG_C,
      L2_BEISTANDSCHAFT,
      L2_KLEINKIND_SORGE,
      L2_SCHEIDUNG,
      L2_VERDAECHTIGES_VERHALTEN,
    ],
  },
  {
    level: 3,
    label: "LAP-Niveau",
    description: "Gemeinschaftskonto, US-Persons, Selbständige, Vorsorgeauftrag, Trickfragen, PEP / EDD",
    badgeVariant: "red",
    cases: [
      L3_GEMEINSCHAFTSKONTO,
      L3_AUSWEIS_TRICK_MCQ,
      L3_HOCHRISIKO_PEP,
      L3_US_STAATSBUERGER_MCQ,
      L3_SELBSTAENDIGER,
      L3_WIRTSCHAFTLICH_BERECHTIGTER_DRITTER,
      L3_DOPPELBUERGER_FATCA,
      L3_VORSORGEAUFTRAG,
    ],
  },
];
