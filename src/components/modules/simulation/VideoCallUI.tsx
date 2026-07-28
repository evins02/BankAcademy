"use client";

import { useRef, useEffect } from "react";
import { CheckCircle2, XCircle, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type Mood = "positive" | "neutral" | "negative";

export interface ResponseOption {
  key: string;
  text: string;
}

export interface HistoryEntry {
  customerSpeech: string;
  selectedText?: string;
  correct?: boolean;
}

interface VideoCallUIProps {
  customerSpeech: string;
  options: ResponseOption[];
  mood: Mood;
  onSelectOption: (key: string) => void;
  onEndCall: () => void;
  isReacting?: boolean;
  feedbackCorrect?: boolean;
  onNext?: () => void;
  stepIndex?: number;
  totalSteps?: number;
  liveScore?: number;
  history?: HistoryEntry[];
  speechExtra?: React.ReactNode;
}

const MOOD_CONFIG: Record<Mood, { icon: string; label: string; color: string }> = {
  positive: { icon: "😊", label: "Zufrieden", color: "text-green-400" },
  neutral:  { icon: "😐", label: "Neutral",   color: "text-yellow-400" },
  negative: { icon: "😤", label: "Unzufrieden", color: "text-red-400" },
};

export function VideoCallUI({
  customerSpeech,
  options,
  mood,
  onSelectOption,
  onEndCall,
  isReacting = false,
  feedbackCorrect,
  onNext,
  stepIndex,
  totalSteps,
  liveScore,
  history = [],
  speechExtra,
}: VideoCallUIProps) {
  const moodConfig = MOOD_CONFIG[mood];
  const historyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight;
    }
  }, [history, customerSpeech]);

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* ── Left: conversation history ── */}
      <div className="flex w-64 shrink-0 flex-col border-r border-white/10 bg-[#111111] text-white">
        <div className="border-b border-white/10 px-3 py-2">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">
            Gesprächsverlauf
          </p>
        </div>
        <div ref={historyRef} className="flex-1 space-y-3 overflow-y-auto p-3">
          {/* Completed steps */}
          {history.map((entry, i) => (
            <div key={i} className="space-y-1.5">
              <div className="flex justify-start">
                <div className="max-w-[90%] rounded-xl bg-gray-700 px-3 py-2 text-xs text-gray-100">
                  <p className="mb-0.5 text-[9px] font-semibold text-gray-400">Familie Bianchi</p>
                  <p className="leading-relaxed">{entry.customerSpeech}</p>
                </div>
              </div>
              {entry.selectedText && (
                <div className="flex justify-end">
                  <div
                    className={cn(
                      "max-w-[90%] rounded-xl px-3 py-2 text-xs leading-relaxed text-white",
                      entry.correct ? "bg-green-700" : "bg-red-700/80"
                    )}
                  >
                    {entry.selectedText}
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Current step question */}
          <div className="flex justify-start">
            <div className="max-w-[90%] rounded-xl bg-gray-600 px-3 py-2 text-xs text-gray-100 ring-1 ring-white/20">
              <p className="mb-0.5 text-[9px] font-semibold text-gray-300">
                Familie Bianchi · aktuell
              </p>
              <p className="leading-relaxed">{customerSpeech}</p>
            </div>
          </div>
        </div>

        {/* End-call link at bottom */}
        <div className="border-t border-white/10 px-3 py-2">
          <button
            onClick={onEndCall}
            className="text-[10px] text-gray-500 underline-offset-2 hover:text-gray-300 hover:underline"
          >
            Simulation abbrechen
          </button>
        </div>
      </div>

      {/* ── Right: background image + speech bubble + options ── */}
      <div
        className="relative flex flex-1 flex-col overflow-hidden text-white"
        style={{
          backgroundImage:
            "url('https://raw.githubusercontent.com/evins02/BankAcademy/main/public/bankacademy_kyc_couple_v2.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        {/* Mood badge – top left */}
        <div className="absolute left-4 top-4 z-10 flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1.5 backdrop-blur-sm">
          <span className="text-base leading-none">{moodConfig.icon}</span>
          <span className={cn("text-xs font-medium", moodConfig.color)}>
            {moodConfig.label}
          </span>
        </div>

        {/* Score / progress – top right */}
        <div className="absolute right-4 top-4 z-10 flex flex-col items-center rounded-xl border border-white/20 bg-black/40 px-3 py-2 backdrop-blur-sm">
          {liveScore !== undefined ? (
            <>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">Score</p>
              <p
                className={cn(
                  "text-xl font-bold tabular-nums",
                  liveScore >= 70 ? "text-green-400" : liveScore >= 50 ? "text-yellow-400" : "text-red-400"
                )}
              >
                {liveScore}%
              </p>
            </>
          ) : stepIndex !== undefined && totalSteps !== undefined ? (
            <p className="text-xs font-medium text-gray-300">
              {stepIndex + 1} / {totalSteps}
            </p>
          ) : null}
        </div>

        {/* Speech bubble – above the couple */}
        <div
          className="absolute left-1/2 z-10 w-full max-w-sm -translate-x-1/2 px-4"
          style={{ top: "17%" }}
        >
          <div
            className={cn(
              "relative rounded-2xl bg-white px-5 py-4 text-gray-900 shadow-lg",
              speechExtra ? "max-w-md" : ""
            )}
          >
            <p className="text-sm leading-relaxed">{customerSpeech}</p>
            {speechExtra && (
              <div className="mt-3 border-t border-gray-200 pt-3">{speechExtra}</div>
            )}
            {/* Arrow pointing down toward the couple */}
            <span
              className="absolute -bottom-3 left-1/2 -translate-x-1/2"
              style={{
                width: 0,
                height: 0,
                borderLeft: "10px solid transparent",
                borderRight: "10px solid transparent",
                borderTop: "12px solid white",
                filter: "drop-shadow(0 2px 2px rgba(0,0,0,0.15))",
              }}
            />
          </div>
        </div>

        {/* Options / feedback – bottom */}
        <div className="absolute bottom-4 left-0 right-0 z-10 max-w-2xl mx-auto px-4">
          {isReacting ? (
            <div className="flex flex-col gap-3">
              <div
                className={cn(
                  "flex items-center gap-3 rounded-xl p-4 shadow-lg",
                  feedbackCorrect ? "bg-green-600/90 text-white" : "bg-red-600/90 text-white"
                )}
              >
                {feedbackCorrect ? (
                  <CheckCircle2 size={20} className="shrink-0" />
                ) : (
                  <XCircle size={20} className="shrink-0" />
                )}
                <span className="font-semibold">
                  {feedbackCorrect ? "Richtig!" : "Nicht optimal"}
                </span>
              </div>
              <button
                onClick={onNext}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-white/95 py-3 text-sm font-semibold text-gray-900 shadow-lg transition-all hover:bg-white hover:shadow-xl active:scale-[0.99]"
              >
                Weiter
                <ChevronRight size={16} />
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-center text-[11px] text-white/60">Was sagst du als Berater?</p>
              <div className="grid grid-cols-2 gap-2">
                {options.map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => onSelectOption(opt.key)}
                    className="flex items-start gap-2 rounded-xl bg-white/95 p-3 text-left text-gray-900 shadow-lg transition-all hover:scale-[1.02] hover:bg-white hover:shadow-xl active:scale-[0.99]"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gray-200 text-[11px] font-bold text-gray-700">
                      {opt.key}
                    </span>
                    <span className="text-xs leading-snug">{opt.text}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
