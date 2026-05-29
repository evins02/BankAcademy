"use client";

import { useEffect } from "react";

interface Options {
  onNext?: () => void;
  onRetry?: () => void;
  onBack?: () => void;
  enabled?: boolean;
}

export function useScenarioKeyboard({
  onNext,
  onRetry,
  onBack,
  enabled = true,
}: Options) {
  useEffect(() => {
    if (!enabled) return;
    function handler(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if ((e.key === "Enter" || e.key === " ") && onNext) {
        e.preventDefault();
        onNext();
      } else if ((e.key === "r" || e.key === "R") && onRetry) {
        onRetry();
      } else if (e.key === "Escape" && onBack) {
        onBack();
      }
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onNext, onRetry, onBack, enabled]);
}
