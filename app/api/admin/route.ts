import { NextResponse } from 'next/server'
import { verifyAdminPin } from '../../../src/lib/apiSecurity'

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const pin = body && typeof body === 'object' && 'pin' in body
    ? String(body.pin)
    : null

  if (!verifyAdminPin(pin)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  return NextResponse.json({ ok: true })
}

