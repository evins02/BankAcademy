"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type BlankokreditMeierForm, EMPTY_BLANKOKREDIT_MEIER } from "./credit-office-types";

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
  { section: "Antragsteller", fields: [
    { label: "Name", value: "Kevin Meier" },
    { label: "Alter", value: "28 Jahre" },
    { label: "Einkommen", value: "CHF 4'800/Monat netto" },
  ]},
  { section: "Kreditantrag", fields: [
    { label: "Gewünschter Kredit", value: "CHF 25'000" },
    { label: "Beantragte Laufzeit", value: "48 Monate" },
    { label: "Zweck", value: "Konsumkredit" },
  ]},
  { section: "Bestehende Verpflichtungen", fields: [
    { label: "Autoleasing", value: "CHF 450/Monat" },
    { label: "Kreditkarte Limite", value: "CHF 8'000" },
    { label: "ZEK", value: "Vorhanden, keine Einträge" },
  ]},
];

interface Props { onSubmit: (data: BlankokreditMeierForm) => void }

export function BlankokreditMeierFormCard({ onSubmit }: Props) {
  const [open, setOpen] = useState(true);
  const [form, setForm] = useState<BlankokreditMeierForm>(EMPTY_BLANKOKREDIT_MEIER);

  function set<K extends keyof BlankokreditMeierForm>(k: K, v: BlankokreditMeierForm[K]) {
    setForm(prev => ({ ...prev, [k]: v }));
  }

  return (
    <form onSubmit={e => { e.preventDefault(); onSubmit(form); }} className="mx-auto max-w-3xl space-y-5 pb-8">
      <div className="rounded-DEFAULT border border-border bg-gray-50 p-4">
        <p className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-1">Auftrag</p>
        <p className="text-sm text-text-primary">Kreditantrag Kevin Meier – Bitte prüfen und Entscheid fällen.</p>
      </div>

      {/* Dossier */}
      <div className="rounded-DEFAULT bg-surface shadow-card overflow-hidden">
        <button type="button" onClick={() => setOpen(v => !v)} className="w-full flex items-center justify-between px-6 py-4 hover:bg-surface/80 transition-colors">
          <div className="text-left">
            <p className="text-sm font-bold text-text-primary">Blankokredit – Kevin Meier</p>
            <p className="text-xs text-text-secondary">{"Kundendossier · Konsumkredit CHF 25'000"}</p>
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
              <p className="text-xs text-text-secondary">Vertraulich · KKG · ZEK-Richtlinien</p>
            </div>
          </div>
        )}
      </div>

      {/* Form */}
      <div className="rounded-DEFAULT bg-surface shadow-card overflow-hidden">
        <div className="px-6 py-5 border-b border-border" style={{ background: "var(--primary, #0D1B4B)" }}>
          <p className="text-base font-bold text-white">Credit Office – Prüfungsformular</p>
          <p className="text-sm text-white/65 mt-0.5">Blankokredit Kevin Meier</p>
        </div>

        <Sec num="1" title="Kreditfähigkeit" />
        <Row label="Nettoeinkommen / Monat"><input className={inp} placeholder="CHF/Monat" value={form.nettoeinkommenMonat} onChange={e => set("nettoeinkommenMonat", e.target.value)} /></Row>
        <Row label="Betreibungsregisterauszug">
          <select className={sel} value={form.betreibungsregister} onChange={e => set("betreibungsregister", e.target.value as BlankokreditMeierForm["betreibungsregister"])}>
            <option value="">— bitte wählen —</option>
            <option value="vorhanden">Vorhanden</option>
            <option value="fehlt">Fehlt</option>
          </select>
        </Row>
        <Row label="ZEK-Auskunft">
          <select className={sel} value={form.zekAuskunft} onChange={e => set("zekAuskunft", e.target.value as BlankokreditMeierForm["zekAuskunft"])}>
            <option value="">— bitte wählen —</option>
            <option value="vorhanden">Vorhanden, keine Einträge</option>
            <option value="fehlt">Fehlt</option>
            <option value="eintraege">Einträge vorhanden</option>
          </select>
        </Row>
        <Row label="Leasing Restsaldo (als Verpflichtung)"><input className={inp} placeholder="CHF" value={form.leasingRestsaldo} onChange={e => set("leasingRestsaldo", e.target.value)} /></Row>
        <Row label="Kreditkarte Limite (als Verpflichtung)"><input className={inp} placeholder="CHF" value={form.kreditkarteLimite} onChange={e => set("kreditkarteLimite", e.target.value)} /></Row>
        <Row label="Andere Kredite"><input className={inp} placeholder="CHF (0 falls keine)" value={form.andereKredite} onChange={e => set("andereKredite", e.target.value)} /></Row>
        <Row label="Total bestehende Verpflichtungen"><input className={inp} placeholder="CHF" value={form.totalVerpflichtungen} onChange={e => set("totalVerpflichtungen", e.target.value)} /></Row>
        <Row label="Neuer Kredit"><input className={inp} placeholder="CHF" value={form.neuerKredit} onChange={e => set("neuerKredit", e.target.value)} /></Row>
        <Row label="Total inkl. neuer Kredit"><input className={inp} placeholder="CHF" value={form.totalInklNeu} onChange={e => set("totalInklNeu", e.target.value)} /></Row>
        <Row label="Geteilt durch 36 Monate (KKG-Berechnung)" formula="Total / 36"><input className={inp} placeholder="CHF/Monat" value={form.geteiltDurch36} onChange={e => set("geteiltDurch36", e.target.value)} /></Row>
        <Row label="Freibetrag gem. KKG" formula="Nettoeinkommen − Lebenshaltungskosten (CHF 1'700)"><input className={inp} placeholder="CHF" value={form.freibetrag} onChange={e => set("freibetrag", e.target.value)} /></Row>
        <Row label="Kreditfähigkeit">
          <select className={sel} value={form.kreditfaehigkeit} onChange={e => set("kreditfaehigkeit", e.target.value as BlankokreditMeierForm["kreditfaehigkeit"])}>
            <option value="">— bitte wählen —</option>
            <option value="gegeben">Gegeben</option>
            <option value="nicht_gegeben">Nicht gegeben</option>
          </select>
        </Row>

        <Sec num="2" title="Kreditwürdigkeit" />
        <Row label="ZEK-Beurteilung">
          <textarea className={inp + " resize-none"} rows={2} placeholder="Beurteilung ZEK-Auskunft..." value={form.zekBeurteilung} onChange={e => set("zekBeurteilung", e.target.value)} />
        </Row>
        <Row label="Allgemeine Beurteilung">
          <textarea className={inp + " resize-none"} rows={2} placeholder="Allgemeine Kreditwürdigkeit..." value={form.allgemeineBeurteilung} onChange={e => set("allgemeineBeurteilung", e.target.value)} />
        </Row>

        <Sec num="3" title="Laufzeit" />
        <Row label="Beantragte Laufzeit"><input className={inp} placeholder="Monate" value={form.beantragteLaufzeit} onChange={e => set("beantragteLaufzeit", e.target.value)} /></Row>
        <Row label="KKG-Konformität (Maximum: 36 Monate)">
          <select className={sel} value={form.laufzeitResult} onChange={e => set("laufzeitResult", e.target.value as BlankokreditMeierForm["laufzeitResult"])}>
            <option value="">— bitte wählen —</option>
            <option value="konform">Konform</option>
            <option value="nicht_konform">Nicht konform</option>
          </select>
        </Row>

        <Sec num="4" title="Entscheid" />
        <Row label="Credit-Office-Entscheid">
          <select className={sel} value={form.entscheid} onChange={e => set("entscheid", e.target.value as BlankokreditMeierForm["entscheid"])}>
            <option value="">— bitte wählen —</option>
            <option value="bewilligen">Bewilligen</option>
            <option value="bewilligen_auflagen">Bewilligen mit Auflagen</option>
            <option value="rueckfrage">Rückfrage an Berater</option>
            <option value="ablehnen">Ablehnen</option>
          </select>
        </Row>
        <Row label="Rückfrage / Begründung">
          <textarea className={inp + " resize-none"} rows={4} placeholder="Welche Informationen fehlen? Falls Bewilligung mit Auflagen: Welche Auflagen?" value={form.begruendung} onChange={e => set("begruendung", e.target.value)} />
        </Row>

        <div className="px-6 py-5 border-t border-border flex items-center justify-between gap-4">
          <p className="text-xs text-text-secondary">Konsumkreditgesetz (KKG) · ZEK-Richtlinien</p>
          <Button type="submit" variant="primary" className="shrink-0 min-w-44">Entscheid einreichen →</Button>
        </div>
      </div>
    </form>
  );
}
