import Link from "next/link";

export function DemoBanner() {
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
      }}
    >
      <span>
        👀 Demo Modus – Du siehst eine eingeschränkte Version von BankAcademy.
      </span>
      <Link
        href="/kontakt"
        style={{ fontWeight: 700, color: "#78350f", textDecoration: "underline" }}
      >
        Vollzugang anfragen →
      </Link>
    </div>
  );
}
