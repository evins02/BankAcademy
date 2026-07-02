"use client";

import { useState, useCallback, useMemo } from "react";
import { LevelSelector } from "./LevelSelector";
import { LernblockCards } from "./LernblockCards";
import { CaseCard } from "./CaseCard";
import { FeedbackCard } from "./FeedbackCard";
import { LevelComplete, type CaseResult } from "./LevelComplete";
import { ZV_FO_LEVELS, type LevelNum } from "@/lib/zahlungsverkehr-privat";
import { resolveSessionCases, resetAllSessions } from "@/lib/sessionScenarios";
import { recordConceptError } from "@/lib/conceptTracker";

type View = "selector" | "lernblock" | "playing" | "feedback" | "level-complete";

export function ZvPrivatRunner() {
  const [completedLevels, setCompletedLevels] = useState<Set<LevelNum>>(new Set());
  const [levelScores, setLevelScores] = useState<Partial<Record<LevelNum, number>>>({});

  const [view, setView] = useState<View>("selector");
  const [activeLevel, setActiveLevel] = useState<LevelNum>(1);
  const [caseIndex, setCaseIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [sessionResults, setSessionResults] = useState<CaseResult[]>([]);

  const levelConfig = ZV_FO_LEVELS.find((l) => l.level === activeLevel)!;
  const activeCases = useMemo(
    () => resolveSessionCases("privatkunde-zahlungsverkehr", activeLevel, levelConfig.cases),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeLevel],
  );
  const currentCase = activeCases[caseIndex];
  const total = activeCases.length;
  const isLastCase = caseIndex === total - 1;

  const handleSelectLevel = useCallback((level: LevelNum) => {
    setActiveLevel(level);
    setCaseIndex(0);
    setSelectedOption(null);
    setSessionResults([]);
    setView("lernblock");
  }, []);

  const handleLernblockDone = useCallback(() => {
    setView("playing");
  }, []);

  const handleSubmit = useCallback(() => {
    setView("feedback");
  }, []);

  const handleNext = useCallback(() => {
    if (!selectedOption) return;

    const isCorrect = selectedOption === currentCase.correct;
    const newResults: CaseResult[] = [
      ...sessionResults,
      { caseId: currentCase.id, correct: isCorrect, selectedOption },
    ];
    setSessionResults(newResults);

    if (!isCorrect && "concepts" in currentCase) recordConceptError("privatkunde-zahlungsverkehr", (currentCase as {concepts?: string[]}).concepts ?? []);
    if (isLastCase) {
      const score = newResults.filter((r) => r.correct).length;
      setCompletedLevels((prev) => {
        const next = new Set(prev);
        next.add(activeLevel);
        return next;
      });
      setLevelScores((prev) => ({ ...prev, [activeLevel]: score }));
      setView("level-complete");
    } else {
      setCaseIndex((i) => i + 1);
      setSelectedOption(null);
      setView("playing");
    }
  }, [selectedOption, currentCase, sessionResults, isLastCase, activeLevel]);

  const handleRetry = useCallback(() => {
    setCaseIndex(0);
    setSelectedOption(null);
    setSessionResults([]);
    setView("lernblock");
  }, []);

  const handleNextLevel = useCallback(() => {
    const nextLevel = (activeLevel + 1) as LevelNum;
    setActiveLevel(nextLevel);
    setCaseIndex(0);
    setSelectedOption(null);
    setSessionResults([]);
    setView("lernblock");
  }, [activeLevel]);

  return (
    <div className="flex-1 overflow-y-auto p-6">
      {view === "selector" && (
        <LevelSelector
          completedLevels={completedLevels}
          levelScores={levelScores}
          onSelectLevel={handleSelectLevel}
        />
      )}

      {view === "lernblock" && <LernblockCards onContinue={handleLernblockDone} />}

      {view === "playing" && (
        <CaseCard
          zvCase={currentCase}
          caseIndex={caseIndex}
          total={total}
          selectedOption={selectedOption}
          onSelect={setSelectedOption}
          onSubmit={handleSubmit}
        />
      )}

      {view === "feedback" && selectedOption && (
        <FeedbackCard
          zvCase={currentCase}
          selectedOption={selectedOption}
          caseIndex={caseIndex}
          total={total}
          isLastCase={isLastCase}
          onNext={handleNext}
        />
      )}

      {view === "level-complete" && (
        <LevelComplete
          level={activeLevel}
          results={sessionResults}
          onNext={handleNextLevel}
          onRetry={handleRetry}
        />
      )}
    </div>
  );
}
