"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type HypothekFormData, EMPTY_FORM } from "./hypothek-antrag-types";

const inp =
  "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/25 transition-colors";
const sel =
  "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/25 transition-colors";

function SectionHeader({ num, title }: { num: string; title: string }) {
  return (
    <div
      className="flex items-center gap-3 px-6 py-3 border-b border-border"
      style={{ background: "var(--surface-2, #f9fafb)" }}
    >
      <span
        className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold text-white shrink-0"
        style={{ background: "var(--primary, #0D1B4B)" }}
      >
        {num}
      </span>
      <h3 className="text-sm font-bold text-text-primary uppercase tracking-wide">{title}</h3>
    </div>
  );
}

function FieldRow({
  label,
  formula,
  children,
}: {
  label: string;
  formula?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="px-6 py-3 border-b border-border last:border-0">
      <label className="block text-sm text-text-secondary mb-1 leading-snug">{label}</label>
      {formula && (
        <p className="text-xs text-text-secondary/70 mb-1.5 font-mono">{formula}</p>
      )}
      {children}
    </div>
  );
}

const DOSSIER_SECTIONS = [
  {
    title: "Kreditnehmer",
    fields: [
      { label: "Name", value: "Stefan & Anna Brandenberger" },
      { label: "Alter Stefan", value: "42 Jahre" },
      { label: "Alter Anna", value: "39 Jahre" },
      { label: "Einkommen Stefan", value: "CHF 110'000/Jahr brutto" },
      { label: "Einkommen Anna", value: "CHF 45'000/Jahr brutto (80% Pensum, Vertrag läuft Ende Jahr aus)" },
    ],
  },
  {
    title: "Liegenschaft",
    fields: [
      { label: "Kaufpreis", value: "CHF 950'000" },
      { label: "Gewünschte Hypothek", value: "CHF 770'000" },
      { label: "1. Hypothek (65%)", value: "CHF 617'500" },
      { label: "2. Hypothek (16.05%)", value: "CHF 152'500" },
    ],
  },
  {
    title: "Finanzierung",
    fields: [
      { label: "Eigenmittel total", value: "CHF 180'000" },
      { label: "davon PK-Vorbezug", value: "CHF 80'000" },
      { label: "davon Ersparnisse", value: "CHF 100'000" },
      { label: "Amortisationsplan 2. Hypothek", value: "keine Angabe" },
    ],
  },
];

interface HypothekAntragCardProps {
  onSubmit: (data: HypothekFormData) => void;
}

export function HypothekAntragCard({ onSubmit }: HypothekAntragCardProps) {
  const [dossierOpen, setDossierOpen] = useState(true);
  const [form, setForm] = useState<HypothekFormData>(EMPTY_FORM);

  function set<K extends keyof HypothekFormData>(key: K, value: HypothekFormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(form);
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-3xl space-y-5 pb-8">

      {/* Dossier */}
      <div className="rounded-DEFAULT bg-surface shadow-card overflow-hidden">
        <button
          type="button"
          onClick={() => setDossierOpen((v) => !v)}
          className="w-full flex items-center justify-between px-6 py-4 hover:bg-surface/80 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm"
              style={{ background: "var(--primary, #0D1B4B)" }}
            >
              <Home size={16} />
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-text-primary">Hypothekarantrag – Familie Brandenberger</p>
              <p className="text-xs text-text-secondary">Kundendossier · Neueröffnung Hypothek</p>
            </div>
          </div>
          <div className="text-text-secondary">
            {dossierOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
        </button>

        {dossierOpen && (
          <div className="border-t border-border">
            {DOSSIER_SECTIONS.map((section) => (
              <div key={section.title}>
                <div className="px-4 py-2 bg-gray-50 border-b border-border">
                  <p className="text-xs font-bold text-text-secondary uppercase tracking-wider">
                    {section.title}
                  </p>
                </div>
                {section.fields.map((field) => (
                  <div key={field.label} className="flex px-4 py-2.5 border-b border-border last:border-0">
                    <span className="w-52 shrink-0 text-xs text-text-secondary">{field.label}</span>
                    <span className="flex-1 text-xs text-text-primary font-medium">{field.value}</span>
                  </div>
                ))}
              </div>
            ))}
            <div className="px-4 py-2 bg-gray-50 border-t border-border">
              <p className="text-xs text-text-secondary">Vertraulich – Nur für internen Gebrauch · FINMA RS 2012/3 · SBVg-Richtlinien</p>
            </div>
          </div>
        )}
      </div>

      {/* Calculation Form */}
      <div className="rounded-DEFAULT bg-surface shadow-card overflow-hidden">
        <div
          className="px-6 py-5 border-b border-border"
          style={{ background: "var(--primary, #0D1B4B)" }}
        >
          <p className="text-base font-bold text-white">Hypothekarantrag – Prüfung & Berechnung</p>
          <p className="text-sm text-white/65 mt-0.5">Füllen Sie alle Berechnungsfelder aus und treffen Sie eine Beurteilung</p>
        </div>

        {/* Section 1 – Belehnung */}
        <SectionHeader num="1" title="Belehnung" />
        <div>
          <FieldRow label="Verkehrswert der Liegenschaft">
            <input
              className={inp}
              placeholder="CHF"
              value={form.verkehrswert}
              onChange={(e) => set("verkehrswert", e.target.value)}
            />
          </FieldRow>
          <FieldRow label="Gewünschte Hypothek">
            <input
              className={inp}
              placeholder="CHF"
              value={form.hypothekBetrag}
              onChange={(e) => set("hypothekBetrag", e.target.value)}
            />
          </FieldRow>
          <FieldRow
            label="Belehnung"
            formula="Belehnung = Hypothek / Verkehrswert × 100"
          >
            <input
              className={inp}
              placeholder="%"
              value={form.belehnungProzent}
              onChange={(e) => set("belehnungProzent", e.target.value)}
            />
          </FieldRow>
          <FieldRow label="Ergebnis Belehnung (Maximum: 80%)">
            <select
              className={sel}
              value={form.belehnungResult}
              onChange={(e) => set("belehnungResult", e.target.value as HypothekFormData["belehnungResult"])}
            >
              <option value="">— bitte wählen —</option>
              <option value="bestanden">Bestanden</option>
              <option value="nicht_bestanden">Nicht bestanden</option>
            </select>
          </FieldRow>
        </div>

        {/* Section 2 – Eigenmittel */}
        <SectionHeader num="2" title="Eigenmittel" />
        <div>
          <FieldRow label="Total Eigenmittel">
            <input
              className={inp}
              placeholder="CHF"
              value={form.totalEigenmittel}
              onChange={(e) => set("totalEigenmittel", e.target.value)}
            />
          </FieldRow>
          <FieldRow label="davon echte Eigenmittel (ohne PK-Vorbezug)">
            <input
              className={inp}
              placeholder="CHF"
              value={form.echteEigenmittel}
              onChange={(e) => set("echteEigenmittel", e.target.value)}
            />
          </FieldRow>
          <FieldRow
            label="Mindestens 10% echte Eigenmittel erforderlich"
            formula="Mindest-EM = Verkehrswert × 10%"
          >
            <input
              className={inp}
              placeholder="CHF"
              value={form.mindestEM}
              onChange={(e) => set("mindestEM", e.target.value)}
            />
          </FieldRow>
          <FieldRow label="Eigenmittel-Anforderung">
            <select
              className={sel}
              value={form.eigenmittelResult}
              onChange={(e) => set("eigenmittelResult", e.target.value as HypothekFormData["eigenmittelResult"])}
            >
              <option value="">— bitte wählen —</option>
              <option value="erfuellt">Erfüllt</option>
              <option value="nicht_erfuellt">Nicht erfüllt</option>
            </select>
          </FieldRow>
        </div>

        {/* Section 3 – Tragbarkeit */}
        <SectionHeader num="3" title="Tragbarkeit" />
        <div>
          <FieldRow
            label="Kalkulatorischer Jahreszins (5%)"
            formula="Hypothek × 5%"
          >
            <input
              className={inp}
              placeholder="CHF/Jahr"
              value={form.zinskosten}
              onChange={(e) => set("zinskosten", e.target.value)}
            />
          </FieldRow>
          <FieldRow
            label="Nebenkosten (1% des Verkehrswerts)"
            formula="Verkehrswert × 1%"
          >
            <input
              className={inp}
              placeholder="CHF/Jahr"
              value={form.nebenkosten}
              onChange={(e) => set("nebenkosten", e.target.value)}
            />
          </FieldRow>
          <FieldRow
            label="Amortisation 2. Hypothek (15 Jahre)"
            formula="2. Hypothek / 15"
          >
            <input
              className={inp}
              placeholder="CHF/Jahr"
              value={form.amortisationJahr}
              onChange={(e) => set("amortisationJahr", e.target.value)}
            />
          </FieldRow>
          <FieldRow label="Total Jahreskosten">
            <input
              className={inp}
              placeholder="CHF/Jahr"
              value={form.totalJahreskosten}
              onChange={(e) => set("totalJahreskosten", e.target.value)}
            />
          </FieldRow>
          <FieldRow label="Bruttoeinkommen total">
            <input
              className={inp}
              placeholder="CHF/Jahr"
              value={form.bruttoeinkommen}
              onChange={(e) => set("bruttoeinkommen", e.target.value)}
            />
          </FieldRow>
          <FieldRow
            label="Tragbarkeit"
            formula="Tragbarkeit = Jahreskosten / Einkommen × 100"
          >
            <input
              className={inp}
              placeholder="%"
              value={form.tragbarkeitProzent}
              onChange={(e) => set("tragbarkeitProzent", e.target.value)}
            />
          </FieldRow>
          <FieldRow label="Ergebnis Tragbarkeit (Maximum: 33% / 38% Rente)">
            <select
              className={sel}
              value={form.tragbarkeitResult}
              onChange={(e) => set("tragbarkeitResult", e.target.value as HypothekFormData["tragbarkeitResult"])}
            >
              <option value="">— bitte wählen —</option>
              <option value="bestanden">Bestanden</option>
              <option value="nicht_bestanden">Nicht bestanden</option>
            </select>
          </FieldRow>
        </div>

        {/* Section 4 – Amortisation */}
        <SectionHeader num="4" title="Amortisation" />
        <div>
          <FieldRow label="2. Hypothek vorhanden">
            <select
              className={sel}
              value={form.zweiteHypothek}
              onChange={(e) => set("zweiteHypothek", e.target.value as HypothekFormData["zweiteHypothek"])}
            >
              <option value="">— bitte wählen —</option>
              <option value="ja">Ja</option>
              <option value="nein">Nein</option>
            </select>
          </FieldRow>
          <FieldRow label="Amortisationsplan vorhanden">
            <select
              className={sel}
              value={form.amortisationsplan}
              onChange={(e) => set("amortisationsplan", e.target.value as HypothekFormData["amortisationsplan"])}
            >
              <option value="">— bitte wählen —</option>
              <option value="ja">Ja</option>
              <option value="nein">Nein</option>
              <option value="nicht_angegeben">Nicht angegeben</option>
            </select>
          </FieldRow>
          <FieldRow label="Amortisationspflicht erfüllt">
            <select
              className={sel}
              value={form.amortisationspflicht}
              onChange={(e) => set("amortisationspflicht", e.target.value as HypothekFormData["amortisationspflicht"])}
            >
              <option value="">— bitte wählen —</option>
              <option value="ja">Ja</option>
              <option value="nein">Nein</option>
              <option value="unklar">Unklar</option>
            </select>
          </FieldRow>
        </div>

        {/* Section 5 – Beurteilung */}
        <SectionHeader num="5" title="Ihre Beurteilung" />
        <div>
          <FieldRow label="Identifizierte Risiken">
            <textarea
              className={inp + " resize-none"}
              rows={4}
              placeholder="Beschreiben Sie die Risiken dieses Antrags..."
              value={form.risiken}
              onChange={(e) => set("risiken", e.target.value)}
            />
          </FieldRow>
          <FieldRow label="Empfehlung">
            <select
              className={sel}
              value={form.empfehlung}
              onChange={(e) => set("empfehlung", e.target.value as HypothekFormData["empfehlung"])}
            >
              <option value="">— bitte wählen —</option>
              <option value="bewilligen">Bewilligen</option>
              <option value="bewilligen_auflagen">Bewilligen mit Auflagen</option>
              <option value="ablehnen">Ablehnen</option>
            </select>
          </FieldRow>
          <FieldRow label="Begründung">
            <textarea
              className={inp + " resize-none"}
              rows={4}
              placeholder="Begründen Sie Ihre Empfehlung..."
              value={form.begruendung}
              onChange={(e) => set("begruendung", e.target.value)}
            />
          </FieldRow>
        </div>

        {/* Footer */}
        <div className="px-6 py-5 border-t border-border flex items-center justify-between gap-4">
          <p className="text-xs text-text-secondary">
            Rechtsgrundlage: FINMA RS 2012/3 · SBVg-Richtlinien Hypotheken
          </p>
          <Button type="submit" variant="primary" className="shrink-0 min-w-40">
            Antrag einreichen →
          </Button>
        </div>
      </div>
    </form>
  );
}
