"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { DemoBanner } from "./DemoBanner";
import { DemoSidebar } from "./DemoSidebar";
import { LockedModuleOverlay } from "./LockedModuleOverlay";
import { DemoOnboardingModal } from "./DemoOnboardingModal";
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

  const [sidebarLocked, setSidebarLocked] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const locked = isUrlLocked || sidebarLocked;

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
    </>
  );
}
