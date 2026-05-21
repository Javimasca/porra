import { NextResponse } from 'next/server'
import { getPrisma } from '../../../src/lib/prisma'

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
        locked: prediction.locked,
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
  } catch {
    return NextResponse.json({ error: 'Database unavailable' }, { status: 503 })
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
      }>) {
        const saved = await tx.prediction.upsert({
          where: { participantId: prediction.participantId },
          update: {
            locked: prediction.locked,
            champion: prediction.champion,
            semifinalists: prediction.semifinalists,
            topScorer: prediction.topScorer,
            mvp: prediction.mvp,
            groupWinners: prediction.groupWinners,
            groupQualified: prediction.groupQualified,
            bestThirds: prediction.bestThirds,
          },
          create: {
            participantId: prediction.participantId,
            locked: prediction.locked,
            champion: prediction.champion,
            semifinalists: prediction.semifinalists,
            topScorer: prediction.topScorer,
            mvp: prediction.mvp,
            groupWinners: prediction.groupWinners,
            groupQualified: prediction.groupQualified,
            bestThirds: prediction.bestThirds,
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

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Database unavailable' }, { status: 503 })
  }
}
