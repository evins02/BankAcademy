"use client";

import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ScenarioCard } from "@/components/modules/ScenarioCard";
import { EmptyState } from "@/components/ui/empty-state";
import { Card, CardContent } from "@/components/ui/card";
import { SAMPLE_SCENARIOS } from "@/lib/constants";
import { useLanguage } from "@/context/LanguageContext";

const scenarios = SAMPLE_SCENARIOS.filter(
  (s) => s.module === "banking-operations"
);

export default function BankingOperationsPage() {
  const { t } = useLanguage();
  const bo = t.modules.bankingOps;

  const TOPICS = [
    {
      title: t.modules.backoffice.kontoeröffnungen.pageTitle,
      count: 3,
      icon: "🏦",
      href: "/banking-operations/kontoeröffnungen",
    },
    { title: t.modules.backoffice.zahlungsverkehr.pageTitle, count: 0, icon: "💸", href: "#" },
    { title: t.modules.backoffice.mahnwesen.pageTitle, count: 0, icon: "📋", href: "#" },
    { title: "Settlements", count: 0, icon: "🔄", href: "#" },
  ];

  return (
    <>
      <Header
        title={bo.pageTitle}
        subtitle={bo.pageSubtitle}
      />
      <Breadcrumb
        items={[
          { label: t.navItems["Dashboard"], href: "/dashboard" },
          { label: bo.pageTitle },
        ]}
      />
      <div className="flex-1 overflow-y-auto p-6">
        <section className="mb-8">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-secondary">
            {bo.themenbereiche}
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {TOPICS.map((topic) => (
              <Link
                key={topic.title}
                href={topic.href}
                className={topic.href === "#" ? "pointer-events-none" : ""}
              >
                <Card className="transition-shadow hover:shadow-md">
                  <CardContent className="flex flex-col items-center gap-2 py-4 text-center">
                    <span className="text-2xl">{topic.icon}</span>
                    <p className="text-sm font-medium text-text-primary">
                      {topic.title}
                    </p>
                    <p className="text-xs text-text-secondary">
                      {topic.count > 0 ? `${topic.count} ${bo.scenariosSuffix}` : bo.comingSoon}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-secondary">
            {bo.alleScenarios}
          </h2>
          {scenarios.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {scenarios.map((scenario) => (
                <ScenarioCard key={scenario.id} scenario={scenario} />
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
}
