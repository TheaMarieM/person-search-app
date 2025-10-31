import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const people = await prisma.person.findMany({ orderBy: { createdAt: 'desc' } })
    return NextResponse.json(people)
  } catch (error) {
    console.error('Error listing people:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
