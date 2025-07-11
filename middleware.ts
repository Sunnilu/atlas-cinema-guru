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

  const isAuthRoute = request.nextUrl.pathname.startsWith("/api/auth") ||
                      request.nextUrl.pathname === "/login";

  // Allow access to static files, auth routes, and already authenticated users
  if (isPublicFile || isAuthRoute || isAuthenticated) {
    return NextResponse.next();
  }

  // Redirect unauthenticated users to login page
  const loginUrl = new URL("/api/auth/signin", request.url);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|logo.png).*)"],
};
