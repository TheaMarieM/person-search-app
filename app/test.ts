import { PrismaClient } from '../../lib/generated/prisma';

const prisma = new PrismaClient();

async function main() {
  // Create a person
  const newPerson = await prisma.person.create({
    data: {
      name: 'John Doe',
      email: 'john@example.com',
      age: 30,
    },
  });
  console.log('Created:', newPerson);

  // Query all people
  const allPeople = await prisma.person.findMany();
  console.log('All people:', allPeople);

  // Update
  await prisma.person.update({
    where: { id: 1 },
    data: { age: 31 },
  });

  // Delete
  await prisma.person.delete({
    where: { id: 1 },
  });
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());