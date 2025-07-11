// middleware.ts
import { auth } from "@/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const session = await auth();

  const isAuthenticated = !!session?.user;

  const isPublicFile =
    request.nextUrl.pathname.startsWith("/api") ||
    request.nextUrl.pathname.startsWith("/_next") ||
    request.nextUrl.pathname.includes(".") ||
    request.nextUrl.pathname === "/favicon.ico" ||
    request.nextUrl.pathname === "/logo.png";

  if (isPublicFile) {
    return NextResponse.next();
  }

  if (!isAuthenticated) {
    const loginUrl = new URL("/api/auth/signin", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|favicon.ico|logo.png).*)"],
};
