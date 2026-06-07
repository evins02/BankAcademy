"use client";

import { ChevronRight, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LernblockCardProps {
  onContinue: () => void;
}

const KEY_METRICS = [
  {
    num: 1,
    title: "KGV (Kurs-Gewinn-Verhältnis)",
    detail: "KGV = Kurs / Gewinn je Aktie. Zeigt, wie viel Anleger für CHF 1 Jahresgewinn zahlen. Tief = günstig.",
  },
  {
    num: 2,
    title: "Dividendenrendite",
    detail: "Dividendenrendite = Dividende je Aktie / Kurs × 100. Wichtig für einkommensorientierte Anleger.",
  },
  {
    num: 3,
    title: "Aktie vs. Obligation",
    detail: "Aktien: höhere Rendite, höheres Risiko, Eigenkapital. Obligationen: Fremdkapital, fixe Zinsen, tieferes Risiko.",
  },
];

const RISK_NOTES = [
  { label: "Kursschwankungen", note: "Aktien können 30–50% kurzfristig fallen" },
  { label: "Anlagehorizont", note: "Mindestens 5–10 Jahre empfohlen für Aktien" },
  { label: "Diversifikation", note: "Breite Streuung reduziert das Einzeltitelrisiko" },
  { label: "KGV-Vergleich", note: "Immer branchenspezifisch bewerten – keine absolute Zahl" },
];

export function AktienLernblock({ onContinue }: LernblockCardProps) {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-DEFAULT bg-surface p-6 shadow-card">
        <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
          Lernblock
        </p>
        <h2 className="mb-5 text-lg font-bold text-text-primary">Aktien & Kennzahlen – Grundlagen</h2>

        <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
          Wichtige Kennzahlen
        </p>
        <div className="mb-5 overflow-hidden rounded-DEFAULT border border-border">
          {KEY_METRICS.map((m, i) => (
            <div
              key={m.num}
              className={`flex items-start gap-4 p-4 ${i < KEY_METRICS.length - 1 ? "border-b border-border" : ""}`}
            >
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                {m.num}
              </div>
              <div>
                <p className="text-sm font-semibold text-text-primary">{m.title}</p>
                <p className="mt-0.5 text-xs text-text-secondary">{m.detail}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
          Formeln
        </p>
        <div className="mb-5 grid grid-cols-2 gap-3">
          <div className="rounded-DEFAULT border border-border bg-background p-3">
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-text-secondary">KGV</p>
            <p className="font-mono text-sm font-medium text-text-primary">Kurs ÷ Gewinn je Aktie</p>
          </div>
          <div className="rounded-DEFAULT border border-border bg-background p-3">
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-text-secondary">
              Dividendenrendite
            </p>
            <p className="font-mono text-sm font-medium text-text-primary">Dividende ÷ Kurs × 100</p>
          </div>
        </div>

        <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
          Risikofaktoren
        </p>
        <div className="mb-5 overflow-hidden rounded-DEFAULT border border-border">
          {RISK_NOTES.map((r, i) => (
            <div
              key={r.label}
              className={`flex items-center gap-4 px-4 py-2.5 ${i < RISK_NOTES.length - 1 ? "border-b border-border" : ""}`}
            >
              <span className="w-36 shrink-0 text-xs font-medium text-text-primary">{r.label}</span>
              <span className="text-xs text-text-secondary">{r.note}</span>
            </div>
          ))}
        </div>

        <div className="mb-6 flex items-start gap-3 rounded-DEFAULT border border-amber-200 bg-amber-50 p-4">
          <AlertCircle size={16} className="mt-0.5 shrink-0 text-amber-600" />
          <div>
            <p className="mb-0.5 text-[11px] font-semibold uppercase tracking-wider text-amber-700">
              Wichtig – Broschüre Risiken
            </p>
            <p className="text-sm leading-relaxed text-amber-900">
              Vor dem ersten Wertschriftenkauf muss die Broschüre «Besondere Risiken im Effektenhandel» abgegeben
              und der Erhalt bestätigt werden. Pflicht nach OR / FIDLEG.
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
