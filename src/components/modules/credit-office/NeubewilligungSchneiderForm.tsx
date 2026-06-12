"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type NeubewilligungSchneiderForm, EMPTY_NEUBEWILLIGUNG_SCHNEIDER } from "./credit-office-types";

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
    { label: "Name", value: "Hans Schneider" },
    { label: "Alter", value: "58 Jahre" },
    { label: "Ursprüngliche Bewilligung", value: "2019" },
  ]},
  { section: "Hypothek", fields: [
    { label: "Hypothek", value: "CHF 680'000" },
    { label: "Liegenschaft", value: "EFH Thun" },
    { label: "Aktueller Schätzwert", value: "CHF 820'000" },
    { label: "Ursprünglicher Schätzwert", value: "CHF 900'000" },
  ]},
  { section: "Einkommenssituation", fields: [
    { label: "Aktuelles Einkommen", value: "CHF 95'000/Jahr" },
    { label: "Einkommen bei Bewilligung 2019", value: "CHF 115'000/Jahr" },
    { label: "Grund der Änderung", value: "Teilpension" },
    { label: "Neue Verpflichtungen seit 2019", value: "Autoleasing CHF 12'000 Restsaldo" },
  ]},
];

interface Props { onSubmit: (data: NeubewilligungSchneiderForm) => void }

export function NeubewilligungSchneiderFormCard({ onSubmit }: Props) {
  const [open, setOpen] = useState(true);
  const [form, setForm] = useState<NeubewilligungSchneiderForm>(EMPTY_NEUBEWILLIGUNG_SCHNEIDER);

  function set<K extends keyof NeubewilligungSchneiderForm>(k: K, v: NeubewilligungSchneiderForm[K]) {
    setForm(prev => ({ ...prev, [k]: v }));
  }

  return (
    <form onSubmit={e => { e.preventDefault(); onSubmit(form); }} className="mx-auto max-w-3xl space-y-5 pb-8">
      <div className="rounded-DEFAULT border border-border bg-gray-50 p-4">
        <p className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-1">Auftrag</p>
        <p className="text-sm text-text-primary">Periodische Überprüfung fällig – Kredit Schneider bitte beurteilen und Massnahmen festlegen.</p>
      </div>

      {/* Dossier */}
      <div className="rounded-DEFAULT bg-surface shadow-card overflow-hidden">
        <button type="button" onClick={() => setOpen(v => !v)} className="w-full flex items-center justify-between px-6 py-4 hover:bg-surface/80 transition-colors">
          <div className="text-left">
            <p className="text-sm font-bold text-text-primary">Periodische Überprüfung – Hans Schneider</p>
            <p className="text-xs text-text-secondary">Bestehende Hypothek · EFH Thun · Bewilligung 2019</p>
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
              <p className="text-xs text-text-secondary">Vertraulich · Periodische Kreditüberprüfung</p>
            </div>
          </div>
        )}
      </div>

      {/* Form */}
      <div className="rounded-DEFAULT bg-surface shadow-card overflow-hidden">
        <div className="px-6 py-5 border-b border-border" style={{ background: "var(--primary, #0D1B4B)" }}>
          <p className="text-base font-bold text-white">Credit Office – Prüfungsformular</p>
          <p className="text-sm text-white/65 mt-0.5">Periodische Neubewilligung Schneider</p>
        </div>

        <Sec num="1" title="Aktuelle Belehnung" />
        <Row label="Aktueller Schätzwert"><input className={inp} placeholder="CHF" value={form.aktuellerSchaetzwert} onChange={e => set("aktuellerSchaetzwert", e.target.value)} /></Row>
        <Row label="Hypothek"><input className={inp} placeholder="CHF" value={form.hypothek} onChange={e => set("hypothek", e.target.value)} /></Row>
        <Row label="Aktuelle Belehnung" formula="Hypothek / Schätzwert × 100"><input className={inp} placeholder="%" value={form.belehnungProzent} onChange={e => set("belehnungProzent", e.target.value)} /></Row>
        <Row label="Veränderung Belehnung seit Bewilligung (ursprünglich 75.6%)"><input className={inp} placeholder="+/- Prozentpunkte" value={form.veraenderungProzent} onChange={e => set("veraenderungProzent", e.target.value)} /></Row>
        <Row label="Beurteilung Belehnung">
          <select className={sel} value={form.belehnungResult} onChange={e => set("belehnungResult", e.target.value as NeubewilligungSchneiderForm["belehnungResult"])}>
            <option value="">— bitte wählen —</option>
            <option value="im_rahmen">Im Rahmen (&lt;80%)</option>
            <option value="grenzwertig">Grenzwertig (ca. 80%)</option>
            <option value="ueberschritten">Überschritten (&gt;80%)</option>
          </select>
        </Row>

        <Sec num="2" title="Aktuelle Tragbarkeit" />
        <Row label="Kalkulatorischer Zins 5%" formula="Hypothek × 5%"><input className={inp} placeholder="CHF/Jahr" value={form.zins5} onChange={e => set("zins5", e.target.value)} /></Row>
        <Row label="Nebenkosten 1%" formula="Schätzwert × 1%"><input className={inp} placeholder="CHF/Jahr" value={form.nebenkosten1} onChange={e => set("nebenkosten1", e.target.value)} /></Row>
        <Row label="Total Jahreskosten"><input className={inp} placeholder="CHF/Jahr" value={form.totalKosten} onChange={e => set("totalKosten", e.target.value)} /></Row>
        <Row label="Aktuelles Jahreseinkommen"><input className={inp} placeholder="CHF/Jahr" value={form.aktuellesEinkommen} onChange={e => set("aktuellesEinkommen", e.target.value)} /></Row>
        <Row label="Tragbarkeit" formula="Jahreskosten / Einkommen × 100"><input className={inp} placeholder="%" value={form.tragbarkeitProzent} onChange={e => set("tragbarkeitProzent", e.target.value)} /></Row>
        <Row label="Beurteilung Tragbarkeit">
          <select className={sel} value={form.tragbarkeitResult} onChange={e => set("tragbarkeitResult", e.target.value as NeubewilligungSchneiderForm["tragbarkeitResult"])}>
            <option value="">— bitte wählen —</option>
            <option value="bestanden">Bestanden (&lt;33%)</option>
            <option value="grenzwertig">Grenzwertig (33–38%)</option>
            <option value="nicht_bestanden">Nicht bestanden (&gt;38%)</option>
          </select>
        </Row>

        <Sec num="3" title="Veränderungen seit Bewilligung" />
        <Row label="Einkommen verändert">
          <select className={sel} value={form.einkommenVeraendert} onChange={e => set("einkommenVeraendert", e.target.value as NeubewilligungSchneiderForm["einkommenVeraendert"])}>
            <option value="">— bitte wählen —</option>
            <option value="gestiegen">Gestiegen</option>
            <option value="gleich">Gleich</option>
            <option value="gesunken">Gesunken</option>
          </select>
        </Row>
        <Row label="Liegenschaftswert">
          <select className={sel} value={form.liegenschaftswert} onChange={e => set("liegenschaftswert", e.target.value as NeubewilligungSchneiderForm["liegenschaftswert"])}>
            <option value="">— bitte wählen —</option>
            <option value="gestiegen">Gestiegen</option>
            <option value="gleich">Gleich</option>
            <option value="gesunken">Gesunken</option>
          </select>
        </Row>
        <Row label="Neue Verpflichtungen seit Bewilligung">
          <select className={sel} value={form.neueVerpflichtungen} onChange={e => set("neueVerpflichtungen", e.target.value as NeubewilligungSchneiderForm["neueVerpflichtungen"])}>
            <option value="">— bitte wählen —</option>
            <option value="ja">Ja</option>
            <option value="nein">Nein</option>
          </select>
        </Row>
        <Row label="Details zu Veränderungen">
          <textarea className={inp + " resize-none"} rows={3} placeholder="Beschreiben Sie die relevanten Veränderungen..." value={form.details} onChange={e => set("details", e.target.value)} />
        </Row>

        <Sec num="4" title="Massnahmen" />
        <Row label="Empfohlene Massnahmen">
          <select className={sel} value={form.massnahmen} onChange={e => set("massnahmen", e.target.value as NeubewilligungSchneiderForm["massnahmen"])}>
            <option value="">— bitte wählen —</option>
            <option value="keine">Keine Massnahmen nötig</option>
            <option value="ueberwachung">Erhöhte Überwachung</option>
            <option value="amortisation">Amortisation verlangen</option>
            <option value="gespraech">Gespräch mit Kunden</option>
            <option value="kuendigung">Kreditkündigung prüfen</option>
          </select>
        </Row>
        <Row label="Begründung Massnahmen">
          <textarea className={inp + " resize-none"} rows={4} placeholder="Begründen Sie die empfohlenen Massnahmen..." value={form.begruendungMassnahmen} onChange={e => set("begruendungMassnahmen", e.target.value)} />
        </Row>

        <div className="px-6 py-5 border-t border-border flex items-center justify-between gap-4">
          <p className="text-xs text-text-secondary">FINMA RS 2012/3 · Bankinterne Kreditüberwachung</p>
          <Button type="submit" variant="primary" className="shrink-0 min-w-44">Beurteilung einreichen →</Button>
        </div>
      </div>
    </form>
  );
}
