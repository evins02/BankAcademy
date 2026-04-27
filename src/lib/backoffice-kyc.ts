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
          "Du bist im Team Erstkontrolle. Du erhältst folgende Neueröffnung von Kundenberater Stefan Meier zur Prüfung.",
        dossierTitle: "Maria Schneider – Privatkonto",
        dossierFields: [
          { label: "Name", value: "Maria Schneider", status: "ok" },
          { label: "Adresse", value: "Bahnhofstrasse 12, 8001 Zürich", status: "ok" },
          { label: "Geburtsdatum", value: "15.03.1990", status: "ok" },
          { label: "Familiäre Situation", value: "Ledig", status: "ok" },
          { label: "Ausbildung", value: "KV Abschluss", status: "ok" },
          { label: "Beruf", value: "leer", status: "missing" },
          { label: "Arbeitgeber", value: "leer", status: "missing" },
          { label: "Beschäftigungsgrad", value: "leer", status: "missing" },
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
          "Bitte Beruf, Arbeitgeber und Beschäftigungsgrad nachtragen. Eröffnung kann erst nach Vervollständigung freigegeben werden.",
        feedback:
          "Ohne Berufsangaben ist das KYC unvollständig. Der Kundenberater muss diese Angaben beim Kunden nachholen.",
      },
      {
        type: "checklist",
        id: "1.2",
        level: 1,
        briefing: "Du erhältst folgende Neueröffnung von Kundenberaterin Anna Müller.",
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
          { label: "Einkommen", value: "leer", status: "missing" },
          { label: "Vermögen", value: "leer", status: "missing" },
          { label: "Herkunft der Mittel", value: "leer", status: "missing" },
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
          "Bitte Einkommen, Vermögen und Herkunft der Mittel ergänzen. Diese Angaben sind für die Risikobeurteilung zwingend.",
        feedback:
          "Finanzielle Angaben sind Pflicht im KYC. Ohne diese kann keine Risikobeurteilung gemacht werden.",
      },
      {
        type: "mc",
        id: "1.3",
        level: 1,
        briefing: "Du erhältst folgende Neueröffnung von Kundenberater Marco Rossi.",
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
        question: "Was machst du mit diesem Dossier?",
        options: [
          { key: "A", text: "Zurückweisen – Einkommen fehlt" },
          { key: "B", text: "Zurückweisen – Formular A fehlt" },
          { key: "C", text: "Dossier freigeben – alles vollständig" },
          { key: "D", text: "Vorgesetzten fragen" },
        ],
        correct: "C",
        commentHint: "",
        feedback: "Das Dossier ist vollständig. Du kannst die Kontoeröffnung freigeben.",
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
        briefing: "Du erhältst zur Prüfung eine Neueröffnung für einen Expat.",
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
          { label: "Ausweis", value: "Abgelaufen seit 01.2024", status: "missing" },
        ],
        checklistItems: [
          { id: "ausweis", label: "Ausweis abgelaufen", isIssue: true },
          { id: "formular", label: "Formular A fehlt", isIssue: false },
          { id: "einkommen", label: "Einkommen fehlt", isIssue: false },
          { id: "wibe", label: "WiBe fehlt", isIssue: false },
        ],
        commentHint:
          "Ausweis seit Januar 2024 abgelaufen. Bitte gültiges Identifikationsdokument nachreichen.",
        feedback:
          "Identifikation muss mit gültigem Dokument erfolgen. Abgelaufener Ausweis ist nicht akzeptabel gemäss VSB.",
      },
      {
        type: "checklist",
        id: "2.2",
        level: 2,
        briefing: "Du erhältst eine Neueröffnung für eine Sitzgesellschaft.",
        dossierTitle: "Meridian Holdings Ltd. – Firmenkonto",
        dossierFields: [
          { label: "Firmenname", value: "Meridian Holdings Ltd.", status: "ok" },
          { label: "Adresse", value: "Bahnhofplatz 1, 6300 Zug", status: "ok" },
          { label: "HR-Auszug", value: "Vorhanden", status: "ok" },
          { label: "Aktienbuch", value: "Vorhanden", status: "ok" },
          { label: "Herkunft der Mittel", value: "Dividenden", status: "ok" },
          { label: "Formular", value: "K eingereicht (statt A)", status: "missing" },
          { label: "WiBe", value: "Nicht dokumentiert", status: "missing" },
          { label: "Erhöhte Sorgfalt", value: "Nicht vermerkt", status: "missing" },
        ],
        checklistItems: [
          { id: "formular", label: "Falsches Formular (K statt A)", isIssue: true },
          { id: "wibe", label: "WiBe nicht dokumentiert", isIssue: true },
          { id: "sorgfalt", label: "Erhöhte Sorgfalt fehlt", isIssue: true },
          { id: "ausweis", label: "Ausweis abgelaufen", isIssue: false },
          { id: "unterschrift", label: "Unterschrift fehlt", isIssue: false },
        ],
        commentHint:
          "Bei Sitzgesellschaften ist Formular A erforderlich. WiBe und erhöhte Sorgfalt müssen dokumentiert werden.",
        feedback:
          "Sitzgesellschaften erfordern Formular A, WiBe-Dokumentation und Vermerk zur erhöhten Sorgfalt.",
      },
      {
        type: "checklist",
        id: "2.3",
        level: 2,
        briefing: "Du erhältst eine weitere Neueröffnung zur Kontrolle.",
        dossierTitle: "Julia Hoffmann – Privatkonto",
        dossierFields: [
          { label: "Name", value: "Julia Hoffmann", status: "ok" },
          { label: "Adresse", value: "Rathausgasse 7, 3011 Bern", status: "ok" },
          { label: "Familiäre Situation", value: "leer", status: "missing" },
          { label: "Beruf", value: "Sachbearbeiterin", status: "ok" },
          { label: "Arbeitgeber", value: "leer", status: "missing" },
          { label: "Beschäftigungsgrad", value: "60%", status: "ok" },
          { label: "Einkommen", value: "leer", status: "missing" },
          { label: "Vermögen", value: "CHF 15'000", status: "ok" },
          { label: "Herkunft der Mittel", value: "Lohn", status: "ok" },
          { label: "Formular A", value: "Ausgefüllt", status: "ok" },
          { label: "Unterschrift", value: "fehlt", status: "missing" },
          { label: "Ausweis", value: "Gültig bis 2026", status: "ok" },
        ],
        checklistItems: [
          { id: "familiaer", label: "Familiäre Situation fehlt", isIssue: true },
          { id: "arbeitgeber", label: "Arbeitgeber fehlt", isIssue: true },
          { id: "einkommen", label: "Einkommen fehlt", isIssue: true },
          { id: "unterschrift", label: "Unterschrift fehlt", isIssue: true },
          { id: "beruf", label: "Beruf fehlt", isIssue: false },
          { id: "ausweis", label: "Ausweis abgelaufen", isIssue: false },
        ],
        commentHint:
          "Folgendes fehlt: Familiäre Situation, Arbeitgeber, Einkommen und Unterschrift des Kunden.",
        feedback:
          "Bei mehreren fehlenden Angaben ist das Dossier vollständig zurückzuweisen. Alle fehlenden Punkte müssen im Kommentar aufgelistet werden.",
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
        briefing: "Du erhältst eine Neueröffnung für einen hochrangigen Diplomaten zur Prüfung.",
        dossierTitle: "Jean-Baptiste Mbeki – Privatkonto",
        dossierFields: [
          { label: "Name", value: "Jean-Baptiste Mbeki", status: "ok" },
          { label: "Beruf", value: "Botschafter", status: "ok" },
          { label: "Arbeitgeber", value: "Botschaft Republik Kongo", status: "ok" },
          { label: "Einkommen", value: "CHF 200'000/Jahr", status: "ok" },
          { label: "Vermögen", value: "CHF 2'000'000", status: "ok" },
          { label: "Herkunft der Mittel", value: "Lohn, Immobilien", status: "ok" },
          { label: "PEP Status", value: "Nicht dokumentiert", status: "missing" },
          { label: "Erhöhte Sorgfalt", value: "Nicht vermerkt", status: "missing" },
          { label: "Genehmigung GL", value: "fehlt", status: "missing" },
          { label: "Formular A", value: "Ausgefüllt", status: "ok" },
          { label: "Ausweis", value: "Gültig", status: "ok" },
        ],
        checklistItems: [
          { id: "pep", label: "PEP-Status nicht dokumentiert", isIssue: true },
          { id: "sorgfalt", label: "Erhöhte Sorgfalt nicht vermerkt", isIssue: true },
          { id: "genehmigung", label: "Genehmigung Geschäftsleitung fehlt", isIssue: true },
          { id: "formular", label: "Formular A fehlt", isIssue: false },
          { id: "ausweis", label: "Ausweis ungültig", isIssue: false },
        ],
        commentHint:
          "Kunde ist als PEP einzustufen. PEP-Vermerk, erhöhte Sorgfalt und Genehmigung der Geschäftsleitung fehlen.",
        feedback:
          "PEPs erfordern erhöhte Sorgfalt gemäss GwG Art. 6 und Genehmigung der Geschäftsleitung.",
      },
      {
        type: "mc",
        id: "3.2",
        level: 3,
        briefing:
          "Du erhältst eine Neueröffnung zur Prüfung. Achte auf die Plausibilität der Angaben.",
        dossierTitle: "Kevin Steiner – Privatkonto",
        dossierFields: [
          { label: "Name", value: "Kevin Steiner", status: "ok" },
          { label: "Beruf", value: "Lagerist", status: "ok" },
          { label: "Arbeitgeber", value: "Migros Verteilzentrum", status: "ok" },
          { label: "Einkommen", value: "CHF 58'000/Jahr", status: "suspicious" },
          { label: "Vermögen", value: "CHF 1'800'000", status: "suspicious" },
          { label: "Herkunft der Mittel", value: "Erspartes", status: "suspicious" },
          { label: "Formular A", value: "Ausgefüllt", status: "ok" },
          { label: "Ausweis", value: "Gültig", status: "ok" },
        ],
        question: "Was stellst du fest?",
        options: [
          { key: "A", text: "Freigeben – alles ist ausgefüllt" },
          { key: "B", text: "Einkommen fehlt" },
          {
            key: "C",
            text: "Vermögen und Einkommen passen nicht zusammen – Herkunft muss genauer dokumentiert werden",
          },
          { key: "D", text: "Formular A ist falsch" },
        ],
        correct: "C",
        commentHint:
          "Vermögen CHF 1'800'000 bei Jahreslohn CHF 58'000 nicht plausibel. Herkunft der Mittel detailliert dokumentieren (Erbschaft, Immobilienverkauf etc.).",
        feedback:
          "Widersprüchliche Angaben sind ein möglicher Geldwäscherei-Indikator. Plausibilitätsprüfung ist Kernaufgabe der Erstkontrolle.",
      },
      {
        type: "mc",
        id: "3.3",
        level: 3,
        briefing:
          "Du erhältst einen komplexen Fall zur Prüfung. Beurteile das Dossier sorgfältig.",
        dossierTitle: "Viktor Petrov – Privatkonto",
        dossierFields: [
          { label: "Name", value: "Viktor Petrov", status: "ok" },
          { label: "Adresse", value: "Goldküste 88, 8700 Küsnacht", status: "ok" },
          { label: "Familiäre Situation", value: "Verheiratet", status: "ok" },
          { label: "Beruf", value: "Unternehmer (zu ungenau)", status: "missing" },
          { label: "Arbeitgeber", value: "leer", status: "missing" },
          { label: "Einkommen", value: "leer", status: "missing" },
          { label: "Vermögen", value: "CHF 5'000'000", status: "suspicious" },
          { label: "Herkunft der Mittel", value: "Business", status: "suspicious" },
          { label: "PEP Prüfung", value: "nicht dokumentiert", status: "missing" },
          { label: "Formular A", value: "Ausgefüllt", status: "ok" },
          { label: "Ausweis", value: "Gültig", status: "ok" },
        ],
        question: "Was ist die richtige Entscheidung?",
        options: [
          { key: "A", text: "Freigeben – Formular A ist vorhanden" },
          { key: "B", text: "Nur Beruf nachfordern" },
          {
            key: "C",
            text: "Vollständig zurückweisen – Beruf ungenau, Arbeitgeber fehlt, Einkommen fehlt, Herkunft unplausibel, PEP-Prüfung fehlt",
          },
          { key: "D", text: "Vorgesetzten informieren und abwarten" },
        ],
        correct: "C",
        commentHint:
          "Zurückgewiesen: 1. Beruf zu ungenau, 2. Arbeitgeber fehlt, 3. Einkommen fehlt, 4. Herkunft CHF 5'000'000 nicht belegt, 5. PEP-Prüfung fehlt.",
        feedback:
          "Bei hohen Einlagen und unklarer Herkunft ist besondere Vorsicht geboten. 'Empfohlen und nett' ersetzt keine sorgfältige KYC-Dokumentation.",
      },
    ],
  },
];
