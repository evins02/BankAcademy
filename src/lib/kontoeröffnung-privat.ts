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
      id: "eigenerklarung-np",
      label: "Eigenerklärung FATCA (juristische Person)",
      status: "required",
      feedbackSelected: "Korrekt – FATCA-Abklärung ist bei jeder Kontoeröffnung pflicht.",
      feedbackNotSelected: "Fehler: FATCA-Abklärung nicht vergessen – Fragen zu US-Verbindungen sind zwingend.",
    },
    {
      id: "formular-a",
      label: "Formular A (wirtschaftlich Berechtigter, VSB 20)",
      status: "required",
      feedbackSelected: "Korrekt – Formular A ist auch in diesem Fall zwingend auszufüllen.",
      feedbackNotSelected: "Fehler: Formular A (VSB 20) nicht vergessen – unabhängig vom Ausweisproblem.",
    },
    {
      id: "wohnsitzbestatigung",
      label: "Wohnsitzbestätigung",
      status: "required",
      feedbackSelected: "Korrekt.",
      feedbackNotSelected: "Fehler: Wohnsitznachweis nicht vergessen.",
    },
    {
      id: "termin-neu",
      label: "Neuen Termin vereinbaren, sobald gültiger Ausweis vorliegt",
      status: "optional",
      feedbackSelected: "Gut – praktische Lösung und guter Kundenservice.",
      feedbackNotSelected: "Akzeptabel – Terminvereinbarung ist jedoch empfehlenswert.",
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
        "Fehler: Es gibt keine Ausnahmeregelung für abgelaufene Identifikationsdokumente.",
      feedbackNotSelected: "Korrekt – keine Ausnahme möglich.",
    },
    {
      id: "unterschriftenprobe",
      label: "Unterschriftenprobe",
      status: "required",
      feedbackSelected: "Korrekt – kann bereits aufgenommen werden für spätere Kontoeröffnung.",
      feedbackNotSelected: "Hinweis: Unterschriftenprobe kann bereits vorbereitet werden.",
    },
  ],
  generalFeedback:
    "Ein abgelaufener Ausweis ist kein gültiges Identifikationsmittel – unabhängig davon, wie kurz er abgelaufen ist. GwG kennt keine Toleranzfristen. Frau Keller muss ihren Ausweis beim Einwohneramt/Passbüro erneuern und danach wiederkommen.",
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
      label: "Eigenerklärung FATCA (juristische Person)",
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
      label: "Arbeitsvertrag / Lohnausweis (optional)",
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
    "Für ausländische Kunden gilt: Entweder der ausländische Pass ODER die Aufenthaltsbewilligung reicht für die Identifikation. Zusätzlich sind Eigenerklärung FATCA (juristische Person), Formular A (VSB 20 – wirtschaftlich Berechtigter), Wohnsitznachweis und Unterschriftenprobe erforderlich. Bei einem normalen Angestelltenverhältnis besteht kein erhöhtes Risiko – kein EDD nötig.",
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
      id: "ausweis-identifikation",
      label: "Ausweis genau prüfen und Kopie erstellen",
      status: "required",
      feedbackSelected: "Korrekt – besonders bei Risikofällen ist die sorgfältige Identifikation entscheidend.",
      feedbackNotSelected: "Fehler: Identifikation ist Pflicht – gerade bei auffälligen Fällen.",
    },
    {
      id: "eigenerklarung-np",
      label: "Eigenerklärung FATCA (juristische Person)",
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
      label: "Geburtsurkunde von Lena (optional)",
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
      label: "Eigenerklärung FATCA (juristische Person) – Stefan Berger",
      status: "required",
      feedbackSelected: "Korrekt – FATCA-Abklärung für jeden Kontoinhaber separat erforderlich.",
      feedbackNotSelected: "Fehler: FATCA-Abklärung für Stefan Berger fehlt.",
    },
    {
      id: "eigenerklarung-maria",
      label: "Eigenerklärung FATCA (juristische Person) – Maria Berger",
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
    "Beim Gemeinschaftskonto: BEIDE Inhaber werden identifiziert (je Ausweis + Eigenerklärung FATCA (juristische Person)). Zusätzlich: Formular A einmal pro Konto (VSB 20). Die Zeichnungsregelung richtet sich nach dem Kundenwunsch – hier Einzelzeichnung. Kollektivzeichnung wäre falsch, da das Ehepaar explizit einzeln verfügen möchte.",
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
      id: "reisepass-international",
      label: "Reisepass (international gültig)",
      status: "required",
      feedbackSelected: "Korrekt – primäres Identifikationsdokument.",
      feedbackNotSelected: "Fehler: Identifikation ist Pflicht.",
    },
    {
      id: "eigenerklarung-np",
      label: "Eigenerklärung FATCA (juristische Person)",
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
    description: "Ausländer, GwG-Risiko, Minderjährige",
    badgeVariant: "orange",
    cases: [L2_AUSLAENDER, L2_BAREINLAGE, L2_MINDERJAEHRIG, L2_PEP_SCHMID, L2_ERBSCHAFT_KELLER],
  },
  {
    level: 3,
    label: "LAP-Niveau",
    description: "Gemeinschaftskonto, Trickfragen, PEP / EDD",
    badgeVariant: "red",
    cases: [L3_GEMEINSCHAFTSKONTO, L3_AUSWEIS_TRICK_MCQ, L3_HOCHRISIKO_PEP],
  },
];
