"use client";

import Link from "next/link";
import { Lock, ChevronRight, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { LockedModuleOverlay } from "@/components/demo/LockedModuleOverlay";

const UNLOCKED_MODULES = [
  {
    title: "Sparen & Konto",
    description:
      "Kontenarten, Zinsen, Sparpläne und Sparstrategien für Privatkunden kennen und erklären.",
    href: "/demo/privatkunde/basis/sparen-konto",
    tag: "Privatkunde · Basis",
    xp: "+40 XP",
    color: "#6C63FF",
  },
  {
    title: "Zahlungsverkehr",
    description:
      "Dauerauftrag, LSV, E-Banking und TWINT – Zahlungsprodukte kennen und Kunden richtig beraten.",
    href: "/demo/privatkunde/basis/zahlungsverkehr",
    tag: "Privatkunde · Basis",
    xp: "+35 XP",
    color: "#f59e0b",
  },
  {
    title: "Fonds & Anlageprodukte",
    description:
      "Anlagefonds, ETF und Anlagestrategien – Grundlagen für die Beratung von Privatkunden.",
    href: "/demo/privatkunde/basis/fonds",
    tag: "Privatkunde · Basis",
    xp: "+45 XP",
    color: "#8b5cf6",
  },
  {
    title: "Aktien & Kennzahlen",
    description:
      "KGV, Dividendenrendite berechnen und Aktien mit Obligationen vergleichen – Grundlagen Anlagekunde.",
    href: "/demo/anlagekunde/aktien",
    tag: "Anlagekunde · Basis",
    xp: "+40 XP",
    color: "#10b981",
  },
  {
    title: "Anlagefonds & ETF",
    description:
      "TER vergleichen, ausschüttend vs. thesaurierend und aktiv vs. passiv richtig einordnen.",
    href: "/demo/anlagekunde/fonds",
    tag: "Anlagekunde · Basis",
    xp: "+40 XP",
    color: "#0ea5e9",
  },
  {
    title: "Steuerliche Aspekte",
    description:
      "Verrechnungssteuer 35%, Stempelabgabe und steuerfreie Kapitalgewinne – öffentliches Schweizer Steuerrecht.",
    href: "/demo/anlagekunde/steuern",
    tag: "Anlagekunde · Basis",
    xp: "+50 XP",
    color: "#f43f5e",
  },
];

const LOCKED_MODULES = [
  { title: "Firmenkunde", description: "Kontoeröffnung Firmen, Tragbarkeit und Kreditengagements." },
  { title: "Anlagekunde – Individual", description: "Anlegerprofil, strukturierte Produkte und Lombardkredit." },
  { title: "Credit Office", description: "Hypotheken, Blankokredit und periodische Kreditprüfung." },
  { title: "Challenge-Modus", description: "Prüfungssimulation mit realistischen Falldossiers." },
  { title: "Community & Forum", description: "Fragen stellen, Erfahrungen teilen, Praxisfälle diskutieren." },
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
              Demo Modus · 6 Module freigeschaltet
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
              Teste sechs Grundlagen-Module aus Privat- und Anlagekunde kostenlos. Für alle Module, 150+ Szenarien und den Challenge-Modus kannst du Vollzugang anfragen.
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
              marginBottom: 24,
            }}
          >
            <div>
              <h3 style={{ margin: "0 0 6px", fontSize: 18, fontWeight: 800 }}>
                Bereit für den Vollzugang?
              </h3>
              <p style={{ margin: 0, fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>
                Alle Module · 150+ Szenarien · Challenge-Modus · Community
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

          {/* Compliance notice */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 12,
              background: "#f8f9fd",
              border: "1px solid #e5e7eb",
              borderRadius: 12,
              padding: "14px 18px",
            }}
          >
            <ShieldCheck size={16} style={{ color: "#6b7280", marginTop: 2, flexShrink: 0 }} />
            <p style={{ margin: 0, fontSize: 11, color: "#6b7280", lineHeight: 1.6 }}>
              <strong style={{ color: "#374151" }}>Hinweis zum Demo-Inhalt:</strong>{" "}
              Diese Demo enthält ausschliesslich allgemein zugängliches Finanzwissen (Grundlagen zu Bankprodukten).
              Interne Bankprozesse, regulatorische Prüfabläufe und compliance-relevante Verfahren sind nicht
              Teil dieser Demo und werden nur im passwortgeschützten Vollzugang für Lernende angezeigt.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
