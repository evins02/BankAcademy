"use client";

import { useState, useEffect } from "react";
import { Award, RefreshCw, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CertificateModal } from "./CertificateModal";
import { Confetti } from "./Confetti";

interface ModuleCompleteProps {
  moduleName: string;
  onRestart: () => void;
  onBack: () => void;
}

export function ModuleComplete({ moduleName, onRestart, onBack }: ModuleCompleteProps) {
  const [showCert, setShowCert] = useState(false);
  const [confetti, setConfetti] = useState(true);
  const [userName, setUserName] = useState("Lernender");

  useEffect(() => {
    try {
      const raw = localStorage.getItem("user-profile");
      if (raw) {
        const profile = JSON.parse(raw);
        if (profile.name?.trim()) setUserName(profile.name.trim());
      }
    } catch {}
    const t = setTimeout(() => setConfetti(false), 5000);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <Confetti active={confetti} />

      <div className="flex min-h-[70vh] items-center justify-center px-4 py-8">
        <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-6 shadow-xl text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-yellow-100 text-5xl">
            🎓
          </div>

          <h2 className="text-2xl font-bold text-text-primary">Modul abgeschlossen!</h2>
          <p className="mt-1.5 text-sm text-text-secondary">{moduleName}</p>

          <div className="my-6 rounded-xl border border-primary/20 bg-primary-light p-4">
            <p className="text-base font-semibold text-primary">
              Herzlichen Glückwunsch, {userName}!
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              Du hast alle Level erfolgreich abgeschlossen.
            </p>
          </div>

          <div className="space-y-2">
            <Button onClick={() => setShowCert(true)} className="w-full gap-2">
              <Award size={16} />
              Zertifikat anzeigen
            </Button>
            <Button variant="secondary" onClick={onRestart} className="w-full">
              <RefreshCw size={14} />
              Nochmals absolvieren
            </Button>
            <button
              onClick={onBack}
              className="flex w-full items-center justify-center gap-1.5 text-xs text-text-secondary transition-colors hover:text-text-primary"
            >
              <ArrowLeft size={12} />
              Zurück zur Übersicht
            </button>
          </div>
        </div>
      </div>

      <CertificateModal
        open={showCert}
        onClose={() => setShowCert(false)}
        moduleName={moduleName}
        userName={userName}
      />
    </>
  );
}
