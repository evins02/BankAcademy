"use client";

import { useState } from "react";
import { ArrowLeft, FileText, ClipboardCheck, Bot, Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { KontoPrivatRunner } from "./KontoPrivatRunner";
import { KycFormRunner } from "@/components/modules/kyc-form/KycFormRunner";

type HubView = "hub" | "levels" | "kyc";

export function KontoeröffnungHub() {
  const [view, setView] = useState<HubView>("hub");

  if (view === "levels") {
    return (
      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="shrink-0 border-b border-border px-6 py-3">
          <button
            onClick={() => setView("hub")}
            className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            <ArrowLeft size={15} />
            Zurück zur Übersicht
          </button>
        </div>
        <KontoPrivatRunner />
      </div>
    );
  }

  if (view === "kyc") {
    return (
      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="shrink-0 border-b border-border px-6 py-3 flex items-center justify-between">
          <button
            onClick={() => setView("hub")}
            className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            <ArrowLeft size={15} />
            Zurück zur Übersicht
          </button>
          <div className="flex items-center gap-2">
            <Bot size={15} className="text-primary" />
            <span className="text-xs font-semibold text-primary">KI-gestützte Auswertung</span>
          </div>
        </div>
        <KycFormRunner onBack={() => setView("hub")} />
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="mx-auto max-w-2xl space-y-6">
        <div>
          <p className="text-sm text-text-secondary mb-1">
            Wähle eine Übung aus dem Modul Kontoeröffnung:
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {/* Existing level exercises */}
          <div className="flex flex-col gap-4 rounded-DEFAULT bg-surface p-6 shadow-card">
            <div className="flex items-start justify-between">
              <Badge variant="green">Level 1–3</Badge>
              <FileText size={18} className="text-text-secondary shrink-0" />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-bold text-text-primary mb-2">
                Dokumente prüfen & Fallentscheidungen
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                Prüfe Kundendokumente, erkenne Risiken und triff die richtige Entscheidung bei
                schwierigen KYC-Fällen.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="text-xs text-text-secondary">3 Levels</span>
                <span className="text-text-secondary/40">·</span>
                <span className="text-xs text-text-secondary">9 Fälle</span>
                <span className="text-text-secondary/40">·</span>
                <span className="text-xs text-text-secondary">MCQ & Dokumentenprüfung</span>
              </div>
            </div>
            <Button
              onClick={() => setView("levels")}
              variant="primary"
              className="w-full"
            >
              Starten
            </Button>
          </div>

          {/* New KYC form exercise */}
          <div
            className="flex flex-col gap-4 rounded-DEFAULT bg-surface p-6 shadow-card relative overflow-hidden"
            style={{ border: "2px solid rgba(13,27,75,0.15)" }}
          >
            {/* Accent stripe */}
            <div
              className="absolute top-0 left-0 right-0 h-0.5"
              style={{ background: "var(--primary, #0D1B4B)" }}
            />

            <div className="flex items-start justify-between">
              <Badge variant="orange">Level 2 – Fortgeschritten</Badge>
              <ClipboardCheck size={18} className="text-text-secondary shrink-0" />
            </div>

            <div className="flex-1">
              <h3 className="text-base font-bold text-text-primary mb-2">
                KYC Formular ausfüllen
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                Nimm den Kundenauftrag entgegen und fülle das KYC-Formular für Thomas Kowalski
                vollständig und korrekt aus. Finde die versteckten Fallen!
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="flex items-center gap-1 text-xs text-text-secondary">
                  <Clock size={11} /> ca. 5 Min
                </span>
                <span className="text-text-secondary/40">·</span>
                <span className="flex items-center gap-1 text-xs text-text-secondary">
                  <Star size={11} /> +150 XP
                </span>
                <span className="text-text-secondary/40">·</span>
                <span className="flex items-center gap-1 text-xs text-primary font-semibold">
                  <Bot size={11} /> KI-Auswertung
                </span>
              </div>
            </div>

            <Button
              onClick={() => setView("kyc")}
              variant="primary"
              className="w-full"
            >
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
