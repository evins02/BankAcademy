"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  BarChart2,
  Building2,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  CreditCard,
  Eye,
  EyeOff,
  GraduationCap,
  Home,
  Landmark,
  Lightbulb,
  Map,
  Menu,
  MessageSquare,
  Scale,
  Shield,
  Target,
  TrendingUp,
  User,
  Users,
  X,
  XCircle,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { ContactForms } from "@/components/shared/ContactForms";
import { useLanguage } from "@/context/LanguageContext";
import type { Lang } from "@/lib/i18n";

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

function useScrollZoom(from = 0.86) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(from);
  useEffect(() => {
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const winH = window.innerHeight;
      const progress = Math.min(1, Math.max(0, (winH - rect.top) / (winH * 0.85)));
      setScale(from + (1 - from) * progress);
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, [from]);
  return { ref, scale };
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

/* ─── Language switcher ───────────────────────────────────────────────────── */

const LANGS: { key: Lang; label: string }[] = [
  { key: "de", label: "D" },
  { key: "fr", label: "F" },
  { key: "it", label: "I" },
];

function LangButtons({ compact = false }: { compact?: boolean }) {
  const { lang, setLang } = useLanguage();
  return (
    <div style={{ display: "flex", gap: 3 }}>
      {LANGS.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => setLang(key)}
          style={{
            background: lang === key ? CY : "transparent",
            border: `1px solid ${lang === key ? CY : "rgba(255,255,255,0.15)"}`,
            color: lang === key ? N : WM,
            borderRadius: 6,
            padding: compact ? "5px 10px" : "4px 9px",
            fontSize: 11,
            fontWeight: 700,
            cursor: "pointer",
            letterSpacing: "0.05em",
            transition: "all 0.15s",
            lineHeight: 1,
          }}
          onMouseEnter={(e) => {
            if (lang !== key) {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.35)";
              (e.currentTarget as HTMLButtonElement).style.color = WH;
            }
          }}
          onMouseLeave={(e) => {
            if (lang !== key) {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.15)";
              (e.currentTarget as HTMLButtonElement).style.color = WM;
            }
          }}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

/* ─── Navbar ──────────────────────────────────────────────────────────────── */

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
  const { t } = useLanguage();
  const NAV_ITEMS = [
    { label: t.landing.navFeatures, id: "features" },
    { label: t.landing.navModule, id: "module" },
    { label: t.landing.navFuerBanken, id: "fuer-banken" },
    { label: t.landing.navKontakt, id: "kontakt" },
  ];
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
          style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", gap: 10 }}
        >
          <span style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.5px", color: WH }}>
            Bank<span style={{ color: CY }}>Academy</span>
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
          ))}
        </nav>

        {/* Desktop CTA */}
        <div style={{ display: "flex", gap: 12, alignItems: "center" }} className="hidden md:flex">
          <LangButtons />
          <div style={{ width: 1, height: 18, background: BR }} />
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
            {t.landing.navLogin}
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
            {t.landing.navStart} <ChevronRight size={14} />
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
                  color: WD,
                  textAlign: "left",
                }}
              >
                {item.label}
              </button>
            ))}
            <div style={{ marginTop: 12, borderTop: `1px solid ${BR}`, paddingTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ display: "flex", justifyContent: "center", paddingBottom: 4 }}>
                <LangButtons compact />
              </div>
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
                {t.landing.navLogin}
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
                {t.landing.navStartArrow}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}


/* ─── Section: Hero ───────────────────────────────────────────────────────── */

function Hero({ onStart }: { onStart: () => void }) {
  const { t } = useLanguage();
  return (
    <section
      style={{
        background: N,
        position: "relative",
        overflow: "hidden",
        paddingTop: 96,
        paddingBottom: 80,
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
        {/* Eyebrow */}
        <p
          style={{
            margin: "0 0 26px",
            fontSize: 12,
            fontWeight: 700,
            color: CY,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          {t.landing.heroEyebrow}
        </p>

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
          {t.landing.heroH1a}{" "}
          <br />
          <span style={{ color: CY }}>{t.landing.heroH1b}</span>
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
          {t.landing.heroSubtitle}
        </p>

        {/* Buttons */}
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12, marginBottom: 16 }}>
          <Link
            href="/demo"
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
              textDecoration: "none",
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
            {t.landing.heroCta1} <ChevronRight size={17} />
          </Link>
          <button
            onClick={onStart}
            style={{
              padding: "15px 32px",
              borderRadius: 100,
              fontSize: 15,
              fontWeight: 600,
              background: "transparent",
              border: `1px solid rgba(255,255,255,0.2)`,
              color: WH,
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
            {t.landing.heroCta2}
          </button>
        </div>

        {/* Microcopy */}
        <p style={{ margin: "0 0 32px", fontSize: 13, color: WM }}>
          {t.landing.heroMicro}
        </p>

        {/* Signature-Case card */}
        <div
          style={{
            background: NM,
            borderTop: `1px solid ${BR}`,
            borderRight: `1px solid ${BR}`,
            borderBottom: `1px solid ${BR}`,
            borderLeft: `3px solid ${CY}`,
            borderRadius: 16,
            padding: "36px 44px",
            textAlign: "left",
          }}
        >
          <p style={{ margin: "0 0 10px", fontSize: 12, color: WM, letterSpacing: "0.04em" }}>{t.landing.heroCardTime}</p>
          <p style={{ margin: "0 0 12px", fontSize: 11, fontWeight: 700, color: CY, letterSpacing: "0.1em", textTransform: "uppercase" }}>{t.landing.heroCardBadge}</p>
          <p style={{ margin: "0 0 6px", fontSize: 26, fontWeight: 600, color: WH, lineHeight: 1.3 }}>{t.landing.heroCardTitle}</p>
          <p style={{ margin: "0 0 28px", fontSize: 15, color: WD }}>{t.landing.heroCardDesc}</p>
          <div className="hero-flow">
            <span style={{ fontSize: 13, color: WH, fontWeight: 600 }}>{t.landing.heroFlowKontext}</span>
            <span className="hero-flow-sep">→</span>
            <span style={{ fontSize: 13, color: WM }}>{t.landing.heroFlowEntscheidung}</span>
            <span className="hero-flow-sep">→</span>
            <span style={{ fontSize: 13, color: WM }}>{t.landing.heroFlowKonsequenz}</span>
            <span className="hero-flow-sep">→</span>
            <span style={{ fontSize: 13, color: WM }}>{t.landing.heroFlowAuswertung}</span>
          </div>
        </div>
      </div>

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

/* ─── Section: Case Experience ────────────────────────────────────────────── */

function CaseExperience() {
  const { t } = useLanguage();
  return (
    <section
      style={{
        background: N,
        padding: "96px 24px 104px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "10%",
          right: "10%",
          height: 1,
          background: BR,
        }}
      />

      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn style={{ textAlign: "center", marginBottom: 64 }}>
          <p
            style={{
              margin: "0 0 18px",
              fontSize: 12,
              fontWeight: 700,
              color: CY,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            {t.landing.caseEyebrow}
          </p>
          <h2
            style={{
              margin: "0 0 20px",
              fontSize: "clamp(30px, 4vw, 48px)",
              fontWeight: 800,
              letterSpacing: "-0.5px",
              color: WH,
              lineHeight: 1.1,
            }}
          >
            {t.landing.caseH2}
          </h2>
          <p
            style={{
              margin: "0 auto",
              maxWidth: 460,
              fontSize: 17,
              lineHeight: 1.65,
              color: WD,
            }}
          >
            {t.landing.caseSubtitle}
          </p>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div style={{ position: "relative" }}>
            <div
              className="case-exp-line"
              style={{
                position: "absolute",
                top: 19,
                left: "13%",
                right: "13%",
                height: 1,
                background: BR,
                zIndex: 0,
              }}
            />
            <div className="case-exp-grid">

              {/* Step 1 – Kontext */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: N, border: `1.5px solid ${CY}`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14, zIndex: 1, flexShrink: 0 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: CY }}>1</span>
                </div>
                <p style={{ margin: "0 0 14px", fontSize: 10, fontWeight: 700, color: CY, letterSpacing: "0.12em", textTransform: "uppercase" }}>{t.landing.caseStep1Label}</p>
                <div style={{ width: "100%", background: "#131C31", border: "1px solid #243049", borderRadius: 10, padding: "20px 18px" }}>
                  <p style={{ margin: "0 0 4px", fontSize: 12, color: WM }}>{t.landing.caseCardTime}</p>
                  <p style={{ margin: "0 0 6px", fontSize: 15, fontWeight: 700, color: WH }}>{t.landing.caseCardTitle}</p>
                  <p style={{ margin: 0, fontSize: 13, color: WD }}>{t.landing.caseCardDesc}</p>
                </div>
              </div>

              {/* Step 2 */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: N, border: `1.5px solid ${CY}`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14, zIndex: 1, flexShrink: 0 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: CY }}>2</span>
                </div>
                <p style={{ margin: "0 0 14px", fontSize: 10, fontWeight: 700, color: CY, letterSpacing: "0.12em", textTransform: "uppercase" }}>{t.landing.caseStep2Label}</p>
                <div style={{ width: "100%", background: "#131C31", border: "1px solid #243049", borderRadius: 10, padding: "20px 18px" }}>
                  <p style={{ margin: 0, fontSize: 13, color: WD, lineHeight: 1.6 }}>{t.landing.caseEntschText}</p>
                </div>
              </div>

              {/* Step 3 */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: N, border: `1.5px solid ${CY}`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14, zIndex: 1, flexShrink: 0 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: CY }}>3</span>
                </div>
                <p style={{ margin: "0 0 14px", fontSize: 10, fontWeight: 700, color: CY, letterSpacing: "0.12em", textTransform: "uppercase" }}>{t.landing.caseStep3Label}</p>
                <div style={{ width: "100%", background: "#131C31", border: "1px solid #243049", borderRadius: 10, padding: "20px 18px" }}>
                  <p style={{ margin: 0, fontSize: 13, color: WD, lineHeight: 1.6, fontStyle: "italic", borderLeft: "3px solid #A78BFA", paddingLeft: 12 }}>{t.landing.caseKonsqText}</p>
                </div>
              </div>

              {/* Step 4 */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: N, border: `1.5px solid ${CY}`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14, zIndex: 1, flexShrink: 0 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: CY }}>4</span>
                </div>
                <p style={{ margin: "0 0 14px", fontSize: 10, fontWeight: 700, color: CY, letterSpacing: "0.12em", textTransform: "uppercase" }}>{t.landing.caseStep4Label}</p>
                <div style={{ width: "100%", background: "#131C31", border: "1px solid #243049", borderRadius: 10, padding: "20px 18px" }}>
                  <p style={{ margin: 0, fontSize: 13, color: WD, lineHeight: 1.6 }}>{t.landing.caseAuswText}</p>
                </div>
              </div>

            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.3} style={{ textAlign: "center", marginTop: 48 }}>
          <Link
            href="/demo"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "13px 28px",
              borderRadius: 100,
              fontSize: 14,
              fontWeight: 700,
              background: CY,
              color: N,
              textDecoration: "none",
              transition: "transform 0.15s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.04)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
          >
            {t.landing.caseCta} <ChevronRight size={14} />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── Section: Lifestyle ──────────────────────────────────────────────────── */

function Lifestyle() {
  const { t } = useLanguage();
  const lifestyleScenes = t.landing.lifestyleScenes;
  return (
    <section style={{ background: NM, padding: "96px 24px" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <FadeIn style={{ textAlign: "center", marginBottom: 56 }}>
          <h2
            style={{
              margin: "0 0 16px",
              fontSize: "clamp(26px, 4vw, 42px)",
              fontWeight: 800,
              letterSpacing: "-0.5px",
              color: WH,
              lineHeight: 1.15,
            }}
          >
            {t.landing.lifestyleH2a}<br />{t.landing.lifestyleH2b}
          </h2>
          <p style={{ margin: "0 auto", maxWidth: 440, fontSize: 17, color: WD, lineHeight: 1.6 }}>
            {t.landing.lifestyleSubtitle}
          </p>
        </FadeIn>

        <div style={{ display: "grid", gap: 16 }} className="sm:grid-cols-2 lg:grid-cols-4">
          {lifestyleScenes.map((s, i) => (
            <FadeIn key={s.place} delay={i * 0.08}>
              <div
                style={{
                  background: CB,
                  border: `1px solid ${BR}`,
                  borderRadius: 18,
                  padding: "28px 24px",
                  height: "100%",
                  transition: "border-color 0.2s, background 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = `${CY}33`;
                  (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.07)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = BR;
                  (e.currentTarget as HTMLDivElement).style.background = CB;
                }}
              >
                <p style={{ margin: "0 0 12px", fontSize: 11, fontWeight: 700, color: CY, letterSpacing: "0.14em", textTransform: "uppercase" }}>{s.place}</p>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: WD }}>{s.text}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}



/* ─── Section: Stats bar ──────────────────────────────────────────────────── */

function StatsBar() {
  const { ref, visible } = useInView();
  const { t } = useLanguage();
  const c1 = useCountUp(150, visible);
  const c2 = useCountUp(6, visible);
  const c3 = useCountUp(3, visible);

  const STATS = [
    { value: `${c1}+`, label: t.landing.statScenarios },
    { value: String(c2), label: t.landing.statModules },
    { value: String(c3), label: t.landing.statLevels },
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

function ProblemSolution() {
  const { t } = useLanguage();
  const problems = t.landing.problems;
  const solutions = t.landing.solutions;
  return (
    <section style={{ background: N, padding: "96px 24px" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <FadeIn className="text-center" style={{ marginBottom: 56 }}>
          <p style={{ margin: "0 0 8px", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: CY }}>
            {t.landing.probEyebrow}
          </p>
          <h2 style={{ margin: 0, fontSize: "clamp(26px,4vw,40px)", fontWeight: 800, letterSpacing: "-0.5px", color: WH }}>
            {t.landing.probH2}
          </h2>
        </FadeIn>

        <div style={{ display: "grid", gap: 24 }} className="sm:grid-cols-2">
          <FadeIn delay={0.1}>
            <div style={{ borderRadius: 20, border: "1px solid rgba(239,68,68,0.25)", background: "rgba(239,68,68,0.05)", padding: 36, height: "100%" }}>
              <span style={{ display: "inline-block", background: "rgba(239,68,68,0.15)", color: "#f87171", borderRadius: 100, padding: "4px 14px", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 20 }}>
                {t.landing.probBadge}
              </span>
              <h3 style={{ margin: "0 0 24px", fontSize: 20, fontWeight: 700, color: WH }}>
                {t.landing.probH3}
              </h3>
              <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
                {problems.map((p) => (
                  <li key={p} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, color: WD, lineHeight: 1.5 }}>
                    <XCircle size={15} style={{ flexShrink: 0, marginTop: 1, color: "#f87171" }} /> {p}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div style={{ borderRadius: 20, border: `1px solid ${CY}33`, background: `${CY}08`, padding: 36, height: "100%" }}>
              <span style={{ display: "inline-block", background: `${CY}20`, color: CY, borderRadius: 100, padding: "4px 14px", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 20 }}>
                {t.landing.solBadge}
              </span>
              <h3 style={{ margin: "0 0 24px", fontSize: 20, fontWeight: 700, color: WH }}>
                {t.landing.solH3}
              </h3>
              <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
                {solutions.map((s) => (
                  <li key={s} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, color: WD, lineHeight: 1.5 }}>
                    <CheckCircle2 size={15} style={{ flexShrink: 0, marginTop: 1, color: CY }} /> {s}
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

function HowItWorks() {
  const { t } = useLanguage();
  const HOW_STEPS = [
    { num: "01", Icon: ClipboardList, title: t.landing.howSteps[0].title, text: t.landing.howSteps[0].text },
    { num: "02", Icon: Scale, title: t.landing.howSteps[1].title, text: t.landing.howSteps[1].text },
    { num: "03", Icon: Lightbulb, title: t.landing.howSteps[2].title, text: t.landing.howSteps[2].text },
  ];
  return (
    <section id="how-it-works" style={{ background: NM, padding: "96px 24px" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <FadeIn style={{ textAlign: "center", marginBottom: 60 }}>
          <p style={{ margin: "0 0 8px", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: CY }}>
            {t.landing.howEyebrow}
          </p>
          <h2 style={{ margin: "0 0 10px", fontSize: "clamp(26px,4vw,40px)", fontWeight: 800, letterSpacing: "-0.5px", color: WH }}>
            {t.landing.howH2}
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
                    marginBottom: 20,
                  }}
                >
                  <step.Icon size={24} color={CY} strokeWidth={1.5} />
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
                  }}
                >
                  <ArrowRight size={16} color={WM} />
                </div>
              )}
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Section: Founder Story ──────────────────────────────────────────────── */

function FounderStory() {
  const { t } = useLanguage();
  return (
    <section style={{ background: N, padding: "148px 24px" }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ borderLeft: `3px solid ${CY}66`, paddingLeft: 28 }}>
            <p style={{ margin: "0 0 12px", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: CY }}>
              {t.landing.founderEyebrow}
            </p>
            <h2 style={{ margin: "0 0 32px", fontSize: "clamp(24px,3.5vw,36px)", fontWeight: 800, letterSpacing: "-0.5px", color: WH, lineHeight: 1.25 }}>
              {t.landing.founderH2a}<br />{t.landing.founderH2b}
            </h2>
            <p style={{ margin: "0 0 32px", fontSize: "clamp(20px, 2.4vw, 28px)", lineHeight: 1.55, color: WD, fontWeight: 400 }}>
              {t.landing.founderP1}
            </p>
            <p style={{ margin: "0 0 32px", fontSize: "clamp(20px, 2.4vw, 28px)", lineHeight: 1.55, color: WD, fontWeight: 400 }}>
              {t.landing.founderP2}
            </p>
            <p style={{ margin: "0 0 44px", fontSize: "clamp(20px, 2.4vw, 28px)", lineHeight: 1.55, color: CY, fontWeight: 700 }}>
              {t.landing.founderP3}
            </p>
            <Link
              href="/demo"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "13px 26px",
                borderRadius: 100,
                fontSize: 14,
                fontWeight: 700,
                background: CY,
                color: N,
                textDecoration: "none",
                transition: "transform 0.15s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.04)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
            >
              {t.landing.founderCta} <ChevronRight size={15} />
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── Section: Warum BankAcademy ──────────────────────────────────────────── */

function WarumBankAcademy() {
  const { t } = useLanguage();
  const WARUM_ITEMS = [
    { Icon: Landmark, title: t.landing.warumItems[0].title, desc: t.landing.warumItems[0].desc },
    { Icon: Shield, title: t.landing.warumItems[1].title, desc: t.landing.warumItems[1].desc },
    { Icon: Zap, title: t.landing.warumItems[2].title, desc: t.landing.warumItems[2].desc },
    { Icon: TrendingUp, title: t.landing.warumItems[3].title, desc: t.landing.warumItems[3].desc },
  ];
  return (
    <section style={{ background: NM, padding: "96px 24px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <FadeIn style={{ textAlign: "center", marginBottom: 56 }}>
          <p style={{ margin: "0 0 8px", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: CY }}>
            {t.landing.warumEyebrow}
          </p>
          <h2 style={{ margin: 0, fontSize: "clamp(26px,4vw,40px)", fontWeight: 800, letterSpacing: "-0.5px", color: WH, lineHeight: 1.2 }}>
            {t.landing.warumH2a}<br />{t.landing.warumH2b}
          </h2>
        </FadeIn>

        <div style={{ display: "grid", gap: 20 }} className="sm:grid-cols-2">
          {WARUM_ITEMS.map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.08}>
              <div
                style={{
                  background: CB,
                  border: `1px solid ${BR}`,
                  borderRadius: 18,
                  padding: "28px 24px",
                  display: "flex",
                  gap: 18,
                  alignItems: "flex-start",
                  transition: "transform 0.2s, box-shadow 0.2s, border-color 0.2s, background 0.2s",
                  height: "100%",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 40px rgba(0,0,0,0.3)";
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
                <div style={{
                  width: 48, height: 48, borderRadius: 14,
                  background: `${CY}15`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <item.Icon size={22} color={CY} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 style={{ margin: "0 0 8px", fontSize: 15, fontWeight: 700, color: WH }}>{item.title}</h3>
                  <p style={{ margin: 0, fontSize: 14, lineHeight: 1.65, color: WD }}>{item.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn style={{ textAlign: "center", marginTop: 52 }} delay={0.35}>
          <button
            onClick={() => { window.location.href = "/demo"; }}
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
            {t.landing.warumCta} <ChevronRight size={15} />
          </button>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── Section: Features ───────────────────────────────────────────────────── */

function Features() {
  const { t } = useLanguage();
  const FEATURE_CARDS = [
    { Icon: Target, title: t.landing.featureCards[0].title, text: t.landing.featureCards[0].text },
    { Icon: AlertTriangle, title: t.landing.featureCards[1].title, text: t.landing.featureCards[1].text },
    { Icon: Scale, title: t.landing.featureCards[2].title, text: t.landing.featureCards[2].text },
    { Icon: BarChart2, title: t.landing.featureCards[3].title, text: t.landing.featureCards[3].text },
    { Icon: GraduationCap, title: t.landing.featureCards[4].title, text: t.landing.featureCards[4].text },
    { Icon: MessageSquare, title: t.landing.featureCards[5].title, text: t.landing.featureCards[5].text },
  ];
  return (
    <section id="features" style={{ background: N, padding: "96px 24px" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <FadeIn style={{ textAlign: "center", marginBottom: 56 }}>
          <p style={{ margin: "0 0 8px", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: CY }}>
            {t.landing.featEyebrow}
          </p>
          <h2 style={{ margin: 0, fontSize: "clamp(26px,4vw,40px)", fontWeight: 800, letterSpacing: "-0.5px", color: WH }}>
            {t.landing.featH2}
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
                    marginBottom: 16,
                  }}
                >
                  <f.Icon size={22} color={CY} strokeWidth={1.5} />
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

function ModuleItem({ Icon, title, desc }: { Icon: LucideIcon; title: string; desc: string }) {
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
      <div style={{ width: 34, height: 34, borderRadius: 10, background: `${CY}15`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Icon size={16} color={CY} strokeWidth={1.5} />
      </div>
      <div>
        <p style={{ margin: "0 0 4px", fontSize: 13, fontWeight: 700, color: WH }}>{title}</p>
        <p style={{ margin: 0, fontSize: 12, lineHeight: 1.5, color: WM }}>{desc}</p>
      </div>
    </div>
  );
}

function Modules({ onStart: _onStart }: { onStart: () => void }) {
  const { t } = useLanguage();
  return (
    <section id="module" style={{ background: NM, padding: "96px 24px" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <FadeIn style={{ textAlign: "center", marginBottom: 56 }}>
          <p style={{ margin: "0 0 8px", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: CY }}>
            {t.landing.modEyebrow}
          </p>
          <h2 style={{ margin: "0 0 12px", fontSize: "clamp(26px,4vw,40px)", fontWeight: 800, letterSpacing: "-0.5px", color: WH }}>
            {t.landing.modH2}
          </h2>
          <p style={{ margin: "0 auto", maxWidth: 500, fontSize: 16, color: WD, lineHeight: 1.6 }}>
            {t.landing.modSubtitle}
          </p>
        </FadeIn>

        <div style={{ display: "grid", gap: 40 }} className="sm:grid-cols-2">
          <FadeIn delay={0.1}>
            <p style={{ margin: "0 0 16px", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: WM }}>
              {t.landing.modFrontOffice}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <ModuleItem Icon={User} title={t.landing.modPKTitle} desc={t.landing.modPKDesc} />
              <ModuleItem Icon={Building2} title={t.landing.modFKTitle} desc={t.landing.modFKDesc} />
              <ModuleItem Icon={TrendingUp} title={t.landing.modAKTitle} desc={t.landing.modAKDesc} />
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p style={{ margin: "0 0 16px", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: WM }}>
              {t.landing.modBackOffice}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <ModuleItem Icon={Landmark} title={t.landing.modBOTitle} desc={t.landing.modBODesc} />
              <ModuleItem Icon={CreditCard} title={t.landing.modCOTitle} desc={t.landing.modCODesc} />
            </div>
          </FadeIn>

          <FadeIn delay={0.25}>
            <p style={{ margin: "0 0 16px", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: WM }}>
              {t.landing.modChallengeSect}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <ModuleItem Icon={GraduationCap} title={t.landing.modCMTitle} desc={t.landing.modCMDesc} />
              <ModuleItem Icon={Map} title={t.landing.modLPTitle} desc={t.landing.modLPDesc} />
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p style={{ margin: "0 0 16px", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: WM }}>
              {t.landing.modSimSect}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <ModuleItem Icon={Users} title={t.landing.modAnlTitle} desc={t.landing.modAnlDesc} />
              <ModuleItem Icon={Home} title={t.landing.modHypTitle} desc={t.landing.modHypDesc} />
            </div>
          </FadeIn>
        </div>

        <FadeIn style={{ textAlign: "center", marginTop: 44 }} delay={0.35}>
          <button
            onClick={() => document.getElementById("fuer-banken")?.scrollIntoView({ behavior: "smooth" })}
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
            {t.landing.modCta} <ChevronRight size={15} />
          </button>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── Section: For Banks ──────────────────────────────────────────────────── */

function ForBanks({ onBankContact }: { onBankContact: () => void }) {
  const { t } = useLanguage();
  const B2B_CARDS = [
    { Icon: BarChart2, title: t.landing.b2bCards[0].title, text: t.landing.b2bCards[0].text },
    { Icon: Target, title: t.landing.b2bCards[1].title, text: t.landing.b2bCards[1].text },
    { Icon: Zap, title: t.landing.b2bCards[2].title, text: t.landing.b2bCards[2].text },
    { Icon: Shield, title: t.landing.b2bCards[3].title, text: t.landing.b2bCards[3].text },
  ];
  return (
    <section id="fuer-banken" style={{ background: N, padding: "96px 24px" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <div style={{ display: "grid", gap: 56, alignItems: "center" }} className="lg:grid-cols-2">
          {/* Text side */}
          <FadeIn delay={0.1}>
            <span style={{ display: "inline-block", background: `${PU}20`, color: PU, borderRadius: 100, padding: "4px 14px", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16 }}>
              {t.landing.bankBadge}
            </span>
            <h2 style={{ margin: "0 0 16px", fontSize: "clamp(26px,4vw,36px)", fontWeight: 800, letterSpacing: "-0.5px", color: WH, lineHeight: 1.15 }}>
              {t.landing.bankH2a}
              <br />
              {t.landing.bankH2b}
            </h2>
            <p style={{ margin: "0 0 28px", fontSize: 16, color: WD, lineHeight: 1.65 }}>
              {t.landing.bankText}
            </p>
            <button
              onClick={onBankContact}
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
                border: "none",
                cursor: "pointer",
                boxShadow: `0 4px 20px ${PU}44`,
                transition: "transform 0.15s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.04)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
            >
              {t.landing.bankCta} <ChevronRight size={15} />
            </button>
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
                  <div style={{ width: 40, height: 40, borderRadius: 11, background: `${PU}18`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
                    <b.Icon size={19} color={PU} strokeWidth={1.5} />
                  </div>
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

/* ─── Section: Contact ────────────────────────────────────────────────────── */

function ContactSection({ initialTab }: { initialTab?: "lernender" | "bank" }) {
  const { t } = useLanguage();
  return (
    <section id="kontakt" style={{ background: NM, padding: "96px 24px" }}>
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <FadeIn style={{ textAlign: "center", marginBottom: 40 }}>
          <p style={{ margin: "0 0 8px", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: CY }}>
            {t.landing.contactEyebrow}
          </p>
          <h2 style={{ margin: "0 0 10px", fontSize: "clamp(26px,4vw,40px)", fontWeight: 800, letterSpacing: "-0.5px", color: WH }}>
            {t.landing.contactH2}
          </h2>
          <p style={{ margin: 0, fontSize: 16, color: WD, lineHeight: 1.6 }}>
            {t.landing.contactSubtitle}
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div style={{
            background: "#fff",
            borderRadius: 24,
            padding: "44px 40px",
            boxShadow: "0 8px 40px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.06)",
          }}>
            <ContactForms initialTab={initialTab} />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── Section: Final CTA ──────────────────────────────────────────────────── */

function FinalCTA({ onStart }: { onStart: () => void }) {
  const { t } = useLanguage();
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
            {t.landing.ctaH2}
          </h2>
          <p style={{ margin: "0 0 36px", fontSize: 18, color: WD, lineHeight: 1.6 }}>
            {t.landing.ctaSubtitle}
          </p>
          <Link
            href="/demo"
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
              textDecoration: "none",
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
            {t.landing.ctaBtn} <ChevronRight size={18} />
          </Link>
        </div>
      </FadeIn>
    </section>
  );
}

/* ─── Access Code Modal ──────────────────────────────────────────────────── */
function AccessCodeModal({ onClose }: { onClose: () => void }) {
  const { t } = useLanguage();
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
        window.location.replace("/dashboard");
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
            {t.landing.accessTitle}
          </h2>
          <p style={{ margin: 0, fontSize: 14, color: "#6b7280", lineHeight: 1.5 }}>
            {t.landing.accessSubtitle}
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
            <p style={{ margin: 0, fontSize: 13, color: "#ef4444" }}>{t.landing.accessError}</p>
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
            {loading ? t.landing.accessLoading : t.landing.accessSubmit}
          </button>
        </form>

        <p style={{ margin: "20px 0 0", fontSize: 12, color: "#9ca3af", textAlign: "center" }}>
          {t.landing.accessNoCode}{" "}
          <a href="/kontakt" style={{ color: "#6b7280", textDecoration: "underline" }}>
            {t.landing.accessRequest}
          </a>
        </p>
      </div>
    </div>
  );
}

/* ─── Login Modal ────────────────────────────────────────────────────────── */
function LoginModal({ onClose }: { onClose: () => void }) {
  const { t } = useLanguage();
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
            {t.landing.loginTitle}
          </h2>
          <p style={{ margin: 0, fontSize: 14, color: "#6b7280", lineHeight: 1.5 }}>
            {t.landing.loginSubtitle}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", marginBottom: 6, fontSize: 13, fontWeight: 600, color: "#374151" }}>
              {t.landing.loginEmail}
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
              {t.landing.loginPassword}
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
                {t.landing.loginForgot}
              </button>
            </div>
            {showForgotMsg && (
              <div style={{ marginTop: 10, padding: "10px 14px", background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 10, fontSize: 13, color: "#374151" }}>
                {t.landing.loginForgotMsg}
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
            {t.landing.loginSubmit}
          </button>
        </form>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <div style={{ flex: 1, height: 1, background: "#e5e7eb" }} />
          <span style={{ fontSize: 13, color: "#9ca3af" }}>{t.landing.loginOr}</span>
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
          {t.landing.loginRegister}
        </button>

        {/* Footer note */}
        <p style={{ margin: 0, fontSize: 12, color: "#9ca3af", textAlign: "center", lineHeight: 1.5 }}>
          {t.landing.loginFooter}
        </p>
      </div>
    </div>
  );
}

/* ─── Footer ──────────────────────────────────────────────────────────────── */

function Footer({ onNav }: { onNav: (id: string) => void }) {
  const { t } = useLanguage();
  const COLS = [
    {
      cat: t.landing.footerColProduct,
      links: [
        { label: t.landing.footerFeatures, action: () => onNav("features") },
        { label: t.landing.footerModule, action: () => onNav("module") },
        { label: t.landing.footerFuerBanken, action: () => onNav("fuer-banken") },

      ],
    },
    {
      cat: t.landing.footerColResources,
      links: [
        { label: t.landing.footerGlossar, action: () => { window.location.href = "/glossar"; } },
        { label: t.landing.footerCommunity, action: () => { window.location.href = "/community"; } },
        { label: t.landing.footerChallenge, action: () => { window.location.href = "/challenge-modus"; } },
      ],
    },
    {
      cat: "Legal",
      links: [
        { label: t.landing.footerImpressum, action: () => { window.location.href = "/impressum"; } },
        { label: t.landing.footerDatenschutz, action: () => { window.location.href = "/datenschutz"; } },
        { label: t.landing.footerNutzung, action: () => { window.location.href = "/nutzungsbedingungen"; } },
        { label: t.landing.footerKontakt, action: () => { window.location.href = "/kontakt"; } },
      ],
    },
  ];

  return (
    <footer style={{ background: N, borderTop: `1px solid ${BR}` }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "64px 24px 32px" }}>
        <div style={{ display: "grid", gap: 40 }} className="sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <p style={{ margin: "0 0 12px", fontSize: 20, fontWeight: 800, letterSpacing: "-0.5px", color: WH }}>
              Bank<span style={{ color: CY }}>Academy</span>
            </p>
            <p style={{ margin: "0 0 4px", fontSize: 13, color: WD, lineHeight: 1.5, whiteSpace: "pre-line" }}>
              {t.landing.footerTagline}
            </p>
            <p style={{ margin: "8px 0 0", fontSize: 12, color: WM }}>{t.landing.footerCopyrightShort}</p>
          </div>

          {/* Link columns */}
          {COLS.map(({ cat, links }) => (
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
            {t.landing.footerCopyrightFull}
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
            {[
              { label: t.landing.footerImpressum, href: "/impressum" },
              { label: t.landing.footerDatenschutz, href: "/datenschutz" },
              { label: t.landing.footerNutzung, href: "/nutzungsbedingungen" },
              { label: t.landing.footerKontakt, href: "/kontakt" },
            ].map(({ label, href }) => (
              <a
                key={href}
                href={href}
                style={{ fontSize: 12, color: WM, textDecoration: "none", transition: "color 0.15s" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = WH; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = WM; }}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── Page ────────────────────────────────────────────────────────────────── */

export default function LandingPage() {
  const scrolled = useScrolled();
  const { setLang } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [contactTab, setContactTab] = useState<"lernender" | "bank">("lernender");

  useEffect(() => {
    try {
      if (localStorage.getItem("ba-lang")) return;
      const bl = navigator.language.toLowerCase();
      if (bl.startsWith("fr")) setLang("fr");
      else if (bl.startsWith("it")) setLang("it");
    } catch { /* ignore */ }
  }, [setLang]);

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
        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.45; transform: scale(0.8); }
        }
        .hero-flow { display: flex; align-items: center; flex-wrap: wrap; gap: 0; }
        .hero-flow-sep { color: rgba(248,250,252,0.28); margin: 0 14px; font-size: 12px; }
        @media (max-width: 640px) {
          .hero-flow { flex-direction: column; align-items: flex-start; gap: 8px; }
          .hero-flow-sep { display: none; }
        }
        .case-exp-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; position: relative; z-index: 1; }
        @media (max-width: 700px) {
          .case-exp-grid { grid-template-columns: 1fr; gap: 28px; }
          .case-exp-line { display: none !important; }
        }
      `}</style>

      <div style={{ minHeight: "100vh", background: N }}>
        <Navbar
          scrolled={scrolled}
          mobileOpen={mobileOpen}
          onToggle={() => setMobileOpen((v) => !v)}
          onNav={scrollTo}
          onLoginOpen={() => { setMobileOpen(false); window.location.href = "/sign-in"; }}
          onStart={() => { setMobileOpen(false); window.location.href = "/sign-up"; }}
        />
        <Hero onStart={() => { window.location.href = "/sign-up"; }} />
        <CaseExperience />
        <Lifestyle />
        <StatsBar />
        <FounderStory />
        <Modules onStart={() => { window.location.href = "/sign-up"; }} />
        <WarumBankAcademy />
        <ForBanks onBankContact={() => { setContactTab("bank"); scrollTo("kontakt"); }} />
        <ContactSection initialTab={contactTab} />
        <FinalCTA onStart={() => { window.location.href = "/sign-up"; }} />
        <Footer onNav={scrollTo} />
      </div>
    </>
  );
}
