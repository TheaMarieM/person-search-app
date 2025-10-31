import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function SecurityPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Security Overview</h1>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Authentication</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <ul className="list-disc pl-6 space-y-1">
              <li>Auth.js (NextAuth v5) with Google OAuth provider.</li>
              <li>Session strategy: JWT.</li>
              <li>Login/logout via navbar; session state persists across refreshes.</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Protected Routes</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <ul className="list-disc pl-6 space-y-1">
              <li>/mcp-demo and /directory are protected via middleware.</li>
              <li>/api/people: GET is public for search; POST/PUT/DELETE require authentication.</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Environment & Secrets</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <ul className="list-disc pl-6 space-y-1">
              <li>GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET</li>
              <li>NEXTAUTH_SECRET (use a strong random string)</li>
              <li>NEXTAUTH_URL (e.g., http://localhost:3000 for local)</li>
            </ul>
          </CardContent>
        </Card>

        <div className="mt-6 flex gap-4">
          <Button asChild variant="link"><Link href="/auth-setup">Auth Setup</Link></Button>
          <Button asChild variant="link"><Link href="/about">About</Link></Button>
        </div>
      </main>
    </div>
  )
}
