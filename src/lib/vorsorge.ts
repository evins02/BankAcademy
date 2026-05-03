export type LevelNum = 1 | 2 | 3;

export interface VorsorgeOption {
  key: string;
  text: string;
}

export interface SteuervorteilCalc {
  type: "steuervorteil";
  einzahlungMax: number;
  defaultTaxRate: number;
}

export interface TragbarkeitRenteCalc {
  type: "tragbarkeit-rente";
  ahv: number;
  pk: number;
  hypothek: number;
  zinsSatz: number;
  amortisation: number;
  nebenkosten: number;
  limite: number;
}

export type VorsorgeCalc = SteuervorteilCalc | TragbarkeitRenteCalc;

export interface VorsorgeCase {
  id: string;
  level: LevelNum;
  title: string;
  situation: string;
  question: string;
  options: VorsorgeOption[];
  correct: string;
  feedback: string;
  calculator?: VorsorgeCalc;
}

export interface VorsorgeLevel {
  level: LevelNum;
  label: string;
  badgeVariant: "green" | "orange" | "red";
  cases: VorsorgeCase[];
}

// ─────────────────────────────────────────────────────────
// LEVEL 1 – Einsteiger
// ─────────────────────────────────────────────────────────

const L1_CASES: VorsorgeCase[] = [
  {
    id: "1.1",
    level: 1,
    title: "Die 3 Säulen erklären",
    situation:
      "Junger Kunde, 22 Jahre, fragt: 'Ich höre immer von den 3 Säulen – was bedeutet das eigentlich?'",
    question: "Was erklärst du ihm?",
    options: [
      { key: "A", text: "\"Das ist zu kompliziert zum Erklären – fragen Sie Ihren Steuerberater\"" },
      {
        key: "B",
        text: "\"Die 3 Säulen sind das Schweizer Vorsorgesystem. 1. Säule = AHV, staatlich, für alle. 2. Säule = Pensionskasse, beruflich, über Arbeitgeber. 3. Säule = privat, freiwillig, steuerlich attraktiv.\"",
      },
      { key: "C", text: "\"Das regelt der Staat – Sie müssen sich nicht darum kümmern\"" },
      { key: "D", text: "\"Nur die 3a ist für Sie relevant\"" },
    ],
    correct: "B",
    feedback:
      "Die 3 Säulen bilden zusammen die Schweizer Altersvorsorge. Ziel: Im Alter ca. 60% des letzten Lohns als Rente erhalten. 1. und 2. Säule alleine reichen oft nicht – deshalb ist die 3. Säule als private Ergänzung besonders wichtig.",
  },
  {
    id: "1.2",
    level: 1,
    title: "Säule 3a empfehlen",
    situation:
      "Kundin, 28 Jahre, angestellt, sagt: 'Ich möchte fürs Alter sparen und dabei Steuern sparen. Was empfehlen Sie mir?'",
    question: "Was empfiehlst du?",
    options: [
      { key: "A", text: "Sparkonto – sicher und flexibel verfügbar" },
      {
        key: "B",
        text: "Säule 3a – steuerlich abzugsfähig, bis CHF 7'258 pro Jahr einzahlbar, Geld ist bis zur Pensionierung gebunden",
      },
      { key: "C", text: "Direkt Aktien kaufen – höhere Rendite" },
      {
        key: "D",
        text: "Säule 3b – flexibler als 3a, jederzeit verfügbar",
      },
    ],
    correct: "B",
    feedback:
      "Säule 3a ist ideal für Steueroptimierung und Altersvorsorge. Einzahlungen sind vollständig vom steuerbaren Einkommen abziehbar. Maximum 2026: CHF 7'258 pro Jahr. Das Geld ist bis 5 Jahre vor Pensionierung gebunden – Ausnahmen (z.B. Eigenheim, Auswanderung) sind möglich.",
  },
  {
    id: "1.3",
    level: 1,
    title: "3a vs. 3b",
    situation: "Kunde fragt: 'Was ist der Unterschied zwischen 3a und 3b?'",
    question: "Was erklärst du?",
    options: [
      { key: "A", text: "\"Kein Unterschied – beides ist privates Sparen\"" },
      {
        key: "B",
        text: "\"3a ist gebunden und steuerlich abzugsfähig – maximaler Einzahlungsbetrag pro Jahr. 3b ist frei – keine Limite, keine Steuervergünstigung, jederzeit verfügbar.\"",
      },
      { key: "C", text: "\"3b ist besser weil man flexibler ist\"" },
      { key: "D", text: "\"3a ist nur für Selbständige geeignet\"" },
    ],
    correct: "B",
    feedback:
      "3a = gebunden, Steuervorteil, Maximum CHF 7'258 (Angestellte). 3b = frei, kein Steuervorteil, kein Maximum, jederzeit verfügbar. Empfehlung: Zuerst 3a maximal ausschöpfen um den Steuervorteil zu nutzen, dann 3b für flexible Zusatzersparnisse.",
  },
];

// ─────────────────────────────────────────────────────────
// LEVEL 2 – Fortgeschritten
// ─────────────────────────────────────────────────────────

const L2_CASES: VorsorgeCase[] = [
  {
    id: "2.1",
    level: 2,
    title: "Steuervorteil berechnen",
    situation:
      "Kunde mit Grenzsteuersatz 25% möchte wissen, wie viel er spart, wenn er CHF 7'258 in die 3a einzahlt.",
    question: "Was sagst du dem Kunden?",
    options: [
      { key: "A", text: "\"Sie sparen ungefähr CHF 500\"" },
      {
        key: "B",
        text: "\"Bei Grenzsteuersatz 25% sparen Sie CHF 1'814.50 Steuern – einfach durch die 3a Einzahlung von CHF 7'258.\"",
      },
      { key: "C", text: "\"Der Steuervorteil ist minimal, lohnt sich kaum\"" },
      { key: "D", text: "\"Das kann ich nicht berechnen – fragen Sie das Steueramt\"" },
    ],
    correct: "B",
    feedback:
      "Steuerersparnis = Einzahlung × Grenzsteuersatz. CHF 7'258 × 25% = CHF 1'814.50. Das ist fast ein Monatslohn gespart – jedes Jahr! Je höher das Einkommen und der Grenzsteuersatz, desto grösser der Steuervorteil der 3a-Einzahlung.",
    calculator: {
      type: "steuervorteil",
      einzahlungMax: 7258,
      defaultTaxRate: 25,
    },
  },
  {
    id: "2.2",
    level: 2,
    title: "Vorzeitiger 3a-Bezug",
    situation:
      "Kunde, 45 Jahre, fragt: 'Kann ich mein 3a-Geld vorzeitig beziehen? Ich brauche es für eine Renovation.'",
    question: "Was erklärst du ihm?",
    options: [
      { key: "A", text: "\"Ja, jederzeit möglich – das ist Ihr Geld\"" },
      {
        key: "B",
        text: "\"Vorzeitiger Bezug ist nur unter bestimmten Bedingungen möglich: Kauf Eigenheim, WEF-Renovation, Aufnahme Selbständigkeit, Auswanderung oder Invalidität. Eine Renovation für eine Mietwohnung reicht nicht.\"",
      },
      { key: "C", text: "\"Nein – niemals möglich vor der Pensionierung\"" },
      { key: "D", text: "\"Ab 50 Jahren immer möglich\"" },
    ],
    correct: "B",
    feedback:
      "3a-Vorbezug ist möglich, aber nur für spezifische Zwecke: WEF (Wohneigentumsförderung – Kauf oder wertvermehrende Renovation des Eigenheims), Aufnahme Selbständigkeit, Auswanderung, Invalidität oder Tod. Renovation einer Mietwohnung ist nicht anrechenbar.",
  },
  {
    id: "2.3",
    level: 2,
    title: "Zweites 3a-Konto",
    situation:
      "Kundin hat CHF 65'000 auf einem einzigen 3a-Konto. Sie fragt ob das okay ist.",
    question: "Was empfiehlst du?",
    options: [
      {
        key: "A",
        text: "\"Alles gut – je mehr auf einem Konto, desto besser\"",
      },
      {
        key: "B",
        text: "\"Ab CHF 50'000 empfehle ich ein zweites 3a-Konto zu eröffnen. Beim Bezug werden 3a-Konten separat besteuert – gestaffelte Bezüge über mehrere Jahre reduzieren die Steuerbelastung massiv.\"",
      },
      { key: "C", text: "\"3a-Konto saldieren und komplett neu anlegen\"" },
      { key: "D", text: "\"Es gibt einen Maximalbetrag von CHF 50'000\"" },
    ],
    correct: "B",
    feedback:
      "3a-Bezüge werden separat vom ordentlichen Einkommen besteuert – zu einem reduzierten Satz. Bei mehreren Konten können Bezüge über verschiedene Jahre gestaffelt werden, was jedes Mal einen tieferen Steuersatz ergibt. Ab CHF 50'000 ist ein zweites Konto dringend empfohlen!",
  },
];

// ─────────────────────────────────────────────────────────
// LEVEL 3 – LAP-Niveau
// ─────────────────────────────────────────────────────────

const L3_CASES: VorsorgeCase[] = [
  {
    id: "3.1",
    level: 3,
    title: "Tragbarkeit im Rentenalter",
    situation:
      "Kunde, 52 Jahre, möchte Hypothek CHF 600'000. Einkommen heute CHF 120'000. PK-Rente laut Ausweis CHF 24'000/Jahr. Pensionierung in 13 Jahren.",
    question: "Was sagst du dem Kunden?",
    options: [
      {
        key: "A",
        text: "\"Alles gut – die heutige Tragbarkeit ist gegeben, Hypothek kann bewilligt werden\"",
      },
      {
        key: "B",
        text: "\"Tragbarkeit im Rentenalter nicht gegeben. 82.4% liegt massiv über der Limite von 38%. Die Hypothek muss vor Pensionierung stärker amortisiert oder der Betrag reduziert werden.\"",
      },
      {
        key: "C",
        text: "\"Nur die heutige Tragbarkeit zählt – Rentenalter ist in 13 Jahren noch weit weg\"",
      },
      { key: "D", text: "\"Lösung: PK-Rente erhöhen durch Einkauf\"" },
    ],
    correct: "B",
    feedback:
      "Tragbarkeit muss HEUTE und im RENTENALTER gegeben sein. Rentenalter Limite: 38%. 82.4% ist nicht akzeptabel. Lösung: Mehr amortisieren vor der Pensionierung oder günstigeres Objekt wählen. PK-Einkauf wäre möglich, aber reicht alleine nicht.",
    calculator: {
      type: "tragbarkeit-rente",
      ahv: 29400,
      pk: 24000,
      hypothek: 600000,
      zinsSatz: 5,
      amortisation: 6000,
      nebenkosten: 8000,
      limite: 38,
    },
  },
  {
    id: "3.2",
    level: 3,
    title: "Nachzahlung 3a ab 2026",
    situation:
      "Kunde, 40 Jahre, sagt: 'Ich habe 2025 vergessen in die 3a einzuzahlen. Sind diese CHF 7'000 verloren?'",
    question: "Was antwortest du?",
    options: [
      { key: "A", text: "\"Ja leider – vergangene Jahre können nicht nachgeholt werden\"" },
      {
        key: "B",
        text: "\"Nein! Ab 2026 können verpasste Einzahlungen ab 2025 nachgeholt werden. Bedingung: Der aktuelle Maximalbetrag CHF 7'258 muss zuerst vollständig einbezahlt sein. Lücken vor 2025 leider nicht nachholbar.\"",
      },
      {
        key: "C",
        text: "\"Einfach dieses Jahr doppelt einzahlen – das zählt als Nachzahlung\"",
      },
      { key: "D", text: "\"Nachzahlung ist nur für Selbständige möglich\"" },
    ],
    correct: "B",
    feedback:
      "Neue Regelung ab 2026: Beitragslücken ab dem Jahr 2025 können nachgeholt werden. Bedingung: Der aktuelle Maximalbetrag (CHF 7'258) muss im laufenden Jahr zuerst vollständig ausgeschöpft sein. Lücken vor 2025 sind nicht nachholbar. Nachzahlungen sind ebenfalls steuerlich abzugsfähig!",
  },
  {
    id: "3.3",
    level: 3,
    title: "Optimale 3a-Strategie – Selbständiger",
    situation:
      "Neukunde, selbständig erwerbend, kein PK-Anschluss, Jahreseinkommen CHF 180'000. Fragt nach optimaler 3a-Strategie.",
    question: "Was empfiehlst du?",
    options: [
      {
        key: "A",
        text: "\"Gleich wie Angestellte – CHF 7'258 einzahlen\"",
      },
      {
        key: "B",
        text: "\"Als Selbständiger ohne PK können Sie bis zu 20% des Nettoeinkommens einzahlen – Maximum CHF 36'288. Bei CHF 180'000 Einkommen: CHF 36'000 möglich. Empfehlung: Mehrere 3a-Konten für gestaffelte Bezüge.\"",
      },
      {
        key: "C",
        text: "\"Selbständige dürfen keine Säule 3a einzahlen\"",
      },
      {
        key: "D",
        text: "\"Maximum CHF 7'258 – wie alle anderen auch\"",
      },
    ],
    correct: "B",
    feedback:
      "Selbständige ohne PK-Anschluss haben ein höheres 3a-Maximum: 20% des Nettoeinkommens, maximal CHF 36'288. Bei CHF 180'000 Einkommen: CHF 36'000 möglich. Die Steuerersparnis ist enorm! Mehrere Konten für gestaffelte Bezüge bei Pensionierung sind sehr empfehlenswert.",
  },
];

// ─────────────────────────────────────────────────────────
// LEVEL CONFIG
// ─────────────────────────────────────────────────────────

export const VORSORGE_LEVELS: VorsorgeLevel[] = [
  { level: 1, label: "Einsteiger", badgeVariant: "green", cases: L1_CASES },
  { level: 2, label: "Fortgeschritten", badgeVariant: "orange", cases: L2_CASES },
  { level: 3, label: "LAP-Niveau", badgeVariant: "red", cases: L3_CASES },
];
