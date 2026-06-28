import { type LückentextCase } from "./lückentext";

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
}

export interface KycLevelConfig {
  level: LevelNum;
  label: string;
  badgeVariant: "green" | "orange" | "red";
  scenarios: (KycScenario | LückentextCase)[];
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
          { key: "D", text: "Vorgesetzten fragen" },
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
          { key: "A", text: "Kontostand mitteilen – er ist ja der Ehemann" },
          { key: "B", text: "Keine Auskunft geben – kein Zugriff ohne Vollmacht" },
          { key: "C", text: "Nur den ungefähren Betrag nennen" },
          { key: "D", text: "Die Ehefrau anrufen und fragen" },
        ],
        correct: "B",
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
          { key: "B", text: "\"Das kann ich dir leider nicht sagen\"" },
          { key: "C", text: "\"Ich habe ihn heute nicht gesehen\"" },
          { key: "D", text: "\"Frag ihn doch selbst\"" },
        ],
        correct: "B",
        feedback:
          "Das Bankkundengeheimnis gilt auch ausserhalb der Arbeitszeit und im Privatleben. Du darfst weder bestätigen noch verneinen, ob jemand Kunde bei eurer Bank ist. Auch gegenüber Freunden und Familie gilt absolute Verschwiegenheit.",
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
          { key: "A", text: "Nur die Kundin identifizieren – sie ist die Vertragspartnerin" },
          { key: "B", text: "Formular A ausfüllen – wirtschaftlich Berechtigter ist der Bruder" },
          { key: "C", text: "Konto ablehnen – Drittgelder sind verboten" },
          { key: "D", text: "Formular K ausfüllen" },
        ],
        correct: "B",
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
    ],
  },
  {
    level: 3,
    label: "LAP-Niveau",
    badgeVariant: "red",
    scenarios: [
      {
        id: "3.1",
        level: 3,
        situation:
          "Du betreust seit 5 Jahren einen Kunden mit einem kleinen Handwerksbetrieb. Plötzlich gehen monatlich CHF 50'000 auf seinem Konto ein – bisher waren es maximal CHF 8'000. Auf Nachfrage sagt er, er habe einen neuen Grossauftrag erhalten.",
        question: "Welche Pflichten hast du gemäss GwG?",
        options: [
          { key: "A", text: "Erklärung des Kunden akzeptieren und nichts weiter unternehmen" },
          {
            key: "B",
            text: "Erneute Identifikation, Abklärung der Herkunft, Dokumentation – bei Verdacht Meldung an MROS",
          },
          { key: "C", text: "Konto sofort sperren und Kunden informieren" },
          { key: "D", text: "Nur intern dem Compliance-Team melden und abwarten" },
        ],
        correct: "B",
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
          { key: "A", text: "Normal behandeln wie jeden anderen Kunden" },
          { key: "B", text: "Ablehnen – PEPs sind grundsätzlich verboten" },
          {
            key: "C",
            text: "Erhöhte Sorgfaltspflichten anwenden: Genehmigung der Geschäftsleitung, Herkunft der Mittel abklären, engmaschige Überwachung",
          },
          { key: "D", text: "Nur Compliance informieren und deren Entscheidung abwarten" },
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
          { key: "A", text: "Zugang geben – der Kollege ist ja vertrauenswürdig" },
          {
            key: "B",
            text: "Zugang verweigern – jeder Mitarbeiter darf nur auf Konten zugreifen für die er berechtigt ist",
          },
          { key: "C", text: "Zugang geben aber dokumentieren" },
          { key: "D", text: "Vorgesetzten fragen und dann entscheiden" },
        ],
        correct: "B",
        feedback:
          "Das Need-to-know-Prinzip gilt absolut. Jeder Mitarbeiter darf nur auf Kundendaten zugreifen, für die er eine klare Berechtigung hat. Unbefugter Zugriff verletzt das Bankkundengeheimnis und den Datenschutz – unabhängig davon ob der Kollege vertrauenswürdig ist oder der Kunde einverstanden war. Dies kann strafrechtliche Konsequenzen haben.",
      },
    ],
  },
];
