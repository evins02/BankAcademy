"use client";

import { useState, useRef } from "react";
import { Search, X, ChevronDown, ChevronRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import {
  GLOSSAR_TERMS,
  CATEGORY_COLORS,
  type GlossarCategory,
} from "@/lib/glossarData";
import { cn } from "@/lib/utils";

const TABS: Array<GlossarCategory | "Alle"> = [
  "Alle",
  "KYC",
  "Kredit",
  "Zahlungsverkehr",
  "Vorsorge",
];

export default function GlossarPage() {
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<GlossarCategory | "Alle">("Alle");
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const termRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const filtered = GLOSSAR_TERMS.filter((t) => {
    const matchTab = tab === "Alle" || t.category === tab;
    const q = query.toLowerCase();
    const matchQuery =
      !q ||
      t.name.toLowerCase().includes(q) ||
      t.short.toLowerCase().includes(q) ||
      t.detail.toLowerCase().includes(q);
    return matchTab && matchQuery;
  });

  function toggleTerm(id: string) {
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
        title="Glossar"
        subtitle={`${GLOSSAR_TERMS.length} Banking-Begriffe nachschlagen`}
      />
      <div className="flex-1 overflow-y-auto">

        {/* Sticky Toolbar */}
        <div className="sticky top-0 z-10 border-b border-border bg-background">
          <div className="px-6 py-3">
            <div className="relative mb-3">
              <Search
                size={14}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary"
              />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Begriff suchen…"
                className="w-full rounded-xl border border-border bg-surface py-2.5 pl-9 pr-9 text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-0.5 text-text-secondary hover:text-text-primary"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Category tabs */}
            <div className="flex gap-1 overflow-x-auto pb-1">
              {TABS.map((t) => {
                const active = tab === t;
                const colors = t !== "Alle" ? CATEGORY_COLORS[t] : null;
                return (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={cn(
                      "shrink-0 rounded-full border px-3 py-1 text-xs font-semibold transition-colors",
                      active
                        ? colors
                          ? `${colors.bg} ${colors.text} ${colors.border}`
                          : "bg-primary text-white border-primary"
                        : "border-border bg-surface text-text-secondary hover:text-text-primary"
                    )}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Term list */}
        <div className="p-6 space-y-2">
          {filtered.length === 0 ? (
            <p className="py-12 text-center text-sm text-text-secondary">
              Keine Begriffe gefunden.
            </p>
          ) : (
            filtered.map((term) => {
              const isOpen = expanded.has(term.id);
              const colors = CATEGORY_COLORS[term.category];
              return (
                <div
                  key={term.id}
                  ref={(el) => { termRefs.current[term.id] = el; }}
                  className="overflow-hidden rounded-xl border border-border bg-surface"
                >
                  <button
                    onClick={() => toggleTerm(term.id)}
                    className="flex w-full items-center gap-3 px-5 py-4 text-left transition-colors hover:bg-gray-50"
                  >
                    <span
                      className={cn(
                        "shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-bold",
                        colors.bg, colors.text, colors.border
                      )}
                    >
                      {term.category}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-text-primary">{term.name}</p>
                      {!isOpen && (
                        <p className="mt-0.5 text-xs text-text-secondary line-clamp-1">
                          {term.short}
                        </p>
                      )}
                    </div>
                    {isOpen ? (
                      <ChevronDown size={16} className="shrink-0 text-text-secondary" />
                    ) : (
                      <ChevronRight size={16} className="shrink-0 text-text-secondary" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="border-t border-border px-5 py-4 space-y-3">
                      <p className="text-sm font-medium text-text-primary">{term.short}</p>
                      <p className="text-sm text-text-secondary leading-relaxed">{term.detail}</p>

                      {term.related.length > 0 && (
                        <div>
                          <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                            Verwandte Begriffe
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {term.related.map((relId) => {
                              const rel = GLOSSAR_TERMS.find((t) => t.id === relId);
                              if (!rel) return null;
                              const tc = CATEGORY_COLORS[rel.category];
                              return (
                                <button
                                  key={rel.id}
                                  onClick={() => {
                                    setExpanded((prev) => new Set([...prev, rel.id]));
                                    setTimeout(() => {
                                      termRefs.current[rel.id]?.scrollIntoView({ behavior: "smooth", block: "center" });
                                    }, 80);
                                  }}
                                  className={cn(
                                    "rounded-full border px-2 py-0.5 text-[10px] font-medium transition-colors hover:opacity-70",
                                    tc.bg, tc.text, tc.border
                                  )}
                                >
                                  {rel.name.split(" – ")[0]}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}
