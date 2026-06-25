"use client";

import { useState } from "react";
import Link from "next/link";
import { Lock } from "lucide-react";

export function LockedModuleOverlay({ onBack }: { onBack: () => void }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!code || loading) return;
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("/api/validate-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      if (data.valid) {
        localStorage.setItem("fullAccess", "true");
        window.location.replace("/dashboard");
      } else {
        setError(true);
        setCode("");
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

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
          Vollzugang erforderlich
        </h2>
        <p
          style={{
            margin: "0 0 28px",
            fontSize: 14,
            color: "#6b7280",
            lineHeight: 1.65,
          }}
        >
          Gib deinen Zugangscode ein, um alle Module freizuschalten.
        </p>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <input
            type="password"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            value={code}
            onChange={(e) => { setCode(e.target.value); setError(false); }}
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px 16px",
              borderRadius: 10,
              border: error ? "1px solid #ef4444" : "1px solid #e5e7eb",
              fontSize: 14,
              color: "#0D1B4B",
              background: "#f9fafb",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
          {error && (
            <p style={{ margin: 0, fontSize: 13, color: "#ef4444", textAlign: "left" }}>
              Code ungültig
            </p>
          )}
          <button
            type="submit"
            disabled={!code || loading}
            style={{
              padding: "13px 24px",
              borderRadius: 100,
              background: !code || loading ? "#9ca3af" : "#0D1B4B",
              color: "#fff",
              fontSize: 14,
              fontWeight: 700,
              border: "none",
              cursor: !code || loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Prüfen…" : "Freischalten"}
          </button>
          <button
            type="button"
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
        </form>

        <p style={{ margin: "20px 0 0", fontSize: 12, color: "#9ca3af" }}>
          Noch keinen Code?{" "}
          <Link href="/kontakt" style={{ color: "#6b7280", textDecoration: "underline" }}>
            Vollzugang anfragen →
          </Link>
        </p>
      </div>
    </div>
  );
}
