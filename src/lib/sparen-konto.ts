import { type LückentextCase } from "./lückentext";

export type OptionKey = "A" | "B" | "C" | "D";
export type LevelNum = 1 | 2 | 3;

export interface SkOption {
  key: OptionKey;
  text: string;
}

export interface SkScenario {
  id: string;
  level: LevelNum;
  situation: string;
  question: string;
  options: SkOption[];
  correct: OptionKey;
  feedback: string;
}

export interface SkLevelConfig {
  level: LevelNum;
  label: string;
  badgeVariant: "green" | "orange" | "red";
  scenarios: (SkScenario | LückentextCase)[];
}

export const SK_LEVELS: SkLevelConfig[] = [
  {
    level: 1,
    label: "Einsteiger",
    badgeVariant: "green",
    scenarios: [
      {
        id: "1.1",
        level: 1,
        situation:
          "Herr Müller, 26 Jahre, kommt in die Filiale. Er hat seit 3 Jahren CHF 800 pro Monat auf seinem Privatkonto liegen. Er sagt: «Ich brauche das Geld eigentlich nicht – es liegt einfach rum.»",
        question: "Was empfiehlst du Herrn Müller?",
        options: [
          { key: "A", text: "Nichts ändern – Privatkonto ist am flexibelsten" },
          { key: "B", text: "Sparkonto eröffnen – höherer Zins bei Geld das nicht gebraucht wird" },
          { key: "C", text: "Sofort alles in Aktien investieren" },
          { key: "D", text: "3a-Konto eröffnen" },
        ],
        correct: "B",
        feedback:
          "Geld das langfristig nicht gebraucht wird, gehört auf ein Sparkonto. Der Zins ist höher als auf dem Privatkonto, weil die Bank mit eingeschränkteren Rückzugsbedingungen planen kann.",
      },
      {
        id: "1.2",
        level: 1,
        situation:
          "Eine Kundin, 23 Jahre, hat ihre erste Wohnung gemietet. Monatsmiete CHF 1'200. Der Vermieter verlangt eine Kaution.",
        question: "Was erklärst du ihr?",
        options: [
          { key: "A", text: "Mieterkautionskonto eröffnen über 2-3 Monatsmieten" },
          { key: "B", text: "Geld bar dem Vermieter übergeben" },
          { key: "C", text: "Geld auf Sparkonto legen" },
          { key: "D", text: "Kaution ist freiwillig" },
        ],
        correct: "A",
        feedback:
          "Mietkaution max. 3 Monatsmieten (CHF 3'600). Spezielles Konto auf Namen der Mieterin, an Vermieter verpfändet. Nur beide Parteien gemeinsam verfügungsberechtigt.",
      },
      {
        id: "1.3",
        level: 1,
        situation:
          "Kunde fragt: «Warum bekomme ich auf meinem Sparkonto 0.4% Zins aber auf dem Privatkonto nur 0.1%?»",
        question: "Was antwortest du?",
        options: [
          { key: "A", text: "«Weil die Bank Spargelder für Hypotheken nutzt und den Mehrertrag weitergeben kann»" },
          { key: "B", text: "«Das ist eine gesetzliche Vorgabe – Spareinlagen müssen bevorzugt verzinst werden»" },
          { key: "C", text: "«Weniger Transaktionen bedeuten tiefere Verwaltungskosten – davon profitierst du als Zinsvorteil»" },
          { key: "D", text: "«Je länger die Bank über dein Geld verfügen kann, desto mehr Zins – Sparkonto hat engere Rückzugslimiten»" },
        ],
        correct: "D",
        feedback:
          "Zins und Rückzugsbedingungen hängen direkt zusammen. Sparkonto = höherer Zins, engere Limiten. Privatkonto = tiefer Zins, hohe Verfügbarkeit.",
      },
      {
        id: "1.4",
        level: 1,
        situation:
          "Frau Weber, 35 Jahre, möchte für ihre Tochter Lena, 8 Jahre, ein Konto eröffnen. Sie fragt: «Welches Konto ist für Kinder am sinnvollsten?»",
        question: "Was empfiehlst du?",
        options: [
          { key: "A", text: "Privatkonto auf Namen der Mutter – so behält sie die volle Kontrolle" },
          { key: "B", text: "Jugendsparkonto auf Namen von Lena – höherer Zins, Eltern sind bis 18 verfügungsberechtigt" },
          { key: "C", text: "Sparkonto auf Namen der Mutter, Lena als Begünstigte eingetragen" },
          { key: "D", text: "Fondssparplan, weil Zinsen für Kinder zu niedrig sind" },
        ],
        correct: "B",
        feedback:
          "Jugendsparkonto auf Namen des Kindes: Viele Banken bieten Kinder/Jugend-Konten mit bevorzugtem Zinssatz. Das Konto gehört dem Kind, Eltern sind bis zur Volljährigkeit gesetzliche Vertreter. Ab 18 Jahren übernimmt das Kind die Verfügungsberechtigung automatisch.",
      },
      {
        id: "1.5",
        level: 1,
        situation:
          "Kunde Lars möchte wissen: «Was passiert mit meinen Ersparnissen, wenn die Bank pleitegeht?»",
        question: "Was erklärst du ihm?",
        options: [
          { key: "A", text: "«Bankguthaben sind nicht versichert – das Risiko trägt der Kunde vollständig»" },
          { key: "B", text: "«Die Nationalbank garantiert alle Spareinlagen unbegrenzt»" },
          { key: "C", text: "«Die Einlagensicherung (esisuisse) schützt CHF 100'000 pro Kunde und Bank – darüber hinaus besteht Verlustrisiko»" },
          { key: "D", text: "«Nur Sparkonten sind geschützt, Privatkonten nicht»" },
        ],
        correct: "C",
        feedback:
          "Einlagensicherung esisuisse: bis CHF 100'000 pro Kunde und Bank sind privilegiert. Bei Liquidation werden diese zuerst bedient. Beträge über CHF 100'000 sind ungesichert. Empfehlung: Über CHF 100'000 auf mehrere Banken aufteilen.",
      },
    ],
  },
  {
    level: 2,
    label: "Fortgeschritten",
    badgeVariant: "orange",
    scenarios: [
      {
        id: "2.1",
        level: 2,
        situation:
          "Frau Berger möchte ihr Sparkonto saldieren. Du siehst: Kontostand CHF 4'200, offene Kreditkartenrechnung CHF 340, pendenter Dauerauftrag CHF 150 morgen.",
        question: "Was machst du?",
        options: [
          { key: "A", text: "Erst alle pendenten Positionen prüfen und klären" },
          { key: "B", text: "Sofort saldieren" },
          { key: "C", text: "Nur Restbetrag auszahlen" },
          { key: "D", text: "CHF 4'200 sofort auszahlen – Kreditkartenrechnung und Dauerauftrag werden in der nächsten Verarbeitungsperiode automatisch abgewickelt." },
        ],
        correct: "A",
        feedback:
          "Vor Saldierung: alle pendenten Aufträge, offene Kreditkartenrechnungen und Daueraufträge prüfen. Erst dann Konto auflösen. Zinsen gutschreiben, Gebühren belasten.",
      },
      {
        id: "2.2",
        level: 2,
        situation:
          "Kunde: «Ich habe CHF 100 Zins bekommen aber nur CHF 65 gutgeschrieben. Was ist mit CHF 35 passiert?»",
        question: "Was erklärst du?",
        options: [
          { key: "A", text: "«Das ist eine Bankgebühr»" },
          {
            key: "B",
            text: "«Verrechnungssteuer 35% – geht an Steuerverwaltung, über Steuererklärung rückforderbar»",
          },
          { key: "C", text: "«Das ist ein Fehler»" },
          { key: "D", text: "«Nicht rückforderbar»" },
        ],
        correct: "B",
        feedback:
          "Verrechnungssteuer = 35% des Bruttozinses, direkt an Steuerverwaltung. Kunde erhält Nettozins (65%). Wer Zinsen korrekt deklariert, bekommt 35% zurück.",
      },
      {
        id: "2.3",
        level: 2,
        situation:
          "Kunde hat Job gekündigt: «Kann ich das PK-Geld auf mein Privatkonto transferieren?»",
        question: "Was erklärst du?",
        options: [
          { key: "A", text: "«Ja, direkt aufs Privatkonto»" },
          { key: "B", text: "«Sofort in 3a einzahlen»" },
          { key: "C", text: "«PK-Geld verfällt bei Kündigung»" },
          { key: "D", text: "«Nein – muss auf Freizügigkeitskonto bis neue PK»" },
        ],
        correct: "D",
        feedback:
          "PK-Guthaben → Freizügigkeitskonto → neue Pensionskasse. Konto ist gesperrt. Vorbezug nur unter Sonderbedingungen (Eigenheim, Auswanderung, Selbständigkeit).",
      },
      {
        id: "2.4",
        level: 2,
        situation:
          "Herr Keller, 72 Jahre, möchte seiner Tochter (48) eine Vollmacht für sein Sparkonto geben. Er fragt: «Was kann sie dann mit dem Konto machen?»",
        question: "Was erklärst du Herrn Keller?",
        options: [
          { key: "A", text: "«Mit Vollmacht kann die Tochter Geld abheben, Überweisungen tätigen und Kontoauszüge abfragen – aber keine neuen Konten eröffnen oder das Konto auflösen»" },
          { key: "B", text: "«Eine Vollmacht gibt der Tochter dieselben Rechte wie dem Kontoinhaber – sie kann alles tun, auch das Konto auflösen»" },
          { key: "C", text: "«Vollmachten für Privatkonten sind möglich, für Sparkonten gesetzlich nicht erlaubt»" },
          { key: "D", text: "«Die Vollmacht erlischt automatisch, wenn Herr Keller krank wird oder stirbt»" },
        ],
        correct: "A",
        feedback:
          "Kontovollmacht: Die Bevollmächtigte kann im Rahmen der erteilten Rechte verfügen (Bezüge, Überweisungen, Auskünfte). Kontoauflösung, Kontoeröffnung und Änderung des Kontoinhabers bleiben dem Inhaber vorbehalten. Die Vollmacht erlischt beim Tod (dann erben die Erben). Bei Urteilsunfähigkeit bleibt sie grundsätzlich gültig – ausser das Konto wird unter Beistandschaft gestellt.",
      },
      {
        id: "2.5",
        level: 2,
        situation:
          "Junge Kundin Mia, 21 Jahre, hat ihr Privatkonto um CHF 230 überzogen. Die Bank hat CHF 12 Überziehungszinsen belastet. Mia ist überrascht: «Ich dachte, ich kann kurz ins Minus?»",
        question: "Was erklärst du Mia?",
        options: [
          { key: "A", text: "«Kontoüberziehungen sind bei uns immer gratis – die CHF 12 sind ein Fehler, wir korrigieren das»" },
          { key: "B", text: "«Privatkonten dürfen nicht überzogen werden – wir sperren das Konto sofort»" },
          { key: "C", text: "«Kurze Überziehungen werden toleriert, aber mit hohem Überziehungszins belastet – das ist teurer Kredit. Dauerhafter Bedarf → besser Kontokorrentlimite beantragen»" },
          { key: "D", text: "«Nur bei Jugendkonten werden Überziehungszinsen verrechnet – bei Erwachsenenkonten nicht»" },
        ],
        correct: "C",
        feedback:
          "Kontoüberziehung = ungeplanter Kredit zu hohem Zins (oft 10–15% p.a.). CHF 12 auf CHF 230 klingt klein, aber das entspricht über 5% für wenige Tage. Wer regelmässig knapp ist: Kontokorrentlimite ist günstiger. Noch besser: Pufferreserve auf Sparkonto anlegen.",
      },
    ],
  },
  {
    level: 3,
    label: "Challenge-Niveau",
    badgeVariant: "red",
    scenarios: [
      {
        type: "lückentext",
        id: "3.1",
        level: 3,
        briefing:
          "Kundin Sabine, 32 Jahre, zahlt CHF 200 pro Monat in 3a. Sie hat bereits CHF 52'000 auf einem 3a-Konto.",
        question:
          "Der 3a-Maximalbetrag 2026 beträgt CHF ___ pro Jahr.",
        answer: "7258",
        unit: "CHF",
        tolerance: 5,
        feedback:
          "3a-Maximalbetrag 2026: CHF 7'258/Jahr (CHF 604.80/Monat). Sabine zahlt nur CHF 2'400 – verschenkt CHF 4'858 Steuerersparnis. Ab CHF 50'000 zweites Konto für gestaffelte Bezüge empfehlen.",
      },
      {
        id: "3.2",
        level: 3,
        situation:
          "Kunde: «Ich habe 2025 vergessen in meine 3a einzuzahlen. Das Geld ist verloren?»",
        question: "Was antwortest du?",
        options: [
          { key: "A", text: "«Ab 2026 können Lücken nachgeholt werden – aber erst wenn aktueller Maximalbetrag ausgeschöpft»" },
          {
            key: "B",
            text: "«Ja leider – nicht mehr möglich»",
          },
          { key: "C", text: "«Einfach zusätzlich einzahlen»" },
          { key: "D", text: "«Nur Selbständige können nachzahlen»" },
        ],
        correct: "A",
        feedback:
          "Neu ab 2026: Beitragslücken ab 2025 können rückwirkend nachgeholt werden. Bedingung: aktueller Maximalbetrag muss zuerst ausgeschöpft sein. Lücken vor 2025 nicht möglich.",
      },
      {
        type: "lückentext",
        id: "3.3",
        level: 3,
        briefing:
          "Kundin hat CHF 180'000 auf Sparkonto. Sie fragt nervös: «Ist mein Geld sicher?»",
        question:
          "Die Einlagensicherung schützt CHF ___ pro Kunde und Bank.",
        answer: "100000",
        unit: "CHF",
        tolerance: 1,
        feedback:
          "Einlagensicherung schützt CHF 100'000 pro Kunde und Bank. CHF 80'000 sind ungeschützt. Empfehlung: Beträge über CHF 100'000 auf mehrere Banken aufteilen.",
      },
      {
        id: "3.4",
        level: 3,
        situation:
          "Kundin Petra, 58 Jahre, hat CHF 420'000 auf einem Sparkonto bei der Kantonalbank. Sie fragt: «Wie viel ist bei Ihrer Bank eigentlich geschützt? Und was soll ich mit dem Rest tun?»",
        question: "Was empfiehlst du Petra konkret?",
        options: [
          { key: "A", text: "«Alles ist geschützt – Kantonalbanken haben Staatsgarantie, unbegrenzt»" },
          { key: "B", text: "«CHF 100'000 sind durch esisuisse gesichert. Die restlichen CHF 320'000 sind im Konkursfall ungesichert. Empfehlung: Beträge auf 2–3 verschiedene Banken verteilen»" },
          { key: "C", text: "«Nichts ist gesichert – Bankeinlagen sind Forderungen ohne Priorität»" },
          { key: "D", text: "«CHF 100'000 sind gesichert. Den Rest sofort in Obligationen umschichten – die sind vom Bankkonkurs nicht betroffen»" },
        ],
        correct: "B",
        feedback:
          "Kantonalbanken: Die meisten (nicht alle) haben Staatsgarantie – dann sind Einlagen tatsächlich über CHF 100'000 geschützt. Aber: nicht jede Kantonalbank hat Staatsgarantie (z.B. Berner Kantonalbank, Genfer Kantonalbank nicht mehr). Im Zweifelsfall aufteilen ist sicherer. Wichtig: esisuisse gilt für alle Banken, Staatsgarantie nur für bestimmte Kantonalbanken.",
      },
      {
        type: "lückentext",
        id: "3.5",
        level: 3,
        briefing:
          "Kundin Silvia, 45 Jahre, erhält als Reaktion auf einen Stellenwechsel CHF 85'000 Freizügigkeitsleistung von ihrer alten PK. Sie fragt dich: «Was passiert, wenn ich das Geld nicht rechtzeitig auf ein Freizügigkeitskonto überweise?»",
        question:
          "Wird die Freizügigkeitsleistung nicht selbst gemeldet, überweist die PK das Geld an die ___.",
        answer: "Auffangeinrichtung",
        unit: "",
        feedback:
          "Meldet man der alten PK nicht wohin das Geld soll, überweist sie es an die Auffangeinrichtung BVG (nationale Sammelstiftung). Das Geld ist nicht verloren, aber die Verwaltungsgebühren sind höher und die Zinsen tiefer. Empfehlung: Freizügigkeitskonto bei einer Bank eröffnen und Nummer der PK mitteilen – vor Austritt.",
      },
    ],
  },
];
