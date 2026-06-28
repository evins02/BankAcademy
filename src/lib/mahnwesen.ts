import { type LückentextCase } from "./lückentext";

export type OptionKey = "A" | "B" | "C" | "D";
export type LevelNum = 1 | 2 | 3;

export interface MwOption {
  key: OptionKey;
  text: string;
}

export interface MwCase {
  id: string;
  level: LevelNum;
  briefing: string;
  question: string;
  options: MwOption[];
  correct: OptionKey;
  feedback: string;
}

export interface MwLevelConfig {
  level: LevelNum;
  label: string;
  badgeVariant: "green" | "orange" | "red";
  cases: (MwCase | LückentextCase)[];
}

export const MAHNPROZESS_STUFEN = [
  {
    stufe: 1,
    title: "Zahlungserinnerung",
    days: "10 Tage nach Fälligkeit",
    detail: "Freundlich, keine Gebühr",
  },
  {
    stufe: 2,
    title: "1. Mahnung",
    days: "20 Tage nach Fälligkeit",
    detail: "Mahngebühr CHF 20–30",
  },
  {
    stufe: 3,
    title: "2. Mahnung",
    days: "35 Tage nach Fälligkeit",
    detail: "Mahngebühr CHF 30–50 · Letzte Warnung",
  },
  {
    stufe: 4,
    title: "Kündigung Kredit",
    days: "50 Tage nach Fälligkeit",
    detail: "Schriftlich, eingeschrieben",
  },
  {
    stufe: 5,
    title: "Betreibung",
    days: "Nach Kündigung",
    detail: "Betreibungsbegehren",
  },
];

export const MW_LEVELS: MwLevelConfig[] = [
  {
    level: 1,
    label: "Einsteiger",
    badgeVariant: "green",
    cases: [
      {
        type: "lückentext",
        id: "1.1",
        level: 1,
        briefing:
          "Hypothekarzins CHF 2'400 war am 01. Mai fällig. Heute ist der 15. Mai. Keine Zahlung eingegangen.",
        question:
          "Die Zahlungserinnerung wird ___ Tage nach Fälligkeit verschickt.",
        answer: "10",
        unit: "Tage",
        feedback:
          "Die Zahlungserinnerung erfolgt 10 Tage nach Fälligkeit – freundliche erste Kontaktaufnahme, noch keine Mahngebühr. Ziel: Kunde zahlt ohne weitere Eskalation.",
      },
      {
        id: "1.2",
        level: 1,
        briefing:
          "Kunde hat nach der 1. Mahnung den ausstehenden Betrag bezahlt. Die Mahnung hatte eine Gebühr von CHF 25.",
        question: "Was passiert mit der Mahngebühr?",
        options: [
          { key: "A", text: "Gebühr wird erlassen – Kunde hat ja gezahlt" },
          {
            key: "B",
            text: "Mahngebühr CHF 25 bleibt bestehen und wird dem Kunden belastet.",
          },
          { key: "C", text: "Gebühr halbieren" },
          { key: "D", text: "Vorgesetzten entscheiden lassen" },
        ],
        correct: "B",
        feedback:
          "Mahngebühren werden nicht erlassen wenn Kunde danach zahlt. Die Gebühr entstand durch den Mahnaufwand der Bank. Nur in Ausnahmefällen und mit Genehmigung kann eine Gebühr erlassen werden.",
      },
      {
        id: "1.3",
        level: 1,
        briefing:
          "Konsumkredit Rate CHF 450 war am 01. April fällig. Zahlungserinnerung wurde am 11. April geschickt. Keine Reaktion. Heute ist der 25. April.",
        question: "Was ist jetzt zu tun?",
        options: [
          { key: "A", text: "Nochmals Zahlungserinnerung" },
          {
            key: "B",
            text: "1. Mahnung mit Frist und Mahngebühr senden.",
          },
          { key: "C", text: "Sofort kündigen" },
          { key: "D", text: "Betreibung einleiten" },
        ],
        correct: "B",
        feedback:
          "Zahlungserinnerung wurde ignoriert. Nächste Stufe: 1. Mahnung mit konkreter Zahlungsfrist und Mahngebühr. Kunde muss verstehen dass Eskalation folgt.",
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
          "Kunde hat trotz Zahlungserinnerung und zwei Mahnungen nicht gezahlt. Rückstand: CHF 3'600. Was sind die Voraussetzungen für eine Kündigung?",
        question: "Wie gehst du vor?",
        options: [
          { key: "A", text: "Sofort kündigen – zwei Mahnungen reichen" },
          {
            key: "B",
            text: "Kündigung nur schriftlich per Einschreiben, mit Kündigungsfrist, nachdem alle Mahnstufen durchlaufen wurden.",
          },
          { key: "C", text: "Mündlich kündigen reicht" },
          { key: "D", text: "Erst Betreibung, dann Kündigung" },
        ],
        correct: "B",
        feedback:
          "Kündigung muss zwingend schriftlich per Einschreiben erfolgen. Alle vorherigen Mahnstufen müssen durchlaufen sein. Kündigung ohne korrekte Mahnstufen kann rechtlich angefochten werden.",
      },
      {
        id: "2.2",
        level: 2,
        briefing:
          "Kunde schuldet CHF 1'800. Nach der 1. Mahnung zahlt er CHF 900 – die Hälfte. Er sagt: «Den Rest zahle ich nächsten Monat.»",
        question: "Was machst du?",
        options: [
          { key: "A", text: "Einverstanden – Teilzahlung akzeptieren und Mahnprozess stoppen" },
          {
            key: "B",
            text: "Teilzahlung verbuchen, aber Mahnprozess für ausstehende CHF 900 weiterführen. Schriftliche Bestätigung der Ratenzahlung einholen.",
          },
          { key: "C", text: "Gesamten Betrag zurückbuchen" },
          { key: "D", text: "Mahnprozess vollständig stoppen" },
        ],
        correct: "B",
        feedback:
          "Teilzahlung wird verbucht aber Mahnprozess läuft für Restbetrag weiter. Ohne schriftliche Vereinbarung hat mündliche Zusage keinen Bestand. Ratenzahlungsvereinbarung schriftlich festhalten.",
      },
      {
        id: "2.3",
        level: 2,
        briefing:
          "Kredit wurde gekündigt. Kunde zahlt trotzdem nicht. Was braucht es für die Betreibung?",
        question: "Wie leitest du die Betreibung ein?",
        options: [
          { key: "A", text: "Mündliche Anweisung an Betreibungsamt reicht" },
          {
            key: "B",
            text: "Betreibungsbegehren beim zuständigen Betreibungsamt einreichen mit: Schuldnerdaten, Forderungsbetrag, Forderungsgrund.",
          },
          { key: "C", text: "Direkt Konkurs anmelden" },
          { key: "D", text: "Anwalt beauftragen und abwarten" },
        ],
        correct: "B",
        feedback:
          "Betreibung läuft über das zuständige Betreibungsamt (Wohnort des Schuldners). Betreibungsbegehren mit genauen Schuldnerdaten und Forderungsdetails. Betreibungsamt schickt dann Zahlungsbefehl an Schuldner.",
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
          "Bank hat Betreibung eingeleitet. Schuldner erhebt Rechtsvorschlag. Was bedeutet das und was muss die Bank tun?",
        question: "Wie reagierst du?",
        options: [
          { key: "A", text: "Betreibung ist erledigt – Rechtsvorschlag beendet alles" },
          {
            key: "B",
            text: "Rechtsvorschlag stoppt Betreibung vorläufig. Bank muss Rechtsöffnung beantragen beim Gericht um Betreibung fortzusetzen.",
          },
          { key: "C", text: "Sofort Konkurs einleiten" },
          { key: "D", text: "Nichts – einfach abwarten" },
        ],
        correct: "B",
        feedback:
          "Rechtsvorschlag = Schuldner bestreitet Forderung. Betreibung wird unterbrochen. Bank braucht Rechtsöffnung (provisorisch oder definitiv) um weiterzumachen. Provisorische Rechtsöffnung möglich wenn schriftliche Schuldanerkennung vorliegt (z.B. Kreditvertrag).",
      },
      {
        id: "3.2",
        level: 3,
        briefing:
          "Hypothekarkunde hat 3 Monate Zins nicht bezahlt. Total CHF 7'200 ausstehend. Alle Mahnstufen durchlaufen. Objekt: Eigenheim Wert CHF 900'000. Hypothek: CHF 600'000.",
        question: "Was empfiehlst du?",
        options: [
          { key: "A", text: "Sofort Betreibung auf Pfandverwertung einleiten" },
          {
            key: "B",
            text: "Trotz Kündigung zuerst Gespräch mit Kunde suchen – Verkauf des Objekts oder Refinanzierung prüfen. Zwangsverwertung ist letztes Mittel.",
          },
          { key: "C", text: "Kredit sofort abschreiben" },
          { key: "D", text: "Nichts unternehmen – Objekt ist genug Sicherheit" },
        ],
        correct: "B",
        feedback:
          "Bei Hypotheken mit genügend Deckung immer zuerst Lösung suchen. Zwangsverwertung ist für alle teuer und langwierig. Verkauf durch Kunden selbst ist oft bessere Lösung. Erst wenn keine Einigung = Betreibung auf Pfandverwertung.",
      },
      {
        type: "lückentext",
        id: "3.3",
        level: 3,
        briefing:
          "Eine offene Forderung aus 2019 von CHF 2'800 wurde nie betrieben. Kunde taucht wieder auf und möchte ein neues Konto eröffnen.",
        question:
          "Konsumkreditforderungen verjähren nach ___ Jahren.",
        answer: "5",
        unit: "Jahre",
        feedback:
          "Konsumkreditforderungen verjähren nach 5 Jahren. Verjährte Forderung kann rechtlich nicht mehr eingefordert werden. Neue Geschäftsbeziehung wird separat geprüft – Bonität und ZEK-Eintrag beachten.",
      },
    ],
  },
];
