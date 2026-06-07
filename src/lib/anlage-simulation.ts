export type Mood = "positive" | "neutral" | "negative";

export interface AnlageSimOption {
  key: string;
  text: string;
}

export interface AnlageSimStep {
  id: string;
  topic: string;
  customerSpeech: string;
  mood: Mood;
  options: AnlageSimOption[];
  correct: string;
  feedback: string;
  tip?: string;
}

export const CUSTOMER = {
  name: "Andreas Keller",
  initials: "AK",
  subtitle: "Erbschaft CHF 80'000 – Erstberatung Anlage",
};

export const ANLAGE_SIM_STEPS: AnlageSimStep[] = [
  {
    id: "1",
    topic: "Begrüssung & Einstieg",
    customerSpeech:
      "Guten Tag. Mein Name ist Andreas Keller. Ich habe letzten Monat CHF 80'000 geerbt und möchte das Geld sinnvoll anlegen. Ein Kollege sagte mir, ich soll einfach alles in Aktien stecken – die bringen langfristig am meisten.",
    mood: "neutral",
    options: [
      {
        key: "A",
        text: "«Super Idee! Aktien sind langfristig unschlagbar. Sollen wir gleich ein Depot eröffnen?»",
      },
      {
        key: "B",
        text: "«Gerne helfe ich Ihnen. Bevor wir über Produkte sprechen: Was sind Ihre persönlichen Ziele mit dem Geld?»",
      },
      {
        key: "C",
        text: "«Das ist kompliziert. Ich müsste Ihnen erst verschiedene Produkte vorstellen.»",
      },
    ],
    correct: "B",
    feedback:
      "Richtig! Vor jeder Produktempfehlung: Ziele, Situation und Bedürfnisse des Kunden klären. FIDLEG Art. 12 verpflichtet zur Eignungsprüfung. Direkt zu Produkten springen ohne Profilierung wäre eine Pflichtverletzung.",
    tip: "Im Beratungsgespräch beginnt man mit Fragen – nie mit Antworten.",
  },
  {
    id: "2",
    topic: "Anlageziele ermitteln",
    customerSpeech:
      "Ich möchte, dass das Geld nicht einfach auf dem Konto liegt und von der Inflation gefressen wird. Ich habe noch CHF 30'000 als Reserve – die brauche ich nicht anzulegen. Die CHF 80'000 könnte ich also langfristig investieren.",
    mood: "neutral",
    options: [
      {
        key: "A",
        text: "«Verstanden. Der Horizont ist also langfristig. Wie viel Schwankung könnten Sie sich dabei vorstellen?»",
      },
      {
        key: "B",
        text: "«In diesem Fall empfehle ich sofort Obligationen – langfristig und sicher.»",
      },
      {
        key: "C",
        text: "«CHF 30'000 Reserve ist gut. Investieren wir doch auch diese – dann haben Sie mehr Ertrag.»",
      },
    ],
    correct: "A",
    feedback:
      "Perfekt! Aktiv zuhören, Anlagehorizont dokumentieren, und strukturiert zur Risikodimension überleiten. Das Gespräch bleibt auf Profil-Ermittlung fokussiert – kein voreiliger Produktvorschlag.",
    tip: "Anlagehorizont ist ein Kernparameter des Anlegerprofils. Jetzt dokumentieren.",
  },
  {
    id: "3",
    topic: "Risikobereitschaft besprechen",
    customerSpeech:
      "Ich hatte vor 10 Jahren schon mal Aktien. Als die Finanzkrise kam, habe ich verkauft und fast 30% Verlust gemacht. Das war sehr unangenehm. Ich bin ehrlich gesagt nicht sicher, ob ich das wieder erleben will.",
    mood: "negative",
    options: [
      {
        key: "A",
        text: "«Das war ein Fehler damals – hätten Sie gehalten, wäre alles gut gegangen. Wir machen trotzdem Aktien.»",
      },
      {
        key: "B",
        text: "«Ich verstehe. Diese Erfahrung zeigt, dass Verluste Sie stark belasten – wir nennen das begrenzte Risikobereitschaft. Das notieren wir im Profil.»",
      },
      {
        key: "C",
        text: "«Dann lassen wir Aktien ganz weg und nehmen ein Sparkonto.»",
      },
    ],
    correct: "B",
    feedback:
      "Korrekt! Emotionale Reaktion auf Verluste = Risikobereitschaft (subjektiv). Verkauf in Krise = begrenzte Risikobereitschaft. Das muss im Anlegerprofil dokumentiert werden. Option A ignoriert das psychologische Risiko – gefährlich für den Kunden.",
    tip: "Risikobereitschaft ≠ Risikofähigkeit. Beide müssen getrennt erfasst und dokumentiert werden.",
  },
  {
    id: "4",
    topic: "Liquidität und Zugang",
    customerSpeech:
      "Kann ich kurzfristig auf das Geld zugreifen, wenn etwas Unvorhergesehenes passiert? Das macht mir etwas Sorgen.",
    mood: "neutral",
    options: [
      {
        key: "A",
        text: "«Nein – einmal investiert, ist das Geld für mehrere Jahre gebunden.»",
      },
      {
        key: "B",
        text: "«Fonds sind grundsätzlich täglich handelbar. Kurzfristiger Ausstieg in schlechten Märkten kann aber Verluste realisieren. Ihre CHF 30'000 Reserve bleibt immer liquide – genau dafür ist sie da.»",
      },
      {
        key: "C",
        text: "«Das müssen Sie selbst entscheiden – ich kann das nicht beurteilen.»",
      },
    ],
    correct: "B",
    feedback:
      "Richtig! UCITS-Fonds sind täglich handelbar, aber: auf das Liquiditätsrisiko bei Krisenausstieg hinweisen und die Rolle der CHF 30'000 Reserve klar erklären. Korrekte, vollständige Information schützt den Kunden und die Bank.",
    tip: "Liquiditätsplanung gehört zum Anlegerprofil. Reserve-Faustregel: 3–6 Monatsausgaben.",
  },
  {
    id: "5",
    topic: "Produktempfehlung",
    customerSpeech:
      "Okay, ich verstehe jetzt viel besser, worauf es ankommt. Was empfehlen Sie mir konkret?",
    mood: "positive",
    options: [
      {
        key: "A",
        text: "«Aufgrund Ihres Profils – langer Horizont, begrenzte Risikobereitschaft, Ziel Inflationsschutz plus Wachstum – empfehle ich eine konservativ-ausgewogene Strategie: ca. 30% Aktien, 60% Obligationen, 10% Liquidität.»",
      },
      {
        key: "B",
        text: "«Ich empfehle 100% Aktien – der lange Horizont macht das vertretbar.»",
      },
      {
        key: "C",
        text: "«Unser beliebtester Fonds passt für alle – nehmen Sie den.»",
      },
    ],
    correct: "A",
    feedback:
      "Exzellent! Die Empfehlung basiert direkt auf dem Profil: langer Horizont + begrenzte Risikobereitschaft → konservativ-ausgewogen. 100% Aktien ignoriert die psychologische Verlustangst. Option C ist keine individualisierte Beratung – klare Pflichtverletzung nach FIDLEG.",
    tip: "Empfehlung immer mit dem Anlegerprofil begründen und schriftlich dokumentieren.",
  },
  {
    id: "6",
    topic: "Abschluss und Dokumentation",
    customerSpeech:
      "Das klingt sehr gut! Ich bin einverstanden. Was muss jetzt noch passieren? Ich würde gerne heute noch starten.",
    mood: "positive",
    options: [
      {
        key: "A",
        text: "«Dann starten wir gleich – ich erkläre Ihnen die Unterlagen nach dem Kauf.»",
      },
      {
        key: "B",
        text: "«Zuerst: Anlegerprofil unterschreiben, KID für jeden Fonds abgeben, Risikobroschüre quittieren, Anlagerichtlinien bestätigen – dann erteilen wir den Auftrag.»",
      },
      {
        key: "C",
        text: "«Ihr mündliches Einverständnis reicht – wir erledigen die Formulare später per E-Mail.»",
      },
    ],
    correct: "B",
    feedback:
      "Korrekte Prozessführung! Vor jedem Kauf zwingend: (1) Anlegerprofil unterschrieben, (2) KID für jeden Fonds abgegeben, (3) Risikobroschüre quittiert, (4) Anlagerichtlinien unterschrieben. Erst dann den Auftrag erteilen. Mündliches Einverständnis allein reicht rechtlich nicht – Haftungsrisiko für die Bank!",
    tip: "Keine Abkürzungen bei der Dokumentation. Sie schützt den Kunden und die Bank gleichermassen.",
  },
];
