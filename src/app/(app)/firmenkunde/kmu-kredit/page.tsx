import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { KmuKreditRunner } from "@/components/modules/blankokredit/KmuKreditRunner";

export default function KmuKreditPage() {
  return (
    <>
      <Header
        title="KMU-Kredit"
        subtitle="Firmenkunde – Kreditvergabe, Kennzahlen & Sicherheiten"
      />
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Firmenkunde", href: "/firmenkunde" },
          { label: "KMU-Kredit" },
        ]}
      />
      <KmuKreditRunner />
    </>
  );
}
