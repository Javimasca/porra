import { NextResponse } from 'next/server'
import { requireAdmin } from '../../../src/lib/apiSecurity'
import { getPrisma } from '../../../src/lib/prisma'

const stages = new Set(['Grupo', 'Ronda de 32', 'Octavos', 'Cuartos', 'Semifinal', 'Final'])
const statuses = new Set(['programado', 'en_juego', 'finalizado'])

function isMatch(value: unknown): value is {
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
} {
  if (!value || typeof value !== 'object') return false

  const match = value as Record<string, unknown>
  return (
    typeof match.id === 'string' &&
    (match.group == null || typeof match.group === 'string') &&
    typeof match.stage === 'string' &&
    stages.has(match.stage) &&
    (match.date == null || typeof match.date === 'string') &&
    (match.venue == null || typeof match.venue === 'string') &&
    typeof match.home === 'string' &&
    typeof match.away === 'string' &&
    (match.homeScore == null || Number.isInteger(match.homeScore)) &&
    (match.awayScore == null || Number.isInteger(match.awayScore)) &&
    (match.penaltyWinner == null || typeof match.penaltyWinner === 'string') &&
    typeof match.status === 'string' &&
    statuses.has(match.status)
  )
}

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
  const unauthorized = requireAdmin(request)
  if (unauthorized) return unauthorized

  try {
    const prisma = getPrisma()
    const state = await request.json()

    if (!state || typeof state !== 'object' || !Array.isArray(state.matches) || !state.matches.every(isMatch)) {
      return NextResponse.json(
        { error: 'Invalid tournament payload' },
        { status: 400 },
      )
    }

    await prisma.$transaction(
      state.matches.map((match) =>
        prisma.match.upsert({
          where: { id: match.id },
          update: {
            group: match.group,
            stage: match.stage,
            date: match.date ? new Date(match.date) : null,
            venue: match.venue,
            home: match.home,
            away: match.away,
            homeScore: match.homeScore ?? null,
            awayScore: match.awayScore ?? null,
            penaltyWinner: match.penaltyWinner ?? null,
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
            homeScore: match.homeScore ?? null,
            awayScore: match.awayScore ?? null,
            penaltyWinner: match.penaltyWinner ?? null,
            status: match.status,
          },
        }),
      ),
    )

    const matches = await prisma.match.findMany({
      orderBy: [{ stage: 'asc' }, { date: 'asc' }, { id: 'asc' }],
    })

    return NextResponse.json({ ok: true, matches })
  } catch {
    return NextResponse.json({ error: 'Database unavailable' }, { status: 503 })
  }
}
