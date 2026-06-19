import { NextResponse, type NextRequest } from "next/server";

/**
 * Email gate. Browsing the library requires the `pd_access` cookie, which is
 * set after a visitor submits their email on /access. The public JSON API
 * (/api, /json) stays open for developers and SEO.
 */
export function middleware(request: NextRequest) {
  const hasAccess = request.cookies.get("pd_access")?.value === "1";
  if (hasAccess) return NextResponse.next();

  const url = request.nextUrl.clone();
  const next = request.nextUrl.pathname + request.nextUrl.search;
  url.pathname = "/access";
  url.search = "";
  url.searchParams.set("next", next);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/library", "/library/:path*"]
};
