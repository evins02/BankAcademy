import { neon } from "@neondatabase/serverless";

// Lazy initialisation — do NOT call neon() at module level so Next.js can
// import this file during the build phase without a DATABASE_URL env var.
export function sql(strings: TemplateStringsArray, ...values: unknown[]) {
  return neon(process.env.DATABASE_URL!)(strings, ...values);
}
