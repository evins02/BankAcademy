"use client";

import { useState } from "react";
import { Loader2, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";

type Verdict = "RICHTIG" | "TEILWEISE" | "FALSCH";

interface AiResult {
  verdict: Verdict;
  richtig: string;
  fehlt: string;
  ideal: string;
  error?: boolean;
}

interface ActiveRecallPromptProps {
  feedback?: string;
  promptText?: string;
  caseBriefing?: string;
  onComplete?: () => void;
}

const VERDICT_CONFIG: Record<Verdict, { icon: React.ReactNode; label: string; bg: string; border: string; color: string }> = {
  RICHTIG: {
    icon: <CheckCircle2 size={15} />,
    label: "Richtig",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    color: "text-emerald-700",
  },
  TEILWEISE: {
    icon: <AlertTriangle size={15} />,
    label: "Teilweise richtig",
    bg: "bg-amber-50",
    border: "border-amber-200",
    color: "text-amber-700",
  },
  FALSCH: {
    icon: <XCircle size={15} />,
    label: "Nicht richtig",
    bg: "bg-red-50",
    border: "border-red-200",
    color: "text-red-700",
  },
};

function hasContent(text: string) {
  return !!text.trim() && text.trim() !== "–" && text.trim() !== "-";
}

export function ActiveRecallPrompt({ feedback, promptText, caseBriefing, onComplete }: ActiveRecallPromptProps) {
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"input" | "loading" | "result" | "done">("input");
  const [aiResult, setAiResult] = useState<AiResult | null>(null);
  const [isError, setIsError] = useState(false);

  async function handleSave() {
    if (!text.trim()) return;
    if (!feedback) {
      setPhase("done");
      onComplete?.();
      return;
    }
    setPhase("loading");
    try {
      const res = await fetch("/api/evaluate-recall", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feedback, studentText: text }),
      });
      if (res.ok) {
        const data = (await res.json()) as AiResult;
        setAiResult(data);
        if (data.error) setIsError(true);
      } else {
        setIsError(true);
      }
      setPhase("result");
    } catch {
      setIsError(true);
      setPhase("result");
    }
  }

  function handleSkip() {
    setPhase("done");
    onComplete?.();
  }

  function handleReveal() {
    setPhase("done");
    onComplete?.();
  }

  return (
    <div className="mb-4 rounded-DEFAULT border border-primary/20 bg-primary-light/40 p-4">
      <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
        Aktive Wiederholung
      </p>
      {caseBriefing && (
        <div className="mb-2 rounded-lg border-l-2 border-primary/30 bg-surface/60 px-3 py-2">
          <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-wider text-text-secondary">
            Der Fall
          </p>
          <p className="text-xs text-text-secondary">{caseBriefing}</p>
        </div>
      )}
      <p className="mb-2 text-sm text-text-primary">
        {promptText ?? "Schreib die richtige Antwort in deinen eigenen Worten:"}
      </p>

      {phase === "input" && (
        <>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={2}
            className="w-full resize-none rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary placeholder:text-text-secondary/40 focus:outline-none focus:ring-2 focus:ring-primary/25 transition-colors"
          />
          <div className="mt-2 flex items-center justify-between">
            <button
              onClick={handleSave}
              disabled={!text.trim()}
              className="text-xs font-semibold text-primary disabled:opacity-40 hover:underline"
            >
              Speichern
            </button>
            <button
              onClick={handleSkip}
              className="text-xs text-text-secondary hover:text-text-primary"
            >
              Überspringen →
            </button>
          </div>
        </>
      )}

      {phase === "loading" && (
        <div className="flex items-center gap-2 py-1 text-sm text-text-secondary">
          <Loader2 size={14} className="animate-spin" />
          <span>Auswertung läuft…</span>
        </div>
      )}

      {phase === "done" && !text.trim() && (
        <p className="text-sm font-medium text-text-secondary">Übersprungen</p>
      )}

      {(phase === "result" || (phase === "done" && !!text.trim())) && (
        <>
          <div className="mb-2 rounded-lg border border-border bg-surface p-3">
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
              Deine Antwort
            </p>
            <p className="text-sm text-text-primary">{text}</p>
          </div>
          {aiResult && !isError && (() => {
            const cfg = VERDICT_CONFIG[aiResult.verdict];
            return (
              <div className={`mt-1 rounded-lg border p-3 ${cfg.border} ${cfg.bg}`}>
                <div className={`mb-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${cfg.color} bg-surface border ${cfg.border}`}>
                  {cfg.icon}
                  {cfg.label}
                </div>
                <div className="space-y-2">
                  {hasContent(aiResult.richtig) && (
                    <div className="flex gap-2 text-sm">
                      <span className="shrink-0">✅</span>
                      <p className="text-text-primary">
                        <span className="font-medium">Das hast du richtig erfasst: </span>
                        {aiResult.richtig}
                      </p>
                    </div>
                  )}
                  {aiResult.verdict !== "RICHTIG" && (
                    <div className="flex gap-2 text-sm">
                      <span className="shrink-0">⚠️</span>
                      <p className="text-text-primary">
                        <span className="font-medium">Das fehlt oder ist ungenau: </span>
                        {aiResult.fehlt}
                      </p>
                    </div>
                  )}
                  <div className="flex gap-2 text-sm">
                    <span className="shrink-0">💡</span>
                    <p className="text-text-primary">
                      <span className="font-medium">Ideale Antwort: </span>
                      {aiResult.ideal}
                    </p>
                  </div>
                </div>
              </div>
            );
          })()}
          {isError && phase === "result" && (
            <div className="mt-1 rounded-lg border border-amber-200 bg-amber-50 p-3">
              <p className="text-xs text-amber-700">
                KI-Bewertung momentan nicht verfügbar – deine Antwort wurde gespeichert.
              </p>
            </div>
          )}
          {phase === "result" && (
            <button
              onClick={handleReveal}
              className="mt-3 text-xs font-semibold text-primary hover:underline"
            >
              Antwort aufdecken →
            </button>
          )}
        </>
      )}

      <p className="mt-3 text-xs italic text-text-secondary">
        Dieses Thema taucht später in einem anderen Szenario nochmal auf – in einer anderen Situation.
      </p>
    </div>
  );
}
