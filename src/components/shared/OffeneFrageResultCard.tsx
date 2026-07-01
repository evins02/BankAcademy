"use client";

import { useState, useEffect } from "react";
import { Loader2, CheckCircle2, AlertCircle, XCircle, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { type OffeneFrageCase, type OffeneFrageEvalResult } from "@/lib/offene-frage";

interface OffeneFrageResultCardProps {
  c: OffeneFrageCase;
  studentAnswer: string;
  caseIndex: number;
  total: number;
  levelLabel: string;
  badgeVariant: "green" | "orange" | "red";
  isLastCase: boolean;
  nextLabel?: string;
  onNext: () => void;
  onResult?: (isCorrect: boolean) => void;
}

const ERGEBNIS_CONFIG = {
  Richtig: {
    icon: CheckCircle2,
    bg: "bg-primary-light",
    text: "text-primary",
    border: "border-primary/20",
    badgeBg: "bg-primary text-white",
  },
  "Teilweise richtig": {
    icon: AlertCircle,
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
    badgeBg: "bg-amber-500 text-white",
  },
  "Nicht richtig": {
    icon: XCircle,
    bg: "bg-red-50",
    text: "text-red-700",
    border: "border-red-200",
    badgeBg: "bg-red-600 text-white",
  },
} as const;

export function OffeneFrageResultCard({
  c,
  studentAnswer,
  caseIndex,
  total,
  levelLabel,
  badgeVariant,
  isLastCase,
  nextLabel,
  onNext,
  onResult,
}: OffeneFrageResultCardProps) {
  const [status, setStatus] = useState<"loading" | "done" | "error">("loading");
  const [result, setResult] = useState<OffeneFrageEvalResult | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/evaluate-offene-frage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        briefing: c.briefing,
        question: c.question,
        role: c.role,
        expectedApproach: c.expectedApproach,
        studentText: studentAnswer,
      }),
    })
      .then((r) => r.json())
      .then((data: OffeneFrageEvalResult) => {
        if (cancelled) return;
        setResult(data);
        setStatus("done");
        onResult?.(data.ergebnis === "Richtig");
      })
      .catch(() => {
        if (cancelled) return;
        setStatus("error");
      });
    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cfg = result ? ERGEBNIS_CONFIG[result.ergebnis] : null;
  const Icon = cfg?.icon ?? CheckCircle2;

  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-DEFAULT bg-surface p-6 shadow-card">
        <div className="mb-5 flex items-center justify-between">
          <Badge variant={badgeVariant}>
            Level {c.level} – {levelLabel}
          </Badge>
          <span className="text-xs text-text-secondary">
            {caseIndex + 1} von {total}
          </span>
        </div>

        {/* Student's answer recap */}
        <div className="mb-5 rounded-DEFAULT border border-border bg-background p-4">
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
            Deine Antwort
          </p>
          <p className="text-sm leading-relaxed text-text-primary italic">{studentAnswer}</p>
        </div>

        {/* Loading state */}
        {status === "loading" && (
          <div className="flex flex-col items-center gap-3 py-10 text-text-secondary">
            <Loader2 size={28} className="animate-spin text-primary" />
            <p className="text-sm font-medium">Antwort wird geprüft…</p>
          </div>
        )}

        {/* Error state */}
        {status === "error" && (
          <div className="rounded-DEFAULT border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
            Bewertung momentan nicht verfügbar. Vergleiche deine Antwort mit dem korrekten Vorgehen unten.
          </div>
        )}

        {/* Result */}
        {status === "done" && result && cfg && (
          <>
            <div
              className={cn(
                "mb-5 flex items-center gap-3 rounded-DEFAULT border p-4",
                cfg.bg,
                cfg.border
              )}
            >
              <Icon size={22} className={cn("shrink-0", cfg.text)} />
              <div className="flex-1">
                <span className={cn("inline-block rounded-full px-2.5 py-0.5 text-xs font-bold", cfg.badgeBg)}>
                  {result.ergebnis}
                </span>
                <p className={cn("mt-1 text-sm leading-relaxed", cfg.text)}>
                  {result.feedback}
                </p>
              </div>
            </div>

            <div className="mb-4 rounded-DEFAULT border border-border bg-background p-4">
              <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
                Korrektes Vorgehen
              </p>
              <p className="text-sm leading-relaxed text-text-primary">
                {result.korrektes_vorgehen}
              </p>
            </div>

            <div className="mb-5 rounded-DEFAULT border border-primary/20 bg-primary-light/40 p-4">
              <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
                Merksatz
              </p>
              <p className="text-sm font-medium text-primary">{result.merksatz}</p>
            </div>

            <Button onClick={onNext} className="w-full">
              {isLastCase ? (nextLabel ?? "Level abschliessen") : "Weiter →"}
              <ChevronRight size={14} />
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
