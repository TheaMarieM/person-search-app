// app/components/navbar.tsx
'use client'

import Link from 'next/link';
import { Search, Moon, Sun, Github } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from "@/components/ui/button";
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const { data: session, status } = useSession();

  return (
    <nav className="bg-background shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <Search className="h-8 w-8 text-primary" aria-hidden="true" />
              <span className="ml-2 text-lg font-semibold text-foreground">Person Search</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
              Home
            </Link>
            <Link href="/about" className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
              About
            </Link>
            <Link href="/mcp-setup" className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
              MCP Setup
            </Link>
            <Link href="/mcp-demo" className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
              MCP Demo
            </Link>
            <Link href="/auth-setup" className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
              Auth Setup
            </Link>
            <Link href="/security" className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
              Security
            </Link>
            <a 
              href="https://github.com/TheaMarieM/person-search-app" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
            {status === 'loading' ? (
              <span className="text-sm text-muted-foreground">Loading...</span>
            ) : session?.user ? (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground hidden md:inline">{session.user.name || session.user.email}</span>
                <Button variant="outline" size="sm" onClick={() => signOut()}>Logout</Button>
              </div>
            ) : (
              <Button variant="default" size="sm" onClick={() => signIn('google')}>Login</Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle theme"
            >
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}