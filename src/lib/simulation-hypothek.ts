import type { OptionKey, SimOption } from "./simulation-kontoeröffnung";

export type HypothekScoreCategory =
  | "beratungsqualitaet"
  | "fachkompetenz"
  | "kundenorientierung";

export interface HypothekSimStep {
  id: number;
  customerSpeech: string;
  options: SimOption[];
  correctKey: OptionKey;
  categories: HypothekScoreCategory[];
  hasCalculation?: boolean;
}

export interface HypothekScoreResult {
  beratungsqualitaet: number;
  fachkompetenz: number;
  kundenorientierung: number;
  overall: number;
}

export const HYPOTHEK_SIM_STEPS: HypothekSimStep[] = [
  {
    id: 2,
    customerSpeech:
      "Guten Tag! Wir freuen uns sehr – wir möchten endlich unser Traumhaus kaufen. Können wir uns eine Hypothek von CHF 1'200'000 leisten?",
    correctKey: "B",
    categories: ["beratungsqualitaet", "kundenorientierung"],
    options: [
      {
        key: "A",
        text: "Ja klar, kein Problem!",
        customerResponse: "Wirklich? Ohne etwas zu prüfen?",
        mood: "negative",
      },
      {
        key: "B",
        text: "Herzlich willkommen! Das freut mich. Lassen Sie uns gemeinsam Ihre Situation anschauen – ich rechne das für Sie durch.",
        customerResponse: "Super, wir vertrauen Ihnen voll!",
        mood: "positive",
      },
      {
        key: "C",
        text: "Das kommt drauf an.",
        customerResponse: "Das ist nicht sehr überzeugend...",
        mood: "neutral",
      },
      {
        key: "D",
        text: "Haben Sie Eigenkapital?",
        customerResponse: "Ja, aber wie viel brauchen wir eigentlich?",
        mood: "neutral",
      },
    ],
  },
  {
    id: 3,
    customerSpeech: "Wie viel Eigenkapital brauchen wir eigentlich?",
    correctKey: "B",
    categories: ["fachkompetenz"],
    options: [
      {
        key: "A",
        text: "So viel wie möglich.",
        customerResponse: "Das ist keine richtige Antwort...",
        mood: "neutral",
      },
      {
        key: "B",
        text: "Mindestens 20% des Kaufpreises – also CHF 240'000. Davon müssen mindestens 10% hartes Eigenkapital sein, also CHF 120'000 aus Erspartem oder Erbschaft.",
        customerResponse: "Aha! CHF 240'000 – das haben wir zum Glück!",
        mood: "positive",
      },
      {
        key: "C",
        text: "10% reicht aus.",
        customerResponse: "Sind Sie sicher? Das klingt zu wenig...",
        mood: "negative",
      },
      {
        key: "D",
        text: "Das spielt keine Rolle.",
        customerResponse: "Eigenkapital spielt keine Rolle? Das kann nicht stimmen!",
        mood: "negative",
      },
    ],
  },
  {
    id: 4,
    customerSpeech:
      "Wir haben CHF 60'000 auf unserem 3a Konto. Können wir das als Eigenkapital verwenden?",
    correctKey: "C",
    categories: ["fachkompetenz"],
    options: [
      {
        key: "A",
        text: "Nein, 3a darf nicht als Eigenkapital verwendet werden.",
        customerResponse: "Wirklich nicht? Das wäre sehr schade...",
        mood: "negative",
      },
      {
        key: "B",
        text: "Ja, komplett – kein Problem.",
        customerResponse: "Wirklich so einfach? Da bin ich mir nicht sicher...",
        mood: "negative",
      },
      {
        key: "C",
        text: "Ja, 3a kann als Eigenkapital angerechnet werden – maximal 10% des Kaufpreises, also CHF 120'000. Ihre CHF 60'000 sind vollständig anrechenbar.",
        customerResponse: "Ausgezeichnet! Das gibt uns mehr Spielraum.",
        mood: "positive",
      },
      {
        key: "D",
        text: "Nur als Verpfändung möglich.",
        customerResponse: "Was bedeutet Verpfändung genau? Das ist uns unklar.",
        mood: "neutral",
      },
    ],
  },
  {
    id: 5,
    customerSpeech:
      "Können wir uns das wirklich leisten? Was wenn die Zinsen steigen?",
    correctKey: "B",
    categories: ["fachkompetenz"],
    options: [
      {
        key: "A",
        text: "Die Zinsen bleiben tief, kein Problem.",
        customerResponse: "Das klingt nicht sehr professionell...",
        mood: "negative",
      },
      {
        key: "B",
        text: "Wir rechnen mit einem kalkulatorischen Zinssatz von 5% – das ist bewusst konservativ um Sie vor Zinssteigerungen zu schützen. Bei Ihrem Einkommen von CHF 168'000 prüfen wir ob die Gesamtkosten unter 33% liegen.",
        customerResponse: "Ah okay, das klingt sicher. Wie wird das genau berechnet?",
        mood: "positive",
      },
      {
        key: "C",
        text: "Zinsen sind momentan tief, schauen wir später.",
        customerResponse: "Das ist uns zu unverbindlich!",
        mood: "negative",
      },
      {
        key: "D",
        text: "Das ist schwer zu sagen.",
        customerResponse: "Das beruhigt uns nicht gerade...",
        mood: "negative",
      },
    ],
  },
  {
    id: 6,
    customerSpeech: "Können Sie das kurz für uns durchrechnen?",
    correctKey: "B",
    categories: ["fachkompetenz"],
    hasCalculation: true,
    options: [
      {
        key: "A",
        text: "Alles bestens – Sie können kaufen!",
        customerResponse: "Wirklich? Das überrascht uns nach der Rechnung...",
        mood: "negative",
      },
      {
        key: "B",
        text: "Leider ergibt die Rechnung 41.4% – das liegt über unserem Limit von 33%. Die Hypothek ist in dieser Konstellation nicht tragbar.",
        customerResponse: "Oh... was können wir tun?",
        mood: "neutral",
      },
      {
        key: "C",
        text: "Das ist knapp aber machbar.",
        customerResponse: "Knapp machbar? Wir wollen Sicherheit!",
        mood: "negative",
      },
      {
        key: "D",
        text: "Ich muss das nochmals prüfen.",
        customerResponse: "Nochmals prüfen? Können Sie das nicht jetzt berechnen?",
        mood: "neutral",
      },
    ],
  },
  {
    id: 7,
    customerSpeech: "Gibt es eine Lösung? Wir wollen dieses Haus unbedingt!",
    correctKey: "B",
    categories: ["beratungsqualitaet", "kundenorientierung"],
    options: [
      {
        key: "A",
        text: "Leider nein, Sie müssen aufgeben.",
        customerResponse: "Das kann doch nicht sein... gibt es wirklich nichts?",
        mood: "negative",
      },
      {
        key: "B",
        text: "Es gibt Möglichkeiten: mehr Eigenkapital einbringen um die Hypothek zu reduzieren, oder ein günstigeres Objekt suchen. Auch wenn Sarahs Pensum erhöht wird verbessert sich die Tragbarkeit.",
        customerResponse: "Okay das verstehen wir. Danke für die ehrliche Beratung.",
        mood: "positive",
      },
      {
        key: "C",
        text: "Wir machen eine Ausnahme für Sie.",
        customerResponse: "Wirklich? Ist das erlaubt?",
        mood: "neutral",
      },
      {
        key: "D",
        text: "Versuchen Sie es bei einer anderen Bank.",
        customerResponse: "Das ist keine Beratung – das ist eine Absage!",
        mood: "negative",
      },
    ],
  },
  {
    id: 8,
    customerSpeech: "Was ist eigentlich Amortisation genau?",
    correctKey: "B",
    categories: ["fachkompetenz"],
    options: [
      {
        key: "A",
        text: "Das ist die monatliche Rate.",
        customerResponse: "Das klingt nicht ganz richtig...",
        mood: "neutral",
      },
      {
        key: "B",
        text: "Amortisation bedeutet Rückzahlung der Hypothek. Die 2. Hypothek (über 65% Belehnung) muss innert 15 Jahren zurückbezahlt werden – direkt oder indirekt via 3a.",
        customerResponse: "Ah verstanden! Direkte oder indirekte Amortisation – macht Sinn.",
        mood: "positive",
      },
      {
        key: "C",
        text: "Das müssen Sie nicht zahlen.",
        customerResponse: "Wirklich nicht? Das kann nicht stimmen!",
        mood: "negative",
      },
      {
        key: "D",
        text: "Das erklärt Ihnen die Buchhaltung.",
        customerResponse: "Die Buchhaltung? Das sollten Sie wissen!",
        mood: "negative",
      },
    ],
  },
  {
    id: 9,
    customerSpeech: "Was wenn das Haus weniger wert ist als der Kaufpreis?",
    correctKey: "B",
    categories: ["fachkompetenz"],
    options: [
      {
        key: "A",
        text: "Dann zahlen wir den Kaufpreis.",
        customerResponse: "Das klingt nicht korrekt...",
        mood: "negative",
      },
      {
        key: "B",
        text: "Gute Frage! Die Belehnungsbasis ist immer der niedrigere Wert von Kaufpreis oder Verkehrswert. Wenn das Haus nur CHF 1'100'000 wert ist, rechnen wir mit diesem Wert – nicht mit CHF 1'200'000.",
        customerResponse: "Das wussten wir nicht – sehr wichtig zu wissen!",
        mood: "positive",
      },
      {
        key: "C",
        text: "Das spielt keine Rolle.",
        customerResponse: "Das spielt keine Rolle? Das würde uns teuer zu stehen kommen!",
        mood: "negative",
      },
      {
        key: "D",
        text: "Wir nehmen immer den Kaufpreis.",
        customerResponse: "Immer den Kaufpreis? Auch wenn er überhöht ist?",
        mood: "negative",
      },
    ],
  },
  {
    id: 10,
    customerSpeech:
      "Vielen Dank für das ausführliche Gespräch. Was sind die nächsten Schritte?",
    correctKey: "B",
    categories: ["beratungsqualitaet", "kundenorientierung"],
    options: [
      {
        key: "A",
        text: "Ich schicke Ihnen etwas per Post.",
        customerResponse: "Per Post? Das dauert zu lange...",
        mood: "neutral",
      },
      {
        key: "B",
        text: "Ich empfehle zunächst mehr Eigenkapital anzusparen. Sobald Sie bereit sind, benötige ich: Lohnausweise, Steuererklärung, PK-Ausweis, 3a Kontoauszug und Objektunterlagen. Dann erstellen wir einen offiziellen Antrag.",
        customerResponse: "Perfekt, das ist sehr klar! Wir freuen uns auf die weitere Zusammenarbeit.",
        mood: "positive",
      },
      {
        key: "C",
        text: "Kommen Sie nächsten Monat wieder.",
        customerResponse: "Nächsten Monat? Ohne Handlungsplan?",
        mood: "negative",
      },
      {
        key: "D",
        text: "Das regelt die Rechtsabteilung.",
        customerResponse: "Die Rechtsabteilung? Wir dachten Sie sind unser Berater!",
        mood: "negative",
      },
    ],
  },
];

export function calculateHypothekScores(
  answers: Record<number, OptionKey>
): HypothekScoreResult {
  function categoryScore(cats: HypothekScoreCategory[]): number {
    const relevant = HYPOTHEK_SIM_STEPS.filter((s) =>
      s.categories.some((c) => cats.includes(c))
    );
    if (relevant.length === 0) return 0;
    const correct = relevant.filter((s) => answers[s.id] === s.correctKey).length;
    return Math.round((correct / relevant.length) * 100);
  }

  const beratungsqualitaet = categoryScore(["beratungsqualitaet"]);
  const fachkompetenz = categoryScore(["fachkompetenz"]);
  const kundenorientierung = categoryScore(["kundenorientierung"]);
  const overall = Math.round((beratungsqualitaet + fachkompetenz + kundenorientierung) / 3);

  return { beratungsqualitaet, fachkompetenz, kundenorientierung, overall };
}
