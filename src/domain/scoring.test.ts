import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { scorePrediction, scorePredictionDetails } from './scoring'
import type { PredictionSlip, TournamentState } from './types'

const basePrediction: PredictionSlip = {
  participantId: 'p1',
  locked: true,
  champion: '',
  semifinalists: [],
  topScorer: '',
  mvp: '',
  groupWinners: {},
  groupQualified: {},
  bestThirds: [],
  matches: [],
}

function pointsFor(label: string, prediction: PredictionSlip, state: TournamentState) {
  return scorePrediction(prediction, state).find((item) => item.label === label)?.points
}

describe('scorePrediction', () => {
  it('scores group result sign and exact score independently', () => {
    const state: TournamentState = {
      semifinalists: [],
      groupWinners: {},
      groupQualified: {},
      bestThirds: [],
      matches: [
        {
          id: 'g-a-1',
          group: 'A',
          stage: 'Grupo',
          home: 'Spain',
          away: 'Japan',
          homeScore: 2,
          awayScore: 1,
          status: 'finalizado',
        },
        {
          id: 'g-a-2',
          group: 'A',
          stage: 'Grupo',
          home: 'Brazil',
          away: 'Morocco',
          homeScore: 0,
          awayScore: 0,
          status: 'finalizado',
        },
      ],
    }

    const prediction: PredictionSlip = {
      ...basePrediction,
      matches: [
        { matchId: 'g-a-1', homeScore: 2, awayScore: 1 },
        { matchId: 'g-a-2', homeScore: 1, awayScore: 1 },
      ],
    }

    assert.equal(pointsFor('Partidos de grupo', prediction, state), 4)
  })

  it('scores knockout draws, exact scores and penalties separately', () => {
    const state: TournamentState = {
      semifinalists: [],
      groupWinners: {},
      groupQualified: {},
      bestThirds: [],
      matches: [
        {
          id: 'm104',
          stage: 'Final',
          home: 'Spain',
          away: 'Argentina',
          homeScore: 2,
          awayScore: 2,
          penaltyWinner: 'Spain',
          status: 'finalizado',
        },
      ],
    }

    const prediction: PredictionSlip = {
      ...basePrediction,
      matches: [
        { matchId: 'm104', homeScore: 2, awayScore: 2, penaltyWinner: 'Spain' },
      ],
    }

    assert.equal(pointsFor('Eliminatorias', prediction, state), 4)
    assert.equal(pointsFor('Bonus eliminatorias', prediction, state), 5)
  })

  it('gives one knockout point for predicting penalties without the exact draw score', () => {
    const state: TournamentState = {
      semifinalists: [],
      groupWinners: {},
      groupQualified: {},
      bestThirds: [],
      matches: [
        {
          id: 'm104',
          stage: 'Final',
          home: 'Spain',
          away: 'Argentina',
          homeScore: 2,
          awayScore: 2,
          penaltyWinner: 'Spain',
          status: 'finalizado',
        },
      ],
    }

    const prediction: PredictionSlip = {
      ...basePrediction,
      matches: [
        { matchId: 'm104', homeScore: 1, awayScore: 1, penaltyWinner: 'Argentina' },
      ],
    }

    assert.equal(pointsFor('Eliminatorias', prediction, state), 1)
    assert.equal(pointsFor('Bonus eliminatorias', prediction, state), 0)
  })

  it('scores tournament bonuses from derived official outcomes', () => {
    const state: TournamentState = {
      champion: 'Spain',
      topScorer: 'Kylian Mbappe',
      mvp: 'Pedri',
      semifinalists: ['Spain', 'Argentina', 'Brazil', 'France'],
      groupWinners: {
        A: 'Spain',
        B: 'Argentina',
        C: 'Brazil',
      },
      groupQualified: {
        A: ['Spain', 'Japan'],
        B: ['Argentina', 'Morocco'],
      },
      bestThirds: ['France', 'Portugal'],
      matches: [],
    }

    const prediction: PredictionSlip = {
      ...basePrediction,
      champion: 'Spain',
      topScorer: 'Kylian Mbappe',
      mvp: 'Pedri',
      semifinalists: ['Spain', 'Argentina', 'England', 'Germany'],
      groupWinners: {
        A: 'Spain',
        B: 'Argentina',
        C: 'Brazil',
      },
      groupQualified: {
        A: ['Spain', 'Germany'],
        B: ['Argentina', 'Morocco'],
      },
      bestThirds: ['France', 'Uruguay'],
    }

    assert.equal(pointsFor('Primeros de grupo', prediction, state), 5)
    assert.equal(pointsFor('Clasificados', prediction, state), 6)
    assert.equal(pointsFor('Mejores terceros', prediction, state), 2)
    assert.equal(pointsFor('Semifinalistas', prediction, state), 8)
    assert.equal(pointsFor('Campeon', prediction, state), 40)
    assert.equal(pointsFor('Goleador', prediction, state), 25)
    assert.equal(pointsFor('MVP', prediction, state), 25)
  })

  it('returns points by match and positive bonuses', () => {
    const state: TournamentState = {
      champion: 'Spain',
      semifinalists: [],
      groupWinners: {},
      groupQualified: {},
      bestThirds: [],
      matches: [
        {
          id: 'g-a-1',
          group: 'A',
          stage: 'Grupo',
          home: 'Spain',
          away: 'Japan',
          homeScore: 2,
          awayScore: 1,
          status: 'finalizado',
        },
      ],
    }
    const prediction: PredictionSlip = {
      ...basePrediction,
      champion: 'Spain',
      matches: [{ matchId: 'g-a-1', homeScore: 2, awayScore: 1 }],
    }

    const details = scorePredictionDetails(prediction, state)

    assert.equal(details.matches['g-a-1'], 3)
    assert.deepEqual(details.bonuses, [{ label: 'Campeon', points: 40 }])
  })
})
