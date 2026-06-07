"use client";

import { ChevronRight, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LernblockCardProps {
  onContinue: () => void;
}

const RATINGS = [
  { grade: "AAA / Aaa", quality: "Höchste Qualität", risk: "Minimal", color: "bg-primary" },
  { grade: "AA / Aa", quality: "Sehr hohe Qualität", risk: "Sehr gering", color: "bg-green-400" },
  { grade: "A", quality: "Hohe Qualität", risk: "Gering", color: "bg-amber-400" },
  { grade: "BBB / Baa", quality: "Mittlere Qualität", risk: "Moderat", color: "bg-orange-400" },
  { grade: "BB und tiefer", quality: "Spekulativ (Junk)", risk: "Erhöht bis hoch", color: "bg-red-500" },
];

const KEY_CONCEPTS = [
  {
    num: 1,
    title: "Nominalwert & Coupon",
    detail: "Nominalwert = Rückzahlungsbetrag bei Verfall. Coupon = Jahreszins in % des Nominalwerts.",
  },
  {
    num: 2,
    title: "Kurs & Rendite",
    detail: "Kurs < 100% → Kauf unter Nennwert → Rendite über Coupon. Rendite ≈ (Coupon + Kursgewinn p.a.) / Kurs.",
  },
  {
    num: 3,
    title: "Zins-Kurs-Zusammenhang",
    detail: "Steigen Marktzinsen → Obligationenkurse fallen. Je länger die Laufzeit, desto grösser der Kurseffekt.",
  },
];

export function ObligationenLernblock({ onContinue }: LernblockCardProps) {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-DEFAULT bg-surface p-6 shadow-card">
        <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
          Lernblock
        </p>
        <h2 className="mb-5 text-lg font-bold text-text-primary">Obligationen – Grundlagen</h2>

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
          Rating-Skala
        </p>
        <div className="mb-5 flex flex-col gap-1.5">
          {RATINGS.map((r) => (
            <div key={r.grade} className="flex items-center gap-3">
              <div className={`h-3 w-3 shrink-0 rounded-full ${r.color}`} />
              <span className="w-28 text-xs font-mono font-medium text-text-primary">{r.grade}</span>
              <span className="flex-1 text-xs text-text-secondary">{r.quality}</span>
              <span className="text-xs text-text-secondary">{r.risk}</span>
            </div>
          ))}
        </div>

        <div className="mb-5 rounded-DEFAULT border border-border bg-background p-4">
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
            Renditeformel (Annäherung)
          </p>
          <div className="rounded border border-border bg-white p-3 text-center font-mono text-sm text-text-primary">
            Rendite ≈ (Coupon + Kursgewinn p.a.) ÷ Kaufkurs
          </div>
        </div>

        <div className="mb-6 flex items-start gap-3 rounded-DEFAULT border border-amber-200 bg-amber-50 p-4">
          <AlertCircle size={16} className="mt-0.5 shrink-0 text-amber-600" />
          <div>
            <p className="mb-0.5 text-[11px] font-semibold uppercase tracking-wider text-amber-700">
              Wichtig – Eignungsprüfung
            </p>
            <p className="text-sm leading-relaxed text-amber-900">
              Jede Obligationenempfehlung muss zum Risikoprofil des Kunden passen. CCC-Bonds für konservative
              Anleger sind eine Pflichtverletzung nach FIDLEG Art. 12.
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
