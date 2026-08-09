import { type LückentextCase } from "./lückentext";
import { type OffeneFrageCase } from "./offene-frage";
import { OF_CASES_CREDIT_OPERATIONS } from "./offene-fragen";

export type OptionKey = "A" | "B" | "C" | "D";
export type LevelNum = 1 | 2 | 3;

export interface CreditOpsOption {
  key: OptionKey;
  text: string;
}

export type CalcRow =
  | { type: "data"; label: string; value: string }
  | { type: "divider" }
  | { type: "total"; label: string; value: string };

export interface CalcSection {
  heading?: string;
  rows: CalcRow[];
  verdict?: { text: string; ok: boolean };
}

export interface CreditOpsScenario {
  id: string;
  level: LevelNum;
  situation: string;
  calculator?: CalcSection[];
  checklist?: { label: string; ok: boolean }[];
  question: string;
  options: CreditOpsOption[];
  correct: OptionKey;
  feedback: string;
  concepts?: string[];
}

export interface CreditOpsLevelConfig {
  level: LevelNum;
  label: string;
  badgeVariant: "green" | "orange" | "red";
  scenarios: (CreditOpsScenario | LückentextCase | OffeneFrageCase)[];
}

export const CO_LEVELS: CreditOpsLevelConfig[] = [
  {
    level: 1,
    label: "Einsteiger",
    badgeVariant: "green",
    scenarios: [
      {
        id: "1.1",
        level: 1,
        situation:
          "Hypothekarkredit bewilligt. Grundpfand noch nicht eingetragen. Kunde fragt wann das Geld kommt.",
        question: "Wann kann ausgezahlt werden?",
        options: [
          { key: "A", text: "Erst wenn Grundpfand eingetragen, alle Dokumente unterschrieben und Versicherungsnachweis vorliegt." },
          {
            key: "B",
            text: "Sofort – mit der unterzeichneten Kreditvereinbarung ist die Bank rechtlich zur Auszahlung verpflichtet. Das Grundpfand kann noch ausstehend sein, wenn der Notar eine schriftliche Auszahlungsbestätigung ausgestellt hat.",
          },
          { key: "C", text: "In drei Werktagen automatisch – die interne Kreditschnittstelle löst nach Bewilligung eine automatische Auszahlung aus, sobald der Kreditvertrag im System als 'unterschrieben' erfasst ist. Das Grundpfand wird dabei nicht geprüft." },
          { key: "D", text: "Das entscheidet der Kundenberater gemeinsam mit dem Kunden – die Bewilligung gibt nur Betrag und Konditionen vor, nicht den Auszahlungszeitpunkt. Der Berater hat hier volle Handlungsfreiheit." },
        ],
        correct: "A",
        feedback:
          "Auszahlung erst wenn alle Sicherheiten bestellt sind. Grundpfand muss im Grundbuch eingetragen sein bevor ausgezahlt wird.",
      },
      {
        id: "1.2",
        level: 1,
        situation:
          "Du prüfst Kreditdossier vor Auszahlung. Kreditvertrag ist vorhanden aber nur vom Kunden unterschrieben – Bankunterschrift fehlt.",
        question: "Was machst du?",
        options: [
          { key: "A", text: "Auszahlen – Kunde hat unterschrieben" },
          {
            key: "B",
            text: "Nicht auszahlen – Kreditvertrag muss von beiden Parteien unterschrieben sein.",
          },
          { key: "C", text: "Kollegen fragen" },
          { key: "D", text: "Nachträglich unterschreiben lassen und sofort auszahlen" },
        ],
        correct: "B",
        feedback:
          "Kreditvertrag wird erst rechtsgültig wenn beide Parteien unterschrieben haben. Auszahlung ohne vollständige Unterschriften ist nicht möglich.",
      },
      {
        id: "1.3",
        level: 1,
        situation: "Kredit wurde ausgezahlt. Wann muss eine Wiedervorlage gesetzt werden?",
        question: "Wann setzt du die Wiedervorlage?",
        options: [
          { key: "A", text: "Keine Wiedervorlage nach vollständiger Auszahlung nötig – während der Laufzeit überwacht das Kernbankensystem automatisch alle Zahlungseingänge und sendet Alarmmeldungen, wenn Raten ausbleiben." },
          { key: "B", text: "Wiedervorlage nur bei Problemen oder ETP-Situationen setzen – bei laufenden Hypotheken mit regelmässiger Zinszahlung reicht die jährliche automatische Zinsanpassungsüberprüfung durch das System." },
          {
            key: "C",
            text: "Bei jeder Kreditgewährung – regelmässige Überprüfung der Bonität und Sicherheiten.",
          },
          { key: "D", text: "Wiedervorlage nach 10 Jahren bei Wechsel in eine neue Festzinsperiode – in der Zwischenzeit übernimmt das interne Rating-Überwachungssystem die laufende Bonitätsbeurteilung automatisch." },
        ],
        correct: "C",
        feedback:
          "Wiedervorlage ist Pflicht bei jedem Kredit. Regelmässige Überprüfung der Bonität, Sicherheiten und Kundensituation. Bei ETP-Fällen ist die Wiedervorlage kürzer.",
      },
      {
        id: "1.4",
        level: 1,
        situation:
          "Kunde möchte CHF 25'000 Konsumkredit für ein Occasionsauto. Er hat eine Festanstellung und fragt: «Wann bekomme ich das Geld?»",
        question: "Was muss zwingend vor Auszahlung geprüft werden?",
        options: [
          { key: "A", text: "Aktuelle Lohnabrechnung und Selbstauskunft reichen – bei Konsumkrediten unter CHF 30'000 ist gemäss KKG ein vereinfachtes Prüfverfahren zulässig." },
          {
            key: "B",
            text: "Lohnbescheinigung des Arbeitgebers und unterschriebene Selbstdeklaration reichen aus. ZEK-Abfrage liegt gemäss KKG im Ermessen der Bank.",
          },
          { key: "C", text: "Lohnausweise und ZEK-Abfrage genügen. Bestehende Kreditverpflichtungen müssen nur eingerechnet werden, wenn der Antragsbetrag CHF 30'000 übersteigt." },
          { key: "D", text: "Kreditfähigkeitsprüfung gemäss KKG: Lohnausweise (mind. 3 Monate), Betreibungsregisterauszug, alle bestehenden Kreditverpflichtungen einrechnen. Kredit nur wenn nachweislich tragbar." },
        ],
        correct: "D",
        feedback:
          "KKG Art. 22: Kreditfähigkeitsprüfung ist gesetzlich zwingend vor jedem Konsumkreditvertrag. Lohnausweise (mind. 3 Monate), Betreibungsregisterauszug, alle bestehenden Verbindlichkeiten einbeziehen. Ohne Prüfung ist der Kreditvertrag nichtig (KKG Art. 15) – die Bank trägt dann das volle Risiko.",
      },
    ],
  },
  {
    level: 2,
    label: "Fortgeschritten",
    badgeVariant: "orange",
    scenarios: [
      {
        type: "lückentext",
        id: "2.1",
        level: 2,
        briefing:
          "Hypothek CHF 700'000 auf Objekt Verkehrswert CHF 900'000. Berechne den Blankoanteil.",
        question:
          "Die 1. Hypothek deckt bis zu ___ % des Verkehrswertes.",
        answer: "65",
        unit: "%",
        feedback:
          "Alles über 65% Belehnung ist 2. Hypothek = Blankoanteil. Dieser Blankoanteil muss innert 15 Jahren zurückbezahlt werden – direkt oder indirekt via 3a.",
      },
      {
        id: "2.2",
        level: 2,
        situation:
          "Firmenkredit CHF 200'000. Als Sicherheit wurde eine Bürgschaft des Inhabers vereinbart. Du findest: Bürgschaftsvertrag ist nicht unterschrieben.",
        question: "Was machst du?",
        options: [
          { key: "A", text: "Auszahlen – mündliche Zusage reicht" },
          {
            key: "B",
            text: "Nicht auszahlen – Bürgschaft muss schriftlich und unterschrieben vorliegen bevor ausgezahlt wird.",
          },
          { key: "C", text: "Teilauszahlung CHF 100'000" },
          { key: "D", text: "Ohne Bürgschaft auszahlen" },
        ],
        correct: "B",
        feedback:
          "Sicherheiten müssen vollständig bestellt sein vor Auszahlung. Bürgschaft ohne Unterschrift ist rechtlich nicht gültig.",
      },
      {
        id: "2.3",
        level: 2,
        situation:
          "Hypothek CHF 800'000. EK CHF 200'000 (25%). Kunde sagt EK ist vorhanden aber du siehst keinen Nachweis im Dossier.",
        question: "Was machst du?",
        options: [
          { key: "A", text: "Vertrauen – Kunde sagt es ist da" },
          {
            key: "B",
            text: "50% auszahlen",
          },
          { key: "C", text: "Auszahlen und später prüfen" },
          { key: "D", text: "Nicht auszahlen – Eigenmittel müssen vor Auszahlung nachgewiesen sein (Kontoauszug, Depotauszug etc.)." },
        ],
        correct: "D",
        feedback:
          "Eigenmittel müssen vor Auszahlung belegt sein. Kontoauszug oder Depotauszug als Nachweis. Ohne Nachweis keine Auszahlung – egal was der Kunde sagt.",
      },
      {
        id: "2.4",
        level: 2,
        situation:
          "KMU-Inhaber beantragt CHF 150'000 Betriebskredit. Er sitzt vor dir und sagt: «Wir laufen gut – letztes Jahr 10% Wachstum.»",
        question: "Welche Unterlagen verlangst du zwingend?",
        options: [
          { key: "A", text: "Jahresrechnungen der letzten 2 Jahre, HR-Auszug, Betreibungsregister (Firma und Inhaber), aktuelle Liquiditätsplanung. Eigenkapitalquote und operativer Cashflow aus Zahlen ableiten." },
          {
            key: "B",
            text: "Selbstauskunft des Inhabers und aktuelle Kontoauszüge reichen als Basis – bei Betriebskrediten unter CHF 250'000 ist gemäss vereinfachtem KMU-Kreditverfahren keine vollständige Jahresrechnung erforderlich.",
          },
          { key: "C", text: "HR-Auszug und Personalausweis des Inhabers – damit ist die Zeichnungsberechtigung eindeutig nachgewiesen, was die primäre rechtliche Voraussetzung für Kredite an juristische Personen darstellt. Jahresrechnungen können als Nachauflage nach sechs Monaten eingereicht werden." },
          { key: "D", text: "Businessplan und Wachstumsprognose reichen als Kreditgrundlage – bei wachstumsstarken KMUs prüfen wir primär die Zukunftsperspektive. Für Betriebskredite bis CHF 250'000 ist das intern so geregelt." },
        ],
        correct: "A",
        feedback:
          "Firmenkredit: Jahresrechnungen (mind. 2 Jahre) für Trendanalyse, HR-Auszug für Zeichnungsberechtigung, Betreibungsregister Firma und Inhaber (bei Solidarhaftung), Liquiditätsplanung. Eigenkapitalquote >20% und positiver operativer Cashflow sind entscheidend – Wachstumsversprechen ersetzen keine Zahlen.",
      },
      {
        id: "2.5",
        level: 2,
        situation:
          "Kunde besitzt ein Wertschriftendepot mit Aktien im Wert von CHF 200'000. Er möchte einen Lombardkredit von CHF 150'000.",
        question: "Was stellst du fest?",
        options: [
          { key: "A", text: "Kein Problem – das Depot übersteigt den Kreditbetrag und gilt als vollständige Deckung. Aktienportfolios werden standardmässig zu 100% des aktuellen Marktwertes beliehen, da sie jederzeit liquidiert werden können." },
          {
            key: "B",
            text: "Das Depot muss vor Kreditgewährung vollständig liquidiert werden – erst wenn das Kapital auf dem Konto liegt, kann ein gesicherter Kontokorrentkredit eingerichtet werden. Das Depot selbst kann nicht als Pfand hinterlegt werden.",
          },
          { key: "C", text: "Lombardkredite werden nach dem 1:1-Prinzip gewährt – CHF 200'000 Depot entspricht CHF 200'000 Kreditlimit. Ein Pfandvertrag ist bei Lombardkrediten nicht gesetzlich vorgeschrieben; die Kreditvereinbarung genügt." },
          { key: "D", text: "Belehnungswert Aktien max. 50–60% des Marktwertes = CHF 100'000–120'000. CHF 150'000 übersteigt den Belehnungswert. Pfandvertrag zwingend. Bei Kursrückgang droht Margin Call." },
        ],
        correct: "D",
        feedback:
          "Belehnungswert abhängig von Anlageklasse: Aktien 50–60%, Obligationen 70–80%, Geldmarktfonds bis 90%. CHF 150'000 auf CHF 200'000 Aktien = 75% Belehnung – zu hoch. Pfandvertrag und Verpfändungsformular zwingend. Bei Kursrückgang unter Pfandwert: Margin Call – Kunde muss Zusatzsicherheiten stellen oder Kredit reduzieren.",
      },
      {
        id: "2.6",
        level: 2,
        situation:
          "Hypothekarkunde hat zwei aufeinanderfolgende Zinsraten nicht bezahlt. Gesamtrückstand CHF 4'500. Kein Kontakt seit 6 Wochen trotz Mahnschreiben.",
        question: "Was sind die nächsten Schritte?",
        options: [
          { key: "A", text: "Einschreibebrief mit letzter Frist, Betreibung einleiten, Berater und Credit Office informieren. Jeden Schritt lückenlos dokumentieren." },
          {
            key: "B",
            text: "Abwarten – vielleicht zahlt er noch von selbst",
          },
          { key: "C", text: "Nochmals ein einfaches Mahnschreiben senden" },
          { key: "D", text: "Kredit sofort kündigen ohne weitere Schritte" },
        ],
        correct: "A",
        feedback:
          "Mahnprozess bei Verzug: 1. Mahnschreiben (erfolgt), 2. Einschreibebrief mit letzter Zahlungsfrist, 3. Betreibung einleiten, 4. Kreditkündigung (nur als letztes Mittel nach Eskalation). Lückenlose Dokumentation jedes Schritts ist zwingend – Beweissicherung für allfällige Gerichtsverfahren.",
      },
      {
        id: "2.7",
        level: 2,
        situation:
          "Einzelunternehmer Max Huber (52) kauft eine Gewerbeliegenschaft für CHF 1'200'000. Er beantragt eine Hypothek von CHF 800'000 (Belehnung 67%).",
        question: "Was stellst du fest?",
        options: [
          { key: "A", text: "Alles in Ordnung – 67% ist unter 80%" },
          {
            key: "B",
            text: "67% Belehnung ist bei Gewerbe normal und zulässig",
          },
          { key: "C", text: "Nur die FATCA-Abklärung ist hier relevant" },
          { key: "D", text: "Belehnung 67% überschreitet Maximalbelehnung bei Gewerbeliegenschaften (60–65%). Ausserdem: Einzelunternehmer = natürliche Person – FATCA-Eigenerklärung zwingend." },
        ],
        correct: "D",
        feedback:
          "Gewerbeliegenschaften: Maximalbelehnung 60–65% (deutlich tiefer als Eigenheim mit 80%). CHF 800'000 / CHF 1'200'000 = 67% – zu hoch, ETP oder Ablehnung nötig. Einzelunternehmer gilt rechtlich als natürliche Person: FATCA-Eigenerklärung zwingend bei jeder Kontoverbindung.",
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
        situation: "Du prüfst Auszahlung Hypothek CHF 1'200'000. Checkliste:",
        checklist: [
          { label: "Kreditvertrag unterschrieben", ok: true },
          { label: "Grundpfand eingetragen", ok: true },
          { label: "Versicherungsnachweis", ok: false },
          { label: "Eigenmittel nachgewiesen", ok: true },
          { label: "Wiedervorlage gesetzt", ok: false },
        ],
        question: "Was machst du?",
        options: [
          { key: "A", text: "Auszahlen – das meiste ist da" },
          {
            key: "B",
            text: "Nicht auszahlen – 2 Punkte fehlen: Versicherungsnachweis und Wiedervorlage müssen vor Auszahlung erledigt sein.",
          },
          { key: "C", text: "Teilauszahlung" },
          { key: "D", text: "Auszahlen und fehlende Unterlagen als Nachauflage erfassen – der Versicherungsnachweis kann innerhalb von 30 Tagen nachgereicht werden, die Wiedervorlage gilt als gesetzt." },
        ],
        correct: "B",
        feedback:
          "Alle Auszahlungsvoraussetzungen müssen erfüllt sein – keine Ausnahmen. Versicherungsnachweis und Wiedervorlage nachholen, dann auszahlen.",
      },
      {
        id: "3.2",
        level: 3,
        situation:
          "Kredit wurde als ETP bewilligt. Normaler Kredit hat Wiedervorlage 2 Jahre. Was gilt beim ETP?",
        question: "Welche Wiedervorlage gilt für ETP?",
        options: [
          { key: "A", text: "Gleich wie normaler Kredit" },
          { key: "B", text: "Keine Wiedervorlage nötig" },
          {
            key: "C",
            text: "Kürzere Wiedervorlage – ETP ist Ausnahmefall und muss häufiger überprüft werden.",
          },
          { key: "D", text: "5 Jahre Wiedervorlage" },
        ],
        correct: "C",
        feedback:
          "ETP = Regelverstoss mit Begründung. Deshalb kürzere Wiedervorlage als normal. Bank muss häufiger prüfen ob Situation sich verbessert hat.",
      },
      {
        id: "3.3",
        level: 3,
        situation:
          "Bank hat 1. Grundpfand CHF 500'000 und 2. Grundpfand CHF 200'000. Objekt wird für CHF 600'000 verkauft. Wie viel erhält die Bank?",
        question: "Wie viel erhält die Bank aus dem Verkauf?",
        options: [
          { key: "A", text: "CHF 700'000 – voller Betrag" },
          {
            key: "B",
            text: "CHF 600'000 – 1. Grundpfand wird voll bedient (CHF 500'000), 2. Grundpfand nur teilweise (CHF 100'000).",
          },
          { key: "C", text: "CHF 350'000 – je 50%" },
          { key: "D", text: "Nur 1. Grundpfand CHF 500'000" },
        ],
        correct: "B",
        feedback:
          "Rangfolge ist entscheidend. 1. Grundpfand wird zuerst bedient. CHF 500'000 für 1. Pfand, restliche CHF 100'000 für 2. Pfand. CHF 100'000 der 2. Hypothek sind ungedeckt.",
      },
      {
        id: "3.4",
        level: 3,
        situation:
          "Jungunternehmer (28) hat ein Tech-Startup gegründet. Jahresumsatz: CHF 0 (Gründungsphase, 6 Monate alt). Er beantragt CHF 100'000 Betriebskredit, ohne Sicherheiten und ohne Jahresrechnung.",
        question: "Was machst du?",
        options: [
          { key: "A", text: "Kredit in dieser Form nicht möglich: keine Jahresrechnung, keine Sicherheiten. Alternativen aufzeigen: Bürgschaftsgenossenschaft BG Mitte, Innosuisse-Förderung, Crowdfunding, Eigenkapital-Runde. Kreditentscheid möglich sobald Jahresrechnung und Sicherheiten vorliegen." },
          {
            key: "B",
            text: "Kredit grundsätzlich prüfen – Businessplan und Gründerprofil reichen als Basis. Jahresrechnungen kann der Kunde nach 12 Monaten nachreichen, Sicherheiten sind bei überzeugender Idee optional.",
          },
          { key: "C", text: "Privatbürgschaft des Vaters als Hauptsicherheit aufnehmen – damit ist das Risiko ausreichend abgedeckt und der Kredit kann ohne weitere Unterlagen bewilligt werden." },
          { key: "D", text: "Kleinstkredit CHF 10'000 sofort gewähren, Laufzeit 36 Monate. Sobald erste Jahresrechnung vorliegt, Kredit auf den beantragten Betrag aufstocken." },
        ],
        correct: "A",
        feedback:
          "Ohne Jahresrechnung und ohne Sicherheiten ist ein Bankkredit banküblich nicht möglich – Kreditprüfung erfordert belegbare Finanzdaten. Gute Praxis: Alternativen aufzeigen (Bürgschaftsgenossenschaft BG Mitte, Innosuisse, Crowdfunding, Business Angels). Den Jungunternehmer fair behandeln und mit Perspektive abweisen ist besser als eine Kreditvergabe ohne Grundlage.",
      },
    ],
  },
];

OF_CASES_CREDIT_OPERATIONS.forEach((c) => {
  CO_LEVELS.find((l) => l.level === c.level)!.scenarios.push(c);
});
