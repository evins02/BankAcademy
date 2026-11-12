"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { KONTO_SCENARIOS, type Difficulty } from "@/lib/kontoeröffnungen";
import { useLanguage } from "@/context/LanguageContext";

const DIFFICULTY_BADGE: Record<Difficulty, { variant: "green" | "orange" | "red" }> = {
  einfach: { variant: "green" },
  mittel:  { variant: "orange" },
  schwer:  { variant: "red" },
};

export default function KontoeröffnungenPage() {
  const { t } = useLanguage();
  const bko = t.modules.backoffice;
  return (
    <>
      <Header
        title={bko.kontoeröffnungen.pageTitle}
        subtitle={bko.kontoeröffnungen.pageSubtitle}
      />
      <Breadcrumb
        items={[
          { label: t.navItems["Dashboard"], href: "/dashboard" },
          { label: bko.pageTitle, href: "/backoffice" },
          { label: bko.bankingOps.pageTitle, href: "/backoffice/banking-operations" },
          { label: bko.kontoeröffnungen.pageTitle },
        ]}
      />
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {KONTO_SCENARIOS.map((scenario) => {
            const diff = DIFFICULTY_BADGE[scenario.difficulty];
            return (
              <Card key={scenario.id} className="flex flex-col">
                <CardHeader>
                  <div className="mb-2">
                    <Badge variant={diff.variant}>{scenario.difficulty}</Badge>
                  </div>
                  <CardTitle>{scenario.title}</CardTitle>
                  <CardDescription>{scenario.description}</CardDescription>
                </CardHeader>
                <CardFooter className="mt-auto">
                  <Button asChild className="w-full">
                    <Link
                      href={`/backoffice/banking-operations/kontoeröffnungen/${scenario.id}`}
                    >
                      Starten <ChevronRight size={14} />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </>
  );
}
