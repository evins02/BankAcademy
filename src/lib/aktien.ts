import type { SubmoduleCase, SubmoduleLevel } from "./anlage-submodule-types";
export type { LevelNum, OptionKey, SubmoduleCase, SubmoduleLevel } from "./anlage-submodule-types";

const L1_CASES: SubmoduleCase[] = [
  {
    id: "1.2",
    level: 1,
    title: "Aktie als Eigenkapitalbeteiligung",
    situation:
      "Aziz, 22 Jahre, fragt: «Ich höre, Aktionäre sind Miteigentümer eines Unternehmens. Was bedeutet das genau – was habe ich als Aktionär für Rechte?»",
    question: "Was gehört zu den Rechten eines Aktionärs in der Schweiz?",
    options: [
      {
        key: "A",
        text: "Nur Dividendenrecht – Aktionäre bekommen einen Anteil am Gewinn, sonst nichts",
      },
      {
        key: "B",
        text: "Stimmrecht an der GV, Dividendenrecht, Bezugsrecht bei Kapitalerhöhung, Recht auf Anteil am Liquidationserlös",
      },
      {
        key: "C",
        text: "Aktionäre haben Garantie auf Kapitalrückzahlung plus Zinsen wie bei einer Obligation",
      },
      {
        key: "D",
        text: "Stimmrecht und Dividende nur bei Aktien über CHF 1'000 Kurswert",
      },
    ],
    correct: "B",
    feedback:
      "Als Aktionär bist du Miteigentümer. Rechte: 1) Stimmrecht an der Generalversammlung (GV) – mitentscheiden über Verwaltungsrat, Strategie, Dividende. 2) Dividendenrecht – Anteil am Gewinn. 3) Bezugsrecht – bei Kapitalerhöhung bevorzugt neue Aktien kaufen. 4) Liquidationserlös – bei Auflösung nach Begleichung aller Schulden. Aber: Keine Garantie auf Kapitalrückzahlung!",
    warum:
      "Aktie = Eigenkapital; Obligation = Fremdkapital. Aktionäre tragen das Unternehmensrisiko mit. Im Konkurs werden erst alle Gläubiger (inkl. Obligationäre) bedient, dann erst die Aktionäre – oft bleibt nichts übrig. Dieser fundamentale Unterschied erklärt, warum Aktien höher rentieren als Obligationen.",
    merksatz: "Aktionär = Miteigentümer. Chancen und Risiken des Unternehmens trägt er mit.",
    rechtsgrundlage: "OR Art. 660 ff. (Aktionärsrechte), OR Art. 698 (GV)",
  },
  {
    id: "1.3",
    level: 1,
    title: "Diversifikation — Einzelaktie vs. ETF",
    situation:
      "Sophie hat CHF 5'000 und überlegt: Alles in eine einzige Aktie investieren oder in einen ETF auf den Swiss Market Index (SMI), der die 20 grössten Schweizer Unternehmen enthält?",
    question: "Was ist der Hauptvorteil des ETF gegenüber der Einzelaktie?",
    options: [
      {
        key: "A",
        text: "ETFs sind immer günstiger in den Transaktionskosten als Einzelaktien",
      },
      {
        key: "B",
        text: "Mit dem ETF verteilt Sophie das Risiko auf 20 Unternehmen – bricht eines ein, verliert sie nicht alles",
      },
      {
        key: "C",
        text: "ETFs schützen vollständig vor Kursverlusten am Gesamtmarkt",
      },
      {
        key: "D",
        text: "Einzelaktien bringen immer höhere Renditen als ETFs auf denselben Markt",
      },
    ],
    correct: "B",
    feedback:
      "Diversifikation = Risikostreuung. Mit einem ETF auf 20 Unternehmen kann eine Pleite eines einzelnen Unternehmens nur 5% des Portfolios treffen. Bei einer Einzelaktie verliert Sophie 100% ihres Einsatzes bei einem Totalausfall. Unsystematisches Risiko (firmenspezifisch) lässt sich wegdiversifizieren; systematisches Marktrisiko (z.B. Rezession) nicht.",
    warum:
      "Diversifikation funktioniert, weil Unternehmen nicht alle gleichzeitig schlecht laufen. Korrelation <1 zwischen Aktien reduziert das Portfoliorisiko. Aber: SMI-ETF ist auf die Schweiz konzentriert – weitere Streuung durch Global-ETFs erhöht den Effekt noch. Ab ca. 20–30 unkorrelierte Positionen ist der Streuungseffekt weitgehend ausgeschöpft.",
    merksatz: "Nicht alle Eier in einen Korb. ETF = einfachste Diversifikation.",
    rechtsgrundlage: "FIDLEG Art. 12: Eignung – Risikostreuung im Kundeninteresse",
  },
  {
    id: "1.1",
    level: 1,
    title: "KGV verstehen",
    situation:
      "Jungkunde Luca Bernasconi, 24 Jahre, möchte Aktien der Tech AG kaufen. Aktienkurs: CHF 80, Gewinn je Aktie (EPS): CHF 4. Er fragt: «Was bedeutet dieses KGV, das ich überall lese?»",
    inputData: [
      { label: "Aktienkurs", value: "CHF 80" },
      { label: "Gewinn je Aktie (EPS)", value: "CHF 4" },
      { label: "Sektor", value: "Technologie" },
    ],
    question: "Wie hoch ist das KGV und was sagt es aus?",
    options: [
      {
        key: "A",
        text: "KGV = 20. Anleger zahlen CHF 20 für CHF 1 Jahresgewinn – typisch für Wachstumswerte",
      },
      { key: "B", text: "KGV = 4 – das entspricht dem Gewinn je Aktie in Franken" },
      { key: "C", text: "KGV = 0.05 – berechnet als Gewinn geteilt durch Kurs" },
      { key: "D", text: "KGV ist nicht aussagekräftig und kann ignoriert werden" },
    ],
    correct: "A",
    feedback:
      "KGV (Kurs-Gewinn-Verhältnis) = Kurs / Gewinn je Aktie = CHF 80 / CHF 4 = 20. Bedeutung: Du zahlst CHF 20 für CHF 1 aktuellen Jahresgewinn. KGV 20 ist bei Technologieaktien normal – zukünftiges Wachstum wird eingepreist. Value-Aktien haben oft KGV 8–12.",
    warum:
      "KGV ist eine der wichtigsten Bewertungskennzahlen. Vergleich: immer branchenspezifisch. Tech-Unternehmen haben KGV 25–40+ (hohes Wachstum erwartet). Banken oft KGV 8–12. KGV allein reicht nicht – immer mit Wachstumserwartungen (PEG-Ratio) kombinieren.",
    inDerPraxis:
      "Im Kundengespräch: KGV nie isoliert verwenden. Immer im Branchenvergleich zeigen. Hohes KGV = hohes Wachstum eingepreist – liefert das Unternehmen nicht, korrigiert der Kurs stark.",
    merksatz: "KGV = Kurs ÷ Gewinn je Aktie. Je tiefer, desto günstiger relativ zum aktuellen Gewinn.",
    rechtsgrundlage: "FIDLEG Art. 12: Eignungsbasierte Empfehlung – Aktienrisiken erläutern",
  },
];

const L2_CASES: SubmoduleCase[] = [
  {
    id: "2.2",
    level: 2,
    title: "Beta-Koeffizient verstehen",
    situation:
      "Kundin Miriam vergleicht zwei Aktien: Tech AG (Beta 1.8) und Pharma AG (Beta 0.6). Der Gesamtmarkt fällt um 10%. Miriam fragt, was das für ihre Positionen bedeutet.",
    inputData: [
      { label: "Marktbewegung", value: "−10%" },
      { label: "Tech AG Beta", value: "1.8" },
      { label: "Pharma AG Beta", value: "0.6" },
    ],
    question: "Wie viel verliert jede Aktie ungefähr, wenn der Markt 10% fällt?",
    options: [
      {
        key: "A",
        text: "Beide verlieren 10% – Beta ändert nichts am Verlust",
      },
      {
        key: "B",
        text: "Tech AG ca. −18%, Pharma AG ca. −6% – Beta misst die Kurssensitivität gegenüber dem Markt",
      },
      {
        key: "C",
        text: "Tech AG −10%, Pharma AG −10% – Beta über 1 bedeutet nur höhere Volatilität, nicht grössere Verluste",
      },
      {
        key: "D",
        text: "Tech AG gewinnt +8%, weil hohes Beta = inverse Marktkorrelation",
      },
    ],
    correct: "B",
    feedback:
      "Beta misst, wie stark eine Aktie auf Marktbewegungen reagiert. Beta 1.8: Die Tech AG bewegt sich 1.8× so stark wie der Markt. Bei −10% Markt: ca. −18%. Beta 0.6: Pharma AG bewegt sich nur 0.6×: bei −10% Markt ca. −6%. Beta > 1 = überdurchschnittlich sensitiv (zyklisch), Beta < 1 = defensiv.",
    warum:
      "Beta kommt aus dem Capital Asset Pricing Model (CAPM). Es misst das systematische (Markt-)Risiko, das sich nicht wegdiversifizieren lässt. Branchen mit hohem Beta: Technologie, Rohstoffe. Defensiv (tiefes Beta): Versorger, Nahrungsmittel, Pharma. Im Kundengespräch: Beta erklärt, warum konservative Anleger defensive Aktien bevorzugen sollten.",
    merksatz: "Beta > 1 = hebelt den Markt. Beta < 1 = dämpft den Markt. Beta = Marktrisiko einer Aktie.",
    rechtsgrundlage: "FIDLEG Art. 12: Eignungsprüfung – Risikoprofil passt zu Beta des Portfolios",
  },
  {
    id: "2.3",
    level: 2,
    title: "Buchgewinn vs. realisierter Gewinn",
    situation:
      "Marco kaufte 50 Nestlé-Aktien zu CHF 80 (Kaufwert CHF 4'000). Aktueller Kurs: CHF 110 (aktueller Wert CHF 5'500). Er sagt: «Ich habe CHF 1'500 verdient!» Er überlegt zu verkaufen.",
    question: "Was ist korrekt bezüglich Marcos Gewinn?",
    options: [
      {
        key: "A",
        text: "Marco hat CHF 1'500 realisiert – der Gewinn ist sicher, solange er die Aktien im Depot hält",
      },
      {
        key: "B",
        text: "CHF 1'500 ist ein Buchgewinn (unrealisiert). Erst nach dem Verkauf ist es ein realisierter Gewinn – bis dahin kann der Kurs fallen",
      },
      {
        key: "C",
        text: "Buchgewinne sind steuerlich gleich zu behandeln wie realisierte Gewinne",
      },
      {
        key: "D",
        text: "Marco sollte sofort verkaufen, weil Aktiengewinne in der Schweiz der Einkommenssteuer unterliegen",
      },
    ],
    correct: "B",
    feedback:
      "Buchgewinn = unrealisierter Gewinn auf Papier. Erst beim Verkauf wird er real. Bis dahin kann der Kurs auf CHF 70 fallen und der Gewinn zur Enttäuschung werden. In der Schweiz sind private Kapitalgewinne steuerfrei – aber nur realisierte Gewinne werden tatsächlich ausgezahlt. Buchgewinn ≠ Geld in der Tasche.",
    warum:
      "Psychologisch tendieren Anleger dazu, Gewinne zu früh zu realisieren und Verluste zu lange zu halten (Dispositionseffekt). Im Kundengespräch immer klar unterscheiden: Buchgewinn vs. realisierter Gewinn. Wichtig für Steuerplanung: In der Schweiz sind private Kapitalgewinne steuerfrei – professionelle Handelstätigkeit gilt aber als Einkommen.",
    merksatz: "Buchgewinn = unrealisiert = auf Papier. Realisiert = nach Verkauf = tatsächlich sicher.",
    rechtsgrundlage: "DBG Art. 16 Abs. 3 (private Kapitalgewinne steuerfrei), Praxis ESTV",
  },
  {
    id: "2.1",
    level: 2,
    title: "Dividendenrendite berechnen",
    situation:
      "Petra Koch hält 100 Nestlé-Aktien. Aktueller Kurs: CHF 95 pro Aktie. Nestlé zahlt eine jährliche Dividende von CHF 2.85 pro Aktie.",
    calculator: [
      {
        heading: "Dividendenrendite",
        rows: [
          { label: "Anzahl Aktien", value: "100 Stück" },
          { label: "Aktienkurs", value: "CHF 95.00" },
          { label: "Investierter Wert", value: "CHF 9'500" },
          { label: "Dividende je Aktie p.a.", value: "CHF 2.85" },
          { label: "Gesamtdividende p.a.", value: "CHF 285", type: "total" },
          {
            label: "Dividendenrendite (CHF 285 ÷ CHF 9'500)",
            value: "3.0% p.a.",
            type: "total",
          },
        ],
      },
    ],
    question: "Wie hoch ist die Dividendenrendite von Petra Kochs Nestlé-Position?",
    options: [
      { key: "A", text: "2.85% – das ist die Dividende je Aktie in Franken" },
      { key: "B", text: "0.3% – Dividende als Promille des Kurses" },
      { key: "C", text: "5.7% – Dividende × 2 für Halbjahresberechnung" },
      { key: "D", text: "3.0% – Dividende je Aktie geteilt durch Kurs" },
    ],
    correct: "D",
    feedback:
      "Dividendenrendite = Dividende je Aktie / Aktienkurs × 100 = CHF 2.85 / CHF 95 = 3.0%. Sie zeigt, wie viel Ausschüttung du im Verhältnis zum investierten Kapital erhältst. Nestlé ist bekannt für stabile, wachsende Dividenden – attraktiv für einkommensorientierte Anleger.",
    warum:
      "Dividendenrendite schwankt mit dem Kurs: Fällt der Kurs, steigt die Rendite (gleiche Dividende, tieferer Nenner). Schweizer Aktien haben oft 2–4% Dividendenrendite. Mehr als 5–6% kann ein Warnsignal sein (Kurseinbruch oder gekürzte Dividende in Sicht).",
    inDerPraxis:
      "Für Anleger mit Einkommensbedarf (z.B. Rentner) sind Dividendenaktien attraktiv. Wichtig: Stabilität prüfen – wird die Dividende regelmässig gezahlt und nicht gekürzt? Payout Ratio (Ausschüttungsquote) gibt Aufschluss.",
    merksatz: "Dividendenrendite = Dividende ÷ Kurs × 100. Steigt der Kurs → sinkt die Rendite.",
  },
];

const L3_CASES: SubmoduleCase[] = [
  {
    id: "3.2",
    level: 3,
    title: "Zyklische vs. defensive Aktien",
    situation:
      "Wirtschaftsausblick: Analysten erwarten eine Rezession in den nächsten 12 Monaten. Kundin Frau Keller fragt, ob sie ihr Portfolio anpassen soll. Sie hält: 60% Technologieaktien (Beta 1.8), 20% Autohersteller (Beta 1.5), 20% Nahrungsmittel (Beta 0.5).",
    question: "Was empfiehlst du Frau Keller angesichts der Rezessionserwartung?",
    options: [
      {
        key: "A",
        text: "Portfolio halten – Prognosen sind unsicher, kein Handlungsbedarf",
      },
      {
        key: "B",
        text: "Alles in Cash – Aktien sind in Rezessionen immer schlecht",
      },
      {
        key: "C",
        text: "Defensive Aktien erhöhen: Nahrungsmittel, Gesundheit, Versorger (tiefes Beta) – zyklische Positionen (Tech, Auto) reduzieren",
      },
      {
        key: "D",
        text: "Tech-Gewichtung erhöhen – Technologieunternehmen sind Krisengewinner",
      },
    ],
    correct: "C",
    feedback:
      "Zyklische Aktien (Tech, Auto, Luxus) folgen dem Konjunkturzyklus stark – in Rezessionen fallen sie überproportional. Defensive Aktien (Nahrungsmittel, Pharma, Versorger) – die Menschen essen und nehmen Medikamente auch in Krisen. Rezessionsvorbereitung: defensive Sektoren erhöhen, zyklische reduzieren. Frau Kellers Portfolio ist mit 80% zyklisch besonders anfällig.",
    warum:
      "Sektorrotation ist eine der Kernstrategien im Portfoliomanagement. Konjunkturzyklus: Expansion → Übergang → Rezession → Erholung. Jede Phase begünstigt andere Sektoren. In der Praxis: Komplette Prognosen sind schwierig. Schrittweise Anpassung sinnvoller als radikale Umschichtung.",
    merksatz: "Zyklisch = folgt der Konjunktur. Defensiv = stabil in Krisen. Rezession? → defensiver.",
    rechtsgrundlage: "FIDLEG Art. 12: Empfehlung im Kundeninteresse – auch bei Marktveränderungen",
  },
  {
    id: "3.3",
    level: 3,
    title: "Kapitalerhöhung und Bezugsrecht",
    situation:
      "Die Swiss Tech AG führt eine Kapitalerhöhung durch. Bedingungen: 1 Bezugsrecht pro bestehende Aktie. 5 Bezugsrechte berechtigen zum Kauf 1 neuer Aktie (Bezugsverhältnis 5:1). Ausgabepreis neue Aktie: CHF 60. Aktueller Kurs der bestehenden Aktie: CHF 85. Frau Meier hält 100 Aktien.",
    inputData: [
      { label: "Bestehende Aktien Frau Meier", value: "100 Stück" },
      { label: "Bezugsverhältnis", value: "5 Rechte : 1 neue Aktie" },
      { label: "Ausgabepreis neue Aktie", value: "CHF 60" },
      { label: "Aktueller Kurs", value: "CHF 85" },
    ],
    question: "Wie viele neue Aktien kann Frau Meier maximal zeichnen?",
    options: [
      {
        key: "A",
        text: "100 neue Aktien – sie hat 100 Bezugsrechte, eines reicht für eine neue Aktie",
      },
      {
        key: "B",
        text: "20 neue Aktien – 100 Bezugsrechte ÷ 5 = 20 neue Aktien",
      },
      {
        key: "C",
        text: "5 neue Aktien – Bezugsverhältnis ist 1:5, nicht 5:1",
      },
      {
        key: "D",
        text: "Sie kann keine neuen Aktien zeichnen – Bezugsrechte sind nur für institutionelle Anleger",
      },
    ],
    correct: "B",
    feedback:
      "Bezugsverhältnis 5:1 = 5 Bezugsrechte für 1 neue Aktie. Frau Meier hat 100 Rechte → 100 ÷ 5 = 20 neue Aktien. Kosten: 20 × CHF 60 = CHF 1'200. Der Rabatt (CHF 85 − CHF 60 = CHF 25 pro Aktie) ist jedoch kein echter Gewinn – nach der Kapitalerhöhung sinkt der Kurs auf den theoretischen Ex-Bezugsrechtskurs. Bezugsrechte schützen Altaktionäre vor Verwässerung.",
    warum:
      "Kapitalerhöhungen verwässern bestehende Aktionäre (mehr Aktien = kleiner Anteil am Unternehmen), wenn sie nicht beziehen. Das Bezugsrecht kompensiert das. Übt Frau Meier nicht aus, sollte sie das Bezugsrecht verkaufen – sonst verliert sie Wert. Im Kundengespräch: Immer auf Bezugsfrist hinweisen (meist 2–3 Wochen).",
    merksatz: "Bezugsrechte ausüben oder verkaufen – verfallen lassen kostet Geld.",
    rechtsgrundlage: "OR Art. 652b (Bezugsrecht), SIX Swiss Exchange Kotierungsreglement",
  },
  {
    id: "3.1",
    level: 3,
    title: "Aktie vs. Obligation",
    situation:
      "Ehepaar Schmidt, beide 58 Jahre, Rentenantritt in 7 Jahren. Disponibles Vermögen: CHF 200'000. Risikoprofil: konservativ, maximale Verlusttoleranz 10%. Ziel: Kapitalerhalt plus leichtes Wachstum. Sie fragen: «Sollen wir jetzt noch Aktien kaufen? Oder lieber Obligationen?»",
    inputData: [
      { label: "Alter", value: "58 Jahre" },
      { label: "Anlagehorizont", value: "7 Jahre" },
      { label: "Risikoprofil", value: "Konservativ" },
      { label: "Max. Verlust", value: "−10%" },
      { label: "Anlageziel", value: "Kapitalerhalt + leichtes Wachstum" },
    ],
    question: "Was empfiehlst du dem Ehepaar Schmidt?",
    options: [
      { key: "A", text: "100% Aktien – 7 Jahre ist lang genug für den Aktienmarkt" },
      {
        key: "B",
        text: "100% Obligationen kurzer Laufzeit – passt am besten zum konservativen Profil",
      },
      {
        key: "C",
        text: "Mix ca. 20–30% Aktien / 70–80% Obligationen – konservative Strategie mit kleinem Wachstumsanteil",
      },
      { key: "D", text: "50/50 Aktien/Obligationen – klassisch ausgewogen" },
    ],
    correct: "C",
    feedback:
      "Kurz vor der Rente hat Kapitalerhalt Priorität. 100% Aktien ist zu riskant: Aktien können 30–40% kurzfristig fallen, was die Rente gefährdet (Sequence-of-Returns-Risiko). 100% Obligationen schützt nicht gegen Inflation. Ein kleiner Aktienanteil (20–30%) bringt leichtes Wachstum, während Obligationen die Basis stabilisieren.",
    warum:
      "Faustregel: Anleihenanteil ≈ Lebensalter in %. Bei 58 also ca. 58–70% Obligationen. Aber das individuelle Profil (konservativ, max. 10% Verlust) zieht den Aktienanteil noch weiter runter auf 20–30%. Glidepath-Konzept: Aktienanteil schrittweise reduzieren je näher die Rente.",
    inDerPraxis:
      "Sequence-of-Returns-Risiko ist real: Ein 40%-Einbruch ein Jahr vor Rentenantritt zwingt zu Verkäufen genau dann, wenn Kurse tief sind. Glidepath-Strategie hilft: bereits 5–10 Jahre vor Rente beginnen, Aktienquote zu reduzieren.",
    merksatz: "Je näher die Rente, desto konservativer. Kapitalerhalt hat Vorrang vor Renditeoptimierung.",
    rechtsgrundlage: "FIDLEG Art. 12: Eignungsprüfung – Empfehlung muss zum Profil passen",
  },
];

export const AKTIEN_LEVELS: SubmoduleLevel[] = [
  { level: 1, label: "Einsteiger", badgeVariant: "green", cases: L1_CASES },
  { level: 2, label: "Fortgeschritten", badgeVariant: "orange", cases: L2_CASES },
  { level: 3, label: "Challenge-Niveau", badgeVariant: "red", cases: L3_CASES },
];
