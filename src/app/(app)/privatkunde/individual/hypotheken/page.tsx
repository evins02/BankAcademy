import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { DocumentChecklist } from "@/components/modules/kreditgeschaefte/DocumentChecklist";
import { Tragbarkeitsrechner } from "@/components/modules/kreditgeschaefte/Tragbarkeitsrechner";
import type { ChecklistItem } from "@/components/modules/kreditgeschaefte/DocumentChecklist";

const CHECKLIST_ITEMS: ChecklistItem[] = [
  { id: "ausweis", label: "Ausweiskopie (ID oder Pass)", hint: "Beidseitig, gültig", required: true },
  { id: "lohnausweis", label: "Lohnausweis (letzte 2–3 Jahre)", hint: "Inkl. aktuelles Lohnblatt", required: true },
  { id: "steuererklarung", label: "Steuererklärung (letzte 2 Jahre)", hint: "Mit Steuerrechnung oder Veranlagungsverfügung", required: true },
  { id: "betreibungsregister", label: "Betreibungsregisterauszug", hint: "Nicht älter als 3 Monate, alle Wohnsitze", required: true },
  { id: "grundbuchauszug", label: "Grundbuchauszug", hint: "Aktuell, für die zu finanzierende Liegenschaft", required: true },
  { id: "kaufvertrag", label: "Kaufvertrag oder Kaufangebot", hint: "Mit Kaufpreis und Beschreibung", required: true },
  { id: "schaetzung", label: "Liegenschaftsschätzung / Gutachten", hint: "Bankgutachten oder anerkannte Schätzung", required: true },
  { id: "pk-ausweis", label: "PK-Ausweis (Pensionskassenausweis)", hint: "Aktuell, für Tragbarkeit bei Pensionierung", required: true },
  { id: "eigenkapitalnachweis", label: "Eigenkapitalnachweis", hint: "Kontoauszüge, Wertschriften, Schenkungsvertrag", required: true },
  { id: "gebaeudeversicherung", label: "Gebäudeversicherungspolice", hint: "Bei bestehendem Objekt", required: false },
  { id: "mietvertrag", label: "Mietvertrag (bei Mietobjekt als Sicherheit)", required: false },
  { id: "scheidungsurteil", label: "Scheidungsurteil / Trennungsvereinbarung", hint: "Falls vorhanden und relevant für Einkommenssituation", required: false },
];

export default function HypothekenPage() {
  return (
    <>
      <Header
        title="Hypotheken"
        subtitle="Hypothekarfinanzierung: Unterlagencheck und Tragbarkeitsberechnung"
      />
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Privatkunde" },
          { label: "Individual" },
          { label: "Hypotheken" },
        ]}
      />
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <DocumentChecklist
            items={CHECKLIST_ITEMS}
            title="Unterlagen Hypothekarkredit"
            subtitle="Abhaken, sobald die Unterlage vorliegt und geprüft wurde."
          />
          <Tragbarkeitsrechner />
        </div>
      </div>
    </>
  );
}
