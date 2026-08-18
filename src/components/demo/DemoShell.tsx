"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { DemoBanner } from "./DemoBanner";
import { DemoSidebar } from "./DemoSidebar";
import { LockedModuleOverlay } from "./LockedModuleOverlay";
import { DemoOnboardingModal } from "./DemoOnboardingModal";
import { FeedbackModal } from "./FeedbackModal";
import { ThemeApplier } from "@/components/shared/ThemeApplier";

// Muss synchron mit DEMO_UNLOCKED in DemoSidebar.tsx gehalten werden
const DEMO_UNLOCKED_PATHS = new Set([
  "/demo",
  "/demo/privatkunde/basis/kontoöffnung",
  "/demo/privatkunde/basis/sparen-konto",
  "/demo/privatkunde/basis/zahlungsverkehr",
  "/demo/privatkunde/basis/fonds",
  "/demo/backoffice/banking-operations/kyc",
  "/demo/backoffice/banking-operations/zahlungsverkehr",
  "/demo/backoffice/credit-operations/schuldbrief",
]);

export function DemoShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isUrlLocked = !DEMO_UNLOCKED_PATHS.has(pathname);

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

  const locked = isUrlLocked || sidebarLocked;

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

  function handleOverlayBack() {
    if (isUrlLocked) {
      router.replace("/demo");
    } else {
      setSidebarLocked(false);
    }
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
      {locked && <LockedModuleOverlay onBack={handleOverlayBack} />}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          overflow: "hidden",
          background: "var(--background, #F8F9FD)",
        }}
      >
        <DemoBanner
          onMenuToggle={() => setMobileOpen((v) => !v)}
          onFeedback={() => setFeedbackOpen(true)}
          onLogout={handleLogout}
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
          💬 Feedback geben
        </button>
      )}
    </>
  );
}
