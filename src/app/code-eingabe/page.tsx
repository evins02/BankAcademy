"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function CodeEingabePage() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!code.trim()) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/validate-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: code.trim() }),
      });

      const data = await res.json();

      if (res.status === 429) {
        setError(data.error ?? "Zu viele Versuche. Bitte warten.");
        return;
      }

      if (data.valid) {
        // Hard navigation: forces Clerk to reload the session token with new publicMetadata
        window.location.href = "/dashboard";
      } else {
        setError("Ungültiger Code. Bitte überprüfe die Eingabe.");
        setCode("");
        inputRef.current?.focus();
      }
    } catch {
      setError("Verbindungsfehler. Bitte erneut versuchen.");
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

      {/* Card */}
      <div
        style={{
          width: "100%",
          maxWidth: 380,
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 16,
          padding: "32px 28px",
        }}
      >
        <h1
          style={{
            margin: "0 0 8px",
            fontSize: 20,
            fontWeight: 700,
            color: "#F8FAFC",
            letterSpacing: "-0.3px",
          }}
        >
          Zugangscode eingeben
        </h1>
        <p
          style={{
            margin: "0 0 28px",
            fontSize: 13,
            color: "rgba(248,250,252,0.5)",
            lineHeight: 1.6,
          }}
        >
          Du hast den Code von deiner Bank oder Berufsschule erhalten.
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <input
              ref={inputRef}
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Code eingeben"
              autoFocus
              autoComplete="off"
              spellCheck={false}
              style={{
                width: "100%",
                padding: "12px 14px",
                fontSize: 15,
                fontWeight: 600,
                letterSpacing: "0.05em",
                background: "rgba(255,255,255,0.06)",
                border: error
                  ? "1.5px solid rgba(239,68,68,0.7)"
                  : "1.5px solid rgba(255,255,255,0.12)",
                borderRadius: 10,
                color: "#F8FAFC",
                outline: "none",
                boxSizing: "border-box",
                transition: "border-color 0.15s",
              }}
              onFocus={(e) => {
                if (!error) e.target.style.borderColor = "rgba(0,212,184,0.6)";
              }}
              onBlur={(e) => {
                if (!error) e.target.style.borderColor = "rgba(255,255,255,0.12)";
              }}
            />
            {error && (
              <p
                style={{
                  margin: "8px 0 0",
                  fontSize: 12,
                  color: "rgba(239,68,68,0.9)",
                }}
              >
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || !code.trim()}
            style={{
              width: "100%",
              padding: "12px 0",
              fontSize: 14,
              fontWeight: 700,
              background: loading || !code.trim() ? "rgba(0,212,184,0.3)" : "#00D4B8",
              color: loading || !code.trim() ? "rgba(10,22,40,0.5)" : "#0A1628",
              border: "none",
              borderRadius: 10,
              cursor: loading || !code.trim() ? "not-allowed" : "pointer",
              transition: "background 0.15s",
            }}
          >
            {loading ? "Wird geprüft…" : "Zugang freischalten"}
          </button>
        </form>
      </div>

      <p
        style={{
          marginTop: 20,
          fontSize: 12,
          color: "rgba(248,250,252,0.3)",
          textAlign: "center",
        }}
      >
        Keinen Code erhalten?{" "}
        <a
          href="/kontakt"
          style={{ color: "rgba(0,212,184,0.7)", textDecoration: "none" }}
        >
          Kontakt aufnehmen
        </a>
      </p>
    </div>
  );
}
