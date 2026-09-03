import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export default function AnlageEsgPage() {
  return (
    <>
      <Header title="Anlageberatung – ESG / Nachhaltige Anlagen" subtitle="Bald verfügbar" />
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Practice" },
          { label: "Privatkundenberater" },
          { label: "Anlageberatung" },
          { label: "ESG-Anfrage" },
        ]}
      />
      <div className="flex flex-1 items-center justify-center p-12 text-center">
        <div>
          <p className="text-2xl font-bold text-text-primary mb-2">Bald verfügbar</p>
          <p className="text-text-secondary text-sm">Szenario: Kunde möchte Portfolio auf nachhaltige Anlagen umschichten.</p>
        </div>
      </div>
    </>
  );
}
