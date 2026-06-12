"use client";

import { useState } from "react";
import { ArrowLeft, FileText, Calculator, ClipboardCheck, Clock, Star } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DocumentChecklist } from "@/components/modules/kreditgeschaefte/DocumentChecklist";
import { Tragbarkeitsrechner } from "@/components/modules/kreditgeschaefte/Tragbarkeitsrechner";
import { HypothekAntragRunner } from "@/components/modules/hypothek-antrag/HypothekAntragRunner";
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

type HubView = "hub" | "tools" | "antrag";

function BackBar({ onClick }: { onClick: () => void }) {
  return (
    <div className="shrink-0 border-b border-border px-6 py-3">
      <button
        onClick={onClick}
        className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors"
      >
        <ArrowLeft size={15} />
        Zurück zur Übersicht
      </button>
    </div>
  );
}

export default function HypothekenPage() {
  const [view, setView] = useState<HubView>("hub");

  if (view === "tools") {
    return (
      <div className="flex flex-1 flex-col overflow-hidden">
        <BackBar onClick={() => setView("hub")} />
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
      </div>
    );
  }

  if (view === "antrag") {
    return (
      <div className="flex flex-1 flex-col overflow-hidden">
        <BackBar onClick={() => setView("hub")} />
        <HypothekAntragRunner onBack={() => setView("hub")} />
      </div>
    );
  }

  return (
    <>
      <Header
        title="Hypotheken"
        subtitle="Hypothekarfinanzierung: Unterlagencheck, Tragbarkeit und Antragsbeurteilung"
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
        <div className="mx-auto max-w-2xl space-y-6">
          <p className="text-sm text-text-secondary">Wähle eine Übung aus dem Modul Hypotheken:</p>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* Tools card */}
            <div className="flex flex-col gap-4 rounded-DEFAULT bg-surface p-6 shadow-card">
              <div className="flex items-start justify-between">
                <Badge variant="green">Lernhilfe</Badge>
                <div className="flex gap-2">
                  <FileText size={18} className="text-text-secondary shrink-0" />
                  <Calculator size={18} className="text-text-secondary shrink-0" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-base font-bold text-text-primary mb-2">
                  Unterlagen &amp; Tragbarkeitsrechner
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Checkliste für Hypothekarunterlagen und interaktiver Tragbarkeitsrechner nach
                  Schweizer Bankstandard.
                </p>
                <div className="mt-3 flex flex-wrap gap-2 text-xs text-text-secondary">
                  <span>Unterlagencheck</span>
                  <span className="text-text-secondary/40">·</span>
                  <span>Tragbarkeitsrechner</span>
                </div>
              </div>
              <Button onClick={() => setView("tools")} variant="secondary" className="w-full">
                Öffnen
              </Button>
            </div>

            {/* Exercise card */}
            <div
              className="flex flex-col gap-4 rounded-DEFAULT bg-surface p-6 shadow-card relative overflow-hidden"
              style={{ border: "2px solid rgba(220,38,38,0.2)" }}
            >
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-red-500" />
              <div className="flex items-start justify-between">
                <Badge variant="red">Level 3 – LAP</Badge>
                <ClipboardCheck size={18} className="text-text-secondary shrink-0" />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-bold text-text-primary mb-2">
                  Hypothekarantrag prüfen &amp; berechnen
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Prüfen Sie den Hypothekarantrag der Familie Brandenberger: Berechnen Sie Belehnung,
                  Eigenmittel und Tragbarkeit und treffen Sie eine begründete Empfehlung.
                </p>
                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                  <span className="flex items-center gap-1 text-text-secondary">
                    <Clock size={10} /> 8 Min
                  </span>
                  <span className="text-text-secondary/40">·</span>
                  <span className="flex items-center gap-1 text-text-secondary">
                    <Star size={10} /> +200 XP
                  </span>
                </div>
              </div>
              <Button onClick={() => setView("antrag")} variant="primary" className="w-full">
                Starten
              </Button>
            </div>
          </div>

          {/* Info box */}
          <div
            className="rounded-DEFAULT p-4 text-sm text-text-secondary"
            style={{ background: "rgba(13,27,75,0.04)", border: "1px solid rgba(13,27,75,0.08)" }}
          >
            <p className="font-semibold text-text-primary mb-1">Kernthemen Hypotheken</p>
            <p>
              Belehnung max. 80% · Echte Eigenmittel min. 10% · Tragbarkeit max. 33% ·
              Amortisation 2. Hypothek innert 15 Jahren · Kalkulatorischer Zins 5%.
              Rechtsgrundlage:{" "}
              <span className="font-semibold text-text-primary">FINMA RS 2012/3</span> ·{" "}
              <span className="font-semibold text-text-primary">SBVg-Richtlinien</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
