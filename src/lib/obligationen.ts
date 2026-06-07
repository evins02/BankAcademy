import type { SubmoduleCase, SubmoduleLevel } from "./anlage-submodule-types";
export type { LevelNum, OptionKey, SubmoduleCase, SubmoduleLevel } from "./anlage-submodule-types";

const L1_CASES: SubmoduleCase[] = [
  {
    id: "1.1",
    level: 1,
    title: "Rating verstehen",
    situation:
      "Thomas Huber, 55 Jahre, konservativ, möchte CHF 50'000 sicher anlegen. Er sieht zwei Obligationen: Obligation A (Schweizer Eidgenossenschaft, Rating AAA, Coupon 1.5%) und Obligation B (Schwellenland-Emittent, Rating CCC, Coupon 6.5%). Er fragt: «Soll ich nicht die B nehmen – 6.5% klingt viel besser?»",
    question: "Was erklärst du Thomas Huber?",
    options: [
      { key: "A", text: "Obligation B ist attraktiver – 6.5% Coupon ist deutlich mehr als 1.5%" },
      {
        key: "B",
        text: "AAA bedeutet höchste Bonität und minimales Ausfallrisiko. CCC ist nahe am Ausfall. Der höhere Coupon ist die Risikoprämie – für Thomas als konservativen Anleger ist Obligation A die richtige Wahl.",
      },
      { key: "C", text: "Beide sind gleich sicher – Obligationen haben grundsätzlich kein Ausfallrisiko" },
      { key: "D", text: "Das Rating spielt keine Rolle, wichtig ist nur der Coupon" },
    ],
    correct: "B",
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
  { level: 3, label: "LAP-Niveau", badgeVariant: "red", cases: L3_CASES },
];
