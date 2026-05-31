"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { BankingLabLogo } from "@/components/shared/BankingLabLogo";
import { CheckCircle2, TrendingUp, ShieldCheck, GraduationCap, ChevronRight } from "lucide-react";

const FEATURES = [
  {
    icon: GraduationCap,
    title: "Praxisnahe Szenarien",
    desc: "Echte Banksituationen aus dem Alltag – Kontoeröffnung, Hypotheken, Compliance und mehr.",
  },
  {
    icon: TrendingUp,
    title: "Lernfortschritt tracken",
    desc: "XP, Streaks und detaillierte Statistiken zeigen dir genau wo du stehst.",
  },
  {
    icon: ShieldCheck,
    title: "Bankfachlich korrekt",
    desc: "Inhalte aus der Praxis – abgestimmt auf Schweizer Bankstandards und KYC-Anforderungen.",
  },
];

const MODULES = [
  { emoji: "👤", label: "Privatkunde", desc: "Kontoeröffnung, Hypothek, Fonds" },
  { emoji: "🏢", label: "Firmenkunde", desc: "Jahresabschluss, Tragbarkeit, KYC" },
  { emoji: "📈", label: "Anlagekunde", desc: "Anlegerprofil, Risiko, TER" },
  { emoji: "🏦", label: "Back Office", desc: "ZV, Mahnwesen, Credit Ops" },
];

export default function LandingPage() {
  const router = useRouter();

  function handleStart() {
    const hasProfile =
      typeof window !== "undefined" &&
      !!localStorage.getItem("user-profile") &&
      !!localStorage.getItem("onboarding-complete");
    router.push(hasProfile ? "/dashboard" : "/onboarding");
  }

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "var(--font-sans, sans-serif)" }}>
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <BankingLabLogo size="md" />
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            Einloggen
          </Link>
          <button
            onClick={handleStart}
            className="rounded-lg bg-[#0D1B4B] px-4 py-2 text-sm font-semibold text-white hover:bg-[#162260] transition-colors"
          >
            Kostenlos starten
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-4xl px-6 py-20 text-center">
        <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 border border-blue-100">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
          Dein digitaler Praxisausbildner
        </div>

        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
          Bankfachwissen,
          <br />
          <span style={{ color: "#0D1B4B" }}>praxisnah trainieren</span>
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-lg text-gray-500 leading-relaxed">
          BankAcademy bereitet dich mit realistischen Szenarien aus dem Schweizer Bankalltag auf
          die LAP und den Berufsalltag vor – interaktiv, messbar und kostenlos.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={handleStart}
            className="flex items-center gap-2 rounded-xl bg-[#0D1B4B] px-7 py-3.5 text-base font-bold text-white hover:bg-[#162260] transition-colors shadow-lg shadow-blue-900/20"
          >
            Kostenlos starten
            <ChevronRight size={16} />
          </button>
          <Link
            href="/dashboard"
            className="rounded-xl border border-gray-200 px-7 py-3.5 text-base font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Einloggen
          </Link>
        </div>

        <div className="mt-6 flex items-center justify-center gap-4 text-xs text-gray-400">
          {["Kein Konto nötig", "100% kostenlos", "LAP-konform"].map((t) => (
            <span key={t} className="flex items-center gap-1">
              <CheckCircle2 size={12} className="text-green-500" />
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* Modules preview */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-4xl px-6">
          <p className="mb-8 text-center text-xs font-bold uppercase tracking-wider text-gray-400">
            Module
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {MODULES.map((m) => (
              <div
                key={m.label}
                className="rounded-2xl border border-gray-200 bg-white p-4 text-center shadow-sm"
              >
                <span className="text-3xl">{m.emoji}</span>
                <p className="mt-2 text-sm font-bold text-gray-800">{m.label}</p>
                <p className="mt-0.5 text-xs text-gray-400">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="grid gap-8 sm:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.title}>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                <f.icon size={20} style={{ color: "#0D1B4B" }} />
              </div>
              <h3 className="mt-3 text-sm font-bold text-gray-900">{f.title}</h3>
              <p className="mt-1.5 text-sm text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA banner */}
      <section
        className="py-16"
        style={{ background: "linear-gradient(135deg, #0D1B4B 0%, #1a2d6b 100%)" }}
      >
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="text-2xl font-bold text-white">Bereit für die LAP?</h2>
          <p className="mt-2 text-sm text-white/70">
            Starte jetzt kostenlos und trainiere im eigenen Tempo.
          </p>
          <button
            onClick={handleStart}
            className="mt-6 rounded-xl bg-white px-7 py-3 text-sm font-bold text-[#0D1B4B] hover:bg-blue-50 transition-colors"
          >
            Jetzt starten
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-6 px-6 text-center text-xs text-gray-400">
        <BankingLabLogo size="sm" className="mx-auto mb-3 opacity-50" />
        <p>Für Lernende und Ausbildner in Schweizer Banken.</p>
      </footer>
    </div>
  );
}
