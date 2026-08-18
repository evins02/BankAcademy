// In-memory sliding-window rate limiter (Node.js runtime only — not for edge)
type Entry = { count: number; resetAt: number };
const store = new Map<string, Entry>();

export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const entry = store.get(key);
  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (entry.count >= limit) return false;
  entry.count++;
  return true;
}

export function getIp(req: { headers: Headers | { get(k: string): string | null } }): string {
  const xff = (req.headers as Headers).get("x-forwarded-for");
  return xff?.split(",")[0]?.trim() ?? "unknown";
}
