"use client";

import { useEffect, useState, useCallback } from "react";
import type { StudentSummary } from "@/app/api/berufsbildner/students/route";

// Design tokens
const N = "#0A1628";
const NM = "#0D1F3C";
const CY = "#00D4B8";
const PU = "#7B6FE8";
const WH = "#F8FAFC";
const WD = "rgba(248,250,252,0.65)";
const WM = "rgba(248,250,252,0.38)";
const BR = "rgba(255,255,255,0.08)";
const CB = "rgba(255,255,255,0.04)";

const BB_SESSION_KEY = "bb-session";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function relativeDate(isoString: string | null): string {
  if (!isoString) return "–";
  const diff = Date.now() - new Date(isoString).getTime();
  const d = Math.floor(diff / 86400000);
  if (d === 0) return "Heute";
  if (d === 1) return "Gestern";
  if (d < 7) return `vor ${d} Tagen`;
  if (d < 30) return `vor ${Math.floor(d / 7)} Wo.`;
  return `vor ${Math.floor(d / 30)} Mo.`;
}

function lehrjahrLabel(lj: string | null): string {
  if (!lj) return "–";
  const map: Record<string, string> = {
    lj1: "1. Lehrjahr",
    lj2: "2. Lehrjahr",
    lj3: "3. Lehrjahr",
    quereinsteiger: "Quereinsteiger",
  };
  return map[lj] ?? lj;
}

function avgAccuracy(analytics: StudentSummary["moduleAnalytics"]): number {
  const entries = Object.values(analytics).filter((m) => m.completed > 0);
  if (entries.length === 0) return 0;
  return Math.round(entries.reduce((s, m) => s + m.accuracy, 0) / entries.length);
}

function weakModules(analytics: StudentSummary["moduleAnalytics"]): string[] {
  return Object.entries(analytics)
    .filter(([, m]) => m.accuracy < 70 && m.completed >= 2)
    .map(([id]) => id);
}

function isActiveThisWeek(lastLogin: string | null): boolean {
  if (!lastLogin) return false;
  return Date.now() - new Date(lastLogin).getTime() < 7 * 86400000;
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function AccuracyBadge({ value }: { value: number }) {
  const color = value >= 80 ? CY : value >= 60 ? "#F59E0B" : "#EF4444";
  return (
    <span
      style={{
        background: `${color}22`,
        color,
        border: `1px solid ${color}44`,
        borderRadius: 20,
        padding: "2px 10px",
        fontSize: 12,
        fontWeight: 700,
      }}
    >
      {value}%
    </span>
  );
}

function StudentRow({ student }: { student: StudentSummary }) {
  const [expanded, setExpanded] = useState(false);
  const acc = avgAccuracy(student.moduleAnalytics);
  const weak = weakModules(student.moduleAnalytics);
  const moduleEntries = Object.entries(student.moduleAnalytics);

  return (
    <div
      style={{
        background: CB,
        border: `1px solid ${BR}`,
        borderRadius: 12,
        overflow: "hidden",
        marginBottom: 8,
      }}
    >
      {/* Main row */}
      <button
        onClick={() => setExpanded((p) => !p)}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 100px 120px 80px 80px 90px 60px 32px",
          gap: 8,
          width: "100%",
          padding: "12px 16px",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          alignItems: "center",
          textAlign: "left",
          color: WH,
        }}
      >
        <div>
          {student.onboardingPending ? (
            <span style={{ color: WM, fontSize: 13, fontStyle: "italic" }}>
              Onboarding ausstehend
            </span>
          ) : (
            <span style={{ fontSize: 14, fontWeight: 600, color: WH }}>
              {student.name ?? "–"}
            </span>
          )}
        </div>
        <div style={{ fontSize: 12, color: WD }}>{lehrjahrLabel(student.lehrjahr)}</div>
        <div style={{ fontSize: 12, color: WD }}>{student.abteilung ?? "–"}</div>
        <div style={{ fontSize: 13, fontWeight: 600, color: WH }}>{student.scenariosCompleted}</div>
        <div>
          {student.onboardingPending ? (
            <span style={{ color: WM, fontSize: 12 }}>–</span>
          ) : (
            <AccuracyBadge value={acc} />
          )}
        </div>
        <div style={{ fontSize: 12, color: WD }}>{relativeDate(student.lastLogin)}</div>
        <div>
          {weak.length > 0 ? (
            <span
              style={{
                background: "#EF444422",
                color: "#EF4444",
                border: "1px solid #EF444444",
                borderRadius: 20,
                padding: "2px 8px",
                fontSize: 11,
                fontWeight: 700,
              }}
            >
              {weak.length}
            </span>
          ) : (
            <span style={{ color: WM, fontSize: 12 }}>–</span>
          )}
        </div>
        <div style={{ color: WM, fontSize: 16 }}>{expanded ? "▲" : "▼"}</div>
      </button>

      {/* Expanded module breakdown */}
      {expanded && moduleEntries.length > 0 && (
        <div
          style={{
            borderTop: `1px solid ${BR}`,
            padding: "12px 16px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: 8,
          }}
        >
          {moduleEntries.map(([modId, m]) => (
            <div
              key={modId}
              style={{
                background: BR,
                borderRadius: 8,
                padding: "8px 12px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: WH }}>{modId}</div>
                <div style={{ fontSize: 11, color: WM }}>
                  {m.completed}/{m.total} abgeschlossen
                </div>
              </div>
              <AccuracyBadge value={m.accuracy} />
            </div>
          ))}
        </div>
      )}

      {expanded && moduleEntries.length === 0 && (
        <div
          style={{
            borderTop: `1px solid ${BR}`,
            padding: "12px 16px",
            color: WM,
            fontSize: 13,
          }}
        >
          Noch keine Modulaktivität
        </div>
      )}
    </div>
  );
}

// ─── Login form ───────────────────────────────────────────────────────────────

function LoginForm({ onLogin }: { onLogin: (token: string, bank: string) => void }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/berufsbildner/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      if (data.valid) {
        onLogin(data.token, data.bank);
      } else {
        setError("Ungültiger Code. Bitte erneut versuchen.");
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
        background: N,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 420,
          background: NM,
          borderRadius: 20,
          border: `1px solid ${BR}`,
          padding: "40px 32px",
        }}
      >
        {/* Logo / Brand */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 16,
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: `linear-gradient(135deg, ${CY}, ${PU})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
              }}
            >
              🏦
            </div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 800, color: WH, letterSpacing: -0.5 }}>
                BankAcademy
              </div>
              <div style={{ fontSize: 11, color: WM, letterSpacing: 1, textTransform: "uppercase" }}>
                Berufsbildner-Zugang
              </div>
            </div>
          </div>
          <p style={{ fontSize: 13, color: WM, lineHeight: 1.5, margin: 0 }}>
            Geben Sie Ihren Berufsbildner-Code ein, um die Lernfortschritte Ihrer Lernenden einzusehen.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <label style={{ display: "block", marginBottom: 6, fontSize: 12, fontWeight: 600, color: WD, textTransform: "uppercase", letterSpacing: 0.5 }}>
            Berufsbildner-Code
          </label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="BB-XXXXXXXX"
            autoFocus
            required
            style={{
              width: "100%",
              background: BR,
              border: `1px solid ${BR}`,
              borderRadius: 10,
              padding: "12px 14px",
              fontSize: 15,
              color: WH,
              outline: "none",
              boxSizing: "border-box",
              letterSpacing: 1,
            }}
          />
          {error && (
            <p style={{ marginTop: 8, fontSize: 12, color: "#EF4444" }}>{error}</p>
          )}
          <button
            type="submit"
            disabled={loading || !code.trim()}
            style={{
              marginTop: 16,
              width: "100%",
              background: loading || !code.trim() ? BR : `linear-gradient(135deg, ${CY}, ${PU})`,
              border: "none",
              borderRadius: 10,
              padding: "13px 0",
              fontSize: 14,
              fontWeight: 700,
              color: loading || !code.trim() ? WM : N,
              cursor: loading || !code.trim() ? "not-allowed" : "pointer",
              transition: "opacity 0.2s",
            }}
          >
            {loading ? "Prüfe Code…" : "Einloggen"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

function Dashboard({ token, bank, onLogout }: { token: string; bank: string; onLogout: () => void }) {
  const [students, setStudents] = useState<StudentSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchStudents = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/berufsbildner/students", {
        headers: { "x-bb-token": token },
      });
      if (!res.ok) {
        setError("Fehler beim Laden der Daten.");
        return;
      }
      const data = await res.json();
      setStudents(data.students ?? []);
    } catch {
      setError("Verbindungsfehler.");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  // Stats
  const totalLernende = students.length;
  const avgAcc =
    students.length === 0
      ? 0
      : Math.round(students.reduce((s, st) => s + avgAccuracy(st.moduleAnalytics), 0) / students.length);
  const activeCount = students.filter((st) => isActiveThisWeek(st.lastLogin)).length;

  // Find bank's access code (first matching BANK_CODES entry matching bank name)
  const [accessCode, setAccessCode] = useState("");
  useEffect(() => {
    // We can't expose env vars client-side, so just show "Wenden Sie sich an Ihren Administrator"
    setAccessCode("(bei Administrator anfragen)");
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: N, color: WH }}>
      {/* Header */}
      <div
        style={{
          background: NM,
          borderBottom: `1px solid ${BR}`,
          padding: "0 24px",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            height: 64,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: `linear-gradient(135deg, ${CY}, ${PU})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              flexShrink: 0,
            }}
          >
            🏦
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: WH, letterSpacing: -0.3 }}>
              BankAcademy — Berufsbildner-Übersicht
            </div>
            <div style={{ fontSize: 11, color: WM }}>{bank}</div>
          </div>
          <button
            onClick={onLogout}
            style={{
              background: BR,
              border: `1px solid ${BR}`,
              borderRadius: 8,
              padding: "6px 14px",
              fontSize: 12,
              fontWeight: 600,
              color: WD,
              cursor: "pointer",
            }}
          >
            Abmelden
          </button>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 24px 48px" }}>
        {/* Stats row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 16,
            marginBottom: 32,
          }}
        >
          {[
            { label: "Total Lernende", value: totalLernende, icon: "👥" },
            { label: "Ø Genauigkeit", value: `${avgAcc}%`, icon: "🎯" },
            { label: "Aktiv diese Woche", value: activeCount, icon: "⚡" },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                background: NM,
                border: `1px solid ${BR}`,
                borderRadius: 16,
                padding: "20px 20px",
              }}
            >
              <div style={{ fontSize: 24, marginBottom: 8 }}>{stat.icon}</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: WH, letterSpacing: -1 }}>
                {loading ? "…" : stat.value}
              </div>
              <div style={{ fontSize: 12, color: WM, marginTop: 2 }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div
          style={{
            background: NM,
            border: `1px solid ${BR}`,
            borderRadius: 16,
            overflow: "hidden",
            marginBottom: 32,
          }}
        >
          {/* Table header */}
          <div style={{ padding: "16px 16px 0" }}>
            <h2 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: WH }}>
              Lernende — {bank}
            </h2>
          </div>

          {/* Column labels */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 100px 120px 80px 80px 90px 60px 32px",
              gap: 8,
              padding: "10px 16px",
              borderBottom: `1px solid ${BR}`,
            }}
          >
            {["Name", "Lehrjahr", "Abteilung", "Szenarien", "Genauigkeit", "Letzter Login", "Schwach", ""].map(
              (h) => (
                <div
                  key={h}
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: WM,
                    textTransform: "uppercase",
                    letterSpacing: 0.5,
                  }}
                >
                  {h}
                </div>
              )
            )}
          </div>

          <div style={{ padding: "12px 8px" }}>
            {loading ? (
              <div style={{ textAlign: "center", padding: "32px 0", color: WM, fontSize: 13 }}>
                Lade Daten…
              </div>
            ) : error ? (
              <div style={{ textAlign: "center", padding: "32px 0", color: "#EF4444", fontSize: 13 }}>
                {error}
                <br />
                <button
                  onClick={fetchStudents}
                  style={{
                    marginTop: 8,
                    background: BR,
                    border: `1px solid ${BR}`,
                    borderRadius: 8,
                    padding: "6px 14px",
                    fontSize: 12,
                    color: WD,
                    cursor: "pointer",
                  }}
                >
                  Erneut versuchen
                </button>
              </div>
            ) : students.length === 0 ? (
              <div style={{ textAlign: "center", padding: "32px 0", color: WM, fontSize: 13 }}>
                Noch keine Lernenden für {bank} registriert.
              </div>
            ) : (
              students.map((s) => <StudentRow key={s.clerk_user_id} student={s} />)
            )}
          </div>
        </div>

        {/* CTA: Lernenden einladen */}
        <div
          style={{
            background: NM,
            border: `1px solid ${BR}`,
            borderRadius: 16,
            padding: "24px",
          }}
        >
          <h3 style={{ margin: "0 0 8px", fontSize: 15, fontWeight: 700, color: WH }}>
            Lernenden einladen
          </h3>
          <p style={{ margin: "0 0 16px", fontSize: 13, color: WM, lineHeight: 1.5 }}>
            Teilen Sie diesen Zugangscode mit Ihren Lernenden, damit sie sich bei BankAcademy registrieren können.
          </p>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              background: BR,
              border: `1px solid ${CY}44`,
              borderRadius: 10,
              padding: "10px 16px",
            }}
          >
            <span style={{ fontSize: 11, color: WM, textTransform: "uppercase", letterSpacing: 0.5 }}>
              Zugangscode
            </span>
            <span style={{ fontSize: 15, fontWeight: 800, color: CY, letterSpacing: 1 }}>
              {accessCode}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BerufsbildnerPage() {
  const [session, setSession] = useState<{ token: string; bank: string } | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(BB_SESSION_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.token && parsed.bank) {
          setSession(parsed);
        }
      }
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  function handleLogin(token: string, bank: string) {
    const s = { token, bank };
    try {
      localStorage.setItem(BB_SESSION_KEY, JSON.stringify(s));
    } catch {
      // ignore
    }
    setSession(s);
  }

  function handleLogout() {
    try {
      localStorage.removeItem(BB_SESSION_KEY);
    } catch {
      // ignore
    }
    setSession(null);
  }

  if (!hydrated) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: N,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: WM,
          fontSize: 14,
        }}
      >
        Laden…
      </div>
    );
  }

  if (!session) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return <Dashboard token={session.token} bank={session.bank} onLogout={handleLogout} />;
}
