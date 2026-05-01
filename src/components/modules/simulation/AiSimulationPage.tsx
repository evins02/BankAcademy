"use client";

import { useState, useCallback } from "react";
import { BriefingScreen } from "./BriefingScreen";
import { AiVideoCallUI, type Mood } from "./AiVideoCallUI";
import {
  AiResultsScreen,
  type ConversationMessage,
  type ExchangeEval,
  type FinalFeedback,
  type AiScores,
} from "./AiResultsScreen";

type View = "briefing" | "conversation" | "results";

const OPENING_LINES = [
  "Guten Tag. Ich möchte ein Konto eröffnen. Können wir das schnell machen?",
  "Hallo, ich wurde an Sie verwiesen. Ich brauche ein Konto.",
  "Guten Tag. Ich hoffe das dauert nicht lange, ich habe nicht viel Zeit.",
];

function randomOpening() {
  return OPENING_LINES[Math.floor(Math.random() * OPENING_LINES.length)];
}

function calcScores(evaluations: ExchangeEval[]): AiScores {
  if (evaluations.length === 0) {
    return { gespraechsfuehrung: 0, fachkompetenz: 0, kundenorientierung: 0, overall: 0 };
  }
  const avg = (key: keyof Omit<ExchangeEval, "comment">) =>
    Math.round(evaluations.reduce((s, e) => s + e[key], 0) / evaluations.length);

  const gespraechsfuehrung = avg("gespraechsfuehrung");
  const fachkompetenz = avg("fachkompetenz");
  const kundenorientierung = avg("kundenorientierung");
  const overall = Math.round((gespraechsfuehrung + fachkompetenz + kundenorientierung) / 3);
  return { gespraechsfuehrung, fachkompetenz, kundenorientierung, overall };
}

export function AiSimulationPage() {
  const [view, setView] = useState<View>("briefing");
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [mood, setMood] = useState<Mood>("neutral");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [evaluations, setEvaluations] = useState<ExchangeEval[]>([]);
  const [finalFeedback, setFinalFeedback] = useState<FinalFeedback | null>(null);
  const [opening] = useState(randomOpening);

  const handleStart = useCallback(() => {
    const initial: ConversationMessage = {
      role: "thomas",
      content: opening,
      mood: "neutral",
    };
    setMessages([initial]);
    setMood("neutral");
    setEvaluations([]);
    setFinalFeedback(null);
    setError(null);
    setView("conversation");
  }, [opening]);

  const handleSend = useCallback(
    async (text: string) => {
      if (isLoading) return;

      const studentMsg: ConversationMessage = { role: "student", content: text };
      const next = [...messages, studentMsg];
      setMessages(next);
      setIsLoading(true);
      setError(null);

      try {
        const res = await fetch("/api/simulation/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: next }),
        });

        if (!res.ok) throw new Error("HTTP " + res.status);

        const data = await res.json();
        if (data.error) throw new Error(data.error);

        const thomasMsg: ConversationMessage = {
          role: "thomas",
          content: data.customerResponse,
          mood: data.mood,
        };

        setMessages([...next, thomasMsg]);
        setMood(data.mood ?? "neutral");

        if (data.exchangeEvaluation) {
          setEvaluations((prev) => [...prev, data.exchangeEvaluation]);
        }

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
    [isLoading, messages]
  );

  const handleRetry = useCallback(() => {
    setMessages([]);
    setMood("neutral");
    setEvaluations([]);
    setFinalFeedback(null);
    setError(null);
    setView("briefing");
  }, []);

  if (view === "briefing") return <BriefingScreen onStart={handleStart} />;

  if (view === "results") {
    return (
      <AiResultsScreen
        messages={messages}
        evaluations={evaluations}
        scores={calcScores(evaluations)}
        finalFeedback={finalFeedback}
        onRetry={handleRetry}
        onNext={handleRetry}
      />
    );
  }

  const lastThomas = [...messages].reverse().find((m) => m.role === "thomas");

  return (
    <AiVideoCallUI
      thomasSpeech={lastThomas?.content ?? opening}
      mood={mood}
      isLoading={isLoading}
      error={error}
      exchangeCount={evaluations.length}
      onSend={handleSend}
      onEndCall={handleRetry}
    />
  );
}
