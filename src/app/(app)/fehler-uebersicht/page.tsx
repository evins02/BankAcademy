"use client";

import { useEffect, useState, useMemo } from "react";
import { AlertCircle, ChevronRight, CheckCircle2, XCircle, Filter } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { EmptyState } from "@/components/ui/empty-state";
import { getAttemptRecords, MODULE_META, type AttemptRecord } from "@/lib/error-tracking";

// ─── Types ────────────────────────────────────────────────────────────────────

interface CaseGroup {
  moduleId: string;
  caseId: string;
  caseTitle: string;
  moduleLabel: string;
  moduleHref: string;
  records: AttemptRecord[];
  errorCount: number;
  lastAt: number;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function relativeTime(ts: number) {
  const diff = Date.now() - ts;
  const m = Math.floor(diff / 60000);
  if (m < 2) return "gerade eben";
  if (m < 60) return `vor ${m} Min.`;
  const h = Math.floor(m / 60);
  if (h < 24) return `vor ${h} Std.`;
  const d = Math.floor(h / 24);
  return `vor ${d} Tag${d > 1 ? "en" : ""}`;
}

function groupRecords(records: AttemptRecord[]): CaseGroup[] {
  const map = new Map<string, CaseGroup>();
  for (const r of records) {
    const key = `${r.moduleId}:${r.caseId}`;
    const existing = map.get(key);
    if (existing) {
      existing.records.push(r);
      if (!r.correct) existing.errorCount++;
      if (r.timestamp > existing.lastAt) existing.lastAt = r.timestamp;
    } else {
      map.set(key, {
        moduleId: r.moduleId,
        caseId: r.caseId,
        caseTitle: r.caseTitle,
        moduleLabel: MODULE_META[r.moduleId]?.label ?? r.moduleId,
        moduleHref: MODULE_META[r.moduleId]?.href ?? "/dashboard",
        records: [r],
        errorCount: r.correct ? 0 : 1,
        lastAt: r.timestamp,
      });
    }
  }
  return Array.from(map.values()).sort((a, b) => b.lastAt - a.lastAt);
}

// ─── Case row ─────────────────────────────────────────────────────────────────

function CaseRow({ group }: { group: CaseGroup }) {
  const [open, setOpen] = useState(false);
  const totalAttempts = group.records.length;
  const correctCount = group.records.filter((r) => r.correct).length;
  const lastRetryOk = group.records.length >= 2 && group.records[group.records.length - 1].correct;

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface">
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex w-full items-center gap-3 px-4 py-3.5 text-left hover:bg-gray-50 transition-colors"
      >
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-50">
          <AlertCircle size={15} className="text-red-500" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="truncate text-sm font-semibold text-text-primary">{group.caseTitle}</p>
          <p className="text-xs text-text-secondary">
            {group.moduleLabel} · {relativeTime(group.lastAt)}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {lastRetryOk && (
            <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-bold text-green-700">
              2. Versuch ✓
            </span>
          )}
          <span className="rounded-full bg-red-100 px-2 py-0.5 text-[11px] font-bold text-red-600">
            {group.errorCount}/{totalAttempts} falsch
          </span>
          <ChevronRight
            size={15}
            className={`text-text-secondary transition-transform ${open ? "rotate-90" : ""}`}
          />
        </div>
      </button>

      {open && (
        <div className="border-t border-border">
          {/* Attempt history */}
          <div className="divide-y divide-border">
            {group.records.map((r, i) => (
              <div key={r.id} className="flex items-start gap-3 px-4 py-3">
                <div className="mt-0.5 shrink-0">
                  {r.correct ? (
                    <CheckCircle2 size={15} className="text-green-500" />
                  ) : (
                    <XCircle size={15} className="text-red-500" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-text-primary">
                      Versuch {r.attempt ?? i + 1}
                    </span>
                    <span className="text-[11px] text-text-secondary">{relativeTime(r.timestamp)}</span>
                    {r.correct ? (
                      <span className="text-[10px] font-bold text-green-600">Richtig</span>
                    ) : (
                      <span className="text-[10px] font-bold text-red-500">Falsch</span>
                    )}
                  </div>
                  {!r.correct && r.errors.length > 0 && (
                    <div className="mt-1 space-y-1">
                      {r.errors.map((e, ei) => (
                        <div key={ei} className="flex items-center gap-1.5">
                          <span className={`shrink-0 rounded px-1.5 py-0.5 text-[10px] font-semibold ${
                            e.type === "wrong"
                              ? "bg-red-100 text-red-600"
                              : "bg-amber-100 text-amber-700"
                          }`}>
                            {e.type === "wrong" ? "FALSCH GEWÄHLT" : "VERGESSEN"}
                          </span>
                          <span className="text-xs text-text-secondary">{e.documentLabel}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Retry link */}
          <div className="flex items-center justify-between border-t border-border px-4 py-2.5">
            <span className="text-xs text-text-secondary">
              {correctCount}/{totalAttempts} Versuche korrekt
            </span>
            <Link
              href={group.moduleHref}
              className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-bold text-white transition-colors"
              style={{ background: "#0D1B4B" }}
            >
              Nochmal üben <ChevronRight size={12} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Filters ──────────────────────────────────────────────────────────────────

type FilterModule = "all" | string;
type FilterType = "all" | "errors";
type FilterDate = "all" | "week" | "month";

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function FehlerUebersichtPage() {
  const [records, setRecords] = useState<AttemptRecord[]>([]);
  const [filterModule, setFilterModule] = useState<FilterModule>("all");
  const [filterType, setFilterType] = useState<FilterType>("errors");
  const [filterDate, setFilterDate] = useState<FilterDate>("all");

  useEffect(() => {
    setRecords(getAttemptRecords());
  }, []);

  const allModuleIds = useMemo(() => {
    const ids = new Set(records.map((r) => r.moduleId));
    return Array.from(ids);
  }, [records]);

  const filtered = useMemo(() => {
    let rs = records;
    if (filterModule !== "all") rs = rs.filter((r) => r.moduleId === filterModule);
    if (filterType === "errors") rs = rs.filter((r) => !r.correct);
    if (filterDate === "week") {
      const cutoff = Date.now() - 7 * 86400000;
      rs = rs.filter((r) => r.timestamp >= cutoff);
    } else if (filterDate === "month") {
      const cutoff = Date.now() - 30 * 86400000;
      rs = rs.filter((r) => r.timestamp >= cutoff);
    }
    return rs;
  }, [records, filterModule, filterType, filterDate]);

  const groups = useMemo(() => groupRecords(filtered), [filtered]);

  const totalErrors = records.filter((r) => !r.correct).length;

  return (
    <>
      <Header
        title="Fehler Übersicht"
        subtitle={totalErrors > 0 ? `${totalErrors} Fehler aufgezeichnet` : "Noch keine Fehler"}
      />
      <div className="flex-1 overflow-y-auto p-6">

        {/* Filters */}
        {records.length > 0 && (
          <div className="mb-5 flex flex-wrap items-center gap-2">
            <Filter size={13} className="text-text-secondary shrink-0" />

            <select
              value={filterModule}
              onChange={(e) => setFilterModule(e.target.value)}
              className="rounded-lg border border-border bg-surface px-2.5 py-1.5 text-xs text-text-primary outline-none focus:border-primary"
            >
              <option value="all">Alle Module</option>
              {allModuleIds.map((id) => (
                <option key={id} value={id}>
                  {MODULE_META[id]?.label ?? id}
                </option>
              ))}
            </select>

            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as FilterType)}
              className="rounded-lg border border-border bg-surface px-2.5 py-1.5 text-xs text-text-primary outline-none focus:border-primary"
            >
              <option value="errors">Nur Fehler</option>
              <option value="all">Alle Versuche</option>
            </select>

            <select
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value as FilterDate)}
              className="rounded-lg border border-border bg-surface px-2.5 py-1.5 text-xs text-text-primary outline-none focus:border-primary"
            >
              <option value="all">Jederzeit</option>
              <option value="week">Diese Woche</option>
              <option value="month">Dieser Monat</option>
            </select>

            {groups.length > 0 && (
              <span className="ml-auto text-xs text-text-secondary">
                {groups.length} Szenario{groups.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>
        )}

        {/* Content */}
        {records.length === 0 ? (
          <EmptyState
            variant="no-errors"
            title="Noch keine Versuche aufgezeichnet"
            subtitle="Deine Fehler und Versuche werden automatisch gespeichert. Starte ein Szenario!"
          />
        ) : groups.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <CheckCircle2 size={40} className="mb-3 text-green-400" />
            <p className="text-sm font-semibold text-text-primary">Keine Fehler in diesem Zeitraum</p>
            <p className="mt-1 text-xs text-text-secondary">Probiere einen anderen Filter oder starte neue Szenarien.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {groups.map((g) => (
              <CaseRow key={`${g.moduleId}:${g.caseId}`} group={g} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
