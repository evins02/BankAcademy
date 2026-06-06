"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="de">
      <body
        style={{
          margin: 0,
          fontFamily: "system-ui, sans-serif",
          background: "#F5F5F5",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>⚠️</div>
          <h1
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "#0A0A0A",
              marginBottom: "0.5rem",
            }}
          >
            Etwas ist schiefgelaufen
          </h1>
          <p style={{ color: "#6B7280", marginBottom: "1.5rem", fontSize: "0.9rem" }}>
            Ein unerwarteter Fehler ist aufgetreten.
          </p>
          <button
            onClick={reset}
            style={{
              background: "#0D1B4B",
              color: "#fff",
              padding: "0.6rem 1.4rem",
              borderRadius: "0.75rem",
              border: "none",
              fontSize: "0.875rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Nochmals versuchen
          </button>
        </div>
      </body>
    </html>
  );
}
