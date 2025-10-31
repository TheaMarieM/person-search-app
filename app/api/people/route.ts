import { NextRequest, NextResponse } from 'next/server'
import { User } from '@/app/actions/schemas'
import { searchUsers } from '@/app/actions/actions'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'
import { rateLimitByIp, getIp, audit } from '@/lib/security'
import type { Session } from 'next-auth'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('query')

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 })
  }

  try {
    const users: User[] = await searchUsers(query)

    if (users.length === 0) {
      return NextResponse.json({ message: 'No users found' }, { status: 404 })
    }

    return NextResponse.json(users)
  } catch (error) {
    console.error('Error searching users:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session: Session | null = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const rl = rateLimitByIp(request, 'people:post', 20, 60_000)
    if (!rl.ok) {
      return NextResponse.json({ error: 'Too Many Requests' }, { status: 429, headers: { 'Retry-After': String(Math.ceil((rl.retryAfterMs || 0)/1000)) } })
    }

    const body: Partial<{ name: string; email: string; phoneNumber: string; age?: number }> = await request.json()
    const { name, email, phoneNumber, age } = body

    if (!name || !email || !phoneNumber) {
      return NextResponse.json({ error: 'name, email, and phoneNumber are required' }, { status: 400 })
    }

    const created = await prisma.person.create({
      data: { name, email, phoneNumber, age: typeof age === 'number' ? age : null },
    })

    await audit({
      actorEmail: session.user?.email ?? null,
      action: 'person.create',
      target: String(created.id),
      details: { name, email },
      ip: getIp(request),
    })

    return NextResponse.json(created, { status: 201 })
  } catch (error) {
    console.error('Error creating person:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}