import type { Match, Participant, PredictionSlip, TournamentState } from '../domain/types'

export const participants: Participant[] = [
  { id: 'p1', name: 'Ana Martin', contact: 'ana@example.com', accessCode: 'Ana4821', status: 'validado' },
  { id: 'p2', name: 'Carlos Ruiz', contact: 'carlos@example.com', accessCode: 'Carlos7394', status: 'validado' },
  { id: 'p3', name: 'Lucia Vega', contact: 'lucia@example.com', accessCode: 'Lucia2086', status: 'pendiente' },
]

function groupMatch(
  group: string,
  number: number,
  date: string,
  venue: string,
  home: string,
  away: string,
): Match {
  return {
    id: `g-${group.toLowerCase()}-${number}`,
    group,
    stage: 'Grupo',
    date,
    venue,
    home,
    away,
    status: 'programado',
  }
}

export const groupStageMatches: Match[] = [
  groupMatch('A', 1, '2026-06-11', 'Mexico City', 'Mexico', 'South Africa'),
  groupMatch('A', 2, '2026-06-12', 'Guadalajara', 'South Korea', 'Czechia'),
  groupMatch('A', 3, '2026-06-18', 'Atlanta', 'Czechia', 'South Africa'),
  groupMatch('A', 4, '2026-06-19', 'Guadalajara', 'Mexico', 'South Korea'),
  groupMatch('A', 5, '2026-06-25', 'Mexico City', 'Czechia', 'Mexico'),
  groupMatch('A', 6, '2026-06-25', 'Monterrey', 'South Africa', 'South Korea'),

  groupMatch('B', 1, '2026-06-12', 'Toronto', 'Canada', 'Bosnia and Herzegovina'),
  groupMatch('B', 2, '2026-06-13', 'Santa Clara', 'Qatar', 'Switzerland'),
  groupMatch('B', 3, '2026-06-18', 'Inglewood', 'Switzerland', 'Bosnia and Herzegovina'),
  groupMatch('B', 4, '2026-06-18', 'Vancouver', 'Canada', 'Qatar'),
  groupMatch('B', 5, '2026-06-24', 'Vancouver', 'Switzerland', 'Canada'),
  groupMatch('B', 6, '2026-06-24', 'Seattle', 'Bosnia and Herzegovina', 'Qatar'),

  groupMatch('C', 1, '2026-06-14', 'Foxborough', 'Haiti', 'Scotland'),
  groupMatch('C', 2, '2026-06-13', 'East Rutherford', 'Brazil', 'Morocco'),
  groupMatch('C', 3, '2026-06-20', 'Philadelphia', 'Brazil', 'Haiti'),
  groupMatch('C', 4, '2026-06-19', 'Foxborough', 'Scotland', 'Morocco'),
  groupMatch('C', 5, '2026-06-24', 'Miami Gardens', 'Scotland', 'Brazil'),
  groupMatch('C', 6, '2026-06-24', 'Atlanta', 'Morocco', 'Haiti'),

  groupMatch('D', 1, '2026-06-13', 'Inglewood', 'United States', 'Paraguay'),
  groupMatch('D', 2, '2026-06-14', 'Vancouver', 'Australia', 'Turkiye'),
  groupMatch('D', 3, '2026-06-20', 'Santa Clara', 'Turkiye', 'Paraguay'),
  groupMatch('D', 4, '2026-06-19', 'Seattle', 'United States', 'Australia'),
  groupMatch('D', 5, '2026-06-26', 'Inglewood', 'Turkiye', 'United States'),
  groupMatch('D', 6, '2026-06-26', 'Santa Clara', 'Paraguay', 'Australia'),

  groupMatch('E', 1, '2026-06-15', 'Philadelphia', 'Ivory Coast', 'Ecuador'),
  groupMatch('E', 2, '2026-06-14', 'Houston', 'Germany', 'Curacao'),
  groupMatch('E', 3, '2026-06-20', 'Toronto', 'Germany', 'Ivory Coast'),
  groupMatch('E', 4, '2026-06-21', 'Kansas City', 'Ecuador', 'Curacao'),
  groupMatch('E', 5, '2026-06-25', 'Philadelphia', 'Curacao', 'Ivory Coast'),
  groupMatch('E', 6, '2026-06-25', 'East Rutherford', 'Ecuador', 'Germany'),

  groupMatch('F', 1, '2026-06-14', 'Arlington', 'Netherlands', 'Japan'),
  groupMatch('F', 2, '2026-06-15', 'Monterrey', 'Sweden', 'Tunisia'),
  groupMatch('F', 3, '2026-06-20', 'Houston', 'Netherlands', 'Sweden'),
  groupMatch('F', 4, '2026-06-21', 'Monterrey', 'Tunisia', 'Japan'),
  groupMatch('F', 5, '2026-06-26', 'Arlington', 'Japan', 'Sweden'),
  groupMatch('F', 6, '2026-06-26', 'Kansas City', 'Tunisia', 'Netherlands'),

  groupMatch('G', 1, '2026-06-15', 'Seattle', 'Belgium', 'Egypt'),
  groupMatch('G', 2, '2026-06-16', 'Inglewood', 'Iran', 'New Zealand'),
  groupMatch('G', 3, '2026-06-22', 'Inglewood', 'Belgium', 'Iran'),
  groupMatch('G', 4, '2026-06-22', 'Vancouver', 'New Zealand', 'Egypt'),
  groupMatch('G', 5, '2026-06-27', 'Seattle', 'Egypt', 'Iran'),
  groupMatch('G', 6, '2026-06-27', 'Vancouver', 'New Zealand', 'Belgium'),

  groupMatch('H', 1, '2026-06-15', 'Atlanta', 'Spain', 'Cape Verde'),
  groupMatch('H', 2, '2026-06-15', 'Miami Gardens', 'Saudi Arabia', 'Uruguay'),
  groupMatch('H', 3, '2026-06-21', 'Atlanta', 'Spain', 'Saudi Arabia'),
  groupMatch('H', 4, '2026-06-21', 'Miami Gardens', 'Uruguay', 'Cape Verde'),
  groupMatch('H', 5, '2026-06-27', 'Guadalajara', 'Uruguay', 'Spain'),
  groupMatch('H', 6, '2026-06-26', 'Houston', 'Cape Verde', 'Saudi Arabia'),

  groupMatch('I', 1, '2026-06-16', 'East Rutherford', 'France', 'Senegal'),
  groupMatch('I', 2, '2026-06-16', 'Foxborough', 'Iraq', 'Norway'),
  groupMatch('I', 3, '2026-06-23', 'East Rutherford', 'Norway', 'Senegal'),
  groupMatch('I', 4, '2026-06-22', 'Philadelphia', 'France', 'Iraq'),
  groupMatch('I', 5, '2026-06-26', 'Foxborough', 'Norway', 'France'),
  groupMatch('I', 6, '2026-06-26', 'Toronto', 'Senegal', 'Iraq'),

  groupMatch('J', 1, '2026-06-17', 'Kansas City', 'Argentina', 'Algeria'),
  groupMatch('J', 2, '2026-06-17', 'Santa Clara', 'Austria', 'Jordan'),
  groupMatch('J', 3, '2026-06-22', 'Arlington', 'Argentina', 'Austria'),
  groupMatch('J', 4, '2026-06-23', 'Santa Clara', 'Jordan', 'Algeria'),
  groupMatch('J', 5, '2026-06-28', 'Kansas City', 'Algeria', 'Austria'),
  groupMatch('J', 6, '2026-06-28', 'Arlington', 'Jordan', 'Argentina'),

  groupMatch('K', 1, '2026-06-17', 'Houston', 'Portugal', 'DR Congo'),
  groupMatch('K', 2, '2026-06-18', 'Mexico City', 'Uzbekistan', 'Colombia'),
  groupMatch('K', 3, '2026-06-23', 'Houston', 'Portugal', 'Uzbekistan'),
  groupMatch('K', 4, '2026-06-24', 'Guadalajara', 'Colombia', 'DR Congo'),
  groupMatch('K', 5, '2026-06-28', 'Miami Gardens', 'Colombia', 'Portugal'),
  groupMatch('K', 6, '2026-06-28', 'Atlanta', 'DR Congo', 'Uzbekistan'),

  groupMatch('L', 1, '2026-06-17', 'Toronto', 'Ghana', 'Panama'),
  groupMatch('L', 2, '2026-06-17', 'Arlington', 'England', 'Croatia'),
  groupMatch('L', 3, '2026-06-23', 'Foxborough', 'England', 'Ghana'),
  groupMatch('L', 4, '2026-06-24', 'Toronto', 'Panama', 'Croatia'),
  groupMatch('L', 5, '2026-06-27', 'East Rutherford', 'Panama', 'England'),
  groupMatch('L', 6, '2026-06-27', 'Philadelphia', 'Croatia', 'Ghana'),
]

function knockoutMatch(
  id: string,
  stage: Match['stage'],
  date: string,
  venue: string,
  home: string,
  away: string,
): Match {
  return {
    id,
    stage,
    date,
    venue,
    home,
    away,
    status: 'programado',
  }
}

export const knockoutMatches: Match[] = [
  knockoutMatch('m73', 'Ronda de 32', '2026-06-28', 'Los Angeles', '2A', '2B'),
  knockoutMatch('m74', 'Ronda de 32', '2026-06-29', 'Boston', '1E', '3A/B/C/D/F'),
  knockoutMatch('m75', 'Ronda de 32', '2026-06-29', 'Monterrey', '1F', '2C'),
  knockoutMatch('m76', 'Ronda de 32', '2026-06-29', 'Houston', '1C', '2F'),
  knockoutMatch('m77', 'Ronda de 32', '2026-06-30', 'New York/New Jersey', '2E', '2I'),
  knockoutMatch('m78', 'Ronda de 32', '2026-06-30', 'Dallas', '1I', '3C/D/F/G/H'),
  knockoutMatch('m79', 'Ronda de 32', '2026-06-30', 'Mexico City', '1A', '3C/E/F/H/I'),
  knockoutMatch('m80', 'Ronda de 32', '2026-07-01', 'Atlanta', '1L', '3E/H/I/J/K'),
  knockoutMatch('m81', 'Ronda de 32', '2026-07-01', 'San Francisco Bay Area', '1G', '3A/E/H/I/J'),
  knockoutMatch('m82', 'Ronda de 32', '2026-07-01', 'Seattle', '1D', '3B/E/F/I/J'),
  knockoutMatch('m83', 'Ronda de 32', '2026-07-02', 'Toronto', '1H', '2J'),
  knockoutMatch('m84', 'Ronda de 32', '2026-07-02', 'Los Angeles', '2K', '2L'),
  knockoutMatch('m85', 'Ronda de 32', '2026-07-02', 'Vancouver', '1B', '3E/F/G/I/J'),
  knockoutMatch('m86', 'Ronda de 32', '2026-07-03', 'Miami', '1K', '3D/E/I/J/L'),
  knockoutMatch('m87', 'Ronda de 32', '2026-07-03', 'Kansas City', '2D', '2G'),
  knockoutMatch('m88', 'Ronda de 32', '2026-07-03', 'Dallas', '1J', '2H'),

  knockoutMatch('m89', 'Octavos', '2026-07-04', 'Philadelphia', 'Ganador M74', 'Ganador M75'),
  knockoutMatch('m90', 'Octavos', '2026-07-04', 'Houston', 'Ganador M76', 'Ganador M73'),
  knockoutMatch('m91', 'Octavos', '2026-07-05', 'New York/New Jersey', 'Ganador M78', 'Ganador M77'),
  knockoutMatch('m92', 'Octavos', '2026-07-05', 'Mexico City', 'Ganador M79', 'Ganador M80'),
  knockoutMatch('m93', 'Octavos', '2026-07-06', 'Dallas', 'Ganador M83', 'Ganador M84'),
  knockoutMatch('m94', 'Octavos', '2026-07-06', 'Seattle', 'Ganador M81', 'Ganador M82'),
  knockoutMatch('m95', 'Octavos', '2026-07-07', 'Atlanta', 'Ganador M85', 'Ganador M86'),
  knockoutMatch('m96', 'Octavos', '2026-07-07', 'Vancouver', 'Ganador M87', 'Ganador M88'),

  knockoutMatch('m97', 'Cuartos', '2026-07-09', 'Boston', 'Ganador M89', 'Ganador M90'),
  knockoutMatch('m98', 'Cuartos', '2026-07-10', 'Los Angeles', 'Ganador M91', 'Ganador M92'),
  knockoutMatch('m99', 'Cuartos', '2026-07-11', 'Miami', 'Ganador M93', 'Ganador M94'),
  knockoutMatch('m100', 'Cuartos', '2026-07-11', 'Kansas City', 'Ganador M95', 'Ganador M96'),

  knockoutMatch('m101', 'Semifinal', '2026-07-14', 'Dallas', 'Ganador M97', 'Ganador M98'),
  knockoutMatch('m102', 'Semifinal', '2026-07-15', 'Atlanta', 'Ganador M99', 'Ganador M100'),

  knockoutMatch('m104', 'Final', '2026-07-19', 'New York/New Jersey', 'Ganador M101', 'Ganador M102'),
]

export const tournamentState: TournamentState = {
  semifinalists: [],
  groupWinners: {},
  groupQualified: {},
  bestThirds: [],
  matches: [...groupStageMatches, ...knockoutMatches],
}

export const predictions: PredictionSlip[] = [
  {
    participantId: 'p1',
    locked: true,
    champion: 'Espana',
    semifinalists: ['Espana', 'Argentina', 'Brasil', 'Inglaterra'],
    topScorer: 'Kylian Mbappe',
    mvp: 'Pedri',
    groupWinners: { A: 'Mexico', B: 'Espana', C: 'Argentina' },
    groupQualified: {
      A: ['Mexico', 'Uruguay'],
      B: ['Espana', 'Japon'],
      C: ['Argentina', 'Serbia'],
    },
    bestThirds: ['Estados Unidos', 'Marruecos', 'Senegal'],
    matches: [
      { matchId: 'g-a-1', homeScore: 2, awayScore: 1 },
      { matchId: 'g-b-1', homeScore: 1, awayScore: 1 },
      { matchId: 'r32-1', homeScore: 2, awayScore: 2, penaltyWinner: 'Espana' },
      { matchId: 'oct-1', homeScore: 2, awayScore: 0 },
      { matchId: 'final', homeScore: 2, awayScore: 1 },
    ],
  },
  {
    participantId: 'p2',
    locked: true,
    champion: 'Argentina',
    semifinalists: ['Espana', 'Argentina', 'Francia', 'Portugal'],
    topScorer: 'Lautaro Martinez',
    mvp: 'Lionel Messi',
    groupWinners: { A: 'Uruguay', B: 'Espana', C: 'Argentina' },
    groupQualified: {
      A: ['Mexico', 'Uruguay'],
      B: ['Espana', 'Alemania'],
      C: ['Argentina', 'Croacia'],
    },
    bestThirds: ['Estados Unidos', 'Canada', 'Marruecos'],
    matches: [
      { matchId: 'g-a-1', homeScore: 1, awayScore: 1 },
      { matchId: 'g-b-1', homeScore: 2, awayScore: 1 },
      { matchId: 'r32-1', homeScore: 1, awayScore: 1, penaltyWinner: 'Marruecos' },
      { matchId: 'oct-1', homeScore: 3, awayScore: 1 },
      { matchId: 'final', homeScore: 1, awayScore: 2 },
    ],
  },
]
