import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { KontoeröffnungHub } from "@/components/modules/kontoeröffnung-privat/KontoeröffnungHub";

export default function DemoKontoeröffnungPage() {
  return (
    <>
      <Header
        title="Kontoeröffnung Privatkunde"
        subtitle="Dokumente prüfen, KYC-Formular ausfüllen, GwG-Regeln anwenden"
      />
      <Breadcrumb
        items={[
          { label: "Demo", href: "/demo" },
          { label: "Privatkunde" },
          { label: "Basis" },
          { label: "Kontoeröffnung" },
        ]}
      />
      <KontoeröffnungHub />
    </>
  );
}
