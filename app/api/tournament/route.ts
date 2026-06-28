import { NextResponse } from 'next/server'
import { requireAdmin } from '../../../src/lib/apiSecurity'
import { tournamentState as officialTournamentState } from '../../../src/data/mockData'
import { getPrisma } from '../../../src/lib/prisma'

const stages = new Set(['Grupo', 'Ronda de 32', 'Octavos', 'Cuartos', 'Semifinal', 'Final'])
const statuses = new Set(['programado', 'en_juego', 'finalizado'])

function dateFromMatch(value?: string) {
  if (!value) return null

  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? null : date
}

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : 'Unknown database error'
}

async function ensureSettingsTable(prisma: ReturnType<typeof getPrisma>) {
  await prisma.$executeRaw`
    CREATE TABLE IF NOT EXISTS app_settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `
}

async function readTournamentBonus(prisma: ReturnType<typeof getPrisma>) {
  await ensureSettingsTable(prisma)
  const rows = await prisma.$queryRaw<Array<{ key: string; value: string }>>`
    SELECT key, value FROM app_settings WHERE key IN ('topScorer', 'mvp')
  `
  const settings = new Map(rows.map((row) => [row.key, row.value]))

  return {
    topScorer: settings.get('topScorer') || undefined,
    mvp: settings.get('mvp') || undefined,
  }
}

async function saveSetting(prisma: ReturnType<typeof getPrisma>, key: string, value: string) {
  await prisma.$executeRaw`
    INSERT INTO app_settings (key, value, updated_at)
    VALUES (${key}, ${value}, NOW())
    ON CONFLICT (key) DO UPDATE
    SET value = EXCLUDED.value,
        updated_at = NOW()
  `
}

async function syncOfficialKnockoutSchedule(prisma: ReturnType<typeof getPrisma>) {
  const officialMatches = officialTournamentState.matches.filter((match) => match.stage !== 'Grupo')
  const existingMatches = await prisma.match.findMany({
    where: { id: { in: officialMatches.map((match) => match.id) } },
    select: { id: true, group: true, stage: true, date: true, venue: true, home: true, away: true },
  })
  const existingById = new Map(existingMatches.map((match) => [match.id, match]))
  const changedMatches = officialMatches.filter((match) => {
    const current = existingById.get(match.id)
    return !current ||
      current.group !== (match.group ?? null) ||
      current.stage !== match.stage ||
      !sameNullableDate(current.date, match.date) ||
      current.venue !== (match.venue ?? null) ||
      current.home !== match.home ||
      current.away !== match.away
  })

  if (changedMatches.length === 0) {
    return
  }

  await prisma.$transaction(
    changedMatches.map((match) =>
      prisma.match.upsert({
        where: { id: match.id },
        update: {
          group: match.group,
          stage: match.stage,
          date: dateFromMatch(match.date),
          venue: match.venue,
          home: match.home,
          away: match.away,
        },
        create: {
          id: match.id,
          group: match.group,
          stage: match.stage,
          date: dateFromMatch(match.date),
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
    { timeout: 20000 },
  )
}

function sameNullableDate(left: Date | null, right?: string) {
  const parsedRight = dateFromMatch(right)
  return (left?.getTime() ?? null) === (parsedRight?.getTime() ?? null)
}

function matchChanged(
  current: {
    group: string | null
    stage: string
    date: Date | null
    venue: string | null
    home: string
    away: string
    homeScore: number | null
    awayScore: number | null
    penaltyWinner: string | null
    status: string
  },
  next: {
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
  },
) {
  return current.group !== (next.group ?? null) ||
    current.stage !== next.stage ||
    !sameNullableDate(current.date, next.date) ||
    current.venue !== (next.venue ?? null) ||
    current.home !== next.home ||
    current.away !== next.away ||
    current.homeScore !== (next.homeScore ?? null) ||
    current.awayScore !== (next.awayScore ?? null) ||
    current.penaltyWinner !== (next.penaltyWinner ?? null) ||
    current.status !== next.status
}

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
    await syncOfficialKnockoutSchedule(prisma)
    const matches = await prisma.match.findMany({
      orderBy: [{ stage: 'asc' }, { date: 'asc' }, { id: 'asc' }],
    })
    const bonus = await readTournamentBonus(prisma)

    return NextResponse.json({ ...bonus, matches })
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

    const existingMatches = await prisma.match.findMany()
    const existingById = new Map(existingMatches.map((match) => [match.id, match]))
    const changedMatches = state.matches.filter((match) => {
      const current = existingById.get(match.id)
      return !current || matchChanged(current, match)
    })

    if (changedMatches.length > 0) {
      await prisma.$transaction(
        changedMatches.map((match) =>
          prisma.match.upsert({
            where: { id: match.id },
            update: {
              group: match.group,
              stage: match.stage,
              date: dateFromMatch(match.date),
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
              date: dateFromMatch(match.date),
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
        { timeout: 20000 },
      )
    }

    await ensureSettingsTable(prisma)
    await Promise.all([
      saveSetting(prisma, 'topScorer', typeof state.topScorer === 'string' ? state.topScorer : ''),
      saveSetting(prisma, 'mvp', typeof state.mvp === 'string' ? state.mvp : ''),
    ])

    const matches = await prisma.match.findMany({
      orderBy: [{ stage: 'asc' }, { date: 'asc' }, { id: 'asc' }],
    })
    const bonus = await readTournamentBonus(prisma)

    return NextResponse.json({ ok: true, ...bonus, matches })
  } catch (error) {
    console.error('PUT /api/tournament error:', error)
    return NextResponse.json(
      {
        error: 'Database unavailable',
        detail: errorMessage(error),
      },
      { status: 503 },
    )
  }
}
