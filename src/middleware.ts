import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

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
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon\\.ico|sitemap\\.xml|robots\\.txt).*)"],
};
