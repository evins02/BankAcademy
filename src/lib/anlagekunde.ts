export type OptionKey = "A" | "B" | "C" | "D";
export type LevelNum = 1 | 2 | 3;

export interface AnlageOption {
  key: OptionKey;
  text: string;
}

export interface AnlageScenario {
  id: string;
  level: LevelNum;
  situation: string;
  inputData?: { label: string; value: string }[];
  question: string;
  options: AnlageOption[];
  correct: OptionKey;
  feedback: string;
}

export interface AnlageLevelConfig {
  level: LevelNum;
  label: string;
  badgeVariant: "green" | "orange" | "red";
  scenarios: AnlageScenario[];
}

export const AL_LEVELS: AnlageLevelConfig[] = [
  {
    level: 1,
    label: "Einsteiger",
    badgeVariant: "green",
    scenarios: [
      {
        id: "1.1",
        level: 1,
        situation:
          "Kundin Rita Müller, 62 Jahre, geht in 3 Jahren in Rente. Sie hat CHF 150'000 gespart und möchte das Geld anlegen. Sie sagt: «Ich brauche das Geld für meine Rente – ich darf nichts verlieren.»",
        question: "Welche Risikoklasse passt zu Rita?",
        options: [
          { key: "A", text: "Hoch – sie hat genug Zeit" },
          {
            key: "B",
            text: "Sehr klein / Klein – kurzer Horizont, Kapitalerhalt im Vordergrund, kein Verlust tolerierbar.",
          },
          { key: "C", text: "Mittel – Kompromiss" },
          { key: "D", text: "Erhöht – mehr Rendite möglich" },
        ],
        correct: "B",
        feedback:
          "Kurzer Anlagehorizont (3 Jahre) + Kapitalerhalt als Ziel + keine Verlusttoleranz = konservatives Profil. Aktien oder risikoreiche Anlagen wären hier falsch.",
      },
      {
        id: "1.2",
        level: 1,
        situation:
          "Kunde fragt: «Ich möchte dass Sie mein Geld für mich anlegen – ich will mich um nichts kümmern.»",
        question: "Was bietet die Bank an?",
        options: [
          { key: "A", text: "Anlageberatung – Bank berät, Kunde entscheidet" },
          {
            key: "B",
            text: "Vermögensverwaltung – Bank handelt im Auftrag des Kunden, Kunde muss nicht jeden Entscheid selbst treffen.",
          },
          { key: "C", text: "Sparkonto – sicherer" },
          { key: "D", text: "Depot eröffnen und selbst handeln" },
        ],
        correct: "B",
        feedback:
          "Vermögensverwaltung = Bank handelt eigenständig im Rahmen der vereinbarten Anlagestrategie. Anlageberatung = Bank empfiehlt, Kunde entscheidet selbst.",
      },
      {
        id: "1.3",
        level: 1,
        situation:
          "Ein neuer Kunde möchte sofort Aktien kaufen. Du hast ihm die Risiken noch nicht erklärt.",
        question: "Was machst du zuerst?",
        options: [
          { key: "A", text: "Aktien direkt kaufen – Kunde weiss was er will" },
          {
            key: "B",
            text: "Zuerst Broschüre «Besondere Risiken im Effektenhandel» abgeben und Erhalt bestätigen lassen. Dann Anlegerprofil erstellen.",
          },
          { key: "C", text: "Risiken kurz mündlich erklären und weitermachen" },
          { key: "D", text: "Vorgesetzten fragen" },
        ],
        correct: "B",
        feedback:
          "Risikoaufklärung ist Hauptpflicht der Bank – vor jeder Anlageempfehlung! Broschüre abgeben, Erhalt bestätigen. Bei Verletzung dieser Pflicht haftet die Bank.",
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
          "Kunde, 35 Jahre, sagt: «Ich will maximale Rendite aber wenn der Kurs fällt, will ich sofort verkaufen.»",
        question: "Was fällt dir auf?",
        options: [
          {
            key: "A",
            text: "Alles korrekt – hohe Rendite und schnell verkaufen ist möglich",
          },
          {
            key: "B",
            text: "Widerspruch: Hohe Rendite erfordert hohes Risiko und langen Horizont. Sofort verkaufen bei Verlust passt nicht zu aggressiver Strategie.",
          },
          { key: "C", text: "Kunde hat recht – Timing ist alles" },
          { key: "D", text: "Einfach Obligationen empfehlen" },
        ],
        correct: "B",
        feedback:
          "Risikobereitschaft und Risikofähigkeit müssen übereinstimmen. Wer bei Kursrückgang sofort verkauft, hat keine echte Risikobereitschaft für Aktien. Profil muss angepasst werden.",
      },
      {
        id: "2.2",
        level: 2,
        situation: "Das erstellte Anlegerprofil zeigt folgende Werte:",
        inputData: [
          { label: "Anlagehorizont", value: "10 Jahre" },
          { label: "Risikobereitschaft", value: "Mittel" },
          { label: "Ziel", value: "Vermögenswachstum" },
          { label: "Verlusttoleranz", value: "max. 20%" },
        ],
        question: "Welche Strategie passt?",
        options: [
          { key: "A", text: "100% Aktien – langer Horizont" },
          { key: "B", text: "100% Obligationen – sicher" },
          {
            key: "C",
            text: "Ausgewogen – Mix aus Aktien und Obligationen passend zu Risikoprofil Mittel.",
          },
          { key: "D", text: "Alles in Festgeld" },
        ],
        correct: "C",
        feedback:
          "Risikoprofil Mittel = ausgewogene Strategie. Mix aus Aktien (Wachstum) und Obligationen (Stabilität). 100% Aktien wäre zu aggressiv für Profil Mittel.",
      },
      {
        id: "2.3",
        level: 2,
        situation: "Kunde möchte Depot eröffnen. Was brauchst du zwingend vor dem ersten Kauf?",
        question: "Was ist vor der Depoteröffnung zwingend?",
        options: [
          { key: "A", text: "Nur Ausweis" },
          {
            key: "B",
            text: "Identifikation, ausgefülltes Anlegerprofil, unterschriebene Anlagerichtlinien, Broschüre Risiken abgegeben.",
          },
          { key: "C", text: "Nur Unterschrift" },
          { key: "D", text: "Nichts – Depot kann sofort eröffnet werden" },
        ],
        correct: "B",
        feedback:
          "Vor Depoteröffnung zwingend: Identifikation, Anlegerprofil, Anlagerichtlinien unterschrieben, Risikobroschüre abgegeben. Erst dann können Wertschriften gehandelt werden.",
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
          "Kundin hatte Profil «Konservativ». Ihr Mann ist verstorben, sie erbt CHF 800'000. Sie sagt: «Jetzt will ich mehr Rendite – ich habe ja mehr Geld.»",
        question: "Was machst du?",
        options: [
          { key: "A", text: "Profil sofort auf Aggressiv ändern" },
          {
            key: "B",
            text: "Neues Anlegerprofil erstellen – Lebenssituation hat sich geändert. Aber Vorsicht: Mehr Vermögen erhöht Risikofähigkeit, aber nicht automatisch Risikobereitschaft. Sorgfältig besprechen.",
          },
          { key: "C", text: "Alles in Aktien investieren" },
          { key: "D", text: "Profil bleibt gleich" },
        ],
        correct: "B",
        feedback:
          "Lebensveränderungen erfordern neues Anlegerprofil. Mehr Vermögen = höhere Risikofähigkeit objektiv. Aber Risikobereitschaft ist subjektiv – muss sorgfältig besprochen werden. Nie automatisch ändern ohne Gespräch.",
      },
      {
        id: "3.2",
        level: 3,
        situation:
          "Kunde beschwert sich: «Mein Portfolio hat 30% verloren. Das haben Sie mir nie so erklärt!» Du findest: Risikobroschüre wurde abgegeben aber Anlegerprofil wurde nie ausgefüllt.",
        question: "Was ist das Problem?",
        options: [
          { key: "A", text: "Kein Problem – Broschüre reicht" },
          {
            key: "B",
            text: "Anlegerprofil fehlt – Bank hat Sorgfaltspflicht verletzt. Kunde kann Schadenersatz fordern. Ohne Profil kann nicht bewiesen werden, dass die Strategie zum Kunden passte.",
          },
          { key: "C", text: "Kunde trägt selbst Verantwortung" },
          { key: "D", text: "30% Verlust ist normal" },
        ],
        correct: "B",
        feedback:
          "Broschüre alleine reicht nicht! Anlegerprofil ist Pflicht. Ohne Profil kann Bank nicht beweisen, dass Strategie geeignet war. Bei Pflichtverletzung haftet die Bank für Verluste.",
      },
      {
        id: "3.3",
        level: 3,
        situation:
          "Bei der Anlageberatung empfiehlt der Berater Aktie X. Kunde kauft und verliert CHF 50'000. Bei der Vermögensverwaltung kauft die Bank Aktie X ohne Rücksprache. Beide verlieren gleich viel.",
        question: "Wo haftet die Bank mehr?",
        options: [
          { key: "A", text: "Beide gleich" },
          { key: "B", text: "Anlageberatung – Bank hat empfohlen, also haftet sie mehr" },
          {
            key: "C",
            text: "Vermögensverwaltung – Bank hat eigenständig gehandelt ohne Rücksprache. Höhere Sorgfaltspflicht.",
          },
          { key: "D", text: "Keine Haftung in beiden Fällen" },
        ],
        correct: "C",
        feedback:
          "Bei Vermögensverwaltung handelt die Bank eigenständig – höhere Sorgfaltspflicht und höheres Haftungsrisiko. Bei Anlageberatung entscheidet letztlich der Kunde selbst.",
      },
    ],
  },
];
