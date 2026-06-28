"use client";

import { useState, useCallback } from "react";
import { LevelSelector } from "./LevelSelector";
import { LernblockCard } from "./LernblockCard";
import { CaseCard } from "./CaseCard";
import { FeedbackPanel } from "./FeedbackPanel";
import { type CaseResult } from "./LevelComplete";
import { ZV_LEVELS, type LevelNum, type OptionKey } from "@/lib/zahlungsverkehr";
import { LückentextCard } from "@/components/shared/LückentextCard";
import { LückentextResultCard } from "@/components/shared/LückentextResultCard";
import { type LückentextCase, checkLückentextAnswer } from "@/lib/lückentext";
import { LevelCelebration } from "@/components/shared/LevelCelebration";
import { ModuleComplete } from "@/components/shared/ModuleComplete";
import { FirstTimeTutorial } from "@/components/shared/FirstTimeTutorial";
import { SmartTipBanner } from "@/components/shared/SmartTipBanner";
import { NoteModal } from "@/components/shared/NoteModal";
import { getProgress, saveProgress } from "@/lib/progressData";
import { useGlossar } from "@/context/GlossarContext";
import { getSettings } from "@/lib/settingsData";

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
  const [lückentextAnswer, setLückentextAnswer] = useState("");

  const [wrongStreak, setWrongStreak] = useState(0);
  const [showSmartTip, setShowSmartTip] = useState(false);
  const [levelStartTime, setLevelStartTime] = useState(Date.now());
  const [levelElapsed, setLevelElapsed] = useState<number | undefined>(undefined);
  const [noteOpen, setNoteOpen] = useState(false);
  const [moduleAccuracy, setModuleAccuracy] = useState<number | undefined>(undefined);

  const { open: openGlossar } = useGlossar();

  const levelConfig = ZV_LEVELS.find((l) => l.level === activeLevel)!;
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
    setWrongStreak(0);
    setShowSmartTip(false);
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

    if (isCorrect) {
      setWrongStreak(0);
    } else {
      const newStreak = wrongStreak + 1;
      setWrongStreak(newStreak);
      if (newStreak >= 3) setShowSmartTip(true);
    }

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
      setLückentextAnswer("");
      setView("playing");
    }
  }, [selectedOption, currentCase, sessionResults, isLastCase, activeLevel, wrongStreak, levelStartTime, lückentextAnswer]);

  const handleRetry = useCallback(() => {
    setCaseIndex(0);
    setSelectedOption(null);
    setSessionResults([]);
    setLückentextAnswer("");
    setWrongStreak(0);
    setShowSmartTip(false);
    setView("lernblock");
  }, []);

  const handleLevelNext = useCallback(() => {
    if (activeLevel < MAX_LEVEL) {
      setActiveLevel((l) => (l + 1) as LevelNum);
      setCaseIndex(0);
      setSelectedOption(null);
      setSessionResults([]);
      setLückentextAnswer("");
      setWrongStreak(0);
      setShowSmartTip(false);
      setLevelElapsed(undefined);
      setView("lernblock");
    } else {
      const allScores = { ...levelScores };
      const totalCorrect = Object.values(allScores).reduce((s, sc) => s + (sc ?? 0), 0);
      const totalCases = ZV_LEVELS.reduce((s, l) => s + l.cases.length, 0);
      setModuleAccuracy(Math.round((totalCorrect / totalCases) * 100));
      setView("module-complete");
    }
  }, [activeLevel, levelScores]);

  const timerEnabled = typeof window !== "undefined" ? getSettings().timerEnabled : true;

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

      {view === "playing" && showSmartTip && (
        <SmartTipBanner
          topic="Zahlungsverkehr"
          onDismiss={() => setShowSmartTip(false)}
          onOpenGlossar={openGlossar}
        />
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
            zvCase={currentCase}
            caseIndex={caseIndex}
            total={total}
            selectedOption={selectedOption}
            onSelect={setSelectedOption}
            onSubmit={handleSubmit}
            onOpenNote={() => setNoteOpen(true)}
            levelStartTime={timerEnabled ? levelStartTime : undefined}
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
            zvCase={currentCase}
            selectedOption={selectedOption!}
            caseIndex={caseIndex}
            total={total}
            isLastCase={isLastCase}
            onNext={handleNext}
          />
        )
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
          timeSeconds={levelElapsed}
          onNext={handleLevelNext}
          onRetry={handleRetry}
          onBack={() => setView("selector")}
        />
      )}

      {view === "module-complete" && (
        <ModuleComplete
          moduleName="Zahlungsverkehr"
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

      {noteOpen && currentCase && (
        <NoteModal
          scenarioId={`zv-${currentCase.id}`}
          moduleId="banking-operations-zahlungsverkehr"
          moduleName="Zahlungsverkehr"
          onClose={() => setNoteOpen(false)}
        />
      )}
    </div>
  );
}
