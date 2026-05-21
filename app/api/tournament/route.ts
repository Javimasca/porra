import { NextResponse } from 'next/server'
import { getPrisma } from '../../../src/lib/prisma'

export async function GET() {
  try {
    const prisma = getPrisma()
    const matches = await prisma.match.findMany({
      orderBy: [{ stage: 'asc' }, { date: 'asc' }, { id: 'asc' }],
    })

    return NextResponse.json({ matches })
  } catch {
    return NextResponse.json({ error: 'Database unavailable' }, { status: 503 })
  }
}

export async function PUT(request: Request) {
  try {
    const prisma = getPrisma()
    const state = await request.json()

    await prisma.$transaction(
      state.matches.map((match: {
        id: string
        group?: string
        stage: string
        date?: string
        venue?: string
        home: string
        away: string
        homeScore?: number
        awayScore?: number
        penaltyWinner?: string
        status: string
      }) =>
        prisma.match.upsert({
          where: { id: match.id },
          update: {
            group: match.group,
            stage: match.stage,
            date: match.date ? new Date(match.date) : null,
            venue: match.venue,
            home: match.home,
            away: match.away,
            homeScore: match.homeScore,
            awayScore: match.awayScore,
            penaltyWinner: match.penaltyWinner,
            status: match.status,
          },
          create: {
            id: match.id,
            group: match.group,
            stage: match.stage,
            date: match.date ? new Date(match.date) : null,
            venue: match.venue,
            home: match.home,
            away: match.away,
            homeScore: match.homeScore,
            awayScore: match.awayScore,
            penaltyWinner: match.penaltyWinner,
            status: match.status,
          },
        }),
      ),
    )

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Database unavailable' }, { status: 503 })
  }
}
