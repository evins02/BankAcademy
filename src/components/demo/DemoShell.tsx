"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Menu } from "lucide-react";
import { DemoBanner } from "./DemoBanner";
import { DemoSidebar } from "./DemoSidebar";
import { LockedModuleOverlay } from "./LockedModuleOverlay";
import { DemoOnboardingModal } from "./DemoOnboardingModal";
import { FeedbackModal } from "./FeedbackModal";
import { ThemeApplier } from "@/components/shared/ThemeApplier";
import { BankingLabLogo } from "@/components/shared/BankingLabLogo";
import { useLanguage } from "@/context/LanguageContext";
import type { Lang } from "@/lib/i18n";

function LangPicker() {
  const { lang, setLang } = useLanguage();
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {(["de", "fr", "it"] as const).map((l: Lang) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          style={{
            padding: "2px 7px",
            borderRadius: 4,
            border: "none",
            cursor: "pointer",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.04em",
            background: lang === l ? "#0A1628" : "transparent",
            color: lang === l ? "#fff" : "#92400e",
            transition: "background 0.15s",
            textTransform: "uppercase",
          }}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

export function DemoShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { t } = useLanguage();

  // Ensure the demo access cookie is set so AI endpoints (kyc-chat, simulation/chat) work
  useEffect(() => {
    fetch("/api/demo-access", { method: "POST" }).catch(() => {});
  }, []);

  const [sidebarLocked, setSidebarLocked] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [demoEmail, setDemoEmail] = useState("");
  const [demoVorname, setDemoVorname] = useState("");

  useEffect(() => {
    try {
      setDemoEmail(localStorage.getItem("demo-email") ?? "");
      setDemoVorname(localStorage.getItem("demo-vorname") ?? "");
    } catch {}
  }, []);

  function clearDemoSession() {
    try {
      localStorage.removeItem("demo-seen");
      localStorage.removeItem("demo-email");
      localStorage.removeItem("demo-vorname");
    } catch {}
  }

  function handleLogout() {
    clearDemoSession();
    router.push("/");
  }

  function handleFeedbackSubmitted() {
    setFeedbackOpen(false);
    clearDemoSession();
    router.push("/");
  }

  return (
    <>
      <ThemeApplier />
      <DemoOnboardingModal />
      {feedbackOpen && (
        <FeedbackModal
          onClose={() => setFeedbackOpen(false)}
          onSubmitted={handleFeedbackSubmitted}
          email={demoEmail}
          vorname={demoVorname}
        />
      )}
      {sidebarLocked && <LockedModuleOverlay onBack={() => setSidebarLocked(false)} />}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          overflow: "hidden",
          background: "var(--background, #F8F9FD)",
        }}
      >
        {/* Mobile-only top nav: white background so logo is visible */}
        <div className="md:hidden flex items-center justify-between border-b border-border bg-surface px-4 shrink-0" style={{ height: 52 }}>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="rounded-lg p-1.5 text-text-secondary hover:bg-gray-100 transition-colors"
              aria-label={t.demo.menuOpen}
            >
              <Menu size={20} />
            </button>
            <Link href="/demo" className="flex items-center gap-2">
              <BankingLabLogo size="sm" />
              <span className="text-sm font-bold text-text-primary">BankAcademy</span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <LangPicker />
            {demoVorname && (
              <button
                onClick={handleLogout}
                title={t.demo.logoutTitle}
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  background: "#0D1B4B",
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 12,
                  fontWeight: 800,
                  userSelect: "none",
                }}
              >
                {demoVorname[0].toUpperCase()}
              </button>
            )}
          </div>
        </div>

        <DemoBanner
          onFeedback={() => setFeedbackOpen(true)}
          langPicker={<LangPicker />}
        />
        <div style={{ display: "flex", flex: 1, overflow: "hidden", position: "relative" }}>
          {/* Mobile backdrop */}
          {mobileOpen && (
            <div
              className="fixed inset-0 z-40 bg-black/50 md:hidden"
              onClick={() => setMobileOpen(false)}
            />
          )}

          {/* Sidebar — drawer on mobile, static on desktop */}
          <div
            className={[
              "md:relative md:flex md:shrink-0",
              mobileOpen ? "fixed inset-y-0 left-0 z-50 flex" : "hidden md:flex",
            ].join(" ")}
          >
            <DemoSidebar onLock={() => setSidebarLocked(true)} onClose={() => setMobileOpen(false)} />
          </div>

          <main
            id="main-content"
            className="flex flex-1 flex-col overflow-hidden animate-fade-in min-w-0"
          >
            {children}
          </main>
        </div>
      </div>

      {/* Floating feedback bubble */}
      {!feedbackOpen && (
        <button
          onClick={() => setFeedbackOpen(true)}
          style={{
            position: "fixed",
            bottom: 24,
            right: 24,
            zIndex: 900,
            background: "#0D1B4B",
            color: "#fff",
            border: "none",
            borderRadius: 50,
            padding: "11px 20px",
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
            boxShadow: "0 4px 24px rgba(13,27,75,0.35)",
            display: "flex",
            alignItems: "center",
            gap: 8,
            transition: "opacity 0.15s, transform 0.15s",
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = "0.88"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = "1"; }}
        >
          💬 {t.demo.feedbackBtn}
        </button>
      )}
    </>
  );
}
