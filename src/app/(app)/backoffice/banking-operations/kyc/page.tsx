import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { BkoKycRunner } from "@/components/modules/backoffice-kyc/BkoKycRunner";

export default function BackofficeKycPage() {
  return (
    <>
      <Header
        title="KYC / Compliance"
        subtitle="Erstkontrolle – Neueröffnungen prüfen und freigeben"
      />
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Back Office" },
          { label: "Banking Operations" },
          { label: "KYC / Compliance" },
        ]}
      />
      <BkoKycRunner />
    </>
  );
}
