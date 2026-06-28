"use client";

import { useState } from "react";

export function ActiveRecallPrompt() {
  const [text, setText] = useState("");
  const [saved, setSaved] = useState(false);

  return (
    <div className="mb-4 rounded-DEFAULT border border-primary/20 bg-primary-light/40 p-4">
      <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
        Aktive Wiederholung
      </p>
      {!saved ? (
        <>
          <p className="mb-2 text-sm text-text-primary">
            Schreib die richtige Antwort in deinen eigenen Worten:
          </p>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={2}
            className="w-full resize-none rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary placeholder:text-text-secondary/40 focus:outline-none focus:ring-2 focus:ring-primary/25 transition-colors"
          />
          <div className="mt-2 flex items-center justify-between">
            <button
              onClick={() => { if (text.trim()) setSaved(true); }}
              disabled={!text.trim()}
              className="text-xs font-semibold text-primary disabled:opacity-40 hover:underline"
            >
              Speichern
            </button>
            <button
              onClick={() => setSaved(true)}
              className="text-xs text-text-secondary hover:text-text-primary"
            >
              Überspringen →
            </button>
          </div>
        </>
      ) : (
        <p className="text-sm font-medium text-primary">
          {text.trim() ? "Gespeichert ✓" : "Übersprungen"}
        </p>
      )}
      <p className="mt-3 text-xs italic text-text-secondary">
        Dieses Thema taucht später in einem anderen Szenario nochmal auf – in einer anderen Situation.
      </p>
    </div>
  );
}
