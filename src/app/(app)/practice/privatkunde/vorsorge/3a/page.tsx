import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export default function Vorsorge3aPage() {
  return (
    <>
      <Header title="Konten & Vorsorge – 3a Beratung" subtitle="Bald verfügbar" />
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Practice" },
          { label: "Privatkundenberater" },
          { label: "Konten & Vorsorge" },
          { label: "3a Beratung" },
        ]}
      />
      <div className="flex flex-1 items-center justify-center p-12 text-center">
        <div>
          <p className="text-2xl font-bold text-text-primary mb-2">Bald verfügbar</p>
          <p className="text-text-secondary text-sm">Szenario: Kunde fragt nach optimaler 3a-Lösung zwischen Konto und Fonds.</p>
        </div>
      </div>
    </>
  );
}
