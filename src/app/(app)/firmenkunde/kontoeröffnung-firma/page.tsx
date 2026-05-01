import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FIRMENKUNDE_KONTO_SCENARIOS, type Difficulty } from "@/lib/kontoeröffnungen";

const DIFFICULTY_BADGE: Record<Difficulty, { label: string; variant: "green" | "orange" | "red" }> = {
  einfach: { label: "Einfach", variant: "green" },
  mittel:  { label: "Mittel",  variant: "orange" },
  schwer:  { label: "Schwer",  variant: "red" },
};

export default function KontoeröffnungFirmaPage() {
  return (
    <>
      <Header
        title="Kontoeröffnung Firma"
        subtitle="Dossiers prüfen und Dokumente auswählen"
      />
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Firmenkunde" },
          { label: "Kontoeröffnung Firma" },
        ]}
      />
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FIRMENKUNDE_KONTO_SCENARIOS.map((scenario) => {
            const diff = DIFFICULTY_BADGE[scenario.difficulty];
            return (
              <Card key={scenario.id} className="flex flex-col">
                <CardHeader>
                  <div className="mb-2">
                    <Badge variant={diff.variant}>{diff.label}</Badge>
                  </div>
                  <CardTitle>{scenario.title}</CardTitle>
                  <CardDescription>{scenario.description}</CardDescription>
                </CardHeader>
                <CardFooter className="mt-auto">
                  <Button asChild className="w-full">
                    <Link href={`/firmenkunde/kontoeröffnung-firma/${scenario.id}`}>
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
