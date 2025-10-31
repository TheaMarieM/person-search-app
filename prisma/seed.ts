import { PrismaClient } from '@prisma/client'

// Ensure seeding uses the direct database connection (not Accelerate)
if (process.env.DIRECT_DATABASE_URL) {
  process.env.DATABASE_URL = process.env.DIRECT_DATABASE_URL
}

const prisma = new PrismaClient()

async function main() {
  const data = [
    { name: 'John Doe', email: 'john@example.com', phoneNumber: '0412345678', age: 28 },
    { name: 'Jane Smith', email: 'jane@example.com', phoneNumber: '0423456789', age: 32 },
    { name: 'Alice Johnson', email: 'alice@example.com', phoneNumber: '0434567890', age: 24 },
    { name: 'Bob Williams', email: 'bob@example.com', phoneNumber: '0445678901', age: 45 },
    { name: 'Grace Lee', email: 'grace@example.com', phoneNumber: '0489012345', age: 29 },
  ]

  for (const person of data) {
    await prisma.person.upsert({
      where: { email: person.email },
      update: person,
      create: person,
    })
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
