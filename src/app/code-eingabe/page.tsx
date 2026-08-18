"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function CodeEingabeForm() {
  const params = useSearchParams();
  const registered = params.get("registered") === "true";

  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  // If already authenticated, redirect immediately
  useEffect(() => {
    const hasAccess = document.cookie.includes("bankacademy_access=1");
    if (hasAccess) {
      const onboarded = localStorage.getItem("onboarding-complete");
      window.location.replace(onboarded === "true" ? "/dashboard" : "/onboarding");
    }
  }, []);

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
        localStorage.clear();
        const _sid = Math.random().toString(36).slice(2, 10) + Math.random().toString(36).slice(2, 10);
        localStorage.setItem("ba-sid", _sid);
        localStorage.setItem(_sid + "::mock-seeded", "true");
        localStorage.setItem("fullAccess", "true");
        window.location.replace("/onboarding");
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
        minHeight: "100vh",
        background: "#0A1628",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Logo */}
      <a
        href="/"
        style={{
          marginBottom: 40,
          fontSize: 22,
          fontWeight: 800,
          letterSpacing: "-0.5px",
          color: "#F8FAFC",
          textDecoration: "none",
        }}
      >
        Bank<span style={{ color: "#00D4B8" }}>Academy</span>
      </a>

      <div
        style={{
          background: "#fff",
          borderRadius: 20,
          padding: "40px 36px 32px",
          width: "100%",
          maxWidth: 400,
          boxShadow: "0 32px 80px rgba(0,0,0,0.5)",
        }}
      >
        {registered && (
          <div
            style={{
              background: "#f0fdf4",
              border: "1px solid #bbf7d0",
              borderRadius: 10,
              padding: "10px 14px",
              marginBottom: 24,
              fontSize: 13,
              color: "#166534",
            }}
          >
            Registrierung gespeichert! Gib jetzt deinen Zugangscode ein.
          </div>
        )}

        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: "rgba(0,212,184,0.1)",
              marginBottom: 16,
              fontSize: 26,
            }}
          >
            🔑
          </div>
          <h1 style={{ margin: "0 0 8px", fontSize: 20, fontWeight: 700, color: "#111827", letterSpacing: "-0.3px" }}>
            Zugangscode eingeben
          </h1>
          <p style={{ margin: 0, fontSize: 14, color: "#6b7280", lineHeight: 1.5 }}>
            Gib deinen Code ein, um die Vollversion freizuschalten.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <input
            type="password"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            placeholder="••••••••••"
            value={code}
            onChange={(e) => { setCode(e.target.value); setError(false); }}
            disabled={loading}
            autoFocus
            style={{
              width: "100%",
              padding: "13px 16px",
              borderRadius: 10,
              border: error ? "1.5px solid #ef4444" : "1.5px solid #e5e7eb",
              fontSize: 15,
              color: "#111827",
              background: "#fff",
              outline: "none",
              boxSizing: "border-box",
              transition: "border-color 0.15s",
            }}
            onFocus={(e) => { if (!error) e.currentTarget.style.borderColor = "#0A1628"; }}
            onBlur={(e) => { if (!error) e.currentTarget.style.borderColor = "#e5e7eb"; }}
          />
          {error && (
            <p style={{ margin: 0, fontSize: 13, color: "#ef4444" }}>
              Code ungültig — bitte nochmals versuchen.
            </p>
          )}
          <button
            type="submit"
            disabled={!code || loading}
            style={{
              width: "100%",
              padding: "13px 24px",
              borderRadius: 100,
              border: "none",
              background: !code || loading ? "#9ca3af" : "#0A1628",
              color: "#fff",
              fontSize: 15,
              fontWeight: 700,
              cursor: !code || loading ? "not-allowed" : "pointer",
              transition: "background 0.15s",
              marginTop: 4,
            }}
          >
            {loading ? "Prüfen…" : "Freischalten →"}
          </button>
        </form>

        <p style={{ margin: "20px 0 0", fontSize: 12, color: "#9ca3af", textAlign: "center" }}>
          Noch keinen Code?{" "}
          <a href="/kontakt" style={{ color: "#6b7280", textDecoration: "underline" }}>
            Vollzugang anfragen →
          </a>
        </p>
      </div>

      <a
        href="/"
        style={{
          marginTop: 24,
          fontSize: 13,
          color: "rgba(248,250,252,0.45)",
          textDecoration: "none",
          transition: "color 0.15s",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(248,250,252,0.75)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(248,250,252,0.45)"; }}
      >
        ← Zurück zur Startseite
      </a>
    </div>
  );
}

export default function CodeEingabePage() {
  return (
    <Suspense>
      <CodeEingabeForm />
    </Suspense>
  );
}
