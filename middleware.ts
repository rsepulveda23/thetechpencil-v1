import { NextResponse, NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const res = NextResponse.next()
  // Basic security headers
  res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  res.headers.set('X-Content-Type-Options', 'nosniff')
  res.headers.set('X-Frame-Options', 'SAMEORIGIN')
  res.headers.set('X-XSS-Protection', '0')
  res.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  return res
}

export const config = {
  matcher: ['/((?!_next|api/stripe/webhook|api).*)'],
}

