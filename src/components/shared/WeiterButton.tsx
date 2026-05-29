"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useScenarioKeyboard } from "@/hooks/useScenarioKeyboard";

interface WeiterButtonProps {
  onNext: () => void;
  onRetry?: () => void;
  onBack?: () => void;
  label?: string;
  autoAdvance?: boolean;
  countdownFrom?: number;
  className?: string;
  showHints?: boolean;
}

export function WeiterButton({
  onNext,
  onRetry,
  onBack,
  label = "Weiter",
  autoAdvance = true,
  countdownFrom = 5,
  className,
  showHints = true,
}: WeiterButtonProps) {
  const [count, setCount] = useState(countdownFrom);
  const [cancelled, setCancelled] = useState(false);

  const advance = useCallback(() => {
    setCancelled(true);
    onNext();
  }, [onNext]);

  // Reset when label changes (new case)
  useEffect(() => {
    setCount(countdownFrom);
    setCancelled(false);
  }, [label, countdownFrom]);

  useEffect(() => {
    if (!autoAdvance || cancelled) return;
    if (count === 0) {
      advance();
      return;
    }
    const t = setTimeout(() => setCount((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [count, cancelled, autoAdvance, advance]);

  useScenarioKeyboard({ onNext: advance, onRetry, onBack });

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1.5">
        <Button onClick={advance} className={cn("flex-1", className)}>
          {label}
          {autoAdvance && !cancelled && (
            <span className="ml-1 text-xs opacity-60">({count})</span>
          )}
          <ChevronRight size={14} />
        </Button>
        {autoAdvance && !cancelled && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setCancelled(true);
            }}
            title="Automatisches Weiterblättern abbrechen"
            className="rounded-lg p-2 text-text-secondary transition-colors hover:bg-gray-100 hover:text-text-primary"
          >
            <X size={13} />
          </button>
        )}
      </div>

      {showHints && (
        <p className="text-center text-[11px] text-text-secondary">
          <kbd className="rounded bg-gray-100 px-1 py-0.5 font-mono text-[10px]">Enter</kbd>
          {" "}Weiter
          {onRetry && (
            <>
              {" · "}
              <kbd className="rounded bg-gray-100 px-1 py-0.5 font-mono text-[10px]">R</kbd>
              {" "}Nochmals
            </>
          )}
          {onBack && (
            <>
              {" · "}
              <kbd className="rounded bg-gray-100 px-1 py-0.5 font-mono text-[10px]">Esc</kbd>
              {" "}Zurück
            </>
          )}
        </p>
      )}
    </div>
  );
}
