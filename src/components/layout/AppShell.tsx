"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { GlossarProvider } from "@/context/GlossarContext";
import { FocusModeProvider, useFocusMode } from "@/context/FocusModeContext";
import { GlossarDrawer } from "@/components/glossar/GlossarDrawer";
import { NavigationProgress } from "@/components/shared/NavigationProgress";
import { ThemeApplier } from "@/components/shared/ThemeApplier";

function AppShellInner({ children }: { children: React.ReactNode }) {
  const { focusMode } = useFocusMode();

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {!focusMode && <Sidebar />}
      <main id="main-content" className="flex flex-1 flex-col overflow-hidden animate-fade-in">
        {children}
      </main>
    </div>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("fullAccess") === "true") {
      setReady(true);
    } else {
      window.location.replace("/demo");
    }
  }, []);

  if (!ready) return null;

  return (
    <GlossarProvider>
      <FocusModeProvider>
        <ThemeApplier />
        <NavigationProgress />
        <AppShellInner>{children}</AppShellInner>
        <GlossarDrawer />
      </FocusModeProvider>
    </GlossarProvider>
  );
}
