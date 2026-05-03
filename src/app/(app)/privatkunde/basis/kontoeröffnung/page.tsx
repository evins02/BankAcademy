import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { KontoPrivatRunner } from "@/components/modules/kontoeröffnung-privat/KontoPrivatRunner";

export default function KontoeröffnungPage() {
  return (
    <>
      <Header
        title="Kontoeröffnung Privatkunde"
        subtitle="Dokumente prüfen, Risiken erkennen, GwG-Regeln anwenden"
      />
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Privatkunde" },
          { label: "Basis" },
          { label: "Kontoeröffnung" },
        ]}
      />
      <KontoPrivatRunner />
    </>
  );
}
