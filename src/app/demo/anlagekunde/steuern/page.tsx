"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, AlertTriangle, Lightbulb, BookOpen } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { SubModuleMCQ } from "@/components/modules/credit-operations/SubModuleMCQ";
import { useLanguage } from "@/context/LanguageContext";

export default function DemoSteuernPage() {
  const { t } = useLanguage();
  const d = t.demo;

  const SCENARIOS = [
    {
      num: 1,
      level: d.steuernS1Level,
      situation: d.steuernS1Sit,
      question: d.steuernS1Q,
      options: [
        { key: "A", text: d.steuernS1A },
        { key: "B", text: d.steuernS1B },
        { key: "C", text: d.steuernS1C },
        { key: "D", text: d.steuernS1D },
      ],
      correct: "B",
      feedback: d.steuernS1Fb,
    },
    {
      num: 2,
      level: d.steuernS2Level,
      situation: d.steuernS2Sit,
      question: d.steuernS2Q,
      options: [
        { key: "A", text: d.steuernS2A },
        { key: "B", text: d.steuernS2B },
        { key: "C", text: d.steuernS2C },
        { key: "D", text: d.steuernS2D },
      ],
      correct: "B",
      feedback: d.steuernS2Fb,
    },
    {
      num: 3,
      level: d.steuernS3Level,
      situation: d.steuernS3Sit,
      question: d.steuernS3Q,
      options: [
        { key: "A", text: d.steuernS3A },
        { key: "B", text: d.steuernS3B },
        { key: "C", text: d.steuernS3C },
        { key: "D", text: d.steuernS3D },
      ],
      correct: "B",
      feedback: d.steuernS3Fb,
    },
  ];

  const [lernOpen, setLernOpen] = useState(true);
  const [correctCount, setCorrectCount] = useState(0);

  return (
    <>
      <Header title={d.steuernTitle} subtitle={d.steuernSubtitle} />
      <Breadcrumb
        items={[
          { label: "Demo", href: "/demo" },
          { label: t.navItems["Anlagekunde"] },
          { label: d.steuernTitle },
        ]}
      />
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-3xl space-y-5">
          <div className="rounded-DEFAULT bg-surface shadow-card overflow-hidden">
            <button
              onClick={() => setLernOpen((v) => !v)}
              className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <BookOpen size={16} className="text-primary" />
                <span className="text-sm font-bold text-text-primary">{d.steuernLernblock}</span>
              </div>
              {lernOpen ? <ChevronUp size={15} className="text-text-secondary" /> : <ChevronDown size={15} className="text-text-secondary" />}
            </button>
            {lernOpen && (
              <div className="border-t border-border px-5 pb-5 pt-4 space-y-4 text-sm text-text-secondary leading-relaxed">
                <p>{d.steuernIntro}</p>
                <div className="space-y-3">
                  {[
                    {
                      title: d.steuernVs35Title,
                      items: [d.steuernVs35_1, d.steuernVs35_2, d.steuernVs35_3, d.steuernVs35_4],
                    },
                    {
                      title: d.steuernStempelTitle,
                      items: [d.steuernStempel_1, d.steuernStempel_2, d.steuernStempel_3],
                    },
                    {
                      title: d.steuernKapTitle,
                      items: [d.steuernKap_1, d.steuernKap_2, d.steuernKap_3],
                    },
                  ].map((b) => (
                    <div key={b.title} className="rounded-DEFAULT border border-border p-4 space-y-2">
                      <p className="font-bold text-text-primary text-xs uppercase tracking-wider">{b.title}</p>
                      <ul className="space-y-1">
                        {b.items.map((item) => (
                          <li key={item} className="flex gap-2">
                            <span className="shrink-0 text-primary">→</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="rounded-DEFAULT bg-primary/5 border border-primary/15 px-4 py-3">
                  <p className="font-semibold text-text-primary text-xs uppercase tracking-wider mb-1">{d.steuernMerksatzLabel}</p>
                  <p>{d.steuernMerksatz}</p>
                </div>
              </div>
            )}
          </div>

          <div className="rounded-DEFAULT bg-surface shadow-card px-5 py-4">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb size={15} className="text-amber-500" />
              <span className="text-xs font-bold uppercase tracking-wider text-text-secondary">{d.steuernTippsLabel}</span>
            </div>
            <ul className="space-y-2 text-sm text-text-secondary">
              {[d.steuernTipp_1, d.steuernTipp_2, d.steuernTipp_3].map((tip) => (
                <li key={tip} className="flex gap-2">
                  <span className="shrink-0 text-amber-500">💡</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-DEFAULT bg-surface shadow-card px-5 py-4">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle size={15} className="text-text-secondary" />
              <span className="text-xs font-bold uppercase tracking-wider text-text-secondary">{d.steuernFehlerLabel}</span>
            </div>
            <ul className="space-y-2 text-sm text-text-secondary">
              {[d.steuernFehler_1, d.steuernFehler_2, d.steuernFehler_3, d.steuernFehler_4].map((f) => (
                <li key={f} className="flex gap-2">
                  <span className="shrink-0">❌</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-widest text-text-secondary pt-1">{d.steuernSzLabel}</p>
            <div className="flex items-center gap-1.5 pt-1">
              {SCENARIOS.map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-colors ${i < correctCount ? "bg-green-500" : "bg-gray-200"}`}
                />
              ))}
              <span className="text-xs text-text-secondary ml-1">{correctCount} / {SCENARIOS.length}</span>
            </div>
          </div>

          {SCENARIOS.map((s) => (
            <SubModuleMCQ
              key={s.num}
              scenarioNum={s.num}
              levelLabel={s.level}
              situation={s.situation}
              question={s.question}
              options={s.options}
              correct={s.correct}
              feedback={s.feedback}
              onCorrect={() => setCorrectCount((c) => Math.min(c + 1, SCENARIOS.length))}
            />
          ))}

          {correctCount === SCENARIOS.length && (
            <div className="rounded-DEFAULT bg-green-50 border border-green-200 p-5 flex items-start gap-3">
              <span className="text-xl shrink-0">🏆</span>
              <div>
                <p className="font-bold text-green-800 text-sm">{d.steuernDone}</p>
                <p className="text-sm text-green-700 mt-0.5">
                  {d.steuernDoneText.replace("{n}", String(SCENARIOS.length))}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
