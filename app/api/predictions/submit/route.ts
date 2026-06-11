import crypto from 'crypto'
import { NextResponse } from 'next/server'
import { getPrisma } from '../../../../src/lib/prisma'
import { isPredictionPhase } from '../../../../src/domain/phases'

function createVerificationCode() {
  return `PORRA-2026-${crypto.randomUUID().slice(0, 8).toUpperCase()}`
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'string')
}

function isStringRecord(value: unknown): value is Record<string, string> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value)
    && Object.values(value).every((item) => typeof item === 'string')
}

function isStringArrayRecord(value: unknown): value is Record<string, string[]> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value)
    && Object.values(value).every(isStringArray)
}

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

function isSubmitPayload(value: unknown): value is {
  accessCode: string
  displayName: string
  locked: boolean
  champion: string
  semifinalists: string[]
  topScorer: string
  mvp: string
  groupWinners: Record<string, string>
  groupQualified: Record<string, string[]>
  bestThirds: string[]
  matches: Array<{
    matchId: string
    homeScore: number
    awayScore: number
    penaltyWinner?: string
  }>
} {
  if (!value || typeof value !== 'object') return false

  const payload = value as Record<string, unknown>
  return (
    typeof payload.accessCode === 'string' &&
    typeof payload.displayName === 'string' &&
    typeof payload.locked === 'boolean' &&
    typeof payload.champion === 'string' &&
    isStringArray(payload.semifinalists) &&
    typeof payload.topScorer === 'string' &&
    typeof payload.mvp === 'string' &&
    isStringRecord(payload.groupWinners) &&
    isStringArrayRecord(payload.groupQualified) &&
    isStringArray(payload.bestThirds) &&
    Array.isArray(payload.matches) &&
    payload.matches.every(isMatchPrediction)
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
    const prisma = getPrisma()
    const payload = await request.json()

    if (!isSubmitPayload(payload)) {
      return NextResponse.json({ error: 'Invalid prediction payload' }, { status: 400 })
    }

    if (await currentPredictionPhase() !== 'preGroups') {
      return NextResponse.json({ error: 'Group predictions are closed' }, { status: 409 })
    }

    const participant = await prisma.participant.findUnique({
      where: { accessCode: payload.accessCode },
    })

    if (!participant) {
      return NextResponse.json({ error: 'Invalid access code' }, { status: 401 })
    }

    const saved = await prisma.$transaction(async (tx) => {
      const existingPrediction = await tx.prediction.findUnique({
        where: { participantId: participant.id },
        select: {
          id: true,
          locked: true,
          verificationCode: true,
        },
      })

      if (existingPrediction?.locked) {
        return null
      }

      await tx.participant.update({
        where: { id: participant.id },
        data: { name: payload.displayName },
      })

      const verificationCode = payload.locked
        ? existingPrediction?.verificationCode ?? createVerificationCode()
        : existingPrediction?.verificationCode ?? null

      const prediction = await tx.prediction.upsert({
        where: { participantId: participant.id },
        update: {
          locked: payload.locked,
          reopenRequested: false,
          champion: payload.champion,
          semifinalists: payload.semifinalists,
          topScorer: payload.topScorer,
          mvp: payload.mvp,
          groupWinners: payload.groupWinners,
          groupQualified: payload.groupQualified,
          bestThirds: payload.bestThirds,
          verificationCode,
        },
        create: {
          participantId: participant.id,
          locked: payload.locked,
          reopenRequested: false,
          champion: payload.champion,
          semifinalists: payload.semifinalists,
          topScorer: payload.topScorer,
          mvp: payload.mvp,
          groupWinners: payload.groupWinners,
          groupQualified: payload.groupQualified,
          bestThirds: payload.bestThirds,
          verificationCode,
        },
      })

      await tx.matchPrediction.deleteMany({
        where: { predictionId: prediction.id },
      })

      const existingMatches = await tx.match.findMany({ select: { id: true } })
      const existingMatchIds = new Set(existingMatches.map((match) => match.id))
      const validMatches = Array.from(
        new Map(
          payload.matches
            .filter((match) => existingMatchIds.has(match.matchId))
            .map((match) => [match.matchId, match]),
        ).values(),
      )

      if (validMatches.length > 0) {
        await tx.matchPrediction.createMany({
          data: validMatches.map((match) => ({
            predictionId: prediction.id,
            matchId: match.matchId,
            homeScore: match.homeScore,
            awayScore: match.awayScore,
            penaltyWinner: match.penaltyWinner,
          })),
        })
      }

      return tx.prediction.findUnique({
        where: { participantId: participant.id },
        include: { matches: true },
      })
    })

    if (!saved) {
      return NextResponse.json({ error: 'Prediction is locked' }, { status: 409 })
    }

    return NextResponse.json({
      participant: { ...participant, name: payload.displayName },
      prediction: {
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
      },
    })
  } catch (error) {
    console.error('POST /api/predictions/submit error:', error)
    return NextResponse.json({ error: 'Database unavailable' }, { status: 503 })
  }
}
