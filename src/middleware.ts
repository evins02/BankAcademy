import { NextRequest, NextResponse } from "next/server";

// Routes accessible without access code
const PUBLIC = new Set(["/", "/start", "/datenschutz", "/kontakt", "/demo", "/impressum"]);

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Always allow: static files, Next.js internals, API routes, admin (own auth)
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/favicon") ||
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
