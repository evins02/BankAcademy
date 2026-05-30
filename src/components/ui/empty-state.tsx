import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Variant = "default" | "module-start" | "no-badges" | "no-errors";

interface EmptyStateProps {
  variant?: Variant;
  title?: string;
  subtitle?: string;
  href?: string;
  ctaLabel?: string;
}

function IllustrationDefault() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="20" width="60" height="45" rx="6" fill="#F3F4F6" stroke="#E5E7EB" strokeWidth="2"/>
      <rect x="20" y="32" width="25" height="3" rx="1.5" fill="#D1D5DB"/>
      <rect x="20" y="40" width="40" height="3" rx="1.5" fill="#D1D5DB"/>
      <rect x="20" y="48" width="32" height="3" rx="1.5" fill="#D1D5DB"/>
      <circle cx="54" cy="20" r="12" fill="#F3F4F6" stroke="#E5E7EB" strokeWidth="2"/>
      <line x1="50" y1="20" x2="58" y2="20" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round"/>
      <line x1="54" y1="16" x2="54" y2="24" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function IllustrationModuleStart() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="40" r="30" fill="#DCFCE7"/>
      <circle cx="40" cy="40" r="30" fill="#DCFCE7" stroke="#16A34A" strokeWidth="2" opacity="0.5"/>
      <polygon points="33,28 33,52 55,40" fill="#16A34A"/>
    </svg>
  );
}

function IllustrationNoBadges() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="33" r="20" fill="#FEF9C3" stroke="#EAB308" strokeWidth="2"/>
      <polygon points="30,53 40,65 50,53" fill="#EAB308"/>
      <text x="40" y="39" textAnchor="middle" fontSize="20" fill="#EAB308" dominantBaseline="middle">🏆</text>
    </svg>
  );
}

function IllustrationNoErrors() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="40" r="30" fill="#DCFCE7"/>
      <path d="M27 40l9 9 17-18" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

const CONFIGS: Record<Variant, {
  illustration: React.ReactNode;
  title: string;
  subtitle: string;
  ctaLabel?: string;
  href?: string;
}> = {
  default: {
    illustration: <IllustrationDefault />,
    title: "Noch keine Szenarien verfügbar",
    subtitle: "Dieser Bereich wird bald freigeschaltet.",
    ctaLabel: "Bald verfügbar",
  },
  "module-start": {
    illustration: <IllustrationModuleStart />,
    title: "Bereit anzufangen?",
    subtitle: "Wähle ein Level und starte dein erstes Szenario.",
    ctaLabel: "Zum Dashboard",
    href: "/dashboard",
  },
  "no-badges": {
    illustration: <IllustrationNoBadges />,
    title: "Noch keine Badges",
    subtitle: "Absolviere Module und erreiche Streaks, um Badges zu verdienen.",
    ctaLabel: "Zum Dashboard",
    href: "/dashboard",
  },
  "no-errors": {
    illustration: <IllustrationNoErrors />,
    title: "Keine Fehler!",
    subtitle: "Super – du hast noch keine Fehler gemacht. Weiter so!",
  },
};

export function EmptyState({ variant = "default", title, subtitle, href, ctaLabel }: EmptyStateProps) {
  const cfg = CONFIGS[variant];
  const displayTitle = title ?? cfg.title;
  const displaySubtitle = subtitle ?? cfg.subtitle;
  const displayCta = ctaLabel ?? cfg.ctaLabel;
  const displayHref = href ?? cfg.href;

  return (
    <Card className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4">{cfg.illustration}</div>
      <h3 className="mb-1 text-base font-semibold text-text-primary">{displayTitle}</h3>
      <p className="mb-6 max-w-xs text-sm text-text-secondary">{displaySubtitle}</p>
      {displayCta && (
        displayHref ? (
          <Link href={displayHref}>
            <Button variant="secondary" size="md">{displayCta}</Button>
          </Link>
        ) : (
          <Button variant="secondary" size="md" disabled>{displayCta}</Button>
        )
      )}
    </Card>
  );
}
