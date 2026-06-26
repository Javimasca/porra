import { NextResponse } from 'next/server'
import { requireAdmin } from '../../../../src/lib/apiSecurity'
import { getPrisma } from '../../../../src/lib/prisma'

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

    const prediction = await getPrisma().prediction.update({
      where: { participantId },
      data: {
        locked: reopen ? false : true,
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
