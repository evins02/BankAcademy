import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export default function PracticeOperations() {
  return (
    <>
      <Header title="Practice – Operations" subtitle="Bald verfügbar" />
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Practice" },
          { label: "Operations" },
        ]}
      />
      <div className="flex flex-1 items-center justify-center p-12 text-center">
        <div>
          <p className="text-2xl font-bold text-text-primary mb-2">Bald verfügbar</p>
          <p className="text-text-secondary text-sm">Operations-Szenarien sind in Entwicklung.</p>
        </div>
      </div>
    </>
  );
}
