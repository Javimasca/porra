import { NextResponse } from 'next/server'
import { getPrisma } from '../../../src/lib/prisma'
import crypto from 'crypto'

function createVerificationCode() {
  return `PORRA-2026-${crypto.randomUUID().slice(0, 8).toUpperCase()}`
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
    { error: error instanceof Error ? error.message : 'Database unavailable' },
    { status: 503 },
  )
}
}

export async function PUT(request: Request) {
  try {
    const prisma = getPrisma()
    const predictions = await request.json()

    await prisma.$transaction(async (tx) => {
      const participantIds = predictions.map((prediction: { participantId: string }) => prediction.participantId)
      await tx.prediction.deleteMany({
        where: {
          participantId: {
            notIn: participantIds,
          },
        },
      })

      for (const prediction of predictions as Array<{
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
      }>) {
      const existingPrediction = await tx.prediction.findUnique({
  where: { participantId: prediction.participantId },
  select: {
    locked: true,
    verificationCode: true,
  },
})

if (existingPrediction?.locked) {
  await tx.prediction.update({
    where: { participantId: prediction.participantId },
    data: {
      locked: prediction.locked,
      reopenRequested: prediction.reopenRequested ?? false,
      pdfReceived: prediction.pdfReceived ?? false,
    },
  })

  continue
}

const verificationCode =
  prediction.locked && !existingPrediction?.verificationCode
    ? createVerificationCode()
    : existingPrediction?.verificationCode

const saved = await tx.prediction.upsert({
  where: { participantId: prediction.participantId },
  update: {
    locked: prediction.locked,
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

return NextResponse.json({ ok: true, predictions: savedPredictions })
  } catch {
    return NextResponse.json({ error: 'Database unavailable' }, { status: 503 })
  }
}
