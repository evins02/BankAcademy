"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Printer } from "lucide-react";
import { getProgress, type ModuleProgress } from "@/lib/progressData";

const MODULE_NAMES: Record<string, string> = {
  privatkunde: "Privatkunde",
  firmenkunde: "Firmenkunde",
  anlagekunde: "Anlagekunde",
  "banking-operations": "Banking Operations",
  "credit-operations": "Kreditgeschäft",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("de-CH", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function ZertifikatPage() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const [progress, setProgress] = useState<ModuleProgress | null>(null);
  const [name, setName] = useState("Lernender");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const prog = getProgress();
    setProgress(prog[moduleId] ?? null);
    try {
      const raw = localStorage.getItem("user-profile");
      if (raw) {
        const p = JSON.parse(raw);
        if (p.name?.trim()) setName(p.name.trim());
      }
    } catch {}
    setLoaded(true);
  }, [moduleId]);

  const moduleName = MODULE_NAMES[moduleId] ?? moduleId;
  const date = progress?.lastAttempt ? formatDate(progress.lastAttempt) : formatDate(new Date().toISOString());
  const accuracy = progress?.accuracy ?? 0;
  const completed = progress?.completed ?? 0;
  const total = progress?.total ?? 0;

  return (
    <>
      {/* Screen-only controls */}
      <div className="flex items-center justify-between border-b border-border bg-surface px-6 py-4 print:hidden">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary"
        >
          <ArrowLeft size={16} />
          Zurück zum Dashboard
        </Link>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold text-white transition-opacity hover:opacity-85"
          style={{ background: "#0D1B4B" }}
        >
          <Printer size={15} />
          Zertifikat drucken / speichern
        </button>
      </div>

      {/* Preview wrapper */}
      <div className="flex min-h-screen items-center justify-center bg-gray-100 p-8 print:block print:min-h-0 print:bg-white print:p-0">
        <div
          id="certificate"
          style={{
            width: "297mm",
            minHeight: "210mm",
            background: "#fff",
            position: "relative",
            padding: "24mm 28mm",
            fontFamily: "'Georgia', 'Times New Roman', serif",
            boxShadow: "0 8px 48px rgba(0,0,0,0.15)",
          }}
        >
          {/* Gold outer border */}
          <div
            style={{
              position: "absolute",
              inset: 8,
              border: "3px solid #C9A227",
              borderRadius: 4,
              pointerEvents: "none",
            }}
          />
          {/* Inner decorative border */}
          <div
            style={{
              position: "absolute",
              inset: 14,
              border: "1px solid rgba(201,162,39,0.4)",
              borderRadius: 2,
              pointerEvents: "none",
            }}
          />

          {/* Header row */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32 }}>
            {/* Logo / brand */}
            <div>
              <p style={{ margin: 0, fontSize: 20, fontWeight: 800, letterSpacing: "-0.5px", fontFamily: "system-ui, sans-serif", color: "#0D1B4B" }}>
                Bank<span style={{ color: "#00C9B1" }}>Academy</span>
              </p>
              <p style={{ margin: "4px 0 0", fontSize: 10, color: "#9ca3af", fontFamily: "system-ui, sans-serif", letterSpacing: "0.05em" }}>
                Digitaler Praxisausbildner · Schweiz
              </p>
            </div>

            {/* Swiss banking label */}
            <div style={{ textAlign: "right" }}>
              <p style={{ margin: 0, fontSize: 10, color: "#9ca3af", fontFamily: "system-ui, sans-serif" }}>
                Swiss Banking Education
              </p>
            </div>
          </div>

          {/* Title */}
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <p style={{ margin: "0 0 8px", fontSize: 11, fontFamily: "system-ui, sans-serif", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.25em", color: "#C9A227" }}>
              Zertifikat
            </p>
            <div style={{ width: 80, height: 2, background: "linear-gradient(90deg, transparent, #C9A227, transparent)", margin: "0 auto 20px" }} />
            <p style={{ margin: 0, fontSize: 14, color: "#6b7280", fontFamily: "system-ui, sans-serif" }}>
              Hiermit wird bestätigt, dass
            </p>
          </div>

          {/* Name */}
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <p style={{ margin: 0, fontSize: 38, fontWeight: 700, color: "#0D1B4B", letterSpacing: "-0.5px", lineHeight: 1.1 }}>
              {loaded ? name : "···"}
            </p>
          </div>

          {/* Achievement text */}
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <p style={{ margin: "0 0 6px", fontSize: 14, color: "#374151", fontFamily: "system-ui, sans-serif", lineHeight: 1.6 }}>
              das Modul
            </p>
            <p style={{ margin: "0 0 6px", fontSize: 22, fontWeight: 700, color: "#0D1B4B", fontFamily: "system-ui, sans-serif" }}>
              {moduleName}
            </p>
            <p style={{ margin: "0 0 6px", fontSize: 14, color: "#374151", fontFamily: "system-ui, sans-serif" }}>
              erfolgreich abgeschlossen hat
            </p>
          </div>

          {/* Stats row */}
          <div style={{ display: "flex", justifyContent: "center", gap: 48, marginBottom: 36 }}>
            <div style={{ textAlign: "center" }}>
              <p style={{ margin: 0, fontSize: 26, fontWeight: 700, color: "#0D1B4B", fontFamily: "system-ui, sans-serif" }}>
                {accuracy}%
              </p>
              <p style={{ margin: "2px 0 0", fontSize: 11, color: "#9ca3af", fontFamily: "system-ui, sans-serif", letterSpacing: "0.05em" }}>
                GENAUIGKEIT
              </p>
            </div>
            <div style={{ width: 1, background: "#e5e7eb" }} />
            <div style={{ textAlign: "center" }}>
              <p style={{ margin: 0, fontSize: 26, fontWeight: 700, color: "#0D1B4B", fontFamily: "system-ui, sans-serif" }}>
                {completed}/{total}
              </p>
              <p style={{ margin: "2px 0 0", fontSize: 11, color: "#9ca3af", fontFamily: "system-ui, sans-serif", letterSpacing: "0.05em" }}>
                SZENARIEN
              </p>
            </div>
            <div style={{ width: 1, background: "#e5e7eb" }} />
            <div style={{ textAlign: "center" }}>
              <p style={{ margin: 0, fontSize: 26, fontWeight: 700, color: "#0D1B4B", fontFamily: "system-ui, sans-serif" }}>
                {date}
              </p>
              <p style={{ margin: "2px 0 0", fontSize: 11, color: "#9ca3af", fontFamily: "system-ui, sans-serif", letterSpacing: "0.05em" }}>
                DATUM
              </p>
            </div>
          </div>

          {/* Decorative seal */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 24 }}>
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                border: "3px solid #C9A227",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(201,162,39,0.05)",
              }}
            >
              <span style={{ fontSize: 28 }}>🏅</span>
            </div>
            <p style={{ margin: "10px 0 0", fontSize: 10, color: "#9ca3af", fontFamily: "system-ui, sans-serif", letterSpacing: "0.06em", textTransform: "uppercase" }}>
              BankAcademy · Digitaler Praxisausbildner
            </p>
          </div>

          {/* Divider */}
          <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: 12, textAlign: "center" }}>
            <p style={{ margin: 0, fontSize: 10, color: "#9ca3af", fontFamily: "system-ui, sans-serif" }}>
              Dieses Zertifikat wurde digital ausgestellt durch BankAcademy – Der digitale Praxisausbildner für die Banklehre
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media print {
          @page { size: A4 landscape; margin: 0; }
          body { margin: 0; }
          .print\\:hidden { display: none !important; }
          #certificate { box-shadow: none !important; width: 100% !important; min-height: 100vh !important; }
        }
      `}</style>
    </>
  );
}
