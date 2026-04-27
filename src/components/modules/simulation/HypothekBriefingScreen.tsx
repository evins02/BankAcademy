import { Clock, AlertCircle, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HypothekBriefingScreenProps {
  onStart: () => void;
}

export function HypothekBriefingScreen({ onStart }: HypothekBriefingScreenProps) {
  return (
    <div className="flex flex-1 items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="rounded-DEFAULT bg-surface p-6 shadow-card">
          <div className="mb-4 flex items-center gap-2 text-text-secondary">
            <Clock size={14} />
            <span className="text-xs font-medium uppercase tracking-wider">
              Ihr nächster Termin
            </span>
          </div>

          <div className="mb-6 flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-100 text-lg font-bold text-blue-600">
              SB
            </div>
            <div>
              <h2 className="text-xl font-bold text-text-primary">
                Sarah & Marco Bianchi
              </h2>
              <p className="text-sm text-text-secondary">Hypothekengespräch – Eigenheim</p>
            </div>
          </div>

          <div className="mb-5 space-y-2 rounded-DEFAULT bg-background p-4">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
              Kundendossier
            </p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
              <span className="text-text-secondary">Sarah, 34 J.</span>
              <span className="text-text-primary">60%, CHF 48&apos;000/Jahr</span>
              <span className="text-text-secondary">Marco, 36 J.</span>
              <span className="text-text-primary">100%, CHF 120&apos;000/Jahr</span>
              <span className="text-text-secondary">Bruttoeinkommen</span>
              <span className="font-semibold text-text-primary">CHF 168&apos;000/Jahr</span>
              <span className="text-text-secondary">Kaufobjekt</span>
              <span className="text-text-primary">EFH Zürich, CHF 1&apos;200&apos;000</span>
              <span className="text-text-secondary">Eigenkapital</span>
              <span className="font-semibold text-text-primary">CHF 280&apos;000</span>
              <span className="text-text-secondary">davon 3a</span>
              <span className="text-text-primary">CHF 60&apos;000</span>
            </div>
          </div>

          <div className="mb-6 flex items-start gap-2 rounded-DEFAULT border border-amber-200 bg-amber-50 p-3">
            <AlertCircle size={16} className="mt-0.5 shrink-0 text-amber-600" />
            <p className="text-sm text-amber-800">
              Kunden sind aufgeregt und stellen viele Fragen.
            </p>
          </div>

          <div className="mb-6 flex items-center gap-2 text-sm text-text-secondary">
            <User size={14} className="text-primary" />
            <span>
              Ihre Rolle:{" "}
              <span className="font-medium text-text-primary">Kundenberater/in</span>
            </span>
          </div>

          <Button onClick={onStart} className="w-full">
            Gespräch starten
          </Button>
        </div>
      </div>
    </div>
  );
}
