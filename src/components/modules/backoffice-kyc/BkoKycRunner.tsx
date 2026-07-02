"use client";

import { useState, useCallback, useMemo } from "react";
import { LevelSelector } from "./LevelSelector";
import { DossierView } from "./DossierView";
import { FeedbackCard } from "./FeedbackCard";
import { LevelComplete, type LevelResult } from "./LevelComplete";
import { BKO_KYC_LEVELS, type LevelNum, type SubmissionResult } from "@/lib/backoffice-kyc";
import { resolveSessionCases } from "@/lib/sessionScenarios";
import { recordConceptError } from "@/lib/conceptTracker";

type View = "selector" | "playing" | "feedback" | "level-complete";

export function BkoKycRunner() {
  const [completedLevels, setCompletedLevels] = useState<Set<LevelNum>>(new Set());
  const [levelScores, setLevelScores] = useState<Partial<Record<LevelNum, number>>>({});

  const [view, setView] = useState<View>("selector");
  const [activeLevel, setActiveLevel] = useState<LevelNum>(1);
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [sessionResults, setSessionResults] = useState<LevelResult[]>([]);
  const [lastSubmission, setLastSubmission] = useState<SubmissionResult | null>(null);

  const levelConfig = BKO_KYC_LEVELS.find((l) => l.level === activeLevel)!;
  const activeScenarios = useMemo(
    () => resolveSessionCases("backoffice-kyc", activeLevel, levelConfig.scenarios),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeLevel],
  );
  const currentScenario = activeScenarios[scenarioIndex];
  const total = activeScenarios.length;
  const isLastScenario = scenarioIndex === total - 1;

  const handleSelectLevel = useCallback((level: LevelNum) => {
    setActiveLevel(level);
    setScenarioIndex(0);
    setSessionResults([]);
    setLastSubmission(null);
    setView("playing");
  }, []);

  const handleSubmit = useCallback(
    (result: SubmissionResult) => {
      const newResults: LevelResult[] = [
        ...sessionResults,
        { scenarioId: currentScenario.id, correct: result.isCorrect },
      ];
      setSessionResults(newResults);
      setLastSubmission(result);
      setView("feedback");
    },
    [sessionResults, currentScenario]
  );

  const handleNext = useCallback(() => {
    if (lastSubmission && !lastSubmission.isCorrect && "concepts" in currentScenario)
      recordConceptError("backoffice-kyc", (currentScenario as { concepts?: string[] }).concepts ?? []);
    if (isLastScenario) {
      const score = sessionResults.filter((r) => r.correct).length;
      setCompletedLevels((prev) => {
        const next = new Set(prev);
        next.add(activeLevel);
        return next;
      });
      setLevelScores((prev) => ({ ...prev, [activeLevel]: score }));
      setView("level-complete");
    } else {
      setScenarioIndex((i) => i + 1);
      setLastSubmission(null);
      setView("playing");
    }
  }, [isLastScenario, sessionResults, activeLevel]);

  const handleRetry = useCallback(() => {
    setScenarioIndex(0);
    setSessionResults([]);
    setLastSubmission(null);
    setView("playing");
  }, []);

  const handleGoToSelector = useCallback(() => {
    setView("selector");
  }, []);

  return (
    <div className="flex-1 overflow-y-auto p-6">
      {view === "selector" && (
        <LevelSelector
          completedLevels={completedLevels}
          levelScores={levelScores}
          onSelectLevel={handleSelectLevel}
        />
      )}

      {view === "playing" && currentScenario && (
        <DossierView
          scenario={currentScenario}
          scenarioIndex={scenarioIndex}
          total={total}
          onSubmit={handleSubmit}
        />
      )}

      {view === "feedback" && currentScenario && lastSubmission && (
        <FeedbackCard
          scenario={currentScenario}
          submission={lastSubmission}
          scenarioIndex={scenarioIndex}
          total={total}
          isLastScenario={isLastScenario}
          onNext={handleNext}
        />
      )}

      {view === "level-complete" && (
        <LevelComplete
          level={activeLevel}
          results={sessionResults}
          onNext={handleGoToSelector}
          onRetry={handleRetry}
        />
      )}
    </div>
  );
}
