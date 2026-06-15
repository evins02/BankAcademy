"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { CreditOfficeRunner } from "@/components/modules/credit-office/CreditOfficeRunner";
import { NeubewilligungSchneiderFormCard } from "@/components/modules/credit-office/NeubewilligungSchneiderForm";
import { DEMO_EVAL_NEUBEWILLIGUNG } from "@/components/modules/credit-office/credit-office-types";

const CRITICAL_ERRORS = [
  "Aktuelle Belehnung 82.9% über Maximum 80% – Liegenschaftswert gesunken",
  "Aktuelle Tragbarkeit 44.4% weit über Maximum 33%",
  "Einkommen gesunken: CHF 115'000 → CHF 95'000 (Teilpension)",
  "Neue Verpflichtung Autoleasing seit Bewilligung hinzugekommen",
];

const LEARNING = [
  "Periodische Kreditüberprüfung: Belehnung und Tragbarkeit jährlich prüfen",
  "Gesunkener Liegenschaftswert erhöht automatisch die Belehnung",
  "Verändertes Einkommen (Teilpension, Kündigung) erfordert neue Tragbarkeitsberechnung",
  "Neue Verpflichtungen müssen dem Credit Office gemeldet werden (Kreditbedingung)",
  "Bei überschrittener Belehnung: Amortisation verlangen oder Kreditkündigung prüfen",
];

export default function NeubewilligungPage() {
  const [active, setActive] = useState(false);

  if (!active) {
    return (
      <>
        <Header title="Periodische Neubewilligung" subtitle="Credit Office · Hans Schneider · Level 2" />
        <Breadcrumb items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Credit Office", href: "/backoffice/credit-office" },
          { label: "Periodische Neubewilligung" },
        ]} />
        <div className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto max-w-lg space-y-5">
            <div className="rounded-DEFAULT bg-surface shadow-card p-6 space-y-4">
              <div>
                <p className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-1">Periodische Überprüfung</p>
                <h2 className="text-lg font-bold text-text-primary">Bestehende Hypothek – Hans Schneider</h2>
                <p className="text-sm text-text-secondary mt-1">EFH Thun · Bewilligung 2019 · Level 2</p>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">
                Die periodische Überprüfung der Hypothek Schneider ist fällig. Seit der Bewilligung
                hat sich die Situation verändert. Beurteilen Sie und legen Sie Massnahmen fest.
              </p>
              <div className="flex gap-3 pt-2">
                <a href="/backoffice/credit-office" className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors">
                  <ArrowLeft size={14} /> Zurück
                </a>
                <button
                  onClick={() => setActive(true)}
                  className="flex-1 rounded-DEFAULT py-2.5 text-sm font-bold text-white transition-colors"
                  style={{ background: "var(--primary, #0D1B4B)" }}
                >
                  Dossier öffnen →
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="shrink-0 border-b border-border px-6 py-3">
        <button onClick={() => setActive(false)} className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors">
          <ArrowLeft size={15} /> Zurück zur Übersicht
        </button>
      </div>
      <CreditOfficeRunner
        xp={150}
        apiPath="/api/credit-office/neubewilligung"
        demoEval={DEMO_EVAL_NEUBEWILLIGUNG}
        criticalErrors={CRITICAL_ERRORS}
        learningPoints={LEARNING}
        legalBasis="FINMA RS 2012/3 · Bankinterne Kreditüberwachungsrichtlinien"
        onBack={() => setActive(false)}
        FormCard={NeubewilligungSchneiderFormCard as React.ComponentType<{ onSubmit: (data: unknown) => void }>}
      />
    </div>
  );
}
