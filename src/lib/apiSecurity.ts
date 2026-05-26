import { NextResponse } from 'next/server'

export function verifyAdminPin(pin: string | null) {
  const adminPin = process.env.ADMIN_PIN

  if (!adminPin) {
    return true
  }

  return pin === adminPin
}

export function requireAdmin(request: Request) {
  if (verifyAdminPin(request.headers.get('x-admin-pin'))) {
    return null
  }

  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}
