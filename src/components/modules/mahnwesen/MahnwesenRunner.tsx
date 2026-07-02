"use client";

import { useState, useCallback, useMemo } from "react";
import { AlertTriangle } from "lucide-react";
import { LevelSelector } from "./LevelSelector";
import { LernblockCard } from "./LernblockCard";
import { CaseCard } from "./CaseCard";
import { FeedbackPanel } from "./FeedbackPanel";
import { LevelComplete, type CaseResult } from "./LevelComplete";
import { MW_LEVELS, type LevelNum, type OptionKey } from "@/lib/mahnwesen";
import { LückentextCard } from "@/components/shared/LückentextCard";
import { LückentextResultCard } from "@/components/shared/LückentextResultCard";
import { type LückentextCase, checkLückentextAnswer } from "@/lib/lückentext";
import { OffeneFrageCard } from "@/components/shared/OffeneFrageCard";
import { OffeneFrageResultCard } from "@/components/shared/OffeneFrageResultCard";
import { type OffeneFrageCase } from "@/lib/offene-frage";
import { resolveSessionCases, resetAllSessions } from "@/lib/sessionScenarios";
import { recordConceptError } from "@/lib/conceptTracker";

type View = "selector" | "lernblock" | "playing" | "feedback" | "level-complete";

export function MahnwesenRunner() {
  const [completedLevels, setCompletedLevels] = useState<Set<LevelNum>>(new Set());
  const [levelScores, setLevelScores] = useState<Partial<Record<LevelNum, number>>>({});

  const [view, setView] = useState<View>("selector");
  const [activeLevel, setActiveLevel] = useState<LevelNum>(1);
  const [caseIndex, setCaseIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<OptionKey | null>(null);
  const [sessionResults, setSessionResults] = useState<CaseResult[]>([]);
  const [lückentextAnswer, setLückentextAnswer] = useState("");
  const [offeneFrageAnswer, setOffeneFrageAnswer] = useState("");

  const levelConfig = MW_LEVELS.find((l) => l.level === activeLevel)!;
  const activeCases = useMemo(
    () => resolveSessionCases("banking-operations-mahnwesen", activeLevel, levelConfig.cases),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeLevel],
  );
  const currentCase = activeCases[caseIndex];
  const total = activeCases.length;
  const isLastCase = caseIndex === total - 1;

  const isLt = (c: unknown): c is LückentextCase =>
    typeof c === "object" && c !== null && (c as LückentextCase).type === "lückentext";

  const isOf = (c: unknown): c is OffeneFrageCase =>
    typeof c === "object" && c !== null && (c as OffeneFrageCase).type === "offene-frage";

  const handleSelectLevel = useCallback((level: LevelNum) => {
    setActiveLevel(level);
    setCaseIndex(0);
    setSelectedOption(null);
    setSessionResults([]);
    setLückentextAnswer("");
    setOffeneFrageAnswer("");
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
    const isOffeneFrage = isOf(currentCase);
    if (!isLückentext && !isOffeneFrage && !selectedOption) return;

    const isCorrect = isOffeneFrage
      ? true
      : isLückentext
        ? checkLückentextAnswer(lückentextAnswer, (currentCase as LückentextCase).answer, (currentCase as LückentextCase).tolerance)
        : selectedOption === (currentCase as { correct: OptionKey }).correct;
    const newResults: CaseResult[] = [
      ...sessionResults,
      { caseId: currentCase.id, correct: isCorrect, selectedOption: selectedOption ?? "" },
    ];
    setSessionResults(newResults);

    if (!isCorrect && "concepts" in currentCase) recordConceptError("banking-operations-mahnwesen", (currentCase as {concepts?: string[]}).concepts ?? []);
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
      setOffeneFrageAnswer("");
      setView("playing");
    }
  }, [selectedOption, currentCase, sessionResults, isLastCase, activeLevel, lückentextAnswer, offeneFrageAnswer]);

  const handleRetry = useCallback(() => {
    setCaseIndex(0);
    setSelectedOption(null);
    setSessionResults([]);
    setLückentextAnswer("");
    setOffeneFrageAnswer("");
    setView("lernblock");
  }, []);

  const handleGoToSelector = useCallback(() => {
    setView("selector");
  }, []);

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="mx-auto mb-5 max-w-2xl">
        <div className="flex items-start gap-3 rounded-DEFAULT border border-amber-300 bg-amber-50 p-3">
          <AlertTriangle size={16} className="mt-0.5 shrink-0 text-amber-600" />
          <p className="text-sm text-amber-800">
            Die dargestellten Fristen sind Richtwerte. Bankinterne Weisungen können abweichen.
          </p>
        </div>
      </div>

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
        ) : isOf(currentCase) ? (
          <OffeneFrageCard
            c={currentCase}
            caseIndex={caseIndex}
            total={total}
            levelLabel={levelConfig.label}
            badgeVariant={levelConfig.badgeVariant}
            answer={offeneFrageAnswer}
            onAnswerChange={setOffeneFrageAnswer}
            onSubmit={handleSubmit}
          />
        ) : (
          <CaseCard
            mwCase={currentCase}
            caseIndex={caseIndex}
            total={total}
            selectedOption={selectedOption}
            onSelect={setSelectedOption}
            onSubmit={handleSubmit}
          />
        )
      )}

      {view === "feedback" && currentCase && (selectedOption || isLt(currentCase) || isOf(currentCase)) && (
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
        ) : isOf(currentCase) ? (
          <OffeneFrageResultCard
            c={currentCase}
            studentAnswer={offeneFrageAnswer}
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
            mwCase={currentCase}
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
