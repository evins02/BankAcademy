"use client";

import { useState, useCallback } from "react";
import { PracticeBriefingScreen } from "./PracticeBriefingScreen";
import { AiVideoCallUI } from "./AiVideoCallUI";
import { AiResultsScreen, DIFF_NEXT, type AiScores } from "./AiResultsScreen";
import type {
  Mood,
  Difficulty,
  ConversationMessage,
  FinalFeedback,
  ChatApiResponse,
} from "./sim-types";

type View = "briefing" | "conversation" | "results";

const OPENINGS: Record<Difficulty, string[]> = {
  einsteiger: [
    "Guten Morgen. Ich bin etwas früh – ich hoffe das ist in Ordnung. Ich wollte das Jahresgespräch nicht verpassen.",
    "Guten Tag. Ich freue mich, dass wir uns heute Zeit nehmen. Ich hätte ein paar Fragen zu meinem Portfolio.",
  ],
  fortgeschritten: [
    "Guten Morgen. Ich muss ehrlich sagen, ich bin nicht ganz zufrieden mit dem letzten Jahr. Die Performance hat mich überrascht – und nicht positiv.",
    "Guten Tag. Ich schaue mir die Zahlen an und verstehe ehrlich gesagt nicht, wie wir bei dieser Marktlage so abgeschnitten haben. Können Sie mir das erklären?",
    "Guten Morgen. Bevor wir anfangen – ich habe mit einem Bekannten gesprochen. Der war bei einer anderen Bank und hat ganz andere Zahlen gesehen.",
  ],
  challenge: [
    "Guten Morgen. Ich komme direkt zum Punkt: Minus zwei Prozent letztes Jahr. Mein Bekannter hat bei der ZKB sechs Prozent gemacht. Ich erwarte heute eine sehr gute Erklärung.",
    "Guten Tag. Ich habe mir überlegt, ob ich das Gespräch überhaupt noch führen soll. Minus zwei Prozent bei einem Portfolio von CHF 280\'000 – das sind CHF 5\'600 Verlust. Was ist da schiefgelaufen?",
  ],
};

function pickOpening(difficulty: Difficulty) {
  const lines = OPENINGS[difficulty];
  return lines[Math.floor(Math.random() * lines.length)];
}

function calcScores(messages: ConversationMessage[]): AiScores {
  const scored = messages.filter((m) => m.role === "thomas" && m.score !== undefined && m.scoreBreakdown);
  if (scored.length === 0) return { professionalism: 0, bankingKnowledge: 0, customerOrientation: 0, overall: 0 };

  const avg = (fn: (m: ConversationMessage) => number) =>
    Math.round(scored.reduce((s, m) => s + fn(m), 0) / scored.length);

  const professionalism = avg((m) => m.scoreBreakdown!.professionalism);
  const bankingKnowledge = avg((m) => m.scoreBreakdown!.bankingKnowledge);
  const customerOrientation = avg((m) => m.scoreBreakdown!.customerOrientation);
  const overall = Math.round((professionalism + bankingKnowledge + customerOrientation) / 3);
  return { professionalism, bankingKnowledge, customerOrientation, overall };
}

export function PracticeSimulationPage() {
  const [view, setView] = useState<View>("briefing");
  const [difficulty, setDifficulty] = useState<Difficulty>("fortgeschritten");
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [currentMood, setCurrentMood] = useState<Mood>("neutral");
  const [currentMoodReason, setCurrentMoodReason] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [liveScore, setLiveScore] = useState<number | null>(null);
  const [currentHint, setCurrentHint] = useState<string | null>(null);
  const [showHints, setShowHints] = useState(true);
  const [finalFeedback, setFinalFeedback] = useState<FinalFeedback | null>(null);

  const handleStart = useCallback((selectedDifficulty: Difficulty) => {
    const opening = pickOpening(selectedDifficulty);
    const initial: ConversationMessage = {
      role: "thomas",
      content: opening,
      mood: "neutral",
      moodReason: "Erster Kontakt",
    };
    setDifficulty(selectedDifficulty);
    setMessages([initial]);
    setCurrentMood("neutral");
    setCurrentMoodReason("Erster Kontakt");
    setLiveScore(null);
    setCurrentHint(null);
    setFinalFeedback(null);
    setError(null);
    setView("conversation");
  }, []);

  const handleSend = useCallback(
    async (text: string) => {
      if (isLoading) return;

      const studentMsg: ConversationMessage = { role: "student", content: text };
      const next = [...messages, studentMsg];
      setMessages(next);
      setIsLoading(true);
      setCurrentHint(null);
      setError(null);

      try {
        const res = await fetch("/api/simulation/practice-chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: next, difficulty }),
        });

        if (!res.ok || !res.body) throw new Error(`HTTP ${res.status}`);

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let data: ChatApiResponse | null = null;
        let sseBuffer = "";

        outer: while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          sseBuffer += decoder.decode(value, { stream: true });
          const lines = sseBuffer.split("\n");
          sseBuffer = lines.pop() ?? "";
          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            const payload = line.slice(6).trim();
            if (!payload) continue;
            const parsed = JSON.parse(payload) as ChatApiResponse & { error?: string };
            if ("error" in parsed) throw new Error(parsed.error);
            data = parsed;
            break outer;
          }
        }

        if (!data) throw new Error("Keine Antwort vom Server");

        const thomasMsg: ConversationMessage = {
          role: "thomas",
          content: data.customerResponse,
          mood: data.mood,
          moodReason: data.moodReason,
          score: data.score,
          scoreBreakdown: data.scoreBreakdown,
          hint: data.hint,
        };

        const updated = [...next, thomasMsg];
        setMessages(updated);
        setCurrentMood(data.mood ?? "neutral");
        setCurrentMoodReason(data.moodReason ?? "");
        setLiveScore(calcScores(updated).overall || null);
        setCurrentHint(data.hint ?? null);

        if (data.conversationComplete) {
          if (data.finalFeedback) setFinalFeedback(data.finalFeedback);
          setTimeout(() => setView("results"), 1800);
        }
      } catch (err) {
        const detail = err instanceof Error ? err.message : String(err);
        setError("Verbindung unterbrochen – " + detail);
        setMessages(messages);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, messages, difficulty]
  );

  const handleRetry = useCallback(() => {
    setMessages([]);
    setCurrentMood("neutral");
    setCurrentMoodReason("");
    setLiveScore(null);
    setCurrentHint(null);
    setFinalFeedback(null);
    setError(null);
    setView("briefing");
  }, []);

  const handleIncreaseDifficulty = useCallback(() => {
    const next = DIFF_NEXT[difficulty];
    setDifficulty(next);
    setMessages([]);
    setCurrentMood("neutral");
    setCurrentMoodReason("");
    setLiveScore(null);
    setCurrentHint(null);
    setFinalFeedback(null);
    setError(null);
    setView("briefing");
  }, [difficulty]);

  if (view === "briefing") {
    return <PracticeBriefingScreen onStart={handleStart} />;
  }

  if (view === "results") {
    return (
      <AiResultsScreen
        messages={messages}
        scores={calcScores(messages)}
        finalFeedback={finalFeedback}
        difficulty={difficulty}
        onRetry={handleRetry}
        onIncreaseDifficulty={handleIncreaseDifficulty}
        onNext={handleRetry}
      />
    );
  }

  const lastThomas = [...messages].reverse().find((m) => m.role === "thomas");

  return (
    <AiVideoCallUI
      messages={messages}
      thomasSpeech={lastThomas?.content ?? ""}
      mood={currentMood}
      moodReason={currentMoodReason}
      liveScore={liveScore}
      isLoading={isLoading}
      error={error}
      currentHint={currentHint}
      showHints={showHints}
      onToggleHints={() => setShowHints((v) => !v)}
      onSend={handleSend}
      onEndCall={handleRetry}
    />
  );
}
