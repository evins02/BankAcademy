export type LevelNum = 1 | 2 | 3;

export interface FondsOption {
  key: string;
  text: string;
}

export interface FondsCase {
  id: string;
  level: LevelNum;
  title: string;
  situation: string;
  question: string;
  options: FondsOption[];
  correct: string;
  feedback: string;
}

export interface FondsLevel {
  level: LevelNum;
  label: string;
  badgeVariant: "green" | "orange" | "red";
  cases: FondsCase[];
}

// ─────────────────────────────────────────────────────────
// LEVEL 1 – Einsteiger
// ─────────────────────────────────────────────────────────

const L1_CASES: FondsCase[] = [
  {
    id: "1.1",
    level: 1,
    title: "Richtige Strategie empfehlen",
    situation:
      "Kundin Anna, 35 Jahre, angestellt, möchte CHF 10'000 anlegen. Sie sagt: 'Ich möchte etwas mehr Rendite als auf dem Sparkonto aber kein grosses Risiko. Ich brauche das Geld in ca. 8 Jahren.'",
    question: "Welche Strategie empfiehlst du?",
    options: [
      { key: "A", text: "Aggressiv – maximale Rendite für maximalen Ertrag" },
      { key: "B", text: "Sparkonto – kein Risiko, sicher" },
      {
        key: "C",
        text: "Ertrag oder Ausgewogen – moderate Rendite, überschaubares Risiko, 8 Jahre Horizont passt gut",
      },
      { key: "D", text: "Wachstum – guter Kompromiss zwischen Rendite und Risiko" },
    ],
    correct: "C",
    feedback:
      "Ertrag oder Ausgewogen passt am besten: mehr Rendite als das Sparkonto bei überschaubarem Risiko. 8 Jahre Anlagehorizont ist gut für bis zu 50% Aktienanteil geeignet. Aggressiv wäre zu riskant für diesen Horizont und Wunsch nach 'nicht grossem Risiko'.",
  },
  {
    id: "1.2",
    level: 1,
    title: "Fonds einfach erklären",
    situation:
      "Kunde fragt: 'Was ist eigentlich ein Fonds? Ich höre das immer, aber verstehe es nicht.'",
    question: "Was erklärst du?",
    options: [
      { key: "A", text: "\"Das ist zu kompliziert zu erklären – lesen Sie die Unterlagen\"" },
      {
        key: "B",
        text: "\"Ein Fonds bündelt das Geld vieler Anleger. Damit werden viele verschiedene Wertschriften gekauft – Aktien, Obligationen usw. Das reduziert das Risiko, weil nicht alles auf eine Karte gesetzt wird.\"",
      },
      {
        key: "C",
        text: "\"Ein Fonds ist wie ein Sparkonto, nur mit mehr Zins\"",
      },
      { key: "D", text: "\"Das ist eine Art Versicherung für Ihr Geld\"" },
    ],
    correct: "B",
    feedback:
      "Fonds = Diversifikation. Viele Anleger, viele Anlagen, weniger Einzelrisiko. Ein gutes Bild für Kunden: 'Statt eine Aktie zu kaufen, kaufen Sie einen Korb mit hundert verschiedenen Aktien.' Das macht Verluste einzelner Titel weniger schmerzhaft.",
  },
  {
    id: "1.3",
    level: 1,
    title: "Sparkonto vs. Fonds",
    situation:
      "Kunde, 40 Jahre, hat CHF 20'000 seit 5 Jahren auf dem Sparkonto liegen. Er fragt, ob das klug ist.",
    question: "Was sagst du ihm?",
    options: [
      { key: "A", text: "\"Ja, Sparkonto ist immer am besten – Sicherheit geht vor\"" },
      {
        key: "B",
        text: "\"Sparkonto ist sicher, aber der Zins ist tief. Bei einem Horizont von 10+ Jahren könnte ein Fonds deutlich mehr Rendite bringen. Wichtig: Nur Geld anlegen, das Sie nicht kurzfristig brauchen.\"",
      },
      { key: "C", text: "\"Sofort alles in Aktien investieren – Sparkonto ist zu langweilig\"" },
      { key: "D", text: "\"Sparkonto auflösen und in die Säule 3a einzahlen\"" },
    ],
    correct: "B",
    feedback:
      "Sparkonto = Sicherheit aber tiefe Rendite. Fonds = höhere Rendite aber mit Schwankungen. Faustregel: Notreserve (3–6 Monatslöhne) immer auf dem Sparkonto. Alles darüber kann angelegt werden, wenn der Horizont lang genug ist.",
  },
];

// ─────────────────────────────────────────────────────────
// LEVEL 2 – Fortgeschritten
// ─────────────────────────────────────────────────────────

const L2_CASES: FondsCase[] = [
  {
    id: "2.1",
    level: 2,
    title: "Widerspruch im Anlegerprofil",
    situation:
      "Neukunde, 50 Jahre, möchte CHF 50'000 anlegen. Er sagt: 'Ich will gute Rendite, aber wenn der Markt fällt, verkaufe ich sofort alles.'",
    question: "Was fällt dir auf?",
    options: [
      {
        key: "A",
        text: "Kein Problem – Wachstum empfehlen wie gewünscht",
      },
      {
        key: "B",
        text: "Widerspruch erkannt: Hohe Rendite braucht langen Horizont und Geduld bei Kursrückgängen. Wer bei Rückgang sofort verkauft, realisiert Verluste. Das Anlegerprofil zeigt eher Ertrag-Strategie.",
      },
      { key: "C", text: "Aggressiv – maximale Rendite ist immer am besten" },
      { key: "D", text: "Sparkonto empfehlen – kein Risiko" },
    ],
    correct: "B",
    feedback:
      "Risikobereitschaft und Risikofähigkeit müssen übereinstimmen. Wer bei –20% sofort verkauft, hat keine echte Risikobereitschaft für Wachstum oder Aggressiv. Hier passt Ertrag besser – weniger Schwankungen, ruhigerer Schlaf und keine voreiligen Verkäufe.",
  },
  {
    id: "2.2",
    level: 2,
    title: "Horizont entscheidet",
    situation:
      "Kundin, 62 Jahre, geht in 3 Jahren in Pension. Sie hat CHF 80'000 und fragt, ob sie noch in Fonds investieren soll.",
    question: "Was empfiehlst du?",
    options: [
      { key: "A", text: "Ja – Wachstum für maximale Rendite in den letzten Jahren" },
      {
        key: "B",
        text: "Bei 3 Jahren Horizont und naher Pensionierung empfehle ich maximal Ertrag-Strategie oder Sparkonto. Aktien brauchen mind. 5 Jahre – bei einem Kursrückgang kurz vor der Pension wäre das fatal.",
      },
      {
        key: "C",
        text: "Ausgewogen ist immer eine gute Wahl für alle",
      },
      { key: "D", text: "Alles in die Säule 3a einzahlen für Steuervorteile" },
    ],
    correct: "B",
    feedback:
      "Der Anlagehorizont ist entscheidend! 3 Jahre = zu kurz für hohen Aktienanteil. Das Risiko eines Kursrückgangs kurz vor der Pensionierung ist nicht tragbar – das Kapital wird dann gebraucht. Ertrag oder Sparkonto als sichere Wahl für diesen Fall.",
  },
  {
    id: "2.3",
    level: 2,
    title: "Kostenvergleich TER",
    situation:
      "Kunde vergleicht zwei Fonds: Fonds A mit TER 0.3%, Fonds B mit TER 1.8%. Er fragt, ob das wichtig ist.",
    question: "Was erklärst du?",
    options: [
      {
        key: "A",
        text: "\"Kosten sind unwichtig – nur die Rendite zählt\"",
      },
      {
        key: "B",
        text: "\"TER ist sehr wichtig! Bei CHF 50'000 Anlage: Fonds A kostet CHF 150/Jahr, Fonds B kostet CHF 900/Jahr. Über 10 Jahre: CHF 7'500 Unterschied – nur wegen der Kosten.\"",
      },
      {
        key: "C",
        text: "\"Höhere Kosten bedeuten bessere Qualität und mehr Rendite\"",
      },
      { key: "D", text: "\"TER unter 2% ist immer in Ordnung\"" },
    ],
    correct: "B",
    feedback:
      "TER (Total Expense Ratio) ist die jährliche Gesamtkostenquote eines Fonds. Tiefere Kosten = mehr Rendite für den Kunden. ETFs haben oft deutlich tiefere TER als aktiv verwaltete Fonds. Kosten immer vergleichen – sie machen über lange Zeiträume einen grossen Unterschied.",
  },
];

// ─────────────────────────────────────────────────────────
// LEVEL 3 – LAP-Niveau
// ─────────────────────────────────────────────────────────

const L3_CASES: FondsCase[] = [
  {
    id: "3.1",
    level: 3,
    title: "Komplexes Anlegerprofil – Ehepaar",
    situation:
      "Ehepaar, beide 45 Jahre: Mann möchte sicher investieren, kein Risiko. Frau möchte maximale Rendite, langfristig. Gemeinsames Depot, CHF 100'000, Horizont 15 Jahre.",
    question: "Was empfiehlst du?",
    options: [
      { key: "A", text: "Aggressiv – die Frau hat recht, 15 Jahre reichen" },
      { key: "B", text: "Sparkonto – der Mann hat recht, Sicherheit geht vor" },
      {
        key: "C",
        text: "Ausgewogen als Kompromiss für gemeinsames Depot – beide Bedürfnisse berücksichtigt, 15 Jahre Horizont passt. Oder: zwei separate Depots mit je eigener Strategie.",
      },
      { key: "D", text: "Ertrag – sicher für beide, ohne Kompromiss" },
    ],
    correct: "C",
    feedback:
      "Bei unterschiedlichen Risikoprofilen gibt es zwei gute Lösungen: 1. Kompromiss-Strategie (Ausgewogen) für das gemeinsame Depot. 2. Separate Depots mit je eigener, passgenaue Strategie. Option 2 ist oft besser – jeder hat sein passendes Profil ohne Abstriche.",
  },
  {
    id: "3.2",
    level: 3,
    title: "Marktrückgang – Kunde in Panik",
    situation:
      "Kunde ruft aufgeregt an: 'Mein Fonds ist 15% gefallen! Ich will sofort alles verkaufen!'",
    question: "Was sagst du ihm?",
    options: [
      {
        key: "A",
        text: "\"Ja, sofort verkaufen – Verluste jetzt stoppen bevor es schlimmer wird\"",
      },
      {
        key: "B",
        text: "\"Ich verstehe Ihre Sorge. Aber Verkaufen beim Tiefstand realisiert den Verlust. Ihr Horizont ist noch 10 Jahre – Märkte haben sich historisch immer erholt. Ruhe bewahren und Strategie nicht ändern.\"",
      },
      { key: "C", text: "\"Warten Sie bis morgen und entscheiden Sie dann\"" },
      { key: "D", text: "\"In andere Fonds wechseln – das löst das Problem\"" },
    ],
    correct: "B",
    feedback:
      "Klassischer Fehler: Verkaufen im Tief, kaufen im Hoch – genau das Gegenteil von richtig. Langfristiger Horizont = kurzfristige Schwankungen aushalten. Historisch erholen sich Aktienmärkte nach jedem Rückgang. Strategie nur ändern, wenn sich die Lebenssituation ändert – nicht wegen Marktbewegungen.",
  },
  {
    id: "3.3",
    level: 3,
    title: "LAP-Trickfall: Effektiver Horizont",
    situation:
      "Kunde, 38 Jahre, möchte CHF 30'000 anlegen. Anlegerprofil: Wachstum. Horizont laut Profil: 7 Jahre. Er sagt aber: 'Ich brauche das Geld spätestens in 3 Jahren für einen Hauskauf.'",
    question: "Was machst du?",
    options: [
      {
        key: "A",
        text: "Wachstum wie im Profil angegeben – er hat es so unterschrieben",
      },
      {
        key: "B",
        text: "Anlegerprofil muss angepasst werden! Der effektive Horizont ist 3 Jahre, nicht 7. Bei Wachstum riskiert er beim Hauskauf einen Kursrückgang. Empfehlung: Sparkonto oder Ertrag für diesen Betrag.",
      },
      { key: "C", text: "Wachstum für 3 Jahre ist noch akzeptabel" },
      { key: "D", text: "Die Anlage ablehnen – zu kompliziert" },
    ],
    correct: "B",
    feedback:
      "Der effektive Anlagehorizont ist der kürzere! Nicht was der Kunde unterschrieben hat, sondern wann er das Geld wirklich braucht. Das Anlegerprofil muss der Realität entsprechen – der Berater hat eine Beratungspflicht. Ein falsches Profil ist ein Haftungsrisiko.",
  },
];

// ─────────────────────────────────────────────────────────
// LEVEL CONFIG
// ─────────────────────────────────────────────────────────

export const FONDS_LEVELS: FondsLevel[] = [
  { level: 1, label: "Einsteiger", badgeVariant: "green", cases: L1_CASES },
  { level: 2, label: "Fortgeschritten", badgeVariant: "orange", cases: L2_CASES },
  { level: 3, label: "LAP-Niveau", badgeVariant: "red", cases: L3_CASES },
];
