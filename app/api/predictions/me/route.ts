import { NextResponse } from 'next/server'
import { getPrisma } from '../../../../src/lib/prisma'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const accessCode = typeof body?.accessCode === 'string' ? body.accessCode : ''

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

    return NextResponse.json({
      participant: {
        id: participant.id,
        name: participant.name,
        contact: participant.contact,
        accessCode: participant.accessCode,
        status: participant.status,
      },
      prediction: prediction
        ? {
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
        : null,
    })
  } catch (error) {
    console.error('POST /api/predictions/me error:', error)
    return NextResponse.json({ error: 'Database unavailable' }, { status: 503 })
  }
}

