"use client";

import { useState, useCallback } from "react";
import { LevelSelector } from "./LevelSelector";
import { LernblockCard } from "./LernblockCard";
import { CaseCard } from "./CaseCard";
import { FeedbackPanel } from "./FeedbackPanel";
import { LevelComplete, type CaseResult } from "./LevelComplete";
import { BK_LEVELS, type LevelNum, type OptionKey } from "@/lib/blankokredit";
import { LückentextCard } from "@/components/shared/LückentextCard";
import { LückentextResultCard } from "@/components/shared/LückentextResultCard";
import { type LückentextCase, checkLückentextAnswer } from "@/lib/lückentext";

type View = "selector" | "lernblock" | "playing" | "feedback" | "level-complete";

export function BlankokreditRunner() {
  const [completedLevels, setCompletedLevels] = useState<Set<LevelNum>>(new Set());
  const [levelScores, setLevelScores] = useState<Partial<Record<LevelNum, number>>>({});

  const [view, setView] = useState<View>("selector");
  const [activeLevel, setActiveLevel] = useState<LevelNum>(1);
  const [caseIndex, setCaseIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<OptionKey | null>(null);
  const [sessionResults, setSessionResults] = useState<CaseResult[]>([]);
  const [lückentextAnswer, setLückentextAnswer] = useState("");

  const levelConfig = BK_LEVELS.find((l) => l.level === activeLevel)!;
  const currentCase = levelConfig.cases[caseIndex];
  const total = levelConfig.cases.length;
  const isLastCase = caseIndex === total - 1;

  const isLt = (c: unknown): c is LückentextCase =>
    typeof c === "object" && c !== null && (c as LückentextCase).type === "lückentext";

  const handleSelectLevel = useCallback((level: LevelNum) => {
    setActiveLevel(level);
    setCaseIndex(0);
    setSelectedOption(null);
    setSessionResults([]);
    setLückentextAnswer("");
    setView("lernblock");
  }, []);

  const handleLernblockDone = useCallback(() => {
    setView("playing");
  }, []);

  const handleSubmit = useCallback(() => {
    setView("feedback");
  }, []);

  const handleNext = useCallback(() => {
    const isLückentext = isLt(currentCase);
    if (!isLückentext && !selectedOption) return;

    const isCorrect = isLückentext
      ? checkLückentextAnswer(lückentextAnswer, (currentCase as LückentextCase).answer, (currentCase as LückentextCase).tolerance)
      : selectedOption === (currentCase as { correct: OptionKey }).correct;
    const newResults: CaseResult[] = [
      ...sessionResults,
      { caseId: currentCase.id, correct: isCorrect, selectedOption: selectedOption ?? "" },
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
      setLückentextAnswer("");
      setView("playing");
    }
  }, [selectedOption, currentCase, sessionResults, isLastCase, activeLevel, lückentextAnswer]);

  const handleRetry = useCallback(() => {
    setCaseIndex(0);
    setSelectedOption(null);
    setSessionResults([]);
    setLückentextAnswer("");
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
        <LernblockCard level={activeLevel} onContinue={handleLernblockDone} />
      )}

      {view === "playing" && currentCase && (
        isLt(currentCase) ? (
          <LückentextCard
            c={currentCase}
            caseIndex={caseIndex}
            total={total}
            levelLabel={levelConfig.label}
            badgeVariant={levelConfig.badgeVariant}
            answer={lückentextAnswer}
            onAnswerChange={setLückentextAnswer}
            onSubmit={handleSubmit}
          />
        ) : (
          <CaseCard
            bkCase={currentCase}
            caseIndex={caseIndex}
            total={total}
            selectedOption={selectedOption}
            onSelect={setSelectedOption}
            onSubmit={handleSubmit}
          />
        )
      )}

      {view === "feedback" && currentCase && (selectedOption || isLt(currentCase)) && (
        isLt(currentCase) ? (
          <LückentextResultCard
            c={currentCase}
            studentAnswer={lückentextAnswer}
            isCorrect={checkLückentextAnswer(lückentextAnswer, currentCase.answer, currentCase.tolerance)}
            caseIndex={caseIndex}
            total={total}
            levelLabel={levelConfig.label}
            badgeVariant={levelConfig.badgeVariant}
            isLastCase={isLastCase}
            nextLabel={isLastCase ? "Level abschliessen" : undefined}
            onNext={handleNext}
          />
        ) : (
          <FeedbackPanel
            bkCase={currentCase}
            selectedOption={selectedOption!}
            caseIndex={caseIndex}
            total={total}
            isLastCase={isLastCase}
            onNext={handleNext}
          />
        )
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
