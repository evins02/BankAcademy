"use client";

import { useState, useRef, useEffect } from "react";
import { Phone, Mic, Video, ArrowUp, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export type Mood = "positive" | "neutral" | "negative";

interface AiVideoCallUIProps {
  thomasSpeech: string;
  mood: Mood;
  isLoading: boolean;
  error: string | null;
  exchangeCount: number;
  onSend: (text: string) => void;
  onEndCall: () => void;
}

const MOOD_CONFIG: Record<Mood, { icon: string; label: string; color: string }> = {
  positive: { icon: "😊", label: "Zufrieden", color: "text-green-400" },
  neutral: { icon: "😐", label: "Neutral", color: "text-yellow-400" },
  negative: { icon: "😤", label: "Unzufrieden", color: "text-red-400" },
};

export function AiVideoCallUI({
  thomasSpeech,
  mood,
  isLoading,
  error,
  exchangeCount,
  onSend,
  onEndCall,
}: AiVideoCallUIProps) {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const moodConfig = MOOD_CONFIG[mood];

  useEffect(() => {
    if (!isLoading) textareaRef.current?.focus();
  }, [isLoading]);

  function handleSend() {
    const text = input.trim();
    if (!text || isLoading) return;
    setInput("");
    onSend(text);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="relative flex flex-1 flex-col overflow-hidden bg-[#0A0A0A] text-white">
      {/* Mood indicator – top left */}
      <div className="absolute left-4 top-4 z-10 flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 backdrop-blur-sm">
        <span className="text-base leading-none">{moodConfig.icon}</span>
        <span className={cn("text-xs font-medium", moodConfig.color)}>
          {moodConfig.label}
        </span>
      </div>

      {/* Exchange counter – top right */}
      {exchangeCount > 0 && (
        <div className="absolute right-4 top-4 z-10 rounded-full bg-white/10 px-3 py-1.5 backdrop-blur-sm">
          <span className="text-xs font-medium text-gray-300">
            {exchangeCount} Austausch{exchangeCount !== 1 ? "e" : ""}
          </span>
        </div>
      )}

      {/* Main area */}
      <div className="flex flex-1 flex-col items-center justify-center gap-6 pb-44 pt-16">
        {/* Speech bubble */}
        <div className="relative z-10 max-w-sm rounded-2xl bg-white px-5 py-4 text-gray-900 shadow-lg">
          {isLoading ? (
            <div className="flex items-center gap-2 text-gray-500">
              <span className="text-sm">Thomas tippt</span>
              <span className="flex gap-1">
                {[0, 150, 300].map((delay) => (
                  <span
                    key={delay}
                    className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400"
                    style={{ animationDelay: `${delay}ms` }}
                  />
                ))}
              </span>
            </div>
          ) : (
            <p className="text-sm leading-relaxed">{thomasSpeech}</p>
          )}
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

      {/* Input area – above control bar */}
      <div className="absolute bottom-20 left-1/2 z-10 w-full max-w-2xl -translate-x-1/2 px-4 pr-24">
        {error && (
          <div className="mb-2 flex items-center gap-2 rounded-xl bg-red-600/90 px-4 py-2 text-sm text-white shadow-lg">
            <AlertCircle size={14} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}
        <div className="flex items-end gap-2">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            rows={2}
            placeholder="Schreibe was du sagen würdest..."
            className="flex-1 resize-none rounded-xl bg-white/95 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 shadow-lg outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-60"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            aria-label="Senden"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-500 text-white shadow-lg transition-all hover:bg-green-600 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ArrowUp size={20} />
          </button>
        </div>
      </div>

      {/* Self-view – bottom right, above control bar */}
      <div className="absolute bottom-20 right-4 z-10">
        <div className="flex h-20 w-16 flex-col items-center justify-center gap-1 rounded-xl bg-gray-800 shadow-lg ring-2 ring-white/10">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
            ML
          </div>
          <p className="text-[9px] text-gray-400">Max Lernender</p>
        </div>
      </div>

      {/* Control bar */}
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
