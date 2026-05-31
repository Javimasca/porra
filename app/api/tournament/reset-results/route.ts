import { NextResponse } from 'next/server'
import { requireAdmin } from '../../../../src/lib/apiSecurity'
import { getPrisma } from '../../../../src/lib/prisma'

export async function POST(request: Request) {
  const unauthorized = requireAdmin(request)
  if (unauthorized) return unauthorized

  try {
    const prisma = getPrisma()

    await prisma.match.updateMany({
      data: {
        homeScore: null,
        awayScore: null,
        penaltyWinner: null,
        status: 'programado',
      },
    })

    const matches = await prisma.match.findMany({
      orderBy: [{ stage: 'asc' }, { date: 'asc' }, { id: 'asc' }],
    })

    return NextResponse.json({ matches })
  } catch (error) {
    console.error('POST /api/tournament/reset-results error:', error)
    return NextResponse.json({ error: 'Database unavailable' }, { status: 503 })
  }
}
