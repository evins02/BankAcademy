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
    situation:
      "Ein Firmenkunde beantragt CHF 500'000 Kredit.\nEr bietet folgende Sicherheiten an:\n– Liegenschaft Schätzwert CHF 400'000\n– Wertschriften Depot CHF 80'000\n– Bürgschaft Ehepartner CHF 100'000",
    question: "Welche Sicherheit ist am stärksten?",
    options: [
      { key: "A", text: "Bürgschaft Ehepartner" },
      { key: "B", text: "Wertschriften Depot" },
      { key: "C", text: "Liegenschaft (Grundpfand)" },
      { key: "D", text: "Alle gleichwertig" },
    ],
    correct: "C",
    feedback:
      "Grundpfand ist die stärkste Sicherheit – die Liegenschaft kann verwertet werden. Bürgschaft ist personenabhängig, Wertschriften können an Wert verlieren.",
  },
  {
    num: 2,
    level: "Level 2 – Fortgeschritten",
    situation:
      "Kredit CHF 300'000.\nSicherheit: Liegenschaft Schätzwert CHF 350'000.\nBelehnungssatz max. 80%.\nReicht die Sicherheit?",
    question: "Was ist korrekt?",
    options: [
      { key: "A", text: "Ja – CHF 350'000 > CHF 300'000, Sicherheit reicht" },
      {
        key: "B",
        text: "Nein – max. Belehnungswert CHF 280'000, Kredit CHF 300'000 = Unterdeckung",
      },
      { key: "C", text: "Ja – Schätzwert reicht immer als Sicherheit" },
      { key: "D", text: "Nein – Sicherheit muss mindestens 150% betragen" },
    ],
    correct: "B",
    feedback:
      "Belehnungswert = Schätzwert × 80% = CHF 350'000 × 80% = CHF 280'000. Kredit CHF 300'000 überschreitet den Belehnungswert. Zusätzliche Sicherheit nötig.",
  },
  {
    num: 3,
    level: "Level 3 – Experte",
    situation:
      "Kredit läuft seit 5 Jahren.\nSchätzwert Liegenschaft damals: CHF 600'000.\nAktueller Marktwert: CHF 480'000 (gesunken).\nKredit noch ausstehend: CHF 420'000.\n\nBelehnung heute: 420'000 / 480'000 = 87.5%",
    question: "Was ist zu tun?",
    options: [
      { key: "A", text: "Nichts – der Kredit läuft normal weiter" },
      {
        key: "B",
        text: "Kunden informieren und zusätzliche Sicherheiten verlangen",
      },
      { key: "C", text: "Kredit sofort kündigen" },
      { key: "D", text: "Neuen Schätzwert ignorieren – nicht relevant" },
    ],
    correct: "B",
    feedback:
      "Belehnung 87.5% überschreitet das Maximum von 80%. Sicherheit deckt den Kredit nicht mehr vollständig. Massnahmen einleiten: Kunden informieren, zusätzliche Sicherheiten verlangen. Nicht ignorieren.",
  },
];

export default function SicherheitenPage() {
  const [lernOpen, setLernOpen] = useState(true);

  return (
    <>
      <Header
        title="Sicherheitenverwaltung"
        subtitle="Kreditgeschäft · Back Office"
      />
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Kreditgeschäft", href: "/backoffice/credit-operations" },
          { label: "Sicherheitenverwaltung" },
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
                <span className="text-sm font-bold text-text-primary">Lernblock – Sicherheitenverwaltung</span>
              </div>
              {lernOpen ? <ChevronUp size={15} className="text-text-secondary" /> : <ChevronDown size={15} className="text-text-secondary" />}
            </button>
            {lernOpen && (
              <div className="border-t border-border px-5 pb-5 pt-4 space-y-4 text-sm text-text-secondary leading-relaxed">
                <p>
                  Sicherheiten reduzieren das Kreditrisiko der Bank. Je besser die Sicherheit, desto tiefer das Kreditrisiko.
                </p>
                <div>
                  <p className="font-semibold text-text-primary mb-2">Arten von Sicherheiten:</p>
                  <ul className="space-y-1 ml-2">
                    {[
                      "Grundpfand – Hypothek auf Liegenschaft",
                      "Schuldbrief – Wertpapier auf Liegenschaft",
                      "Bürgschaft – Dritte Person haftet",
                      "Verpfändung – Wertschriften, Lebensversicherung",
                      "Zession – Abtretung von Forderungen",
                    ].map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="shrink-0 text-primary">→</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-DEFAULT bg-primary/5 border border-primary/15 px-4 py-3">
                  <p className="font-semibold text-text-primary text-xs uppercase tracking-wider mb-1">Merksatz</p>
                  <p>Je besser die Sicherheit, desto tiefer das Kreditrisiko der Bank.</p>
                </div>
              </div>
            )}
          </div>

          {/* Praxistipps */}
          <div className="rounded-DEFAULT bg-surface shadow-card px-5 py-4 space-y-2">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb size={15} className="text-amber-500" />
              <span className="text-xs font-bold uppercase tracking-wider text-text-secondary">Praxistipp</span>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed">
              Bei jeder Kreditvergabe zuerst prüfen: Welche Sicherheiten sind vorhanden? Reichen sie im Verwertungsfall?
            </p>
          </div>

          {/* Typische Fehler */}
          <div className="rounded-DEFAULT bg-surface shadow-card px-5 py-4">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle size={15} className="text-text-secondary" />
              <span className="text-xs font-bold uppercase tracking-wider text-text-secondary">Typische Fehler</span>
            </div>
            <ul className="space-y-2 text-sm text-text-secondary">
              {[
                "Sicherheitenwert zu hoch eingeschätzt",
                "Sicherheit nicht rechtsgültig bestellt",
                "Veralteter Schätzwert der Liegenschaft verwendet",
              ].map((f) => (
                <li key={f} className="flex gap-2">
                  <span className="shrink-0">❌</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Scenarios */}
          <p className="text-xs font-bold uppercase tracking-widest text-text-secondary pt-1">Szenarien</p>
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
            />
          ))}
        </div>
      </div>
    </>
  );
}
