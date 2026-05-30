import { Sidebar } from "./Sidebar";
import { GlossarProvider } from "@/context/GlossarContext";
import { GlossarDrawer } from "@/components/glossar/GlossarDrawer";
import { NavigationProgress } from "@/components/shared/NavigationProgress";
import { ThemeApplier } from "@/components/shared/ThemeApplier";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <GlossarProvider>
      <ThemeApplier />
      <NavigationProgress />
      <div className="flex h-screen overflow-hidden bg-background">
        <Sidebar />
        <main className="flex flex-1 flex-col overflow-hidden animate-fade-in">
          {children}
        </main>
      </div>
      <GlossarDrawer />
    </GlossarProvider>
  );
}
