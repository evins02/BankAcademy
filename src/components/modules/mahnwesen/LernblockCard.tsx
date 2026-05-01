"use client";

import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MW_LEVELS, MAHNPROZESS_STUFEN, type LevelNum } from "@/lib/mahnwesen";

interface LernblockCardProps {
  level: LevelNum;
  onContinue: () => void;
}

export function LernblockCard({ level, onContinue }: LernblockCardProps) {
  const levelConfig = MW_LEVELS.find((l) => l.level === level)!;

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
          Mahnprozess – Übersicht
        </h2>

        <div className="mb-6 overflow-hidden rounded-DEFAULT border border-border">
          {MAHNPROZESS_STUFEN.map((stufe, i) => (
            <div
              key={stufe.stufe}
              className={`flex items-start gap-4 p-4 ${i < MAHNPROZESS_STUFEN.length - 1 ? "border-b border-border" : ""}`}
            >
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                {stufe.stufe}
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-text-primary">{stufe.title}</p>
                <p className="mt-0.5 text-xs font-medium text-text-secondary">{stufe.days}</p>
                <p className="mt-0.5 text-xs text-text-secondary">{stufe.detail}</p>
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
