import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const supportedLocales = new Set(["uz", "en"]);

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0];

  if (!firstSegment) {
    return NextResponse.rewrite(new URL("/uz", request.url));
  }

  if (supportedLocales.has(firstSegment)) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/en", request.url));
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"]
};
