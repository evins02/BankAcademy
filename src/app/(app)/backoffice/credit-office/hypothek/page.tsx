"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { CreditOfficeRunner } from "@/components/modules/credit-office/CreditOfficeRunner";
import { HypothekRossiFormCard } from "@/components/modules/credit-office/HypothekRossiForm";
import { DEMO_EVAL_HYPOTHEK } from "@/components/modules/credit-office/credit-office-types";

const CRITICAL_ERRORS = [
  "Echte Eigenmittel 8.3% (CHF 100'000) unter Minimum 10% – K.O.-Kriterium!",
  "Tragbarkeit 42.9% deutlich über Maximum 33% – K.O.-Kriterium!",
  "PK-Vorbezug CHF 140'000 zählt nicht als echte Eigenmittel",
  "Pensionierung Marco in 13 Jahren – Tragbarkeit verschlechtert sich massiv",
];

const LEARNING = [
  "Echte Eigenmittel = Ersparnisse, Schenkungen, Verkaufserlöse – kein PK-Vorbezug",
  "Mindest-Eigenmittel 10% des Verkehrswerts aus echten Mitteln (FINMA RS 2012/3)",
  "Tragbarkeit max. 33% (heute) und 38% (Rentenalter) mit kalkulatorischem Zins 5%",
  "Pensionierung muss im Tragbarkeitsmodell mitgerechnet werden",
  "Zwei K.O.-Kriterien gleichzeitig → Ablehnen ohne Auflagen möglich",
];

export default function HypothekPage() {
  const [active, setActive] = useState(false);

  if (!active) {
    return (
      <>
        <Header title="Privathypothek prüfen" subtitle="Credit Office · Familie Rossi · Level 3" />
        <Breadcrumb items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Credit Office", href: "/backoffice/credit-office" },
          { label: "Privathypothek prüfen" },
        ]} />
        <div className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto max-w-lg space-y-5">
            <div className="rounded-DEFAULT bg-surface shadow-card p-6 space-y-4">
              <div>
                <p className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-1">Dossier</p>
                <h2 className="text-lg font-bold text-text-primary">Hypothekarantrag – Marco &amp; Lisa Rossi</h2>
                <p className="text-sm text-text-secondary mt-1">{"EFH Zollikofen · CHF 960'000 Hypothek · Level 3"}</p>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">
                Das Dossier liegt auf Ihrem Tisch. Prüfen Sie alle Kennzahlen und fällen Sie den
                Credit-Office-Entscheid. Keine Hinweise – Sie müssen alle Risiken selbst erkennen.
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
        apiPath="/api/credit-office/hypothek"
        demoEval={DEMO_EVAL_HYPOTHEK}
        criticalErrors={CRITICAL_ERRORS}
        learningPoints={LEARNING}
        legalBasis="FINMA Rundschreiben 2012/3 · SBVg-Richtlinien Hypotheken"
        onBack={() => setActive(false)}
        FormCard={HypothekRossiFormCard as React.ComponentType<{ onSubmit: (data: unknown) => void }>}
      />
    </div>
  );
}
