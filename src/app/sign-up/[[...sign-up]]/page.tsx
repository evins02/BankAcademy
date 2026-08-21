import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
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

      <SignUp />

      <p
        style={{
          marginTop: 16,
          fontSize: 12,
          color: "rgba(248,250,252,0.4)",
          textAlign: "center",
          maxWidth: 320,
          lineHeight: 1.6,
        }}
      >
        Mit der Registrierung akzeptierst du unsere{" "}
        <a href="/nutzungsbedingungen" style={{ color: "rgba(248,250,252,0.65)", textDecoration: "underline" }}>
          Nutzungsbedingungen
        </a>{" "}
        und{" "}
        <a href="/datenschutz" style={{ color: "rgba(248,250,252,0.65)", textDecoration: "underline" }}>
          Datenschutzerklärung
        </a>
        .
      </p>

      <a
        href="/"
        style={{
          marginTop: 16,
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
