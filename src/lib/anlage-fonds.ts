import type { SubmoduleCase, SubmoduleLevel } from "./anlage-submodule-types";
export type { LevelNum, OptionKey, SubmoduleCase, SubmoduleLevel } from "./anlage-submodule-types";

const L1_CASES: SubmoduleCase[] = [
  {
    id: "1.2",
    level: 1,
    title: "Was ist ein Anlagefonds?",
    situation:
      "Neukunde Ben, 26 Jahre, hat zum ersten Mal von Anlagefonds gehört. Er fragt: «Wie funktioniert das genau – ich zahle Geld ein und dann?»",
    question: "Was beschreibt das Grundprinzip eines Anlagefonds korrekt?",
    options: [
      {
        key: "A",
        text: "Ein Fonds ist ein Sparkonto mit garantierter Rendite, verwaltet von der Bank",
      },
      {
        key: "B",
        text: "Viele Anleger legen Geld zusammen, ein Fondsmanager investiert es breit gestreut – jeder Anleger hält Fondsanteile proportional zu seiner Einlage",
      },
      {
        key: "C",
        text: "Fonds sind nur für institutionelle Anleger mit mindestens CHF 100'000 zugänglich",
      },
      {
        key: "D",
        text: "Ein Fonds kauft nur Schweizer Aktien und schüttet den Gewinn jährlich aus",
      },
    ],
    correct: "B",
    feedback:
      "Anlagefonds = kollektive Kapitalanlage. Prinzip: Tausende Anleger bündeln ihr Kapital. Ein professioneller Fondsmanager investiert es in ein diversifiziertes Portfolio (Aktien, Obligationen, Immobilien etc.). Jeder Anleger hält Fondsanteile – wächst der Fonds, steigt der Anteilswert. Rechtlich: Sondervermögen, getrennt von der Bank – bei Bankpleite geschützt.",
    warum:
      "Sondervermögen-Schutz ist ein wesentlicher Vorteil: Das Fondsvermögen gehört den Anlegern, nicht der Fondsgesellschaft oder Depotbank. Bei deren Insolvenz ist das Fondsvermögen geschützt. Dies unterscheidet Fonds von strukturierten Produkten (z.B. Zertifikaten), wo Emittentenrisiko besteht.",
    merksatz: "Fonds = kollektive Anlage. Sondervermögen = bei Bankpleite geschützt.",
    rechtsgrundlage: "KAG Art. 25 (Sondervermögen), Art. 26 (Schutz der Anleger)",
  },
  {
    id: "1.3",
    level: 1,
    title: "SRRI Risikoklassen lesen",
    situation:
      "Elena schaut sich im KID (Key Information Document) eines Fonds die Risikoklasse an. Dort steht: SRRI 6 (auf einer Skala von 1 bis 7). Elena ist 30 Jahre alt, Risikotyp «ausgewogen», Anlagehorizont 5 Jahre.",
    question: "Was bedeutet SRRI 6 und passt dieser Fonds zu Elena?",
    options: [
      {
        key: "A",
        text: "SRRI 6 ist risikoreich – hohe Volatilität. Für Elenas ausgewogenes Profil ist das zu riskant",
      },
      {
        key: "B",
        text: "SRRI 6 ist konservativ – der Fonds investiert hauptsächlich in sichere Obligationen",
      },
      {
        key: "C",
        text: "SRRI ist nur ein Marketingbegriff ohne regulatorische Bedeutung",
      },
      {
        key: "D",
        text: "SRRI 6 passt gut zu Elena – ein ausgewogener Anleger kann immer alle Risikoklassen wählen",
      },
    ],
    correct: "A",
    feedback:
      "SRRI (Synthetic Risk and Reward Indicator) misst die historische Volatilität: Skala 1 (sehr gering) bis 7 (sehr hoch). SRRI 6 = hohe Volatilität, wahrscheinlich Aktien-/Emerging-Market-Fonds. Für Elena («ausgewogen») passt SRRI 3–5 besser. Empfehlung eines SRRI-6-Fonds für einen ausgewogenen Anleger wäre eine FIDLEG-Eignungsverletzung.",
    warum:
      "SRRI muss im KID auf Seite 1 ausgewiesen werden (PRIIP-Verordnung). Für die Eignungsprüfung nach FIDLEG müssen Risikoprofil und Risikoklasse des Produkts übereinstimmen. In der Schweiz: gleiche Logik wie in der EU, da FIDLEG eng an MiFID II angelehnt.",
    merksatz: "SRRI 1–7: je höher, desto risikoreicher. Immer mit Risikoprofil des Kunden abgleichen.",
    rechtsgrundlage: "FIDLEG Art. 12 (Eignungsprüfung), KAG Art. 76 ff. (KID-Pflicht)",
  },
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
      { key: "A", text: "TER ist die jährliche Gesamtkostenquote. Durch den Zinseszins-Effekt summiert sich 1.6% Unterschied auf ca. CHF 6'800 nach 20 Jahren" },
      {
        key: "B",
        text: "TER ist eine einmalige Kaufgebühr – spielt nur beim Kauf eine Rolle",
      },
      { key: "C", text: "TER spielt bei langfristiger Anlage kaum eine Rolle" },
      { key: "D", text: "Höheres TER bedeutet aktives Management und damit immer bessere Rendite" },
    ],
    correct: "A",
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
    id: "2.2",
    level: 2,
    title: "Ausgabeaufschlag und Rücknahmegebühr",
    situation:
      "Herr Leuthold investiert CHF 20'000 in Fonds X. Ausgabeaufschlag: 3%. Nach 2 Jahren steigt der Fonds um 8% und er will verkaufen. Rücknahmegebühr: 1%.",
    calculator: [
      {
        heading: "Gesamtkosteneffekt beim Kauf und Verkauf",
        rows: [
          { label: "Investition brutto", value: "CHF 20'000" },
          { label: "Ausgabeaufschlag (3%)", value: "− CHF 600" },
          { label: "Tatsächlich investiert", value: "CHF 19'400" },
          { label: "Fondswachstum +8% (auf CHF 19'400)", value: "+ CHF 1'552" },
          { label: "Wert vor Rücknahme", value: "CHF 20'952" },
          { label: "Rücknahmegebühr (1%)", value: "− CHF 210" },
          { label: "Auszahlung netto", value: "CHF 20'742", type: "total" },
          { label: "Nettorendite auf CHF 20'000", value: "+3.7% (statt 8%)", type: "total" },
        ],
      },
    ],
    question: "Wie reduzieren Ausgabeaufschlag und Rücknahmegebühr die Rendite von Herrn Leuthold?",
    options: [
      {
        key: "A",
        text: "Gar nicht – Gebühren sind im TER bereits enthalten",
      },
      {
        key: "B",
        text: "Sie halbieren seine Rendite – von 8% auf ca. 4%",
      },
      {
        key: "C",
        text: "Durch Ausgabeaufschlag und Rücknahmegebühr erzielt er nur 3.7% statt 8% – die Transaktionskosten fressen mehr als die Hälfte der Rendite",
      },
      {
        key: "D",
        text: "Gebühren sind nur bei kurzer Haltedauer relevant – über 2 Jahre spielen sie keine Rolle",
      },
    ],
    correct: "C",
    feedback:
      "Ausgabeaufschlag (3%) und Rücknahmegebühr (1%) sind Transaktionskosten, zusätzlich zur TER. Sie kommen einmalig beim Kauf/Verkauf. Bei kurzer Haltedauer (2 Jahre) können sie die Rendite stark belasten. Ergebnis: Herr Leuthold erzielt nur 3.7% auf sein eingesetztes Kapital, obwohl der Fonds 8% gewachsen ist.",
    warum:
      "Transaktionskosten müssen separat im KID ausgewiesen werden. In der Schweiz: FIDLEG Transparenzpflicht. Alternative: Fonds ohne Ausgabeaufschlag (No-Load-Fonds) direkt bei der Fondsgesellschaft oder über ETFs. Im Kundengespräch immer Gesamtkosten (TER + Transaktionskosten) kommunizieren.",
    merksatz: "TER = laufende Kosten. Ausgabeaufschlag / Rücknahme = einmalige Transaktionskosten. Beide mindern die Rendite.",
    rechtsgrundlage: "FIDLEG Art. 60 (Kostentransparenz), KAG Art. 68 (Prospektpflicht)",
  },
  {
    id: "2.3",
    level: 2,
    title: "UCITS Fonds — Anlegerschutz",
    situation:
      "Ein Berater empfiehlt Frau Albrecht zwei Fonds: Fonds A ist UCITS-konform (domiziliert in Luxemburg), Fonds B ist ein nicht-regulierter Offshore-Fonds von den Kaimaninseln mit ähnlicher Strategie aber höherer Rendite.",
    question: "Was ist der entscheidende Unterschied zwischen einem UCITS-Fonds und dem Offshore-Fonds?",
    options: [
      {
        key: "A",
        text: "UCITS-Fonds haben immer eine höhere Rendite – deshalb sind sie besser",
      },
      {
        key: "B",
        text: "Kein wesentlicher Unterschied – beide sind von Regulatoren überprüft",
      },
      {
        key: "C",
        text: "UCITS-Fonds unterliegen strengen EU/EWR-Vorschriften: Diversifikation, Liquidität, Transparenz, tägliche Rücknahme. Offshore-Fonds fehlt dieser Schutzrahmen",
      },
      {
        key: "D",
        text: "Offshore-Fonds sind illegal – Frau Albrecht darf keinen solchen Fonds kaufen",
      },
    ],
    correct: "C",
    feedback:
      "UCITS (Undertakings for Collective Investment in Transferable Securities) = EU-Regulierungsrahmen. Pflichten: max. 10% in einem Emittenten, tägliche Rücknahme zu NAV, halbjährliche Berichte, KIID. Nicht-regulierte Offshore-Fonds haben keinen solchen Schutz: Einschränkungen bei Rücknahme möglich, weniger Transparenz, andere Steuerregeln. In der Schweiz: FINMA prüft ausländische Fonds vor Vertrieb.",
    warum:
      "FIDLEG Art. 120: Nur bewilligte ausländische Fonds dürfen in der Schweiz öffentlich angeboten werden. UCITS-Fonds sind automatisch anerkennungsfähig. Offshore-Fonds oft nicht. Ein Verkauf eines nicht-bewilligten ausländischen Fonds kann strafbar sein.",
    merksatz: "UCITS = Schutzrahmen für Anleger. Offshore = weniger Regulierung, mehr Risiko.",
    rechtsgrundlage: "KAG Art. 119 ff. (ausländische KKA), FIDLEG Art. 120",
  },
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
    id: "3.2",
    level: 3,
    title: "Tracking Error und Indexreplikation",
    situation:
      "Analystin Vera vergleicht zwei ETFs auf den SMI: ETF Alpha (physische Replikation, TER 0.10%, Tracking Error 0.05%) und ETF Beta (synthetische Replikation via Swap, TER 0.07%, Tracking Error 0.30%). Vera erklärt ihrem Kunden den Unterschied.",
    question: "Was bedeutet der höhere Tracking Error von ETF Beta und was ist das Zusatzrisiko?",
    options: [
      {
        key: "A",
        text: "Höherer Tracking Error = höhere Rendite. ETF Beta ist deswegen besser",
      },
      {
        key: "B",
        text: "Tracking Error misst die Abweichung vom Index. ETF Beta weicht stärker vom SMI ab. Synthetisch = Swap-Kontrahenten-Risiko (bei Ausfall des Swap-Partners fehlt Deckung)",
      },
      {
        key: "C",
        text: "Tracking Error ist nur bei aktiven Fonds relevant – bei ETFs immer 0%",
      },
      {
        key: "D",
        text: "ETF Beta ist günstiger (TER 0.07%) und damit immer die bessere Wahl",
      },
    ],
    correct: "B",
    feedback:
      "Tracking Error = Standardabweichung der Rendite-Differenz zwischen ETF und Index. Hoher TE bedeutet: der ETF bildet den Index ungenau ab. Synthetische ETFs verwenden Swaps – sie halten nicht die Indexaktien, sondern Derivate. Risiko: Kontrahenten-Ausfall (Swap-Partner wird insolvent). Für konservative Anleger: physische Replikation transparenter und sicherer.",
    warum:
      "UCITS erlaubt synthetische ETFs, aber begrenzt Kontrahentenrisiko auf 10% des Fondsvermögens. In der Praxis: Grosse Index-ETFs (iShares, Vanguard, UBS) physisch → tiefes Kontrahentenrisiko. Im Kundengespräch: TER allein reicht nicht – auch Tracking Error und Replikationsmethode erklären.",
    merksatz: "Tracking Error = Indexabweichung. Synthetisch = Kontrahentenrisiko. Physisch = direktes Eigentum.",
    rechtsgrundlage: "KAG Art. 55 (Derivate), FINMA-RS 2013/8 (Derivateeinsatz KKA)",
  },
  {
    id: "3.3",
    level: 3,
    title: "Portfolio-Rebalancing",
    situation:
      "Herr Zimmermann hat ein Portfolio: Ziel-Allokation 60% Aktien / 40% Obligationen. Aktuell nach einem starken Aktienjahr: 75% Aktien / 25% Obligationen (Gesamtwert CHF 200'000).",
    inputData: [
      { label: "Ziel-Allokation", value: "60% Aktien / 40% Obligationen" },
      { label: "Aktuelle Allokation", value: "75% Aktien / 25% Obligationen" },
      { label: "Gesamtportfolio", value: "CHF 200'000" },
      { label: "Aktuell Aktien (75%)", value: "CHF 150'000" },
      { label: "Soll Aktien (60%)", value: "CHF 120'000" },
    ],
    question: "Was ist Rebalancing und was muss Herr Zimmermann konkret tun?",
    options: [
      {
        key: "A",
        text: "Rebalancing ist unnötig – wenn Aktien gestiegen sind, soll er die Quote laufen lassen",
      },
      {
        key: "B",
        text: "Er soll CHF 30'000 Aktien verkaufen und in Obligationen investieren – zurück zur Ziel-Allokation 60/40",
      },
      {
        key: "C",
        text: "Er soll CHF 30'000 neue Obligationen kaufen, ohne Aktien zu verkaufen",
      },
      {
        key: "D",
        text: "Rebalancing bedeutet, alle Positionen zu verkaufen und neu zu kaufen",
      },
    ],
    correct: "B",
    feedback:
      "Rebalancing = Rückführung auf die Ziel-Allokation. Herr Zimmermann hält 75% Aktien (CHF 150'000) statt 60% (CHF 120'000). Differenz: CHF 30'000. Diese Aktien verkaufen und für CHF 30'000 Obligationen kaufen → wieder 60/40. Ohne Rebalancing läuft das Portfolio immer weiter in Richtung höheres Risiko.",
    warum:
      "Regelmässiges Rebalancing (jährlich oder bei Abweichung >5%) diszipliniert: Es zwingt dazu, «teuer zu verkaufen» (gut gelaufene Aktien) und «günstig zu kaufen» (zurückgebliebene Obligationen). Psychologisch schwierig – gegen den Trend handeln. In der Schweiz: Kapitalgewinne steuerfrei (Privatanleger) → Rebalancing verursacht keine Steuerbelastung.",
    merksatz: "Rebalancing = Ziel-Allokation wiederherstellen. Gut Gelaufenes verkaufen, Zurückgebliebenes kaufen.",
    rechtsgrundlage: "FIDLEG Art. 12: Portfolioverwaltungsauftrag – laufende Überwachung und Anpassung",
  },
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
