import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github, Database } from 'lucide-react' // Removed unused Linkedin and Twitter

function ProjectOverview() {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Project Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">
          Person Search is a full-stack web application demonstrating modern web development practices. 
          It provides a powerful interface for managing and searching person records with a clean, 
          responsive user experience.
        </p>
        <p className="mb-4">
          This project utilizes Next.js 15 with the App Router, React 19, TypeScript, Prisma ORM, 
          and PostgreSQL to create a production-ready application with CRUD functionality.
        </p>
        <p>
          Key features include full CRUD operations, server-side filtering, type-safe database queries, 
          and a professional dark mode toggle for user comfort.
        </p>
      </CardContent>
    </Card>
  )
}

function TechStack() {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Technology Stack</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-3">Frontend</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Next.js 15 (App Router)</li>
              <li>• React 19</li>
              <li>• TypeScript</li>
              <li>• Tailwind CSS</li>
              <li>• shadcn/ui Components</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Backend & Database</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Next.js API Routes</li>
              <li>• Prisma ORM</li>
              <li>• PostgreSQL</li>
              <li>• TypeScript</li>
              <li>• Zod Validation</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function McpIntegration() {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>MCP Integration Architecture</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm text-muted-foreground">
        <p>
          The Model Context Protocol (MCP) server exposes Person CRUD tools to Claude Desktop. Those tools
          operate directly on the same PostgreSQL database used by this app via Prisma.
        </p>
        <div className="bg-muted p-4 rounded-lg">
          <ul className="list-disc pl-6 space-y-1">
            <li>Claude Desktop invokes MCP tools: person.create, person.get, person.update, person.delete.</li>
            <li>MCP server uses Prisma Client against the <code className="bg-background px-1 py-0.5 rounded">Person</code> model.</li>
            <li>Changes are visible here in real time via the <Link className="underline" href="/mcp-demo">/mcp-demo</Link> page.</li>
            <li>Configure Claude Desktop to launch the MCP server with your <code className="bg-background px-1 py-0.5 rounded">DATABASE_URL</code>.</li>
          </ul>
        </div>
        <div className="flex gap-3">
          <Button asChild>
            <Link href="/mcp-setup">MCP Setup</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/mcp-demo">MCP Demo</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function SocialLinks() {
  return (
    <div className="flex flex-wrap gap-4">
      <Button asChild>
        <Link href="https://github.com/TheaMarieM/person-search-app" target="_blank" rel="noopener noreferrer">
          <Github className="mr-2 h-4 w-4" /> Project Repository
        </Link>
      </Button>
      <Button asChild variant="outline">
        <Link href="https://github.com/TheaMarieM" target="_blank" rel="noopener noreferrer">
          <Github className="mr-2 h-4 w-4" /> My GitHub
        </Link>
      </Button>
    </div>
  )
}

function DeveloperInfo() {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>About the Developer</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">
          Hi, I&apos;m a passionate developer creating efficient, user-friendly web applications using 
          the latest technologies.
        </p>
        <p className="mb-4">
          This project serves as a demonstration of my skills in full-stack development with Next.js, React, 
          Prisma, and PostgreSQL. I&apos;m always looking to learn and improve, so feel free to check out my 
          GitHub repository and reach out with any questions or feedback!
        </p>
        <SocialLinks />
      </CardContent>
    </Card>
  )
}

function QuickLinks() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Explore More</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-4">
          <Button asChild variant="outline" className="justify-start">
            <Link href="/database">
              <Database className="mr-2 h-4 w-4" />
              Database Structure
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">About Person Search</h1>
        <ProjectOverview />
        <TechStack />
        <McpIntegration />
        <DeveloperInfo />
        <QuickLinks />
        <Button asChild variant="link" className="mt-4">
          <Link href="/">
            Back to Home
          </Link>
        </Button>
      </main>
    </div>
  )
}