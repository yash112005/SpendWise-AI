// app/api/audit/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { runAudit } from '@/lib/auditEngine'
import type { FormData } from '@/types'
import { v4 as uuidv4 } from 'uuid'

// In-memory store (Day 3 ke liye — Day 4 pe Supabase lagaenge)
const auditStore = new Map<string, any>()

export async function POST(request: NextRequest) {
  try {
    const formData: FormData = await request.json()

    // Audit run karo
    const report = runAudit(formData)

    // Unique ID generate karo
    const id = uuidv4()

    // Store karo
    auditStore.set(id, {
      ...report,
      id,
      formData,
      createdAt: new Date().toISOString(),
    })

    return NextResponse.json({ id, ...report })
  } catch (error) {
    return NextResponse.json(
      { error: 'Audit generate karne mein error aaya' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })

  const audit = auditStore.get(id)
  if (!audit) return NextResponse.json({ error: 'Audit not found' }, { status: 404 })

  return NextResponse.json(audit)
}