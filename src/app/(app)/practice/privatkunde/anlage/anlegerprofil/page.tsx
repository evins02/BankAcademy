import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export default function AnlageProfilPage() {
  return (
    <>
      <Header title="Anlageberatung – Neues Anlegerprofil" subtitle="Bald verfügbar" />
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Practice" },
          { label: "Privatkundenberater" },
          { label: "Anlageberatung" },
          { label: "Neues Anlegerprofil" },
        ]}
      />
      <div className="flex flex-1 items-center justify-center p-12 text-center">
        <div>
          <p className="text-2xl font-bold text-text-primary mb-2">Bald verfügbar</p>
          <p className="text-text-secondary text-sm">Szenario: Neukunde mit CHF 100'000 Erbschaft sucht Anlageberatung.</p>
        </div>
      </div>
    </>
  );
}
