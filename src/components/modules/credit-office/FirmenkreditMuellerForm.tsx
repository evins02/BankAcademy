"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type FirmenkreditMuellerForm, EMPTY_FIRMENKREDIT_MUELLER } from "./credit-office-types";

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

const DOSSIER_FIRMA = [
  { section: "Firmendaten", fields: [
    { label: "Firma", value: "Müller Bau GmbH" },
    { label: "Branche", value: "Baugewerbe" },
    { label: "Gründung", value: "2018" },
    { label: "Mitarbeiter", value: "12" },
    { label: "Gewünschter Kredit", value: "CHF 350'000" },
    { label: "Zweck", value: "Betriebsmittelkredit" },
    { label: "Sicherheit", value: "Zession Debitoren" },
  ]},
  { section: "Jahresabschluss (letztes Jahr)", fields: [
    { label: "Umsatz", value: "CHF 2'400'000" },
    { label: "Materialaufwand", value: "CHF 980'000" },
    { label: "Personalaufwand", value: "CHF 890'000" },
    { label: "Übriger Aufwand", value: "CHF 310'000" },
    { label: "EBITDA", value: "CHF 220'000" },
    { label: "Abschreibungen", value: "CHF 85'000" },
    { label: "EBIT", value: "CHF 135'000" },
    { label: "Zinsaufwand", value: "CHF 28'000" },
    { label: "Reingewinn", value: "CHF 107'000" },
  ]},
  { section: "Bilanz", fields: [
    { label: "Eigenkapital", value: "CHF 180'000" },
    { label: "Fremdkapital langfristig", value: "CHF 420'000" },
    { label: "Cashflow", value: "CHF 192'000" },
  ]},
];

interface Props { onSubmit: (data: FirmenkreditMuellerForm) => void }

export function FirmenkreditMuellerFormCard({ onSubmit }: Props) {
  const [open, setOpen] = useState(true);
  const [form, setForm] = useState<FirmenkreditMuellerForm>(EMPTY_FIRMENKREDIT_MUELLER);

  function set<K extends keyof FirmenkreditMuellerForm>(k: K, v: FirmenkreditMuellerForm[K]) {
    setForm(prev => ({ ...prev, [k]: v }));
  }

  return (
    <form onSubmit={e => { e.preventDefault(); onSubmit(form); }} className="mx-auto max-w-3xl space-y-5 pb-8">
      <div className="rounded-DEFAULT border border-border bg-gray-50 p-4">
        <p className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-1">Auftrag</p>
        <p className="text-sm text-text-primary">Betriebsmittelkredit Müller Bau GmbH – Bitte prüfen und Entscheid fällen.</p>
      </div>

      {/* Dossier */}
      <div className="rounded-DEFAULT bg-surface shadow-card overflow-hidden">
        <button type="button" onClick={() => setOpen(v => !v)} className="w-full flex items-center justify-between px-6 py-4 hover:bg-surface/80 transition-colors">
          <div className="text-left">
            <p className="text-sm font-bold text-text-primary">Firmenkredit – Müller Bau GmbH</p>
            <p className="text-xs text-text-secondary">{"Kundendossier · Betriebsmittelkredit CHF 350'000"}</p>
          </div>
          <div className="text-text-secondary">{open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</div>
        </button>
        {open && (
          <div className="border-t border-border">
            {DOSSIER_FIRMA.map(s => (
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
              <p className="text-xs text-text-secondary">Vertraulich · Bankgeheimnis</p>
            </div>
          </div>
        )}
      </div>

      {/* Form */}
      <div className="rounded-DEFAULT bg-surface shadow-card overflow-hidden">
        <div className="px-6 py-5 border-b border-border" style={{ background: "var(--primary, #0D1B4B)" }}>
          <p className="text-base font-bold text-white">Credit Office – Prüfungsformular</p>
          <p className="text-sm text-white/65 mt-0.5">Firmenkredit Müller Bau GmbH</p>
        </div>

        <Sec num="1" title="Deckungsgrad" />
        <Row label="Cashflow"><input className={inp} placeholder="CHF" value={form.cashflow} onChange={e => set("cashflow", e.target.value)} /></Row>
        <Row label="Zinsaufwand"><input className={inp} placeholder="CHF" value={form.zinsaufwand} onChange={e => set("zinsaufwand", e.target.value)} /></Row>
        <Row label="1.5% × Langfristiges Fremdkapital" formula="Langfr. FK × 1.5%"><input className={inp} placeholder="CHF" value={form.anderthalbProzentFK} onChange={e => set("anderthalbProzentFK", e.target.value)} /></Row>
        <Row label="Nenner total" formula="Zinsaufwand + 1.5% × FK"><input className={inp} placeholder="CHF" value={form.nennerTotal} onChange={e => set("nennerTotal", e.target.value)} /></Row>
        <Row label="Deckungsgrad" formula="Cashflow / Nenner"><input className={inp} placeholder="z.B. 5.6" value={form.deckungsgrad} onChange={e => set("deckungsgrad", e.target.value)} /></Row>
        <Row label="Beurteilung Deckungsgrad (Minimum: 1.2)">
          <select className={sel} value={form.deckungsgradResult} onChange={e => set("deckungsgradResult", e.target.value as FirmenkreditMuellerForm["deckungsgradResult"])}>
            <option value="">— bitte wählen —</option>
            <option value="erfuellt">Erfüllt</option>
            <option value="nicht_erfuellt">Nicht erfüllt</option>
          </select>
        </Row>

        <Sec num="2" title="Eigenkapitalquote" />
        <Row label="Eigenkapital"><input className={inp} placeholder="CHF" value={form.eigenkapital} onChange={e => set("eigenkapital", e.target.value)} /></Row>
        <Row label="Gesamtkapital" formula="Eigenkapital + Fremdkapital"><input className={inp} placeholder="CHF" value={form.gesamtkapital} onChange={e => set("gesamtkapital", e.target.value)} /></Row>
        <Row label="EK-Quote" formula="EK / Gesamtkapital × 100"><input className={inp} placeholder="%" value={form.ekQuote} onChange={e => set("ekQuote", e.target.value)} /></Row>
        <Row label="Beurteilung EK-Quote">
          <select className={sel} value={form.ekQuoteResult} onChange={e => set("ekQuoteResult", e.target.value as FirmenkreditMuellerForm["ekQuoteResult"])}>
            <option value="">— bitte wählen —</option>
            <option value="stark">Stark (&gt;40%)</option>
            <option value="akzeptabel">Akzeptabel (20–40%)</option>
            <option value="schwach">Schwach (&lt;20%)</option>
          </select>
        </Row>

        <Sec num="3" title="Qualitative Risiken" />
        <Row label="Branchenrisiko">
          <select className={sel} value={form.branchenrisiko} onChange={e => set("branchenrisiko", e.target.value as FirmenkreditMuellerForm["branchenrisiko"])}>
            <option value="">— bitte wählen —</option>
            <option value="tief">Tief</option>
            <option value="mittel">Mittel</option>
            <option value="hoch">Hoch</option>
          </select>
        </Row>
        <Row label="Track Record (Firmenalter / Erfahrung)">
          <select className={sel} value={form.trackRecord} onChange={e => set("trackRecord", e.target.value as FirmenkreditMuellerForm["trackRecord"])}>
            <option value="">— bitte wählen —</option>
            <option value="gut">Gut</option>
            <option value="akzeptabel">Akzeptabel</option>
            <option value="schwach">Schwach</option>
          </select>
        </Row>
        <Row label="Sicherheiten">
          <select className={sel} value={form.sicherheiten} onChange={e => set("sicherheiten", e.target.value as FirmenkreditMuellerForm["sicherheiten"])}>
            <option value="">— bitte wählen —</option>
            <option value="stark">Stark</option>
            <option value="akzeptabel">Akzeptabel</option>
            <option value="schwach">Schwach</option>
          </select>
        </Row>
        <Row label="Weitere Risiken">
          <textarea className={inp + " resize-none"} rows={3} placeholder="Weitere qualitative Risiken..." value={form.weitereRisiken} onChange={e => set("weitereRisiken", e.target.value)} />
        </Row>

        <Sec num="4" title="Gesamtbeurteilung Risiko" />
        <Row label="Gesamtrisiko">
          <select className={sel} value={form.gesamtrisiko} onChange={e => set("gesamtrisiko", e.target.value as FirmenkreditMuellerForm["gesamtrisiko"])}>
            <option value="">— bitte wählen —</option>
            <option value="tief">Tief</option>
            <option value="mittel">Mittel</option>
            <option value="erhoeht">Erhöht</option>
            <option value="hoch">Hoch</option>
          </select>
        </Row>

        <Sec num="5" title="Entscheid" />
        <Row label="Credit-Office-Entscheid">
          <select className={sel} value={form.entscheid} onChange={e => set("entscheid", e.target.value as FirmenkreditMuellerForm["entscheid"])}>
            <option value="">— bitte wählen —</option>
            <option value="bewilligen">Bewilligen</option>
            <option value="bewilligen_auflagen">Bewilligen mit Auflagen</option>
            <option value="rueckfrage">Rückfrage an Berater</option>
            <option value="ablehnen">Ablehnen</option>
          </select>
        </Row>
        <Row label="Auflagen / Rückfrage / Begründung">
          <textarea className={inp + " resize-none"} rows={4} placeholder="Welche Auflagen stellen Sie? Welche Informationen fehlen noch?" value={form.auflagenBegruendung} onChange={e => set("auflagenBegruendung", e.target.value)} />
        </Row>

        <div className="px-6 py-5 border-t border-border flex items-center justify-between gap-4">
          <p className="text-xs text-text-secondary">Bankinterne Kreditrichtlinien · Basel III</p>
          <Button type="submit" variant="primary" className="shrink-0 min-w-44">Entscheid einreichen →</Button>
        </div>
      </div>
    </form>
  );
}
