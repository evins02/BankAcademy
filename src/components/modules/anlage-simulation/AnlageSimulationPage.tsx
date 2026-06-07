"use client";

import { useState, useCallback } from "react";
import { CheckCircle2, XCircle, ChevronRight, RotateCcw, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VideoCallUI } from "@/components/modules/simulation/VideoCallUI";
import { Confetti } from "@/components/shared/Confetti";
import { cn } from "@/lib/utils";
import { ANLAGE_SIM_STEPS, CUSTOMER, type AnlageSimStep } from "@/lib/anlage-simulation";

type Phase = "briefing" | "call" | "results";

export function AnlageSimulationPage() {
  const [phase, setPhase] = useState<Phase>("briefing");
  const [stepIndex, setStepIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isReacting, setIsReacting] = useState(false);
  const [results, setResults] = useState<{ stepId: string; correct: boolean; selected: string }[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);

  const currentStep: AnlageSimStep = ANLAGE_SIM_STEPS[stepIndex];
  const isLastStep = stepIndex === ANLAGE_SIM_STEPS.length - 1;

  const handleSelectOption = useCallback((key: string) => {
    if (isReacting) return;
    setSelectedOption(key);
  }, [isReacting]);

  const handleSubmitOption = useCallback(() => {
    if (!selectedOption) return;
    setIsReacting(true);
  }, [selectedOption]);

  const handleNext = useCallback(() => {
    if (!selectedOption) return;
    const isCorrect = selectedOption === currentStep.correct;
    const newResults = [
      ...results,
      { stepId: currentStep.id, correct: isCorrect, selected: selectedOption },
    ];
    setResults(newResults);

    if (isLastStep) {
      const score = newResults.filter((r) => r.correct).length;
      if (score === ANLAGE_SIM_STEPS.length) setShowConfetti(true);
      setPhase("results");
    } else {
      setStepIndex((i) => i + 1);
      setSelectedOption(null);
      setIsReacting(false);
    }
  }, [selectedOption, currentStep, results, isLastStep]);

  const handleRestart = useCallback(() => {
    setPhase("briefing");
    setStepIndex(0);
    setSelectedOption(null);
    setIsReacting(false);
    setResults([]);
    setShowConfetti(false);
  }, []);

  if (phase === "briefing") {
    return (
      <div className="flex flex-1 items-center justify-center p-6">
        <div className="mx-auto max-w-lg">
          <div className="rounded-DEFAULT bg-surface p-8 shadow-card">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-white">
              {CUSTOMER.initials}
            </div>
            <h2 className="mb-2 text-xl font-bold text-text-primary">
              Simulation: Anlageberatung
            </h2>
            <p className="mb-6 text-sm text-text-secondary">
              Du führst ein vollständiges Anlageberatungsgespräch durch. Triff in jedem Schritt die
              richtige Entscheidung.
            </p>

            <div className="mb-6 overflow-hidden rounded-DEFAULT border border-border">
              <div className="border-b border-border bg-background px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
                Kundendaten – Andreas Keller
              </div>
              {[
                { label: "Alter", value: "42 Jahre" },
                { label: "Familienstand", value: "Verheiratet, 2 Kinder" },
                { label: "Anlass", value: "Erbschaft CHF 80'000" },
                { label: "Bisherige Erfahrung", value: "Aktien (2008 mit Verlust verkauft)" },
                { label: "Eigene Ersparnisse", value: "CHF 30'000 (Notreserve)" },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between border-b border-border px-4 py-2.5 text-sm last:border-0"
                >
                  <span className="text-text-secondary">{row.label}</span>
                  <span className="font-medium text-text-primary">{row.value}</span>
                </div>
              ))}
            </div>

            <div className="mb-6 flex items-center gap-3 text-xs text-text-secondary">
              <span>📞 {ANLAGE_SIM_STEPS.length} Gesprächsschritte</span>
              <span>·</span>
              <span>⏱ ca. 5–8 Minuten</span>
              <span>·</span>
              <span className="font-semibold text-primary">+600 XP möglich</span>
            </div>

            <Button onClick={() => setPhase("call")} className="w-full">
              Gespräch starten
              <ChevronRight size={14} />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (phase === "call") {
    const feedbackCorrect = isReacting && selectedOption === currentStep.correct;

    return (
      <div className="flex flex-1 flex-col overflow-hidden">
        <VideoCallUI
          customerSpeech={currentStep.customerSpeech}
          options={currentStep.options}
          mood={isReacting ? (feedbackCorrect ? "positive" : "negative") : currentStep.mood}
          onSelectOption={handleSelectOption}
          onEndCall={() => setPhase("briefing")}
          isReacting={isReacting}
          feedbackCorrect={feedbackCorrect}
          onNext={handleNext}
          stepIndex={stepIndex}
          totalSteps={ANLAGE_SIM_STEPS.length}
          customerInitials={CUSTOMER.initials}
          customerName={CUSTOMER.name}
          customerSubtitle={currentStep.topic}
          speechExtra={
            isReacting ? (
              <div className="space-y-2">
                <div
                  className={cn(
                    "flex items-start gap-2 rounded-lg p-3 text-xs",
                    feedbackCorrect ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
                  )}
                >
                  {feedbackCorrect ? (
                    <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-green-600" />
                  ) : (
                    <XCircle size={14} className="mt-0.5 shrink-0 text-red-500" />
                  )}
                  <p>{currentStep.feedback}</p>
                </div>
                {currentStep.tip && (
                  <p className="text-xs text-gray-500">💡 {currentStep.tip}</p>
                )}
              </div>
            ) : undefined
          }
        />

        {/* Response panel */}
        {!isReacting && (
          <div className="border-t border-gray-700 bg-[#111] px-4 py-4">
            <p className="mb-3 text-xs font-medium text-gray-400">Deine Antwort:</p>
            <div className="flex flex-col gap-2">
              {currentStep.options.map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => handleSelectOption(opt.key)}
                  className={cn(
                    "flex items-start gap-3 rounded-lg border px-4 py-3 text-left text-sm transition-colors",
                    selectedOption === opt.key
                      ? "border-primary bg-primary/20 text-white"
                      : "border-gray-600 bg-gray-800/50 text-gray-300 hover:border-gray-400 hover:text-white"
                  )}
                >
                  <span
                    className={cn(
                      "flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold",
                      selectedOption === opt.key
                        ? "bg-primary text-white"
                        : "bg-gray-700 text-gray-400"
                    )}
                  >
                    {opt.key}
                  </span>
                  <span>{opt.text}</span>
                </button>
              ))}
            </div>
            <Button
              onClick={handleSubmitOption}
              disabled={selectedOption === null}
              className="mt-3 w-full"
            >
              Antworten
            </Button>
          </div>
        )}
      </div>
    );
  }

  // Results screen
  const score = results.filter((r) => r.correct).length;
  const total = ANLAGE_SIM_STEPS.length;
  const isPerfect = score === total;
  const isGood = score >= Math.ceil(total * 0.6);

  return (
    <>
      <Confetti active={showConfetti} />
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-lg">
          <div className="rounded-DEFAULT bg-surface p-6 shadow-card">
            <div className="mb-6 text-center">
              <Award
                size={40}
                className={cn(
                  "mx-auto mb-3",
                  isPerfect ? "text-primary" : isGood ? "text-amber-500" : "text-text-secondary"
                )}
              />
              <p
                className={cn(
                  "text-4xl font-bold",
                  isPerfect ? "text-primary" : isGood ? "text-amber-600" : "text-red-600"
                )}
              >
                {score}/{total}
              </p>
              <p className="mt-1 text-sm text-text-secondary">
                {isPerfect
                  ? "Perfekte Beratung!"
                  : isGood
                    ? "Gut – noch Verbesserungspotenzial"
                    : "Noch üben – Beratungsfehler aufgetreten"}
              </p>
            </div>

            <div className="mb-6 flex flex-col gap-2">
              {ANLAGE_SIM_STEPS.map((step, i) => {
                const result = results[i];
                return (
                  <div
                    key={step.id}
                    className={cn(
                      "flex items-center gap-3 rounded-DEFAULT border p-3 text-sm",
                      result?.correct
                        ? "border-primary/20 bg-primary-light/40"
                        : "border-red-200 bg-red-50"
                    )}
                  >
                    {result?.correct ? (
                      <CheckCircle2 size={14} className="shrink-0 text-primary" />
                    ) : (
                      <XCircle size={14} className="shrink-0 text-red-500" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-text-primary font-medium truncate">
                        Schritt {step.id}: {step.topic}
                      </p>
                      {!result?.correct && (
                        <p className="text-xs text-text-secondary mt-0.5 truncate">
                          Richtig: {step.options.find((o) => o.key === step.correct)?.text}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col gap-3">
              <Button onClick={handleRestart} className="w-full">
                <RotateCcw size={14} />
                Gespräch wiederholen
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
