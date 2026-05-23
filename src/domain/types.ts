export type ParticipantStatus = 'pendiente' | 'validado' | 'retirado'
export type MatchStatus = 'programado' | 'finalizado'
export type Stage = 'Grupo' | 'Ronda de 32' | 'Octavos' | 'Cuartos' | 'Semifinal' | 'Final'

export type Participant = {
  id: string
  name: string
  contact: string
  accessCode: string
  status: ParticipantStatus
}

export type Match = {
  id: string
  group?: string
  stage: Stage
  home: string
  away: string
  date?: string
  venue?: string
  homeScore?: number
  awayScore?: number
  penaltyWinner?: string
  status: MatchStatus
}

export type MatchPrediction = {
  matchId: string
  homeScore: number
  awayScore: number
  penaltyWinner?: string
}

export type PredictionSlip = {
  participantId: string
  locked: boolean
  reopenRequested?: boolean
  champion: string
  semifinalists: string[]
  topScorer: string
  mvp: string
  groupWinners: Record<string, string>
  groupQualified: Record<string, string[]>
  bestThirds: string[]
  matches: MatchPrediction[]
  submittedAt?: string
}

export type TournamentState = {
  champion?: string
  semifinalists: string[]
  topScorer?: string
  mvp?: string
  groupWinners: Record<string, string>
  groupQualified: Record<string, string[]>
  bestThirds: string[]
  matches: Match[]
}

export type ScoreBreakdown = {
  label: string
  points: number
}

export type LeaderboardEntry = {
  participant: Participant
  total: number
  breakdown: ScoreBreakdown[]
}
