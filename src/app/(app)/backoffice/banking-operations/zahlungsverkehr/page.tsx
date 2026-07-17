import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ZahlungsverkehrRunner } from "@/components/modules/zahlungsverkehr/ZahlungsverkehrRunner";

export default function ZahlungsverkehrPage() {
  return (
    <>
      <Header title="Zahlungsverkehr" subtitle="Back Office – Banking Operations" />
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Back Office" },
          { label: "Banking Operations" },
          { label: "Zahlungsverkehr" },
        ]}
      />
      <ZahlungsverkehrRunner />
    </>
  );
}
