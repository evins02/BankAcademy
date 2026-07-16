"use client";

import { useState, useCallback, useMemo } from "react";
import { LevelSelector } from "./LevelSelector";
import { LernblockCard } from "./LernblockCard";
import { CaseCard } from "./CaseCard";
import { FeedbackPanel } from "./FeedbackPanel";
import { LevelComplete, type ScenarioResult } from "./LevelComplete";
import { CO_LEVELS, type LevelNum, type OptionKey } from "@/lib/credit-operations";
import { LückentextCard } from "@/components/shared/LückentextCard";
import { LückentextResultCard } from "@/components/shared/LückentextResultCard";
import { type LückentextCase, checkLückentextAnswer } from "@/lib/lückentext";
import { OffeneFrageCard } from "@/components/shared/OffeneFrageCard";
import { OffeneFrageResultCard } from "@/components/shared/OffeneFrageResultCard";
import { type OffeneFrageCase } from "@/lib/offene-frage";
import { resolveSessionCases } from "@/lib/sessionScenarios";
import { recordConceptError } from "@/lib/conceptTracker";
import { addAttemptRecord } from "@/lib/error-tracking";
import { NoteModal } from "@/components/shared/NoteModal";

type View = "selector" | "lernblock" | "playing" | "feedback" | "level-complete";

export function CreditOperationsRunner() {
  const [completedLevels, setCompletedLevels] = useState<Set<LevelNum>>(new Set());
  const [levelScores, setLevelScores] = useState<Partial<Record<LevelNum, number>>>({});
  const [noteOpen, setNoteOpen] = useState(false);

  const [view, setView] = useState<View>("selector");
  const [activeLevel, setActiveLevel] = useState<LevelNum>(1);
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<OptionKey | null>(null);
  const [sessionResults, setSessionResults] = useState<ScenarioResult[]>([]);
  const [lückentextAnswer, setLückentextAnswer] = useState("");
  const [offeneFrageAnswer, setOffeneFrageAnswer] = useState("");

  const levelConfig = CO_LEVELS.find((l) => l.level === activeLevel)!;
  const activeScenarios = useMemo(
    () => resolveSessionCases("backoffice-credit-operations", activeLevel, levelConfig.scenarios),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeLevel],
  );
  const currentScenario = activeScenarios[scenarioIndex];
  const total = activeScenarios.length;
  const isLastScenario = scenarioIndex === total - 1;

  const isLt = (c: unknown): c is LückentextCase =>
    typeof c === "object" && c !== null && (c as LückentextCase).type === "lückentext";

  const isOf = (c: unknown): c is OffeneFrageCase =>
    typeof c === "object" && c !== null && (c as OffeneFrageCase).type === "offene-frage";

  const handleSelectLevel = useCallback((level: LevelNum) => {
    setActiveLevel(level);
    setScenarioIndex(0);
    setSelectedOption(null);
    setSessionResults([]);
    setLückentextAnswer("");
    setOffeneFrageAnswer("");
    setView("lernblock");
  }, []);

  const handleSubmit = useCallback(() => {
    setView("feedback");
  }, []);

  const handleNext = useCallback(() => {
    const isLückentext = isLt(currentScenario);
    const isOffeneFrage = isOf(currentScenario);
    if (!isLückentext && !isOffeneFrage && !selectedOption) return;

    const isCorrect = isOffeneFrage
      ? true
      : isLückentext
        ? checkLückentextAnswer(lückentextAnswer, (currentScenario as LückentextCase).answer, (currentScenario as LückentextCase).tolerance)
        : selectedOption === (currentScenario as { correct: OptionKey }).correct;
    const newResults: ScenarioResult[] = [
      ...sessionResults,
      { scenarioId: currentScenario.id, correct: isCorrect, selectedOption: selectedOption ?? "" },
    ];
    setSessionResults(newResults);

    if (!isCorrect && "concepts" in currentScenario) recordConceptError("backoffice-credit-operations", (currentScenario as {concepts?: string[]}).concepts ?? []);
    if (!isOffeneFrage) {
      const _c = currentScenario as unknown as Record<string, unknown>;
      addAttemptRecord({
        moduleId: "backoffice-credit-operations",
        levelNum: activeLevel,
        caseId: currentScenario.id,
        caseTitle: String(_c.title ?? _c.label ?? _c.question ?? currentScenario.id),
        attempt: 1,
        timestamp: Date.now(),
        score: isCorrect ? 100 : 0,
        correct: isCorrect,
        errors: isCorrect ? [] : isLückentext
          ? [{ type: "wrong" as const, documentId: "lückentext", documentLabel: lückentextAnswer }]
          : selectedOption ? [{ type: "wrong" as const, documentId: selectedOption, documentLabel: selectedOption }] : [],
      });
    }
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
      setLückentextAnswer("");
      setOffeneFrageAnswer("");
      setView("playing");
    }
  }, [selectedOption, currentScenario, sessionResults, isLastScenario, activeLevel, lückentextAnswer, offeneFrageAnswer]);

  const handleRetry = useCallback(() => {
    setScenarioIndex(0);
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
        isLt(currentScenario) ? (
          <LückentextCard
            c={currentScenario}
            caseIndex={scenarioIndex}
            total={total}
            levelLabel={levelConfig.label}
            badgeVariant={levelConfig.badgeVariant}
            answer={lückentextAnswer}
            onAnswerChange={setLückentextAnswer}
            onSubmit={handleSubmit}
          />
        ) : isOf(currentScenario) ? (
          <OffeneFrageCard
            c={currentScenario}
            caseIndex={scenarioIndex}
            total={total}
            levelLabel={levelConfig.label}
            badgeVariant={levelConfig.badgeVariant}
            answer={offeneFrageAnswer}
            onAnswerChange={setOffeneFrageAnswer}
            onSubmit={handleSubmit}
          />
        ) : (
          <CaseCard
            scenario={currentScenario}
            scenarioIndex={scenarioIndex}
            total={total}
            selectedOption={selectedOption}
            onSelect={setSelectedOption}
            onSubmit={handleSubmit}
            onOpenNote={() => setNoteOpen(true)}
          />
        )
      )}
      {view === "feedback" && currentScenario && (selectedOption || isLt(currentScenario) || isOf(currentScenario)) && (
        isLt(currentScenario) ? (
          <LückentextResultCard
            c={currentScenario}
            studentAnswer={lückentextAnswer}
            isCorrect={checkLückentextAnswer(lückentextAnswer, currentScenario.answer, currentScenario.tolerance)}
            caseIndex={scenarioIndex}
            total={total}
            levelLabel={levelConfig.label}
            badgeVariant={levelConfig.badgeVariant}
            isLastCase={isLastScenario}
            nextLabel={isLastScenario ? "Level abschliessen" : undefined}
            onNext={handleNext}
          />
        ) : isOf(currentScenario) ? (
          <OffeneFrageResultCard
            c={currentScenario}
            studentAnswer={offeneFrageAnswer}
            caseIndex={scenarioIndex}
            total={total}
            levelLabel={levelConfig.label}
            badgeVariant={levelConfig.badgeVariant}
            isLastCase={isLastScenario}
            nextLabel={isLastScenario ? "Level abschliessen" : undefined}
            onNext={handleNext}
          />
        ) : (
          <FeedbackPanel
            scenario={currentScenario}
            selectedOption={selectedOption!}
            scenarioIndex={scenarioIndex}
            total={total}
            isLastScenario={isLastScenario}
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
      {noteOpen && currentScenario && (
        <NoteModal
          scenarioId={`credit-ops-${currentScenario.id}`}
          moduleId="backoffice-credit-operations"
          moduleName="Credit Operations"
          onClose={() => setNoteOpen(false)}
        />
      )}
    </div>
  );
}
