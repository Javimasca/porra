import { NextResponse } from 'next/server'
import { getPrisma } from '../../../../src/lib/prisma'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const accessCode = typeof body?.accessCode === 'string' ? body.accessCode : ''

    if (!accessCode) {
      return NextResponse.json({ error: 'Invalid access code' }, { status: 400 })
    }

    const prisma = getPrisma()
    const participant = await prisma.participant.findUnique({
      where: { accessCode },
      select: {
        id: true,
        name: true,
        contact: true,
        accessCode: true,
        status: true,
      },
    })

    if (!participant) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    return NextResponse.json(participant)
  } catch (error) {
    console.error('POST /api/participants/lookup error:', error)
    return NextResponse.json({ error: 'Database unavailable' }, { status: 503 })
  }
}

