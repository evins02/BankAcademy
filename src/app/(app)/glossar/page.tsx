"use client";

import { useState, useRef, useCallback } from "react";
import { Search, X, ChevronDown, ChevronRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import {
  GLOSSAR_TERMS,
  CATEGORY_COLORS,
  type GlossarCategory,
} from "@/lib/glossarData";
import {
  HANDLUNGSKOMPETENZEN,
  BEREICH_LABELS,
  type HKBereich,
} from "@/lib/handlungskompetenzenData";
import { cn } from "@/lib/utils";

// ── constants ───────────────────────────────────────────────────────────────────────────────────

const TABS: Array<GlossarCategory | "Alle"> = [
  "Alle",
  "KYC",
  "Kredit",
  "Zahlungsverkehr",
  "Vorsorge",
];

const BEREICHE: HKBereich[] = ["a", "b", "c", "d", "e"];

const BEREICH_COLORS: Record<
  HKBereich,
  { bg: string; text: string; border: string; dot: string }
> = {
  a: { bg: "bg-indigo-50", text: "text-indigo-700", border: "border-indigo-200", dot: "bg-indigo-500" },
  b: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", dot: "bg-emerald-500" },
  c: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", dot: "bg-amber-500" },
  d: { bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-200", dot: "bg-rose-500" },
  e: { bg: "bg-violet-50", text: "text-violet-700", border: "border-violet-200", dot: "bg-violet-500" },
};

// ── main page ───────────────────────────────────────────────────────────────────────────────────

export default function GlossarPage() {
  const [view, setView] = useState<"thema" | "hk">("thema");

  // "Nach Thema" state
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<GlossarCategory | "Alle">("Alle");
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const termRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // "Nach HK" state
  const [openBereiche, setOpenBereiche] = useState<Set<HKBereich>>(new Set());

  // ── helpers ───────────────────────────────────────────────────────────────────────

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

  function toggleBereich(b: HKBereich) {
    setOpenBereiche((prev) => {
      const next = new Set(prev);
      if (next.has(b)) next.delete(b);
      else next.add(b);
      return next;
    });
  }

  // Klick auf einen Glossarbegriff aus der HK-Ansicht:
  // → Wechsel zu "Nach Thema", Begriff aufklappen und scrollen
  const navigateToTerm = useCallback((id: string) => {
    const term = GLOSSAR_TERMS.find((t) => t.id === id);
    if (!term) return;
    setView("thema");
    setQuery("");
    setTab(term.category);
    setExpanded((prev) => new Set([...prev, id]));
    setTimeout(() => {
      termRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 80);
  }, []);

  // ── render ──────────────────────────────────────────────────────────────────────────────────

  return (
    <>
      <Header
        title="Glossar"
        subtitle={`${GLOSSAR_TERMS.length} Banking-Begriffe nachschlagen`}
      />
      <div className="flex-1 overflow-y-auto">

        {/* ── Sticky Toolbar ────────────────────────────────────────────────────── */}
        <div className="sticky top-0 z-10 border-b border-border bg-background">

          {/* View toggle */}
          <div className="flex items-center gap-0 px-6 pt-3">
            {(["thema", "hk"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={cn(
                  "px-4 py-2 text-sm font-semibold transition-colors border-b-2 -mb-px",
                  view === v
                    ? "border-primary text-primary"
                    : "border-transparent text-text-secondary hover:text-text-primary"
                )}
              >
                {v === "thema" ? "Nach Thema" : "Nach Handlungskompetenz"}
              </button>
            ))}
          </div>

          {/* Search + filters — nur in "Nach Thema" */}
          {view === "thema" && (
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
          )}
        </div>

        {/* ── "Nach Thema" Ansicht ──────────────────────────────────────────────── */}
        {view === "thema" && (
          <div className="p-6">
            <p className="mb-4 text-xs text-text-secondary">
              {filtered.length} Begriff{filtered.length !== 1 ? "e" : ""}
              {query && ` für „${query}“`}
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
                      ref={(el) => { termRefs.current[term.id] = el; }}
                      className="overflow-hidden rounded-xl border border-border bg-surface"
                    >
                      <button
                        onClick={() => toggleTerm(term.id)}
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
                                        termRefs.current[relId]?.scrollIntoView({
                                          behavior: "smooth",
                                          block: "center",
                                        });
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
        )}

        {/* ── "Nach Handlungskompetenz" Ansicht ──────────────────────────────────────────── */}
        {view === "hk" && (
          <div className="p-6 space-y-3">
            <p className="mb-2 text-xs text-text-secondary">
              Handlungskompetenzen aus dem Bildungsplan Kauffrau / Kaufmann EFZ Fachrichtung Bank
            </p>

            {BEREICHE.map((b) => {
              const isOpen = openBereiche.has(b);
              const hks = HANDLUNGSKOMPETENZEN.filter((hk) => hk.bereich === b);
              const colors = BEREICH_COLORS[b];
              const bankCount = hks.filter((hk) => hk.bankspezifisch).length;

              return (
                <div
                  key={b}
                  className="overflow-hidden rounded-xl border border-border bg-surface"
                >
                  {/* Bereich-Header */}
                  <button
                    onClick={() => toggleBereich(b)}
                    className="flex w-full items-center gap-3 px-5 py-4 text-left transition-colors hover:bg-gray-50"
                  >
                    <span
                      className={cn(
                        "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold",
                        colors.bg,
                        colors.text
                      )}
                    >
                      {b.toUpperCase()}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-text-primary">
                        {BEREICH_LABELS[b]}
                      </p>
                      <p className="mt-0.5 text-xs text-text-secondary">
                        {hks.length} Handlungskompetenzen
                        {bankCount > 0 && ` · ${bankCount} mit Vertiefung`}
                      </p>
                    </div>
                    {isOpen ? (
                      <ChevronDown size={16} className="shrink-0 text-text-secondary" />
                    ) : (
                      <ChevronRight size={16} className="shrink-0 text-text-secondary" />
                    )}
                  </button>

                  {/* HK-Liste */}
                  {isOpen && (
                    <div className="border-t border-border divide-y divide-border">
                      {hks.map((hk) => {
                        const relatedTerms = GLOSSAR_TERMS.filter(
                          (t) => t.handlungskompetenzen?.includes(hk.code)
                        );

                        return (
                          <div key={hk.code} className="px-5 py-4">
                            {/* HK-Kopfzeile */}
                            <div className="flex flex-wrap items-start gap-2 mb-2">
                              <span
                                className={cn(
                                  "rounded-md px-2 py-0.5 font-mono text-xs font-bold",
                                  colors.bg,
                                  colors.text
                                )}
                              >
                                {hk.code}
                              </span>
                              <p className="flex-1 text-sm font-semibold text-text-primary leading-snug">
                                {hk.titel}
                              </p>
                              {hk.bankspezifisch && (
                                <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                                  Vertiefung verfügbar
                                </span>
                              )}
                            </div>

                            {/* Leitfragen */}
                            {hk.leitfragen.length === 0 ? (
                              <p className="text-xs italic text-text-secondary">
                                Details folgen
                              </p>
                            ) : (
                              <ul className="mt-2 space-y-1">
                                {hk.leitfragen.map((lf) => (
                                  <li
                                    key={lf.code}
                                    className="flex items-start gap-2 text-xs leading-relaxed text-text-secondary"
                                  >
                                    <span
                                      className={cn(
                                        "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full",
                                        colors.dot
                                      )}
                                    />
                                    {lf.frage}
                                  </li>
                                ))}
                              </ul>
                            )}

                            {/* Verwandte Glossarbegriffe */}
                            {relatedTerms.length > 0 && (
                              <div className="mt-3 flex flex-wrap items-center gap-2">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                                  Verwandte Begriffe:
                                </span>
                                {relatedTerms.map((t) => {
                                  const tc = CATEGORY_COLORS[t.category];
                                  return (
                                    <button
                                      key={t.id}
                                      onClick={() => navigateToTerm(t.id)}
                                      className={cn(
                                        "rounded-full border px-2 py-0.5 text-[10px] font-medium transition-colors hover:opacity-70",
                                        tc.bg,
                                        tc.text,
                                        tc.border
                                      )}
                                    >
                                      {t.name.split(" – ")[0]}
                                    </button>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })}
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
