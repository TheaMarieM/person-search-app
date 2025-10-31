import { prisma } from '@/lib/prisma'
import type { Prisma } from '@prisma/client'

// Simple in-memory rate limiter (best-effort for demo; use Redis in prod)
const buckets = new Map<string, { count: number; resetAt: number }>()

function keyFor(ip: string, bucket: string) {
  return `${bucket}:${ip}`
}

export function getIp(req: Request): string {
  const fwd = req.headers.get('x-forwarded-for') || ''
  const ip = fwd.split(',')[0]?.trim()
  // NextRequest may expose ip via geo in some platforms; fallback
  return ip || '0.0.0.0'
}

export function rateLimitByIp(
  req: Request,
  bucket: string,
  limit = 30,
  windowMs = 60_000
): { ok: true } | { ok: false; retryAfterMs: number } {
  const ip = getIp(req)
  const k = keyFor(ip, bucket)
  const now = Date.now()
  const e = buckets.get(k)
  if (!e || e.resetAt < now) {
    buckets.set(k, { count: 1, resetAt: now + windowMs })
    return { ok: true }
  }
  if (e.count >= limit) {
    return { ok: false, retryAfterMs: e.resetAt - now }
  }
  e.count += 1
  return { ok: true }
}

export function isAdmin(email?: string | null) {
  if (!email) return false
  const list = (process.env.ADMIN_EMAILS || '').split(',').map(s => s.trim().toLowerCase()).filter(Boolean)
  return list.includes(email.toLowerCase())
}

export async function audit(params: {
  actorEmail?: string | null
  action: string
  target: string
  details?: Prisma.InputJsonValue
  ip?: string
}) {
  try {
    await prisma.auditLog.create({
      data: {
        actorEmail: params.actorEmail || null,
        action: params.action,
        target: params.target,
        details: params.details,
        ip: params.ip || null,
      },
    })
  } catch (e) {
    console.error('Audit log failed', e)
  }
}
