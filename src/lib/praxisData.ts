export interface PraxisTip {
  text: string;
  source: string;
}

export interface ModulePraxisData {
  configId: string;
  denkweise: {
    title: string;
    text: string;
  };
  tips: PraxisTip[];
}

export const PRAXIS_DATA: Record<string, ModulePraxisData> = {
  privatkunde: {
    configId: "privatkunde",
    denkweise: {
      title: "Wie denkt ein Privatkundenberater?",
      text: `Ein erfahrener Privatkundenberater denkt bei jeder Kontoeröffnung zuerst: "Ist diese Person wirklich wer sie vorgibt zu sein?" Identifikation ist nicht Bürokratie – es ist der erste Schutz der Bank und des Kunden.

Die Frage ist nie: "Vertraue ich dem Kunden?"
Die Frage ist immer: "Habe ich meine Pflicht erfüllt?"

Bei der Hypothekenberatung denkt der Berater in Szenarien. Nicht nur: "Kann sich der Kunde das heute leisten?" – sondern: "Was passiert wenn die Zinsen steigen? Was wenn er den Job verliert?" Das ist nachhaltige, kundenorientierte Beratung.`,
    },
    tips: [
      {
        text: "Schau immer zuerst das Ablaufdatum des Ausweises an – das ist der häufigste Grund für Nachbearbeitungen bei Kontoeröffnungen.",
        source: "Front Office Erfahrung",
      },
      {
        text: "Bei Unklarheiten zum wirtschaftlich Berechtigten: Lieber einmal zu viel fragen als zu wenig. Compliance schaut das bei jedem Review an.",
        source: "Compliance Abteilung",
      },
      {
        text: "Neue Kunden sind oft nervös. Erkläre kurz was du machst während du die Dokumente prüfst – das schafft Vertrauen und wirkt professionell.",
        source: "Front Office Erfahrung",
      },
      {
        text: "Berechne die Tragbarkeit immer für beide Szenarien: heute UND Rentenalter. Spare dir die Nacharbeit und zeige dem Kunden das Gesamtbild.",
        source: "Credit Office Erfahrung",
      },
      {
        text: "Kunden unterschätzen oft die Nebenkosten einer Hypothek. Erkläre aktiv: Unterhalt, Versicherung, Steuern – das gehört zur guten Beratung.",
        source: "Front Office Erfahrung",
      },
      {
        text: "Pricing immer nochmals gemeinsam mit dem Kunden durchgehen bevor er unterschreibt. Missverständnisse kosten später Zeit und Vertrauen.",
        source: "Front Office Erfahrung",
      },
      {
        text: "ZEK immer vor dem Gespräch prüfen – nicht danach. Du willst keine Überraschungen vor dem Kunden.",
        source: "Credit Office Erfahrung",
      },
      {
        text: "Ablehnungen immer mit Zahlen begründen – nie persönlich werden. Zeige dem Kunden genau warum es nicht reicht und was er ändern könnte.",
        source: "Front Office Erfahrung",
      },
    ],
  },

  firmenkunde: {
    configId: "firmenkunde",
    denkweise: {
      title: "Wie denkt ein Firmenkundenberater?",
      text: `Bei Firmenkunden denkt der Berater wie ein Unternehmer.
Nicht nur: "Kann die Firma zahlen?"
Sondern: "Verstehe ich das Business? Welche Risiken gibt es? Wie sieht die Firma in 3 Jahren aus?"

Das ist echter Firmenkundenberater. Zahlen lesen ist die Mindestanforderung. Das Geschäftsmodell zu verstehen ist der Unterschied zwischen einem guten und einem sehr guten Berater.

Bei Jahresabschlüssen: Schau nicht nur auf den Gewinn. Cashflow und Eigenkapitalquote sagen viel mehr über die finanzielle Gesundheit aus.`,
    },
    tips: [
      {
        text: "HR-Auszug immer auf Datum prüfen – nicht älter als 3 Monate. Zeichnungsberechtigte können sich ändern und ältere Dokumente sind ungültig.",
        source: "Credit Operations",
      },
      {
        text: "Bei Jahresabschluss: Schau nicht nur auf den Gewinn. Cashflow und EK-Quote sagen viel mehr über die echte finanzielle Lage aus.",
        source: "Credit Office Erfahrung",
      },
      {
        text: "Firmenkunden erwarten Kompetenz. Wenn du unsicher bist – hole dir intern Unterstützung bevor das Gespräch, nicht danach.",
        source: "Front Office Erfahrung",
      },
      {
        text: "Bei Sitzgesellschaften immer den wirtschaftlich Berechtigten vollständig abklären. Unvollständige Dokumentation führt zu teuren Nachträgen.",
        source: "Compliance Abteilung",
      },
      {
        text: "Zeichnungsberechtigte im HR-Auszug und im Konto-Antrag müssen übereinstimmen. Diskrepanzen vor Kontoeröffnung klären.",
        source: "Banking Operations",
      },
    ],
  },

  anlagekunde: {
    configId: "anlagekunde",
    denkweise: {
      title: "Wie denkt ein Anlageberater?",
      text: `Ein Anlageberater denkt langfristig und szenariobasiert.
Nicht: "Was will der Kunde heute kaufen?"
Sondern: "Was passt zu seinem Leben, seinen Zielen, seiner Risikobereitschaft?"

Der grösste Fehler in der Anlageberatung: Das Profil dem Produkt anpassen statt dem Kunden. Das führt zu Beschwerden, Haftungsrisiken und verlorenen Kunden.

Volatilität ist kein Feind – sie ist der Preis für langfristige Rendite. Aber nur wer sie psychologisch aushält, darf sie eingehen.`,
    },
    tips: [
      {
        text: "Anlegerprofil immer aktiv besprechen, nicht nur unterschreiben lassen. Ein Profil das der Kunde nicht versteht, ist in der Haftung wertlos.",
        source: "Compliance Abteilung",
      },
      {
        text: "TER immer im Preisvergleich zeigen. Kunden reagieren positiv auf Transparenz und verstehen den Mehrwert tieferer Kosten besser als abstrakte Prozentsätze.",
        source: "Front Office Erfahrung",
      },
      {
        text: "Bei Marktrückgängen: Kunden proaktiv kontaktieren bevor sie dich anrufen. Ein kurzer 'Wir-haben-alles-im-Griff'-Anruf verhindert Panikverkäufe.",
        source: "Front Office Erfahrung",
      },
      {
        text: "Wenn ein Kunde sagt 'ich will hohe Rendite und kein Risiko': Das ist der Moment für ein echtes Gespräch über die Verbindung von Rendite und Risiko.",
        source: "Credit Office Erfahrung",
      },
      {
        text: "Horizont immer doppelt prüfen: formeller Horizont vs. effektiver Verwendungszweck. Bei Diskrepanz immer den kürzeren verwenden.",
        source: "Compliance Abteilung",
      },
    ],
  },

  backoffice: {
    configId: "backoffice",
    denkweise: {
      title: "Wie denkt ein Back Office Profi?",
      text: `Back Office denkt in Prozessen. Jeder Schritt hat einen Grund. Die Reihenfolge ist nicht zufällig.

"Erst prüfen, dann ausführen" – immer. Keine Ausnahmen, auch nicht unter Druck oder wenn der Teamleiter drängt.

Compliance-Experten denken in Risiken. Bei jeder Transaktion die mentale Frage: "Was könnte hier schiefgehen?" Nicht aus Misstrauen – sondern aus professioneller Sorgfalt.

Der beste Back Office Mitarbeiter ist jemand der Probleme sieht bevor sie entstehen und dokumentiert bevor er vergisst.`,
    },
    tips: [
      {
        text: "Mahnbriefe immer doppelt prüfen bevor sie rausgehen – Betrag, Datum, Empfänger. Ein falscher Brief kostet mehr Zeit als die Prüfung.",
        source: "Banking Operations",
      },
      {
        text: "Bei Auszahlungen: Checkliste komplett abhaken bevor du klickst. Einmal ausgezahlt ist ausgezahlt – Rückforderungen sind mühsam.",
        source: "Credit Operations",
      },
      {
        text: "Fristen im Kalender eintragen sobald ein Fall reinkommt. Verpasste Fristen sind die häufigste Fehlerquelle im Backoffice.",
        source: "Banking Operations",
      },
      {
        text: "PEP-Frage immer direkt stellen – nicht um den heissen Brei herumreden. Die meisten Kunden verstehen es, wenn du es professionell erklärst.",
        source: "Compliance Abteilung",
      },
      {
        text: "Im Zweifelsfall immer eskalieren. Lieber einmal zu viel gefragt als ein Compliance-Problem verursacht. Eskalation ist keine Schwäche.",
        source: "Compliance Abteilung",
      },
      {
        text: "Dokumentiere alles sofort – nicht am Ende des Tages. Gedächtnis trügt und Compliance schaut auf Zeitstempel.",
        source: "Banking Operations",
      },
      {
        text: "IBAN-Fehler sind die häufigste Rückweisungsursache. Beim Kunden nachfragen, nie selbst ergänzen oder raten.",
        source: "Banking Operations",
      },
    ],
  },
};
