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
    situation: "Kunde fragt: «Was bedeutet ESG eigentlich genau?»",
    question: "Was ist die richtige Antwort?",
    options: [
      { key: "A", text: "Ein spezieller Fonds der Schweizer Grossbanken" },
      { key: "B", text: "Environmental, Social, Governance – Kriterien für nachhaltige Anlagen" },
      { key: "C", text: "Eine neue Schweizer Finanzregulierung der FINMA" },
      { key: "D", text: "Ein Ratingsystem der Schweizer Börse für Aktien" },
    ],
    correct: "B",
    feedback:
      "ESG steht für Environmental (Umwelt), Social (Soziales), Governance (Unternehmensführung). Das sind die drei Säulen für nachhaltige Anlagen – kein spezifisches Produkt, sondern ein Bewertungsframework.",
  },
  {
    num: 2,
    level: "Level 2 – Fortgeschritten",
    situation: "Kunde sagt: «Ich will nur in nachhaltige Firmen investieren.» Du willst ihn richtig beraten.",
    question: "Was machst du als erstes?",
    options: [
      { key: "A", text: "Direkt den besten ESG Fonds empfehlen" },
      {
        key: "B",
        text: "ESG Präferenzen genauer abfragen: Was ist ihm wichtiger – Umwelt, Soziales oder Governance?",
      },
      { key: "C", text: "Erklären, dass ESG generell weniger Rendite bringt" },
      { key: "D", text: "Normalen Fonds empfehlen – ESG ist Greenwashing" },
    ],
    correct: "B",
    feedback:
      "ESG ist nicht gleich ESG. Manche Kunden priorisieren Klimaschutz, andere faire Arbeitsbedingungen oder Unternehmenstransparenz. Erst verstehen, was dem Kunden wichtig ist – dann empfehlen. ESG Präferenzen sind individuell.",
  },
  {
    num: 3,
    level: "Level 3 – Experte",
    situation:
      "Ein Fonds wirbt mit «grün und nachhaltig», investiert aber in Ölkonzerne, die CO2-Reduktionsziele haben. Dein Kunde fragt: «Ist das wirklich ESG?»",
    question: "Was ist die korrekte Erklärung?",
    options: [
      { key: "A", text: "Nein – Ölkonzerne sind per Definition nie ESG konform" },
      {
        key: "B",
        text: "Möglicherweise – der Best-in-Class Ansatz bewertet Firmen relativ zu ihrer Branche",
      },
      { key: "C", text: "Ja – Reduktionsziele reichen als ESG Nachweis aus" },
      { key: "D", text: "Nein – nur Unternehmen aus erneuerbaren Energien sind ESG konform" },
    ],
    correct: "B",
    feedback:
      "Best-in-Class = der beste Schüler pro Branche. Auch Ölkonzerne können ESG-Leader ihrer Branche sein. Wichtig: die Methodik des Fonds verstehen – nicht alle ESG Fonds sind gleich. ESG hat verschiedene Ansätze, Methodik prüfen.",
  },
];

export default function ESGPage() {
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
      <Header title="Nachhaltige Anlagen (ESG)" subtitle="Anlagekunde · Front Office" />
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Anlagekunde", href: "/anlagekunde" },
          { label: "Nachhaltige Anlagen ESG" },
        ]}
      />
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-3xl space-y-5">

          <div className="rounded-DEFAULT bg-surface shadow-card overflow-hidden">
            <button onClick={() => setLernOpen((v) => !v)} className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-2">
                <BookOpen size={16} className="text-primary" />
                <span className="text-sm font-bold text-text-primary">Lernblock – ESG Nachhaltige Anlagen</span>
              </div>
              {lernOpen ? <ChevronUp size={15} className="text-text-secondary" /> : <ChevronDown size={15} className="text-text-secondary" />}
            </button>
            {lernOpen && (
              <div className="border-t border-border px-5 pb-5 pt-4 space-y-4 text-sm text-text-secondary leading-relaxed">
                <p>ESG = Environmental, Social, Governance. Drei Dimensionen für die Bewertung von Unternehmen nach Nachhaltigkeitskriterien.</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { letter: "E", title: "Environmental", items: ["CO2 Ausstoss", "Energieverbrauch", "Ressourcenschonung"] },
                    { letter: "S", title: "Social", items: ["Arbeitsbedingungen", "Menschenrechte", "Diversität"] },
                    { letter: "G", title: "Governance", items: ["Transparenz", "Korruptionsbekämpfung", "Vorstandsvergütung"] },
                  ].map((b) => (
                    <div key={b.letter} className="rounded-DEFAULT border border-border p-3 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-black text-primary">{b.letter}</span>
                        <span className="font-bold text-text-primary text-xs uppercase tracking-wider">{b.title}</span>
                      </div>
                      <ul className="space-y-1">
                        {b.items.map((i) => (
                          <li key={i} className="flex gap-2"><span className="shrink-0 text-primary">→</span><span>{i}</span></li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div>
                  <p className="font-semibold text-text-primary mb-2">Warum ESG in der Beratung:</p>
                  <ul className="space-y-1 ml-2">
                    {[
                      "Gesetzliche Pflicht: FIDLEG verlangt ESG Präferenzen abzufragen",
                      "Viele Kunden wollen nachhaltig anlegen",
                      "ESG Fonds oft ähnliche Rendite wie normale Fonds",
                    ].map((i) => (
                      <li key={i} className="flex gap-2"><span className="shrink-0 text-primary">→</span><span>{i}</span></li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-DEFAULT bg-primary/5 border border-primary/15 px-4 py-3">
                  <p className="font-semibold text-text-primary text-xs uppercase tracking-wider mb-1">Merksatz</p>
                  <p>ESG abfragen ist Pflicht – nicht optional.</p>
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
                "ESG Präferenzen immer im Beratungsgespräch abfragen – FIDLEG Pflicht",
                "ESG bedeutet nicht automatisch tiefere Rendite",
                "Greenwashing erkennen: Nicht jedes «grüne» Produkt ist wirklich nachhaltig",
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
              {["ESG Präferenzen nicht abgefragt", "ESG mit tieferer Rendite gleichgesetzt", "Greenwashing nicht erkannt", "ESG nur als Modetrend abgetan"].map((f) => (
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
