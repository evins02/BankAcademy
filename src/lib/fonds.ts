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
  warum?: string;
  inDerPraxis?: string;
  merksatz?: string;
  glossarTerm?: string;
  rechtsgrundlage?: string;
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
    warum:
      "Das Anlegerprofil basiert auf drei Säulen: Risikofähigkeit (finanziell), Risikobereitschaft (psychologisch) und Anlagehorizont. Anna hat 8 Jahre Zeit, will aber keine grossen Verluste erleben. Das beschreibt klassisch Ertrag oder Ausgewogen – moderate Aktienquote, dämpft Schwankungen, ermöglicht trotzdem Rendite über Inflation.",
    inDerPraxis:
      "In der Beratung dokumentieren wir jede Strategie-Empfehlung im Anlegerprofil mit Begründung. Bei MiFID-Anforderungen muss die Eignung nachgewiesen werden. Wenn ein Kunde später klagt, schaut die Compliance genau auf dieses Dokument. Eine gut begründete Empfehlung schützt dich und die Bank.",
    merksatz:
      "Strategie = Horizont + Risikofähigkeit + Risikobereitschaft. Alle drei müssen passen, sonst passt die Strategie nicht.",
    glossarTerm: "Anlegerprofil",
    rechtsgrundlage: "FIDLEG Art. 12 Abs. 1 (Eignungsprüfung)",
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
    warum:
      "Fonds funktionieren durch Diversifikation: Statt einer Aktie kauft man einen Korb aus vielen Wertschriften. Fällt eine Aktie um 50%, ist das im Fonds nur ein kleiner Teil des Gesamtportfolios. Das einzelne Ausfallrisiko wird dramatisch reduziert – das ist die Kernidee seit John Bogles erstem Indexfonds 1976.",
    inDerPraxis:
      "Als Berater erkläre ich komplexe Produkte immer mit einem konkreten Bild. Der Korb-Vergleich ist klassisch und funktioniert. Kunden die ein Produkt nicht verstehen, kaufen es entweder nicht (verlorener Abschluss) oder kaufen es unüberlegt (Reklamation). Verständlichkeit ist Beratungsqualität.",
    merksatz: "Ein Fonds = viele Anleger, viele Anlagen, weniger Einzelrisiko. Nicht Sparkonto, nicht Versicherung.",
    glossarTerm: "Diversifikation",
    rechtsgrundlage: "FIDLEG Art. 10 Abs. 2 (Kundenkategorisierung)",
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
    warum:
      "Inflation frisst die Kaufkraft: Bei 1.5% Inflation verliert CHF 20'000 über 10 Jahre real rund CHF 2'800 an Wert, wenn das Geld auf dem Sparkonto bleibt. Historisch haben ausgewogene Fonds nach 10 Jahren deutlich besser abgeschnitten. Der Kunde mit 40 Jahren hat potenziell 25 Jahre bis zur Pension – genug Zeit für Marktschwankungen.",
    inDerPraxis:
      "Viele Kunden lassen Geld jahrelang auf dem Sparkonto, weil es 'sicher' fühlt. Die Beratungsaufgabe ist, die versteckten Kosten der Inflation aufzuzeigen – ohne zu drängen. Wichtig: Immer die Notreserve (3–6 Monatslöhne) auf dem Sparkonto lassen. Nur das darüber hinausgehende Kapital besprechen.",
    merksatz:
      "Notreserve auf Sparkonto, den Rest anlegen wenn Horizont lang genug. Sicherheit hat ihren Preis: schleichender Kaufkraftverlust.",
    glossarTerm: "Inflation",
    rechtsgrundlage: "FIDLEG Art. 12 Abs. 2 (Angemessenheitsprüfung)",
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
    warum:
      "Der Widerspruch ist eindeutig: Hohe Renditeerwartung setzt psychologische Stabilität bei Kursschwankungen voraus. Wer bei –15% sofort verkauft, realisiert den Verlust im schlechtesten Moment. Wachstum mit ~75% Aktienanteil kann –30% oder mehr erleben. Das passt nicht zu 'sofort alles verkaufen'.",
    inDerPraxis:
      "In der Praxis führen falsch eingestufte Profile zu Kundenbeschwerden und Haftungsrisiken. Der Berater muss Widersprüche im Gespräch aktiv ansprechen: 'Sie möchten hohe Rendite, aber auch Sicherheit bei Kursrückgängen – das schliesst sich teilweise aus. Ich empfehle, das gemeinsam anzupassen.' Compliance und Revision prüfen diese Gespräche.",
    merksatz:
      "Wer bei Kursschwankungen panisch reagiert, hat einen zu hohen Aktienanteil. Risikoprofil = was der Kunde wirklich aushält, nicht was er möchte.",
    glossarTerm: "Risikoprofil",
    rechtsgrundlage: "FIDLEG Art. 9 (Informations- und Offenlegungspflichten)",
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
    warum:
      "Die Pensionierung ist ein harter Zeitpunkt: Das Kapital wird zu einem fixen Datum benötigt. Aktien können in einem schlechten Jahr –30% verlieren und 3–5 Jahre brauchen, um sich zu erholen. Bei 62 Jahren bleibt keine Zeit für Erholung. Kapitalerhaltung hat absolute Priorität vor Rendite.",
    inDerPraxis:
      "Pensionskasse-Auszahlungen, AHV-Beginn und Lebensplanung sind zeitkritisch. Der Berater muss den genauen Liquiditätsbedarf kennen. In der Praxis: Teile des Kapitals können länger angelegt bleiben (z.B. CHF 20'000 für 10 Jahre), der Rest muss sicher sein. Dieser Ansatz nennt sich Buckets-Strategie und ist in der Pensionsplanung Standard.",
    merksatz:
      "Je kürzer der Horizont, desto mehr Kapitalerhaltung, desto weniger Aktien. Faustregel: Unter 5 Jahren kein wesentlicher Aktienanteil.",
    glossarTerm: "Anlagehorizont",
    rechtsgrundlage: "FIDLEG Art. 9 Abs. 2 (Kosten- und Gebührentransparenz)",
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
    warum:
      "TER-Unterschied von 1.5% klingt gering, macht aber auf CHF 50'000 über 10 Jahre rund CHF 7'500 aus – und durch den Zinseszinseffekt sogar mehr. Studien zeigen: Aktiv verwaltete Fonds schlagen ihren Index nach Kosten auf lange Sicht selten. Tiefere Kosten sind der sicherste Weg zu mehr Nettorendite.",
    inDerPraxis:
      "Seit MiFID II sind Berater verpflichtet, TER, Ausgabeaufschläge und Retrozessionen offen zu legen. Kunden müssen die Gesamtkosten kennen, bevor sie investieren. In der Praxis vergleichen erfahrene Berater immer die All-in-Costs. Ein teurer Fonds muss seinen Mehrpreis durch Mehrrendite rechtfertigen – was selten passiert.",
    merksatz:
      "1% mehr Kosten = bis zu 20% weniger Endvermögen über 20 Jahre (Zinseszins). TER ist die fairste Renditebremse.",
    glossarTerm: "TER",
    rechtsgrundlage: "FIDLEG Art. 12 (Eignung und Angemessenheit)",
  },
];

// ─────────────────────────────────────────────────────────
// LEVEL 3 – Challenge-Niveau
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
    warum:
      "Gemeinsame Konten mit unterschiedlichen Risikoprofilen sind ein klassisches Beratungsdilemma. MiFID schreibt vor, dass das Profil zur realen Risikobereitschaft aller Beteiligten passen muss. Beim tiefsten gemeinsamen Nenner wäre Sparkonto richtig – aber das schiesst über das Ziel hinaus. Separate Depots lösen das Problem elegant.",
    inDerPraxis:
      "Bei Ehepaaren mit stark unterschiedlichen Präferenzen empfehlen erfahrene Berater separate Anlagekonten. Das vermeidet spätere Unstimmigkeiten und ist MiFID-konform, da jede Person ihr eigenes Profil erhält. In der Praxis kostet das minimal mehr Administrationsaufwand, verhindert aber Beschwerden. Bei Scheidung sind getrennte Depots ausserdem deutlich einfacher abzuwickeln.",
    merksatz:
      "Unterschiedliche Risikoprofile = separate Depots oder echter Kompromiss. Nie das höhere Profil durchdrücken.",
    glossarTerm: "Anlegerprofil",
    rechtsgrundlage: "FIDLEG Art. 17 (Portfolioverwaltungsmandat)",
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
    warum:
      "Sell low, buy high ist der teuerste Anlegerfehler. Wer bei –15% verkauft, realisiert den Verlust und verpasst die Erholung. Der S&P 500 hat sich nach jedem Crash erholt – 1987, 2000, 2008, 2020. Bei 10 Jahren Horizont sind Schwankungen Teil des Plans, nicht das Problem. Der Plan sollte nur ändern, wenn sich die Lebensumstände ändern.",
    inDerPraxis:
      "Das wertvollste, was ein Berater in volatilen Phasen tut, ist den Kunden zu stabilisieren. Technisch korrekt ist es, an den ursprünglichen Plan zu erinnern. In der Praxis macht das den Unterschied zwischen einem zufriedenen Langzeitkunden und einem, der nach der Erholung mit Verlust ausgestiegen ist. Dokumentiere das Gespräch schriftlich.",
    merksatz:
      "Strategie ändern wegen Marktpanik ist der grösste Fehler. Ändere die Strategie, wenn sich die Lebenssituation ändert – nicht wenn der Markt fällt.",
    glossarTerm: "Marktvolatilität",
    rechtsgrundlage: "DBG Art. 20 / StHG Art. 7 (Kapitalerträge)",
  },
  {
    id: "3.3",
    level: 3,
    title: "Challenge-Trickfall: Effektiver Horizont",
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
    warum:
      "Das Anlegerprofil muss dem tatsächlichen Verwendungszweck entsprechen, nicht dem formellen. Der Kunde hat unbewusst einen Widerspruch: Er will 3 Jahre anlegen, hat aber 7 Jahre unterschrieben. Wenn der Markt beim Hauskauf –25% ist, kann er sich das Haus nicht leisten. Beratungspflicht bedeutet: Das Profil muss die Realität abbilden.",
    inDerPraxis:
      "Berater haben im Schweizer Recht Beratungs- und Dokumentationspflicht. Ein Profil, das nicht der Realität entspricht, ist eine Pflichtverletzung – auch wenn der Kunde es unterschrieben hat. Im Beschwerdefall fragt die Compliance: 'Wusste der Berater vom Hauskauf?' Wenn ja und er nichts tat, ist das ein Problem. Immer nachfragen, immer anpassen.",
    merksatz:
      "Effektiver Horizont = frühester Zeitpunkt, zu dem das Geld gebraucht wird. Nicht was unterschrieben wurde.",
    glossarTerm: "Beratungspflicht",
    rechtsgrundlage: "FIDLEG Art. 12 / FINMA-RS 2018/3",
  },
];

// ─────────────────────────────────────────────────────────
// LEVEL CONFIG
// ─────────────────────────────────────────────────────────

export const FONDS_LEVELS: FondsLevel[] = [
  { level: 1, label: "Einsteiger", badgeVariant: "green", cases: L1_CASES },
  { level: 2, label: "Fortgeschritten", badgeVariant: "orange", cases: L2_CASES },
  { level: 3, label: "Challenge-Niveau", badgeVariant: "red", cases: L3_CASES },
];
