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
    // 1. Look up Clerk user first to get clerk_user_id for user_progress deletion
    let clerkUserId: string | null = null;
    try {
      const client = await clerkClient();
      const result = await client.users.getUserList({ emailAddress: [cleanEmail], limit: 1 });
      if (result.data.length > 0) {
        clerkUserId = result.data[0].id;
        await client.users.deleteUser(clerkUserId);
      }
    } catch {
      // Non-fatal: Clerk deletion failed (e.g. user already deleted)
    }

    // 2. Delete all SQL data — user_progress keyed by clerk_user_id, rest by email
    await Promise.all([
      clerkUserId
        ? sql`DELETE FROM user_progress WHERE clerk_user_id = ${clerkUserId}`.catch(() => {})
        : Promise.resolve(),
      sql`DELETE FROM pilot_users WHERE email = ${cleanEmail}`.catch(() => {}),
      sql`DELETE FROM pilot_feedback WHERE email = ${cleanEmail}`.catch(() => {}),
      sql`DELETE FROM registrations WHERE LOWER(email) = ${cleanEmail}`.catch(() => {}),
    ]);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Fehler beim Löschen" }, { status: 500 });
  }
}
