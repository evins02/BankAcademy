"use client";

import {
  BookOpen,
  Building2,
  CheckCircle2,
  CreditCard,
  FileText,
  Home,
  MessageSquare,
  Shield,
  TrendingUp,
  Umbrella,
  type LucideIcon,
} from "lucide-react";
import { BANK_THEMEN, BT_TOTAL_SCENARIOS, type BankThema } from "@/lib/bankThemen";
import { MODULES_WITH_HK } from "@/lib/hkModuleMapping";

const ICON_MAP: Record<string, LucideIcon> = {
  CreditCard,
  TrendingUp,
  Shield,
  Building2,
  Home,
  Umbrella,
  FileText,
  MessageSquare,
};

function ThemaCard({ thema }: { thema: BankThema }) {
  const Icon = ICON_MAP[thema.icon] ?? BookOpen;
  const moduleCount = MODULES_WITH_HK.filter(
    (m) => m.bankThemaId === thema.id
  ).length;

  return (
    <div className="rounded-xl border border-border bg-surface p-5 transition-shadow hover:shadow-card">
      <div className="mb-3 flex items-start gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
          style={{ background: `${thema.color}18`, border: `1px solid ${thema.color}33` }}
        >
          <Icon size={20} style={{ color: thema.color }} strokeWidth={1.5} />
        </div>
        <div className="min-w-0">
          <h3 className="text-sm font-bold text-text-primary">{thema.titel}</h3>
          <p className="mt-0.5 text-xs text-text-secondary">{moduleCount} Module · {thema.totalScenarios} Szenarien</p>
        </div>
      </div>
      <ul className="space-y-1">
        {thema.subthemen.map((s) => (
          <li key={s} className="flex items-start gap-1.5 text-xs text-text-secondary">
            <CheckCircle2 size={11} className="mt-0.5 shrink-0 text-primary" />
            {s}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function FachthemenPage() {
  const abteilungen = [
    { label: "Privatkunde", bereich: "Privatkunde" },
    { label: "Anlage", bereich: "Anlage" },
    { label: "Firmenkunde", bereich: "Firmenkunde" },
    { label: "Back Office", bereich: "Back Office" },
  ];

  return (
    <div className="mx-auto max-w-4xl space-y-8 p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-text-primary">
          Bankfachliche Themen
        </h1>
        <p className="mt-1 max-w-xl text-sm text-text-secondary">
          Übersicht der Fachthemen und Inhalte die BankAcademy abdeckt — geordnet nach Abteilung.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {[
          { label: "Szenarien total", value: BT_TOTAL_SCENARIOS + "+", color: "text-primary" },
          { label: "Fachthemen", value: String(BANK_THEMEN.length), color: "text-amber-600" },
          { label: "Module", value: String(MODULES_WITH_HK.length), color: "text-violet-600" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-surface p-4 text-center">
            <p className={`text-2xl font-extrabold tabular-nums ${s.color}`}>{s.value}</p>
            <p className="mt-0.5 text-[11px] text-text-secondary">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Fachthemen nach Abteilung */}
      {abteilungen.map(({ label, bereich }) => {
        const module = MODULES_WITH_HK.filter((m) => m.bereich === bereich);
        const themaIds = new Set(module.map((m) => m.bankThemaId).filter(Boolean));
        const themen = BANK_THEMEN.filter((t) => themaIds.has(t.id));
        if (themen.length === 0) return null;

        return (
          <section key={bereich}>
            <h2 className="mb-3 text-base font-bold text-text-primary">{label}</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {themen.map((thema) => (
                <ThemaCard key={thema.id} thema={thema} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
