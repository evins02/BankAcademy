"use client";

import Link from "next/link";
import { Clock, ChevronRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StatusDot } from "@/components/ui/status-dot";
import type { Scenario } from "@/types";
import { useLanguage } from "@/context/LanguageContext";

const difficultyVariants = {
  beginner: "green" as const,
  intermediate: "orange" as const,
  advanced: "neutral" as const,
};

const roleMap: Record<string, string> = {
  "relationship-manager": "Relationship Manager",
  "credit-office": "Kreditstelle",
  "credit-operations": "Kreditabwicklung",
  "compliance-officer": "Compliance Officer",
};

interface ScenarioCardProps {
  scenario: Scenario;
}

export function ScenarioCard({ scenario }: ScenarioCardProps) {
  const { t } = useLanguage();
  const diffLabels = {
    beginner: t.scenarioChrome.levelBeginner,
    intermediate: t.scenarioChrome.levelIntermediate,
    advanced: t.scenarioChrome.levelAdvanced,
  };
  const diff = { label: diffLabels[scenario.difficulty], variant: difficultyVariants[scenario.difficulty] };
  const href = `/${scenario.module}/scenarios/${scenario.id}`;

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="mb-2 flex items-start justify-between gap-2">
          <Badge variant={diff.variant}>{diff.label}</Badge>
          <StatusDot status={scenario.status} showLabel={false} />
        </div>
        <CardTitle>{scenario.title}</CardTitle>
        <CardDescription className="line-clamp-2">
          {scenario.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="flex flex-wrap gap-1.5">
          {scenario.tags.map((tag) => (
            <Badge key={tag} variant="neutral">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="justify-between border-t border-border pt-4">
        <div className="flex items-center gap-1.5 text-xs text-text-secondary">
          <Clock size={13} />
          <span>{scenario.durationMinutes} Min.</span>
          <span className="mx-1">·</span>
          <span>{roleMap[scenario.role] ?? scenario.role}</span>
        </div>
        <Button variant="secondary" size="sm" asChild>
          <Link href={href}>
            {t.scenarioChrome.startBtn} <ChevronRight size={14} />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
