import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function AuthSetupPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">OAuth Setup (Auth.js / NextAuth v5)</h1>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>This app uses Auth.js (NextAuth v5) with Google OAuth for authentication.</p>
            <p>Protected routes require a valid session; unauthenticated users are redirected to sign in.</p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>1. Install and Env Vars</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-3">
            <p>Install deps:</p>
            <pre className="bg-muted p-3 rounded text-xs font-mono">{`npm install next-auth`}</pre>
            <p>Add to <code className="bg-muted px-1 py-0.5 rounded">.env</code>:</p>
            <pre className="bg-muted p-3 rounded text-xs font-mono">{`GOOGLE_CLIENT_ID=...\nGOOGLE_CLIENT_SECRET=...\nNEXTAUTH_SECRET=...\nNEXTAUTH_URL=http://localhost:3000`}</pre>
            <p>Create OAuth credentials in Google Cloud Console (Web application). Authorized redirect URI:</p>
            <pre className="bg-muted p-3 rounded text-xs font-mono">{`http://localhost:3000/api/auth/callback/google`}</pre>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>2. Handlers and Middleware</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>Auth handlers are exposed at <code className="bg-muted px-1 py-0.5 rounded">/api/auth/[...nextauth]</code>. Middleware protects pages and APIs.</p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>3. Test the Flow</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>Start the app, then sign in via the navbar Login button.</p>
            <p>Try accessing protected pages like <Link className="underline" href="/mcp-demo">/mcp-demo</Link> and <Link className="underline" href="/directory">/directory</Link>.</p>
          </CardContent>
        </Card>

        <div className="mt-6 flex gap-4">
          <Button asChild variant="link"><Link href="/security">Security</Link></Button>
          <Button asChild variant="link"><Link href="/about">About</Link></Button>
        </div>
      </main>
    </div>
  )
}
