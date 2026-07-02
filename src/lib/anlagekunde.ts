export type OptionKey = "A" | "B" | "C" | "D";
export type LevelNum = 1 | 2 | 3;

export interface AnlageOption {
  key: OptionKey;
  text: string;
}

export interface AnlageScenario {
  id: string;
  type: "multiple-choice";
  level: LevelNum;
  situation: string;
  inputData?: { label: string; value: string }[];
  question: string;
  options: AnlageOption[];
  correct: OptionKey;
  feedback: string;
}

export type DocStatus = "required" | "forbidden";

export interface AnlageDoc {
  id: string;
  label: string;
  status: DocStatus;
  feedbackSelected: string;
  feedbackNotSelected: string;
}

export interface AnlageDocumentCase {
  id: string;
  type: "document-select";
  level: LevelNum;
  title: string;
  briefing: string;
  documents: AnlageDoc[];
  requiredOneOf?: string[][];
  generalFeedback: string;
}

export type AnlageCase = AnlageScenario | AnlageDocumentCase;

export interface AnlageLevelConfig {
  level: LevelNum;
  label: string;
  badgeVariant: "green" | "orange" | "red";
  scenarios: AnlageCase[];
}

export function scoreDocumentCase(
  c: AnlageDocumentCase,
  selected: Set<string>
): { score: number; correct: boolean } {
  let errors = 0;
  let total = 0;

  for (const doc of c.documents) {
    if (doc.status === "required") {
      total++;
      if (!selected.has(doc.id)) errors++;
    } else if (doc.status === "forbidden") {
      total++;
      if (selected.has(doc.id)) errors++;
    }
  }

  for (const group of c.requiredOneOf ?? []) {
    total++;
    if (!group.some((id) => selected.has(id))) errors++;
  }

  const score = total === 0 ? 100 : Math.round(((total - errors) / total) * 100);
  return { score, correct: errors === 0 };
}

export const AL_LEVELS: AnlageLevelConfig[] = [
  {
    level: 1,
    label: "Einsteiger",
    badgeVariant: "green",
    scenarios: [
      {
        id: "1.1",
        type: "multiple-choice",
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
        type: "multiple-choice",
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
        type: "multiple-choice",
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
      {
        id: "1.4",
        type: "document-select",
        level: 1,
        title: "Erstberatung – Neuer Anlagekunde",
        briefing:
          "Herr Abegglen (41) ist neuer Kunde und möchte erstmals eine Anlageberatung. Er hat noch nie Wertschriften besessen. Keine Hinweise auf besondere Risikomerkmale (kein PEP, Gelder stammen aus Lohn/Ersparnissen).",
        documents: [
          {
            id: "risikoprofil-1-4",
            label: "Risikoprofil-Dokument (FIDLEG-Eignungsprüfung: Kenntnisse, Erfahrung, Risikofähigkeit, Risikobereitschaft)",
            status: "required",
            feedbackSelected:
              "Korrekt – vor jeder Anlageberatung muss die FIDLEG-Eignungsprüfung durchgeführt und im Risikoprofil dokumentiert werden.",
            feedbackNotSelected:
              "Fehler: Ohne Risikoprofil darf keine Anlageempfehlung abgegeben werden – die Eignungsprüfung (Kenntnisse, Erfahrung, Risikofähigkeit, Risikobereitschaft) ist zwingend.",
          },
          {
            id: "risikobroschuere-1-4",
            label: "Broschüre «Besondere Risiken im Effektenhandel» mit Empfangsbestätigung",
            status: "required",
            feedbackSelected:
              "Korrekt – die Risikoaufklärung muss vor der ersten Anlageempfehlung erfolgen und der Erhalt bestätigt werden.",
            feedbackNotSelected:
              "Fehler: Die Risikoaufklärungsbroschüre muss vor der ersten Empfehlung abgegeben und der Erhalt bestätigt werden.",
          },
          {
            id: "kundenklassifizierung-1-4",
            label: "Kundensegmentierung (Privatkunde / professioneller Kunde) nach FIDLEG",
            status: "required",
            feedbackSelected:
              "Korrekt – FIDLEG verlangt die Einteilung in Privatkunde, professioneller oder institutioneller Kunde, da davon der Schutzumfang abhängt.",
            feedbackNotSelected:
              "Fehler: Ohne Kundensegmentierung ist unklar, welcher Schutzstandard – etwa die Eignungsprüfung – überhaupt gilt.",
          },
          {
            id: "vv-vertrag-1-4",
            label: "Vermögensverwaltungsvertrag",
            status: "forbidden",
            feedbackSelected:
              "Fehler: Herr Abegglen möchte Anlageberatung, keine Vermögensverwaltung – ein Vermögensverwaltungsvertrag passt nicht zur gewünschten Dienstleistung.",
            feedbackNotSelected:
              "Korrekt – kein Vermögensverwaltungsvertrag nötig, da es sich um Anlageberatung handelt.",
          },
          {
            id: "edd-1-4",
            label: "EDD-Formular / vertiefter Herkunftsnachweis der Vermögenswerte",
            status: "forbidden",
            feedbackSelected:
              "Fehler: Es gibt keine Risikomerkmale (kein PEP, Gelder aus Lohn/Ersparnissen) – erweiterte Sorgfaltspflichten sind hier nicht angezeigt.",
            feedbackNotSelected: "Korrekt – ohne echte Risikomerkmale ist keine EDD-Abklärung nötig.",
          },
          {
            id: "pep-1-4",
            label: "PEP-Formular (politisch exponierte Person)",
            status: "forbidden",
            feedbackSelected:
              "Fehler: Es liegt kein Hinweis auf eine politisch exponierte Person vor – das PEP-Formular ist hier nicht angezeigt.",
            feedbackNotSelected: "Korrekt – kein PEP-Hinweis, daher kein PEP-Formular nötig.",
          },
        ],
        generalFeedback:
          "Bei jeder erstmaligen Anlageberatung ist die FIDLEG-Eignungsprüfung zwingend: Kenntnisse und Erfahrung, Anlageziele, finanzielle Verhältnisse (Risikofähigkeit) und Risikobereitschaft müssen abgeklärt und im Risikoprofil dokumentiert werden. Dazu gehören die Risikoaufklärung und die Kundensegmentierung. EDD- und PEP-Formulare sind nur bei echten Risikomerkmalen nötig – ohne solche Hinweise wären sie unverhältnismässig.",
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
        type: "multiple-choice",
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
        type: "multiple-choice",
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
        type: "multiple-choice",
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
      {
        id: "2.4",
        type: "document-select",
        level: 2,
        title: "Kunde will in Kryptowährungen investieren",
        briefing:
          "Frau Steiner (45), Risikoprofil «konservativ» (Kapitalerhalt, kurzer Horizont), möchte CHF 40'000 in Bitcoin investieren, weil ein Bekannter «damit reich geworden ist». Sie hat keine Erfahrung mit Kryptowährungen.",
        documents: [
          {
            id: "risiko-krypto-2-4",
            label: "Schriftliche Risikoaufklärung zu Kryptowährungen (Volatilität, Totalverlustrisiko)",
            status: "required",
            feedbackSelected:
              "Korrekt – bei einem gänzlich neuen, hochvolatilen Anlagetyp muss gezielt und schriftlich über die spezifischen Risiken (Kursschwankungen, Totalverlustrisiko, fehlender Anlegerschutz) aufgeklärt werden.",
            feedbackNotSelected:
              "Fehler: Ohne spezifische Risikoaufklärung zu Kryptowährungen fehlt der Nachweis, dass Frau Steiner über die besonderen Risiken informiert wurde.",
          },
          {
            id: "eignung-abgleich-2-4",
            label: "Dokumentierter Abgleich: Krypto-Investment passt nicht zum Risikoprofil «konservativ»",
            status: "required",
            feedbackSelected:
              "Korrekt – die Eignungsprüfung muss zeigen, dass Bitcoin nicht zum bestehenden konservativen Risikoprofil passt, bevor weiter vorgegangen wird.",
            feedbackNotSelected:
              "Fehler: Es muss dokumentiert werden, dass das Produkt nicht zum aktuellen Risikoprofil passt – sonst kann die Bank die Unvereinbarkeit später nicht belegen.",
          },
          {
            id: "erklaerung-gegen-empfehlung-2-4",
            label: "Schriftliche Erklärung: Kundin handelt gegen die Empfehlung der Bank",
            status: "required",
            feedbackSelected:
              "Korrekt – möchte die Kundin trotz Warnung investieren, muss die Bank festhalten, dass sie gegen ihre Empfehlung handelt.",
            feedbackNotSelected:
              "Fehler: Ohne diese Erklärung kann die Bank nicht nachweisen, dass sie gewarnt hat und die Kundin bewusst gegen die Empfehlung handelt.",
          },
          {
            id: "profil-automatisch-2-4",
            label: "Risikoprofil automatisch auf «aggressiv» umstellen, ohne Gespräch",
            status: "forbidden",
            feedbackSelected:
              "Fehler: Ein einzelner Wunsch nach einer riskanten Anlage rechtfertigt keine automatische Anpassung des gesamten Risikoprofils – das erfordert ein Gespräch über die gesamte Anlagesituation.",
            feedbackNotSelected:
              "Korrekt – das Risikoprofil darf nicht ohne umfassendes Gespräch einfach angepasst werden.",
          },
          {
            id: "vv-mandat-krypto-2-4",
            label: "Vermögensverwaltungsmandat mit Krypto-Anlagestrategie",
            status: "forbidden",
            feedbackSelected:
              "Fehler: Es geht um einen einzelnen Anlagewunsch der Kundin im Rahmen der Anlageberatung, nicht um ein Vermögensverwaltungsmandat.",
            feedbackNotSelected: "Korrekt – kein Vermögensverwaltungsmandat notwendig.",
          },
          {
            id: "freistellung-2-4",
            label: "Unterschrift einholen ohne vorgängige Risikoaufklärung",
            status: "forbidden",
            feedbackSelected:
              "Fehler: Eine blosse Unterschrift ersetzt die inhaltliche Risikoaufklärung nicht – diese muss zuerst erfolgen.",
            feedbackNotSelected: "Korrekt – eine Unterschrift ohne vorgängige Aufklärung reicht nicht aus.",
          },
        ],
        generalFeedback:
          "Passt ein Kundenwunsch nicht zum bestehenden Risikoprofil, muss die Bank aufklären und die Nichteignung dokumentieren. Besteht der Kunde trotzdem auf dem Geschäft, kann die Bank es ausführen, muss aber schriftlich festhalten, dass gegen ihre Empfehlung gehandelt wird. Das Risikoprofil selbst darf nicht leichtfertig angepasst werden – Risikobereitschaft für ein einzelnes Produkt bedeutet nicht automatisch eine veränderte Gesamtstrategie.",
      },
      {
        id: "2.5",
        type: "document-select",
        level: 2,
        title: "Pensionierter Kunde möchte Hebelprodukte",
        briefing:
          "Herr Brunner (68), seit 2 Jahren pensioniert, Risikoprofil «konservativ» (AHV-/Pensionskassenrente als Haupteinkommen, Vermögen soll den Ruhestand finanzieren), möchte neu in gehebelte strukturierte Produkte investieren, weil ein Nachbar hohe Gewinne erzielt hat.",
        documents: [
          {
            id: "risikofaehigkeit-2-5",
            label: "Aktualisierte Beurteilung der Risikofähigkeit (Einkommenssituation im Ruhestand)",
            status: "required",
            feedbackSelected:
              "Korrekt – im Ruhestand ist die objektive Risikofähigkeit meist tiefer, da kein Erwerbseinkommen mehr vorhanden ist, um Verluste auszugleichen. Das muss aktualisiert dokumentiert werden.",
            feedbackNotSelected:
              "Fehler: Ohne aktualisierte Beurteilung der Risikofähigkeit fehlt der Nachweis, dass die eingeschränkte finanzielle Situation im Ruhestand berücksichtigt wurde.",
          },
          {
            id: "risikoaufklaerung-hebel-2-5",
            label: "Schriftliche Risikoaufklärung zu Hebel-/strukturierten Produkten (Verlustrisiko über den Kapitaleinsatz hinaus)",
            status: "required",
            feedbackSelected:
              "Korrekt – Hebelprodukte bergen besondere Risiken (z. B. überproportionale Verluste), über die spezifisch aufgeklärt werden muss.",
            feedbackNotSelected:
              "Fehler: Die spezifischen Risiken von Hebelprodukten müssen separat erklärt werden – die allgemeine Risikobroschüre allein reicht nicht.",
          },
          {
            id: "widerspruch-2-5",
            label: "Dokumentation des Widerspruchs zwischen Risikoprofil «konservativ» und Produktwunsch",
            status: "required",
            feedbackSelected:
              "Korrekt – der Widerspruch zwischen dem bestehenden konservativen Profil und dem riskanten Anlagewunsch muss festgehalten werden.",
            feedbackNotSelected:
              "Fehler: Ohne dokumentierten Widerspruch kann die Bank später nicht belegen, dass sie auf die fehlende Eignung hingewiesen hat.",
          },
          {
            id: "order-ohne-aufklaerung-2-5",
            label: "Order sofort ausführen, da der Kunde es ausdrücklich wünscht",
            status: "forbidden",
            feedbackSelected:
              "Fehler: Auch ein ausdrücklicher Kundenwunsch entbindet nicht von der vorgängigen Risikoaufklärung und Dokumentation.",
            feedbackNotSelected: "Korrekt – die Order darf nicht ohne vorgängige Aufklärung einfach ausgeführt werden.",
          },
          {
            id: "vv-vertrag-2-5",
            label: "Vermögensverwaltungsvertrag abschliessen",
            status: "forbidden",
            feedbackSelected:
              "Fehler: Herr Brunner bleibt in der Anlageberatung – er möchte selbst entscheiden, keine Vermögensverwaltung.",
            feedbackNotSelected: "Korrekt – kein Vermögensverwaltungsvertrag notwendig.",
          },
          {
            id: "edd-2-5",
            label: "EDD-Formular / erweiterte Herkunftsabklärung der Vermögenswerte",
            status: "forbidden",
            feedbackSelected:
              "Fehler: Es liegen keine Risikomerkmale vor (langjähriger Kunde, bekannte Vermögensherkunft) – eine EDD-Abklärung ist hier nicht angezeigt.",
            feedbackNotSelected: "Korrekt – ohne Risikomerkmale ist keine erweiterte Herkunftsabklärung nötig.",
          },
        ],
        generalFeedback:
          "Im Ruhestand sinkt die objektive Risikofähigkeit meist, weil kein Erwerbseinkommen mehr vorhanden ist, um Verluste auszugleichen – unabhängig von der subjektiven Risikobereitschaft des Kunden. Die Bank muss den Widerspruch zwischen Profil und Produktwunsch aufzeigen, spezifisch über Hebelrisiken aufklären und alles dokumentieren, bevor sie handelt.",
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
        type: "multiple-choice",
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
        type: "multiple-choice",
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
        type: "multiple-choice",
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
      {
        id: "3.4",
        type: "document-select",
        level: 3,
        title: "Kundin mit plötzlicher Erbschaft",
        briefing:
          "Frau Wyss (34) erbt von ihrem verstorbenen Onkel CHF 480'000. Sie hatte bisher nur ein Sparkonto und keinerlei Erfahrung mit Wertschriften. Sie möchte das Geld nun «gewinnbringend» anlegen. Die Erbschaft ist durch eine Erbbescheinigung des zuständigen Gerichts belegt, keine weiteren Auffälligkeiten.",
        documents: [
          {
            id: "neues-profil-3-4",
            label: "Neues Risikoprofil / Eignungsprüfung (Kenntnisse, Erfahrung, Risikofähigkeit, Risikobereitschaft)",
            status: "required",
            feedbackSelected:
              "Korrekt – vor der ersten Anlageempfehlung muss ein vollständiges Risikoprofil erstellt werden, insbesondere weil keine Anlageerfahrung besteht.",
            feedbackNotSelected:
              "Fehler: Ohne Risikoprofil darf keine Anlageempfehlung erfolgen – gerade bei fehlender Erfahrung ist die Eignungsprüfung besonders wichtig.",
          },
          {
            id: "erbbescheinigung-3-4",
            label: "Erbbescheinigung im Dossier (Nachweis der Mittelherkunft)",
            status: "required",
            feedbackSelected:
              "Korrekt – bei einem plötzlichen, hohen Mittelzufluss muss die Herkunft nachvollziehbar dokumentiert werden; die Erbbescheinigung genügt hierfür.",
            feedbackNotSelected:
              "Fehler: Ein derart hoher, plötzlicher Mittelzufluss muss plausibilisiert werden – die Erbbescheinigung gehört als Beleg ins Dossier.",
          },
          {
            id: "risikobroschuere-3-4",
            label: "Broschüre «Besondere Risiken im Effektenhandel» mit Empfangsbestätigung",
            status: "required",
            feedbackSelected:
              "Korrekt – da keine Anlageerfahrung besteht, ist die Grundlagen-Risikoaufklärung besonders wichtig und muss bestätigt werden.",
            feedbackNotSelected:
              "Fehler: Die Risikobroschüre muss vor der ersten Empfehlung abgegeben und der Erhalt bestätigt werden.",
          },
          {
            id: "edd-3-4",
            label: "EDD-Formular / erweiterte Sorgfaltspflichten (Compliance-Meldung)",
            status: "forbidden",
            feedbackSelected:
              "Fehler: Eine durch Erbbescheinigung belegte, plausible Erbschaft ohne weitere Auffälligkeiten ist kein echtes Risikomerkmal – erweiterte Sorgfaltspflichten sind hier unverhältnismässig.",
            feedbackNotSelected:
              "Korrekt – ohne echte Risikomerkmale (z. B. PEP-Status, Hochrisikoland, Unklarheiten) ist keine EDD nötig.",
          },
          {
            id: "pep-3-4",
            label: "PEP-Formular (politisch exponierte Person)",
            status: "forbidden",
            feedbackSelected:
              "Fehler: Es gibt keinen Hinweis auf eine politisch exponierte Person – das PEP-Formular ist hier nicht angezeigt.",
            feedbackNotSelected: "Korrekt – kein PEP-Hinweis vorhanden.",
          },
          {
            id: "order-aggressiv-3-4",
            label: "Order für ein aggressives Wachstumsportfolio, ohne vorgängige Eignungsprüfung",
            status: "forbidden",
            feedbackSelected:
              "Fehler: Ohne Eignungsprüfung darf keine Anlageempfehlung – schon gar keine aggressive – abgegeben werden, insbesondere bei fehlender Erfahrung.",
            feedbackNotSelected: "Korrekt – keine Order ohne vorgängige Eignungsprüfung.",
          },
        ],
        generalFeedback:
          "Ein plötzlicher Vermögenszuwachs erhöht die objektive Risikofähigkeit, sagt aber nichts über Kenntnisse, Erfahrung oder Risikobereitschaft aus – ein neues Risikoprofil ist zwingend. Die Mittelherkunft muss plausibilisiert werden (hier genügt die Erbbescheinigung); erweiterte Sorgfaltspflichten (EDD) sind nur bei echten Risikomerkmalen wie PEP-Status, Hochrisikoländern oder Unstimmigkeiten angezeigt – nicht bei jeder Erbschaft.",
      },
      {
        id: "3.5",
        type: "document-select",
        level: 3,
        title: "Interessenkonflikt – Empfehlung von Eigenprodukten",
        briefing:
          "Ein Kundenberater empfiehlt Herrn Egli für dessen Vorsorgevermögen bevorzugt bankeigene Anlagefonds. Die Bank erhält für den Vertrieb dieser Fonds Vertriebsentschädigungen (Retrozessionen). Ein vergleichbares Drittprodukt wäre günstiger, wurde dem Kunden aber nicht erwähnt.",
        documents: [
          {
            id: "offenlegung-konflikt-3-5",
            label: "Schriftliche Offenlegung des Interessenkonflikts (Empfehlung von Eigenprodukten)",
            status: "required",
            feedbackSelected:
              "Korrekt – kann ein Interessenkonflikt nicht vermieden werden, muss er dem Kunden offengelegt werden, bevor das Geschäft abgeschlossen wird.",
            feedbackNotSelected:
              "Fehler: Ohne Offenlegung des Interessenkonflikts weiss der Kunde nicht, dass die Empfehlung auch im Eigeninteresse der Bank erfolgt.",
          },
          {
            id: "offenlegung-retro-3-5",
            label: "Offenlegung von Retrozessionen / Vertriebsentschädigungen (Art und Höhe)",
            status: "required",
            feedbackSelected:
              "Korrekt – Vertriebsentschädigungen müssen dem Kunden offengelegt werden; ohne gültigen Verzicht stehen sie grundsätzlich dem Kunden zu.",
            feedbackNotSelected:
              "Fehler: Werden Retrozessionen nicht offengelegt, verletzt die Bank ihre Treue- und Interessenwahrungspflicht.",
          },
          {
            id: "eignung-trotz-eigenprodukt-3-5",
            label: "Dokumentierter Nachweis, dass das Eigenprodukt trotzdem zum Risikoprofil des Kunden passt",
            status: "required",
            feedbackSelected:
              "Korrekt – auch bei Eigenprodukten muss die Eignungsprüfung eingehalten und dokumentiert werden, dass das Produkt objektiv passt.",
            feedbackNotSelected:
              "Fehler: Es muss belegt werden, dass die Empfehlung trotz Interessenkonflikt im Kundeninteresse und geeignet war.",
          },
          {
            id: "kein-vergleich-3-5",
            label: "Empfehlung ohne jeglichen Vergleich mit Drittprodukten dokumentieren",
            status: "forbidden",
            feedbackSelected:
              "Fehler: Fehlt jeder Vergleich, kann die Bank nicht belegen, dass die Empfehlung im besten Interesse des Kunden erfolgte.",
            feedbackNotSelected: "Korrekt – ein fehlender Vergleich darf nicht einfach unkommentiert bleiben.",
          },
          {
            id: "pauschale-zustimmung-3-5",
            label: "Pauschale Einverständniserklärung ohne Angabe der Retrozessionshöhe",
            status: "forbidden",
            feedbackSelected:
              "Fehler: Eine pauschale Zustimmung ohne konkrete Angaben zur Höhe der Entschädigung genügt den Offenlegungspflichten nicht.",
            feedbackNotSelected:
              "Korrekt – eine unkonkrete Pauschalklausel ersetzt die Offenlegung von Art und Höhe nicht.",
          },
          {
            id: "verzicht-ohne-frage-3-5",
            label: "Auf Offenlegung verzichten, weil der Kunde nicht danach gefragt hat",
            status: "forbidden",
            feedbackSelected:
              "Fehler: Die Offenlegungspflicht besteht unabhängig davon, ob der Kunde von sich aus nachfragt.",
            feedbackNotSelected:
              "Korrekt – die Offenlegungspflicht gilt aktiv, unabhängig von einer Nachfrage des Kunden.",
          },
        ],
        generalFeedback:
          "Bei der Empfehlung von Eigenprodukten besteht ein struktureller Interessenkonflikt zwischen Bank und Kunde. FIDLEG verlangt, dass Interessenkonflikte offengelegt werden, wenn sie nicht vermieden werden können – inklusive Retrozessionen/Vertriebsentschädigungen nach Art und Höhe. Zusätzlich muss die Bank nachweisen, dass das empfohlene Produkt trotzdem zum Risikoprofil des Kunden passt (die Eignungsprüfung bleibt bestehen).",
      },
    ],
  },
];
