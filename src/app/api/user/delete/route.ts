import { NextRequest, NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";
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
    // 1. Delete all SQL data for this user
    await Promise.all([
      sql`DELETE FROM user_progress WHERE email = ${cleanEmail}`.catch(() => {}),
      sql`DELETE FROM pilot_users WHERE email = ${cleanEmail}`.catch(() => {}),
      sql`DELETE FROM pilot_feedback WHERE email = ${cleanEmail}`.catch(() => {}),
      sql`DELETE FROM registrations WHERE LOWER(email) = ${cleanEmail}`.catch(() => {}),
    ]);

    // 2. Delete the Clerk user (removes profile + unsafeMetadata permanently)
    try {
      const client = await clerkClient();
      const result = await client.users.getUserList({ emailAddress: [cleanEmail], limit: 1 });
      if (result.data.length > 0) {
        await client.users.deleteUser(result.data[0].id);
      }
    } catch {
      // Non-fatal: Clerk deletion failed (e.g. user already deleted), SQL data is gone
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Fehler beim Löschen" }, { status: 500 });
  }
}
