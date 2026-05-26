import { NextResponse } from 'next/server'
import { requireAdmin } from '../../../../src/lib/apiSecurity'
import { getPrisma } from '../../../../src/lib/prisma'
import { isPredictionPhase } from '../../../../src/domain/phases'

const settingKey = 'predictionPhase'
const defaultPhase = 'preGroups'

async function ensureSettingsTable() {
  const prisma = getPrisma()
  await prisma.$executeRaw`
    CREATE TABLE IF NOT EXISTS app_settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `
}

export async function GET() {
  try {
    await ensureSettingsTable()
    const prisma = getPrisma()
    const rows = await prisma.$queryRaw<Array<{ value: string }>>`
      SELECT value FROM app_settings WHERE key = ${settingKey} LIMIT 1
    `
    const value = rows[0]?.value

    return NextResponse.json({
      predictionPhase: isPredictionPhase(value) ? value : defaultPhase,
    })
  } catch (error) {
    console.error('GET /api/settings/prediction-phase error:', error)
    return NextResponse.json({ predictionPhase: defaultPhase }, { status: 200 })
  }
}

export async function PUT(request: Request) {
  const unauthorized = requireAdmin(request)
  if (unauthorized) return unauthorized

  try {
    const body = await request.json()
    const predictionPhase = body?.predictionPhase

    if (!isPredictionPhase(predictionPhase)) {
      return NextResponse.json({ error: 'Invalid prediction phase' }, { status: 400 })
    }

    await ensureSettingsTable()
    const prisma = getPrisma()
    await prisma.$executeRaw`
      INSERT INTO app_settings (key, value, updated_at)
      VALUES (${settingKey}, ${predictionPhase}, NOW())
      ON CONFLICT (key)
      DO UPDATE SET value = EXCLUDED.value, updated_at = NOW()
    `

    return NextResponse.json({ predictionPhase })
  } catch (error) {
    console.error('PUT /api/settings/prediction-phase error:', error)
    return NextResponse.json({ error: 'Database unavailable' }, { status: 503 })
  }
}

