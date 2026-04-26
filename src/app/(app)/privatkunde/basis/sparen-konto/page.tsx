import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { SparenKontoRunner } from "@/components/modules/sparen-konto/SparenKontoRunner";

export default function SparenKontoPage() {
  return (
    <>
      <Header title="Sparen & Konto" subtitle="Privatkunde – Basis" />
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Privatkunde" },
          { label: "Basis" },
          { label: "Sparen & Konto" },
        ]}
      />
      <SparenKontoRunner />
    </>
  );
}
