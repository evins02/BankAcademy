"use client";

import { useState } from "react";
import { Loader2, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";

type Urteil = "RICHTIG" | "TEILWEISE" | "FALSCH";

interface BegründungsResult {
  urteil: Urteil;
  feedback: string;
  verbesserung: string | null;
}

interface BegründungsPromptProps {
  explanation: string;
}

const URTEIL_CONFIG: Record<Urteil, { icon: React.ReactNode; label: string; bg: string; border: string; color: string }> = {
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

export function BegründungsPrompt({ explanation }: BegründungsPromptProps) {
  const [text, setText] = useState("");
  const [status, setStatus] = useState<"idle" | "checking" | "done">("idle");
  const [result, setResult] = useState<BegründungsResult | null>(null);
  const [isError, setIsError] = useState(false);

  async function handleSave() {
    if (!text.trim()) return;
    setStatus("checking");
    try {
      const res = await fetch("/api/check-begruendung", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ explanation, studentText: text }),
      });
      if (!res.ok) throw new Error("api-error");
      const data = await res.json() as BegründungsResult;
      setResult(data);
    } catch {
      setIsError(true);
      setResult({
        urteil: "TEILWEISE",
        feedback: "Bewertung momentan nicht verfügbar – deine Antwort wurde gespeichert.",
        verbesserung: null,
      });
    }
    setStatus("done");
  }

  function handleSkip() {
    setStatus("done");
    setResult(null);
  }

  if (status === "done" && result) {
    const cfg = URTEIL_CONFIG[result.urteil];
    return (
      <div className={`mb-4 rounded-DEFAULT border p-4 ${isError ? "border-amber-200 bg-amber-50" : `${cfg.border} ${cfg.bg}`}`}>
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
          Deine Begründung
        </p>

        {/* Verdict badge */}
        <div className={`mb-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${cfg.color} ${cfg.bg} border ${cfg.border}`}>
          {cfg.icon}
          {cfg.label}
        </div>

        {/* Feedback */}
        <p className="text-sm text-text-primary leading-relaxed">{result.feedback}</p>

        {/* Verbesserung */}
        {result.verbesserung && result.urteil !== "RICHTIG" && (
          <div className="mt-2 border-t border-current/10 pt-2">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary mb-0.5">
              Was besser sein könnte
            </p>
            <p className="text-sm text-text-secondary leading-relaxed">{result.verbesserung}</p>
          </div>
        )}
      </div>
    );
  }

  if (status === "done" && !result) {
    return null;
  }

  return (
    <div className="mb-4 rounded-DEFAULT border border-primary/20 bg-primary-light/40 p-4">
      <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
        Vertiefung
      </p>
      <p className="mb-2 text-sm text-text-primary">
        Begründe in deinen eigenen Worten, warum diese Antwort richtig ist:
      </p>
      {status === "checking" ? (
        <div className="flex items-center gap-2 text-sm text-text-secondary py-1">
          <Loader2 size={13} className="animate-spin" />
          Wird bewertet…
        </div>
      ) : (
        <>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={2}
            placeholder="1–3 Sätze…"
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
    </div>
  );
}
