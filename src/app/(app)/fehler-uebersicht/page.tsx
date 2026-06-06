"use client";

import { useEffect, useState } from "react";
import { AlertCircle, ChevronRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { getErrors, type ErrorEntry } from "@/lib/progressData";
import { EmptyState } from "@/components/ui/empty-state";

function relativeTime(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 60) return `vor ${m} Min.`;
  const h = Math.floor(m / 60);
  if (h < 24) return `vor ${h} Std.`;
  const d = Math.floor(h / 24);
  return `vor ${d} Tag${d > 1 ? "en" : ""}`;
}

function groupByModule(errors: ErrorEntry[]): Record<string, ErrorEntry[]> {
  return errors.reduce<Record<string, ErrorEntry[]>>((acc, e) => {
    if (!acc[e.moduleId]) acc[e.moduleId] = [];
    acc[e.moduleId].push(e);
    return acc;
  }, {});
}

export default function FehlerUebersichtPage() {
  const [errors, setErrors] = useState<ErrorEntry[]>([]);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  useEffect(() => {
    const errs = getErrors();
    setErrors(errs);
    // expand all groups by default
    const groups = new Set(errs.map((e) => e.moduleId));
    setExpanded(groups);
  }, []);

  const grouped = groupByModule(errors);
  const moduleIds = Object.keys(grouped);

  function toggle(id: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <>
      <Header
        title="Fehler Übersicht"
        subtitle={errors.length > 0 ? `${errors.length} Fehler insgesamt` : "Keine Fehler aufgezeichnet"}
      />
      <div className="flex-1 overflow-y-auto p-6">
        {errors.length === 0 ? (
          <EmptyState
            variant="no-errors"
            title="Keine Fehler aufgezeichnet"
            subtitle="Fehler werden beim Lernen automatisch gespeichert. Weiter so!"
          />
        ) : (
          <div className="space-y-6">
            {moduleIds.map((moduleId) => {
              const errs = grouped[moduleId];
              const isOpen = expanded.has(moduleId);
              const moduleName = errs[0].moduleName;

              return (
                <div key={moduleId} className="overflow-hidden rounded-xl border border-border bg-surface">
                  <button
                    onClick={() => toggle(moduleId)}
                    className="flex w-full items-center justify-between px-5 py-4 hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-light">
                        <AlertCircle size={16} className="text-accent" />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-semibold text-text-primary">{moduleName}</p>
                        <p className="text-xs text-text-secondary">{errs.length} Fehler</p>
                      </div>
                    </div>
                    <ChevronRight
                      size={16}
                      className={`text-text-secondary transition-transform ${isOpen ? "rotate-90" : ""}`}
                    />
                  </button>

                  {isOpen && (
                    <div className="border-t border-border">
                      {errs.map((err, i) => (
                        <div
                          key={err.id}
                          className={`px-5 py-4 ${i < errs.length - 1 ? "border-b border-border" : ""}`}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <p className="text-sm font-medium text-text-primary">{err.question}</p>
                              <div className="mt-2 space-y-1">
                                <div className="flex items-start gap-2">
                                  <span className="mt-0.5 shrink-0 rounded bg-red-100 px-1.5 py-0.5 text-[10px] font-semibold text-red-600">
                                    DEINE ANTWORT
                                  </span>
                                  <p className="text-xs text-text-secondary">{err.userAnswer}</p>
                                </div>
                                <div className="flex items-start gap-2">
                                  <span className="mt-0.5 shrink-0 rounded bg-green-100 px-1.5 py-0.5 text-[10px] font-semibold text-green-700">
                                    RICHTIG
                                  </span>
                                  <p className="text-xs text-text-primary">{err.correctAnswer}</p>
                                </div>
                              </div>
                            </div>
                            <p className="shrink-0 text-[11px] text-text-secondary">
                              {relativeTime(err.timestamp)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
