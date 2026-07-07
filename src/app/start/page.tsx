"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";

export default function StartPage() {
  const router = useRouter();
  const [vorname, setVorname] = useState("");
  const [nachname, setNachname] = useState("");
  const [email, setEmail] = useState("");
  const [optIn, setOptIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const done = localStorage.getItem("registration-complete");
    if (done === "true") {
      const onboarded = localStorage.getItem("onboarding-complete");
      router.replace(onboarded === "true" ? "/dashboard" : "/onboarding");
    } else {
      setChecking(false);
    }
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ vorname, nachname, email, optIn }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error ?? "Fehler beim Speichern. Bitte nochmals versuchen.");
      setLoading(false);
      return;
    }

    localStorage.setItem("registration-complete", "true");
    localStorage.setItem("registered-email", email.trim().toLowerCase());
    localStorage.setItem("fullAccess", "true");

    const onboarded = localStorage.getItem("onboarding-complete");
    router.push(onboarded === "true" ? "/dashboard" : "/onboarding");
  }

  if (checking) return null;

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: "linear-gradient(135deg, #0D1B4B 0%, #00C9B1 100%)" }}
    >
      <div className="w-full max-w-md">
        {/* Logo / Titel */}
        <div className="mb-8 text-center">
          <div className="mb-4 text-5xl">🏦</div>
          <h1 className="text-3xl font-bold text-white">BankAcademy</h1>
          <p className="mt-2 text-white/70 text-sm">August-Testlauf 2025</p>
        </div>

        {/* Card */}
        <div className="rounded-2xl bg-white p-8 shadow-2xl">
          <h2 className="mb-1 text-xl font-bold text-gray-900">Kurz anmelden</h2>
          <p className="mb-6 text-sm text-gray-500">
            Einmalig — damit wir wissen wer teilnimmt.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-600">
                  Vorname *
                </label>
                <input
                  type="text"
                  required
                  value={vorname}
                  onChange={(e) => setVorname(e.target.value)}
                  placeholder="Anna"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-[#0D1B4B] focus:ring-2 focus:ring-[#0D1B4B]/10"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-600">
                  Nachname *
                </label>
                <input
                  type="text"
                  required
                  value={nachname}
                  onChange={(e) => setNachname(e.target.value)}
                  placeholder="Müller"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-[#0D1B4B] focus:ring-2 focus:ring-[#0D1B4B]/10"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-gray-600">
                E-Mail *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="anna.mueller@bank.ch"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-[#0D1B4B] focus:ring-2 focus:ring-[#0D1B4B]/10"
              />
            </div>

            {/* Opt-in */}
            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4">
              <div className="relative mt-0.5 shrink-0">
                <input
                  type="checkbox"
                  checked={optIn}
                  onChange={(e) => setOptIn(e.target.checked)}
                  className="sr-only"
                />
                <div
                  className={`flex h-5 w-5 items-center justify-center rounded border-2 transition-colors ${
                    optIn
                      ? "border-[#0D1B4B] bg-[#0D1B4B]"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  {optIn && <CheckCircle2 size={12} className="text-white" />}
                </div>
              </div>
              <span className="text-xs leading-relaxed text-gray-600">
                Ich bin damit einverstanden, dass BankAcademy mich nach dem
                Testlauf kontaktieren darf. <span className="text-gray-400">(freiwillig)</span>
              </span>
            </label>

            {error && (
              <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                <AlertCircle size={15} className="shrink-0" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
              style={{ background: "#0D1B4B" }}
            >
              {loading ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  Wird gespeichert…
                </>
              ) : (
                "Jetzt starten →"
              )}
            </button>
          </form>

          {/* DSG-Hinweis */}
          <p className="mt-5 text-center text-[11px] leading-relaxed text-gray-400">
            Deine Daten werden ausschliesslich für den August-Testlauf 2025
            verwendet und nicht an Dritte weitergegeben.
          </p>
        </div>
      </div>
    </div>
  );
}
