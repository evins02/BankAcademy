"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { getProgress, type ModuleProgress } from "@/lib/progressData";

// ─── Steps ────────────────────────────────────────────────────────────────────

const STEPS = [
  { id: "kyc-kontoeröffnung", label: "Kontoeröffnung", sub: "Privatkunde Basis", href: "/privatkunde/basis/kontoeröffnung", moduleId: "privatkunde", icon: "🏦" },
  { id: "kyc", label: "KYC / Compliance", sub: "Bankbetrieb", href: "/backoffice/banking-operations/kyc", moduleId: "banking-operations", icon: "🔍" },
  { id: "zahlungsverkehr", label: "Zahlungsverkehr", sub: "Privatkunde Basis", href: "/privatkunde/basis/zahlungsverkehr", moduleId: "privatkunde", icon: "💸" },
  { id: "sparen-konto", label: "Sparen & Konto", sub: "Privatkunde Basis", href: "/privatkunde/basis/sparen-konto", moduleId: "privatkunde", icon: "💰" },
  { id: "vorsorge", label: "3a / Vorsorge", sub: "Privatkunde Basis", href: "/privatkunde/basis/vorsorge", moduleId: "privatkunde", icon: "🏖️" },
  { id: "blankokredit", label: "Blankokredit", sub: "Privatkunde Individual", href: "/privatkunde/individual/blankokredit", moduleId: "privatkunde", icon: "📋" },
  { id: "hypotheken", label: "Hypotheken", sub: "Privatkunde Individual", href: "/privatkunde/individual/hypotheken", moduleId: "privatkunde", icon: "🏠" },
  { id: "firmenkunde", label: "Firmenkunde", sub: "Front Office", href: "/firmenkunde", moduleId: "firmenkunde", icon: "🏢" },
  { id: "anlagekunde", label: "Anlagekunde", sub: "Front Office", href: "/anlagekunde", moduleId: "anlagekunde", icon: "📈" },
  { id: "banking-ops", label: "Bankbetrieb", sub: "Back Office", href: "/backoffice", moduleId: "banking-operations", icon: "⚙️" },
  { id: "credit-ops", label: "Kreditgeschäft", sub: "Back Office", href: "/backoffice/credit-operations", moduleId: "credit-operations", icon: "💳" },
];

// ─── Types ────────────────────────────────────────────────────────────────────

type StepStatus = "done" | "active" | "locked";

interface Step {
  id: string;
  label: string;
  sub: string;
  href: string;
  moduleId: string;
  icon: string;
}

// ─── Status logic ─────────────────────────────────────────────────────────────

function getStepStatus(
  step: Step,
  progress: Record<string, ModuleProgress>,
  index: number,
  steps: Step[]
): StepStatus {
  const p = progress[step.moduleId];
  if (p && p.completed > 0) return "done";
  const prevStep = steps[index - 1];
  if (!prevStep) return "active"; // first step is always active if not done
  const prevP = progress[prevStep.moduleId];
  if (prevP && prevP.completed > 0) return "active";
  return "locked";
}

// ─── Motivational message ─────────────────────────────────────────────────────

function getMotivation(doneCount: number): string {
  if (doneCount === 0) return "Starte deine Lernreise! 🚀";
  if (doneCount <= 3) return "Guter Start! Mach weiter so 💪";
  if (doneCount <= 7) return "Grossartig – du bist auf halbem Weg! 🎯";
  if (doneCount <= 10) return "Fast am Ziel! Noch ein paar Schritte 🏁";
  return "Du hast den gesamten Lernpfad abgeschlossen! 🏆 Herzlichen Glückwunsch!";
}

// ─── Step circle ──────────────────────────────────────────────────────────────

function StepCircle({ status, index }: { status: StepStatus; index: number }) {
  const number = index + 1;

  if (status === "done") {
    return (
      <div
        className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white text-sm font-bold shadow-md"
        style={{ background: "#0D1B4B" }}
      >
        ✓
      </div>
    );
  }

  if (status === "active") {
    return (
      <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center">
        {/* Pulsing ring */}
        <span
          className="absolute inset-0 rounded-full animate-ping opacity-40"
          style={{ background: "#00C9B1" }}
        />
        <div
          className="relative flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold shadow-md"
          style={{ background: "white", border: "2.5px solid #00C9B1", color: "#0D1B4B" }}
        >
          {number}
        </div>
      </div>
    );
  }

  // locked
  return (
    <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-gray-300 bg-gray-100 text-sm font-bold text-gray-400">
      {number}
    </div>
  );
}

// ─── Connector line ───────────────────────────────────────────────────────────

function Connector({ status }: { status: StepStatus }) {
  const color =
    status === "done"
      ? "#0D1B4B"
      : status === "active"
      ? "#00C9B1"
      : "#D1D5DB"; // gray-300

  return (
    <div className="flex w-10 shrink-0 justify-center">
      <div
        className="w-0.5 rounded-full"
        style={{ height: 48, background: color }}
      />
    </div>
  );
}

// ─── Step card ────────────────────────────────────────────────────────────────

function StepCard({ step, status }: { step: Step; status: StepStatus }) {
  const cardClass =
    status === "done"
      ? "border border-primary/20 bg-primary-light"
      : status === "active"
      ? "border border-accent/40 bg-surface shadow-md"
      : "border border-border bg-gray-50 opacity-60";

  const chip =
    status === "done" ? (
      <span className="rounded-full px-2.5 py-0.5 text-xs font-semibold text-white" style={{ background: "#0D1B4B" }}>
        Fertig ✅
      </span>
    ) : status === "active" ? (
      <span className="rounded-full px-2.5 py-0.5 text-xs font-semibold text-white" style={{ background: "#00C9B1" }}>
        Aktiv
      </span>
    ) : (
      <span className="rounded-full bg-gray-200 px-2.5 py-0.5 text-xs font-semibold text-gray-500">
        Gesperrt 🔒
      </span>
    );

  const cta =
    status === "done" ? (
      <span className="text-xs font-semibold" style={{ color: "#0D1B4B" }}>
        Fertig ✅
      </span>
    ) : status === "active" ? (
      <span className="text-xs font-semibold" style={{ color: "#00C9B1" }}>
        Jetzt starten →
      </span>
    ) : (
      <span className="text-xs text-gray-400">Gesperrt 🔒</span>
    );

  const inner = (
    <div className={`flex items-center gap-3 rounded-2xl p-4 transition-all ${cardClass}`}>
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xl" style={{ background: "#E8EBF7" }}>
        {step.icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-base font-bold text-text-primary leading-tight">{step.label}</p>
        <p className="text-xs text-text-secondary mt-0.5">{step.sub}</p>
        <div className="mt-2 flex items-center gap-2">
          {chip}
        </div>
      </div>
      <div className="shrink-0">{cta}</div>
    </div>
  );

  if (status === "locked") {
    return <div className="flex-1 min-w-0">{inner}</div>;
  }

  return (
    <Link href={step.href} className="flex-1 min-w-0 block">
      <div className={`flex items-center gap-3 rounded-2xl p-4 transition-all hover:shadow-lg hover:scale-[1.01] ${cardClass}`}>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xl" style={{ background: "#E8EBF7" }}>
          {step.icon}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-base font-bold text-text-primary leading-tight">{step.label}</p>
          <p className="text-xs text-text-secondary mt-0.5">{step.sub}</p>
          <div className="mt-2 flex items-center gap-2">
            {chip}
          </div>
        </div>
        <div className="shrink-0">{cta}</div>
      </div>
    </Link>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LernpfadPage() {
  const [progress, setProgress] = useState<Record<string, ModuleProgress>>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setProgress(getProgress());
    setLoaded(true);
  }, []);

  const statuses: StepStatus[] = STEPS.map((step, index) =>
    loaded ? getStepStatus(step, progress, index, STEPS) : "locked"
  );

  const doneCount = statuses.filter((s) => s === "done").length;
  const progressPercent = Math.round((doneCount / STEPS.length) * 100);
  const currentStep = doneCount + 1;

  return (
    <>
      <Header title="Lernpfad" subtitle="Deine Lernreise im Überblick" />
      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        <div className="mx-auto max-w-2xl">

          {/* Progress summary */}
          <div
            className="mb-8 overflow-hidden rounded-2xl p-5 text-white"
            style={{ background: "linear-gradient(135deg, #0D1B4B 0%, #00C9B1 100%)" }}
          >
            <div className="flex items-center justify-between mb-1">
              <p className="text-sm font-medium text-white/80">Dein Fortschritt</p>
              <p className="text-sm font-bold text-white">{progressPercent}%</p>
            </div>
            <p className="text-lg font-bold mb-3">
              Du bist auf Schritt {loaded ? Math.min(currentStep, STEPS.length) : "–"} von 11
            </p>
            {/* Progress bar */}
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/20">
              <div
                className="h-full rounded-full bg-white transition-all duration-700"
                style={{ width: `${loaded ? progressPercent : 0}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-white/70">
              {doneCount} von {STEPS.length} Schritten abgeschlossen
            </p>
          </div>

          {/* Roadmap */}
          <div className="relative">
            {STEPS.map((step, index) => {
              const status = statuses[index];
              const isLast = index === STEPS.length - 1;

              return (
                <div key={step.id}>
                  {/* Step row */}
                  <div className="flex items-center gap-4">
                    <StepCircle status={status} index={index} />
                    <StepCard step={step} status={status} />
                  </div>

                  {/* Connector line (not after last step) */}
                  {!isLast && (
                    <div className="flex gap-4 items-stretch">
                      <Connector status={status} />
                      {/* Spacer to align with card */}
                      <div className="flex-1" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Motivational message */}
          {loaded && (
            <div
              className="mt-8 rounded-2xl p-5 text-center"
              style={{ background: "#E8EBF7" }}
            >
              <p className="text-base font-semibold text-text-primary">{getMotivation(doneCount)}</p>
              {doneCount < STEPS.length && (
                <p className="mt-1 text-xs text-text-secondary">
                  Noch {STEPS.length - doneCount} Schritt{STEPS.length - doneCount !== 1 ? "e" : ""} bis zum Abschluss
                </p>
              )}
            </div>
          )}

          {/* Bottom spacer */}
          <div className="h-8" />
        </div>
      </div>
    </>
  );
}
