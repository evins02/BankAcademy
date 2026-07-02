export type FieldStatus = "ok" | "missing" | "suspicious";
export type LevelNum = 1 | 2 | 3;

export interface DossierField {
  label: string;
  value: string;
  status: FieldStatus;
}

export interface ChecklistItem {
  id: string;
  label: string;
  isIssue: boolean;
}

export interface ChecklistScenario {
  type: "checklist";
  id: string;
  level: LevelNum;
  briefing: string;
  dossierTitle: string;
  dossierFields: DossierField[];
  checklistItems: ChecklistItem[];
  commentHint: string;
  feedback: string;
  concepts?: string[];
}

export interface MCOption {
  key: string;
  text: string;
}

export interface MCScenario {
  type: "mc";
  id: string;
  level: LevelNum;
  briefing: string;
  dossierTitle: string;
  dossierFields: DossierField[];
  question: string;
  options: MCOption[];
  correct: string;
  commentHint: string;
  feedback: string;
  concepts?: string[];
}

export type BkoKycScenario = ChecklistScenario | MCScenario;

export interface ChecklistSubmission {
  type: "checklist";
  action: "freigeben" | "zurueckweisen";
  selectedIssueIds: string[];
  comment: string;
  isCorrect: boolean;
}

export interface MCSubmission {
  type: "mc";
  selectedKey: string;
  isCorrect: boolean;
}

export type SubmissionResult = ChecklistSubmission | MCSubmission;

export interface BkoKycLevelConfig {
  level: LevelNum;
  label: string;
  badgeVariant: "green" | "orange" | "red";
  scenarios: BkoKycScenario[];
}

export const BKO_KYC_LEVELS: BkoKycLevelConfig[] = [
  {
    level: 1,
    label: "Einsteiger",
    badgeVariant: "green",
    scenarios: [
      {
        type: "checklist",
        id: "1.1",
        level: 1,
        briefing:
          "Kundenberater Stefan Meier hat heute Nachmittag folgendes Dossier für eine Privatkonto-Eröffnung eingereicht. Du bist zuständig für die Erstkontrolle. Prüfe das Dossier vor der Freigabe auf Vollständigkeit.",
        dossierTitle: "Maria Schneider – Privatkonto",
        dossierFields: [
          { label: "Name", value: "Maria Schneider", status: "ok" },
          { label: "Adresse", value: "Bahnhofstrasse 12, 8001 Zürich", status: "ok" },
          { label: "Geburtsdatum", value: "15.03.1990", status: "ok" },
          { label: "Familiäre Situation", value: "Ledig", status: "ok" },
          { label: "Ausbildung", value: "KV Abschluss", status: "ok" },
          { label: "Beruf", value: "–", status: "ok" },
          { label: "Arbeitgeber", value: "–", status: "ok" },
          { label: "Beschäftigungsgrad", value: "–", status: "ok" },
          { label: "Einkommen", value: "CHF 75'000/Jahr", status: "ok" },
          { label: "Vermögen", value: "CHF 25'000", status: "ok" },
          { label: "Herkunft der Mittel", value: "Lohn", status: "ok" },
          { label: "Formular A", value: "Ausgefüllt", status: "ok" },
          { label: "Unterschrift", value: "Vorhanden", status: "ok" },
          { label: "Ausweis", value: "Gültig bis 2028", status: "ok" },
        ],
        checklistItems: [
          { id: "beruf", label: "Beruf fehlt", isIssue: true },
          { id: "arbeitgeber", label: "Arbeitgeber fehlt", isIssue: true },
          { id: "beschaeftigung", label: "Beschäftigungsgrad fehlt", isIssue: true },
          { id: "einkommen", label: "Einkommen fehlt", isIssue: false },
          { id: "formular", label: "Formular A fehlt", isIssue: false },
        ],
        commentHint:
          "Bitte Beruf, Arbeitgeber und Beschäftigungsgrad beim Kunden nachtragen. Eröffnung kann erst nach Vervollständigung freigegeben werden.",
        feedback:
          "Berufsangaben (Beruf, Arbeitgeber, Beschäftigungsgrad) sind gemäss VSB zwingend für die KYC-Dokumentation. Sie bilden die Grundlage der Risikobeurteilung. Der Kundenberater muss diese Informationen beim Kunden nachholen, bevor das Konto eröffnet werden kann.",
      },
      {
        type: "checklist",
        id: "1.2",
        level: 1,
        briefing:
          "Kundenberaterin Anna Müller hat folgendes Dossier zur Freigabe eingereicht. Das Eröffnungsgespräch fand gestern statt. Prüfe das Dossier auf Vollständigkeit.",
        dossierTitle: "Thomas Brunner – Privatkonto",
        dossierFields: [
          { label: "Name", value: "Thomas Brunner", status: "ok" },
          { label: "Adresse", value: "Hauptgasse 5, 3011 Bern", status: "ok" },
          { label: "Geburtsdatum", value: "22.07.1985", status: "ok" },
          { label: "Familiäre Situation", value: "Verheiratet, 2 Kinder", status: "ok" },
          { label: "Ausbildung", value: "Fachhochschule", status: "ok" },
          { label: "Beruf", value: "Projektleiter", status: "ok" },
          { label: "Arbeitgeber", value: "Siemens AG", status: "ok" },
          { label: "Beschäftigungsgrad", value: "100%", status: "ok" },
          { label: "Einkommen", value: "–", status: "ok" },
          { label: "Vermögen", value: "–", status: "ok" },
          { label: "Herkunft der Mittel", value: "–", status: "ok" },
          { label: "Formular A", value: "Ausgefüllt", status: "ok" },
          { label: "Unterschrift", value: "Vorhanden", status: "ok" },
          { label: "Ausweis", value: "Gültig bis 2027", status: "ok" },
        ],
        checklistItems: [
          { id: "einkommen", label: "Einkommen fehlt", isIssue: true },
          { id: "vermoegen", label: "Vermögen fehlt", isIssue: true },
          { id: "herkunft", label: "Herkunft der Mittel fehlt", isIssue: true },
          { id: "beruf", label: "Beruf fehlt", isIssue: false },
          { id: "ausweis", label: "Ausweis ungültig", isIssue: false },
        ],
        commentHint:
          "Bitte Einkommen, Vermögen und Herkunft der Mittel ergänzen. Diese Angaben sind für die Risikobeurteilung zwingend erforderlich.",
        feedback:
          "Finanzielle Informationen (Einkommen, Vermögen, Herkunft der Mittel) sind Pflichtangaben im KYC-Prozess. Sie bilden die Grundlage für die Risikobeurteilung. Ohne diese Angaben kann keine ordentliche KYC-Prüfung durchgeführt werden.",
      },
      {
        type: "mc",
        id: "1.3",
        level: 1,
        briefing:
          "Kundenberater Marco Rossi legt dir folgendes Dossier für eine Privatkonto-Eröffnung vor. Prüfe es sorgfältig und fälle deinen Entscheid.",
        dossierTitle: "Sandra Weber – Privatkonto",
        dossierFields: [
          { label: "Name", value: "Sandra Weber", status: "ok" },
          { label: "Adresse", value: "Seestrasse 88, 6300 Zug", status: "ok" },
          { label: "Geburtsdatum", value: "03.11.1992", status: "ok" },
          { label: "Familiäre Situation", value: "Ledig", status: "ok" },
          { label: "Ausbildung", value: "Universität", status: "ok" },
          { label: "Beruf", value: "Juristin", status: "ok" },
          { label: "Arbeitgeber", value: "Weber & Partner AG", status: "ok" },
          { label: "Beschäftigungsgrad", value: "80%", status: "ok" },
          { label: "Einkommen", value: "CHF 120'000/Jahr", status: "ok" },
          { label: "Vermögen", value: "CHF 80'000", status: "ok" },
          { label: "Herkunft der Mittel", value: "Lohn und Erbschaft", status: "ok" },
          { label: "Formular A", value: "Ausgefüllt", status: "ok" },
          { label: "Unterschrift", value: "Vorhanden", status: "ok" },
          { label: "Ausweis", value: "Gültig bis 2029", status: "ok" },
        ],
        question: "Du prüfst dieses Dossier vor der Kontoeröffnung. Was ist dein Entscheid?",
        options: [
          { key: "A", text: "Zurückweisen – Einkommen fehlt" },
          { key: "B", text: "Zurückweisen – Formular A fehlt" },
          { key: "C", text: "Freigeben – Dossier vollständig und korrekt" },
          { key: "D", text: "Vorgesetzten fragen wegen Herkunft der Mittel" },
        ],
        correct: "C",
        commentHint: "",
        feedback:
          "Das Dossier ist vollständig und korrekt ausgefüllt. Alle Pflichtfelder sind vorhanden, der Ausweis gültig, Formular A unterschrieben. Die Angabe 'Lohn und Erbschaft' als Herkunft der Mittel ist für dieses Vermögensniveau plausibel. Die Freigabe kann erfolgen.",
      },
    ],
  },
  {
    level: 2,
    label: "Fortgeschritten",
    badgeVariant: "orange",
    scenarios: [
      {
        type: "checklist",
        id: "2.1",
        level: 2,
        briefing:
          "Kundenberater Luca Ferrari reicht ein Dossier für die Kontoeröffnung eines Expats ein. Auf den ersten Blick wirken alle Felder ausgefüllt. Prüfe das Dossier sorgfältig, bevor du entscheidest.",
        dossierTitle: "Ahmed Al-Rashid – Privatkonto",
        dossierFields: [
          { label: "Name", value: "Ahmed Al-Rashid", status: "ok" },
          { label: "Adresse", value: "Lindenweg 3, 4051 Basel", status: "ok" },
          { label: "Beruf", value: "Software Engineer", status: "ok" },
          { label: "Arbeitgeber", value: "Google Switzerland GmbH", status: "ok" },
          { label: "Einkommen", value: "CHF 180'000/Jahr", status: "ok" },
          { label: "Vermögen", value: "CHF 150'000", status: "ok" },
          { label: "Herkunft der Mittel", value: "Lohn", status: "ok" },
          { label: "Formular A", value: "Ausgefüllt", status: "ok" },
          { label: "Unterschrift", value: "Vorhanden", status: "ok" },
          { label: "Ausweis", value: "Gültig bis 15.03.2024", status: "ok" },
        ],
        checklistItems: [
          { id: "ausweis", label: "Ausweis abgelaufen", isIssue: true },
          { id: "formular", label: "Formular A fehlt", isIssue: false },
          { id: "einkommen", label: "Einkommen fehlt", isIssue: false },
          { id: "wibe", label: "WiBe fehlt", isIssue: false },
        ],
        commentHint:
          "Bitte gültiges Identifikationsdokument nachreichen. Der aktuelle Ausweis ist abgelaufen. Eröffnung kann erst nach Vorlage eines gültigen Ausweises erfolgen.",
        feedback:
          "Der Ausweis lief am 15.03.2024 ab – heute ist über zwei Jahre später. Die Identifikation muss mit einem gültigen Dokument wiederholt werden. Gemäss VSB Art. 3 ist eine gültige physische Identifikation zwingend. Kein gültiger Ausweis = keine Kontoeröffnung.",
      },
      {
        type: "checklist",
        id: "2.2",
        level: 2,
        briefing:
          "Kundenberaterin Sarah Keller reicht ein Dossier für die Kontoeröffnung einer Holdings-Gesellschaft ein. Die Gesellschaft hat ihren Sitz in Zug und hält Beteiligungen im Ausland. Prüfe das Dossier vor der Freigabe.",
        dossierTitle: "Meridian Holdings Ltd. – Firmenkonto",
        dossierFields: [
          { label: "Firmenname", value: "Meridian Holdings Ltd.", status: "ok" },
          { label: "Sitz", value: "Bahnhofplatz 1, 6300 Zug", status: "ok" },
          { label: "HR-Auszug", value: "Vorhanden", status: "ok" },
          { label: "Aktienbuch", value: "Vorhanden", status: "ok" },
          { label: "Herkunft der Mittel", value: "Dividenden aus Beteiligungen", status: "ok" },
          { label: "Formular", value: "Formular K", status: "ok" },
          { label: "WiBe", value: "–", status: "ok" },
          { label: "Erhöhte Sorgfalt", value: "–", status: "ok" },
        ],
        checklistItems: [
          { id: "formular", label: "Falsches Formular eingereicht (K statt A)", isIssue: true },
          { id: "wibe", label: "Wirtschaftlich Berechtigte Person nicht dokumentiert", isIssue: true },
          { id: "sorgfalt", label: "Erhöhte Sorgfaltspflicht nicht vermerkt", isIssue: true },
          { id: "ausweis", label: "Ausweis des Zeichnungsberechtigten abgelaufen", isIssue: false },
          { id: "unterschrift", label: "Unterschrift fehlt", isIssue: false },
        ],
        commentHint:
          "Bei Sitzgesellschaften ist Formular A (nicht K) erforderlich. Zusätzlich müssen WiBe und erhöhte Sorgfaltspflicht dokumentiert werden.",
        feedback:
          "Sitzgesellschaften (Holdings ohne operatives Geschäft) erfordern zwingend Formular A, da wirtschaftliche Berechtigte identifiziert werden müssen. Formular K ist nur für Betriebsgesellschaften. Die WiBe muss dokumentiert und die erhöhte Sorgfaltspflicht explizit vermerkt sein – das ist bei Holdings Standardprozess.",
      },
      {
        type: "checklist",
        id: "2.3",
        level: 2,
        briefing:
          "Von der Filiale Bern-Centrum trifft folgendes Dossier ein. Das Eröffnungsgespräch fand letzte Woche statt. Der Kundenberater hat das Dossier heute zur Freigabe eingereicht. Prüfe es sorgfältig.",
        dossierTitle: "Julia Hoffmann – Privatkonto",
        dossierFields: [
          { label: "Name", value: "Julia Hoffmann", status: "ok" },
          { label: "Adresse", value: "Rathausgasse 7, 3011 Bern", status: "ok" },
          { label: "Familiäre Situation", value: "–", status: "ok" },
          { label: "Beruf", value: "Sachbearbeiterin", status: "ok" },
          { label: "Arbeitgeber", value: "–", status: "ok" },
          { label: "Beschäftigungsgrad", value: "60%", status: "ok" },
          { label: "Einkommen", value: "–", status: "ok" },
          { label: "Vermögen", value: "CHF 15'000", status: "ok" },
          { label: "Herkunft der Mittel", value: "Lohn", status: "ok" },
          { label: "Formular A", value: "Ausgefüllt", status: "ok" },
          { label: "Unterschrift", value: "–", status: "ok" },
          { label: "Ausweis", value: "Gültig bis 30.11.2026", status: "ok" },
        ],
        checklistItems: [
          { id: "familiaer", label: "Familiäre Situation fehlt", isIssue: true },
          { id: "arbeitgeber", label: "Arbeitgeber fehlt", isIssue: true },
          { id: "einkommen", label: "Einkommen fehlt", isIssue: true },
          { id: "unterschrift", label: "Unterschrift des Kunden fehlt", isIssue: true },
          { id: "beruf", label: "Beruf fehlt", isIssue: false },
          { id: "ausweis", label: "Ausweis abgelaufen", isIssue: false },
        ],
        commentHint:
          "Folgendes fehlt und muss nachgereicht werden: 1. Familiäre Situation, 2. Arbeitgeber, 3. Einkommen, 4. Unterschrift des Kunden.",
        feedback:
          "Sind mehrere Pflichtangaben unvollständig, ist das Dossier vollständig zurückzuweisen. Alle fehlenden Punkte müssen im Kommentar einzeln aufgelistet werden, damit der Kundenberater gezielt nachfassen kann. Ohne Unterschrift ist das Formular A zudem rechtlich nicht gültig.",
      },
    ],
  },
  {
    level: 3,
    label: "LAP-Niveau",
    badgeVariant: "red",
    scenarios: [
      {
        type: "checklist",
        id: "3.1",
        level: 3,
        briefing:
          "Du erhältst das Dossier für die Eröffnung eines Privatkontos. Der Kunde ist Diplomat und lebt seit kurzem in der Schweiz. Das Dossier wirkt auf den ersten Blick vollständig ausgefüllt. Prüfe es sorgfältig vor der Freigabe.",
        dossierTitle: "Jean-Baptiste Mbeki – Privatkonto",
        dossierFields: [
          { label: "Name", value: "Jean-Baptiste Mbeki", status: "ok" },
          { label: "Beruf", value: "Botschafter", status: "ok" },
          { label: "Arbeitgeber", value: "Botschaft Republik Kongo", status: "ok" },
          { label: "Einkommen", value: "CHF 200'000/Jahr", status: "ok" },
          { label: "Vermögen", value: "CHF 2'000'000", status: "ok" },
          { label: "Herkunft der Mittel", value: "Lohn, Immobilieneinkünfte", status: "ok" },
          { label: "PEP Status", value: "–", status: "ok" },
          { label: "Erhöhte Sorgfalt", value: "–", status: "ok" },
          { label: "Genehmigung GL", value: "–", status: "ok" },
          { label: "Formular A", value: "Ausgefüllt", status: "ok" },
          { label: "Ausweis", value: "Gültig bis 2028", status: "ok" },
        ],
        checklistItems: [
          { id: "pep", label: "PEP-Status nicht dokumentiert", isIssue: true },
          { id: "sorgfalt", label: "Erhöhte Sorgfalt nicht vermerkt", isIssue: true },
          { id: "genehmigung", label: "Genehmigung Geschäftsleitung fehlt", isIssue: true },
          { id: "formular", label: "Formular A fehlt", isIssue: false },
          { id: "ausweis", label: "Ausweis ungültig", isIssue: false },
        ],
        commentHint:
          "Kunde ist als PEP (Politically Exposed Person) einzustufen. PEP-Vermerk, erhöhte Sorgfalt und Genehmigung der Geschäftsleitung müssen nachgereicht werden.",
        feedback:
          "Botschafter sind per Definition PEPs (Politically Exposed Persons). Gemäss GwG Art. 6 sind erhöhte Sorgfaltspflichten zwingend anzuwenden. Zusätzlich ist die Genehmigung der Geschäftsleitung erforderlich, bevor das Konto eröffnet werden kann. Diese drei Punkte fehlen komplett – das Dossier ist zurückzuweisen.",
      },
      {
        type: "mc",
        id: "3.2",
        level: 3,
        briefing:
          "Kundenberater Tim Schärer legt dir das Dossier eines Neukunden vor. Alle Felder sind ausgefüllt, Formular A liegt vor, der Ausweis ist gültig. Du prüfst das Dossier inhaltlich.",
        dossierTitle: "Kevin Steiner – Privatkonto",
        dossierFields: [
          { label: "Name", value: "Kevin Steiner", status: "ok" },
          { label: "Beruf", value: "Lagerist", status: "ok" },
          { label: "Arbeitgeber", value: "Migros Verteilzentrum", status: "ok" },
          { label: "Beschäftigungsgrad", value: "100%", status: "ok" },
          { label: "Einkommen", value: "CHF 58'000/Jahr", status: "ok" },
          { label: "Vermögen", value: "CHF 1'800'000", status: "ok" },
          { label: "Herkunft der Mittel", value: "Erspartes", status: "ok" },
          { label: "Formular A", value: "Ausgefüllt", status: "ok" },
          { label: "Ausweis", value: "Gültig bis 2027", status: "ok" },
        ],
        question: "Du prüfst dieses Dossier. Was fällt dir auf, und was ist dein Entscheid?",
        options: [
          { key: "A", text: "Freigeben – alle Felder sind ausgefüllt und formal korrekt" },
          { key: "B", text: "Zurückweisen – Einkommen nicht durch Lohnausweis belegt" },
          {
            key: "C",
            text: "Rückfrage zur Vermögensherkunft – CHF 1'800'000 ist bei diesem Einkommen erklärungsbedürftig",
          },
          { key: "D", text: "Freigeben – Formular A und Ausweis sind vorhanden" },
        ],
        correct: "C",
        commentHint:
          "Vermögen CHF 1'800'000 bei Jahreslohn CHF 58'000 ist nicht plausibel. Herkunft der Mittel muss konkret belegt werden (z.B. Erbschaft mit Nachweis, Immobilienverkauf).",
        feedback:
          "Ein Lagerist mit CHF 58'000 Jahreslohn und CHF 1'800'000 Vermögen: selbst über 30 Jahre gespart ergäbe das maximal CHF 1'740'000 – ohne Ausgaben. Die Herkunft muss konkret dokumentiert sein (z.B. Erbschaftsnachweis, Schenkungsvertrag, Immobilienverkauf). 'Erspartes' ist nicht ausreichend. Unplausible Herkunftsangaben sind ein klassischer Geldwäscherei-Indikator.",
      },
      {
        type: "mc",
        id: "3.3",
        level: 3,
        briefing:
          "Der Kundenberater hat ein Dossier für einen Neukunden aus dem Ausland eingereicht. Der Kunde möchte ein Privatkonto eröffnen und initial CHF 5'000'000 einlegen. Prüfe das Dossier sorgfältig und beurteile die Gesamtsituation.",
        dossierTitle: "Viktor Petrov – Privatkonto",
        dossierFields: [
          { label: "Name", value: "Viktor Petrov", status: "ok" },
          { label: "Adresse", value: "Goldküste 88, 8700 Küsnacht", status: "ok" },
          { label: "Familiäre Situation", value: "Verheiratet", status: "ok" },
          { label: "Beruf", value: "Unternehmer", status: "ok" },
          { label: "Arbeitgeber", value: "–", status: "ok" },
          { label: "Einkommen", value: "–", status: "ok" },
          { label: "Vermögen", value: "CHF 5'000'000", status: "ok" },
          { label: "Herkunft der Mittel", value: "Business-Erlöse", status: "ok" },
          { label: "PEP Prüfung", value: "–", status: "ok" },
          { label: "Formular A", value: "Ausgefüllt", status: "ok" },
          { label: "Ausweis", value: "Gültig bis 2027", status: "ok" },
        ],
        question: "Du prüfst dieses Dossier. Was ist die richtige Entscheidung?",
        options: [
          { key: "A", text: "Freigeben – Formular A ist vorhanden und Ausweis gültig" },
          { key: "B", text: "Nur Beruf und Arbeitgeber nachfordern" },
          {
            key: "C",
            text: "Vollständig zurückweisen – Beruf zu ungenau, Arbeitgeber/Einkommen fehlen, Mittelherkunft unbelegt, PEP-Prüfung fehlt",
          },
          { key: "D", text: "Vorgesetzten informieren und abwarten" },
        ],
        correct: "C",
        commentHint:
          "Zurückgewiesen: 1. Beruf 'Unternehmer' zu ungenau (Branche, Firma, Funktion fehlen), 2. Arbeitgeber nicht dokumentiert, 3. Einkommen fehlt, 4. 'Business-Erlöse' ist keine ausreichende Dokumentation für CHF 5 Mio., 5. PEP-Prüfung fehlt.",
        feedback:
          "Mehrere kritische Mängel: (1) 'Unternehmer' ist zu vage – Branche, Unternehmensname und Funktion müssen dokumentiert sein. (2) Arbeitgeber und Einkommen fehlen vollständig. (3) 'Business-Erlöse' genügt nicht als Mittelherkunft bei CHF 5 Millionen – es braucht konkrete Belege (Verträge, Abschlüsse). (4) Die PEP-Prüfung fehlt – bei ausländischen Kunden mit hohen Einlagen ist das ein Pflichtschritt. Alle Punkte zusammen machen eine Freigabe unmöglich.",
      },
    ],
  },
];
