"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  BarChart2,
  CheckCircle2,
  ChevronRight,
  Eye,
  EyeOff,
  Menu,
  Settings2,
  Shield,
  Target,
  User,
  X,
  Zap,
} from "lucide-react";
import { ContactForms } from "@/components/shared/ContactForms";
import { useLanguage } from "@/context/LanguageContext";
import type { Lang } from "@/lib/i18n";

/* ─── Feature flags ───────────────────────────────────────────────────────── */

const SHOW_MINI_CHALLENGE = process.env.NEXT_PUBLIC_SHOW_MINI_CHALLENGE === "true";

/* ─── Design tokens ───────────────────────────────────────────────────────── */

const N = "#0A1628";
const NM = "#0D1F3C";
const CY = "#00D4B8";
const PU = "#7B6FE8";
const WH = "#F8FAFC";
const WD = "rgba(248,250,252,0.65)";
const WM = "rgba(248,250,252,0.38)";
const BR = "rgba(255,255,255,0.08)";
const CB = "rgba(255,255,255,0.04)";

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
}: {
  scrolled: boolean;
  mobileOpen: boolean;
  onToggle: () => void;
  onNav: (id: string) => void;
}) {
  const { t } = useLanguage();
  const NAV_ITEMS = [
    { label: t.landing.navSoFunktionierts, id: "so-funktionierts" },
    { label: t.landing.navTrainingsbereiche, id: "trainingsbereiche" },
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
          <Link
            href="/demo"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
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
            {t.landing.navDemo}
          </Link>
        </nav>

        {/* Desktop CTA */}
        <div style={{ display: "flex", gap: 12, alignItems: "center" }} className="hidden md:flex">
          <LangButtons />
          <div style={{ width: 1, height: 18, background: BR }} />
          <Link
            href="/sign-in"
            style={{
              background: "none",
              border: `1px solid ${BR}`,
              cursor: "pointer",
              padding: "8px 18px",
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 500,
              color: WD,
              textDecoration: "none",
              transition: "all 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = WH;
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = WD;
              e.currentTarget.style.borderColor = BR;
            }}
          >
            {t.landing.navLogin}
          </Link>
          <Link
            href="/demo"
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
              textDecoration: "none",
              transition: "transform 0.15s, box-shadow 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.04)";
              e.currentTarget.style.boxShadow = `0 4px 20px ${CY}66`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            {t.landing.navDemoBtn} <ChevronRight size={14} />
          </Link>
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
          aria-label="Menu"
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
            <Link
              href="/demo"
              onClick={() => onNav("")}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "12px 16px",
                borderRadius: 10,
                fontSize: 15,
                color: WD,
                textDecoration: "none",
                display: "block",
              }}
            >
              {t.landing.navDemo}
            </Link>
            <div style={{ marginTop: 12, borderTop: `1px solid ${BR}`, paddingTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ display: "flex", justifyContent: "center", paddingBottom: 4 }}>
                <LangButtons compact />
              </div>
              <Link
                href="/sign-in"
                style={{
                  display: "block",
                  padding: "12px 16px",
                  borderRadius: 12,
                  border: `1px solid rgba(255,255,255,0.2)`,
                  background: "none",
                  fontSize: 14,
                  fontWeight: 600,
                  color: WH,
                  textAlign: "center",
                  textDecoration: "none",
                }}
              >
                {t.landing.navLogin}
              </Link>
              <Link
                href="/demo"
                style={{
                  display: "block",
                  padding: "12px 16px",
                  borderRadius: 100,
                  fontSize: 14,
                  fontWeight: 700,
                  background: CY,
                  color: N,
                  textAlign: "center",
                  textDecoration: "none",
                }}
              >
                {t.landing.navDemoBtn}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

/* ─── Section: Hero ───────────────────────────────────────────────────────── */

function Hero({ onBankScroll }: { onBankScroll: () => void }) {
  const { t } = useLanguage();
  return (
    <section
      id="hero"
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
          {t.landing.heroH1a}
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
            onClick={onBankScroll}
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
      id="so-funktionierts"
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
              maxWidth: 520,
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
            <p style={{ margin: "0 0 16px", fontSize: 12, fontWeight: 700, color: PU, letterSpacing: "0.14em", textTransform: "uppercase" }}>
              {t.landing.bankEyebrow}
            </p>
            <h2 style={{ margin: "0 0 16px", fontSize: "clamp(26px,4vw,36px)", fontWeight: 800, letterSpacing: "-0.5px", color: WH, lineHeight: 1.15 }}>
              {t.landing.bankH2a}
              <br />
              <span style={{ color: PU }}>{t.landing.bankH2b}</span>
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

/* ─── Section: Einsatzbereiche ────────────────────────────────────────────── */

function Einsatzbereiche() {
  const { t } = useLanguage();
  const cards = t.landing.einCards;
  const badgeColors = [
    { bg: `${CY}20`, color: CY, borderTop: CY, cardBg: `${CY}06`, cardBorder: `${CY}33` },
    { bg: `${WM}20`, color: WM, borderTop: "transparent", cardBg: CB, cardBorder: BR },
    { bg: `${PU}20`, color: PU, borderTop: "transparent", cardBg: CB, cardBorder: BR },
  ];
  return (
    <section id="trainingsbereiche" style={{ background: N, padding: "96px 24px" }}>
      <div
        style={{
          position: "absolute" as const,
        }}
      />
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn style={{ textAlign: "center", marginBottom: 56 }}>
          <p style={{ margin: "0 0 18px", fontSize: 12, fontWeight: 700, color: CY, letterSpacing: "0.14em", textTransform: "uppercase" }}>
            {t.landing.einEyebrow}
          </p>
          <h2 style={{ margin: "0 0 20px", fontSize: "clamp(26px,4vw,42px)", fontWeight: 800, letterSpacing: "-0.5px", color: WH, lineHeight: 1.15 }}>
            {t.landing.einH2}
          </h2>
          <p style={{ margin: "0 auto", maxWidth: 600, fontSize: 17, lineHeight: 1.65, color: WD }}>
            {t.landing.einSubtitle}
          </p>
        </FadeIn>

        <div style={{ display: "grid", gap: 20 }} className="lg:grid-cols-3">
          {cards.map((card, i) => {
            const theme = badgeColors[i];
            return (
              <FadeIn key={card.title} delay={i * 0.1}>
                <div
                  style={{
                    background: theme.cardBg,
                    border: `1px solid ${theme.cardBorder}`,
                    borderTop: i === 0 ? `3px solid ${theme.borderTop}` : `1px solid ${theme.cardBorder}`,
                    borderRadius: 18,
                    padding: "32px 28px",
                    height: "100%",
                    transition: "transform 0.2s, box-shadow 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 40px rgba(0,0,0,0.25)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      background: theme.bg,
                      color: theme.color,
                      borderRadius: 100,
                      padding: "4px 12px",
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: "0.06em",
                      marginBottom: 16,
                    }}
                  >
                    {card.badge}
                  </span>
                  <h3 style={{ margin: "0 0 12px", fontSize: 20, fontWeight: 700, color: WH }}>{card.title}</h3>
                  <p style={{ margin: 0, fontSize: 15, lineHeight: 1.65, color: WD }}>{card.text}</p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── Section: MiniChallenge ──────────────────────────────────────────────── */

type ChallengePhase = "scenario" | "feedback" | "followup" | "followup-feedback" | "done";

function MiniChallenge() {
  const { t } = useLanguage();
  const [phase, setPhase] = useState<ChallengePhase>("scenario");
  const [selectedA, setSelectedA] = useState<"A" | "B" | "C" | null>(null);
  const [selectedA2, setSelectedA2] = useState<"A2" | "B2" | null>(null);

  function reset() {
    setPhase("scenario");
    setSelectedA(null);
    setSelectedA2(null);
  }

  function handleSelect(opt: "A" | "B" | "C") {
    setSelectedA(opt);
    setPhase("feedback");
  }

  function handleSelect2(opt: "A2" | "B2") {
    setSelectedA2(opt);
    setPhase("followup-feedback");
  }

  const feedbackMap = {
    A: t.landing.challengeFeedbackA,
    B: t.landing.challengeFeedbackB,
    C: t.landing.challengeFeedbackC,
  };
  const feedbackMap2 = {
    A2: t.landing.challengeFeedbackA2,
    B2: t.landing.challengeFeedbackB2,
  };

  return (
    <section id="mini-challenge" style={{ background: NM, padding: "96px 24px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <FadeIn style={{ textAlign: "center", marginBottom: 40 }}>
          <p style={{ margin: "0 0 18px", fontSize: 12, fontWeight: 700, color: CY, letterSpacing: "0.14em", textTransform: "uppercase" }}>
            {t.landing.challengeEyebrow}
          </p>
          <h2 style={{ margin: "0 0 16px", fontSize: "clamp(28px,4vw,44px)", fontWeight: 800, letterSpacing: "-0.5px", color: WH, lineHeight: 1.1 }}>
            {t.landing.challengeH2}
          </h2>
          <p style={{ margin: "0 auto", maxWidth: 540, fontSize: 17, lineHeight: 1.65, color: WD }}>
            {t.landing.challengeIntro}
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          {/* Scenario card */}
          <div
            style={{
              background: CB,
              border: `1px solid ${BR}`,
              borderRadius: 16,
              padding: "28px 28px 24px",
              marginBottom: 24,
            }}
          >
            <p style={{ margin: "0 0 4px", fontSize: 11, fontWeight: 700, color: CY, letterSpacing: "0.1em", textTransform: "uppercase" }}>Szenario</p>
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.7, color: WD }}>{t.landing.challengeScenario}</p>
          </div>

          {/* Phase: scenario */}
          {phase === "scenario" && (
            <div>
              <p style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 600, color: WH }}>{t.landing.challengeQuestion}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {(["A", "B", "C"] as const).map((opt) => {
                  const texts = { A: t.landing.challengeA, B: t.landing.challengeB, C: t.landing.challengeC };
                  return (
                    <button
                      key={opt}
                      onClick={() => handleSelect(opt)}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 14,
                        padding: "16px 18px",
                        borderRadius: 12,
                        border: `1px solid ${BR}`,
                        background: CB,
                        color: WD,
                        fontSize: 14,
                        lineHeight: 1.6,
                        textAlign: "left",
                        cursor: "pointer",
                        transition: "border-color 0.15s, background 0.15s",
                        outline: "none",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = `${CY}44`;
                        e.currentTarget.style.background = "rgba(255,255,255,0.07)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = BR;
                        e.currentTarget.style.background = CB;
                      }}
                      onFocus={(e) => { e.currentTarget.style.outline = `2px solid ${CY}`; }}
                      onBlur={(e) => { e.currentTarget.style.outline = "none"; }}
                    >
                      <span style={{ fontWeight: 700, color: CY, flexShrink: 0, fontSize: 13 }}>{opt}</span>
                      {texts[opt]}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Phase: feedback */}
          {phase === "feedback" && selectedA && (
            <div>
              <p style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 600, color: WH }}>{t.landing.challengeQuestion}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
                {(["A", "B", "C"] as const).map((opt) => {
                  const texts = { A: t.landing.challengeA, B: t.landing.challengeB, C: t.landing.challengeC };
                  const isSelected = opt === selectedA;
                  const isBest = opt === "B";
                  return (
                    <div
                      key={opt}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 14,
                        padding: "16px 18px",
                        borderRadius: 12,
                        border: isSelected ? `1.5px solid ${CY}` : `1px solid ${BR}`,
                        background: isSelected ? `${CY}0d` : CB,
                        color: WD,
                        fontSize: 14,
                        lineHeight: 1.6,
                        opacity: !isSelected ? 0.55 : 1,
                      }}
                    >
                      <span style={{ fontWeight: 700, color: isSelected ? CY : WM, flexShrink: 0, fontSize: 13 }}>{opt}</span>
                      <span>{texts[opt]}</span>
                      {isBest && isSelected && <CheckCircle2 size={16} color={CY} style={{ flexShrink: 0, marginTop: 2 }} />}
                    </div>
                  );
                })}
              </div>

              {/* Feedback box */}
              <div
                style={{
                  background: selectedA === "B" ? `${CY}0d` : `${WM}08`,
                  border: `1px solid ${selectedA === "B" ? `${CY}44` : BR}`,
                  borderRadius: 14,
                  padding: "20px 22px",
                  marginBottom: 16,
                }}
              >
                {selectedA === "B" && (
                  <p style={{ margin: "0 0 8px", fontSize: 11, fontWeight: 700, color: CY, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    {t.landing.challengeBestLabel}
                  </p>
                )}
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: WD }}>{feedbackMap[selectedA]}</p>
              </div>

              {/* Continue to followup */}
              <button
                onClick={() => setPhase("followup")}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 7,
                  padding: "11px 22px",
                  borderRadius: 100,
                  fontSize: 14,
                  fontWeight: 700,
                  background: CY,
                  color: N,
                  border: "none",
                  cursor: "pointer",
                  transition: "transform 0.15s",
                  outline: "none",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.04)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
                onFocus={(e) => { e.currentTarget.style.outline = `2px solid ${CY}`; }}
                onBlur={(e) => { e.currentTarget.style.outline = "none"; }}
              >
                Weiter <ChevronRight size={14} />
              </button>
            </div>
          )}

          {/* Phase: followup */}
          {phase === "followup" && (
            <div>
              <div
                style={{
                  background: `${CY}08`,
                  border: `1px solid ${CY}33`,
                  borderRadius: 14,
                  padding: "20px 22px",
                  marginBottom: 24,
                }}
              >
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: WD }}>{t.landing.challengeFollowupInfo}</p>
              </div>
              <p style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 600, color: WH }}>{t.landing.challengeFollowupQ}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {(["A2", "B2"] as const).map((opt) => {
                  const texts = { A2: t.landing.challengeA2, B2: t.landing.challengeB2 };
                  return (
                    <button
                      key={opt}
                      onClick={() => handleSelect2(opt)}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 14,
                        padding: "16px 18px",
                        borderRadius: 12,
                        border: `1px solid ${BR}`,
                        background: CB,
                        color: WD,
                        fontSize: 14,
                        lineHeight: 1.6,
                        textAlign: "left",
                        cursor: "pointer",
                        transition: "border-color 0.15s, background 0.15s",
                        outline: "none",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = `${CY}44`;
                        e.currentTarget.style.background = "rgba(255,255,255,0.07)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = BR;
                        e.currentTarget.style.background = CB;
                      }}
                      onFocus={(e) => { e.currentTarget.style.outline = `2px solid ${CY}`; }}
                      onBlur={(e) => { e.currentTarget.style.outline = "none"; }}
                    >
                      <span style={{ fontWeight: 700, color: CY, flexShrink: 0, fontSize: 13 }}>{opt.replace("2", "")}</span>
                      {texts[opt]}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Phase: followup-feedback */}
          {phase === "followup-feedback" && selectedA2 && (
            <div>
              <div
                style={{
                  background: `${CY}08`,
                  border: `1px solid ${CY}33`,
                  borderRadius: 14,
                  padding: "20px 22px",
                  marginBottom: 20,
                }}
              >
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: WD }}>{t.landing.challengeFollowupInfo}</p>
              </div>
              <p style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 600, color: WH }}>{t.landing.challengeFollowupQ}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
                {(["A2", "B2"] as const).map((opt) => {
                  const texts = { A2: t.landing.challengeA2, B2: t.landing.challengeB2 };
                  const isSelected = opt === selectedA2;
                  return (
                    <div
                      key={opt}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 14,
                        padding: "16px 18px",
                        borderRadius: 12,
                        border: isSelected ? `1.5px solid ${CY}` : `1px solid ${BR}`,
                        background: isSelected ? `${CY}0d` : CB,
                        color: WD,
                        fontSize: 14,
                        lineHeight: 1.6,
                        opacity: !isSelected ? 0.55 : 1,
                      }}
                    >
                      <span style={{ fontWeight: 700, color: isSelected ? CY : WM, flexShrink: 0, fontSize: 13 }}>{opt.replace("2", "")}</span>
                      <span>{texts[opt]}</span>
                    </div>
                  );
                })}
              </div>
              <div
                style={{
                  background: CB,
                  border: `1px solid ${BR}`,
                  borderRadius: 14,
                  padding: "20px 22px",
                  marginBottom: 20,
                }}
              >
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: WD }}>{feedbackMap2[selectedA2]}</p>
              </div>
              {/* Disclaimer + CTA */}
              <div
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: `1px solid ${BR}`,
                  borderRadius: 12,
                  padding: "14px 18px",
                  marginBottom: 20,
                }}
              >
                <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: WM }}>{t.landing.challengeDisclaimer}</p>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                <Link
                  href="/demo"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 7,
                    padding: "11px 22px",
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
                  {t.landing.challengeCtaDemo} <ChevronRight size={14} />
                </Link>
                <button
                  onClick={reset}
                  style={{
                    padding: "11px 22px",
                    borderRadius: 100,
                    fontSize: 14,
                    fontWeight: 600,
                    background: "transparent",
                    border: `1px solid rgba(255,255,255,0.2)`,
                    color: WD,
                    cursor: "pointer",
                    transition: "background 0.15s",
                    outline: "none",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                  onFocus={(e) => { e.currentTarget.style.outline = `2px solid ${CY}`; }}
                  onBlur={(e) => { e.currentTarget.style.outline = "none"; }}
                >
                  {t.landing.challengeReset}
                </button>
              </div>
            </div>
          )}
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── Section: Demo Video ─────────────────────────────────────────────────── */

function DemoVideo() {
  const { ref: zoomRef, scale } = useScrollZoom(0.86);
  const { t } = useLanguage();

  return (
    <section
      id="demo-video"
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
          inset: 0,
          background: `radial-gradient(ellipse 70% 60% at 50% 50%, ${CY}0d 0%, transparent 65%)`,
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", maxWidth: 960, margin: "0 auto" }}>
        <FadeIn style={{ textAlign: "center", marginBottom: 48 }}>
          <h2
            style={{
              margin: "0 0 12px",
              fontSize: "clamp(26px,4vw,42px)",
              fontWeight: 800,
              letterSpacing: "-0.5px",
              color: WH,
              lineHeight: 1.15,
            }}
          >
            {t.landing.demoH2}
          </h2>
          <p style={{ margin: 0, fontSize: 17, color: WD, lineHeight: 1.6 }}>
            {t.landing.demoSubtitle}
          </p>
        </FadeIn>

        <div
          ref={zoomRef}
          style={{
            maxWidth: 900,
            margin: "0 auto",
            transform: `scale(${scale})`,
            transformOrigin: "center center",
            willChange: "transform",
          }}
        >
          <div
            style={{
              borderRadius: 18,
              overflow: "hidden",
              boxShadow: "0 8px 24px rgba(0,0,0,0.35), 0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.07)",
            }}
          >
            <video
              controls
              autoPlay
              muted
              loop
              playsInline
              style={{ width: "100%", display: "block", borderRadius: 0 }}
            >
              <source src="/demo-video.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

        {/* Disclaimer */}
        <FadeIn delay={0.2} style={{ textAlign: "center", marginTop: 16 }}>
          <p style={{ margin: 0, fontSize: 13, color: WM, lineHeight: 1.5 }}>
            {t.landing.demoDisclaimer}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── Section: Modules ────────────────────────────────────────────────────── */

function Modules() {
  const { t } = useLanguage();
  const MOD_CARDS = [
    {
      Icon: User,
      title: t.landing.modFrontOfficeTitle,
      subtitle: t.landing.modFrontOfficeSub,
      text: t.landing.modFrontOfficeText,
    },
    {
      Icon: Settings2,
      title: t.landing.modBackOfficeTitle,
      subtitle: t.landing.modBackOfficeSub,
      text: t.landing.modBackOfficeText,
    },
  ];

  return (
    <section id="module" style={{ background: NM, padding: "96px 24px" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <FadeIn style={{ textAlign: "center", marginBottom: 56 }}>
          <p style={{ margin: "0 0 18px", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: CY }}>
            {t.landing.modEyebrow}
          </p>
          <h2 style={{ margin: "0 0 16px", fontSize: "clamp(26px,4vw,40px)", fontWeight: 800, letterSpacing: "-0.5px", color: WH, lineHeight: 1.15 }}>
            {t.landing.modH2}
          </h2>
          <p style={{ margin: "0 auto", maxWidth: 500, fontSize: 16, color: WD, lineHeight: 1.6 }}>
            {t.landing.modSubtitle}
          </p>
        </FadeIn>

        <div style={{ display: "grid", gap: 20 }} className="sm:grid-cols-2">
          {MOD_CARDS.map((card, i) => (
            <FadeIn key={card.title} delay={i * 0.12}>
              <div
                style={{
                  background: CB,
                  border: `1px solid ${BR}`,
                  borderRadius: 20,
                  padding: "36px 32px",
                  height: "100%",
                  transition: "transform 0.2s, box-shadow 0.2s, border-color 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 40px rgba(0,0,0,0.3)";
                  (e.currentTarget as HTMLDivElement).style.borderColor = `${CY}33`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                  (e.currentTarget as HTMLDivElement).style.borderColor = BR;
                }}
              >
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 18,
                    background: `${CY}15`,
                    border: `1px solid ${CY}25`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 24,
                  }}
                >
                  <card.Icon size={28} color={CY} strokeWidth={1.5} />
                </div>
                <h3 style={{ margin: "0 0 8px", fontSize: 22, fontWeight: 700, color: WH }}>{card.title}</h3>
                <p style={{ margin: "0 0 14px", fontSize: 14, fontWeight: 600, color: WM }}>{card.subtitle}</p>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.65, color: WD }}>{card.text}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn style={{ textAlign: "center", marginTop: 44 }} delay={0.25}>
          <Link
            href="/demo"
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
              textDecoration: "none",
              transition: "transform 0.15s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.04)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
          >
            {t.landing.modCta} <ChevronRight size={15} />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── Section: Founder Story ──────────────────────────────────────────────── */

function FounderStory() {
  const { t } = useLanguage();
  return (
    <section id="gruender" style={{ background: N, padding: "96px 24px" }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ borderLeft: `3px solid ${CY}66`, paddingLeft: 28 }}>
            <p style={{ margin: "0 0 12px", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: CY }}>
              {t.landing.founderEyebrow}
            </p>
            <h2 style={{ margin: "0 0 32px", fontSize: "clamp(24px,3.5vw,36px)", fontWeight: 800, letterSpacing: "-0.5px", color: WH, lineHeight: 1.25 }}>
              {t.landing.founderH2a}<br />{t.landing.founderH2b}
            </h2>
            <p style={{ margin: "0 0 28px", fontSize: "clamp(17px, 2vw, 22px)", lineHeight: 1.7, color: WD, fontWeight: 400 }}>
              {t.landing.founderP1}
            </p>
            <p style={{ margin: "0 0 28px", fontSize: "clamp(17px, 2vw, 22px)", lineHeight: 1.7, color: WD, fontWeight: 400 }}>
              {t.landing.founderP2}
            </p>
            <p style={{ margin: "0 0 28px", fontSize: "clamp(17px, 2vw, 22px)", lineHeight: 1.7, color: WD, fontWeight: 400 }}>
              {t.landing.founderP3}
            </p>
            <p style={{ margin: "0 0 40px", fontSize: "clamp(17px, 2vw, 22px)", lineHeight: 1.7, color: CY, fontWeight: 700 }}>
              {t.landing.founderP4}
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

function FinalCTA({ onBankContact }: { onBankContact: () => void }) {
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
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
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
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12 }}>
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
            <button
              onClick={onBankContact}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                padding: "17px 32px",
                borderRadius: 100,
                fontSize: 15,
                fontWeight: 600,
                background: "transparent",
                border: `1px solid rgba(255,255,255,0.25)`,
                color: WH,
                cursor: "pointer",
                transition: "background 0.15s, border-color 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.07)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)";
              }}
            >
              {t.landing.ctaBtnBank}
            </button>
          </div>
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
          <h2 style={{ margin: "0 0 8px", fontSize: 21, fontWeight: 700, color: "#111827", letterSpacing: "-0.3px" }}>
            {t.landing.loginTitle}
          </h2>
          <p style={{ margin: 0, fontSize: 14, color: "#6b7280", lineHeight: 1.5 }}>
            {t.landing.loginSubtitle}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
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

        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <div style={{ flex: 1, height: 1, background: "#e5e7eb" }} />
          <span style={{ fontSize: 13, color: "#9ca3af" }}>{t.landing.loginOr}</span>
          <div style={{ flex: 1, height: 1, background: "#e5e7eb" }} />
        </div>

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
        { label: t.landing.footerSoFunktionierts, action: () => onNav("so-funktionierts") },
        { label: t.landing.footerTrainingsbereiche, action: () => onNav("trainingsbereiche") },
        { label: t.landing.footerFuerBanken, action: () => onNav("fuer-banken") },
      ],
    },
    {
      cat: t.landing.footerColResources,
      links: [
        { label: t.landing.footerDemo, action: () => { window.location.href = "/demo"; } },
        { label: t.landing.footerGlossar, action: () => { window.location.href = "/glossar"; } },
        { label: t.landing.footerKontakt, action: () => onNav("kontakt") },
      ],
    },
    {
      cat: t.landing.footerColLegal,
      links: [
        { label: t.landing.footerImpressum, action: () => { window.location.href = "/impressum"; } },
        { label: t.landing.footerDatenschutz, action: () => { window.location.href = "/datenschutz"; } },
        { label: t.landing.footerNutzung, action: () => { window.location.href = "/nutzungsbedingungen"; } },
        { label: t.landing.footerKontakt, action: () => onNav("kontakt") },
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
  // Keep modal state for modals used elsewhere (sign-in redirects to /sign-in now)
  const [_showAccessModal, setShowAccessModal] = useState(false);
  const [_showLoginModal, setShowLoginModal] = useState(false);

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
      const el = document.getElementById(id);
      if (!el) return;
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }, delay);
  }

  function handleBankContact() {
    setContactTab("bank");
    scrollTo("kontakt");
  }

  // Suppress unused variable warnings — modals kept for future use
  void setShowAccessModal;
  void setShowLoginModal;

  return (
    <>
      <style>{`
        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.45; transform: scale(0.8); }
        }
        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalSlideIn {
          from { opacity: 0; transform: scale(0.92) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
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
        @media (prefers-reduced-motion: reduce) {
          * { transition: none !important; animation: none !important; }
        }
      `}</style>

      <div id="main-content" style={{ minHeight: "100vh", background: N }}>
        <Navbar
          scrolled={scrolled}
          mobileOpen={mobileOpen}
          onToggle={() => setMobileOpen((v) => !v)}
          onNav={scrollTo}
        />
        <Hero onBankScroll={() => scrollTo("fuer-banken")} />
        <CaseExperience />
        <ForBanks onBankContact={handleBankContact} />
        <Einsatzbereiche />
        {SHOW_MINI_CHALLENGE && <MiniChallenge />}
        <DemoVideo />
        <Modules />
        <FounderStory />
        <ContactSection initialTab={contactTab} />
        <FinalCTA onBankContact={handleBankContact} />
        <Footer onNav={scrollTo} />
      </div>
    </>
  );
}
