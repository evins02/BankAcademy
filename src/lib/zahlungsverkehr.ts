import { type LückentextCase } from "./lückentext";
import { type OffeneFrageCase } from "./offene-frage";
import { OF_CASES_ZAHLUNGSVERKEHR } from "./offene-fragen";

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
  concepts?: string[];
}

export interface ZvLevelConfig {
  level: LevelNum;
  label: string;
  badgeVariant: "green" | "orange" | "red";
  cases: (ZvCase | LückentextCase | OffeneFrageCase)[];
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
        type: "lückentext",
        id: "1.1",
        level: 1,
        briefing:
          "Du bearbeitest einen Zahlungsauftrag. Der Kunde möchte CHF 2'500 überweisen. Die IBAN hat 22 Stellen statt 21.",
        question:
          "Eine Schweizer IBAN hat immer genau ___ Stellen.",
        answer: "21",
        unit: "Stellen",
        feedback:
          "Schweizer IBAN: CH (2) + 2 Prüfziffern + 17-stellige Kontonummer = genau 21 Zeichen. Eine IBAN mit 22 Stellen ist mathematisch ungültig. Zahlung zurückweisen, Kunde muss korrekte IBAN nachliefern.",
        concepts: ["IBAN-Prüfung"],
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
        rechtsgrundlage: "OR Art. 466 (Auftragsverhältnis) / Bankinternes Dauerauftragsreglement",
        concepts: ["Dauerauftrag", "Deckungspflicht"],
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
        rechtsgrundlage: "SIX-Kartenreglement / OR Art. 402 (Aufwendungsersatz)",
        concepts: ["Kartensperrung"],
      },
      {
        id: "1.4",
        level: 1,
        briefing:
          "Kunde ruft an: «Ich komme nicht mehr ins E-Banking – es sagt Zugang gesperrt. Was ist passiert?»",
        question: "Wie gehst du vor?",
        options: [
          { key: "A", text: "Passwort direkt per E-Mail zusenden" },
          {
            key: "B",
            text: "Zuerst Kunden legitimieren, dann Sperrgrund im System prüfen und Entsperrprozess einleiten. Kein Passwort per E-Mail oder Telefon.",
          },
          { key: "C", text: "Sofort entsperren ohne Rückfragen" },
          { key: "D", text: "Kunden ohne Erklärung in die Filiale schicken" },
        ],
        correct: "B",
        feedback:
          "E-Banking Sperrung: Erst legitimieren (Sicherheitsprinzip!), dann Ursache prüfen (zu viele Fehlversuche? Verdächtige Aktivität?), dann Entsperrprozess gemäss Bankstandard einleiten. Passwörter werden nie per E-Mail oder Telefon mitgeteilt – das wäre eine Einladung für Betrüger.",
        warum:
          "Eine E-Banking-Sperrung schützt den Kunden. Vor der Entsperrung muss zweifelsfrei sichergestellt sein, dass der echte Kontoinhaber spricht. Ansonsten öffnet man Social Engineering Angriffen Tür und Tor. Ein Passwort per E-Mail zu senden würde jedes Sicherheitskonzept unterlaufen – Phishing-Angriffe zielen genau darauf ab.",
        merksatz:
          "E-Banking gesperrt: Erst legitimieren, dann Ursache prüfen, dann entsperren. Nie Zugangsdaten per E-Mail.",
        rechtsgrundlage: "OR Art. 398 (Sorgfaltspflicht) / interne E-Banking-Sicherheitsrichtlinien",
        concepts: ["E-Banking-Sicherheit", "Legitimation"],
      },
      {
        id: "1.5",
        level: 1,
        briefing:
          "Kundin ruft an: «Ich habe eine Kontoführungsgebühr von CHF 60 erhalten. Das finde ich zu viel – ich möchte das zurück.»",
        question: "Wie gehst du vor?",
        options: [
          { key: "A", text: "Gebühr sofort zurückerstatten" },
          {
            key: "B",
            text: "Sachverhalt prüfen: Ist Gebühr im Preisblatt ausgewiesen? Gebührenstruktur erklären, Kulanzlösung intern prüfen, günstigeres Kontomodell aufzeigen.",
          },
          { key: "C", text: "Reklamation ohne Erklärung ablehnen" },
          { key: "D", text: "Gebühr sofort stornieren – Kunde hat immer recht" },
        ],
        correct: "B",
        feedback:
          "Gebührenreklamation: Erst prüfen ob die Gebühr korrekt verrechnet wurde (Preisblatt, Kontomodell). Dann dem Kunden erklären, was die Gebühr abdeckt. Falls Kulanz sinnvoll: intern eskalieren. Falls günstigeres Modell passt: proaktiv aufzeigen. Sofortige Rückerstattung ohne Prüfung setzt ein falsches Präzedens.",
        warum:
          "Gebühren sind im Preisblatt transparent ausgewiesen und für Kunden einsehbar. Mitarbeiter haben keine Einzelkompetenz zur Rückerstattung – Kulanzgesuche müssen intern gestellt werden. Das Aufzeigen einer günstigeren Alternative ist echter Kundennutzen und stärkt das Vertrauen langfristig.",
        merksatz:
          "Gebührenreklamation: Prüfen – erklären – Kulanz prüfen – Alternative aufzeigen. Nicht einfach zurückerstatten.",
        rechtsgrundlage: "Preisbekanntgabeverordnung (PBV) / Allgemeine Geschäftsbedingungen",
        concepts: ["Reklamationsbearbeitung", "Preistransparenz"],
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
        rechtsgrundlage: "OR Art. 466 ff. (Auftragsverhältnis) / SIC-Reglement",
        concepts: ["Zahlungsretour"],
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
        concepts: ["BIC/SWIFT", "Auslandzahlung"],
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
        concepts: ["Doppelzahlung", "Fehlerkorrektur"],
      },
      {
        id: "2.4",
        level: 2,
        briefing:
          "Ein Kunde ruft aufgeregt an: Er hat soeben CHF 2'350 überwiesen – aber an die falsche IBAN. Er hat sich bei einer Ziffer vertippt. Die Zahlung ist bereits ausgeführt und vom Konto abgebucht.",
        question: "Wie gehst du vor?",
        options: [
          { key: "A", text: "Zahlung sofort stornieren – der Fehler liegt beim Kunden" },
          {
            key: "B",
            text: "Recall-Anfrage ans Empfängerinstitut senden. Kunden informieren: Rückruf möglich, aber nicht garantiert. Keine sofortige Stornierung möglich.",
          },
          { key: "C", text: "Polizei informieren – möglicher Betrug" },
          { key: "D", text: "Abwarten, bis der Empfänger das Geld freiwillig zurückschickt" },
        ],
        correct: "B",
        feedback:
          "Einmal ausgeführte Zahlungen können nicht einseitig storniert werden. Die Bank kann eine Recall-Anfrage ans Empfängerinstitut stellen – dieses leitet sie an den Empfänger weiter. Stimmt der Empfänger zu, wird der Betrag zurückgebucht. Bei Verweigerung hat der Auftraggeber zivilrechtliche Möglichkeiten (ungerechtfertigte Bereicherung OR Art. 62). Kunden realistisch informieren: kein Automatismus, keine Garantie.",
        warum:
          "Das Prinzip 'Zahlung ausgeführt = unwiderruflich' gilt im Zahlungsverkehr grundsätzlich. Die Bank kann nur vermitteln, nicht erzwingen. Recall-Anfragen sind standardisiert (SWIFT gpi für Auslandzahlungen, bankinternes Verfahren für Inland). Der Auftraggeber trägt die Verantwortung für die Richtigkeit der Zahlungsdetails – die Bank prüft die IBAN, nicht den Namen des Empfängers.",
        inDerPraxis:
          "Falschüberweisungen sind häufig. Bei Inlandzahlungen (CH) ist der Rückruf via direktem Bankenkontakt oft innert 1–2 Tagen möglich, wenn der Empfänger kooperiert. Kunden nicht mit falschen Hoffnungen vertrösten. Im Ausland dauert es länger. Kooperiert der Empfänger nicht: Zivilklage oder bei Betrugsabsicht die Polizei.",
        merksatz:
          "Falschüberweisung: Recall-Anfrage stellen, Kunden realistisch informieren. Kein Automatismus, keine Garantie.",
        glossarTerm: "Rückruf / Recall",
        rechtsgrundlage: "OR Art. 62 ff. (Ungerechtfertigte Bereicherung) / SWIFT gpi Recall Standards",
        concepts: ["Falschüberweisung", "Recall"],
      },
      {
        id: "2.5",
        level: 2,
        briefing:
          "Beim Tagesabschluss stellst du fest: Ein Dauerauftrag von Kundin Müller (Konto ...456) für CHF 1'200 Miete wurde fälschlicherweise dem Konto ...465 belastet – du hast die letzten zwei Ziffern vertauscht. Der Betrag ist bereits ausgeführt.",
        question: "Was musst du jetzt tun?",
        options: [
          { key: "A", text: "Morgen korrigieren – heute Feierabend" },
          {
            key: "B",
            text: "Sofort intern eskalieren, Fehlbuchung dokumentieren, Rückbuchung auf das richtige Konto einleiten, beide betroffenen Kunden informieren.",
          },
          { key: "C", text: "Nur Kundin Müller informieren – der andere Kunde merkt es schon selbst" },
          { key: "D", text: "Den Dauerauftrag löschen und neu erfassen" },
        ],
        correct: "B",
        feedback:
          "Operative Fehler der Bank müssen sofort gemeldet, dokumentiert und korrigiert werden. Beide Konten sind betroffen: Konto ...456 (Müller) wurde nicht belastet und die Miete fehlt; Konto ...465 wurde fälschlicherweise belastet. Beide Kunden haben Anspruch auf proaktive Information. Warten erhöht das Risiko: fehlende Mietzahlung, mögliche Overdraft-Situation beim falsch belasteten Kunden.",
        warum:
          "Die Bank haftet für operative Fehler. Verzögerte Korrektur kann Folgeprobleme verursachen. Fehlerkultur: Ein entdeckter Fehler muss sofort gemeldet werden – auch wenn es unbequem ist. Gute Praxis: Fehler melden → eskalieren → korrigieren → kommunizieren – in dieser Reihenfolge und ohne Verzögerung.",
        inDerPraxis:
          "Operative Fehler (Tippfehler, Doppelklicks, Verwechslungen) kommen trotz Vier-Augen-Prinzip vor. Sie müssen ins interne Fehlermanagementsystem eingetragen werden. Kunden werden schriftlich über die Korrektur informiert. Keine Vertuschung – jeder Fehler ist dokumentationspflichtig und kann bei Revisionen geprüft werden.",
        merksatz:
          "Eigener Fehler entdeckt: Sofort melden, sofort korrigieren, sofort beide Kunden informieren. Keine Verzögerung.",
        glossarTerm: "Operative Fehlerkorrektur",
        rechtsgrundlage: "OR Art. 398 (Sorgfaltspflicht des Beauftragten) / Interne Qualitätssicherung",
        concepts: ["Fehlerkorrektur", "Fehlbuchung"],
      },
      {
        id: "2.6",
        level: 2,
        briefing:
          "Kundin Elisabeth Keller ruft an: Ihre Debitkarte liegt vor ihr auf dem Tisch – sie hat sie nie verloren. Trotzdem erscheinen heute Morgen drei Transaktionen à CHF 78.50 bei einem ausländischen Online-Händler, den sie nie benutzt hat.",
        question: "Wie gehst du vor?",
        options: [
          { key: "A", text: "Nichts tun – die Karte ist physisch vorhanden, also kein Missbrauch möglich" },
          {
            key: "B",
            text: "Karte sofort sperren, Chargeback-Verfahren einleiten, Kundin über nächste Schritte informieren.",
          },
          { key: "C", text: "Kundin direkt an den Online-Händler verweisen – die Bank ist nicht zuständig" },
          { key: "D", text: "Abwarten ob weitere Transaktionen kommen, dann entscheiden" },
        ],
        correct: "B",
        feedback:
          "Karte physisch vorhanden ≠ Karte sicher. Kartendaten können ohne physischen Kartenverlust gestohlen werden (Phishing, Datenleck beim Händler, Skimming). Sofortmassnahmen: Karte sperren, Chargeback-Antrag stellen, Kundin beraten. Die Bank prüft die Rückforderung beim Händler über das Kartennetzwerk.",
        warum:
          "Kartenmissbrauch ohne physischen Verlust geschieht durch Datenlecks bei Online-Händlern, Phishing oder Skimming – dabei werden Kartennummer, Ablaufdatum und CVV kompromittiert, nicht die physische Karte. Deshalb muss die Karte trotzdem gesperrt werden: Solange die Daten bekannt sind, kann der Angreifer weiter belasten. Das Chargeback-Verfahren läuft über das Kartennetzwerk (Visa/Mastercard) und ermöglicht die Rückforderung nicht autorisierter Transaktionen.",
        inDerPraxis:
          "Unautorisierte Online-Transaktionen sind heute der häufigste Kartenbetrugsmodus. Die Bank prüft im Chargeback-Verfahren, ob eine Transaktion wirklich nicht autorisiert war (3DS-Authentifizierung, IP-Adresse, Gerätefingerabdruck). Die Kundin muss schriftlich bestätigen, die Transaktionen nicht ausgeführt zu haben. Nach der Sperrung erhält sie eine neue Karte mit neuen Daten und einer neuen Kartennummer.",
        merksatz:
          "Karte noch vorhanden ≠ Karte sicher. Unautorisierte Transaktion: Sperren + Chargeback einleiten + Kundin informieren.",
        glossarTerm: "Kartensperrung",
        rechtsgrundlage: "SIX-Kartenreglement / Visa/Mastercard Chargeback-Regeln / OR Art. 402",
        concepts: ["Kartensperrung", "Kartenmissbrauch"],
      },
      {
        id: "2.7",
        level: 2,
        briefing:
          "Du erhältst eine formelle Recall-Anfrage der PostFinance: CHF 6'200 wurden am Montag irrtümlich auf das Konto eures Kunden Thomas Gerber (Konto ...712) überwiesen – ein Buchungsfehler der PostFinance. Gerbers Kontostand beträgt CHF 14'800. Er ist ein langjähriger Bestandeskunde ohne Auffälligkeiten.",
        question: "Wie gehst du vor?",
        options: [
          { key: "A", text: "Betrag sofort zurückbuchen – das Geld gehört dem Kunden nicht" },
          {
            key: "B",
            text: "Thomas Gerber informieren und seine Zustimmung zur Rückbuchung einholen. Ohne Zustimmung kein Rückzug möglich.",
          },
          { key: "C", text: "Recall-Anfrage ablehnen – die Bank ist nicht verpflichtet zu helfen" },
          { key: "D", text: "Nichts tun – PostFinance soll sich direkt an den Kunden wenden" },
        ],
        correct: "B",
        feedback:
          "Bei einer eingehenden Recall-Anfrage darf die Bank das Kundenkonto NICHT ohne dessen Zustimmung belasten – auch wenn der Betrag irrtümlich überwiesen wurde. Die Bank informiert den Kunden, erklärt die Situation und holt seine Zustimmung ein. Stimmt er zu: Rückbuchung. Verweigert er: PostFinance muss zivilrechtlich vorgehen (ungerechtfertigte Bereicherung OR Art. 62).",
        warum:
          "Das Kontoguthaben des Kunden ist sein Eigentum – auch wenn es durch den Fehler eines Dritten entstanden ist. Die Bank handelt als Treuhänderin und kann nicht eigenmächtig darüber verfügen. Das Recht auf Rückforderung wegen ungerechtfertigter Bereicherung liegt bei der zahlenden Bank; sie muss es bei Verweigerung zivilrechtlich durchsetzen. Die empfangende Bank informiert und vermittelt, kann aber nicht erzwingen.",
        inDerPraxis:
          "In der Praxis stimmen Kunden bei klaren Buchungsfehlern meist freiwillig zur Rückgabe zu. Problematisch wird es wenn der Betrag bereits ausgegeben ist, der Kunde die Zustimmung verweigert oder Insolvenz vorliegt. In solchen Fällen muss die anfragende Bank den Rechtsweg einschlagen. Wichtig: Beide Seiten proaktiv über den Status informieren und alle Schritte dokumentieren.",
        merksatz:
          "Eingehende Recall: Kunden informieren, Zustimmung einholen. Ohne Zustimmung kein Geld zurück. Nie eigenmächtig zurückbuchen.",
        glossarTerm: "Rückruf / Recall",
        rechtsgrundlage: "OR Art. 62 ff. (Ungerechtfertigte Bereicherung) / SIC-Reglement / SCT Recall-Verfahren",
        concepts: ["Recall", "Falschüberweisung"],
      },
      {
        id: "2.8",
        level: 2,
        briefing:
          "Beim Monatsabschluss stellst du fest: Ein Firmenkunde hat seinen Lohnlauf für 38 Mitarbeitende zweimal ausgelöst – einmal manuell, einmal automatisch via Dauerauftrag. Total doppelt ausgeführt: CHF 187'400. Die zweite Ausführung ist 4 Stunden her.",
        question: "Was sind die zwingenden nächsten Schritte?",
        options: [
          { key: "A", text: "Abwarten – der Firmenkunde soll die Situation mit seinen Mitarbeitenden klären" },
          {
            key: "B",
            text: "Sofort intern eskalieren, Sammelrückruf einleiten, Firmenkunden informieren, alle Buchungen dokumentieren.",
          },
          { key: "C", text: "Nur den Firmenkunden anrufen – den Rückruf soll er selbst organisieren" },
          { key: "D", text: "Doppelte Löhne direkt von den Mitarbeiterkonten abbuchen ohne Rücksprache" },
        ],
        correct: "B",
        feedback:
          "Bei Batch-Fehlern gilt: Sofort eskalieren und Sammelrückruf einleiten. 4 Stunden sind wenig – die Zahlungen sind möglicherweise noch nicht wertgestellt. Firmenkunden sofort informieren: Er muss seine Mitarbeitenden ansprechen und zur freiwilligen Rückgabe auffordern. Individuelle Rückbuchungen ohne Zustimmung der Empfänger sind nicht zulässig.",
        warum:
          "Je früher ein Batch-Recall eingeleitet wird, desto höher die Chance, Zahlungen noch vor Wertstellung zu stoppen. Nach Wertstellung sind Rückbuchungen nur mit Zustimmung der jeweiligen Empfänger möglich. Der Firmenkunde trägt die Verantwortung für den Doppelauslöser, aber die Bank unterstützt aktiv beim Rückruf. Verweigern Mitarbeitende die Rückgabe: OR Art. 62 (ungerechtfertigte Bereicherung) als Rechtsgrundlage.",
        inDerPraxis:
          "Lohnlauf-Doppelverarbeitungen entstehen durch technische Fehler oder Bedienungsfehler (Doppelklick, parallele Batch-Ausführung). Banken haben spezifische Bulk-Recall-Prozesse für solche Fälle. Kritisches Zeitfenster: Innerhalb weniger Stunden kann oft noch direkt gestoppt werden. Nach Wertstellung wird der Rückruf zum langwierigen Einzelfall-Prozess, falls einzelne Mitarbeitende nicht kooperieren.",
        merksatz:
          "Batch-Fehler: Sofort eskalieren, Sammelrückruf einleiten, Firmenkunden informieren. Zeit ist der entscheidende Faktor.",
        glossarTerm: "Rückbuchung",
        rechtsgrundlage: "OR Art. 62 ff. (Ungerechtfertigte Bereicherung) / SIC Bulk Recall / OR Art. 398 (Sorgfaltspflicht)",
        concepts: ["Fehlerkorrektur", "Batch-Verarbeitung"],
      },
    ],
  },
  {
    level: 3,
    label: "Challenge-Niveau",
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
        concepts: ["GwG", "Structuring", "MROS"],
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
        concepts: ["LSV", "Widerspruch"],
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
        rechtsgrundlage: "OR Art. 466 ff. (Auftragsverhältnis) / SIC-Reglement Art. 12",
        concepts: ["Valuta", "Deckungspflicht"],
      },
      {
        id: "3.4",
        level: 3,
        briefing:
          "Du bearbeitest einen Zahlungsauftrag: CHF 45'000 an ein Unternehmen in Russland. Das AML-System löst einen Alarm aus – der Empfänger erscheint auf der SECO-Sanktionsliste. Der Auftraggeber ist ein langjähriger Firmenkunde ohne bisherige Auffälligkeiten.",
        question: "Was machst du?",
        options: [
          {
            key: "A",
            text: "Zahlung trotzdem ausführen – Auftraggeber ist ein vertrauenswürdiger Stammkunde",
          },
          {
            key: "B",
            text: "Zahlung sofort stoppen, Compliance eskalieren, Kunden NICHT informieren, alles dokumentieren.",
          },
          { key: "C", text: "Kunden anrufen und erklären, warum die Zahlung gestoppt wurde" },
          { key: "D", text: "Zahlung auf nächsten Monat verschieben und abwarten" },
        ],
        correct: "B",
        feedback:
          "Sanktionslisten-Treffer bedeutet sofortiger Zahlungsstopp – ohne Ausnahme. SECO-Sanktionen sind gesetzlich bindend; die Vertrauenswürdigkeit des Kunden spielt keine Rolle. Kritisch: Der Kunde darf NICHT informiert werden (Informationsverbot, analog GwG Art. 10a). Compliance übernimmt die weitere Bearbeitung und entscheidet über eine MROS-Meldung.",
        warum:
          "Sanktionen (SECO, EU, USA/OFAC, UN) sind absolute Verbote – kein Ermessensspielraum. Auch indirekte Transaktionen über Korrespondenzbanken können zur Haftung führen. Das Informationsverbot ist zentral: Würde der Kunde wissen, dass sein Zahlungsempfänger auf der Sanktionsliste steht, könnte er Gegenmaßnahmen ergreifen und Beweise vernichten.",
        inDerPraxis:
          "Alle Schweizer Banken betreiben automatisiertes Sanktions-Screening aller ausgehenden Zahlungen gegen SECO-, EU-, OFAC- und UN-Listen. Ein Treffer wird sofort im System gesperrt. Compliance prüft Falsch-Positive (gleicher Name, andere Person) und gibt diese frei. Echte Treffer werden an MROS und ggf. die Aufsichtsbehörden gemeldet. Jeder Schritt wird lückenlos dokumentiert.",
        merksatz:
          "Sanktionslisten-Treffer: Stopp. Compliance. Kein Wort zum Kunden. Dokumentieren.",
        glossarTerm: "Sanktionen / SECO",
        rechtsgrundlage: "EmbG (Embargogesetz) / SECO-Verordnungen / GwG Art. 10a (Informationsverbot)",
        concepts: ["Sanktionen", "SECO"],
      },
      {
        id: "3.5",
        level: 3,
        briefing:
          "Kundin Sonja Bauer kommt mit einem Kuvert an den Schalter und möchte CHF 24'800 in bar einzahlen. Sie ist seit 2 Jahren Kundin mit einem normalen Privatkonto (monatlicher Lohneingang CHF 4'200). Es ist ihre erste Bareinzahlung dieser Grösse. Auf Nachfrage sagt sie: «Das sind Ersparnisse aus dem Haushalt.»",
        question: "Was sind deine Pflichten gemäss GwG?",
        options: [
          { key: "A", text: "Geld annehmen und normal buchen – die Kundin ist bekannt" },
          { key: "B", text: "Einzahlung verweigern – Bargeld über CHF 10'000 ist nicht erlaubt" },
          {
            key: "C",
            text: "Identität bestätigen, wirtschaftlich Berechtigten feststellen, Herkunft der Mittel plausibilisieren und dokumentieren. Bei unklarer Herkunft: MROS prüfen.",
          },
          { key: "D", text: "Höchstens CHF 15'000 annehmen, Rest ablehnen" },
        ],
        correct: "C",
        feedback:
          "Bei Bareinzahlungen ab CHF 15'000 greift GwG Art. 3 Abs. 2 (Identifikationspflicht). Dazu kommt GwG Art. 4 (wirtschaftlich Berechtigter). Eine ungewöhnliche Transaktion ausserhalb des Kundenprofils löst die erhöhte Sorgfaltspflicht nach GwG Art. 6 aus. «Haushaltsersparnisse» für fast CHF 25'000 bei einem Monatslohn von CHF 4'200 ist nicht plausibel – die Herkunft muss belegt und dokumentiert werden.",
        warum:
          "Die Schwelle für die erhöhte Identifikationspflicht bei Bargeldtransaktionen liegt in der Schweiz bei CHF 15'000 (GwG Art. 3 Abs. 2). Eine langjährige Kundenbeziehung senkt das Risiko, hebt aber die GwG-Pflichten nicht auf. CHF 24'800 entsprechen fast 6 Netto-Monatslöhnen – das ist für sich allein schon unplausibel. Bei fehlendem Herkunftsnachweis und bleibendem Verdacht ist eine MROS-Meldung zu prüfen; parallel gilt das Informationsverbot gegenüber der Kundin.",
        inDerPraxis:
          "Bareinzahlungen über CHF 15'000 lösen in allen Schweizer Banken standardmässig eine erhöhte Prüfung aus. Akzeptable Herkunftsbelege sind: Fahrzeug- oder Liegenschaftsverkaufsvertrag, Erbschaftsnachweis, Lotteriebescheinigung, Schenkungsvertrag. Compliance muss involviert werden, wenn die Herkunft nicht plausibel erklärt werden kann. Typisches Geldwäschereimuster: Bareinzahlungen knapp unter oder über dem Schwellwert von CHF 15'000.",
        merksatz:
          "Bareinzahlung ab CHF 15'000: Identifikation + wirtschaftlich Berechtigter + Herkunftsnachweis. «Haushaltsersparnisse» ohne Beleg reicht nicht.",
        glossarTerm: "Geldwäscherei",
        rechtsgrundlage: "GwG Art. 3 Abs. 2 (Identifikationspflicht Bargeschäfte) / GwG Art. 4 (wirtschaftlich Berechtigter) / GwG Art. 6 (erhöhte Sorgfalt)",
        concepts: ["GwG", "Bareinzahlung", "Herkunftsnachweis"],
      },
      {
        id: "3.6",
        level: 3,
        briefing:
          "Das AML-System blockiert eine ausgehende Überweisung über CHF 12'000 an «Ahmed Al-Farsi» in den Vereinigten Arabischen Emiraten. Auf der SECO-Sanktionsliste steht ein «Ahmed Al-Farsi», geboren 1956 in Syrien. Euer Zahlungsempfänger ist laut Kundendossier «Ahmed Al-Farsi», geboren 1988 in Dubai, mit verifizierter Emirates-ID und langjähriger Geschäftsbeziehung.",
        question: "Wie gehst du vor?",
        options: [
          { key: "A", text: "Zahlung freigeben – Geburtsjahr und Nationalität stimmen eindeutig nicht überein" },
          { key: "B", text: "Zahlung dauerhaft ablehnen – Sanktionsliste hat immer Priorität" },
          {
            key: "C",
            text: "Zahlung gesperrt lassen, Fall an Compliance übergeben. Freigabe nur durch Compliance nach dokumentierter Verifikation. Kunden vorerst nicht informieren.",
          },
          { key: "D", text: "Kunden fragen ob sein Kontakt wirklich nicht auf der Sanktionsliste steht" },
        ],
        correct: "C",
        feedback:
          "Bei einem Sanktionslisten-Treffer – auch bei einem offensichtlichen False Positive – darf kein Frontoffice-Mitarbeiter die Zahlung eigenmächtig freigeben. Compliance prüft: Name, Geburtsdatum, Nationalität, Adresse und weitere Identifikationsmerkmale. Stimmt ausser dem Namen nichts überein, liegt ein False Positive vor. Compliance gibt frei, dokumentiert den Entscheid und benachrichtigt dann den Kunden. Informationsverbot gilt bis zur Compliance-Freigabe.",
        warum:
          "Sanktionslisten enthalten oft häufige Namen aus bestimmten Regionen – False Positives sind ein bekanntes und häufiges Problem. Trotzdem: Die Entscheidung, ob ein Treffer ein False Positive ist, liegt ausschliesslich bei Compliance. Eine falsche Freigabe eines echten Sanktionsfalls kann zu schwerwiegenden Konsequenzen führen (Bussen, Lizenzentzug). Korrekte Dokumentation des False-Positive-Entscheids ist für allfällige Revisorprüfungen zwingend.",
        inDerPraxis:
          "False Positives machen bei Banken mit hohem Auslandszahlungsvolumen bis zu 98% aller Sanktionsalarme aus. Spezialisierte AML-Analysten in Compliance prüfen diese Treffer schnell und qualifiziert. Gute Dossierführung (Geburtsdatum, Nationalität, ID-Dokument im System hinterlegt) verkürzt die Prüfungszeit erheblich. Alle Schritte – Alarm, Prüfung, Entscheid, Freigabe – werden lückenlos im System dokumentiert.",
        merksatz:
          "False Positive? Trotzdem Compliance entscheiden lassen. Nie selbst freigeben. Jeder Schritt muss dokumentiert sein.",
        glossarTerm: "Sanktionen / SECO",
        rechtsgrundlage: "EmbG (Embargogesetz) / SECO-Verordnungen / FINMA-RS 2013/3 (Sanktionen) / GwG Art. 10a (Informationsverbot)",
        concepts: ["Sanktionen", "SECO"],
      },
    ],
  },
];

OF_CASES_ZAHLUNGSVERKEHR.forEach((c) => {
  ZV_LEVELS.find((l) => l.level === c.level)!.cases.push(c);
});
