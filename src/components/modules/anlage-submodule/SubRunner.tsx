"use client";

import { useState, useCallback } from "react";
import type { SubmoduleLevel, LevelNum } from "@/lib/anlage-submodule-types";
import { SubLevelSelector } from "./SubLevelSelector";
import { SubCaseCard } from "./SubCaseCard";
import { SubFeedbackCard } from "./SubFeedbackCard";
import { LevelCelebration } from "@/components/shared/LevelCelebration";
import { ModuleComplete } from "@/components/shared/ModuleComplete";

type View = "selector" | "lernblock" | "playing" | "feedback" | "level-complete" | "module-complete";

interface CaseResult {
  caseId: string;
  correct: boolean;
  selectedOption: string;
}

interface SubRunnerProps {
  levels: SubmoduleLevel[];
  moduleId: string;
  moduleName: string;
  selectorTitle: string;
  selectorDescription: string;
  LernblockComponent: React.ComponentType<{ onContinue: () => void }>;
}

export function SubRunner({
  levels,
  moduleId,
  moduleName,
  selectorTitle,
  selectorDescription,
  LernblockComponent,
}: SubRunnerProps) {
  const [completedLevels, setCompletedLevels] = useState<Set<LevelNum>>(new Set());
  const [levelScores, setLevelScores] = useState<Partial<Record<LevelNum, number>>>({});

  const [view, setView] = useState<View>("selector");
  const [activeLevel, setActiveLevel] = useState<LevelNum>(1);
  const [caseIndex, setCaseIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [sessionResults, setSessionResults] = useState<CaseResult[]>([]);
  const [levelStartTime, setLevelStartTime] = useState(Date.now());
  const [levelElapsed, setLevelElapsed] = useState<number | undefined>(undefined);
  const [moduleAccuracy, setModuleAccuracy] = useState<number | undefined>(undefined);

  const MAX_LEVEL = 3 as LevelNum;
  const levelConfig = levels.find((l) => l.level === activeLevel)!;
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
    setLevelStartTime(Date.now());
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
      const elapsed = Math.round((Date.now() - levelStartTime) / 1000);
      setLevelElapsed(elapsed);
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
  }, [selectedOption, currentCase, sessionResults, isLastCase, activeLevel, levelStartTime]);

  const handleRetry = useCallback(() => {
    setCaseIndex(0);
    setSelectedOption(null);
    setSessionResults([]);
    setLevelElapsed(undefined);
    setView("lernblock");
  }, []);

  const handleLevelNext = useCallback(() => {
    if (activeLevel < MAX_LEVEL) {
      setActiveLevel((l) => (l + 1) as LevelNum);
      setCaseIndex(0);
      setSelectedOption(null);
      setSessionResults([]);
      setLevelElapsed(undefined);
      setView("lernblock");
    } else {
      const allScores = { ...levelScores };
      const totalCorrect = Object.values(allScores).reduce((s, sc) => s + (sc ?? 0), 0);
      const totalCases = levels.reduce((s, l) => s + l.cases.length, 0);
      setModuleAccuracy(Math.round((totalCorrect / totalCases) * 100));
      setView("module-complete");
    }
  }, [activeLevel, levelScores, levels]);

  void moduleId; // used for progress tracking in future

  return (
    <div className="flex-1 overflow-y-auto p-6">
      {view === "selector" && (
        <SubLevelSelector
          levels={levels}
          completedLevels={completedLevels}
          levelScores={levelScores}
          onSelectLevel={handleSelectLevel}
          title={selectorTitle}
          description={selectorDescription}
        />
      )}

      {view === "lernblock" && (
        <LernblockComponent onContinue={handleLernblockDone} />
      )}

      {view === "playing" && currentCase && (
        <SubCaseCard
          subCase={currentCase}
          levels={levels}
          caseIndex={caseIndex}
          total={total}
          selectedOption={selectedOption}
          onSelect={setSelectedOption}
          onSubmit={handleSubmit}
        />
      )}

      {view === "feedback" && currentCase && selectedOption && (
        <SubFeedbackCard
          subCase={currentCase}
          levels={levels}
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
          timeSeconds={levelElapsed}
          onNext={handleLevelNext}
          onRetry={handleRetry}
          onBack={() => setView("selector")}
        />
      )}

      {view === "module-complete" && (
        <ModuleComplete
          moduleName={moduleName}
          accuracy={moduleAccuracy}
          onRestart={() => {
            setCompletedLevels(new Set());
            setLevelScores({});
            setModuleAccuracy(undefined);
            setView("selector");
          }}
          onBack={() => setView("selector")}
        />
      )}
    </div>
  );
}
