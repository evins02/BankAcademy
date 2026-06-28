"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

interface BegründungsPromptProps {
  explanation: string;
}

export function BegründungsPrompt({ explanation }: BegründungsPromptProps) {
  const [text, setText] = useState("");
  const [status, setStatus] = useState<"idle" | "checking" | "done">("idle");
  const [feedback, setFeedback] = useState("");

  async function handleSave() {
    if (!text.trim()) return;
    setStatus("checking");
    try {
      const res = await fetch("/api/check-begruendung", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ explanation, studentText: text }),
      });
      const data = await res.json();
      setFeedback(data.feedback || "Gut erklärt! ✓");
    } catch {
      setFeedback("Gut erklärt! ✓");
    }
    setStatus("done");
  }

  function handleSkip() {
    setStatus("done");
    setFeedback("Übersprungen");
  }

  if (status === "done") {
    return (
      <div className="mb-4 rounded-DEFAULT border border-primary/20 bg-primary-light/40 p-4">
        <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
          Deine Begründung
        </p>
        <p className="text-sm font-medium text-primary">{feedback}</p>
      </div>
    );
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
          Wird geprüft…
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
