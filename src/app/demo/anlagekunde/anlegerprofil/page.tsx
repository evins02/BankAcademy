import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { AnlagekundeRunner } from "@/components/modules/anlagekunde/AnlagekundeRunner";

export default function DemoAnlageprofilPage() {
  return (
    <>
      <Header title="Anlegerprofil" subtitle="Anlagekunde – Anlageberatung" />
      <Breadcrumb
        items={[
          { label: "Demo", href: "/demo" },
          { label: "Anlagekunde" },
          { label: "Anlegerprofil" },
        ]}
      />
      <AnlagekundeRunner />
    </>
  );
}
