"use client";

import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, AlertTriangle, Lightbulb, BookOpen } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { SubModuleMCQ } from "@/components/modules/credit-operations/SubModuleMCQ";
import { addXP } from "@/lib/xpData";

const SCENARIOS = [
  {
    num: 1,
    level: "Level 1 – Einsteiger",
    situation: "Kunde kauft USD-Obligationen. Bisher hat er nur CHF-Anlagen.",
    question: "Was ist das zusätzliche Risiko gegenüber CHF-Obligationen?",
    options: [
      { key: "A", text: "Höheres Zinsrisiko – USD Zinsen schwanken mehr" },
      { key: "B", text: "Währungsrisiko – USD kann gegenüber CHF fallen" },
      { key: "C", text: "Höheres Emittentenrisiko – ausländische Schuldner" },
      { key: "D", text: "Kein zusätzliches Risiko – gleiche Anlage in anderer Währung" },
    ],
    correct: "B",
    feedback:
      "Bei USD-Anlagen trägt der Schweizer Investor zusätzlich das Währungsrisiko. Fällt der USD gegenüber CHF, sinkt die CHF-Rendite – auch wenn die Anlage selbst gut läuft. Rendite in USD ≠ Rendite in CHF.",
  },
  {
    num: 2,
    level: "Level 2 – Fortgeschritten",
    situation: `Kunde investiert CHF 50'000 in USD Aktien.
Aktie +15% in USD.
USD/CHF fällt von 0.92 auf 0.83.

Rechnung:
CHF 50'000 ÷ 0.92 = USD 54'348
Nach +15%: USD 62'500
Zurück in CHF: 62'500 × 0.83 = CHF 51'875
Rendite in CHF: +3.75% statt +15%`,
    question: "Was ist die CHF-Rendite des Kunden?",
    options: [
      { key: "A", text: "+15% – genauso wie in USD" },
      { key: "B", text: "+3.75% – nach Abzug des Währungseffekts" },
      { key: "C", text: "-15% – wegen USD Schwäche" },
      { key: "D", text: "0% – Aktiengewinn und Währungsverlust gleichen sich aus" },
    ],
    correct: "B",
    feedback:
      "Währungseffekt frisst Rendite. 15% Aktiengewinn in USD wird durch USD-Schwäche auf +3.75% in CHF reduziert. Immer in CHF rechnen – nicht in Fremdwährung.",
  },
  {
    num: 3,
    level: "Level 3 – Experte",
    situation:
      "Kunde fragt: «Soll ich den hedged oder unhedged Emerging Markets Fonds kaufen?» Sein Anlagehorizont: 15 Jahre.",
    question: "Was empfiehlst du?",
    options: [
      { key: "A", text: "Immer hedged – sicherer und professioneller" },
      {
        key: "B",
        text: "Unhedged bei langem Horizont – Hedging-Kosten bei EM sind hoch und langfristig gleichen sich Währungen oft aus",
      },
      { key: "C", text: "Hedged – Emerging Markets sind sowieso zu riskant" },
      { key: "D", text: "Beides je hälftig kaufen" },
    ],
    correct: "B",
    feedback:
      "Hedging bei Emerging Markets kostet 2-3% pro Jahr. Bei 15 Jahren Horizont ist das ein enormer Renditeverlust. Langfristig gleichen sich Währungen tendenziell aus. Hedging lohnt sich vor allem kurzfristig.",
  },
];

export default function WaehrungsrisikenPage() {
  const [lernOpen, setLernOpen] = useState(true);
  const [correctCount, setCorrectCount] = useState(0);
  const [bonusAwarded, setBonusAwarded] = useState(false);
  useEffect(() => {
    if (correctCount === SCENARIOS.length && !bonusAwarded) {
      addXP(50);
      setBonusAwarded(true);
    }
  }, [correctCount, bonusAwarded]);

  return (
    <>
      <Header title="Währungsrisiken" subtitle="Anlagekunde · Front Office" />
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Anlagekunde", href: "/anlagekunde" },
          { label: "Währungsrisiken" },
        ]}
      />
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-3xl space-y-5">

          <div className="rounded-DEFAULT bg-surface shadow-card overflow-hidden">
            <button onClick={() => setLernOpen((v) => !v)} className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-2">
                <BookOpen size={16} className="text-primary" />
                <span className="text-sm font-bold text-text-primary">Lernblock – Währungsrisiken</span>
              </div>
              {lernOpen ? <ChevronUp size={15} className="text-text-secondary" /> : <ChevronDown size={15} className="text-text-secondary" />}
            </button>
            {lernOpen && (
              <div className="border-t border-border px-5 pb-5 pt-4 space-y-4 text-sm text-text-secondary leading-relaxed">
                <p>Wer in Fremdwährungen anlegt, trägt zusätzlich zum Marktrisiko auch das Währungsrisiko.</p>
                <div className="rounded-DEFAULT bg-gray-50 border border-border px-4 py-3 font-mono text-xs space-y-1">
                  <p className="font-bold text-text-primary not-italic text-[11px] uppercase tracking-wider mb-2">Beispiel</p>
                  <p>{"CHF 10'000"} → USD Aktien bei Kurs 0.90</p>
                  <p>Aktie +10% in USD</p>
                  <p>Aber USD fällt -15% → CHF Verlust trotz USD-Gewinn</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-DEFAULT border border-border p-4 space-y-2">
                    <p className="font-bold text-text-primary text-xs uppercase tracking-wider">Hedged Fonds</p>
                    <ul className="space-y-1">
                      {["Währungsrisiko abgesichert", "Kostet Rendite (Hedging-Prämie)", "Sinnvoll bei kurzem Horizont"].map((i) => (
                        <li key={i} className="flex gap-2"><span className="shrink-0 text-primary">→</span><span>{i}</span></li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-DEFAULT border border-border p-4 space-y-2">
                    <p className="font-bold text-text-primary text-xs uppercase tracking-wider">Unhedged Fonds</p>
                    <ul className="space-y-1">
                      {["Volles Währungsrisiko", "Höhere Rendite möglich", "Sinnvoll bei langem Horizont"].map((i) => (
                        <li key={i} className="flex gap-2"><span className="shrink-0 text-primary">→</span><span>{i}</span></li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="rounded-DEFAULT bg-primary/5 border border-primary/15 px-4 py-3">
                  <p className="font-semibold text-text-primary text-xs uppercase tracking-wider mb-1">Merksatz</p>
                  <p>Rendite in USD ≠ Rendite in CHF. Immer in Heimwährung rechnen.</p>
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
                "Währungsrisiko immer erklären bei Fremdwährungsanlagen",
                "Hedged vs. Unhedged im Fondsprospekt prüfen",
                "Kurzfristige Anlagen in Fremdwährungen = hohes Währungsrisiko",
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
              {["Währungsrisiko nicht erwähnt", "Hedging-Kosten ignoriert", "Rendite ohne Währungseffekt erklärt", "CHF Stärke unterschätzt"].map((f) => (
                <li key={f} className="flex gap-2"><span className="shrink-0">❌</span><span>{f}</span></li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-widest text-text-secondary pt-1">Szenarien</p>
            <div className="flex items-center gap-1.5 pt-1">
              {SCENARIOS.map((_, i) => (
                <div key={i} className={`w-2 h-2 rounded-full transition-colors ${i < correctCount ? "bg-green-500" : "bg-gray-200"}`} />
              ))}
              <span className="text-xs text-text-secondary ml-1">{correctCount} / {SCENARIOS.length}</span>
            </div>
          </div>
          {SCENARIOS.map((s) => (
            <SubModuleMCQ key={s.num} scenarioNum={s.num} levelLabel={s.level} situation={s.situation} question={s.question} options={s.options} correct={s.correct} feedback={s.feedback} onCorrect={() => setCorrectCount(c => Math.min(c + 1, SCENARIOS.length))} />
          ))}
          {correctCount === SCENARIOS.length && (
            <div className="rounded-DEFAULT bg-green-50 border border-green-200 p-5 flex items-start gap-3">
              <span className="text-xl shrink-0">🏆</span>
              <div>
                <p className="font-bold text-green-800 text-sm">Modul abgeschlossen!</p>
                <p className="text-sm text-green-700 mt-0.5">Du hast alle {SCENARIOS.length} Szenarien korrekt beantwortet.</p>
                <p className="text-xs font-bold text-green-600 mt-2">+50 XP Bonus erhalten</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
