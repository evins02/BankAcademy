"use client";

import { ChevronRight, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AL_LEVELS, type LevelNum } from "@/lib/anlagekunde";

interface LernblockCardProps {
  level: LevelNum;
  onContinue: () => void;
}

const RISK_CLASSES = [
  { color: "bg-primary", label: "Sehr klein", desc: "Kapitalerhalt" },
  { color: "bg-green-400", label: "Klein", desc: "Konservativ" },
  { color: "bg-amber-400", label: "Mittel", desc: "Ausgewogen" },
  { color: "bg-orange-500", label: "Erhöht", desc: "Wachstum" },
  { color: "bg-red-500", label: "Hoch", desc: "Aggressiv" },
];

const DIMENSIONS = [
  {
    num: 1,
    title: "Anlageziele",
    detail: "Was will der Kunde erreichen? Kapitalerhalt / Wachstum / Einkommen",
  },
  {
    num: 2,
    title: "Risikofähigkeit",
    badge: "objektiv",
    detail: "Finanzieller Spielraum, Anlagehorizont, Liquiditätsbedarf",
  },
  {
    num: 3,
    title: "Risikobereitschaft",
    badge: "subjektiv",
    detail: "Wie viel Verlust kann der Kunde emotional und psychologisch tragen?",
  },
];

export function LernblockCard({ level, onContinue }: LernblockCardProps) {
  const levelConfig = AL_LEVELS.find((l) => l.level === level)!;

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
          Anlegerprofil – Grundlagen
        </h2>

        <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
          3 Dimensionen des Anlegerprofils
        </p>
        <div className="mb-5 overflow-hidden rounded-DEFAULT border border-border">
          {DIMENSIONS.map((dim, i) => (
            <div
              key={dim.num}
              className={`flex items-start gap-4 p-4 ${i < DIMENSIONS.length - 1 ? "border-b border-border" : ""}`}
            >
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                {dim.num}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-text-primary">{dim.title}</p>
                  {dim.badge && (
                    <span className="rounded-pill bg-gray-100 px-1.5 py-0.5 text-[10px] text-text-secondary">
                      {dim.badge}
                    </span>
                  )}
                </div>
                <p className="mt-0.5 text-xs text-text-secondary">{dim.detail}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
          Risikoklassen
        </p>
        <div className="mb-5 flex flex-col gap-1.5">
          {RISK_CLASSES.map((rc) => (
            <div key={rc.label} className="flex items-center gap-3">
              <div className={`h-3 w-3 shrink-0 rounded-full ${rc.color}`} />
              <span className="w-20 text-xs font-medium text-text-primary">{rc.label}</span>
              <span className="text-xs text-text-secondary">{rc.desc}</span>
            </div>
          ))}
        </div>

        <div className="mb-5 flex items-start gap-3 rounded-DEFAULT border border-amber-200 bg-amber-50 p-4">
          <AlertCircle size={16} className="mt-0.5 shrink-0 text-amber-600" />
          <div>
            <p className="mb-0.5 text-[11px] font-semibold uppercase tracking-wider text-amber-700">
              Wichtig – Risikoaufklärung
            </p>
            <p className="text-sm leading-relaxed text-amber-900">
              Broschüre «Besondere Risiken im Effektenhandel» muss dem Kunden abgegeben werden
              und er muss den Erhalt bestätigen. Bei unvollständiger Risikoaufklärung haftet die Bank!
            </p>
          </div>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-3">
          <div className="rounded-DEFAULT border border-border bg-background p-3">
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
              Anlageberatung
            </p>
            <p className="text-xs text-text-primary">Bank berät – Kunde entscheidet selbst</p>
          </div>
          <div className="rounded-DEFAULT border border-primary/30 bg-primary-light p-3">
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-primary">
              Vermögensverwaltung
            </p>
            <p className="text-xs text-text-primary">Bank handelt im Auftrag des Kunden</p>
          </div>
        </div>

        <Button onClick={onContinue} className="w-full">
          Zum ersten Szenario
          <ChevronRight size={14} />
        </Button>
      </div>
    </div>
  );
}
