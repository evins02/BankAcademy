import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ZvPrivatRunner } from "@/components/modules/zahlungsverkehr-privat/ZvPrivatRunner";

export default function ZahlungsverkehrPage() {
  return (
    <>
      <Header
        title="Zahlungsverkehr"
        subtitle="Produkte kennen – Kunden richtig beraten"
      />
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Privatkunde" },
          { label: "Basis" },
          { label: "Zahlungsverkehr" },
        ]}
      />
      <ZvPrivatRunner />
    </>
  );
}
