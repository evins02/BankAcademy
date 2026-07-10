"use client";

import { Lightbulb, Building2, ShieldCheck, LayoutGrid } from "lucide-react";
import { PRAXIS_DATA } from "@/lib/praxisData";

const SOURCE_ICONS: Record<string, React.ReactNode> = {
  "Front Office Erfahrung": <LayoutGrid size={11} />,
  "Credit Office Erfahrung": <Building2 size={11} />,
  "Compliance Abteilung": <ShieldCheck size={11} />,
  "Bankbetrieb": <Building2 size={11} />,
  "Kreditgeschäft": <Building2 size={11} />,
};

const SOURCE_COLORS: Record<string, string> = {
  "Front Office Erfahrung": "bg-cyan-100 text-cyan-700",
  "Credit Office Erfahrung": "bg-violet-100 text-violet-700",
  "Compliance Abteilung": "bg-amber-100 text-amber-700",
  "Bankbetrieb": "bg-blue-100 text-blue-700",
  "Kreditgeschäft": "bg-indigo-100 text-indigo-700",
};

interface PraxisTippsProps {
  configId: string;
}

export function PraxisTipps({ configId }: PraxisTippsProps) {
  const data = PRAXIS_DATA[configId];
  if (!data) return null;

  return (
    <div className="rounded-2xl border border-cyan-200 bg-cyan-50 overflow-hidden">
      <div className="flex items-center gap-2.5 px-5 py-4 border-b border-cyan-200 bg-gradient-to-r from-cyan-100 to-blue-50">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-cyan-600 text-white">
          <Lightbulb size={15} />
        </div>
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-cyan-700">
            Vom Ausbildner
          </p>
          <p className="text-sm font-bold text-cyan-900">Praxistipps</p>
        </div>
      </div>

      <div className="divide-y divide-cyan-100">
        {data.tips.map((tip, i) => {
          const sourceColor = SOURCE_COLORS[tip.source] ?? "bg-gray-100 text-gray-600";
          const sourceIcon = SOURCE_ICONS[tip.source];
          return (
            <div key={i} className="px-5 py-4">
              <div className="flex items-start gap-3">
                <span className="mt-1 shrink-0 text-cyan-500">
                  <Lightbulb size={13} />
                </span>
                <div className="flex-1">
                  <p className="text-sm leading-relaxed text-cyan-900">{tip.text}</p>
                  <span
                    className={`mt-2 inline-flex items-center gap-1 rounded-pill px-2 py-0.5 text-[10px] font-semibold ${sourceColor}`}
                  >
                    {sourceIcon}
                    {tip.source}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
