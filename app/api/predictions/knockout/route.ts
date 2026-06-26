import crypto from 'crypto'
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

    const existingPrediction = await prisma.prediction.findUnique({
      where: { participantId: participant.id },
      select: { id: true, locked: true, verificationCode: true, champion: true, semifinalists: true, topScorer: true, mvp: true, groupWinners: true, groupQualified: true, bestThirds: true, reopenRequested: true },
    })

    if (!existingPrediction) {
      return NextResponse.json({ error: 'Prediction not found' }, { status: 404 })
    }

    // Determine verification code if locking now
    const willLock = Boolean(body.locked)
    const verificationCode = willLock && !existingPrediction.verificationCode
      ? `PORRA-2026-${crypto.randomUUID().slice(0, 8).toUpperCase()}`
      : existingPrediction.verificationCode

    // Upsert prediction metadata (keep existing values when not provided)
    const savedPrediction = await prisma.prediction.upsert({
      where: { participantId: participant.id },
      update: {
        locked: willLock ? true : existingPrediction.locked ?? false,
        reopenRequested: willLock ? false : (body.reopenRequested ?? existingPrediction.reopenRequested ?? false),
        champion: typeof body.champion === 'string' ? body.champion : existingPrediction.champion,
        semifinalists: body.semifinalists ?? existingPrediction.semifinalists,
        topScorer: typeof body.topScorer === 'string' ? body.topScorer : existingPrediction.topScorer,
        mvp: typeof body.mvp === 'string' ? body.mvp : existingPrediction.mvp,
        groupWinners: body.groupWinners ?? existingPrediction.groupWinners,
        groupQualified: body.groupQualified ?? existingPrediction.groupQualified,
        bestThirds: body.bestThirds ?? existingPrediction.bestThirds,
        verificationCode,
      },
      create: {
        participantId: participant.id,
        locked: willLock,
        reopenRequested: willLock ? false : (body.reopenRequested ?? false),
        champion: body.champion ?? null,
        semifinalists: body.semifinalists ?? [],
        topScorer: body.topScorer ?? null,
        mvp: body.mvp ?? null,
        groupWinners: body.groupWinners ?? {},
        groupQualified: body.groupQualified ?? {},
        bestThirds: body.bestThirds ?? [],
        verificationCode: willLock ? verificationCode : null,
      },
    })

    const stageMatches = await prisma.match.findMany({
      where: { stage: phase },
      select: { id: true },
    })
    const stageMatchIds = new Set(stageMatches.map((match) => match.id))
    const stagePredictions = matches.filter((match) => stageMatchIds.has(match.matchId))

    await prisma.$transaction(async (tx) => {
      await tx.matchPrediction.deleteMany({
        where: {
          predictionId: savedPrediction.id,
          matchId: { in: [...stageMatchIds] },
        },
      })

      if (stagePredictions.length > 0) {
        await tx.matchPrediction.createMany({
          data: stagePredictions.map((match) => ({
            predictionId: savedPrediction.id,
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
      participant: participant,
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
