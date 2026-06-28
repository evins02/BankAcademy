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
          { key: "A", text: "Geld bar dem Vermieter übergeben" },
          { key: "B", text: "Mieterkautionskonto eröffnen über 2-3 Monatsmieten" },
          { key: "C", text: "Geld auf Sparkonto legen" },
          { key: "D", text: "Kaution ist freiwillig" },
        ],
        correct: "B",
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
          { key: "A", text: "«Das entscheidet die Bank einfach so»" },
          {
            key: "B",
            text: "«Je länger die Bank über dein Geld verfügen kann, desto mehr Zins – Sparkonto hat engere Rückzugslimiten»",
          },
          { key: "C", text: "«Sparkonto ist sicherer»" },
          { key: "D", text: "«Privatkonto hat eigentlich den besseren Zins»" },
        ],
        correct: "B",
        feedback:
          "Zins und Rückzugsbedingungen hängen direkt zusammen. Sparkonto = höherer Zins, engere Limiten. Privatkonto = tiefer Zins, hohe Verfügbarkeit.",
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
          { key: "A", text: "Sofort saldieren" },
          { key: "B", text: "Erst alle pendenten Positionen prüfen und klären" },
          { key: "C", text: "Nur Restbetrag auszahlen" },
          { key: "D", text: "Vorgesetzten fragen" },
        ],
        correct: "B",
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
          { key: "B", text: "«Nein – muss auf Freizügigkeitskonto bis neue PK»" },
          { key: "C", text: "«PK-Geld verfällt bei Kündigung»" },
          { key: "D", text: "«Sofort in 3a einzahlen»" },
        ],
        correct: "B",
        feedback:
          "PK-Guthaben → Freizügigkeitskonto → neue Pensionskasse. Konto ist gesperrt. Vorbezug nur unter Sonderbedingungen (Eigenheim, Auswanderung, Selbständigkeit).",
      },
    ],
  },
  {
    level: 3,
    label: "LAP-Niveau",
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
          { key: "A", text: "«Ja leider – nicht mehr möglich»" },
          {
            key: "B",
            text: "«Ab 2026 können Lücken nachgeholt werden – aber erst wenn aktueller Maximalbetrag ausgeschöpft»",
          },
          { key: "C", text: "«Einfach zusätzlich einzahlen»" },
          { key: "D", text: "«Nur Selbständige können nachzahlen»" },
        ],
        correct: "B",
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
    ],
  },
];
