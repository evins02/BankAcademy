import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";

export const runtime = "nodejs";
export const maxDuration = 30;

// ─── Auth ────────────────────────────────────────────────────────────────────

function isAuthorized(req: NextRequest): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return true; // dev: no secret configured
  const auth = req.headers.get("authorization");
  return auth === `Bearer ${secret}`;
}

// ─── Health checks ───────────────────────────────────────────────────────────

type HealthResult = { route: string; ok: boolean; status: number | null; ms: number };

async function checkRoute(base: string, path: string, method = "GET"): Promise<HealthResult> {
  const url = base + path;
  const start = Date.now();
  try {
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: method === "POST" ? JSON.stringify({}) : undefined,
      signal: AbortSignal.timeout(8000),
    });
    // Any response (even 4xx) means the route is UP
    return { route: path, ok: res.status < 500, status: res.status, ms: Date.now() - start };
  } catch {
    return { route: path, ok: false, status: null, ms: Date.now() - start };
  }
}

// ─── DB stats ────────────────────────────────────────────────────────────────

async function fetchStats(): Promise<{
  newRegistrations: number;
  newPilotUsers: number;
  newFeedback: number;
  totalRegistrations: number;
  totalPilotUsers: number;
  totalFeedback: number;
}> {
  const [reg, pilot, feedback] = await Promise.all([
    sql`SELECT
          COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days') AS new_count,
          COUNT(*) AS total
        FROM registrations`.catch(() => [{ new_count: "?", total: "?" }]),
    sql`SELECT
          COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days') AS new_count,
          COUNT(*) AS total
        FROM pilot_users`.catch(() => [{ new_count: "?", total: "?" }]),
    sql`SELECT
          COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days') AS new_count,
          COUNT(*) AS total
        FROM pilot_feedback`.catch(() => [{ new_count: "?", total: "?" }]),
  ]);

  return {
    newRegistrations: Number(reg[0]?.new_count ?? 0),
    newPilotUsers: Number(pilot[0]?.new_count ?? 0),
    newFeedback: Number(feedback[0]?.new_count ?? 0),
    totalRegistrations: Number(reg[0]?.total ?? 0),
    totalPilotUsers: Number(pilot[0]?.total ?? 0),
    totalFeedback: Number(feedback[0]?.total ?? 0),
  };
}

// ─── Email HTML ──────────────────────────────────────────────────────────────

function buildHtml(
  health: HealthResult[],
  stats: Awaited<ReturnType<typeof fetchStats>>,
  week: string,
): string {
  const allHealthy = health.every((h) => h.ok);
  const statusIcon = (ok: boolean) => (ok ? "✅" : "❌");
  const arrow = (n: number) => (n > 0 ? `<span style="color:#059669">+${n}</span>` : `<span style="color:#6b7280">0</span>`);

  const healthRows = health
    .map(
      (h) => `
      <tr>
        <td style="padding:8px 0;font-size:13px;color:#374151">${h.route}</td>
        <td style="padding:8px 0;font-size:13px;text-align:center">${statusIcon(h.ok)}</td>
        <td style="padding:8px 0;font-size:13px;color:#6b7280;text-align:right">${h.status ?? "timeout"} · ${h.ms}ms</td>
      </tr>`,
    )
    .join("");

  return `
<div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;padding:32px 24px;color:#111827">

  <div style="margin-bottom:28px">
    <h1 style="margin:0 0 4px;font-size:22px;font-weight:800;color:#0A1628">BankAcademy Weekly Report</h1>
    <p style="margin:0;font-size:13px;color:#6b7280">Woche ${week} · ${new Date().toLocaleDateString("de-CH", { timeZone: "Europe/Zurich", weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
  </div>

  <!-- System Health -->
  <div style="background:${allHealthy ? "#f0fdf4" : "#fef2f2"};border:1px solid ${allHealthy ? "#bbf7d0" : "#fecaca"};border-radius:10px;padding:20px;margin-bottom:20px">
    <h2 style="margin:0 0 14px;font-size:14px;font-weight:700;color:${allHealthy ? "#065f46" : "#991b1b"};text-transform:uppercase;letter-spacing:.06em">
      ${statusIcon(allHealthy)} System-Status
    </h2>
    <table style="width:100%;border-collapse:collapse">
      ${healthRows}
    </table>
  </div>

  <!-- Nutzer-Statistiken -->
  <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:10px;padding:20px;margin-bottom:20px">
    <h2 style="margin:0 0 14px;font-size:14px;font-weight:700;color:#374151;text-transform:uppercase;letter-spacing:.06em">
      👥 Nutzer (letzte 7 Tage)
    </h2>
    <table style="width:100%;border-collapse:collapse">
      <tr>
        <td style="padding:8px 0;font-size:13px;color:#374151">Registrierungen (Vollversion)</td>
        <td style="padding:8px 0;font-size:14px;font-weight:700;text-align:right">${arrow(stats.newRegistrations)} <span style="color:#9ca3af;font-weight:400;font-size:12px">von ${stats.totalRegistrations} gesamt</span></td>
      </tr>
      <tr>
        <td style="padding:8px 0;font-size:13px;color:#374151">Demo-Nutzer (Pilot)</td>
        <td style="padding:8px 0;font-size:14px;font-weight:700;text-align:right">${arrow(stats.newPilotUsers)} <span style="color:#9ca3af;font-weight:400;font-size:12px">von ${stats.totalPilotUsers} gesamt</span></td>
      </tr>
    </table>
  </div>

  <!-- Feedback -->
  <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:10px;padding:20px;margin-bottom:28px">
    <h2 style="margin:0 0 14px;font-size:14px;font-weight:700;color:#374151;text-transform:uppercase;letter-spacing:.06em">
      💬 Feedback (letzte 7 Tage)
    </h2>
    <table style="width:100%;border-collapse:collapse">
      <tr>
        <td style="padding:8px 0;font-size:13px;color:#374151">Neue Pilot-Feedback-Einträge</td>
        <td style="padding:8px 0;font-size:14px;font-weight:700;text-align:right">${arrow(stats.newFeedback)} <span style="color:#9ca3af;font-weight:400;font-size:12px">von ${stats.totalFeedback} gesamt</span></td>
      </tr>
    </table>
  </div>

  <hr style="border:none;border-top:1px solid #e5e7eb;margin-bottom:20px">
  <p style="margin:0;font-size:11px;color:#9ca3af">Automatischer Report · jeden Montag 09:00 Uhr · BankAcademy Monitoring</p>
</div>`;
}

// ─── Handler ─────────────────────────────────────────────────────────────────

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const base =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

  const [health, stats] = await Promise.all([
    Promise.all([
      checkRoute(base, "/demo"),
      checkRoute(base, "/api/kyc-chat", "POST"),
      checkRoute(base, "/api/pilot-feedback", "POST"),
    ]),
    fetchStats(),
  ]);

  const now = new Date();
  const week = `KW${Math.ceil(((now.getTime() - new Date(now.getFullYear(), 0, 1).getTime()) / 86400000 + new Date(now.getFullYear(), 0, 1).getDay() + 1) / 7)} ${now.getFullYear()}`;

  const apiKey = process.env.RESEND_API_KEY;
  let emailSent = false;

  if (apiKey) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(apiKey);
      await resend.emails.send({
        from: "BankAcademy Monitoring <noreply@bankacademy.ch>",
        to: "evins@bankacademy.ch",
        subject: `Weekly Report ${week} – ${health.every((h) => h.ok) ? "✅ Alles OK" : "❌ Fehler erkannt"}`,
        html: buildHtml(health, stats, week),
      });
      emailSent = true;
    } catch (err) {
      console.error("[weekly-report] Resend error:", err);
    }
  }

  return NextResponse.json({
    ok: true,
    emailSent,
    health,
    stats,
    week,
  });
}
