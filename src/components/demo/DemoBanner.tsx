import Link from "next/link";
import { Menu } from "lucide-react";

interface Props {
  onMenuToggle?: () => void;
  onFeedback?: () => void;
  onLogout?: () => void;
}

export function DemoBanner({ onMenuToggle, onFeedback, onLogout }: Props) {
  return (
    <div
      style={{
        background: "#fef3c7",
        borderBottom: "1px solid #fcd34d",
        padding: "10px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        fontSize: 13,
        fontWeight: 500,
        color: "#92400e",
        textAlign: "center",
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
          <Menu size={20} />
        </button>
      )}
      <span>
        Demo Modus – Du siehst eine eingeschränkte Version von BankAcademy.
      </span>
      <Link
        href="/kontakt"
        style={{ fontWeight: 700, color: "#78350f", textDecoration: "underline" }}
      >
        Vollzugang anfragen →
      </Link>
      {onFeedback && (
        <button
          onClick={onFeedback}
          style={{
            padding: "4px 12px",
            borderRadius: 50,
            border: "1.5px solid #92400e",
            background: "transparent",
            color: "#78350f",
            fontSize: 12,
            fontWeight: 700,
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          Feedback geben →
        </button>
      )}
      {onLogout && (
        <button
          onClick={onLogout}
          style={{
            padding: "4px 10px",
            borderRadius: 50,
            border: "1px solid #92400e",
            background: "transparent",
            color: "#78350f",
            fontSize: 11,
            fontWeight: 600,
            cursor: "pointer",
            opacity: 0.65,
            whiteSpace: "nowrap",
          }}
        >
          ← Abmelden
        </button>
      )}
    </div>
  );
}
