import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function McpSetupPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">MCP Setup: Person CRUD Server</h1>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <p>
              This guide explains how to configure a Model Context Protocol (MCP) server that exposes
              Person CRUD operations to Claude Desktop. You will be able to create, read, update, and
              delete people in the same PostgreSQL database used by this app.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Prerequisites</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>• Claude Desktop installed</p>
            <p>• Node.js 18+ and npm</p>
            <p>• PostgreSQL with <code className="bg-muted px-1 py-0.5 rounded">DATABASE_URL</code> configured (see .env)</p>
            <p>• Prisma schema applied to your database</p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>1. Prepare Environment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>• Ensure your <code className="bg-muted px-1 py-0.5 rounded">.env</code> has a valid <code className="bg-muted px-1 py-0.5 rounded">DATABASE_URL</code>.</p>
            <p>• Run Prisma migrations and generate client:</p>
            <pre className="bg-muted p-3 rounded text-xs font-mono">{`npm run prisma:migrate\nnpm run prisma:generate`}</pre>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>2. Start or Install the MCP Server</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              Use your Person MCP server repository (link on the GitHub page). Typical steps:
            </p>
            <pre className="bg-muted p-3 rounded text-xs font-mono">{`git clone <YOUR_MCP_SERVER_REPO_URL> person-mcp-server\ncd person-mcp-server\nnpm install\n# Ensure it reads DATABASE_URL from environment\nnpm run start`}</pre>
            <p>
              The server should expose MCP tools like <code className="bg-muted px-1 py-0.5 rounded">person.create</code>, <code className="bg-muted px-1 py-0.5 rounded">person.get</code>, <code className="bg-muted px-1 py-0.5 rounded">person.update</code>, and <code className="bg-muted px-1 py-0.5 rounded">person.delete</code>.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>3. Configure Claude Desktop</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              Add an MCP server entry in Claude Desktop settings (Developer Mode). Point to your server
              command and ensure the environment includes <code className="bg-muted px-1 py-0.5 rounded">DATABASE_URL</code>.
            </p>
            <pre className="bg-muted p-3 rounded text-xs font-mono">{`{
  "mcpServers": {
    "person-crud": {
      "command": "node",
      "args": ["dist/index.js"],
      "env": {
        "DATABASE_URL": "<your postgres url>"
      }
    }
  }
}`}</pre>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>4. Test in Claude Desktop</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>• Open Claude Desktop, select the <em>person-crud</em> MCP server.</p>
            <p>• Try tool calls: create a person, fetch by id, update, then delete.</p>
            <p>• Use the <Link className="underline" href="/mcp-demo">/mcp-demo</Link> page here to observe DB changes live.</p>
          </CardContent>
        </Card>

        <div className="mt-6">
          <Button asChild variant="link">
            <Link href="/github">Go to GitHub →</Link>
          </Button>
        </div>
      </main>
    </div>
  )
}
