import type { SubmoduleCase, SubmoduleLevel } from "./anlage-submodule-types";
export type { LevelNum, OptionKey, SubmoduleCase, SubmoduleLevel } from "./anlage-submodule-types";

const L1_CASES: SubmoduleCase[] = [
  {
    id: "1.1",
    level: 1,
    title: "TER und Kostenwirkung",
    situation:
      "Elena, 32 Jahre, möchte CHF 10'000 in einen Anlagefonds investieren. Sie vergleicht: Fonds A (passiver ETF, TER 0.20%) und Fonds B (aktiv gemanagter Fonds, TER 1.80%).",
    calculator: [
      {
        heading: "TER-Vergleich nach 20 Jahren (5% Bruttorendite p.a.)",
        rows: [
          { label: "Investition", value: "CHF 10'000" },
          { label: "Fonds A – Nettorendite (5% − 0.20%)", value: "4.80% p.a." },
          { label: "Fonds A – nach 20 Jahren", value: "ca. CHF 25'600" },
          { label: "Fonds B – Nettorendite (5% − 1.80%)", value: "3.20% p.a." },
          { label: "Fonds B – nach 20 Jahren", value: "ca. CHF 18'800" },
          { label: "Kostenunterschied nach 20 Jahren", value: "ca. CHF 6'800", type: "total" },
        ],
      },
    ],
    question: "Was bedeutet TER und warum ist der Kostenunterschied nach 20 Jahren so gross?",
    options: [
      { key: "A", text: "TER ist eine einmalige Kaufgebühr – spielt nur beim Kauf eine Rolle" },
      {
        key: "B",
        text: "TER ist die jährliche Gesamtkostenquote. Durch den Zinseszins-Effekt summiert sich 1.6% Unterschied auf ca. CHF 6'800 nach 20 Jahren",
      },
      { key: "C", text: "TER spielt bei langfristiger Anlage kaum eine Rolle" },
      { key: "D", text: "Höheres TER bedeutet aktives Management und damit immer bessere Rendite" },
    ],
    correct: "B",
    feedback:
      "TER (Total Expense Ratio) = jährliche Gesamtkosten in Prozent des Fondsvermögens. 1.6% Unterschied klingt klein – aber der Zinseszins-Effekt über 20 Jahre kostet Elena ca. CHF 6'800 mehr. Passiv = günstig, da kein aktives Management-Team bezahlt werden muss.",
    warum:
      "TER umfasst: Verwaltungsgebühr, Depotbankgebühr, Prüfungskosten. Nicht enthalten: Transaktionskosten, Ausgabeaufschlag. ETFs haben TER 0.05–0.30%, aktive Fonds 1.0–2.0% oder mehr. Entscheidend: Kosten mindern die Rendite jährlich.",
    inDerPraxis:
      "FIDLEG verlangt die Offenlegung aller Kosten im KID (Key Information Document). Im Kundengespräch immer TER erklären und vergleichen. Kunden unterschätzen systematisch den Zinseszins-Effekt auf Kosten.",
    merksatz: "TER = jährliche Gesamtkosten in %. Über Jahrzehnte kostet jedes Prozent enorm viel.",
    rechtsgrundlage: "FIDLEG Art. 60ff. (Prospekt, KIID), KAG Art. 75",
  },
];

const L2_CASES: SubmoduleCase[] = [
  {
    id: "2.1",
    level: 2,
    title: "Ausschüttend vs. thesaurierend",
    situation:
      "Herr Wagner, 58 Jahre, hat CHF 100'000 im «Swiss Dividenden-Fonds» (ausschüttend). Jedes Jahr erhält er CHF 2'500 ausgezahlt, aber sein Fondskurs steigt kaum. Sein Freund hat denselben Aktienkorb im «Swiss Wachstums-Fonds» (thesaurierend) – dessen Kurs steigt deutlich stärker. Herr Wagner wundert sich.",
    question: "Warum entwickelt sich der Fondskurs bei Herrn Wagner anders?",
    options: [
      {
        key: "A",
        text: "Herr Wagners Fonds wird schlechter gemanagt – er sollte sofort wechseln",
      },
      {
        key: "B",
        text: "Der thesaurierende Fonds enthält andere, bessere Aktien",
      },
      {
        key: "C",
        text: "Ausschüttende Fonds zahlen Erträge aus → Fondskurs steigt weniger. Thesaurierende Fonds reinvestieren automatisch → Kurs steigt stärker (Zinseszins-Effekt)",
      },
      {
        key: "D",
        text: "Dividendenfonds sind grundsätzlich schlechter als Wachstumsfonds",
      },
    ],
    correct: "C",
    feedback:
      "Ausschüttend: Dividenden und Zinsen werden ausgezahlt → Fondsvermögen sinkt um den Ausschüttungsbetrag → Kurs steigt weniger. Thesaurierend: Erträge bleiben im Fonds und werden reinvestiert → Zinseszins-Effekt → Kurs steigt stärker. Die Gesamtrendite ist ähnlich – nur die Form unterscheidet sich.",
    warum:
      "Für Herr Wagner (58 Jahre, braucht laufende Erträge) kann ausschüttend sinnvoll sein. Für junge Anleger im Vermögensaufbau ist thesaurierend oft besser (Zinseszins, Steuerstundung). In der Schweiz werden bei ausländischen thesaurierenden Fonds trotzdem fiktive Ausschüttungen besteuert.",
    inDerPraxis:
      "Im Gespräch: Fragen ob der Kunde laufende Erträge benötigt oder Vermögen aufbauen will. Das bestimmt die Wahl. Steuerliche Beratung kann relevant sein – bei grossen Beträgen Steuerexperten beiziehen.",
    merksatz:
      "Ausschüttend = Ertrag wird ausbezahlt. Thesaurierend = Ertrag bleibt im Fonds (Zinseszins). Gleiches Portfolio, unterschiedlicher Kursverlauf.",
    rechtsgrundlage: "KAG Art. 78 (Ausschüttung), DBG (steuerliche Behandlung)",
  },
];

const L3_CASES: SubmoduleCase[] = [
  {
    id: "3.1",
    level: 3,
    title: "Aktiv vs. passiv – Leistungsvergleich",
    situation:
      "Elena überprüft nach 3 Jahren ihre Fonds. Ihr aktiv gemanagter Fonds (TER 1.5%) hat 4.2% p.a. erzielt. Der Vergleichsindex (MSCI World) hat 6.8% p.a. erzielt. Ein ETF auf denselben Index (TER 0.2%) hätte 6.6% p.a. gebracht.",
    inputData: [
      { label: "Aktiver Fonds (TER 1.5%)", value: "+4.2% p.a." },
      { label: "MSCI World Index", value: "+6.8% p.a." },
      { label: "ETF auf MSCI World (TER 0.2%)", value: "+6.6% p.a." },
      { label: "Underperformance aktiv vs. ETF", value: "−2.4% p.a." },
    ],
    question: "Was sagst du Elena?",
    options: [
      {
        key: "A",
        text: "3 Jahre sind zu kurz – ein aktiver Fonds zeigt seinen Wert langfristig. Weiter halten.",
      },
      {
        key: "B",
        text: "Aktiv ist immer schlechter – grundsätzlich nie aktive Fonds empfehlen",
      },
      {
        key: "C",
        text: "Der aktive Fonds hat den Index um 2.4% p.a. underperformt. Studien zeigen: Über 70% aktiver Fonds schlagen ihren Index nach Kosten langfristig nicht. Der ETF wäre hier die günstigere und bessere Wahl gewesen.",
      },
      {
        key: "D",
        text: "Elena soll sofort wechseln – Vergangenheitsperformance ist alles",
      },
    ],
    correct: "C",
    feedback:
      "Realität: 70–80% aktiver Fonds underperformen ihren Vergleichsindex nach Kosten langfristig (SPIVA Studie). Hier: 4.2% vs. 6.6% = 2.4% p.a. weniger. Auf 20 Jahre bei CHF 10'000 macht das ca. CHF 12'000 Unterschied. Elena sollte Kosten systematisch in ihre Anlageentscheidung einbeziehen.",
    warum:
      "Aktive Fonds können in bestimmten Marktsituationen outperformen (z.B. weniger effiziente Märkte, Krisen). Aber Outperformance ist kaum vorhersagbar und nicht nachhaltig. Kosten hingegen sind sicher. Für Privatanleger sind Indexfonds als Basisinvestment in der Regel sinnvoll.",
    inDerPraxis:
      "FIDLEG verlangt Interessenwahrungspflicht – empfehle nicht teure Fonds nur wegen höherer Provisionen. TER und Benchmark-Vergleich im KID zeigen. Elena hat das Recht, zu verstehen, was ihr Fonds leistet und kostet.",
    merksatz: "Kosten sind sicher, Outperformance nicht. Tiefe TER verbessert die Nettorendite zuverlässig.",
    rechtsgrundlage: "FIDLEG Art. 8 (Interessenwahrungspflicht), Art. 26 (Best Execution)",
  },
];

export const ANLAGE_FONDS_LEVELS: SubmoduleLevel[] = [
  { level: 1, label: "Einsteiger", badgeVariant: "green", cases: L1_CASES },
  { level: 2, label: "Fortgeschritten", badgeVariant: "orange", cases: L2_CASES },
  { level: 3, label: "Challenge-Niveau", badgeVariant: "red", cases: L3_CASES },
];
