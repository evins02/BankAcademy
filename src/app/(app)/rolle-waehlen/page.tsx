"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Briefcase, Building2, Settings2, Award } from "lucide-react";
import { cn } from "@/lib/utils";

const ROLES = [
  {
    key: "privatkundenberater",
    icon: Briefcase,
    label: "Privatkundenberater",
    description: "Beratung von Privatkunden – Konten, Hypotheken, Anlagen, Vorsorge.",
  },
  {
    key: "firmenkundenberater",
    icon: Building2,
    label: "Firmenkundenberater",
    description: "Beratung von KMU und Firmenkunden – Kredite, Tragbarkeit, Strukturen.",
    soon: true,
  },
  {
    key: "operations",
    icon: Settings2,
    label: "Banking / Credit Operations",
    description: "Back-Office-Prozesse – Zahlungsverkehr, Sicherheiten, Compliance.",
    soon: true,
  },
  {
    key: "certify",
    icon: Award,
    label: "Certify",
    description: "Zertifizierungsmodule für Bankfachleute.",
    soon: true,
  },
];

export default function RolleWaehlenPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);

  function handleConfirm() {
    if (!selected) return;
    try {
      localStorage.setItem("bankacademy-role", selected);
    } catch {}
    router.push("/dashboard");
  }

  return (
    <>
      <Header
        title="Deine Rolle wählen"
        subtitle="BankAcademy passt sich deiner Funktion an."
      />
      <div className="flex flex-1 items-start justify-center p-6 pt-10">
        <div className="w-full max-w-lg space-y-4">
          <p className="text-sm text-text-secondary">
            Wähle deine aktuelle oder angestrebte Funktion. Du kannst die Auswahl jederzeit in den Einstellungen ändern.
          </p>
          <div className="flex flex-col gap-3">
            {ROLES.map((r) => {
              const Icon = r.icon;
              return (
                <button
                  key={r.key}
                  onClick={() => !r.soon && setSelected(r.key)}
                  disabled={!!r.soon}
                  className={cn(
                    "flex items-start gap-4 rounded-DEFAULT border p-4 text-left transition-colors",
                    r.soon
                      ? "cursor-not-allowed opacity-50 border-border bg-surface"
                      : selected === r.key
                      ? "border-primary bg-primary-light"
                      : "border-border bg-surface hover:bg-background"
                  )}
                >
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-light text-primary">
                    <Icon size={18} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-text-primary">{r.label}</p>
                      {r.soon && (
                        <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-semibold text-text-secondary uppercase tracking-wide">
                          Bald
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 text-xs text-text-secondary">{r.description}</p>
                  </div>
                  {selected === r.key && !r.soon && (
                    <span className="mt-0.5 shrink-0 text-xs font-semibold text-primary">✓</span>
                  )}
                </button>
              );
            })}
          </div>
          <button
            onClick={handleConfirm}
            disabled={!selected}
            className={cn(
              "w-full rounded-pill py-3 text-sm font-semibold transition-colors",
              selected
                ? "bg-primary text-white hover:bg-primary/90"
                : "cursor-not-allowed bg-gray-100 text-text-secondary"
            )}
          >
            Rolle bestätigen
          </button>
        </div>
      </div>
    </>
  );
}
