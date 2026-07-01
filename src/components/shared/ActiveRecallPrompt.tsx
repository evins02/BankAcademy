"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

interface AiResult {
  richtig: string;
  fehlt: string;
  ideal: string;
}

interface ActiveRecallPromptProps {
  feedback?: string;
  promptText?: string;
  onComplete?: () => void;
}

export function ActiveRecallPrompt({ feedback, promptText, onComplete }: ActiveRecallPromptProps) {
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"input" | "loading" | "result" | "done">("input");
  const [aiResult, setAiResult] = useState<AiResult | null>(null);

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
        const data = await res.json();
        setAiResult(data as AiResult);
      }
      setPhase("result");
    } catch {
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

      {phase === "input" && (
        <>
          <p className="mb-2 text-sm text-text-primary">
            {promptText ?? "Schreib die richtige Antwort in deinen eigenen Worten:"}
          </p>
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
          <p className="mb-2 text-sm font-medium text-primary">Gespeichert ✓</p>
          {aiResult && (
            <div className="mt-1 space-y-2 rounded-lg border border-border bg-surface p-3">
              <div className="flex gap-2 text-sm">
                <span className="shrink-0">✅</span>
                <p className="text-text-primary">
                  <span className="font-medium">Das hast du richtig erfasst: </span>
                  {aiResult.richtig}
                </p>
              </div>
              <div className="flex gap-2 text-sm">
                <span className="shrink-0">⚠️</span>
                <p className="text-text-primary">
                  <span className="font-medium">Das fehlt oder ist ungenau: </span>
                  {aiResult.fehlt}
                </p>
              </div>
              <div className="flex gap-2 text-sm">
                <span className="shrink-0">💡</span>
                <p className="text-text-primary">
                  <span className="font-medium">Ideale Antwort: </span>
                  {aiResult.ideal}
                </p>
              </div>
            </div>
          )}
          {!aiResult && phase === "result" && (
            <p className="mt-1 text-xs text-text-secondary">KI-Auswertung nicht verfügbar.</p>
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
