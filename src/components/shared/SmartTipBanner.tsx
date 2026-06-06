"use client";

import { X, BookOpen } from "lucide-react";

interface SmartTipBannerProps {
  topic: string;
  onDismiss: () => void;
  onOpenGlossar: () => void;
}

export function SmartTipBanner({ topic, onDismiss, onOpenGlossar }: SmartTipBannerProps) {
  return (
    <div className="mx-auto mb-4 max-w-2xl animate-fade-in">
      <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
        <span className="mt-0.5 shrink-0 text-xl">💡</span>
        <div className="flex-1">
          <p className="text-sm font-semibold text-amber-900">
            Tipp: Schau dir das Glossar zum Thema {topic} an
          </p>
          <p className="mt-0.5 text-xs text-amber-700">
            Mehrere Antworten waren nicht korrekt – eine kurze Wiederholung hilft!
          </p>
          <button
            onClick={onOpenGlossar}
            className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-amber-800 hover:underline"
          >
            <BookOpen size={12} />
            Glossar öffnen
          </button>
        </div>
        <button
          onClick={onDismiss}
          className="shrink-0 rounded p-1 text-amber-600 hover:bg-amber-100"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
