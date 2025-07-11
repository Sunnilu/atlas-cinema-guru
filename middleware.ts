// middleware.ts
import { auth } from "@/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const session = await auth();
  const isAuthenticated = !!session?.user;

  const publicPaths = [
    "/api",
    "/_next",
    "/favicon.ico",
    "/logo.png",
    "/api/auth",
    "/api/auth/signin",
    "/api/auth/callback/github",
  ];

  const isPublic = publicPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  ) || request.nextUrl.pathname.includes(".");

  if (isPublic) {
    return NextResponse.next();
  }

  if (!isAuthenticated) {
    const loginUrl = new URL("/api/auth/signin", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|logo.png).*)"],
};
