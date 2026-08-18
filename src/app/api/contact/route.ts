import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";

async function ensureTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS contact_submissions (
      id               SERIAL PRIMARY KEY,
      type             TEXT NOT NULL,
      vorname          TEXT NOT NULL,
      nachname         TEXT NOT NULL,
      email            TEXT NOT NULL,
      institution      TEXT,
      funktion         TEXT,
      anzahl_lernende  TEXT,
      nachricht        TEXT NOT NULL,
      created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
}

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { type, vorname, nachname, email, institution, funktion, anzahlLernende, nachricht } = body;

  if (!type || !vorname?.trim() || !nachname?.trim() || !email?.trim() || !nachricht?.trim()) {
    return NextResponse.json({ error: "Pflichtfelder fehlen" }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Ungültige E-Mail-Adresse" }, { status: 400 });
  }
  if (type === "bank" && (!institution?.trim() || !funktion?.trim() || !anzahlLernende)) {
    return NextResponse.json({ error: "Pflichtfelder fehlen" }, { status: 400 });
  }

  try {
    await ensureTable();
    await sql`
      INSERT INTO contact_submissions
        (type, vorname, nachname, email, institution, funktion, anzahl_lernende, nachricht)
      VALUES (
        ${type}, ${vorname.trim()}, ${nachname.trim()}, ${email.trim().toLowerCase()},
        ${institution?.trim() ?? null}, ${funktion?.trim() ?? null},
        ${anzahlLernende ?? null}, ${nachricht.trim()}
      )
    `;
  } catch (err) {
    console.error("[contact] DB error:", err);
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(apiKey);

      const isBank = type === "bank";
      const subject = isBank
        ? `Kontaktanfrage Bank: ${institution} – ${vorname} ${nachname}`
        : `Kontaktanfrage Lernende/r: ${vorname} ${nachname}`;

      const rows = [
        ["Typ", isBank ? "Bank / Institution" : "Lernende/r"],
        ["Name", esc(`${vorname} ${nachname}`)],
        ...(isBank ? [
          ["Institution", esc(institution ?? "")],
          ["Funktion", esc(funktion ?? "")],
        ] : []),
        ["E-Mail", esc(email)],
        ...(isBank ? [["Anzahl Lernende", esc(String(anzahlLernende ?? ""))]] : []),
        ["Nachricht", esc(nachricht).replace(/\n/g, "<br>")],
        ["Zeitstempel", new Date().toLocaleString("de-CH", { timeZone: "Europe/Zurich" })],
      ] as [string, string][];

      const html = `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px 24px">
          <h2 style="margin:0 0 24px;color:#0A1628;font-size:20px">Neue Kontaktanfrage</h2>
          <table style="width:100%;border-collapse:collapse">
            ${rows.map(([k, v]) => `
              <tr>
                <td style="padding:10px 16px 10px 0;font-size:13px;font-weight:600;color:#6b7280;white-space:nowrap;vertical-align:top">${k}</td>
                <td style="padding:10px 0;font-size:14px;color:#111827">${v}</td>
              </tr>
            `).join("")}
          </table>
          <hr style="margin:24px 0;border:none;border-top:1px solid #e5e7eb">
          <p style="margin:0;font-size:12px;color:#9ca3af">BankAcademy Kontaktformular</p>
        </div>
      `;

      await resend.emails.send({
        from: "BankAcademy Kontakt <noreply@bankacademy.ch>",
        to: "evins@bankacademy.ch",
        replyTo: email,
        subject,
        html,
      });
    } catch (err) {
      console.error("[contact] Resend error:", err);
    }
  }

  return NextResponse.json({ success: true });
}
