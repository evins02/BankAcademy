import { type LückentextCase } from "./lückentext";
import { type OffeneFrageCase } from "./offene-frage";
import { OF_CASES_KYC } from "./offene-fragen";

export type OptionKey = "A" | "B" | "C" | "D";
export type LevelNum = 1 | 2 | 3;

export interface KycOption {
  key: OptionKey;
  text: string;
}

export interface KycScenario {
  id: string;
  level: LevelNum;
  situation: string;
  question: string;
  options: KycOption[];
  correct: OptionKey;
  feedback: string;
  concepts?: string[];
}

export interface KycLevelConfig {
  level: LevelNum;
  label: string;
  badgeVariant: "green" | "orange" | "red";
  scenarios: (KycScenario | LückentextCase | OffeneFrageCase)[];
}

export const KYC_LEVELS: KycLevelConfig[] = [
  {
    level: 1,
    label: "Einsteiger",
    badgeVariant: "green",
    scenarios: [
      {
        id: "1.1",
        level: 1,
        situation:
          "Ein neuer Kunde kommt in die Filiale und möchte ein Konto eröffnen. Er hat keinen Ausweis dabei und sagt, er könne diesen nächste Woche vorbeibringen.",
        question: "Was machst du?",
        options: [
          { key: "A", text: "Konto eröffnen und Ausweis später nachreichen lassen" },
          { key: "B", text: "Konto nicht eröffnen – Identifikation ist zwingend vor Kontoeröffnung" },
          { key: "C", text: "Konto eröffnen aber sperren bis Ausweis vorliegt" },
          { key: "D", text: "Termin für nächste Woche vereinbaren und Kontounterlagen provisorisch vorbereiten – solange das Konto nicht aktiv ist, gilt die Identifikationspflicht noch nicht." },
        ],
        correct: "B",
        feedback:
          "Gemäss VSB und GwG muss die Identifikation des Vertragspartners zwingend VOR der Kontoeröffnung erfolgen. Ein amtlicher Ausweis (Pass oder ID) ist Pflicht. Ohne Identifikation darf keine Geschäftsbeziehung aufgenommen werden.",
      },
      {
        id: "1.2",
        level: 1,
        situation:
          "Du arbeitest am Schalter. Ein Mann kommt und möchte den Kontostand seiner Ehefrau wissen. Er hat deren Bankkarte dabei, kennt aber die PIN nicht und hat keine Vollmacht.",
        question: "Was machst du?",
        options: [
          { key: "A", text: "Keine Auskunft geben – kein Zugriff ohne Vollmacht" },
          { key: "B", text: "Kontostand mitteilen – er ist ja der Ehemann" },
          { key: "C", text: "Nur den ungefähren Betrag nennen" },
          { key: "D", text: "Die Ehefrau anrufen und fragen" },
        ],
        correct: "A",
        feedback:
          "Das Bankkundengeheimnis schützt jeden Kunden individuell. Auch Ehepartner haben ohne Vollmacht keinen Anspruch auf Kontoinformationen. Du darfst keinerlei Auskunft geben – nicht einmal bestätigen, dass ein Konto existiert.",
      },
      {
        id: "1.3",
        level: 1,
        situation:
          "Ein Bekannter fragt dich nach dem Feierabend: \"Hey, ich habe gesehen dass mein Nachbar heute bei euch in der Bank war – hat er vielleicht ein Konto bei euch?\"",
        question: "Was antwortest du?",
        options: [
          { key: "A", text: "\"Ja, er ist Kunde bei uns\"" },
          { key: "B", text: "\"Frag ihn doch selbst\"" },
          { key: "C", text: "\"Ich habe ihn heute nicht gesehen\"" },
          { key: "D", text: "\"Das kann ich dir leider nicht sagen\"" },
        ],
        correct: "D",
        feedback:
          "Das Bankkundengeheimnis gilt auch ausserhalb der Arbeitszeit und im Privatleben. Du darfst weder bestätigen noch verneinen, ob jemand Kunde bei eurer Bank ist. Auch gegenüber Freunden und Familie gilt absolute Verschwiegenheit.",
      },
      {
        id: "1.4",
        level: 1,
        situation:
          "Eine junge Kundin, 22 Jahre, möchte ihr erstes Konto eröffnen. Sie fragt dich: «Was brauche ich überhaupt alles, um ein Konto zu eröffnen?»",
        question: "Was erklärst du ihr?",
        options: [
          { key: "A", text: "«Nur Ihre Adresse und Telefonnummer – den Rest erledigen wir intern.»" },
          { key: "B", text: "«Amtlichen Ausweis (Pass oder ID) und Wohnsitznachweis. Bei US-Verbindungen noch eine FATCA-Erklärung. Alles andere füllen wir gemeinsam aus.»" },
          { key: "C", text: "«Pass, Lohnausweis der letzten 3 Monate, Betreibungsregisterauszug und Aufenthaltsbewilligung – wir müssen die Zahlungsfähigkeit prüfen bevor wir ein Konto eröffnen.»" },
          { key: "D", text: "«Nur einen amtlichen Ausweis – alles andere ist optional. Der Wohnsitz wird von uns direkt beim Einwohnerregister abgefragt.»" },
        ],
        correct: "B",
        feedback:
          "Pflichtunterlagen bei Kontoeröffnung: 1) Amtlicher Lichtbildausweis (Pass oder Identitätskarte) – Pflicht gemäss VSB zur Identifikation. 2) Wohnsitznachweis (Wohnsitz in der Schweiz bestätigen). 3) FATCA-Eigenerklärung falls US-Verbindungen möglich. Kein Lohnausweis oder Betreibungsauszug nötig – das wäre für Kreditanträge, nicht Kontoeröffnung.",
      },
      {
        id: "1.5",
        level: 1,
        situation:
          "Ein Kunde fragt: «Was genau bedeutet eigentlich KYC? Ich höre das überall.»",
        question: "Was erklärst du?",
        options: [
          { key: "A", text: "«KYC steht für 'Keep Your Cash' – eine interne Regel der Bank, dass Bargeldtransaktionen begrenzt werden.»" },
          { key: "B", text: "«KYC – 'Know Your Customer' – bedeutet, dass die Bank ihre Kunden kennen muss: Wer sind sie, woher kommt ihr Geld, und ist das Geschäftsmodell plausibel? Das verhindert Geldwäscherei und Terrorismusfinanzierung.»" },
          { key: "C", text: "«KYC ist eine EU-Vorschrift für Grossbanken – kleinere Banken und Privatkunden sind davon nicht betroffen.»" },
          { key: "D", text: "«KYC ist nur beim ersten Kontakt relevant – danach wird der Kundenstatus nie mehr überprüft, solange keine strafrechtlichen Vorwürfe bestehen.»" },
        ],
        correct: "B",
        feedback:
          "KYC (Know Your Customer) ist die gesetzliche Pflicht der Bank, ihre Kunden zu kennen: Identität, wirtschaftliche Berechtigung, Herkunft der Mittel und Zweck der Geschäftsbeziehung. Rechtsgrundlagen: GwG (Geldwäschereigesetz) und VSB (Vereinbarung über die Standesregeln). KYC ist kein einmaliges Ereignis – das Kundenprofil muss laufend aktuell gehalten werden.",
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
          "Eine neue Kundin möchte ein Konto eröffnen. Sie sagt, das Geld auf dem Konto gehöre eigentlich ihrem Bruder im Ausland, sie verwalte es nur für ihn.",
        question: "Was ist in dieser Situation zwingend?",
        options: [
          { key: "A", text: "Formular A ausfüllen – wirtschaftlich Berechtigter ist der Bruder" },
          { key: "B", text: "Nur die Kundin identifizieren – sie ist die Vertragspartnerin und trägt die rechtliche Verantwortung für das Konto. Die Herkunft der Mittel und allfällige wirtschaftliche Berechtigungen müssen nicht separat dokumentiert werden." },
          { key: "C", text: "Konto grundsätzlich ablehnen – Konten für Dritte sind nur mit schriftlicher Treuhandvereinbarung und Compliance-Genehmigung zulässig. Ohne genehmigtes Mandat darf die Bank keine Vermögenswerte für Dritte entgegennehmen." },
          { key: "D", text: "Formular K ausfüllen – das ist das Standardformular für Treuhandverhältnisse. Es ersetzt bei klarer Drittberechtigung das Formular A und wird direkt an die FINMA weitergeleitet." },
        ],
        correct: "A",
        feedback:
          "Wenn der wirtschaftlich Berechtigte nicht identisch mit dem Vertragspartner ist, muss zwingend Formular A ausgefüllt werden. Darin wird festgehalten, wer der tatsächliche wirtschaftliche Eigentümer der Vermögenswerte ist. Dies ist eine Kernpflicht gemäss VSB und GwG.",
      },
      {
        id: "2.2",
        level: 2,
        situation:
          "Beim jährlichen Kundengespräch erwähnt ein langjähriger Privatkunde beiläufig: «Meine Kinder wissen das kaum – ich bin eigentlich in Boston geboren.» Die Eigenerklärung FATCA in seinem Dossier zeigt durchgehend «Keine US-Verbindungen».",
        question: "Was musst du tun?",
        options: [
          { key: "A", text: "Nichts – er hat keine US-Staatsbürgerschaft erwähnt" },
          {
            key: "B",
            text: "FATCA-Status sofort aktualisieren: US-Geburtsort begründet FATCA-Pflicht. Neue Eigenerklärung aufnehmen, Compliance informieren, Nachweis über US-Steuernummer oder Staatsbürgerschaftsverzicht verlangen.",
          },
          { key: "C", text: "Intern notieren – beim nächsten Jahresgespräch handeln" },
          { key: "D", text: "Konto bis zur Klärung sperren" },
        ],
        correct: "B",
        feedback:
          "Ein US-Geburtsort begründet grundsätzlich eine US-Staatsbürgerschaft – und damit FATCA-Pflicht. Die Eigenerklärung muss sofort aktualisiert werden. Der Kunde muss entweder eine US-Steuernummer (TIN) liefern oder den Nachweis über den Verzicht auf die US-Staatsbürgerschaft vorlegen (Certificate of Loss of Nationality, CLN). FATCA ist keine einmalige Eröffnungsroutine – das Dossier muss bei jedem neuen relevanten Hinweis aktualisiert werden.",
      },
      {
        type: "lückentext",
        id: "2.3",
        level: 2,
        briefing:
          "Ein Neukunde möchte CHF 30'000 in bar einzahlen. Er erklärt, das Geld stamme aus dem Verkauf seines Autos.",
        question:
          "Gemäss VSB muss die Herkunft der Mittel bei Bareinzahlungen über CHF ___ dokumentiert werden.",
        answer: "25000",
        unit: "CHF",
        tolerance: 1,
        feedback:
          "Gemäss VSB müssen bei Handelsgeschäften und Einzahlungen über CHF 25'000 die Identität geprüft und die Herkunft der Mittel dokumentiert werden. Der Kunde muss die Herkunft glaubhaft belegen können, z.B. mit einem Kaufvertrag für das Auto.",
      },
      {
        id: "2.4",
        level: 2,
        situation:
          "Du hast zwei Kunden: Kunde A ist ein Schweizer Arzt mit Inlandeinkommen. Kunde B ist ein ausländischer Unternehmer, der CHF 2 Mio. einlegen möchte – Quelle unklar, Sitz der Firma in einer Offshore-Jurisdiktion.",
        question: "Welche Sorgfaltsstufe gilt für wen?",
        options: [
          { key: "A", text: "Beide erhalten Standard-CDD (Customer Due Diligence) – der Betrag allein rechtfertigt noch keine erhöhte Prüfung solange keine Strafregistereinträge vorliegen." },
          { key: "B", text: "Beide erhalten EDD (Enhanced Due Diligence) – jeder Neukunde mit ausländischer Verbindung gilt als Hochrisiko." },
          { key: "C", text: "Kunde A: Standard-CDD ausreichend. Kunde B: EDD zwingend – unklare Mittelherkunft, Offshore-Jurisdiktion und Volumen sind Hochrisikofaktoren gemäss GwG Art. 6." },
          { key: "D", text: "Kunde A: kein KYC nötig (Inlandkunde). Kunde B: Standard-CDD mit zusätzlicher Unterschrift." },
        ],
        correct: "C",
        feedback:
          "CDD (Standard-Sorgfaltspflicht) gilt für normale Geschäftsbeziehungen mit niedrigem Risiko. EDD (Enhanced Due Diligence / erhöhte Sorgfaltspflicht) greift bei Hochrisikofaktoren: unklare Mittelherkunft, Offshore-Jurisdiktion, hohe Beträge, PEP-Status oder ungewöhnliche Transaktionen. Hier: Kunde B erfüllt mehrere Hochrisikomerkmale → zwingend EDD plus Genehmigung der Geschäftsleitung (GwG Art. 6).",
      },
      {
        id: "2.5",
        level: 2,
        situation:
          "Im Bankausbildungskurs wirst du gefragt: «Erkläre das Dreiphasenmodell der Geldwäscherei.»",
        question: "Welche Antwort ist richtig?",
        options: [
          { key: "A", text: "Verdienen → Verstecken → Ausgeben: Deliktische Gewinne werden zuerst eingenommen, dann auf anonymen Konten versteckt und schliesslich für legale Einkäufe verwendet." },
          { key: "B", text: "Placement → Layering → Integration: Inkriminierte Gelder werden eingeschleust, durch viele Transaktionen verschleiert und schliesslich als legale Mittel in den Wirtschaftskreislauf zurückgeführt." },
          { key: "C", text: "Einlage → Transfer → Auszahlung: Bargeld wird eingezahlt, ins Ausland transferiert und sauber wieder ausgezahlt – jede Phase entspricht einem separaten Bankinstitut." },
          { key: "D", text: "Konto → Transaktion → Abschluss: Schmutziges Geld durchläuft drei Bankkonten in verschiedenen Ländern und gilt nach dem dritten Transfer als gewaschen." },
        ],
        correct: "B",
        feedback:
          "Das Dreiphasenmodell: 1) Placement (Einspeisung): Bargeld aus Verbrechen wird ins Finanzsystem eingebracht (z.B. Bareinzahlungen, Scheinfirmen). 2) Layering (Verschleierung): Durch viele Transaktionen, Überweisungen ins Ausland, Immobilienkäufe wird die Spur verwischt. 3) Integration (Integration): Das Geld erscheint als sauberes Vermögen im legalen Wirtschaftskreislauf. Bankmitarbeitende müssen insbesondere Phase 1 erkennen und melden.",
      },
    ],
  },
  {
    level: 3,
    label: "Challenge-Niveau",
    badgeVariant: "red",
    scenarios: [
      {
        id: "3.1",
        level: 3,
        situation:
          "Du betreust seit 5 Jahren einen Kunden mit einem kleinen Handwerksbetrieb. Plötzlich gehen monatlich CHF 50'000 auf seinem Konto ein – bisher waren es maximal CHF 8'000. Auf Nachfrage sagt er, er habe einen neuen Grossauftrag erhalten.",
        question: "Welche Pflichten hast du gemäss GwG?",
        options: [
          { key: "A", text: "Erklärung des Kunden im CRM-System als 'Grossauftrag bestätigt' erfassen und das Transaktionsverhalten 3 Monate beobachten. Wenn keine weiteren Auffälligkeiten auftreten, sind keine GwG-Massnahmen notwendig." },
          {
            key: "B",
            text: "Compliance-Ticket eröffnen und abwarten – der interne Sachbearbeiter prüft den Sachverhalt und entscheidet gemäss GwG-Schwellenwert selbst, ob eine Meldung an die MROS nötig ist. Als Betreuer sind keine weiteren Schritte erforderlich.",
          },
          { key: "C", text: "Konto präventiv sperren und den Kunden schriftlich über die laufende Überprüfung informieren. Erst nach der Rückmeldung des Kunden mit Belegen entscheidet die Compliance über Weiterführung oder MROS-Meldung." },
          { key: "D", text: "Erneute Identifikation, Abklärung der Herkunft, Dokumentation – bei Verdacht Meldung an MROS" },
        ],
        correct: "D",
        feedback:
          "Bei ungewöhnlichen Veränderungen im Transaktionsverhalten greift GwG Art. 5 und 6: erneute Identifikation und Feststellung des wirtschaftlich Berechtigten sowie besondere Abklärungspflicht. Erhärtet sich Verdacht: Meldepflicht an MROS, Sperrpflicht der Vermögenswerte und Informationsverbot gegenüber dem Kunden (Art. 10a GwG).",
      },
      {
        id: "3.2",
        level: 3,
        situation:
          "Eine politisch exponierte Person (PEP) aus dem Ausland möchte ein Konto eröffnen und CHF 500'000 einlegen. Die Herkunft der Mittel ist unklar.",
        question: "Was gilt bei PEPs und was musst du tun?",
        options: [
          { key: "A", text: "Normale KYC-Abklärung durchführen – PEP-Status allein ist kein Grund für erhöhte Sorgfalt, solange der Kunde keine nachweislichen Korruptionsvorwürfe hat. CHF 500'000 ist bei einer Führungsposition plausibel." },
          { key: "B", text: "Geschäftsbeziehung grundsätzlich ablehnen – gemäss GwG Art. 6 sind ausländische PEPs ohne EU-Staatsbürgerschaft für Schweizer Banken automatisch als nicht zulässige Hochrisikokunden eingestuft." },
          {
            key: "C",
            text: "Erhöhte Sorgfaltspflichten anwenden: Genehmigung der Geschäftsleitung, Herkunft der Mittel abklären, engmaschige Überwachung",
          },
          { key: "D", text: "Compliance per E-Mail informieren und das Konto provisorisch eröffnen – die Compliance entscheidet innert 5 Arbeitstagen ob besondere Auflagen gelten. Erst danach werden die Sorgfaltspflichten angepasst." },
        ],
        correct: "C",
        feedback:
          "PEPs unterliegen gemäss GwG Art. 6 erhöhten Sorgfaltspflichten. Die Geschäftsaufnahme braucht zwingend die Genehmigung der Geschäftsleitung. Die Herkunft der Mittel muss lückenlos dokumentiert werden. Die Geschäftsbeziehung wird engmaschig überwacht. Ein PEP ist nicht automatisch abzulehnen – aber der Aufwand ist deutlich höher.",
      },
      {
        id: "3.3",
        level: 3,
        situation:
          "Dein langjähriger Kollege bittet dich, ihm kurz Zugang zu einem Kundenkonto zu geben, weil er selbst gerade keinen Zugriff hat. Der Kunde sei einverstanden.",
        question: "Was machst du?",
        options: [
          { key: "A", text: "Zugang verweigern – jeder Mitarbeiter darf nur auf Konten zugreifen für die er berechtigt ist" },
          {
            key: "B",
            text: "Zugang geben – der Kollege untersteht demselben Berufsgeheimnis wie du. Ein kurzfristiger Zugangstausch unter Bankmitarbeitenden ist im Rahmen des internen Organisationsrechts zulässig, solange keine Kundendaten kopiert werden.",
          },
          { key: "C", text: "Zugang gewähren und im Ticketsystem als 'temporärer Zugangstausch aus betrieblichen Gründen' erfassen – die Dokumentation schützt beide Parteien und gilt datenschutzrechtlich als hinreichende Rechtfertigung bei kurzem Zugang." },
          { key: "D", text: "Zugang temporär gewähren und den Vorgesetzten kurz informieren – wenn der Kollege die Verantwortung übernimmt, ist das datenschutzrechtlich abgedeckt." },
        ],
        correct: "A",
        feedback:
          "Das Need-to-know-Prinzip gilt absolut. Jeder Mitarbeiter darf nur auf Kundendaten zugreifen, für die er eine klare Berechtigung hat. Unbefugter Zugriff verletzt das Bankkundengeheimnis und den Datenschutz – unabhängig davon ob der Kollege vertrauenswürdig ist oder der Kunde einverstanden war. Dies kann strafrechtliche Konsequenzen haben.",
      },
      {
        id: "3.4",
        level: 3,
        situation:
          "Du hast soeben eine Geldwäscherei-Verdachtsmeldung an die MROS abgeschickt. Dein Kunde ruft kurz danach an und fragt dich direkt: «Haben Sie irgendetwas gegen mich gemeldet?»",
        question: "Was machst du?",
        options: [
          { key: "A", text: "Dem Kunden ehrlich antworten – Transparenz ist ein Grundwert der Bank. Eine Meldung darf er als Betroffener kennen." },
          { key: "B", text: "Ausweichend antworten: «Es gibt nichts Besonderes»  – eine direkte Lüge ist verboten, aber du kannst die Wahrheit umgehen ohne rechtlich zu verstossen." },
          { key: "C", text: "Den Kunden nicht informieren und die Frage ausweichen – das Informationsverbot (Tipping-off-Verbot) nach GwG Art. 10a verbietet jede Offenlegung der Meldung oder laufenden Abklärung." },
          { key: "D", text: "Compliance sofort benachrichtigen und das Gespräch beenden – der Anruf könnte ein Versuch sein, die Untersuchung zu beeinflussen. Bis zur Rückmeldung der MROS alle Kundenkontakte verweigern." },
        ],
        correct: "C",
        feedback:
          "Art. 10a GwG: absolutes Informationsverbot ('Tipping-off-Verbot'). Nach einer MROS-Meldung darf dem Kunden weder die Meldung noch die laufende Untersuchung offenbart werden. Weder direkt noch indirekt, weder mündlich noch schriftlich. Zweck: verhindert Flucht des Verdächtigen oder Vernichtung von Beweisen. Bei Verstoss drohen strafrechtliche Konsequenzen für den Bankmitarbeitenden.",
      },
      {
        id: "3.5",
        level: 3,
        situation:
          "Eine Gesellschaft mit Sitz auf den Cayman Islands möchte ein Konto eröffnen. Der bevollmächtigte Vertreter (Anwalt aus Zürich) erklärt, die tatsächlichen Eigentümer seien zwei Privatpersonen, deren Namen er nicht ohne Weiteres nennen kann.",
        question: "Was musst du tun?",
        options: [
          { key: "A", text: "Konto eröffnen mit dem Anwalt als Vertragspartner – er trägt als bevollmächtigter Vertreter die volle rechtliche Verantwortung für die Gesellschaft. Die Hintermänner müssen nicht identifiziert werden." },
          { key: "B", text: "Formular K (Domizilgesellschaft) und Formular A (wirtschaftlich Berechtigte) sind zwingend auszufüllen. Die effektiven wirtschaftlich Berechtigten müssen namentlich identifiziert werden – ohne diese Angaben ist eine Kontoeröffnung nicht möglich." },
          { key: "C", text: "Konto provisorisch eröffnen und dem Anwalt 30 Tage Zeit geben, die Eigentümer zu benennen. Bis dahin sind nur Einzahlungen, keine Auszahlungen zugelassen." },
          { key: "D", text: "Compliance informieren und das Konto ohne Formular A eröffnen – der Anwalt untersteht dem Anwaltsgeheimnis, das ihn von der Offenlegung seiner Mandanten befreit." },
        ],
        correct: "B",
        feedback:
          "Domizilgesellschaft (Briefkastenfirma ohne operative Tätigkeit am Sitz): Formular K ist zwingend. Dazu kommt Formular A, um die wirtschaftlich Berechtigten namentlich zu erfassen. Ohne vollständige Identifikation der Hintermänner darf das Konto nicht eröffnet werden – unabhängig davon, ob der Vertreter ein Anwalt ist. Das Anwaltsgeheimnis schützt Mandanteninformationen im Rechtsverhältnis, befreit aber nicht von GwG-Pflichten der Bank.",
      },
      {
        id: "3.6",
        level: 3,
        situation:
          "Dein Firmenkunde, ein Import-Exporteur von Textilien, überweist monatlich mehrmals EUR-Beträge an Gegenparteien in Ländern mit hohem GwG-Risiko. Die Rechnungsbeträge variieren stark (CHF 8'000–150'000), die gelieferten Mengen und Qualitäten entsprechen laut Branchendaten aber nicht den fakturierten Preisen.",
        question: "Was beschreibt dieses Muster und was musst du tun?",
        options: [
          { key: "A", text: "Nichts – Import-Export-Geschäfte sind per se legitim und Preisschwankungen sind marktüblich" },
          {
            key: "B",
            text: "Trade-Based Money Laundering (TBML): Über- oder Unterfakturierung verschleiert Geldflüsse. Erhöhte Abklärungspflicht, Plausibilisierung der Handelsrechnungen mit Markpreisen, Compliance informieren.",
          },
          { key: "C", text: "Nur prüfen wenn ein Betrag über CHF 100'000 liegt – darunter ist keine besondere Abklärung nötig" },
          { key: "D", text: "Kunden schriftlich auffordern, alle Rechnungen der letzten 2 Jahre nachzuliefern" },
        ],
        correct: "B",
        feedback:
          "Trade-Based Money Laundering (TBML) ist eine der komplexesten Geldwäschereimethoden: Kriminelle verschleiern Geldflüsse durch Über- oder Unterfakturierung bei Handelstransaktionen. Red Flags: Rechnungspreise weichen stark von Marktpreisen ab, Gegenparteien in Hochrisikoländern, häufige Volumen-/Preisschwankungen ohne erkennbaren Marktgrund. GwG Art. 6 verpflichtet zur besonderen Abklärung – unabhängig vom Schwellenwert. Compliance und ggf. MROS involvieren.",
        concepts: ["TBML", "GwG", "Handelsfinanzierung"],
      },
      {
        id: "3.7",
        level: 3,
        situation:
          "Ein Privatkunde möchte CHF 80'000 einzahlen. Er erklärt, er habe Bitcoin verkauft. Er legt einen Screenshot seiner Krypto-Börse als Herkunftsnachweis vor, kann aber nicht erklären, woher die ursprünglich erworbenen Bitcoin stammten.",
        question: "Was gilt bei Virtual Assets und wie gehst du vor?",
        options: [
          { key: "A", text: "Einzahlung ablehnen – Krypto ist in der Schweiz nicht als legitime Quelle anerkannt" },
          { key: "B", text: "Screenshot reicht – die Börse hat bereits KYC gemacht, also ist das Geld sauber" },
          {
            key: "C",
            text: "Erhöhte Sorgfalt: Herkunft der Bitcoin klären (Kauf? Mining? Schenkung?), Transaktionshistorie auf Blockchain prüfen lassen (Compliance/externe Tools), Quelle der ursprünglichen Fiat-Mittel nachweisen. Screenshot allein reicht nicht.",
          },
          { key: "D", text: "Maximal CHF 15'000 annehmen – für Beträge darüber gibt es keine rechtliche Grundlage bei Krypto" },
        ],
        correct: "C",
        feedback:
          "Virtual Assets (VA) unterliegen seit 2020 dem GwG. Ein Screenshot einer Krypto-Börse belegt nur den Verkauf, nicht die Herkunft der Bitcoin. Fragen: Wurden die BTC ursprünglich mit legalem Fiat-Geld gekauft? Wann und wo? Gab es Transaktionen über Darknet-Adressen oder Mixer? Compliance kann Blockchain-Analysetools (Chainalysis, Elliptic) nutzen. FINMA-RS 2016/7 und die FATF Virtual Asset Standards gelten. Bei unklarer Herkunft: EDD, keine Einzahlung ohne vollständige Dokumentation.",
        concepts: ["Virtual Assets", "Kryptowährungen", "FATF"],
      },
      {
        id: "3.8",
        level: 3,
        situation:
          "Langjähriger Privatkunde Hanspeter Müller (53, Angestellter) wird bei den nächsten Gemeinderatswahlen gewählt und tritt sein Amt in 3 Monaten an. Du erfährst dies durch einen Zeitungsartikel.",
        question: "Welche KYC-Pflichten entstehen jetzt?",
        options: [
          { key: "A", text: "Nichts – der Kunde ist Schweizer, kein ausländischer PEP. Inländische Gemeindepolitiker gelten nicht als PEP gemäss GwG." },
          { key: "B", text: "Konto sperren bis zur offiziellen Amtsübernahme, dann neu beurteilen" },
          {
            key: "C",
            text: "Statusaktualisierung: Schweizer Gemeinderat ist ein inländischer PEP (iPEP) gemäss revidiertem GwG. Risikoeinstufung überprüfen, bei erhöhtem Vermögen oder Transaktionen: EDD einleiten. Dossier aktualisieren.",
          },
          { key: "D", text: "Einen Brief an den Kunden schicken und ihn nach seinen zukünftigen Tätigkeiten fragen" },
        ],
        correct: "C",
        feedback:
          "Seit der GwG-Revision 2016 (in Kraft 2020) gilt der PEP-Begriff auch für inländische politisch exponierte Personen (iPEP). Gemeindepolitiker ab einer gewissen Bedeutung können darunter fallen. Pflicht: Dossier bei Statusänderung sofort aktualisieren, Risikoeinstufung prüfen, ggf. EDD. Die Bank muss PEP-Änderungen proaktiv überwachen (Medien-Monitoring, periodische Überprüfung). Der Kunde muss über die veränderten KYC-Anforderungen informiert werden.",
        concepts: ["PEP", "iPEP", "KYC-Aktualisierung"],
      },
      {
        id: "3.9",
        level: 3,
        situation:
          "Über eine Holding AG in der Schweiz (Alleinaktionär: eine BVI-Gesellschaft, deren Eigentümer wiederum eine Stiftung auf den Seychellen ist) sollen CHF 5 Mio. auf ein Schweizer Konto übertragen werden. Kein erkennbarer wirtschaftlicher Zweck der Struktur.",
        question: "Was ist die grösste Herausforderung und wie gehst du vor?",
        options: [
          { key: "A", text: "Konto eröffnen – alle genannten Jurisdiktionen sind legal und die Schweizer Holding ist ordentlich registriert" },
          { key: "B", text: "Formular K für die Schweizer Holding ausfüllen – das reicht" },
          {
            key: "C",
            text: "Wirtschaftlich Berechtigte der gesamten Struktur bis zur natürlichen Person durchleuchten (Look-Through-Prinzip). Formular A für jede Ebene. Ohne Identifikation der wirtschaftlich Berechtigten Person: kein Konto.",
          },
          { key: "D", text: "Compliance fragt die Seychellen-Stiftung direkt – sie ist rechtlich verantwortlich" },
        ],
        correct: "C",
        feedback:
          "Verschachtelte Gesellschaftsstrukturen sind ein klassisches Mittel zur Verschleierung von Vermögenswerten. Das Look-Through-Prinzip gemäss GwG und VSB verlangt, dass die Bank durch alle Ebenen hindurch bis zur natürlichen Person (wirtschaftlich Berechtigter) gelangt. Formular A ist auf jeder Stufe mit einer identifizierbaren natürlichen Person zu unterzeichnen. BVI- und Seychellen-Strukturen ohne erkennbaren Wirtschaftszweck gelten als Hochrisikostrukturen. Ohne vollständige Durchleuchtung: keine Kontoeröffnung.",
        concepts: ["Look-Through", "Formular A", "Gesellschaftsstruktur"],
      },
      {
        id: "3.10",
        level: 3,
        situation:
          "Ein junger Mann, 24, Student, eröffnet ein Konto und überweist kurz darauf CHF 500 an 12 verschiedene Empfänger in 3 verschiedenen Ländern. Die Beträge sind klein, aber eines der Zielländer ist auf der FATF-Liste mit erhöhtem Terrorismus-Finanzierungsrisiko. Auf Social Media findet Compliance Hinweise auf extremistische Aussagen.",
        question: "Wie unterscheidet sich Terrorismusfinanzierung von klassischer Geldwäscherei und was tust du?",
        options: [
          { key: "A", text: "Nichts – Beträge unter CHF 1'000 sind für Terrorismusfinanzierung viel zu klein" },
          { key: "B", text: "Nur MROS-Meldung – wie bei Geldwäscherei auch" },
          {
            key: "C",
            text: "MROS sofort informieren (Terrorismusfinanzierung), Konto sperren. Wichtig: Terrorismusfinanzierung kennt keinen Mindestbetrag – kleine Beträge können grossen Schaden anrichten. Nachrichtendienst des Bundes (NDB) kann ebenfalls informiert werden.",
          },
          { key: "D", text: "Social-Media-Recherche ist kein valider KYC-Anhaltspunkt – keine Massnahmen" },
        ],
        correct: "C",
        feedback:
          "Terrorismusfinanzierung (TF) unterscheidet sich fundamental von Geldwäscherei: Bei GwG geht es um die Herkunft (illegale Gelder reinwaschen). Bei TF geht es um den Zweck (legale oder illegale Mittel für terroristische Zwecke). Kleinbeträge können ausreichen (z.B. Reisekosten, Ausrüstung). GwG Art. 9 gilt für TF gleichermassen wie für Geldwäscherei. Bei konkretem Verdacht: sofortige MROS-Meldung, Sperrpflicht, Informationsverbot. Der NDB (Nachrichtendienst des Bundes) kann zusätzlich involviert werden. Social-Media-Hinweise sind valide Indikatoren.",
        concepts: ["Terrorismusfinanzierung", "MROS", "GwG"],
      },
    ],
  },
];

OF_CASES_KYC.forEach((c) => {
  KYC_LEVELS.find((l) => l.level === c.level)!.scenarios.push(c);
});
