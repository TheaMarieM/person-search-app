'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type Person = {
  id: number
  name: string
  email: string
  phoneNumber: string
  age: number | null
  createdAt: string
}

export default function McpDemoPage() {
  const [people, setPeople] = useState<Person[]>([])
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phoneNumber: '', age: '' })
  const [editingId, setEditingId] = useState<number | null>(null)

  async function load() {
    setLoading(true)
    try {
      const res = await fetch('/api/people/all')
      const data = await res.json()
      setPeople(Array.isArray(data) ? data : [])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
    const i = setInterval(load, 3000)
    return () => clearInterval(i)
  }, [])

  async function createPerson() {
    await fetch('/api/people', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        phoneNumber: form.phoneNumber,
        age: form.age ? Number(form.age) : null,
      }),
    })
    setForm({ name: '', email: '', phoneNumber: '', age: '' })
    await load()
  }

  async function updatePerson(id: number, patch: Partial<Person>) {
    await fetch(`/api/people/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patch),
    })
    setEditingId(null)
    await load()
  }

  async function deletePerson(id: number) {
    await fetch(`/api/people/${id}`, { method: 'DELETE' })
    await load()
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">MCP Demo: Live CRUD</h1>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>How this demo works</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>
              This page polls the database every few seconds and shows all Person records. When your MCP server
              performs create, update, or delete operations via Claude Desktop, you will see the changes appear here.
            </p>
            <p>
              You can also create/update/delete manually using the controls below to verify end-to-end behavior.
            </p>
            <p>
              For setup instructions, see <Link className="underline" href="/mcp-setup">/mcp-setup</Link>.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Create Person</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-5">
            <Input placeholder="Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            <Input placeholder="Email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
            <Input placeholder="Phone" value={form.phoneNumber} onChange={e => setForm(f => ({ ...f, phoneNumber: e.target.value }))} />
            <Input placeholder="Age" value={form.age} onChange={e => setForm(f => ({ ...f, age: e.target.value }))} />
            <Button onClick={createPerson} disabled={loading || !form.name || !form.email || !form.phoneNumber}>Add</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>People {loading ? '(loading...)' : `(${people.length})`}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {people.map(p => (
                  <TableRow key={p.id}>
                    <TableCell>{p.id}</TableCell>
                    <TableCell>
                      {editingId === p.id ? (
                        <Input defaultValue={p.name} onBlur={e => updatePerson(p.id, { name: e.target.value })} />
                      ) : (
                        p.name
                      )}
                    </TableCell>
                    <TableCell>
                      {editingId === p.id ? (
                        <Input defaultValue={p.email} onBlur={e => updatePerson(p.id, { email: e.target.value })} />
                      ) : (
                        p.email
                      )}
                    </TableCell>
                    <TableCell>
                      {editingId === p.id ? (
                        <Input defaultValue={p.phoneNumber} onBlur={e => updatePerson(p.id, { phoneNumber: e.target.value })} />
                      ) : (
                        p.phoneNumber
                      )}
                    </TableCell>
                    <TableCell>
                      {editingId === p.id ? (
                        <Input defaultValue={p.age ?? ''} onBlur={e => updatePerson(p.id, { age: Number(e.target.value) || null })} />
                      ) : (
                        p.age ?? '-'
                      )}
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="outline" size="sm" onClick={() => setEditingId(editingId === p.id ? null : p.id)}>
                        {editingId === p.id ? 'Done' : 'Edit'}
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => deletePerson(p.id)}>Delete</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="mt-6 flex gap-4">
          <Button asChild variant="link"><Link href="/mcp-setup">MCP Setup</Link></Button>
          <Button asChild variant="link"><Link href="/about">About</Link></Button>
          <Button asChild variant="link"><Link href="/github">GitHub</Link></Button>
        </div>
      </main>
    </div>
  )
}
