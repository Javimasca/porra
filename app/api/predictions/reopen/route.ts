import { NextResponse } from 'next/server'
import { getPrisma } from '../../../../src/lib/prisma'

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
  try {
    const body = await request.json()
    const accessCode = typeof body?.accessCode === 'string' ? body.accessCode.trim() : ''

    if (!accessCode) {
      return NextResponse.json({ error: 'Invalid access code' }, { status: 400 })
    }

    const prisma = getPrisma()
    const participant = await prisma.participant.findUnique({
      where: { accessCode },
      include: {
        predictions: {
          include: { matches: true },
          take: 1,
        },
      },
    })

    if (!participant) {
      return NextResponse.json({ error: 'Invalid access code' }, { status: 401 })
    }

    const prediction = participant.predictions[0]

    if (!prediction) {
      return NextResponse.json({ error: 'Prediction not found' }, { status: 404 })
    }

    if (!prediction.locked) {
      return NextResponse.json({ error: 'Prediction is already open' }, { status: 409 })
    }

    const saved = await prisma.prediction.update({
      where: { participantId: participant.id },
      data: { reopenRequested: true },
      include: { matches: true },
    })

    return NextResponse.json({ prediction: serializePrediction(saved) })
  } catch (error) {
    console.error('POST /api/predictions/reopen error:', error)
    return NextResponse.json({ error: 'Database unavailable' }, { status: 503 })
  }
}
