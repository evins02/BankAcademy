"use client";

import Link from "next/link";
import { Lock, ChevronRight, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { LockedModuleOverlay } from "@/components/demo/LockedModuleOverlay";
import { useLanguage } from "@/context/LanguageContext";

const MODULE_HREFS = [
  "/demo/privatkunde/basis/sparen-konto",
  "/demo/privatkunde/basis/zahlungsverkehr",
  "/demo/privatkunde/basis/fonds",
  "/demo/anlagekunde/aktien",
  "/demo/anlagekunde/fonds",
  "/demo/anlagekunde/steuern",
  "/demo/backoffice/banking-operations/zahlungsverkehr",
  "/demo/backoffice/banking-operations/mahnwesen",
];

const MODULE_COLORS = [
  "#6C63FF",
  "#f59e0b",
  "#8b5cf6",
  "#10b981",
  "#0ea5e9",
  "#f43f5e",
  "#64748b",
  "#78716c",
];

const MODULE_XP = ["+40 XP", "+35 XP", "+45 XP", "+40 XP", "+40 XP", "+50 XP", "+45 XP", "+40 XP"];

export default function DemoPage() {
  const [showLocked, setShowLocked] = useState(false);
  const { t } = useLanguage();
  const d = t.demo;

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
              {d.badge}
            </div>
            <h1
              style={{
                margin: "0 0 10px",
                fontSize: "clamp(26px, 4vw, 36px)",
                fontWeight: 800,
                letterSpacing: "-0.5px",
              }}
            >
              {d.heroH1}
            </h1>
            <p style={{ margin: "0 0 28px", fontSize: 15, color: "rgba(255,255,255,0.65)", lineHeight: 1.6 }}>
              {d.heroSubtitle}
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
              {d.ctaFull} <ChevronRight size={14} />
            </Link>
          </div>
        </div>

        <div style={{ maxWidth: 860, margin: "0 auto", padding: "32px 24px" }}>
          {/* Unlocked modules */}
          <h2 className="text-sm font-bold text-text-secondary uppercase tracking-widest mb-4">
            {d.sectionUnlocked}
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: 16,
              marginBottom: 40,
            }}
          >
            {d.unlockedModules.map((m, i) => (
              <Link
                key={MODULE_HREFS[i]}
                href={MODULE_HREFS[i]}
                style={{ textDecoration: "none" }}
              >
                <div
                  className="rounded-DEFAULT bg-surface shadow-card p-5 flex flex-col gap-3 h-full transition-shadow hover:shadow-md"
                  style={{ borderTop: `3px solid ${MODULE_COLORS[i]}` }}
                >
                  <div>
                    <p
                      style={{
                        margin: "0 0 6px",
                        fontSize: 10,
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.07em",
                        color: MODULE_COLORS[i],
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
                        color: MODULE_COLORS[i],
                        background: `${MODULE_COLORS[i]}18`,
                        padding: "2px 8px",
                        borderRadius: 100,
                      }}
                    >
                      {MODULE_XP[i]}
                    </span>
                    <span className="text-xs font-semibold text-text-secondary flex items-center gap-1">
                      {d.open} <ChevronRight size={13} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Locked modules */}
          <h2 className="text-sm font-bold text-text-secondary uppercase tracking-widest mb-4">
            {d.sectionLocked}
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: 12,
              marginBottom: 40,
            }}
          >
            {d.lockedModules.map((m) => (
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
                {d.ctaBannerH3}
              </h3>
              <p style={{ margin: 0, fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>
                {d.ctaBannerSub}
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
              {d.ctaFull} <ChevronRight size={14} />
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
              <strong style={{ color: "#374151" }}>{d.complianceTitle}</strong>{" "}
              {d.complianceText}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
