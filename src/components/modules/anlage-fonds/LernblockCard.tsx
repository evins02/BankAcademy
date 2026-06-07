"use client";

import { ChevronRight, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LernblockCardProps {
  onContinue: () => void;
}

const KEY_CONCEPTS = [
  {
    num: 1,
    title: "TER (Total Expense Ratio)",
    detail: "Jährliche Gesamtkosten des Fonds in %. Sinkt von der Rendite ab. Tiefe TER = mehr Nettorendite für den Anleger.",
  },
  {
    num: 2,
    title: "Ausschüttend vs. thesaurierend",
    detail: "Ausschüttend: Erträge werden ausbezahlt. Thesaurierend: Erträge bleiben im Fonds (Zinseszins-Effekt).",
  },
  {
    num: 3,
    title: "Aktiv vs. passiv (ETF)",
    detail: "Aktiv: Fondsmanager trifft Entscheidungen (höhere Kosten). Passiv/ETF: bildet Index ab (günstig, oft bessere Rendite nach Kosten).",
  },
];

const COST_TABLE = [
  { type: "ETF / Indexfonds", ter: "0.05–0.30%", example: "MSCI World ETF" },
  { type: "Aktiver Mischfonds", ter: "0.80–1.50%", example: "UBS Strategy Balanced" },
  { type: "Aktiver Aktienfonds", ter: "1.20–2.00%", example: "Emerging Markets" },
  { type: "Dachfonds", ter: "1.50–2.50%", example: "Multi-Manager" },
];

export function AnlageFondsLernblock({ onContinue }: LernblockCardProps) {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-DEFAULT bg-surface p-6 shadow-card">
        <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
          Lernblock
        </p>
        <h2 className="mb-5 text-lg font-bold text-text-primary">Anlagefonds & ETF – Grundlagen</h2>

        <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
          Schlüsselkonzepte
        </p>
        <div className="mb-5 overflow-hidden rounded-DEFAULT border border-border">
          {KEY_CONCEPTS.map((c, i) => (
            <div
              key={c.num}
              className={`flex items-start gap-4 p-4 ${i < KEY_CONCEPTS.length - 1 ? "border-b border-border" : ""}`}
            >
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                {c.num}
              </div>
              <div>
                <p className="text-sm font-semibold text-text-primary">{c.title}</p>
                <p className="mt-0.5 text-xs text-text-secondary">{c.detail}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
          TER nach Fondstyp
        </p>
        <div className="mb-5 overflow-hidden rounded-DEFAULT border border-border">
          <div className="grid grid-cols-3 border-b border-border bg-background px-4 py-2 text-[10px] font-semibold uppercase tracking-wider text-text-secondary">
            <span>Fondstyp</span>
            <span>TER typisch</span>
            <span>Beispiel</span>
          </div>
          {COST_TABLE.map((row, i) => (
            <div
              key={row.type}
              className={`grid grid-cols-3 px-4 py-2.5 text-xs ${i < COST_TABLE.length - 1 ? "border-b border-border" : ""}`}
            >
              <span className="font-medium text-text-primary">{row.type}</span>
              <span className="font-mono text-text-primary">{row.ter}</span>
              <span className="text-text-secondary">{row.example}</span>
            </div>
          ))}
        </div>

        <div className="mb-5 grid grid-cols-2 gap-3">
          <div className="rounded-DEFAULT border border-border bg-background p-3">
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-text-secondary">
              Ausschüttend
            </p>
            <p className="text-xs text-text-primary">Erträge werden ausbezahlt → für Einkommensbedarf</p>
          </div>
          <div className="rounded-DEFAULT border border-primary/30 bg-primary-light p-3">
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-primary">
              Thesaurierend
            </p>
            <p className="text-xs text-text-primary">Erträge bleiben im Fonds → Zinseszins, Vermögensaufbau</p>
          </div>
        </div>

        <div className="mb-6 flex items-start gap-3 rounded-DEFAULT border border-amber-200 bg-amber-50 p-4">
          <AlertCircle size={16} className="mt-0.5 shrink-0 text-amber-600" />
          <div>
            <p className="mb-0.5 text-[11px] font-semibold uppercase tracking-wider text-amber-700">
              Wichtig – KID Dokument
            </p>
            <p className="text-sm leading-relaxed text-amber-900">
              Für jeden Fonds muss dem Kunden das KID (Key Information Document) abgegeben werden.
              Es enthält TER, Risikoklasse und Renditehistorie. Pflicht nach FIDLEG / UCITS.
            </p>
          </div>
        </div>

        <Button onClick={onContinue} className="w-full">
          Zum ersten Fall
          <ChevronRight size={14} />
        </Button>
      </div>
    </div>
  );
}
