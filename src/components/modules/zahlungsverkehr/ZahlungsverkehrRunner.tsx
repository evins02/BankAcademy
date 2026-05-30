"use client";

import { useState, useCallback } from "react";
import { LevelSelector } from "./LevelSelector";
import { LernblockCard } from "./LernblockCard";
import { CaseCard } from "./CaseCard";
import { FeedbackPanel } from "./FeedbackPanel";
import { type CaseResult } from "./LevelComplete";
import { ZV_LEVELS, type LevelNum, type OptionKey } from "@/lib/zahlungsverkehr";
import { LevelCelebration } from "@/components/shared/LevelCelebration";
import { ModuleComplete } from "@/components/shared/ModuleComplete";
import { FirstTimeTutorial } from "@/components/shared/FirstTimeTutorial";
import { getProgress, saveProgress } from "@/lib/progressData";

type View = "selector" | "lernblock" | "playing" | "feedback" | "level-complete" | "module-complete";

const MAX_LEVEL = 3 as LevelNum;

export function ZahlungsverkehrRunner() {
  const [completedLevels, setCompletedLevels] = useState<Set<LevelNum>>(new Set());
  const [levelScores, setLevelScores] = useState<Partial<Record<LevelNum, number>>>({});

  const [view, setView] = useState<View>("selector");
  const [activeLevel, setActiveLevel] = useState<LevelNum>(1);
  const [caseIndex, setCaseIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<OptionKey | null>(null);
  const [sessionResults, setSessionResults] = useState<CaseResult[]>([]);

  const levelConfig = ZV_LEVELS.find((l) => l.level === activeLevel)!;
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

    if (isLastCase) {
      const score = newResults.filter((r) => r.correct).length;
      setCompletedLevels((prev) => {
        const next = new Set(prev);
        next.add(activeLevel);
        return next;
      });
      setLevelScores((prev) => ({ ...prev, [activeLevel]: score }));

      // Persist progress
      const lvlConfig = ZV_LEVELS.find((l) => l.level === activeLevel)!;
      const totalZvCases = ZV_LEVELS.reduce((s, l) => s + l.cases.length, 0);
      const prog = getProgress();
      const prev = prog["banking-operations-zahlungsverkehr"];
      const prevCompleted = prev?.completed ?? 0;
      const prevCorrect = prev ? Math.round((prev.accuracy / 100) * prevCompleted) : 0;
      const newCompleted = Math.min(prevCompleted + lvlConfig.cases.length, totalZvCases);
      const newAccuracy = Math.round(((prevCorrect + score) / newCompleted) * 100);
      saveProgress({
        ...prog,
        "banking-operations-zahlungsverkehr": {
          moduleId: "banking-operations-zahlungsverkehr",
          completed: newCompleted,
          total: totalZvCases,
          accuracy: Math.min(100, newAccuracy),
          lastAttempt: new Date().toISOString(),
          errors: prev?.errors ?? [],
        },
      });

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

      {view === "lernblock" && (
        <LernblockCard level={activeLevel} onContinue={handleLernblockDone} />
      )}

      {view === "playing" && <FirstTimeTutorial />}
      {view === "playing" && currentCase && (
        <CaseCard
          zvCase={currentCase}
          caseIndex={caseIndex}
          total={total}
          selectedOption={selectedOption}
          onSelect={setSelectedOption}
          onSubmit={handleSubmit}
        />
      )}

      {view === "feedback" && currentCase && selectedOption && (
        <FeedbackPanel
          zvCase={currentCase}
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
            label: `Fall ${i + 1}`,
          }))}
          isLastLevel={activeLevel === MAX_LEVEL}
          onNext={handleLevelNext}
          onRetry={handleRetry}
          onBack={() => setView("selector")}
        />
      )}

      {view === "module-complete" && (
        <ModuleComplete
          moduleName="Zahlungsverkehr"
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
