import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs/server";
import { sql } from "@/lib/db";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  // Require an active Clerk session — demo / access cookies are not sufficient
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const { email } = await req.json();
  if (!email?.trim() || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Ungültige E-Mail-Adresse" }, { status: 400 });
  }
  const cleanEmail = email.trim().toLowerCase();

  try {
    // 1. Verify the requested email belongs to the authenticated user
    const client = await clerkClient();
    const requestingUser = await client.users.getUser(userId);
    const ownsEmail = requestingUser.emailAddresses.some(
      (e) => e.emailAddress.toLowerCase() === cleanEmail
    );
    if (!ownsEmail) {
      return NextResponse.json({ error: "forbidden" }, { status: 403 });
    }

    // 2. Delete Clerk account (we already have the userId)
    let clerkUserId: string | null = userId;
    try {
      await client.users.deleteUser(userId);
    } catch {
      // Non-fatal: Clerk deletion failed (e.g. user already deleted)
      clerkUserId = null;
    }

    // 3. Delete all SQL data — user_progress keyed by clerk_user_id, rest by email
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
