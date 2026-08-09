export type OptionKey = "A" | "B" | "C" | "D";

export interface TragbarkeitOption {
  key: OptionKey;
  text: string;
}

export interface CalcRow {
  type: "row" | "divider" | "total-ok" | "total-error" | "total-neutral";
  label?: string;
  value?: string;
}

export interface DeckungsgradData {
  inputs: { label: string; value: string }[];
  calcLines: string[];
  resultLine: string;
  isOk: boolean;
}

export interface TragbarkeitCase {
  id: string;
  briefing: string;
  calcRows?: CalcRow[];
  deckungsgradData?: DeckungsgradData;
  question: string;
  options: TragbarkeitOption[];
  correct: OptionKey;
  feedback: string;
}

export type SectionId = "renditeobjekt" | "gesamtengagement" | "etp" | "gewerbe";

export interface TragbarkeitSectionConfig {
  id: SectionId;
  title: string;
  description: string;
  cases: TragbarkeitCase[];
}

export const TRAGBARKEIT_SECTIONS: TragbarkeitSectionConfig[] = [
  {
    id: "renditeobjekt",
    title: "Renditeobjekte – Objektebene",
    description: "Prüfe ob Mietobjekte sich auf Objektebene selbst tragen.",
    cases: [
      {
        id: "1.1",
        briefing:
          "Du bist Credit Officer. Du prüfst folgendes Renditeobjekt:",
        calcRows: [
          { type: "row", label: "Mieteinnahmen (netto)", value: "CHF 180'000" },
          { type: "row", label: "Zinsendienst", value: "− CHF 90'000" },
          { type: "row", label: "Amortisation", value: "− CHF 40'000" },
          { type: "row", label: "Nebenkosten", value: "− CHF 20'000" },
          { type: "divider" },
          { type: "total-ok", label: "Resultat", value: "= CHF 30'000" },
        ],
        question: "Was ist dein Entscheid?",
        options: [
          { key: "A", text: "Nicht tragbar – der Amortisationsbetrag von CHF 40'000 übersteigt die bankübliche Quote von 15% der Mieteinnahmen, was die Tragbarkeit trotz positivem Nettoergebnis aushebelt." },
          {
            key: "B",
            text: "Tragbarkeit gegeben – Nettoertrag von CHF 30'000. Liegenschaft ist selbsttragend.",
          },
          { key: "C", text: "Weitere Prüfung nötig – das Nettoergebnis ist zwar positiv, aber erst nach einer Analyse der Mieterstruktur und des Leerstandsrisikos kann eine abschliessende Tragbarkeitsbeurteilung vorgenommen werden." },
          { key: "D", text: "ETP beantragen – der Nettoertrag von CHF 30'000 liegt genau am internen Zielwert ohne Puffer. Da keine Reserve besteht, empfiehlt die Kreditpolitik bei Erträgen unter CHF 50'000 eine Ausnahmebeantragung." },
        ],
        correct: "B",
        feedback:
          "Nettoertrag = Liegenschaft selbsttragend. Tragbarkeit auf Objektebene gegeben. Keine weitere Prüfung nötig. Grünes Licht für Kreditantrag.",
      },
      {
        id: "1.2",
        briefing: "Du prüfst folgendes Renditeobjekt:",
        calcRows: [
          { type: "row", label: "Mieteinnahmen (netto)", value: "CHF 120'000" },
          { type: "row", label: "Zinsendienst", value: "− CHF 90'000" },
          { type: "row", label: "Amortisation", value: "− CHF 40'000" },
          { type: "row", label: "Nebenkosten", value: "− CHF 25'000" },
          { type: "divider" },
          { type: "total-error", label: "Resultat", value: "= − CHF 35'000" },
        ],
        question: "Was ist dein Entscheid?",
        options: [
          { key: "A", text: "Direkt ablehnen – bei negativem Nettoergebnis ist das Objekt nicht kreditwürdig. Eine Prüfung auf Gesamtengagementsebene ist nicht vorgesehen, da Renditeobjekte mit negativem Cashflow bankpolitisch grundsätzlich ausgeschlossen sind." },
          { key: "B", text: "Bewilligen – die Mieteinnahmen von CHF 120'000 belegen Ertragskraft. Der Nettoverlust entsteht durch die hohe Amortisation, die nach 5 Jahren wegfällt; danach verbessert sich das Ergebnis automatisch auf positiv." },
          {
            key: "C",
            text: "Nettoaufwand – Liegenschaft nicht selbsttragend. Prüfung auf Ebene Gesamtengagement nötig.",
          },
          { key: "D", text: "ETP direkt beantragen – Nettoaufwand ist keine absolute Ausschlussgrundlage, wenn das Objekt strategisch wichtig ist. Mit einer Begründung zum langfristigen Wertsteigerungspotential kann die Ausnahme bewilligt werden." },
        ],
        correct: "C",
        feedback:
          "Nettoaufwand bedeutet die Liegenschaft trägt sich nicht selbst. Jetzt muss die Unternehmung als Ganzes geprüft werden – Stufe 2.",
      },
      {
        id: "1.3",
        briefing: "Du prüfst folgendes Renditeobjekt:",
        calcRows: [
          { type: "row", label: "Mieteinnahmen (netto)", value: "CHF 150'000" },
          { type: "row", label: "Zinsendienst", value: "− CHF 100'000" },
          { type: "row", label: "Amortisation", value: "− CHF 35'000" },
          { type: "row", label: "Nebenkosten", value: "− CHF 15'000" },
          { type: "divider" },
          { type: "total-neutral", label: "Resultat", value: "= CHF 0" },
        ],
        question: "Was ist dein Entscheid?",
        options: [
          { key: "A", text: "Tragbar – ein ausgeglichenes Ergebnis zeigt wirtschaftliche Solidität. Null-Resultat bedeutet: Zins, Amortisation und Nebenkosten sind vollständig durch die Mieteinnahmen gedeckt, kein weiterer Prüfungsschritt nötig." },
          { key: "B", text: "Nicht tragbar – ohne positiven Cashflow fehlt der Sicherheitspuffer. Gemäss Kreditrichtlinie muss das Ergebnis mindestens CHF 10'000 positiv sein, damit die Bank eine Finanzierung prüft." },
          {
            key: "C",
            text: "Resultat ist null – Liegenschaft gerade selbsttragend. Empfehlung: Prüfung Gesamtengagement zur Sicherheit.",
          },
          { key: "D", text: "Direkt ablehnen – ein Nullergebnis ist der Minimalfall, bei dem jede Zinserhöhung oder Reparatur sofort zu Nettoaufwand führt. Das Risiko ist nicht kalkulierbar und widerspricht der Vorsichtspflicht." },
        ],
        correct: "C",
        feedback:
          "Ein Resultat von null bedeutet die Liegenschaft trägt sich knapp selbst. In der Praxis wird bei Nullergebnis trotzdem das Gesamtengagement geprüft um Puffer sicherzustellen.",
      },
    ],
  },
  {
    id: "gesamtengagement",
    title: "Gesamtengagement – Deckungsgrad",
    description: "Berechne den Deckungsgrad und prüfe das Gesamtengagement.",
    cases: [
      {
        id: "2.1",
        briefing:
          "Die Objektprüfung ergab Nettoaufwand. Du prüfst jetzt das Gesamtengagement:",
        deckungsgradData: {
          inputs: [
            { label: "Ø Cashflow letzte 3 Jahre", value: "CHF 250'000" },
            { label: "Nettoaufwand Objekt", value: "CHF 80'000" },
            { label: "Langfristige Verbindlichkeiten", value: "CHF 5'000'000" },
          ],
          calcLines: [
            "Nenner = Nettoaufwand + (1.5% × langfr. VB)",
            "       = 80'000 + (0.015 × 5'000'000)",
            "       = 80'000 + 75'000 = 155'000",
          ],
          resultLine: "Deckungsgrad = 250'000 / 155'000 = 1.61",
          isOk: true,
        },
        question: "Was ist dein Entscheid?",
        options: [
          { key: "A", text: "Nicht tragbar – bei CHF 5 Mio. langfristigen Verbindlichkeiten muss gemäss Eigenkapitalrichtlinie ein Mindesteigenkapital von 30% vorhanden sein. Ohne diesen Nachweis ist die Tragbarkeit ungeachtet des Deckungsgrads nicht gegeben." },
          {
            key: "B",
            text: "Deckungsgrad 1.61 – über Minimum von 1.2. Tragbarkeit gegeben.",
          },
          { key: "C", text: "ETP beantragen – Deckungsgrad 1.61 liegt zwar über dem Minimum, ist aber nicht ausreichend über der Grenze. Gemäss Kreditpolitik empfiehlt die Risikokontrolle bei Werten unter 1.5 stets eine Ausnahmebeantragung." },
          { key: "D", text: "Weitere Unterlagen anfordern – Deckungsgrad ist nur eine von mehreren Kennzahlen. Ohne detaillierte Liquiditätsplanung und Eigenkapitalquote der letzten drei Jahre kann keine abschliessende Beurteilung vorgenommen werden." },
        ],
        correct: "B",
        feedback:
          "Deckungsgrad 1.61 > 1.2 = Tragbarkeit gegeben. Obwohl Liegenschaft nicht selbsttragend, trägt die Unternehmung das Gesamtengagement.",
      },
      {
        id: "2.2",
        briefing: "Du prüfst das Gesamtengagement:",
        deckungsgradData: {
          inputs: [
            { label: "Ø Cashflow letzte 3 Jahre", value: "CHF 180'000" },
            { label: "Nettoaufwand Objekt", value: "CHF 90'000" },
            { label: "Langfristige Verbindlichkeiten", value: "CHF 6'000'000" },
          ],
          calcLines: [
            "Nenner = Nettoaufwand + (1.5% × langfr. VB)",
            "       = 90'000 + (0.015 × 6'000'000)",
            "       = 90'000 + 90'000 = 180'000",
          ],
          resultLine: "Deckungsgrad = 180'000 / 180'000 = 1.0",
          isOk: false,
        },
        question: "Was ist dein Entscheid?",
        options: [
          { key: "A", text: "Tragbar – CHF 180'000 Cashflow deckt den CHF 180'000 Aufwand genau. Ein Deckungsgrad von 1.0 entspricht einer ausgeglichenen Situation und liegt innerhalb der banküblichen Toleranz; eine Kreditvergabe mit engmaschiger Begleitung ist möglich." },
          {
            key: "B",
            text: "Deckungsgrad 1.0 – unter Minimum 1.2. Tragbarkeit nicht gegeben. ETP prüfen ob Ausnahme möglich.",
          },
          { key: "C", text: "Sofort ablehnen – Deckungsgrad unter 1.2 ist eine absolute Grenze. Auch bei ETP-Anträgen ist eine Unterschreitung von 1.0 ausgeschlossen, da kein Puffer für unerwartete Ausgaben besteht." },
          { key: "D", text: "Mehr Sicherheiten einfordern – durch zusätzliche Pfänder wie Grundpfänder oder Bürgschaften kann das Kreditrisiko auf ein akzeptables Niveau gesenkt werden. Bei ausreichenden Sicherheiten entfällt die Deckungsgradanforderung." },
        ],
        correct: "B",
        feedback:
          "Deckungsgrad 1.0 < 1.2 = Tragbarkeit nicht gegeben. Ablehnung oder ETP-Beantragung mit Begründung.",
      },
      {
        id: "2.3",
        briefing: "Du prüfst das Gesamtengagement:",
        deckungsgradData: {
          inputs: [
            { label: "Ø Cashflow letzte 3 Jahre", value: "CHF 214'200" },
            { label: "Nettoaufwand Objekt", value: "CHF 85'000" },
            { label: "Langfristige Verbindlichkeiten", value: "CHF 5'000'000" },
          ],
          calcLines: [
            "Nenner = Nettoaufwand + (1.5% × langfr. VB)",
            "       = 85'000 + (0.015 × 5'000'000)",
            "       = 85'000 + 75'000 = 160'000",
          ],
          resultLine: "Deckungsgrad = 214'200 / 160'000 = 1.34",
          isOk: true,
        },
        question: "Was ist dein Entscheid?",
        options: [
          { key: "A", text: "Knapp unter 1.2 – ablehnen: Der berechnete Wert vernachlässigt die obligatorische Risikoabzugsquote von 15%, die bei allen Gesamtengagements über CHF 3 Mio. abgezogen werden muss. Effektiver Deckungsgrad wäre 1.14." },
          {
            key: "B",
            text: "Deckungsgrad 1.34 – über 1.2. Tragbarkeit gegeben.",
          },
          { key: "C", text: "ETP beantragen – obwohl der Deckungsgrad über dem Minimum liegt, empfiehlt die interne Kreditpolitik bei Werten unter 1.5 eine Ausnahmebeantragung, um einen ausreichenden Sicherheitspuffer zu dokumentieren." },
          { key: "D", text: "Ein viertes Jahr Cashflow anfordern – die Jahreswerte zeigen starke Schwankungen. Mit einem vierten Jahr stabilisiert sich der Durchschnitt und erlaubt eine verlässlichere Tragbarkeitsbeurteilung." },
        ],
        correct: "B",
        feedback:
          "Deckungsgrad 1.34 > 1.2 = Tragbarkeit knapp aber klar gegeben. Immer genau rechnen – Grenzfälle entscheiden sich in den Dezimalstellen.",
      },
    ],
  },
  {
    id: "etp",
    title: "Belastungsgrenze & ETP",
    description: "Erkenne wann ein ETP angebracht ist und wie er begründet wird.",
    cases: [
      {
        id: "3.1",
        briefing:
          "Deckungsgrad = 1.05. Der Kunde ist seit 15 Jahren Stammkunde, sehr gute Zahlungshistorie, temporäre Umsatzdelle wegen Covid.",
        question: "Was empfiehlst du?",
        options: [
          { key: "A", text: "Sofort ablehnen – Deckungsgrad unter 1.2 ist eine absolute Grenze ohne Ausnahme. Selbst langjährige Stammkunden können nicht berücksichtigt werden, da die Kreditrichtlinie keinen Ermessensspielraum vorsieht." },
          { key: "B", text: "Direkt bewilligen – ein 15-jähriger Stammkunde mit einwandfreier Zahlungshistorie erfüllt gemäss internen Leitlinien die Voraussetzungen für eine Kreditbewilligung auch bei leicht reduziertem Deckungsgrad." },
          {
            key: "C",
            text: "ETP beantragen – Ausnahme begründen mit guter Zahlungshistorie und temporärer Situation. Kürzere Wiedervorlage setzen.",
          },
          { key: "D", text: "Zusätzliche Sicherheiten einfordern – durch weitere Grundpfänder oder eine Bürgschaft kann das ungenügende Deckungsverhältnis vollständig kompensiert werden. Damit entfällt die Notwendigkeit eines ETP." },
        ],
        correct: "C",
        feedback:
          "ETP ist genau für solche Fälle. Nicht automatisch ablehnen – sondern prüfen ob Ausnahme begründbar ist. ETP braucht: klare Begründung, Genehmigung höhere Stelle, kürzere Wiedervorlage.",
      },
      {
        id: "3.2",
        briefing:
          "Deckungsgrad = 1.08. Du musst ETP beantragen. Welche Begründung ist korrekt?",
        question: "Wähle die korrekte ETP-Begründung:",
        options: [
          { key: "A", text: "\"Kunde hat in 8 Jahren keine einzige Zahlung versäumt und das Kreditrisiko ist minimal – das reicht als Begründung. Persönliche Beurteilungen des Beraters sind bei ETPs als zulässige Qualitätsindikatoren ausdrücklich vorgesehen.\"" },
          {
            key: "B",
            text: "\"Deckungsgrad temporär unter 1.2 aufgrund Investitionsphase. Cashflow-Prognose zeigt Erholung auf 1.3 in 18 Monaten. Wiedervorlage in 12 Monaten.\"",
          },
          { key: "C", text: "\"Ausnahme aufgrund des strategischen Kundenwerts: Das Gesamtengagement übersteigt CHF 5 Mio., was den Kunden als 'Key Client' qualifiziert. Bei Key Clients ist ein ETP ohne weitere Sachbegründung intern zulässig.\"" },
          { key: "D", text: "\"Bewilligung auf Anfrage des Vorgesetzten – dieser übernimmt die Verantwortung und unterzeichnet die ETP-Vorlage als Genehmigungsinstanz. Damit ist die formelle Anforderung erfüllt und keine weitere Begründung nötig.\"" },
        ],
        correct: "B",
        feedback:
          "ETP Begründung muss enthalten: Grund für Unterschreitung, zeitlicher Horizont der Erholung, konkrete Wiedervorlage. Keine persönlichen Argumente – nur sachliche Fakten.",
      },
      {
        id: "3.3",
        briefing:
          "Deckungsgrad = 0.7. Neukunde, keine Zahlungshistorie, Branche mit hohem Ausfallrisiko.",
        question: "Was empfiehlst du?",
        options: [
          { key: "A", text: "ETP beantragen und auf die Branchenzugehörigkeit als mildernden Faktor hinweisen – Branchen mit saisonalem Umsatzmuster erhalten bei der Risikobewertung einen Puffer. Deckungsgrad 0.7 kann auf 1.1 adjustiert werden." },
          {
            key: "B",
            text: "Ablehnen – Deckungsgrad zu tief, keine Basis für ETP-Begründung.",
          },
          { key: "C", text: "Bewilligen mit substanziellen Zusatzsicherheiten – wenn der Kunde mindestens CHF 500'000 in Immobilien oder Wertschriften als Pfand hinterlegt, überwiegen die Sicherheiten das schwache Deckungsverhältnis bei weitem." },
          { key: "D", text: "Weitere Unterlagen anfordern: Businessplan, Branchenvergleichszahlen und Referenzschreiben des bisherigen Kreditgebers. Mit vollständigem Unterlagenset kann das Kreditkompetenzzentrum eine qualifiziertere Entscheidung treffen." },
        ],
        correct: "B",
        feedback:
          "ETP ist kein Freifahrtschein. Bei Deckungsgrad 0.7 und ohne positive Faktoren ist eine ETP-Begründung nicht haltbar. Hier muss abgelehnt werden.",
      },
    ],
  },
  {
    id: "gewerbe",
    title: "Selbstgenutzte Gewerbeliegenschaft",
    description: "Verstehe den Unterschied zur Prüfung von Renditeobjekten.",
    cases: [
      {
        id: "4.1",
        briefing:
          "Kunde betreibt eine Bäckerei im eigenen Gebäude. Er möchte das Gebäude mit CHF 500'000 belehnen.",
        question: "Wie prüfst du die Tragbarkeit?",
        options: [
          { key: "A", text: "Mieteinnahmen und Leerstandsquote prüfen – die Bäckerei verrechnet sich selbst intern eine Miete, was steuerlich als Ertrag gilt. Dieser kalkulatorische Mietzins ist die Grundlage für die Objekttragbarkeitsberechnung." },
          {
            key: "B",
            text: "Primär Bonität der Bäckerei prüfen – Cashflow, Eigenkapital, Stabilität. Kein Objektertrag weil selbst genutzt.",
          },
          { key: "C", text: "Gleich wie beim Renditeobjekt vorgehen – da die Bäckerei als Eigentümerin gleichzeitig Mieterin ist, kann die Marge zwischen marktüblichem Mietzins und Kosten als Objektertrag gerechnet werden." },
          { key: "D", text: "Nur den Gebäudewert und die Belehnungsquote prüfen – bei Gewerbeliegenschaften unter CHF 1 Mio. sieht die interne Kreditpolitik vor, dass der Verkehrswert allein ausschlaggebend ist. Cashflow-Prüfungen sind erst ab CHF 1 Mio. obligatorisch." },
        ],
        correct: "B",
        feedback:
          "Selbstgenutzte Gewerbeliegenschaft = kein externer Mieter = kein Objektertrag. Deshalb steht die Bonität des Kreditnehmers im Zentrum.",
      },
      {
        id: "4.2",
        briefing:
          "Du hast zwei Fälle:\nFall A: Bürogebäude vermietet an Dritte\nFall B: Lager selbst genutzt durch Firma",
        question: "Was ist der Unterschied in der Tragbarkeitsprüfung?",
        options: [
          { key: "A", text: "Kein Unterschied in der Praxis – sowohl beim vermieteten Bürogebäude als auch beim selbstgenutzten Lager steht der Immobilienwert im Vordergrund. Cashflow-Überlegungen sind nachrangig, solange der Belehnungswert korrekt berechnet wurde." },
          {
            key: "B",
            text: "Fall A: Objektertrag primär. Fall B: Kreditnehmer-Bonität primär.",
          },
          { key: "C", text: "Fall B ist einfacher – es müssen keine variablen Mieterträge kalkuliert werden. Stattdessen rechnen wir einen normierten Eigenmietansatz von 5% des Gebäudewertes als Ertrag – das ist schneller als die Analyse von Mietverträgen." },
          { key: "D", text: "Beide nach Objektertrag prüfen – der Unterschied ist nur buchhalterisch: Bei selbstgenutzten Gebäuden setzen wir einen kalkulatorischen Marktzins als Mietzins an. Der Prüfungsablauf ist identisch mit dem Renditeobjekt." },
        ],
        correct: "B",
        feedback:
          "Das ist ein klassischer Prüfungspunkt in der Abschlussprüfung. Renditeobjekt = Objektertrag zuerst. Selbstgenutzt = Kreditnehmer zuerst. Nie verwechseln!",
      },
    ],
  },
];

export function getSectionConfig(id: SectionId): TragbarkeitSectionConfig {
  return TRAGBARKEIT_SECTIONS.find((s) => s.id === id)!;
}
