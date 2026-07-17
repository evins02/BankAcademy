import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { BkoKycRunner } from "@/components/modules/backoffice-kyc/BkoKycRunner";

export default function DemoKycPage() {
  return (
    <>
      <Header
        title="KYC / Compliance"
        subtitle="Erstkontrolle – Neueröffnungen prüfen und freigeben"
      />
      <Breadcrumb
        items={[
          { label: "Demo", href: "/demo" },
          { label: "Back Office" },
          { label: "Banking Operations" },
          { label: "KYC / Compliance" },
        ]}
      />
      <BkoKycRunner />
    </>
  );
}
