"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { CreditOfficeRunner } from "@/components/modules/credit-office/CreditOfficeRunner";
import { BlankokreditMeierFormCard } from "@/components/modules/credit-office/BlankokreditMeierForm";
import { DEMO_EVAL_BLANKOKREDIT } from "@/components/modules/credit-office/credit-office-types";

const CRITICAL_ERRORS = [
  "Laufzeit 48 Monate überschreitet KKG-Maximum von 36 Monaten",
  "Kreditkarte-Limite muss als Verpflichtung eingerechnet werden",
];

const LEARNING = [
  "Kreditfähigkeit gem. KKG: (bestehende Verpflichtungen + neuer Kredit) / 36 ≤ Freibetrag",
  "Kreditkarte-Limite zählt als Verpflichtung – auch wenn nicht ausgeschöpft",
  "KKG-Maximum für Konsumkredite: 36 Monate Laufzeit",
  "Freibetrag = Nettoeinkommen − Lebenshaltungskosten (Richtwert CHF 1'700/Monat)",
  "ZEK-Auskunft ist Pflicht bei jedem Konsumkreditantrag",
];

export default function BlankokreditPage() {
  const [active, setActive] = useState(false);

  if (!active) {
    return (
      <>
        <Header title="Blankokredit prüfen" subtitle="Credit Office · Kevin Meier · Level 2" />
        <Breadcrumb items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Credit Office", href: "/backoffice/credit-office" },
          { label: "Blankokredit prüfen" },
        ]} />
        <div className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto max-w-lg space-y-5">
            <div className="rounded-DEFAULT bg-surface shadow-card p-6 space-y-4">
              <div>
                <p className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-1">Dossier</p>
                <h2 className="text-lg font-bold text-text-primary">Blankokredit – Kevin Meier</h2>
                <p className="text-sm text-text-secondary mt-1">{"Konsumkredit CHF 25'000 · 48 Monate · Level 2"}</p>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">
                Kreditantrag von Kevin Meier. Prüfen Sie Kreditfähigkeit gemäss KKG, Kreditwürdigkeit
                und Laufzeit. Fällen Sie den Entscheid.
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
        apiPath="/api/credit-office/blankokredit"
        demoEval={DEMO_EVAL_BLANKOKREDIT}
        criticalErrors={CRITICAL_ERRORS}
        learningPoints={LEARNING}
        legalBasis="Konsumkreditgesetz (KKG) · ZEK-Richtlinien"
        onBack={() => setActive(false)}
        FormCard={BlankokreditMeierFormCard as React.ComponentType<{ onSubmit: (data: unknown) => void }>}
      />
    </div>
  );
}
