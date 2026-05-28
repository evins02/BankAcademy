import { Sidebar } from "./Sidebar";
import { GlossarProvider } from "@/context/GlossarContext";
import { GlossarDrawer } from "@/components/glossar/GlossarDrawer";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <GlossarProvider>
      <div className="flex h-screen overflow-hidden bg-background">
        <Sidebar />
        <main className="flex flex-1 flex-col overflow-hidden">{children}</main>
      </div>
      <GlossarDrawer />
    </GlossarProvider>
  );
}
