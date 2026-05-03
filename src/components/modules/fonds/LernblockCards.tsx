"use client";

import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const STRATEGIES = [
  {
    emoji: "🔥",
    label: "Aggressiv",
    stocks: "~100% Aktien",
    desc: "Höchste Rendite, höchstes Risiko",
    bar: "bg-red-500",
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-800",
    width: "w-full",
  },
  {
    emoji: "🚀",
    label: "Wachstum",
    stocks: "~75% Aktien",
    desc: "Hohe Rendite, hohes Risiko",
    bar: "bg-orange-500",
    bg: "bg-orange-50",
    border: "border-orange-200",
    text: "text-orange-800",
    width: "w-3/4",
  },
  {
    emoji: "⚖️",
    label: "Ausgewogen",
    stocks: "~50% Aktien",
    desc: "Ausgewogenes Verhältnis",
    bar: "bg-yellow-500",
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    text: "text-yellow-800",
    width: "w-1/2",
  },
  {
    emoji: "📈",
    label: "Ertrag",
    stocks: "20–25% Aktien",
    desc: "Stabile Erträge, wenig Risiko",
    bar: "bg-blue-500",
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-800",
    width: "w-1/4",
  },
  {
    emoji: "💰",
    label: "Sparkonto",
    stocks: "0% Aktien",
    desc: "Kapitalerhalt, minimaler Zins",
    bar: "bg-green-500",
    bg: "bg-green-50",
    border: "border-green-200",
    text: "text-green-800",
    width: "w-1",
  },
];

interface LernblockCardsProps {
  onContinue: () => void;
}

export function LernblockCards({ onContinue }: LernblockCardsProps) {
  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <div className="rounded-DEFAULT bg-surface p-5 shadow-card">
        <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
          Lernblock
        </p>
        <h2 className="mb-1 text-lg font-bold text-text-primary">
          Fonds – Anlagestrategien im Überblick
        </h2>
        <p className="text-sm text-text-secondary">
          Als Front-Office-Berater empfiehlst du die passende Strategie basierend auf Anlegerprofil
          und Horizont.
        </p>
      </div>

      {/* Strategy ladder */}
      <div className="overflow-hidden rounded-DEFAULT border border-border bg-surface shadow-card">
        <div className="border-b border-border bg-gray-50 px-4 py-2">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
            Risiko-Rendite-Leiter
          </p>
        </div>
        <div className="divide-y divide-border">
          {STRATEGIES.map((s) => (
            <div key={s.label} className={`flex items-center gap-4 p-4 ${s.bg}`}>
              <span className="text-xl">{s.emoji}</span>
              <div className="min-w-[90px]">
                <p className={`text-sm font-bold ${s.text}`}>{s.label}</p>
                <p className="text-[10px] text-text-secondary">{s.stocks}</p>
              </div>
              <div className="flex-1">
                <div className="mb-1 h-2.5 w-full rounded-full bg-gray-200">
                  <div className={`h-2.5 rounded-full ${s.bar} ${s.width} min-w-[4px]`} />
                </div>
                <p className="text-xs text-text-secondary">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Merksatz */}
      <div className="rounded-DEFAULT border border-primary/30 bg-primary-light p-4">
        <p className="text-sm font-semibold leading-relaxed text-primary">
          💡 Merksatz: Rendite und Risiko sind immer direkt verbunden – höhere Rendite = höheres
          Risiko. Kein Weg daran vorbei!
        </p>
      </div>

      {/* Key Facts */}
      <div className="rounded-DEFAULT border border-border bg-background p-4">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
          Wichtige Grundsätze
        </p>
        <ul className="space-y-2">
          {[
            "Fonds = Sammlung vieler Anlagen (Diversifikation)",
            "Diversifikation reduziert Einzeltitelrisiken",
            "Anlagehorizont: mind. 5 Jahre für Aktienanteil",
            "TER = Total Expense Ratio (jährliche Kosten beachten!)",
            "Notreserve (3–6 Monatslöhne) immer auf Sparkonto",
          ].map((fact) => (
            <li key={fact} className="flex items-start gap-2 text-sm text-text-primary">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              {fact}
            </li>
          ))}
        </ul>
      </div>

      <Button onClick={onContinue} className="w-full">
        Zum ersten Fall
        <ChevronRight size={14} />
      </Button>
    </div>
  );
}
