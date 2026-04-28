import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { CreditOperationsRunner } from "@/components/modules/credit-operations/CreditOperationsRunner";

export default function CreditOperationsPage() {
  return (
    <>
      <Header title="Credit Operations" subtitle="Back Office – Kreditauszahlung & Sicherheiten" />
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Back Office" },
          { label: "Credit Operations" },
        ]}
      />
      <CreditOperationsRunner />
    </>
  );
}
