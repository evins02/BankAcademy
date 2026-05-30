"use client";

import { useEffect, useRef, useState } from "react";
import { X, Download, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ShareCardProps {
  open: boolean;
  onClose: () => void;
  title: string;
  score: number;
  total: number;
  moduleName: string;
  xpEarned?: number;
}

function drawShareCard(
  canvas: HTMLCanvasElement,
  title: string,
  score: number,
  total: number,
  moduleName: string,
  xpEarned: number
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const W = 800;
  const H = 420;
  canvas.width = W;
  canvas.height = H;

  // Background gradient
  const grad = ctx.createLinearGradient(0, 0, W, H);
  grad.addColorStop(0, "#0D1B4B");
  grad.addColorStop(1, "#1e3a8a");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // Decorative circles
  ctx.fillStyle = "rgba(255,255,255,0.04)";
  ctx.beginPath();
  ctx.arc(W - 80, 80, 160, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(60, H - 40, 120, 0, Math.PI * 2);
  ctx.fill();

  // Top accent line
  ctx.fillStyle = "#16A34A";
  ctx.fillRect(0, 0, W, 6);

  // Logo area
  ctx.fillStyle = "rgba(255,255,255,0.12)";
  ctx.roundRect(48, 40, 180, 36, 8);
  ctx.fill();
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "bold 16px system-ui, sans-serif";
  ctx.textAlign = "left";
  ctx.fillText("🏦 Banking Lab", 62, 63);

  // Module label
  ctx.fillStyle = "rgba(22,163,74,0.9)";
  ctx.roundRect(48, 102, 0, 28, 6);
  ctx.fill();

  // Module name pill
  const pillW = ctx.measureText(moduleName).width + 28;
  ctx.fillStyle = "rgba(22,163,74,0.25)";
  ctx.beginPath();
  ctx.roundRect(48, 98, pillW, 28, 14);
  ctx.fill();
  ctx.fillStyle = "#86efac";
  ctx.font = "13px system-ui, sans-serif";
  ctx.fillText(moduleName, 62, 117);

  // Title
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "bold 32px system-ui, sans-serif";
  ctx.textAlign = "left";
  const displayTitle = title.length > 40 ? title.slice(0, 40) + "…" : title;
  ctx.fillText(displayTitle, 48, 168);

  // Score
  const pct = total > 0 ? Math.round((score / total) * 100) : 0;
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "bold 72px system-ui, sans-serif";
  ctx.textAlign = "left";
  ctx.fillText(`${pct}%`, 48, 280);

  ctx.fillStyle = "rgba(255,255,255,0.5)";
  ctx.font = "18px system-ui, sans-serif";
  ctx.fillText(`${score} von ${total} richtig`, 48, 310);

  // XP badge
  if (xpEarned > 0) {
    ctx.fillStyle = "rgba(234,179,8,0.2)";
    ctx.beginPath();
    ctx.roundRect(48, 338, 130, 36, 18);
    ctx.fill();
    ctx.fillStyle = "#fde047";
    ctx.font = "bold 15px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(`⚡ +${xpEarned} XP`, 113, 361);
  }

  // Right side: circular progress
  const cx = W - 130;
  const cy = H / 2;
  const r = 80;

  ctx.strokeStyle = "rgba(255,255,255,0.15)";
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.stroke();

  const angle = (pct / 100) * Math.PI * 2 - Math.PI / 2;
  ctx.strokeStyle = pct >= 80 ? "#16A34A" : pct >= 60 ? "#f59e0b" : "#ef4444";
  ctx.lineWidth = 14;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.arc(cx, cy, r, -Math.PI / 2, angle);
  ctx.stroke();

  ctx.fillStyle = "#FFFFFF";
  ctx.font = "bold 26px system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(`${pct}%`, cx, cy + 10);

  // Footer
  ctx.fillStyle = "rgba(255,255,255,0.3)";
  ctx.font = "12px system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("app.bankinglab.ch", W / 2, H - 20);
}

export function ShareCard({
  open,
  onClose,
  title,
  score,
  total,
  moduleName,
  xpEarned = 0,
}: ShareCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (open && canvasRef.current) {
      drawShareCard(canvasRef.current, title, score, total, moduleName, xpEarned);
    }
  }, [open, title, score, total, moduleName, xpEarned]);

  function handleDownload() {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.download = `bankinglab-${moduleName.toLowerCase().replace(/\s+/g, "-")}.png`;
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
  }

  function handleCopyLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function handleLinkedIn() {
    const text = encodeURIComponent(
      `Ich habe gerade "${title}" im Banking Lab abgeschlossen – ${Math.round((score / total) * 100)}% richtig! 🏦📈`
    );
    const url = encodeURIComponent("https://app.bankinglab.ch");
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&summary=${text}`, "_blank");
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-2xl rounded-2xl bg-surface shadow-2xl">
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-text-primary">Ergebnis teilen</h2>
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
            <canvas ref={canvasRef} className="w-full" style={{ display: "block" }} />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-2 border-t border-border px-6 py-4">
          <Button variant="secondary" onClick={handleCopyLink} className="gap-2">
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? "Kopiert!" : "Link kopieren"}
          </Button>
          <Button variant="secondary" onClick={handleLinkedIn} className="gap-2">
            🔗 LinkedIn
          </Button>
          <Button onClick={handleDownload} className="gap-2">
            <Download size={14} />
            PNG speichern
          </Button>
        </div>
      </div>
    </div>
  );
}
