import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  const access = req.cookies.get("bankacademy_access");
  const demo = req.cookies.get("bankacademy_demo");
  if (access?.value !== "1" && demo?.value !== "1") {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const { email } = await req.json();
  if (!email?.trim() || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Ungültige E-Mail-Adresse" }, { status: 400 });
  }
  const cleanEmail = email.trim().toLowerCase();

  try {
    await Promise.all([
      sql`DELETE FROM user_progress WHERE email = ${cleanEmail}`.catch(() => {}),
      sql`DELETE FROM pilot_users WHERE email = ${cleanEmail}`.catch(() => {}),
      sql`DELETE FROM pilot_feedback WHERE email = ${cleanEmail}`.catch(() => {}),
      sql`DELETE FROM registrations WHERE LOWER(email) = ${cleanEmail}`.catch(() => {}),
    ]);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Fehler beim Löschen" }, { status: 500 });
  }
}
