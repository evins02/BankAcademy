"use client";

import { useEffect, useState } from "react";

export function DemoOnboardingModal() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem("demo-seen") !== "true") setShow(true);
    } catch {}
  }, []);

  function start() {
    try {
      localStorage.setItem("demo-seen", "true");
    } catch {}
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
            margin: "0 0 14px",
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
            margin: "0 0 32px",
            fontSize: 14,
            color: "#6b7280",
            lineHeight: 1.7,
          }}
        >
          Du hast Zugang zu 8 Modulen aus Front Office und Back Office.
          <br />
          Erlebe wie BankAcademy funktioniert.
        </p>
        <button
          onClick={start}
          style={{
            width: "100%",
            padding: "14px 24px",
            borderRadius: 100,
            background: "#0D1B4B",
            color: "#fff",
            fontSize: 15,
            fontWeight: 700,
            border: "none",
            cursor: "pointer",
            transition: "opacity 0.15s",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "0.88"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "1"; }}
        >
          Demo starten →
        </button>
      </div>
    </div>
  );
}
