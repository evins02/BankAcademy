import { auth } from "@clerk/nextjs/server";
import { sql } from "@/lib/db";

export async function getUserLehrjahr(): Promise<string | null> {
  try {
    const { userId } = await auth();
    if (!userId) return null;
    const rows = await sql`
      SELECT progress_data->>'lehrjahr' AS lehrjahr
      FROM user_progress
      WHERE clerk_user_id = ${userId}
    `;
    return (rows[0]?.lehrjahr as string | null) ?? null;
  } catch {
    return null;
  }
}

export async function isMitarbeiter(): Promise<boolean> {
  const lj = await getUserLehrjahr();
  return lj === "mitarbeiter";
}
