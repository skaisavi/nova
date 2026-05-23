import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";
import { authSessionCookieName, getAuthSecret } from "@/lib/auth-secret";

function redirectToSignIn(request: NextRequest) {
  const signInUrl = new URL("/sign-in", request.url);
  signInUrl.searchParams.set("callbackUrl", request.nextUrl.href);

  return NextResponse.redirect(signInUrl);
}

export async function middleware(request: NextRequest) {
  const secret = getAuthSecret();

  if (!secret) {
    return redirectToSignIn(request);
  }

  const token = await getToken({
    req: request,
    secret,
    cookieName: authSessionCookieName
  }).catch(() => null);

  if (!token) {
    return redirectToSignIn(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"]
};
