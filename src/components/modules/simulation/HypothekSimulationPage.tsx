"use client";

import { useState } from "react";
import { HypothekBriefingScreen } from "./HypothekBriefingScreen";
import { VideoCallUI, type Mood } from "./VideoCallUI";
import { HypothekResultsScreen } from "./HypothekResultsScreen";
import {
  HYPOTHEK_SIM_STEPS,
  calculateHypothekScores,
} from "@/lib/simulation-hypothek";
import type { OptionKey } from "@/lib/simulation-kontoeröffnung";

type View = "briefing" | "question" | "reaction" | "results";

function CalculationCard() {
  return (
    <div className="text-xs text-gray-800">
      <p className="mb-2 font-semibold text-gray-700">Tragbarkeitsrechnung</p>
      <div className="space-y-1">
        <div className="flex justify-between">
          <span className="text-gray-500">Kaufpreis</span>
          <span>CHF 1&apos;200&apos;000</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Hypothek (80%)</span>
          <span>CHF 960&apos;000</span>
        </div>
        <div className="my-1.5 border-t border-gray-200" />
        <div className="flex justify-between">
          <span className="text-gray-500">Kalk. Zins 5%</span>
          <span>CHF 48&apos;000/J.</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Amortisation 1%</span>
          <span>CHF 9&apos;600/J.</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Nebenkosten 1%</span>
          <span>CHF 12&apos;000/J.</span>
        </div>
        <div className="my-1.5 border-t border-gray-200" />
        <div className="flex justify-between font-semibold">
          <span>Total Kosten</span>
          <span>CHF 69&apos;600/J.</span>
        </div>
        <div className="mt-2 flex items-center justify-between rounded bg-red-100 px-2 py-1">
          <span className="font-bold text-red-700">Tragbarkeit</span>
          <span className="font-bold text-red-700">41.4% &gt; 33% ❌</span>
        </div>
      </div>
    </div>
  );
}

export function HypothekSimulationPage() {
  const [view, setView] = useState<View>("briefing");
  const [stepIndex, setStepIndex] = useState(0);
  const [mood, setMood] = useState<Mood>("positive");
  const [selectedKey, setSelectedKey] = useState<OptionKey | null>(null);
  const [answers, setAnswers] = useState<Record<number, OptionKey>>({});

  const currentStep = HYPOTHEK_SIM_STEPS[stepIndex];

  function handleSelectOption(key: string) {
    const optKey = key as OptionKey;
    const option = currentStep.options.find((o) => o.key === optKey)!;
    setSelectedKey(optKey);
    setMood(option.mood);
    setAnswers((prev) => ({ ...prev, [currentStep.id]: optKey }));
    setView("reaction");
  }

  function handleNext() {
    if (stepIndex < HYPOTHEK_SIM_STEPS.length - 1) {
      setStepIndex((i) => i + 1);
      setSelectedKey(null);
      setView("question");
    } else {
      setView("results");
    }
  }

  function handleRetry() {
    setStepIndex(0);
    setMood("positive");
    setSelectedKey(null);
    setAnswers({});
    setView("briefing");
  }

  if (view === "briefing") {
    return (
      <HypothekBriefingScreen
        onStart={() => {
          setStepIndex(0);
          setMood("positive");
          setSelectedKey(null);
          setAnswers({});
          setView("question");
        }}
      />
    );
  }

  if (view === "results") {
    const scores = calculateHypothekScores(answers);
    return (
      <HypothekResultsScreen
        scores={scores}
        answers={answers}
        onRetry={handleRetry}
        onNext={handleRetry}
      />
    );
  }

  const isReacting = view === "reaction";
  const reactionOption = selectedKey
    ? currentStep.options.find((o) => o.key === selectedKey)
    : null;

  const customerSpeech =
    isReacting && reactionOption
      ? reactionOption.customerResponse
      : currentStep.customerSpeech;

  const feedbackCorrect = selectedKey === currentStep.correctKey;
  const showCalculation = currentStep.hasCalculation && !isReacting;

  return (
    <VideoCallUI
      customerSpeech={customerSpeech}
      options={currentStep.options.map((o) => ({ key: o.key, text: o.text }))}
      mood={mood}
      onSelectOption={handleSelectOption}
      onEndCall={handleRetry}
      isReacting={isReacting}
      feedbackCorrect={feedbackCorrect}
      onNext={handleNext}
      stepIndex={stepIndex}
      totalSteps={HYPOTHEK_SIM_STEPS.length}
      customerInitials="SB"
      customerName="Sarah & Marco Bianchi"
      customerSubtitle="Hypothekengespräch – Eigenheim"
      speechExtra={showCalculation ? <CalculationCard /> : undefined}
    />
  );
}
