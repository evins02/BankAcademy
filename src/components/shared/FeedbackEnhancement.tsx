"use client";

import { Lightbulb, Building2, BookOpen } from "lucide-react";
import { useGlossar } from "@/context/GlossarContext";

interface FeedbackEnhancementProps {
  warum?: string;
  inDerPraxis?: string;
  merksatz?: string;
  glossarTerm?: string;
}

export function FeedbackEnhancement({
  warum,
  inDerPraxis,
  merksatz,
  glossarTerm,
}: FeedbackEnhancementProps) {
  const { open: openGlossar } = useGlossar();

  if (!warum && !inDerPraxis && !merksatz) return null;

  return (
    <div className="mt-4 space-y-3">
      {warum && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
          <div className="mb-1.5 flex items-center gap-1.5">
            <Lightbulb size={13} className="text-amber-600" />
            <p className="text-[11px] font-bold uppercase tracking-wider text-amber-700">
              Warum?
            </p>
          </div>
          <p className="text-sm leading-relaxed text-amber-900">{warum}</p>
        </div>
      )}

      {inDerPraxis && (
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
          <div className="mb-1.5 flex items-center gap-1.5">
            <Building2 size={13} className="text-blue-600" />
            <p className="text-[11px] font-bold uppercase tracking-wider text-blue-700">
              In der Praxis
            </p>
          </div>
          <p className="text-sm leading-relaxed text-blue-900">{inDerPraxis}</p>
        </div>
      )}

      {merksatz && (
        <div className="flex items-start gap-2 rounded-xl border border-primary/20 bg-primary-light px-4 py-3">
          <span className="mt-0.5 shrink-0 text-base">💡</span>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-primary mb-0.5">
              Merksatz
            </p>
            <p className="text-sm font-medium leading-snug text-text-primary">{merksatz}</p>
          </div>
        </div>
      )}

      {glossarTerm && (
        <button
          onClick={openGlossar}
          className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-medium text-text-secondary transition-colors hover:border-primary/40 hover:text-primary"
        >
          <BookOpen size={13} />
          <span>📖 {glossarTerm} im Glossar nachschlagen</span>
        </button>
      )}
    </div>
  );
}
