"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Award, RefreshCw, ArrowLeft, ChevronRight, Share2, User, TrendingUp, Building2, Landmark, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CertificateModal } from "./CertificateModal";
import { ShareCard } from "./ShareCard";
import { Confetti } from "./Confetti";
import { getProgress } from "@/lib/progressData";
import { addXP } from "@/lib/xpData";
import { useLanguage } from "@/context/LanguageContext";

interface ModuleCompleteProps {
  moduleName: string;
  accuracy?: number;
  onRestart: () => void;
  onBack: () => void;
}

const NEXT_MODULES = [
  { id: "privatkunde", label: "Privatkunde", Icon: User, href: "/privatkunde" },
  { id: "anlagekunde", label: "Anlagekunde", Icon: TrendingUp, href: "/anlagekunde/anlegerprofil" },
  { id: "firmenkunde", label: "Firmenkunde", Icon: Building2, href: "/firmenkunde" },
  { id: "banking-operations", label: "Banking Operations", Icon: Landmark, href: "/backoffice" },
  { id: "credit-operations", label: "Credit Operations", Icon: Settings2, href: "/backoffice/credit-operations" },
];

function getRecommendations(skipModuleIds: string[]) {
  const prog = getProgress();

  const notStarted = NEXT_MODULES.filter(
    (m) => !skipModuleIds.includes(m.id) && !(prog[m.id]?.completed > 0)
  );
  if (notStarted.length >= 2) return notStarted.slice(0, 2);

  const lowScore = NEXT_MODULES.filter(
    (m) => !skipModuleIds.includes(m.id) && (prog[m.id]?.accuracy ?? 100) < 70 && (prog[m.id]?.completed ?? 0) > 0
  );

  return [...notStarted, ...lowScore].slice(0, 2);
}

export function ModuleComplete({ moduleName, accuracy, onRestart, onBack }: ModuleCompleteProps) {
  const { t } = useLanguage();
  const [showCert, setShowCert] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [confetti, setConfetti] = useState(true);
  const [userName, setUserName] = useState("");
  const [recommendations, setRecommendations] = useState<typeof NEXT_MODULES>([]);

  useEffect(() => {
    addXP(500);

    try {
      const raw = localStorage.getItem("user-profile");
      if (raw) {
        const profile = JSON.parse(raw);
        if (profile.name?.trim()) setUserName(profile.name.trim());
      }
    } catch {}

    setRecommendations(getRecommendations([]));

    const timer = setTimeout(() => setConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const displayName = userName || t.moduleComplete.learnerFallback;

  return (
    <>
      <Confetti active={confetti} />

      <div className="flex min-h-[70vh] items-center justify-center px-4 py-8">
        <div className="w-full max-w-md space-y-4">

          {/* Completion card */}
          <div className="rounded-2xl border border-border bg-surface p-6 shadow-xl text-center">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary-light">
              <Award size={40} className="text-primary" />
            </div>

            <h2 className="text-2xl font-bold text-text-primary">{t.moduleComplete.title}</h2>
            <p className="mt-1.5 text-sm text-text-secondary">{moduleName}</p>

            <div className="my-6 rounded-xl border border-primary/20 bg-primary-light p-4">
              <p className="text-base font-semibold text-primary">
                {t.moduleComplete.congrats.replace("{name}", displayName)}
              </p>
              <p className="mt-1 text-sm text-text-secondary">
                {t.moduleComplete.xpDesc}{" "}
                <span className="font-semibold text-primary">
                  {t.moduleComplete.xpEarned.replace("{xp}", "500")}
                </span>
              </p>
            </div>

            {accuracy !== undefined && accuracy < 70 && (
              <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-left">
                <p className="text-sm font-semibold text-amber-900">
                  {t.moduleComplete.lowAccuracyTitle.replace("{module}", moduleName)}
                </p>
                <p className="mt-1 text-xs text-amber-700">
                  {t.moduleComplete.lowAccuracyDesc
                    .replace("{module}", moduleName)
                    .replace("{pct}", String(accuracy))}
                </p>
                <button
                  onClick={onRestart}
                  className="mt-2 text-xs font-semibold text-amber-800 hover:underline"
                >
                  {t.moduleComplete.practiceAgain}
                </button>
              </div>
            )}

            <div className="space-y-2">
              <Button onClick={() => setShowCert(true)} className="w-full gap-2">
                <Award size={16} />
                {t.moduleComplete.showCert}
              </Button>
              <Button variant="secondary" onClick={() => setShowShare(true)} className="w-full gap-2">
                <Share2 size={14} />
                {t.moduleComplete.shareResult}
              </Button>
              <Button variant="secondary" onClick={onRestart} className="w-full">
                <RefreshCw size={14} />
                {t.moduleComplete.restartBtn}
              </Button>
              <button
                onClick={onBack}
                className="flex w-full items-center justify-center gap-1.5 text-xs text-text-secondary transition-colors hover:text-text-primary"
              >
                <ArrowLeft size={12} />
                {t.moduleComplete.backBtn}
              </button>
            </div>
          </div>

          {/* Recommendations */}
          {recommendations.length > 0 && (
            <div className="rounded-2xl border border-border bg-surface p-4 shadow-sm">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-secondary">
                {t.moduleComplete.recommendations}
              </p>
              <div className="space-y-2">
                {recommendations.map((m) => (
                  <Link
                    key={m.id}
                    href={m.href}
                    className="flex items-center gap-3 rounded-xl border border-border p-3 transition-colors hover:bg-gray-50"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary-light">
                      <m.Icon size={18} className="text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-text-primary">{m.label}</p>
                      <p className="text-xs text-text-secondary">
                        {t.moduleComplete.nextModuleReasons[m.id] ?? ""}
                      </p>
                    </div>
                    <ChevronRight size={14} className="shrink-0 text-text-secondary" />
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      <CertificateModal
        open={showCert}
        onClose={() => setShowCert(false)}
        moduleName={moduleName}
        userName={userName}
      />
      <ShareCard
        open={showShare}
        onClose={() => setShowShare(false)}
        title={moduleName}
        score={accuracy ?? 100}
        total={100}
        moduleName={moduleName}
        xpEarned={500}
      />
    </>
  );
}
