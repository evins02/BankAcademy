import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { EmptyState } from "@/components/ui/empty-state";

export default function MahnwesenPage() {
  return (
    <>
      <Header title="Mahnwesen" subtitle="Back Office – Banking Operations" />
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Back Office" },
          { label: "Banking Operations" },
          { label: "Mahnwesen" },
        ]}
      />
      <div className="flex-1 overflow-y-auto p-6">
        <EmptyState
          title="Inhalt folgt in Kürze"
          subtitle="Dieses Modul wird gerade aufgebaut"
        />
      </div>
    </>
  );
}
