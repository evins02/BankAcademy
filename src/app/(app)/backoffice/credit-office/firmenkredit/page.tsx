"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { CreditOfficeRunner } from "@/components/modules/credit-office/CreditOfficeRunner";
import { FirmenkreditMuellerFormCard } from "@/components/modules/credit-office/FirmenkreditMuellerForm";
import { DEMO_EVAL_FIRMENKREDIT } from "@/components/modules/credit-office/credit-office-types";

const CRITICAL_ERRORS = [
  "Baugewerbe = zyklische Branche mit erhöhtem Konjunkturrisiko",
  "Gründung 2018 = wenig Track Record (nur ~7 Jahre)",
  "Zession Debitoren = schwache Sicherheit für CHF 350'000",
];

const LEARNING = [
  "Deckungsgrad = Cashflow / (Zinsaufwand + 1.5% × langfristiges FK) – Minimum 1.2",
  "EK-Quote = Eigenkapital / Gesamtkapital × 100 – unter 20% = schwach",
  "Branchenrisiko bei Bau/Baunebengewerbe immer als erhöht einstufen",
  "Zession Debitoren: Wert hängt von Qualität der Debitoren ab – oft überschätzt",
  "Bei erhöhtem Risiko: Bewilligen mit Auflagen (Reporting, jährlicher Abschluss)",
];

export default function FirmenkreditPage() {
  const [active, setActive] = useState(false);

  if (!active) {
    return (
      <>
        <Header title="Firmenkredit prüfen" subtitle="Credit Office · Müller Bau GmbH · Level 3" />
        <Breadcrumb items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Credit Office", href: "/backoffice/credit-office" },
          { label: "Firmenkredit prüfen" },
        ]} />
        <div className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto max-w-lg space-y-5">
            <div className="rounded-DEFAULT bg-surface shadow-card p-6 space-y-4">
              <div>
                <p className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-1">Dossier</p>
                <h2 className="text-lg font-bold text-text-primary">Firmenkredit – Müller Bau GmbH</h2>
                <p className="text-sm text-text-secondary mt-1">{"Betriebsmittelkredit CHF 350'000 · Baugewerbe · Level 3"}</p>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">
                Betriebsmittelkreditantrag der Müller Bau GmbH. Prüfen Sie Deckungsgrad, EK-Quote
                und qualitative Risiken. Fällen Sie den Kreditentscheid.
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
        xp={200}
        apiPath="/api/credit-office/firmenkredit"
        demoEval={DEMO_EVAL_FIRMENKREDIT}
        criticalErrors={CRITICAL_ERRORS}
        learningPoints={LEARNING}
        legalBasis="Bankinterne Kreditrichtlinien · Basel III · SBVg"
        onBack={() => setActive(false)}
        FormCard={FirmenkreditMuellerFormCard as React.ComponentType<{ onSubmit: (data: unknown) => void }>}
      />
    </div>
  );
}
