import type { SubmoduleCase, SubmoduleLevel } from "./anlage-submodule-types";
export type { LevelNum, OptionKey, SubmoduleCase, SubmoduleLevel } from "./anlage-submodule-types";

const L1_CASES: SubmoduleCase[] = [
  {
    id: "1.2",
    level: 1,
    title: "Was ist eine Obligation?",
    situation:
      "Jungkunde Lara fragt: «Ich höre, Obligationen sind sicherer als Aktien. Aber was ist das überhaupt genau?»",
    question: "Was beschreibt eine Obligation korrekt?",
    options: [
      {
        key: "A",
        text: "Eine Obligation ist ein Eigenkapitalinstrument – wie eine Aktie, aber mit tieferer Rendite",
      },
      {
        key: "B",
        text: "Eine Obligation ist ein Darlehen des Investors an den Emittenten: Der Emittent zahlt regelmässig Zinsen (Coupon) und tilgt am Ende die Schuld (Rückzahlung Nennwert)",
      },
      {
        key: "C",
        text: "Obligationen können nicht an der Börse gehandelt werden – man hält sie bis Verfall",
      },
      {
        key: "D",
        text: "Obligationen garantieren immer eine positive Rendite, unabhängig vom Emittenten",
      },
    ],
    correct: "B",
    feedback:
      "Obligation = Fremdkapitalinstrument. Der Anleger leiht dem Emittenten (Staat, Unternehmen) Geld. Der Emittent verpflichtet sich: 1) Coupon (Zinsen) regelmässig zahlen. 2) Nennwert am Laufzeitende zurückzahlen. Risiko: Bonität des Emittenten – je schlechter die Bonität, desto höher das Ausfallrisiko. Obligationen können börslich gehandelt werden.",
    warum:
      "Wichtigster Unterschied Aktie vs. Obligation: Aktie = Eigenkapital (Miteigentümer, kein Rückzahlungsanspruch). Obligation = Fremdkapital (Gläubiger, Rückzahlungsanspruch). Im Konkurs: Obligationäre werden vor Aktionären bedient. Deshalb tieferes Risiko, aber auch tiefere erwartete Rendite.",
    merksatz: "Obligation = Darlehen. Coupon = Zins. Nennwert = Rückzahlung am Verfall.",
    rechtsgrundlage: "OR Art. 1156 ff. (Anleihensobligationen)",
  },
  {
    id: "1.3",
    level: 1,
    title: "Staatsobligationen vs. Unternehmensanleihen",
    situation:
      "Jonas vergleicht: Schweizer Bundesobligation (Coupon 1.0%, AAA) und Unternehmensanleihe Swisscom AG (Coupon 2.5%, A-Rating). Beide haben 5 Jahre Laufzeit.",
    question: "Warum bietet die Swisscom-Anleihe einen höheren Coupon als die Bundesobligation?",
    options: [
      {
        key: "A",
        text: "Weil Swisscom grösser ist als die Schweiz und mehr Zinsen zahlen kann",
      },
      {
        key: "B",
        text: "Der höhere Coupon ist die Risikoprämie – Swisscom trägt ein höheres Ausfallrisiko als der Bund. Mehr Risiko = mehr Zins",
      },
      {
        key: "C",
        text: "Weil Swisscom keine staatliche Garantie hat und deshalb gesetzlich höhere Zinsen zahlen muss",
      },
      {
        key: "D",
        text: "Kein Grund – Kupons werden zufällig festgelegt beim Emittenten",
      },
    ],
    correct: "B",
    feedback:
      "Die Schweizer Eidgenossenschaft gilt als sicherster Emittent weltweit (AAA). Die Wahrscheinlichkeit eines Ausfalls ist praktisch null. Swisscom ist ein Unternehmen: wirtschaftlich konjunkturabhängiger, höheres Ausfallrisiko. Für dieses Mehrrisiko verlangt der Markt eine Risikoprämie (Credit Spread) – hier 1.5% mehr Zins. Grundprinzip: Mehr Risiko = mehr Rendite.",
    warum:
      "Credit Spread = Renditedifferenz zwischen Unternehmensanleihe und gleichwertiger Staatsanleihe. Bewegt sich dynamisch: In Krisen steigen Credit Spreads (höhere Risikowahrnehmung), in guten Zeiten fallen sie. Investment Grade (BBB− und besser): moderate Spreads. High Yield (BB+ und schlechter): deutlich höhere Spreads.",
    merksatz: "Höherer Coupon = mehr Risiko. Credit Spread = Risikoprämie gegenüber Bundesobligation.",
    rechtsgrundlage: "FIDLEG Art. 12: Eignungsprüfung – Emittentenrisiko erläutern",
  },
  {
    id: "1.1",
    level: 1,
    title: "Rating verstehen",
    situation:
      "Thomas Huber, 55 Jahre, konservativ, möchte CHF 50'000 sicher anlegen. Er sieht zwei Obligationen: Obligation A (Schweizer Eidgenossenschaft, Rating AAA, Coupon 1.5%) und Obligation B (Schwellenland-Emittent, Rating CCC, Coupon 6.5%). Er fragt: «Soll ich nicht die B nehmen – 6.5% klingt viel besser?»",
    question: "Was erklärst du Thomas Huber?",
    options: [
      { key: "A", text: "Obligation B ist klar die bessere Wahl – 6.5% Coupon ergibt CHF 3'250 Zins pro Jahr statt CHF 750. Bei einer so grossen Renditedifferenz überwiegt der Ertrag das theoretische Risiko." },
      {
        key: "B",
        text: "Rating-Agenturen lagen in der Finanzkrise 2008 komplett daneben. Für erfahrene Anleger wie Thomas gilt: Coupon und Laufzeit entscheiden, nicht das Rating einer Agentur.",
      },
      { key: "C", text: "Beide Obligationen sind vertraglich abgesichert und zahlen Coupon und Kapital zurück. Das Rating ist eine externe Einschätzung ohne Rechtsverbindlichkeit und beeinflusst nicht die Vertragspflichten." },
      { key: "D", text: "AAA bedeutet höchste Bonität und minimales Ausfallrisiko. CCC ist nahe am Ausfall. Der höhere Coupon ist die Risikoprämie – für Thomas als konservativen Anleger ist Obligation A die richtige Wahl." },
    ],
    correct: "D",
    feedback:
      "Ratings zeigen die Kreditwürdigkeit des Emittenten. AAA = höchste Qualität, minimales Ausfallrisiko. CCC = erhebliches Ausfallrisiko – bei wirtschaftlicher Verschlechterung ist Ausfall wahrscheinlich. Der höhere Coupon bei CCC ist die Risikoprämie. Für Thomas (Kapitalerhalt) ist Obligation A die einzig vertretbare Wahl.",
    warum:
      "Ratingagenturen (Moody's, S&P, Fitch) bewerten die Bonität. Skala: AAA (höchste Qualität) bis D (Ausfall). Investment Grade: BBB− und besser. Speculative Grade (Junk Bonds): BB+ und schlechter. CCC bedeutet: bei wirtschaftlicher Verschlechterung ist Ausfall wahrscheinlich.",
    inDerPraxis:
      "Die Produktempfehlung muss zum Anlegerprofil passen (FIDLEG Art. 12). Ein CCC-Bond für einen 55-jährigen konservativen Anleger wäre eine Verletzung der Eignungsprüfung und kann zu Haftungsansprüchen führen.",
    merksatz: "Höherer Coupon = höheres Risiko. Keine Rendite ohne entsprechendes Risiko.",
    rechtsgrundlage: "FIDLEG Art. 12 (Eignungsprüfung), FINMA-RS 2012/3",
  },
];

const L2_CASES: SubmoduleCase[] = [
  {
    id: "2.2",
    level: 2,
    title: "Duration als Risikokennzahl",
    situation:
      "Frau Isler vergleicht zwei Obligationen mit identischem Rating A: Obligation X (Duration 2 Jahre, Coupon 3.5%) und Obligation Y (Duration 9 Jahre, Coupon 2.0%). Sie erwartet steigende Zinsen.",
    question: "Welche Obligation ist bei steigenden Zinsen weniger anfällig für Kursverluste?",
    options: [
      {
        key: "A",
        text: "Obligation Y – sie hat den tieferen Coupon und ist deshalb günstiger",
      },
      {
        key: "B",
        text: "Beide gleich – Duration beeinflusst nur die Zinseinnahmen, nicht den Kurs",
      },
      {
        key: "C",
        text: "Obligation X – niedrige Duration (2 Jahre) bedeutet geringe Zinssensitivität. Bei +1% Zinserhöhung verliert Obligation X ca. 2%, Obligation Y ca. 9%",
      },
      {
        key: "D",
        text: "Obligation X, weil ein höherer Coupon immer das Kursrisiko ausgleicht",
      },
    ],
    correct: "C",
    feedback:
      "Duration misst die Zinssensitivität: Bei +1% Zinserhöhung fällt der Kurs einer Obligation ungefähr um die Duration in Prozent. Obligation X (Duration 2): ca. −2% Kursverlust. Obligation Y (Duration 9): ca. −9% Kursverlust. Bei Zinserhöhungserwartung: kurzlaufende Obligationen bevorzugen. Tiefe Duration = geringes Zinsänderungsrisiko.",
    warum:
      "Duration = gewichtete mittlere Bindungsdauer der Cashflows. Eine 9-jährige Nullkuponanleihe hat Duration = 9. Ein hoher Coupon verkürzt die Duration, weil frühe Cashflows mehr gewichtet werden. Modified Duration = Preissensitivität auf 1% Zinsänderung. Im Kundengespräch: Duration ist die wichtigste Kennzahl für das Zinsrisiko.",
    merksatz: "Hohe Duration = hohe Zinssensitivität = grosses Kursrisiko bei Zinsänderungen.",
    rechtsgrundlage: "FIDLEG Art. 12: Marktrisiken (Zinsänderungsrisiko) kommunizieren",
  },
  {
    id: "2.3",
    level: 2,
    title: "Bonitätsverschlechterung — Kursauswirkung",
    situation:
      "Herr Neuhaus hält eine Unternehmensanleihe der Retail AG (aktuell BBB, Investment Grade). Ein Rating-Downgrade auf BB (Speculative Grade / Junk) wird angekündigt. Was passiert mit dem Kurs?",
    question: "Welchen Effekt hat der Downgrade von BBB auf BB auf den Kurs der Anleihe?",
    options: [
      {
        key: "A",
        text: "Der Kurs steigt – Junk Bonds zahlen höhere Zinsen, was die Anlage attraktiver macht",
      },
      {
        key: "B",
        text: "Der Kurs bleibt stabil – das Rating ist nur eine externe Meinung ohne Kursrelevanz",
      },
      {
        key: "C",
        text: "Der Kurs fällt deutlich – institutionelle Anleger müssen Investment-Grade-Anleihen halten und verkaufen zwangsweise; Credit Spread steigt, der Marktpreis fällt",
      },
      {
        key: "D",
        text: "Der Kurs fällt leicht – aber nur wenn gleichzeitig auch die Zinsen steigen",
      },
    ],
    correct: "C",
    feedback:
      "Downgrade BBB→BB = Verlust des Investment-Grade-Status. Viele institutionelle Anleger (Pensionskassen, Versicherungen) haben Mandate die nur Investment-Grade erlauben. Sie müssen zwangsweise verkaufen. Diese Verkaufswelle drückt den Kurs stark. Credit Spread weitet sich aus – der Markt verlangt höhere Risikoprämie. Effekt: erheblicher Kursverlust für Bestandshalter wie Herrn Neuhaus.",
    warum:
      "Fallen Angels = Anleihen die vom Investment Grade in den Junk-Bereich fallen. Typisches Ereignis bei Unternehmensturbulenzen (Gewinnwarnung, CEO-Rücktritt, Übernahme). Kursrückgänge von 10–20% sind üblich. Im Kundengespräch: Credit-Watch-Meldungen (Rating auf Review gestellt) als Frühwarnsignal kommunizieren.",
    merksatz: "BBB→BB-Downgrade = Kursabsturz durch Pflichtverkäufe institutioneller Anleger.",
    rechtsgrundlage: "FIDLEG Art. 12: Anlagerisiken laufend überwachen und kommunizieren",
  },
  {
    id: "2.1",
    level: 2,
    title: "Rendite berechnen",
    situation:
      "Kundin Sandra Weber prüft eine Obligation der Migros Bank AG: Nominalwert CHF 1'000, aktueller Kurs 97%, Coupon 2.5% p.a., Restlaufzeit 4 Jahre. Sie fragt: «Was bringe ich damit wirklich?»",
    calculator: [
      {
        heading: "Renditeberechnung",
        rows: [
          { label: "Nominalwert", value: "CHF 1'000" },
          { label: "Kaufkurs (97%)", value: "CHF 970" },
          { label: "Jahreszins (Coupon 2.5% × CHF 1'000)", value: "CHF 25.00" },
          { label: "Kursgewinn (CHF 30 ÷ 4 Jahre)", value: "CHF 7.50 p.a." },
          { label: "Gesamtertrag p.a.", value: "CHF 32.50", type: "total" },
          { label: "Annäherungsrendite (CHF 32.50 ÷ CHF 970)", value: "≈ 3.35% p.a.", type: "total" },
        ],
      },
    ],
    question: "Was ist die ungefähre Rendite p.a. dieser Obligation?",
    options: [
      { key: "A", text: "2.5% – das ist der Coupon, also die Rendite" },
      { key: "B", text: "3.35% p.a. – Coupon plus anteiliger Kursgewinn, geteilt durch Kaufkurs" },
      { key: "C", text: "1.5% – der Coupon minus Kursverlustabzug" },
      { key: "D", text: "6.7% – Coupon verdoppelt wegen Discount-Kauf" },
    ],
    correct: "B",
    feedback:
      "Rendite ≠ nur Coupon! Wer unter Nennwert kauft (Kurs < 100%), erhält beim Verfall den Nennwert zurück – das ergibt den Kursgewinn. Annäherungsrendite = (Coupon + Kursgewinn p.a.) / Kaufkurs. CHF 25 + CHF 7.50 = CHF 32.50 / CHF 970 ≈ 3.35%.",
    warum:
      "Die genaue Berechnung heisst Yield to Maturity (YTM). Die Annäherungsformel liefert eine gute Näherung. Wichtig: Rendite berücksichtigt Coupon UND Kursveränderung bis Verfall – beim Coupon allein läuft man Gefahr, die tatsächliche Rendite falsch einzuschätzen.",
    inDerPraxis:
      "Im Kundengespräch immer die Gesamtrendite (nicht nur Coupon) kommunizieren. Kunden vergleichen Obligationen oft nur anhand des Coupons – das ist irreführend und kann zu falschen Erwartungen führen.",
    merksatz:
      "Rendite = (Coupon + Kursgewinn p.a.) ÷ Kaufkurs. Kauf unter Nennwert steigert die Rendite über den Coupon hinaus.",
    rechtsgrundlage: "MiFID II / FIDLEG: Transparenz über Kosten und Renditen",
  },
];

const L3_CASES: SubmoduleCase[] = [
  {
    id: "3.2",
    level: 3,
    title: "Wandelanleihe (Convertible Bond)",
    situation:
      "Die SoftFin AG emittiert eine Wandelanleihe: Nennwert CHF 1'000, Coupon 1.5%, Laufzeit 5 Jahre. Wandlungsrecht: Jede Anleihe kann in 10 Aktien der SoftFin AG umgewandelt werden (Wandlungspreis CHF 100). Aktueller Aktienkurs: CHF 80. Frau Gerber überlegt zu investieren.",
    inputData: [
      { label: "Nennwert", value: "CHF 1'000" },
      { label: "Coupon", value: "1.5% p.a." },
      { label: "Wandlungspreis", value: "CHF 100 je Aktie" },
      { label: "Wandlungsverhältnis", value: "1 Anleihe = 10 Aktien" },
      { label: "Aktueller Aktienkurs", value: "CHF 80" },
    ],
    question: "Ab welchem Aktienkurs lohnt es sich, die Wandelanleihe in Aktien umzuwandeln?",
    options: [
      {
        key: "A",
        text: "Sofort – Frau Gerber soll jetzt zum Kurs CHF 80 wandeln",
      },
      {
        key: "B",
        text: "Ab Aktienkurs CHF 100 – erst dann ist der Wandlungswert (10 × CHF 100) gleich dem Nennwert",
      },
      {
        key: "C",
        text: "Wandelanleihen werden immer automatisch gewandelt – kein Einfluss des Anlegers",
      },
      {
        key: "D",
        text: "Erst ab CHF 150 – Wandlungspreis plus Couponverzicht über 5 Jahre",
      },
    ],
    correct: "B",
    feedback:
      "Wandlungswert = Aktienkurs × Wandlungsverhältnis. Bei CHF 80: 10 × CHF 80 = CHF 800 < CHF 1'000 (Nennwert). Wandeln lohnt sich nicht. Ab CHF 100: 10 × CHF 100 = CHF 1'000. Parity erreicht. Steigt die Aktie weiter (z.B. CHF 130): 10 × CHF 130 = CHF 1'300 > CHF 1'000. Dann lohnt sich Wandlung. Wandelanleihe = Kombination: Obligation (Schutz) + Kaufoption (Upside).",
    warum:
      "Wandelanleihen bieten: tiefer Coupon (wegen Wandlungsrecht als Bonus), Kapitalschutz (Rückzahlung Nennwert wenn nicht gewandelt), Partizipation am Aktienanstieg. Nachteil: bei starkem Aktienanstieg hat man weniger profitiert als direkt in Aktien. Profil: defensiver Anleger der leicht am Wachstum teilhaben will.",
    merksatz: "Wandelanleihe = Obligation + Kaufoption. Wandlung lohnt sich ab Wandlungspreis.",
    rechtsgrundlage: "OR Art. 653 (Wandelanleihe, bedingte Kapitalerhöhung)",
  },
  {
    id: "3.3",
    level: 3,
    title: "Zinsstrukturkurve interpretieren",
    situation:
      "Das aktuelle Marktumfeld zeigt eine inverse Zinsstrukturkurve: 2-jährige Schweizer Staatsanleihen yielden 2.5%, 10-jährige nur 1.8%. Herr Kaufmann will neu CHF 100'000 in Schweizer Staatsanleihen anlegen.",
    question: "Was signalisiert eine inverse Zinskurve und wie sollte Herr Kaufmann reagieren?",
    options: [
      {
        key: "A",
        text: "Inverse Kurve ist normal in der Schweiz – immer in Langläufer investieren für maximale Rendite",
      },
      {
        key: "B",
        text: "Inverse Kurve = Kurzläufer rentieren mehr als Langläufer. Das signalisiert eine Rezessionserwartung. Kurzläufer bieten heute bessere Rendite bei weniger Zinsrisiko",
      },
      {
        key: "C",
        text: "Inverse Kurve bedeutet Inflation – deshalb sofort in Aktien umschichten",
      },
      {
        key: "D",
        text: "Herr Kaufmann soll nicht in Obligationen investieren wenn die Zinskurve invers ist",
      },
    ],
    correct: "B",
    feedback:
      "Normale Zinskurve: Langläufer rentieren mehr (wegen längerem Risiko). Inverse Kurve: Kurzläufer rentieren mehr. Signalwirkung: Marktteilnehmer erwarten künftig tiefere Zinsen (z.B. nach einer Rezession werden Zinsen gesenkt). Für Herrn Kaufmann: Kurzläufer (2 Jahre) bieten heute 2.5% vs. 1.8% für 10 Jahre – und mit viel weniger Zinsrisiko (Duration ~2 vs. ~8). Klare Wahl in diesem Umfeld.",
    warum:
      "Die inverse Zinskurve ist ein etablierter Rezessionsindikator (z.B. US 2/10-Inversion vor 2008, 2020, 2022). Mechanismus: Wenn Investoren langfristig tiefere Zinsen erwarten, kaufen sie Langläufer → deren Kurs steigt → Rendite fällt. Zentralbanken erhöhen Kurzfristzinsen (Overnight) → kurzfristige Renditen steigen. Ergebnis: Inversion.",
    merksatz: "Inverse Kurve = Rezessionswarnung. Kurzläufer besser: höhere Rendite, weniger Risiko.",
    rechtsgrundlage: "FIDLEG Art. 12: Marktumfeld bei Anlageentscheid berücksichtigen",
  },
  {
    id: "3.1",
    level: 3,
    title: "Zins-Kurs-Zusammenhang",
    situation:
      "Herr Müller hat vor 2 Jahren eine 10-jährige Eidgenossenschaftsanleihe zu pari (100%) mit 1% Coupon gekauft. Seither sind die Marktzinsen auf 3% gestiegen. Herr Müller überlegt jetzt, die Obligation zu verkaufen.",
    inputData: [
      { label: "Kaufkurs", value: "100% (CHF 10'000)" },
      { label: "Coupon", value: "1.0% p.a." },
      { label: "Restlaufzeit", value: "8 Jahre" },
      { label: "Marktzins aktuell", value: "3.0% p.a." },
    ],
    question: "Was ist mit dem Kurs von Herr Müllers Obligation passiert?",
    options: [
      { key: "A", text: "Kurs ist gestiegen – Eidgenossenschaftsanleihen sind sicher und gefragt" },
      { key: "B", text: "Kurs ist unverändert – die Bonität des Emittenten hat sich nicht verändert" },
      { key: "C", text: "Kurs ist deutlich gefallen – bei steigenden Marktzinsen sinken Obligationenkurse" },
      { key: "D", text: "Kurs steigt, weil höhere Zinsen mehr Nachfrage erzeugen" },
    ],
    correct: "C",
    feedback:
      "Zins-Kurs-Zusammenhang: Steigen die Marktzinsen, fallen die Kurse bestehender Obligationen. Neue Anleihen bieten 3% – wer zahlt noch 100% für eine Obligation mit nur 1%? Herr Müllers Obligation ist erheblich weniger als CHF 10'000 wert. Bei 8 Jahren Restlaufzeit und 2% Zinsdifferenz könnte der Kurs auf ca. 85–87% gefallen sein.",
    warum:
      "Der inverse Zusammenhang ist fundamental: Bestandsobligationen mit tiefem Coupon verlieren an Wert, wenn neue Anleihen mehr zahlen. Duration gibt an, wie sensitiv eine Obligation auf Zinsänderungen reagiert – je länger die Laufzeit, desto grösser die Kursbewegung.",
    inDerPraxis:
      "Verkauft Herr Müller jetzt, realisiert er einen Verlust. Hält er bis Verfall, bekommt er 100% zurück – aber 8 Jahre lang nur 1% Coupon statt 3%. Im Kundengespräch: Zins-Kurs-Risiko immer proaktiv und vor dem Kauf kommunizieren.",
    merksatz:
      "Marktzinsen steigen → Obligationenkurse fallen. Je länger die Laufzeit, desto grösser der Kursrückgang.",
    rechtsgrundlage: "FIDLEG Art. 12: Risikoaufklärung inklusive Marktrisiken",
  },
];

export const OBLIGATIONEN_LEVELS: SubmoduleLevel[] = [
  { level: 1, label: "Einsteiger", badgeVariant: "green", cases: L1_CASES },
  { level: 2, label: "Fortgeschritten", badgeVariant: "orange", cases: L2_CASES },
  { level: 3, label: "Challenge-Niveau", badgeVariant: "red", cases: L3_CASES },
];
