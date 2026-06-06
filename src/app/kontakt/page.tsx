"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, CheckCircle2 } from "lucide-react";

export default function KontaktPage() {
  const [form, setForm] = useState({ name: "", email: "", nachricht: "" });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Bitte gib deinen Namen ein.";
    if (!form.email.trim()) e.email = "Bitte gib deine E-Mail ein.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Bitte gib eine gültige E-Mail ein.";
    if (!form.nachricht.trim()) e.nachricht = "Bitte schreib uns eine Nachricht.";
    return e;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const v = validate();
    if (Object.keys(v).length > 0) {
      setErrors(v);
      return;
    }
    setSubmitted(true);
    setForm({ name: "", email: "", nachricht: "" });
    setErrors({});
  }

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
      `}</style>

      <div style={{ minHeight: "100vh", background: "#F5F6FA", display: "flex", flexDirection: "column" }}>
        {/* Top bar */}
        <header style={{ background: "#0D1B4B", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link
            href="/"
            style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.5px", color: "#fff", textDecoration: "none" }}
          >
            Bank<span style={{ color: "#00C9B1" }}>Academy</span>
          </Link>
          <Link
            href="/dashboard"
            style={{
              padding: "8px 18px",
              borderRadius: 100,
              fontSize: 13,
              fontWeight: 700,
              background: "#00C9B1",
              color: "#0D1B4B",
              textDecoration: "none",
            }}
          >
            Zur App →
          </Link>
        </header>

        {/* Back link */}
        <div style={{ maxWidth: 560, margin: "32px auto 0", width: "100%", padding: "0 24px" }}>
          <Link
            href="/"
            style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 14, color: "#6b7280", textDecoration: "none" }}
          >
            <ChevronLeft size={15} /> Zurück zur Startseite
          </Link>
        </div>

        {/* Card */}
        <main style={{ flex: 1, display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "24px 24px 64px" }}>
          <div
            style={{
              width: "100%",
              maxWidth: 560,
              background: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: 24,
              padding: "48px 40px",
              boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
            }}
          >
            {submitted ? (
              /* Success state */
              <div style={{ textAlign: "center", padding: "24px 0" }}>
                <div
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: "50%",
                    background: "#d1fae5",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 24px",
                    animation: "popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                  }}
                >
                  <CheckCircle2 size={36} color="#059669" />
                </div>
                <h1 style={{ margin: "0 0 12px", fontSize: 24, fontWeight: 800, color: "#111827" }}>
                  Danke für deine Nachricht!
                </h1>
                <p style={{ margin: "0 0 32px", fontSize: 16, color: "#6b7280", lineHeight: 1.6 }}>
                  Wir melden uns bald bei dir.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  style={{
                    padding: "11px 28px",
                    borderRadius: 100,
                    fontSize: 14,
                    fontWeight: 700,
                    background: "#0D1B4B",
                    color: "#fff",
                    border: "none",
                    cursor: "pointer",
                    transition: "opacity 0.15s",
                  }}
                >
                  Weitere Nachricht senden
                </button>
              </div>
            ) : (
              /* Form state */
              <>
                <div style={{ marginBottom: 40 }}>
                  <h1 style={{ margin: "0 0 8px", fontSize: 32, fontWeight: 800, letterSpacing: "-0.5px", color: "#0D1B4B" }}>
                    Kontakt
                  </h1>
                  <p style={{ margin: 0, fontSize: 16, color: "#6b7280", lineHeight: 1.6 }}>
                    Schreib uns –{" "}
                    <br className="hidden sm:block" />
                    wir freuen uns von dir zu hören.
                  </p>
                </div>

                <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      style={{ display: "block", marginBottom: 6, fontSize: 14, fontWeight: 600, color: "#374151" }}
                    >
                      Dein Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      placeholder="Max Mustermann"
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        borderRadius: 12,
                        border: errors.name ? "1.5px solid #ef4444" : "1.5px solid #e5e7eb",
                        fontSize: 15,
                        color: "#111827",
                        background: "#fff",
                        outline: "none",
                        transition: "border-color 0.15s",
                      }}
                      onFocus={(e) => { if (!errors.name) e.currentTarget.style.borderColor = "#0D1B4B"; }}
                      onBlur={(e) => { if (!errors.name) e.currentTarget.style.borderColor = "#e5e7eb"; }}
                    />
                    {errors.name && (
                      <p style={{ margin: "6px 0 0", fontSize: 13, color: "#ef4444" }}>{errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      style={{ display: "block", marginBottom: 6, fontSize: 14, fontWeight: 600, color: "#374151" }}
                    >
                      Deine E-Mail
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      placeholder="max@beispiel.ch"
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        borderRadius: 12,
                        border: errors.email ? "1.5px solid #ef4444" : "1.5px solid #e5e7eb",
                        fontSize: 15,
                        color: "#111827",
                        background: "#fff",
                        outline: "none",
                        transition: "border-color 0.15s",
                      }}
                      onFocus={(e) => { if (!errors.email) e.currentTarget.style.borderColor = "#0D1B4B"; }}
                      onBlur={(e) => { if (!errors.email) e.currentTarget.style.borderColor = "#e5e7eb"; }}
                    />
                    {errors.email && (
                      <p style={{ margin: "6px 0 0", fontSize: 13, color: "#ef4444" }}>{errors.email}</p>
                    )}
                  </div>

                  {/* Nachricht */}
                  <div>
                    <label
                      htmlFor="nachricht"
                      style={{ display: "block", marginBottom: 6, fontSize: 14, fontWeight: 600, color: "#374151" }}
                    >
                      Deine Nachricht
                    </label>
                    <textarea
                      id="nachricht"
                      value={form.nachricht}
                      onChange={(e) => setForm((f) => ({ ...f, nachricht: e.target.value }))}
                      placeholder="Schreib uns..."
                      rows={6}
                      style={{
                        width: "100%",
                        minHeight: 150,
                        padding: "12px 16px",
                        borderRadius: 12,
                        border: errors.nachricht ? "1.5px solid #ef4444" : "1.5px solid #e5e7eb",
                        fontSize: 15,
                        color: "#111827",
                        background: "#fff",
                        outline: "none",
                        resize: "vertical",
                        fontFamily: "inherit",
                        transition: "border-color 0.15s",
                      }}
                      onFocus={(e) => { if (!errors.nachricht) e.currentTarget.style.borderColor = "#0D1B4B"; }}
                      onBlur={(e) => { if (!errors.nachricht) e.currentTarget.style.borderColor = "#e5e7eb"; }}
                    />
                    {errors.nachricht && (
                      <p style={{ margin: "6px 0 0", fontSize: 13, color: "#ef4444" }}>{errors.nachricht}</p>
                    )}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    style={{
                      width: "100%",
                      padding: "14px 24px",
                      borderRadius: 100,
                      fontSize: 15,
                      fontWeight: 700,
                      background: "#0D1B4B",
                      color: "#fff",
                      border: "none",
                      cursor: "pointer",
                      transition: "opacity 0.15s, transform 0.15s",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.9"; e.currentTarget.style.transform = "scale(1.01)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "scale(1)"; }}
                  >
                    Nachricht senden →
                  </button>
                </form>
              </>
            )}
          </div>
        </main>

        {/* Footer */}
        <footer style={{ textAlign: "center", padding: "24px", fontSize: 13, color: "#9ca3af", borderTop: "1px solid #e5e7eb", background: "#fff" }}>
          © 2026 BankAcademy · Der digitale Praxisausbildner für die Banklehre 🇨🇭
        </footer>
      </div>

      <style>{`
        @keyframes popIn {
          0% { transform: scale(0.5); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        input::placeholder, textarea::placeholder { color: #9ca3af; }
      `}</style>
    </>
  );
}
