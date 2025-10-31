import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { prisma } from '@/lib/prisma'

async function getPersons() {
  try {
    const persons = await prisma.person.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return persons;
  } catch (error) {
    console.error('Failed to fetch persons:', error);
    return [];
  }
}

export default async function DirectoryPage() {
  const persons = await getPersons();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Person Directory</h1>
          <Button asChild>
            <Link href="/directory/add">Add Person</Link>
          </Button>
        </div>

        {/* Search Bar */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <Input 
                placeholder="Search by name, email, or phone..." 
                className="flex-1"
              />
              <Button variant="secondary">Search</Button>
            </div>
          </CardContent>
        </Card>

        {/* Directory Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Persons ({persons.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {persons.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <p className="text-lg mb-4">No persons found</p>
                <Button asChild>
                  <Link href="/directory/add">Add your first person</Link>
                </Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Full Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {persons.map((person) => (
                    <TableRow key={person.id}>
                      <TableCell className="font-medium">{person.id}</TableCell>
                      <TableCell>{person.name}</TableCell>
                      <TableCell className="text-muted-foreground">{person.email}</TableCell>
                      <TableCell>{person.age || '-'}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {new Date(person.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Button asChild variant="outline" size="sm">
                            <Link href={`/directory/edit/${person.id}`}>Edit</Link>
                          </Button>
                          <Button variant="destructive" size="sm">
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        <div className="mt-8">
          <Button asChild variant="link">
            <Link href="/">← Back to Home</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}