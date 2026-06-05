"use client";

import { useState } from "react";
import { Search, X, ChevronDown } from "lucide-react";
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
        title="Glossar"
        subtitle={`${GLOSSAR_TERMS.length} Banking-Begriffe nachschlagen`}
      />
      <div className="flex-1 overflow-y-auto">
        {/* Search + filter bar */}
        <div className="sticky top-0 z-10 border-b border-border bg-background px-6 py-3">
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

          <div className="flex items-center gap-2 overflow-x-auto pb-0.5">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={cn(
                  "shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold transition-colors",
                  tab === t
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-text-secondary hover:bg-gray-200"
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          <p className="mb-4 text-xs text-text-secondary">
            {filtered.length} Begriff{filtered.length !== 1 ? "e" : ""}
            {query && ` für „${query}"`}
          </p>

          {filtered.length === 0 ? (
            <div className="py-20 text-center">
              <span className="text-4xl">🔍</span>
              <p className="mt-4 text-sm font-semibold text-text-primary">
                Kein Begriff gefunden
              </p>
              <p className="mt-1 text-xs text-text-secondary">
                Versuche einen anderen Suchbegriff oder wähle eine andere Kategorie.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {filtered.map((term) => {
                const colors = CATEGORY_COLORS[term.category];
                const isOpen = expanded.has(term.id);
                return (
                  <div
                    key={term.id}
                    id={`term-${term.id}`}
                    className="overflow-hidden rounded-xl border border-border bg-surface"
                  >
                    <button
                      onClick={() => toggle(term.id)}
                      className="flex w-full items-start justify-between gap-3 px-5 py-4 text-left transition-colors hover:bg-gray-50"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-sm font-semibold text-text-primary">
                            {term.name}
                          </span>
                          <span
                            className={cn(
                              "rounded-full px-2 py-0.5 text-[10px] font-semibold",
                              colors.bg,
                              colors.text
                            )}
                          >
                            {term.category}
                          </span>
                        </div>
                        <p className="mt-0.5 text-xs leading-snug text-text-secondary">
                          {term.short}
                        </p>
                      </div>
                      <ChevronDown
                        size={15}
                        className={cn(
                          "mt-1 shrink-0 text-text-secondary transition-transform",
                          isOpen && "rotate-180"
                        )}
                      />
                    </button>

                    {isOpen && (
                      <div className="border-t border-border px-5 py-4">
                        <p className="text-sm leading-relaxed text-text-primary">
                          {term.detail}
                        </p>
                        {term.related.length > 0 && (
                          <div className="mt-3 flex flex-wrap items-center gap-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                              Verwandt:
                            </span>
                            {term.related.map((relId) => {
                              const rel = GLOSSAR_TERMS.find((t) => t.id === relId);
                              if (!rel) return null;
                              const rc = CATEGORY_COLORS[rel.category];
                              return (
                                <button
                                  key={relId}
                                  onClick={() => {
                                    setQuery("");
                                    setTab(rel.category);
                                    setExpanded((prev) => new Set([...prev, relId]));
                                    setTimeout(() => {
                                      document
                                        .getElementById(`term-${relId}`)
                                        ?.scrollIntoView({ behavior: "smooth", block: "center" });
                                    }, 50);
                                  }}
                                  className={cn(
                                    "rounded-full border px-2 py-0.5 text-[10px] font-medium transition-colors hover:opacity-70",
                                    rc.bg,
                                    rc.text,
                                    rc.border
                                  )}
                                >
                                  {rel.name.split(" – ")[0]}
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
