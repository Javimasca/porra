import { NextResponse } from 'next/server'
import { getPrisma } from '../../../../src/lib/prisma'
import { isPredictionPhase } from '../../../../src/domain/phases'

const knockoutStages = new Set(['Ronda de 32', 'Octavos', 'Cuartos', 'Semifinal', 'Final'])

function isMatchPrediction(value: unknown): value is {
  matchId: string
  homeScore: number
  awayScore: number
  penaltyWinner?: string
} {
  if (!value || typeof value !== 'object') return false
  const match = value as Record<string, unknown>

  return (
    typeof match.matchId === 'string' &&
    Number.isInteger(match.homeScore) &&
    Number.isInteger(match.awayScore) &&
    (match.penaltyWinner == null || typeof match.penaltyWinner === 'string')
  )
}

async function currentPredictionPhase() {
  const prisma = getPrisma()
  await prisma.$executeRaw`
    CREATE TABLE IF NOT EXISTS app_settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `
  const rows = await prisma.$queryRaw<Array<{ value: string }>>`
    SELECT value FROM app_settings WHERE key = 'predictionPhase' LIMIT 1
  `
  return isPredictionPhase(rows[0]?.value) ? rows[0].value : 'preGroups'
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const accessCode = typeof body?.accessCode === 'string' ? body.accessCode : ''
    const matches = Array.isArray(body?.matches) ? body.matches : []
    const phase = await currentPredictionPhase()

    if (!accessCode || !knockoutStages.has(phase) || !matches.every(isMatchPrediction)) {
      return NextResponse.json({ error: 'Invalid knockout payload' }, { status: 400 })
    }

    const prisma = getPrisma()
    const participant = await prisma.participant.findUnique({ where: { accessCode } })

    if (!participant) {
      return NextResponse.json({ error: 'Invalid access code' }, { status: 401 })
    }

    const prediction = await prisma.prediction.findUnique({
      where: { participantId: participant.id },
      select: { id: true },
    })

    if (!prediction) {
      return NextResponse.json({ error: 'Prediction not found' }, { status: 404 })
    }

    const stageMatches = await prisma.match.findMany({
      where: { stage: phase },
      select: { id: true },
    })
    const stageMatchIds = new Set(stageMatches.map((match) => match.id))
    const stagePredictions = matches.filter((match) => stageMatchIds.has(match.matchId))

    await prisma.$transaction(async (tx) => {
      await tx.matchPrediction.deleteMany({
        where: {
          predictionId: prediction.id,
          matchId: { in: [...stageMatchIds] },
        },
      })

      if (stagePredictions.length > 0) {
        await tx.matchPrediction.createMany({
          data: stagePredictions.map((match) => ({
            predictionId: prediction.id,
            matchId: match.matchId,
            homeScore: match.homeScore,
            awayScore: match.awayScore,
            penaltyWinner: match.penaltyWinner,
          })),
        })
      }
    })

    const saved = await prisma.prediction.findUnique({
      where: { participantId: participant.id },
      include: { matches: true },
    })

    return NextResponse.json({
      prediction: saved
        ? {
            participantId: saved.participantId,
            verificationCode: saved.verificationCode ?? '',
            locked: saved.locked,
            reopenRequested: saved.reopenRequested,
            champion: saved.champion ?? '',
            semifinalists: saved.semifinalists,
            topScorer: saved.topScorer ?? '',
            mvp: saved.mvp ?? '',
            groupWinners: saved.groupWinners,
            groupQualified: saved.groupQualified,
            bestThirds: saved.bestThirds,
            matches: saved.matches.map((match) => ({
              matchId: match.matchId,
              homeScore: match.homeScore,
              awayScore: match.awayScore,
              penaltyWinner: match.penaltyWinner ?? undefined,
            })),
          }
        : null,
    })
  } catch (error) {
    console.error('POST /api/predictions/knockout error:', error)
    return NextResponse.json({ error: 'Database unavailable' }, { status: 503 })
  }
}
