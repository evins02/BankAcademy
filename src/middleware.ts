import { NextRequest, NextResponse } from "next/server";

// Routes accessible without access code
const PUBLIC = new Set(["/", "/start", "/datenschutz", "/kontakt", "/impressum"]);

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Always allow: static files, Next.js internals, public API endpoints, admin (own auth), demo
  const PUBLIC_API = new Set(["/api/validate-access", "/api/register"]);
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/demo") ||
    PUBLIC_API.has(pathname) ||
    PUBLIC.has(pathname)
  ) {
    return NextResponse.next();
  }

  // Check access cookie
  const access = req.cookies.get("bankacademy_access");
  if (access?.value === "1") {
    return NextResponse.next();
  }

  // No valid cookie → back to landing page
  const url = req.nextUrl.clone();
  url.pathname = "/";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
