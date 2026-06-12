"use client";

import { CheckCircle2, XCircle, BookOpen, Lightbulb, RotateCcw, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type KycEvaluation } from "./kyc-form-types";

interface KycFeedbackCardProps {
  evaluation: KycEvaluation;
  isDemo?: boolean;
  onRetry: () => void;
  onBack: () => void;
}

export function KycFeedbackCard({
  evaluation,
  isDemo,
  onRetry,
  onBack,
}: KycFeedbackCardProps) {
  const passed = evaluation.result === "BESTANDEN";
  const pct = Math.round((evaluation.scoreCorrect / evaluation.scoreTotal) * 100);

  return (
    <div className="mx-auto max-w-2xl space-y-5 pb-8">
      {/* Result header */}
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
          <div className="flex justify-center mb-4">
            {passed ? (
              <CheckCircle2 size={52} className="text-green-600" />
            ) : (
              <XCircle size={52} className="text-red-500" />
            )}
          </div>
          <h2
            className="text-xl font-bold mb-1"
            style={{ color: passed ? "#15803d" : "#dc2626" }}
          >
            {passed ? "✅ KYC vollständig und korrekt" : "❌ KYC unvollständig oder fehlerhaft"}
          </h2>
          <p className="text-sm mb-4" style={{ color: passed ? "#166534" : "#b91c1c" }}>
            {passed
              ? "Gut gemacht – das Formular erfüllt alle VSB 20 Anforderungen."
              : "Das Formular muss korrigiert werden bevor die Kontoeröffnung fortgesetzt werden kann."}
          </p>

          {/* Score ring */}
          <div className="flex items-center justify-center gap-8">
            <div className="text-center">
              <p
                className="text-4xl font-black"
                style={{ color: passed ? "#15803d" : "#dc2626" }}
              >
                {evaluation.scoreCorrect}/{evaluation.scoreTotal}
              </p>
              <p className="text-xs font-semibold mt-1" style={{ color: passed ? "#166534" : "#b91c1c" }}>
                Prüfpunkte erfüllt
              </p>
            </div>
            <div className="text-center">
              <p
                className="text-4xl font-black"
                style={{ color: passed ? "#15803d" : "#dc2626" }}
              >
                {pct}%
              </p>
              <p className="text-xs font-semibold mt-1" style={{ color: passed ? "#166534" : "#b91c1c" }}>
                Korrekt
              </p>
            </div>
          </div>
        </div>

        {isDemo && (
          <div className="px-6 py-3 border-t" style={{ borderColor: passed ? "#86efac" : "#fca5a5" }}>
            <p className="text-xs text-center" style={{ color: passed ? "#166534" : "#991b1b" }}>
              Demo-Auswertung – enthält die zwei versteckten Fallen (abgelaufener Ausweis + Formular A)
            </p>
          </div>
        )}
      </div>

      {/* Errors */}
      {evaluation.errors.length > 0 && (
        <div className="rounded-DEFAULT bg-surface shadow-card overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-3 border-b border-border bg-red-50">
            <XCircle size={16} className="text-red-500" />
            <h3 className="text-sm font-bold text-red-700">
              {evaluation.errors.length} Fehler gefunden
            </h3>
          </div>
          <div className="divide-y divide-border">
            {evaluation.errors.map((err, i) => (
              <div key={i} className="px-5 py-4">
                <p className="text-sm font-bold text-text-primary mb-1">
                  ❌ {err.field}
                </p>
                <p className="text-sm text-text-secondary leading-relaxed">{err.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Correct items */}
      {evaluation.correct.length > 0 && (
        <div className="rounded-DEFAULT bg-surface shadow-card overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-3 border-b border-border bg-green-50">
            <CheckCircle2 size={16} className="text-green-600" />
            <h3 className="text-sm font-bold text-green-700">
              Korrekt ausgefüllt
            </h3>
          </div>
          <div className="divide-y divide-border">
            {evaluation.correct.map((item, i) => (
              <div key={i} className="px-5 py-3 flex items-start gap-3">
                <CheckCircle2 size={15} className="text-green-500 shrink-0 mt-0.5" />
                <p className="text-sm text-text-primary">{item}</p>
              </div>
            ))}
          </div>
        </div>
      )}

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
          <h3 className="text-sm font-bold text-text-primary">Was du gelernt hast</h3>
        </div>
        <ul className="space-y-2">
          {[
            "KYC-Pflichtfelder gemäss VSB 20 vollständig erfassen",
            "Ausweis immer auf Gültigkeit prüfen – kein gültiger Ausweis = keine Kontoeröffnung",
            "Formular A ist ohne Ausnahme auszufüllen, auch wenn WiBe = Kontoinhaber",
            "FATCA-Fragen bei jeder Neueröffnung zwingend beantworten",
            "PEP-Abklärung und Mittelherkunft lückenlos dokumentieren",
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
            Rechtsgrundlage: VSB 20 Art. 3–5 · GwG Art. 3
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
