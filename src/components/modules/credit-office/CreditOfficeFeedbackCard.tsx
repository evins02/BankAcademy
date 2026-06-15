"use client";

import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  BookOpen,
  Lightbulb,
  RotateCcw,
  ArrowLeft,
  Calculator,
  ShieldAlert,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CreditEvaluation } from "./credit-office-types";

interface Props {
  evaluation: CreditEvaluation;
  isDemo?: boolean;
  criticalErrors: string[];
  learningPoints: string[];
  legalBasis: string;
  onRetry: () => void;
  onBack: () => void;
}

export function CreditOfficeFeedbackCard({
  evaluation,
  isDemo,
  criticalErrors,
  learningPoints,
  legalBasis,
  onRetry,
  onBack,
}: Props) {
  const passed = evaluation.result === "BESTANDEN";

  return (
    <div className="mx-auto max-w-2xl space-y-5 pb-8">
      {/* Result banner */}
      <div
        className="rounded-DEFAULT shadow-card overflow-hidden"
        style={{
          background: passed
            ? "linear-gradient(135deg, #f0fdf4, #dcfce7)"
            : "linear-gradient(135deg, #fff1f2, #ffe4e6)",
          border: `1px solid ${passed ? "#86efac" : "#fca5a5"}`,
        }}
      >
        <div className="px-6 py-6 text-center">
          <div className="flex justify-center mb-3">
            {passed ? (
              <CheckCircle2 size={52} className="text-green-600" />
            ) : (
              <XCircle size={52} className="text-red-500" />
            )}
          </div>
          <h2
            className="text-xl font-bold mb-4"
            style={{ color: passed ? "#15803d" : "#dc2626" }}
          >
            {passed ? "Dossier korrekt geprüft" : "Prüfung unvollständig oder fehlerhaft"}
          </h2>

          <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
            <div
              className="rounded-xl p-4 text-center"
              style={{
                background: passed ? "rgba(22,163,74,0.1)" : "rgba(220,38,38,0.07)",
                border: `1px solid ${passed ? "rgba(22,163,74,0.2)" : "rgba(220,38,38,0.15)"}`,
              }}
            >
              <Calculator size={18} className="mx-auto mb-1" style={{ color: passed ? "#15803d" : "#dc2626" }} />
              <p className="text-2xl font-black" style={{ color: passed ? "#15803d" : "#dc2626" }}>
                {evaluation.calcScore}/{evaluation.calcTotal}
              </p>
              <p className="text-xs font-medium mt-0.5" style={{ color: passed ? "#166534" : "#b91c1c" }}>
                Berechnungen
              </p>
            </div>
            <div
              className="rounded-xl p-4 text-center"
              style={{
                background: passed ? "rgba(22,163,74,0.1)" : "rgba(220,38,38,0.07)",
                border: `1px solid ${passed ? "rgba(22,163,74,0.2)" : "rgba(220,38,38,0.15)"}`,
              }}
            >
              <ShieldAlert size={18} className="mx-auto mb-1" style={{ color: passed ? "#15803d" : "#dc2626" }} />
              <p className="text-2xl font-black" style={{ color: passed ? "#15803d" : "#dc2626" }}>
                {evaluation.riskScore}/{evaluation.riskTotal}
              </p>
              <p className="text-xs font-medium mt-0.5" style={{ color: passed ? "#166534" : "#b91c1c" }}>
                Risiken erkannt
              </p>
            </div>
          </div>
        </div>

        {isDemo && (
          <div
            className="px-6 py-2.5 border-t text-xs text-center"
            style={{ borderColor: passed ? "#86efac" : "#fca5a5", color: passed ? "#166534" : "#991b1b" }}
          >
            Demo-Auswertung – kein API-Key konfiguriert
          </div>
        )}
      </div>

      {/* Critical errors from dossier */}
      {criticalErrors.length > 0 && (
        <div className="rounded-DEFAULT border border-red-300 bg-red-50 p-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle size={18} className="text-red-600 shrink-0" />
            <h3 className="text-sm font-bold text-red-700">Kritische Mängel im Dossier</h3>
          </div>
          <ul className="space-y-1.5">
            {criticalErrors.map((e, i) => (
              <li key={i} className="text-sm text-red-700 flex items-start gap-2">
                <span className="shrink-0 mt-0.5">⛔</span>
                {e}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Calculations */}
      <div className="rounded-DEFAULT bg-surface shadow-card overflow-hidden">
        <div
          className="flex items-center gap-2 px-5 py-3 border-b border-border"
          style={{ background: evaluation.calcScore === evaluation.calcTotal ? "rgba(22,163,74,0.06)" : "rgba(220,38,38,0.04)" }}
        >
          <Calculator size={15} className="text-text-secondary" />
          <h3 className="text-sm font-bold text-text-primary">
            Berechnungen – {evaluation.calcScore}/{evaluation.calcTotal} korrekt
          </h3>
        </div>
        <div className="divide-y divide-border">
          {evaluation.calcResults.map((r, i) => (
            <div key={i} className="px-5 py-3 flex items-start gap-2">
              {r.isCorrect ? (
                <CheckCircle2 size={15} className="text-green-500 shrink-0 mt-0.5" />
              ) : (
                <XCircle size={15} className="text-red-500 shrink-0 mt-0.5" />
              )}
              <div>
                <p className="text-sm font-semibold text-text-primary">{r.label}</p>
                {!r.isCorrect && (
                  <p className="text-xs text-text-secondary mt-0.5 leading-relaxed">
                    Korrekt: {r.correctValue}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Risks */}
      <div className="rounded-DEFAULT bg-surface shadow-card overflow-hidden">
        <div
          className="flex items-center gap-2 px-5 py-3 border-b border-border"
          style={{ background: evaluation.riskScore === evaluation.riskTotal ? "rgba(22,163,74,0.06)" : "rgba(220,38,38,0.04)" }}
        >
          <ShieldAlert size={15} className="text-text-secondary" />
          <h3 className="text-sm font-bold text-text-primary">
            Risikobewertung – {evaluation.riskScore}/{evaluation.riskTotal} erkannt
          </h3>
        </div>
        {evaluation.riskenErkannt.length > 0 && (
          <div className="px-5 pt-3 pb-2">
            <p className="text-xs font-bold text-green-700 uppercase tracking-wide mb-2">Erkannt</p>
            <div className="space-y-1">
              {evaluation.riskenErkannt.map((r, i) => (
                <p key={i} className="text-sm text-text-primary flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-green-500 shrink-0 mt-0.5" /> {r}
                </p>
              ))}
            </div>
          </div>
        )}
        {evaluation.riskenUebersehen.length > 0 && (
          <div className="px-5 pt-2 pb-3 border-t border-border">
            <p className="text-xs font-bold text-red-600 uppercase tracking-wide mb-2">Übersehen</p>
            <div className="space-y-1">
              {evaluation.riskenUebersehen.map((r, i) => (
                <p key={i} className="text-sm text-text-primary flex items-start gap-2">
                  <XCircle size={14} className="text-red-500 shrink-0 mt-0.5" /> {r}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Entscheid */}
      <div className="rounded-DEFAULT bg-surface shadow-card p-5">
        <p className="text-sm font-bold text-text-primary mb-2">Entscheid</p>
        <div className="flex items-center gap-2">
          {evaluation.entscheidKorrekt ? (
            <CheckCircle2 size={15} className="text-green-500 shrink-0" />
          ) : (
            <XCircle size={15} className="text-red-500 shrink-0" />
          )}
          <p className="text-sm text-text-secondary">
            {evaluation.entscheidKorrekt
              ? "Entscheid korrekt und gut begründet"
              : "Entscheid nicht korrekt oder ungenügend begründet"}
          </p>
        </div>
      </div>

      {/* Feedback */}
      <div className="rounded-DEFAULT bg-surface shadow-card p-5">
        <div className="flex items-center gap-2 mb-3">
          <BookOpen size={16} className="text-primary shrink-0" />
          <h3 className="text-sm font-bold text-text-primary">Fazit des Credit Officers</h3>
        </div>
        <p className="text-sm text-text-secondary leading-relaxed">{evaluation.feedback}</p>
      </div>

      {/* Learning outcomes */}
      <div
        className="rounded-DEFAULT shadow-card p-5"
        style={{
          background: "linear-gradient(135deg, rgba(13,27,75,0.04), rgba(13,27,75,0.08))",
          border: "1px solid rgba(13,27,75,0.1)",
        }}
      >
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb size={16} className="text-amber-500 shrink-0" />
          <h3 className="text-sm font-bold text-text-primary">Was du heute gelernt hast</h3>
        </div>
        <ul className="space-y-2">
          {learningPoints.map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <span
                className="inline-flex items-center justify-center w-4 h-4 rounded-full text-white font-bold shrink-0 mt-0.5"
                style={{ fontSize: 9, background: "var(--primary, #0D1B4B)" }}
              >
                {i + 1}
              </span>
              <p className="text-sm text-text-primary">{item}</p>
            </li>
          ))}
        </ul>
        <div className="mt-4 pt-3 border-t border-border/60">
          <p className="text-xs text-text-secondary font-mono">{legalBasis}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button variant="secondary" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft size={15} />
          Zurück
        </Button>
        <Button variant="primary" onClick={onRetry} className="flex items-center gap-2">
          <RotateCcw size={15} />
          Nochmal versuchen
        </Button>
      </div>
    </div>
  );
}
