"use client";

import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { DocumentChecklist } from "@/components/modules/kreditgeschaefte/DocumentChecklist";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ChecklistItem } from "@/components/modules/kreditgeschaefte/DocumentChecklist";
import { useLanguage } from "@/context/LanguageContext";

const CHECKLIST_ITEMS: ChecklistItem[] = [
  {
    id: "hr-auszug",
    label: "Handelsregisterauszug",
    hint: "Nicht älter als 3 Monate",
    required: true,
  },
  {
    id: "statuten",
    label: "Statuten / Gesellschaftsvertrag",
    hint: "Aktuelle, unterzeichnete Version",
    required: true,
  },
  {
    id: "jahresabschluss",
    label: "Jahresabschlüsse (letzte 3 Jahre)",
    hint: "Bilanz, Erfolgsrechnung, Anhang — unterzeichnet",
    required: true,
  },
  {
    id: "zwischenabschluss",
    label: "Aktueller Zwischenabschluss",
    hint: "Nicht älter als 6 Monate",
    required: true,
  },
  {
    id: "steuern",
    label: "Steuerrechnung / Veranlagungsverfügung",
    hint: "Letzte 2 Jahre",
    required: true,
  },
  {
    id: "betreibungsregister-firma",
    label: "Betreibungsregisterauszug (Firma)",
    hint: "Nicht älter als 3 Monate",
    required: true,
  },
  {
    id: "betreibungsregister-inhaber",
    label: "Betreibungsregisterauszug (Inhaber/innen)",
    hint: "Für Hauptaktionäre und Geschäftsführung",
    required: true,
  },
  {
    id: "eigentumsstruktur",
    label: "Eigentümerstruktur / Organigramm",
    hint: "Wer hält wie viele Anteile?",
    required: true,
  },
  {
    id: "grundbuchauszug",
    label: "Grundbuchauszug",
    hint: "Falls Liegenschaft als Sicherheit",
    required: true,
  },
  {
    id: "schaetzung",
    label: "Liegenschaftsschätzung",
    hint: "Bankgutachten oder anerkannte Schätzung",
    required: true,
  },
  {
    id: "businessplan",
    label: "Businessplan / Investitionsplan",
    hint: "Bei Neuinvestition oder Expansion",
    required: false,
  },
  {
    id: "offerten",
    label: "Offerten / Kostenvoranschläge",
    hint: "Für den Finanzierungszweck",
    required: false,
  },
  {
    id: "mietvertrage",
    label: "Mietverträge der Liegenschaft",
    hint: "Bei Renditeobjekt als Sicherheit",
    required: false,
  },
  {
    id: "buergschaft",
    label: "Bürgschaftserklärung",
    hint: "Falls Dritte als Bürgen auftreten",
    required: false,
  },
];

const RATING_CRITERIA = [
  {
    label: "Ertragskraft",
    hint: "EBITDA-Marge, Nettoergebnis, Cash-Flow aus Betrieb",
  },
  {
    label: "Bilanzstruktur",
    hint: "Eigenkapitalquote, Fremdkapitalstruktur, stille Reserven",
  },
  {
    label: "Verschuldungsgrad",
    hint: "Nettoverschuldung / EBITDA — Richtwert < 3×",
  },
  {
    label: "Liquidität",
    hint: "Current Ratio, Quick Ratio, Liquiditätsplan",
  },
  {
    label: "Managementqualität",
    hint: "Erfahrung, Nachfolgeplanung, Abhängigkeiten",
  },
  {
    label: "Markt & Branche",
    hint: "Wettbewerbsposition, Klumpenrisiken, Konjunkturrisiken",
  },
];

export default function FrontOfficeFirmenkundePage() {
  const { t } = useLanguage();
  return (
    <>
      <Header
        title="Front-Office — Firmenkunde"
        subtitle="Unternehmenskredit: Unterlagencheck und Bonitätsanalyse"
      />
      <Breadcrumb
        items={[
          { label: t.navItems["Dashboard"], href: "/dashboard" },
          { label: t.navItems["Kreditgeschäfte"], href: "/kreditgeschaefte" },
          { label: t.navItems["Firmenkunde"] },
          { label: t.navItems["Front-Office"] },
        ]}
      />
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <DocumentChecklist
            items={CHECKLIST_ITEMS}
            title="Unterlagen Unternehmenskredit"
            subtitle="Abhaken, sobald die Unterlage vorliegt und geprüft wurde."
          />

          {/* Rating-Kriterien Info-Card */}
          <Card>
            <CardHeader>
              <CardTitle>Bonitäts-Checkpunkte</CardTitle>
              <p className="text-sm text-text-secondary">
                Diese Punkte werden im Kreditgespräch und beim Rating bewertet.
              </p>
            </CardHeader>
            <CardContent>
              <ul className="flex flex-col gap-3">
                {RATING_CRITERIA.map((item, i) => (
                  <li key={item.label} className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-light text-xs font-bold text-primary">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-text-primary">
                        {item.label}
                      </p>
                      <p className="text-xs text-text-secondary">{item.hint}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
