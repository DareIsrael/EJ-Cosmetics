import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

// Routes that require authentication
const protectedRoutes = ['/orders', '/checkout', '/user'];
// Routes that require admin role
const adminRoutes = ['/admin'];
// Routes only accessible when NOT logged in
const authRoutes = ['/login', '/register'];

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Get the NextAuth JWT from the cookie
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // If user is logged in and tries to access login/register, redirect to home
  if (authRoutes.some((route) => pathname.startsWith(route))) {
    if (token) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  // Check protected routes — redirect to login if unauthenticated
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  if (isProtected && !token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Check admin routes — must be authenticated + admin role
  const isAdmin = adminRoutes.some((route) => pathname.startsWith(route));
  if (isAdmin) {
    if (!token) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }
    if (token.role !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  // Match all routes except API routes, static files, and images
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};
