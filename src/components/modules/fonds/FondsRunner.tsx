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
import { FirstTimeTutorial } from "@/components/shared/FirstTimeTutorial";
import { SmartTipBanner } from "@/components/shared/SmartTipBanner";
import { NoteModal } from "@/components/shared/NoteModal";
import { getProgress, saveProgress } from "@/lib/progressData";
import { useGlossar } from "@/context/GlossarContext";
import { getSettings } from "@/lib/settingsData";

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

  const [wrongStreak, setWrongStreak] = useState(0);
  const [showSmartTip, setShowSmartTip] = useState(false);
  const [levelStartTime, setLevelStartTime] = useState(Date.now());
  const [levelElapsed, setLevelElapsed] = useState<number | undefined>(undefined);
  const [noteOpen, setNoteOpen] = useState(false);
  const [moduleAccuracy, setModuleAccuracy] = useState<number | undefined>(undefined);

  const { open: openGlossar } = useGlossar();

  const levelConfig = FONDS_LEVELS.find((l) => l.level === activeLevel)!;
  const currentCase = levelConfig.cases[caseIndex];
  const total = levelConfig.cases.length;
  const isLastCase = caseIndex === total - 1;

  const handleSelectLevel = useCallback((level: LevelNum) => {
    setActiveLevel(level);
    setCaseIndex(0);
    setSelectedOption(null);
    setSessionResults([]);
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
    if (!selectedOption) return;

    const isCorrect = selectedOption === currentCase.correct;
    const newResults: CaseResult[] = [
      ...sessionResults,
      { caseId: currentCase.id, correct: isCorrect, selectedOption },
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
      const lvlConfig = FONDS_LEVELS.find((l) => l.level === activeLevel)!;
      const totalFondsCases = FONDS_LEVELS.reduce((s, l) => s + l.cases.length, 0);
      const prog = getProgress();
      const prev = prog["privatkunde-fonds"];
      const prevCompleted = prev?.completed ?? 0;
      const prevCorrect = prev ? Math.round((prev.accuracy / 100) * prevCompleted) : 0;
      const newCompleted = Math.min(prevCompleted + lvlConfig.cases.length, totalFondsCases);
      const newAccuracy = Math.round(((prevCorrect + score) / newCompleted) * 100);
      saveProgress({
        ...prog,
        "privatkunde-fonds": {
          moduleId: "privatkunde-fonds",
          completed: newCompleted,
          total: totalFondsCases,
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
  }, [selectedOption, currentCase, sessionResults, isLastCase, activeLevel, wrongStreak, levelStartTime]);

  const handleRetry = useCallback(() => {
    setCaseIndex(0);
    setSelectedOption(null);
    setSessionResults([]);
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
      setWrongStreak(0);
      setShowSmartTip(false);
      setLevelElapsed(undefined);
      setView("lernblock");
    } else {
      // Compute overall accuracy for module
      const allScores = { ...levelScores };
      const totalCorrect = Object.values(allScores).reduce((s, sc) => s + (sc ?? 0), 0);
      const totalCases = FONDS_LEVELS.reduce((s, l) => s + l.cases.length, 0);
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
        <LernblockCards onContinue={handleLernblockDone} />
      )}

      {view === "playing" && <FirstTimeTutorial />}

      {view === "playing" && showSmartTip && (
        <SmartTipBanner
          topic="Fonds"
          onDismiss={() => setShowSmartTip(false)}
          onOpenGlossar={openGlossar}
        />
      )}

      {view === "playing" && currentCase && (
        <CaseCard
          fondsCase={currentCase}
          caseIndex={caseIndex}
          total={total}
          selectedOption={selectedOption}
          onSelect={setSelectedOption}
          onSubmit={handleSubmit}
          onOpenNote={() => setNoteOpen(true)}
          levelStartTime={timerEnabled ? levelStartTime : undefined}
        />
      )}

      {view === "feedback" && currentCase && selectedOption && (
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
          timeSeconds={levelElapsed}
          onNext={handleLevelNext}
          onRetry={handleRetry}
          onBack={() => setView("selector")}
        />
      )}

      {view === "module-complete" && (
        <ModuleComplete
          moduleName="Fonds"
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
          scenarioId={`fonds-${currentCase.id}`}
          moduleId="privatkunde-fonds"
          moduleName="Fonds"
          onClose={() => setNoteOpen(false)}
        />
      )}
    </div>
  );
}
