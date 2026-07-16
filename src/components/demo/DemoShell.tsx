"use client";

import { useState } from "react";
import { DemoBanner } from "./DemoBanner";
import { DemoSidebar } from "./DemoSidebar";
import { LockedModuleOverlay } from "./LockedModuleOverlay";
import { DemoOnboardingModal } from "./DemoOnboardingModal";
import { ThemeApplier } from "@/components/shared/ThemeApplier";

export function DemoShell({ children }: { children: React.ReactNode }) {
  const [locked, setLocked] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <ThemeApplier />
      <DemoOnboardingModal />
      {locked && <LockedModuleOverlay onBack={() => setLocked(false)} />}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          overflow: "hidden",
          background: "var(--background, #F8F9FD)",
        }}
      >
        <DemoBanner onMenuToggle={() => setMobileOpen((v) => !v)} />
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

          <main
            id="main-content"
            className="flex flex-1 flex-col overflow-hidden animate-fade-in min-w-0"
          >
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
