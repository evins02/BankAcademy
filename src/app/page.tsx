"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronRight, Eye, EyeOff, Menu, X } from "lucide-react";

/* ─── Design tokens ───────────────────────────────────────────────────────── */

const N = "#0A1628";        // navy darkest
const NM = "#0D1F3C";       // navy mid
const CY = "#00D4B8";       // cyan
const PU = "#7B6FE8";       // purple
const WH = "#F8FAFC";       // white
const WD = "rgba(248,250,252,0.65)";  // white dim
const WM = "rgba(248,250,252,0.38)";  // white muted
const BR = "rgba(255,255,255,0.08)";  // border
const CB = "rgba(255,255,255,0.04)";  // card bg

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

const NAV_ITEMS: { label: string; id?: string; href?: string }[] = [
  { label: "Features", id: "features" },
  { label: "Module", id: "module" },
  { label: "Für Banken", id: "fuer-banken" },
  { label: "Kontakt", href: "/kontakt" },
];

function Navbar({
  scrolled,
  mobileOpen,
  onToggle,
  onNav,
  onLoginOpen,
  onStart,
}: {
  scrolled: boolean;
  mobileOpen: boolean;
  onToggle: () => void;
  onNav: (id: string) => void;
  onLoginOpen: () => void;
  onStart: () => void;
}) {
  return (
    <header
      style={{
        position: "fixed",
        inset: "0 0 auto 0",
        zIndex: 50,
        transition: "all 0.3s ease",
        background: scrolled ? `${NM}f5` : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? `1px solid ${BR}` : "none",
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
          <span style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.5px", color: WH }}>
            Bank<span style={{ color: CY }}>Academy</span>
          </span>
        </button>

        {/* Desktop nav */}
        <nav style={{ display: "flex", gap: 4, alignItems: "center" }} className="hidden md:flex">
          {NAV_ITEMS.map((item) =>
            item.href ? (
              <Link
                key={item.label}
                href={item.href}
                style={{
                  display: "inline-block",
                  padding: "8px 16px",
                  borderRadius: 8,
                  fontSize: 14,
                  color: WD,
                  textDecoration: "none",
                  transition: "all 0.15s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = WH;
                  e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = WD;
                  e.currentTarget.style.background = "transparent";
                }}
              >
                {item.label}
              </Link>
            ) : (
              <button
                key={item.id}
                onClick={() => onNav(item.id!)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "8px 16px",
                  borderRadius: 8,
                  fontSize: 14,
                  color: WD,
                  transition: "all 0.15s",
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLButtonElement).style.color = WH;
                  (e.target as HTMLButtonElement).style.background = "rgba(255,255,255,0.06)";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLButtonElement).style.color = WD;
                  (e.target as HTMLButtonElement).style.background = "transparent";
                }}
              >
                {item.label}
              </button>
            )
          )}
        </nav>

        {/* Desktop CTA */}
        <div style={{ display: "flex", gap: 12, alignItems: "center" }} className="hidden md:flex">
          <button
            onClick={onLoginOpen}
            style={{
              background: "none",
              border: `1px solid ${BR}`,
              cursor: "pointer",
              padding: "8px 18px",
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 500,
              color: WD,
              transition: "all 0.15s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = WH;
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.2)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = WD;
              (e.currentTarget as HTMLButtonElement).style.borderColor = BR;
            }}
          >
            Einloggen
          </button>
          <button
            onClick={onStart}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "9px 20px",
              borderRadius: 100,
              fontSize: 14,
              fontWeight: 700,
              background: CY,
              color: N,
              border: "none",
              cursor: "pointer",
              transition: "transform 0.15s, box-shadow 0.15s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.04)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 4px 20px ${CY}66`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
            }}
          >
            Jetzt starten <ChevronRight size={14} />
          </button>
        </div>

        {/* Hamburger */}
        <button
          onClick={onToggle}
          className="md:hidden"
          style={{
            background: "none",
            border: "none",
            color: WH,
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
            background: NM,
            borderTop: `1px solid ${BR}`,
            padding: "16px 24px 24px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {NAV_ITEMS.map((item) =>
              item.href ? (
                <Link
                  key={item.label}
                  href={item.href}
                  style={{
                    display: "block",
                    padding: "12px 16px",
                    borderRadius: 10,
                    fontSize: 15,
                    color: WD,
                    textDecoration: "none",
                  }}
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  key={item.id}
                  onClick={() => onNav(item.id!)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "12px 16px",
                    borderRadius: 10,
                    fontSize: 15,
                    color: WD,
                    textAlign: "left",
                  }}
                >
                  {item.label}
                </button>
              )
            )}
            <div style={{ marginTop: 12, borderTop: `1px solid ${BR}`, paddingTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
              <button
                onClick={onLoginOpen}
                style={{
                  display: "block",
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: 12,
                  border: `1px solid rgba(255,255,255,0.2)`,
                  background: "none",
                  fontSize: 14,
                  fontWeight: 600,
                  color: WH,
                  textAlign: "center",
                  cursor: "pointer",
                }}
              >
                Einloggen
              </button>
              <button
                onClick={onStart}
                style={{
                  display: "block",
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: 100,
                  fontSize: 14,
                  fontWeight: 700,
                  background: CY,
                  color: N,
                  textAlign: "center",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Jetzt starten →
              </button>
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
          background: CY,
          opacity: 0.12,
          filter: "blur(56px)",
          pointerEvents: "none",
        }}
      />

      {/* Browser */}
      <div
        style={{
          borderRadius: 18,
          overflow: "hidden",
          boxShadow: `0 0 0 1px ${BR}, 0 40px 100px rgba(0,0,0,0.7)`,
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
            background: "#0d1117",
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
              background: "#161b22",
              borderRadius: 6,
              padding: "5px 12px",
              display: "flex",
              alignItems: "center",
              gap: 7,
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
            <span style={{ fontSize: 11, color: "#6b7280" }}>app.bankacademy.ch/dashboard</span>
          </div>
        </div>

        {/* App UI */}
        <div style={{ display: "flex", height: 280, background: "#F8F9FD", overflow: "hidden" }}>
          {/* Sidebar */}
          <div style={{ width: 168, flexShrink: 0, background: "#0D1B4B", padding: "12px 10px", display: "flex", flexDirection: "column", gap: 2 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "6px 10px", marginBottom: 10 }}>
              <span style={{ width: 20, height: 20, borderRadius: 6, background: CY, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 8, fontWeight: 900, color: N }}>BA</span>
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
                  color: item.active ? CY : "rgba(255,255,255,0.38)",
                  background: item.active ? `${CY}22` : "transparent",
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
                { name: "Privatkunde", pct: 65, clr: CY },
                { name: "Firmenkunde", pct: 40, clr: PU },
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

function Hero({ onStart }: { onStart: () => void }) {
  return (
    <section
      style={{
        background: N,
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
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }}
      />
      {/* Radial top glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse 90% 55% at 50% -5%, ${CY}22 0%, transparent 65%)`,
          pointerEvents: "none",
        }}
      />
      {/* Purple side glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse 60% 40% at 85% 30%, ${PU}18 0%, transparent 60%)`,
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
            border: `1px solid ${CY}44`,
            background: `${CY}10`,
            borderRadius: 100,
            padding: "8px 18px",
            marginBottom: 28,
            fontSize: 14,
            fontWeight: 500,
            color: CY,
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: CY,
              display: "inline-block",
              animation: "pulseDot 2.2s ease-in-out infinite",
            }}
          />
          Der digitale Praxisausbildner für die Banklehre
        </div>

        {/* Headline */}
        <h1
          style={{
            margin: "0 0 22px",
            fontSize: "clamp(40px, 7vw, 72px)",
            fontWeight: 800,
            lineHeight: 1.08,
            letterSpacing: "-1.5px",
            color: WH,
          }}
        >
          Lern faul.{" "}
          <br />
          <span
            style={{
              background: `linear-gradient(90deg, ${CY} 0%, ${PU} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Üb smart.
          </span>
        </h1>

        {/* Subtitle */}
        <p
          style={{
            margin: "0 auto 36px",
            maxWidth: 600,
            fontSize: 18,
            lineHeight: 1.65,
            color: WD,
          }}
        >
          Kein Bock auf trockene Theorie? Wir auch nicht. So lernst du schneller und besser.
        </p>

        {/* Buttons */}
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12, marginBottom: 28 }}>
          <button
            onClick={onStart}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "15px 32px",
              borderRadius: 100,
              fontSize: 15,
              fontWeight: 700,
              background: CY,
              color: N,
              border: "none",
              cursor: "pointer",
              boxShadow: `0 0 40px ${CY}55`,
              transition: "transform 0.15s, box-shadow 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.04)";
              e.currentTarget.style.boxShadow = `0 0 55px ${CY}80`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = `0 0 40px ${CY}55`;
            }}
          >
            Vollversion <ChevronRight size={17} />
          </button>
          <Link
            href="/demo"
            style={{
              padding: "15px 32px",
              borderRadius: 100,
              fontSize: 15,
              fontWeight: 600,
              background: "transparent",
              border: `1px solid rgba(255,255,255,0.2)`,
              color: WH,
              textDecoration: "none",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.07)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
            }}
          >
            Jetzt gratis loslegen
          </Link>
        </div>

        {/* Trust indicators */}
        <div style={{ marginTop: 28, paddingTop: 24, borderTop: `1px solid ${BR}`, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <p style={{ margin: 0, fontSize: 12, color: WM, fontStyle: "italic" }}>
            Entwickelt von einem Banklehrling mit Praxiserfahrung bei einer Schweizer Bank
          </p>
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
          background: `linear-gradient(to bottom, transparent, ${N})`,
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
  ];

  return (
    <div
      ref={ref}
      style={{
        background: NM,
        borderTop: `1px solid ${BR}`,
        borderBottom: `1px solid ${BR}`,
        padding: "40px 24px",
      }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "32px 0" }} className="sm:grid-cols-3">
        {STATS.map((s, i) => (
          <div
            key={s.label}
            style={{
              textAlign: "center",
              borderRight: i < 2 ? `1px solid ${BR}` : "none",
              padding: "0 16px",
            }}
            className=""
          >
            <p style={{ margin: 0, fontSize: "clamp(28px,4vw,48px)", fontWeight: 800, color: CY }}>
              {s.value}
            </p>
            <p style={{ margin: "4px 0 0", fontSize: 13, fontWeight: 500, color: WM }}>
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
    <section style={{ background: N, padding: "96px 24px" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <FadeIn className="text-center" style={{ marginBottom: 56 }}>
          <p style={{ margin: "0 0 8px", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: CY }}>
            Warum BankAcademy
          </p>
          <h2 style={{ margin: 0, fontSize: "clamp(26px,4vw,40px)", fontWeight: 800, letterSpacing: "-0.5px", color: WH }}>
            Die bessere Art zu lernen.
          </h2>
        </FadeIn>

        <div style={{ display: "grid", gap: 24 }} className="sm:grid-cols-2">
          <FadeIn delay={0.1}>
            <div style={{ borderRadius: 20, border: "1px solid rgba(239,68,68,0.25)", background: "rgba(239,68,68,0.05)", padding: 36, height: "100%" }}>
              <span style={{ display: "inline-block", background: "rgba(239,68,68,0.15)", color: "#f87171", borderRadius: 100, padding: "4px 14px", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 20 }}>
                Das Problem
              </span>
              <h3 style={{ margin: "0 0 24px", fontSize: 20, fontWeight: 700, color: WH }}>
                Klassische Ausbildung hat Lücken.
              </h3>
              <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
                {PROBLEMS.map((p) => (
                  <li key={p} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, color: WD, lineHeight: 1.5 }}>
                    <span style={{ flexShrink: 0, marginTop: 1 }}>❌</span> {p}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div style={{ borderRadius: 20, border: `1px solid ${CY}33`, background: `${CY}08`, padding: 36, height: "100%" }}>
              <span style={{ display: "inline-block", background: `${CY}20`, color: CY, borderRadius: 100, padding: "4px 14px", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 20 }}>
                Die Lösung
              </span>
              <h3 style={{ margin: "0 0 24px", fontSize: 20, fontWeight: 700, color: WH }}>
                Praxis von Tag 1.
              </h3>
              <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
                {SOLUTIONS.map((s) => (
                  <li key={s} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, color: WD, lineHeight: 1.5 }}>
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
    <section id="how-it-works" style={{ background: NM, padding: "96px 24px" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <FadeIn style={{ textAlign: "center", marginBottom: 60 }}>
          <p style={{ margin: "0 0 8px", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: CY }}>
            So funktioniert es
          </p>
          <h2 style={{ margin: "0 0 10px", fontSize: "clamp(26px,4vw,40px)", fontWeight: 800, letterSpacing: "-0.5px", color: WH }}>
            In 3 Schritten zum Banking-Profi
          </h2>
        </FadeIn>

        <div style={{ display: "grid", gap: 20 }} className="sm:grid-cols-3">
          {HOW_STEPS.map((step, i) => (
            <FadeIn key={step.num} delay={i * 0.12} style={{ position: "relative" }}>
              <div
                style={{
                  background: CB,
                  border: `1px solid ${BR}`,
                  borderRadius: 20,
                  padding: 32,
                  height: "100%",
                  position: "relative",
                  overflow: "hidden",
                  transition: "border-color 0.2s, background 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = `${CY}44`;
                  (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.07)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = BR;
                  (e.currentTarget as HTMLDivElement).style.background = CB;
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    top: 16,
                    right: 20,
                    fontSize: 52,
                    fontWeight: 900,
                    color: "rgba(255,255,255,0.04)",
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
                    background: `${CY}15`,
                    border: `1px solid ${CY}25`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 28,
                    marginBottom: 20,
                  }}
                >
                  {step.emoji}
                </div>
                <h3 style={{ margin: "0 0 10px", fontSize: 16, fontWeight: 700, color: WH }}>{step.title}</h3>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: WD }}>{step.text}</p>
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
                    color: WM,
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
  { emoji: "🎓", title: "Challenge-Vorbereitung", text: "Spezifische Level-3 Szenarien für die Abschlussprüfung" },
  { emoji: "💬", title: "Community", text: "Tausch dich mit anderen Lernenden aus und lerne voneinander" },
];

function Features() {
  return (
    <section id="features" style={{ background: N, padding: "96px 24px" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <FadeIn style={{ textAlign: "center", marginBottom: 56 }}>
          <p style={{ margin: "0 0 8px", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: CY }}>
            Features
          </p>
          <h2 style={{ margin: 0, fontSize: "clamp(26px,4vw,40px)", fontWeight: 800, letterSpacing: "-0.5px", color: WH }}>
            Was BankAcademy einzigartig macht
          </h2>
        </FadeIn>

        <div style={{ display: "grid", gap: 16 }} className="sm:grid-cols-2 lg:grid-cols-3">
          {FEATURE_CARDS.map((f, i) => (
            <FadeIn key={f.title} delay={i * 0.07}>
              <div
                style={{
                  background: CB,
                  border: `1px solid ${BR}`,
                  borderRadius: 18,
                  padding: "28px 28px 24px",
                  cursor: "default",
                  transition: "transform 0.2s, box-shadow 0.2s, border-color 0.2s, background 0.2s",
                  height: "100%",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = `0 12px 40px rgba(0,0,0,0.3)`;
                  (e.currentTarget as HTMLDivElement).style.borderColor = `${CY}33`;
                  (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.07)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                  (e.currentTarget as HTMLDivElement).style.borderColor = BR;
                  (e.currentTarget as HTMLDivElement).style.background = CB;
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 14,
                    background: `${CY}15`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 24,
                    marginBottom: 16,
                  }}
                >
                  {f.emoji}
                </div>
                <h3 style={{ margin: "0 0 8px", fontSize: 15, fontWeight: 700, color: WH }}>{f.title}</h3>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: WD }}>{f.text}</p>
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
        border: `1px solid ${BR}`,
        background: CB,
        padding: "16px 18px",
        transition: "background 0.15s, border-color 0.15s",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.07)";
        (e.currentTarget as HTMLDivElement).style.borderColor = `${CY}33`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.background = CB;
        (e.currentTarget as HTMLDivElement).style.borderColor = BR;
      }}
    >
      <span style={{ fontSize: 22, flexShrink: 0, marginTop: 1 }}>{emoji}</span>
      <div>
        <p style={{ margin: "0 0 4px", fontSize: 13, fontWeight: 700, color: WH }}>{title}</p>
        <p style={{ margin: 0, fontSize: 12, lineHeight: 1.5, color: WM }}>{desc}</p>
      </div>
    </div>
  );
}

function Modules({ onStart }: { onStart: () => void }) {
  return (
    <section id="module" style={{ background: NM, padding: "96px 24px" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <FadeIn style={{ textAlign: "center", marginBottom: 56 }}>
          <p style={{ margin: "0 0 8px", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: CY }}>
            Inhalte
          </p>
          <h2 style={{ margin: 0, fontSize: "clamp(26px,4vw,40px)", fontWeight: 800, letterSpacing: "-0.5px", color: WH }}>
            Alle Module im Überblick
          </h2>
        </FadeIn>

        <div style={{ display: "grid", gap: 40 }} className="sm:grid-cols-2">
          <FadeIn delay={0.1}>
            <p style={{ margin: "0 0 16px", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: WM }}>
              Front Office
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <ModuleItem emoji="👤" title="Privatkunde" desc="Kontoeröffnung, Sparen & Konto, Zahlungsverkehr, 3a, Hypotheken" />
              <ModuleItem emoji="🏢" title="Firmenkunde" desc="Jahresabschluss, Tragbarkeit, Hypothek Verlängerung" />
              <ModuleItem emoji="📈" title="Anlagekunde" desc="Anlegerprofil, Obligationen, Aktien, Fonds & ETFs" />
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p style={{ margin: "0 0 16px", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: WM }}>
              Back Office
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <ModuleItem emoji="⚙️" title="Bankbetrieb" desc="KYC / Compliance, Zahlungsverkehr, Mahnwesen" />
              <ModuleItem emoji="💳" title="Kreditgeschäft" desc="Vertragserstellung, Auszahlung, Verlängerung, Kündigung" />
            </div>
          </FadeIn>

          <FadeIn delay={0.25}>
            <p style={{ margin: "0 0 16px", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: WM }}>
              Challenge-Vorbereitung
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <ModuleItem emoji="🎓" title="Challenge-Modus" desc="Prüfungsrelevante Level-3 Szenarien aller Module" />
              <ModuleItem emoji="🗺️" title="Lernpfad" desc="Strukturierter Pfad von Grundlagen bis zur Abschlussprüfung" />
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p style={{ margin: "0 0 16px", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: WM }}>
              Simulationen
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <ModuleItem emoji="🎭" title="Anlageberatung" desc="Vollständiges Beratungsgespräch mit VideoCall-Simulation" />
              <ModuleItem emoji="🏠" title="Hypothek & Kontoeröffnung" desc="Interaktive Simulationen mit Kundendialogen" />
            </div>
          </FadeIn>
        </div>

        <FadeIn style={{ textAlign: "center", marginTop: 44 }} delay={0.35}>
          <button
            onClick={onStart}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              padding: "13px 28px",
              borderRadius: 100,
              fontSize: 14,
              fontWeight: 700,
              background: CY,
              color: N,
              border: "none",
              cursor: "pointer",
              transition: "transform 0.15s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.04)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
          >
            Alle Module entdecken <ChevronRight size={15} />
          </button>
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
  { emoji: "📋", title: "Compliance-konform", text: "Alle Inhalte nach GwG, VSB 20, FIDLEG und weiteren Regelwerken" },
];

function ForBanks() {
  return (
    <section id="fuer-banken" style={{ background: N, padding: "96px 24px" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <div style={{ display: "grid", gap: 56, alignItems: "center" }} className="lg:grid-cols-2">
          {/* Text side */}
          <FadeIn delay={0.1}>
            <span style={{ display: "inline-block", background: `${PU}20`, color: PU, borderRadius: 100, padding: "4px 14px", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16 }}>
              Für Banken & Ausbildner
            </span>
            <h2 style={{ margin: "0 0 16px", fontSize: "clamp(26px,4vw,36px)", fontWeight: 800, letterSpacing: "-0.5px", color: WH, lineHeight: 1.15 }}>
              Moderne Ausbildung
              <br />
              für Ihre Lernenden.
            </h2>
            <p style={{ margin: "0 0 28px", fontSize: 16, color: WD, lineHeight: 1.65 }}>
              BankAcademy ergänzt bestehende Ausbildungsangebote mit praxisnahem digitalem Training – abgestimmt auf Schweizer Bankstandards.
            </p>
            <Link
              href="/kontakt"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                padding: "13px 28px",
                borderRadius: 100,
                fontSize: 14,
                fontWeight: 700,
                background: PU,
                color: WH,
                textDecoration: "none",
                boxShadow: `0 4px 20px ${PU}44`,
                transition: "transform 0.15s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.04)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
            >
              Kontakt aufnehmen <ChevronRight size={15} />
            </Link>
          </FadeIn>

          {/* Cards grid */}
          <FadeIn delay={0.2}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {B2B_CARDS.map((b) => (
                <div
                  key={b.title}
                  style={{
                    background: CB,
                    border: `1px solid ${BR}`,
                    borderRadius: 16,
                    padding: "22px 20px",
                    transition: "border-color 0.15s, background 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = `${PU}44`;
                    (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.07)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = BR;
                    (e.currentTarget as HTMLDivElement).style.background = CB;
                  }}
                >
                  <span style={{ fontSize: 26, display: "block", marginBottom: 10 }}>{b.emoji}</span>
                  <h3 style={{ margin: "0 0 6px", fontSize: 13, fontWeight: 700, color: WH }}>{b.title}</h3>
                  <p style={{ margin: 0, fontSize: 12, lineHeight: 1.55, color: WD }}>{b.text}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ─── Section: Final CTA ──────────────────────────────────────────────────── */

function FinalCTA({ onStart }: { onStart: () => void }) {
  return (
    <section
      id="preise"
      style={{
        background: NM,
        padding: "112px 24px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Radial glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse 70% 70% at 50% 50%, ${CY}12 0%, transparent 65%)`,
          pointerEvents: "none",
        }}
      />
      {/* Grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
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
              color: WH,
              lineHeight: 1.1,
            }}
          >
            Bereit für BankAcademy?
          </h2>
          <p style={{ margin: "0 0 36px", fontSize: 18, color: WD, lineHeight: 1.6 }}>
            Starte jetzt und trainiere Banking wie es wirklich ist.
          </p>
          <button
            onClick={onStart}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 9,
              padding: "17px 38px",
              borderRadius: 100,
              fontSize: 16,
              fontWeight: 800,
              background: CY,
              color: N,
              border: "none",
              cursor: "pointer",
              boxShadow: `0 8px 40px ${CY}55`,
              transition: "transform 0.15s, box-shadow 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = `0 12px 48px ${CY}77`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = `0 8px 40px ${CY}55`;
            }}
          >
            Jetzt starten <ChevronRight size={18} />
          </button>
        </div>
      </FadeIn>
    </section>
  );
}

/* ─── Access Code Modal ──────────────────────────────────────────────────── */
function AccessCodeModal({ onClose }: { onClose: () => void }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

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
        localStorage.setItem("fullAccess", "true");
        const hasOnboarding = localStorage.getItem("onboarding-complete");
        window.location.replace(hasOnboarding ? "/dashboard" : "/onboarding");
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
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(8px)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        animation: "modalFadeIn 0.22s ease",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          borderRadius: 20,
          boxShadow: "0 32px 96px rgba(0,0,0,0.22), 0 0 0 1px rgba(0,0,0,0.06)",
          width: "100%",
          maxWidth: 400,
          padding: "40px 36px 32px",
          position: "relative",
          animation: "modalSlideIn 0.25s cubic-bezier(0.34,1.56,0.64,1)",
        }}
      >
        <button
          onClick={onClose}
          aria-label="Schliessen"
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 8,
            borderRadius: 8,
            color: "#9ca3af",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "color 0.15s, background 0.15s",
          }}
          onMouseEnter={(e) => {
            const btn = e.currentTarget as HTMLButtonElement;
            btn.style.color = "#374151";
            btn.style.background = "#f3f4f6";
          }}
          onMouseLeave={(e) => {
            const btn = e.currentTarget as HTMLButtonElement;
            btn.style.color = "#9ca3af";
            btn.style.background = "none";
          }}
        >
          <X size={18} />
        </button>

        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <p style={{ margin: "0 0 18px", fontSize: 21, fontWeight: 800, letterSpacing: "-0.5px", color: "#0D1B4B" }}>
            Bank<span style={{ color: "#00C9B1" }}>Academy</span>
          </p>
          <h2 style={{ margin: "0 0 8px", fontSize: 20, fontWeight: 700, color: "#111827", letterSpacing: "-0.3px" }}>
            Zugangscode eingeben
          </h2>
          <p style={{ margin: 0, fontSize: 14, color: "#6b7280", lineHeight: 1.5 }}>
            Gib deinen Code ein, um alle Module freizuschalten.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <input
            type="password"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            value={code}
            onChange={(e) => { setCode(e.target.value); setError(false); }}
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px 16px",
              borderRadius: 10,
              border: error ? "1.5px solid #ef4444" : "1.5px solid #e5e7eb",
              fontSize: 15,
              color: "#111827",
              background: "#fff",
              outline: "none",
              boxSizing: "border-box",
              transition: "border-color 0.15s",
            }}
            onFocus={(e) => { if (!error) e.currentTarget.style.borderColor = "#0D1B4B"; }}
            onBlur={(e) => { if (!error) e.currentTarget.style.borderColor = "#e5e7eb"; }}
          />
          {error && (
            <p style={{ margin: 0, fontSize: 13, color: "#ef4444" }}>Code ungültig</p>
          )}
          <button
            type="submit"
            disabled={!code || loading}
            style={{
              width: "100%",
              padding: "13px 24px",
              borderRadius: 100,
              border: "none",
              background: !code || loading ? "#9ca3af" : "#0D1B4B",
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
    </div>
  );
}

/* ─── Login Modal ────────────────────────────────────────────────────────── */
function LoginModal({ onClose }: { onClose: () => void }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotMsg, setShowForgotMsg] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    window.location.href = "/dashboard";
  }

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(8px)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        animation: "modalFadeIn 0.22s ease",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          borderRadius: 20,
          boxShadow: "0 32px 96px rgba(0,0,0,0.22), 0 0 0 1px rgba(0,0,0,0.06)",
          width: "100%",
          maxWidth: 420,
          padding: "40px 36px 32px",
          position: "relative",
          animation: "modalSlideIn 0.25s cubic-bezier(0.34,1.56,0.64,1)",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Schliessen"
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 8,
            borderRadius: 8,
            color: "#9ca3af",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "color 0.15s, background 0.15s",
          }}
          onMouseEnter={(e) => {
            const btn = e.currentTarget as HTMLButtonElement;
            btn.style.color = "#374151";
            btn.style.background = "#f3f4f6";
          }}
          onMouseLeave={(e) => {
            const btn = e.currentTarget as HTMLButtonElement;
            btn.style.color = "#9ca3af";
            btn.style.background = "none";
          }}
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <p style={{ margin: "0 0 18px", fontSize: 21, fontWeight: 800, letterSpacing: "-0.5px", color: "#0D1B4B" }}>
            Bank<span style={{ color: "#00C9B1" }}>Academy</span>
          </p>
          <h2 style={{ margin: "0 0 8px", fontSize: 21, fontWeight: 700, color: "#111827", letterSpacing: "-0.3px" }}>
            Willkommen zurück
          </h2>
          <p style={{ margin: 0, fontSize: 14, color: "#6b7280", lineHeight: 1.5 }}>
            Melde dich mit deinen Zugangsdaten an
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", marginBottom: 6, fontSize: 13, fontWeight: 600, color: "#374151" }}>
              E-Mail Adresse
            </label>
            <input
              type="email"
              placeholder="max@beispiel.ch"
              required
              style={{
                width: "100%",
                padding: "11px 14px",
                borderRadius: 10,
                border: "1.5px solid #e5e7eb",
                fontSize: 14,
                color: "#111827",
                outline: "none",
                boxSizing: "border-box",
                transition: "border-color 0.15s",
                background: "#fff",
              }}
              onFocus={(e) => { e.currentTarget.style.borderColor = "#0D1B4B"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "#e5e7eb"; }}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: showForgotMsg ? 8 : 20 }}>
            <label style={{ display: "block", marginBottom: 6, fontSize: 13, fontWeight: 600, color: "#374151" }}>
              Passwort
            </label>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                required
                style={{
                  width: "100%",
                  padding: "11px 44px 11px 14px",
                  borderRadius: 10,
                  border: "1.5px solid #e5e7eb",
                  fontSize: 14,
                  color: "#111827",
                  outline: "none",
                  boxSizing: "border-box",
                  transition: "border-color 0.15s",
                  background: "#fff",
                }}
                onFocus={(e) => { e.currentTarget.style.borderColor = "#0D1B4B"; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = "#e5e7eb"; }}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                style={{
                  position: "absolute",
                  right: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#9ca3af",
                  padding: 4,
                  display: "flex",
                  alignItems: "center",
                  transition: "color 0.15s",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#374151"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#9ca3af"; }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Forgot password */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button
                type="button"
                onClick={() => setShowForgotMsg((v) => !v)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 13,
                  color: "#6b7280",
                  padding: 0,
                  textDecoration: "underline",
                  textUnderlineOffset: 3,
                }}
              >
                Passwort vergessen?
              </button>
            </div>
            {showForgotMsg && (
              <div style={{ marginTop: 10, padding: "10px 14px", background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 10, fontSize: 13, color: "#374151" }}>
                Bitte kontaktiere deinen Ausbildner.
              </div>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "13px 24px",
              borderRadius: 100,
              border: "none",
              background: "#0D1B4B",
              color: "#fff",
              fontSize: 15,
              fontWeight: 700,
              cursor: "pointer",
              transition: "background 0.15s",
              marginBottom: 20,
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#0a1438"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#0D1B4B"; }}
          >
            Anmelden →
          </button>
        </form>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <div style={{ flex: 1, height: 1, background: "#e5e7eb" }} />
          <span style={{ fontSize: 13, color: "#9ca3af" }}>oder</span>
          <div style={{ flex: 1, height: 1, background: "#e5e7eb" }} />
        </div>

        {/* Register */}
        <button
          onClick={() => { window.location.href = "/dashboard"; }}
          style={{
            width: "100%",
            padding: "13px 24px",
            borderRadius: 100,
            border: "1.5px solid #0D1B4B",
            background: "transparent",
            color: "#0D1B4B",
            fontSize: 15,
            fontWeight: 700,
            cursor: "pointer",
            transition: "background 0.15s",
            marginBottom: 24,
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#f0f2fa"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
        >
          Kostenlos registrieren →
        </button>

        {/* Footer note */}
        <p style={{ margin: 0, fontSize: 12, color: "#9ca3af", textAlign: "center", lineHeight: 1.5 }}>
          Noch kein Konto? Dein Ausbildner richtet deinen Zugang ein.
        </p>
      </div>
    </div>
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
      { label: "Challenge-Modus", action: () => { window.location.href = "/challenge-modus"; } },
    ],
    Legal: [
      { label: "Impressum", action: () => { window.location.href = "/impressum"; } },
      { label: "Datenschutz", action: () => { window.location.href = "/datenschutz"; } },
      { label: "Kontakt", action: () => { window.location.href = "/kontakt"; } },
    ],
  };

  return (
    <footer style={{ background: N, borderTop: `1px solid ${BR}` }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "64px 24px 32px" }}>
        <div style={{ display: "grid", gap: 40 }} className="sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <p style={{ margin: "0 0 8px", fontSize: 20, fontWeight: 800, letterSpacing: "-0.5px", color: WH }}>
              Bank<span style={{ color: CY }}>Academy</span>
            </p>
            <p style={{ margin: "0 0 4px", fontSize: 13, color: WD, lineHeight: 1.5 }}>
              Der digitale Praxisausbildner
              <br />
              für die Banklehre
            </p>
            <p style={{ margin: "8px 0 0", fontSize: 12, color: WM }}>© 2026 BankAcademy</p>
          </div>

          {/* Link columns */}
          {Object.entries(COLS).map(([cat, links]) => (
            <div key={cat}>
              <p style={{ margin: "0 0 16px", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.09em", color: WM }}>
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
                        color: WD,
                        transition: "color 0.15s",
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = WH; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = WD; }}
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
            borderTop: `1px solid ${BR}`,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 8,
          }}
        >
          <p style={{ margin: 0, fontSize: 12, color: WM }}>
            © 2026 BankAcademy. Alle Rechte vorbehalten.
          </p>
          <p style={{ margin: 0, fontSize: 12, color: WM }}>
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
  const [loginOpen, setLoginOpen] = useState(false);
  const [accessOpen, setAccessOpen] = useState(false);

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

      {loginOpen && <LoginModal onClose={() => setLoginOpen(false)} />}
      {accessOpen && <AccessCodeModal onClose={() => setAccessOpen(false)} />}

      <div style={{ minHeight: "100vh", background: N }}>
        <Navbar
          scrolled={scrolled}
          mobileOpen={mobileOpen}
          onToggle={() => setMobileOpen((v) => !v)}
          onNav={scrollTo}
          onLoginOpen={() => {
            setMobileOpen(false);
            if (typeof window !== "undefined" && localStorage.getItem("fullAccess") === "true") {
              window.location.href = "/dashboard";
            } else {
              setAccessOpen(true);
            }
          }}
          onStart={() => { setMobileOpen(false); setAccessOpen(true); }}
        />
        <Hero onStart={() => setAccessOpen(true)} />
        <StatsBar />
        <ProblemSolution />
        <HowItWorks />
        <Features />
        <Modules onStart={() => setAccessOpen(true)} />
        <ForBanks />
        <FinalCTA onStart={() => setAccessOpen(true)} />
        <Footer onNav={scrollTo} />
      </div>
    </>
  );
}
