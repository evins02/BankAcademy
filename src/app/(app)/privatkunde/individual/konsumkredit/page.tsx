"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, Scale, BookOpen } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";

interface Scenario {
  id: string;
  level: 1 | 2 | 3;
  situation: string;
  question: string;
  options: { key: "A" | "B" | "C" | "D"; text: string }[];
  correct: "A" | "B" | "C" | "D";
  feedback: string;
  warum: string;
  inDerPraxis: string;
  merksatz: string;
  rechtsgrundlage: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: "kk-1",
    level: 1,
    situation:
      "Herr Müller (32) möchte einen Konsumkredit über CHF 15'000 für ein Auto. Er verdient netto CHF 4'200 pro Monat. Er hat keine weiteren Kreditverpflichtungen. Der Zinssatz beträgt 9.9% p.a., Laufzeit 36 Monate.",
    question: "Was musst du gemäss KKG vor der Kreditgewährung zwingend prüfen?",
    options: [
      { key: "A", text: "Nur die Bonität bei der ZEK abfragen" },
      { key: "B", text: "Die Kreditfähigkeit: Der Kredit muss innert 36 Monaten aus dem pfändbaren Freibetrag rückzahlbar sein" },
      { key: "C", text: "Einen Grundbuchauszug zur Sicherstellung verlangen" },
      { key: "D", text: "Die Zustimmung des Arbeitgebers einholen" },
    ],
    correct: "B",
    feedback:
      "Das KKG (Konsumkreditgesetz) verlangt zwingend eine Kreditfähigkeitsprüfung. Der Kredit gilt nur dann als tragbar, wenn er innert der vereinbarten Laufzeit aus dem pfändbaren Freibetrag des Kreditnehmers vollständig zurückbezahlt werden kann.",
    warum:
      "Das KKG schützt Konsumenten vor Überschuldung. Die Kreditfähigkeitsprüfung ist zwingend und nicht verhandelbar – bei Nichtbeachtung ist der Kreditvertrag nichtig.",
    inDerPraxis:
      "In der Bank wird der pfändbare Freibetrag nach kantonaler Tabelle berechnet. In Zürich beträgt der Grundbetrag für eine Einzelperson rund CHF 1'350/Monat. Das Nettoeinkommen abzüglich Existenzminimum ergibt den verfügbaren Betrag.",
    merksatz:
      "KKG: Kreditfähig ist, wer den Kredit innert der Laufzeit aus dem Freibetrag tilgen kann.",
    rechtsgrundlage: "KKG Art. 28 (Kreditfähigkeitsprüfung) / KKG Art. 15 (Nichtigkeit)",
  },
  {
    id: "kk-2",
    level: 1,
    situation:
      "Frau Keller (45) beantragt einen Konsumkredit über CHF 8'000. Bei der ZEK-Abfrage stellt sich heraus, dass sie bereits zwei laufende Konsumkredite bei anderen Instituten hat mit Gesamtschulden von CHF 22'000.",
    question: "Wie gehst du vor?",
    options: [
      { key: "A", text: "Kredit gewähren, da CHF 8'000 ein kleiner Betrag ist" },
      { key: "B", text: "Kredit verweigern ohne Begründung" },
      { key: "C", text: "Kreditfähigkeitsprüfung unter Einbezug aller bestehenden Verpflichtungen durchführen – bei fehlender Tragbarkeit ablehnen" },
      { key: "D", text: "Kredit nur dann gewähren, wenn Frau Keller einen Bürgen stellt" },
    ],
    correct: "C",
    feedback:
      "Alle bestehenden Konsumkreditverpflichtungen müssen bei der Kreditfähigkeitsprüfung berücksichtigt werden. Nur wenn die Gesamtbelastung (bestehende + neue Kreditrate) aus dem pfändbaren Freibetrag tragbar ist, darf der Kredit gewährt werden. Sonst ist er zwingend abzulehnen.",
    warum:
      "Die ZEK (Zentralstelle für Kreditinformation) listet alle laufenden Konsumkredite in der Schweiz. Die Bank muss diese Daten zwingend bei jeder Kreditvergabe berücksichtigen.",
    inDerPraxis:
      "In der Praxis bedeutet das: Einkommen – Ausgaben – bestehende Kreditraten = verfügbarer Betrag. Reicht dieser nicht für die neue Rate, ist abzulehnen. Die Ablehnung muss dem Kunden schriftlich mitgeteilt werden.",
    merksatz:
      "Alle Konsumkredite zusammenrechnen – die Gesamtlast muss tragbar sein.",
    rechtsgrundlage: "KKG Art. 28 Abs. 2 / ZEK-Vereinbarung",
  },
  {
    id: "kk-3",
    level: 1,
    situation:
      "Ein Kunde möchte einen Konsumkredit über CHF 500 beantragen. Er sagt, das geht schnell und ohne Papierkram.",
    question: "Welche Aussage zu Kleinstkrediten ist korrekt?",
    options: [
      { key: "A", text: "Kredite unter CHF 500 fallen nicht unter das KKG – keine Kreditfähigkeitsprüfung nötig" },
      { key: "B", text: "Kredite unter CHF 3'000 sind vom KKG ausgenommen" },
      { key: "C", text: "Das KKG gilt grundsätzlich ab CHF 500, inkl. Kreditfähigkeitsprüfung und Schriftformerfordernis" },
      { key: "D", text: "Kleinstkredite unter CHF 1'000 können formlos vergeben werden" },
    ],
    correct: "C",
    feedback:
      "Das KKG gilt für Konsumkredite ab CHF 500. Auch bei kleinen Beträgen gelten alle Vorschriften: Kreditfähigkeitsprüfung, schriftlicher Vertrag, Widerrufsrecht von 14 Tagen und Angabe des effektiven Jahreszinses.",
    warum:
      "Der Gesetzgeber hat die Untergrenze bewusst tief gesetzt, um auch bei kleinen Beträgen Verbraucherschutz zu gewährleisten. Ausgenommen sind nur Überziehungskredite auf Kontokorrent und zinslose Kleinstkredite.",
    inDerPraxis:
      "In der Praxis werden Kleinstkredite unter CHF 500 selten vergeben – der administrative Aufwand steht in keinem Verhältnis. Für kurzfristigen Liquiditätsbedarf empfehlen wir stattdessen den Kontokorrentkredit.",
    merksatz:
      "KKG gilt ab CHF 500 – immer mit Schriftform, Kreditfähigkeitsprüfung und Widerrufsfrist.",
    rechtsgrundlage: "KKG Art. 1 Abs. 1 / KKG Art. 7 (Schriftformerfordernis) / KKG Art. 16 (Widerrufsrecht)",
  },
  {
    id: "kk-4",
    level: 2,
    situation:
      "Herr Bauer möchte einen Konsumkredit über CHF 25'000 mit Laufzeit 48 Monate bei einem effektiven Jahreszins von 11.95%. Er fragt, was er insgesamt zurückzahlen muss.",
    question: "Was musst du dem Kunden gemäss KKG im Kreditvertrag zwingend offenlegen?",
    options: [
      { key: "A", text: "Nur den Nominalzinssatz" },
      { key: "B", text: "Den effektiven Jahreszins, die monatliche Rate, den Gesamtbetrag aller Zahlungen und alle Kosten" },
      { key: "C", text: "Nur die monatliche Rate und die Laufzeit" },
      { key: "D", text: "Den LIBOR-Basiszinssatz und die Marge" },
    ],
    correct: "B",
    feedback:
      "Der KKG-Kreditvertrag muss zwingend enthalten: effektiver Jahreszins, monatliche Rate, Gesamtbetrag aller Zahlungen (Kredit + Zinsen + Kosten), alle Nebenkosten sowie das 14-tägige Widerrufsrecht. Transparenz ist der Kerngedanke des Konsumentenschutzes.",
    warum:
      "Ohne vollständige Kostentransparenz kann der Konsument nicht beurteilen, ob der Kredit für ihn vorteilhaft ist. Der Gesetzgeber verlangt daher eine abschliessende Kostenaufstellung.",
    inDerPraxis:
      "Bei CHF 25'000 über 48 Monate zu 11.95% beträgt die monatliche Rate ca. CHF 656. Der Gesamtrückzahlungsbetrag liegt bei rund CHF 31'500 – das sind über CHF 6'500 Zinskosten. Diese Zahlen müssen im Vertrag stehen.",
    merksatz:
      "KKG-Vertrag: Effektiver Jahreszins + monatliche Rate + Gesamtbetrag + Widerrufsrecht – alles schriftlich.",
    rechtsgrundlage: "KKG Art. 10 (Inhalt des Kreditvertrags) / KKG Art. 9 (Effektiver Jahreszins)",
  },
  {
    id: "kk-5",
    level: 2,
    situation:
      "Frau Schmidt hat ihren Konsumkredit-Vertrag gestern unterschrieben. Heute ruft sie an und möchte vom Vertrag zurücktreten.",
    question: "Was gilt hier gemäss KKG?",
    options: [
      { key: "A", text: "Der Vertrag ist bindend – Rücktritt ist nicht mehr möglich" },
      { key: "B", text: "Frau Schmidt hat 3 Arbeitstage Bedenkzeit" },
      { key: "C", text: "Frau Schmidt kann den Vertrag innerhalb von 14 Kalendertagen widerrufen" },
      { key: "D", text: "Widerruf ist nur möglich, wenn das Geld noch nicht ausbezahlt wurde" },
    ],
    correct: "C",
    feedback:
      "Das KKG gewährt Konsumenten ein 14-tägiges Widerrufsrecht ohne Angabe von Gründen. Die Frist beginnt mit dem Erhalt der Vertragsurkunde. Frau Schmidt kann somit problemlos und ohne Kosten zurücktreten.",
    warum:
      "Das Widerrufsrecht schützt Konsumenten vor Übereilungsentscheidungen. Es gilt auch dann, wenn das Geld bereits ausbezahlt wurde – in diesem Fall muss der Betrag innert 30 Tagen zurückbezahlt werden.",
    inDerPraxis:
      "In der Praxis informieren wir Kunden aktiv über das Widerrufsrecht – das schafft Vertrauen und entspricht der KKG-Anforderung. Die Widerrufserklärung muss schriftlich per eingeschriebenem Brief erfolgen.",
    merksatz:
      "KKG: 14 Tage Widerruf – ohne Grund, ohne Kosten.",
    rechtsgrundlage: "KKG Art. 16 (Widerrufsrecht)",
  },
];

const LEVEL_LABELS: Record<number, { label: string; color: string }> = {
  1: { label: "Einsteiger", color: "bg-emerald-100 text-emerald-800" },
  2: { label: "Fortgeschritten", color: "bg-amber-100 text-amber-800" },
  3: { label: "Experte", color: "bg-red-100 text-red-800" },
};

function ScenarioCard({ scenario }: { scenario: Scenario }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const isCorrect = selected === scenario.correct;
  const lvl = LEVEL_LABELS[scenario.level];

  return (
    <div className="rounded-2xl border border-border bg-surface overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <span className={cn("rounded-full px-3 py-1 text-[11px] font-semibold", lvl.color)}>
            Level {scenario.level} – {lvl.label}
          </span>
          <div className="flex items-center gap-1.5 text-[11px] text-text-secondary">
            <Scale size={11} />
            <span>{scenario.rechtsgrundlage}</span>
          </div>
        </div>
        <p className="text-sm leading-relaxed text-text-secondary">{scenario.situation}</p>
      </div>

      {/* Question + options */}
      <div className="px-6 py-5">
        <p className="mb-4 text-sm font-semibold text-text-primary">{scenario.question}</p>
        <div className="space-y-2">
          {scenario.options.map((opt) => {
            const isSelected = selected === opt.key;
            const isCorrectOpt = opt.key === scenario.correct;
            const reveal = showAnswer || (selected !== null);
            return (
              <button
                key={opt.key}
                onClick={() => {
                  if (selected !== null) return;
                  setSelected(opt.key);
                  setShowAnswer(true);
                }}
                disabled={selected !== null}
                className={cn(
                  "w-full flex items-start gap-3 rounded-xl border p-4 text-left text-sm transition-all",
                  selected === null
                    ? "border-border bg-background hover:border-primary/40 hover:bg-primary-light cursor-pointer"
                    : reveal && isCorrectOpt
                    ? "border-primary bg-primary-light text-text-primary"
                    : reveal && isSelected && !isCorrectOpt
                    ? "border-red-300 bg-red-50 text-text-primary"
                    : "border-border bg-surface text-text-secondary opacity-50 cursor-default"
                )}
              >
                <span
                  className={cn(
                    "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold",
                    reveal && isCorrectOpt
                      ? "bg-primary text-white"
                      : reveal && isSelected && !isCorrectOpt
                      ? "bg-red-500 text-white"
                      : "bg-gray-100 text-text-secondary"
                  )}
                >
                  {opt.key}
                </span>
                <span className="flex-1">{opt.text}</span>
                {reveal && isCorrectOpt && <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-primary" />}
                {reveal && isSelected && !isCorrectOpt && <XCircle size={14} className="mt-0.5 shrink-0 text-red-500" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Feedback */}
      {showAnswer && (
        <div className="border-t border-border px-6 py-5 space-y-3">
          <div className={cn("flex items-center gap-2 rounded-xl p-4", isCorrect ? "bg-primary-light" : "bg-red-50")}>
            <span className="text-2xl">{isCorrect ? "✅" : "❌"}</span>
            <p className={cn("text-sm font-semibold", isCorrect ? "text-primary" : "text-red-700")}>
              {isCorrect ? "Richtig!" : "Leider falsch"}
            </p>
          </div>

          <div className="rounded-xl border border-border bg-background p-4">
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-text-secondary">Das solltest du wissen</p>
            <p className="text-sm leading-relaxed text-text-primary">{scenario.feedback}</p>
          </div>

          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
            <p className="mb-1 text-[11px] font-bold uppercase tracking-wider text-amber-700">Warum?</p>
            <p className="text-sm leading-relaxed text-amber-900">{scenario.warum}</p>
          </div>

          <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
            <p className="mb-1 text-[11px] font-bold uppercase tracking-wider text-blue-700">In der Praxis</p>
            <p className="text-sm leading-relaxed text-blue-900">{scenario.inDerPraxis}</p>
          </div>

          <div className="flex items-start gap-2 rounded-xl border border-primary/20 bg-primary-light px-4 py-3">
            <span className="mt-0.5 shrink-0 text-base">💡</span>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-primary mb-0.5">Merksatz</p>
              <p className="text-sm font-medium leading-snug text-text-primary">{scenario.merksatz}</p>
            </div>
          </div>

          <div className="flex items-start gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
            <Scale size={13} className="mt-0.5 shrink-0 text-slate-500" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-0.5">Rechtsgrundlage</p>
              <p className="text-xs font-medium text-slate-700">{scenario.rechtsgrundlage}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function KonsumkreditPage() {
  const [filter, setFilter] = useState<"alle" | 1 | 2>(  "alle");
  const filtered = filter === "alle" ? SCENARIOS : SCENARIOS.filter((s) => s.level === filter);

  return (
    <>
      <Header
        title="Konsumkredit"
        subtitle="KKG-Prüfung, Kreditfähigkeit und Verbraucherschutz"
      />
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Privatkunde" },
          { label: "Individual" },
          { label: "Konsumkredit" },
        ]}
      />
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-2xl">
          {/* Info card */}
          <div className="mb-6 rounded-2xl border border-primary/20 bg-primary-light p-5">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen size={16} className="text-primary" />
              <p className="text-sm font-semibold text-primary">Konsumkreditgesetz (KKG)</p>
            </div>
            <p className="text-sm leading-relaxed text-text-secondary">
              Das KKG regelt Konsumkredite ab CHF 500 in der Schweiz. Als Berater musst du zwingend die
              Kreditfähigkeit prüfen, alle Kosten transparent offenlegen und das 14-tägige Widerrufsrecht
              gewähren. Fehler führen zur Nichtigkeit des Vertrags.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {["KKG Art. 1 – Geltungsbereich", "KKG Art. 28 – Kreditfähigkeit", "KKG Art. 16 – Widerrufsrecht"].map((tag) => (
                <span key={tag} className="rounded-full bg-white/60 px-2.5 py-1 text-[10px] font-semibold text-primary border border-primary/20">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Filter */}
          <div className="mb-5 flex items-center gap-2">
            {[
              { key: "alle" as const, label: "Alle" },
              { key: 1 as const, label: "Level 1" },
              { key: 2 as const, label: "Level 2" },
            ].map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-xs font-semibold transition-colors",
                  filter === f.key ? "bg-primary text-white" : "bg-gray-100 text-text-secondary hover:bg-gray-200"
                )}
              >
                {f.label}
              </button>
            ))}
            <span className="ml-auto text-xs text-text-secondary">{filtered.length} Szenarien</span>
          </div>

          {/* Scenarios */}
          <div className="space-y-4">
            {filtered.map((s) => (
              <ScenarioCard key={s.id} scenario={s} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
