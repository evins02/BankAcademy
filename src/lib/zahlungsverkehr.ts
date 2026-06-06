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
  warum?: string;
  inDerPraxis?: string;
  merksatz?: string;
  glossarTerm?: string;
  rechtsgrundlage?: string;
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
        warum:
          "Schweizer IBAN ist strikt normiert: CH (2) + 2 Prüfziffern + 17-stellige Kontonummer = genau 21 Zeichen. Eine IBAN mit 22 Stellen ist mathematisch ungültig – das System lehnt sie automatisch ab. Selbst ergänzen ist verboten: Du kennst die fehlende oder überschüssige Stelle nicht, und ein Fehler führt zu einer Zahlung auf das falsche Konto.",
        inDerPraxis:
          "IBAN-Fehler sind einer der häufigsten Gründe für Rückweisungen im Backoffice. Das Kernsystem prüft die Prüfziffer automatisch, aber der Mitarbeiter muss die Rückweisung fachlich kommunizieren. Wichtig: Nie selbst 'raten' oder ergänzen – das ist ein Fehler, der haftbar macht. Kunden informieren und korrekte IBAN anfordern.",
        merksatz:
          "Schweizer IBAN: immer genau 21 Stellen. Keine Ausnahmen. Kein Ergänzen. Zurückweisen und Kunden fragen.",
        glossarTerm: "IBAN",
        rechtsgrundlage: "OR Art. 466 ff. (Auftragsverhältnis)",
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
        warum:
          "Daueraufträge sind regelgebundene Zahlungsaufträge, keine Kreditlinien. Ohne vereinbarten Kontokorrentkredit hat die Bank keine Berechtigung, das Konto zu überziehen. Das System prüft die Deckung am Ausführungstag und storniert den Auftrag automatisch, wenn sie fehlt. Der Auftrag wird nicht auf den nächsten Tag verschoben.",
        inDerPraxis:
          "Fehlende Deckung muss dem Kunden proaktiv kommuniziert werden – idealerweise bevor es Konsequenzen hat (z.B. fehlende Mietzahlung). In der Praxis prüfen erfahrene Backoffice-Mitarbeiter täglich kritische Daueraufträge. Häufige fehlende Deckungen sind ein Signal für finanzielle Schwierigkeiten und sollten an den Berater gemeldet werden.",
        merksatz:
          "Kein Geld = kein Dauerauftrag. Nicht verschoben, sondern storniert. Keine Teilzahlung.",
        glossarTerm: "Dauerauftrag",
        rechtsgrundlage: "OR Art. 466 / IBAN-Standard ISO 13616",
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
        warum:
          "Bei Kartenverlust gilt: sofortige Sperrung hat absoluten Vorrang vor allem anderen. Jede Minute ohne Sperrung ist ein offenes Risikofenster für Missbrauch. Die Sperrhotline 0800 80 40 40 ist 24/7 erreichbar. Limit reduzieren reicht nicht – die Karte kann bis zum Limit trotzdem missbräuchlich verwendet werden.",
        inDerPraxis:
          "In der Praxis kommen Kunden manchmal zuerst in die Filiale statt zur Hotline – weil sie Hilfe suchen. Priorität ist klar: ERST Hotline 0800 80 40 40 anrufen (sofort), DANN administrative Schritte (Formular, Ersatzkarte). Jede Diskussion vor der Sperrung ist falsch. Die Bank haftet nicht für Schäden nach gemeldeter Sperrung.",
        merksatz:
          "Kartenverlust: Erst sperren (0800 80 40 40), dann alles andere. Keine Ausnahmen.",
        glossarTerm: "Kartensperrung",
        rechtsgrundlage: "GwG Art. 3 (Identifikationspflicht) / SWIFT-Standards",
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
        warum:
          "Eine retournierte Zahlung bedeutet: Das Empfängerinstitut hat den Betrag zurückgesendet, weil das Konto gesperrt oder ungültig ist. Das Geld kommt automatisch zum Auftraggeber zurück. Nochmals ausführen würde sofort wieder retourniert – ein Kreislauf ohne Nutzen. Neue Zahlungsdetails sind die einzige Lösung.",
        inDerPraxis:
          "Retournierte Zahlungen erscheinen täglich im Backoffice-System. 'Konto gesperrt' kann auf Liquiditätsprobleme beim Empfänger hindeuten – für Firmenkundenberater ein relevantes Signal. Wichtig: Den Auftraggeber proaktiv informieren, nicht warten bis er nachfragt. Schnelle Kommunikation verhindert Eskalationen.",
        merksatz:
          "Retour = Rückbuchung + Kundeninfo + neue Zahlungsdetails einholen. Nie nochmals ausführen.",
        glossarTerm: "Zahlungsretour",
        rechtsgrundlage: "GwG Art. 9 Abs. 1 (Meldepflicht an MROS)",
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
        warum:
          "BIC (Bank Identifier Code / SWIFT-Code) identifiziert die Empfängerbank eindeutig im internationalen Zahlungsverkehr. Ohne BIC kann die Korrespondenzbank die Zahlung nicht routen. Die Zahlung würde automatisch bei der nächsten Korrespondenzbank retourniert – mit Kosten für den Auftraggeber. Selbst recherchieren und ergänzen ist nicht erlaubt: Fehler gehen zu Lasten der Bank.",
        inDerPraxis:
          "International transfers ohne vollständige BIC+IBAN werden von SWIFT-Netzwerken automatisch zurückgewiesen. Es ist effizienter, den Kunden sofort um BIC zu bitten als eine teure Retour zu riskieren. BIC findet der Kunde auf dem Kontoauszug des Empfängers oder auf der Website der Empfängerbank. In der EU-Zone: SEPA-Transfers brauchen nur IBAN.",
        merksatz:
          "Auslandzahlung ausserhalb SEPA: BIC + IBAN zwingend. Ohne BIC = Zahlung stoppen und Kunden informieren.",
        glossarTerm: "BIC/SWIFT",
        rechtsgrundlage: "OR Art. 466 ff. / SIC-Reglement Art. 12",
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
        warum:
          "Doppelzahlungen sind operative Fehler der Bank – die Haftung liegt bei der Bank, nicht beim Kunden. Zeit ist kritisch: Je länger man wartet, desto schwieriger wird die Rückforderung beim Empfänger (der das Geld möglicherweise bereits ausgegeben hat). Proaktive Kommunikation mit dem Kunden zeigt Professionalität und verhindert Vertrauensverlust.",
        inDerPraxis:
          "Doppelzahlungen entstehen durch System-Bugs oder manuelle Fehler (doppelter Klick). Interne Meldung ist zwingend für die Fehlerstatistik und allfällige IT-Korrektur. Der Kunde erhält ein Formular oder eine schriftliche Bestätigung der Korrektur. Wichtig: Empfänger direkt zu kontaktieren ist Aufgabe der Bank, nicht des Kunden.",
        merksatz:
          "Doppelzahlung: Sofort melden, sofort Rückbuchung einleiten, sofort Kunden informieren. Warten ist keine Option.",
        glossarTerm: "Rückbuchung",
        rechtsgrundlage: "OR Art. 117 ff. (Kontokorrent)",
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
        warum:
          "Structuring (Smurfing): Beträge werden bewusst unter der Meldepflichtgrenze (CHF 10'000) aufgeteilt, um AML-Kontrollen zu umgehen. Drei Zahlungen von 9'500 innerhalb 48h = dreifaches Monatseinkommen = offensichtlich ausserhalb des Kundenprofils. GwG Art. 6 verpflichtet zur besonderen Abklärungspflicht. Bei Verdacht auf Geldwäscherei: MROS-Meldung und gleichzeitig Informationsverbot gegenüber dem Kunden.",
        inDerPraxis:
          "Alle Schweizer Banken betreiben automatisiertes Transaktionsmonitoring (AML-Systeme), die solche Muster erkennen. Aber die finale Entscheidung liegt beim Menschen. Kritisch: Sobald du eine MROS-Meldung erwägst, darfst du den Kunden NICHT informieren (Informationsverbot GwG Art. 10a). Weder direkt noch indirekt. Compliance sofort involvieren.",
        merksatz:
          "Knapp unter CHF 10'000 in Serie = Structuring-Alarm. GwG Art. 6 Abklärungspflicht + MROS prüfen. Kunden NICHT informieren.",
        glossarTerm: "Geldwäscherei",
        rechtsgrundlage: "GwG Art. 6 Abs. 2 (Erhöhte Sorgfaltspflichten / PEP)",
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
        warum:
          "LSV (Lastschriftverfahren) basiert auf einem Mandat, das der Zahlungspflichtige dem Empfänger erteilt hat. Ohne gültiges Mandat ist der Einzug nicht autorisiert. Das Widerspruchsrecht (30 Tage) ist gesetzlich verankert. Die Bank prüft, ob ein LSV-Mandat im System hinterlegt ist. Wenn keines vorliegt oder der Betrag/Empfänger nicht stimmt: Rückbuchung.",
        inDerPraxis:
          "LSV-Widersprüche sind im Backoffice frequent. Die 30-Tage-Frist ist strikt – danach ist kein Widerspruch mehr möglich. In der Praxis kommuniziert die Bank den Widerspruch an den Zahlungsempfänger, der dann seine Unterlagen vorlegen muss. Bei wiederholten Widersprüchen ohne Mandat-Grundlage kann das LSV-Recht für diesen Empfänger entzogen werden.",
        merksatz:
          "LSV-Widerspruch: 30-Tage-Frist, Mandat prüfen, Rückbuchung wenn berechtigt. Danach kein Rechtsmittel mehr.",
        glossarTerm: "LSV",
        rechtsgrundlage: "ZAG Art. 24 / Instant-Payment-Regeln SIC",
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
        warum:
          "Valuta ist das Wertstellungsdatum – das Datum, an dem der Betrag dem Empfänger gutgeschrieben wird. Ein vergangenes Datum ist technisch unmöglich: Das System kann keine Buchung auf ein vergangenes Datum erzwingen. Zudem fehlen CHF 3'000 Deckung. Beide Fehler sind eigenständig und müssen beide kommuniziert werden. Verwendungszweck ist bei CH-Inlandzahlungen optional.",
        inDerPraxis:
          "Backoffice-Mitarbeiter sind verantwortlich für die vollständige Prüfung ALLER Felder eines Zahlungsauftrags. Jeder Fehler muss separat kommuniziert werden. In der Praxis ist es effizienter, alle Fehler auf einmal zu melden als den Kunden zweimal nachliefern zu lassen. Niemals Teilausführungen bei mehreren Fehlern.",
        merksatz:
          "Zahlungsauftrag-Prüfung: IBAN, Betrag, Valuta (frühestens heute), BIC (Ausland), Deckung. Alle Fehler auf einmal kommunizieren.",
        glossarTerm: "Valuta",
        rechtsgrundlage: "GwG Art. 9 Abs. 1 (Meldepflicht) / GwG Art. 10 (Transaktionsverbot)",
      },
    ],
  },
];
