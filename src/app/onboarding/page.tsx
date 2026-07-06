"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, Check } from "lucide-react";
import { saveSettings } from "@/lib/settingsData";

// ─── Data ────────────────────────────────────────────────────────────────────

const ABTEILUNG_OPTIONS = [
  { id: "privatkunde", label: "Privatkunde", emoji: "👤", desc: "Beratung von Privatkunden" },
  { id: "firmenkunde", label: "Firmenkunde", emoji: "🏢", desc: "Firmenkundensegment" },
  { id: "anlagekunde", label: "Anlagekunde", emoji: "📈", desc: "Anlageberatung & Depot" },
  { id: "backoffice", label: "Backoffice & ZV", emoji: "⚙️", desc: "Operativer Betrieb" },
  { id: "kreditgeschaeft", label: "Kreditgeschäft", emoji: "💳", desc: "Kreditbearbeitung & Sicherheiten" },
  { id: "credit-office", label: "Credit Office", emoji: "⚖️", desc: "Kreditprüfung & Bewilligung" },
  { id: "keine", label: "Noch nicht zugewiesen", emoji: "🎯", desc: "Noch kein fixer Einsatz" },
];

const LEHRJAHR_OPTIONS = [
  { id: "lj1", label: "1. Lehrjahr", emoji: "🌱", desc: "Grundlagen aufbauen" },
  { id: "lj2", label: "2. Lehrjahr", emoji: "📚", desc: "Wissen vertiefen" },
  { id: "lj3", label: "3. Lehrjahr", emoji: "🎓", desc: "Abschluss vorbereiten" },
  { id: "quereinsteiger", label: "Quereinsteiger / Praktikant", emoji: "🔄", desc: "Neu in der Branche" },
];

const ZIEL_OPTIONS = [
  { id: "neueinstieg", label: "Neueinstieg", emoji: "🏗️", desc: "Grundlagen aufbauen" },
  { id: "auffrischung", label: "Auffrischung", emoji: "🔁", desc: "Wissen festigen" },
  { id: "pruefung", label: "Prüfungsvorbereitung", emoji: "🏆", desc: "Gezielt üben" },
  { id: "challenge", label: "Challenge", emoji: "⚡", desc: "Alles auf höchstem Level" },
];

type Step = "name" | "abteilung" | "lehrjahr" | "ziel" | "done";

const STEP_INDEX: Record<Step, number> = {
  name: 0,
  abteilung: 1,
  lehrjahr: 2,
  ziel: 3,
  done: 4,
};

// ─── Option card ──────────────────────────────────────────────────────────────

function OptionCard({
  option,
  selected,
  onSelect,
  wide,
}: {
  option: { id: string; label: string; emoji: string; desc: string };
  selected: boolean;
  onSelect: () => void;
  wide?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`rounded-xl border-2 p-3 text-left transition-all ${wide ? "col-span-2" : ""} ${
        selected
          ? "border-[#0D1B4B] bg-blue-50"
          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
      }`}
    >
      <span className="text-xl">{option.emoji}</span>
      <p className="mt-1.5 text-xs font-bold text-gray-800 leading-tight">{option.label}</p>
      <p className="text-[10px] text-gray-400 mt-0.5">{option.desc}</p>
    </button>
  );
}

// ─── Progress bar ─────────────────────────────────────────────────────────────

function StepProgress({ current, total }: { current: number; total: number }) {
  return (
    <div className="mb-6">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-semibold text-gray-400">
          Schritt {current} von {total}
        </span>
        <div className="flex gap-1.5">
          {Array.from({ length: total }).map((_, i) => (
            <div
              key={i}
              className="h-1.5 w-6 rounded-full transition-all duration-300"
              style={{ background: i < current ? "#0D1B4B" : "#e5e7eb" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("name");
  const [name, setName] = useState("");
  const [abteilung, setAbteilung] = useState("");
  const [lehrjahr, setLehrjahr] = useState("");
  const [ziel, setZiel] = useState("");
  const [barWidth, setBarWidth] = useState(0);

  // Skip if already completed
  useEffect(() => {
    if (
      localStorage.getItem("user-profile") &&
      localStorage.getItem("onboarding-complete")
    ) {
      router.replace("/dashboard");
    }
  }, [router]);

  // Auto-redirect from done step
  useEffect(() => {
    if (step !== "done") return;
    const bar = setTimeout(() => setBarWidth(100), 60);
    const redirect = setTimeout(() => router.push("/dashboard"), 2600);
    return () => {
      clearTimeout(bar);
      clearTimeout(redirect);
    };
  }, [step, router]);

  function complete(overrideZiel?: string) {
    const finalZiel = overrideZiel ?? ziel;

    let diff: "einsteiger" | "alle" | "challenge" = "alle";
    if (finalZiel === "challenge") diff = "challenge";
    else if (lehrjahr === "lj1") diff = "einsteiger";

    localStorage.setItem(
      "user-profile",
      JSON.stringify({
        name: name.trim(),
        role: "lernende",
        abteilung,
        lehrjahr,
        ziel: finalZiel,
        avatarColor: "#0D1B4B",
      })
    );
    saveSettings({ difficultyPreference: diff });
    localStorage.setItem("onboarding-complete", "true");
    setStep("done");
  }

  const stepIndex = STEP_INDEX[step];

  return (
    <div
      className="relative flex min-h-screen flex-col items-center justify-center px-4 py-12"
      style={{ background: "#0A1628" }}
    >
      {/* Background grid */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Top glow */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(0,212,184,0.15) 0%, transparent 60%)",
        }}
      />

      <div className="relative w-full max-w-lg">
        {/* Logo */}
        <div className="mb-8 text-center">
          <span
            style={{
              fontSize: 22,
              fontWeight: 800,
              letterSpacing: "-0.5px",
              color: "#F8FAFC",
            }}
          >
            Bank<span style={{ color: "#00D4B8" }}>Academy</span>
          </span>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl bg-white p-8 shadow-2xl"
          style={{ border: "1px solid rgba(255,255,255,0.1)" }}
        >
          {/* Step progress (question steps only) */}
          {stepIndex >= 1 && stepIndex <= 3 && (
            <StepProgress current={stepIndex} total={3} />
          )}

          {/* ── Step: Name ─────────────────────────────────────────── */}
          {step === "name" && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (name.trim()) setStep("abteilung");
              }}
            >
              <h1 className="text-2xl font-bold text-gray-900">Willkommen 👋</h1>
              <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                Wir richten dein persönliches Lernprofil ein. Das dauert nur eine Minute.
              </p>

              <div className="mt-6">
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Dein Vorname
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="z.B. Mia"
                  autoFocus
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-[#0D1B4B] focus:bg-white"
                />
              </div>

              <button
                type="submit"
                disabled={!name.trim()}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ background: "#0D1B4B" }}
              >
                Los geht&apos;s <ChevronRight size={15} />
              </button>
            </form>
          )}

          {/* ── Step: Abteilung ────────────────────────────────────── */}
          {step === "abteilung" && (
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                In welcher Abteilung bist du?
              </h1>
              <p className="mt-1.5 text-sm text-gray-500">
                Wähle dein aktuelles Einsatzgebiet.
              </p>

              <div className="mt-5 grid grid-cols-2 gap-2.5">
                {ABTEILUNG_OPTIONS.map((o, i) => (
                  <OptionCard
                    key={o.id}
                    option={o}
                    selected={abteilung === o.id}
                    onSelect={() => setAbteilung(o.id)}
                    wide={i === ABTEILUNG_OPTIONS.length - 1 && ABTEILUNG_OPTIONS.length % 2 === 1}
                  />
                ))}
              </div>

              <div className="mt-5 flex items-center justify-between">
                <button
                  onClick={() => setStep("name")}
                  className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
                >
                  ← Zurück
                </button>
                <button
                  onClick={() => { if (abteilung) setStep("lehrjahr"); }}
                  disabled={!abteilung}
                  className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ background: "#0D1B4B" }}
                >
                  Weiter <ChevronRight size={14} />
                </button>
              </div>
            </div>
          )}

          {/* ── Step: Lehrjahr ─────────────────────────────────────── */}
          {step === "lehrjahr" && (
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                In welchem Lehrjahr bist du?
              </h1>
              <p className="mt-1.5 text-sm text-gray-500">
                Bestimmt deinen Startschwierigkeitsgrad.
              </p>

              <div className="mt-5 grid grid-cols-2 gap-2.5">
                {LEHRJAHR_OPTIONS.map((o) => (
                  <OptionCard
                    key={o.id}
                    option={o}
                    selected={lehrjahr === o.id}
                    onSelect={() => setLehrjahr(o.id)}
                  />
                ))}
              </div>

              <div className="mt-5 flex items-center justify-between">
                <button
                  onClick={() => setStep("abteilung")}
                  className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
                >
                  ← Zurück
                </button>
                <button
                  onClick={() => { if (lehrjahr) setStep("ziel"); }}
                  disabled={!lehrjahr}
                  className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ background: "#0D1B4B" }}
                >
                  Weiter <ChevronRight size={14} />
                </button>
              </div>
            </div>
          )}

          {/* ── Step: Ziel ─────────────────────────────────────────── */}
          {step === "ziel" && (
            <div>
              <h1 className="text-xl font-bold text-gray-900">Was ist dein Ziel?</h1>
              <p className="mt-1.5 text-sm text-gray-500">
                Wir passen Empfehlungen und Fokus für dich an.
              </p>

              <div className="mt-5 grid grid-cols-2 gap-2.5">
                {ZIEL_OPTIONS.map((o) => (
                  <OptionCard
                    key={o.id}
                    option={o}
                    selected={ziel === o.id}
                    onSelect={() => setZiel(o.id)}
                  />
                ))}
              </div>

              <div className="mt-5 flex items-center justify-between">
                <button
                  onClick={() => setStep("lehrjahr")}
                  className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
                >
                  ← Zurück
                </button>
                <button
                  onClick={() => { if (ziel) complete(); }}
                  disabled={!ziel}
                  className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ background: "#0D1B4B" }}
                >
                  Profil einrichten 🚀
                </button>
              </div>
            </div>
          )}

          {/* ── Step: Done ─────────────────────────────────────────── */}
          {step === "done" && (
            <div className="flex flex-col items-center py-6 text-center">
              <div
                className="mb-5 flex h-16 w-16 items-center justify-center rounded-full"
                style={{ background: "#0D1B4B" }}
              >
                <Check size={30} className="text-white" strokeWidth={3} />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Alles klar!</h1>
              <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                Wir haben dein Profil eingerichtet.
                <br />
                Du wirst gleich weitergeleitet…
              </p>
              <div className="mt-8 h-1 w-full overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${barWidth}%`,
                    background: "#00D4B8",
                    transition: "width 2.5s linear",
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
