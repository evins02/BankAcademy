"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, RefreshCw, ChevronRight, MessageSquare, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress-bar";
import { cn } from "@/lib/utils";

type Mood = "positive" | "neutral" | "negative";

export interface ConversationMessage {
  role: "student" | "thomas";
  content: string;
  mood?: Mood;
}

export interface ExchangeEval {
  score: number;
  gespraechsfuehrung: number;
  fachkompetenz: number;
  kundenorientierung: number;
  comment: string;
}

export interface FinalFeedback {
  positives: string[];
  improvements: string[];
}

export interface AiScores {
  gespraechsfuehrung: number;
  fachkompetenz: number;
  kundenorientierung: number;
  overall: number;
}

interface AiResultsScreenProps {
  messages: ConversationMessage[];
  evaluations: ExchangeEval[];
  scores: AiScores;
  finalFeedback: FinalFeedback | null;
  onRetry: () => void;
  onNext: () => void;
}

const MOOD_ICON: Record<Mood, string> = {
  positive: "😊",
  neutral: "😐",
  negative: "😤",
};

const MOOD_DOT: Record<Mood, string> = {
  positive: "bg-green-500",
  neutral: "bg-yellow-400",
  negative: "bg-red-500",
};

function scoreColor(pct: number) {
  if (pct >= 80) return "text-primary";
  if (pct >= 50) return "text-accent";
  return "text-red-600";
}

function scoreBg(pct: number) {
  if (pct >= 80) return "bg-primary-light";
  if (pct >= 50) return "bg-accent-light";
  return "bg-red-50";
}

export function AiResultsScreen({
  messages,
  evaluations,
  scores,
  finalFeedback,
  onRetry,
  onNext,
}: AiResultsScreenProps) {
  const [showTranscript, setShowTranscript] = useState(false);

  const thomasMoods = messages
    .filter((m) => m.role === "thomas" && m.mood !== undefined)
    .map((m) => m.mood as Mood);

  const categories = [
    { key: "gespraechsfuehrung", label: "Gesprächsführung", score: scores.gespraechsfuehrung },
    { key: "fachkompetenz", label: "Fachkompetenz", score: scores.fachkompetenz },
    { key: "kundenorientierung", label: "Kundenorientierung", score: scores.kundenorientierung },
  ];

  return (
    <div className="flex flex-1 items-start justify-center overflow-y-auto p-6">
      <div className="w-full max-w-xl space-y-4">
        <h2 className="text-lg font-bold text-text-primary">Gesprächsauswertung</h2>

        {/* Overall score */}
        <div className={cn("rounded-DEFAULT p-6 text-center", scoreBg(scores.overall))}>
          <p className={cn("text-6xl font-bold tabular-nums", scoreColor(scores.overall))}>
            {scores.overall}%
          </p>
          <p className={cn("mt-1 text-sm font-semibold", scoreColor(scores.overall))}>
            {scores.overall >= 80
              ? "Ausgezeichnet!"
              : scores.overall >= 60
                ? "Gut gemacht"
                : "Noch etwas üben"}
          </p>
        </div>

        {/* Category scores */}
        <div className="rounded-DEFAULT bg-surface p-5 shadow-card space-y-4">
          <h3 className="text-sm font-semibold text-text-primary">Auswertung nach Kategorie</h3>
          {categories.map(({ key, label, score }) => (
            <div key={key}>
              <div className="mb-1 flex items-center justify-between text-xs">
                <span className="text-text-secondary">{label}</span>
                <span className={cn("font-semibold", scoreColor(score))}>{score}%</span>
              </div>
              <ProgressBar value={score} max={100} />
            </div>
          ))}
        </div>

        {/* Mood progression */}
        {thomasMoods.length > 0 && (
          <div className="rounded-DEFAULT bg-surface p-5 shadow-card">
            <h3 className="mb-3 text-sm font-semibold text-text-primary">Stimmungsverlauf</h3>
            <div className="flex flex-wrap items-center gap-1">
              {thomasMoods.map((mood, i) => (
                <div key={i} className="flex items-center gap-1">
                  {i > 0 && <ArrowRight size={10} className="text-border" />}
                  <div
                    title={mood}
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full text-sm",
                      MOOD_DOT[mood]
                    )}
                  >
                    {MOOD_ICON[mood]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* AI feedback */}
        {finalFeedback && (
          <div className="rounded-DEFAULT bg-surface p-5 shadow-card space-y-4">
            <div>
              <h3 className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-primary">
                <CheckCircle2 size={14} />
                Was gut war
              </h3>
              <ul className="space-y-1.5">
                {finalFeedback.positives.map((p, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-text-primary">
                    <span className="mt-0.5 shrink-0 text-primary">✓</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-2 text-sm font-semibold text-amber-700">
                Was verbessert werden kann
              </h3>
              <ul className="space-y-1.5">
                {finalFeedback.improvements.map((imp, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-text-primary">
                    <span className="mt-0.5 shrink-0 text-amber-600">→</span>
                    {imp}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Transcript toggle */}
        <div className="overflow-hidden rounded-DEFAULT bg-surface shadow-card">
          <button
            onClick={() => setShowTranscript((v) => !v)}
            className="flex w-full items-center justify-between px-5 py-4 text-sm font-semibold text-text-primary transition-colors hover:bg-gray-50"
          >
            <span className="flex items-center gap-2">
              <MessageSquare size={14} />
              Gespräch nochmal lesen
            </span>
            {showTranscript ? (
              <ChevronUp size={16} className="text-text-secondary" />
            ) : (
              <ChevronDown size={16} className="text-text-secondary" />
            )}
          </button>

          {showTranscript && (
            <div className="max-h-96 divide-y divide-border overflow-y-auto border-t border-border">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={cn("px-5 py-3", msg.role === "thomas" ? "bg-gray-50" : "bg-white")}
                >
                  <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
                    {msg.role === "thomas"
                      ? `Thomas Kowalski${msg.mood ? ` ${MOOD_ICON[msg.mood]}` : ""}`
                      : "Sie (Berater/in)"}
                  </p>
                  <p className="text-sm leading-relaxed text-text-primary">{msg.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Per-exchange scores */}
        {evaluations.length > 0 && (
          <div className="rounded-DEFAULT bg-surface p-5 shadow-card">
            <h3 className="mb-3 text-sm font-semibold text-text-primary">
              Bewertung pro Austausch
            </h3>
            <div className="space-y-2">
              {evaluations.map((ev, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-DEFAULT border border-border px-3 py-2 text-sm"
                >
                  <span className="text-text-secondary">Austausch {i + 1}</span>
                  <span className={cn("font-semibold tabular-nums", scoreColor(ev.score))}>
                    {ev.score}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex flex-col gap-2 pb-6">
          <Button onClick={onRetry} variant="secondary" className="w-full">
            <RefreshCw size={14} />
            Nochmal versuchen
          </Button>
          <Button onClick={onNext} className="w-full">
            Nächste Simulation
            <ChevronRight size={14} />
          </Button>
        </div>
      </div>
    </div>
  );
}
