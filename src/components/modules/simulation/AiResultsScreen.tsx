"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  RefreshCw,
  ChevronRight,
  TrendingUp,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ConversationMessage, FinalFeedback, Difficulty } from "./sim-types";

export interface AiScores {
  professionalism: number;
  bankingKnowledge: number;
  customerOrientation: number;
  overall: number;
}

interface AiResultsScreenProps {
  messages: ConversationMessage[];
  scores: AiScores;
  finalFeedback: FinalFeedback | null;
  difficulty: Difficulty;
  onRetry: () => void;
  onIncreaseDifficulty: () => void;
  onNext: () => void;
}

const MOOD_ICON: Record<string, string> = {
  positive: "😊",
  neutral: "😐",
  negative: "😤",
};

const CIRCUMFERENCE = 2 * Math.PI * 54;

function ScoreCircle({ score }: { score: number }) {
  const offset = CIRCUMFERENCE * (1 - score / 100);
  const color = score >= 70 ? "#16a34a" : score >= 50 ? "#d97706" : "#dc2626";
  return (
    <div className="relative h-36 w-36">
      <svg viewBox="0 0 144 144" className="h-36 w-36 -rotate-90">
        <circle cx="72" cy="72" r="54" fill="none" stroke="#e5e7eb" strokeWidth="14" />
        <circle
          cx="72"
          cy="72"
          r="54"
          fill="none"
          stroke={color}
          strokeWidth="14"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-in-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold" style={{ color }}>
          {score}%
        </span>
        <span className="text-xs text-text-secondary">Gesamt</span>
      </div>
    </div>
  );
}

function CategoryBar({ label, score }: { label: string; score: number }) {
  const color =
    score >= 70 ? "bg-green-500" : score >= 50 ? "bg-yellow-400" : "bg-red-500";
  const textColor =
    score >= 70 ? "text-green-700" : score >= 50 ? "text-yellow-700" : "text-red-700";
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-sm">
        <span className="text-text-secondary">{label}</span>
        <span className={cn("font-semibold tabular-nums", textColor)}>{score}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
        <div
          className={cn("h-full rounded-full transition-all duration-700", color)}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}

const DIFF_NEXT: Record<Difficulty, Difficulty> = {
  einsteiger: "fortgeschritten",
  fortgeschritten: "challenge",
  challenge: "challenge",
};

export function AiResultsScreen({
  messages,
  scores,
  finalFeedback,
  difficulty,
  onRetry,
  onIncreaseDifficulty,
  onNext,
}: AiResultsScreenProps) {
  const [showTranscript, setShowTranscript] = useState(false);
  const [showMusterloesung, setShowMusterloesung] = useState(false);

  const moodProgression = messages
    .filter((m) => m.role === "thomas" && m.mood)
    .map((m) => m.mood as string);

  const studentMessages = messages.filter((m) => m.role === "student");
  const thomasMessages = messages.filter((m) => m.role === "thomas" && m.score !== undefined);

  const canIncrease = difficulty !== "challenge";

  return (
    <div className="flex flex-1 items-start justify-center overflow-y-auto p-6">
      <div className="w-full max-w-xl space-y-5 pb-8">
        <h2 className="text-lg font-bold text-text-primary">
          Gesprächsauswertung – Thomas Kowalski
        </h2>

        {/* Score circle + category bars */}
        <div className="rounded-DEFAULT bg-surface p-6 shadow-card">
          <div className="mb-6 flex items-center justify-center">
            <ScoreCircle score={scores.overall} />
          </div>
          <div className="space-y-4">
            <CategoryBar label="Professionalität" score={scores.professionalism} />
            <CategoryBar label="Fachkompetenz" score={scores.bankingKnowledge} />
            <CategoryBar label="Kundenorientierung" score={scores.customerOrientation} />
          </div>
        </div>

        {/* Mood journey */}
        {moodProgression.length > 1 && (
          <div className="rounded-DEFAULT bg-surface p-5 shadow-card">
            <div className="mb-3 flex items-center gap-2">
              <TrendingUp size={14} className="text-text-secondary" />
              <h3 className="text-sm font-semibold text-text-primary">Stimmungsverlauf</h3>
            </div>
            <div className="flex flex-wrap items-center gap-1">
              {moodProgression.map((m, i) => (
                <div key={i} className="flex items-center gap-1">
                  {i > 0 && (
                    <ChevronRight size={12} className="shrink-0 text-border" />
                  )}
                  <span className="text-xl">{MOOD_ICON[m] ?? "😐"}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Thomas's verdict */}
        {finalFeedback && (
          <div className="rounded-DEFAULT bg-surface p-5 shadow-card">
            {/* Quote */}
            <blockquote className="mb-4 border-l-4 border-primary pl-4">
              <p className="text-sm italic leading-relaxed text-text-primary">
                &ldquo;{finalFeedback.wouldOpenAccountReason}&rdquo;
              </p>
              <p className="mt-2 text-xs text-text-secondary">— Thomas Kowalski</p>
            </blockquote>

            {/* Would open account */}
            <div
              className={cn(
                "flex items-center gap-3 rounded-DEFAULT p-3",
                finalFeedback.wouldOpenAccount ? "bg-primary-light" : "bg-red-50"
              )}
            >
              {finalFeedback.wouldOpenAccount ? (
                <CheckCircle2 size={18} className="shrink-0 text-primary" />
              ) : (
                <XCircle size={18} className="shrink-0 text-red-600" />
              )}
              <p
                className={cn(
                  "text-sm font-semibold",
                  finalFeedback.wouldOpenAccount ? "text-primary" : "text-red-700"
                )}
              >
                {finalFeedback.wouldOpenAccount
                  ? "Ja, ich würde das Konto eröffnen"
                  : "Nein, ich würde eine andere Bank suchen"}
              </p>
            </div>
          </div>
        )}

        {/* Strengths & improvements */}
        {finalFeedback && (
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-DEFAULT bg-surface p-4 shadow-card">
              <h3 className="mb-3 flex items-center gap-1.5 text-sm font-semibold text-primary">
                <CheckCircle2 size={14} />
                Was gut war
              </h3>
              <ul className="space-y-2">
                {finalFeedback.strengths.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-text-primary">
                    <span className="mt-0.5 shrink-0 text-primary">✓</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-DEFAULT bg-surface p-4 shadow-card">
              <h3 className="mb-3 flex items-center gap-1.5 text-sm font-semibold text-amber-700">
                <span>⚠️</span>
                Verbesserungspotenzial
              </h3>
              <ul className="space-y-2">
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

        {/* Summary */}
        {finalFeedback?.summary && (
          <div className="rounded-DEFAULT border border-border bg-background p-4">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary mb-1">
              Zusammenfassung
            </p>
            <p className="text-sm leading-relaxed text-text-primary">{finalFeedback.summary}</p>
          </div>
        )}

        {/* Transcript */}
        <div className="overflow-hidden rounded-DEFAULT bg-surface shadow-card">
          <button
            onClick={() => setShowTranscript((v) => !v)}
            className="flex w-full items-center justify-between px-5 py-4 text-sm font-semibold text-text-primary transition-colors hover:bg-gray-50"
          >
            Vollständiges Gespräch lesen
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
                  className={cn(
                    "px-5 py-3",
                    msg.role === "thomas" ? "bg-gray-50" : "bg-white"
                  )}
                >
                  <div className="mb-1 flex items-center justify-between">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-text-secondary">
                      {msg.role === "thomas"
                        ? `Thomas ${msg.mood ? MOOD_ICON[msg.mood] : ""}`
                        : "Sie (Berater/in)"}
                    </p>
                    {msg.score !== undefined && (
                      <span
                        className={cn(
                          "text-[10px] font-bold",
                          msg.score >= 70
                            ? "text-green-600"
                            : msg.score >= 50
                              ? "text-yellow-600"
                              : "text-red-600"
                        )}
                      >
                        {msg.score}%
                      </span>
                    )}
                  </div>
                  <p className="text-sm leading-relaxed text-text-primary">{msg.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Musterlösung */}
        {studentMessages.length > 0 && (
          <div className="overflow-hidden rounded-DEFAULT bg-surface shadow-card">
            <button
              onClick={() => setShowMusterloesung((v) => !v)}
              className="flex w-full items-center justify-between px-5 py-4 text-sm font-semibold text-text-primary transition-colors hover:bg-gray-50"
            >
              Musterlösung ansehen
              {showMusterloesung ? (
                <ChevronUp size={16} className="text-text-secondary" />
              ) : (
                <ChevronDown size={16} className="text-text-secondary" />
              )}
            </button>
            {showMusterloesung && (
              <div className="divide-y divide-border border-t border-border">
                {studentMessages.map((msg, i) => {
                  const thomasReply = thomasMessages[i];
                  return (
                    <div key={i} className="p-5">
                      <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-text-secondary">
                        Austausch {i + 1}
                      </p>
                      {/* Student answer */}
                      <div className="mb-2 rounded-DEFAULT border border-border bg-blue-50 p-3">
                        <p className="mb-0.5 text-[10px] font-semibold text-blue-700">
                          Ihre Antwort
                          {thomasReply?.score !== undefined && (
                            <span
                              className={cn(
                                "ml-2",
                                thomasReply.score >= 70
                                  ? "text-green-600"
                                  : thomasReply.score >= 50
                                    ? "text-yellow-600"
                                    : "text-red-600"
                              )}
                            >
                              ({thomasReply.score}%)
                            </span>
                          )}
                        </p>
                        <p className="text-sm text-text-primary">{msg.content}</p>
                      </div>
                      {/* Coaching hint */}
                      {thomasReply?.hint && (
                        <div className="flex items-start gap-2 rounded-DEFAULT border border-amber-200 bg-amber-50 p-3">
                          <span className="shrink-0 text-sm">💡</span>
                          <div>
                            <p className="mb-0.5 text-[10px] font-semibold text-amber-700">
                              Was verbessert werden könnte
                            </p>
                            <p className="text-sm text-text-primary">{thomasReply.hint}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Action buttons */}
        <div className="grid grid-cols-2 gap-2">
          <Button onClick={onRetry} variant="secondary" className="w-full">
            <RefreshCw size={14} />
            Nochmal versuchen
          </Button>
          {canIncrease ? (
            <Button onClick={onIncreaseDifficulty} variant="secondary" className="w-full">
              <TrendingUp size={14} />
              Schwierigkeit erhöhen
            </Button>
          ) : (
            <Button onClick={onNext} className="w-full">
              Nächste Simulation
              <ChevronRight size={14} />
            </Button>
          )}
          {canIncrease && (
            <Button onClick={onNext} className="col-span-2 w-full">
              Nächste Simulation
              <ChevronRight size={14} />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export { DIFF_NEXT };
