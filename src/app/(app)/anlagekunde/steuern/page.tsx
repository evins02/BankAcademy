"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, AlertTriangle, Lightbulb, BookOpen } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { SubModuleMCQ } from "@/components/modules/credit-operations/SubModuleMCQ";

const SCENARIOS = [
  {
    num: 1,
    level: "Level 1 – Einsteiger",
    situation: "Kunde erhält CHF 1'000 Dividende von Nestlé. Auf seinem Konto kommen nur CHF 650 an. Er fragt warum.",
    question: "Was ist die Erklärung?",
    options: [
      { key: "A", text: "Bankgebühren von 35%" },
      { key: "B", text: "Verrechnungssteuer 35%: CHF 1'000 × 35% = CHF 350 abgezogen" },
      { key: "C", text: "Depotgebühren für die Verwahrung" },
      { key: "D", text: "Stempelabgabe auf Dividendenzahlungen" },
    ],
    correct: "B",
    feedback:
      "Verrechnungssteuer 35% wird bei Schweizer Dividenden und Zinsen automatisch abgezogen. CHF 350 kann der Kunde via Steuererklärung zurückfordern – wenn er die Erträge korrekt deklariert.",
  },
  {
    num: 2,
    level: "Level 2 – Fortgeschritten",
    situation: "Kunde verkauft Aktien mit CHF 15'000 Gewinn. Er fragt, ob er das in der Steuererklärung angeben muss.",
    question: "Was ist die korrekte Antwort?",
    options: [
      { key: "A", text: "Ja – Kapitalgewinne sind steuerpflichtig wie Arbeitseinkommen" },
      {
        key: "B",
        text: "Nein – Kapitalgewinne auf Privatvermögen sind in der Schweiz für Privatpersonen steuerfrei",
      },
      { key: "C", text: "Nur die Hälfte des Gewinns muss versteuert werden" },
      { key: "D", text: "Kommt auf den Betrag an – unter CHF 10'000 steuerfrei" },
    ],
    correct: "B",
    feedback:
      "Kapitalgewinne auf Privatvermögen sind in der Schweiz steuerfrei – ein grosser Vorteil des Schweizer Steuersystems. Nur Dividenden und Zinsen sind steuerpflichtig. Ausnahme: professionelle Wertschriftenhändler (selten).",
  },
  {
    num: 3,
    level: "Level 3 – Experte",
    situation: "Kunde kauft Nestlé Aktien für CHF 50'000 an der Schweizer Börse.",
    question: "Welche Steuern entstehen beim Kauf?",
    options: [
      { key: "A", text: "Keine – Kauf ist steuerneutral" },
      { key: "B", text: "Stempelabgabe 0.075% = CHF 37.50" },
      { key: "C", text: "Verrechnungssteuer 35% = CHF 17'500" },
      { key: "D", text: "Kapitalgewinnsteuer auf den erwarteten Gewinn" },
    ],
    correct: "B",
    feedback:
      "Beim Kauf von Schweizer Wertschriften fällt die Stempelabgabe an: 0.075% × CHF 50'000 = CHF 37.50. Diese wird automatisch von der Bank verrechnet. Verrechnungssteuer kommt erst bei Dividendenzahlung – nicht beim Kauf.",
  },
];

export default function SteuernPage() {
  const [lernOpen, setLernOpen] = useState(true);

  return (
    <>
      <Header title="Steuerliche Aspekte" subtitle="Anlagekunde · Front Office" />
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Anlagekunde", href: "/anlagekunde" },
          { label: "Steuerliche Aspekte" },
        ]}
      />
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-3xl space-y-5">

          <div className="rounded-DEFAULT bg-surface shadow-card overflow-hidden">
            <button onClick={() => setLernOpen((v) => !v)} className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-2">
                <BookOpen size={16} className="text-primary" />
                <span className="text-sm font-bold text-text-primary">Lernblock – Steuerliche Aspekte</span>
              </div>
              {lernOpen ? <ChevronUp size={15} className="text-text-secondary" /> : <ChevronDown size={15} className="text-text-secondary" />}
            </button>
            {lernOpen && (
              <div className="border-t border-border px-5 pb-5 pt-4 space-y-4 text-sm text-text-secondary leading-relaxed">
                <p>Drei wichtige Steuern bei Wertschriftenanlagen in der Schweiz – jede mit anderen Auslösern und Sätzen.</p>
                <div className="space-y-3">
                  {[
                    {
                      title: "Verrechnungssteuer 35%",
                      items: [
                        "Auf Zinsen und Dividenden Schweizer Wertschriften",
                        "Bank zieht automatisch 35% ab",
                        "Rückforderbar via Steuererklärung bei korrekter Deklaration",
                        "Schutzmechanismus gegen Steuerhinterziehung",
                      ],
                    },
                    {
                      title: "Stempelabgabe",
                      items: [
                        "Beim Kauf und Verkauf: CH-Wertschriften 0.075%",
                        "Ausländische Wertschriften: 0.15%",
                        "Wird von Bank automatisch verrechnet",
                      ],
                    },
                    {
                      title: "Kapitalgewinne",
                      items: [
                        "In der Schweiz für Privatpersonen STEUERFREI",
                        "Ausnahme: professioneller Wertschriftenhändler (selten)",
                        "Dividenden und Zinsen = steuerpflichtig",
                      ],
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
                <div className="rounded-DEFAULT bg-primary/5 border border-primary/15 px-4 py-3">
                  <p className="font-semibold text-text-primary text-xs uppercase tracking-wider mb-1">Merksatz</p>
                  <p>Kapitalgewinne steuerfrei · Zinsen/Dividenden steuerpflichtig · Kauf = Stempelabgabe</p>
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
                "Verrechnungssteuer immer erklären wenn Kunde Dividenden erhält",
                "Kunde muss Wertschriften in der Steuererklärung deklarieren",
                "Kapitalgewinne steuerfrei = grosser Vorteil des Schweizer Steuersystems",
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
              {["Verrechnungssteuer nicht erklärt", "Kapitalgewinne als steuerpflichtig bezeichnet", "Rückforderungsmöglichkeit nicht erwähnt", "Stempelabgabe vergessen"].map((f) => (
                <li key={f} className="flex gap-2"><span className="shrink-0">❌</span><span>{f}</span></li>
              ))}
            </ul>
          </div>

          <p className="text-xs font-bold uppercase tracking-widest text-text-secondary pt-1">Szenarien</p>
          {SCENARIOS.map((s) => (
            <SubModuleMCQ key={s.num} scenarioNum={s.num} levelLabel={s.level} situation={s.situation} question={s.question} options={s.options} correct={s.correct} feedback={s.feedback} />
          ))}
        </div>
      </div>
    </>
  );
}
