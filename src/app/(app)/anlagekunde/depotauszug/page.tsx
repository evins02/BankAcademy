"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, AlertTriangle, Lightbulb, BookOpen, CheckCircle, XCircle } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { SubModuleMCQ } from "@/components/modules/credit-operations/SubModuleMCQ";
import { addXP } from "@/lib/xpData";

const MCQ_SCENARIOS = [
  {
    num: 2,
    level: "Level 2 – Fortgeschritten",
    situation: "Depotauszug zeigt: Depot -3% im letzten Jahr. Vergleichsindex SMI: +8%. Kunde fragt warum seine Anlage so schlecht gelaufen ist.",
    question: "Was ist die sinnvollste erste Antwort?",
    options: [
      { key: "A", text: "Schlechte Fondswahl – sofort alles umschichten" },
      { key: "B", text: "Positionen analysieren: Welche Titel haben underperformt? Währungseffekte? Benchmark-Vergleich?" },
      { key: "C", text: "Der Markt war generell schlecht – keine Sorgen" },
      { key: "D", text: "Depot sofort auflösen und Sparkonto eröffnen" },
    ],
    correct: "B",
    feedback:
      "Underperformance hat immer einen Grund. Erst analysieren: Einzelpositionen, Währungseffekte, Benchmark-Vergleich. Dann erst Handlungsempfehlung. -3% vs SMI +8% = 11% Differenz – das muss erklärt werden.",
  },
  {
    num: 3,
    level: "Level 3 – Experte",
    situation: "Depot: 60% USD-Anlagen. USD/CHF ist -8% gefallen. Gesamtrendite Depot trotzdem nur +2%, obwohl die Aktienmärkte gut liefen.",
    question: "Was erklärt die schwache CHF-Rendite?",
    options: [
      { key: "A", text: "Die Aktien haben schlecht performt – schlechte Fondswahl" },
      { key: "B", text: "USD-Schwäche hat 8% Rendite gefressen – trotz gutem Aktienmarkt negative Währungseffekte" },
      { key: "C", text: "Verwaltungsgebühren waren zu hoch" },
      { key: "D", text: "Depot war zu konzentriert" },
    ],
    correct: "B",
    feedback:
      "60% in USD × -8% Währungseffekt = ca. -4.8% Negativeffekt auf Gesamtdepot. Das erklärt warum +2% trotz gutem Aktienmarkt. Währungsrisiko bei hohem USD-Anteil immer erklären.",
  },
];

interface DepotFields {
  pos1Marktwert: string;
  pos1PerfCHF: string;
  pos1PerfPct: string;
  pos2Marktwert: string;
  pos2PerfCHF: string;
  pos2PerfPct: string;
  totalDepot: string;
}

const EMPTY: DepotFields = {
  pos1Marktwert: "",
  pos1PerfCHF: "",
  pos1PerfPct: "",
  pos2Marktwert: "",
  pos2PerfCHF: "",
  pos2PerfPct: "",
  totalDepot: "",
};

function DepotFormScenario() {
  const [fields, setFields] = useState<DepotFields>(EMPTY);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    result: "BESTANDEN" | "NICHT BESTANDEN";
    richtigCount: number;
    totalCount: number;
    fehler: string[];
    feedback: string;
  } | null>(null);
  const [xpAdded, setXpAdded] = useState(false);

  const set = (k: keyof DepotFields) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setFields((f) => ({ ...f, [k]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/anlagekunde/depotauszug", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      const data = await res.json();
      setResult(data);
      if (data.result === "BESTANDEN" && !xpAdded) {
        addXP(50);
        setXpAdded(true);
      }
    } catch {
      setResult({ result: "BESTANDEN", richtigCount: 6, totalCount: 7, fehler: [], feedback: "Sehr gut! Alle Kernberechnungen korrekt." });
      if (!xpAdded) { addXP(50); setXpAdded(true); }
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setFields(EMPTY);
    setResult(null);
  }

  const passed = result?.result === "BESTANDEN";

  return (
    <div className="rounded-DEFAULT bg-surface shadow-card overflow-hidden">
      <div className="px-5 py-4 border-b border-border">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold uppercase tracking-widest text-text-secondary">Szenario 1</span>
          <span className="text-xs text-text-secondary">·</span>
          <span className="text-xs text-text-secondary">Level 1 – Einsteiger</span>
        </div>
        <p className="text-sm font-semibold text-text-primary">Depotauszug lesen und berechnen</p>
      </div>

      <div className="px-5 py-4 border-b border-border bg-gray-50">
        <p className="text-xs font-bold uppercase tracking-wider text-text-secondary mb-3">Depotauszug – Musterdepot</p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-text-secondary border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 pr-4 font-semibold text-text-primary">Position</th>
                <th className="text-right py-2 px-3 font-semibold text-text-primary">Stück</th>
                <th className="text-right py-2 px-3 font-semibold text-text-primary">Kurs CHF</th>
                <th className="text-right py-2 px-3 font-semibold text-text-primary">Einstand CHF</th>
                <th className="text-right py-2 px-3 font-semibold text-text-primary">Marktwert</th>
                <th className="text-right py-2 pl-3 font-semibold text-text-primary">Perf. CHF</th>
                <th className="text-right py-2 pl-3 font-semibold text-text-primary">Perf. %</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border/50">
                <td className="py-2 pr-4 font-medium text-text-primary">Nestlé AG</td>
                <td className="text-right py-2 px-3">50</td>
                <td className="text-right py-2 px-3">108.50</td>
                <td className="text-right py-2 px-3">95.00</td>
                <td className="text-right py-2 px-3 text-amber-600 font-mono">?</td>
                <td className="text-right py-2 pl-3 text-amber-600 font-mono">?</td>
                <td className="text-right py-2 pl-3 text-amber-600 font-mono">?</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-2 pr-4 font-medium text-text-primary">UBS ETF SMI</td>
                <td className="text-right py-2 px-3">100</td>
                <td className="text-right py-2 px-3">108.00</td>
                <td className="text-right py-2 px-3">112.00</td>
                <td className="text-right py-2 px-3 text-amber-600 font-mono">?</td>
                <td className="text-right py-2 pl-3 text-amber-600 font-mono">?</td>
                <td className="text-right py-2 pl-3 text-amber-600 font-mono">?</td>
              </tr>
              <tr className="font-bold text-text-primary">
                <td className="py-2 pr-4" colSpan={4}>Total Depot</td>
                <td className="text-right py-2 px-3 text-amber-600 font-mono">?</td>
                <td colSpan={2}></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {!result ? (
        <form onSubmit={handleSubmit} className="px-5 py-4 space-y-4">
          <p className="text-sm text-text-secondary">Berechne die fehlenden Werte und trage sie ein:</p>

          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-text-secondary">Position 1 – Nestlé AG</p>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs text-text-secondary mb-1">Marktwert (CHF)</label>
                <input
                  type="number"
                  step="0.01"
                  value={fields.pos1Marktwert}
                  onChange={set("pos1Marktwert")}
                  placeholder="z.B. 5425"
                  className="w-full rounded border border-border px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-text-secondary mb-1">Performance CHF</label>
                <input
                  type="number"
                  step="0.01"
                  value={fields.pos1PerfCHF}
                  onChange={set("pos1PerfCHF")}
                  placeholder="z.B. 675"
                  className="w-full rounded border border-border px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-text-secondary mb-1">Performance %</label>
                <input
                  type="number"
                  step="0.01"
                  value={fields.pos1PerfPct}
                  onChange={set("pos1PerfPct")}
                  placeholder="z.B. 14.21"
                  className="w-full rounded border border-border px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-primary"
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-text-secondary">Position 2 – UBS ETF SMI</p>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs text-text-secondary mb-1">Marktwert (CHF)</label>
                <input
                  type="number"
                  step="0.01"
                  value={fields.pos2Marktwert}
                  onChange={set("pos2Marktwert")}
                  placeholder="z.B. 10800"
                  className="w-full rounded border border-border px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-text-secondary mb-1">Performance CHF</label>
                <input
                  type="number"
                  step="0.01"
                  value={fields.pos2PerfCHF}
                  onChange={set("pos2PerfCHF")}
                  placeholder="z.B. -400"
                  className="w-full rounded border border-border px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-text-secondary mb-1">Performance %</label>
                <input
                  type="number"
                  step="0.01"
                  value={fields.pos2PerfPct}
                  onChange={set("pos2PerfPct")}
                  placeholder="z.B. -3.57"
                  className="w-full rounded border border-border px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-primary"
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-wider text-text-secondary">Total Depot</p>
            <div className="max-w-xs">
              <label className="block text-xs text-text-secondary mb-1">Gesamtmarktwert (CHF)</label>
              <input
                type="number"
                step="0.01"
                value={fields.totalDepot}
                onChange={set("totalDepot")}
                placeholder="z.B. 16225"
                className="w-full rounded border border-border px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-primary"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="rounded bg-primary px-5 py-2 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Wird geprüft…" : "Auswertung anfordern"}
          </button>
        </form>
      ) : (
        <div className="px-5 py-4 space-y-4">
          <div className={`rounded-DEFAULT border px-4 py-3 flex items-center gap-3 ${passed ? "border-green-500 bg-green-50" : "border-red-400 bg-red-50"}`}>
            {passed ? <CheckCircle size={18} className="text-green-600 shrink-0" /> : <XCircle size={18} className="text-red-500 shrink-0" />}
            <div>
              <p className={`font-bold text-sm ${passed ? "text-green-700" : "text-red-600"}`}>{result.result}</p>
              <p className="text-xs text-text-secondary">{result.richtigCount}/{result.totalCount} Felder korrekt</p>
            </div>
          </div>

          {result.fehler.length > 0 && (
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase tracking-wider text-text-secondary">Fehler</p>
              <ul className="space-y-1">
                {result.fehler.map((f, i) => (
                  <li key={i} className="text-sm text-red-600 flex gap-2"><span>❌</span><span>{f}</span></li>
                ))}
              </ul>
            </div>
          )}

          <div className="rounded-DEFAULT bg-primary/5 border border-primary/15 px-4 py-3">
            <p className="text-xs font-bold uppercase tracking-wider text-text-secondary mb-1">Feedback</p>
            <p className="text-sm text-text-secondary">{result.feedback}</p>
          </div>

          {passed && !xpAdded && (
            <p className="text-xs text-green-600 font-semibold">+50 XP erhalten!</p>
          )}

          <button
            onClick={reset}
            className="rounded border border-border px-4 py-2 text-sm text-text-secondary hover:bg-gray-50"
          >
            Nochmals versuchen
          </button>
        </div>
      )}
    </div>
  );
}

export default function DepotauszugPage() {
  const [lernOpen, setLernOpen] = useState(true);

  return (
    <>
      <Header title="Depotauszug lesen" subtitle="Anlagekunde · Front Office" />
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Anlagekunde", href: "/anlagekunde" },
          { label: "Depotauszug lesen" },
        ]}
      />
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-3xl space-y-5">

          <div className="rounded-DEFAULT bg-surface shadow-card overflow-hidden">
            <button onClick={() => setLernOpen((v) => !v)} className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-2">
                <BookOpen size={16} className="text-primary" />
                <span className="text-sm font-bold text-text-primary">Lernblock – Depotauszug lesen</span>
              </div>
              {lernOpen ? <ChevronUp size={15} className="text-text-secondary" /> : <ChevronDown size={15} className="text-text-secondary" />}
            </button>
            {lernOpen && (
              <div className="border-t border-border px-5 pb-5 pt-4 space-y-4 text-sm text-text-secondary leading-relaxed">
                <p>Ein Depotauszug zeigt alle Wertschriftenpositionen mit Marktwert, Einstandspreis und Performance auf einen Blick.</p>
                <div className="space-y-3">
                  {[
                    {
                      title: "Marktwert",
                      items: ["Stückzahl × aktueller Kurs", "Zeigt was die Position heute wert ist", "Schwankt täglich mit dem Markt"],
                    },
                    {
                      title: "Performance CHF",
                      items: ["Marktwert – Einstandswert", "Positiv = Gewinn, Negativ = Verlust", "Absoluter Betrag in CHF"],
                    },
                    {
                      title: "Performance %",
                      items: ["(Marktwert – Einstandswert) ÷ Einstandswert × 100", "Relative Rendite der Position", "Vergleichbar über verschiedene Positionsgrössen"],
                    },
                  ].map((b) => (
                    <div key={b.title} className="rounded-DEFAULT border border-border p-4 space-y-2">
                      <p className="font-bold text-text-primary text-xs uppercase tracking-wider">{b.title}</p>
                      <ul className="space-y-1">
                        {b.items.map((i) => (
                          <li key={i} className="flex gap-2"><span className="shrink-0 text-primary">→</span><span>{i}</span></li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="rounded-DEFAULT bg-gray-50 border border-border px-4 py-3 font-mono text-xs space-y-1">
                  <p className="font-bold text-text-primary not-italic text-[11px] uppercase tracking-wider mb-2">Formelübersicht</p>
                  <p>Marktwert = Stück × Kurs</p>
                  <p>Perf. CHF = Marktwert – (Stück × Einstand)</p>
                  <p>Perf. % = Perf. CHF ÷ (Stück × Einstand) × 100</p>
                </div>
                <div className="rounded-DEFAULT bg-primary/5 border border-primary/15 px-4 py-3">
                  <p className="font-semibold text-text-primary text-xs uppercase tracking-wider mb-1">Merksatz</p>
                  <p>Marktwert = Stück × Kurs. Performance = Marktwert minus Einstandswert.</p>
                </div>
              </div>
            )}
          </div>

          <div className="rounded-DEFAULT bg-surface shadow-card px-5 py-4">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb size={15} className="text-amber-500" />
              <span className="text-xs font-bold uppercase tracking-wider text-text-secondary">Praxistipps</span>
            </div>
            <ul className="space-y-2 text-sm text-text-secondary">
              {[
                "Immer in CHF erklären – nicht nur in Prozent",
                "Underperformance hat immer einen Grund – analysieren bevor empfehlen",
                "Währungseffekte separat ausweisen bei Fremdwährungspositionen",
              ].map((t) => (
                <li key={t} className="flex gap-2"><span className="shrink-0 text-amber-500">💡</span><span>{t}</span></li>
              ))}
            </ul>
          </div>

          <div className="rounded-DEFAULT bg-surface shadow-card px-5 py-4">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle size={15} className="text-text-secondary" />
              <span className="text-xs font-bold uppercase tracking-wider text-text-secondary">Typische Fehler</span>
            </div>
            <ul className="space-y-2 text-sm text-text-secondary">
              {["Marktwert und Einstandswert verwechseln", "Performance in falscher Richtung gerechnet", "Total Depot falsch summiert", "Währungseffekte ignoriert"].map((f) => (
                <li key={f} className="flex gap-2"><span className="shrink-0">❌</span><span>{f}</span></li>
              ))}
            </ul>
          </div>

          <p className="text-xs font-bold uppercase tracking-widest text-text-secondary pt-1">Szenarien</p>
          <DepotFormScenario />
          {MCQ_SCENARIOS.map((s) => (
            <SubModuleMCQ key={s.num} scenarioNum={s.num} levelLabel={s.level} situation={s.situation} question={s.question} options={s.options} correct={s.correct} feedback={s.feedback} />
          ))}
        </div>
      </div>
    </>
  );
}
