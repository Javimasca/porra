import crypto from 'crypto'
import { NextResponse } from 'next/server'
import { requireAdmin } from '../../../src/lib/apiSecurity'
import { getPrisma } from '../../../src/lib/prisma'

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

function isMatchPrediction(value: unknown) {
  if (!value || typeof value !== 'object') return false
  const match = value as Record<string, unknown>
  return typeof match.matchId === 'string'
    && Number.isInteger(match.homeScore)
    && Number.isInteger(match.awayScore)
    && (match.penaltyWinner == null || typeof match.penaltyWinner === 'string')
}

function isPrediction(value: unknown) {
  if (!value || typeof value !== 'object') return false
  const prediction = value as Record<string, unknown>
  return typeof prediction.participantId === 'string'
    && typeof prediction.locked === 'boolean'
    && (prediction.reopenRequested === undefined || typeof prediction.reopenRequested === 'boolean')
    && typeof prediction.champion === 'string'
    && isStringArray(prediction.semifinalists)
    && typeof prediction.topScorer === 'string'
    && typeof prediction.mvp === 'string'
    && isStringRecord(prediction.groupWinners)
    && isStringArrayRecord(prediction.groupQualified)
    && isStringArray(prediction.bestThirds)
    && Array.isArray(prediction.matches)
    && prediction.matches.every(isMatchPrediction)
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

export async function GET(request: Request) {
  const unauthorized = requireAdmin(request)
  if (unauthorized) return unauthorized

  try {
    const prisma = getPrisma()
    const predictions = await prisma.prediction.findMany({
      include: { matches: true },
      orderBy: { createdAt: 'asc' },
    })

    return NextResponse.json(predictions.map(serializePrediction))
  } catch (error) {
    console.error('GET /api/predictions error:', error)
    return NextResponse.json({ error: 'Database unavailable' }, { status: 503 })
  }
}

export async function PUT(request: Request) {
  const unauthorized = requireAdmin(request)
  if (unauthorized) return unauthorized

  try {
    const prisma = getPrisma()
    const predictions = await request.json()

    if (!Array.isArray(predictions) || !predictions.every(isPrediction)) {
      return NextResponse.json({ error: 'Invalid predictions payload' }, { status: 400 })
    }

    await prisma.$transaction(async (tx) => {
      const [existingParticipants, existingMatches] = await Promise.all([
        tx.participant.findMany({ select: { id: true } }),
        tx.match.findMany({ select: { id: true } }),
      ])
      const existingParticipantIds = new Set(existingParticipants.map((participant) => participant.id))
      const existingMatchIds = new Set(existingMatches.map((match) => match.id))

      for (const prediction of predictions) {
        if (!existingParticipantIds.has(prediction.participantId)) {
          continue
        }

        const existingPrediction = await tx.prediction.findUnique({
          where: { participantId: prediction.participantId },
          select: { locked: true, verificationCode: true },
        })

        if (existingPrediction?.locked) {
          if (prediction.reopenRequested !== undefined) {
            await tx.prediction.update({
              where: { participantId: prediction.participantId },
              data: {
                reopenRequested: prediction.reopenRequested ?? false,
              },
            })
          }
          continue
        }

        const verificationCode = prediction.locked && !existingPrediction?.verificationCode
          ? createVerificationCode()
          : existingPrediction?.verificationCode

        const saved = await tx.prediction.upsert({
          where: { participantId: prediction.participantId },
          update: {
            locked: prediction.locked ? true : existingPrediction?.locked ?? false,
            reopenRequested: prediction.reopenRequested ?? false,
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
            reopenRequested: prediction.reopenRequested ?? false,
            champion: prediction.champion,
            semifinalists: prediction.semifinalists,
            topScorer: prediction.topScorer,
            mvp: prediction.mvp,
            groupWinners: prediction.groupWinners,
            groupQualified: prediction.groupQualified,
            bestThirds: prediction.bestThirds,
            verificationCode: prediction.locked ? verificationCode : null,
          },
        })

        await tx.matchPrediction.deleteMany({ where: { predictionId: saved.id } })
        const validMatches = Array.from(
          new Map(
            prediction.matches
              .filter((match) => existingMatchIds.has(match.matchId))
              .map((match) => [match.matchId, match]),
          ).values(),
        )

        if (validMatches.length > 0) {
          await tx.matchPrediction.createMany({
            data: validMatches.map((match) => ({
              predictionId: saved.id,
              matchId: match.matchId,
              homeScore: match.homeScore,
              awayScore: match.awayScore,
              penaltyWinner: match.penaltyWinner,
            })),
          })
        }
      }
    })

    const savedPredictions = await prisma.prediction.findMany({
      include: { matches: true },
      orderBy: { createdAt: 'asc' },
    })

    return NextResponse.json({ ok: true, predictions: savedPredictions.map(serializePrediction) })
  } catch (error) {
    console.error('PUT /api/predictions error:', error)
    return NextResponse.json({ error: 'Database unavailable' }, { status: 503 })
  }
}
