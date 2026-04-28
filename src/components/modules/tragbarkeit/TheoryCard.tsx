"use client";

import { CheckCircle2, AlertTriangle, XCircle, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { SectionId } from "@/lib/tragbarkeit";

interface TheoryCardProps {
  sectionId: SectionId;
  onContinue: () => void;
}

export function TheoryCard({ sectionId, onContinue }: TheoryCardProps) {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-DEFAULT bg-surface p-6 shadow-card">
        {sectionId === "renditeobjekt" && <RenditeobjektTheory />}
        {sectionId === "gesamtengagement" && <GesamtengagementTheory />}
        {sectionId === "etp" && <EtpTheory />}
        {sectionId === "gewerbe" && <GewerbeTheory />}

        <Button onClick={onContinue} className="mt-6 w-full">
          Verstanden – zum Fall
          <ChevronRight size={14} />
        </Button>
      </div>
    </div>
  );
}

function RenditeobjektTheory() {
  return (
    <>
      <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
        Theorie
      </p>
      <h2 className="mb-5 text-lg font-bold text-text-primary">
        Renditeobjekt – Objektebene prüfen
      </h2>

      <div className="mb-5 overflow-hidden rounded-DEFAULT border border-border">
        <div className="border-b border-border bg-background px-4 py-2.5">
          <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
            Erträge
          </p>
          <p className="mt-1 text-sm text-text-primary">+ Netto-Mieteinnahmen</p>
        </div>
        <div className="border-b border-border bg-background px-4 py-2.5">
          <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
            Lasten
          </p>
          <div className="mt-1 space-y-0.5 text-sm text-text-primary">
            <p>− Zinsendienst</p>
            <p>− Amortisation</p>
            <p>− Nebenkosten</p>
          </div>
        </div>
        <div className="grid grid-cols-2 divide-x divide-border">
          <div className="flex items-center gap-2 bg-primary-light px-4 py-3">
            <CheckCircle2 size={14} className="shrink-0 text-primary" />
            <span className="text-sm font-semibold text-primary">Nettoertrag</span>
          </div>
          <div className="flex items-center gap-2 bg-amber-50 px-4 py-3">
            <AlertTriangle size={14} className="shrink-0 text-amber-600" />
            <span className="text-sm font-semibold text-amber-700">Nettoaufwand</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-start gap-3 rounded-DEFAULT bg-primary-light p-3">
          <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-primary" />
          <div>
            <p className="text-sm font-semibold text-primary">Nettoertrag → Tragbarkeit gegeben</p>
            <p className="text-xs text-text-secondary">
              Liegenschaft selbsttragend – keine weitere Prüfung nötig
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3 rounded-DEFAULT bg-amber-50 p-3">
          <AlertTriangle size={16} className="mt-0.5 shrink-0 text-amber-600" />
          <div>
            <p className="text-sm font-semibold text-amber-700">
              Nettoaufwand → Prüfung Gesamtengagement
            </p>
            <p className="text-xs text-text-secondary">
              Liegenschaft nicht selbsttragend – Stufe 2 erforderlich
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

function GesamtengagementTheory() {
  return (
    <>
      <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
        Theorie
      </p>
      <h2 className="mb-5 text-lg font-bold text-text-primary">Deckungsgrad berechnen</h2>

      <div className="mb-5 rounded-DEFAULT border border-border bg-background p-4">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
          Formel
        </p>
        <div className="rounded-DEFAULT bg-surface p-3 font-mono text-sm">
          <p className="text-center text-text-primary">Ø Cashflow (3 Jahre)</p>
          <p className="my-1 border-t border-border text-center" />
          <p className="text-center text-text-secondary text-xs">
            Nettoaufwand + 1.5% × langfr. Verbindlichkeiten
          </p>
        </div>
        <div className="mt-3 flex items-center justify-center">
          <span className="rounded-full bg-gray-100 px-3 py-1 font-mono text-sm font-bold text-text-primary">
            DG = Cashflow / Nenner
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
          Belastungsgrenze
        </p>
        <div className="flex items-center gap-3 rounded-DEFAULT bg-primary-light p-3">
          <CheckCircle2 size={16} className="shrink-0 text-primary" />
          <span className="text-sm font-semibold text-primary">DG ≥ 1.2 → Tragbarkeit gegeben</span>
        </div>
        <div className="flex items-center gap-3 rounded-DEFAULT bg-red-50 p-3">
          <XCircle size={16} className="shrink-0 text-red-600" />
          <span className="text-sm font-semibold text-red-700">
            DG &lt; 1.2 → Tragbarkeit nicht gegeben
          </span>
        </div>
        <div className="flex items-center gap-3 rounded-DEFAULT bg-amber-50 p-3">
          <AlertTriangle size={16} className="shrink-0 text-amber-600" />
          <span className="text-sm font-semibold text-amber-700">Ausnahme: ETP möglich</span>
        </div>
      </div>
    </>
  );
}

function EtpTheory() {
  return (
    <>
      <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
        Theorie
      </p>
      <h2 className="mb-5 text-lg font-bold text-text-primary">ETP – Ausnahme mit Begründung</h2>

      <div className="mb-5 rounded-DEFAULT border border-amber-200 bg-amber-50 p-4">
        <p className="text-sm leading-relaxed text-amber-900">
          <span className="font-semibold">ETP</span> (Entscheid Tragbarkeit mit
          Pflichtbegründung) ist ein Beantragungsfall wenn die Tragbarkeit nicht gegeben ist,
          aber eine Bewilligung trotzdem möglich sein soll.
        </p>
      </div>

      <div className="space-y-2">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
          Voraussetzungen
        </p>
        {[
          "Deckungsgrad < 1.2",
          "Klare Begründung warum Ausnahme gerechtfertigt",
          "Kürzere Wiedervorlage als normal",
          "Genehmigung durch höhere Stelle",
        ].map((item) => (
          <div key={item} className="flex items-start gap-2.5 rounded-DEFAULT bg-background p-3">
            <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-text-secondary" />
            <p className="text-sm text-text-primary">{item}</p>
          </div>
        ))}
      </div>
    </>
  );
}

function GewerbeTheory() {
  return (
    <>
      <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
        Theorie
      </p>
      <h2 className="mb-5 text-lg font-bold text-text-primary">
        Selbstgenutzte Gewerbeliegenschaft
      </h2>

      <p className="mb-4 text-sm leading-relaxed text-text-secondary">
        Anders als beim Renditeobjekt steht hier der Kreditnehmer im Vordergrund:
      </p>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-DEFAULT border border-border bg-background p-4">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
            Renditeobjekt
          </p>
          <div className="flex items-start gap-2">
            <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            <p className="text-sm text-text-primary">Primär Objektertrag prüfen</p>
          </div>
          <div className="mt-2 flex items-start gap-2">
            <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            <p className="text-sm text-text-primary">Mieteinnahmen im Fokus</p>
          </div>
        </div>
        <div className="rounded-DEFAULT border border-primary/30 bg-primary-light p-4">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-primary">
            Selbstgenutzt
          </p>
          <div className="flex items-start gap-2">
            <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            <p className="text-sm text-text-primary">Primär Bonität prüfen</p>
          </div>
          <div className="mt-2 flex items-start gap-2">
            <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            <p className="text-sm text-text-primary">Cashflow & Eigenkapital</p>
          </div>
        </div>
      </div>
    </>
  );
}
