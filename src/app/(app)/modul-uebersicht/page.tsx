"use client";

import Link from "next/link";
import {
  User, Building2, TrendingUp, Landmark, Settings2, Scale,
  GraduationCap, Map, BarChart2, Award, AlertCircle, FileText,
  Bookmark, MessageSquare, ChevronRight, BookOpen,
} from "lucide-react";
import { Header } from "@/components/layout/Header";

/* ─── Data ─────────────────────────────────────────────────────────────────── */

const FRONT_OFFICE = [
  {
    label: "Privatkunde",
    icon: User,
    color: "from-blue-600/20 to-blue-500/5",
    border: "border-blue-500/25",
    accent: "text-blue-400",
    badge: "10 Szenarien",
    sections: [
      {
        title: "Basis",
        items: [
          { label: "Kontoeröffnung", href: "/privatkunde/basis/kontoeröffnung" },
          { label: "Sparen & Konto", href: "/privatkunde/basis/sparen-konto" },
          { label: "Zahlungsverkehr", href: "/privatkunde/basis/zahlungsverkehr" },
          { label: "3a / Vorsorge", href: "/privatkunde/basis/vorsorge" },
          { label: "Fonds", href: "/privatkunde/basis/fonds" },
          { label: "Simulation: Kontoeröffnung", href: "/privatkunde/basis/simulation-kontoeröffnung" },
        ],
      },
      {
        title: "Individual",
        items: [
          { label: "Hypotheken", href: "/privatkunde/individual/hypotheken" },
          { label: "Konsumkredit", href: "/privatkunde/individual/konsumkredit" },
          { label: "Blankokredit", href: "/privatkunde/individual/blankokredit" },
          { label: "Simulation: Hypothek", href: "/privatkunde/individual/simulation-hypothek" },
          { label: "Verpfändung PK / 3a", href: "/kreditgeschaefte/verpfaendung" },
          { label: "Baukredit", href: "/kreditgeschaefte/baukredit" },
        ],
      },
    ],
  },
  {
    label: "Firmenkunde",
    icon: Building2,
    color: "from-violet-600/20 to-violet-500/5",
    border: "border-violet-500/25",
    accent: "text-violet-400",
    badge: "7 Szenarien",
    sections: [
      {
        title: "Konten",
        items: [
          { label: "Kontoeröffnung Firma", href: "/firmenkunde/kontoeröffnung-firma" },
          { label: "Kontoeröffnung Sitzgesellschaft", href: "/firmenkunde/kontoeröffnung-sitzgesellschaft" },
        ],
      },
      {
        title: "Tragbarkeit",
        items: [
          { label: "Übersicht", href: "/firmenkunde/tragbarkeit" },
          { label: "Renditeobjekte", href: "/firmenkunde/tragbarkeit/renditeobjekt" },
          { label: "Gesamtengagement", href: "/firmenkunde/tragbarkeit/gesamtengagement" },
          { label: "Belastungsgrenze & ETP", href: "/firmenkunde/tragbarkeit/etp" },
          { label: "Gewerbeliegenschaft", href: "/firmenkunde/tragbarkeit/gewerbe" },
        ],
      },
    ],
  },
  {
    label: "Anlagekunde",
    icon: TrendingUp,
    color: "from-emerald-600/20 to-emerald-500/5",
    border: "border-emerald-500/25",
    accent: "text-emerald-400",
    badge: "32 Szenarien",
    sections: [
      {
        title: "Anlageberatung",
        items: [
          { label: "Anlegerprofil & Beratung", href: "/anlagekunde/anlegerprofil" },
          { label: "Obligationen", href: "/anlagekunde/obligationen" },
          { label: "Aktien & Kennzahlen", href: "/anlagekunde/aktien" },
          { label: "Anlagefonds & ETF", href: "/anlagekunde/fonds" },
          { label: "Simulation: Anlageberatung", href: "/anlagekunde/simulation" },
        ],
      },
      {
        title: "Produkte & Themen",
        items: [
          { label: "Strukturierte Produkte", href: "/anlagekunde/strukturierte-produkte" },
          { label: "Lombardkredit", href: "/anlagekunde/lombardkredit" },
          { label: "Vorsorge & 3a", href: "/anlagekunde/vorsorge-anlage" },
          { label: "Nachhaltige Anlagen ESG", href: "/anlagekunde/esg" },
          { label: "Währungsrisiken", href: "/anlagekunde/waehrungsrisiken" },
          { label: "Depotauszug lesen", href: "/anlagekunde/depotauszug" },
          { label: "Steuerliche Aspekte", href: "/anlagekunde/steuern" },
          { label: "Investmentbanking", href: "/anlagekunde/investmentbanking" },
        ],
      },
    ],
  },
];

const BACK_OFFICE = [
  {
    label: "Banking Operations",
    icon: Landmark,
    color: "from-amber-600/20 to-amber-500/5",
    border: "border-amber-500/25",
    accent: "text-amber-400",
    badge: "10 Szenarien",
    sections: [
      {
        title: "Themen",
        items: [
          { label: "Zahlungsverkehr", href: "/backoffice/banking-operations/zahlungsverkehr" },
          { label: "KYC / Compliance", href: "/backoffice/banking-operations/kyc" },
          { label: "Mahnwesen", href: "/backoffice/banking-operations/mahnwesen" },
        ],
      },
    ],
  },
  {
    label: "Credit Operations",
    icon: Settings2,
    color: "from-rose-600/20 to-rose-500/5",
    border: "border-rose-500/25",
    accent: "text-rose-400",
    badge: "15 Szenarien",
    sections: [
      {
        title: "Themen",
        items: [
          { label: "Übersicht", href: "/backoffice/credit-operations" },
          { label: "Sicherheitenverwaltung", href: "/backoffice/credit-operations/sicherheiten" },
          { label: "Grundpfand & Schuldbrief", href: "/backoffice/credit-operations/grundpfand" },
          { label: "Bürgschaften", href: "/backoffice/credit-operations/buergschaft" },
          { label: "Vorzeitige Rückzahlung", href: "/backoffice/credit-operations/vorzeitige-rueckzahlung" },
          { label: "Schuldbriefverwaltung", href: "/backoffice/credit-operations/schuldbrief" },
          { label: "Rating erfassen", href: "/backoffice/credit-operations/rating" },
        ],
      },
    ],
  },
  {
    label: "Credit Office",
    icon: Scale,
    color: "from-cyan-600/20 to-cyan-500/5",
    border: "border-cyan-500/25",
    accent: "text-cyan-400",
    badge: "4 Szenarien",
    sections: [
      {
        title: "Themen",
        items: [
          { label: "Privathypothek prüfen", href: "/backoffice/credit-office/hypothek" },
          { label: "Blankokredit prüfen", href: "/backoffice/credit-office/blankokredit" },
          { label: "Firmenkredit prüfen", href: "/backoffice/credit-office/firmenkredit" },
          { label: "Periodische Neubewilligung", href: "/backoffice/credit-office/neubewilligung" },
        ],
      },
    ],
  },
];

const TOOLS = [
  { label: "Challenge-Modus", icon: GraduationCap, href: "/challenge-modus", desc: "Level-3 Szenarien für die Abschlussprüfung" },
  { label: "Lernpfad", icon: Map, href: "/lernpfad", desc: "Strukturierter Pfad von Grundlagen bis Abschluss" },
  { label: "Statistiken", icon: BarChart2, href: "/statistiken", desc: "Dein Fortschritt im Überblick" },
  { label: "Badges", icon: Award, href: "/badges", desc: "Verdiente Auszeichnungen" },
  { label: "Fehler Übersicht", icon: AlertCircle, href: "/fehler-uebersicht", desc: "Was du nochmal anschauen solltest" },
  { label: "Notizen", icon: FileText, href: "/notizen", desc: "Deine persönlichen Lernnotizen" },
  { label: "Lesezeichen", icon: Bookmark, href: "/lesezeichen", desc: "Gespeicherte Szenarien" },
  { label: "Community", icon: MessageSquare, href: "/community", desc: "Austausch mit anderen Lernenden" },
];

/* ─── Sub-components ────────────────────────────────────────────────────────── */

function SectionLabel({ title }: { title: string }) {
  return (
    <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60 mb-1.5 mt-3 first:mt-0">
      {title}
    </p>
  );
}

function ModuleCard({
  label, icon: Icon, color, border, accent, badge, sections,
}: (typeof FRONT_OFFICE)[0]) {
  return (
    <div className={`rounded-2xl border ${border} bg-gradient-to-br ${color} p-5 flex flex-col gap-0`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-xl bg-background/40 border ${border} flex items-center justify-center flex-shrink-0`}>
            <Icon size={17} className={accent} strokeWidth={1.6} />
          </div>
          <div>
            <p className="font-bold text-sm text-foreground">{label}</p>
            <p className={`text-[11px] font-medium ${accent}`}>{badge}</p>
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="flex flex-col gap-0">
        {sections.map((sec) => (
          <div key={sec.title}>
            {sections.length > 1 && <SectionLabel title={sec.title} />}
            <ul className="flex flex-col gap-0.5">
              {sec.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group flex items-center justify-between rounded-lg px-2.5 py-1.5 text-[13px] text-muted-foreground hover:text-foreground hover:bg-background/50 transition-all"
                  >
                    <span>{item.label}</span>
                    <ChevronRight size={12} className="opacity-0 group-hover:opacity-60 transition-opacity flex-shrink-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Page ──────────────────────────────────────────────────────────────────── */

export default function ModulUebersichtPage() {
  return (
    <>
      <Header
        title="Modulübersicht"
        subtitle="Alle Lernbereiche auf einen Blick"
      />

      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="max-w-6xl mx-auto space-y-10">

          {/* Stat strip */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: "150+", label: "Szenarien" },
              { value: "6", label: "Module" },
              { value: "3", label: "Schwierigkeitsstufen" },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border border-border/50 bg-card p-4 text-center">
                <p className="text-2xl font-extrabold text-primary">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Front Office */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <BookOpen size={15} className="text-muted-foreground" />
              <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Front Office
              </h2>
              <div className="flex-1 h-px bg-border/50" />
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {FRONT_OFFICE.map((m) => (
                <ModuleCard key={m.label} {...m} />
              ))}
            </div>
          </section>

          {/* Back Office */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <BookOpen size={15} className="text-muted-foreground" />
              <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Back Office
              </h2>
              <div className="flex-1 h-px bg-border/50" />
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {BACK_OFFICE.map((m) => (
                <ModuleCard key={m.label} {...m} />
              ))}
            </div>
          </section>

          {/* Tools */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <BookOpen size={15} className="text-muted-foreground" />
              <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Lernwerkzeuge
              </h2>
              <div className="flex-1 h-px bg-border/50" />
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {TOOLS.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group flex items-start gap-3 rounded-xl border border-border/50 bg-card p-4 hover:border-primary/30 hover:bg-card/80 transition-all"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <tool.icon size={15} className="text-primary" strokeWidth={1.6} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                      {tool.label}
                    </p>
                    <p className="text-[11px] text-muted-foreground leading-snug mt-0.5">{tool.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
