"use client";

import { useEffect, useState } from "react";
import { StickyNote, Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ZV_LEVELS, type ZvCase, type OptionKey } from "@/lib/zahlungsverkehr";
import { ScenarioTimer } from "@/components/shared/ScenarioTimer";
import { getNotes } from "@/lib/notesData";
import { toggleBookmark, isBookmarked } from "@/lib/bookmarksData";
import { useLanguage } from "@/context/LanguageContext";

const DIFFICULTY_XP = { 1: 100, 2: 100, 3: 100 } as const;
const DIFFICULTY_TIME = { 1: "~2 min", 2: "~3 min", 3: "~4 min" } as const;

interface CaseCardProps {
  zvCase: ZvCase;
  caseIndex: number;
  total: number;
  selectedOption: OptionKey | null;
  onSelect: (key: OptionKey) => void;
  onSubmit: () => void;
  onOpenNote: () => void;
  levelStartTime?: number;
}

export function CaseCard({
  zvCase,
  caseIndex,
  total,
  selectedOption,
  onSelect,
  onSubmit,
  onOpenNote,
  levelStartTime,
}: CaseCardProps) {
  const { t } = useLanguage();
  const levelConfig = ZV_LEVELS.find((l) => l.level === zvCase.level)!;
  const diffXp = DIFFICULTY_XP[zvCase.level as 1 | 2 | 3];
  const diffTime = DIFFICULTY_TIME[zvCase.level as 1 | 2 | 3];
  const diffLabel = zvCase.level === 1 ? t.scenarioChrome.levelBeginner : zvCase.level === 2 ? t.scenarioChrome.levelIntermediate : t.scenarioChrome.levelAdvanced;
  const [showHint, setShowHint] = useState(false);
  const [hasNote, setHasNote] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("kb-hint-seen")) setShowHint(true);
    const notes = getNotes();
    setHasNote(!!notes[`zv-${zvCase.id}`]?.content?.trim());
    setBookmarked(isBookmarked(`zv-${zvCase.id}`));
  }, [zvCase.id]);

  function handleBookmark() {
    const next = toggleBookmark({
      scenarioId: `zv-${zvCase.id}`,
      moduleId: "zahlungsverkehr",
      moduleName: "Zahlungsverkehr",
      title: zvCase.briefing.slice(0, 60),
      savedAt: "",
    });
    setBookmarked(next);
  }

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      if (e.key >= "1" && e.key <= "4") {
        const idx = parseInt(e.key) - 1;
        if (zvCase.options[idx]) onSelect(zvCase.options[idx].key);
      } else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        const opts = zvCase.options;
        const cur = selectedOption ? opts.findIndex((o) => o.key === selectedOption) : -1;
        let next = e.key === "ArrowDown" ? cur + 1 : cur - 1;
        next = Math.max(0, Math.min(next, opts.length - 1));
        onSelect(opts[next].key);
      } else if (e.key === "Enter" && selectedOption !== null) {
        onSubmit();
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [zvCase.options, selectedOption, onSelect, onSubmit]);

  function dismissHint() {
    localStorage.setItem("kb-hint-seen", "true");
    setShowHint(false);
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-DEFAULT bg-surface p-6 shadow-card">
        <div className="mb-3 flex items-center justify-between">
          <Badge variant={levelConfig.badgeVariant}>
            Level {zvCase.level} – {levelConfig.label}
          </Badge>
          <div className="flex items-center gap-2">
            {levelStartTime && <ScenarioTimer startTime={levelStartTime} />}
            <button
              onClick={handleBookmark}
              className={cn(
                "rounded-lg border p-1.5 text-xs transition-colors",
                bookmarked
                  ? "border-primary bg-primary-light text-primary"
                  : "border-border text-text-secondary hover:border-primary/40 hover:text-primary"
              )}
              title={bookmarked ? "Lesezeichen entfernen" : "Lesezeichen setzen"}
              aria-label={bookmarked ? "Lesezeichen entfernen" : "Lesezeichen setzen"}
            >
              <Bookmark size={12} className={bookmarked ? "fill-current" : ""} />
            </button>
            <button
              onClick={onOpenNote}
              className={cn(
                "flex items-center gap-1 rounded-lg border px-2 py-1 text-xs transition-colors",
                hasNote
                  ? "border-amber-300 bg-amber-50 text-amber-700"
                  : "border-border text-text-secondary hover:border-primary/40 hover:text-primary"
              )}
              title="Notiz"
              aria-label="Notiz öffnen"
            >
              <StickyNote size={11} />
              {hasNote ? t.scenarioChrome.noteLabel : null}
            </button>
            <span className="text-xs text-text-secondary">
              {t.scenarioChrome.fallCounter.replace("{n}", String(caseIndex + 1)).replace("{total}", String(total))}
            </span>
          </div>
        </div>

        {/* Difficulty meta */}
        <div className="mb-5 flex items-center gap-3 text-xs text-text-secondary">
          <span>{diffLabel}</span>
          <span>·</span>
          <span>{diffTime}</span>
          <span>·</span>
          <span className="font-semibold text-primary">+{diffXp} XP</span>
        </div>

        <div className="mb-5 rounded-DEFAULT bg-background p-4">
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
            {t.scenarioChrome.situationLabel}
          </p>
          <p className="text-sm leading-relaxed text-text-primary">{zvCase.briefing}</p>
        </div>

        <p className="mb-4 font-semibold text-text-primary">{zvCase.question}</p>

        <div className="mb-4 flex flex-col gap-3">
          {zvCase.options.map((opt, idx) => (
            <button
              key={opt.key}
              onClick={() => onSelect(opt.key)}
              className={cn(
                "flex items-start gap-3 rounded-DEFAULT border p-4 text-left text-sm transition-colors",
                selectedOption === opt.key
                  ? "border-primary bg-primary-light text-text-primary"
                  : "border-border bg-surface text-text-secondary hover:border-primary/40 hover:bg-primary-light/30 hover:text-text-primary"
              )}
            >
              <span
                className={cn(
                  "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold",
                  selectedOption === opt.key ? "bg-primary text-white" : "bg-gray-100 text-text-secondary"
                )}
              >
                {opt.key}
              </span>
              <span className="flex-1">{opt.text}</span>
              <span className="shrink-0 text-[10px] text-text-secondary opacity-50">{idx + 1}</span>
            </button>
          ))}
        </div>

        {showHint && (
          <div className="mb-3 flex items-center justify-between rounded-lg border border-border bg-gray-50 px-3 py-2 text-xs text-text-secondary">
            <span>⌨️ <strong>1–4</strong> auswählen · <strong>↑↓</strong> navigieren · <strong>↵</strong> bestätigen</span>
            <button onClick={dismissHint} className="ml-2 shrink-0 hover:text-text-primary">✕</button>
          </div>
        )}

        <Button onClick={onSubmit} disabled={selectedOption === null} className="w-full">
          {t.scenarioChrome.confirmBtn}
        </Button>
      </div>
    </div>
  );
}
