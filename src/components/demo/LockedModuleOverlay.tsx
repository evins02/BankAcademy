"use client";

import Link from "next/link";
import { Lock } from "lucide-react";

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
        <h2
          style={{
            margin: "0 0 12px",
            fontSize: 18,
            fontWeight: 700,
            color: "#0D1B4B",
            lineHeight: 1.35,
          }}
        >
          Dieses Modul ist im Demo Modus nicht verfügbar.
        </h2>
        <p
          style={{
            margin: "0 0 32px",
            fontSize: 14,
            color: "#6b7280",
            lineHeight: 1.65,
          }}
        >
          Erhalte Zugang zu allen 6 Modulen, 105+ Szenarien und dem LAP Modus.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Link
            href="/kontakt"
            style={{
              display: "block",
              padding: "13px 24px",
              borderRadius: 100,
              background: "#0D1B4B",
              color: "#fff",
              fontSize: 14,
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Vollzugang anfragen →
          </Link>
          <button
            onClick={onBack}
            style={{
              padding: "13px 24px",
              borderRadius: 100,
              border: "1px solid #e5e7eb",
              background: "transparent",
              color: "#6b7280",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Zurück
          </button>
        </div>
      </div>
    </div>
  );
}
