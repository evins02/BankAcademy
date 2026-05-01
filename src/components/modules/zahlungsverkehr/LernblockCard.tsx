"use client";

import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ZV_LEVELS, ZV_LERNBLOCK_STEPS, type LevelNum } from "@/lib/zahlungsverkehr";

interface LernblockCardProps {
  level: LevelNum;
  onContinue: () => void;
}

export function LernblockCard({ level, onContinue }: LernblockCardProps) {
  const levelConfig = ZV_LEVELS.find((l) => l.level === level)!;

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
          Zahlungsverkehr Back Office
        </h2>

        <p className="mb-4 text-sm text-text-secondary">
          Als Back Office Mitarbeiter prüfst du:
        </p>

        <div className="mb-6 overflow-hidden rounded-DEFAULT border border-border">
          {ZV_LERNBLOCK_STEPS.map((step, i) => (
            <div
              key={step.num}
              className={`flex items-start gap-4 p-4 ${i < ZV_LERNBLOCK_STEPS.length - 1 ? "border-b border-border" : ""}`}
            >
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                {step.num}
              </div>
              <div>
                <p className="text-sm font-semibold text-text-primary">{step.title}</p>
                <p className="mt-0.5 text-xs text-text-secondary">{step.detail}</p>
              </div>
            </div>
          ))}
        </div>

        <Button onClick={onContinue} className="w-full">
          Zum ersten Fall
          <ChevronRight size={14} />
        </Button>
      </div>
    </div>
  );
}
