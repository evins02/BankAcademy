export type OptionKey = "A" | "B" | "C" | "D";
export type LevelNum = 1 | 2 | 3;

export interface ZvOption {
  key: OptionKey;
  text: string;
}

export interface ZvCase {
  id: string;
  level: LevelNum;
  briefing: string;
  question: string;
  options: ZvOption[];
  correct: OptionKey;
  feedback: string;
}

export interface ZvLevelConfig {
  level: LevelNum;
  label: string;
  badgeVariant: "green" | "orange" | "red";
  cases: ZvCase[];
}

export const ZV_LERNBLOCK_STEPS = [
  {
    num: 1,
    title: "Zahlungsaufträge",
    detail: "IBAN korrekt? Betrag und Valuta stimmen? Deckung vorhanden?",
  },
  {
    num: 2,
    title: "Retouren",
    detail: "Warum wird Zahlung zurückgewiesen? Was muss korrigiert werden?",
  },
  {
    num: 3,
    title: "Daueraufträge",
    detail: "Fehler erkennen, fehlende Deckung melden.",
  },
  {
    num: 4,
    title: "Verdächtige Zahlungen",
    detail: "Ungewöhnliche Transaktionen erkennen, GwG Meldepflicht beachten.",
  },
  {
    num: 5,
    title: "Verlust Zahlungsmittel",
    detail: "Sofortmassnahmen: Sperrung und Ersatz organisieren.",
  },
];

export const ZV_LEVELS: ZvLevelConfig[] = [
  {
    level: 1,
    label: "Einsteiger",
    badgeVariant: "green",
    cases: [
      {
        id: "1.1",
        level: 1,
        briefing:
          "Du bearbeitest einen Zahlungsauftrag. Der Kunde möchte CHF 2'500 überweisen. Die IBAN hat 22 Stellen statt 21.",
        question: "Was machst du?",
        options: [
          { key: "A", text: "Zahlung trotzdem ausführen" },
          {
            key: "B",
            text: "Zahlung zurückweisen – IBAN ungültig. Kunde muss korrekte IBAN nachliefern.",
          },
          { key: "C", text: "Fehlende Stelle selbst ergänzen" },
          { key: "D", text: "Vorgesetzten fragen" },
        ],
        correct: "B",
        feedback:
          "Schweizer IBAN hat immer 21 Stellen (CH + 2 Prüfziffern + 17 Stellen). Ungültige IBAN = Zahlung kann nicht ausgeführt werden. Immer zurückweisen und Kunden informieren.",
      },
      {
        id: "1.2",
        level: 1,
        briefing:
          "Dauerauftrag CHF 1'500 soll heute ausgeführt werden. Kontostand des Kunden: CHF 800.",
        question: "Was passiert?",
        options: [
          { key: "A", text: "Zahlung wird trotzdem ausgeführt" },
          {
            key: "B",
            text: "Dauerauftrag wird nicht ausgeführt – fehlende Deckung. Kunde wird informiert.",
          },
          { key: "C", text: "Bank streckt den Betrag vor" },
          { key: "D", text: "Teilzahlung CHF 800" },
        ],
        correct: "B",
        feedback:
          "Bei fehlender Deckung wird der Dauerauftrag nicht ausgeführt. Kunde erhält eine Benachrichtigung. Kein automatischer Überziehungskredit ohne vereinbarten Kontokorrentkredit.",
      },
      {
        id: "1.3",
        level: 1,
        briefing:
          "Kundin ruft an: «Ich habe meine Maestrokarte verloren – was soll ich tun?»",
        question: "Was sind die Sofortmassnahmen?",
        options: [
          { key: "A", text: "Neue Karte bestellen – alte läuft weiter" },
          {
            key: "B",
            text: "Karte sofort sperren lassen via Sperrhotline, dann Ersatzkarte beantragen.",
          },
          { key: "C", text: "Warten ob Karte wieder auftaucht" },
          { key: "D", text: "Nur Limit reduzieren" },
        ],
        correct: "B",
        feedback:
          "Bei Kartenverlust sofort sperren – 24h Sperrhotline: 0800 80 40 40 (CH). Gesperrte Karte kann nicht mehr verwendet werden. Danach Ersatzkarte beantragen. Bis zur neuen Karte kann Kunde am Schalter Geld beziehen.",
      },
    ],
  },
  {
    level: 2,
    label: "Fortgeschritten",
    badgeVariant: "orange",
    cases: [
      {
        id: "2.1",
        level: 2,
        briefing:
          "Eine Zahlung von CHF 5'000 wurde retourniert mit Vermerk: «Konto gesperrt». Was machst du?",
        question: "Wie gehst du vor?",
        options: [
          { key: "A", text: "Zahlung nochmals ausführen" },
          {
            key: "B",
            text: "Betrag dem Auftraggeber zurückbuchen, Kunden informieren dass Empfängerkonto gesperrt ist, neue Zahlungsdetails anfordern.",
          },
          { key: "C", text: "Direkt ans Empfängerinstitut eskalieren" },
          { key: "D", text: "Abwarten" },
        ],
        correct: "B",
        feedback:
          "Retournierte Zahlung = Betrag geht zurück zum Auftraggeber. Kunde muss informiert werden und neue gültige Zahlungsdetails liefern. Gesperrtes Konto kann nicht beliefert werden.",
      },
      {
        id: "2.2",
        level: 2,
        briefing:
          "Auslandzahlung nach Deutschland CHF 8'000. BIC fehlt im Auftrag.",
        question: "Was machst du?",
        options: [
          { key: "A", text: "Zahlung ohne BIC ausführen" },
          {
            key: "B",
            text: "Zahlung zurückhalten – BIC ist bei Auslandzahlungen zwingend. Kunde muss BIC nachliefern.",
          },
          { key: "C", text: "BIC selbst recherchieren und ergänzen" },
          { key: "D", text: "Als Inlandzahlung verbuchen" },
        ],
        correct: "B",
        feedback:
          "Bei Auslandzahlungen sind IBAN und BIC (Bank Identifier Code) zwingend. Ohne BIC kann die Zahlung nicht korrekt weitergeleitet werden. Niemals selbst ergänzen – Kundenfehler gehören dem Kunden.",
      },
      {
        id: "2.3",
        level: 2,
        briefing:
          "Du siehst im System: Gleiche Zahlung CHF 3'200 an gleichen Empfänger wurde heute zweimal ausgeführt. Auftrag war nur einmal erteilt.",
        question: "Was machst du?",
        options: [
          { key: "A", text: "Nichts – könnte gewollt sein" },
          {
            key: "B",
            text: "Sofort intern melden, Rückbuchung der Doppelzahlung einleiten, Kunden informieren.",
          },
          { key: "C", text: "Warten bis Kunde sich meldet" },
          { key: "D", text: "Empfänger direkt kontaktieren" },
        ],
        correct: "B",
        feedback:
          "Doppelzahlung sofort intern eskalieren und Rückbuchung einleiten. Kunden proaktiv informieren – nicht warten. Systemfehler oder manueller Fehler muss dokumentiert werden.",
      },
    ],
  },
  {
    level: 3,
    label: "LAP-Niveau",
    badgeVariant: "red",
    cases: [
      {
        id: "3.1",
        level: 3,
        briefing:
          "Privatkunde überweist innerhalb 2 Tagen dreimal CHF 9'500 ins Ausland. Sein Monatseinkommen: CHF 5'200. Transaktionen passen nicht zum Kundenprofil.",
        question: "Was machst du?",
        options: [
          { key: "A", text: "Zahlungen normal ausführen" },
          { key: "B", text: "Zahlungen ausführen aber intern notieren" },
          {
            key: "C",
            text: "Transaktionen stoppen, besondere Abklärungspflicht gemäss GwG, bei Verdacht Meldung an MROS.",
          },
          { key: "D", text: "Kunde direkt fragen" },
        ],
        correct: "C",
        feedback:
          "Beträge knapp unter CHF 10'000 = klassisches Structuring zur Umgehung der Meldepflicht. Passt nicht zum Kundenprofil = besondere Abklärungspflicht GwG Art. 6. Bei Verdacht: Meldung MROS, Sperrpflicht, Informationsverbot gegenüber Kunde.",
      },
      {
        id: "3.2",
        level: 3,
        briefing:
          "Kunde widerspricht einem LSV-Lastschrifteinzug von CHF 450. Er sagt: «Diese Zahlung habe ich nicht autorisiert.»",
        question: "Wie gehst du vor?",
        options: [
          { key: "A", text: "Widerspruch ablehnen – LSV ist automatisch" },
          {
            key: "B",
            text: "Widerspruch prüfen – bei berechtigtem Widerspruch Betrag zurückbuchen. Widerspruchsfrist beachten (30 Tage nach Belastung).",
          },
          { key: "C", text: "Direkt an Zahlungsempfänger weiterleiten" },
          { key: "D", text: "Nichts unternehmen" },
        ],
        correct: "B",
        feedback:
          "Bei LSV hat Kunde Widerspruchsrecht innert 30 Tagen. Berechtigter Widerspruch = Rückbuchung. Zahlungsempfänger wird informiert. Bank prüft ob LSV-Mandat vorhanden war.",
      },
      {
        id: "3.3",
        level: 3,
        briefing:
          "Du prüfst einen Zahlungsauftrag: Betrag CHF 15'000, IBAN korrekt, Valuta gestern (Vergangenheit), Verwendungszweck leer, Deckung CHF 12'000.",
        question: "Was sind die Probleme?",
        options: [
          { key: "A", text: "Alles korrekt – ausführen" },
          { key: "B", text: "Nur Deckung fehlt" },
          {
            key: "C",
            text: "Zwei Probleme: Valuta in Vergangenheit nicht möglich + fehlende Deckung CHF 3'000. Zurückweisen mit Begründung.",
          },
          {
            key: "D",
            text: "Verwendungszweck ergänzen und ausführen",
          },
        ],
        correct: "C",
        feedback:
          "Valuta kann nicht in der Vergangenheit liegen – frühestens heute oder zukünftig. Fehlende Deckung CHF 3'000. Beide Fehler zurückweisen. Verwendungszweck ist bei Inlandzahlungen optional – kein Fehler.",
      },
    ],
  },
];
