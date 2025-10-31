import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(req: NextRequest) {
  const url = req.nextUrl
  const pathname = url.pathname
  const method = req.method

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  const isPeopleApi = pathname.startsWith('/api/people')
  const isProtectedPage = pathname.startsWith('/mcp-demo') || pathname.startsWith('/directory')

  if (isPeopleApi) {
    // Allow GETs; require auth for mutations
    if (method !== 'GET' && !token) {
      const signinUrl = new URL('/api/auth/signin', url)
      signinUrl.searchParams.set('callbackUrl', url.toString())
      return NextResponse.redirect(signinUrl)
    }
  }

  if (isProtectedPage && !token) {
    const signinUrl = new URL('/api/auth/signin', url)
    signinUrl.searchParams.set('callbackUrl', url.toString())
    return NextResponse.redirect(signinUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/mcp-demo', '/directory/:path*', '/api/people/:path*'],
}
