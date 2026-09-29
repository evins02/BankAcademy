import { type LückentextCase } from "./lückentext";

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
  cases: (VorsorgeCase | LückentextCase)[];
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
      { key: "A", text: "\"AHV und Pensionskasse decken zusammen 80–100% des letzten Lohns ab. Eine 3. Säule brauchen eigentlich nur Selbständige, die keine Pensionskasse haben.\"" },
      {
        key: "B",
        text: "\"Die 3 Säulen sind das Schweizer Vorsorgesystem. 1. Säule = AHV, staatlich, für alle. 2. Säule = Pensionskasse, beruflich, über Arbeitgeber. 3. Säule = privat, freiwillig, steuerlich attraktiv.\"",
      },
      { key: "C", text: "\"Die 1. Säule (AHV) ist für alle Pflicht und deckt die Grundbedürfnisse. Die 2. und 3. Säule sind freiwillige Ergänzungen – mit 22 Jahren noch nicht prioritär.\"" },
      { key: "D", text: "\"1. Säule ist die AHV, gilt für alle. Die 2. Säule ist nur für Mitarbeitende von grossen Betrieben. Die 3. Säule mit dem 3a-Konto ist Ihr wichtigstes Sparinstrument.\"" },
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
      { key: "A", text: "Sparkonto – mit CHF 7'258 Jahresmaximum bietet die 3a keine echte Wirkung. Das Sparkonto ist vollständig verfügbar, bietet dieselbe Sicherheit und ist bei gleichzeitigem Sparziel die bessere Basis." },
      {
        key: "B",
        text: "Säule 3b über eine Lebensversicherung – sie ist ebenfalls steuerlich begünstigt, bietet mehr Flexibilität als das 3a-Konto und ist deshalb für Angestellte mit PK-Anschluss die bessere Wahl.",
      },
      { key: "C", text: "Aktien über ein Depot – Kursgewinne sind in der Schweiz steuerfrei, und langfristig übertrifft die historische Aktienrendite von ca. 7% p.a. den Steuervorteil der 3a deutlich." },
      {
        key: "D",
        text: "Säule 3a – steuerlich abzugsfähig, bis CHF 7'258 pro Jahr einzahlbar, Geld ist bis zur Pensionierung gebunden",
      },
    ],
    correct: "D",
    feedback:
      "Säule 3a ist ideal für Steueroptimierung und Altersvorsorge. Einzahlungen sind vollständig vom steuerbaren Einkommen abziehbar. Maximum 2026: CHF 7'258 pro Jahr. Das Geld ist bis 5 Jahre vor Pensionierung gebunden – Ausnahmen (z.B. Eigenheim, Auswanderung) sind möglich.",
  },
  {
    id: "1.4",
    level: 1,
    title: "AHV-Beitragslücken und Rentenkürzung",
    situation:
      "Kundin Fatima, 32 Jahre, war 3 Jahre im Ausland. Sie fragt: «Ich habe während dieser Zeit keine AHV-Beiträge bezahlt. Was passiert mit meiner Rente?»",
    question: "Was erklärst du Fatima?",
    options: [
      { key: "A", text: "«Keine Auswirkung – AHV-Renten werden nur nach dem letzten Lohn berechnet, nicht nach der Beitragsdauer»" },
      { key: "B", text: "«Jedes fehlende Beitragsjahr kürzt die AHV-Rente um ca. 1/44 – 3 Lücken entsprechen ca. 6.8% Rentenkürzung. Lücken können bis 5 Jahre vor AHV-Alter freiwillig nachgezahlt werden»" },
      { key: "C", text: "«AHV-Lücken führen automatisch zum Verlust aller Ansprüche – Fatima sollte sobald wie möglich eine neue AHV-Mitgliedschaft beantragen»" },
      { key: "D", text: "«Im Ausland zahlt man häufig in das dortige Rentensystem ein – das wird mit der Schweizer AHV verrechnet, ohne Kürzung»" },
    ],
    correct: "B",
    feedback:
      "Volle AHV-Rente setzt 44 Beitragsjahre voraus (Männer und Frauen). Jedes fehlende Jahr kürzt die Rente um 1/44 ≈ 2.27%. 3 Fehlerjahre = ca. 6.8% weniger Rente. Lücken können freiwillig nachgezahlt werden – aber nur bis 5 Jahre rückwirkend und nur wenn noch AHV-pflichtig. Empfehlung: AHV-Auszug anfordern und Lücken identifizieren.",
  },
  {
    id: "1.5",
    level: 1,
    title: "Wann beginnt die AHV-Beitragspflicht?",
    situation:
      "Lernender Tim, 16 Jahre, hat einen Sommerjob und verdient CHF 1'800 in 2 Monaten. Er fragt: «Muss ich schon AHV zahlen?»",
    question: "Was erklärst du Tim?",
    options: [
      { key: "A", text: "«Nein, AHV-Pflicht beginnt erst ab 18 Jahren»" },
      { key: "B", text: "«Ja ab 17 Jahren – aber nur auf Einkommen über CHF 2'000»" },
      { key: "C", text: "«Ja ab 1. Januar nach dem 17. Geburtstag, und für Nichterwerbstätige ab 20 Jahren. Bei Erwerbstätigkeit gilt ein Freibetrag von CHF 2'300 pro Jahr und Arbeitgeber»" },
      { key: "D", text: "«Nein, Lehrlinge und Ferienjobbende sind immer beitragsfrei bis zum Lehrabschluss»" },
    ],
    correct: "C",
    feedback:
      "AHV-Beitragspflicht bei Erwerbstätigkeit: ab 1. Januar nach dem 17. Geburtstag. Freibetrag für Jugendliche (bis Ende des Jahres, in dem sie 25 werden): CHF 2'300 pro Arbeitgeber und Jahr. Tim verdient CHF 1'800 – unter dem Freibetrag, also keine AHV-Pflicht. Nichterwerbstätige (Studenten, Hausfrauen/-männer) ab 1. Januar nach 20. Geburtstag.",
  },
  {
    id: "1.3",
    level: 1,
    title: "3a vs. 3b",
    situation: "Kunde fragt: 'Was ist der Unterschied zwischen 3a und 3b?'",
    question: "Was erklärst du?",
    options: [
      { key: "A", text: "\"3a ist gebunden und steuerlich abzugsfähig – maximaler Einzahlungsbetrag pro Jahr. 3b ist frei – keine Limite, keine Steuervergünstigung, jederzeit verfügbar.\"" },
      {
        key: "B",
        text: "\"3a und 3b sind steuerlich identisch – beide Formen sind vollständig vom steuerbaren Einkommen abzugsfähig. Der Unterschied liegt nur im Anbieter: 3a über Bank, 3b über Versicherung.\"",
      },
      { key: "C", text: "\"3b ist in der Regel die bessere Wahl: Seit der Steuerreform 2019 sind Einzahlungen in 3b-Policen kantonal teilweise abzugsfähig, und man ist nicht durch eine Sperrfrist bis zur Pensionierung eingeschränkt.\"" },
      { key: "D", text: "\"3a eignet sich primär für Selbständige ohne PK-Anschluss, die bis zu 20% ihres Einkommens einzahlen dürfen. Für Angestellte mit Pensionskasse ist das 3b-Konto steuerlich attraktiver, weil keine Bezugssperrfrist gilt.\"" },
    ],
    correct: "A",
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
      { key: "A", text: "\"Bei 25% Grenzsteuersatz liegt der Bundessteuervorteil bei ca. CHF 500 – der grosse Teil der Steuerersparnis entsteht erst beim Bezug zur Pensionierung, weil der Auszahlungssteuersatz dann erheblich tiefer ist.\"" },
      {
        key: "B",
        text: "\"Das lässt sich pauschal nicht sagen – der tatsächliche Steuervorteil hängt von Ihrem Kanton, Ihrer Gemeinde und dem genauen steuerbaren Einkommen ab. Das Steueramt muss das individuell ausrechnen, bevor eine Empfehlung sinnvoll ist.\"",
      },
      { key: "C", text: "\"Der Vorteil gilt ausschliesslich für die direkte Bundessteuer – kantonale und kommunale Einkommenssteuern können durch 3a-Einzahlungen nicht reduziert werden, daher lohnt sich das nur bei sehr hohem Einkommen.\"" },
      { key: "D", text: "\"Bei Grenzsteuersatz 25% sparen Sie CHF 1'814.50 Steuern – einfach durch die 3a Einzahlung von CHF 7'258.\"" },
    ],
    correct: "D",
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
      { key: "A", text: "\"Ja, möglich – Sie müssen das Renovationsprojekt belegen und das Formular für den vorzeitigen Bezug einreichen. Wir überweisen dann direkt ans Handwerkerunternehmen.\"" },
      {
        key: "B",
        text: "\"Vorzeitiger Bezug ist nur unter bestimmten Bedingungen möglich: Kauf Eigenheim, WEF-Renovation, Aufnahme Selbständigkeit, Auswanderung oder Invalidität. Eine Renovation für eine Mietwohnung reicht nicht.\"",
      },
      { key: "C", text: "\"Vorzeitiger Bezug ist nur beim Kauf von Wohneigentum erlaubt – nicht für Renovationen. Für Ihren Fall müssen Sie leider bis zur Pensionierung warten.\"" },
      { key: "D", text: "\"Bezug ist möglich, wenn die Renovationskosten mindestens CHF 50'000 betragen. Bitte bringen Sie die Kostenvoranschläge mit, damit wir den Antrag stellen können.\"" },
    ],
    correct: "B",
    feedback:
      "3a-Vorbezug ist möglich, aber nur für spezifische Zwecke: WEF (Wohneigentumsförderung – Kauf oder wertvermehrende Renovation des Eigenheims), Aufnahme Selbständigkeit, Auswanderung, Invalidität oder Tod. Renovation einer Mietwohnung ist nicht anrechenbar.",
  },
  {
    id: "2.4",
    level: 2,
    title: "PK-Einkauf und Steuervorteil",
    situation:
      "Herr Roth, 50 Jahre, Grenzsteuersatz 35%, hat laut PK-Ausweis ein Einkaufspotenzial von CHF 80'000. Er fragt: «Lohnt sich ein freiwilliger Einkauf in die Pensionskasse?»",
    question: "Was erklärst du Herrn Roth?",
    options: [
      { key: "A", text: "«Nein – PK-Einkäufe lohnen sich nur wenn man kurz vor der Pensionierung steht. Mit 50 sind 15 Jahre zu lang bis zur Auszahlung»" },
      { key: "B", text: "«Ja – CHF 80'000 Einkauf spart bei 35% Grenzsteuersatz ca. CHF 28'000 Steuern sofort. Plus höhere PK-Rente. Wichtig: 3 Jahre Sperrfrist vor Kapitalbezug beachten»" },
      { key: "C", text: "«Nur wenn er das Geld auf den Kapitalbezug statt auf Rente stellt – sonst lohnt sich der Einkauf steuerlich nicht»" },
      { key: "D", text: "«Einkäufe in die PK sind steuerlich nicht abzugsfähig – nur 3a-Einzahlungen können vom steuerbaren Einkommen abgezogen werden»" },
    ],
    correct: "B",
    feedback:
      "PK-Einkauf = doppelter Vorteil: 1) Sofortige Steuereinsparung in Höhe des Einkaufs × Grenzsteuersatz (CHF 80'000 × 35% = CHF 28'000). 2) Höhere Rente oder höheres Kapital bei Pensionierung. Wichtig: 3-Jahres-Sperrfrist – wer kurz danach Kapital bezieht, muss den Steuervorteil zurückzahlen. Bei 50 Jahren ist das absolut kein Problem.",
  },
  {
    id: "2.5",
    level: 2,
    title: "Überbrückungsrente bis AHV-Alter",
    situation:
      "Frau Schneider, 62 Jahre, möchte frühpensioniert werden (reguläres AHV-Alter 65). Ihr PK-Reglement erlaubt Pensionierung ab 60. Sie fragt: «Was passiert mit der AHV in der Lücke bis 65?»",
    question: "Was erklärst du Frau Schneider?",
    options: [
      { key: "A", text: "«Keine Lücke – AHV-Rente kann ab 62 beantragt werden, einfach mit Kürzung»" },
      { key: "B", text: "«Viele PKs zahlen bis zum AHV-Alter eine Überbrückungsrente, die die fehlende AHV kompensiert. Diese wird nach Alter 65 automatisch reduziert, wenn die echte AHV einsetzt»" },
      { key: "C", text: "«AHV läuft automatisch mit – sie muss nur die Pensionskasse informieren»" },
      { key: "D", text: "«Ab Frühpensionierung entfällt die AHV-Pflicht – keine Beiträge, keine Lücken»" },
    ],
    correct: "B",
    feedback:
      "Frühpensionierung schafft eine AHV-Lücke: zwischen Pensionierungsalter und AHV-Alter erhält man noch keine AHV. Lösung vieler PKs: Überbrückungsrente in Höhe der erwarteten AHV-Rente (ca. CHF 2'450/Monat max.) bis zum AHV-Alter. Danach sinkt die PK-Rente und die AHV setzt ein. Wichtig: Nicht-Erwerbstätige müssen AHV-Beiträge als Nichterwerbstätige weiterzahlen!",
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
        text: "\"Ab CHF 50'000 empfehle ich ein zweites 3a-Konto zu eröffnen. Beim Bezug werden 3a-Konten separat besteuert – gestaffelte Bezüge über mehrere Jahre reduzieren die Steuerbelastung massiv.\"",
      },
      {
        key: "B",
        text: "\"Alles gut – die Einlagensicherung schützt 3a-Konten bis CHF 100'000 pro Bank vollständig, und beim Bezug zur Pensionierung ist nur der Gesamtbetrag steuerlich massgebend, nicht die Anzahl Konten.\"",
      },
      { key: "C", text: "\"Das bestehende Konto saldieren und in ein 3a-Wertschriftendepot umschichten – Fonds erzielen langfristig bessere Rendite als Kontoguthaben, und steuerlich ändert sich beim Bezug nichts.\"" },
      { key: "D", text: "\"Ab CHF 50'000 gilt für 3a-Konten ein reduzierter Zinssatz. Die Bank ist verpflichtet, ab diesem Betrag die Einlagen aufzuteilen, damit der höhere Zinssatz weiterhin gilt.\"" },
    ],
    correct: "A",
    feedback:
      "3a-Bezüge werden separat vom ordentlichen Einkommen besteuert – zu einem reduzierten Satz. Bei mehreren Konten können Bezüge über verschiedene Jahre gestaffelt werden, was jedes Mal einen tieferen Steuersatz ergibt. Ab CHF 50'000 ist ein zweites Konto dringend empfohlen!",
  },
];

// ─────────────────────────────────────────────────────────
// LEVEL 3 – Challenge-Niveau
// ─────────────────────────────────────────────────────────

const L3_CASES: (VorsorgeCase | LückentextCase)[] = [
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
        text: "\"Alles gut – die heutige Tragbarkeit ist gegeben. Die Prüfung der Tragbarkeit im Rentenalter gilt nur bei Festhypotheken mit Laufzeit über 15 Jahre; bei rollenden Hypotheken wird ausschliesslich die aktuelle Situation beurteilt.\"",
      },
      {
        key: "B",
        text: "\"Tragbarkeit im Rentenalter nicht gegeben. 82.4% liegt massiv über der Limite von 38%. Die Hypothek muss vor Pensionierung stärker amortisiert oder der Betrag reduziert werden.\"",
      },
      {
        key: "C",
        text: "\"Nur die heutige Tragbarkeit zählt – Rentenalter ist in 13 Jahren noch weit weg\"",
      },
      { key: "D", text: "\"PK-Einkauf empfehlen – durch einen Einkauf von CHF 120'000 in die Pensionskasse steigt die jährliche PK-Rente auf über CHF 36'000, womit die Tragbarkeit im Rentenalter automatisch unter 38% fällt.\"" },
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
      { key: "A", text: "\"Nein! Ab 2026 können verpasste Einzahlungen ab 2025 nachgeholt werden. Bedingung: Der aktuelle Maximalbetrag CHF 7'258 muss zuerst vollständig einbezahlt sein. Lücken vor 2025 leider nicht nachholbar.\"" },
      {
        key: "B",
        text: "\"Ja leider – die Einzahlungsmöglichkeit in die Säule 3a ist streng auf das laufende Steuerjahr begrenzt. Das Bundesgesetz schliesst Nachzahlungen für alle Steuerpflichtigen aus, auch rückwirkend für 2025.\"",
      },
      {
        key: "C",
        text: "\"Einfach dieses Jahr den doppelten Maximalbetrag einzahlen – CHF 14'516 sind zulässig, wenn man ein Vorjahr nachholen will. Die Steuerbehörden akzeptieren das direkt in der Steuererklärung als Nachzahlung für 2025.\"",
      },
      { key: "D", text: "\"Nachzahlung gilt ab 2026 für Selbständige: Sie können Lücken aus Vorjahren bis zu drei Jahresmaximalbeträge auf einmal einzahlen. Für Angestellte mit PK-Anschluss bleibt das weiterhin ausgeschlossen.\"" },
    ],
    correct: "A",
    feedback:
      "Neue Regelung ab 2026: Beitragslücken ab dem Jahr 2025 können nachgeholt werden. Bedingung: Der aktuelle Maximalbetrag (CHF 7'258) muss im laufenden Jahr zuerst vollständig ausgeschöpft sein. Lücken vor 2025 sind nicht nachholbar. Nachzahlungen sind ebenfalls steuerlich abzugsfähig!",
  },
  {
    id: "3.4",
    level: 3,
    title: "WEF-Vorbezug Rückwirkung auf PK-Rente",
    situation:
      "Herr Müller, 45 Jahre, hat vor 10 Jahren CHF 50'000 aus der PK für den Ersterwerb von Wohneigentum bezogen (WEF-Vorbezug). Jetzt fragt er: «Was passiert mit meiner PK-Rente wenn ich den Betrag nicht zurückzahle?»",
    question: "Was erklärst du Herrn Müller?",
    options: [
      { key: "A", text: "«Nichts – der Vorbezug vor über 5 Jahren ist vollständig vergessen, er hat keine Wirkung mehr auf die Rente»" },
      { key: "B", text: "«Deine künftige PK-Rente ist dauerhaft reduziert, weil das entnommene Kapital keine Rendite mehr erwirtschaftet hat. Die genaue Kürzung zeigt dein PK-Ausweis unter 'projizierte Rente'»" },
      { key: "C", text: "«Der Vorbezug wird bei Pensionierung als Schuld verbucht – die PK zieht CHF 50'000 vom Kapital ab, plus Zinsen»" },
      { key: "D", text: "«Nur wenn er die Liegenschaft verkauft muss er zurückzahlen – sonst hat der Vorbezug keinen Effekt»" },
    ],
    correct: "B",
    feedback:
      "WEF-Vorbezug = dauerhafte Rentenkürzung, weil das entnommene Kapital keine Verzinsung und keine Rendite mehr generiert. Beispiel: CHF 50'000 bei durchschnittlich 2% Zins über 20 Jahre ≈ CHF 74'000 Verlust am Kapital bei Pensionierung. Der PK-Ausweis zeigt die «projizierte Altersrente mit und ohne Vorbezug» nicht separat — er zeigt nur den aktuellen Stand. Wichtig: Rückzahlung ist freiwillig, bis 3 Jahre vor dem regulären Pensionierungsalter möglich.",
  },
  {
    id: "3.5",
    level: 3,
    title: "Güterrecht und 3a bei Scheidung",
    situation:
      "Kundenpaar steht vor Scheidung. Frau hat ein 3a-Konto mit CHF 85'000. Mann hat kein 3a-Konto. Sie fragt: «Muss ich mein 3a-Guthaben teilen?»",
    question: "Was erklärst du ihr?",
    options: [
      { key: "A", text: "«Nein – 3a-Guthaben sind persönliche Ersparnisse und werden nie aufgeteilt, auch nicht bei Scheidung»" },
      { key: "B", text: "«Ja – grundsätzlich werden während der Ehe einbezahlte 3a-Guthaben hälftig geteilt. Einzahlen vor Heirat bleibt ihr. Dies regelt ZGB Art. 122 ff (Vorsorgeausgleich)»" },
      { key: "C", text: "«Nur wenn sie das Geld vor der Heirat gespart hat – nach der Heirat angesparte Guthaben sind Errungenschaft und gehören zum Gemeineigentum»" },
      { key: "D", text: "«Das Guthaben wird nur geteilt wenn beide im ordentlichen Güterstand (Errungenschaftsbeteiligung) verheiratet waren – sonst nicht»" },
    ],
    correct: "B",
    feedback:
      "Vorsorgeausgleich bei Scheidung (ZGB Art. 122 ff): Während der Ehe einbezahlte 3a- und PK-Guthaben gehören zur «ehelichen Vorsorge» und werden hälftig geteilt — unabhängig vom Güterstand (Errungenschaftsbeteiligung oder Gütergemeinschaft). Einzahlungen vor der Heirat sind davon ausgenommen. Wichtig: 3a-Konten werden nicht direkt übertragen — der Betrag wird auf das Freizügigkeitskonto des anderen übertragen.",
  },
  {
    type: "lückentext",
    id: "3.3",
    level: 3,
    briefing:
      "Neukunde, selbständig erwerbend, kein PK-Anschluss, Jahreseinkommen CHF 180'000. Fragt nach optimaler 3a-Strategie.",
    question:
      "Selbständige ohne PK-Anschluss können bis zu ___ % des Nettoeinkommens in die Säule 3a einzahlen.",
    answer: "20",
    unit: "%",
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
  { level: 3, label: "Challenge-Niveau", badgeVariant: "red", cases: L3_CASES },
];
