"use client";

import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const SAEULEN = [
  {
    num: "1",
    color: { bg: "bg-blue-50", border: "border-blue-200", badge: "bg-blue-600", dot: "bg-blue-500" },
    title: "1. Säule – Staatlich",
    subtitle: "AHV / IV / EL",
    details: [
      "Obligatorisch für alle Erwerbstätigen",
      "Finanzierung: 50% Arbeitnehmer / 50% Arbeitgeber",
      "Max. AHV-Rente Skala 44: CHF 29'400/Jahr",
    ],
  },
  {
    num: "2",
    color: { bg: "bg-green-50", border: "border-green-200", badge: "bg-green-600", dot: "bg-green-500" },
    title: "2. Säule – Beruflich",
    subtitle: "BVG / Pensionskasse",
    details: [
      "Obligatorisch ab CHF 22'050 Jahreseinkommen",
      "Arbeitgeber zahlt mindestens 50%",
      "Freizügigkeit bei Stellenwechsel (Freizügigkeitskonto)",
    ],
  },
  {
    num: "3",
    color: { bg: "bg-purple-50", border: "border-purple-200", badge: "bg-purple-600", dot: "bg-purple-500" },
    title: "3. Säule – Privat (freiwillig)",
    subtitle: "3a gebunden / 3b frei",
    details: [
      "3a: Gebunden, steuerlich abzugsfähig, max. CHF 7'258",
      "3b: Frei, keine Steuervergünstigung, keine Limite",
      "Empfehlung: Zuerst 3a maximal ausschöpfen",
    ],
  },
];

interface LernblockCardsProps {
  onContinue: () => void;
}

export function LernblockCards({ onContinue }: LernblockCardsProps) {
  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <div className="rounded-DEFAULT bg-surface p-5 shadow-card">
        <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
          Lernblock
        </p>
        <h2 className="mb-1 text-lg font-bold text-text-primary">
          Vorsorge – Die 3 Säulen der Schweiz
        </h2>
        <p className="text-sm text-text-secondary">
          Als Front-Office-Berater erklärst du das Schweizer Vorsorgesystem und empfiehlst die passenden Produkte.
        </p>
      </div>

      {/* 3 Säulen */}
      <div className="space-y-3">
        {SAEULEN.map((s) => (
          <div
            key={s.num}
            className={`rounded-DEFAULT border p-4 ${s.color.bg} ${s.color.border}`}
          >
            <div className="mb-2 flex items-center gap-3">
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${s.color.badge}`}
              >
                {s.num}
              </span>
              <div>
                <p className="font-semibold text-text-primary">{s.title}</p>
                <p className="text-xs text-text-secondary">{s.subtitle}</p>
              </div>
            </div>
            <ul className="space-y-1 pl-10">
              {s.details.map((d) => (
                <li key={d} className="flex items-start gap-1.5 text-xs text-text-primary">
                  <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${s.color.dot}`} />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Wichtige Zahlen 2026 */}
      <div className="rounded-DEFAULT border border-amber-200 bg-amber-50 p-4">
        <p className="mb-3 text-xs font-bold uppercase tracking-wider text-amber-800">
          Wichtige Zahlen 2026
        </p>
        <div className="space-y-1.5">
          {[
            { label: "3a Maximum Angestellte", value: "CHF 7'258" },
            { label: "3a Maximum Selbständige (ohne PK)", value: "CHF 36'288" },
            { label: "AHV Maximum Skala 44", value: "CHF 29'400/Jahr" },
            { label: "BVG Eintrittsschwelle", value: "CHF 22'050/Jahr" },
            { label: "NEU 2026: Nachzahlung möglich", value: "für Lücken ab 2025" },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between text-xs">
              <span className="text-amber-900">{label}</span>
              <span className="font-semibold text-amber-900">{value}</span>
            </div>
          ))}
        </div>
      </div>

      <Button onClick={onContinue} className="w-full">
        Zum ersten Fall
        <ChevronRight size={14} />
      </Button>
    </div>
  );
}
