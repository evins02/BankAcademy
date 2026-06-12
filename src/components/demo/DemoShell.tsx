"use client";

import { useState } from "react";
import { DemoBanner } from "./DemoBanner";
import { DemoSidebar } from "./DemoSidebar";
import { LockedModuleOverlay } from "./LockedModuleOverlay";
import { DemoOnboardingModal } from "./DemoOnboardingModal";
import { ThemeApplier } from "@/components/shared/ThemeApplier";

export function DemoShell({ children }: { children: React.ReactNode }) {
  const [locked, setLocked] = useState(false);

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
        <DemoBanner />
        <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
          <DemoSidebar onLock={() => setLocked(true)} />
          <main
            id="main-content"
            className="flex flex-1 flex-col overflow-hidden animate-fade-in"
          >
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
