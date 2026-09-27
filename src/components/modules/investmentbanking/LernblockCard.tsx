"use client";

import { BookOpen, ChevronRight } from "lucide-react";

interface LernblockCardProps {
  onContinue: () => void;
}

const KEY_CONCEPTS = [
  {
    num: "01",
    title: "Primär- vs. Sekundärmarkt",
    detail:
      "Primärmarkt: Neuemission – Kapital fliesst an den Emittenten. Sekundärmarkt: Handel zwischen Anlegern – Kurs fluktuiert, Unternehmen erhält nichts mehr.",
  },
  {
    num: "02",
    title: "IPO (Initial Public Offering)",
    detail:
      "Erstmalige Ausgabe von Aktien an die Öffentlichkeit. Ziel: Eigenkapitalbeschaffung, Kotierung an einer Börse (z.B. SIX Swiss Exchange). Prozess: 4–6 Monate, erfordert FIDLEG-Prospekt.",
  },
  {
    num: "03",
    title: "Bookbuilding & Emissionspreis",
    detail:
      "Preisfindungsverfahren: Investoren geben Orders mit Preisangabe innerhalb einer Spanne ab. Der Emissionspreis wird anhand der tatsächlichen Nachfrage festgelegt.",
  },
  {
    num: "04",
    title: "Underwriting (Übernahmegarantie)",
    detail:
      "Die Bank verpflichtet sich, nicht platzierte Aktien selbst zu kaufen (Firm Commitment). Emittent erhält Sicherheit – Bank trägt Platzierungsrisiko und erhält Gebühr (typisch 2–4%).",
  },
  {
    num: "05",
    title: "M&A – Fusion vs. Akquisition",
    detail:
      "Fusion: Beide Unternehmen vereinen sich zu einer neuen Einheit. Akquisition: Ein Unternehmen übernimmt ein anderes – kann als Tochter bestehen bleiben.",
  },
  {
    num: "06",
    title: "Chinese Wall",
    detail:
      "Informationsschranke zwischen Research und Investment Banking. Verhindert, dass Insider-Informationen (z.B. M&A-Pläne) das Research-Rating beeinflussen. Basis: FIDLEG Art. 25 ff.",
  },
];

const BEWERTUNG_ROWS = [
  { label: "DCF (Discounted Cashflow)", desc: "Barwert zukünftiger Cashflows – intrinsischer Wert" },
  { label: "EV/EBITDA-Multiplikator", desc: "Marktvergleich mit ähnlichen Unternehmen (Peer-Group)" },
  { label: "Price-to-Book (P/B)", desc: "Häufig bei Banken: Kurs im Verhältnis zum Buchwert" },
];

export function IBLernblock({ onContinue }: LernblockCardProps) {
  return (
    <div className="mx-auto max-w-3xl space-y-5 p-6">
      {/* Header */}
      <div className="rounded-DEFAULT bg-surface shadow-card overflow-hidden">
        <div className="px-5 py-4 border-b border-border flex items-center gap-2">
          <BookOpen size={16} className="text-primary" />
          <span className="text-sm font-bold text-text-primary">Lernblock – Investmentbanking</span>
        </div>
        <div className="px-5 pb-5 pt-4 text-sm text-text-secondary leading-relaxed">
          <p className="mb-4">
            Investmentbanking umfasst die Begleitung von Unternehmen bei Kapitalmarkt-
            transaktionen: Börsengänge, Anleihenemissionen, Fusionen und Übernahmen (M&A).
            Als Banklehrling wirst du die grundlegenden Konzepte und Rollen kennen müssen.
          </p>
          <div className="grid gap-3">
            {KEY_CONCEPTS.map((c) => (
              <div key={c.num} className="rounded-DEFAULT border border-border p-4 flex gap-4">
                <span className="text-lg font-black text-primary/30 shrink-0 w-8 leading-none pt-0.5">
                  {c.num}
                </span>
                <div>
                  <p className="font-bold text-text-primary text-xs uppercase tracking-wider mb-1">
                    {c.title}
                  </p>
                  <p className="text-sm text-text-secondary leading-relaxed">{c.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bewertungsmethoden */}
      <div className="rounded-DEFAULT bg-surface shadow-card px-5 py-4">
        <p className="text-xs font-bold uppercase tracking-wider text-text-secondary mb-3">
          Bewertungsmethoden im Überblick
        </p>
        <div className="space-y-2">
          {BEWERTUNG_ROWS.map((r) => (
            <div key={r.label} className="flex gap-3 text-sm">
              <span className="shrink-0 text-primary font-bold">→</span>
              <div>
                <span className="font-semibold text-text-primary">{r.label}:</span>{" "}
                <span className="text-text-secondary">{r.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Compliance-Hinweis */}
      <div className="rounded-DEFAULT bg-amber-50 border border-amber-200 px-4 py-3">
        <p className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-1">
          Rechtliche Grundlagen (Schweiz)
        </p>
        <ul className="text-sm text-amber-800 space-y-1">
          <li className="flex gap-2"><span className="shrink-0">·</span> FIDLEG Art. 25 ff. – Verhaltensregeln, Chinese Wall, Interessenkonflikte</li>
          <li className="flex gap-2"><span className="shrink-0">·</span> FINMAG Art. 33 ff. – Insiderhandel und Marktmanipulation</li>
          <li className="flex gap-2"><span className="shrink-0">·</span> BankG Art. 3 ff. – Bewilligung bei qualifizierten Beteiligungen / Übernahmen</li>
          <li className="flex gap-2"><span className="shrink-0">·</span> Kotierungsreglement SIX – Anforderungen für Börsenkotierung</li>
        </ul>
      </div>

      {/* CTA */}
      <button
        onClick={onContinue}
        className="w-full flex items-center justify-center gap-2 rounded-pill bg-primary py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
      >
        Zum ersten Fall <ChevronRight size={15} />
      </button>
    </div>
  );
}
