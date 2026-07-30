"use client";

import { useState } from "react";
import { ArrowLeft, FileText, ClipboardCheck, MessageSquare, Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { KontoPrivatRunner } from "./KontoPrivatRunner";
import { KycFormRunner } from "@/components/modules/kyc-form/KycFormRunner";
import { KycConversationRunner } from "@/components/modules/kyc-conversation/KycConversationRunner";

type HubView = "hub" | "levels" | "kyc" | "conversation";

function BackBar({
  onClick,
  label = "Zurück zur Übersicht",
  extra,
}: {
  onClick: () => void;
  label?: string;
  extra?: React.ReactNode;
}) {
  return (
    <div className="shrink-0 border-b border-border px-6 py-3 flex items-center justify-between">
      <button
        onClick={onClick}
        className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors"
      >
        <ArrowLeft size={15} />
        {label}
      </button>
      {extra}
    </div>
  );
}

export function KontoeröffnungHub() {
  const [view, setView] = useState<HubView>("hub");

  if (view === "levels") {
    return (
      <div className="flex flex-1 flex-col overflow-hidden">
        <BackBar onClick={() => setView("hub")} />
        <KontoPrivatRunner />
      </div>
    );
  }

  if (view === "kyc") {
    return (
      <div className="flex flex-1 flex-col overflow-hidden">
        <BackBar onClick={() => setView("hub")} />
        <KycFormRunner onBack={() => setView("hub")} />
      </div>
    );
  }

  if (view === "conversation") {
    return (
      <div className="flex flex-1 flex-col overflow-hidden">
        <BackBar onClick={() => setView("hub")} />
        <KycConversationRunner onBack={() => setView("hub")} />
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="mx-auto max-w-2xl space-y-6">
        <p className="text-sm text-text-secondary">
          Wähle eine Übung aus dem Modul Kontoeröffnung:
        </p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Level 1-3 exercises */}
          <div className="flex flex-col gap-4 rounded-DEFAULT bg-surface p-6 shadow-card">
            <div className="flex items-start justify-between">
              <Badge variant="green">Level 1–3</Badge>
              <FileText size={18} className="text-text-secondary shrink-0" />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-bold text-text-primary mb-2">
                Dokumente prüfen &amp; Fallentscheidungen
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                Prüfe Kundendokumente, erkenne Risiken und triff die richtige Entscheidung bei
                schwierigen KYC-Fällen.
              </p>
              <div className="mt-3 flex flex-wrap gap-2 text-xs text-text-secondary">
                <span>3 Levels</span>
                <span className="text-text-secondary/40">·</span>
                <span>9 Fälle</span>
                <span className="text-text-secondary/40">·</span>
                <span>MCQ &amp; Dokumentenprüfung</span>
              </div>
            </div>
            <Button onClick={() => setView("levels")} variant="primary" className="w-full">
              Starten
            </Button>
          </div>

          {/* Level 2 KYC form */}
          <div
            className="flex flex-col gap-4 rounded-DEFAULT bg-surface p-6 shadow-card relative overflow-hidden"
            style={{ border: "2px solid rgba(13,27,75,0.15)" }}
          >
            <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: "var(--primary, #0D1B4B)" }} />
            <div className="flex items-start justify-between">
              <Badge variant="orange">Level 2</Badge>
              <ClipboardCheck size={18} className="text-text-secondary shrink-0" />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-bold text-text-primary mb-2">KYC Formular ausfüllen</h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                Fülle das KYC-Formular für Thomas Kowalski korrekt aus – finde die zwei versteckten Fehler!
              </p>
              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                <span className="flex items-center gap-1 text-text-secondary">
                  <Clock size={10} /> 5 Min
                </span>
                <span className="text-text-secondary/40">·</span>
                <span className="flex items-center gap-1 text-text-secondary">
                  <Star size={10} /> +150 XP
                </span>
              </div>
            </div>
            <Button onClick={() => setView("kyc")} variant="primary" className="w-full">
              Starten
            </Button>
          </div>

          {/* Level 3 conversation + form */}
          <div
            className="flex flex-col gap-4 rounded-DEFAULT bg-surface p-6 shadow-card relative overflow-hidden"
            style={{ border: "2px solid rgba(220,38,38,0.2)" }}
          >
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-red-500" />
            <div className="flex items-start justify-between">
              <Badge variant="red">Level 3 – Challenge</Badge>
              <MessageSquare size={18} className="text-text-secondary shrink-0" />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-bold text-text-primary mb-2">KYC Gespräch &amp; Formular</h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                Führe das KYC-Gespräch mit Thomas Kowalski und fülle das Formular aus dem Gedächtnis aus.
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
            <Button onClick={() => setView("conversation")} variant="primary" className="w-full">
              Starten
            </Button>
          </div>
        </div>

        {/* Info box */}
        <div
          className="rounded-DEFAULT p-4 text-sm text-text-secondary"
          style={{ background: "rgba(13,27,75,0.04)", border: "1px solid rgba(13,27,75,0.08)" }}
        >
          <p className="font-semibold text-text-primary mb-1">Was ist KYC?</p>
          <p>
            Know Your Customer (KYC) bezeichnet den Identifikations- und Dokumentationsprozess beim
            Onboarding neuer Kunden. Das KYC-Formular ist das zentrale Dokument jeder
            Kontoeröffnung und Pflicht gemäss{" "}
            <span className="font-semibold text-text-primary">VSB 20</span> und{" "}
            <span className="font-semibold text-text-primary">GwG Art. 3–5</span>.
          </p>
        </div>
      </div>
    </div>
  );
}
