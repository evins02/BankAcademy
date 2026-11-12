"use client";

import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import Link from "next/link";
import { Home, CreditCard, Building2, RefreshCw, Clock, Star, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/context/LanguageContext";

export default function CreditOfficeHubPage() {
  const { t } = useLanguage();
  const co = t.modules.backoffice.creditOffice;

  const MODULES = [
    {
      href: "/backoffice/credit-office/hypothek",
      badge: "Level 3",
      badgeVariant: "red" as const,
      icon: Home,
      title: co.hypothekTitle,
      desc: co.hypothekDesc,
      time: "10 Min",
      xp: "+200 XP",
    },
    {
      href: "/backoffice/credit-office/blankokredit",
      badge: "Level 2",
      badgeVariant: "orange" as const,
      icon: CreditCard,
      title: co.blankokreditTitle,
      desc: co.blankokreditDesc,
      time: "7 Min",
      xp: "+150 XP",
    },
    {
      href: "/backoffice/credit-office/firmenkredit",
      badge: "Level 3",
      badgeVariant: "red" as const,
      icon: Building2,
      title: co.firmenkreditTitle,
      desc: co.firmenkreditDesc,
      time: "10 Min",
      xp: "+200 XP",
    },
    {
      href: "/backoffice/credit-office/neubewilligung",
      badge: "Level 2",
      badgeVariant: "orange" as const,
      icon: RefreshCw,
      title: co.neubewilligungTitle,
      desc: co.neubewilligungDesc,
      time: "7 Min",
      xp: "+150 XP",
    },
  ];

  return (
    <>
      <Header
        title={co.pageTitle}
        subtitle={co.pageSubtitle}
      />
      <Breadcrumb
        items={[
          { label: t.navItems["Dashboard"], href: "/dashboard" },
          { label: t.modules.backoffice.pageTitle, href: "/backoffice" },
          { label: co.pageTitle },
        ]}
      />
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-2xl space-y-6">
          <p className="text-sm text-text-secondary">
            {co.roleDesc}
          </p>

          <Link
            href="/backoffice/credit-office/dokument-pruefen"
            className="flex items-center gap-4 rounded-xl border bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
            style={{ borderLeftWidth: 4, borderLeftColor: "#1ddba0" }}
          >
            <span className="shrink-0 text-2xl">📋</span>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-gray-900">{co.dokumentPruefenTitle}</p>
                <span className="rounded-full px-2 py-0.5 text-[10px] font-bold" style={{ background: "#d1faf0", color: "#0a8a64" }}>
                  {co.newBadge}
                </span>
              </div>
              <p className="mt-0.5 text-xs text-gray-500">
                {co.dokumentPruefenDesc}
              </p>
            </div>
            <ChevronRight size={14} className="shrink-0 text-gray-400" />
          </Link>

          <div className="grid gap-4 sm:grid-cols-2">
            {MODULES.map((m) => {
              const Icon = m.icon;
              return (
                <div key={m.href} className="flex flex-col gap-4 rounded-DEFAULT bg-surface p-6 shadow-card">
                  <div className="flex items-start justify-between">
                    <Badge variant={m.badgeVariant}>{m.badge}</Badge>
                    <Icon size={18} className="text-text-secondary shrink-0" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-text-primary mb-2">{m.title}</h3>
                    <p className="text-sm text-text-secondary leading-relaxed">{m.desc}</p>
                    <div className="mt-3 flex flex-wrap gap-2 text-xs text-text-secondary">
                      <span className="flex items-center gap-1"><Clock size={10} /> {m.time}</span>
                      <span className="text-text-secondary/40">·</span>
                      <span className="flex items-center gap-1"><Star size={10} /> {m.xp}</span>
                    </div>
                  </div>
                  <Link
                    href={m.href}
                    className="w-full rounded-DEFAULT py-2 px-4 text-sm font-semibold text-center transition-colors"
                    style={{ background: "var(--primary, #0D1B4B)", color: "#fff" }}
                  >
                    {co.startBtn}
                  </Link>
                </div>
              );
            })}
          </div>

          <div
            className="rounded-DEFAULT p-4 text-sm text-text-secondary"
            style={{ background: "rgba(13,27,75,0.04)", border: "1px solid rgba(13,27,75,0.08)" }}
          >
            <p className="font-semibold text-text-primary mb-1">{co.roleInfoTitle}</p>
            <p>
              {co.roleInfoText}{" "}
              <span className="font-semibold text-text-primary">{co.decisionApprove}</span> →{" "}
              <span className="font-semibold text-text-primary">{co.decisionApproveConditions}</span> →{" "}
              <span className="font-semibold text-text-primary">{co.decisionQuery}</span> →{" "}
              <span className="font-semibold text-text-primary">{co.decisionReject}</span>.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
