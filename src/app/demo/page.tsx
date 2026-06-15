"use client";

import Link from "next/link";
import { Lock, ChevronRight } from "lucide-react";
import { useState } from "react";
import { LockedModuleOverlay } from "@/components/demo/LockedModuleOverlay";

const UNLOCKED_MODULES = [
  {
    title: "Kontoeröffnung",
    description:
      "Lerne alle Schritte der Kontoeröffnung für Privatkunden – KYC, Legitimation und Dokumentation.",
    href: "/privatkunde/basis/kontoeröffnung",
    tag: "Privatkunde · Basis",
    xp: "+50 XP",
    color: "#00C9B1",
  },
  {
    title: "Sparen & Konto",
    description:
      "Kontenarten, Zinsen, Sparpläne und Sparstrategien im Überblick.",
    href: "/privatkunde/basis/sparen-konto",
    tag: "Privatkunde · Basis",
    xp: "+40 XP",
    color: "#6C63FF",
  },
  {
    title: "KYC / Compliance",
    description:
      "Know Your Customer – Sorgfaltspflichten, GwG und Beneficial Owner in der Praxis.",
    href: "/backoffice/banking-operations/kyc",
    tag: "Back Office · Banking Operations",
    xp: "+80 XP",
    color: "#10b981",
  },
];

const LOCKED_MODULES = [
  { title: "Firmenkunde", description: "Kontoeröffnung, Tragbarkeit und Firmenkredit." },
  { title: "Anlagekunde", description: "Anlageberatung, Obligationen, Aktien & ETF." },
  { title: "Credit Office", description: "Hypotheken, Blankokredit und periodische Prüfung." },
  { title: "Individual-Hypothek", description: "Hypothekarantrag prüfen und Tragbarkeit berechnen." },
  { title: "LAP Modus", description: "Prüfungssimulation mit realistischen Falldossiers." },
  { title: "Leaderboard & Forum", description: "Community, Rangliste und Praxisfälle." },
];

export default function DemoPage() {
  const [showLocked, setShowLocked] = useState(false);

  return (
    <>
      {showLocked && <LockedModuleOverlay onBack={() => setShowLocked(false)} />}

      <div className="flex-1 overflow-y-auto">
        {/* Hero */}
        <div
          style={{
            background: "linear-gradient(135deg, #0D1B4B 0%, #1a2d6e 100%)",
            padding: "40px 32px 36px",
            color: "#fff",
          }}
        >
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(254,243,199,0.15)",
                border: "1px solid rgba(252,211,77,0.3)",
                borderRadius: 100,
                padding: "5px 14px",
                fontSize: 12,
                fontWeight: 600,
                color: "#fef3c7",
                marginBottom: 20,
              }}
            >
              👀 Demo Modus · 3 von 6 Modulen freigeschaltet
            </div>
            <h1
              style={{
                margin: "0 0 10px",
                fontSize: "clamp(26px, 4vw, 36px)",
                fontWeight: 800,
                letterSpacing: "-0.5px",
              }}
            >
              Willkommen bei BankAcademy
            </h1>
            <p style={{ margin: "0 0 28px", fontSize: 15, color: "rgba(255,255,255,0.65)", lineHeight: 1.6 }}>
              Starte mit den freigeschalteten Modulen. Für alle 6 Module, 105+ Szenarien und den LAP Modus kannst du Vollzugang anfragen.
            </p>
            <Link
              href="/kontakt"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "10px 22px",
                borderRadius: 100,
                background: "#00C9B1",
                color: "#0D1B4B",
                fontSize: 13,
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              Vollzugang anfragen <ChevronRight size={14} />
            </Link>
          </div>
        </div>

        <div style={{ maxWidth: 860, margin: "0 auto", padding: "32px 24px" }}>
          {/* Unlocked modules */}
          <h2 className="text-sm font-bold text-text-secondary uppercase tracking-widest mb-4">
            Freigeschaltete Module
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: 16,
              marginBottom: 40,
            }}
          >
            {UNLOCKED_MODULES.map((m) => (
              <Link
                key={m.href}
                href={m.href}
                style={{ textDecoration: "none" }}
              >
                <div
                  className="rounded-DEFAULT bg-surface shadow-card p-5 flex flex-col gap-3 h-full transition-shadow hover:shadow-md"
                  style={{ borderTop: `3px solid ${m.color}` }}
                >
                  <div>
                    <p
                      style={{
                        margin: "0 0 6px",
                        fontSize: 10,
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.07em",
                        color: m.color,
                      }}
                    >
                      {m.tag}
                    </p>
                    <h3 className="text-base font-bold text-text-primary">
                      {m.title}
                    </h3>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed flex-1">
                    {m.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: m.color,
                        background: `${m.color}18`,
                        padding: "2px 8px",
                        borderRadius: 100,
                      }}
                    >
                      {m.xp}
                    </span>
                    <span className="text-xs font-semibold text-text-secondary flex items-center gap-1">
                      Öffnen <ChevronRight size={13} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Locked modules */}
          <h2 className="text-sm font-bold text-text-secondary uppercase tracking-widest mb-4">
            Im Demo gesperrt
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: 12,
              marginBottom: 40,
            }}
          >
            {LOCKED_MODULES.map((m) => (
              <button
                key={m.title}
                onClick={() => setShowLocked(true)}
                className="rounded-DEFAULT bg-surface shadow-card p-5 text-left flex items-start gap-3 opacity-60 hover:opacity-75 transition-opacity w-full"
              >
                <Lock size={16} className="shrink-0 mt-0.5 text-text-secondary" />
                <div>
                  <p className="text-sm font-semibold text-text-secondary">{m.title}</p>
                  <p className="text-xs text-text-secondary mt-0.5 leading-relaxed">
                    {m.description}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* CTA banner */}
          <div
            style={{
              background: "#0D1B4B",
              borderRadius: 16,
              padding: "32px 28px",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 20,
              color: "#fff",
            }}
          >
            <div>
              <h3 style={{ margin: "0 0 6px", fontSize: 18, fontWeight: 800 }}>
                Bereit für den Vollzugang?
              </h3>
              <p style={{ margin: 0, fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>
                Alle 6 Module · 105+ Szenarien · LAP Prüfungsmodus · Leaderboard
              </p>
            </div>
            <Link
              href="/kontakt"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "12px 24px",
                borderRadius: 100,
                background: "#00C9B1",
                color: "#0D1B4B",
                fontSize: 14,
                fontWeight: 700,
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              Vollzugang anfragen <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
