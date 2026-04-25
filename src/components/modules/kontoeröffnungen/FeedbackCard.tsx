import Link from "next/link";
import { CheckCircle2, RotateCcw, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DOCUMENT_LABELS, type KontoScenario } from "@/lib/kontoeröffnungen";

interface Score {
  correct: number;
  total: number;
}

interface Props {
  scenario: KontoScenario;
  phase1Score: Score;
  phase2Score: Score;
  nextScenarioId?: string;
  basePath?: string;
  onRetry: () => void;
}

function ScoreRing({ correct, total }: Score) {
  const pct = total === 0 ? 0 : Math.round((correct / total) * 100);
  const color = pct === 100 ? "text-primary" : pct >= 50 ? "text-accent" : "text-red-500";
  return (
    <div className="flex flex-col items-center">
      <span className={`text-3xl font-bold ${color}`}>{pct}%</span>
      <span className="text-xs text-text-secondary">
        {correct}/{total} korrekt
      </span>
    </div>
  );
}

export function FeedbackCard({
  scenario,
  phase1Score,
  phase2Score,
  nextScenarioId,
  basePath = "/banking-operations/kontoeröffnungen",
  onRetry,
}: Props) {
  const totalCorrect = phase1Score.correct + phase2Score.correct;
  const totalPossible = phase1Score.total + phase2Score.total;
  const overallPct = Math.round((totalCorrect / totalPossible) * 100);

  return (
    <div className="flex flex-col gap-4">
      {/* Score summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 size={18} className="text-primary" />
            Auswertung abgeschlossen
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6 grid grid-cols-3 divide-x divide-border text-center">
            <div className="pr-6">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-text-secondary">
                Phase 1
              </p>
              <ScoreRing {...phase1Score} />
            </div>
            <div className="px-6">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-text-secondary">
                Phase 2
              </p>
              <ScoreRing {...phase2Score} />
            </div>
            <div className="pl-6">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-text-secondary">
                Gesamt
              </p>
              <div className="flex flex-col items-center">
                <span
                  className={`text-3xl font-bold ${
                    overallPct === 100
                      ? "text-primary"
                      : overallPct >= 50
                        ? "text-accent"
                        : "text-red-500"
                  }`}
                >
                  {overallPct}%
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="secondary" onClick={onRetry}>
              <RotateCcw size={14} />
              Nochmal versuchen
            </Button>
            {nextScenarioId ? (
              <Button asChild>
                <Link
                  href={`${basePath}/${nextScenarioId}`}
                >
                  Nächstes Szenario
                  <ChevronRight size={14} />
                </Link>
              </Button>
            ) : (
              <Button asChild>
                <Link href={basePath}>
                  Zurück zur Übersicht
                </Link>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Per-issue explanations */}
      <Card>
        <CardHeader>
          <CardTitle>Erklärungen</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {scenario.issues.map((issue) => (
            <div key={issue.documentId} className="flex gap-3">
              <div
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${
                  issue.type === "missing" ? "bg-amber-500" : "bg-red-500"
                }`}
              >
                {issue.type === "missing" ? "?" : "!"}
              </div>
              <div>
                <p className="text-sm font-medium text-text-primary">
                  {issue.type === "missing" ? "Fehlendes Dokument: " : "Falsches Dokument: "}
                  {DOCUMENT_LABELS[issue.documentId]}
                </p>
                <p className="mt-0.5 text-sm text-text-secondary">
                  {issue.explanation}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
