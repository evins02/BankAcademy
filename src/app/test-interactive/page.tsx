"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";

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

// ── Constants ─────────────────────────────────────────────────────────────────

const ACTUAL_ERRORS = new Set(["belehnung", "eigenmittel", "amortisation"]);

const ERROR_EXPLANATIONS: Record<string, string> = {
  belehnung: "Rechenfehler: CHF 779'000 ÷ CHF 950'000 = 82.0 %, nicht 78.0 %.",
  eigenmittel:
    "Klassifizierungsfehler: PK-Vorbezüge gelten gemäss FINMA nicht als echte Eigenmittel für die Mindestanforderung.",
  amortisation:
    "Dokumentationsfehler: Der Amortisationsplan liegt nicht im Dossier vor – Feld hätte «nicht angegeben» lauten sollen.",
};

const FIELD_IDS = [
  "ehemann", "ehefrau", "wohnadresse", "familienstand",
  "objektart", "adresse", "kaufpreis", "schaetzwert", "baujahr", "wohnflaeche",
  "hypothek1", "hypothek2", "gesamthypothek", "belehnung",
  "eigenmittel-gesamt", "bankguthaben", "eigenmittel",
  "amort-typ", "amort-rate", "amortisation",
  "bruttoeinkommen", "hypothekarkosten", "tragbarkeit-amort", "nebenkosten",
  "wohnkosten-total", "tragbarkeit", "kreditentscheid",
  "kreditsachbearbeiter", "kreditkontrolle", "kreditkommission",
] as const;

function freshField(): FieldState {
  return { expanded: false, comment: "", flagged: false, loading: false, feedback: null };
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
  onToggle: () => void;
  onComment: (v: string) => void;
  onFlag: () => void;
  onUnflag: () => void;
}

function ClickableRow({
  id, label, value, muted, state, phase,
  onToggle, onComment, onFlag, onUnflag,
}: ClickableRowProps) {
  const { expanded, comment, flagged, loading, feedback } = state;
  const isError = ACTUAL_ERRORS.has(id);

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

        {/* Prüfen phase: tiny dot for flagged, ghost "?" on hover */}
        {phase === "prüfen" && flagged && (
          <span className="ml-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0a1628]" />
        )}
        {phase === "prüfen" && !flagged && (
          <span className="ml-2 text-[11px] text-gray-300 opacity-0 transition-opacity group-hover:opacity-70">
            ?
          </span>
        )}

        {/* Auswertung phase: result badge */}
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

      {/* Expanded panel — prüfen phase */}
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

      {/* Expanded panel — auswertung phase */}
      {expanded && phase === "auswertung" && (
        <div className="px-6 pb-4">
          {isError && flagged && (
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3">
              {loading ? (
                <p className="text-xs text-gray-400">KI wertet Erklärung aus…</p>
              ) : feedback ? (
                <>
                  <p className="mb-1 text-xs font-semibold text-emerald-700">
                    {feedback.correct
                      ? "✅ Erklärung korrekt!"
                      : feedback.partial
                      ? "⚠️ Teilweise richtig"
                      : "Feedback:"}
                  </p>
                  <p className="text-xs leading-relaxed text-emerald-800">{feedback.feedback}</p>
                  {feedback.hint && (
                    <p className="mt-1.5 text-xs italic text-emerald-600">💡 {feedback.hint}</p>
                  )}
                </>
              ) : comment ? (
                <p className="text-xs italic text-gray-500">Deine Notiz: «{comment}»</p>
              ) : (
                <p className="text-xs text-emerald-700">Gut erkannt! Du hast keinen Text hinterlassen.</p>
              )}
            </div>
          )}
          {isError && !flagged && (
            <div className="rounded-lg border border-red-100 bg-red-50 p-3">
              <p className="mb-1 text-xs font-semibold text-red-700">Was war der Fehler?</p>
              <p className="text-xs text-red-600">{ERROR_EXPLANATIONS[id] ?? ""}</p>
            </div>
          )}
          {!isError && flagged && (
            <div className="rounded-lg border border-amber-100 bg-amber-50 p-3">
              <p className="text-xs text-amber-700">
                Dieses Feld ist korrekt befüllt – kein Fehler vorhanden.
              </p>
              {comment && (
                <p className="mt-1 text-xs italic text-amber-600">Deine Notiz: «{comment}»</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function TestInteractivePage() {
  const [fields, setFields] = useState<Record<string, FieldState>>(() => {
    const result: Record<string, FieldState> = {};
    for (const id of FIELD_IDS) result[id] = freshField();
    return result;
  });
  const [phase, setPhase] = useState<Phase>("prüfen");

  function patchField(id: string, update: Partial<FieldState>) {
    setFields((prev) => ({ ...prev, [id]: { ...prev[id], ...update } }));
  }

  async function handleSubmit() {
    setPhase("auswertung");
    const toEval = FIELD_IDS.filter(
      (id) => fields[id].flagged && ACTUAL_ERRORS.has(id) && fields[id].comment.trim()
    );
    for (const id of toEval) {
      patchField(id, { loading: true });
      try {
        const res = await fetch("/api/test-interactive/evaluate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ errorId: id, correction: fields[id].comment }),
        });
        const data = (await res.json()) as FeedbackResult;
        patchField(id, { feedback: data, loading: false });
      } catch {
        patchField(id, { loading: false });
      }
    }
  }

  const flaggedCount = FIELD_IDS.filter((id) => fields[id].flagged).length;
  const foundErrors = (["belehnung", "eigenmittel", "amortisation"] as const).filter(
    (id) => fields[id].flagged
  );
  const missedErrors = (["belehnung", "eigenmittel", "amortisation"] as const).filter(
    (id) => !fields[id].flagged
  );
  const wrongFlags = FIELD_IDS.filter((id) => fields[id].flagged && !ACTUAL_ERRORS.has(id));

  function row(id: string, label: string, value: ReactNode, muted?: boolean) {
    return (
      <ClickableRow
        key={id}
        id={id}
        label={label}
        value={value}
        muted={muted}
        state={fields[id]}
        phase={phase}
        onToggle={() => patchField(id, { expanded: !fields[id].expanded })}
        onComment={(v) => patchField(id, { comment: v })}
        onFlag={() => patchField(id, { flagged: true })}
        onUnflag={() => patchField(id, { flagged: false })}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FD]">
      {/* Top nav */}
      <div className="sticky top-0 z-40 flex items-center gap-3 border-b border-gray-200 bg-white/90 px-4 py-3 backdrop-blur-sm">
        <Link
          href="/dashboard"
          className="text-xs text-gray-400 transition-colors hover:text-gray-700"
        >
          ← Dashboard
        </Link>
        <span className="select-none text-gray-200">|</span>
        <span className="text-xs font-semibold text-gray-600">Fehler finden und korrigieren</span>
        {phase === "auswertung" && (
          <span className="ml-auto text-xs font-bold" style={{ color: "#1ddba0" }}>
            {foundErrors.length} / 3 Fehler gefunden
          </span>
        )}
      </div>

      <div className="mx-auto max-w-3xl px-4 py-8">
        {/* Heading */}
        <div className="mb-6">
          <p
            className="text-[10px] font-bold uppercase tracking-widest"
            style={{ color: "#1ddba0" }}
          >
            Interaktives Lernen
          </p>
          <h1 className="mt-1 text-2xl font-bold" style={{ color: "#0a1628" }}>
            Fehler finden und korrigieren
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Szenario: Hypothekarantrag prüfen – Familie Müller
          </p>
        </div>

        {/* Task card */}
        <div
          className="mb-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
          style={{ borderLeftWidth: 4, borderLeftColor: "#1ddba0" }}
        >
          <h2 className="font-semibold" style={{ color: "#0a1628" }}>
            📋 Aufgabe
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Im Hypothekarantrag von Familie Müller sind <strong>3 Fehler</strong> versteckt.
            Prüfe alle Felder sorgfältig, klicke auf verdächtige Einträge und markiere sie als
            fehlerhaft.
          </p>
          <p className="mt-2 text-xs text-gray-400">
            Tipp: Jedes Feld ist anklickbar. Je präziser du den Fehler beschreibst, desto besseres
            Feedback erhältst du.
          </p>
        </div>

        {/* ── Hypothekarantrag Dossier ──────────────────────────────────────── */}
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          {/* Document header */}
          <div className="bg-[#0a1628] px-6 py-5 text-white">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-blue-300">
                  Schweizer Musterbank AG
                </p>
                <h2 className="mt-1 text-xl font-bold">Hypothekarantrag</h2>
                <p className="mt-0.5 text-sm text-blue-200">Nr. HYP-2025-0847</p>
              </div>
              <div className="shrink-0 space-y-0.5 text-right text-xs text-blue-300">
                <p>15. Juni 2025</p>
                <p>Sachb.: K. Steiner, Winterthur</p>
                <span className="mt-1.5 inline-block rounded bg-red-500/80 px-2 py-0.5 text-[10px] font-bold text-white">
                  ENTWURF – zur Prüfung
                </span>
              </div>
            </div>
          </div>

          <DocSection title="1. Antragsteller">
            {row("ehemann", "Ehemann", "Hans Müller, geb. 12.03.1978, CH")}
            {row("ehefrau", "Ehefrau", "Marie Müller-Bühler, geb. 04.07.1981, CH")}
            {row("wohnadresse", "Wohnadresse", "Seestrasse 45, 8200 Schaffhausen")}
            {row("familienstand", "Familienstand", "Verheiratet, 3 Kinder (2009 / 2012 / 2016)")}
          </DocSection>

          <DocSection title="2. Kaufobjekt">
            {row("objektart", "Objektart", "Einfamilienhaus (EFH)")}
            {row("adresse", "Adresse", "Birkenweg 12, 8400 Winterthur")}
            {row("kaufpreis", "Kaufpreis", "CHF 950'000")}
            {row("schaetzwert", "Bankinterner Schätzwert", "CHF 950'000")}
            {row("baujahr", "Baujahr / Renovation", "1998 / 2019")}
            {row("wohnflaeche", "Wohnfläche / Grundstück", "185 m²  |  625 m²")}
          </DocSection>

          <DocSection title="3. Finanzierungsstruktur">
            {row("hypothek1", "Hypothek 1. Rang (66.7 %)", "CHF 633'000")}
            {row("hypothek2", "Hypothek 2. Rang (15.4 %)", "CHF 146'000")}
            {row("gesamthypothek", "Gesamthypothek", "CHF 779'000")}
            {row("belehnung", "Belehnung (LTV)", <strong>78.0 %</strong>)}
            {row("eigenmittel-gesamt", "Eigenmittel gesamt", "CHF 171'000")}
            {row("bankguthaben", "  — Bankguthaben (UBS Sparkonto)", "CHF 99'000")}
            {row(
              "eigenmittel",
              "  — Pensionskassen-Vorbezug (BVG)",
              <span>
                CHF 72&apos;000{" "}
                <span className="ml-1.5 rounded-full bg-green-100 px-1.5 py-0.5 text-[10px] font-bold text-green-700">
                  ✓ Eigenmittel
                </span>
              </span>
            )}
          </DocSection>

          <DocSection title="4. Amortisation">
            {row("amort-typ", "Typ", "Linear")}
            {row("amort-rate", "Amortisationsrate p.a.", "CHF 9'733 (2. Rang über 15 Jahre)")}
            {row("amortisation", "Amortisationsplan (Dok.)", <strong>vorhanden</strong>)}
          </DocSection>

          <DocSection title="5. Tragbarkeitsberechnung (Referenzzins 5.0 %)">
            {row("bruttoeinkommen", "Bruttoeinkommen p.a.", "CHF 168'000")}
            {row("hypothekarkosten", "Hypothekarkosten (5.0 %)", "CHF 38'950")}
            {row("tragbarkeit-amort", "Amortisation p.a.", "CHF 9'733")}
            {row("nebenkosten", "Nebenkosten (1.0 % Kaufpreis)", "CHF 9'500")}
            {row("wohnkosten-total", "Total Wohnkosten p.a.", "CHF 58'183")}
            {row("tragbarkeit", "Tragbarkeit", "34.6 % (Grenzwert: 33.0 %)")}
            {row("kreditentscheid", "Kreditentscheid", "Abzulehnen – Tragbarkeit überschritten")}
          </DocSection>

          <DocSection title="6. Visa / Unterschriften">
            {row("kreditsachbearbeiter", "Kreditsachbearbeiter", "K. Steiner  _______________", true)}
            {row("kreditkontrolle", "Kreditkontrolle", "(ausstehend)", true)}
            {row("kreditkommission", "Kreditkommission", "(ausstehend)", true)}
          </DocSection>
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
                  <p className="text-3xl font-bold" style={{ color: "#1ddba0" }}>
                    {foundErrors.length}
                  </p>
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
              {foundErrors.length === 3 && wrongFlags.length === 0 && (
                <div className="mt-5 text-center">
                  <p className="text-3xl">🏆</p>
                  <p className="mt-2 text-base font-bold" style={{ color: "#0a1628" }}>
                    Perfekt – alle 3 Fehler erkannt!
                  </p>
                  <p className="mt-0.5 text-sm text-gray-500">
                    Ausgezeichnet! Du hast den Hypothekarantrag professionell geprüft.
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
          BankAcademy · Interaktives Lernen · Fehler finden &amp; korrigieren
        </p>
      </div>
    </div>
  );
}
