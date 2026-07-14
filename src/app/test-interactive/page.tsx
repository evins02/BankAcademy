"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";

// ── Types ─────────────────────────────────────────────────────────────────────

type ZoneId = "belehnung" | "eigenmittel" | "amortisation";

interface FeedbackResult {
  correct: boolean;
  partial: boolean;
  feedback: string;
  hint: string | null;
}

interface ZoneState {
  expanded: boolean;
  correction: string;
  feedback: FeedbackResult | null;
  loading: boolean;
}

// ── Constants ─────────────────────────────────────────────────────────────────

const ZONE_LABELS: Record<ZoneId, string> = {
  belehnung: "Belehnung (LTV)",
  eigenmittel: "Eigenmittel-Klassifizierung",
  amortisation: "Amortisationsplan",
};

const ZONE_IDS: ZoneId[] = ["belehnung", "eigenmittel", "amortisation"];

function freshZone(): ZoneState {
  return { expanded: false, correction: "", feedback: null, loading: false };
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

function DocRow({
  label,
  value,
  muted,
}: {
  label: string;
  value: ReactNode;
  muted?: boolean;
}) {
  return (
    <div className="flex items-center border-b border-gray-50 px-6 py-2.5 last:border-0">
      <span className="w-60 shrink-0 text-xs text-gray-500">{label}</span>
      <span className={`text-sm ${muted ? "italic text-gray-400" : "text-gray-800"}`}>
        {value}
      </span>
    </div>
  );
}

interface ErrorRowProps {
  label: string;
  displayValue: ReactNode;
  zone: ZoneState;
  onToggle: () => void;
  onInput: (v: string) => void;
  onSubmit: () => void;
}

function ErrorRow({
  label,
  displayValue,
  zone,
  onToggle,
  onInput,
  onSubmit,
}: ErrorRowProps) {
  const { expanded, correction, feedback, loading } = zone;
  const isCorrect = feedback?.correct === true;
  const isPartial = feedback?.partial === true;

  const leftBorder = isCorrect
    ? "border-l-green-400 bg-green-50/30"
    : isPartial
    ? "border-l-amber-300 bg-amber-50/20"
    : expanded
    ? "border-l-yellow-400 bg-yellow-50/30"
    : "border-l-yellow-200 bg-yellow-50/10";

  const badge = isCorrect
    ? { text: "✓ Korrekt", cls: "bg-green-100 text-green-700" }
    : isPartial
    ? { text: "⚠ Teilweise", cls: "bg-amber-100 text-amber-700" }
    : { text: "⚠ Prüfen", cls: "bg-yellow-100 text-yellow-700" };

  return (
    <div className={`border-b border-gray-50 border-l-4 transition-colors last:border-0 ${leftBorder}`}>
      <button
        onClick={onToggle}
        className="flex w-full items-center px-6 py-2.5 text-left transition-colors hover:bg-yellow-50/40"
      >
        <span className="w-60 shrink-0 text-xs text-gray-500">{label}</span>
        <span className="flex-1 text-sm text-gray-800">{displayValue}</span>
        <span
          className={`ml-3 shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${badge.cls}`}
        >
          {badge.text}
        </span>
        <span className="ml-2 text-xs text-gray-300">{expanded ? "▲" : "▼"}</span>
      </button>

      {expanded && (
        <div className="px-6 pb-4">
          <div className="rounded-lg border border-dashed border-yellow-300 bg-white/70 p-4">
            <p className="mb-2 text-xs font-semibold text-gray-600">
              Beschreibe den Fehler und wie er korrekt sein sollte:
            </p>
            <textarea
              value={correction}
              onChange={(e) => onInput(e.target.value)}
              placeholder="z.B. «Der Wert ist falsch, weil … Richtig wäre …»"
              rows={3}
              disabled={loading || isCorrect}
              className="w-full resize-none rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 disabled:opacity-60"
            />
            {!isCorrect && (
              <button
                onClick={onSubmit}
                disabled={!correction.trim() || loading}
                className="mt-2 rounded-lg bg-[#0D1B4B] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#162a6b] disabled:opacity-40"
              >
                {loading ? "KI wertet aus…" : "Von KI prüfen lassen →"}
              </button>
            )}
            {feedback && (
              <div
                className={`mt-3 rounded-lg border p-3 text-sm ${
                  isCorrect
                    ? "border-green-200 bg-green-50 text-green-800"
                    : isPartial
                    ? "border-amber-200 bg-amber-50 text-amber-800"
                    : "border-red-200 bg-red-50 text-red-800"
                }`}
              >
                <p className="mb-0.5 font-semibold">
                  {isCorrect ? "✅ Richtig!" : isPartial ? "⚠️ Teilweise richtig" : "❌ Noch nicht ganz"}
                </p>
                <p className="text-xs leading-relaxed">{feedback.feedback}</p>
                {feedback.hint && (
                  <p className="mt-1.5 text-xs italic opacity-80">💡 {feedback.hint}</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function TestInteractivePage() {
  const [zones, setZones] = useState<Record<ZoneId, ZoneState>>({
    belehnung: freshZone(),
    eigenmittel: freshZone(),
    amortisation: freshZone(),
  });

  function patch(id: ZoneId, update: Partial<ZoneState>) {
    setZones((prev) => ({ ...prev, [id]: { ...prev[id], ...update } }));
  }

  async function submitCorrection(id: ZoneId) {
    if (!zones[id].correction.trim()) return;
    patch(id, { loading: true });
    try {
      const res = await fetch("/api/test-interactive/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ errorId: id, correction: zones[id].correction }),
      });
      const feedback = (await res.json()) as FeedbackResult;
      patch(id, { feedback, loading: false });
    } catch {
      patch(id, {
        loading: false,
        feedback: {
          correct: false,
          partial: false,
          feedback: "Technischer Fehler – bitte nochmals versuchen.",
          hint: null,
        },
      });
    }
  }

  const solvedCount = ZONE_IDS.filter((id) => zones[id].feedback?.correct).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky test environment banner */}
      <div className="sticky top-0 z-50 border-b-2 border-amber-400 bg-amber-50 px-4 py-2.5 text-center">
        <span className="text-sm font-bold text-amber-800">
          ⚠️ TEST UMGEBUNG – Nicht für Produktion
        </span>
        <Link
          href="/dashboard"
          className="ml-4 text-xs text-amber-600 underline hover:text-amber-900"
        >
          ← Dashboard
        </Link>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-8">
        {/* Page heading */}
        <div className="mb-6">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
            Prototyp · Feature-Test
          </p>
          <h1 className="mt-1 text-2xl font-bold text-gray-900">
            Fehler finden und korrigieren
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Szenario: Hypothekarantrag prüfen – Familie Müller
          </p>
        </div>

        {/* Task instructions */}
        <div className="mb-6 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="font-semibold text-blue-900">📋 Aufgabe</h2>
          <p className="mt-1 text-sm text-blue-800">
            Im Hypothekarantrag von Familie Müller sind{" "}
            <strong>3 Fehler</strong> versteckt. Felder mit dem Badge{" "}
            <span className="inline-block rounded-full bg-yellow-100 px-2 py-0.5 text-[10px] font-bold uppercase text-yellow-700">
              ⚠ Prüfen
            </span>{" "}
            sind verdächtig – klicke darauf, beschreibe den Fehler auf Deutsch,
            und lass deine Antwort von der KI bewerten.
          </p>
          {/* Progress indicators */}
          <div className="mt-3 flex flex-wrap gap-4">
            {ZONE_IDS.map((id) => (
              <span
                key={id}
                className={`flex items-center gap-1.5 text-xs font-medium ${
                  zones[id].feedback?.correct
                    ? "text-green-700"
                    : zones[id].feedback
                    ? "text-amber-600"
                    : "text-blue-600"
                }`}
              >
                {zones[id].feedback?.correct
                  ? "✅"
                  : zones[id].feedback
                  ? "⚠️"
                  : "⬜"}{" "}
                {ZONE_LABELS[id]}
              </span>
            ))}
          </div>
        </div>

        {/* ── Hypothekarantrag Dossier ─────────────────────────────────────── */}
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          {/* Document header */}
          <div className="bg-[#0D1B4B] px-6 py-5 text-white">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-blue-300">
                  Schweizer Musterbank AG
                </p>
                <h2 className="mt-1 text-xl font-bold">Hypothekarantrag</h2>
                <p className="mt-0.5 text-sm text-blue-200">Nr. HYP-2025-0847</p>
              </div>
              <div className="shrink-0 text-right text-xs text-blue-300 space-y-0.5">
                <p>15. Juni 2025</p>
                <p>Sachb.: K. Steiner, Winterthur</p>
                <span className="mt-1.5 inline-block rounded bg-red-500/80 px-2 py-0.5 text-[10px] font-bold text-white">
                  ENTWURF – zur Prüfung
                </span>
              </div>
            </div>
          </div>

          {/* 1. Antragsteller */}
          <DocSection title="1. Antragsteller">
            <DocRow label="Ehemann" value="Hans Müller, geb. 12.03.1978, CH" />
            <DocRow label="Ehefrau" value="Marie Müller-Bühler, geb. 04.07.1981, CH" />
            <DocRow label="Wohnadresse" value="Seestrasse 45, 8200 Schaffhausen" />
            <DocRow label="Familienstand" value="Verheiratet, 3 Kinder (2009 / 2012 / 2016)" />
          </DocSection>

          {/* 2. Objekt */}
          <DocSection title="2. Kaufobjekt">
            <DocRow label="Objektart" value="Einfamilienhaus (EFH)" />
            <DocRow label="Adresse" value="Birkenweg 12, 8400 Winterthur" />
            <DocRow label="Kaufpreis" value="CHF 950'000" />
            <DocRow label="Bankinterner Schätzwert" value="CHF 950'000" />
            <DocRow label="Baujahr / Renovation" value="1998 / 2019" />
            <DocRow label="Wohnfläche / Grundstück" value="185 m²  |  625 m²" />
          </DocSection>

          {/* 3. Finanzierungsstruktur */}
          <DocSection title="3. Finanzierungsstruktur">
            <DocRow label="Hypothek 1. Rang (66.7 %)" value="CHF 633'000" />
            <DocRow label="Hypothek 2. Rang (15.4 %)" value="CHF 146'000" />
            <DocRow label="Gesamthypothek" value="CHF 779'000" />

            {/* ERROR 1 — Belehnung falsch berechnet */}
            <ErrorRow
              label="Belehnung (LTV)"
              displayValue={<strong>78.0 %</strong>}
              zone={zones.belehnung}
              onToggle={() => patch("belehnung", { expanded: !zones.belehnung.expanded })}
              onInput={(v) => patch("belehnung", { correction: v })}
              onSubmit={() => submitCorrection("belehnung")}
            />

            <DocRow label="Eigenmittel gesamt" value="CHF 171'000" />
            <DocRow label="  — Bankguthaben (UBS Sparkonto)" value="CHF 99'000" />

            {/* ERROR 2 — PK-Vorbezug als Eigenmittel klassifiziert */}
            <ErrorRow
              label="  — Pensionskassen-Vorbezug (BVG)"
              displayValue={
                <span>
                  CHF 72'000{" "}
                  <span className="ml-1.5 rounded-full bg-green-100 px-1.5 py-0.5 text-[10px] font-bold text-green-700">
                    ✓ Eigenmittel
                  </span>
                </span>
              }
              zone={zones.eigenmittel}
              onToggle={() =>
                patch("eigenmittel", { expanded: !zones.eigenmittel.expanded })
              }
              onInput={(v) => patch("eigenmittel", { correction: v })}
              onSubmit={() => submitCorrection("eigenmittel")}
            />
          </DocSection>

          {/* 4. Amortisation */}
          <DocSection title="4. Amortisation">
            <DocRow label="Typ" value="Linear" />
            <DocRow
              label="Amortisationsrate p.a."
              value="CHF 9'733 (2. Rang über 15 Jahre)"
            />

            {/* ERROR 3 — Amortisationsplan als «vorhanden» markiert */}
            <ErrorRow
              label="Amortisationsplan (Dok.)"
              displayValue={<strong>vorhanden</strong>}
              zone={zones.amortisation}
              onToggle={() =>
                patch("amortisation", { expanded: !zones.amortisation.expanded })
              }
              onInput={(v) => patch("amortisation", { correction: v })}
              onSubmit={() => submitCorrection("amortisation")}
            />
          </DocSection>

          {/* 5. Tragbarkeit */}
          <DocSection title="5. Tragbarkeitsberechnung (Referenzzins 5.0 %)">
            <DocRow label="Bruttoeinkommen p.a." value="CHF 168'000" />
            <DocRow label="Hypothekarkosten (5.0 %)" value="CHF 38'950" />
            <DocRow label="Amortisation p.a." value="CHF 9'733" />
            <DocRow label="Nebenkosten (1.0 % Kaufpreis)" value="CHF 9'500" />
            <DocRow label="Total Wohnkosten p.a." value="CHF 58'183" />
            <DocRow label="Tragbarkeit" value="34.6 % (Grenzwert: 33.0 %)" />
            <DocRow
              label="Kreditentscheid"
              value="Abzulehnen – Tragbarkeit überschritten"
            />
          </DocSection>

          {/* 6. Visa */}
          <DocSection title="6. Visa / Unterschriften">
            <DocRow
              label="Kreditsachbearbeiter"
              value="K. Steiner  _______________"
              muted
            />
            <DocRow label="Kreditkontrolle" value="(ausstehend)" muted />
            <DocRow label="Kreditkommission" value="(ausstehend)" muted />
          </DocSection>
        </div>

        {/* Progress bar */}
        <div className="mt-5 flex items-center gap-3">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full rounded-full bg-green-400 transition-all duration-500"
              style={{ width: `${(solvedCount / 3) * 100}%` }}
            />
          </div>
          <span className="shrink-0 text-sm text-gray-500">
            {solvedCount} / 3 Fehler gefunden
          </span>
        </div>

        {/* All solved celebration */}
        {solvedCount === 3 && (
          <div className="mt-4 rounded-xl border border-green-300 bg-green-50 p-6 text-center">
            <p className="text-3xl">🏆</p>
            <p className="mt-2 text-lg font-bold text-green-900">Alle 3 Fehler gefunden!</p>
            <p className="mt-1 text-sm text-green-700">
              Ausgezeichnet – du hast den Hypothekarantrag professionell geprüft.
            </p>
          </div>
        )}

        <p className="mt-8 text-center text-[10px] text-gray-300">
          BankAcademy · Prototyp Test Environment · Feature: Fehler finden &amp; korrigieren
        </p>
      </div>
    </div>
  );
}
