"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { SteuervorteilCalc } from "@/lib/vorsorge";

function fmt(n: number) {
  return n.toLocaleString("de-CH", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

interface SteuervorteilPanelProps {
  calc: SteuervorteilCalc;
}

export function SteuervorteilPanel({ calc }: SteuervorteilPanelProps) {
  const [taxRate, setTaxRate] = useState(calc.defaultTaxRate);
  const savings = (calc.einzahlungMax * taxRate) / 100;

  const savingsColor =
    savings >= 2000 ? "text-green-700" : savings >= 1000 ? "text-amber-700" : "text-text-primary";

  return (
    <div className="mb-5 overflow-hidden rounded-DEFAULT border border-border bg-background">
      <div className="border-b border-border bg-gray-50 px-4 py-2">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
          Steuerrechner 3a
        </p>
      </div>

      <div className="p-4 space-y-4">
        {/* Fixed input */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-secondary">Einzahlung 3a (Maximum)</span>
          <span className="font-semibold text-text-primary">
            CHF {calc.einzahlungMax.toLocaleString("de-CH")}
          </span>
        </div>

        {/* Interactive tax rate */}
        <div>
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-text-secondary">Grenzsteuersatz</span>
            <span className="font-semibold text-text-primary">{taxRate}%</span>
          </div>
          <input
            type="range"
            min={10}
            max={45}
            value={taxRate}
            onChange={(e) => setTaxRate(Number(e.target.value))}
            className="h-2 w-full cursor-pointer appearance-none rounded-full bg-gray-200 accent-primary"
          />
          <div className="mt-1 flex justify-between text-[10px] text-text-secondary">
            <span>10%</span>
            <span>45%</span>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border" />

        {/* Result */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-text-secondary">Steuerersparnis</p>
            <p className="text-[10px] text-text-secondary">
              CHF {calc.einzahlungMax.toLocaleString("de-CH")} × {taxRate}%
            </p>
          </div>
          <p className={cn("text-xl font-bold", savingsColor)}>
            CHF {fmt(savings)}
          </p>
        </div>
      </div>
    </div>
  );
}
