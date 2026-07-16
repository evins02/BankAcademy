"use client";

import { Sidebar } from "./Sidebar";
import { GlossarProvider } from "@/context/GlossarContext";
import { FocusModeProvider, useFocusMode } from "@/context/FocusModeContext";
import { MobileMenuProvider, useMobileMenu } from "@/context/MobileMenuContext";
import { GlossarDrawer } from "@/components/glossar/GlossarDrawer";
import { NavigationProgress } from "@/components/shared/NavigationProgress";
import { ThemeApplier } from "@/components/shared/ThemeApplier";

function AppShellInner({ children }: { children: React.ReactNode }) {
  const { focusMode } = useFocusMode();
  const { mobileOpen, closeMobile } = useMobileMenu();

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={closeMobile}
        />
      )}

      {/* Sidebar — drawer on mobile, static on desktop */}
      {!focusMode && (
        <div
          className={[
            "md:relative md:flex md:shrink-0",
            mobileOpen ? "fixed inset-y-0 left-0 z-50 flex" : "hidden md:flex",
          ].join(" ")}
        >
          <Sidebar />
        </div>
      )}

      <main id="main-content" className="flex flex-1 flex-col overflow-hidden animate-fade-in min-w-0">
        {children}
      </main>
    </div>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <GlossarProvider>
      <FocusModeProvider>
        <MobileMenuProvider>
          <ThemeApplier />
          <NavigationProgress />
          <AppShellInner>{children}</AppShellInner>
          <GlossarDrawer />
        </MobileMenuProvider>
      </FocusModeProvider>
    </GlossarProvider>
  );
}
