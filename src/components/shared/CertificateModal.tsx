"use client";

import { useEffect, useRef } from "react";
import { X, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CertificateModalProps {
  open: boolean;
  onClose: () => void;
  moduleName: string;
  userName?: string;
  completedAt?: string;
}

function drawCertificate(
  canvas: HTMLCanvasElement,
  moduleName: string,
  userName: string,
  completedAt: string
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const W = 900;
  const H = 640;
  canvas.width = W;
  canvas.height = H;

  // Background
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, W, H);

  // Navy border frame
  ctx.strokeStyle = "#0D1B4B";
  ctx.lineWidth = 12;
  ctx.strokeRect(24, 24, W - 48, H - 48);

  // Inner teal accent line
  ctx.strokeStyle = "#00C9B1";
  ctx.lineWidth = 3;
  ctx.strokeRect(36, 36, W - 72, H - 72);

  // Navy header band
  ctx.fillStyle = "#0D1B4B";
  ctx.fillRect(24, 24, W - 48, 110);

  // Header text
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "bold 28px Georgia, serif";
  ctx.textAlign = "center";
  ctx.fillText("BANKING LAB", W / 2, 70);

  ctx.fillStyle = "#00C9B1";
  ctx.font = "14px Georgia, serif";
  ctx.letterSpacing = "4px";
  ctx.fillText("ZERTIFIKAT", W / 2, 102);

  // Reset letter spacing
  ctx.letterSpacing = "0px";

  // "Hiermit wird bestätigt dass"
  ctx.fillStyle = "#6B7280";
  ctx.font = "16px Georgia, serif";
  ctx.textAlign = "center";
  ctx.fillText("Hiermit wird bestätigt, dass", W / 2, 185);

  // Name
  ctx.fillStyle = "#0D1B4B";
  ctx.font = "bold 38px Georgia, serif";
  ctx.fillText(userName, W / 2, 240);

  // Divider line under name
  ctx.strokeStyle = "#00C9B1";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(W / 2 - 180, 258);
  ctx.lineTo(W / 2 + 180, 258);
  ctx.stroke();

  // "das Modul erfolgreich abgeschlossen hat"
  ctx.fillStyle = "#6B7280";
  ctx.font = "16px Georgia, serif";
  ctx.fillText("das folgende Modul erfolgreich abgeschlossen hat:", W / 2, 300);

  // Module name
  ctx.fillStyle = "#0D1B4B";
  ctx.font = "bold 30px Georgia, serif";
  ctx.fillText(moduleName, W / 2, 355);

  // Date
  ctx.fillStyle = "#9CA3AF";
  ctx.font = "14px Georgia, serif";
  ctx.fillText(`Abschluss: ${completedAt}`, W / 2, 405);

  // Decorative teal circles
  ctx.fillStyle = "rgba(0,201,177,0.08)";
  ctx.beginPath();
  ctx.arc(80, H - 60, 60, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "rgba(13,27,75,0.05)";
  ctx.beginPath();
  ctx.arc(W - 80, H - 60, 80, 0, Math.PI * 2);
  ctx.fill();

  // Footer
  ctx.fillStyle = "#0D1B4B";
  ctx.font = "bold 13px Georgia, serif";
  ctx.fillText("Banking Lab · Switzerland", W / 2, H - 55);

  ctx.fillStyle = "#9CA3AF";
  ctx.font = "11px Georgia, serif";
  ctx.fillText("app.bankinglab.ch", W / 2, H - 36);
}

export function CertificateModal({
  open,
  onClose,
  moduleName,
  userName = "Lernender",
  completedAt,
}: CertificateModalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const dateStr = completedAt
    ? new Date(completedAt).toLocaleDateString("de-CH", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : new Date().toLocaleDateString("de-CH", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });

  useEffect(() => {
    if (open && canvasRef.current) {
      drawCertificate(canvasRef.current, moduleName, userName, dateStr);
    }
  }, [open, moduleName, userName, dateStr]);

  function handleDownload() {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.download = `zertifikat-${moduleName.toLowerCase().replace(/\s+/g, "-")}.png`;
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-3xl rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-text-primary">Dein Zertifikat</h2>
            <p className="text-sm text-text-secondary">{moduleName}</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-text-secondary hover:bg-gray-100 hover:text-text-primary"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6">
          <div className="overflow-hidden rounded-xl border border-border">
            <canvas
              ref={canvasRef}
              className="w-full"
              style={{ display: "block" }}
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-border px-6 py-4">
          <Button variant="secondary" onClick={onClose}>
            Schliessen
          </Button>
          <Button onClick={handleDownload} className="gap-2">
            <Download size={15} />
            PNG herunterladen
          </Button>
        </div>
      </div>
    </div>
  );
}
