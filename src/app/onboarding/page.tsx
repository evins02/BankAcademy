"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BankingLabLogo } from "@/components/shared/BankingLabLogo";
import { ChevronRight } from "lucide-react";

const ROLES = [
  { id: "lernende", label: "Lernende/r", emoji: "🎓", desc: "In der Ausbildung" },
  { id: "quereinsteiger", label: "Quereinsteiger", emoji: "🔄", desc: "Neu in der Branche" },
  { id: "ausbildner", label: "Ausbildner/in", emoji: "👨‍🏫", desc: "Begleite Lernende" },
  { id: "profi", label: "Bankprofi", emoji: "💼", desc: "Bereits im Beruf" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [step, setStep] = useState<"name" | "role">("name");

  useEffect(() => {
    if (
      localStorage.getItem("user-profile") &&
      localStorage.getItem("onboarding-complete")
    ) {
      router.replace("/dashboard");
    }
  }, [router]);

  function handleNameNext(e: React.FormEvent) {
    e.preventDefault();
    if (name.trim()) setStep("role");
  }

  function handleComplete() {
    if (!role) return;
    localStorage.setItem("user-profile", JSON.stringify({ name: name.trim(), role }));
    localStorage.setItem("onboarding-complete", "true");
    router.push("/dashboard");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex justify-center">
          <BankingLabLogo size="md" />
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          {step === "name" ? (
            <form onSubmit={handleNameNext}>
              <h1 className="text-xl font-bold text-gray-900">Willkommen! 👋</h1>
              <p className="mt-1.5 text-sm text-gray-500">
                Wie sollen wir dich nennen?
              </p>

              <div className="mt-6">
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Dein Vorname
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="z.B. Mia"
                  autoFocus
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-[#0D1B4B] focus:bg-white transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={!name.trim()}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0D1B4B] py-3 text-sm font-bold text-white hover:bg-[#162260] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Weiter
                <ChevronRight size={15} />
              </button>
            </form>
          ) : (
            <div>
              <h1 className="text-xl font-bold text-gray-900">Und deine Rolle?</h1>
              <p className="mt-1.5 text-sm text-gray-500">
                So können wir dein Erlebnis anpassen.
              </p>

              <div className="mt-5 grid grid-cols-2 gap-2.5">
                {ROLES.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setRole(r.id)}
                    className={`rounded-xl border p-3 text-left transition-colors ${
                      role === r.id
                        ? "border-[#0D1B4B] bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <span className="text-2xl">{r.emoji}</span>
                    <p className="mt-1.5 text-xs font-bold text-gray-800">{r.label}</p>
                    <p className="text-[10px] text-gray-400">{r.desc}</p>
                  </button>
                ))}
              </div>

              <button
                onClick={handleComplete}
                disabled={!role}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0D1B4B] py-3 text-sm font-bold text-white hover:bg-[#162260] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Los geht&apos;s 🚀
              </button>

              <button
                onClick={() => setStep("name")}
                className="mt-3 w-full text-center text-xs text-gray-400 hover:text-gray-600 transition-colors"
              >
                ← Zurück
              </button>
            </div>
          )}
        </div>

        <p className="mt-4 text-center text-xs text-gray-400">
          Bereits ein Konto?{" "}
          <a href="/dashboard" className="font-medium text-[#0D1B4B] hover:underline">
            Einloggen
          </a>
        </p>
      </div>
    </div>
  );
}
