"use client";

import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ZV_FO_PRODUCTS } from "@/lib/zahlungsverkehr-privat";

const PRODUCT_COLORS: Record<string, { bg: string; border: string; dot: string }> = {
  dauerauftrag: { bg: "bg-blue-50", border: "border-blue-200", dot: "bg-blue-500" },
  lsv:          { bg: "bg-purple-50", border: "border-purple-200", dot: "bg-purple-500" },
  ebanking:     { bg: "bg-green-50", border: "border-green-200", dot: "bg-green-500" },
  ebill:        { bg: "bg-amber-50", border: "border-amber-200", dot: "bg-amber-500" },
  ausland:      { bg: "bg-rose-50", border: "border-rose-200", dot: "bg-rose-500" },
};

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
          Zahlungsverkehr – Produkte im Überblick
        </h2>
        <p className="text-sm text-text-secondary">
          Als Front-Office-Berater empfiehlst du die passenden Produkte. Hier die wichtigsten im Überblick:
        </p>
      </div>

      <div className="space-y-3">
        {ZV_FO_PRODUCTS.map((p) => {
          const colors = PRODUCT_COLORS[p.id] ?? { bg: "bg-gray-50", border: "border-gray-200", dot: "bg-gray-400" };
          return (
            <div
              key={p.id}
              className={`rounded-DEFAULT border p-4 ${colors.bg} ${colors.border}`}
            >
              <div className="mb-2 flex items-center gap-2">
                <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${colors.dot}`} />
                <p className="font-semibold text-text-primary">{p.title}</p>
                <p className="text-xs text-text-secondary">{p.subtitle}</p>
              </div>
              <ul className="mb-2 space-y-1 pl-5">
                {p.details.map((d) => (
                  <li key={d} className="text-xs text-text-primary">
                    {d}
                  </li>
                ))}
              </ul>
              <p className="pl-5 text-xs italic text-text-secondary">{p.example}</p>
            </div>
          );
        })}
      </div>

      <Button onClick={onContinue} className="w-full">
        Zum ersten Fall
        <ChevronRight size={14} />
      </Button>
    </div>
  );
}
