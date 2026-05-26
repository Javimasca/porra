import { NextResponse } from 'next/server'
import { requireAdmin } from '../../../src/lib/apiSecurity'
import { getPrisma } from '../../../src/lib/prisma'

const statuses = new Set(['pendiente', 'validado', 'retirado'])

function isParticipant(item: unknown): item is {
  id: string
  name: string
  contact: string
  accessCode: string
  status: string
} {
  if (!item || typeof item !== 'object') return false

  const participant = item as Record<string, unknown>
  return (
    typeof participant.id === 'string' &&
    typeof participant.name === 'string' &&
    typeof participant.contact === 'string' &&
    typeof participant.accessCode === 'string' &&
    typeof participant.status === 'string' &&
    statuses.has(participant.status)
  )
}

export async function GET() {
  try {
    const prisma = getPrisma()
    const participants = await prisma.participant.findMany({
      orderBy: { createdAt: 'asc' },
    })

    return NextResponse.json(participants)
  } catch (error) {
    console.error('GET /api/participants error:', error)
    return NextResponse.json({ error: 'Database unavailable' }, { status: 503 })
  }
}

export async function PUT(request: Request) {
  const unauthorized = requireAdmin(request)
  if (unauthorized) return unauthorized

  try {
    const prisma = getPrisma()
    const participants = await request.json()

    if (!Array.isArray(participants) || !participants.every(isParticipant)) {
      return NextResponse.json(
        { error: 'Invalid participants payload' },
        { status: 400 },
      )
    }

    await prisma.$transaction([
      ...participants.map((participant) =>
        prisma.participant.upsert({
          where: { id: participant.id },
          update: {
            name: participant.name,
            contact: participant.contact,
            accessCode: participant.accessCode,
            status: participant.status,
          },
          create: {
            id: participant.id,
            name: participant.name,
            contact: participant.contact,
            accessCode: participant.accessCode,
            status: participant.status,
          },
        }),
      ),
    ])

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('PUT /api/participants error:', error)
    return NextResponse.json({ error: 'Database unavailable' }, { status: 503 })
  }
}
