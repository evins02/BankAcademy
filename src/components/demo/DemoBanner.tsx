import Link from "next/link";

interface Props {
  onFeedback?: () => void;
}

export function DemoBanner({ onFeedback }: Props) {
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
      }}
    >
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
    </div>
  );
}
