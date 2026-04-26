"use client";

import { Phone, Mic, Video, CheckCircle2, XCircle, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type Mood = "positive" | "neutral" | "negative";

export interface ResponseOption {
  key: string;
  text: string;
}

interface VideoCallUIProps {
  customerSpeech: string;
  options: ResponseOption[];
  mood: Mood;
  onSelectOption: (key: string) => void;
  onEndCall: () => void;
  // Reaction mode
  isReacting?: boolean;
  feedbackCorrect?: boolean;
  onNext?: () => void;
  // Progress
  stepIndex?: number;
  totalSteps?: number;
}

const MOOD_CONFIG: Record<Mood, { icon: string; label: string; color: string }> = {
  positive: { icon: "😊", label: "Zufrieden", color: "text-green-400" },
  neutral: { icon: "😐", label: "Neutral", color: "text-yellow-400" },
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
}: VideoCallUIProps) {
  const moodConfig = MOOD_CONFIG[mood];

  return (
    <div className="relative flex flex-1 flex-col overflow-hidden bg-[#0A0A0A] text-white">
      {/* Mood indicator – top left */}
      <div className="absolute left-4 top-4 z-10 flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 backdrop-blur-sm">
        <span className="text-base leading-none">{moodConfig.icon}</span>
        <span className={cn("text-xs font-medium", moodConfig.color)}>
          {moodConfig.label}
        </span>
      </div>

      {/* Step progress – top right */}
      {stepIndex !== undefined && totalSteps !== undefined && (
        <div className="absolute right-4 top-4 z-10 flex items-center gap-1 rounded-full bg-white/10 px-3 py-1.5 backdrop-blur-sm">
          <span className="text-xs font-medium text-gray-300">
            Schritt {stepIndex + 1} / {totalSteps}
          </span>
        </div>
      )}

      {/* Main area: speech bubble + customer avatar */}
      <div className="flex flex-1 flex-col items-center justify-center gap-6 pb-36 pt-16">
        {/* Speech bubble */}
        <div className="relative z-10 max-w-sm rounded-2xl bg-white px-5 py-3 text-gray-900 shadow-lg">
          <p className="text-sm leading-relaxed">{customerSpeech}</p>
          <span className="absolute -bottom-2.5 left-1/2 h-5 w-5 -translate-x-1/2 rotate-45 bg-white shadow-md" />
        </div>

        {/* Customer avatar */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gray-600 text-3xl font-bold text-white shadow-2xl ring-4 ring-white/10">
            TK
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-white">Thomas Kowalski</p>
            <p className="text-sm text-gray-400">Neukunde – Kontoeröffnung</p>
          </div>
        </div>
      </div>

      {/* Bottom interactive area – above control bar */}
      <div className="absolute bottom-20 left-1/2 z-10 w-full max-w-2xl -translate-x-1/2 px-4">
        {isReacting ? (
          /* Reaction mode: feedback banner + Weiter button */
          <div className="flex flex-col gap-3">
            <div
              className={cn(
                "flex items-center gap-3 rounded-xl p-4 shadow-lg",
                feedbackCorrect
                  ? "bg-green-600/90 text-white"
                  : "bg-red-600/90 text-white"
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
          /* Question mode: response option grid */
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
        )}
      </div>

      {/* Self-view – bottom right */}
      <div className="absolute bottom-20 right-4 z-10">
        <div className="flex h-20 w-16 flex-col items-center justify-center gap-1 rounded-xl bg-gray-800 shadow-lg ring-2 ring-white/10">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
            ML
          </div>
          <p className="text-[9px] text-gray-400">Max Lernender</p>
        </div>
      </div>

      {/* Bottom control bar */}
      <div className="absolute bottom-0 left-0 right-0 z-10 flex items-center justify-center gap-5 border-t border-white/10 bg-[#111111]/95 px-6 py-3 backdrop-blur-sm">
        <button
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          aria-label="Mikrofon"
        >
          <Mic size={18} />
        </button>
        <button
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          aria-label="Kamera"
        >
          <Video size={18} />
        </button>
        <button
          onClick={onEndCall}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-red-600 text-white transition-colors hover:bg-red-700"
          aria-label="Gespräch beenden"
        >
          <Phone size={18} className="rotate-[135deg]" />
        </button>
      </div>
    </div>
  );
}
