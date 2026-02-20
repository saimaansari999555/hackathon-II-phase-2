import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('jwt_token')?.value || request.cookies.get('token')?.value;

  // Define route categories
  const publicRoutes = ['/'];
  const authRoutes = ['/login', '/register'];
  const protectedRoutes = ['/dashboard', '/tasks', '/profile', '/calendar', '/categories'];

  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

  // If user is not logged in and trying to access a protected route, redirect to /login
  if (!token && isProtectedRoute) {
    const loginUrl = new URL('/login', request.url);
    // Optionally, you can add a callbackUrl to redirect back after login
    loginUrl.searchParams.set('callbackUrl', pathname); 
    return NextResponse.redirect(loginUrl);
  }

  // If user is logged in and trying to access an auth route, redirect to /tasks
  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL('/tasks', request.url));
  }
  
  // If user is logged in and visits the landing page, you might want to redirect them to tasks as well
  // This is optional and depends on desired UX. For now, we allow access.
  // if (token && pathname === '/') {
  //   return NextResponse.redirect(new URL('/tasks', request.url));
  // }


  // Allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - images (public images)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|images|favicon.ico).*)',
  ],
};
