"use client";

import { useState } from "react";

const TEAL = "#1ddba0";
const DARK = "#0a1628";
const BORDER = "#1e3155";
const TEXT = "#e2e8f0";
const MUTED = "#7e93b0";
const CARD = "#091425";

export interface DemoSession {
  vorname: string;
  email: string;
}

interface Props {
  onComplete: (session: DemoSession) => void;
}

export function DemoEmailGate({ onComplete }: Props) {
  const [vorname, setVorname] = useState("");
  const [email, setEmail] = useState("");
  const [optIn, setOptIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const vTrim = vorname.trim();
    const eTrim = email.trim().toLowerCase();

    if (!vTrim) { setError("Bitte gib deinen Vornamen ein."); return; }
    if (!eTrim || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(eTrim)) {
      setError("Bitte gib eine gültige E-Mail-Adresse ein.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/demo-register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vorname: vTrim, email: eTrim, optIn }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setError(body.error ?? "Fehler. Bitte nochmals versuchen.");
        return;
      }
      const session: DemoSession = { vorname: vTrim, email: eTrim };
      try {
        localStorage.setItem("ba-demo-session", JSON.stringify(session));
        localStorage.setItem("demo-seen", "true");
      } catch {}
      onComplete(session);
    } catch {
      setError("Keine Verbindung. Bitte nochmals versuchen.");
    } finally {
      setLoading(false);
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 14px",
    borderRadius: 10,
    border: `1.5px solid ${BORDER}`,
    background: CARD,
    color: TEXT,
    fontSize: 15,
    outline: "none",
    fontFamily: "inherit",
    boxSizing: "border-box",
    transition: "border-color 0.15s",
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        background: "rgba(0,0,0,0.82)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <div
        style={{
          background: DARK,
          border: `1.5px solid ${BORDER}`,
          borderRadius: 20,
          padding: "40px 36px",
          maxWidth: 440,
          width: "100%",
          boxShadow: "0 32px 80px rgba(0,0,0,0.7)",
        }}
      >
        {/* Logo / Icon */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: `${TEAL}20`,
              border: `2px solid ${TEAL}`,
              fontSize: 26,
              marginBottom: 18,
            }}
          >
            🏦
          </div>
          <h1
            style={{
              margin: "0 0 8px",
              fontSize: 22,
              fontWeight: 800,
              color: TEXT,
              letterSpacing: "-0.3px",
            }}
          >
            Willkommen bei BankAcademy
          </h1>
          <p style={{ margin: 0, fontSize: 14, color: MUTED, lineHeight: 1.6 }}>
            Gib deine E-Mail ein um zu starten – kein Passwort nötig
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          {/* Vorname */}
          <div style={{ marginBottom: 14 }}>
            <label
              style={{ display: "block", fontSize: 12, fontWeight: 600, color: MUTED, marginBottom: 6, letterSpacing: "0.04em" }}
            >
              VORNAME *
            </label>
            <input
              type="text"
              autoComplete="given-name"
              placeholder="z.B. Anna"
              value={vorname}
              onChange={(e) => setVorname(e.target.value)}
              style={inputStyle}
              onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = TEAL; }}
              onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = BORDER; }}
            />
          </div>

          {/* E-Mail */}
          <div style={{ marginBottom: 18 }}>
            <label
              style={{ display: "block", fontSize: 12, fontWeight: 600, color: MUTED, marginBottom: 6, letterSpacing: "0.04em" }}
            >
              E-MAIL *
            </label>
            <input
              type="email"
              autoComplete="email"
              placeholder="deine@email.ch"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
              onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = TEAL; }}
              onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = BORDER; }}
            />
          </div>

          {/* Opt-in Checkbox */}
          <div style={{ marginBottom: 24 }}>
            <label
              style={{ display: "flex", alignItems: "flex-start", gap: 12, cursor: "pointer" }}
            >
              <div
                role="checkbox"
                aria-checked={optIn}
                tabIndex={0}
                onClick={() => setOptIn((v) => !v)}
                onKeyDown={(e) =>
                  (e.key === " " || e.key === "Enter") && setOptIn((v) => !v)
                }
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 5,
                  flexShrink: 0,
                  marginTop: 1,
                  border: `2px solid ${optIn ? TEAL : BORDER}`,
                  background: optIn ? TEAL : "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.15s",
                  cursor: "pointer",
                }}
              >
                {optIn && (
                  <span style={{ fontSize: 11, color: DARK, fontWeight: 800, lineHeight: 1 }}>
                    ✓
                  </span>
                )}
              </div>
              <span style={{ fontSize: 13, color: MUTED, lineHeight: 1.6 }}>
                BankAcademy darf mich nach dem Pilot kontaktieren
              </span>
            </label>
          </div>

          {/* Error */}
          {error && (
            <div
              style={{
                padding: "10px 14px",
                borderRadius: 10,
                background: "#3f0a0a",
                border: "1px solid #7f1d1d",
                color: "#fca5a5",
                fontSize: 13,
                marginBottom: 16,
              }}
            >
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: 12,
              border: "none",
              background: loading ? "#0f8c65" : TEAL,
              color: DARK,
              fontSize: 15,
              fontWeight: 700,
              cursor: loading ? "not-allowed" : "pointer",
              transition: "background 0.2s",
            }}
          >
            {loading ? "Einen Moment…" : "Jetzt starten →"}
          </button>
        </form>

        <p
          style={{
            margin: "18px 0 0",
            textAlign: "center",
            fontSize: 11,
            color: MUTED,
            lineHeight: 1.5,
          }}
        >
          Deine Daten werden nur für diesen Pilot verwendet
          und nicht an Dritte weitergegeben.
        </p>
      </div>
    </div>
  );
}
