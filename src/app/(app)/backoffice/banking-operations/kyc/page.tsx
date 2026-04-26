import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { KycRunner } from "@/components/modules/kyc/KycRunner";

export default function KycPage() {
  return (
    <>
      <Header
        title="KYC / Compliance"
        subtitle="Kundendaten, Beneficial Owner und Geldwäschereibekämpfung"
      />
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Back Office" },
          { label: "Banking Operations" },
          { label: "KYC / Compliance" },
        ]}
      />
      <KycRunner />
    </>
  );
}
