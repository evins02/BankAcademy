export type MoodLevel = "positive" | "neutral" | "negative";
export type OptionKey = "A" | "B" | "C" | "D";
export type ScoreCategory = "gespraechsfuehrung" | "fachkompetenz" | "vollstaendigkeit";

export interface SimOption {
  key: OptionKey;
  text: string;
  customerResponse: string;
  mood: MoodLevel;
}

export interface SimStep {
  id: number;
  customerSpeech: string;
  options: SimOption[];
  correctKey: OptionKey;
  categories: ScoreCategory[];
}

export interface ScoreResult {
  gespraechsfuehrung: number;
  fachkompetenz: number;
  vollstaendigkeit: number;
  overall: number;
}

export const SIM_STEPS: SimStep[] = [
  {
    id: 2,
    customerSpeech:
      "Guten Tag. Ich möchte ein Konto eröffnen. Können wir das schnell machen?",
    correctKey: "B",
    categories: ["gespraechsfuehrung"],
    options: [
      {
        key: "A",
        text: "Guten Tag! Was kann ich für Sie tun?",
        customerResponse: "Ja also... was brauchen Sie von mir?",
        mood: "neutral",
      },
      {
        key: "B",
        text: "Guten Tag Herr Kowalski, schön Sie kennenzulernen. Ich helfe Ihnen gerne bei der Kontoeröffnung.",
        customerResponse: "Danke, sehr freundlich. Was brauchen Sie von mir?",
        mood: "positive",
      },
      {
        key: "C",
        text: "Haben Sie alle Unterlagen dabei?",
        customerResponse:
          "Ich weiss nicht was ich brauchen soll – das ist doch Ihre Aufgabe!",
        mood: "negative",
      },
      {
        key: "D",
        text: "Das geht schnell, kein Problem.",
        customerResponse: "Ja also... was brauchen Sie von mir?",
        mood: "neutral",
      },
    ],
  },
  {
    id: 3,
    customerSpeech: "Was brauchen Sie von mir?",
    correctKey: "C",
    categories: ["vollstaendigkeit"],
    options: [
      {
        key: "A",
        text: "Nur Ihren Ausweis reicht.",
        customerResponse: "Okay, den habe ich. Aber nur den Ausweis?",
        mood: "neutral",
      },
      {
        key: "B",
        text: "Gar nichts – wir machen das digital.",
        customerResponse: "Das stimmt doch nicht, oder? Das wäre zu einfach.",
        mood: "negative",
      },
      {
        key: "C",
        text: "Ich brauche Ihren Ausweis zur Identifikation. Das ist alles für die Kontoeröffnung.",
        customerResponse: "Okay. Aber warum brauchen Sie den überhaupt?",
        mood: "positive",
      },
      {
        key: "D",
        text: "Viele Unterlagen – Ausweis, Steuerunterlagen, Lohnausweis...",
        customerResponse: "So viele? Das ist mir zu kompliziert!",
        mood: "negative",
      },
    ],
  },
  {
    id: 4,
    customerSpeech:
      "Warum brauchen Sie meinen Ausweis? Vertrauen Sie mir nicht?",
    correctKey: "B",
    categories: ["fachkompetenz"],
    options: [
      {
        key: "A",
        text: "Das ist Vorschrift, ich kann nichts dafür.",
        customerResponse: "Das klingt nicht sehr überzeugend...",
        mood: "negative",
      },
      {
        key: "B",
        text: "Das ist eine gesetzliche Anforderung gemäss Geldwäschereigesetz. Jede Bank muss das so handhaben – kein Misstrauen.",
        customerResponse: "Okay, das leuchtet mir ein. Danke für die Erklärung.",
        mood: "positive",
      },
      {
        key: "C",
        text: "Wir müssen wissen wer Sie sind.",
        customerResponse: "Das ist mir klar, aber das klingt komisch.",
        mood: "neutral",
      },
      {
        key: "D",
        text: "Das brauchen wir für unsere Datenbank.",
        customerResponse: "Für die Datenbank? Das gefällt mir nicht...",
        mood: "negative",
      },
    ],
  },
  {
    id: 5,
    customerSpeech:
      "Ich habe gehört eure Gebühren sind sehr hoch. Lohnt sich das?",
    correctKey: "B",
    categories: ["fachkompetenz"],
    options: [
      {
        key: "A",
        text: "Ja die Gebühren sind leider hoch.",
        customerResponse: "Hmm, dann überlege ich es mir nochmal...",
        mood: "negative",
      },
      {
        key: "B",
        text: "Die Gebühren beinhalten E-Banking, Maestrokarte und vollen Support. Ich schaue welches Kontomodell am besten zu Ihnen passt.",
        customerResponse: "Das klingt vernünftig. Was empfehlen Sie mir?",
        mood: "positive",
      },
      {
        key: "C",
        text: "Unsere Gebühren sind die günstigsten am Markt.",
        customerResponse: "Das glaube ich Ihnen nicht wirklich...",
        mood: "neutral",
      },
      {
        key: "D",
        text: "Das kommt drauf an.",
        customerResponse: "Das ist keine richtige Antwort...",
        mood: "negative",
      },
    ],
  },
  {
    id: 6,
    customerSpeech: "Der Zins ist sicher auch mini?",
    correctKey: "B",
    categories: ["fachkompetenz"],
    options: [
      {
        key: "A",
        text: "Ja leider, da kann ich nichts machen.",
        customerResponse: "Schade, das ist enttäuschend.",
        mood: "negative",
      },
      {
        key: "B",
        text: "Die Zinsen sind marktbedingt tief – gilt für alle Banken. Für längerfristige Anlagen hätten wir bessere Optionen wie Sparkonto oder 3a.",
        customerResponse: "Oh interessant, das wusste ich gar nicht. Erzählen Sie mehr!",
        mood: "positive",
      },
      {
        key: "C",
        text: "Unser Zins ist der beste.",
        customerResponse: "Das klingt unrealistisch...",
        mood: "neutral",
      },
      {
        key: "D",
        text: "Zins ist unwichtig beim Privatkonto.",
        customerResponse: "Für mich ist das aber schon wichtig!",
        mood: "negative",
      },
    ],
  },
  {
    id: 7,
    customerSpeech:
      "Ich habe online gelesen dass eure Bank in einen Skandal verwickelt war?",
    correctKey: "C",
    categories: ["fachkompetenz"],
    options: [
      {
        key: "A",
        text: "Das stimmt nicht, alles Lügen.",
        customerResponse: "Sie reagieren sehr defensiv...",
        mood: "negative",
      },
      {
        key: "B",
        text: "Das ist falsch.",
        customerResponse: "Sind Sie sicher? Das klang online überzeugend...",
        mood: "neutral",
      },
      {
        key: "C",
        text: "Das nehme ich ernst. Was genau haben Sie gelesen? Ich beantworte das gerne direkt und transparent.",
        customerResponse: "Das schätze ich sehr. Danke für die offene Antwort.",
        mood: "positive",
      },
      {
        key: "D",
        text: "Das war früher, heute ist alles anders.",
        customerResponse: "Das klingt nicht sehr vertrauenswürdig...",
        mood: "neutral",
      },
    ],
  },
  {
    id: 8,
    customerSpeech: "Okay das klingt gut. Wie geht es weiter?",
    correctKey: "B",
    categories: ["gespraechsfuehrung", "vollstaendigkeit"],
    options: [
      {
        key: "A",
        text: "Ich schicke Ihnen alles per Post.",
        customerResponse: "Das dauert mir zu lange...",
        mood: "neutral",
      },
      {
        key: "B",
        text: "Ich bereite jetzt den Basisvertrag und Unterschriftenkarte vor. Wir gehen alles gemeinsam durch und Sie können sofort loslegen.",
        customerResponse: "Perfekt, das klingt sehr professionell! Danke.",
        mood: "positive",
      },
      {
        key: "C",
        text: "Kommen Sie nächste Woche wieder.",
        customerResponse: "Nächste Woche? Das ist nicht sehr praktisch...",
        mood: "negative",
      },
      {
        key: "D",
        text: "Das erledigt mein Kollege.",
        customerResponse: "Ich dachte Sie sind mein Ansprechpartner?",
        mood: "negative",
      },
    ],
  },
];

export function calculateScores(
  answers: Record<number, OptionKey>
): ScoreResult {
  function categoryScore(cats: ScoreCategory[]): number {
    const relevant = SIM_STEPS.filter((s) =>
      s.categories.some((c) => cats.includes(c))
    );
    if (relevant.length === 0) return 0;
    const correct = relevant.filter(
      (s) => answers[s.id] === s.correctKey
    ).length;
    return Math.round((correct / relevant.length) * 100);
  }

  const gespraechsfuehrung = categoryScore(["gespraechsfuehrung"]);
  const fachkompetenz = categoryScore(["fachkompetenz"]);
  const vollstaendigkeit = categoryScore(["vollstaendigkeit"]);
  const overall = Math.round(
    (gespraechsfuehrung + fachkompetenz + vollstaendigkeit) / 3
  );

  return { gespraechsfuehrung, fachkompetenz, vollstaendigkeit, overall };
}
