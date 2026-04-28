import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { AnlagekundeRunner } from "@/components/modules/anlagekunde/AnlagekundeRunner";

export default function AnlageprofilPage() {
  return (
    <>
      <Header title="Anlegerprofil" subtitle="Anlagekunde – Anlageberatung" />
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Anlagekunde" },
          { label: "Anlegerprofil" },
        ]}
      />
      <AnlagekundeRunner />
    </>
  );
}
