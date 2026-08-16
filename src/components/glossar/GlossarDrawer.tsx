"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { X, Search, ChevronDown, BookOpen, ExternalLink } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useGlossar } from "@/context/GlossarContext";
import {
  GLOSSAR_TERMS,
  CATEGORY_COLORS,
  type GlossarCategory,
  type GlossarTerm,
} from "@/lib/glossarData";
import {
  HANDLUNGSKOMPETENZEN,
  BEREICH_LABELS,
  type HKBereich,
} from "@/lib/handlungskompetenzenData";

// ── helpers ───────────────────────────────────────────────────────────────────

function escapeRegex(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function HighlightText({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;
  const parts = text.split(new RegExp(`(${escapeRegex(query)})`, "gi"));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} className="rounded bg-yellow-200 text-yellow-900">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
}

// ── constants ─────────────────────────────────────────────────────────────────

const TABS: Array<GlossarCategory | "Alle"> = [
  "Alle",
  "KYC",
  "Kredit",
  "Zahlungsverkehr",
  "Vorsorge",
];

const BEREICHE: HKBereich[] = ["a", "b", "c", "d", "e"];

// ── term card (Thema-Ansicht) ─────────────────────────────────────────────────

function TermCard({
  term,
  query,
  isExpanded,
  isHighlighted,
  onToggle,
  onRelatedClick,
  termRef,
}: {
  term: GlossarTerm;
  query: string;
  isExpanded: boolean;
  isHighlighted: boolean;
  onToggle: () => void;
  onRelatedClick: (id: string) => void;
  termRef: (el: HTMLDivElement | null) => void;
}) {
  const colors = CATEGORY_COLORS[term.category];

  return (
    <div
      ref={termRef}
      id={`term-${term.id}`}
      className={cn(
        "overflow-hidden rounded-xl border transition-all duration-200",
        isHighlighted
          ? "border-yellow-400 bg-yellow-50 shadow-md"
          : "border-border bg-surface"
      )}
    >
      <button
        onClick={onToggle}
        className="flex w-full items-start justify-between gap-3 px-4 py-3 text-left hover:bg-gray-50"
      >
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-[#0D1B4B]">
              <HighlightText text={term.name} query={query} />
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
          <p className="mt-0.5 text-xs text-text-secondary leading-snug">
            <HighlightText text={term.short} query={query} />
          </p>
        </div>
        <ChevronDown
          size={15}
          className={cn(
            "mt-0.5 shrink-0 text-text-secondary transition-transform duration-200",
            isExpanded && "rotate-180"
          )}
        />
      </button>

      <div
        className={cn(
          "grid transition-all duration-200",
          isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <div className="border-t border-border px-4 pb-3 pt-2">
            <p className="text-xs text-text-primary leading-relaxed">
              <HighlightText text={term.detail} query={query} />
            </p>
            {term.related.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-text-secondary">
                  Verwandt:
                </span>
                {term.related.map((relId) => {
                  const rel = GLOSSAR_TERMS.find((t) => t.id === relId);
                  if (!rel) return null;
                  const rc = CATEGORY_COLORS[rel.category];
                  return (
                    <button
                      key={relId}
                      onClick={(e) => {
                        e.stopPropagation();
                        onRelatedClick(relId);
                      }}
                      className={cn(
                        "rounded-full border px-2 py-0.5 text-[10px] font-medium transition-colors hover:opacity-80",
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
        </div>
      </div>
    </div>
  );
}

// ── HK-Ansicht ────────────────────────────────────────────────────────────────

function HkView({ query }: { query: string }) {
  const [openBereiche, setOpenBereiche] = useState<Set<HKBereich>>(new Set(["a"]));

  const toggleBereich = (b: HKBereich) =>
    setOpenBereiche((prev) => {
      const next = new Set(prev);
      if (next.has(b)) next.delete(b);
      else next.add(b);
      return next;
    });

  const q = query.toLowerCase();

  return (
    <div className="space-y-2">
      {BEREICHE.map((bereich) => {
        const hks = HANDLUNGSKOMPETENZEN.filter((hk) => {
          if (hk.bereich !== bereich) return false;
          if (!q) return true;
          return (
            hk.code.toLowerCase().includes(q) ||
            hk.titel.toLowerCase().includes(q) ||
            hk.leitfragen.some((lf) => lf.frage.toLowerCase().includes(q))
          );
        });
        if (hks.length === 0) return null;

        const isOpen = openBereiche.has(bereich);
        return (
          <div key={bereich} className="rounded-xl border border-border bg-surface overflow-hidden">
            <button
              onClick={() => toggleBereich(bereich)}
              className="flex w-full items-center justify-between gap-2 px-4 py-3 text-left hover:bg-gray-50"
            >
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0D1B4B] text-[11px] font-bold text-white">
                  {bereich.toUpperCase()}
                </span>
                <span className="text-xs font-semibold text-[#0D1B4B] leading-snug">
                  {BEREICH_LABELS[bereich]}
                </span>
              </div>
              <ChevronDown
                size={14}
                className={cn(
                  "shrink-0 text-text-secondary transition-transform duration-200",
                  isOpen && "rotate-180"
                )}
              />
            </button>

            <div
              className={cn(
                "grid transition-all duration-200",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              )}
            >
              <div className="overflow-hidden">
                <div className="border-t border-border divide-y divide-border">
                  {hks.map((hk) => (
                    <div key={hk.code} className="px-4 py-3">
                      <div className="flex items-start gap-2 mb-1.5">
                        <span className="shrink-0 rounded px-1.5 py-0.5 text-[10px] font-bold bg-[#0D1B4B]/10 text-[#0D1B4B]">
                          {hk.code.toUpperCase()}
                        </span>
                        <span className="text-xs font-semibold text-text-primary leading-snug">
                          <HighlightText text={hk.titel} query={query} />
                        </span>
                        {hk.bankspezifisch && (
                          <span className="shrink-0 rounded-full px-1.5 py-0.5 text-[9px] font-semibold bg-amber-100 text-amber-700">
                            Vertiefung
                          </span>
                        )}
                      </div>
                      {hk.leitfragen.length > 0 ? (
                        <ul className="space-y-1 pl-1">
                          {hk.leitfragen.map((lf) => (
                            <li key={lf.code} className="flex items-start gap-1.5">
                              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#0D1B4B]/40" />
                              <span className="text-[11px] text-text-secondary leading-relaxed">
                                <HighlightText text={lf.frage} query={query} />
                              </span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-[11px] text-text-secondary/60 italic pl-1">Details folgen</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── main drawer ───────────────────────────────────────────────────────────────

export function GlossarDrawer() {
  const { isOpen, open, close } = useGlossar();

  const [view, setView] = useState<"thema" | "hk">("thema");
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<GlossarCategory | "Alle">("Alle");
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [highlighted, setHighlighted] = useState<string | null>(null);

  const termRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const listRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) setTimeout(() => searchRef.current?.focus(), 320);
  }, [isOpen]);

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) close();
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, close]);

  const filteredTerms = GLOSSAR_TERMS.filter((t) => {
    const matchesTab = activeTab === "Alle" || t.category === activeTab;
    const q = query.toLowerCase();
    const matchesQuery =
      !q ||
      t.name.toLowerCase().includes(q) ||
      t.short.toLowerCase().includes(q) ||
      t.detail.toLowerCase().includes(q);
    return matchesTab && matchesQuery;
  });

  const toggleExpand = useCallback((id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const scrollToTerm = useCallback((id: string) => {
    setExpanded((prev) => new Set([...prev, id]));
    const term = GLOSSAR_TERMS.find((t) => t.id === id);
    if (term) setActiveTab(term.category);
    setQuery("");
    setTimeout(() => {
      const el = termRefs.current[id];
      if (el && listRef.current) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      setHighlighted(id);
      setTimeout(() => setHighlighted(null), 1500);
    }, 80);
  }, []);

  const setTermRef = useCallback(
    (id: string) => (el: HTMLDivElement | null) => {
      termRefs.current[id] = el;
    },
    []
  );

  return (
    <>
      {/* ── Floating button ───────────────────────────────────────────────── */}
      <button
        onClick={open}
        title="Glossar"
        aria-label="Banking Glossar öffnen"
        className={cn(
          "group fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-transform duration-150 hover:scale-105",
          "bg-[#0D1B4B] text-white dark:bg-[#00C9B1] dark:text-[#0D1B4B]",
          isOpen && "opacity-0 pointer-events-none"
        )}
      >
        <span className="text-lg font-bold leading-none select-none">?</span>
        <span className="pointer-events-none absolute bottom-14 right-0 rounded-lg bg-[#0D1B4B] px-2.5 py-1 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100 dark:bg-[#00C9B1] dark:text-[#0D1B4B] whitespace-nowrap">
          Glossar
        </span>
      </button>

      {/* ── Backdrop ──────────────────────────────────────────────────────── */}
      <div
        aria-hidden
        onClick={close}
        className={cn(
          "fixed inset-0 z-50 bg-black/50 transition-opacity duration-300",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      />

      {/* ── Drawer panel ──────────────────────────────────────────────────── */}
      <div
        role="dialog"
        aria-modal
        aria-label="Banking Glossar"
        className={cn(
          "fixed right-0 top-0 z-50 flex h-full w-full flex-col bg-surface shadow-2xl transition-transform duration-300 ease-in-out md:w-[400px]",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-border px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0D1B4B]">
              <BookOpen size={16} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#0D1B4B]">Banking Glossar</p>
              <p className="text-[11px] text-text-secondary">Schnell nachschlagen</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Link
              href="/glossar"
              onClick={close}
              title="Vollansicht öffnen"
              className="rounded-lg p-1.5 text-text-secondary hover:bg-gray-100 hover:text-text-primary"
            >
              <ExternalLink size={16} />
            </Link>
            <button
              onClick={close}
              className="rounded-lg p-1.5 text-text-secondary hover:bg-gray-100 hover:text-text-primary"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* View toggle + Search */}
        <div className="shrink-0 px-4 pt-3 pb-2 space-y-2">
          <div className="flex rounded-lg bg-gray-100 p-0.5">
            <button
              onClick={() => setView("thema")}
              className={cn(
                "flex-1 rounded-md py-1.5 text-xs font-medium transition-colors",
                view === "thema" ? "bg-white text-[#0D1B4B] shadow-sm" : "text-text-secondary hover:text-text-primary"
              )}
            >
              Nach Thema
            </button>
            <button
              onClick={() => setView("hk")}
              className={cn(
                "flex-1 rounded-md py-1.5 text-xs font-medium transition-colors",
                view === "hk" ? "bg-white text-[#0D1B4B] shadow-sm" : "text-text-secondary hover:text-text-primary"
              )}
            >
              Nach HK
            </button>
          </div>

          <div className="relative">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none"
            />
            <input
              ref={searchRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={view === "hk" ? "HK suchen…" : "Begriff suchen…"}
              className="w-full rounded-xl border border-border bg-background py-2 pl-8 pr-8 text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-[#0D1B4B]/20"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded p-0.5 text-text-secondary hover:text-text-primary"
              >
                <X size={13} />
              </button>
            )}
          </div>
        </div>

        {/* Category tabs (nur in Thema-Ansicht) */}
        {view === "thema" && (
          <>
            <div className="shrink-0 flex gap-1.5 overflow-x-auto px-4 pb-2 scrollbar-hide">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-colors",
                    activeTab === tab
                      ? "bg-[#0D1B4B] text-white"
                      : "bg-gray-100 text-text-secondary hover:bg-gray-200"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="shrink-0 px-4 pb-2">
              <p className="text-[11px] text-text-secondary">
                {filteredTerms.length} Begriff{filteredTerms.length !== 1 ? "e" : ""}
                {query && ` für „${query}"`}
              </p>
            </div>
          </>
        )}

        {/* Scrollable list */}
        <div ref={listRef} className="flex-1 overflow-y-auto px-4 pb-6 space-y-2">
          {view === "thema" ? (
            filteredTerms.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-3xl">🔍</p>
                <p className="mt-3 text-sm font-medium text-text-primary">Kein Begriff gefunden</p>
                <p className="mt-1 text-xs text-text-secondary">Versuche einen anderen Suchbegriff.</p>
              </div>
            ) : (
              filteredTerms.map((term) => (
                <TermCard
                  key={term.id}
                  term={term}
                  query={query}
                  isExpanded={expanded.has(term.id)}
                  isHighlighted={highlighted === term.id}
                  onToggle={() => toggleExpand(term.id)}
                  onRelatedClick={scrollToTerm}
                  termRef={setTermRef(term.id)}
                />
              ))
            )
          ) : (
            <HkView query={query} />
          )}
        </div>
      </div>
    </>
  );
}
