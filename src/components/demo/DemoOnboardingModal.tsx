"use client";

import { useEffect, useState } from "react";

export function DemoOnboardingModal() {
  const [show, setShow] = useState(false);
  const [vorname, setVorname] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem("demo-seen") !== "true") setShow(true);
    } catch {}
  }, []);

  async function start() {
    const v = vorname.trim();
    const e = email.trim();

    if (!v) { setError("Bitte gib deinen Vornamen ein."); return; }
    if (!e || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) { setError("Bitte gib eine gültige E-Mail ein."); return; }

    setLoading(true);
    setError("");
    try {
      await fetch("/api/demo-register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vorname: v, email: e.toLowerCase(), optIn: false }),
      });
    } catch {}

    try {
      localStorage.clear();
      localStorage.setItem("demo-seen", "true");
      localStorage.setItem("demo-vorname", v);
      localStorage.setItem("demo-email", e.toLowerCase());
    } catch {}

    setLoading(false);
    setShow(false);
  }

  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        background: "rgba(0,0,0,0.65)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 20,
          padding: "44px 36px",
          maxWidth: 440,
          width: "100%",
          textAlign: "center",
          boxShadow: "0 40px 100px rgba(0,0,0,0.2)",
        }}
      >
        <div style={{ fontSize: 44, marginBottom: 20 }}>👋</div>
        <h2
          style={{
            margin: "0 0 10px",
            fontSize: 22,
            fontWeight: 800,
            color: "#0D1B4B",
            letterSpacing: "-0.3px",
          }}
        >
          Willkommen zur BankAcademy Demo!
        </h2>
        <p
          style={{
            margin: "0 0 28px",
            fontSize: 14,
            color: "#6b7280",
            lineHeight: 1.7,
          }}
        >
          Du hast Zugang zu 8 Modulen aus Front Office und Back Office.
          <br />
          Erlebe wie BankAcademy funktioniert.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 16, textAlign: "left" }}>
          <input
            type="text"
            placeholder="Vorname *"
            value={vorname}
            onChange={e => { setVorname(e.target.value); setError(""); }}
            style={{
              padding: "12px 16px",
              borderRadius: 10,
              border: "1.5px solid #e5e7eb",
              fontSize: 14,
              color: "#111827",
              outline: "none",
              fontFamily: "inherit",
            }}
          />
          <input
            type="email"
            placeholder="E-Mail *"
            value={email}
            onChange={e => { setEmail(e.target.value); setError(""); }}
            onKeyDown={e => e.key === "Enter" && start()}
            style={{
              padding: "12px 16px",
              borderRadius: 10,
              border: "1.5px solid #e5e7eb",
              fontSize: 14,
              color: "#111827",
              outline: "none",
              fontFamily: "inherit",
            }}
          />
          {error && (
            <p style={{ margin: 0, fontSize: 12, color: "#ef4444" }}>{error}</p>
          )}
        </div>

        <button
          onClick={start}
          disabled={loading}
          style={{
            width: "100%",
            padding: "14px 24px",
            borderRadius: 100,
            background: loading ? "#9ca3af" : "#0D1B4B",
            color: "#fff",
            fontSize: 15,
            fontWeight: 700,
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "opacity 0.15s",
          }}
          onMouseEnter={e => { if (!loading) (e.currentTarget as HTMLButtonElement).style.opacity = "0.88"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = "1"; }}
        >
          {loading ? "Wird gestartet…" : "Demo starten →"}
        </button>

        <p style={{ margin: "12px 0 0", fontSize: 11, color: "#9ca3af" }}>
          Deine E-Mail wird nur intern gespeichert und nicht weitergegeben.
        </p>
      </div>
    </div>
  );
}
