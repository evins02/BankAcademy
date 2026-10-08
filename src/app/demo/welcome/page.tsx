"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BankingLabLogo } from "@/components/shared/BankingLabLogo";
import { ChevronRight } from "lucide-react";

function WelcomeForm() {
  const router = useRouter();
  const params = useSearchParams();
  const code = params.get("ref") ?? "";

  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Already went through welcome → go straight to demo
    try {
      if (localStorage.getItem("demo-seen") === "true") router.replace("/demo");
    } catch {}
  }, [router]);

  async function handleStart(e: React.FormEvent) {
    e.preventDefault();
    const v = name.trim();
    if (!v) { setError("Bitte gib deinen Vornamen ein."); return; }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/demo-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: v, code }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError((data as { error?: string }).error ?? "Ungültiger Code.");
        setLoading(false);
        return;
      }

      try {
        localStorage.setItem("demo-seen", "true");
        localStorage.setItem("demo-vorname", v);
      } catch {}

      router.push("/demo");
    } catch {
      setError("Verbindungsfehler – bitte nochmal versuchen.");
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0D1B4B 0%, #1a2d6e 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 24,
          padding: "48px 40px",
          maxWidth: 420,
          width: "100%",
          textAlign: "center",
          boxShadow: "0 40px 100px rgba(0,0,0,0.25)",
        }}
      >
        <div style={{ marginBottom: 28 }}>
          <BankingLabLogo size="md" />
        </div>

        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            background: "#fef3c7",
            color: "#92400e",
            borderRadius: 100,
            padding: "4px 14px",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            marginBottom: 20,
          }}
        >
          Demo-Zugang
        </div>

        <h1
          style={{
            margin: "0 0 10px",
            fontSize: 24,
            fontWeight: 800,
            color: "#0D1B4B",
            letterSpacing: "-0.3px",
          }}
        >
          Wie heisst du?
        </h1>
        <p
          style={{
            margin: "0 0 32px",
            fontSize: 14,
            color: "#6b7280",
            lineHeight: 1.7,
          }}
        >
          Gib deinen Vornamen ein — fertig.
          <br />
          Keine Registrierung, keine E-Mail.
        </p>

        <form onSubmit={handleStart} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <input
            type="text"
            autoFocus
            placeholder="Dein Vorname"
            value={name}
            onChange={(e) => { setName(e.target.value); setError(""); }}
            style={{
              padding: "14px 18px",
              borderRadius: 12,
              border: `1.5px solid ${error ? "#ef4444" : "#e5e7eb"}`,
              fontSize: 16,
              color: "#111827",
              outline: "none",
              fontFamily: "inherit",
              textAlign: "center",
            }}
          />
          {error && (
            <p style={{ margin: 0, fontSize: 13, color: "#ef4444" }}>{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              padding: "15px 24px",
              borderRadius: 100,
              background: loading ? "#9ca3af" : "#0D1B4B",
              color: "#fff",
              fontSize: 15,
              fontWeight: 700,
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "opacity 0.15s",
              marginTop: 4,
            }}
            onMouseEnter={(e) => { if (!loading) (e.currentTarget as HTMLButtonElement).style.opacity = "0.88"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "1"; }}
          >
            {loading ? "Wird gestartet…" : <>Demo starten <ChevronRight size={15} /></>}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function WelcomePage() {
  return (
    <Suspense>
      <WelcomeForm />
    </Suspense>
  );
}
