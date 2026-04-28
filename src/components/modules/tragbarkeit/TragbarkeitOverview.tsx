"use client";

import Link from "next/link";
import { ChevronRight, Building2, BarChart3, AlertTriangle, Warehouse } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TRAGBARKEIT_SECTIONS } from "@/lib/tragbarkeit";

const SECTION_META: Record<
  string,
  { icon: React.ReactNode; slug: string; color: string }
> = {
  renditeobjekt: {
    icon: <Building2 size={20} />,
    slug: "renditeobjekt",
    color: "text-blue-600 bg-blue-50",
  },
  gesamtengagement: {
    icon: <BarChart3 size={20} />,
    slug: "gesamtengagement",
    color: "text-primary bg-primary-light",
  },
  etp: {
    icon: <AlertTriangle size={20} />,
    slug: "etp",
    color: "text-amber-600 bg-amber-50",
  },
  gewerbe: {
    icon: <Warehouse size={20} />,
    slug: "gewerbe",
    color: "text-purple-600 bg-purple-50",
  },
};

export function TragbarkeitOverview() {
  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6">
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
            Modul
          </p>
          <h2 className="text-xl font-bold text-text-primary">Firmenkunden Tragbarkeit</h2>
          <p className="mt-1 text-sm text-text-secondary">
            Prüfe Kreditanträge Schritt für Schritt – wie ein echter Credit Analyst.
          </p>
        </div>

        <div className="mb-8 rounded-DEFAULT border border-border bg-background p-4">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
            Zwei-Stufen-Logik
          </p>
          <div className="flex items-center gap-3">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
              1
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-text-primary">Objektebene prüfen</p>
              <p className="text-xs text-text-secondary">Trägt sich die Liegenschaft selbst?</p>
            </div>
          </div>
          <div className="my-2 ml-3.5 h-5 w-px bg-border" />
          <div className="flex items-center gap-3">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">
              2
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-text-primary">Gesamtengagement prüfen</p>
              <p className="text-xs text-text-secondary">Falls Stufe 1 nicht bestanden</p>
            </div>
          </div>
          <div className="my-2 ml-3.5 h-5 w-px bg-border" />
          <div className="flex items-center gap-3">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-500 text-xs font-bold text-white">
              !
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-text-primary">ETP als Sonderfall</p>
              <p className="text-xs text-text-secondary">Falls Stufe 2 nicht bestanden</p>
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          {TRAGBARKEIT_SECTIONS.map((section, i) => {
            const meta = SECTION_META[section.id];
            return (
              <div
                key={section.id}
                className="flex items-center gap-4 rounded-DEFAULT bg-surface p-5 shadow-card"
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-DEFAULT ${meta.color}`}
                >
                  {meta.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold text-text-secondary">
                      {i + 1}
                    </span>
                    <h3 className="font-semibold text-text-primary">{section.title}</h3>
                  </div>
                  <p className="mt-0.5 text-xs text-text-secondary">{section.description}</p>
                  <p className="mt-1 text-xs text-text-secondary">
                    {section.cases.length} Fälle
                  </p>
                </div>
                <Link href={`/firmenkunde/tragbarkeit/${meta.slug}`}>
                  <Button variant="secondary" className="shrink-0 gap-1">
                    Starten
                    <ChevronRight size={14} />
                  </Button>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
