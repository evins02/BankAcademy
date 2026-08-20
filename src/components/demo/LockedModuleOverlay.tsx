"use client";

import Link from "next/link";
import { Lock, ArrowRight } from "lucide-react";

export function LockedModuleOverlay({ onBack }: { onBack: () => void }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(13,27,75,0.72)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
      onClick={onBack}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          borderRadius: 20,
          padding: "44px 36px",
          maxWidth: 400,
          width: "100%",
          textAlign: "center",
          boxShadow: "0 40px 100px rgba(0,0,0,0.25)",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 72,
            height: 72,
            borderRadius: "50%",
            background: "rgba(13,27,75,0.07)",
            marginBottom: 24,
          }}
        >
          <Lock size={36} color="#0D1B4B" />
        </div>

        <h2 style={{ margin: "0 0 12px", fontSize: 18, fontWeight: 700, color: "#0D1B4B", lineHeight: 1.35 }}>
          Vollzugang erforderlich
        </h2>
        <p style={{ margin: "0 0 28px", fontSize: 14, color: "#6b7280", lineHeight: 1.65 }}>
          Dieses Modul ist nur in der Vollversion verfügbar. Erstelle ein Konto oder melde dich an, um alle Module freizuschalten.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Link
            href="/sign-up"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              padding: "13px 24px",
              borderRadius: 100,
              background: "#0D1B4B",
              color: "#fff",
              fontSize: 14,
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Konto erstellen <ArrowRight size={15} />
          </Link>
          <Link
            href="/sign-in"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "13px 24px",
              borderRadius: 100,
              border: "1px solid #e5e7eb",
              background: "transparent",
              color: "#374151",
              fontSize: 14,
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Bereits ein Konto? Anmelden
          </Link>
          <button
            type="button"
            onClick={onBack}
            style={{
              padding: "10px 24px",
              borderRadius: 100,
              border: "none",
              background: "transparent",
              color: "#9ca3af",
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            Zurück zur Demo
          </button>
        </div>
      </div>
    </div>
  );
}
