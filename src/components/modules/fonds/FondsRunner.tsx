"use client";

import { useState, useCallback } from "react";
import { LevelSelector } from "./LevelSelector";
import { LernblockCards } from "./LernblockCards";
import { CaseCard } from "./CaseCard";
import { FeedbackCard } from "./FeedbackCard";
import { type CaseResult } from "./LevelComplete";
import { FONDS_LEVELS, type LevelNum } from "@/lib/fonds";
import { LevelCelebration } from "@/components/shared/LevelCelebration";
import { ModuleComplete } from "@/components/shared/ModuleComplete";

type View = "selector" | "lernblock" | "playing" | "feedback" | "level-complete" | "module-complete";

const MAX_LEVEL = 3 as LevelNum;

export function FondsRunner() {
  const [completedLevels, setCompletedLevels] = useState<Set<LevelNum>>(new Set());
  const [levelScores, setLevelScores] = useState<Partial<Record<LevelNum, number>>>({});

  const [view, setView] = useState<View>("selector");
  const [activeLevel, setActiveLevel] = useState<LevelNum>(1);
  const [caseIndex, setCaseIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [sessionResults, setSessionResults] = useState<CaseResult[]>([]);

  const levelConfig = FONDS_LEVELS.find((l) => l.level === activeLevel)!;
  const currentCase = levelConfig.cases[caseIndex];
  const total = levelConfig.cases.length;
  const isLastCase = caseIndex === total - 1;

  const handleSelectLevel = useCallback((level: LevelNum) => {
    setActiveLevel(level);
    setCaseIndex(0);
    setSelectedOption(null);
    setSessionResults([]);
    setView("lernblock");
  }, []);

  const handleLernblockDone = useCallback(() => setView("playing"), []);

  const handleSubmit = useCallback(() => setView("feedback"), []);

  const handleNext = useCallback(() => {
    if (!selectedOption) return;
    const isCorrect = selectedOption === currentCase.correct;
    const newResults: CaseResult[] = [
      ...sessionResults,
      { caseId: currentCase.id, correct: isCorrect, selectedOption },
    ];
    setSessionResults(newResults);

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

  const handleLevelNext = useCallback(() => {
    if (activeLevel < MAX_LEVEL) {
      setActiveLevel((l) => (l + 1) as LevelNum);
      setCaseIndex(0);
      setSelectedOption(null);
      setSessionResults([]);
      setView("lernblock");
    } else {
      setView("module-complete");
    }
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
          fondsCase={currentCase}
          caseIndex={caseIndex}
          total={total}
          selectedOption={selectedOption}
          onSelect={setSelectedOption}
          onSubmit={handleSubmit}
        />
      )}
      {view === "feedback" && selectedOption && (
        <FeedbackCard
          fondsCase={currentCase}
          selectedOption={selectedOption}
          caseIndex={caseIndex}
          total={total}
          isLastCase={isLastCase}
          onNext={handleNext}
        />
      )}
      {view === "level-complete" && (
        <LevelCelebration
          levelNum={activeLevel}
          levelLabel={levelConfig.label}
          results={sessionResults.map((r, i) => ({
            correct: r.correct,
            label: levelConfig.cases[i]?.title ?? `Fall ${i + 1}`,
          }))}
          isLastLevel={activeLevel === MAX_LEVEL}
          onNext={handleLevelNext}
          onRetry={handleRetry}
          onBack={() => setView("selector")}
        />
      )}
      {view === "module-complete" && (
        <ModuleComplete
          moduleName="Fonds"
          onRestart={() => {
            setCompletedLevels(new Set());
            setLevelScores({});
            setView("selector");
          }}
          onBack={() => setView("selector")}
        />
      )}
    </div>
  );
}
