"use client";

import { useState, useCallback } from "react";
import { PhaseProgress } from "./PhaseProgress";
import { DocumentChecklist } from "./DocumentChecklist";
import { DossierReview } from "./DossierReview";
import { FeedbackCard } from "./FeedbackCard";
import { KONTO_SCENARIOS, type KontoScenario } from "@/lib/kontoeröffnungen";

interface Score {
  correct: number;
  total: number;
}

interface Props {
  scenario: KontoScenario;
  scenarios?: KontoScenario[];
  basePath?: string;
}

export function ScenarioRunner({ scenario, scenarios, basePath }: Props) {
  const [phase, setPhase] = useState<1 | 2 | 3>(1);
  const [phase1Score, setPhase1Score] = useState<Score | null>(null);
  const [phase2Score, setPhase2Score] = useState<Score | null>(null);
  // key forces full remount on retry
  const [runKey, setRunKey] = useState(0);

  const handlePhase1Complete = useCallback((score: Score) => {
    setPhase1Score(score);
    setPhase(2);
  }, []);

  const handlePhase2Complete = useCallback((score: Score) => {
    setPhase2Score(score);
    setPhase(3);
  }, []);

  const handleRetry = useCallback(() => {
    setPhase(1);
    setPhase1Score(null);
    setPhase2Score(null);
    setRunKey((k) => k + 1);
  }, []);

  const allScenarios = scenarios ?? KONTO_SCENARIOS;
  const currentIndex = allScenarios.findIndex((s) => s.id === scenario.id);
  const nextScenario = allScenarios[currentIndex + 1];

  return (
    <div key={runKey} className="flex flex-1 flex-col overflow-hidden">
      <PhaseProgress current={phase} />
      <div className="flex-1 overflow-y-auto p-6">
        {phase === 1 && (
          <DocumentChecklist
            scenario={scenario}
            onComplete={handlePhase1Complete}
          />
        )}
        {phase === 2 && (
          <DossierReview
            scenario={scenario}
            onComplete={handlePhase2Complete}
          />
        )}
        {phase === 3 && phase1Score && phase2Score && (
          <FeedbackCard
            scenario={scenario}
            phase1Score={phase1Score}
            phase2Score={phase2Score}
            nextScenarioId={nextScenario?.id}
            basePath={basePath}
            onRetry={handleRetry}
          />
        )}
      </div>
    </div>
  );
}
