import { NextRequest, NextResponse } from "next/server";

// Routes accessible without access code
const PUBLIC = new Set(["/", "/start", "/code-eingabe", "/datenschutz", "/kontakt", "/impressum"]);

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Always allow: static files, Next.js internals, public API endpoints, admin (own auth), demo pages
  const PUBLIC_API = new Set([
    "/api/validate-access",
    "/api/register",
    "/api/demo-register",
    "/api/demo-access",
    "/api/pilot-feedback",
    "/api/contact",
  ]);
  // Not in PUBLIC_API — enforces X-Demo-Session header auth inside the route handler
  const SESSION_AUTH_API = new Set(["/api/user-progress"]);
  // Demo AI endpoints — require either the main access cookie or the demo cookie
  const DEMO_API = new Set(["/api/kyc-chat", "/api/simulation/chat"]);

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api/admin/") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/demo") ||
    pathname.startsWith("/code-eingabe") ||
    pathname === "/sitemap.xml" ||
    pathname === "/robots.txt" ||
    PUBLIC_API.has(pathname) ||
    SESSION_AUTH_API.has(pathname) ||
    PUBLIC.has(pathname)
  ) {
    return NextResponse.next();
  }

  // Check access cookie — set by /api/validate-access after code verification
  const access = req.cookies.get("bankacademy_access");
  if (access?.value === "1") {
    return NextResponse.next();
  }

  // Demo AI endpoints also accept the lightweight demo cookie
  if (DEMO_API.has(pathname)) {
    const demo = req.cookies.get("bankacademy_demo");
    if (demo?.value === "1") {
      return NextResponse.next();
    }
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  // No valid cookie → dedicated code-entry gate
  const url = req.nextUrl.clone();
  url.pathname = "/code-eingabe";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon\\.ico|sitemap\\.xml|robots\\.txt).*)"],
};
