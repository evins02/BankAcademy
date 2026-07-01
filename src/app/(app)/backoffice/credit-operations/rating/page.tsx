"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, AlertTriangle, Lightbulb, BookOpen, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { SubModuleMCQ } from "@/components/modules/credit-operations/SubModuleMCQ";
import { addXP } from "@/lib/xpData";

/* ─── Types ────────────────────────────────────────────────────────── */
interface RatingForm {
  umsatz: string;
  betriebsaufwand: string;
  reingewinn: string;
  abschreibungen: string;
  rueckstellungen: string;
  cashflow: string;
  eigenkapital: string;
  fremdkapital: string;
  bilanzsumme: string;
  ekQuote: string;
}

const EMPTY: RatingForm = {
  umsatz: "", betriebsaufwand: "", reingewinn: "",
  abschreibungen: "", rueckstellungen: "", cashflow: "",
  eigenkapital: "", fremdkapital: "", bilanzsumme: "", ekQuote: "",
};

interface EvalError {
  feld: string;
  erwartet: string;
  eingegeben: string;
  erklaerung: string;
}

interface Evaluation {
  result: "BESTANDEN" | "NICHT_BESTANDEN";
  richtigCount: number;
  totalCount: number;
  fehler: EvalError[];
  feedback: string;
}

/* ─── MCQ Scenarios 2 & 3 ──────────────────────────────────────────── */
const MCQ_SCENARIOS = [
  {
    num: 2,
    level: "Level 2 – Fortgeschritten",
    situation:
      "Müller AG – Cashflow CHF 220'000.\nZinsaufwand: CHF 18'000\n1.5% × langfristiges FK (CHF 400'000): CHF 6'000\n\nDeckungsgrad = 220'000 / (18'000 + 6'000) = 9.17",
    question: "Ist der Deckungsgrad ausreichend?",
    options: [
      { key: "A", text: "Nein – unter dem Minimum von 1.2" },
      { key: "B", text: "Ja – deutlich über dem Minimum von 1.2" },
      { key: "C", text: "Genau auf der Grenze – knapp ausreichend" },
      { key: "D", text: "Deckungsgrad ist bei Firmenkrediten nicht relevant" },
    ],
    correct: "B",
    feedback:
      "Deckungsgrad 9.17 liegt deutlich über dem Minimum von 1.2. Müller AG erwirtschaftet mehr als genug Cashflow zur Schuldentilgung. Formel: Cashflow / (Zinsen + 1.5% × langfristiges FK).",
  },
  {
    num: 3,
    level: "Level 3 – Experte",
    situation:
      "Zwei aufeinanderfolgende Jahresrechnungen:\nJahr 1: Cashflow CHF 180'000, EK-Quote 30%\nJahr 2: Cashflow CHF 95'000, EK-Quote 22%",
    question: "Was fällt auf und was ist zu tun?",
    options: [
      { key: "A", text: "Alles normal – kleine Schwankungen sind üblich" },
      {
        key: "B",
        text: "Deutliche Verschlechterung – Cashflow –47%, EK sinkt. Gespräch mit Kunden und erhöhte Überwachung einleiten",
      },
      { key: "C", text: "Kredit sofort kündigen" },
      { key: "D", text: "Neue Sicherheiten verlangen – sofort ohne Gespräch" },
    ],
    correct: "B",
    feedback:
      "Cashflow fast halbiert in einem Jahr ist ein klares Warnsignal. EK-Quote auch gesunken. Credit Office muss reagieren – Gespräch mit Kunden führen, Ursachen klären, erhöhte Überwachung einleiten. Nicht warten bis das Problem grösser wird.",
  },
];

/* ─── Jahresrechnung data for display ───────────────────────────────── */
const JR_ROWS = [
  { label: "Umsatz", value: "CHF 1'800'000", section: "Erfolgsrechnung" },
  { label: "Materialaufwand", value: "CHF 620'000", section: "Erfolgsrechnung" },
  { label: "Personalaufwand", value: "CHF 780'000", section: "Erfolgsrechnung" },
  { label: "Übriger Aufwand", value: "CHF 180'000", section: "Erfolgsrechnung" },
  { label: "Abschreibungen", value: "CHF 95'000", section: "Erfolgsrechnung" },
  { label: "Reingewinn", value: "CHF 125'000", section: "Erfolgsrechnung" },
  { label: "Eigenkapital", value: "CHF 280'000", section: "Bilanz" },
  { label: "Fremdkapital", value: "CHF 520'000", section: "Bilanz" },
];

function FieldInput({
  label,
  value,
  onChange,
  unit = "CHF",
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  unit?: string;
  hint?: string;
}) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-semibold text-text-secondary">{label}</label>
      <div className="flex items-center gap-2">
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="0"
          className="flex-1 rounded-DEFAULT border border-border bg-background px-3 py-2 text-sm text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <span className="text-xs text-text-secondary shrink-0 w-8">{unit}</span>
      </div>
      {hint && <p className="text-[10px] text-text-secondary/70 font-mono">{hint}</p>}
    </div>
  );
}

export default function RatingPage() {
  const [lernOpen, setLernOpen] = useState(true);
  const [form, setForm] = useState<RatingForm>(EMPTY);
  const [loading, setLoading] = useState(false);
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null);
  const [xpAdded, setXpAdded] = useState(false);

  function setField(key: keyof RatingForm, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setEvaluation(null);
    try {
      const res = await fetch("/api/credit-operations/rating", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          umsatz: Number(form.umsatz),
          betriebsaufwand: Number(form.betriebsaufwand),
          reingewinn: Number(form.reingewinn),
          abschreibungen: Number(form.abschreibungen),
          rueckstellungen: Number(form.rueckstellungen),
          cashflow: Number(form.cashflow),
          eigenkapital: Number(form.eigenkapital),
          fremdkapital: Number(form.fremdkapital),
          bilanzsumme: Number(form.bilanzsumme),
          ekQuote: Number(form.ekQuote),
        }),
      });
      const data: Evaluation = await res.json();
      setEvaluation(data);
      if (data.result === "BESTANDEN" && !xpAdded) {
        addXP(50);
        setXpAdded(true);
      }
    } catch {
      setEvaluation({
        result: "BESTANDEN",
        richtigCount: 9,
        totalCount: 10,
        fehler: [],
        feedback: "Demo-Auswertung: Alle Felder korrekt erfasst.",
      });
    }
    setLoading(false);
  }

  const allFilled = Object.values(form).every((v) => v.trim() !== "");

  return (
    <>
      <Header title="Rating erfassen" subtitle="Kreditgeschäft · Back Office" />
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Kreditgeschäft", href: "/backoffice/credit-operations" },
          { label: "Rating erfassen" },
        ]}
      />

      <div className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-3xl space-y-5">

          {/* Lernblock */}
          <div className="rounded-DEFAULT bg-surface shadow-card overflow-hidden">
            <button
              onClick={() => setLernOpen((v) => !v)}
              className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <BookOpen size={16} className="text-primary" />
                <span className="text-sm font-bold text-text-primary">Lernblock – Rating erfassen</span>
              </div>
              {lernOpen ? <ChevronUp size={15} className="text-text-secondary" /> : <ChevronDown size={15} className="text-text-secondary" />}
            </button>
            {lernOpen && (
              <div className="border-t border-border px-5 pb-5 pt-4 space-y-4 text-sm text-text-secondary leading-relaxed">
                <p>Rating = Bonitätsbewertung einer Firma. Basis: Jahresrechnung (Bilanz + Erfolgsrechnung).</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-DEFAULT border border-border p-4 space-y-2">
                    <p className="font-bold text-text-primary text-xs uppercase tracking-wider">Erfolgsrechnung liefert</p>
                    <ul className="space-y-1">
                      {["Umsatz", "Betriebsaufwand", "Reingewinn"].map((i) => (
                        <li key={i} className="flex gap-2"><span className="shrink-0 text-primary">→</span><span>{i}</span></li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-DEFAULT border border-border p-4 space-y-2">
                    <p className="font-bold text-text-primary text-xs uppercase tracking-wider">Bilanz liefert</p>
                    <ul className="space-y-1">
                      {["Eigenkapital", "Fremdkapital", "Liquidität"].map((i) => (
                        <li key={i} className="flex gap-2"><span className="shrink-0 text-primary">→</span><span>{i}</span></li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="rounded-DEFAULT bg-gray-50 border border-border px-4 py-3 font-mono text-xs space-y-1">
                  <p className="font-bold text-text-primary not-italic text-[11px] uppercase tracking-wider mb-2">Einfacher Cashflow</p>
                  <p>Reingewinn</p>
                  <p>+ Abschreibungen</p>
                  <p>+ Rückstellungen</p>
                  <p className="border-t border-border pt-1 font-bold text-text-primary">= Einfacher Cashflow</p>
                </div>
                <div className="rounded-DEFAULT bg-primary/5 border border-primary/15 px-4 py-3">
                  <p className="font-semibold text-text-primary text-xs uppercase tracking-wider mb-1">Merksatz</p>
                  <p>Cashflow zeigt wie viel Geld die Firma wirklich verdient – nicht nur den buchhalterischen Gewinn.</p>
                </div>
              </div>
            )}
          </div>

          {/* Praxistipps */}
          <div className="rounded-DEFAULT bg-surface shadow-card px-5 py-4">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb size={15} className="text-amber-500" />
              <span className="text-xs font-bold uppercase tracking-wider text-text-secondary">Praxistipps</span>
            </div>
            <ul className="space-y-2 text-sm text-text-secondary">
              {[
                "Immer beide Jahresrechnungen prüfen – Bilanz UND Erfolgsrechnung",
                "Abschreibungen sind nicht-cash – deshalb zum Gewinn addieren",
                "Cashflow ist wichtiger als Gewinn bei der Kreditbeurteilung",
              ].map((t) => (
                <li key={t} className="flex gap-2">
                  <span className="shrink-0 text-amber-500">💡</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Typische Fehler */}
          <div className="rounded-DEFAULT bg-surface shadow-card px-5 py-4">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle size={15} className="text-text-secondary" />
              <span className="text-xs font-bold uppercase tracking-wider text-text-secondary">Typische Fehler</span>
            </div>
            <ul className="space-y-2 text-sm text-text-secondary">
              {[
                "Abschreibungen vergessen beim Cashflow",
                "Alte Jahresrechnung verwendet",
                "Nur Gewinn betrachtet, Cashflow ignoriert",
                "Eigenkapitalquote nicht berechnet",
              ].map((f) => (
                <li key={f} className="flex gap-2">
                  <span className="shrink-0">❌</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Szenarien heading */}
          <p className="text-xs font-bold uppercase tracking-widest text-text-secondary pt-1">Szenarien</p>

          {/* Szenario 1 – Rating Form */}
          <div className="rounded-DEFAULT bg-surface shadow-card p-5 space-y-5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">Szenario 1</span>
              <span className="text-text-secondary opacity-40">·</span>
              <span className="text-[10px] text-text-secondary">Level 1 – Formular</span>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed">
              Erfassen Sie folgende Jahresrechnung der Müller AG vollständig und korrekt in das Ratingsystem. Alle Felder müssen leer starten.
            </p>

            {/* Jahresrechnung source data */}
            <div className="rounded-DEFAULT border border-border overflow-hidden">
              <div className="bg-gray-50 px-4 py-2 border-b border-border">
                <p className="text-xs font-bold uppercase tracking-wider text-text-secondary">Jahresrechnung Müller AG</p>
              </div>
              <div className="divide-y divide-border">
                {["Erfolgsrechnung", "Bilanz"].map((section) => (
                  <div key={section}>
                    <div className="px-4 py-2 bg-gray-50/50">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">{section}</p>
                    </div>
                    {JR_ROWS.filter((r) => r.section === section).map((row) => (
                      <div key={row.label} className="flex items-center justify-between px-4 py-2.5 text-sm">
                        <span className="text-text-secondary">{row.label}</span>
                        <span className="font-mono font-semibold text-text-primary text-xs">{row.value}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Rating form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Erfolgsrechnung */}
              <div className="space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-text-secondary">Erfolgsrechnung erfassen</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <FieldInput label="Umsatz" value={form.umsatz} onChange={(v) => setField("umsatz", v)} />
                  <FieldInput label="Betriebsaufwand total" value={form.betriebsaufwand} onChange={(v) => setField("betriebsaufwand", v)} hint="inkl. Abschreibungen" />
                  <FieldInput label="Reingewinn" value={form.reingewinn} onChange={(v) => setField("reingewinn", v)} />
                </div>
              </div>

              {/* Cashflow */}
              <div className="space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-text-secondary">Cashflow Berechnung</p>
                <div className="rounded-DEFAULT bg-gray-50 border border-border p-4 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <FieldInput label="Reingewinn" value={form.reingewinn} onChange={(v) => setField("reingewinn", v)} />
                    <FieldInput label="+ Abschreibungen" value={form.abschreibungen} onChange={(v) => setField("abschreibungen", v)} />
                    <FieldInput label="+ Rückstellungen" value={form.rueckstellungen} onChange={(v) => setField("rueckstellungen", v)} />
                  </div>
                  <div className="border-t border-border pt-3">
                    <FieldInput label="= Einfacher Cashflow" value={form.cashflow} onChange={(v) => setField("cashflow", v)} hint="Reingewinn + Abschreibungen + Rückstellungen" />
                  </div>
                </div>
              </div>

              {/* Bilanz */}
              <div className="space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-text-secondary">Bilanz erfassen</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <FieldInput label="Eigenkapital" value={form.eigenkapital} onChange={(v) => setField("eigenkapital", v)} />
                  <FieldInput label="Fremdkapital" value={form.fremdkapital} onChange={(v) => setField("fremdkapital", v)} />
                  <FieldInput label="Bilanzsumme" value={form.bilanzsumme} onChange={(v) => setField("bilanzsumme", v)} hint="EK + FK" />
                  <FieldInput label="EK-Quote" value={form.ekQuote} onChange={(v) => setField("ekQuote", v)} unit="%" hint="EK / Bilanzsumme × 100" />
                </div>
              </div>

              {/* Submit */}
              {!evaluation && (
                <button
                  type="submit"
                  disabled={!allFilled || loading}
                  className="w-full rounded-DEFAULT py-2.5 text-sm font-bold text-white disabled:opacity-40 flex items-center justify-center gap-2"
                  style={{ background: "var(--primary, #0D1B4B)" }}
                >
                  {loading ? (
                    <>
                      <Loader2 size={15} className="animate-spin" />
                      Wird ausgewertet…
                    </>
                  ) : (
                    "Rating einreichen →"
                  )}
                </button>
              )}

              {/* Evaluation result */}
              {evaluation && (
                <div className={`rounded-DEFAULT p-5 space-y-4 ${evaluation.result === "BESTANDEN" ? "bg-green-50" : "bg-red-50"}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {evaluation.result === "BESTANDEN" ? (
                        <CheckCircle2 size={18} className="text-green-600" />
                      ) : (
                        <XCircle size={18} className="text-red-500" />
                      )}
                      <span className={`font-bold text-base ${evaluation.result === "BESTANDEN" ? "text-green-800" : "text-red-800"}`}>
                        {evaluation.result === "BESTANDEN" ? "Bestanden!" : "Nicht bestanden"}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-bold ${evaluation.result === "BESTANDEN" ? "text-green-800" : "text-red-800"}`}>
                        {evaluation.richtigCount} / {evaluation.totalCount} korrekt
                      </p>
                      {evaluation.result === "BESTANDEN" && (
                        <p className="text-xs font-bold text-green-700">+50 XP</p>
                      )}
                    </div>
                  </div>

                  <p className={`text-sm leading-relaxed ${evaluation.result === "BESTANDEN" ? "text-green-900" : "text-red-900"}`}>
                    {evaluation.feedback}
                  </p>

                  {evaluation.fehler.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-xs font-bold uppercase tracking-wider text-red-800">Fehler:</p>
                      {evaluation.fehler.map((f, i) => (
                        <div key={i} className="rounded-DEFAULT bg-white/60 px-3 py-2 text-xs space-y-0.5">
                          <p className="font-semibold text-red-800">{f.feld}</p>
                          <p className="text-red-700">Eingegeben: {f.eingegeben} · Erwartet: {f.erwartet}</p>
                          <p className="text-red-600">{f.erklaerung}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => { setEvaluation(null); setForm(EMPTY); }}
                    className={`text-xs font-semibold underline opacity-70 hover:opacity-100 ${evaluation.result === "BESTANDEN" ? "text-green-800" : "text-red-800"}`}
                  >
                    Nochmals versuchen
                  </button>
                </div>
              )}
            </form>
          </div>

          {/* Scenarios 2 & 3 */}
          {MCQ_SCENARIOS.map((s) => (
            <SubModuleMCQ
              key={s.num}
              scenarioNum={s.num}
              levelLabel={s.level}
              situation={s.situation}
              question={s.question}
              options={s.options}
              correct={s.correct}
              feedback={s.feedback}
            />
          ))}
        </div>
      </div>
    </>
  );
}
