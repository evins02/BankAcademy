import type { SubmoduleCase, SubmoduleLevel } from "./anlage-submodule-types";
export type { LevelNum, OptionKey, SubmoduleCase, SubmoduleLevel } from "./anlage-submodule-types";

const L1_CASES: SubmoduleCase[] = [
  {
    id: "1.1",
    level: 1,
    title: "Primärmarkt vs. Sekundärmarkt",
    situation:
      "Kundin Frau Wagner (42) hat beim IPO der Swiss TechCo AG Aktien gezeichnet. Nun sieht sie dieselbe Aktie an der Börse zu einem anderen Kurs und fragt: «Ich habe beim Börsengang CHF 20 bezahlt – jetzt kostet die Aktie CHF 23.50. Ist das nicht dasselbe?»",
    question: "Was ist der wesentliche Unterschied zwischen Primär- und Sekundärmarkt?",
    options: [
      { key: "A", text: "Kein Unterschied – die Aktie ist immer gleich viel wert" },
      {
        key: "B",
        text: "Primärmarkt: Wertpapiere werden neu ausgegeben – Kapital fliesst an das Unternehmen. Sekundärmarkt: Anleger handeln untereinander – das Unternehmen erhält kein Geld mehr",
      },
      { key: "C", text: "Primärmarkt ist nur für institutionelle Anleger zugänglich" },
      { key: "D", text: "Auf dem Sekundärmarkt gibt es keine Kursrisiken" },
    ],
    correct: "B",
    feedback:
      "Beim IPO kaufen Anleger direkt vom Unternehmen – das Kapital (CHF 20 × Anzahl Aktien) fliesst in die Kasse der Swiss TechCo AG. Nach dem Börsengang handeln Anleger untereinander an der Börse (Sekundärmarkt). Ob der Kurs steigt oder fällt, berührt die Unternehmenskasse nicht mehr.",
    warum:
      "Die Unterscheidung ist zentral: Nur der Primärmarkt finanziert das Unternehmen direkt. Der Sekundärmarkt schafft Liquidität für Anleger, aber der Emissionserlös ist längst geflossen.",
    merksatz: "Primär = Emission · Sekundär = Handel",
  },
  {
    id: "1.2",
    level: 1,
    title: "Börsengang (IPO) – Was passiert?",
    situation:
      "Das Technologieunternehmen Swiss TechCo AG plant ihren Börsengang. Ihr Kunde Herr Baumann (35, IT-Unternehmer) hat davon gehört und fragt: «Was passiert genau, wenn ein Unternehmen an die Börse geht?»",
    question: "Was beschreibt einen Börsengang (Initial Public Offering, IPO) korrekt?",
    options: [
      { key: "A", text: "Das Unternehmen kauft eigene Aktien am Markt zurück (Rückkaufprogramm)" },
      {
        key: "B",
        text: "Das Unternehmen gibt erstmals Aktien an die Öffentlichkeit aus, wird börsenkotiert und beschafft so Eigenkapital",
      },
      { key: "C", text: "Das Unternehmen fusioniert mit einem börsenkotierten Konkurrenten" },
      { key: "D", text: "Nur bestehende Aktionäre verkaufen ihre Anteile – das Unternehmen erhält nichts" },
    ],
    correct: "B",
    feedback:
      "Beim IPO gibt das Unternehmen neue Aktien aus (Kapitalerhöhung) und/oder bestehende Aktionäre veräussern ihre Anteile. Das Unternehmen wird an einer Börse kotiert. Der Erlös aus neu ausgegebenen Aktien fliesst direkt in die Unternehmenskasse – für Wachstum, Schuldenabbau oder Akquisitionen.",
    inDerPraxis:
      "In der Schweiz übernimmt die SIX Swiss Exchange die Kotierung. Der Prozess dauert typischerweise 4–6 Monate und erfordert einen vollständigen Emissionsprospekt nach FIDLEG.",
    merksatz: "IPO = Erstausgabe · Kotierung · Eigenkapital für das Unternehmen",
  },
  {
    id: "1.3",
    level: 1,
    title: "Rolle der Investmentbank beim Börsengang",
    situation:
      "Ein Startup-Gründer fragt Sie: «Warum brauchen wir überhaupt eine Bank für unseren Börsengang? Können wir das nicht selbst machen?»",
    question: "Was sind die Kernaufgaben einer Investmentbank (Lead Manager) bei einem Börsengang?",
    options: [
      { key: "A", text: "Sie kauft alle Aktien zum Emissionspreis und verkauft sie mit Gewinn weiter" },
      { key: "B", text: "Sie schreibt nur den Prospekt und ist danach fertig" },
      {
        key: "C",
        text: "Sie begleitet Due Diligence und Prospekterstellung, koordiniert Investoren (Roadshow), ermittelt den fairen Emissionspreis und übernimmt Platzierungsgarantien",
      },
      { key: "D", text: "Sie garantiert, dass der Aktienkurs nach dem IPO nicht fällt" },
    ],
    correct: "C",
    feedback:
      "Die Lead-Manager-Bank übernimmt eine breite Koordinationsfunktion: Due Diligence (Prüfung des Unternehmens), Prospekterstellung, Roadshow (Präsentation bei Investoren), Bookbuilding (Preisfindung), Allokation der Aktien und oft auch Übernahmegarantie für nicht platzierte Anteile. Das ist zeitintensiv und erfordert umfangreiche Netzwerke.",
    warum:
      "Ohne diese Koordination würden Unternehmen den Emissionspreis falsch einschätzen, zu wenige Investoren erreichen und rechtliche Risiken eingehen.",
    merksatz: "Lead Manager = Koordination · Preisfindung · Platzierungsgarantie",
  },
];

const L2_CASES: SubmoduleCase[] = [
  {
    id: "2.1",
    level: 2,
    title: "Bookbuilding-Verfahren",
    situation:
      "Die Swiss TechCo AG geht an die Börse. Die begleitende Bank hat eine Preisspanne von CHF 18–22 festgelegt. Innert 5 Tagen gehen folgende Orders ein:",
    inputData: [
      { label: "Orders zu CHF 22 (Obergrenze)", value: "2'800'000 Aktien" },
      { label: "Orders zu CHF 20", value: "4'100'000 Aktien" },
      { label: "Orders zu CHF 18 (Untergrenze)", value: "1'200'000 Aktien" },
      { label: "Angebotene Aktien", value: "3'000'000 Aktien" },
    ],
    question: "Was ist der primäre Zweck des Bookbuilding-Verfahrens?",
    options: [
      { key: "A", text: "Den grösstmöglichen Rabatt für Kleinanleger zu erzielen" },
      {
        key: "B",
        text: "Die Nachfrage und Zahlungsbereitschaft der Investoren zu ermitteln, um den fairen Emissionspreis innerhalb der Preisspanne festzulegen",
      },
      { key: "C", text: "Nur institutionellen Investoren Zugang zum IPO zu geben" },
      { key: "D", text: "Den Emissionspreis auf dem Tiefstkurs festzusetzen, um sicher zu platzieren" },
    ],
    correct: "B",
    feedback:
      "Bookbuilding ermöglicht der Bank und dem Emittenten, die tatsächliche Nachfrage zu verstehen. Da bei CHF 20 die grösste Nachfrage liegt und das Gesamtbuch überzeichnet ist, würde der Emissionspreis wahrscheinlich nahe CHF 20–21 festgesetzt. Zu tief = Geld wird verschenkt; zu hoch = schlechter Börsenstart.",
    warum:
      "Alternativ gibt es das Festpreisverfahren (Emissionspreis von Anfang an fix) – aber Bookbuilding ist marktgerechter und reduziert das Unter-/Überpreisrisiko.",
    inDerPraxis:
      "In der Schweiz dominiert das Bookbuilding bei grossen IPOs. Die finale Allokation liegt im Ermessen der Bank.",
    merksatz: "Bookbuilding = Nachfrageermittlung → fairer Emissionspreis",
  },
  {
    id: "2.2",
    level: 2,
    title: "Underwriting / Übernahmegarantie",
    situation:
      "Die Swiss TechCo AG will sicherstellen, dass ihr IPO vollständig platziert wird. Die Grossbank AG verpflichtet sich schriftlich, alle nicht plazierten Aktien selbst zu kaufen – für eine Gebühr von 2.5% des Emissionsvolumens.",
    inputData: [
      { label: "Emissionsvolumen", value: "CHF 150'000'000" },
      { label: "Underwriting-Gebühr", value: "2.5%" },
      { label: "Underwriting-Gebühr absolut", value: "CHF 3'750'000" },
    ],
    question: "Was bedeutet Underwriting (Übernahmegarantie) für das Unternehmen und die Bank?",
    options: [
      { key: "A", text: "Die Bank garantiert, dass der Aktienkurs über dem Emissionspreis bleibt" },
      {
        key: "B",
        text: "Die Bank verpflichtet sich, nicht platzierte Aktien selbst zu kaufen – das Unternehmen erhält sicher den vollen Emissionserlös, die Bank trägt das Platzierungsrisiko",
      },
      {
        key: "C",
        text: "Das Unternehmen garantiert der Bank, dass der Kurs in 6 Monaten höher ist",
      },
      { key: "D", text: "Beide Parteien teilen Gewinne und Verluste gleichmässig" },
    ],
    correct: "B",
    feedback:
      "Mit Underwriting trägt die Bank das Platzierungsrisiko: Kann sie bei schwachem Marktumfeld nicht alle Aktien verkaufen, kauft sie den Rest selbst – und sitzt auf Aktien, die sie später verkaufen muss. Die Gebühr (CHF 3.75 Mio.) ist die Entschädigung für dieses Risiko. Für Swiss TechCo AG ist das Finanzierungsrisiko damit eliminiert.",
    warum:
      "«Firm Commitment» = volle Garantie (häufiger). «Best Efforts» = Bank versucht zu platzieren, ohne Garantie. Welche Variante gewählt wird, hängt vom Marktumfeld und der Verhandlungsmacht ab.",
    merksatz: "Underwriting = Bank trägt Platzierungsrisiko · Emittent erhält Sicherheit",
  },
  {
    id: "2.3",
    level: 2,
    title: "M&A – Fusion vs. Akquisition",
    situation:
      "Grossbank AG (Bilanzsumme CHF 80 Mrd.) möchte Regionalbank Helvetia AG (Bilanzsumme CHF 8 Mrd.) übernehmen. Die Investmentbank berät bei der Transaktion. Ihr Kunde fragt den Unterschied zwischen Fusion und Akquisition.",
    question: "Was unterscheidet eine Fusion von einer Akquisition?",
    options: [
      { key: "A", text: "Kein Unterschied – beides bedeutet dasselbe in der Praxis" },
      {
        key: "B",
        text: "Fusion: Zwei Unternehmen vereinen sich zu einer neuen Einheit (beide bestehenden Rechtsformen erlöschen). Akquisition: Ein Unternehmen kauft ein anderes und übernimmt die Kontrolle – das gekaufte Unternehmen kann als Tochter bestehen bleiben",
      },
      { key: "C", text: "Fusionen sind immer feindlich, Akquisitionen immer freundlich" },
      { key: "D", text: "Akquisitionen betreffen nur börsennotierte Unternehmen" },
    ],
    correct: "B",
    feedback:
      "Im vorliegenden Fall plant Grossbank AG eine Akquisition: Sie kauft Regionalbank Helvetia AG (zahlt Cash oder eigene Aktien). Helvetia AG bleibt zunächst als Tochtergesellschaft bestehen und wird später integriert. Bei einer echten Fusion würden beide Banken in eine neue Bank AG aufgehen – beide Namen verschwinden.",
    inDerPraxis:
      "In der Schweiz benötigen Bankenübernahmen die Genehmigung der FINMA (Änderung qualifizierter Beteiligungen nach BankG Art. 3 ff.) und bei systemrelevanten Banken zusätzliche FINMA-Prüfung.",
    rechtsgrundlage: "BankG Art. 3 ff. (Bewilligung), Fusionsgesetz (FusG) bei Verschmelzung",
    merksatz: "Fusion = neue Einheit entsteht · Akquisition = Übernahme, Tochter bleibt",
  },
];

const L3_CASES: SubmoduleCase[] = [
  {
    id: "3.1",
    level: 3,
    title: "Unternehmensbewertung – DCF vs. Multiplikatoren",
    situation:
      "Im Rahmen einer M&A-Transaktion soll FinTech Suisse AG bewertet werden. Die Investmentbank erstellt zwei Bewertungen:",
    inputData: [
      { label: "DCF-Bewertung (Barwert zukünftiger Cashflows)", value: "CHF 240 Mio." },
      { label: "EV/EBITDA-Multiplikator (Peer-Group Median 12×)", value: "CHF 180 Mio." },
      { label: "EBITDA FinTech Suisse AG", value: "CHF 15 Mio." },
      { label: "Angebotener Kaufpreis", value: "CHF 210 Mio." },
    ],
    question: "Warum liefern DCF und Multiplikatoren unterschiedliche Werte – und welche Aussage ist korrekt?",
    options: [
      {
        key: "A",
        text: "Der DCF-Wert ist immer richtig, der Multiplikator-Wert falsch",
      },
      {
        key: "B",
        text: "DCF bewertet intrinsisch (Wachstumspotenzial, zukünftige Cashflows, WACC) – Multiplikatoren spiegeln aktuelle Marktstimmung. Der Kaufpreis von CHF 210 Mio. liegt zwischen beiden – ein typisches Verhandlungsergebnis",
      },
      { key: "C", text: "Multiplikatoren sind immer der bessere Massstab bei FinTech-Unternehmen" },
      { key: "D", text: "Der tiefste Wert soll immer als Kaufpreis genommen werden" },
    ],
    correct: "B",
    feedback:
      "Beide Methoden liefern wertvolle, aber unterschiedliche Perspektiven: DCF hängt stark von Wachstumsannahmen und dem WACC ab – kleine Änderungen können den Wert stark verschieben. Multiplikatoren sind marktgetrieben und schneller berechnet, aber abhängig von der Peer-Group-Auswahl. In der Praxis nutzt die Investmentbank immer mehrere Methoden (Fairness Opinion) und präsentiert eine Bandbreite.",
    warum:
      "Der Kaufpreis von CHF 210 Mio. impliziert ein EV/EBITDA von 14× (Prämie gegenüber Peer-Group). Diese Kontrollprämie (normalerweise 20–40%) ist typisch bei Übernahmen.",
    inDerPraxis:
      "Bei börsenkotierten Targets gibt es eine dritte Methode: der Marktwert (Market Cap). Bei Banken wird oft auch der Buchwert (Price-to-Book) herangezogen.",
    merksatz: "DCF = intrinsischer Wert · Multiplikator = Marktvergleich · Realität = Bandbreite",
  },
  {
    id: "3.2",
    level: 3,
    title: "Konsortialstruktur und Rollen im Syndikat",
    situation:
      "Für den CHF 500-Mio.-Börsengang der Swiss InfraCo AG wurde folgendes Konsortium aufgestellt: Grossbank AG (Global Coordinator/Lead Manager), Kantonalbank (Co-Lead Manager), Regionalbank (Co-Manager). Ihr Vorgesetzter erklärt die Struktur.",
    inputData: [
      { label: "Global Coordinator – Grossbank AG", value: "CHF 300 Mio. (60%)" },
      { label: "Co-Lead Manager – Kantonalbank", value: "CHF 150 Mio. (30%)" },
      { label: "Co-Manager – Regionalbank", value: "CHF 50 Mio. (10%)" },
    ],
    question: "Was unterscheidet die Rolle des Global Coordinators von den Co-Managern?",
    options: [
      { key: "A", text: "Co-Manager verdienen mehr, weil sie ein grösseres Netzwerk haben" },
      {
        key: "B",
        text: "Global Coordinator führt Due Diligence, erstellt den Prospekt, führt das Bookbuilding, bestimmt Preis und Allokation – trägt Hauptverantwortung und erhält die grösste Gebühr. Co-Manager platzieren bei ihren Kunden, tragen aber nur Teil-Underwriting-Risiko",
      },
      {
        key: "C",
        text: "Alle Konsortialbanken haben identische Aufgaben, nur der Name ist anders",
      },
      { key: "D", text: "Co-Manager dürfen keine institutionellen Kunden ansprechen" },
    ],
    correct: "B",
    feedback:
      "Der Global Coordinator hat die Führungsrolle: Er koordiniert den gesamten IPO-Prozess, trägt die Hauptverantwortung für Prospekt und Due Diligence und erhält dafür den grössten Teil der Underwriting-Gebühr. Co-Manager erschliessen zusätzliche Investorenkreise (z.B. Kantonalbank ihre regionalen Institutionellen) und erhalten eine anteilsmässige Gebühr.",
    warum:
      "Bei grossen Emissionen kann die Platzierungskraft einer einzelnen Bank unzureichend sein. Das Konsortium bündelt Netzwerke – und verteilt gleichzeitig das Underwriting-Risiko.",
    merksatz: "Global Coordinator = Führung · Co-Manager = Platzierungsnetz",
  },
  {
    id: "3.3",
    level: 3,
    title: "Chinese Wall – Interessenkonflikte im Investmentbanking",
    situation:
      "Analyst Müller der Grossbank AG covert Swiss TechCo AG mit einem «Kaufen»-Rating. Gleichzeitig begleitet die M&A-Abteilung derselben Bank eine mögliche Übernahme von Swiss TechCo AG durch Industriekonzern AG. Müller bittet einen M&A-Kollegen um Informationen für seinen nächsten Research-Report.",
    question: "Warum ist Müllers Anfrage problematisch und was verbietet sie?",
    options: [
      {
        key: "A",
        text: "Es ist kein Problem – beide Abteilungen sind im selben Unternehmen und dürfen Informationen austauschen",
      },
      {
        key: "B",
        text: "Die Chinese Wall (Informationsschranke) trennt Research und Investment Banking. Nicht-öffentliche M&A-Informationen sind Insider-Informationen – ihre Weitergabe an Müller würde Insiderhandel ermöglichen (FIDLEG Art. 25 ff., BEHG) und das Research-Rating korrumpieren",
      },
      {
        key: "C",
        text: "Das ist nur problematisch, wenn Müller selbst Aktien kauft",
      },
      { key: "D", text: "Die Chinese Wall gilt nur für Hedge Funds, nicht für klassische Banken" },
    ],
    correct: "B",
    feedback:
      "Die Chinese Wall ist keine physische Wand, sondern ein System aus organisatorischen, technischen und juristischen Schranken: getrennte IT-Systeme, getrennte Büros, keine gemeinsamen Meetings ohne Compliance-Freigabe. Nicht-öffentliche M&A-Informationen (z.B. «Industriekonzern AG bietet CHF 28 je Aktie») sind Insider-Informationen nach FINMAG/BEHG – ihre Verwendung für Research oder eigenen Handel ist strafbar.",
    warum:
      "Compliance-Abteilungen führen «Wall-crossing»-Verfahren ein: Analyst Müller kann bewusst «über die Mauer» gebracht werden – dann darf er aber keine Research-Reports mehr veröffentlichen und kann keine Aktien handeln, bis die Information öffentlich ist.",
    rechtsgrundlage:
      "FIDLEG Art. 25 ff. (Verhaltensregeln), FINMAG Art. 33 ff. (Insiderhandel), BEHG (Börsengesetz)",
    merksatz: "Chinese Wall = Informationsschranke · Insiderwissen ≠ Research-Input",
  },
];

export const IB_LEVELS: SubmoduleLevel[] = [
  { level: 1, label: "Einsteiger",       badgeVariant: "green",  cases: L1_CASES },
  { level: 2, label: "Fortgeschritten",  badgeVariant: "orange", cases: L2_CASES },
  { level: 3, label: "Challenge-Niveau", badgeVariant: "red",    cases: L3_CASES },
];
