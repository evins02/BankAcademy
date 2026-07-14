import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { DocumentPruefen } from "@/components/features/dokument-pruefen/DocumentPruefen";
import { DOKUMENT_REGISTRY } from "@/lib/dokument-pruefen/registry";

export default function DokumentPruefenPage() {
  const config = DOKUMENT_REGISTRY["kontoeroeffnung-privatkunde"];
  return (
    <>
      <Header title="Dokument prüfen" subtitle={config.subtitle} />
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Privatkunde", href: "/privatkunde" },
          { label: "Dokument prüfen" },
        ]}
      />
      <div className="flex-1 overflow-y-auto">
        <DocumentPruefen config={config} />
      </div>
    </>
  );
}
