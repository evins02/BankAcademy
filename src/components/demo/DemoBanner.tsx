import Link from "next/link";
import { Menu } from "lucide-react";

interface Props {
  onMenuToggle?: () => void;
  onFeedback?: () => void;
  onLogout?: () => void;
  userName?: string;
}

export function DemoBanner({ onMenuToggle, onFeedback, onLogout, userName }: Props) {
  const initials = userName
    ? userName.trim().split(/\s+/).map(w => w[0]?.toUpperCase() ?? "").join("").slice(0, 2)
    : "";
  return (
    <div
      style={{
        background: "#fffbeb",
        borderBottom: "1px solid #fde68a",
        padding: "5px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        fontSize: 11,
        fontWeight: 500,
        color: "#92400e",
        flexWrap: "wrap",
        flexShrink: 0,
        position: "relative",
      }}
    >
      {onMenuToggle && (
        <button
          onClick={onMenuToggle}
          className="md:hidden absolute left-4 top-1/2 -translate-y-1/2 rounded-lg p-1.5 transition-colors hover:bg-amber-100"
          aria-label="Menü öffnen"
          style={{ color: "#92400e" }}
        >
          <Menu size={18} />
        </button>
      )}

      {/* Demo badge */}
      <span
        style={{
          background: "#fbbf24",
          color: "#78350f",
          fontSize: 9,
          fontWeight: 800,
          padding: "2px 7px",
          borderRadius: 50,
          letterSpacing: "0.06em",
          flexShrink: 0,
        }}
      >
        DEMO
      </span>

      <span style={{ color: "#92400e" }}>Eingeschränkte Version –</span>

      <Link
        href="/kontakt"
        style={{ fontWeight: 700, color: "#78350f", textDecoration: "underline", whiteSpace: "nowrap" }}
      >
        Vollzugang anfragen →
      </Link>

      {onFeedback && (
        <button
          onClick={onFeedback}
          style={{
            padding: "2px 10px",
            borderRadius: 50,
            border: "1px solid #b45309",
            background: "transparent",
            color: "#78350f",
            fontSize: 10,
            fontWeight: 700,
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          Feedback →
        </button>
      )}

      {/* Profile + logout — pinned top-right */}
      <div
        style={{
          position: "absolute",
          right: 16,
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        {initials && (
          <div
            title={userName}
            style={{
              width: 26,
              height: 26,
              borderRadius: "50%",
              background: "#0D1B4B",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 10,
              fontWeight: 800,
              letterSpacing: "0.02em",
              flexShrink: 0,
              userSelect: "none",
            }}
          >
            {initials}
          </div>
        )}
        {onLogout && (
          <button
            onClick={onLogout}
            style={{
              padding: "2px 8px",
              borderRadius: 50,
              border: "1px solid #b45309",
              background: "transparent",
              color: "#78350f",
              fontSize: 10,
              fontWeight: 500,
              cursor: "pointer",
              opacity: 0.6,
              whiteSpace: "nowrap",
            }}
          >
            ← Abmelden
          </button>
        )}
      </div>
    </div>
  );
}
