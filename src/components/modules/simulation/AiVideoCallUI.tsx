"use client";

import { useState, useRef, useEffect } from "react";
import { Phone, Mic, Video, ArrowUp, AlertCircle, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Mood, ConversationMessage } from "./sim-types";

const MOOD_CONFIG: Record<Mood, { icon: string; label: string; color: string }> = {
  positive: { icon: "😊", label: "Entspannt", color: "text-green-400" },
  neutral: { icon: "😐", label: "Neutral", color: "text-yellow-400" },
  negative: { icon: "😤", label: "Skeptisch", color: "text-red-400" },
};

interface AiVideoCallUIProps {
  messages: ConversationMessage[];
  thomasSpeech: string;
  mood: Mood;
  moodReason: string;
  liveScore: number | null;
  isLoading: boolean;
  error: string | null;
  currentHint: string | null;
  showHints: boolean;
  onToggleHints: () => void;
  onSend: (text: string) => void;
  onEndCall: () => void;
}

function scoreColor(s: number) {
  if (s >= 70) return "text-green-400";
  if (s >= 50) return "text-yellow-400";
  return "text-red-400";
}

function scoreBorder(s: number) {
  if (s >= 70) return "border-green-500/40";
  if (s >= 50) return "border-yellow-500/40";
  return "border-red-500/40";
}

export function AiVideoCallUI({
  messages,
  thomasSpeech,
  mood,
  moodReason,
  liveScore,
  isLoading,
  error,
  currentHint,
  showHints,
  onToggleHints,
  onSend,
  onEndCall,
}: AiVideoCallUIProps) {
  const [input, setInput] = useState("");
  const [inputError, setInputError] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);
  const moodConfig = MOOD_CONFIG[mood];

  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  useEffect(() => {
    if (!isLoading) textareaRef.current?.focus();
  }, [isLoading]);

  function handleSend() {
    const text = input.trim();
    if (!text) {
      setInputError(true);
      setTimeout(() => setInputError(false), 700);
      return;
    }
    setInput("");
    onSend(text);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  const exchangeCount = messages.filter((m) => m.role === "thomas" && m.score !== undefined).length;

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* ── Left: conversation history ── */}
      <div className="flex w-64 shrink-0 flex-col border-r border-white/10 bg-[#111111]">
        <div className="border-b border-white/10 px-3 py-2">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">
            Gesprächsverlauf
          </p>
        </div>
        <div ref={historyRef} className="flex-1 space-y-2 overflow-y-auto p-3">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={cn("flex", msg.role === "student" ? "justify-end" : "justify-start")}
            >
              <div
                className={cn(
                  "max-w-[88%] rounded-xl px-3 py-2 text-xs",
                  msg.role === "student"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 text-gray-100"
                )}
              >
                {msg.role === "thomas" && (
                  <p className="mb-0.5 text-[9px] font-semibold text-gray-400">Thomas</p>
                )}
                <p className="leading-relaxed">{msg.content}</p>
                {msg.score !== undefined && (
                  <p className={cn("mt-1 text-[9px] font-bold", scoreColor(msg.score))}>
                    {msg.score}%
                  </p>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-center gap-1.5 rounded-xl bg-gray-700 px-3 py-2 text-xs text-gray-400">
                <span>tippt</span>
                {[0, 150, 300].map((d) => (
                  <span
                    key={d}
                    className="inline-block h-1 w-1 animate-bounce rounded-full bg-gray-400"
                    style={{ animationDelay: `${d}ms` }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Right: dark video area ── */}
      <div className="relative flex flex-1 flex-col overflow-hidden bg-[#0A0A0A] text-white">
        {/* Mood indicator – top left */}
        <div className="absolute left-4 top-4 z-10 flex max-w-[200px] flex-col gap-0.5 rounded-xl bg-white/10 px-3 py-2 backdrop-blur-sm">
          <div className="flex items-center gap-1.5">
            <span className="text-base leading-none">{moodConfig.icon}</span>
            <span className={cn("text-xs font-semibold", moodConfig.color)}>
              {moodConfig.label}
            </span>
          </div>
          {moodReason && (
            <p className="text-[10px] leading-tight text-gray-400">{moodReason}</p>
          )}
        </div>

        {/* Live score – top right */}
        {liveScore !== null && (
          <div
            className={cn(
              "absolute right-4 top-4 z-10 flex flex-col items-center rounded-xl border bg-black/40 px-3 py-2 backdrop-blur-sm",
              scoreBorder(liveScore)
            )}
          >
            <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
              Score
            </p>
            <p className={cn("text-xl font-bold tabular-nums", scoreColor(liveScore))}>
              {liveScore}%
            </p>
            <p className="text-[9px] text-gray-500">{exchangeCount} Austausch{exchangeCount !== 1 ? "e" : ""}</p>
          </div>
        )}

        {/* Main: speech bubble + avatar */}
        <div className="flex flex-1 flex-col items-center justify-center gap-6 pb-52 pt-16">
          {/* Speech bubble */}
          <div
            className={cn(
              "relative z-10 max-w-sm rounded-2xl bg-white px-5 py-4 text-gray-900 shadow-lg",
              isLoading && "animate-pulse"
            )}
          >
            {isLoading ? (
              <div className="flex items-center gap-2 text-gray-500">
                <span className="text-sm">Thomas tippt</span>
                {[0, 150, 300].map((d) => (
                  <span
                    key={d}
                    className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400"
                    style={{ animationDelay: `${d}ms` }}
                  />
                ))}
              </div>
            ) : (
              <p className="text-sm leading-relaxed">{thomasSpeech}</p>
            )}
            <span className="absolute -bottom-2.5 left-1/2 h-5 w-5 -translate-x-1/2 rotate-45 bg-white shadow-md" />
          </div>

          {/* Avatar */}
          <div className="flex flex-col items-center gap-2">
            <div
              className={cn(
                "flex h-24 w-24 items-center justify-center rounded-full bg-gray-600 text-2xl font-bold text-white shadow-2xl ring-4 ring-white/10 transition-all duration-300",
                isLoading && "ring-green-500/50 shadow-green-500/20 shadow-2xl"
              )}
            >
              TK
            </div>
            <div className="text-center">
              <p className="text-base font-semibold text-white">Thomas Kowalski</p>
              <p className="text-xs text-gray-400">Neukunde – Kontoeröffnung</p>
            </div>
          </div>
        </div>

        {/* Input area – above control bar */}
        <div className="absolute bottom-20 left-0 right-0 z-10 space-y-2 px-4 pr-20">
          {/* Hints toggle + banner */}
          <div className="flex items-start justify-between gap-3">
            {showHints && currentHint ? (
              <div className="flex flex-1 items-start gap-2 rounded-xl border border-yellow-500/30 bg-yellow-500/10 px-3 py-2">
                <span className="shrink-0 text-sm">💡</span>
                <p className="text-xs leading-relaxed text-yellow-200">{currentHint}</p>
              </div>
            ) : (
              <div />
            )}
            <button
              onClick={onToggleHints}
              className="flex shrink-0 items-center gap-1 rounded-full bg-white/10 px-2.5 py-1.5 text-[11px] text-gray-300 transition-colors hover:bg-white/20"
            >
              <Lightbulb size={11} />
              Hints {showHints ? "an" : "aus"}
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 rounded-xl bg-red-600/90 px-4 py-2 text-xs text-white shadow-lg">
              <AlertCircle size={12} className="shrink-0" />
              {error}
            </div>
          )}

          {/* Textarea + send */}
          <div className="flex items-end gap-2">
            <div className="relative flex-1">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value.slice(0, 500))}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                rows={3}
                placeholder="Was sagst du als Berater? Schreibe natürlich wie in einem echten Gespräch..."
                className={cn(
                  "w-full resize-none rounded-xl bg-white/95 px-4 py-3 pb-6 text-sm text-gray-900 placeholder-gray-400 shadow-lg outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-60",
                  inputError && "ring-2 ring-red-500"
                )}
              />
              <p className="absolute bottom-2 right-3 text-[10px] text-gray-400">
                {input.length}/500
              </p>
            </div>
            <button
              onClick={handleSend}
              disabled={isLoading}
              aria-label="Senden"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-500 text-white shadow-lg transition-all hover:bg-green-600 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ArrowUp size={20} />
            </button>
          </div>

          <p className="text-center text-[11px] text-gray-600">
            💡 Tipp: Sei professionell aber menschlich · Enter zum Senden
          </p>
        </div>

        {/* Self-view */}
        <div className="absolute bottom-20 right-4 z-10">
          <div className="flex h-20 w-16 flex-col items-center justify-center gap-1 rounded-xl bg-gray-800 shadow-lg ring-2 ring-white/10">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
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
    </div>
  );
}
