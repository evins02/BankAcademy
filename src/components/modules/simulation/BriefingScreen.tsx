import { Clock, User, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BriefingScreenProps {
  onStart: () => void;
}

export function BriefingScreen({ onStart }: BriefingScreenProps) {
  return (
    <div className="flex flex-1 items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="rounded-DEFAULT bg-surface p-6 shadow-card">
          <div className="mb-4 flex items-center gap-2 text-text-secondary">
            <Clock size={14} />
            <span className="text-xs font-medium uppercase tracking-wider">
              Nächster Termin
            </span>
          </div>

          <div className="mb-6 flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gray-200 text-lg font-bold text-gray-600">
              TK
            </div>
            <div>
              <h2 className="text-xl font-bold text-text-primary">
                Thomas Kowalski
              </h2>
              <p className="text-sm text-text-secondary">28 Jahre</p>
              <p className="mt-1 text-sm font-medium text-text-primary">
                Anliegen: Kontoeröffnung Privatkonto
              </p>
            </div>
          </div>

          <div className="mb-6 flex items-start gap-2 rounded-DEFAULT border border-amber-200 bg-amber-50 p-3">
            <AlertCircle size={16} className="mt-0.5 shrink-0 text-amber-600" />
            <p className="text-sm text-amber-800">
              Kunde wirkt ungeduldig und stellt kritische Fragen.
            </p>
          </div>

          <div className="mb-6 space-y-2">
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <User size={14} className="text-primary" />
              <span>
                Ihre Rolle:{" "}
                <span className="font-medium text-text-primary">
                  Kundenberater/in
                </span>
              </span>
            </div>
          </div>

          <Button onClick={onStart} className="w-full">
            Gespräch starten
          </Button>
        </div>
      </div>
    </div>
  );
}
