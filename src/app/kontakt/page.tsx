"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { ContactForms } from "@/components/shared/ContactForms";

export default function KontaktPage() {
  return (
    <>
      <style>{`* { box-sizing: border-box; } body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }`}</style>

      <div style={{ minHeight: "100vh", background: "#F5F6FA", display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <header style={{ background: "#0A1628", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.5px", color: "#fff", textDecoration: "none" }}>
            Bank<span style={{ color: "#00D4B8" }}>Academy</span>
          </Link>
          <Link
            href="/dashboard"
            style={{ padding: "8px 18px", borderRadius: 100, fontSize: 13, fontWeight: 700, background: "#00D4B8", color: "#0A1628", textDecoration: "none" }}
          >
            Zur App →
          </Link>
        </header>

        {/* Back link */}
        <div style={{ maxWidth: 640, margin: "28px auto 0", width: "100%", padding: "0 24px" }}>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 14, color: "#6b7280", textDecoration: "none" }}>
            <ChevronLeft size={15} /> Zurück zur Startseite
          </Link>
        </div>

        {/* Card */}
        <main style={{ flex: 1, display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "24px 24px 64px" }}>
          <div style={{
            width: "100%", maxWidth: 640,
            background: "#fff", border: "1px solid #e5e7eb",
            borderRadius: 24, padding: "44px 40px",
            boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
          }}>
            <ContactForms />
          </div>
        </main>

        <footer style={{ textAlign: "center", padding: "20px 24px", fontSize: 13, color: "#9ca3af", borderTop: "1px solid #e5e7eb", background: "#fff" }}>
          © 2026 BankAcademy · Der digitale Praxisausbildner für die Banklehre
        </footer>
      </div>
    </>
  );
}
