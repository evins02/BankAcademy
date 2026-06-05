"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronRight, Menu, X } from "lucide-react";

/* ─── Hooks ───────────────────────────────────────────────────────────────── */

function useScrolled(threshold = 20) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, [threshold]);
  return scrolled;
}

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function useCountUp(target: number, active: boolean) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!active) return;
    const steps = 80;
    let i = 0;
    const id = setInterval(() => {
      i++;
      setV(Math.round(target * (1 - Math.pow(1 - i / steps, 3))));
      if (i >= steps) {
        setV(target);
        clearInterval(id);
      }
    }, 22);
    return () => clearInterval(id);
  }, [target, active]);
  return v;
}

/* ─── Animated wrapper ────────────────────────────────────────────────────── */

function FadeIn({
  children,
  delay = 0,
  className = "",
  style: extraStyle,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(36px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
        ...extraStyle,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Navbar ──────────────────────────────────────────────────────────────── */

const NAV_ITEMS = [
  { label: "Features", id: "features" },
  { label: "Module", id: "module" },
  { label: "Für Banken", id: "fuer-banken" },
  { label: "Preise", id: "preise" },
];

function Navbar({
  scrolled,
  mobileOpen,
  onToggle,
  onNav,
}: {
  scrolled: boolean;
  mobileOpen: boolean;
  onToggle: () => void;
  onNav: (id: string) => void;
}) {
  return (
    <header
      style={{
        position: "fixed",
        inset: "0 0 auto 0",
        zIndex: 50,
        transition: "all 0.3s ease",
        background: scrolled ? "rgba(13,27,75,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "none",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
        >
          <span style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.5px", color: "#fff" }}>
            Bank<span style={{ color: "#00C9B1" }}>Academy</span>
          </span>
        </button>

        {/* Desktop nav */}
        <nav style={{ display: "flex", gap: 4, alignItems: "center" }} className="hidden md:flex">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => onNav(item.id)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "8px 16px",
                borderRadius: 8,
                fontSize: 14,
                color: "rgba(255,255,255,0.65)",
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLButtonElement).style.color = "#fff";
                (e.target as HTMLButtonElement).style.background = "rgba(255,255,255,0.06)";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLButtonElement).style.color = "rgba(255,255,255,0.65)";
                (e.target as HTMLButtonElement).style.background = "transparent";
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div style={{ display: "flex", gap: 12, alignItems: "center" }} className="hidden md:flex">
          <Link
            href="/dashboard"
            style={{
              padding: "8px 18px",
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 500,
              color: "rgba(255,255,255,0.75)",
              textDecoration: "none",
              transition: "color 0.15s",
            }}
          >
            Einloggen
          </Link>
          <Link
            href="/dashboard"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "9px 20px",
              borderRadius: 100,
              fontSize: 14,
              fontWeight: 700,
              background: "#00C9B1",
              color: "#0D1B4B",
              textDecoration: "none",
              transition: "transform 0.15s, box-shadow 0.15s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.04)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 20px rgba(0,201,177,0.4)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
            }}
          >
            Kostenlos starten <ChevronRight size={14} />
          </Link>
        </div>

        {/* Hamburger */}
        <button
          onClick={onToggle}
          className="md:hidden"
          style={{
            background: "none",
            border: "none",
            color: "#fff",
            cursor: "pointer",
            padding: 8,
            borderRadius: 8,
          }}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden"
          style={{
            background: "#0D1B4B",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            padding: "16px 24px 24px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => onNav(item.id)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "12px 16px",
                  borderRadius: 10,
                  fontSize: 15,
                  color: "rgba(255,255,255,0.65)",
                  textAlign: "left",
                }}
              >
                {item.label}
              </button>
            ))}
            <div style={{ marginTop: 12, borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
              <Link
                href="/dashboard"
                style={{
                  display: "block",
                  padding: "12px 16px",
                  borderRadius: 12,
                  border: "1px solid rgba(255,255,255,0.2)",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#fff",
                  textAlign: "center",
                  textDecoration: "none",
                }}
              >
                Einloggen
              </Link>
              <Link
                href="/dashboard"
                style={{
                  display: "block",
                  padding: "12px 16px",
                  borderRadius: 100,
                  fontSize: 14,
                  fontWeight: 700,
                  background: "#00C9B1",
                  color: "#0D1B4B",
                  textAlign: "center",
                  textDecoration: "none",
                }}
              >
                Kostenlos starten →
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

/* ─── App mockup ──────────────────────────────────────────────────────────── */

function AppMockup() {
  return (
    <div
      id="mockup"
      className="hidden sm:block"
      style={{ position: "relative", maxWidth: 860, margin: "60px auto 0", padding: "0 24px" }}
    >
      {/* Glow */}
      <div
        style={{
          position: "absolute",
          bottom: -40,
          left: "50%",
          transform: "translateX(-50%)",
          width: "60%",
          height: 160,
          borderRadius: "50%",
          background: "#00C9B1",
          opacity: 0.15,
          filter: "blur(48px)",
          pointerEvents: "none",
        }}
      />

      {/* Browser */}
      <div
        style={{
          borderRadius: 18,
          overflow: "hidden",
          boxShadow: "0 0 0 1px rgba(255,255,255,0.07), 0 40px 100px rgba(0,0,0,0.65)",
          animation: "mockupFloat 6s ease-in-out infinite",
          transform: "perspective(1400px) rotateX(4deg)",
        }}
      >
        {/* Chrome bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            background: "#111827",
            padding: "10px 16px",
          }}
        >
          <div style={{ display: "flex", gap: 6 }}>
            <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#ef4444", display: "inline-block" }} />
            <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#fbbf24", display: "inline-block" }} />
            <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
          </div>
          <div
            style={{
              flex: 1,
              maxWidth: 300,
              margin: "0 auto",
              background: "#1f2937",
              borderRadius: 6,
              padding: "5px 12px",
              display: "flex",
              alignItems: "center",
              gap: 7,
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
            <span style={{ fontSize: 11, color: "#9ca3af" }}>app.bankacademy.ch/dashboard</span>
          </div>
        </div>

        {/* App UI */}
        <div style={{ display: "flex", height: 280, background: "#F8F9FD", overflow: "hidden" }}>
          {/* Sidebar */}
          <div style={{ width: 168, flexShrink: 0, background: "#0D1B4B", padding: "12px 10px", display: "flex", flexDirection: "column", gap: 2 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "6px 10px", marginBottom: 10 }}>
              <span style={{ width: 20, height: 20, borderRadius: 6, background: "#00C9B1", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 8, fontWeight: 900, color: "#0D1B4B" }}>BA</span>
              <span style={{ fontSize: 11, fontWeight: 800, color: "#fff", letterSpacing: "-0.3px" }}>BankAcademy</span>
            </div>
            {[
              { label: "Dashboard", active: true },
              { label: "Privatkunde", active: false },
              { label: "Firmenkunde", active: false },
              { label: "Back Office", active: false },
              { label: "Statistiken", active: false },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  borderRadius: 8,
                  padding: "7px 10px",
                  fontSize: 10,
                  fontWeight: item.active ? 600 : 400,
                  color: item.active ? "#00C9B1" : "rgba(255,255,255,0.38)",
                  background: item.active ? "rgba(0,201,177,0.13)" : "transparent",
                }}
              >
                {item.label}
              </div>
            ))}
          </div>

          {/* Main content */}
          <div style={{ flex: 1, padding: 16, overflow: "hidden" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <div>
                <p style={{ fontSize: 12, fontWeight: 700, color: "#111827", margin: 0 }}>Guten Abend, Max 👋</p>
                <p style={{ fontSize: 10, color: "#9ca3af", margin: "2px 0 0" }}>Bereit für die nächste Einheit?</p>
              </div>
              <span style={{ background: "#fef3c7", color: "#92400e", fontSize: 9, fontWeight: 700, padding: "3px 8px", borderRadius: 100 }}>🔥 12 Tage</span>
            </div>

            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 12 }}>
              {[["105+", "Szenarien"], ["12", "Abgeschlossen"], ["84%", "Genauigkeit"]].map(([n, l]) => (
                <div key={l} style={{ background: "#fff", border: "1px solid #f3f4f6", borderRadius: 12, padding: 8, textAlign: "center", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
                  <p style={{ margin: 0, fontSize: 13, fontWeight: 800, color: "#0D1B4B" }}>{n}</p>
                  <p style={{ margin: "1px 0 0", fontSize: 8, color: "#9ca3af" }}>{l}</p>
                </div>
              ))}
            </div>

            {/* Modules */}
            <p style={{ margin: "0 0 6px", fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#9ca3af" }}>Module</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
              {[
                { name: "Privatkunde", pct: 65, clr: "#00C9B1" },
                { name: "Firmenkunde", pct: 40, clr: "#6C63FF" },
                { name: "Back Office", pct: 80, clr: "#10b981" },
                { name: "Anlagekunde", pct: 20, clr: "#f59e0b" },
              ].map((m) => (
                <div key={m.name} style={{ background: "#fff", border: "1px solid #f3f4f6", borderRadius: 10, padding: "8px 9px" }}>
                  <p style={{ margin: "0 0 5px", fontSize: 9, fontWeight: 600, color: "#374151" }}>{m.name}</p>
                  <div style={{ height: 4, background: "#f3f4f6", borderRadius: 100, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${m.pct}%`, background: m.clr, borderRadius: 100 }} />
                  </div>
                  <p style={{ margin: "3px 0 0", fontSize: 8, color: "#9ca3af" }}>{m.pct}%</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Section: Hero ───────────────────────────────────────────────────────── */

function Hero() {
  return (
    <section
      style={{
        background: "#0D1B4B",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        paddingTop: 96,
        paddingBottom: 64,
      }}
    >
      {/* Grid pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }}
      />
      {/* Radial top glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 90% 55% at 50% -5%, rgba(0,201,177,0.14) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", maxWidth: 840, margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
        {/* Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 9,
            border: "1px solid rgba(0,201,177,0.28)",
            background: "rgba(0,201,177,0.08)",
            borderRadius: 100,
            padding: "8px 18px",
            marginBottom: 28,
            fontSize: 14,
            fontWeight: 500,
            color: "#00C9B1",
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#00C9B1",
              display: "inline-block",
              animation: "pulseDot 2.2s ease-in-out infinite",
            }}
          />
          🇨🇭 Der digitale Praxisausbildner für die Banklehre
        </div>

        {/* Headline */}
        <h1
          style={{
            margin: "0 0 22px",
            fontSize: "clamp(40px, 7vw, 72px)",
            fontWeight: 800,
            lineHeight: 1.08,
            letterSpacing: "-1.5px",
            color: "#fff",
          }}
        >
          Banking lernen –{" "}
          <br />
          <span
            style={{
              background: "linear-gradient(90deg, #00C9B1 0%, #6C63FF 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            wie es wirklich ist.
          </span>
        </h1>

        {/* Subtitle */}
        <p
          style={{
            margin: "0 auto 36px",
            maxWidth: 600,
            fontSize: 18,
            lineHeight: 1.65,
            color: "rgba(255,255,255,0.58)",
          }}
        >
          Realistische Szenarien, typische Fehler und operative Denkweise –
          für Lernende, Praktikanten und Quereinsteiger im Schweizer Banking.
        </p>

        {/* Buttons */}
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12, marginBottom: 28 }}>
          <Link
            href="/dashboard"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "15px 32px",
              borderRadius: 100,
              fontSize: 15,
              fontWeight: 700,
              background: "#00C9B1",
              color: "#0D1B4B",
              textDecoration: "none",
              boxShadow: "0 0 40px rgba(0,201,177,0.35)",
              transition: "transform 0.15s, box-shadow 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.04)";
              e.currentTarget.style.boxShadow = "0 0 55px rgba(0,201,177,0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 0 40px rgba(0,201,177,0.35)";
            }}
          >
            Kostenlos starten <ChevronRight size={17} />
          </Link>
          <button
            onClick={() => document.getElementById("mockup")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              padding: "15px 32px",
              borderRadius: 100,
              fontSize: 15,
              fontWeight: 600,
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.22)",
              color: "#fff",
              cursor: "pointer",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.07)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "transparent";
            }}
          >
            Demo ansehen
          </button>
        </div>

        {/* Trust badges */}
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 24, fontSize: 13, color: "rgba(255,255,255,0.38)" }}>
          {["Kein Konto nötig", "100% kostenlos", "LAP-konform"].map((t) => (
            <span key={t} style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ color: "#00C9B1", fontSize: 14 }}>✓</span> {t}
            </span>
          ))}
        </div>
      </div>

      <AppMockup />

      {/* Bottom fade */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 120,
          background: "linear-gradient(to bottom, transparent, #0D1B4B)",
          pointerEvents: "none",
        }}
      />
    </section>
  );
}

/* ─── Section: Stats bar ──────────────────────────────────────────────────── */

function StatsBar() {
  const { ref, visible } = useInView();
  const c1 = useCountUp(105, visible);
  const c2 = useCountUp(6, visible);
  const c3 = useCountUp(3, visible);

  const STATS = [
    { value: `${c1}+`, label: "Szenarien" },
    { value: String(c2), label: "Module" },
    { value: String(c3), label: "Schwierigkeitsstufen" },
    { value: "🇨🇭", label: "Swiss Made" },
  ];

  return (
    <div
      ref={ref}
      style={{
        background: "#080f2e",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        padding: "40px 24px",
      }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "32px 0" }} className="sm:grid-cols-4">
        {STATS.map((s, i) => (
          <div
            key={s.label}
            style={{
              textAlign: "center",
              borderRight: i < 3 ? "1px solid rgba(255,255,255,0.07)" : "none",
              padding: "0 16px",
            }}
            className={i === 1 ? "sm:border-r" : ""}
          >
            <p style={{ margin: 0, fontSize: "clamp(28px,4vw,40px)", fontWeight: 800, color: "#00C9B1" }}>
              {s.value}
            </p>
            <p style={{ margin: "4px 0 0", fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.45)" }}>
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Section: Problem / Solution ────────────────────────────────────────── */

const PROBLEMS = [
  "Trockene Theorie ohne Praxisbezug",
  "Keine sicheren Übungsmöglichkeiten",
  "Lernstoff aus dem Schulbuch – nicht aus dem Berufsalltag",
  "Kein Feedback bei Fehlern",
  "Typische Fehler werden erst in der Praxis erkannt",
];

const SOLUTIONS = [
  "Realistische Bankszenarien zum Üben",
  "Typische Fehler kennen bevor sie passieren",
  "Operative Denkweise von Experten lernen",
  "Sofortiges erklärendes Feedback",
  "Personalisiert auf Lehrjahr & Schwerpunkt",
];

function ProblemSolution() {
  return (
    <section style={{ background: "#fff", padding: "96px 24px" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <FadeIn className="text-center" style={{ marginBottom: 56 }}>
          <p style={{ margin: "0 0 8px", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#00C9B1" }}>
            Warum BankAcademy
          </p>
          <h2 style={{ margin: 0, fontSize: "clamp(26px,4vw,40px)", fontWeight: 800, letterSpacing: "-0.5px", color: "#111827" }}>
            Die bessere Art zu lernen.
          </h2>
        </FadeIn>

        <div style={{ display: "grid", gap: 24 }} className="sm:grid-cols-2">
          <FadeIn delay={0.1}>
            <div style={{ borderRadius: 20, border: "1px solid #fecaca", background: "#fff8f8", padding: 36, height: "100%" }}>
              <span style={{ display: "inline-block", background: "#fee2e2", color: "#b91c1c", borderRadius: 100, padding: "4px 14px", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 20 }}>
                Das Problem
              </span>
              <h3 style={{ margin: "0 0 24px", fontSize: 20, fontWeight: 700, color: "#111827" }}>
                Klassische Ausbildung hat Lücken.
              </h3>
              <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
                {PROBLEMS.map((p) => (
                  <li key={p} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, color: "#374151", lineHeight: 1.5 }}>
                    <span style={{ flexShrink: 0, marginTop: 1 }}>❌</span> {p}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div style={{ borderRadius: 20, border: "1px solid #a7f3d0", background: "#f0fdf8", padding: 36, height: "100%" }}>
              <span style={{ display: "inline-block", background: "#d1fae5", color: "#065f46", borderRadius: 100, padding: "4px 14px", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 20 }}>
                Die Lösung
              </span>
              <h3 style={{ margin: "0 0 24px", fontSize: 20, fontWeight: 700, color: "#111827" }}>
                Praxis von Tag 1.
              </h3>
              <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
                {SOLUTIONS.map((s) => (
                  <li key={s} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, color: "#374151", lineHeight: 1.5 }}>
                    <span style={{ flexShrink: 0, marginTop: 1 }}>✅</span> {s}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ─── Section: How it works ───────────────────────────────────────────────── */

const HOW_STEPS = [
  {
    num: "01",
    emoji: "📋",
    title: "Szenario erhalten",
    text: "Du bekommst einen realistischen Fall aus dem Schweizer Banking-Alltag – KYC, Kredit, Zahlungsverkehr und mehr.",
  },
  {
    num: "02",
    emoji: "🤔",
    title: "Entscheidung treffen",
    text: "Du analysierst den Fall und triffst Entscheidungen wie in der echten Bank – ohne Konsequenzen.",
  },
  {
    num: "03",
    emoji: "💡",
    title: "Praxis verstehen",
    text: "Du erhältst sofortiges Feedback mit bankinterner Begründung und der operativen Denkweise von Experten.",
  },
];

function HowItWorks() {
  return (
    <section id="how-it-works" style={{ background: "#F5F6FA", padding: "96px 24px" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <FadeIn style={{ textAlign: "center", marginBottom: 60 }}>
          <p style={{ margin: "0 0 8px", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#00C9B1" }}>
            So funktioniert es
          </p>
          <h2 style={{ margin: "0 0 10px", fontSize: "clamp(26px,4vw,40px)", fontWeight: 800, letterSpacing: "-0.5px", color: "#111827" }}>
            In 3 Schritten zum Banking-Profi
          </h2>
        </FadeIn>

        <div style={{ display: "grid", gap: 20 }} className="sm:grid-cols-3">
          {HOW_STEPS.map((step, i) => (
            <FadeIn key={step.num} delay={i * 0.12} style={{ position: "relative" }}>
              <div
                style={{
                  background: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: 20,
                  padding: 32,
                  height: "100%",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    top: 16,
                    right: 20,
                    fontSize: 52,
                    fontWeight: 900,
                    color: "rgba(13,27,75,0.06)",
                    lineHeight: 1,
                    userSelect: "none",
                  }}
                >
                  {step.num}
                </span>
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 16,
                    background: "rgba(13,27,75,0.07)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 28,
                    marginBottom: 20,
                  }}
                >
                  {step.emoji}
                </div>
                <h3 style={{ margin: "0 0 10px", fontSize: 16, fontWeight: 700, color: "#111827" }}>{step.title}</h3>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "#6b7280" }}>{step.text}</p>
              </div>
              {i < HOW_STEPS.length - 1 && (
                <div
                  className="hidden sm:flex"
                  style={{
                    position: "absolute",
                    right: -12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 10,
                    fontSize: 20,
                    color: "#d1d5db",
                  }}
                >
                  →
                </div>
              )}
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Section: Features ───────────────────────────────────────────────────── */

const FEATURE_CARDS = [
  { emoji: "🎯", title: "Praxisnahe Szenarien", text: "105+ Fälle aus dem echten Banking-Alltag – nicht aus dem Lehrbuch" },
  { emoji: "⚠️", title: "Typische Fehler", text: "Lerne die häufigsten Fehler kennen bevor du sie in der Praxis machst" },
  { emoji: "🧠", title: "Operative Denkweise", text: "Verstehe wie erfahrene Banker denken – nicht nur was sie tun" },
  { emoji: "📊", title: "Messbarer Fortschritt", text: "XP, Streaks, Badges und detaillierte Lernstatistiken" },
  { emoji: "🎓", title: "LAP-Vorbereitung", text: "Spezifische Level-3 Szenarien für die Abschlussprüfung" },
  { emoji: "💬", title: "Community", text: "Tausch dich mit anderen Lernenden aus und lerne voneinander" },
];

function Features() {
  return (
    <section id="features" style={{ background: "#fff", padding: "96px 24px" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <FadeIn style={{ textAlign: "center", marginBottom: 56 }}>
          <p style={{ margin: "0 0 8px", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#00C9B1" }}>
            Features
          </p>
          <h2 style={{ margin: 0, fontSize: "clamp(26px,4vw,40px)", fontWeight: 800, letterSpacing: "-0.5px", color: "#111827" }}>
            Was BankAcademy einzigartig macht
          </h2>
        </FadeIn>

        <div style={{ display: "grid", gap: 16 }} className="sm:grid-cols-2 lg:grid-cols-3">
          {FEATURE_CARDS.map((f, i) => (
            <FadeIn key={f.title} delay={i * 0.07}>
              <div
                style={{
                  background: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: 18,
                  padding: "28px 28px 24px",
                  cursor: "default",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  height: "100%",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 32px rgba(0,0,0,0.08)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                }}
              >
                <span style={{ fontSize: 32, display: "block", marginBottom: 16 }}>{f.emoji}</span>
                <h3 style={{ margin: "0 0 8px", fontSize: 15, fontWeight: 700, color: "#111827" }}>{f.title}</h3>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "#6b7280" }}>{f.text}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Section: Modules ────────────────────────────────────────────────────── */

function ModuleItem({ emoji, title, desc }: { emoji: string; title: string; desc: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 14,
        borderRadius: 14,
        border: "1px solid rgba(255,255,255,0.07)",
        background: "rgba(255,255,255,0.04)",
        padding: "16px 18px",
        transition: "background 0.15s",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.07)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.04)";
      }}
    >
      <span style={{ fontSize: 22, flexShrink: 0, marginTop: 1 }}>{emoji}</span>
      <div>
        <p style={{ margin: "0 0 4px", fontSize: 13, fontWeight: 700, color: "#fff" }}>{title}</p>
        <p style={{ margin: 0, fontSize: 12, lineHeight: 1.5, color: "rgba(255,255,255,0.45)" }}>{desc}</p>
      </div>
    </div>
  );
}

function Modules() {
  return (
    <section id="module" style={{ background: "#0D1B4B", padding: "96px 24px" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <FadeIn style={{ textAlign: "center", marginBottom: 56 }}>
          <p style={{ margin: "0 0 8px", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#00C9B1" }}>
            Inhalte
          </p>
          <h2 style={{ margin: 0, fontSize: "clamp(26px,4vw,40px)", fontWeight: 800, letterSpacing: "-0.5px", color: "#fff" }}>
            Alle Module im Überblick
          </h2>
        </FadeIn>

        <div style={{ display: "grid", gap: 40 }} className="sm:grid-cols-2">
          <FadeIn delay={0.1}>
            <p style={{ margin: "0 0 16px", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.35)" }}>
              Front Office
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <ModuleItem emoji="👤" title="Privatkunde" desc="Kontoeröffnung, Sparen & Konto, Zahlungsverkehr, 3a, Hypotheken" />
              <ModuleItem emoji="🏢" title="Firmenkunde" desc="Jahresabschluss, Tragbarkeit, Hypothek Verlängerung" />
              <ModuleItem emoji="📈" title="Anlagekunde" desc="Anlegerprofil, Fonds & ETFs" />
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p style={{ margin: "0 0 16px", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.35)" }}>
              Back Office
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <ModuleItem emoji="⚙️" title="Banking Operations" desc="KYC / Compliance, Zahlungsverkehr, Mahnwesen" />
              <ModuleItem emoji="💳" title="Credit Operations" desc="Vertragserstellung, Auszahlung, Verlängerung, Kündigung" />
            </div>
          </FadeIn>
        </div>

        <FadeIn style={{ textAlign: "center", marginTop: 44 }} delay={0.3}>
          <Link
            href="/dashboard"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              padding: "13px 28px",
              borderRadius: 100,
              fontSize: 14,
              fontWeight: 700,
              background: "#00C9B1",
              color: "#0D1B4B",
              textDecoration: "none",
              transition: "transform 0.15s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.04)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
          >
            Alle Module entdecken <ChevronRight size={15} />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── Section: For Banks ──────────────────────────────────────────────────── */

const B2B_CARDS = [
  { emoji: "📊", title: "Fortschritt verfolgen", text: "Sehen Sie wie Ihre Lernenden vorankommen – Modul für Modul" },
  { emoji: "🎯", title: "Praxisnah & aktuell", text: "Inhalte aus der echten Bankpraxis – abgestimmt auf Schweizer Bankstandards" },
  { emoji: "🚀", title: "Sofort einsatzbereit", text: "Keine Installation, kein Setup – direkt im Browser, überall verfügbar" },
];

function ForBanks() {
  return (
    <section id="fuer-banken" style={{ background: "#F5F6FA", padding: "96px 24px" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <FadeIn style={{ textAlign: "center", marginBottom: 56 }}>
          <span style={{ display: "inline-block", background: "#dbeafe", color: "#1d4ed8", borderRadius: 100, padding: "4px 14px", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16 }}>
            Für Banken & Ausbildner
          </span>
          <h2 style={{ margin: "0 0 12px", fontSize: "clamp(26px,4vw,40px)", fontWeight: 800, letterSpacing: "-0.5px", color: "#111827" }}>
            Moderne Ausbildung
            <br />
            für Ihre Lernenden.
          </h2>
          <p style={{ margin: 0, maxWidth: 500, marginLeft: "auto", marginRight: "auto", fontSize: 16, color: "#6b7280", lineHeight: 1.6 }}>
            BankAcademy ergänzt bestehende Ausbildungsangebote mit praxisnahem digitalem Training.
          </p>
        </FadeIn>

        <div style={{ display: "grid", gap: 16, marginBottom: 36 }} className="sm:grid-cols-3">
          {B2B_CARDS.map((b, i) => (
            <FadeIn key={b.title} delay={i * 0.1}>
              <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 18, padding: "28px 24px", height: "100%" }}>
                <span style={{ fontSize: 32, display: "block", marginBottom: 16 }}>{b.emoji}</span>
                <h3 style={{ margin: "0 0 8px", fontSize: 15, fontWeight: 700, color: "#111827" }}>{b.title}</h3>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "#6b7280" }}>{b.text}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn style={{ textAlign: "center" }} delay={0.32}>
          <a
            href="mailto:evinsariaratnam@gmail.com"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              padding: "13px 28px",
              borderRadius: 100,
              fontSize: 14,
              fontWeight: 700,
              background: "#0D1B4B",
              color: "#fff",
              textDecoration: "none",
              boxShadow: "0 4px 20px rgba(13,27,75,0.2)",
              transition: "transform 0.15s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.04)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
          >
            Kontakt aufnehmen <ChevronRight size={15} />
          </a>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── Section: Testimonials ───────────────────────────────────────────────── */

const QUOTES = [
  {
    quote: "Endlich eine Plattform die zeigt wie das Bankgeschäft wirklich funktioniert – nicht nur Theorie.",
    name: "Lernende, 2. Lehrjahr",
    bank: "Kantonalbank",
  },
  {
    quote: "Die typischen Fehler Sektion ist Gold. Ich wusste nicht wie viele Stolpersteine es gibt bis ich sie hier gesehen habe.",
    name: "Praktikant",
    bank: "Grossbank",
  },
  {
    quote: "Als Quereinsteiger war das genau das richtige Tool um schnell ins Banking-Vokabular einzutauchen.",
    name: "Quereinsteiger",
    bank: "Regionalbank",
  },
];

function Testimonials() {
  return (
    <section style={{ background: "#fff", padding: "96px 24px" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <FadeIn style={{ textAlign: "center", marginBottom: 56 }}>
          <p style={{ margin: "0 0 8px", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#00C9B1" }}>
            Stimmen
          </p>
          <h2 style={{ margin: 0, fontSize: "clamp(26px,4vw,40px)", fontWeight: 800, letterSpacing: "-0.5px", color: "#111827" }}>
            Was Beta-Tester sagen
          </h2>
        </FadeIn>

        <div style={{ display: "grid", gap: 20 }} className="sm:grid-cols-3">
          {QUOTES.map((q, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  background: "#f9fafb",
                  border: "1px solid #e5e7eb",
                  borderRadius: 20,
                  padding: 28,
                }}
              >
                <div style={{ display: "flex", marginBottom: 16, color: "#fbbf24", fontSize: 16 }}>
                  ★★★★★
                </div>
                <p style={{ flex: 1, margin: "0 0 20px", fontSize: 14, lineHeight: 1.7, color: "#374151" }}>
                  &ldquo;{q.quote}&rdquo;
                </p>
                <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: 16 }}>
                  <p style={{ margin: "0 0 2px", fontSize: 13, fontWeight: 700, color: "#111827" }}>{q.name}</p>
                  <p style={{ margin: "0 0 6px", fontSize: 12, color: "#9ca3af" }}>{q.bank}</p>
                  <span style={{ fontSize: 11, color: "#9ca3af" }}>* Beta-Feedback</span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Section: Final CTA ──────────────────────────────────────────────────── */

function FinalCTA() {
  return (
    <section
      id="preise"
      style={{
        background: "linear-gradient(135deg, #0D1B4B 0%, #0e2a5a 50%, #053a4a 100%)",
        padding: "112px 24px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative radial */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(0,201,177,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <FadeIn style={{ position: "relative" }}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <h2
            style={{
              margin: "0 0 16px",
              fontSize: "clamp(28px,5vw,48px)",
              fontWeight: 800,
              letterSpacing: "-0.8px",
              color: "#fff",
              lineHeight: 1.1,
            }}
          >
            Bereit für BankAcademy?
          </h2>
          <p style={{ margin: "0 0 36px", fontSize: 18, color: "rgba(255,255,255,0.58)", lineHeight: 1.6 }}>
            Starte heute kostenlos und trainiere Banking wie es wirklich ist.
          </p>
          <Link
            href="/dashboard"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 9,
              padding: "17px 38px",
              borderRadius: 100,
              fontSize: 16,
              fontWeight: 800,
              background: "#fff",
              color: "#0D1B4B",
              textDecoration: "none",
              boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
              transition: "transform 0.15s, box-shadow 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 12px 48px rgba(0,0,0,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.2)";
            }}
          >
            Kostenlos starten <ChevronRight size={18} />
          </Link>
          <p style={{ margin: "18px 0 0", fontSize: 13, color: "rgba(255,255,255,0.35)" }}>
            Kein Konto nötig · Kostenlos · Sofort starten
          </p>
        </div>
      </FadeIn>
    </section>
  );
}

/* ─── Footer ──────────────────────────────────────────────────────────────── */

function Footer({ onNav }: { onNav: (id: string) => void }) {
  const COLS: Record<string, { label: string; action: () => void }[]> = {
    Produkt: [
      { label: "Features", action: () => onNav("features") },
      { label: "Module", action: () => onNav("module") },
      { label: "Für Banken", action: () => onNav("fuer-banken") },
      { label: "Demo", action: () => document.getElementById("mockup")?.scrollIntoView({ behavior: "smooth" }) },
    ],
    Ressourcen: [
      { label: "Glossar", action: () => { window.location.href = "/glossar"; } },
      { label: "Community", action: () => { window.location.href = "/community"; } },
      { label: "LAP Modus", action: () => { window.location.href = "/lap-modus"; } },
    ],
    Legal: [
      { label: "Impressum", action: () => { window.location.href = "/impressum"; } },
      { label: "Datenschutz", action: () => { window.location.href = "/datenschutz"; } },
      { label: "Kontakt", action: () => { window.location.href = "mailto:evinsariaratnam@gmail.com"; } },
    ],
  };

  return (
    <footer style={{ background: "#fff", borderTop: "1px solid #e5e7eb" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "64px 24px 32px" }}>
        <div style={{ display: "grid", gap: 40 }} className="sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <p style={{ margin: "0 0 8px", fontSize: 20, fontWeight: 800, letterSpacing: "-0.5px", color: "#0D1B4B" }}>
              Bank<span style={{ color: "#00C9B1" }}>Academy</span>
            </p>
            <p style={{ margin: "0 0 4px", fontSize: 13, color: "#6b7280", lineHeight: 1.5 }}>
              Der digitale Praxisausbildner
              <br />
              für die Banklehre 🇨🇭
            </p>
            <p style={{ margin: "8px 0 0", fontSize: 12, color: "#9ca3af" }}>© 2026 BankAcademy</p>
          </div>

          {/* Link columns */}
          {Object.entries(COLS).map(([cat, links]) => (
            <div key={cat}>
              <p style={{ margin: "0 0 16px", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.09em", color: "#9ca3af" }}>
                {cat}
              </p>
              <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                {links.map((l) => (
                  <li key={l.label}>
                    <button
                      onClick={l.action}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                        fontSize: 14,
                        color: "#6b7280",
                        transition: "color 0.15s",
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#111827"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#6b7280"; }}
                    >
                      {l.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            marginTop: 48,
            paddingTop: 24,
            borderTop: "1px solid #e5e7eb",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 8,
          }}
        >
          <p style={{ margin: 0, fontSize: 12, color: "#9ca3af" }}>
            © 2026 BankAcademy. Alle Rechte vorbehalten.
          </p>
          <p style={{ margin: 0, fontSize: 12, color: "#9ca3af" }}>
            Für Lernende und Ausbildner in Schweizer Banken.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ─── Page ────────────────────────────────────────────────────────────────── */

export default function LandingPage() {
  const scrolled = useScrolled();
  const [mobileOpen, setMobileOpen] = useState(false);

  function scrollTo(id: string) {
    setMobileOpen(false);
    const delay = mobileOpen ? 120 : 0;
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, delay);
  }

  return (
    <>
      <style>{`
        @keyframes mockupFloat {
          0%, 100% { transform: perspective(1400px) rotateX(4deg) translateY(0px); }
          50% { transform: perspective(1400px) rotateX(4deg) translateY(-10px); }
        }
        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.45; transform: scale(0.8); }
        }
      `}</style>

      <div style={{ minHeight: "100vh", background: "#fff" }}>
        <Navbar
          scrolled={scrolled}
          mobileOpen={mobileOpen}
          onToggle={() => setMobileOpen((v) => !v)}
          onNav={scrollTo}
        />
        <Hero />
        <StatsBar />
        <ProblemSolution />
        <HowItWorks />
        <Features />
        <Modules />
        <ForBanks />
        <Testimonials />
        <FinalCTA />
        <Footer onNav={scrollTo} />
      </div>
    </>
  );
}
