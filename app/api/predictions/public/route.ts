import { NextResponse } from 'next/server'
import { getPrisma } from '../../../../src/lib/prisma'
import { getClosedPredictionStages, isPredictionPhase } from '../../../../src/domain/phases'

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

export async function GET() {
  try {
    const prisma = getPrisma()
    const closedStages = getClosedPredictionStages(await currentPredictionPhase())

    if (closedStages.length === 0) {
      return NextResponse.json([])
    }

    const predictions = await prisma.prediction.findMany({
      where: { locked: true, participant: { status: 'validado' } },
      include: {
        participant: true,
        matches: { include: { match: true } },
      },
      orderBy: { createdAt: 'asc' },
    })

    return NextResponse.json(
      predictions.map((prediction) => ({
        participant: {
          id: prediction.participant.id,
          name: prediction.participant.name,
          contact: prediction.participant.contact,
          accessCode: prediction.participant.accessCode,
          status: prediction.participant.status,
        },
        participantId: prediction.participantId,
        verificationCode: prediction.verificationCode ?? '',
        locked: prediction.locked,
        reopenRequested: false,
        champion: closedStages.includes('Grupo') ? prediction.champion ?? '' : '',
        semifinalists: closedStages.includes('Grupo') ? prediction.semifinalists : [],
        topScorer: closedStages.includes('Grupo') ? prediction.topScorer ?? '' : '',
        mvp: closedStages.includes('Grupo') ? prediction.mvp ?? '' : '',
        groupWinners: closedStages.includes('Grupo') ? prediction.groupWinners : {},
        groupQualified: closedStages.includes('Grupo') ? prediction.groupQualified : {},
        bestThirds: closedStages.includes('Grupo') ? prediction.bestThirds : [],
        matches: prediction.matches
          .filter((match) => closedStages.includes(match.match.stage))
          .map((match) => ({
            matchId: match.matchId,
            homeScore: match.homeScore,
            awayScore: match.awayScore,
            penaltyWinner: match.penaltyWinner ?? undefined,
          })),
      })),
    )
  } catch (error) {
    console.error('GET /api/predictions/public error:', error)
    return NextResponse.json({ error: 'Database unavailable' }, { status: 503 })
  }
}
