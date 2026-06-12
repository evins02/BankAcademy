"use client";

import { useState, useCallback, useEffect } from "react";
import { KycFormCard } from "./KycFormCard";
import { KycFeedbackCard } from "./KycFeedbackCard";
import { type KycFormData, type KycEvaluation, DEMO_EVALUATION } from "./kyc-form-types";
import { addXP } from "@/lib/xpData";
import { Confetti } from "@/components/shared/Confetti";

type RunnerView = "form" | "loading" | "feedback";

interface KycFormRunnerProps {
  onBack: () => void;
}

export function KycFormRunner({ onBack }: KycFormRunnerProps) {
  const [view, setView] = useState<RunnerView>("form");
  const [evaluation, setEvaluation] = useState<KycEvaluation | null>(null);
  const [isDemo, setIsDemo] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [attempt, setAttempt] = useState(0);

  const handleSubmit = useCallback(async (formData: KycFormData) => {
    setView("loading");
    try {
      const res = await fetch("/api/kyc-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData }),
      });

      if (!res.ok) throw new Error(`API ${res.status}`);
      const data: KycEvaluation = await res.json();
      if (data.errors !== undefined) {
        setEvaluation(data);
        setIsDemo(false);
      } else {
        throw new Error("Unexpected response shape");
      }
    } catch {
      // Fallback to demo evaluation when API is unavailable
      setEvaluation(DEMO_EVALUATION);
      setIsDemo(true);
    }
    setView("feedback");
  }, []);

  // Award XP and show confetti once when feedback arrives
  useEffect(() => {
    if (view !== "feedback" || !evaluation) return;
    const passed = evaluation.result === "BESTANDEN";
    const xp = passed ? 150 : 30;
    addXP(xp);
    if (passed) {
      setShowConfetti(true);
      const t = setTimeout(() => setShowConfetti(false), 2000);
      return () => clearTimeout(t);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view]);

  const handleRetry = useCallback(() => {
    setEvaluation(null);
    setView("form");
    setAttempt((a) => a + 1);
  }, []);

  return (
    <>
      <Confetti active={showConfetti} />
      <div className="flex-1 overflow-y-auto p-6">
        {view === "form" && (
          <KycFormCard
            key={attempt}
            onSubmit={handleSubmit}
            isDemo={false}
          />
        )}

        {view === "loading" && (
          <div className="flex flex-col items-center justify-center min-h-64 gap-5">
            <div
              className="w-12 h-12 rounded-full border-4 border-t-transparent animate-spin"
              style={{ borderColor: "var(--primary, #0D1B4B)", borderTopColor: "transparent" }}
            />
            <div className="text-center">
              <p className="text-base font-semibold text-text-primary">KI prüft Ihr Formular…</p>
              <p className="text-sm text-text-secondary mt-1">
                Compliance-Check gemäss VSB 20 und GwG
              </p>
            </div>
          </div>
        )}

        {view === "feedback" && evaluation && (
          <KycFeedbackCard
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
