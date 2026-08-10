import { NextRequest, NextResponse } from "next/server";

// Routes accessible without access code
const PUBLIC = new Set(["/", "/start", "/code-eingabe", "/datenschutz", "/kontakt", "/impressum"]);

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Always allow: static files, Next.js internals, public API endpoints, admin (own auth), demo
  const PUBLIC_API = new Set([
    "/api/validate-access",
    "/api/register",
    "/api/kyc-chat",
    "/api/simulation/chat",
    "/api/demo-register",
    "/api/pilot-feedback",
  ]);
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/demo") ||
    pathname.startsWith("/code-eingabe") ||
    pathname === "/sitemap.xml" ||
    pathname === "/robots.txt" ||
    PUBLIC_API.has(pathname) ||
    PUBLIC.has(pathname)
  ) {
    return NextResponse.next();
  }

  // Check access cookie — set exclusively by /api/validate-access after code verification
  const access = req.cookies.get("bankacademy_access");
  if (access?.value === "1") {
    return NextResponse.next();
  }

  // No valid cookie → dedicated code-entry gate
  const url = req.nextUrl.clone();
  url.pathname = "/code-eingabe";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon\\.ico|sitemap\\.xml|robots\\.txt).*)"],
};
