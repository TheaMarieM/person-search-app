import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'
import { rateLimitByIp, getIp, audit, isAdmin } from '@/lib/security'
import type { Session } from 'next-auth'

export async function GET(_req: Request, context: { params: { id: string } }) {
  try {
    const id = Number(context.params.id)
    const person = await prisma.person.findUnique({ where: { id } })
    if (!person) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(person)
  } catch (error) {
    console.error('Error fetching person:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request: Request, context: { params: { id: string } }) {
  try {
    const session: Session | null = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const rl = rateLimitByIp(request, 'people:put', 40, 60_000)
    if (!rl.ok) {
      return NextResponse.json({ error: 'Too Many Requests' }, { status: 429, headers: { 'Retry-After': '60' } })
    }
    const id = Number(context.params.id)
    const body: Partial<{ name: string; email: string; phoneNumber: string; age?: number }> = await request.json()
    const { name, email, phoneNumber, age } = body
    const updated = await prisma.person.update({
      where: { id },
      data: {
        name: name ?? undefined,
        email: email ?? undefined,
        phoneNumber: phoneNumber ?? undefined,
        age: typeof age === 'number' ? age : undefined,
      },
    })
    await audit({
      actorEmail: session.user?.email ?? null,
      action: 'person.update',
      target: String(id),
      details: { name, email, phoneNumber, age },
      ip: getIp(request),
    })
    return NextResponse.json(updated)
  } catch (error) {
    console.error('Error updating person:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(_req: Request, context: { params: { id: string } }) {
  try {
    const session: Session | null = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    if (!isAdmin(session.user?.email ?? null)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
    const id = Number(context.params.id)
    await prisma.person.delete({ where: { id } })
    await audit({
      actorEmail: session.user?.email ?? null,
      action: 'person.delete',
      target: String(id),
      ip: getIp(_req),
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting person:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
