import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUserMeLoader } from "@/lib/services/user";

// Define protected routes
const protectedRoutes = ['/profile', '/my-recipes', '/saved-recipes'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only check authentication for protected routes
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    try {
      const user = await getUserMeLoader();
      
      if (!user.ok) {
        // Redirect to login page with return URL
        const loginUrl = new URL('/signin', request.url);
        loginUrl.searchParams.set('from', pathname);
        return NextResponse.redirect(loginUrl);
      }
    } catch (error) {
      console.error('Authentication error:', error);
      // Redirect to error page in case of unexpected errors
      return NextResponse.redirect(new URL('/error', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};