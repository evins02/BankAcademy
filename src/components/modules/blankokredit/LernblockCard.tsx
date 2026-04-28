"use client";

import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MERKSATZ, BK_LEVELS, type LevelNum } from "@/lib/blankokredit";

interface LernblockCardProps {
  level: LevelNum;
  onContinue: () => void;
}

const STEPS = [
  {
    num: 1,
    title: "Einkommen",
    detail: "Nettolohn + Partneranteil (proportional)",
  },
  {
    num: 2,
    title: "Existenzminimum",
    detail: "Grundbetrag + Miete + KK + Fahrtkosten + Steuern + Unterhalt",
  },
  {
    num: 3,
    title: "Freibetrag",
    detail: "Einkommen − Existenzminimum = pfändbarer Teil",
  },
  {
    num: 4,
    title: "Kreditfähigkeit",
    detail: "Total Kredite ÷ 36 ≤ Freibetrag?",
  },
];

export function LernblockCard({ level, onContinue }: LernblockCardProps) {
  const levelConfig = BK_LEVELS.find((l) => l.level === level)!;

  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-DEFAULT bg-surface p-6 shadow-card">
        <div className="mb-5 flex items-center gap-2">
          <Badge variant={levelConfig.badgeVariant}>
            Level {level} – {levelConfig.label}
          </Badge>
        </div>

        <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
          Lernblock
        </p>
        <h2 className="mb-5 text-lg font-bold text-text-primary">
          Blankokredit – Kreditfähigkeitsprüfung
        </h2>

        <div className="mb-5 overflow-hidden rounded-DEFAULT border border-border">
          {STEPS.map((step, i) => (
            <div
              key={step.num}
              className={`flex items-start gap-4 p-4 ${i < STEPS.length - 1 ? "border-b border-border" : ""}`}
            >
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                {step.num}
              </div>
              <div>
                <p className="text-sm font-semibold text-text-primary">{step.title}</p>
                <p className="mt-0.5 text-xs text-text-secondary">{step.detail}</p>
              </div>
              {step.num === 3 && (
                <div className="ml-auto self-center rounded-DEFAULT bg-background px-2 py-0.5 font-mono text-xs text-text-secondary">
                  = Freibetrag
                </div>
              )}
              {step.num === 4 && (
                <div className="ml-auto self-center rounded-DEFAULT bg-background px-2 py-0.5 font-mono text-xs text-text-secondary">
                  ÷ 36
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mb-6 flex items-start gap-3 rounded-DEFAULT border border-primary/30 bg-primary-light p-4">
          <div className="mt-0.5 text-base">💡</div>
          <div>
            <p className="mb-0.5 text-[11px] font-semibold uppercase tracking-wider text-primary">
              Merksatz
            </p>
            <p className="text-sm leading-relaxed text-text-primary">{MERKSATZ}</p>
          </div>
        </div>

        <div className="mb-6 rounded-DEFAULT border border-amber-200 bg-amber-50 p-3">
          <p className="text-sm font-semibold text-amber-800">
            Amortisation innert 3 Jahren – auch wenn der Vertrag länger läuft!
          </p>
        </div>

        <Button onClick={onContinue} className="w-full">
          Zum ersten Fall
          <ChevronRight size={14} />
        </Button>
      </div>
    </div>
  );
}
