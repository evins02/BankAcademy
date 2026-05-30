"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const STEPS = [
  {
    icon: "📖",
    title: "Lies die Situation sorgfältig",
    description:
      "Jeder Fall beginnt mit einem Kundengespräch oder einer Situation aus dem Bankalltag. Alle relevanten Details stehen im Text – lies genau!",
  },
  {
    icon: "🎯",
    title: "Wähle die beste Antwort",
    description:
      "Wähle aus den Antwortmöglichkeiten (A–D) die beste aus. Es gibt immer genau eine richtige Antwort. Dein Instinkt als Bankfachmann zählt.",
  },
  {
    icon: "✅",
    title: "Bestätige und erhalte Feedback",
    description:
      "Klicke auf «Antwort prüfen» um deine Wahl zu bestätigen. Du erhältst sofort Feedback mit einer Erklärung zur richtigen Antwort.",
  },
];

export function FirstTimeTutorial() {
  const [show, setShow] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined" && !localStorage.getItem("tutorial-seen")) {
      setShow(true);
    }
  }, []);

  function dismiss() {
    if (typeof window !== "undefined") {
      localStorage.setItem("tutorial-seen", "true");
    }
    setShow(false);
  }

  if (!show) return null;

  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
        {/* Step dots */}
        <div className="mb-6 flex items-center justify-center gap-2">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === step
                  ? "w-6 bg-[#0D1B4B]"
                  : i < step
                    ? "w-2 bg-[#00C9B1]"
                    : "w-2 bg-gray-200"
              }`}
            />
          ))}
        </div>

        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-light text-4xl">
            {current.icon}
          </div>
          <h3 className="text-lg font-bold text-text-primary">{current.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-text-secondary">
            {current.description}
          </p>
        </div>

        <p className="mt-4 text-center text-xs text-text-secondary">
          Schritt {step + 1} von {STEPS.length}
        </p>

        <div className="mt-5 flex gap-2">
          {step > 0 && (
            <Button variant="secondary" onClick={() => setStep((s) => s - 1)} className="flex-1">
              Zurück
            </Button>
          )}
          <Button onClick={() => (isLast ? dismiss() : setStep((s) => s + 1))} className="flex-1">
            {isLast ? "Verstanden! 👍" : "Weiter"}
          </Button>
        </div>

        {!isLast && (
          <button
            onClick={dismiss}
            className="mt-3 w-full text-center text-xs text-text-secondary transition-colors hover:text-text-primary"
          >
            Tutorial überspringen
          </button>
        )}
      </div>
    </div>
  );
}
