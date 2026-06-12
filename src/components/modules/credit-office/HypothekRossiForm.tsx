"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type HypothekRossiForm, EMPTY_HYPOTHEK_ROSSI } from "./credit-office-types";

const inp = "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/25 transition-colors";
const sel = "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/25 transition-colors";

function Sec({ num, title }: { num: string; title: string }) {
  return (
    <div className="flex items-center gap-3 px-6 py-3 border-b border-border" style={{ background: "var(--surface-2, #f9fafb)" }}>
      <span className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold text-white shrink-0" style={{ background: "var(--primary, #0D1B4B)" }}>{num}</span>
      <h3 className="text-sm font-bold text-text-primary uppercase tracking-wide">{title}</h3>
    </div>
  );
}

function Row({ label, formula, children }: { label: string; formula?: string; children: React.ReactNode }) {
  return (
    <div className="px-6 py-3 border-b border-border last:border-0">
      <label className="block text-sm text-text-secondary mb-1">{label}</label>
      {formula && <p className="text-xs font-mono text-text-secondary/70 mb-1.5">{formula}</p>}
      {children}
    </div>
  );
}

const DOSSIER = [
  { section: "Kreditnehmer", fields: [
    { label: "Name", value: "Marco & Lisa Rossi" },
    { label: "Alter Marco", value: "52 Jahre (100% Pensum)" },
    { label: "Alter Lisa", value: "49 Jahre (60% Pensum)" },
    { label: "Einkommen Marco", value: "CHF 130'000/Jahr brutto" },
    { label: "Einkommen Lisa", value: "CHF 38'000/Jahr brutto" },
  ]},
  { section: "Liegenschaft", fields: [
    { label: "Kaufpreis", value: "CHF 1'200'000" },
    { label: "Objekt", value: "Einfamilienhaus Zollikofen" },
    { label: "Gewünschte Hypothek", value: "CHF 960'000" },
    { label: "1. Hypothek (65%)", value: "CHF 780'000" },
    { label: "2. Hypothek (15%)", value: "CHF 180'000" },
  ]},
  { section: "Finanzierung", fields: [
    { label: "Eigenmittel total", value: "CHF 240'000" },
    { label: "davon PK-Vorbezug", value: "CHF 140'000" },
    { label: "davon Ersparnisse", value: "CHF 100'000" },
    { label: "Amortisationsplan", value: "15 Jahre" },
    { label: "Pensionierung Marco", value: "in 13 Jahren" },
  ]},
];

interface Props { onSubmit: (data: HypothekRossiForm) => void }

export function HypothekRossiFormCard({ onSubmit }: Props) {
  const [open, setOpen] = useState(true);
  const [form, setForm] = useState<HypothekRossiForm>(EMPTY_HYPOTHEK_ROSSI);

  function set<K extends keyof HypothekRossiForm>(k: K, v: HypothekRossiForm[K]) {
    setForm(prev => ({ ...prev, [k]: v }));
  }

  return (
    <form onSubmit={e => { e.preventDefault(); onSubmit(form); }} className="mx-auto max-w-3xl space-y-5 pb-8">
      {/* Briefing banner */}
      <div className="rounded-DEFAULT border border-border bg-gray-50 p-4">
        <p className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-1">Auftrag</p>
        <p className="text-sm text-text-primary">Dossier eingetroffen vom Kundenberater. Bitte prüfen und Entscheid fällen.</p>
      </div>

      {/* Dossier */}
      <div className="rounded-DEFAULT bg-surface shadow-card overflow-hidden">
        <button type="button" onClick={() => setOpen(v => !v)}
          className="w-full flex items-center justify-between px-6 py-4 hover:bg-surface/80 transition-colors">
          <div className="text-left">
            <p className="text-sm font-bold text-text-primary">Hypothekarantrag – Marco &amp; Lisa Rossi</p>
            <p className="text-xs text-text-secondary">Kundendossier · Neueröffnung Hypothek · EFH Zollikofen</p>
          </div>
          <div className="text-text-secondary">{open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</div>
        </button>
        {open && (
          <div className="border-t border-border">
            {DOSSIER.map(s => (
              <div key={s.section}>
                <div className="px-4 py-2 bg-gray-50 border-b border-border">
                  <p className="text-xs font-bold text-text-secondary uppercase tracking-wider">{s.section}</p>
                </div>
                {s.fields.map(f => (
                  <div key={f.label} className="flex px-4 py-2.5 border-b border-border last:border-0">
                    <span className="w-52 shrink-0 text-xs text-text-secondary">{f.label}</span>
                    <span className="flex-1 text-xs text-text-primary font-medium">{f.value}</span>
                  </div>
                ))}
              </div>
            ))}
            <div className="px-4 py-2 bg-gray-50 border-t border-border">
              <p className="text-xs text-text-secondary">Vertraulich · FINMA RS 2012/3 · SBVg-Richtlinien</p>
            </div>
          </div>
        )}
      </div>

      {/* Form */}
      <div className="rounded-DEFAULT bg-surface shadow-card overflow-hidden">
        <div className="px-6 py-5 border-b border-border" style={{ background: "var(--primary, #0D1B4B)" }}>
          <p className="text-base font-bold text-white">Credit Office – Prüfungsformular</p>
          <p className="text-sm text-white/65 mt-0.5">Privathypothek Familie Rossi</p>
        </div>

        <Sec num="1" title="Belehnung" />
        <Row label="Verkehrswert der Liegenschaft"><input className={inp} placeholder="CHF" value={form.verkehrswert} onChange={e => set("verkehrswert", e.target.value)} /></Row>
        <Row label="Hypothek total"><input className={inp} placeholder="CHF" value={form.hypothekTotal} onChange={e => set("hypothekTotal", e.target.value)} /></Row>
        <Row label="Belehnung" formula="Hypothek / Verkehrswert × 100"><input className={inp} placeholder="%" value={form.belehnungProzent} onChange={e => set("belehnungProzent", e.target.value)} /></Row>
        <Row label="Beurteilung Belehnung (Maximum: 80%)">
          <select className={sel} value={form.belehnungResult} onChange={e => set("belehnungResult", e.target.value as HypothekRossiForm["belehnungResult"])}>
            <option value="">— bitte wählen —</option>
            <option value="im_rahmen">Im Rahmen</option>
            <option value="grenzwertig">Grenzwertig</option>
            <option value="ueberschritten">Überschritten</option>
          </select>
        </Row>

        <Sec num="2" title="Eigenmittel" />
        <Row label="Total Eigenmittel"><input className={inp} placeholder="CHF" value={form.totalEM} onChange={e => set("totalEM", e.target.value)} /></Row>
        <Row label="Davon echte Eigenmittel (ohne PK-Vorbezug)"><input className={inp} placeholder="CHF" value={form.echteEM} onChange={e => set("echteEM", e.target.value)} /></Row>
        <Row label="Mindest-Eigenmittel 10%" formula="Verkehrswert × 10%"><input className={inp} placeholder="CHF" value={form.mindestEM} onChange={e => set("mindestEM", e.target.value)} /></Row>
        <Row label="Beurteilung Eigenmittel">
          <select className={sel} value={form.eigenmittelResult} onChange={e => set("eigenmittelResult", e.target.value as HypothekRossiForm["eigenmittelResult"])}>
            <option value="">— bitte wählen —</option>
            <option value="erfuellt">Erfüllt</option>
            <option value="nicht_erfuellt">Nicht erfüllt</option>
          </select>
        </Row>

        <Sec num="3" title="Tragbarkeit heute" />
        <Row label="Kalkulatorischer Zins (5%)" formula="Hypothek × 5%"><input className={inp} placeholder="CHF/Jahr" value={form.zinskosten} onChange={e => set("zinskosten", e.target.value)} /></Row>
        <Row label="Nebenkosten (1%)" formula="Verkehrswert × 1%"><input className={inp} placeholder="CHF/Jahr" value={form.nebenkosten} onChange={e => set("nebenkosten", e.target.value)} /></Row>
        <Row label="Amortisation 2. Hypothek" formula="2. Hypothek / 15"><input className={inp} placeholder="CHF/Jahr" value={form.amortisation} onChange={e => set("amortisation", e.target.value)} /></Row>
        <Row label="Total Jahreskosten"><input className={inp} placeholder="CHF/Jahr" value={form.totalJahreskosten} onChange={e => set("totalJahreskosten", e.target.value)} /></Row>
        <Row label="Jahreseinkommen total"><input className={inp} placeholder="CHF/Jahr" value={form.jahreseinkommen} onChange={e => set("jahreseinkommen", e.target.value)} /></Row>
        <Row label="Tragbarkeit" formula="Jahreskosten / Einkommen × 100"><input className={inp} placeholder="%" value={form.tragbarkeitProzent} onChange={e => set("tragbarkeitProzent", e.target.value)} /></Row>
        <Row label="Beurteilung Tragbarkeit (Maximum: 33%)">
          <select className={sel} value={form.tragbarkeitResult} onChange={e => set("tragbarkeitResult", e.target.value as HypothekRossiForm["tragbarkeitResult"])}>
            <option value="">— bitte wählen —</option>
            <option value="bestanden">Bestanden</option>
            <option value="nicht_bestanden">Nicht bestanden</option>
          </select>
        </Row>

        <Sec num="4" title="Tragbarkeit Rentenalter" />
        <Row label="Jahre bis Pensionierung (Marco)"><input className={inp} placeholder="Jahre" value={form.jahreBisPension} onChange={e => set("jahreBisPension", e.target.value)} /></Row>
        <Row label="Geschätztes Renteneinkommen"><input className={inp} placeholder="CHF/Jahr" value={form.geschaetztesRenteneinkommen} onChange={e => set("geschaetztesRenteneinkommen", e.target.value)} /></Row>
        <Row label="Tragbarkeit Rentenalter" formula="Jahreskosten / Renteneinkommen × 100"><input className={inp} placeholder="%" value={form.tragbarkeitRenteProzent} onChange={e => set("tragbarkeitRenteProzent", e.target.value)} /></Row>
        <Row label="Beurteilung Rentenalter (Maximum: 38%)">
          <select className={sel} value={form.tragbarkeitRenteResult} onChange={e => set("tragbarkeitRenteResult", e.target.value as HypothekRossiForm["tragbarkeitRenteResult"])}>
            <option value="">— bitte wählen —</option>
            <option value="bestanden">Bestanden</option>
            <option value="nicht_bestanden">Nicht bestanden</option>
          </select>
        </Row>

        <Sec num="5" title="Identifizierte Risiken" />
        <Row label="Risiken">
          <textarea className={inp + " resize-none"} rows={4} placeholder="Beschreiben Sie alle erkannten Risiken..." value={form.risiken} onChange={e => set("risiken", e.target.value)} />
        </Row>

        <Sec num="6" title="Entscheid" />
        <Row label="Credit-Office-Entscheid">
          <select className={sel} value={form.entscheid} onChange={e => set("entscheid", e.target.value as HypothekRossiForm["entscheid"])}>
            <option value="">— bitte wählen —</option>
            <option value="bewilligen">Bewilligen</option>
            <option value="bewilligen_auflagen">Bewilligen mit Auflagen</option>
            <option value="rueckfrage">Rückfrage an Berater</option>
            <option value="ablehnen">Ablehnen</option>
          </select>
        </Row>
        <Row label="Rückfrage / Begründung">
          <textarea className={inp + " resize-none"} rows={4} placeholder="Falls Rückfrage: Welche Informationen fehlen? Falls Ablehnung: Vollständige Begründung." value={form.begruendung} onChange={e => set("begruendung", e.target.value)} />
        </Row>

        <div className="px-6 py-5 border-t border-border flex items-center justify-between gap-4">
          <p className="text-xs text-text-secondary">FINMA RS 2012/3 · SBVg-Richtlinien Hypotheken</p>
          <Button type="submit" variant="primary" className="shrink-0 min-w-44">Entscheid einreichen →</Button>
        </div>
      </div>
    </form>
  );
}
