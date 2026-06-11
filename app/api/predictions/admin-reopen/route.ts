import { NextResponse } from 'next/server'
import { requireAdmin } from '../../../../src/lib/apiSecurity'
import { getPrisma } from '../../../../src/lib/prisma'
import { isPredictionPhase } from '../../../../src/domain/phases'

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
  const unauthorized = requireAdmin(request)
  if (unauthorized) return unauthorized

  try {
    const body = await request.json()
    const participantId = typeof body?.participantId === 'string' ? body.participantId : ''
    const reopen = body?.reopen === true

    if (!participantId) {
      return NextResponse.json({ error: 'Invalid participant id' }, { status: 400 })
    }

    if (reopen && await currentPredictionPhase() !== 'preGroups') {
      return NextResponse.json({ error: 'Group predictions are closed' }, { status: 409 })
    }

    const prediction = await getPrisma().prediction.update({
      where: { participantId },
      data: {
        locked: reopen ? false : undefined,
        reopenRequested: false,
      },
    })

    return NextResponse.json({
      participantId: prediction.participantId,
      locked: prediction.locked,
      reopenRequested: prediction.reopenRequested,
    })
  } catch (error) {
    console.error('POST /api/predictions/admin-reopen error:', error)
    return NextResponse.json({ error: 'Database unavailable' }, { status: 503 })
  }
}
