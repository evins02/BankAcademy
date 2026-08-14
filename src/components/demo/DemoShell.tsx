"use client";

import { useState, useEffect } from "react";
import { DemoBanner } from "./DemoBanner";
import { DemoSidebar } from "./DemoSidebar";
import { LockedModuleOverlay } from "./LockedModuleOverlay";
import { DemoEmailGate, type DemoSession } from "./DemoEmailGate";
import { FeedbackModal } from "./FeedbackModal";
import { ThemeApplier } from "@/components/shared/ThemeApplier";
import { loadProgressFromDB } from "@/lib/progressSync";

const TEAL = "#1ddba0";
const DARK = "#0a1628";

function loadSession(): DemoSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("ba-demo-session");
    if (raw) return JSON.parse(raw) as DemoSession;
  } catch {}
  return null;
}

function feedbackDoneStored(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("ba-pilot-feedback-sent") === "1";
}

export function DemoShell({ children }: { children: React.ReactNode }) {
  const [locked, setLocked] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [demoSession, setDemoSession] = useState<DemoSession | null>(() => loadSession());
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackDone, setFeedbackDone] = useState(() => feedbackDoneStored());
  // Incrementing this key remounts <main> so children re-read localStorage after a DB load
  const [progressKey, setProgressKey] = useState(0);

  // Returning visitor: load their saved progress from Neon on mount
  useEffect(() => {
    if (demoSession?.email) {
      loadProgressFromDB(demoSession.email).then((loaded) => {
        if (loaded) setProgressKey((k) => k + 1);
      }).catch(() => {});
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function handleSessionComplete(session: DemoSession) {
    setDemoSession(session);
    // New login: fire-and-forget load; if data exists, remount to apply it
    loadProgressFromDB(session.email).then((loaded) => {
      if (loaded) setProgressKey((k) => k + 1);
    }).catch(() => {});
  }

  function handleFeedbackSubmitted() {
  try { localStorage.setItem("ba-pilot-feedback-sent", "1"); } catch {}
  setFeedbackDone(true);
  try {
    localStorage.removeItem("ba-demo-session");
    localStorage.removeItem("demo-seen");
  } catch {}
  window.location.href = "/";
}
  return (
    <>
      <ThemeApplier />

      {/* Email gate — blocks until user registers */}
      {!demoSession && <DemoEmailGate onComplete={handleSessionComplete} />}

      {locked && <LockedModuleOverlay onBack={() => setLocked(false)} />}

      {feedbackOpen && (
        <FeedbackModal
          onClose={() => setFeedbackOpen(false)}
          onSubmitted={handleFeedbackSubmitted}
          email={demoSession?.email}
          vorname={demoSession?.vorname}
        />
      )}

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
          onLogout={() => {
            try {
              localStorage.removeItem("ba-demo-session");
              localStorage.removeItem("demo-seen");
            } catch {}
            window.location.href = "/";
          }}
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
            <DemoSidebar onLock={() => setLocked(true)} onClose={() => setMobileOpen(false)} />
          </div>

          {/* key={progressKey} remounts children after a DB load so they re-read localStorage */}
          <main
            key={progressKey}
            id="main-content"
            className="flex flex-1 flex-col overflow-hidden animate-fade-in min-w-0"
          >
            {children}
          </main>
        </div>
      </div>

      {/* Floating Feedback Button */}
      {!feedbackDone && demoSession && (
        <button
          onClick={() => setFeedbackOpen(true)}
          style={{
            position: "fixed",
            bottom: 24,
            right: 24,
            zIndex: 8000,
            background: TEAL,
            color: DARK,
            border: "none",
            borderRadius: 50,
            padding: "10px 18px",
            fontSize: 13,
            fontWeight: 700,
            cursor: "pointer",
            boxShadow: "0 4px 20px rgba(29,219,160,0.35)",
            display: "flex",
            alignItems: "center",
            gap: 7,
            whiteSpace: "nowrap",
            transition: "transform 0.15s, box-shadow 0.15s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.05)";
            (e.currentTarget as HTMLButtonElement).style.boxShadow =
              "0 6px 28px rgba(29,219,160,0.5)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
            (e.currentTarget as HTMLButtonElement).style.boxShadow =
              "0 4px 20px rgba(29,219,160,0.35)";
          }}
        >
          💬 Feedback
        </button>
      )}
    </>
  );
}
