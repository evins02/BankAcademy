"use client";

import { XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TragbarkeitRenteCalc } from "@/lib/vorsorge";

function chf(n: number) {
  return `CHF ${n.toLocaleString("de-CH")}`;
}

interface TragbarkeitPanelProps {
  calc: TragbarkeitRenteCalc;
}

export function TragbarkeitPanel({ calc }: TragbarkeitPanelProps) {
  const totalRente = calc.ahv + calc.pk;
  const zinsKosten = Math.round((calc.hypothek * calc.zinsSatz) / 100);
  const totalKosten = zinsKosten + calc.amortisation + calc.nebenkosten;
  const tragbarkeit = (totalKosten / totalRente) * 100;
  const ueberschreitung = tragbarkeit > calc.limite;

  return (
    <div className="mb-5 overflow-hidden rounded-DEFAULT border border-border bg-background">
      <div className="border-b border-border bg-gray-50 px-4 py-2">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
          Tragbarkeitsrechnung Rentenalter
        </p>
      </div>

      <div className="divide-y divide-border">
        {/* Renteneinkommen */}
        <div className="p-4">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
            Renteneinkommen
          </p>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-text-secondary">AHV Skala 44</span>
              <span>{chf(calc.ahv)}/Jahr</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">PK-Rente</span>
              <span>{chf(calc.pk)}/Jahr</span>
            </div>
            <div className="flex justify-between border-t border-border pt-1 font-semibold">
              <span>Total Rente</span>
              <span className="text-primary">{chf(totalRente)}/Jahr</span>
            </div>
          </div>
        </div>

        {/* Hypothekarkosten */}
        <div className="p-4">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
            Hypothekarkosten (Kalkulationszins {calc.zinsSatz}%)
          </p>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-text-secondary">
                Zinskosten ({chf(calc.hypothek)} × {calc.zinsSatz}%)
              </span>
              <span>{chf(zinsKosten)}/Jahr</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Amortisation</span>
              <span>{chf(calc.amortisation)}/Jahr</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Nebenkosten</span>
              <span>{chf(calc.nebenkosten)}/Jahr</span>
            </div>
            <div className="flex justify-between border-t border-border pt-1 font-semibold">
              <span>Total Kosten</span>
              <span>{chf(totalKosten)}/Jahr</span>
            </div>
          </div>
        </div>

        {/* Ergebnis */}
        <div className={cn("p-4", ueberschreitung ? "bg-red-50" : "bg-green-50")}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-text-secondary">
                Tragbarkeit ({chf(totalKosten)} / {chf(totalRente)})
              </p>
              <p className="text-xs text-text-secondary">
                Limite: {calc.limite}%
              </p>
            </div>
            <div className="text-right">
              <p
                className={cn(
                  "text-2xl font-bold",
                  ueberschreitung ? "text-red-700" : "text-green-700"
                )}
              >
                {tragbarkeit.toFixed(1)}%
              </p>
              {ueberschreitung && (
                <div className="flex items-center gap-1 justify-end">
                  <XCircle size={12} className="text-red-600" />
                  <p className="text-xs font-semibold text-red-700">Nicht tragbar</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
