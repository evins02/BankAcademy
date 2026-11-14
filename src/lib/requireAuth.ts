import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

function hasCookie(header: string, name: string): boolean {
  return header.split(";").some((c) => c.trim().startsWith(`${name}=1`));
}

/**
 * Guards an AI endpoint: requires either a valid Clerk session OR
 * a bankacademy_access / bankacademy_demo cookie (demo context).
 * Returns null when authorized, or a 401 NextResponse when not.
 */
export async function requireAuth(req: Request): Promise<NextResponse | null> {
  const { userId } = await auth();
  if (userId) return null;
  const cookies = req.headers.get("cookie") ?? "";
  if (hasCookie(cookies, "bankacademy_access") || hasCookie(cookies, "bankacademy_demo")) return null;
  return NextResponse.json({ error: "unauthorized" }, { status: 401 });
}
