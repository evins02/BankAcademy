"use client";

import { Brain } from "lucide-react";
import { PRAXIS_DATA } from "@/lib/praxisData";

interface BankerDenkweiseProps {
  configId: string;
}

export function BankerDenkweise({ configId }: BankerDenkweiseProps) {
  const data = PRAXIS_DATA[configId];
  if (!data) return null;

  const paragraphs = data.denkweise.text.split("\n\n").filter(Boolean);

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0D1B4B 0%, #1a2d6b 100%)" }}
    >
      <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 text-white">
          <Brain size={18} />
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-white/50">
            Mindset
          </p>
          <p className="text-sm font-bold text-white">{data.denkweise.title}</p>
        </div>
      </div>

      <div className="px-6 py-5 space-y-3">
        {paragraphs.map((para, i) => (
          <p key={i} className="text-sm leading-relaxed text-white/80 whitespace-pre-line">
            {para}
          </p>
        ))}
      </div>
    </div>
  );
}
