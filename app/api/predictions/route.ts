import { NextResponse } from 'next/server'
import { getPrisma } from '../../../src/lib/prisma'
import { requireAdmin } from '../../../src/lib/apiSecurity'
import crypto from 'crypto'

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
    (match.penaltyWinner === undefined || typeof match.penaltyWinner === 'string')
  )
}

function isPrediction(value: unknown): value is {
  participantId: string
  locked: boolean
  reopenRequested?: boolean
  champion: string
  semifinalists: string[]
  verificationCode?: string
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

  const prediction = value as Record<string, unknown>
  return (
    typeof prediction.participantId === 'string' &&
    typeof prediction.locked === 'boolean' &&
    (prediction.reopenRequested === undefined || typeof prediction.reopenRequested === 'boolean') &&
    typeof prediction.champion === 'string' &&
    isStringArray(prediction.semifinalists) &&
    typeof prediction.topScorer === 'string' &&
    typeof prediction.mvp === 'string' &&
    isStringRecord(prediction.groupWinners) &&
    isStringArrayRecord(prediction.groupQualified) &&
    isStringArray(prediction.bestThirds) &&
    Array.isArray(prediction.matches) &&
    prediction.matches.every(isMatchPrediction)
  )
}

export async function GET() {
  try {
    const prisma = getPrisma()

    const predictions = await prisma.prediction.findMany({
      include: { matches: true },
      orderBy: { createdAt: 'asc' },
    })

    return NextResponse.json(
      predictions.map((prediction) => ({
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
      })),
    )
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Database unavailable',
      },
      { status: 503 },
    )
  }
}

export async function PUT(request: Request) {
  const unauthorized = requireAdmin(request)
  if (unauthorized) return unauthorized

  try {
    const prisma = getPrisma()
    const predictions = await request.json()

    if (!Array.isArray(predictions) || !predictions.every(isPrediction)) {
      return NextResponse.json(
        { error: 'Invalid predictions payload' },
        { status: 400 },
      )
    }

    await prisma.$transaction(async (tx) => {
      for (const prediction of predictions) {
        const existingPrediction = await tx.prediction.findUnique({
          where: { participantId: prediction.participantId },
          select: {
            locked: true,
            verificationCode: true,
          },
        })

        if (existingPrediction?.locked) {
          const onlyAdminStateChanged =
            prediction.locked === false ||
            prediction.reopenRequested !== undefined

          if (onlyAdminStateChanged) {
            await tx.prediction.update({
              where: {
                participantId: prediction.participantId,
              },
              data: {
                locked: prediction.locked,
                reopenRequested:
                  prediction.reopenRequested ?? false,
              },
            })
          }

          continue
        }

        const verificationCode =
          prediction.locked &&
          !existingPrediction?.verificationCode
            ? createVerificationCode()
            : existingPrediction?.verificationCode

        const saved = await tx.prediction.upsert({
          where: {
            participantId: prediction.participantId,
          },
          update: {
            locked: prediction.locked,
            reopenRequested:
              prediction.reopenRequested ?? false,
            champion: prediction.champion,
            semifinalists: prediction.semifinalists,
            topScorer: prediction.topScorer,
            mvp: prediction.mvp,
            groupWinners: prediction.groupWinners,
            groupQualified: prediction.groupQualified,
            bestThirds: prediction.bestThirds,
            verificationCode,
          },
          create: {
            participantId: prediction.participantId,
            locked: prediction.locked,
            reopenRequested:
              prediction.reopenRequested ?? false,
            champion: prediction.champion,
            semifinalists: prediction.semifinalists,
            topScorer: prediction.topScorer,
            mvp: prediction.mvp,
            groupWinners: prediction.groupWinners,
            groupQualified: prediction.groupQualified,
            bestThirds: prediction.bestThirds,
            verificationCode: prediction.locked
              ? verificationCode
              : null,
          },
        })

        await tx.matchPrediction.deleteMany({
          where: {
            predictionId: saved.id,
          },
        })

        await tx.matchPrediction.createMany({
          data: prediction.matches.map((match) => ({
            predictionId: saved.id,
            matchId: match.matchId,
            homeScore: match.homeScore,
            awayScore: match.awayScore,
            penaltyWinner: match.penaltyWinner,
          })),
        })
      }
    })

    const savedPredictions = await prisma.prediction.findMany({
      include: { matches: true },
      orderBy: { createdAt: 'asc' },
    })

    return NextResponse.json({
      ok: true,
      predictions: savedPredictions,
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Database unavailable',
      },
      { status: 503 },
    )
  }
}
