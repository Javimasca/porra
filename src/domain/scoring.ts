import type {
  LeaderboardEntry,
  Match,
  MatchPrediction,
  Participant,
  PredictionSlip,
  ScoreBreakdown,
  TournamentState,
} from './types'

const knockoutExactPoints: Record<string, number> = {
  'Ronda de 32': 4,
  Octavos: 5,
  Cuartos: 6,
  Semifinal: 8,
  Final: 10,
}

export function buildLeaderboard(
  participants: Participant[],
  predictions: PredictionSlip[],
  state: TournamentState,
): LeaderboardEntry[] {
  return predictions
    .map((prediction) => {
      const participant = participants.find((item) => item.id === prediction.participantId)

      if (!participant || participant.status !== 'validado') {
        return null
      }

      const breakdown = scorePrediction(prediction, state)
      return {
        participant,
        breakdown,
        total: breakdown.reduce((sum, item) => sum + item.points, 0),
      }
    })
    .filter((entry): entry is LeaderboardEntry => entry !== null)
    .sort((a, b) => b.total - a.total)
}

export function scorePrediction(prediction: PredictionSlip, state: TournamentState): ScoreBreakdown[] {
  const groupMatchPoints = state.matches.reduce((sum, match) => {
    if (match.stage !== 'Grupo' || match.status !== 'finalizado') {
      return sum
    }

    const pick = prediction.matches.find((item) => item.matchId === match.id)
    return sum + (pick ? scoreGroupMatch(pick, match) : 0)
  }, 0)

  const knockoutPoints = state.matches.reduce((sum, match) => {
    if (match.stage === 'Grupo' || match.status !== 'finalizado') {
      return sum
    }

    const pick = prediction.matches.find((item) => item.matchId === match.id)
    return sum + (pick ? scoreKnockoutMatch(pick, match) : 0)
  }, 0)

  return [
    { label: 'Partidos de grupo', points: groupMatchPoints },
    { label: 'Primeros de grupo', points: scoreGroupWinners(prediction, state) },
    { label: 'Clasificados', points: scoreQualifiedTeams(prediction, state) },
    { label: 'Mejores terceros', points: scoreBestThirds(prediction, state) },
    { label: 'Eliminatorias', points: knockoutPoints },
    { label: 'Semifinalistas', points: scoreSemifinalists(prediction, state) },
    { label: 'Campeon', points: state.champion && prediction.champion === state.champion ? 40 : 0 },
    { label: 'Goleador', points: state.topScorer && prediction.topScorer === state.topScorer ? 25 : 0 },
    { label: 'MVP', points: state.mvp && prediction.mvp === state.mvp ? 25 : 0 },
  ]
}

function scoreGroupMatch(prediction: MatchPrediction, match: Match) {
  const signPoints = sameSign(prediction, match) ? 1 : 0
  const exactPoints = exactScore(prediction, match) ? 2 : 0
  return signPoints + exactPoints
}

function scoreKnockoutMatch(prediction: MatchPrediction, match: Match) {
  const signPoints = knockoutSignPoints(prediction, match)
  const exactPoints = exactScore(prediction, match) ? knockoutExactPoints[match.stage] ?? 5 : 0
  return signPoints + exactPoints
}

function knockoutSignPoints(prediction: MatchPrediction, match: Match) {
  if (prediction.homeScore === prediction.awayScore && match.homeScore === match.awayScore) {
    return prediction.penaltyWinner === match.penaltyWinner ? 2 : 1
  }

  return sameSign(prediction, match) ? 2 : 0
}

function sameSign(prediction: MatchPrediction, match: Match) {
  if (match.homeScore === undefined || match.awayScore === undefined) {
    return false
  }

  return sign(prediction.homeScore, prediction.awayScore) === sign(match.homeScore, match.awayScore)
}

function exactScore(prediction: MatchPrediction, match: Match) {
  return prediction.homeScore === match.homeScore && prediction.awayScore === match.awayScore
}

function sign(home: number, away: number) {
  if (home > away) return '1'
  if (home < away) return '2'
  return 'X'
}

function scoreGroupWinners(prediction: PredictionSlip, state: TournamentState) {
  return Object.entries(state.groupWinners).reduce((sum, [group, winner]) => {
    return sum + (prediction.groupWinners[group] === winner ? 4 : 0)
  }, 0)
}

function scoreQualifiedTeams(prediction: PredictionSlip, state: TournamentState) {
  return Object.entries(state.groupQualified).reduce((sum, [group, teams]) => {
    const predicted = prediction.groupQualified[group] ?? []
    const hits = teams.filter((team) => predicted.includes(team)).length
    return sum + hits * 2
  }, 0)
}

function scoreBestThirds(prediction: PredictionSlip, state: TournamentState) {
  return state.bestThirds.filter((team) => prediction.bestThirds.includes(team)).length * 2
}

function scoreSemifinalists(prediction: PredictionSlip, state: TournamentState) {
  const hits = state.semifinalists.filter((team) => prediction.semifinalists.includes(team)).length
  const table = [0, 3, 8, 14, 20]
  return table[hits] ?? 0
}
