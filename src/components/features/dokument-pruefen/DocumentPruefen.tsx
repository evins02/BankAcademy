"use client";

import { useState, useMemo } from "react";
import type { ReactNode } from "react";
import type { DocumentConfig, FieldValue } from "@/lib/dokument-pruefen/types";

// ── Types ─────────────────────────────────────────────────────────────────────

interface FeedbackResult {
  correct: boolean;
  partial: boolean;
  feedback: string;
  hint: string | null;
}

interface FieldState {
  expanded: boolean;
  comment: string;
  flagged: boolean;
  loading: boolean;
  feedback: FeedbackResult | null;
}

type Phase = "prüfen" | "auswertung";

function freshField(): FieldState {
  return { expanded: false, comment: "", flagged: false, loading: false, feedback: null };
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const BADGE_COLORS = {
  green: "bg-green-100 text-green-700",
  amber: "bg-amber-100 text-amber-700",
  red: "bg-red-100 text-red-700",
};

function renderFieldValue(value: FieldValue): ReactNode {
  const base = value.bold ? <strong>{value.text}</strong> : value.text;
  if (!value.badge) return base;
  return (
    <span>
      {base}{" "}
      <span className={`ml-1.5 rounded-full px-1.5 py-0.5 text-[10px] font-bold ${BADGE_COLORS[value.badge.color]}`}>
        {value.badge.text}
      </span>
    </span>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function DocSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="border-b border-gray-100 last:border-0">
      <div className="bg-gray-50 px-6 py-2">
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{title}</p>
      </div>
      <div>{children}</div>
    </div>
  );
}

interface ClickableRowProps {
  id: string;
  label: string;
  value: ReactNode;
  muted?: boolean;
  state: FieldState;
  phase: Phase;
  isError: boolean;
  errorExplanation?: string;
  onToggle: () => void;
  onComment: (v: string) => void;
  onFlag: () => void;
  onUnflag: () => void;
}

function ClickableRow({
  label, value, muted, state, phase, isError, errorExplanation,
  onToggle, onComment, onFlag, onUnflag,
}: ClickableRowProps) {
  const { expanded, comment, flagged, loading, feedback } = state;

  let rowExtra = "";
  if (phase === "auswertung") {
    if (isError && flagged) rowExtra = " border-l-4 border-l-[#1ddba0] bg-emerald-50/20";
    else if (!isError && flagged) rowExtra = " border-l-4 border-l-amber-400 bg-amber-50/10";
    else if (isError && !flagged) rowExtra = " border-l-4 border-l-red-400 bg-red-50/10";
  }

  return (
    <div className={`border-b border-gray-50 last:border-0 transition-all${rowExtra}`}>
      <button
        onClick={onToggle}
        className="group flex w-full items-center px-6 py-2.5 text-left transition-colors hover:bg-gray-50/70"
      >
        <span className="w-60 shrink-0 text-xs text-gray-500">{label}</span>
        <span className={`flex-1 text-sm ${muted ? "italic text-gray-400" : "text-gray-800"}`}>
          {value}
        </span>

        {phase === "prüfen" && flagged && (
          <span className="ml-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0a1628]" />
        )}
        {phase === "prüfen" && !flagged && (
          <span className="ml-2 text-[11px] text-gray-300 opacity-0 transition-opacity group-hover:opacity-70">?</span>
        )}

        {phase === "auswertung" && isError && flagged && (
          <span className="ml-2 shrink-0 text-[10px] font-bold text-emerald-600">✅ Gefunden</span>
        )}
        {phase === "auswertung" && !isError && flagged && (
          <span className="ml-2 shrink-0 text-[10px] font-bold text-amber-600">⚠️ Kein Fehler</span>
        )}
        {phase === "auswertung" && isError && !flagged && (
          <span className="ml-2 shrink-0 text-[10px] font-bold text-red-500">❌ Übersehen</span>
        )}

        <span className="ml-1 text-[10px] text-gray-200">{expanded ? "▲" : "▼"}</span>
      </button>

      {expanded && phase === "prüfen" && (
        <div className="px-6 pb-4">
          <div className="rounded-lg border border-dashed border-gray-200 bg-white/60 p-4">
            <p className="mb-2 text-xs text-gray-500">
              {flagged ? "Beschreibe den Fehler:" : "Notiz zu diesem Feld (optional):"}
            </p>
            <textarea
              value={comment}
              onChange={(e) => onComment(e.target.value)}
              placeholder="z. B. «Der Wert ist falsch, weil …»"
              rows={2}
              className="w-full resize-none rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1ddba0]/50"
            />
            <div className="mt-2 flex items-center gap-2">
              {!flagged ? (
                <button
                  onClick={onFlag}
                  className="rounded-lg bg-[#0a1628] px-4 py-1.5 text-xs font-semibold text-white transition-opacity hover:opacity-80"
                >
                  Als Fehler markieren →
                </button>
              ) : (
                <>
                  <span className="text-xs font-medium text-[#0a1628]">● Als Fehler markiert</span>
                  <button
                    onClick={onUnflag}
                    className="rounded-lg border border-gray-200 px-3 py-1 text-xs text-gray-400 hover:bg-gray-50"
                  >
                    Aufheben
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {expanded && phase === "auswertung" && (
        <div className="px-6 pb-4">
          {isError && flagged && (
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3">
              {loading ? (
                <p className="text-xs text-gray-400">KI wertet Erklärung aus…</p>
              ) : feedback ? (
                <>
                  <p className="mb-1 text-xs font-semibold text-emerald-700">
                    {feedback.correct ? "✅ Erklärung korrekt!" : feedback.partial ? "⚠️ Teilweise richtig" : "Feedback:"}
                  </p>
                  <p className="text-xs leading-relaxed text-emerald-800">{feedback.feedback}</p>
                  {feedback.hint && (
                    <p className="mt-1.5 text-xs italic text-emerald-600">💡 {feedback.hint}</p>
                  )}
                </>
              ) : comment ? (
                <p className="text-xs italic text-gray-500">Deine Notiz: «{comment}»</p>
              ) : (
                <p className="text-xs text-emerald-700">Gut erkannt! Kein Text hinterlassen.</p>
              )}
            </div>
          )}
          {isError && !flagged && (
            <div className="rounded-lg border border-red-100 bg-red-50 p-3">
              <p className="mb-1 text-xs font-semibold text-red-700">Was war der Fehler?</p>
              <p className="text-xs text-red-600">{errorExplanation ?? ""}</p>
            </div>
          )}
          {!isError && flagged && (
            <div className="rounded-lg border border-amber-100 bg-amber-50 p-3">
              <p className="text-xs text-amber-700">Dieses Feld ist korrekt befüllt – kein Fehler vorhanden.</p>
              {comment && <p className="mt-1 text-xs italic text-amber-600">Deine Notiz: «{comment}»</p>}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export function DocumentPruefen({ config }: { config: DocumentConfig }) {
  const allFieldIds = useMemo(
    () => config.sections.flatMap((s) => s.fields.map((f) => f.id)),
    [config]
  );
  const actualErrors = useMemo(() => new Set(config.actualErrors), [config]);

  const [fields, setFields] = useState<Record<string, FieldState>>(() => {
    const result: Record<string, FieldState> = {};
    for (const id of allFieldIds) result[id] = freshField();
    return result;
  });
  const [phase, setPhase] = useState<Phase>("prüfen");

  function patchField(id: string, update: Partial<FieldState>) {
    setFields((prev) => ({ ...prev, [id]: { ...prev[id], ...update } }));
  }

  async function handleSubmit() {
    setPhase("auswertung");
    const toEval = allFieldIds.filter(
      (id) => fields[id].flagged && actualErrors.has(id) && fields[id].comment.trim()
    );
    for (const id of toEval) {
      patchField(id, { loading: true });
      try {
        const res = await fetch("/api/dokument-pruefen/evaluate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ documentId: config.id, fieldId: id, correction: fields[id].comment }),
        });
        const data = (await res.json()) as FeedbackResult;
        patchField(id, { feedback: data, loading: false });
      } catch {
        patchField(id, { loading: false });
      }
    }
  }

  const flaggedCount = allFieldIds.filter((id) => fields[id]?.flagged).length;
  const foundErrors = config.actualErrors.filter((id) => fields[id]?.flagged);
  const missedErrors = config.actualErrors.filter((id) => !fields[id]?.flagged);
  const wrongFlags = allFieldIds.filter((id) => fields[id]?.flagged && !actualErrors.has(id));

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      {/* Task card */}
      <div
        className="mb-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
        style={{ borderLeftWidth: 4, borderLeftColor: "#1ddba0" }}
      >
        <h2 className="font-semibold" style={{ color: "#0a1628" }}>
          📋 Aufgabe
        </h2>
        <p className="mt-1 text-sm text-gray-600">
          Im {config.title} sind <strong>{config.actualErrors.length} Fehler</strong> versteckt.
          Prüfe alle Felder sorgfältig, klicke auf verdächtige Einträge und markiere sie als fehlerhaft.
        </p>
        <p className="mt-2 text-xs text-gray-400">
          Tipp: Jedes Feld ist anklickbar. Je präziser du den Fehler beschreibst, desto besseres Feedback erhältst du.
        </p>
      </div>

      {/* Document dossier */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        {/* Document header */}
        <div className="bg-[#0a1628] px-6 py-5 text-white">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-blue-300">
                {config.header.bank}
              </p>
              <h2 className="mt-1 text-xl font-bold">{config.header.docType}</h2>
              <p className="mt-0.5 text-sm text-blue-200">{config.header.docNr}</p>
            </div>
            <div className="shrink-0 space-y-0.5 text-right text-xs text-blue-300">
              <p>{config.header.date}</p>
              <p>{config.header.clerk}</p>
              {config.header.statusBadge && (
                <span className="mt-1.5 inline-block rounded bg-red-500/80 px-2 py-0.5 text-[10px] font-bold text-white">
                  {config.header.statusBadge}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Sections */}
        {config.sections.map((section) => (
          <DocSection key={section.title} title={section.title}>
            {section.fields.map((field) => (
              <ClickableRow
                key={field.id}
                id={field.id}
                label={field.label}
                value={renderFieldValue(field.value)}
                muted={field.value.muted}
                state={fields[field.id] ?? freshField()}
                phase={phase}
                isError={actualErrors.has(field.id)}
                errorExplanation={config.errorExplanations[field.id]}
                onToggle={() => patchField(field.id, { expanded: !fields[field.id]?.expanded })}
                onComment={(v) => patchField(field.id, { comment: v })}
                onFlag={() => patchField(field.id, { flagged: true })}
                onUnflag={() => patchField(field.id, { flagged: false })}
              />
            ))}
          </DocSection>
        ))}
      </div>

      {/* Submit area — prüfen phase */}
      {phase === "prüfen" && (
        <div className="mt-6 flex items-center justify-between gap-4">
          <p className="text-sm text-gray-400">
            {flaggedCount === 0
              ? "Klicke auf Felder, die du für fehlerhaft hältst, und markiere sie."
              : `${flaggedCount} ${flaggedCount === 1 ? "Feld" : "Felder"} als fehlerhaft markiert`}
          </p>
          {flaggedCount > 0 && (
            <button
              onClick={handleSubmit}
              className="shrink-0 rounded-xl px-6 py-3 text-sm font-bold transition-opacity hover:opacity-90"
              style={{ background: "#1ddba0", color: "#0a1628" }}
            >
              Prüfung abschliessen →
            </button>
          )}
        </div>
      )}

      {/* Score summary — auswertung phase */}
      {phase === "auswertung" && (
        <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="px-6 py-4" style={{ background: "#0a1628" }}>
            <h2 className="text-base font-bold text-white">Auswertung</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="rounded-xl bg-emerald-50 px-4 py-5">
                <p className="text-3xl font-bold" style={{ color: "#1ddba0" }}>{foundErrors.length}</p>
                <p className="mt-1 text-xs text-emerald-700">✅ Richtig gefunden</p>
              </div>
              <div className="rounded-xl bg-red-50 px-4 py-5">
                <p className="text-3xl font-bold text-red-500">{missedErrors.length}</p>
                <p className="mt-1 text-xs text-red-600">❌ Übersehen</p>
              </div>
              <div className="rounded-xl bg-amber-50 px-4 py-5">
                <p className="text-3xl font-bold text-amber-500">{wrongFlags.length}</p>
                <p className="mt-1 text-xs text-amber-600">⚠️ Falsch markiert</p>
              </div>
            </div>
            {foundErrors.length === config.actualErrors.length && wrongFlags.length === 0 && (
              <div className="mt-5 text-center">
                <p className="text-3xl">🏆</p>
                <p className="mt-2 text-base font-bold" style={{ color: "#0a1628" }}>
                  Perfekt – alle {config.actualErrors.length} Fehler erkannt!
                </p>
                <p className="mt-0.5 text-sm text-gray-500">
                  Ausgezeichnet! Du hast das Dokument professionell geprüft.
                </p>
              </div>
            )}
            <p className="mt-4 text-center text-xs text-gray-400">
              Klicke auf die markierten Felder im Dossier oben für detailliertes Feedback.
            </p>
          </div>
        </div>
      )}

      <p className="mt-8 text-center text-[10px] text-gray-300">
        BankAcademy · Dokument prüfen · {config.title}
      </p>
    </div>
  );
}
