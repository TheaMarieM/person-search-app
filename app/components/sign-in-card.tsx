'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { signIn } from 'next-auth/react'

export default function SignInCard() {
  return (
    <div className="flex items-center justify-center py-24">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-semibold">Welcome to Person Search</h1>
            <p className="text-sm text-muted-foreground">
              Sign in with your Google account to access the application
            </p>
            <Button
              className="w-full"
              variant="secondary"
              onClick={() => signIn('google', { callbackUrl: '/' })}
            >
              <span className="mr-2 text-lg">G</span>
              Sign in with Google
            </Button>
            <p className="text-xs text-muted-foreground">
              By signing in, you agree to access Person Search application.
              <br />
              Protected by Google OAuth 2.0 authentication.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
