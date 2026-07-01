// ─── OFFENE FRAGEN (Open-ended judgment cases) ───────────────────────────────
// Free-text scenarios evaluated by AI against expectedApproach.
// Separate from existing MC / Lückentext cases — IDs prefixed per module.

import { type OffeneFrageCase } from "./offene-frage";

// ─── MODULE 1: KYC ────────────────────────────────────────────────────────────

export const OF_CASES_KYC: OffeneFrageCase[] = [
  {
    type: "offene-frage",
    id: "kyc-of-1",
    level: 1,
    briefing:
      "Du bist am Schalter. Ein Kunde möchte CHF 18'000 in bar auf sein Privatkonto einzahlen. Als du nach der Herkunft des Geldes fragst, sagt er nur: «Das ist mein Erspartes aus der Haushaltskasse – ich habe einfach lange gespart.» Einen Beleg oder Kontoauszug hat er nicht dabei. Der Betrag liegt deutlich über CHF 15'000.",
    question: "Was würdest du tun?",
    role: "Compliance-Spezialist/in",
    expectedApproach:
      "Gemäss VSB 20 und GwG ist bei Bareinzahlungen über CHF 15'000 die Identifikation des Einzahlenden zwingend, und ab CHF 25'000 muss zusätzlich die Herkunft der Mittel dokumentiert werden. Bei CHF 18'000 muss die Identität des Kunden gesichert sein; die Herkunftserklärung «Haushaltskasse» ist zwar unter der CHF 25'000-Schwelle formal noch nicht zwingend zu belegen, aber die vage Aussage ohne jegliche Unterlagen sollte trotzdem als ungewöhnlich vermerkt werden. Der richtige Ansatz: Identität des Kunden prüfen (Ausweis vorlegen lassen, auch wenn er bereits Kunde ist), die Angabe zur Herkunft im System dokumentieren, und den Vorgesetzten oder Compliance informieren, wenn die Erklärung nicht plausibel wirkt. Die Einzahlung sollte nicht einfach kommentarlos verbucht werden — interne Dokumentation der gegebenen Erklärung ist Pflicht. Bei Unplausibilität können erhöhte Sorgfaltspflichten nach GwG Art. 6 ausgelöst werden.",
  },
  {
    type: "offene-frage",
    id: "kyc-of-2",
    level: 2,
    briefing:
      "Ein Neukunde möchte ein Konto eröffnen und CHF 80'000 als erste Einlage einzahlen. Du verlangst gemäss internem Prozess einen Herkunftsnachweis der Mittel. Der Kunde wird zunehmend ungeduldig und sagt: «Ich bin nicht verpflichtet, euch meine Privatsache zu erklären. Entweder ihr eröffnet das Konto, oder ich gehe zur Konkurrenzbank.» Er verweigert jede weitere Auskunft.",
    question: "Wie gehst du vor?",
    role: "Bankberater/in",
    expectedApproach:
      "Bei Einlagen dieser Grössenordnung (CHF 80'000) ist die Dokumentation der Mittelherkunft gemäss VSB 20 und GwG zwingend — das ist keine bankinterne Zusatzschikane, sondern eine gesetzliche Pflicht. Wenn ein Kunde die Auskunft verweigert, darf und muss die Kontoeröffnung abgelehnt werden; die Geschäftsbeziehung kann nicht eingegangen werden, wenn die gesetzlichen Sorgfaltspflichten nicht erfüllt werden können (GwG Art. 9a). Der Lehrling sollte ruhig und sachlich erklären, dass es sich um eine gesetzliche Anforderung handelt, nicht um eine persönliche Entscheidung der Bank. Die Drohung, zur Konkurrenzbank zu gehen, darf keinen Druck ausüben — jede Schweizer Bank ist denselben GwG-Pflichten unterworfen. Intern muss der Sachverhalt dokumentiert werden: Wer hat was gefordert, was hat der Kunde gesagt, und warum wurde die Eröffnung abgelehnt. Der Vorgesetzte ist zu informieren. Dieser Sachverhalt kann zudem als Verdachtsindiz relevant sein (warum weigert sich jemand bei einer legitimen Anfrage?) und sollte gemäss interner Policy beurteilt werden.",
  },
  {
    type: "offene-frage",
    id: "kyc-of-3",
    level: 2,
    briefing:
      "Im Kundengespräch erwähnst du beiläufig den vollständigen Namen eines Neukunden, den du gerade bearbeitest. Kurz nach der Begrüssung realisierts du: der Name taucht in eurer internen PEP-Datenbank auf. Der Kunde ist Stadtrat in einer mittelgrossen Gemeinde im Kanton Zürich — also ein inländischer PEP. Er möchte ein normales Sparkonto mit CHF 50'000 eröffnen.",
    question: "Was würdest du tun?",
    role: "Bankberater/in",
    expectedApproach:
      "Inländische PEPs (politisch exponierte Personen) unterliegen gemäss GwG Art. 2a Abs. 1 lit. a und den FINMA-Rundschreiben erhöhten Sorgfaltspflichten, jedoch gelten für inländische PEPs im Vergleich zu ausländischen PEPs etwas niedrigere Anforderungen — sie sind nicht automatisch Hochrisiko, sondern risikobasiert zu beurteilen. Konkrete Schritte: Den PEP-Status im System korrekt erfassen und mit «Inlands-PEP» kennzeichnen. Formular A auf Vollständigkeit prüfen (wirtschaftlich Berechtigter = Kunde selbst?). Die Eröffnung muss intern gemäss Bank-Policy eskaliert werden — in den meisten Banken braucht eine PEP-Beziehung eine Genehmigung auf Stufe Vorgesetzter oder Compliance, auch bei inländischen PEPs. Die Herkunft der CHF 50'000 sollte plausibel dokumentiert werden (z. B. Lohnkonto, Ersparnisse). Die Geschäftsbeziehung ist nicht automatisch abzulehnen — ein Stadtrat hat ein legitimes Recht auf ein Bankkonto. Aber die erhöhten Sorgfaltspflichten und die interne Genehmigung sind nicht verhandelbar. Engmaschige Überwachung der Kontoaktivitäten nach Eröffnung.",
  },
  {
    type: "offene-frage",
    id: "kyc-of-4",
    level: 3,
    briefing:
      "Ein Stammkunde — Inhaber einer kleinen Bäckerei — kommt an drei aufeinanderfolgenden Tagen an den Schalter und zahlt jeweils CHF 9'400 in bar ein. Total CHF 28'200 in drei Tagen. Auf die Frage, woher das Geld komme, erklärt er: «Sehr gute Woche gehabt, Hochzeitssaison.» Sein bisheriges Transaktionsprofil zeigt normalerweise Einzahlungen von maximal CHF 5'000 pro Woche.",
    question: "Wie gehst du vor?",
    role: "Compliance-Spezialist/in",
    expectedApproach:
      "Dieses Muster ist ein klassischer Structuring-Alarm (auch «Smurfing» genannt): Beträge werden bewusst knapp unter der Meldepflichtgrenze von CHF 10'000 aufgeteilt, um die Meldepflicht zu umgehen. Drei Einzahlungen von je CHF 9'400 innerhalb von 72 Stunden durch denselben Kunden, mit einer Gesamtsumme, die das übliche Wochenprofil um das 5-fache übersteigt, löst zwingend besondere Abklärungspflichten nach GwG Art. 6 aus. Konkrete Schritte: Alle drei Transaktionen dokumentieren und intern eskalieren. Die Compliance-Abteilung muss sofort informiert werden. Wichtig: Das Informationsverbot nach GwG Art. 10a greift, sobald eine MROS-Meldung in Erwägung gezogen wird — der Kunde darf nicht darüber informiert werden, dass er unter Verdacht steht oder eine Meldung in Bearbeitung ist. Eine Erklärung wie «gute Hochzeitswoche» ist allein nicht ausreichend — sie muss mit Belegen (z. B. Kassenbüchlein, Tagesabrechnungen) gestützt werden, bevor die Abklärung abgeschlossen werden kann. Wenn die Compliance nach Abklärung weiterhin Zweifel hat, muss eine Meldung an die MROS (Meldestelle für Geldwäscherei) eingereicht und die Vermögenswerte allenfalls gesperrt werden (GwG Art. 9 und 10).",
  },
];

// ─── MODULE 2: MAHNWESEN ─────────────────────────────────────────────────────

export const OF_CASES_MAHNWESEN: OffeneFrageCase[] = [
  {
    type: "offene-frage",
    id: "mw-of-1",
    level: 1,
    briefing:
      "Kundin Sabrina Pfister ruft verärgert an: «Ich habe vor drei Tagen CHF 1'200 überwiesen — wieso schickt ihr mir trotzdem eine Mahnung?» Du öffnest ihr Konto im System und siehst: kein Zahlungseingang in den letzten 14 Tagen. Die Mahnung wurde gemäss Prozess korrekt versandt.",
    question: "Wie gehst du vor?",
    role: "Bankberater/in",
    expectedApproach:
      "Der erste Schritt ist, ruhig und sachlich zu bleiben — die Kundin ist frustriert, aber das muss professionell aufgenommen werden. Im System ist kein Eingang verbucht, was bedeutet: entweder hat die Zahlung noch nicht die Valuta erhalten (bei Banküberweisungen können 1–2 Arbeitstage vergehen), die IBAN war falsch, oder die Zahlung ist bei der eigenen Bank noch in Verarbeitung. Die Kundin sollte gebeten werden, ihren eigenen Kontoauszug zu prüfen: Wurde der Betrag bereits von ihrem Konto abgebucht? Wenn ja, mit welchem Datum (Valuta)? Falls sie einen Überweisungsbeleg oder die Auftragsbestätigung ihrer Bank vorweisen kann, kann intern geklärt werden, wo die Zahlung hängt. Solange der Eingang nicht bestätigt ist, bleibt der Mahnprozess formal korrekt aufrecht. Der Lehrling darf die Mahnung nicht einfach «annullieren» auf Zuruf — eine mündliche Aussage der Kundin reicht nicht als Zahlungsnachweis. Falls die Zahlung in den nächsten 1–2 Tagen eingeht, werden die allfälligen Mahngebühren intern besprochen. Wichtig: freundlich und lösungsorientiert kommunizieren, dabei aber den internen Prozess nicht umgehen.",
  },
  {
    type: "offene-frage",
    id: "mw-of-2",
    level: 2,
    briefing:
      "Kunde Jonas Bürgi hat einen Konsumkredit mit monatlichen Raten von CHF 650. Er ist zwei Monate in Verzug (CHF 1'300). Er ruft an und sagt: «Ich habe gerade meinen Job verloren — ich kann im Moment nicht zahlen. Könnt ihr mir entgegenkommen und einen Ratenzahlungsplan machen?» Die zweite Mahnung wurde bereits versandt.",
    question: "Wie gehst du vor?",
    role: "Bankberater/in",
    expectedApproach:
      "Jobverlust ist eine nachvollziehbare Notlage — der Lehrling sollte empathisch reagieren und gleichzeitig klar kommunizieren, was möglich ist und was nicht. Ein Ratenzahlungsplan (Stundungsvereinbarung) ist grundsätzlich möglich, aber nicht in der alleinigen Kompetenz eines Lehrlings — dieser Fall muss an den zuständigen Berater oder die zuständige Stelle eskaliert werden. Konkret: Dem Kunden erklären, dass man den Fall intern besprechen und zurückrufen wird. Intern wird geprüft, ob eine Stundungsvereinbarung oder ein reduzierter Tilgungsplan möglich ist — dabei sind interne Richtlinien und die Bonität des Kunden massgebend. Eine Ratenzahlungsvereinbarung muss zwingend schriftlich festgehalten und von beiden Parteien unterzeichnet werden; mündliche Zusagen haben keinen Bestand. Während die Verhandlung läuft, wird der Mahnprozess intern vermerkt aber nicht automatisch gestoppt — ohne schriftliche Vereinbarung läuft er weiter. Der Kunde muss informiert werden, dass er so schnell wie möglich reagieren soll, um eine Betreibung zu vermeiden. Gleichzeitig sollte der Berater nachfragen, ob der Kunde Anspruch auf Arbeitslosenentschädigung hat, da dies die Rückzahlungsfähigkeit in Kürze wiederherstellen könnte.",
  },
  {
    type: "offene-frage",
    id: "mw-of-3",
    level: 2,
    briefing:
      "Hypothekarkunde Herr Dietrich ist mit zwei Zinszahlungen von je CHF 2'800 im Rückstand (total CHF 5'600). Alle Mahnstufen wurden durchlaufen. Das Objekt ist sein Eigenheim, Verkehrswert CHF 750'000, Hypothek CHF 480'000 — die Deckung ist also noch deutlich vorhanden. Dein Vorgesetzter fragt dich, was du empfehlen würdest.",
    question: "Wie gehst du vor?",
    role: "Bankberater/in",
    expectedApproach:
      "Bei Hypothekarschuldnern gilt der Grundsatz: Zwangsverwertung ist das allerletzte Mittel und sollte nur eingeleitet werden, wenn alle anderen Optionen ausgeschöpft sind. In diesem Fall ist die Belehnungsquote mit CHF 480'000 auf CHF 750'000 (ca. 64%) noch sehr komfortabel — die Bank ist gut gedeckt. Empfehlung: Zuerst ein persönliches Gespräch mit Herrn Dietrich suchen. Warum kann er nicht zahlen? Temporäre Liquiditätsprobleme (Jobwechsel, Krankheit, Scheidung) können oft mit einer Stundungsvereinbarung oder einem kurzfristigen Zahlungsaufschub überbrückt werden. Als weitere Option könnte geprüft werden, ob Herrn Dietrich ein Verkauf des Objekts in Eigenregie (bessere Erlöse als Zwangsversteigerung) möglich wäre, falls die Situation dauerhaft ist. Die Betreibung auf Pfandverwertung (SchKG Art. 151 ff.) wäre erst dann einzuleiten, wenn: alle Mahnstufen durchlaufen sind, das Gespräch keine Lösung bringt, und keine realistische Zahlungsbereitschaft/-fähigkeit besteht. Wichtig für das Protokoll: alle Gesprächsversuche und Entscheide schriftlich dokumentieren.",
  },
  {
    type: "offene-frage",
    id: "mw-of-4",
    level: 3,
    briefing:
      "Die Bank hat gegen Schuldner Herr Tanaka ein Betreibungsbegehren gestellt. Das Betreibungsamt hat den Zahlungsbefehl zugestellt. Herr Tanaka erhebt Rechtsvorschlag — er bestreitet die Forderung. Dein Vorgesetzter fragt dich: was bedeutet das konkret, und wie geht die Bank nun vor?",
    question: "Was würdest du erklären und empfehlen?",
    role: "Bankberater/in",
    expectedApproach:
      "Der Rechtsvorschlag gemäss SchKG Art. 74 bedeutet, dass Herr Tanaka die Forderung bestreitet und die Betreibung damit vorläufig blockiert ist. Die Betreibung ist nicht erledigt — sie ist nur unterbrochen. Die Bank kann die Betreibung nur fortsetzen, wenn sie eine Rechtsöffnung beim zuständigen Gericht erwirkt (SchKG Art. 79 ff.). Es gibt zwei Arten: Provisorische Rechtsöffnung: möglich, wenn ein schriftlicher Titel vorliegt (z. B. unterschriebener Kreditvertrag, Schuldanerkennung). Das Gericht prüft nur, ob ein gültiger Titel besteht — keine inhaltliche Prüfung der Forderung. Definitive Rechtsöffnung: möglich, wenn ein rechtskräftiges Gerichtsurteil oder ein vollstreckbarer Schuldbrief vorliegt. In den meisten Kreditfällen ist die provisorische Rechtsöffnung der erste Weg, da ein unterschriebener Kreditvertrag vorliegt. Wichtig: Für die provisorische Rechtsöffnung muss die Bank innerhalb der gesetzlichen Fristen handeln (1 Jahr ab Rechtsvorschlag). Der Lehrling sollte klarmachen, dass dies ein Fall für den Rechtsdienst oder einen Anwalt der Bank ist — die Entscheidung über das weitere Vorgehen liegt nicht beim Frontberater allein. Alle Unterlagen (Kreditvertrag, Korrespondenz, Mahnhistorie) müssen vollständig zusammengestellt werden.",
  },
];

// ─── MODULE 3: CREDIT-OPERATIONS ─────────────────────────────────────────────

export const OF_CASES_CREDIT_OPERATIONS: OffeneFrageCase[] = [
  {
    type: "offene-frage",
    id: "co-of-1",
    level: 2,
    briefing:
      "Kundin Frau Widmer hat eine Hypothek von CHF 600'000 auf ihre Eigentumswohnung. Die Hypothek läuft in 3 Monaten aus und sie möchte verlängern. Du lässt eine neue Schätzung durchführen — der aktuelle Verkehrswert beträgt nur noch CHF 700'000 statt wie bisher CHF 850'000. Die Belehnungsquote steigt damit von 70,6% auf 85,7%. Frau Widmer rechnet damit, dass die Verlängerung ein Selbstläufer ist.",
    question: "Wie gehst du das Gespräch an?",
    role: "Credit Officer",
    expectedApproach:
      "Die Situation ist heikel: Die Kundin erwartet eine unkomplizierte Verlängerung, aber die neue Belehnungsquote von 85,7% überschreitet den bankenüblichen Maximalwert von 80% (bei Wohneigentum) — und die 2. Hypothek (alles über 65%) ist mit dem stark gesunkenen Wert massiv angewachsen. Konkrete Schritte: Das Gespräch offen und transparent führen — die neue Schätzung und deren Konsequenzen klar erklären. Die Bank kann die Verlängerung nicht zu denselben Konditionen anbieten, wenn die Belehnungsquote die internen Limiten überschreitet. Optionen, die besprochen werden müssen: (1) Frau Widmer leistet eine Amortisationszahlung, um die Hypothek auf den maximal belehnbaren Betrag zu reduzieren (CHF 700'000 × 80% = CHF 560'000 → Amortisation von CHF 40'000 nötig). (2) Zusätzliche Sicherheiten werden gestellt (z. B. Verpfändung eines Wertpapierdepots). (3) Im Extremfall: Die Bank kann die Verlängerung verweigern und eine Teilrückzahlung verlangen. Wichtig: Die Kundin hat 3 Monate Zeit — das Gespräch sollte sofort geführt werden, damit sie handlungsfähig ist. Alle besprochenen Optionen schriftlich dokumentieren und dem Kreditdossier beifügen. Der Entscheid muss durch die zuständige Kreditstelle genehmigt werden.",
  },
  {
    type: "offene-frage",
    id: "co-of-2",
    level: 1,
    briefing:
      "Du prüfst ein Hypothekardossier vor der Auszahlung. Alles ist vollständig: Grundpfand eingetragen, Versicherungsnachweis vorhanden, Eigenmittel nachgewiesen. Aber dann siehst du: der Kreditvertrag wurde vom Ehepaar Karaca gemeinsam abgeschlossen — Herr Karaca hat unterschrieben, Frau Karacas Unterschrift fehlt. Die Auszahlung ist für heute eingeplant.",
    question: "Was würdest du tun?",
    role: "Credit Officer",
    expectedApproach:
      "Der Kreditvertrag ist erst dann rechtsverbindlich, wenn alle Vertragsparteien unterzeichnet haben. Eine fehlende Unterschrift ist ein absolutes Auszahlungshindernis — daran gibt es nichts zu rütteln. Die Auszahlung darf nicht erfolgen, auch wenn der Termin heute eingeplant war und möglicherweise ein Notariatstermin oder Übergabetermin damit verknüpft ist. Konkrete Schritte: Den Vorgesetzten sofort informieren. Den Kunden kontaktieren und erklären, dass die Unterschrift von Frau Karaca zwingend nachgeholt werden muss — persönlich in der Filiale oder über einen beglaubigten Postweg (falls intern zugelassen). Sobald die vollständige Unterschrift vorliegt, kann die Auszahlung freigegeben werden. Wichtig: Der Druck des Kunden («wir haben heute Notariatstermin!») darf keinen Einfluss auf die Entscheidung haben. Die Bank haftet, wenn eine Auszahlung ohne vollständige Unterschriften erfolgt und die Sicherheiten später angefochten werden. Den Kunden empathisch informieren, aber klar und unmissverständlich: keine Ausnahme möglich.",
  },
  {
    type: "offene-frage",
    id: "co-of-3",
    level: 2,
    briefing:
      "Kunde Herr Nkemelu hat vor 6 Monaten einen Firmenkredit über CHF 150'000 erhalten. Jetzt meldet er sich und möchte das Limit auf CHF 220'000 erhöhen — er habe einen grossen Auftrag gewonnen und brauche mehr Liquidität. Das bisherige Kreditverhalten war einwandfrei: pünktliche Zahlungen, Konto immer im Rahmen.",
    question: "Wie gehst du vor?",
    role: "Credit Officer",
    expectedApproach:
      "Eine Kreditlimiterhöhung nach nur 6 Monaten ist nicht per se problematisch, aber sie erfordert eine vollständige Neuprüfung. Der gute bisherige Verlauf ist ein positives Signal, reicht aber allein nicht für eine Bewilligung. Konkrete Schritte: Ein aktuelles Kreditdossier aufbauen — neue Jahresabschlüsse oder Zwischenabschlüsse des Unternehmens anfordern, aktuelle Betreibungsauszüge einholen, ZEK-Auskunft prüfen (falls relevant). Den Verwendungszweck der Erhöhung dokumentieren: Welcher Auftrag? Welche Laufzeit? Wie wird der Kredit zurückbezahlt? Die Tragbarkeit der erhöhten Kreditverpflichtung prüfen: Reicht der betriebliche Cashflow? Allenfalls aktualisierte Sicherheiten prüfen oder zusätzliche Sicherheiten verlangen. Die Erhöhung muss durch die zuständige Kreditstelle formal bewilligt werden — der Lehrling kann dem Kunden keine Zusage machen. Dem Kunden realistische Zeiterwartungen kommunizieren (Kreditprüfung dauert X Tage). Wichtig: Nicht wegen guter Beziehung auf Schritte verzichten — die interne Policy gilt unabhängig vom Kundenprofil.",
  },
  {
    type: "offene-frage",
    id: "co-of-4",
    level: 3,
    briefing:
      "Du bearbeitest ein Hypothekardossier für Frau Egger. Während der Kreditprüfung führst du einen ZEK-Check durch und stellst fest: Frau Egger hat ein laufendes Konsumkreditlimit von CHF 35'000, das sie in der Kreditanfrage nicht deklariert hat. Bei der Tragbarkeitsberechnung wäre die Hypothek noch knapp tragbar gewesen — mit dem unbekannten Kredit überschreitet sie das interne Tragbarkeitslimit der Bank.",
    question: "Wie gehst du vor?",
    role: "Credit Officer",
    expectedApproach:
      "Nicht deklarierte Schulden sind ein ernstes Problem in der Kreditprüfung — ob absichtlich oder vergessen, macht für den Prozess keinen Unterschied. Der ZEK-Fund ist zwingend zu dokumentieren und intern zu eskalieren. Konkrete Schritte: Die Kreditprüfung mit dem korrekten Schuldenbild neu berechnen. Mit dem nicht deklarierten Kredit überschreitet die Tragbarkeit das interne Limit — das Dossier kann in dieser Form nicht bewilligt werden. Das Gespräch mit Frau Egger suchen: Sachlich und ohne Vorwurf erklären, dass im ZEK ein Kredit aufgetaucht ist, der nicht deklariert wurde. Ihre Reaktion und Erklärung dokumentieren. Optionen prüfen: (1) Frau Egger löscht das Konsumkreditlimit vor der Hypothekarauszahlung — dann kann die Tragbarkeit neu berechnet werden. (2) Die Hypothek wird auf einen tieferen Betrag reduziert. (3) Das Kreditgesuch wird abgelehnt. Wichtig: Nicht deklarierten Schulden dürfen nicht einfach «übersehen» werden — das wäre eine Verletzung interner Richtlinien und hätte disziplinarische Konsequenzen. Den Vorgesetzten unverzüglich informieren. Alle Schritte und Entscheide im Dossier protokollieren.",
  },
];

// ─── MODULE 4: BLANKOKREDIT ───────────────────────────────────────────────────

export const OF_CASES_BLANKOKREDIT: OffeneFrageCase[] = [
  {
    type: "offene-frage",
    id: "bk-of-1",
    level: 1,
    briefing:
      "Kundin Selina Hofer, ledig, möchte einen Konsumkredit über CHF 12'000. Du berechnest die Kreditfähigkeit nach KKG: ihr Freibetrag beträgt CHF 340 pro Monat. Die monatliche Amortisation bei CHF 12'000 über 36 Monate wäre CHF 333. Kreditfähigkeit ist damit knapp gegeben — aber wirklich knapp (CHF 7 Spielraum).",
    question: "Was sagst du der Kundin, und was empfiehlst du?",
    role: "Bankberater/in",
    expectedApproach:
      "Rein rechnerisch ist die Kreditfähigkeit gegeben: CHF 333 Amortisation ist kleiner als CHF 340 Freibetrag. Gemäss KKG und der Kreditfähigkeitsdefinition kann der Kredit in dieser Höhe vergeben werden — die Bank hat keinen Ermessensspielraum, einen kreditfähigen Kunden abzulehnen. Aber: Die Beratungspflicht verlangt, dass Selina transparent über den extrem knappen Puffer informiert wird. Konkrete Gesprächspunkte: Erklären, dass die Kreditfähigkeit zwar rechnerisch gegeben ist, aber der Puffer von CHF 7 pro Monat keinerlei Spielraum lässt — eine unvorhergesehene Ausgabe (Zahnarzt, Autoschaden) kann zur Zahlungsunfähigkeit führen. Fragen, ob die Kundin die Konsequenzen eines Zahlungsverzugs kennt (Mahngebühren, ZEK-Eintrag, Betreibung). Allenfalls einen kleineren Kreditbetrag vorschlagen (z. B. CHF 10'000 → CHF 278/Monat), der mehr Luft lässt. Die Entscheidung liegt bei der Kundin — aber die Bank muss im Rahmen der Beratungspflicht auf das Risiko hinweisen. Wenn die Kundin CHF 12'000 wünscht und die Kreditfähigkeit formal gegeben ist, ist die Bewilligung korrekt. Alles dokumentieren.",
  },
  {
    type: "offene-frage",
    id: "bk-of-2",
    level: 2,
    briefing:
      "Kunde Murat Yilmaz hat drei laufende Konsumkredite bei verschiedenen Instituten: CHF 8'000, CHF 12'000 und CHF 5'000 (Total CHF 25'000). Er möchte diese zu einem einzigen Kredit bei eurer Bank über CHF 25'000 konsolidieren. Sein Freibetrag beträgt CHF 720 pro Monat.",
    question: "Wie gehst du vor, und was prüfst du?",
    role: "Bankberater/in",
    expectedApproach:
      "Eine Kreditkonsolidierung ist grundsätzlich möglich und kann sogar sinnvoll sein (einfachere Verwaltung, allenfalls bessere Konditionen). Der Prozess entspricht aber einer vollständigen Neuprüfung — keine vereinfachten Verfahren nur weil «die Schulden schon bestehen». Konkrete Prüfschritte: ZEK-Auskunft einholen: Sind alle drei Kredite dort korrekt eingetragen? Stimmen die Beträge? Gibt es weitere, nicht deklarierte Verpflichtungen? Kreditfähigkeitsberechnung: Total CHF 25'000 ÷ 36 Monate = CHF 694 / Monat. CHF 694 ≤ CHF 720 Freibetrag — Kreditfähigkeit knapp gegeben. Wichtige Bedingung: Die drei bestehenden Kredite müssen mit der Auszahlung des neuen Kredits vollständig abgelöst werden. Das muss vertraglich gesichert sein (z. B. direkte Überweisung an die anderen Institute oder Ablösungsbestätigung). Falls Murat die alten Kredite nicht ablöst, würde das Total auf CHF 50'000 steigen — und die Kreditfähigkeit wäre bei weitem nicht gegeben. Diese Bedingung muss klar kommuniziert und im Vertrag festgehalten werden. Den ZEK-Eintrag nach Ablösung der alten Kredite aktualisieren. Kreditabschluss erst nach Bestätigung der vollständigen Ablösung.",
  },
  {
    type: "offene-frage",
    id: "bk-of-3",
    level: 2,
    briefing:
      "Ein 19-jähriger Kunde, Matteo Rossi, kommt rein und möchte seinen ersten Kredit: CHF 8'000 für ein Musikprojekt. Er arbeitet seit 4 Monaten Teilzeit als Barista — CHF 1'800 Nettolohn pro Monat. Keine bestehenden Kredite, keine ZEK-Einträge, keine Betreibungen. Du berechnest den Freibetrag: CHF 1'800 − CHF 1'200 (Grundbetrag) − CHF 600 (Miete, er wohnt im WG) = CHF 0.",
    question: "Was sagst du Matteo?",
    role: "Bankberater/in",
    expectedApproach:
      "Der Freibetrag ist CHF 0 — die Kreditfähigkeit ist nicht gegeben. Gemäss KKG Art. 22 ist ein Kredit ohne positive Kreditfähigkeit zwingend abzulehnen; das ist keine Ermessensfrage, sondern eine gesetzliche Pflicht. Der Lehrling muss Matteo diese Realität klar, aber empathisch kommunizieren. Konkrete Gesprächspunkte: Den Entscheid sachlich begründen: Der Freibetrag nach Abzug aller Fixkosten ist CHF 0 — es bleibt nichts übrig, um einen Kredit zurückzuzahlen. Das hat nichts mit Matteos Zuverlässigkeit oder Charakter zu tun — es ist eine mathematische Regel, die gesetzlich vorgeschrieben ist. Nicht mit falschen Hoffnungen vertrösten («vielleicht in ein paar Monaten»), sondern konkret erklären, was sich ändern müsste: höheres Einkommen, tiefere Fixkosten, oder beide. Keine Umwege anbieten (z. B. «jemand bürgert für dich») ohne vollständige interne Prüfung — Bürgschaften bei Konsumkrediten sind komplex. Matteo auf Alternativen hinweisen: Eigenkapital aufbauen, allenfalls ein Sparkonto eröffnen. Der Entscheid muss im System dokumentiert werden, inklusive der Berechnungsgrundlagen.",
  },
  {
    type: "offene-frage",
    id: "bk-of-4",
    level: 3,
    briefing:
      "Kundin Priya Sharma ist wütend. Ihr Kredit wurde abgelehnt — zu Recht, da ihr Freibetrag CHF 280 beträgt und der beantragte Kredit CHF 24'000 wäre (Amortisation: CHF 667/Monat). Sie ruft laut und sagt: «Das ist diskriminierend! Ich zahle immer pünktlich! Ich werde euren Direktor anrufen!» Andere Kunden in der Filiale drehen sich um.",
    question: "Wie gehst du mit dieser Situation um?",
    role: "Bankberater/in",
    expectedApproach:
      "Das ist eine herausfordernde Kombination aus emotionaler Eskalation und einem klaren, gesetzlich vorgeschriebenen Entscheid. Der Lehrling muss beides professionell managen — die Kundin beruhigen und gleichzeitig die Entscheidung nicht zurücknehmen. Deeskalation als Priorität: Ruhige, tiefe Stimme, keine Verteidigungshaltung, keinen Streit eingehen. Wenn möglich, die Kundin in ein Seitenzimmer bitten («Kommen Sie, wir können das in Ruhe besprechen»), um das Gespräch aus der Öffentlichkeit zu nehmen. Den Entscheid klar und ohne Entschuldigung bestätigen: Die Ablehnung basiert auf einer gesetzlichen Vorschrift (KKG), nicht auf einer persönlichen Entscheidung. Die Rechnung transparent erklären: CHF 667 Amortisation > CHF 280 Freibetrag. Auf den Diskriminierungsvorwurf sachlich eingehen: Das KKG gilt für alle Kundinnen und Kunden gleichermassen, unabhängig von Herkunft oder Zahlungsverhalten — es ist eine rein finanzielle Berechnung. Den Direktor-Anruf gelassen ankündigen lassen: «Das ist Ihr Recht — ich werde den Entscheid intern dokumentieren.» Keine Zusagen machen, die nicht haltbar sind. Interne Eskalation: Den Vorgesetzten informieren, dass die Kundin unzufrieden ist und allenfalls Beschwerde einreicht. Alle Interaktionen dokumentieren.",
  },
];

// ─── MODULE 5: ZAHLUNGSVERKEHR ────────────────────────────────────────────────

export const OF_CASES_ZAHLUNGSVERKEHR: OffeneFrageCase[] = [
  {
    type: "offene-frage",
    id: "zv-of-1",
    level: 1,
    briefing:
      "Kunde Herr Baumann ruft an und besteht darauf, dass seine IBAN korrekt ist — er habe sie direkt von seinem Kontoauszug abgetippt. Du gibst die IBAN ins System ein: Das System wirft sofort einen Fehler aus und lehnt sie ab. Du überprüfst: Die IBAN hat 22 Stellen statt der korrekten 21 für eine Schweizer IBAN.",
    question: "Wie gehst du vor?",
    role: "Backoffice-Mitarbeiter/in",
    expectedApproach:
      "Schweizer IBANs haben immer genau 21 Zeichen: CH (2) + 2 Prüfziffern + 17-stellige Kontonummer. Eine IBAN mit 22 Stellen ist mathematisch ungültig — das System wird sie immer ablehnen, unabhängig davon, was der Kunde glaubt. Der Lehrling muss das verständlich erklären, ohne den Kunden zu beschämen. Konkrete Vorgehensweise: Dem Kunden erklären, dass die Schweizer IBAN eine feste Länge von 21 Zeichen hat und das System deshalb einen Fehler meldet. Ihn bitten, die IBAN nochmals direkt vom Original (Kontoauszug, E-Banking oder Schreiben der Empfängerbank) zu prüfen — nicht aus dem Gedächtnis. Häufige Fehlerquellen erklären: ein zusätzliches Zeichen mitgetippt (z. B. ein Leerzeichen wurde mitgezählt), eine Ziffer verdoppelt, oder es handelt sich um eine ausländische IBAN (die andere Längen haben). Falls es eine ausländische IBAN ist (z. B. deutsche IBAN = 22 Stellen), ist das System und das Verfahren anders — für Auslandzahlungen braucht es zusätzlich den BIC. Den Kunden freundlich aber klar informieren: Die Zahlung kann erst ausgeführt werden, wenn eine valide IBAN vorliegt. Die Interaktion kurz im System notieren.",
  },
  {
    type: "offene-frage",
    id: "zv-of-2",
    level: 2,
    briefing:
      "Kundin Lena Gubser möchte einen Dauerauftrag einrichten: CHF 900 monatlich an ihren Vermieter. Sie möchte, dass der Dauerauftrag ab dem 1. März gilt — heute ist der 15. Juni. Sie sagt: «Die letzten drei Monate hätte ich eigentlich auch schon zahlen sollen, aber ich habe es vergessen — kann man den Dauerauftrag rückwirkend ab März einrichten?»",
    question: "Was erklärst du ihr?",
    role: "Backoffice-Mitarbeiter/in",
    expectedApproach:
      "Ein Dauerauftrag kann grundsätzlich nicht rückwirkend eingerichtet werden — das Valutadatum (Wertstellungsdatum) einer Zahlung kann technisch nicht in der Vergangenheit liegen. Das System würde einen Fehler ausgeben. Der Lehrling muss das klar erklären: Was ein Dauerauftrag ist (ein regelmässiger, zukünftiger Zahlungsauftrag, der automatisch wiederkehrt) und was er nicht ist (kein Instrument zur nachträglichen Begleichung vergangener Verpflichtungen). Konkrete Empfehlung: Den Dauerauftrag ab dem nächsten regulären Ausführungsdatum einrichten (z. B. 1. Juli). Für die ausstehenden drei Monate (März, April, Mai) müssen separate Einzelzahlungen erfasst werden — mit dem heutigen Datum als Valuta. Erklären, dass diese Einzelzahlungen manuell ausgeführt werden müssen und dass sie unabhängig vom neuen Dauerauftrag sind. Falls die Kundin die Miete wirklich noch schuldet, muss sie das mit ihrem Vermieter klären — die Bank kann nur die Zahlung ausführen, nicht die zivilrechtliche Situation beurteilen. Den Dauerauftrag korrekt erfassen: Betrag, Empfänger-IBAN, Ausführungsrhythmus (monatlich), Startdatum.",
  },
  {
    type: "offene-frage",
    id: "zv-of-3",
    level: 3,
    briefing:
      "Ein Kunde tritt am Schalter auf und möchte CHF 24'000 in bar abheben. Auf die Nachfrage, wofür das Geld sei, antwortet er kurz: «Privates.» Keine weiteren Erklärungen. Das Konto zeigt normalerweise Bewegungen von CHF 3'000–5'000 pro Monat — diese Auszahlung wäre fast das Fünffache des üblichen Monatsumsatzes.",
    question: "Wie gehst du vor?",
    role: "Compliance-Spezialist/in",
    expectedApproach:
      "Eine Barabhebung von CHF 24'000 ist an sich legal — Kunden haben das Recht, ihr eigenes Geld abzuheben. Aber das Transaktionsprofil (Fünffaches des Monatsüblichen, keine Begründung) löst Abklärungspflichten aus, die der Lehrling nicht ignorieren kann. Konkrete Vorgehensweise: Zunächst die Identität des Kunden verifizieren (Ausweis), auch wenn er ein bekanntes Gesicht ist — bei Barabhebungen dieser Grössenordnung ist das Standard. Den Kunden nochmals freundlich nach dem Verwendungszweck fragen: «Verstehe ich richtig, dass Sie CHF 24'000 in bar benötigen? Darf ich fragen, wofür?» — nicht als Verhör, sondern als Kundengespräch. Falls der Kunde keine Auskunft gibt: intern eskalieren. Der Vorgesetzte oder Compliance entscheidet, ob besondere Abklärungspflichten nach GwG Art. 6 ausgelöst sind. Die Auszahlung kann nicht einfach verweigert werden, nur weil keine Erklärung gegeben wird — dafür bräuchte es einen konkreten Verdachtsgrund. Aber das Transaktionsmuster muss intern dokumentiert werden. Falls mehrere solcher Auszahlungen in kurzer Zeit erfolgen, ist das ein klares Signal für GwG-Abklärungen und allenfalls eine MROS-Meldung. Alle Interaktionen und Entscheide protokollieren.",
  },
  {
    type: "offene-frage",
    id: "zv-of-4",
    level: 2,
    briefing:
      "Kundin Frau Schneider ruft aufgebracht an: Sie hat CHF 4'500 an ihre Schwester überweisen wollen, aber die IBAN falsch eingegeben — jetzt ist das Geld auf dem Konto einer ihr unbekannten Person gelandet. Die Zahlung wurde gestern ausgeführt. Sie fragt: «Kann die Bank das Geld sofort zurückbringen? Das ist mein Geld!»",
    question: "Was erklärst du ihr, und was tust du?",
    role: "Backoffice-Mitarbeiter/in",
    expectedApproach:
      "Das ist ein häufiger und emotional aufgeladener Fall — die Kundin hat einen Tippfehler gemacht und erwartet eine sofortige Korrektur, die technisch so nicht möglich ist. Eine bereits ausgeführte Zahlung ist grundsätzlich unwiderruflich. Die Bank kann nicht einseitig Geld von einem Fremden Konto zurückbuchen. Korrekte Kommunikation: Der Kundin erklären, dass die Bank eine Recall-Anfrage (Rückruf der Zahlung) an das Empfängerinstitut stellen kann. Dieses leitet die Anfrage an den Inhaber des begünstigten Kontos weiter. Wenn dieser zustimmt, wird der Betrag zurückgebucht — aber das ist nicht garantiert und kann mehrere Tage dauern. Wenn der Empfänger ablehnt, hat Frau Schneider zivilrechtliche Möglichkeiten (ungerechtfertigte Bereicherung, OR Art. 62) — allenfalls mit Hilfe eines Anwalts. Keine falschen Hoffnungen wecken: Die Bank kann nicht erzwingen, dass der Empfänger zurückzahlt. Die Verantwortung für die Richtigkeit der Zahlungsdetails liegt beim Auftraggeber — die Bank prüft die IBAN technisch (Prüfziffern), aber nicht, ob sie der richtigen Person gehört. Sofortmassnahmen: Recall-Anfrage intern erfassen und unverzüglich ans Empfängerinstitut senden. Frau Schneider schriftlich über die eingeleiteten Schritte informieren. Fristen kommunizieren: Bei Inlandzahlungen oft innert 1–3 Arbeitstagen eine Antwort.",
  },
];
