// ENV vars:
//   BANK_CODES=RAIFFEISEN2026:Raiffeisen Wallis,WKB2026:Walliser Kantonalbank
//   ACCESS_CODE=existing-fallback-code  (backward compat — resolves as "BankAcademy")

import { NextRequest, NextResponse } from "next/server";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { rateLimit, getIp } from "@/lib/rateLimit";
import { sql } from "@/lib/db";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  maxAge: 60 * 60 * 24 * 365,
  path: "/",
};

/** Ensure the user_progress table exists with the bank_name column */
async function ensureTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS user_progress (
      clerk_user_id TEXT PRIMARY KEY,
      progress_data JSONB NOT NULL DEFAULT '{}',
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
  await sql`ALTER TABLE user_progress ADD COLUMN IF NOT EXISTS bank_name TEXT`;
}

/**
 * Resolve an access code to its bank name.
 * Checks BANK_CODES first, then falls back to legacy ACCESS_CODE.
 */
function resolveBankCode(inputCode: string): string | null {
  const raw = process.env.BANK_CODES ?? "";
  if (raw) {
    for (const entry of raw.split(",")) {
      const [code, ...nameParts] = entry.trim().split(":");
      if (code.trim() === inputCode.trim()) return nameParts.join(":").trim();
    }
  }
  // Fallback: old single ACCESS_CODE (bankName = "BankAcademy")
  const legacy = process.env.ACCESS_CODE;
  if (legacy && inputCode.trim() === legacy) return "BankAcademy";
  return null;
}

export async function POST(req: NextRequest) {
  const ip = getIp(req);
  if (!rateLimit(`validate-access:${ip}`, 10, 15 * 60 * 1000)) {
    return NextResponse.json(
      { valid: false, error: "Zu viele Versuche. Bitte 15 Minuten warten." },
      { status: 429 }
    );
  }

  const { code } = await req.json();
  const bankName = resolveBankCode(typeof code === "string" ? code : "");

  if (!bankName) {
    return NextResponse.json({ valid: false });
  }

  // Set Clerk publicMetadata.approved + bank on the current user (if logged in)
  try {
    const { userId } = await auth();
    if (userId) {
      const client = await clerkClient();
      await client.users.updateUserMetadata(userId, {
        publicMetadata: { approved: true, bank: bankName },
      });

      // Upsert bank_name into user_progress
      try {
        await ensureTable();
        await sql`
          INSERT INTO user_progress (clerk_user_id, bank_name, progress_data)
          VALUES (${userId}, ${bankName}, '{}')
          ON CONFLICT (clerk_user_id)
          DO UPDATE SET bank_name = EXCLUDED.bank_name
        `;
      } catch {
        // Non-fatal: DB upsert failed
      }
    }
  } catch {
    // Non-fatal: metadata update failed, cookie fallback still works
  }

  const res = NextResponse.json({ valid: true, bank: bankName });
  res.cookies.set("bankacademy_access", "1", COOKIE_OPTIONS);
  return res;
}
