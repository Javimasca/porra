import { NextResponse } from 'next/server'
import { requireAdmin } from '../../../../src/lib/apiSecurity'
import { getPrisma } from '../../../../src/lib/prisma'

const fields = new Set(['topScorer', 'mvp'])

function isPayload(value: unknown): value is {
  field: 'topScorer' | 'mvp'
  from: string
  to: string
} {
  if (!value || typeof value !== 'object') return false

  const payload = value as Record<string, unknown>
  return (
    typeof payload.field === 'string' &&
    fields.has(payload.field) &&
    typeof payload.from === 'string' &&
    typeof payload.to === 'string' &&
    payload.from.trim().length > 0 &&
    payload.to.trim().length > 0
  )
}

function serializePrediction(prediction: {
  participantId: string
  verificationCode: string | null
  locked: boolean
  reopenRequested: boolean
  champion: string | null
  semifinalists: unknown
  topScorer: string | null
  mvp: string | null
  groupWinners: unknown
  groupQualified: unknown
  bestThirds: unknown
  matches: Array<{
    matchId: string
    homeScore: number
    awayScore: number
    penaltyWinner: string | null
  }>
}) {
  return {
    participantId: prediction.participantId,
    verificationCode: prediction.verificationCode ?? '',
    locked: prediction.locked,
    reopenRequested: prediction.reopenRequested,
    champion: prediction.champion ?? '',
    semifinalists: prediction.semifinalists,
    topScorer: prediction.topScorer ?? '',
    mvp: prediction.mvp ?? '',
    groupWinners: prediction.groupWinners,
    groupQualified: prediction.groupQualified,
    bestThirds: prediction.bestThirds,
    matches: prediction.matches.map((match) => ({
      matchId: match.matchId,
      homeScore: match.homeScore,
      awayScore: match.awayScore,
      penaltyWinner: match.penaltyWinner ?? undefined,
    })),
  }
}

export async function POST(request: Request) {
  const unauthorized = requireAdmin(request)
  if (unauthorized) return unauthorized

  try {
    const payload = await request.json()

    if (!isPayload(payload)) {
      return NextResponse.json({ error: 'Invalid normalize payload' }, { status: 400 })
    }

    const prisma = getPrisma()
    const data = payload.field === 'topScorer'
      ? { topScorer: payload.to.trim() }
      : { mvp: payload.to.trim() }

    await prisma.prediction.updateMany({
      where: { [payload.field]: payload.from.trim() },
      data,
    })

    const predictions = await prisma.prediction.findMany({
      include: { matches: true },
      orderBy: { createdAt: 'asc' },
    })

    return NextResponse.json({
      ok: true,
      predictions: predictions.map(serializePrediction),
    })
  } catch (error) {
    console.error('POST /api/predictions/admin-normalize-names error:', error)
    return NextResponse.json(
      {
        error: 'Database unavailable',
        detail: error instanceof Error ? error.message : 'Unknown database error',
      },
      { status: 503 },
    )
  }
}
