"use client";

import { useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { addXP } from "@/lib/xpData";

interface Option {
  key: string;
  text: string;
}

interface SubModuleMCQProps {
  scenarioNum: number;
  levelLabel: string;
  situation: string;
  question: string;
  options: Option[];
  correct: string;
  feedback: string;
  xp?: number;
  onCorrect?: () => void;
}

export function SubModuleMCQ({
  scenarioNum,
  levelLabel,
  situation,
  question,
  options,
  correct,
  feedback,
  xp = 20,
  onCorrect,
}: SubModuleMCQProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [xpAdded, setXpAdded] = useState(false);

  function handleSubmit() {
    setSubmitted(true);
    if (selected === correct && !xpAdded) {
      addXP(xp);
      setXpAdded(true);
      onCorrect?.();
    }
  }

  function handleReset() {
    setSelected(null);
    setSubmitted(false);
  }

  const isCorrect = submitted && selected === correct;

  return (
    <div className="rounded-DEFAULT bg-surface shadow-card p-5 space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">
          Szenario {scenarioNum}
        </span>
        <span className="text-text-secondary opacity-40">·</span>
        <span className="text-[10px] text-text-secondary">{levelLabel}</span>
      </div>

      <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-line">
        {situation}
      </p>

      <p className="text-sm font-semibold text-text-primary">{question}</p>

      <div className="space-y-2">
        {options.map((opt) => {
          let cls = "";
          if (!submitted) {
            cls =
              selected === opt.key
                ? "border-primary bg-primary-light text-text-primary"
                : "border-border bg-surface text-text-secondary hover:border-primary/40 hover:bg-primary-light/30 hover:text-text-primary cursor-pointer";
          } else {
            if (opt.key === correct) {
              cls = "border-green-500 bg-green-50";
            } else if (opt.key === selected) {
              cls = "border-red-400 bg-red-50";
            } else {
              cls = "border-border opacity-50";
            }
          }
          return (
            <button
              key={opt.key}
              disabled={submitted}
              onClick={() => setSelected(opt.key)}
              className={cn(
                "w-full flex items-start gap-3 rounded-DEFAULT border px-4 py-3 text-left text-sm transition-colors",
                cls
              )}
            >
              <span className={cn(
                "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold transition-colors",
                !submitted && selected === opt.key ? "bg-primary text-white" : "bg-gray-100 text-text-secondary"
              )}>{opt.key}</span>
              <span className="flex-1">{opt.text}</span>
            </button>
          );
        })}
      </div>

      {!submitted ? (
        <button
          disabled={!selected}
          onClick={handleSubmit}
          className="w-full rounded-DEFAULT py-2.5 text-sm font-bold text-white disabled:opacity-40 transition-opacity"
          style={{ background: "var(--primary, #0D1B4B)" }}
        >
          Antwort prüfen
        </button>
      ) : (
        <div
          className={cn(
            "rounded-DEFAULT p-4 text-sm leading-relaxed",
            isCorrect ? "bg-green-50" : "bg-red-50"
          )}
        >
          <div className="flex items-center gap-2 mb-2">
            {isCorrect ? (
              <CheckCircle2 size={15} className="shrink-0 text-green-600" />
            ) : (
              <XCircle size={15} className="shrink-0 text-red-500" />
            )}
            <span
              className={cn(
                "font-bold text-sm",
                isCorrect ? "text-green-800" : "text-red-800"
              )}
            >
              {isCorrect ? "Richtig!" : "Falsch!"}
            </span>
            {isCorrect && (
              <span className="ml-auto text-xs font-bold text-green-700">
                +{xp} XP
              </span>
            )}
          </div>
          <p className={cn("ml-5 text-sm", isCorrect ? "text-green-900" : "text-red-900")}>
            {feedback}
          </p>
          <button
            onClick={handleReset}
            className={cn(
              "ml-5 mt-3 text-xs font-semibold underline opacity-60 hover:opacity-100",
              isCorrect ? "text-green-800" : "text-red-800"
            )}
          >
            Nochmals versuchen
          </button>
        </div>
      )}
    </div>
  );
}
