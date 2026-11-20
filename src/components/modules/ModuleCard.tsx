import Link from "next/link";
import { type LucideIcon } from "lucide-react";
import { ProgressBar } from "@/components/ui/progress-bar";
import { useLanguage } from "@/context/LanguageContext";

export type ModuleStatus = "idle" | "active" | "done";

interface ModuleCardProps {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  status: ModuleStatus;
  completedScenarios: number;
  totalScenarios: number;
  recommended?: boolean;
}

export function ModuleCard({
  title,
  description,
  href,
  icon: Icon,
  status,
  completedScenarios,
  totalScenarios,
  recommended,
}: ModuleCardProps) {
  const { t } = useLanguage();

  const STATUS_CONFIG: Record<ModuleStatus, { label: string; className: string }> = {
    idle: { label: t.shared.statusIdle, className: "bg-gray-100 text-text-secondary" },
    active: { label: t.shared.statusActive, className: "bg-accent-light text-accent" },
    done: { label: t.shared.statusDone, className: "bg-primary-light text-primary" },
  };

  const s = STATUS_CONFIG[status];
  const pct = totalScenarios > 0 ? Math.round((completedScenarios / totalScenarios) * 100) : 0;

  return (
    <Link href={href} className="group block h-full">
      <div className={`flex h-full flex-col overflow-hidden rounded-2xl border bg-surface transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-lg ${recommended ? "border-green-300 shadow-sm shadow-green-100" : "border-border"}`}>
        {/* Gradient accent bar */}
        <div
          className="h-[3px] w-full flex-shrink-0"
          style={{ background: recommended ? "linear-gradient(90deg, #16a34a 0%, #4ade80 100%)" : "linear-gradient(90deg, #009E8D 0%, #00C9B1 100%)" }}
        />

        <div className="flex flex-1 flex-col p-5">
          {/* Icon + badge */}
          <div className="mb-4 flex items-start justify-between gap-2">
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
              style={{ background: recommended ? "#dcfce7" : "#E6FAF8" }}
            >
              <Icon size={24} style={{ color: recommended ? "#16a34a" : "#00C9B1" }} />
            </div>
            {recommended ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-1 text-[11px] font-semibold text-green-700">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                {t.shared.forYouBadge}
              </span>
            ) : (
              <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${s.className}`}>
                {status === "active" && <span className="h-1.5 w-1.5 rounded-full bg-accent" />}
                {s.label}
              </span>
            )}
          </div>

          {/* Title + description */}
          <h3 className="mb-1.5 text-base font-bold text-text-primary">{title}</h3>
          <p className="mb-4 flex-1 text-sm leading-relaxed text-text-secondary">{description}</p>

          {/* Progress */}
          <div className="mb-4">
            <div className="mb-1.5 flex items-center justify-between text-xs">
              <span className="text-text-secondary">{t.shared.moduleProgress}</span>
              <span className="font-bold text-text-primary">{pct}%</span>
            </div>
            <ProgressBar value={completedScenarios} max={Math.max(totalScenarios, 1)} />
            <p className="mt-1 text-[11px] text-text-secondary">
              {completedScenarios} / {totalScenarios} {t.shared.moduleScenarios}
            </p>
          </div>

          {/* CTA */}
          <div
            className="w-full rounded-full py-2.5 text-center text-sm font-bold text-white transition-opacity group-hover:opacity-90"
            style={{ background: recommended ? "#16a34a" : "#00C9B1" }}
          >
            {status === "idle"
              ? `${t.shared.ctaStart} →`
              : status === "active"
                ? `${t.shared.ctaContinue} →`
                : `${t.shared.ctaRepeat} →`}
          </div>
        </div>
      </div>
    </Link>
  );
}
