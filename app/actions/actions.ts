//app/actions/actions.ts

'use server'

import { revalidatePath } from 'next/cache'
import { User, userSchema } from './schemas'
import { cache } from 'react'
import { prisma } from '@/lib/prisma'

function toUser(p: { id: number; name: string; email: string; phoneNumber: string }): User {
  return userSchema.parse({
    id: String(p.id),
    name: p.name,
    email: p.email,
    phoneNumber: p.phoneNumber,
  })
}

export async function searchUsers(query: string): Promise<User[]> {
  const people = await prisma.person.findMany({
    where: { name: { startsWith: query, mode: 'insensitive' } },
    orderBy: { name: 'asc' },
    take: 20,
  })
  return people.map(toUser)
}

export async function addUser(data: Omit<User, 'id'>): Promise<User> {
  const created = await prisma.person.create({
    data: {
      name: data.name,
      email: data.email,
      phoneNumber: data.phoneNumber,
    },
  })
  return toUser(created)
}

export async function deleteUser(id: string): Promise<void> {
  await prisma.person.delete({ where: { id: Number(id) } })
  revalidatePath('/')
}

export async function updateUser(id: string, data: Partial<Omit<User, 'id'>>): Promise<User> {
  const updated = await prisma.person.update({
    where: { id: Number(id) },
    data: {
      name: data.name ?? undefined,
      email: data.email ?? undefined,
      phoneNumber: data.phoneNumber ?? undefined,
    },
  })
  revalidatePath('/')
  return toUser(updated)
}

export const getUserById = cache(async (id: string) => {
  const person = await prisma.person.findUnique({ where: { id: Number(id) } })
  return person ? toUser(person) : null
})
