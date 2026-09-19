"use client";

import { useState } from "react";
import Link from "next/link";

const answers = [
  {
    id: "a",
    label: "Direkt ein passendes Anlageprodukt empfehlen.",
    correct: false,
    feedback: "Zu früh: Bevor ein Produkt beurteilt werden kann, muss die Kundensituation verstanden werden.",
  },
  {
    id: "b",
    label: "Ziele, Anlagehorizont und Risikobereitschaft des Kunden klären.",
    correct: true,
    feedback: "Richtig. Zuerst steht die Kundensituation im Zentrum. Erst danach können passende Lösungen eingeordnet werden.",
  },
  {
    id: "c",
    label: "Zuerst nur nach dem monatlichen Einkommen fragen.",
    correct: false,
    feedback: "Das Einkommen kann relevant sein, reicht allein aber nicht aus, um die Anlageziele und Risikobereitschaft zu verstehen.",
  },
];

export function CustomerConversationQuiz() {
  const [selected, setSelected] = useState<string | null>(null);
  const choice = answers.find((answer) => answer.id === selected);

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/10 sm:p-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <span className="rounded-full bg-[#7B6FE8]/15 px-3 py-1 text-xs font-bold text-[#AFA7FF]">Praxisfall · Anlegen</span>
        <span className="text-xs text-slate-500">ca. 2 Minuten</span>
      </div>
      <h2 className="text-xl font-bold sm:text-2xl">Ein Kunde möchte CHF 50&apos;000 anlegen.</h2>
      <p className="mt-3 leading-7 text-slate-300">
        Das Geld liegt aktuell auf seinem Sparkonto. Er fragt dich, welche Anlage du ihm empfehlen würdest. Was ist der sinnvollste erste Schritt im Gespräch?
      </p>

      <div className="mt-6 grid gap-3">
        {answers.map((answer) => {
          const active = selected === answer.id;
          return (
            <button
              key={answer.id}
              type="button"
              onClick={() => setSelected(answer.id)}
              className={`rounded-2xl border p-4 text-left transition ${
                active
                  ? "border-[#00D4B8] bg-[#00D4B8]/10"
                  : "border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.06]"
              }`}
            >
              <span className="mr-3 font-bold text-[#00D4B8]">{answer.id.toUpperCase()}</span>
              <span className="text-slate-200">{answer.label}</span>
            </button>
          );
        })}
      </div>

      {choice && (
        <div
          className={`mt-6 rounded-2xl border p-5 ${
            choice.correct
              ? "border-[#00D4B8]/30 bg-[#00D4B8]/10"
              : "border-orange-400/30 bg-orange-400/10"
          }`}
          aria-live="polite"
        >
          <p className="font-bold">{choice.correct ? "Stark – das ist der richtige Ansatz." : "Noch nicht ganz."}</p>
          <p className="mt-2 text-sm leading-6 text-slate-300">{choice.feedback}</p>
          {choice.correct && (
            <Link href="/sign-up" className="mt-4 inline-flex font-bold text-[#00D4B8] hover:underline">
              Weitere Praxisfälle trainieren →
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
