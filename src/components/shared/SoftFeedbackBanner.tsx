"use client";

import { AlertCircle } from "lucide-react";

interface SoftFeedbackBannerProps {
  message: string;
}

export function SoftFeedbackBanner({ message }: SoftFeedbackBannerProps) {
  return (
    <div className="mb-4 flex items-start gap-3 rounded-DEFAULT border border-amber-300 bg-amber-50 px-4 py-3">
      <AlertCircle size={16} className="mt-0.5 shrink-0 text-amber-600" />
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-amber-700">
          Noch nicht ganz richtig — Versuch 2 von 2
        </p>
        <p className="mt-0.5 text-sm text-amber-800">{message}</p>
      </div>
    </div>
  );
}
