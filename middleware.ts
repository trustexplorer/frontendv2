import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED_USER_PATHS = ["/dashboard"];
const PROTECTED_ADMIN_PATHS = ["/admin"];
const AUTH_PATHS = ["/login", "/signup", "/adminauth"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  const isProtectedUser = PROTECTED_USER_PATHS.some((p) => pathname.startsWith(p));
  const isProtectedAdmin = PROTECTED_ADMIN_PATHS.some((p) => pathname.startsWith(p));
  const isAuthPath = AUTH_PATHS.some((p) => pathname.startsWith(p));

  // Redirect unauthenticated users away from protected pages
  if ((isProtectedUser || isProtectedAdmin) && !token) {
    const loginUrl = isProtectedAdmin
      ? new URL("/adminauth", request.url)
      : new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect authenticated users away from auth pages
  if (isAuthPath && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/login", "/signup", "/adminauth"],
};
