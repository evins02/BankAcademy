import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0A1628",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <a
        href="/"
        style={{
          marginBottom: 32,
          fontSize: 22,
          fontWeight: 800,
          letterSpacing: "-0.5px",
          color: "#F8FAFC",
          textDecoration: "none",
        }}
      >
        Bank<span style={{ color: "#00D4B8" }}>Academy</span>
      </a>

      <SignIn afterSignInUrl="/dashboard" />

      <a
        href="/"
        style={{
          marginTop: 24,
          fontSize: 13,
          color: "rgba(248,250,252,0.45)",
          textDecoration: "none",
        }}
      >
        ← Zurück zur Startseite
      </a>
    </div>
  );
}
