"use client";

import { useState, useCallback, useMemo } from "react";
import { LevelSelector } from "./LevelSelector";
import { LernblockCard } from "./LernblockCard";
import { CaseCard } from "./CaseCard";
import { FeedbackPanel } from "./FeedbackPanel";
import { LevelComplete, type ScenarioResult } from "./LevelComplete";
import { AL_LEVELS, type LevelNum, type OptionKey } from "@/lib/anlagekunde";
import { resolveSessionCases } from "@/lib/sessionScenarios";
import { recordConceptError } from "@/lib/conceptTracker";
import { addAttemptRecord } from "@/lib/error-tracking";

type View = "selector" | "lernblock" | "playing" | "feedback" | "level-complete";

export function AnlagekundeRunner() {
  const [completedLevels, setCompletedLevels] = useState<Set<LevelNum>>(new Set());
  const [levelScores, setLevelScores] = useState<Partial<Record<LevelNum, number>>>({});

  const [view, setView] = useState<View>("selector");
  const [activeLevel, setActiveLevel] = useState<LevelNum>(1);
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<OptionKey | null>(null);
  const [sessionResults, setSessionResults] = useState<ScenarioResult[]>([]);

  const levelConfig = AL_LEVELS.find((l) => l.level === activeLevel)!;
  const activeScenarios = useMemo(
    () => resolveSessionCases("banking-operations-anlagekunde", activeLevel, levelConfig.scenarios),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeLevel],
  );
  const currentScenario = activeScenarios[scenarioIndex];
  const total = activeScenarios.length;
  const isLastScenario = scenarioIndex === total - 1;

  const handleSelectLevel = useCallback((level: LevelNum) => {
    setActiveLevel(level);
    setScenarioIndex(0);
    setSelectedOption(null);
    setSessionResults([]);
    setView("lernblock");
  }, []);

  const handleSubmit = useCallback(() => {
    setView("feedback");
  }, []);

  const handleNext = useCallback(() => {
    if (!selectedOption) return;

    const isCorrect = selectedOption === currentScenario.correct;
    const newResults: ScenarioResult[] = [
      ...sessionResults,
      { scenarioId: currentScenario.id, correct: isCorrect, selectedOption },
    ];
    setSessionResults(newResults);

    if (!isCorrect && "concepts" in currentScenario) recordConceptError("banking-operations-anlagekunde", (currentScenario as {concepts?: string[]}).concepts ?? []);
    addAttemptRecord({
      moduleId: "banking-operations-anlagekunde",
      levelNum: activeLevel,
      caseId: currentScenario.id,
      caseTitle: String((currentScenario as unknown as Record<string, unknown>).title ?? (currentScenario as unknown as Record<string, unknown>).label ?? currentScenario.id),
      attempt: 1,
      timestamp: Date.now(),
      score: isCorrect ? 100 : 0,
      correct: isCorrect,
      errors: !isCorrect && selectedOption ? [{ type: "wrong" as const, documentId: selectedOption, documentLabel: selectedOption }] : [],
    });
    if (isLastScenario) {
      const score = newResults.filter((r) => r.correct).length;
      setCompletedLevels((prev) => {
        const next = new Set(prev);
        next.add(activeLevel);
        return next;
      });
      setLevelScores((prev) => ({ ...prev, [activeLevel]: score }));
      setView("level-complete");
    } else {
      setScenarioIndex((i) => i + 1);
      setSelectedOption(null);
      setView("playing");
    }
  }, [selectedOption, currentScenario, sessionResults, isLastScenario, activeLevel]);

  const handleRetry = useCallback(() => {
    setScenarioIndex(0);
    setSelectedOption(null);
    setSessionResults([]);
    setView("lernblock");
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
      {view === "lernblock" && (
        <LernblockCard level={activeLevel} onContinue={() => setView("playing")} />
      )}
      {view === "playing" && currentScenario && (
        <CaseCard
          scenario={currentScenario}
          scenarioIndex={scenarioIndex}
          total={total}
          selectedOption={selectedOption}
          onSelect={setSelectedOption}
          onSubmit={handleSubmit}
        />
      )}
      {view === "feedback" && currentScenario && selectedOption && (
        <FeedbackPanel
          scenario={currentScenario}
          selectedOption={selectedOption}
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
