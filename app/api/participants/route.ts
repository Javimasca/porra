import { NextResponse } from 'next/server'
import { getPrisma } from '../../../src/lib/prisma'

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
  try {
    const prisma = getPrisma()
    const participants = await request.json()

    if (!Array.isArray(participants)) {
      return NextResponse.json(
        { error: 'Invalid participants payload' },
        { status: 400 },
      )
    }

    await prisma.$transaction([
      prisma.participant.deleteMany({
        where: {
          id: {
            notIn: participants.map((participant: { id: string }) => participant.id),
          },
          predictions: {
            none: {},
          },
        },
      }),
      ...participants.map((participant: {
        id: string
        name: string
        contact: string
        accessCode: string
        status: string
      }) =>
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