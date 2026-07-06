import type { SubmoduleCase, SubmoduleLevel } from "./anlage-submodule-types";
export type { LevelNum, OptionKey, SubmoduleCase, SubmoduleLevel } from "./anlage-submodule-types";

const L1_CASES: SubmoduleCase[] = [
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
      { key: "B", text: "3.0% – Dividende je Aktie geteilt durch Kurs" },
      { key: "C", text: "5.7% – Dividende × 2 für Halbjahresberechnung" },
      { key: "D", text: "0.3% – Dividende als Promille des Kurses" },
    ],
    correct: "B",
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
