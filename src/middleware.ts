import { NextRequest, NextResponse } from "next/server";

// Routes accessible without access code
const PUBLIC = new Set(["/", "/start", "/code-eingabe", "/datenschutz", "/kontakt", "/impressum"]);

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const PUBLIC_API = new Set([
    "/api/validate-access",
    "/api/register",
    "/api/demo-register",
    "/api/demo-access",
    "/api/pilot-feedback",
    "/api/contact",
  ]);

  // These endpoints accept either the main access cookie or the demo cookie
  const DEMO_OR_ACCESS_API = new Set([
    "/api/kyc-chat",
    "/api/simulation/chat",
    "/api/user-progress",
    "/api/user/delete",
  ]);

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
    PUBLIC.has(pathname)
  ) {
    return NextResponse.next();
  }

  const access = req.cookies.get("bankacademy_access");
  if (access?.value === "1") {
    return NextResponse.next();
  }

  // Demo cookie accepted for demo AI endpoints, user-progress, and data deletion
  if (DEMO_OR_ACCESS_API.has(pathname)) {
    const demo = req.cookies.get("bankacademy_demo");
    if (demo?.value === "1") {
      return NextResponse.next();
    }
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const url = req.nextUrl.clone();
  url.pathname = "/code-eingabe";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon\\.ico|sitemap\\.xml|robots\\.txt).*)"],
};
