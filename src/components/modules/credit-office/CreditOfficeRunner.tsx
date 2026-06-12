"use client";

import { useState, useCallback, useEffect } from "react";
import { CreditOfficeFeedbackCard } from "./CreditOfficeFeedbackCard";
import { type CreditEvaluation } from "./credit-office-types";
import { addXP } from "@/lib/xpData";
import { Confetti } from "@/components/shared/Confetti";

interface CreditOfficeRunnerProps {
  xp: number;
  apiPath: string;
  demoEval: CreditEvaluation;
  criticalErrors: string[];
  learningPoints: string[];
  legalBasis: string;
  onBack: () => void;
  FormCard: React.ComponentType<{ onSubmit: (data: unknown) => void }>;
}

export function CreditOfficeRunner({
  xp,
  apiPath,
  demoEval,
  criticalErrors,
  learningPoints,
  legalBasis,
  onBack,
  FormCard,
}: CreditOfficeRunnerProps) {
  const [view, setView] = useState<"form" | "loading" | "feedback">("form");
  const [evaluation, setEvaluation] = useState<CreditEvaluation | null>(null);
  const [isDemo, setIsDemo] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [attempt, setAttempt] = useState(0);

  const handleSubmit = useCallback(async (formData: unknown) => {
    setView("loading");
    try {
      const res = await fetch(apiPath, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData }),
      });
      if (!res.ok) throw new Error(`API ${res.status}`);
      const data: CreditEvaluation = await res.json();
      if (data.result !== undefined) {
        setEvaluation(data);
        setIsDemo(false);
      } else {
        throw new Error("Bad response");
      }
    } catch {
      setEvaluation(demoEval);
      setIsDemo(true);
    }
    setView("feedback");
  }, [apiPath, demoEval]);

  useEffect(() => {
    if (view !== "feedback" || !evaluation) return;
    const passed = evaluation.result === "BESTANDEN";
    addXP(passed ? xp : Math.round(xp * 0.2));
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
    setAttempt(a => a + 1);
  }, []);

  return (
    <>
      <Confetti active={showConfetti} />
      <div className="flex-1 overflow-y-auto p-6">
        {view === "form" && <FormCard key={attempt} onSubmit={handleSubmit} />}

        {view === "loading" && (
          <div className="flex flex-col items-center justify-center min-h-64 gap-5">
            <div
              className="w-12 h-12 rounded-full border-4 border-t-transparent animate-spin"
              style={{ borderColor: "var(--primary, #0D1B4B)", borderTopColor: "transparent" }}
            />
            <div className="text-center">
              <p className="text-base font-semibold text-text-primary">Dossier wird geprüft…</p>
              <p className="text-sm text-text-secondary mt-1">Berechnungen und Risikobeurteilung werden ausgewertet</p>
            </div>
          </div>
        )}

        {view === "feedback" && evaluation && (
          <CreditOfficeFeedbackCard
            evaluation={evaluation}
            isDemo={isDemo}
            criticalErrors={criticalErrors}
            learningPoints={learningPoints}
            legalBasis={legalBasis}
            onRetry={handleRetry}
            onBack={onBack}
          />
        )}
      </div>
    </>
  );
}
