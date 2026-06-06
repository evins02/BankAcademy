"use client";

import { useEffect, useState } from "react";
import { Confetti } from "@/components/shared/Confetti";
import type { Badge } from "@/lib/progressData";

interface BadgeEarnAnimationProps {
  badge: Badge;
  onClose: () => void;
}

const BADGE_MESSAGES: Record<string, string> = {
  "erster-tag": "Willkommen bei BankAcademy!",
  "wissensdurst": "Du liebst es zu lernen!",
  "scharfschuetze": "Keine Fehler – beeindruckend!",
  "comeback-kid": "Aufgeben ist keine Option!",
  "banking-insider": "Du kennst die Banking-Regeln!",
  "unaufhaltbar": "Zwei Wochen am Stück – Respekt!",
  "lap-bereit": "Du bist bereit für die Prüfung!",
  "bankacademy-pro": "Du hast alles gemeistert!",
  "first-steps": "Der erste Schritt ist getan!",
  "streak-3": "3 Tage am Stück – stark!",
  "streak-7": "Eine ganze Woche – respektabel!",
  "streak-30": "30 Tage – unglaublich!",
  "accuracy-90": "Sehr genaue Arbeit!",
  "accuracy-100": "Absolut makellos!",
  "all-front-office": "Front Office gemeistert!",
  "all-back-office": "Back Office gemeistert!",
};

export function BadgeEarnAnimation({ badge, onClose }: BadgeEarnAnimationProps) {
  const [visible, setVisible] = useState(false);
  const message = BADGE_MESSAGES[badge.id] ?? badge.description;

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <Confetti active={visible} />
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center p-6"
        style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)" }}
        onClick={onClose}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "scale(1)" : "scale(0.8)",
            transition: "opacity 0.35s ease, transform 0.35s cubic-bezier(0.175,0.885,0.32,1.275)",
            background: "linear-gradient(135deg, #0D1B4B 0%, #0e2a5a 100%)",
            border: "1px solid rgba(0,201,177,0.3)",
            borderRadius: 24,
            padding: "48px 40px",
            textAlign: "center",
            maxWidth: 380,
            width: "100%",
            boxShadow: "0 40px 100px rgba(0,0,0,0.5), 0 0 60px rgba(0,201,177,0.15)",
          }}
        >
          {/* Glow ring */}
          <div
            style={{
              width: 100,
              height: 100,
              borderRadius: "50%",
              background: "rgba(0,201,177,0.1)",
              border: "2px solid rgba(0,201,177,0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
              fontSize: 48,
              animation: visible ? "badgePop 0.5s cubic-bezier(0.175,0.885,0.32,1.275) forwards" : "none",
            }}
          >
            {badge.icon}
          </div>

          <p style={{ margin: "0 0 6px", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#00C9B1" }}>
            Badge verdient!
          </p>
          <h2 style={{ margin: "0 0 8px", fontSize: 26, fontWeight: 800, color: "#fff", letterSpacing: "-0.5px" }}>
            {badge.title}
          </h2>
          <p style={{ margin: "0 0 28px", fontSize: 15, color: "rgba(255,255,255,0.65)", lineHeight: 1.5 }}>
            {message}
          </p>

          <button
            onClick={onClose}
            style={{
              width: "100%",
              padding: "13px 24px",
              borderRadius: 100,
              fontSize: 15,
              fontWeight: 700,
              background: "#00C9B1",
              color: "#0D1B4B",
              border: "none",
              cursor: "pointer",
              transition: "opacity 0.15s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.88"; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
          >
            Weiter →
          </button>
        </div>
      </div>

      <style>{`
        @keyframes badgePop {
          0% { transform: scale(0.5) rotate(-15deg); }
          60% { transform: scale(1.15) rotate(5deg); }
          100% { transform: scale(1) rotate(0deg); }
        }
      `}</style>
    </>
  );
}

// Hook to detect and show newly earned badges
export function useNewlyEarnedBadge() {
  const [pendingBadge, setPendingBadge] = useState<Badge | null>(null);

  function checkForNewBadges(badges: Badge[]) {
    const shownKey = "badges-shown";
    const shown = new Set<string>(JSON.parse(localStorage.getItem(shownKey) ?? "[]"));
    const newBadge = badges.find((b) => b.earnedAt && !shown.has(b.id));
    if (newBadge) {
      setPendingBadge(newBadge);
      shown.add(newBadge.id);
      localStorage.setItem(shownKey, JSON.stringify([...shown]));
    }
  }

  function dismiss() {
    setPendingBadge(null);
  }

  return { pendingBadge, checkForNewBadges, dismiss };
}
