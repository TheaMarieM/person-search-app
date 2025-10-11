import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

function PrismaOverview() {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Prisma ORM</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          This application uses Prisma as the Object-Relational Mapping (ORM) layer. 
          Prisma provides type-safe database access, automatic migrations, and a visual database browser (Prisma Studio).
        </p>
        <div className="bg-muted p-4 rounded-lg">
          <p className="text-sm font-mono text-muted-foreground">
            Location: <code className="bg-background px-2 py-1 rounded">prisma/schema.prisma</code>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

function PersonModel() {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Person Model</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground mb-4">
          The Person model represents individual records in the database. Each field has specific 
          validation rules and constraints to ensure data integrity.
        </p>
        <div className="space-y-3">
          <div className="border-l-4 border-primary pl-4 py-2">
            <div className="font-mono text-sm font-semibold">id</div>
            <div className="text-sm text-muted-foreground">Type: Int | Primary Key | Auto-increment</div>
            <div className="text-xs text-muted-foreground mt-1">Unique identifier for each person record</div>
          </div>

          <div className="border-l-4 border-primary pl-4 py-2">
            <div className="font-mono text-sm font-semibold">name</div>
            <div className="text-sm text-muted-foreground">Type: String | Required</div>
            <div className="text-xs text-muted-foreground mt-1">Full name of the person</div>
          </div>

          <div className="border-l-4 border-primary pl-4 py-2">
            <div className="font-mono text-sm font-semibold">email</div>
            <div className="text-sm text-muted-foreground">Type: String | Required | Unique</div>
            <div className="text-xs text-muted-foreground mt-1">Email address - must be unique across all records</div>
          </div>

          <div className="border-l-4 border-primary pl-4 py-2">
            <div className="font-mono text-sm font-semibold">age</div>
            <div className="text-sm text-muted-foreground">Type: Int | Optional (nullable)</div>
            <div className="text-xs text-muted-foreground mt-1">Age of the person - can be left blank</div>
          </div>

          <div className="border-l-4 border-primary pl-4 py-2">
            <div className="font-mono text-sm font-semibold">createdAt</div>
            <div className="text-sm text-muted-foreground">Type: DateTime | Auto-set to current time</div>
            <div className="text-xs text-muted-foreground mt-1">Timestamp when record was created</div>
          </div>

          <div className="border-l-4 border-primary pl-4 py-2">
            <div className="font-mono text-sm font-semibold">updatedAt</div>
            <div className="text-sm text-muted-foreground">Type: DateTime | Auto-updated</div>
            <div className="text-xs text-muted-foreground mt-1">Timestamp of last update</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function SchemaDefinition() {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Schema Definition</CardTitle>
      </CardHeader>
      <CardContent>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-xs font-mono">
{`model Person {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  age       Int?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}`}
        </pre>
      </CardContent>
    </Card>
  )
}

function DatabaseFeatures() {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Key Features</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-3">Data Integrity</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>✓ Unique email constraint</li>
              <li>✓ Required field validation</li>
              <li>✓ Auto-increment primary keys</li>
              <li>✓ Automatic timestamp tracking</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Prisma Capabilities</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>✓ Type-safe queries</li>
              <li>✓ Automatic migrations</li>
              <li>✓ Prisma Studio GUI</li>
              <li>✓ Query optimization</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function DatabaseConnection() {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Database Connection</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm space-y-2">
          <p>
            <span className="font-semibold text-foreground">Provider:</span>{' '}
            <span className="text-muted-foreground">PostgreSQL</span>
          </p>
          <p>
            <span className="font-semibold text-foreground">Configuration:</span>{' '}
            <span className="text-muted-foreground">
              Environment variable <code className="bg-muted px-2 py-1 rounded">DATABASE_URL</code>
            </span>
          </p>
          <p>
            <span className="font-semibold text-foreground">Schema:</span>{' '}
            <span className="text-muted-foreground">public</span>
          </p>
          <p className="text-xs text-muted-foreground italic pt-2">
            Connection details are stored in <code className="bg-muted px-1 py-0.5 rounded">.env</code> file for security
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export default function DatabasePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Database Structure</h1>
        <PrismaOverview />
        <PersonModel />
        <SchemaDefinition />
        <DatabaseFeatures />
        <DatabaseConnection />
        <Button asChild variant="link">
          <Link href="/about">
            Back to About
          </Link>
        </Button>
      </main>
    </div>
  )
}