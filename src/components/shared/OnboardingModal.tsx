"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const ROLE_OPTIONS = [
  "Kundenberater/in",
  "Kreditanalyst/in",
  "Compliance Officer",
  "Back Office",
  "Trainee",
  "Andere",
];

const FIRST_TASK = {
  label: "Fonds – Level 1",
  module: "Privatkunde · Fonds",
  emoji: "📈",
  href: "/privatkunde/basis/fonds",
  time: "ca. 5 Min",
  xp: "+150 XP",
};

interface OnboardingModalProps {
  onComplete: (name: string, role: string) => void;
}

export function OnboardingModal({ onComplete }: OnboardingModalProps) {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  function handleStep1() {
    if (!name.trim()) return;
    setStep(2);
  }

  function handleStart() {
    onComplete(name.trim(), role);
    router.push(FIRST_TASK.href);
  }

  function handleSkip() {
    onComplete(name.trim() || "Lernender", role);
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.5)" }}
    >
      <div className="w-full max-w-md animate-scale-in rounded-2xl border border-border bg-surface shadow-2xl">
        {/* Step indicator */}
        <div className="flex items-center gap-2 border-b border-border px-6 py-4">
          <div className={`h-2 flex-1 rounded-full ${step >= 1 ? "bg-primary" : "bg-gray-200"}`} />
          <div className={`h-2 flex-1 rounded-full ${step >= 2 ? "bg-primary" : "bg-gray-200"}`} />
        </div>

        <div className="p-6">
          {step === 1 && (
            <>
              <div className="mb-5 text-center">
                <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-light">
                  <User size={24} className="text-primary" />
                </div>
                <h2 className="text-xl font-bold text-text-primary">Willkommen bei BankAcademy!</h2>
                <p className="mt-1 text-sm text-text-secondary">
                  Erstelle dein Profil, um loszulegen.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-text-secondary uppercase tracking-wider">
                    Dein Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Vorname Nachname"
                    className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary"
                    onKeyDown={(e) => e.key === "Enter" && handleStep1()}
                    autoFocus
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-text-secondary uppercase tracking-wider">
                    Deine Rolle (optional)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {ROLE_OPTIONS.map((r) => (
                      <button
                        key={r}
                        onClick={() => setRole(r)}
                        className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                          role === r
                            ? "border-primary bg-primary-light text-primary"
                            : "border-border text-text-secondary hover:border-primary/50"
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <Button onClick={handleStep1} disabled={!name.trim()} className="w-full gap-2">
                  Weiter
                  <ArrowRight size={15} />
                </Button>
                <button
                  onClick={handleSkip}
                  className="w-full text-center text-xs text-text-secondary hover:text-text-primary"
                >
                  Überspringen
                </button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="mb-5 text-center">
                <h2 className="text-xl font-bold text-text-primary">Deine erste Aufgabe</h2>
                <p className="mt-1 text-sm text-text-secondary">
                  Wir empfehlen dir dieses Einstiegsszenario.
                </p>
              </div>

              <div className="mb-5 rounded-xl border border-primary/30 bg-primary-light p-4">
                <div className="flex items-start gap-3">
                  <span className="text-3xl">{FIRST_TASK.emoji}</span>
                  <div className="flex-1">
                    <p className="font-semibold text-text-primary">{FIRST_TASK.label}</p>
                    <p className="text-xs text-text-secondary">{FIRST_TASK.module}</p>
                    <div className="mt-2 flex items-center gap-3 text-xs">
                      <span className="text-text-secondary">⏱ {FIRST_TASK.time}</span>
                      <span className="font-semibold text-primary">{FIRST_TASK.xp}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Button onClick={handleStart} className="w-full gap-2">
                  Los geht&apos;s!
                  <ArrowRight size={15} />
                </Button>
                <button
                  onClick={handleSkip}
                  className="w-full text-center text-xs text-text-secondary hover:text-text-primary"
                >
                  Zuerst das Dashboard ansehen
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
