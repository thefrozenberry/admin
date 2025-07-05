import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname

  // Define public paths that don't require authentication
  const isPublicPath = path === '/' || path === '/login'

  // Get the token from cookies
  const token = request.cookies.get('accessToken')?.value || ''

  // Redirect logic
  if (!isPublicPath && !token) {
    // If trying to access protected route without token, redirect to home
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (isPublicPath && token) {
    // If trying to access public route with token, redirect to dashboard
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

// Configure the paths that middleware will run on
export const config = {
  matcher: [
    '/',
    '/login',
    '/dashboard/:path*'  // This will match dashboard and all its sub-routes
  ]
} 