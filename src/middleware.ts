import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/start(.*)",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/code-eingabe(.*)",
  "/datenschutz",
  "/kontakt",
  "/impressum",
  "/nutzungsbedingungen",
  "/demo(.*)",
  "/banklehre(.*)",
  "/praxisfaelle(.*)",
  "/kundengespraech(.*)",
  "/admin(.*)",
  "/api/admin/(.*)",
  "/api/validate-access",
  "/api/register",
  "/api/demo-register",
  "/api/demo-access",
  "/api/pilot-feedback",
  "/api/contact",
  "/api/kyc-chat",
  "/api/simulation/(.*)",
  "/sitemap.xml",
  "/robots.txt",
]);

export default clerkMiddleware(async (auth, req) => {
  if (isPublicRoute(req)) return;

  // Require Clerk login for all protected routes
  const { userId, sessionClaims } = await auth();
  if (!userId) {
    await auth.protect();
    return;
  }

  // Require access code to have been validated
  const approved = (sessionClaims as Record<string, unknown> & { publicMetadata?: { approved?: boolean } })
    ?.publicMetadata?.approved;

  if (!approved) {
    return NextResponse.redirect(new URL("/code-eingabe", req.url));
  }
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon\\.ico|sitemap\\.xml|robots\\.txt).*)"],
};
