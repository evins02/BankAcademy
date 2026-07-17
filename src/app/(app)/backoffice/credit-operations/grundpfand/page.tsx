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
    situation: "Ein Kunde fragt nach dem Unterschied zwischen Grundpfandverschreibung und Schuldbrief.",
    question: "Was ist korrekt?",
    options: [
      { key: "A", text: "Kein Unterschied – beides ist dasselbe" },
      { key: "B", text: "Schuldbrief ist ein Wertpapier und flexibler einsetzbar" },
      { key: "C", text: "Grundpfandverschreibung ist immer sicherer" },
      { key: "D", text: "Schuldbrief gilt nur für Hypotheken unter CHF 500'000" },
    ],
    correct: "B",
    feedback:
      "Schuldbrief ist ein Wertpapier – übertragbar und flexibler. Grundpfandverschreibung ist direkt mit der Schuld verknüpft und erlischt mit ihr. Schuldbrief bleibt nach Rückzahlung bestehen.",
  },
  {
    num: 2,
    level: "Level 2 – Fortgeschritten",
    situation:
      "Kunde hat Schuldbrief CHF 400'000, 1. Rang – ausreichend für den neuen Kredit CHF 350'000.\nIm Grundbuch steht noch ein alter Schuldbrief CHF 100'000, 2. Rang einer anderen Bank.",
    question: "Was ist das Problem?",
    options: [
      { key: "A", text: "Kein Problem – 1. Rang reicht aus" },
      {
        key: "B",
        text: "Der alte Schuldbrief 2. Rang gehört einer anderen Bank – kein Problem für unseren 1. Rang",
      },
      { key: "C", text: "Beide Schuldbriefe zusammen übersteigen den Liegenschaftswert – Unterdeckung" },
      { key: "D", text: "Alter Schuldbrief muss zuerst gelöscht werden bevor wir auszahlen können" },
    ],
    correct: "B",
    feedback:
      "Unser 1. Rang Schuldbrief hat Priorität bei der Verwertung. Der 2. Rang der anderen Bank kommt erst danach. Kein Problem für unsere Sicherheit – sofern der Liegenschaftswert ausreicht.",
  },
  {
    num: 3,
    level: "Level 3 – Experte",
    situation: "Der Kredit wird vollständig zurückbezahlt. Der Schuldbrief CHF 500'000 liegt bei der Bank. Der Kunde fragt: «Wird der Schuldbrief jetzt automatisch gelöscht?»",
    question: "Was ist die richtige Antwort?",
    options: [
      { key: "A", text: "Ja – automatisch nach vollständiger Rückzahlung" },
      {
        key: "B",
        text: "Nein – Schuldbrief bleibt bestehen, Bank gibt ihn zurück oder Löschung muss aktiv beantragt werden",
      },
      { key: "C", text: "Schuldbrief wird von der Bank als Sicherheit behalten" },
      { key: "D", text: "Schuldbrief erlischt automatisch nach 10 Jahren" },
    ],
    correct: "B",
    feedback:
      "Schuldbrief ist ein Wertpapier – er erlischt nicht automatisch mit der Schuldrückzahlung. Bank gibt ihn dem Kunden zurück, oder Löschung im Grundbuch muss aktiv beantragt werden. Das ist ein wichtiger Abschlussschritt.",
  },
];

export default function GrundpfandPage() {
  const [lernOpen, setLernOpen] = useState(true);

  return (
    <>
      <Header
        title="Grundpfandverschreibung & Schuldbrief"
        subtitle="Credit Operations · Back Office"
      />
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Credit Operations", href: "/backoffice/credit-operations" },
          { label: "Grundpfand & Schuldbrief" },
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
                <span className="text-sm font-bold text-text-primary">Lernblock – Grundpfand & Schuldbrief</span>
              </div>
              {lernOpen ? <ChevronUp size={15} className="text-text-secondary" /> : <ChevronDown size={15} className="text-text-secondary" />}
            </button>
            {lernOpen && (
              <div className="border-t border-border px-5 pb-5 pt-4 space-y-4 text-sm text-text-secondary leading-relaxed">
                <p>Zwei Arten der Liegenschaftssicherung – beide binden die Liegenschaft als Sicherheit, unterscheiden sich aber in Flexibilität und Handhabung.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-DEFAULT border border-border p-4 space-y-2">
                    <p className="font-bold text-text-primary text-xs uppercase tracking-wider">Grundpfandverschreibung</p>
                    <ul className="space-y-1">
                      {[
                        "Direkte Belastung der Liegenschaft",
                        "Nicht übertragbar",
                        "Günstiger in der Errichtung",
                        "Erlischt mit der Schuld",
                      ].map((i) => (
                        <li key={i} className="flex gap-2"><span className="shrink-0 text-primary">→</span><span>{i}</span></li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-DEFAULT border border-border p-4 space-y-2">
                    <p className="font-bold text-text-primary text-xs uppercase tracking-wider">Schuldbrief</p>
                    <ul className="space-y-1">
                      {[
                        "Wertpapier – übertragbar",
                        "Flexibler – für andere Kredite verwendbar",
                        "Bleibt nach Schuldrückzahlung bestehen",
                        "Häufiger bei Banken",
                      ].map((i) => (
                        <li key={i} className="flex gap-2"><span className="shrink-0 text-primary">→</span><span>{i}</span></li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="rounded-DEFAULT bg-primary/5 border border-primary/15 px-4 py-3">
                  <p className="font-semibold text-text-primary text-xs uppercase tracking-wider mb-1">Merksatz</p>
                  <p>Schuldbrief = flexibler · Grundpfandverschreibung = einfacher</p>
                </div>
              </div>
            )}
          </div>

          {/* Praxistipps */}
          <div className="rounded-DEFAULT bg-surface shadow-card px-5 py-4 space-y-2">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb size={15} className="text-amber-500" />
              <span className="text-xs font-bold uppercase tracking-wider text-text-secondary">Praxistipps</span>
            </div>
            <ul className="space-y-2 text-sm text-text-secondary">
              {[
                "Schuldbrief immer im Grundbuch prüfen bevor Kredit ausgezahlt wird",
                "Rang des Schuldbriefs bestimmt Priorität bei Verwertung",
                "1. Rang = beste Sicherheit für die Bank",
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
                "Schuldbrief falschem Rang zugeordnet",
                "Schuldbrief nicht im Grundbuch eingetragen",
                "Schuldbrief Betrag zu tief für den Kreditbetrag",
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
