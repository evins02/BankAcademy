"use client";

import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  BookOpen,
  Lightbulb,
  RotateCcw,
  ArrowLeft,
  MessageSquare,
  ClipboardList,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { type ConvEvaluation } from "./conv-types";

interface EvalFeedbackCardProps {
  evaluation: ConvEvaluation;
  isDemo?: boolean;
  onRetry: () => void;
  onBack: () => void;
}

export function EvalFeedbackCard({
  evaluation,
  isDemo,
  onRetry,
  onBack,
}: EvalFeedbackCardProps) {
  const passed = evaluation.result === "BESTANDEN";
  const convPct = Math.round((evaluation.conversationScore / evaluation.conversationTotal) * 100);
  const formPct = Math.round((evaluation.formScore / evaluation.formTotal) * 100);

  return (
    <div className="mx-auto max-w-2xl space-y-5 pb-8">
      {/* Overall result */}
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
            {passed
              ? "✅ Gespräch & Formular korrekt"
              : "❌ Fehler in Gespräch oder Formular"}
          </h2>

          {/* Scores */}
          <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
            <div
              className="rounded-xl p-4 text-center"
              style={{
                background: passed ? "rgba(22,163,74,0.1)" : "rgba(220,38,38,0.07)",
                border: `1px solid ${passed ? "rgba(22,163,74,0.2)" : "rgba(220,38,38,0.15)"}`,
              }}
            >
              <MessageSquare
                size={18}
                className="mx-auto mb-1"
                style={{ color: passed ? "#15803d" : "#dc2626" }}
              />
              <p
                className="text-2xl font-black"
                style={{ color: passed ? "#15803d" : "#dc2626" }}
              >
                {evaluation.conversationScore}/{evaluation.conversationTotal}
              </p>
              <p className="text-xs font-medium mt-0.5" style={{ color: passed ? "#166534" : "#b91c1c" }}>
                Pflichtfragen
              </p>
            </div>
            <div
              className="rounded-xl p-4 text-center"
              style={{
                background: passed ? "rgba(22,163,74,0.1)" : "rgba(220,38,38,0.07)",
                border: `1px solid ${passed ? "rgba(22,163,74,0.2)" : "rgba(220,38,38,0.15)"}`,
              }}
            >
              <ClipboardList
                size={18}
                className="mx-auto mb-1"
                style={{ color: passed ? "#15803d" : "#dc2626" }}
              />
              <p
                className="text-2xl font-black"
                style={{ color: passed ? "#15803d" : "#dc2626" }}
              >
                {evaluation.formScore}/{evaluation.formTotal}
              </p>
              <p className="text-xs font-medium mt-0.5" style={{ color: passed ? "#166534" : "#b91c1c" }}>
                Formular korrekt
              </p>
            </div>
          </div>
        </div>

        {isDemo && (
          <div
            className="px-6 py-2.5 border-t text-xs text-center"
            style={{
              borderColor: passed ? "#86efac" : "#fca5a5",
              color: passed ? "#166534" : "#991b1b",
            }}
          >
            Demo-Auswertung – enthält die zwei Fallen (abgelaufener Ausweis + Formular A)
          </div>
        )}
      </div>

      {/* Critical errors */}
      {evaluation.criticalErrors.length > 0 && (
        <div className="rounded-DEFAULT border border-red-300 bg-red-50 p-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle size={18} className="text-red-600 shrink-0" />
            <h3 className="text-sm font-bold text-red-700">
              ⛔ Kritische Fehler – Kontoeröffnung nicht möglich
            </h3>
          </div>
          <ul className="space-y-1.5">
            {evaluation.criticalErrors.map((e, i) => (
              <li key={i} className="text-sm text-red-700 flex items-start gap-2">
                <span className="shrink-0 mt-0.5">•</span>
                {e}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Conversation evaluation */}
      <div className="rounded-DEFAULT bg-surface shadow-card overflow-hidden">
        <div
          className="flex items-center gap-2 px-5 py-3 border-b border-border"
          style={{ background: convPct === 100 ? "rgba(22,163,74,0.06)" : "rgba(220,38,38,0.04)" }}
        >
          <MessageSquare size={15} className="text-text-secondary" />
          <h3 className="text-sm font-bold text-text-primary">
            Gespräch – {evaluation.conversationScore}/{evaluation.conversationTotal} Pflichtfragen
          </h3>
        </div>

        {evaluation.conversationAsked.length > 0 && (
          <div className="px-5 pt-3 pb-2">
            <p className="text-xs font-bold text-green-700 uppercase tracking-wide mb-2">
              Gestellt ✅
            </p>
            <div className="flex flex-wrap gap-1.5">
              {evaluation.conversationAsked.map((q, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium bg-green-50 text-green-700 border border-green-200"
                >
                  <CheckCircle2 size={10} /> {q}
                </span>
              ))}
            </div>
          </div>
        )}

        {evaluation.conversationMissing.length > 0 && (
          <div className="px-5 pt-2 pb-3 border-t border-border">
            <p className="text-xs font-bold text-red-600 uppercase tracking-wide mb-2">
              Vergessen ❌
            </p>
            <div className="flex flex-wrap gap-1.5">
              {evaluation.conversationMissing.map((q, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium bg-red-50 text-red-700 border border-red-200"
                >
                  <XCircle size={10} /> {q}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Form evaluation */}
      <div className="rounded-DEFAULT bg-surface shadow-card overflow-hidden">
        <div
          className="flex items-center gap-2 px-5 py-3 border-b border-border"
          style={{ background: formPct === 100 ? "rgba(22,163,74,0.06)" : "rgba(220,38,38,0.04)" }}
        >
          <ClipboardList size={15} className="text-text-secondary" />
          <h3 className="text-sm font-bold text-text-primary">
            Formular – {evaluation.formScore}/{evaluation.formTotal} Prüfpunkte
          </h3>
        </div>

        {evaluation.formErrors.length > 0 && (
          <div className="divide-y divide-border">
            {evaluation.formErrors.map((err, i) => (
              <div key={i} className="px-5 py-3">
                <p className="text-sm font-bold text-red-700 mb-1">❌ {err.field}</p>
                <p className="text-sm text-text-secondary leading-relaxed">{err.message}</p>
              </div>
            ))}
          </div>
        )}

        {evaluation.formCorrect.length > 0 && (
          <div className="px-5 py-3 border-t border-border">
            <p className="text-xs font-bold text-green-700 uppercase tracking-wide mb-2">
              Korrekt ausgefüllt ✅
            </p>
            <div className="space-y-1">
              {evaluation.formCorrect.map((item, i) => (
                <p key={i} className="text-sm text-text-primary flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-green-500 shrink-0 mt-0.5" />
                  {item}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Feedback */}
      <div className="rounded-DEFAULT bg-surface shadow-card p-5">
        <div className="flex items-center gap-2 mb-3">
          <BookOpen size={16} className="text-primary shrink-0" />
          <h3 className="text-sm font-bold text-text-primary">Fazit des Ausbildners</h3>
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
          {[
            "Alle 9 Pflichtfragen gemäss VSB 20 im Gespräch stellen",
            "Ausweis IMMER auf Gültigkeit prüfen – abgelaufener Ausweis = Stopp",
            "Formular A ist ohne Ausnahme auszufüllen, auch wenn WiBe = Kontoinhaber",
            "FATCA-Fragen bei jeder Neueröffnung zwingend abklären",
            "PEP-Abklärung und Mittelherkunft explizit erfragen",
          ].map((item, i) => (
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
          <p className="text-xs text-text-secondary font-mono">
            Rechtsgrundlage: VSB 20 Art. 3–5 · GwG Art. 3 · FATCA
          </p>
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
