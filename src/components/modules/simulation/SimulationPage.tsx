"use client";

import { useState } from "react";
import { BriefingScreen } from "./BriefingScreen";
import { VideoCallUI, type Mood } from "./VideoCallUI";
import { ResultsScreen } from "./ResultsScreen";
import {
  SIM_STEPS,
  calculateScores,
  type OptionKey,
} from "@/lib/simulation-kontoeröffnung";

type View = "briefing" | "question" | "reaction" | "results";

export function SimulationPage() {
  const [view, setView] = useState<View>("briefing");
  const [stepIndex, setStepIndex] = useState(0);
  const [mood, setMood] = useState<Mood>("neutral");
  const [selectedKey, setSelectedKey] = useState<OptionKey | null>(null);
  const [answers, setAnswers] = useState<Record<number, OptionKey>>({});

  const currentStep = SIM_STEPS[stepIndex];

  function handleSelectOption(key: string) {
    const optKey = key as OptionKey;
    const option = currentStep.options.find((o) => o.key === optKey)!;

    setSelectedKey(optKey);
    setMood(option.mood);
    setAnswers((prev) => ({ ...prev, [currentStep.id]: optKey }));
    setView("reaction");
  }

  function handleNext() {
    if (stepIndex < SIM_STEPS.length - 1) {
      setStepIndex((i) => i + 1);
      setSelectedKey(null);
      setView("question");
    } else {
      setView("results");
    }
  }

  function handleRetry() {
    setStepIndex(0);
    setMood("neutral");
    setSelectedKey(null);
    setAnswers({});
    setView("briefing");
  }

  function handleNext_results() {
    // Placeholder — future simulation would go here
    handleRetry();
  }

  if (view === "briefing") {
    return (
      <BriefingScreen
        onStart={() => {
          setStepIndex(0);
          setMood("neutral");
          setSelectedKey(null);
          setAnswers({});
          setView("question");
        }}
      />
    );
  }

  if (view === "results") {
    const scores = calculateScores(answers);
    return (
      <ResultsScreen
        scores={scores}
        answers={answers}
        onRetry={handleRetry}
        onNext={handleNext_results}
      />
    );
  }

  const isReacting = view === "reaction";
  const reactionOption = selectedKey
    ? currentStep.options.find((o) => o.key === selectedKey)
    : null;

  const customerSpeech = isReacting && reactionOption
    ? reactionOption.customerResponse
    : currentStep.customerSpeech;

  const feedbackCorrect = selectedKey === currentStep.correctKey;

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
      totalSteps={SIM_STEPS.length}
    />
  );
}
