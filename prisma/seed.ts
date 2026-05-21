import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'
import { participants, tournamentState } from '../src/data/mockData'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not configured')
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
})

async function main() {
  await prisma.$transaction([
    prisma.matchPrediction.deleteMany(),
    prisma.prediction.deleteMany(),
    prisma.match.deleteMany(),
    prisma.participant.deleteMany(),
  ])

  await prisma.participant.createMany({
    data: participants.map((participant) => ({
      id: participant.id,
      name: participant.name,
      contact: participant.contact,
      accessCode: participant.accessCode,
      status: participant.status,
    })),
  })

  await prisma.match.createMany({
    data: tournamentState.matches.map((match) => ({
      id: match.id,
      group: match.group,
      stage: match.stage,
      date: match.date ? new Date(match.date) : undefined,
      venue: match.venue,
      home: match.home,
      away: match.away,
      homeScore: match.homeScore,
      awayScore: match.awayScore,
      penaltyWinner: match.penaltyWinner,
      status: match.status,
    })),
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (error) => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
