export type LevelNum = 1 | 2 | 3;

export interface ZvFoOption {
  key: string;
  text: string;
}

export interface ZvFoCase {
  id: string;
  level: LevelNum;
  title: string;
  situation: string;
  question: string;
  options: ZvFoOption[];
  correct: string;
  feedback: string;
  concepts?: string[];
}

export interface ZvFoLevel {
  level: LevelNum;
  label: string;
  badgeVariant: "green" | "orange" | "red";
  cases: ZvFoCase[];
}

export interface ZvFoProduct {
  id: string;
  title: string;
  subtitle: string;
  details: string[];
  example: string;
}

export const ZV_FO_PRODUCTS: ZvFoProduct[] = [
  {
    id: "dauerauftrag",
    title: "Dauerauftrag",
    subtitle: "Wiederkehrende Zahlungen",
    details: [
      "Gleicher Betrag, gleicher Empfänger",
      "Automatisch zum gewünschten Datum",
      "Vom Kunden eingerichtet",
    ],
    example: "z.B. Miete, Abonnements",
  },
  {
    id: "lsv",
    title: "LSV / LSV+",
    subtitle: "Lastschriftverfahren",
    details: [
      "Rechnungssteller zieht Betrag ein",
      "Auch bei variierenden Beträgen",
      "Widerspruchsrecht vorhanden",
    ],
    example: "z.B. Krankenkasse, Leasing",
  },
  {
    id: "ebanking",
    title: "E-Banking",
    subtitle: "Zahlungen online erledigen",
    details: [
      "24/7 verfügbar",
      "Günstigere Gebühren als Schalter",
      "Zahlungen, Kontoauszüge, Überweisungen",
    ],
    example: "Alle manuellen Zahlungen digital",
  },
  {
    id: "ebill",
    title: "E-Bill",
    subtitle: "Rechnungen direkt im E-Banking",
    details: [
      "Rechnungen werden digital zugestellt",
      "Bereits vorerfasst – nur noch bestätigen",
      "Kein Einzahlungsschein, kein Papier",
    ],
    example: "z.B. Krankenkasse, Swisscom",
  },
  {
    id: "ausland",
    title: "Auslandzahlung",
    subtitle: "SEPA & SWIFT",
    details: [
      "SEPA: EU/EWR – nur IBAN nötig, kein BIC",
      "SWIFT: Weltweit – IBAN + BIC zwingend",
      "Schweiz = SEPA-Mitglied (kein EU-Land!)",
    ],
    example: "D/FR/AT = SEPA · USA/JP = SWIFT",
  },
];

// ─────────────────────────────────────────────────────────
// LEVEL 1 – Einsteiger
// ─────────────────────────────────────────────────────────

const L1_CASES: ZvFoCase[] = [
  {
    id: "1.1",
    level: 1,
    title: "Richtiges Produkt empfehlen",
    situation:
      "Herr Weber kommt zum Schalter. Er sagt: 'Ich zahle jeden Monat CHF 1'800 Miete. Ich vergesse das manchmal – gibt es eine automatische Lösung?'",
    question: "Was empfiehlst du?",
    options: [
      { key: "A", text: "Kreditkarte einrichten – monatlichen Mietbetrag auf die Karte buchen und über Lastschrift automatisch einziehen lassen." },
      {
        key: "B",
        text: "Dauerauftrag einrichten – gleicher Betrag, gleicher Empfänger, automatisch jeden Monat ausgeführt",
      },
      { key: "C", text: "LSV einrichten – der Vermieter gibt einen LSV-Auftrag auf und zieht die Miete automatisch vom Konto ein, ohne dass der Kunde etwas tun muss." },
      { key: "D", text: "E-Bill aktivieren – der Vermieter schickt die Mietzinsrechnung jeden Monat digital ins E-Banking, der Kunde bestätigt mit einem Klick." },
    ],
    correct: "B",
    feedback:
      "Dauerauftrag ist ideal für wiederkehrende Zahlungen mit gleichem Betrag an gleichen Empfänger. LSV wäre falsch – LSV wird vom Rechnungssteller ausgelöst, nicht vom Kunden. E-Bill dient für digitale Rechnungen, keine wiederkehrenden Fixzahlungen.",
  },
  {
    id: "1.2",
    level: 1,
    title: "E-Bill erklären",
    situation:
      "Kundin fragt: 'Ich bekomme so viele Papierrechnungen. Gibt es eine digitale Lösung?'",
    question: "Was erklärst du ihr?",
    options: [
      { key: "A", text: "\"Per QR-Code im E-Banking zahlen – die App liest alle Daten automatisch aus dem Einzahlungsschein. Das ist genauso papierlos wie E-Bill, und Sie behalten volle Kontrolle über jeden Betrag und Zeitpunkt.\"" },
      {
        key: "B",
        text: "\"Digitale Rechnungslösungen sind bei uns erst für Grosskunden verfügbar. Für Privatkunden ist die Papierrechnung weiterhin die einzige rechtlich gültige Zahlungsaufforderung in der Schweiz.\"",
      },
      { key: "C", text: "\"Für jeden Rechnungssteller einen Dauerauftrag einrichten – der Betrag wird am gleichen Datum abgebucht. Falls die Rechnung variiert, überweist der Dauerauftrag trotzdem denselben Betrag wie vereinbart.\"" },
      { key: "D", text: "\"Mit E-Bill erhalten Sie Rechnungen direkt im E-Banking – bereits vorerfasst. Sie müssen nur noch prüfen und mit wenigen Klicks bestätigen. Kein Papier mehr.\"" },
    ],
    correct: "D",
    feedback:
      "E-Bill = Rechnungen digital direkt im E-Banking. Der Rechnungssteller schickt die Rechnung elektronisch – die Kundin prüft und bezahlt mit einem Klick. Kein Einzahlungsschein, kein Papier. Dauerauftrag wäre falsch, da Rechnungen unterschiedliche Beträge haben können.",
  },
  {
    id: "1.3",
    level: 1,
    title: "Kartenverlust",
    situation: "Kunde ruft aufgeregt an: 'Ich habe meine Maestrokarte verloren – was soll ich tun?'",
    question: "Was sagst du ihm?",
    options: [
      { key: "A", text: "\"Keine Panik – rufen Sie sofort die Sperrhotline an: 0800 80 40 40. Die Karte wird sofort gesperrt. Danach eröffnen wir eine neue Karte.\"" },
      {
        key: "B",
        text: "\"Notieren Sie Kartennummer und die letzten Transaktionen, kommen Sie morgen früh in die Filiale und stellen Sie einen schriftlichen Verlustbericht – ohne diesen kann keine Ersatzkarte ausgestellt werden.\"",
      },
      { key: "C", text: "\"Das Missbrauchsrisiko ist gering, solange die PIN nicht auf der Karte notiert war. Warten Sie 48 Stunden – nur wenn bis dahin fremde Transaktionen erscheinen, müssen Sie die Karte sperren lassen.\"" },
      { key: "D", text: "\"Das wichtigste ist, sofort die Karten-PIN und das E-Banking-Passwort zu ändern. Damit sind keine Kartentransaktionen mehr möglich – eine Sperrung durch die Bank ist erst nötig, wenn fremde Buchungen erscheinen.\"" },
    ],
    correct: "A",
    feedback:
      "Bei Kartenverlust sofort sperren lassen! Die Sperrhotline 0800 80 40 40 ist 24/7 erreichbar. Eine gesperrte Karte kann nicht mehr missbraucht werden. Morgen in die Filiale zu kommen ist zu spät – die Karte muss sofort gesperrt werden. Danach wird eine Ersatzkarte beantragt.",
  },
  {
    id: "1.4",
    level: 1,
    title: "QR-Rechnung erklären",
    situation:
      "Neukunde, 68 Jahre, zeigt dir eine Rechnung: «Früher hatte ich immer einen orangen oder roten Einzahlungsschein – jetzt ist da nur noch ein komischer Strichcode. Was ist das?»",
    question: "Was erklärst du ihm?",
    options: [
      { key: "A", text: "«Der QR-Code ist nur für Online-Zahlung. Für Barzahlungen am Postschalter brauchen Sie weiterhin den alten Einzahlungsschein – den können Sie kostenlos bei uns ausfüllen lassen.»" },
      { key: "B", text: "«Das ist die neue QR-Rechnung – sie hat seit 2022 den alten Einzahlungsschein abgelöst. Im E-Banking einfach den QR-Code abfotografieren: Alle Zahlungsdaten werden automatisch eingelesen. Kein manuelles Tippen mehr.»" },
      { key: "C", text: "«Das ist ein Sicherheitsmerkmal – der Code bestätigt, dass die Rechnung authentisch ist. Zum Bezahlen müssen Sie trotzdem alle Daten manuell im E-Banking eingeben.»" },
      { key: "D", text: "«QR-Rechnungen sind nur für Firmen – Privatkunden können weiterhin den klassischen Einzahlungsschein verwenden. Sprechen Sie den Rechnungssteller an, er soll eine normale Rechnung schicken.»" },
    ],
    correct: "B",
    feedback:
      "Seit Oktober 2022 hat die QR-Rechnung den orangen und roten Einzahlungsschein vollständig abgelöst. Der QR-Code enthält alle Zahlungsdaten (IBAN, Betrag, Empfänger, Referenz). Im E-Banking einfach scannen – fertig. Am Postschalter und an Bankautomaten kann der QR-Code ebenfalls eingelesen werden. Kein manuelles Eingeben mehr nötig.",
  },
  {
    id: "1.5",
    level: 1,
    title: "TWINT-Überweisung unter Kollegen",
    situation:
      "Kundin, 24 Jahre, fragt: «Meine Kollegin und ich teilen oft gemeinsame Rechnungen. Gibt es eine einfachere Lösung als jedes Mal eine Banküberweisung zu machen?»",
    question: "Was empfiehlst du?",
    options: [
      { key: "A", text: "«Am einfachsten ist ein gemeinsames Konto – beide heben dann direkt ab, ohne jedes Mal zu überweisen.»" },
      { key: "B", text: "«LSV einrichten – Ihre Kollegin kann dann automatisch den Anteil von Ihrem Konto einziehen.»" },
      { key: "C", text: "«TWINT – die App ermöglicht Sofortüberweisungen zwischen Privatpersonen via Handynummer oder QR-Code. Kein IBAN nötig, sofortige Gutschrift.»" },
      { key: "D", text: "«E-Bill aktivieren – damit kann Ihre Kollegin digitale Rechnungen direkt an Ihr E-Banking senden.»" },
    ],
    correct: "C",
    feedback:
      "TWINT ist ideal für Zahlungen zwischen Privatpersonen: Sofortüberweisung per Handynummer, QR-Code oder TWINT-ID. Kein IBAN nötig, Geld sofort auf dem Konto. Perfekt für geteilte Restaurantrechnungen, Miete unter Mitbewohnern, Marktplatz-Käufe. LSV und E-Bill sind für Firmenzahlungen gedacht, kein gemeinsames Konto nötig.",
  },
];

// ─────────────────────────────────────────────────────────
// LEVEL 2 – Fortgeschritten
// ─────────────────────────────────────────────────────────

const L2_CASES: ZvFoCase[] = [
  {
    id: "2.1",
    level: 2,
    title: "LSV vs. Dauerauftrag",
    situation:
      "Kunde hat Krankenkassenrechnung mit unterschiedlichen Beträgen jeden Monat. Er fragt, was besser ist – Dauerauftrag oder LSV?",
    question: "Was empfiehlst du?",
    options: [
      { key: "A", text: "LSV – die Krankenkasse zieht automatisch den richtigen Betrag ein, auch wenn er variiert. Mit Widerspruchsrecht geschützt." },
      {
        key: "B",
        text: "Dauerauftrag mit dem höchsten erwarteten Monatsbetrag einrichten – falls die Prämie tiefer ausfällt, landet die Differenz auf dem Konto der Krankenkasse als Guthaben und wird mit der nächsten Rechnung verrechnet.",
      },
      { key: "C", text: "Beide parallel einrichten – der Dauerauftrag deckt den Fixanteil der Prämie, der LSV-Auftrag gleicht variable Differenzen aus. So ist jede Rechnung ohne Unterzahlung gedeckt." },
      { key: "D", text: "Manuell zahlen – so behält der Kunde volle Kontrolle und prüft jeden Monat die aktuelle Prämie bevor er zahlt. Das ist aufwändiger, aber bei variierenden Beträgen die sicherste Methode." },
    ],
    correct: "A",
    feedback:
      "LSV ist ideal, wenn der Betrag variiert. Der Dauerauftrag ist nur bei gleichbleibendem Betrag sinnvoll – da Krankenkassenprämien variieren können, ist LSV die richtige Wahl. Das Widerspruchsrecht schützt den Kunden vor falschen Abbuchungen.",
  },
  {
    id: "2.2",
    level: 2,
    title: "E-Banking Sicherheit erklären",
    situation:
      "Kunde sagt: 'Ich habe Angst vor E-Banking – ich habe gehört man kann gehackt werden. Was raten Sie mir?'",
    question: "Was erklärst du ihm?",
    options: [
      {
        key: "A",
        text: "\"E-Banking hat dasselbe Betrugsrisiko wie Online-Shopping. Für Überweisungen über CHF 5'000 empfehle ich den Schalter – dort validieren wir jede Zahlung manuell und können bei Phishing-Verdacht sofort eingreifen.\"",
      },
      {
        key: "B",
        text: "\"E-Banking ist sicher, wenn Sie diese Regeln befolgen: Niemals Passwort weitergeben, immer offizielle Bank-App nutzen, bei Phishing-Mails sofort melden, Gerät regelmässig aktualisieren.\"",
      },
      { key: "C", text: "\"Das regelmässige Ändern des Passworts ist die wichtigste Schutzmassnahme. Die Bank sendet automatisch eine SMS-Bestätigung bei ungewöhnlichen Logins – das schützt zusätzlich gegen fremden Zugriff.\"" },
      {
        key: "D",
        text: "\"Unsere Bank garantiert Rückerstattung bei Schäden durch Hackerangriffe, solange Sie das E-Banking über unser offizielles Portal nutzen. Verluste durch Phishing sind versichert und werden innerhalb von 5 Werktagen erstattet.\"",
      },
    ],
    correct: "B",
    feedback:
      "E-Banking ist sicher bei richtigem Verhalten. Die wichtigsten Regeln: Passwort nie weitergeben, nur offizielle App/Website nutzen, Phishing erkennen, Gerät aktuell halten. Wichtig: Die Bank fragt NIE per E-Mail oder Telefon nach dem Passwort! Antwort A ist falsch – E-Banking ist sicherer und günstiger als der Schalter.",
  },
  {
    id: "2.3",
    level: 2,
    title: "Auslandzahlung Europa",
    situation:
      "Kunde möchte CHF 2'000 an einen Freund in Deutschland überweisen. Was braucht er?",
    question: "Was erklärst du?",
    options: [
      { key: "A", text: "\"In der EU gilt SEPA-Instant: Es reicht eine einfache Kontonummer, IBAN und BIC werden automatisch durch das Clearingsystem ergänzt. Der Betrag wird in Echtzeit übermittelt.\"" },
      {
        key: "B",
        text: "\"IBAN alleine reicht für Deutschland nicht – zusätzlich zwingend den BIC angeben, weil Zahlungen zwischen Schweiz und EU ausschliesslich über SWIFT laufen. SEPA gilt nur innerhalb der Eurozone.\"",
      },
      { key: "C", text: "\"Für Zahlungen nach Deutschland brauchen wir zwingend IBAN und BIC, weil Deutschland kein SEPA-Abkommen mit der Schweiz unterzeichnet hat. Der Empfänger muss den 8- oder 11-stelligen BIC mitteilen.\"" },
      { key: "D", text: "\"Deutschland liegt in der SEPA-Zone. Es reicht die IBAN des Empfängers – kein BIC nötig. Günstigere Gebühren als SWIFT. Zahlung meist innerhalb 1–2 Tagen.\"" },
    ],
    correct: "D",
    feedback:
      "Deutschland liegt in der SEPA-Zone – innerhalb SEPA reicht die IBAN alleine, kein BIC erforderlich. Günstigere Gebühren als SWIFT. Wichtig: Die Schweiz ist kein EU-Land, aber SEPA-Mitglied – also können Schweizer Kunden SEPA-Zahlungen in die EU senden.",
  },
  {
    id: "2.4",
    level: 2,
    title: "Debitkarte vs. Kreditkarte auf Reisen",
    situation:
      "Kunde plant eine dreiwöchige Reise nach Thailand. Er fragt: «Soll ich lieber die Debitkarte oder die Kreditkarte mitnehmen?»",
    question: "Was erklärst du?",
    options: [
      { key: "A", text: "«Debitkarte ist besser – sie zieht direkt vom Konto ab, so behalten Sie volle Kontrolle. Im Ausland ist die Gebühr dieselbe wie bei der Kreditkarte.»" },
      { key: "B", text: "«Kreditkarte empfehlenswert für Auslandreisen: Hotelbuchungen, Mietwagen und Notfallreserve. Viele Länder akzeptieren keine Debitkarte. Debitkarte als Backup für Bargeld-Bezüge mitbringen. Fremdwährungsgebühren bei beiden beachten.»" },
      { key: "C", text: "«Beide Karten zu Hause lassen – im Ausland ist Bargeld sicherer. CHF am Flughafen wechseln und in lokale Währung umtauschen ist günstiger als jede Kartenzahlung.»" },
      { key: "D", text: "«Kreditkarte nur wenn Sie den vollen Betrag am Monatsende begleichen können – sonst entstehen hohe Zinsen. Debitkarte ist in Thailand weltweit akzeptiert und ohne Schuldenrisiko.»" },
    ],
    correct: "B",
    feedback:
      "Kreditkarte ist auf Auslandreisen oft unverzichtbar: Hotels, Mietwagen und Online-Buchungen verlangen häufig eine Kreditkarte (Debitkarte wird oft nicht akzeptiert). Wichtige Hinweise: 1) Reisekrankenversicherung bei manchen Kreditkarten inbegriffen. 2) Fremdwährungsgebühren bei beiden Karten (ca. 1.5–2.5% je Transaktion). 3) Bargeld-Bezüge via Kreditkarte sind teuer (Cashadvance-Gebühr). Debitkarte als Backup empfehlen.",
  },
  {
    id: "2.5",
    level: 2,
    title: "Kontaktloses Zahlen – Sicherheit",
    situation:
      "Kundin fragt besorgt: «Ich habe gelesen, dass man mit einem Spezialgerät Geld von meiner Karte stehlen kann, ohne dass ich es merke – stimmt das?»",
    question: "Was sagst du ihr?",
    options: [
      { key: "A", text: "«Das stimmt leider – NFC-Karten sind ein Sicherheitsrisiko. Ich empfehle, die NFC-Funktion deaktivieren zu lassen und nur per PIN zu zahlen.»" },
      { key: "B", text: "«NFC-Skimming ist theoretisch möglich aber in der Praxis extrem unwahrscheinlich. Die Karte müsste auf wenige Zentimeter annähernd werden, der Betrag ist ohne PIN auf CHF 80 limitiert, und die Bank überwacht alle Transaktionen aktiv.»" },
      { key: "C", text: "«Das Risiko ist real – kaufen Sie am besten eine RFID-Schutzhülle. Damit ist jede kontaktlose Abbuchung ohne Ihr Wissen technisch unmöglich.»" },
      { key: "D", text: "«Kontaktloses Zahlen ist komplett sicher – NFC-Transaktionen können technisch nicht abgefangen werden. Das Gerät müsste direkt auf der Karte aufliegen, was sofort auffallen würde.»" },
    ],
    correct: "B",
    feedback:
      "NFC-Skimming ist in der Praxis kein reales Risiko: 1) Gerät muss <4cm an die Karte, 2) Limit ohne PIN: CHF 80 (nach mehreren NFC-Transaktionen in Folge wird PIN automatisch verlangt), 3) Banken überwachen Transaktionen auf Auffälligkeiten. Die Hauptbotschaft: NFC ist sicher, das Limit schützt, echte Fälle von NFC-Diebstahl in der Schweiz extrem selten.",
  },
];

// ─────────────────────────────────────────────────────────
// LEVEL 3 – Challenge-Niveau
// ─────────────────────────────────────────────────────────

const L3_CASES: ZvFoCase[] = [
  {
    id: "3.1",
    level: 3,
    title: "SEPA vs. SWIFT",
    situation:
      "Kunde möchte Geld überweisen – Fall A: CHF 5'000 nach Frankreich. Fall B: CHF 5'000 nach Japan. Er fragt nach dem Unterschied.",
    question: "Was erklärst du?",
    options: [
      { key: "A", text: "\"Frankreich = SEPA-Zone = nur IBAN nötig, kein BIC, günstigere Gebühren. Japan = SWIFT = ausserhalb EU/EWR, IBAN und BIC zwingend, höhere Gebühren – besonders bei Fremdwährungen.\"" },
      {
        key: "B",
        text: "\"Kein wesentlicher Unterschied – beide Länder werden über das internationale SWIFT-Netz abgewickelt. Frankreich ist EU-Mitglied, aber SEPA gilt für Schweizer Banken nicht, da die Schweiz kein EU-Mitglied ist.\"",
      },
      {
        key: "C",
        text: "\"Zahlungen nach Japan laufen über das ISO 20022-System, das SEPA und SWIFT vereinheitlicht. Japan und die EU haben ein bilaterales Zahlungsabkommen – es reicht die IBAN, kein BIC nötig.\"",
      },
      {
        key: "D",
        text: "\"Beide Länder brauchen zwingend IBAN und BIC – Frankreich unterzeichnete den SEPA-Vertrag erst 2019, weswegen für ältere Konten noch immer der BIC-Code erforderlich ist.\"",
      },
    ],
    correct: "A",
    feedback:
      "SEPA gilt für EU/EWR-Länder – innerhalb SEPA reicht die IBAN, kein BIC nötig. SWIFT gilt weltweit ausserhalb EU/EWR – IBAN und BIC zwingend, höhere Gebühren. Wichtig: Die Schweiz ist kein EU-Land aber SEPA-Mitglied! Frankreich ist EU/SEPA, Japan ist SWIFT.",
  },
  {
    id: "3.2",
    level: 3,
    title: "Phishing erkennen",
    situation:
      "Kunde zeigt dir eine E-Mail: 'Lieber Kunde, Ihr Konto wird gesperrt. Klicken Sie hier und geben Sie Ihr Passwort ein. Mit freundlichen Grüssen, Ihre Bank'",
    question: "Was sagst du dem Kunden?",
    options: [
      { key: "A", text: "\"Sieht seriös aus – Link sicher klicken\"" },
      {
        key: "B",
        text: "\"Das ist Phishing! Niemals auf solche Links klicken oder Passwort eingeben. Banken fragen NIE per E-Mail nach dem Passwort. E-Mail sofort löschen und uns informieren.\"",
      },
      { key: "C", text: "\"Passwort schnell im E-Banking ändern nach dem Klick\"" },
      { key: "D", text: "\"Nur auf den Link klicken, wenn Sie sicher sind\"" },
    ],
    correct: "B",
    feedback:
      "Klassisches Phishing! Merkmale: Dringlichkeit ('wird gesperrt'), Passwort-Anfrage, Link in E-Mail. Banken fragen NIE per E-Mail nach Passwort oder Login-Daten. Solche Mails immer sofort löschen. Phishing-Mail dem Bank-Sicherheitsteam melden. Kein Link klicken, kein Passwort eingeben!",
  },
  {
    id: "3.3",
    level: 3,
    title: "Komplexfall – vier Anliegen",
    situation:
      "Kunde kommt mit vier Anliegen: 1. Miete CHF 2'200 monatlich automatisch. 2. Krankenkasse mit variierendem Betrag. 3. Rechnungen papierlos erledigen. 4. Geld nach Japan überweisen.",
    question: "Welche Produkte empfiehlst du für jeden Punkt?",
    options: [
      { key: "A", text: "1. Dauerauftrag  2. Dauerauftrag mit variablem Betrag  3. E-Bill  4. SEPA – Japan ist dem SEPA-Abkommen beigetreten, daher reicht die IBAN ohne BIC." },
      {
        key: "B",
        text: "1. LSV  2. LSV  3. Dauerauftrag  4. SWIFT mit nur IBAN – Japan akzeptiert als G7-Land europäische Zahlungsstandards ohne BIC.",
      },
      { key: "C", text: "1. E-Bill  2. Dauerauftrag  3. LSV  4. SEPA mit IBAN – BIC ist in Europa seit 2016 nicht mehr nötig, auch für Japan gilt SEPA-Standard." },
      { key: "D", text: "1. Dauerauftrag  2. LSV  3. E-Bill aktivieren  4. SWIFT – ausserhalb EU/EWR, IBAN und BIC zwingend, höhere Gebühren bei JPY" },
    ],
    correct: "D",
    feedback:
      "Jedes Produkt hat seinen Zweck: 1. Dauerauftrag = gleicher Betrag, gleicher Empfänger. 2. LSV = variabler Betrag – Krankenkasse zieht selbst ein. 3. E-Bill = Rechnungen papierlos direkt im E-Banking. 4. Japan liegt ausserhalb EU/EWR → SWIFT zwingend, IBAN + BIC nötig, höhere Gebühren als SEPA. Merke: Schweiz = SEPA-Mitglied, aber kein EU-Land!",
  },
  {
    id: "3.4",
    level: 3,
    title: "Valuta vs. Buchungsdatum",
    situation:
      "Kundin ist verärgert: «Ich habe am Freitag CHF 3'000 überwiesen – auf dem Auszug steht Buchungsdatum Freitag, aber das Geld ist erst am Dienstag beim Empfänger ankam. Was stimmt da nicht?»",
    question: "Was erklärst du?",
    options: [
      { key: "A", text: "«Das ist ein Fehler unserer Bank – eine Inlandüberweisung muss am selben Werktag ankommen. Sie können eine formelle Beschwerde einreichen und Verzugszinsen fordern.»" },
      { key: "B", text: "«Buchungsdatum und Valutadatum sind zwei verschiedene Dinge: Das Buchungsdatum zeigt, wann Ihre Bank die Zahlung erfasst hat. Das Valutadatum ist der Zeitpunkt, ab dem das Geld beim Empfänger zinsrelevant verfügbar ist. Überweisungen am Freitagabend nach Tagesschluss laufen meist erst am nächsten Werktag (Montag) durch das Clearing.»" },
      { key: "C", text: "«Beim Empfänger wurde die Gutschrift verzögert, weil die Empfängerbank das Geld intern zurückgehalten hat. Das ist ein bekanntes Problem bei manchen Banken.»" },
      { key: "D", text: "«Inlandsüberweisungen laufen immer am gleichen Tag durch – der Empfänger hat das Geld spätestens 4 Stunden nach Auftrag. Wenn es Dienstag war, muss der Auftrag erst am Montag eingegangen sein.»" },
    ],
    correct: "B",
    feedback:
      "Wichtige Unterscheidung: Buchungsdatum = wann die Zahlung in deinem System erfasst wird. Valutadatum = wann das Geld zinsrelevant beim Empfänger verfügbar ist. Inlandszahlungen: Aufträge bis Tagesschluss (meist 16:30 Uhr) werden am selben Tag verarbeitet. Freitagabend = nächstes Clearing am Montag → Gutschrift beim Empfänger am Montag oder Dienstag. Das ist kein Fehler, sondern Standard-Valuta-Praxis.",
  },
  {
    id: "3.5",
    level: 3,
    title: "LSV-Widerspruch nach unberechtigter Abbuchung",
    situation:
      "Kunde ist aufgeregt: «Mein Fitnessstudio hat via LSV CHF 480 von meinem Konto abgebucht – ich habe das Abo aber vor 3 Monaten gekündigt! Was kann ich tun?»",
    question: "Was erklärst du und was leitest du ein?",
    options: [
      { key: "A", text: "«Leider können LSV-Abbuchungen nach mehr als 30 Tagen nicht mehr rückgängig gemacht werden. Sie müssen das Geld direkt vom Fitnessstudio zurückfordern.»" },
      { key: "B", text: "«Sie können innerhalb von 30 Tagen ab Buchungsdatum Widerspruch einlegen. Wir leiten die Rückbuchung ein. Gleichzeitig empfehle ich, den LSV-Auftrag für diesen Rechnungssteller zu sperren, damit keine weiteren Abbuchungen erfolgen.»" },
      { key: "C", text: "«Eine Rückbuchung ist nur möglich wenn das Fitnessstudio zustimmt. Wir können das Geld nicht einseitig zurückfordern – das wäre rechtlich nicht gedeckt.»" },
      { key: "D", text: "«Bei LSV haben Sie kein Widerspruchsrecht – das ist der Unterschied zu einer normalen Überweisung. Sie müssen den Betrag per Gerichtsweg zurückfordern.»" },
    ],
    correct: "B",
    feedback:
      "LSV-Widerspruchsrecht: Kunde kann innerhalb von 30 Tagen ab Buchungsdatum widersprechen – die Bank bucht den Betrag zurück, ohne dass der Rechnungssteller zustimmen muss. Danach ist nur noch der direkte Weg zum Rechnungssteller möglich. Wichtig: LSV-Auftrag für diesen Biller sofort sperren! Die Bank kann einzelne Rechnungssteller aus dem LSV-Mandat ausschliessen, damit keine weiteren unberechtigten Abbuchungen folgen.",
  },
];

// ─────────────────────────────────────────────────────────
// LEVEL CONFIG
// ─────────────────────────────────────────────────────────

export const ZV_FO_LEVELS: ZvFoLevel[] = [
  { level: 1, label: "Einsteiger", badgeVariant: "green", cases: L1_CASES },
  { level: 2, label: "Fortgeschritten", badgeVariant: "orange", cases: L2_CASES },
  { level: 3, label: "Challenge-Niveau", badgeVariant: "red", cases: L3_CASES },
];
