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
    situation: "Kunde, 28 Jahre alt, fragt: «Soll ich ein 3a Konto oder 3a Fonds eröffnen?» Sein Horizont bis zur Pension: 37 Jahre.",
    question: "Was empfiehlst du?",
    options: [
      { key: "A", text: "3a Konto – sicherer und kein Risiko" },
      { key: "B", text: "3a Fonds – langer Horizont erlaubt es, Kursschwankungen auszusitzen" },
      { key: "C", text: "Beides gleichzeitig – Diversifikation" },
      { key: "D", text: "Keines – mit 28 ist es zu früh für Vorsorge" },
    ],
    correct: "B",
    feedback:
      "37 Jahre Horizont = genug Zeit, Kursschwankungen auszusitzen. 3a Fonds hat langfristig deutlich höhere Rendite als 3a Konto. Jung + langer Horizont = 3a Fonds.",
  },
  {
    num: 2,
    level: "Level 2 – Fortgeschritten",
    situation: "Kundin, 58 Jahre alt, Pension in 7 Jahren. Sie hat einen 3a Fonds mit CHF 180'000 und fragt, ob sie wechseln soll.",
    question: "Was empfiehlst du?",
    options: [
      { key: "A", text: "In 3a Konto wechseln – Horizont zu kurz für Marktrisiken" },
      { key: "B", text: "3a Fonds behalten – noch 7 Jahre reichen gut aus" },
      { key: "C", text: "Alles sofort auszahlen und selbst anlegen" },
      { key: "D", text: "Nichts ändern – Markt erholt sich immer" },
    ],
    correct: "A",
    feedback:
      "7 Jahre Horizont = kurz. Bei einem Marktrückgang kurz vor der Pension gibt es keine Zeit zur Erholung. Schrittweiser Wechsel in 3a Konto ist sinnvoll. Nahe Pension = Risiko reduzieren.",
  },
  {
    num: 3,
    level: "Level 3 – Experte",
    situation: "Kunde fragt: «Kann ich mein 3a Guthaben vorzeitig beziehen, um ein Auto zu kaufen?»",
    question: "Was ist die richtige Antwort?",
    options: [
      { key: "A", text: "Ja – jederzeit möglich, das ist eigenes Geld" },
      {
        key: "B",
        text: "Nein – vorzeitiger Bezug nur bei Eigenheim, Selbständigkeit, Auswanderung oder Invalidität",
      },
      { key: "C", text: "Ja – aber mit einer Steuerstrafe von 30%" },
      { key: "D", text: "Nur die Hälfte kann vorzeitig bezogen werden" },
    ],
    correct: "B",
    feedback:
      "3a ist gebundene Vorsorge. Auto kaufen ist kein gültiger Bezugsgrund. Gültige Gründe: Eigenheim kaufen, Selbständigkeit, Auswanderung, Invalidität. 3a ist gebunden – nicht für Konsum.",
  },
];

export default function VorsorgeAnlagePage() {
  const [lernOpen, setLernOpen] = useState(true);

  return (
    <>
      <Header title="Vorsorge & 3a im Anlagekontext" subtitle="Anlagekunde · Front Office" />
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Anlagekunde", href: "/anlagekunde" },
          { label: "Vorsorge & 3a" },
        ]}
      />
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-3xl space-y-5">

          <div className="rounded-DEFAULT bg-surface shadow-card overflow-hidden">
            <button onClick={() => setLernOpen((v) => !v)} className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-2">
                <BookOpen size={16} className="text-primary" />
                <span className="text-sm font-bold text-text-primary">Lernblock – Vorsorge & 3a</span>
              </div>
              {lernOpen ? <ChevronUp size={15} className="text-text-secondary" /> : <ChevronDown size={15} className="text-text-secondary" />}
            </button>
            {lernOpen && (
              <div className="border-t border-border px-5 pb-5 pt-4 space-y-4 text-sm text-text-secondary leading-relaxed">
                <p>3a Geld muss nicht auf dem Konto liegen – es kann auch in Anlagefonds investiert werden.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-DEFAULT border border-border p-4 space-y-2">
                    <p className="font-bold text-text-primary text-xs uppercase tracking-wider">Säule 3a Konto</p>
                    <ul className="space-y-1">
                      {["Fixer Zins (tief)", "Kapital gesichert", "Für risikoscheue Anleger"].map((i) => (
                        <li key={i} className="flex gap-2"><span className="shrink-0 text-primary">→</span><span>{i}</span></li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-DEFAULT border border-border p-4 space-y-2">
                    <p className="font-bold text-text-primary text-xs uppercase tracking-wider">Säule 3a Fonds</p>
                    <ul className="space-y-1">
                      {["In Anlagefonds investiert", "Höhere Renditechance", "Kursschwankungen möglich", "Min. 10 Jahre Horizont sinnvoll"].map((i) => (
                        <li key={i} className="flex gap-2"><span className="shrink-0 text-primary">→</span><span>{i}</span></li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="rounded-DEFAULT bg-gray-50 border border-border px-4 py-3 space-y-1 text-xs">
                  <p className="font-bold text-text-primary uppercase tracking-wider text-[10px]">Maximum 2026</p>
                  <p>Angestellte: <span className="font-mono font-semibold text-text-primary">{"CHF 7'258 / Jahr"}</span></p>
                  <p>Selbständige: <span className="font-mono font-semibold text-text-primary">{"CHF 36'288 / Jahr"}</span></p>
                </div>
                <div className="rounded-DEFAULT bg-primary/5 border border-primary/15 px-4 py-3">
                  <p className="font-semibold text-text-primary text-xs uppercase tracking-wider mb-1">Merksatz</p>
                  <p>3a Fonds = mehr Rendite, mehr Risiko. Nur bei langem Horizont.</p>
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
                "3a Fonds erst ab 10+ Jahre Horizont empfehlen",
                "Maximalbetrag jedes Jahr ausschöpfen = maximale Steuerersparnis",
                "Vorzeitiger Bezug nur bei: Eigenheim, Selbständigkeit, Auswanderung, Invalidität",
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
              {["3a Fonds bei kurzem Horizont empfehlen", "Maximalbetrag nicht erwähnt", "Vorzeitigen Bezug falsch erklärt", "Steuerersparnis nicht thematisiert"].map((f) => (
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
