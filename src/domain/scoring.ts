import type {
  LeaderboardEntry,
  Match,
  MatchPrediction,
  Participant,
  PredictionSlip,
  ScoreBreakdown,
  TournamentState,
} from './types'

const groupWinnerPointsTable = [0, 1, 3, 5, 8, 11, 13, 15, 18, 21, 23, 26, 30]

const knockoutSignBonusTables: Record<string, Record<number, number>> = {
  'Ronda de 32': {
    16: 24,
    15: 22,
    14: 20,
    13: 18,
    12: 16,
    11: 14,
    10: 12,
  },
  Octavos: {
    8: 16,
    7: 14,
    6: 12,
    5: 10,
  },
  Cuartos: {
    4: 12,
    3: 9,
  },
  Semifinal: {
    2: 8,
  },
  Final: {
    1: 5,
  },
}

function countsForLiveScore(match: Match) {
  return (match.status === 'finalizado' || match.status === 'en_juego') &&
    match.homeScore !== undefined &&
    match.awayScore !== undefined
}

function normalizeName(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function commaSeparatedNames(value?: string) {
  return (value ?? '')
    .split(',')
    .map(normalizeName)
    .filter(Boolean)
}

function nameMatches(value: string, target?: string) {
  const normalizedValue = normalizeName(value)
  return Boolean(normalizedValue && target && normalizeName(target) === normalizedValue)
}

function nameMatchesAny(value: string, targets?: string) {
  const normalizedValue = normalizeName(value)
  return Boolean(normalizedValue && commaSeparatedNames(targets).includes(normalizedValue))
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
    if (match.stage !== 'Grupo' || !countsForLiveScore(match)) {
      return sum
    }

    const pick = prediction.matches.find((item) => item.matchId === match.id)
    return sum + (pick ? scoreGroupMatch(pick, match) : 0)
  }, 0)

  const knockoutPoints = state.matches.reduce((sum, match) => {
    if (match.stage === 'Grupo' || !countsForLiveScore(match)) {
      return sum
    }

    const pick = prediction.matches.find((item) => item.matchId === match.id)
    return sum + (pick ? scoreKnockoutMatch(pick, match) : 0)
  }, 0)

  return [
    { label: 'Partidos de grupo', points: groupMatchPoints },
    { label: 'Plenos de grupo', points: scoreGroupSignPerfects(prediction, state) },
    { label: 'Primeros de grupo', points: scoreGroupWinners(prediction, state) },
    { label: 'Clasificados', points: scoreQualifiedTeams(prediction, state) },
    { label: 'Mejores terceros', points: scoreBestThirds(prediction, state) },
    { label: 'Eliminatorias', points: knockoutPoints },
    { label: 'Bonus eliminatorias', points: scoreKnockoutSignBonuses(prediction, state) },
    { label: 'Semifinalistas', points: scoreSemifinalists(prediction, state) },
    { label: 'Campeon', points: state.champion && prediction.champion === state.champion ? 40 : 0 },
    { label: 'Goleador', points: nameMatchesAny(prediction.topScorer, state.topScorer) ? 25 : 0 },
    { label: 'MVP', points: nameMatches(prediction.mvp, state.mvp) ? 25 : 0 },
  ]
}

export function scorePredictionDetails(prediction: PredictionSlip, state: TournamentState) {
  const matches = Object.fromEntries(
    state.matches
      .filter(countsForLiveScore)
      .map((match) => {
        const pick = prediction.matches.find((item) => item.matchId === match.id)
        const points = pick
          ? match.stage === 'Grupo'
            ? scoreGroupMatch(pick, match)
            : scoreKnockoutMatch(pick, match)
          : 0

        return [match.id, points]
      }),
  )
  const breakdown = scorePrediction(prediction, state)
  const bonuses = breakdown.filter((item) => item.points > 0 && item.label !== 'Partidos de grupo' && item.label !== 'Eliminatorias')

  return { matches, bonuses }
}

function scoreGroupMatch(prediction: MatchPrediction, match: Match) {
  const signPoints = sameSign(prediction, match) ? 1 : 0
  const exactPoints = exactScore(prediction, match) ? 2 : 0
  return signPoints + exactPoints
}

function scoreKnockoutMatch(prediction: MatchPrediction, match: Match) {
  if (exactScore(prediction, match)) {
    return 3 + penaltyPoints(prediction, match)
  }

  return (sameSign(prediction, match) ? 1 : 0) + penaltyPoints(prediction, match)
}

function knockoutSignPoints(prediction: MatchPrediction, match: Match) {
  return sameSign(prediction, match) ? 1 : 0
}

function penaltyPoints(prediction: MatchPrediction, match: Match) {
  return prediction.homeScore === prediction.awayScore &&
    match.homeScore === match.awayScore &&
    prediction.penaltyWinner === match.penaltyWinner
    ? 1
    : 0
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
  const hits = Object.entries(state.groupWinners).filter(([group, winner]) => {
    return prediction.groupWinners[group] === winner
  }).length

  return groupWinnerPointsTable[hits] ?? 0
}

function scoreGroupSignPerfects(prediction: PredictionSlip, state: TournamentState) {
  const groupMatches = state.matches.reduce<Record<string, Match[]>>((matchesByGroup, match) => {
    if (match.stage === 'Grupo' && match.group) {
      matchesByGroup[match.group] = [...(matchesByGroup[match.group] ?? []), match]
    }

    return matchesByGroup
  }, {})

  return Object.values(groupMatches).reduce((sum, matches) => {
    const groupIsComplete = matches.length === 6 && matches.every((match) => match.status === 'finalizado')

    if (!groupIsComplete) {
      return sum
    }

    const allSignsHit = matches.every((match) => {
      const pick = prediction.matches.find((item) => item.matchId === match.id)
      return pick ? sameSign(pick, match) : false
    })

    return sum + (allSignsHit ? 10 : 0)
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

function scoreKnockoutSignBonuses(prediction: PredictionSlip, state: TournamentState) {
  return Object.entries(knockoutSignBonusTables).reduce((sum, [stage, table]) => {
    const matches = state.matches.filter((match) => match.stage === stage && match.status === 'finalizado')
    const hits = matches.filter((match) => {
      const pick = prediction.matches.find((item) => item.matchId === match.id)
      return pick ? knockoutSignPoints(pick, match) === 1 : false
    }).length

    return sum + (table[hits] ?? 0)
  }, 0)
}

function scoreSemifinalists(prediction: PredictionSlip, state: TournamentState) {
  const hits = state.semifinalists.filter((team) => prediction.semifinalists.includes(team)).length
  const table = [0, 3, 8, 14, 20]
  return table[hits] ?? 0
}
