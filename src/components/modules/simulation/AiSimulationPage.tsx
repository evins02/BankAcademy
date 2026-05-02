"use client";

import { useState, useCallback } from "react";
import { AiBriefingScreen } from "./AiBriefingScreen";
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
    "Hallo! Ich wurde hier her verwiesen. Ich würde gerne ein Konto eröffnen.",
    "Guten Tag! Ich möchte ein Privatkonto eröffnen, können Sie mir helfen?",
  ],
  fortgeschritten: [
    "Guten Tag. Ich möchte ein Konto eröffnen. Können wir das schnell machen?",
    "Hallo, ich wurde an Sie verwiesen. Ich brauche dringend ein Konto.",
    "Guten Tag. Ich hoffe das dauert nicht lange, ich habe nicht viel Zeit.",
  ],
  lap: [
    "Guten Tag. Ich brauche ein Konto – mein Gehalt kommt nächste Woche und ich habe online nicht die besten Bewertungen über Ihre Bank gelesen. Überzeugen Sie mich.",
    "Hallo. Ich habe mich bei drei Banken informiert. Was macht Ihre Bank besser als die Konkurrenz? Ich brauche ein Konto schnell.",
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

export function AiSimulationPage() {
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
        const res = await fetch("/api/simulation/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: next, difficulty }),
        });

        if (!res.ok) throw new Error("HTTP " + res.status);
        const data: ChatApiResponse = await res.json();
        if ("error" in data) throw new Error((data as { error: string }).error);

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
      } catch {
        setError("Verbindung unterbrochen – bitte nochmal senden");
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
    return <AiBriefingScreen onStart={handleStart} />;
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
