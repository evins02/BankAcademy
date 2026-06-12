"use client";

import { useState, useCallback, useEffect } from "react";
import { HypothekAntragCard } from "./HypothekAntragCard";
import { HypothekFeedbackCard } from "./HypothekFeedbackCard";
import {
  type HypothekFormData,
  type HypothekEvaluation,
  DEMO_EVALUATION,
} from "./hypothek-antrag-types";
import { addXP } from "@/lib/xpData";
import { Confetti } from "@/components/shared/Confetti";

type View = "form" | "loading" | "feedback";

interface HypothekAntragRunnerProps {
  onBack: () => void;
}

export function HypothekAntragRunner({ onBack }: HypothekAntragRunnerProps) {
  const [view, setView] = useState<View>("form");
  const [evaluation, setEvaluation] = useState<HypothekEvaluation | null>(null);
  const [isDemo, setIsDemo] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [attempt, setAttempt] = useState(0);

  const handleSubmit = useCallback(async (formData: HypothekFormData) => {
    setView("loading");
    try {
      const res = await fetch("/api/hypothek-evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData }),
      });

      if (!res.ok) throw new Error(`API ${res.status}`);
      const data: HypothekEvaluation = await res.json();

      if (data.result !== undefined) {
        setEvaluation(data);
        setIsDemo(false);
      } else {
        throw new Error("Unexpected response");
      }
    } catch {
      setEvaluation(DEMO_EVALUATION);
      setIsDemo(true);
    }
    setView("feedback");
  }, []);

  useEffect(() => {
    if (view !== "feedback" || !evaluation) return;
    const passed = evaluation.result === "BESTANDEN";
    addXP(passed ? 200 : 40);
    if (passed) {
      setShowConfetti(true);
      const t = setTimeout(() => setShowConfetti(false), 2000);
      return () => clearTimeout(t);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view]);

  const handleRetry = useCallback(() => {
    setEvaluation(null);
    setIsDemo(false);
    setView("form");
    setAttempt((a) => a + 1);
  }, []);

  return (
    <>
      <Confetti active={showConfetti} />
      <div className="flex-1 overflow-y-auto p-6">
        {view === "form" && (
          <HypothekAntragCard key={attempt} onSubmit={handleSubmit} />
        )}

        {view === "loading" && (
          <div className="flex flex-col items-center justify-center min-h-64 gap-5">
            <div
              className="w-12 h-12 rounded-full border-4 border-t-transparent animate-spin"
              style={{ borderColor: "var(--primary, #0D1B4B)", borderTopColor: "transparent" }}
            />
            <div className="text-center">
              <p className="text-base font-semibold text-text-primary">Antrag wird geprüft…</p>
              <p className="text-sm text-text-secondary mt-1">
                Berechnungen und Risikobeurteilung werden ausgewertet
              </p>
            </div>
          </div>
        )}

        {view === "feedback" && evaluation && (
          <HypothekFeedbackCard
            evaluation={evaluation}
            isDemo={isDemo}
            onRetry={handleRetry}
            onBack={onBack}
          />
        )}
      </div>
    </>
  );
}
