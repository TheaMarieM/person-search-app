import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function GitHubPage() {
  const mcpRepo = process.env.NEXT_PUBLIC_MCP_REPO_URL
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Project GitHub</h1>
        <Card>
          <CardHeader>
            <CardTitle>Repository</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              The source code for this app is publicly available on GitHub.
            </p>
            <Button asChild>
              <Link href="https://github.com/TheaMarieM/person-search-app" target="_blank" rel="noopener noreferrer">
                Open Repository
              </Link>
            </Button>
            {mcpRepo && (
              <div className="pt-2 border-t mt-4">
                <p className="text-sm text-muted-foreground mb-2">Person MCP Server repository:</p>
                <Button asChild variant="outline">
                  <Link href={mcpRepo} target="_blank" rel="noopener noreferrer">Open MCP Server Repo</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
        <div className="mt-6">
          <Button asChild variant="link">
            <Link href="/about">Back to About</Link>
          </Button>
        </div>
      </main>
    </div>
  )
}
