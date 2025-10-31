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
          This application uses Prisma as the ORM layer for type-safe database access and migrations.
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
        <div className="space-y-3">
          <div className="border-l-4 border-primary pl-4 py-2">
            <div className="font-mono text-sm font-semibold">id</div>
            <div className="text-sm text-muted-foreground">Type: Int | Primary Key | Auto-increment</div>
          </div>
          <div className="border-l-4 border-primary pl-4 py-2">
            <div className="font-mono text-sm font-semibold">name</div>
            <div className="text-sm text-muted-foreground">Type: String | Required</div>
          </div>
          <div className="border-l-4 border-primary pl-4 py-2">
            <div className="font-mono text-sm font-semibold">email</div>
            <div className="text-sm text-muted-foreground">Type: String | Required | Unique</div>
          </div>
          <div className="border-l-4 border-primary pl-4 py-2">
            <div className="font-mono text-sm font-semibold">phoneNumber</div>
            <div className="text-sm text-muted-foreground">Type: String | Required</div>
          </div>
          <div className="border-l-4 border-primary pl-4 py-2">
            <div className="font-mono text-sm font-semibold">age</div>
            <div className="text-sm text-muted-foreground">Type: Int | Optional</div>
          </div>
          <div className="border-l-4 border-primary pl-4 py-2">
            <div className="font-mono text-sm font-semibold">createdAt</div>
            <div className="text-sm text-muted-foreground">Type: DateTime | Default now()</div>
          </div>
          <div className="border-l-4 border-primary pl-4 py-2">
            <div className="font-mono text-sm font-semibold">updatedAt</div>
            <div className="text-sm text-muted-foreground">Type: DateTime | Auto-updated</div>
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
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-xs font-mono">{`model Person {
  id           Int      @id @default(autoincrement())
  name         String
  email        String   @unique
  phoneNumber  String
  age          Int?
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}`}</pre>
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
            <span className="text-muted-foreground">Env var <code className="bg-muted px-2 py-1 rounded">DATABASE_URL</code></span>
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
        <DatabaseConnection />
        <Button asChild variant="link">
          <Link href="/about">Back to About</Link>
        </Button>
      </main>
    </div>
  )
}
