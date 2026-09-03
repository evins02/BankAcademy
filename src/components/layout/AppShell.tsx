"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Sidebar } from "./Sidebar";
import { GlossarProvider } from "@/context/GlossarContext";
import { FocusModeProvider, useFocusMode } from "@/context/FocusModeContext";
import { MobileMenuProvider, useMobileMenu } from "@/context/MobileMenuContext";
import { GlossarDrawer } from "@/components/glossar/GlossarDrawer";
import { NavigationProgress } from "@/components/shared/NavigationProgress";
import { ThemeApplier } from "@/components/shared/ThemeApplier";
import { loadProgressFromDB, scheduleSync } from "@/lib/progressSync";

function ProfileLoader() {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  // 1. Detect user ID change → wipe stale localStorage, then sync fresh data
  useEffect(() => {
    if (!isLoaded || !isSignedIn || !user) return;
    try {
      const storedUid = localStorage.getItem("ba-uid");
      if (storedUid && storedUid !== user.id) {
        // A different Clerk user than last time → clear everything
        localStorage.clear();
      }
      localStorage.setItem("ba-uid", user.id);
    } catch {}
    loadProgressFromDB();
    scheduleSync();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, isSignedIn, user?.id]);

  // 2. Force new accounts to complete onboarding before using the app
  useEffect(() => {
    if (!isLoaded || !isSignedIn || !user) return;
    if (pathname.startsWith("/onboarding")) return;
    const hasProfile = !!(user.unsafeMetadata as Record<string, unknown>)?.profile;
    if (!hasProfile) {
      router.replace("/onboarding");
    }
  }, [isLoaded, isSignedIn, user, pathname, router]);

  return null;
}

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
          <ProfileLoader />
          <ThemeApplier />
          <NavigationProgress />
          <AppShellInner>{children}</AppShellInner>
          <GlossarDrawer />
        </MobileMenuProvider>
      </FocusModeProvider>
    </GlossarProvider>
  );
}
