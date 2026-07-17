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
      "Firmenkredit CHF 200'000. Inhaber Peter Müller, verheiratet, bürgt solidarisch für den Kredit.",
    question: "Was muss zwingend eingeholt werden?",
    options: [
      { key: "A", text: "Nur die Unterschrift von Peter Müller" },
      {
        key: "B",
        text: "Unterschrift Peter Müller + schriftliche Zustimmung seiner Ehefrau",
      },
      { key: "C", text: "Bürgschaft des Verwaltungsrats zusätzlich" },
      { key: "D", text: "Nichts weiteres – Firmeninhaber kann alleine bürgen" },
    ],
    correct: "B",
    feedback:
      "Bei verheirateten Bürgen ist die Zustimmung des Ehepartners gesetzlich vorgeschrieben (OR Art. 494). Ohne schriftliche Zustimmung ist die Bürgschaft ungültig – auch wenn der Bürge sagt, es sei nicht nötig.",
  },
  {
    num: 2,
    level: "Level 2 – Fortgeschritten",
    situation:
      "GmbH beantragt Kredit CHF 150'000. Zwei Gesellschafter: Hans (60% Anteil) und Lisa (40% Anteil) bürgen gemeinsam. Hans zahlt nicht mehr.",
    question: "Was kann die Bank tun?",
    options: [
      { key: "A", text: "Nur Hans betreiben (60% = CHF 90'000)" },
      { key: "B", text: "Nur Lisa betreiben (40% = CHF 60'000)" },
      { key: "C", text: "Beide oder nur Lisa für den Gesamtbetrag betreiben" },
      { key: "D", text: "Kredit abschreiben – nicht eintreibbar" },
    ],
    correct: "C",
    feedback:
      "Gemeinsame Bürgschaft: Jeder Bürge haftet für den Gesamtbetrag. Die Bank kann sich aussuchen, wen sie betreibt. Der prozentuale Anteil an der Firma ist für die Bürgschaft irrelevant.",
  },
  {
    num: 3,
    level: "Level 3 – Experte",
    situation:
      "Bürgschaft CHF 100'000 für Firmenkredit. Firma geht bankrott. Bürge sagt: «Ich hafte nur, wenn die Bank zuerst die Firma vollständig betrieben hat.»",
    question: "Hat der Bürge recht?",
    options: [
      { key: "A", text: "Ja – Bank muss Firma immer zuerst betreiben" },
      {
        key: "B",
        text: "Nein – bei Solidarbürgschaft kann die Bank direkt beim Bürgen eintreiben",
      },
      { key: "C", text: "Ja – das gilt bei allen Bürgschaftsarten" },
      { key: "D", text: "Kommt auf den Vertrag an – kann beides stimmen" },
    ],
    correct: "B",
    feedback:
      "Solidarbürgschaft bedeutet: Der Bürge haftet gleichzeitig mit dem Schuldner. Bank muss den Schuldner NICHT zuerst betreiben. Anders wäre es bei der einfachen Bürgschaft, wo das Vorzugsrecht besteht.",
  },
];

export default function BuergschaftPage() {
  const [lernOpen, setLernOpen] = useState(true);

  return (
    <>
      <Header title="Bürgschaften" subtitle="Credit Operations · Back Office" />
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Credit Operations", href: "/backoffice/credit-operations" },
          { label: "Bürgschaften" },
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
                <span className="text-sm font-bold text-text-primary">Lernblock – Bürgschaften</span>
              </div>
              {lernOpen ? <ChevronUp size={15} className="text-text-secondary" /> : <ChevronDown size={15} className="text-text-secondary" />}
            </button>
            {lernOpen && (
              <div className="border-t border-border px-5 pb-5 pt-4 space-y-4 text-sm text-text-secondary leading-relaxed">
                <p>Bürgschaft = Dritte Person haftet für Schulden des Kreditnehmers.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-DEFAULT border border-border p-4 space-y-2">
                    <p className="font-bold text-text-primary text-xs uppercase tracking-wider">Solidarbürgschaft</p>
                    <ul className="space-y-1">
                      {[
                        "Bürge haftet gleichzeitig mit Schuldner",
                        "Bank kann direkt beim Bürgen eintreiben",
                        "Kein Vorzug des Schuldners nötig",
                        "Häufigste Form bei Banken",
                      ].map((i) => (
                        <li key={i} className="flex gap-2"><span className="shrink-0 text-primary">→</span><span>{i}</span></li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-DEFAULT border border-border p-4 space-y-2">
                    <p className="font-bold text-text-primary text-xs uppercase tracking-wider">Gemeinsame Bürgschaft</p>
                    <ul className="space-y-1">
                      {[
                        "Mehrere Bürgen haften zusammen",
                        "Typisch bei Firmenkrediten",
                        "Jeder Bürge haftet für Gesamtbetrag",
                        "Anteil am Unternehmen irrelevant",
                      ].map((i) => (
                        <li key={i} className="flex gap-2"><span className="shrink-0 text-primary">→</span><span>{i}</span></li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div>
                  <p className="font-semibold text-text-primary mb-2">Rechtliche Anforderungen:</p>
                  <ul className="space-y-1 ml-2">
                    {[
                      "Bürgschaft muss schriftlich sein",
                      "Bei verheirateten Bürgen: Zustimmung des Ehepartners nötig (OR Art. 494)",
                      "Maximalbetrag muss angegeben sein",
                    ].map((i) => (
                      <li key={i} className="flex gap-2"><span className="shrink-0 text-primary">→</span><span>{i}</span></li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-DEFAULT bg-primary/5 border border-primary/15 px-4 py-3">
                  <p className="font-semibold text-text-primary text-xs uppercase tracking-wider mb-1">Merksatz</p>
                  <p>Ohne Ehepartner-Zustimmung ist die Bürgschaft ungültig!</p>
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
                "Immer Zustimmung des Ehepartners einholen – auch wenn Bürge sagt, es sei nicht nötig",
                "Bürgschaft auf Maximalbetrag begrenzen – nie unbeschränkte Bürgschaft",
                "Bonität des Bürgen prüfen – eine wertlose Bürgschaft nützt nichts",
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
                "Zustimmung Ehepartner vergessen",
                "Maximalbetrag nicht definiert",
                "Bonität des Bürgen nicht geprüft",
                "Bürgschaft nicht schriftlich abgeschlossen",
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
