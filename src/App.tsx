import { useEffect, useMemo, useRef, useState } from 'react'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import './App.css'
import { participants as initialParticipants, predictions as initialPredictions, tournamentState as initialTournamentState } from './data/mockData'
import { buildLeaderboard, scorePredictionDetails } from './domain/scoring'
import { getClosedPredictionStages, isPredictionPhase, predictionPhases, type PredictionPhase } from './domain/phases'
import type { Match, MatchPrediction, Participant, ParticipantStatus, PredictionSlip, ScoreBreakdown, TournamentState } from './domain/types'

type AutoTableDocument = jsPDF & {
  lastAutoTable?: {
    finalY: number
  }
}

const publicTabs = ['Formulario', 'Pronosticos', 'Cuadro', 'Clasificacion', 'Reglas'] as const
const adminTabs = ['Panel', 'Solicitudes', 'Cuadro', 'Participantes', 'Predicciones', 'Eliminatorias', 'Resultados', 'Bonus', 'Clasificacion', 'Reglas'] as const
type Tab = (typeof publicTabs)[number] | (typeof adminTabs)[number]
type TeamStanding = {
  team: string
  group?: string
  played: number
  won: number
  drawn: number
  lost: number
  goalsFor: number
  goalsAgainst: number
  goalDifference: number
  points: number
}
type QualifiedItem = { group: string; team: string }
type GroupTeamStanding = TeamStanding & { group: string }
const participantsStorageKey = 'porra-2026-participants'
const predictionsStorageKey = 'porra-2026-predictions'
const tournamentStorageKey = 'porra-2026-tournament'
const lastAccessCodeStorageKey = 'porra-2026-last-access-code'
const defaultPredictionPhase: PredictionPhase = 'preGroups'
const groups = 'ABCDEFGHIJKL'.split('')
const knockoutStages = ['Ronda de 32', 'Octavos', 'Cuartos', 'Semifinal', 'Final'] as const
const liveScoreStatuses = new Set(['en_juego', 'finalizado'])
const allTeams = Array.from(
  new Set(initialTournamentState.matches
    .filter((match) => match.stage === 'Grupo')
    .flatMap((match) => [match.home, match.away])),
).sort((a, b) => a.localeCompare(b))

function normalizeNameKey(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function participantName(participants: Participant[], participantId: string) {
  return participants.find((participant) => participant.id === participantId)?.name ?? ''
}

function stageLabel(stage: string) {
  return stage === 'Ronda de 32' ? 'Dieciseisavos' : stage
}

function buildNameVariants(predictions: PredictionSlip[], field: 'topScorer' | 'mvp') {
  const variants = new Map<string, { value: string; count: number; normalized: string }>()

  predictions.forEach((prediction) => {
    const value = prediction[field].trim()
    if (!value) return

    const current = variants.get(value)
    variants.set(value, {
      value,
      count: (current?.count ?? 0) + 1,
      normalized: normalizeNameKey(value),
    })
  })

  return Array.from(variants.values()).sort((a, b) =>
    a.normalized.localeCompare(b.normalized) || a.value.localeCompare(b.value),
  )
}

function sortParticipantsByName(participants: Participant[]) {
  return [...participants].sort((a, b) => a.name.localeCompare(b.name))
}
const flags: Record<string, string> = {
  Algeria: '🇩🇿',
  Argentina: '🇦🇷',
  Australia: '🇦🇺',
  Austria: '🇦🇹',
  Belgium: '🇧🇪',
  'Bosnia and Herzegovina': '🇧🇦',
  Brazil: '🇧🇷',
  Canada: '🇨🇦',
  'Cape Verde': '🇨🇻',
  Colombia: '🇨🇴',
  Croatia: '🇭🇷',
  Curacao: '🇨🇼',
  Czechia: '🇨🇿',
  'DR Congo': '🇨🇩',
  Ecuador: '🇪🇨',
  Egypt: '🇪🇬',
  England: '🏴',
  France: '🇫🇷',
  Germany: '🇩🇪',
  Ghana: '🇬🇭',
  Haiti: '🇭🇹',
  Iran: '🇮🇷',
  Iraq: '🇮🇶',
  'Ivory Coast': '🇨🇮',
  Japan: '🇯🇵',
  Jordan: '🇯🇴',
  Mexico: '🇲🇽',
  Morocco: '🇲🇦',
  Netherlands: '🇳🇱',
  'New Zealand': '🇳🇿',
  Norway: '🇳🇴',
  Panama: '🇵🇦',
  Paraguay: '🇵🇾',
  Portugal: '🇵🇹',
  Qatar: '🇶🇦',
  'Saudi Arabia': '🇸🇦',
  Scotland: '🏴',
  Senegal: '🇸🇳',
  'South Africa': '🇿🇦',
  'South Korea': '🇰🇷',
  Spain: '🇪🇸',
  Sweden: '🇸🇪',
  Switzerland: '🇨🇭',
  Tunisia: '🇹🇳',
  Turkiye: '🇹🇷',
  'United States': '🇺🇸',
  Uruguay: '🇺🇾',
  Uzbekistan: '🇺🇿',
}

function loadParticipants() {
  if (typeof window === 'undefined') {
    return initialParticipants
  }

  const savedParticipants = localStorage.getItem(participantsStorageKey)

  if (!savedParticipants) {
    return initialParticipants
  }

  try {
    return (JSON.parse(savedParticipants) as Participant[]).map(normalizeParticipantAccessCode)
  } catch {
    return initialParticipants
  }
}

function loadPredictions() {
  if (typeof window === 'undefined') {
    return initialPredictions
  }

  const savedPredictions = localStorage.getItem(predictionsStorageKey)

  if (!savedPredictions) {
    return initialPredictions
  }

  try {
    return (JSON.parse(savedPredictions) as PredictionSlip[]).map(normalizePredictionSlip)
  } catch {
    return initialPredictions
  }
}

function normalizePredictionSlip(prediction: Partial<PredictionSlip>): PredictionSlip {
  return {
    participantId: prediction.participantId ?? '',
    verificationCode: prediction.verificationCode ?? '',
    locked: prediction.locked ?? false,
    reopenRequested: prediction.reopenRequested ?? false,
    champion: prediction.champion ?? '',
    semifinalists: Array.isArray(prediction.semifinalists) ? prediction.semifinalists : [],
    topScorer: prediction.topScorer ?? '',
    mvp: prediction.mvp ?? '',
    groupWinners: prediction.groupWinners ?? {},
    groupQualified: prediction.groupQualified ?? {},
    bestThirds: Array.isArray(prediction.bestThirds) ? prediction.bestThirds : [],
    matches: Array.isArray(prediction.matches) ? prediction.matches : [],
    submittedAt: prediction.submittedAt,
    pdfReceived: prediction.pdfReceived ?? false,
  }
}

function clearTournamentResults(state: TournamentState): TournamentState {
  return {
    ...state,
    champion: undefined,
    semifinalists: [],
    topScorer: undefined,
    mvp: undefined,
    groupWinners: {},
    groupQualified: {},
    bestThirds: [],
    matches: state.matches.map((match) => ({
      ...match,
      homeScore: undefined,
      awayScore: undefined,
      penaltyWinner: undefined,
      status: 'programado',
    })),
  }
}

function applyResolvedRoundOf32(state: TournamentState, qualification: ReturnType<typeof buildQualification>): TournamentState {
  return {
    ...state,
    matches: state.matches.map((match) =>
      match.stage === 'Ronda de 32'
        ? {
            ...match,
            home: resolveKnockoutSlot(match.home, qualification) ?? match.home,
            away: resolveKnockoutSlot(match.away, qualification) ?? match.away,
          }
        : match,
    ),
  }
}

function normalizeMatch(match: Match): Match {
  return {
    ...match,
    date: match.date ? String(match.date).slice(0, 10) : undefined,
    homeScore: match.homeScore ?? undefined,
    awayScore: match.awayScore ?? undefined,
    penaltyWinner: match.penaltyWinner ?? undefined,
  }
}

function mergeStageMatchPredictions(
  existingMatches: MatchPrediction[],
  nextStageMatches: MatchPrediction[],
  matches: Match[],
  stage: string,
) {
  const stageMatchIds = new Set(matches.filter((match) => match.stage === stage).map((match) => match.id))
  const nextByMatchId = new Map(nextStageMatches.map((prediction) => [prediction.matchId, prediction]))

  return [
    ...existingMatches.filter((prediction) => !stageMatchIds.has(prediction.matchId)),
    ...Array.from(nextByMatchId.values()),
  ]
}

function loadTournamentState() {
  if (typeof window === 'undefined') {
    return initialTournamentState
  }

  const savedTournamentState = localStorage.getItem(tournamentStorageKey)

  if (!savedTournamentState) {
    return initialTournamentState
  }

  try {
    return JSON.parse(savedTournamentState) as TournamentState
  } catch {
    return initialTournamentState
  }
}

function loadLastAccessCode() {
  if (typeof window === 'undefined') {
    return ''
  }

  return localStorage.getItem(lastAccessCodeStorageKey) ?? ''
}

function rememberAccessCode(accessCode: string) {
  if (typeof window === 'undefined') {
    return
  }

  const trimmedAccessCode = accessCode.trim()

  if (trimmedAccessCode) {
    localStorage.setItem(lastAccessCodeStorageKey, trimmedAccessCode)
  }
}

function forgetAccessCode() {
  if (typeof window === 'undefined') {
    return
  }

  localStorage.removeItem(lastAccessCodeStorageKey)
}

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('Formulario')
  const [mode, setMode] = useState<'publico' | 'admin'>('publico')
  const [adminPinInput, setAdminPinInput] = useState('')
  const [adminError, setAdminError] = useState('')
  const [adminAuthenticated, setAdminAuthenticated] = useState(false)
  const [apiReady, setApiReady] = useState(false)
  const [predictionPhase, setPredictionPhase] = useState<PredictionPhase>(defaultPredictionPhase)
  const [participants, setParticipants] = useState<Participant[]>(loadParticipants)
  const [predictions, setPredictions] = useState<PredictionSlip[]>(loadPredictions)
  const [publicPredictions, setPublicPredictions] = useState<PredictionSlip[]>([])
  const [tournamentState, setTournamentState] = useState<TournamentState>(loadTournamentState)
  const [editingParticipantId, setEditingParticipantId] = useState<string | null>(null)
  const [reviewParticipantId, setReviewParticipantId] = useState<string | null>(null)
  const [selectedPredictionParticipantId, setSelectedPredictionParticipantId] = useState('')
  const [selectedPublicPredictionParticipantId, setSelectedPublicPredictionParticipantId] = useState('')
  const [expandedLeaderboardParticipantId, setExpandedLeaderboardParticipantId] = useState<string | null>(null)
  const [selectedPublicPredictionScope, setSelectedPublicPredictionScope] = useState('all')
  const [publicPredictionView, setPublicPredictionView] = useState<'participant' | 'match'>('participant')
  const [selectedPublicMatchId, setSelectedPublicMatchId] = useState('')
  const [selectedKnockoutParticipantId, setSelectedKnockoutParticipantId] = useState('')
  const [activeKnockoutStage, setActiveKnockoutStage] = useState<(typeof knockoutStages)[number]>('Ronda de 32')
  const [showRoundOf32Pending, setShowRoundOf32Pending] = useState(false)
  const [matchPredictions, setMatchPredictions] = useState<Record<string, MatchPrediction>>({})
  const [knockoutPredictions, setKnockoutPredictions] = useState<Record<string, MatchPrediction>>({})
  const [publicKnockoutPredictions, setPublicKnockoutPredictions] = useState<Record<string, MatchPrediction>>({})
  const publicKnockoutHydrationKeyRef = useRef('')
  const [publicFormStep, setPublicFormStep] = useState<'code-input' | 'form' | 'confirmation'>('code-input')
  const [publicFormConfirmation, setPublicFormConfirmation] = useState<{
    participantName: string
    timestamp: Date
  } | null>(null)
  const [publicFormEditMode, setPublicFormEditMode] = useState(false)
  const [publicSubmitError, setPublicSubmitError] = useState('')
  const [publicSubmitSaving, setPublicSubmitSaving] = useState(false)
  const [reopenRequestSubmitting, setReopenRequestSubmitting] = useState(false)
  const [publicForm, setPublicForm] = useState({
    accessCode: loadLastAccessCode(),
    name: '',
    contact: '',
    alias: '',
    champion: '',
    topScorer: '',
    mvp: '',
    semifinalists: [] as string[],
    groupWinners: {} as Record<string, string>,
    groupQualified: {} as Record<string, string[]>,
    bestThirds: [] as string[],
    matches: {} as Record<string, MatchPrediction>,
  })
  const publicParticipant = participants.find(
    (participant) => normalizeAccessCode(participant.accessCode) === normalizeAccessCode(publicForm.accessCode),
  )
  const publicFormErrors = validatePublicForm(publicForm, publicParticipant)
  const publicParticipantPrediction = publicParticipant
    ? predictions.find((p) => p.participantId === publicParticipant.id)
    : undefined
  const [predictionMeta, setPredictionMeta] = useState({
    champion: '',
    topScorer: '',
    mvp: '',
    semifinalists: [] as string[],
    groupWinners: {} as Record<string, string>,
    groupQualified: {} as Record<string, string[]>,
    bestThirds: [] as string[],
  })
  const [participantForm, setParticipantForm] = useState({
    name: '',
    contact: '',
    status: 'pendiente' as ParticipantStatus,
  })

  useEffect(() => {
    async function loadFromApi() {
      try {
        const [predictionsResponse, tournamentResponse, phaseResponse] = await Promise.all([
          fetch('/api/predictions/public', { cache: 'no-store' }),
          fetch('/api/tournament', { cache: 'no-store' }),
          fetch('/api/settings/prediction-phase', { cache: 'no-store' }),
        ])

        if (!predictionsResponse.ok) {
  throw new Error(`Predictions API unavailable: ${predictionsResponse.status}`)
}

if (!tournamentResponse.ok) {
  throw new Error(`Tournament API unavailable: ${tournamentResponse.status}`)
}
        

        const [apiPredictions, apiTournament, apiPhase] = await Promise.all([
          predictionsResponse.json(),
          tournamentResponse.json(),
          phaseResponse.ok ? phaseResponse.json() : Promise.resolve(null),
        ])

        if (Array.isArray(apiPredictions)) {
          setPublicPredictions(apiPredictions.map(normalizePredictionSlip))
          const publicParticipants = (apiPredictions as Array<{ participant?: Participant }>)
            .map((prediction) => prediction.participant)
            .filter(Boolean)
            .map(normalizeParticipantAccessCode)

          if (publicParticipants.length > 0) {
            setParticipants((current) => {
              const nextParticipants = new Map(current.map((participant) => [participant.id, participant]))
              publicParticipants.forEach((participant) => {
                nextParticipants.set(participant.id, participant)
              })

              return Array.from(nextParticipants.values())
            })
          }
        }

        if (Array.isArray(apiTournament.matches)) {
          setTournamentState({
            ...initialTournamentState,
            topScorer: typeof apiTournament.topScorer === 'string' ? apiTournament.topScorer : undefined,
            mvp: typeof apiTournament.mvp === 'string' ? apiTournament.mvp : undefined,
            matches: apiTournament.matches.map(normalizeMatch),
          })
        }

        if (isPredictionPhase(apiPhase?.predictionPhase)) {
          setPredictionPhase(apiPhase.predictionPhase)
        }

        setApiReady(true)
              
      } catch (error) {
        console.error('No se pudo cargar desde API', error)
      }
    }

    loadFromApi()
    if (adminAuthenticated) return

    const interval = window.setInterval(() => {
      if (document.visibilityState === 'visible') {
        loadFromApi()
      }
    }, 30000)

    return () => window.clearInterval(interval)
  }, [adminAuthenticated])

  useEffect(() => {
    const accessCode = publicForm.accessCode.trim()
    if (accessCode.length < 4) return
    if (publicParticipant) return

    const timeout = window.setTimeout(async () => {
      const participant = await lookupParticipant(accessCode)
      if (!participant) return
      rememberAccessCode(accessCode)

      setParticipants((current) =>
        current.some((item) => item.id === participant.id)
          ? current.map((item) => (item.id === participant.id ? participant : item))
          : [...current, participant],
      )
    }, 250)

    return () => window.clearTimeout(timeout)
  }, [publicForm.accessCode, publicParticipant])

  useEffect(() => {
    if (publicParticipant && publicForm.accessCode.trim()) {
      rememberAccessCode(publicForm.accessCode)
    }
  }, [publicForm.accessCode, publicParticipant])

  useEffect(() => {
    localStorage.setItem(participantsStorageKey, JSON.stringify(participants))
    if (apiReady && adminAuthenticated) {
      syncApi('/api/participants', participants, adminPinInput)
    }
  }, [adminAuthenticated, adminPinInput, apiReady, participants])

  useEffect(() => {
    localStorage.setItem(predictionsStorageKey, JSON.stringify(predictions))
    if (apiReady && adminAuthenticated) {
      syncApi('/api/predictions', predictions, adminPinInput)
    }
  }, [adminAuthenticated, adminPinInput, apiReady, predictions])

  useEffect(() => {
    localStorage.setItem(tournamentStorageKey, JSON.stringify(tournamentState))
    if (apiReady && adminAuthenticated) {
      syncApi('/api/tournament', tournamentState, adminPinInput)
    }
  }, [adminAuthenticated, adminPinInput, apiReady, tournamentState])

  useEffect(() => {
    if (!adminAuthenticated || mode !== 'admin' || activeTab !== 'Eliminatorias') {
      return
    }

    let cancelled = false

    loadAdminPredictions(adminPinInput).then((adminPredictions) => {
      if (!cancelled && adminPredictions) {
        setPredictions(adminPredictions)
      }
    })

    return () => {
      cancelled = true
    }
  }, [activeTab, adminAuthenticated, adminPinInput, mode])

  useEffect(() => {
    let cancelled = false

    if (!selectedPredictionParticipantId) {
      queueMicrotask(() => {
        if (!cancelled) {
          setMatchPredictions({})
        }
      })
      return
    }

    const savedPrediction = predictions.find(
      (prediction) => prediction.participantId === selectedPredictionParticipantId,
    )

    queueMicrotask(() => {
      if (cancelled) {
        return
      }

      setMatchPredictions(
        Object.fromEntries((savedPrediction?.matches ?? []).map((prediction) => [prediction.matchId, prediction])),
      )
      setPredictionMeta({
        champion: savedPrediction?.champion ?? '',
        topScorer: savedPrediction?.topScorer ?? '',
        mvp: savedPrediction?.mvp ?? '',
        semifinalists: savedPrediction?.semifinalists ?? [],
        groupWinners: savedPrediction?.groupWinners ?? {},
        groupQualified: savedPrediction?.groupQualified ?? {},
        bestThirds: savedPrediction?.bestThirds ?? [],
      })
    })

    return () => {
      cancelled = true
    }
  }, [predictions, selectedPredictionParticipantId])

  useEffect(() => {
    let cancelled = false

    if (!selectedKnockoutParticipantId) {
      queueMicrotask(() => {
        if (!cancelled) {
          setKnockoutPredictions({})
        }
      })
      return
    }

    const savedPrediction = predictions.find(
      (prediction) => prediction.participantId === selectedKnockoutParticipantId,
    )

    queueMicrotask(() => {
      if (cancelled) {
        return
      }

      setKnockoutPredictions(
        Object.fromEntries((savedPrediction?.matches ?? []).map((prediction) => [prediction.matchId, prediction])),
      )
    })

    return () => {
      cancelled = true
    }
  }, [predictions, selectedKnockoutParticipantId])

  const paidPlayers = participants.filter((player) => player.status === 'validado')
  const pendingPlayers = participants.filter((player) => player.status === 'pendiente')
  const completedMatches = tournamentState.matches.filter((match) => match.status === 'finalizado')
  const hasLiveMatches = tournamentState.matches.some((match) => match.status === 'en_juego')
  const lockedPredictions = predictions.filter((prediction) => prediction.locked)
  const reopenRequests = predictions.filter((prediction) => prediction.reopenRequested && prediction.locked)
  const validatedParticipants = participants.filter((participant) => participant.status === 'validado')
  const qualification = useMemo(() => buildQualification(tournamentState.matches), [tournamentState.matches])
  const resolvedTournamentState = useMemo(
    () => applyResolvedRoundOf32(tournamentState, qualification),
    [qualification, tournamentState],
  )
  const scoringTournamentState = useMemo(
    () => ({
      ...resolvedTournamentState,
      groupWinners: Object.fromEntries(
        qualification.groupWinners.map((item) => [item.group, item.team]),
      ),
      groupQualified: Object.fromEntries(
        groups.map((group) => [
          group,
          [
            ...qualification.groupWinners.filter((item) => item.group === group).map((item) => item.team),
            ...qualification.groupRunnersUp.filter((item) => item.group === group).map((item) => item.team),
          ],
        ]),
      ),
      bestThirds: qualification.bestThirds.map((item) => item.team),
    }),
    [qualification, resolvedTournamentState],
  )
  const visibleTabs = mode === 'publico' ? publicTabs : adminTabs
  const closedPredictionStages = getClosedPredictionStages(predictionPhase)
  const publicVisiblePredictions = publicPredictions.filter((prediction) => prediction.locked)
  const publicVisiblePredictionsByName = [...publicVisiblePredictions].sort((a, b) =>
    participantName(participants, a.participantId).localeCompare(participantName(participants, b.participantId)),
  )
  const filteredPublicPredictions = selectedPublicPredictionParticipantId
    ? publicVisiblePredictionsByName.filter(
        (prediction) => prediction.participantId === selectedPublicPredictionParticipantId,
      )
    : []
  const visibleGroups = selectedPublicPredictionScope.startsWith('group-')
    ? [selectedPublicPredictionScope.replace('group-', '')]
    : groups
  const visibleKnockoutStages = selectedPublicPredictionScope === 'all'
    ? closedPredictionStages.filter((stage) => stage !== 'Grupo')
    : closedPredictionStages.includes(selectedPublicPredictionScope as Match['stage'])
      ? [selectedPublicPredictionScope as Match['stage']]
      : []
  const visiblePublicMatches = resolvedTournamentState.matches.filter((match) => {
    if (!closedPredictionStages.includes(match.stage)) return false

    if (selectedPublicPredictionScope === 'all') return true
    if (selectedPublicPredictionScope.startsWith('group-')) {
      return match.stage === 'Grupo' && match.group === selectedPublicPredictionScope.replace('group-', '')
    }

    return match.stage === selectedPublicPredictionScope
  })
  const selectedPublicMatch = visiblePublicMatches.find((match) => match.id === selectedPublicMatchId) ?? visiblePublicMatches[0]
  const scoringDetailsByParticipant = useMemo(
    () => Object.fromEntries(
      [...predictions, ...publicPredictions].map((prediction) => [
        prediction.participantId,
        scorePredictionDetails(prediction, scoringTournamentState),
      ]),
    ),
    [predictions, publicPredictions, scoringTournamentState],
  )
  const leaderboardPredictions = mode === 'publico' ? publicPredictions : predictions
  const leaderboard = useMemo(
    () => buildLeaderboard(participants, leaderboardPredictions, scoringTournamentState),
    [participants, leaderboardPredictions, scoringTournamentState],
  )
  const topScorerVariants = useMemo(() => buildNameVariants(predictions, 'topScorer'), [predictions])
  const mvpVariants = useMemo(() => buildNameVariants(predictions, 'mvp'), [predictions])
  const liveScoreNotice = hasLiveMatches ? <span className="live-score-notice">Incluye partidos en juego</span> : null
  useEffect(() => {
    if (selectedPublicPredictionParticipantId || !publicParticipantPrediction?.locked) {
      return
    }

    const hasVisiblePrediction = publicVisiblePredictions.some(
      (prediction) => prediction.participantId === publicParticipantPrediction.participantId,
    )

    if (hasVisiblePrediction) {
      queueMicrotask(() => {
        setSelectedPublicPredictionParticipantId(publicParticipantPrediction.participantId)
      })
    }
  }, [publicParticipantPrediction, publicVisiblePredictions, selectedPublicPredictionParticipantId])
  useEffect(() => {
    if (!visiblePublicMatches.length) {
      if (selectedPublicMatchId) {
        queueMicrotask(() => setSelectedPublicMatchId(''))
      }
      return
    }

    if (!visiblePublicMatches.some((match) => match.id === selectedPublicMatchId)) {
      queueMicrotask(() => setSelectedPublicMatchId(visiblePublicMatches[0].id))
    }
  }, [selectedPublicMatchId, visiblePublicMatches])
  const selectedPrediction = predictions.find(
    (prediction) => prediction.participantId === selectedPredictionParticipantId,
  )
const selectedPredictionIsLocked = selectedPrediction?.locked ?? false

const initialPredictionClosed = predictionPhase !== 'preGroups'

const currentKnockoutStage =
  predictionPhase === 'Ronda de 32' ||
  predictionPhase === 'Octavos' ||
  predictionPhase === 'Cuartos' ||
  predictionPhase === 'Semifinal' ||
  predictionPhase === 'Final'
    ? predictionPhase
    : null

const knockoutEditingEnabled = currentKnockoutStage !== null
const publicCurrentKnockoutComplete = Boolean(
  publicParticipantPrediction &&
  currentKnockoutStage &&
  hasCompleteStagePredictions(publicParticipantPrediction, resolvedTournamentState.matches, currentKnockoutStage),
)
const roundOf32PredictionStatus = useMemo(() => {
  const closed: Participant[] = []
  const pending: Participant[] = []

  validatedParticipants.forEach((participant) => {
    const prediction = predictions.find((item) => item.participantId === participant.id)
    if (prediction && hasCompleteStagePredictions(prediction, resolvedTournamentState.matches, 'Ronda de 32')) {
      closed.push(participant)
    } else {
      pending.push(participant)
    }
  })

  return {
    closed,
    pending: sortParticipantsByName(pending),
  }
}, [predictions, resolvedTournamentState.matches, validatedParticipants])

  useEffect(() => {
    let cancelled = false

    if (!publicParticipantPrediction || !currentKnockoutStage) {
      publicKnockoutHydrationKeyRef.current = ''
      queueMicrotask(() => {
        if (!cancelled) {
          setPublicKnockoutPredictions({})
        }
      })
      return
    }

    const hydrationKey = `${publicParticipantPrediction.participantId}:${currentKnockoutStage}`
    if (publicKnockoutHydrationKeyRef.current === hydrationKey) {
      return
    }
    publicKnockoutHydrationKeyRef.current = hydrationKey

    const nextPredictions = Object.fromEntries(
      publicParticipantPrediction.matches
        .filter((prediction) => {
          const match = tournamentState.matches.find((item) => item.id === prediction.matchId)
          return match?.stage === currentKnockoutStage
        })
        .map((prediction) => [prediction.matchId, prediction]),
    )

    queueMicrotask(() => {
      if (!cancelled) {
        setPublicKnockoutPredictions(nextPredictions)
      }
    })

    return () => {
      cancelled = true
    }
  }, [currentKnockoutStage, publicParticipantPrediction, tournamentState.matches])

  const enteredAccessCode = publicForm.accessCode.trim()
  const publicCodeHasInput = enteredAccessCode.length > 0
  const publicFormRequiredCount = publicFormErrors.length
  const publicGroupFormDisabled = Boolean(publicParticipantPrediction?.locked) || initialPredictionClosed
  const publicKnockoutSaveDisabled = Boolean(
    publicCurrentKnockoutComplete || publicParticipantPrediction?.reopenRequested,
  )
  const resetPublicForm = (accessCode = '') => {
    if (!accessCode) {
      forgetAccessCode()
    }

    setPublicForm({
      accessCode,
      name: '',
      contact: '',
      alias: '',
      champion: '',
      topScorer: '',
      mvp: '',
      semifinalists: [],
      groupWinners: {},
      groupQualified: {},
      bestThirds: [],
      matches: {},
    })
    setPublicFormConfirmation(null)
    setPublicFormEditMode(false)
  }
  const loadMyPrediction = async (accessCode: string) => {
    const result = await fetchMyPrediction(accessCode)
    if (!result) return
    rememberAccessCode(accessCode)

    setParticipants((current) =>
      current.some((participant) => participant.id === result.participant.id)
        ? current.map((participant) =>
            participant.id === result.participant.id ? result.participant : participant,
          )
        : [...current, result.participant],
    )

    if (result.prediction) {
      setPredictions((current) =>
        current.some((prediction) => prediction.participantId === result.prediction?.participantId)
          ? current.map((prediction) =>
              prediction.participantId === result.prediction?.participantId
                ? normalizePredictionSlip(result.prediction)
                : prediction,
            )
          : [...current, result.prediction],
      )
    }
  }

  useEffect(() => {
    const accessCode = publicForm.accessCode.trim()
    if (!publicParticipant || publicParticipantPrediction || accessCode.length < 4) {
      return
    }

    const timeout = window.setTimeout(() => {
      loadMyPrediction(accessCode)
    }, 250)

    return () => window.clearTimeout(timeout)
  }, [publicForm.accessCode, publicParticipant, publicParticipantPrediction])

  const savePublicKnockoutPredictions = async () => {
    if (!currentKnockoutStage) return

    const filledPredictions = Object.values(publicKnockoutPredictions).filter(
      (prediction) => Number.isFinite(prediction.homeScore) && Number.isFinite(prediction.awayScore),
    )
    const saved = await submitPublicKnockoutPredictions({ accessCode: publicForm.accessCode, matches: filledPredictions })

    if (!saved.ok || !saved.prediction) {
      window.alert(saved.error)
      return
    }
    rememberAccessCode(publicForm.accessCode)

    const savedPrediction = normalizePredictionSlip(saved.prediction)
    setPredictions((current) =>
      current.map((prediction) =>
        prediction.participantId === savedPrediction.participantId
          ? {
              ...savedPrediction,
              matches: mergeStageMatchPredictions(
                prediction.matches,
                savedPrediction.matches,
                tournamentState.matches,
                currentKnockoutStage,
              ),
            }
          : prediction,
      ),
    )
    setPublicPredictions((current) =>
      current.some((prediction) => prediction.participantId === savedPrediction.participantId)
        ? current.map((prediction) =>
            prediction.participantId === savedPrediction.participantId
              ? {
                  ...savedPrediction,
                  matches: mergeStageMatchPredictions(
                    prediction.matches,
                    savedPrediction.matches,
                    tournamentState.matches,
                    currentKnockoutStage,
                  ),
                }
              : prediction,
          )
        : [...current, savedPrediction],
    )
    window.alert('Ronda guardada.')
  }

  const savePublicKnockoutFinal = async () => {
    if (!publicParticipantPrediction) return

    const filledPredictions = Object.values(publicKnockoutPredictions).filter(
      (prediction) => Number.isFinite(prediction.homeScore) && Number.isFinite(prediction.awayScore),
    )

    const basePrediction = publicParticipantPrediction
    const payload = {
      accessCode: publicForm.accessCode,
      matches: filledPredictions,
      locked: true,
      champion: basePrediction.champion,
      semifinalists: basePrediction.semifinalists,
      topScorer: basePrediction.topScorer,
      mvp: basePrediction.mvp,
      groupWinners: basePrediction.groupWinners,
      groupQualified: basePrediction.groupQualified,
      bestThirds: basePrediction.bestThirds,
    }

    const saved = await submitPublicKnockoutPredictions(payload)
    if (!saved.ok || !saved.prediction) {
      window.alert(saved.error)
      return
    }

    rememberAccessCode(publicForm.accessCode)

    const savedPrediction = normalizePredictionSlip(saved.prediction)
    setPredictions((current) =>
      current.map((prediction) =>
        prediction.participantId === savedPrediction.participantId ? savedPrediction : prediction,
      ),
    )
    setPublicPredictions((current) =>
      current.some((prediction) => prediction.participantId === savedPrediction.participantId)
        ? current.map((prediction) =>
            prediction.participantId === savedPrediction.participantId ? savedPrediction : prediction,
          )
        : [...current, savedPrediction],
    )

    // If prediction is now locked, generate PDF including groups/bonus/up-to-date matches
    if (savedPrediction.locked) {
      const participant = participants.find((p) => p.accessCode === publicForm.accessCode) ?? { id: '', name: '' }
      try {
        generatePredictionPdf({
          participant,
          prediction: savedPrediction,
          matches: getPrintableMatches(tournamentState.matches, savedPrediction),
          tournamentState,
        })
      } catch (error) {
        console.error('No se pudo descargar el PDF automaticamente', error)
      }
    }

    window.alert('Ronda guardada y PDF generado.')
  }
  const savePublicPrediction = async (locked: boolean) => {
    if (!publicParticipant) return
    if (publicSubmitSaving) return

    setPublicSubmitError('')
    setPublicSubmitSaving(true)
    const participantId = publicParticipant.id
    const displayName = publicForm.alias.trim() || publicParticipant.name
    const matches = Object.values(publicForm.matches).filter(
      (prediction) => Number.isFinite(prediction.homeScore) && Number.isFinite(prediction.awayScore),
    )

    const saved = await submitPublicPrediction({
      accessCode: publicForm.accessCode,
      displayName,
      locked,
      champion: publicForm.champion,
      semifinalists: publicForm.semifinalists,
      topScorer: publicForm.topScorer,
      mvp: publicForm.mvp,
      groupWinners: publicForm.groupWinners,
      groupQualified: publicForm.groupQualified,
      bestThirds: publicForm.bestThirds,
      matches,
    })

    if (!saved.ok) {
      setPublicSubmitSaving(false)
      setPublicSubmitError(saved.error)
      window.alert(saved.error)
      return
    }
    rememberAccessCode(publicForm.accessCode)

    const nextPrediction = {
      ...normalizePredictionSlip(saved.prediction),
      submittedAt: locked ? new Date().toISOString() : undefined,
      pdfReceived: false,
    }
    const confirmedPrediction = locked
      ? (await fetchMyPrediction(publicForm.accessCode))?.prediction ?? nextPrediction
      : nextPrediction

    setParticipants((current) =>
      current.map((participant) =>
        participant.id === participantId ? { ...participant, name: displayName } : participant,
      ),
    )

    setPredictions((current) =>
      current.some((prediction) => prediction.participantId === participantId)
        ? current.map((prediction) => (prediction.participantId === participantId ? confirmedPrediction : prediction))
        : [...current, confirmedPrediction],
    )

    if (locked) {
      try {
        generatePredictionPdf({
            participant: { ...publicParticipant, name: displayName },
            prediction: confirmedPrediction,
            matches: getPrintableMatches(tournamentState.matches, confirmedPrediction),
            tournamentState,
          })
      } catch (error) {
        console.error('No se pudo descargar el PDF automaticamente', error)
      }
    }

    setPublicFormConfirmation({
      participantName: displayName,
      timestamp: new Date(),
    })

    setPublicForm((form) => ({
      ...form,
      alias: '',
      champion: '',
      topScorer: '',
      mvp: '',
      semifinalists: [],
      groupWinners: {},
      groupQualified: {},
      bestThirds: [],
      matches: {},
    }))
    setPublicFormEditMode(false)
    setPublicFormStep('confirmation')
    setPublicSubmitSaving(false)
  }
  const resetOfficialResults = async () => {
    const clearedState = clearTournamentResults(tournamentState)
    setTournamentState(clearedState)

    if (!apiReady || !adminAuthenticated) return

    const saved = await resetTournamentResults(adminPinInput)
    if (!saved) {
      window.alert('No se pudo guardar el reinicio de resultados. Revisa la conexion o el PIN admin.')
      return
    }

    setTournamentState({
      ...clearedState,
      matches: saved.matches.map(normalizeMatch),
    })
  }
  const saveOfficialResults = async () => {
    if (!adminAuthenticated) {
      window.alert('Entra como admin antes de guardar resultados.')
      return
    }

    const saved = await saveTournamentState(tournamentState, adminPinInput)
    if (!saved.ok) {
      window.alert(`No se pudieron guardar los resultados. ${saved.error}`)
      return
    }

    const savedMatches = Array.isArray(saved.data?.matches)
      ? saved.data.matches
      : await loadTournamentMatches()

    if (!savedMatches) {
      window.alert('Los resultados se han enviado, pero no se pudieron recargar. Refresca la pagina para comprobarlos.')
      return
    }

    setTournamentState({
      ...tournamentState,
      topScorer: typeof saved.data.topScorer === 'string' ? saved.data.topScorer : tournamentState.topScorer,
      mvp: typeof saved.data.mvp === 'string' ? saved.data.mvp : tournamentState.mvp,
      matches: savedMatches.map(normalizeMatch),
    })
  }
  const saveParticipants = async (nextParticipants = participants) => {
    if (!adminAuthenticated) {
      window.alert('Entra como admin antes de guardar participantes.')
      return false
    }

    const saved = await saveParticipantsState(nextParticipants, adminPinInput)
    if (!saved.ok) {
      window.alert(`No se pudieron guardar los participantes. ${saved.error}`)
      return false
    }

    if (Array.isArray(saved.data.participants)) {
      setParticipants(saved.data.participants.map(normalizeParticipantAccessCode))
    }

    return true
  }
  const applyNameNormalization = async (field: 'topScorer' | 'mvp', from: string) => {
    const to = window.prompt(`Nombre correcto para "${from}"`, from)?.trim()
    if (!to || to === from) return

    const saved = await normalizePredictionNames(field, from, to, adminPinInput)
    if (!saved) {
      window.alert('No se pudieron normalizar los nombres. Revisa la conexion o el PIN admin.')
      return
    }

    setPredictions(saved.predictions.map(normalizePredictionSlip))
    window.alert(`Nombres normalizados: ${saved.updated} prediccion${saved.updated === 1 ? '' : 'es'}.`)
  }

  return (
    <main className="app-shell">
      <aside className="sidebar" aria-label="Navegacion principal">
        <div>
          <p className="eyebrow">Porra Mundial 2026</p>
          <h1>Panel de control</h1>
        </div>
        <nav className="nav-list">
          {visibleTabs.map((tab) => (
            <button
              className={activeTab === tab ? 'nav-item active' : 'nav-item'}
              key={tab}
              onClick={() => setActiveTab(tab)}
              type="button"
            >
              {tab}
            </button>
          ))}
        </nav>
        <div className="mode-switch">
          <button
            className={mode === 'publico' ? 'mode-button active' : 'mode-button'}
            onClick={() => {
              setMode('publico')
              setActiveTab('Formulario')
            }}
            type="button"
          >
            Publico
          </button>
          <button
            className={mode === 'admin' ? 'mode-button active' : 'mode-button'}
            onClick={async () => {
              const verified = await verifyAdminPin(adminPinInput)

              if (!verified) {
                setAdminAuthenticated(false)
                setAdminError('PIN incorrecto')
                return
              }

              setAdminAuthenticated(true)
              setAdminError('')
              const adminParticipants = await loadAdminParticipants(adminPinInput)
              if (adminParticipants) {
                setParticipants(adminParticipants)
              }
              const adminPredictions = await loadAdminPredictions(adminPinInput)
              if (adminPredictions) {
                setPredictions(adminPredictions)
              }
              setMode('admin')
              setActiveTab('Panel')
            }}
            type="button"
          >
            Admin
          </button>
        </div>
        {mode === 'publico' && (
          <div className="admin-login">
            <label>
              PIN admin
              <input
                onChange={(event) => setAdminPinInput(event.target.value)}
                type="password"
                value={adminPinInput}
              />
            </label>
            {adminError && <span>{adminError}</span>}
          </div>
        )}
      </aside>

      {/* Barra de pestañas móvil */}
      <nav className="mobile-tabs" aria-label="Navegacion móvil">
        {visibleTabs.map((tab) => (
          <button
            className={activeTab === tab ? 'mobile-tab active' : 'mobile-tab'}
            key={tab}
            onClick={() => setActiveTab(tab)}
            type="button"
          >
            {tab}
          </button>
        ))}
      </nav>

      <section className="workspace">
        {activeTab === 'Formulario' && (
          <section>
            <header className="public-hero">
              <div className="public-hero-content">
                <p className="eyebrow">Envía tu porra</p>
                <h2>Predicción del Mundial 2026</h2>
              </div>
            </header>

            {publicFormStep === 'code-input' && (
              <div className="form-intake">
                <div className="public-entry-panel">
                  <div className="public-entry-copy">
                    <p className="eyebrow">Acceso privado</p>
                    <h3>Introduce tu código para entrar a tu porra</h3>
                    <p>
                      El código es personal y tiene el formato <strong>Nombre1234</strong>. Con él podrás ver si ya
                      enviaste tu predicción o completar una nueva.
                    </p>
                  </div>
                  <label>
                    Tu código de acceso
                    <input
                      autoFocus
                      autoCapitalize="none"
                      autoComplete="off"
                      autoCorrect="off"
                      spellCheck={false}
                      onChange={(event) => setPublicForm((form) => ({ ...form, accessCode: event.target.value }))}
                      onKeyDown={async (event) => {
                        if (event.key === 'Enter' && publicParticipant) {
                          await loadMyPrediction(publicForm.accessCode)
                          setPublicFormStep('form')
                        }
                      }}
                      placeholder="Ej: Javier2086"
                      value={publicForm.accessCode}
                    />
                  </label>
                  {publicParticipant ? (
                    <div className="access-status access-status-ok">
                      <div>
                        <span>Código reconocido</span>
                        <strong>Hola, {publicParticipant.name}</strong>
                        <p>
                          {publicParticipantPrediction
                            ? 'Ya tienes una porra registrada. Puedes revisarla desde aquí.'
                            : 'Todavía no has enviado tu porra. Puedes completarla ahora.'}
                        </p>
                      </div>
                      <button
                        className="primary-action"
                        onClick={async () => {
                          await loadMyPrediction(publicForm.accessCode)
                          setPublicFormStep('form')
                        }}
                        type="button"
                      >
                        {publicParticipantPrediction ? 'Ver mi porra' : 'Completar mi porra'}
                      </button>
                    </div>
                  ) : publicCodeHasInput ? (
                    <div className="access-status access-status-error">
                      <strong>Código no encontrado</strong>
                      <p>Verifica que el código sea correcto e intenta de nuevo</p>
                    </div>
                  ) : null}
                </div>
              </div>
            )}

            {publicFormStep === 'confirmation' && publicParticipant && (
  <div className="form-intake">
    <div className="success-panel">
      <strong>✓ Porra guardada y PDF descargado</strong>

    {selectedPrediction?.verificationCode && (
  <p className="verification-code">
    Código de verificación: {selectedPrediction.verificationCode}
  </p>
)}

      <p>
        Hola{' '}
        <strong>
          {publicFormConfirmation?.participantName || publicParticipant.name}
        </strong>
        , tu porra se guardó correctamente.
      </p>

      {publicParticipantPrediction?.locked && publicParticipantPrediction.submittedAt ? (
        <p className="form-description">
          Enviada el{' '}
          {new Date(publicParticipantPrediction.submittedAt).toLocaleString()}
        </p>
      ) : null}

      {publicParticipantPrediction?.locked && (
        <p className="form-description">
          Por seguridad, debes enviar el PDF descargado al administrador.
        </p>
      )}

      {publicParticipantPrediction?.locked && (
        <button
          className="primary-action"
          onClick={() => {
              generatePredictionPdf({
              participant: publicParticipant,
              prediction: publicParticipantPrediction,
              matches: getPrintableMatches(tournamentState.matches, publicParticipantPrediction),
              tournamentState,
            })
          }}
          type="button"
        >
          Descargar PDF
        </button>
      )}

      <p className="form-description">
        {publicParticipantPrediction?.locked
          ? 'Tu predicción está bloqueada y no puede ser modificada.'
          : 'Tu predicción está pendiente de revisión y puedes editarla.'}
      </p>
    </div>

    <div className="form-actions">
      <button
        className="primary-action"
        onClick={() => {
  if (publicParticipantPrediction) {
    setPublicForm((current) => ({
      ...current,
      champion: publicParticipantPrediction.champion,
      semifinalists: publicParticipantPrediction.semifinalists,
      topScorer: publicParticipantPrediction.topScorer,
      mvp: publicParticipantPrediction.mvp,
      groupWinners: publicParticipantPrediction.groupWinners,
      groupQualified: publicParticipantPrediction.groupQualified,
      bestThirds: publicParticipantPrediction.bestThirds,
      matches: Object.fromEntries(
        publicParticipantPrediction.matches.map((match) => [match.matchId, match]),
      ),
    }))
  }

  setPublicFormStep('form')
}}
type="button"
>
  Ver mi predicción
</button>

      <button
        className="secondary-action"
        onClick={() => {
          resetPublicForm()
          setPublicFormStep('code-input')
        }}
        type="button"
      >
        Usar otro código
      </button>
    </div>
  </div>
)}
            {publicFormStep === 'form' && publicParticipant && (
              <div className="form-intake">
                {publicFormConfirmation && (
                  <div className="success-panel">
                    <strong>✓ Predicción enviada correctamente</strong>
                    <p>
                      Hola <strong>{publicFormConfirmation.participantName}</strong>, tu porra ha sido registrada.
                    </p>
                  </div>
                )}

                {(!publicParticipantPrediction || publicFormEditMode) ? (
                  <>
                    <div className="meta-card public-form-greeting">
                      <div className="greeting-content">
                        <p className="eyebrow">Bienvenido</p>
                        <h3>Hola, {publicParticipant.name}</h3>
                        <p className="form-description">
                          Rellena tus predicciones para la porra del Mundial 2026. Una vez enviadas, no podrás
                          editarlas.
                        </p>
                      </div>
                      <div className="greeting-actions">
                        <button
                          className="secondary-action"
                          onClick={() => {
                            forgetAccessCode()
                            setPublicForm({
                              accessCode: '',
                              name: '',
                              contact: '',
                              alias: '',
                              champion: '',
                              topScorer: '',
                              mvp: '',
                              semifinalists: [],
                              groupWinners: {},
                              groupQualified: {},
                              bestThirds: [],
                              matches: {},
                            })
                            setPublicFormStep('code-input')
                            setPublicFormEditMode(false)
                          }}
                          type="button"
                        >
                          ← Usar otro código
                        </button>
                      </div>
                    </div>

                    <div className="public-form-status">
                      <div>
                        <span>Identificado como</span>
                        <strong>{publicParticipant.name}</strong>
                      </div>
                      <div>
                        <span>Estado</span>
                        <strong>
                          {publicParticipantPrediction
                            ? publicParticipantPrediction.locked
                              ? 'Definitiva'
                              : 'Borrador'
                            : 'Porra pendiente'}
                        </strong>
                      </div>
                      <div>
                        <span>Pendiente por completar</span>
                        <strong>{publicFormRequiredCount}</strong>
                      </div>
                    </div>

                    {!publicParticipantPrediction?.locked && publicFormErrors.length > 0 && (
  <div className="validation-panel">
    <strong>Completa todos los campos obligatorios</strong>
    <ul>
      {publicFormErrors.map((error) => (
        <li key={error}>{error}</li>
      ))}
    </ul>
  </div>
)}
                    <div className="meta-card">
                      <h3>Tu nombre en la clasificación</h3>
                      <label>
                        Alias en ranking (opcional)
                        <input
                          onChange={(event) =>
                            setPublicForm((form) => ({ ...form, alias: event.target.value }))
                          }
                          placeholder={`Aparecerás como: ${publicForm.alias.trim() || publicParticipant.name}`}
                          value={publicForm.alias}
                        />
                      </label>
                      {publicParticipantPrediction && (
                        <ScoreBonusList bonuses={scoringDetailsByParticipant[publicParticipantPrediction.participantId]?.bonuses ?? []} />
                      )}
                    </div>

                    <div className="meta-card">
                      <h3>Predicción pre-torneo</h3>
                      <div className="meta-grid">
                        <TeamSelect
  disabled={publicGroupFormDisabled}
  label="Campeon"
  onChange={(value) => {
  if (publicGroupFormDisabled) {
    return
  }

  setPublicForm((form) => ({ ...form, champion: value }))
}}  teams={allTeams}
  value={publicForm.champion}
/>
                        <label>
                          Máximo goleador
                         
                            <input
  disabled={publicGroupFormDisabled}

    onChange={(event) => {
  if (publicGroupFormDisabled) {
    return
  }

  setPublicForm((form) => ({
    ...form,
    topScorer: event.target.value,
  }))
}}
  
  placeholder="Nombre del jugador"
  value={publicForm.topScorer}
/>
                        </label>
                        <label>
                          MVP del torneo
                          <input
  disabled={publicGroupFormDisabled}
  onChange={(event) => {
  if (publicGroupFormDisabled) {
    return
  }

  setPublicForm((form) => ({
    ...form,
    mvp: event.target.value,
  }))
}}
  placeholder="Nombre del jugador"
  value={publicForm.mvp}
/>
                        </label>
                      </div>
                      <MultiTeamPicker
  disabled={publicGroupFormDisabled}
  label="Semifinalistas"
  limit={4}
  onChange={(teams) => {
  if (publicGroupFormDisabled) {
    return
  }

  setPublicForm((form) => ({
    ...form,
    semifinalists: teams,
  }))
}}
  selected={publicForm.semifinalists}
  teams={allTeams}
/>
                      <MultiTeamPicker
                        label="Mejores terceros (8 equipos)"
                        limit={8}
                        onChange={(teams) => setPublicForm((form) => ({ ...form, bestThirds: teams }))}
                        selected={publicForm.bestThirds}
                        teams={allTeams}
                      />
                    </div>

                    <div className="meta-card">
                      <h3>Clasificados por grupo</h3>
                      <p className="form-description">Selecciona quién crees que ganará cada grupo</p>
                      <div className="group-picks-grid">
                        {groups.map((group) => {
                          const groupTeams = teamsForGroup(tournamentState.matches, group)
                          return (
                            <div className="group-pick" key={group}>
                              <h4>
                                Grupo <span translate="no">{group}</span>
                              </h4>
                              <TeamSelect
  disabled={publicGroupFormDisabled}
  label="Primero"
                                onChange={(value) =>
                                  setPublicForm((form) => ({
                                    ...form,
                                    groupWinners: { ...form.groupWinners, [group]: value },
                                  }))
                                }
                                teams={groupTeams}
                                value={publicForm.groupWinners[group] ?? ''}
                              />
                              <MultiTeamPicker
  disabled={publicGroupFormDisabled}
  label="Clasificados"
                                limit={2}
                                onChange={(teams) =>
                                  setPublicForm((form) => ({
                                    ...form,
                                    groupQualified: { ...form.groupQualified, [group]: teams },
                                  }))
                                }
                                selected={publicForm.groupQualified[group] ?? []}
                                teams={groupTeams}
                              />
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    <div className="meta-card">
                      <h3>Resultados de la fase de grupos</h3>
                      <p className="form-description">Predice el resultado de los 104 partidos</p>
                      <div className="prediction-board">
                        {groups.map((group) => (
                          <PredictionGroup
  disabled={publicGroupFormDisabled}
  group={group}
  key={group}
  matches={tournamentState.matches.filter((match) => match.group === group)}
  onChange={(matchId, side, value) => {
                              const parsedValue = value === '' ? Number.NaN : Number(value)
                              setPublicForm((form) => {
                                const previous = form.matches[matchId] ?? {
                                  matchId,
                                  homeScore: Number.NaN,
                                  awayScore: Number.NaN,
                                }

                                return {
                                  ...form,
                                  matches: {
                                    ...form.matches,
                                    [matchId]: {
                                      ...previous,
                                      [side]: parsedValue,
                                    },
                                  },
                                }
                              })
                            }}
                            predictions={publicForm.matches}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="form-actions">
                      {publicSubmitError && <p className="form-error">{publicSubmitError}</p>}
                      <button
  className="secondary-action"
  disabled={initialPredictionClosed || publicSubmitSaving}
  onClick={() => savePublicPrediction(false)}
  type="button"
>
  Guardar borrador
</button>
                      
                        <button
  className="primary-action"
  disabled={publicFormErrors.length > 0 || initialPredictionClosed || publicSubmitSaving}
  onClick={() => {
    const confirmed = window.confirm(
      'Vas a enviar tu porra como definitiva. Se descargará un PDF y ya no podrás editarla salvo reapertura del administrador. ¿Continuar?',
    )

    if (!confirmed) {
      return
    }

    savePublicPrediction(true)
                        }}
                        type="button"
                      >
                        {publicSubmitSaving ? 'Enviando...' : 'Enviar definitiva'}
                      </button>
                      <button
                        className="secondary-action"
                        onClick={() => {
                          forgetAccessCode()
                          setPublicForm({
                            accessCode: '',
                            name: '',
                            contact: '',
                            alias: '',
                            champion: '',
                            topScorer: '',
                            mvp: '',
                            semifinalists: [],
                            groupWinners: {},
                            groupQualified: {},
                            bestThirds: [],
                            matches: {},
                          })
                          setPublicFormStep('code-input')
                        }}
                        type="button"
                      >
                        Cancelar
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="meta-card public-form-greeting">
                      <div className="greeting-content">
                        <p className="eyebrow">Predicción registrada</p>
                        <h3>Tu porra ya está registrada, {publicParticipant.name}</h3>
                        <p className="form-description">
                          {publicParticipantPrediction.locked
                            ? currentKnockoutStage
                              ? 'Tu fase de grupos está bloqueada. Puedes completar la eliminatoria en curso.'
                              : 'Tu predicción está bloqueada y no puede ser modificada.'
                            : 'Tu predicción está pendiente de revisión.'}
                        </p>
                      </div>
                      <div className="greeting-actions">
                        {!publicParticipantPrediction.locked && !initialPredictionClosed && (
                          <button
                            className="primary-action"
                            onClick={() => {
                              const prediction = publicParticipantPrediction
                              if (!prediction) return

                              setPublicForm({
                                accessCode: publicForm.accessCode,
                                name: publicParticipant.name,
                                contact: publicParticipant.contact,
                                alias: publicParticipant.name,
                                champion: prediction.champion,
                                topScorer: prediction.topScorer,
                                mvp: prediction.mvp,
                                semifinalists: prediction.semifinalists,
                                groupWinners: prediction.groupWinners,
                                groupQualified: prediction.groupQualified,
                                bestThirds: prediction.bestThirds,
                                matches: Object.fromEntries(
                                  prediction.matches.map((match) => [match.matchId, match]),
                                ),
                              })
                              setPublicFormEditMode(true)
                            }}
                            type="button"
                          >
                            Editar predicción
                          </button>
                        )}
                        {publicParticipantPrediction.locked && (
                          <button
                            className="primary-action"
                            onClick={() => {
                              generatePredictionPdf({
                              participant: publicParticipant,
                              prediction: publicParticipantPrediction,
                              matches: getPrintableMatches(tournamentState.matches, publicParticipantPrediction),
                              tournamentState,
                            })
                            }}
                            type="button"
                          >
                            Descargar PDF
                          </button>
                        )}
                        {publicParticipantPrediction.locked && !currentKnockoutStage && (
                          <button
                            className="secondary-action"
                            disabled={publicParticipantPrediction.reopenRequested || reopenRequestSubmitting}
                            onClick={async () => {
                              setReopenRequestSubmitting(true)
                              const saved = await requestPredictionReopen(publicForm.accessCode)
                              setReopenRequestSubmitting(false)

                              if (!saved) {
                                window.alert('No se pudo solicitar la reapertura. Prueba de nuevo.')
                                return
                              }

                              setPredictions((current) =>
                                current.map((prediction) =>
                                  prediction.participantId === publicParticipant.id
                                    ? normalizePredictionSlip(saved.prediction)
                                    : prediction,
                                ),
                              )
                            }}
                            type="button"
                          >
                            {publicParticipantPrediction.reopenRequested || reopenRequestSubmitting
                              ? 'Reapertura solicitada'
                              : 'Solicitar reapertura'}
                          </button>
                        )}
                        <button
                          className="secondary-action"
                          onClick={() => {
                            forgetAccessCode()
                            setPublicForm({
                              accessCode: '',
                              name: '',
                              contact: '',
                              alias: '',
                              champion: '',
                              topScorer: '',
                              mvp: '',
                              semifinalists: [],
                              groupWinners: {},
                              groupQualified: {},
                              bestThirds: [],
                              matches: {},
                            })
                            setPublicFormStep('code-input')
                            setPublicFormEditMode(false)
                          }}
                          type="button"
                        >
                          ← Usar otro código
                        </button>
                      </div>
                    </div>

                    {currentKnockoutStage && (
                      <div className="meta-card">
                        <h3>{stageLabel(currentKnockoutStage)}</h3>
                        <div className="knockout-prediction-list">
                          {resolvedTournamentState.matches
                            .filter((match) => match.stage === currentKnockoutStage)
                            .map((match) => (
                              <KnockoutPredictionRow
                                key={match.id}
                                match={match}
                                disabled={publicKnockoutSaveDisabled}
                                onChange={(matchId, side, value) => {
                                  const parsedValue = value === '' ? Number.NaN : Number(value)
                                  setPublicKnockoutPredictions((current) => {
                                    const previous = current[matchId] ?? {
                                      matchId,
                                      homeScore: Number.NaN,
                                      awayScore: Number.NaN,
                                    }

                                    return {
                                      ...current,
                                      [matchId]: {
                                        ...previous,
                                        [side]: parsedValue,
                                      },
                                    }
                                  })
                                }}
                                onPenaltyWinnerChange={(matchId, penaltyWinner) => {
                                  setPublicKnockoutPredictions((current) => ({
                                    ...current,
                                    [matchId]: {
                                      ...(current[matchId] ?? {
                                        matchId,
                                        homeScore: Number.NaN,
                                        awayScore: Number.NaN,
                                      }),
                                      penaltyWinner,
                                    },
                                  }))
                                }}
                                prediction={publicKnockoutPredictions[match.id]}
                              />
                            ))}
                        </div>
                        <button className="primary-action" onClick={savePublicKnockoutPredictions} type="button" disabled={publicKnockoutSaveDisabled}>
                          {publicCurrentKnockoutComplete ? 'Ronda definitiva' : 'Guardar ronda'}
                        </button>
                        <button className="secondary-action" onClick={savePublicKnockoutFinal} type="button" disabled={publicKnockoutSaveDisabled}>
                          {publicCurrentKnockoutComplete ? 'Definitiva enviada' : 'Enviar definitiva y descargar PDF'}
                        </button>
                      </div>
                    )}

                    <div className="meta-card">
                      <h3>Detalle de tu predicción</h3>
                      <div className="meta-grid review-summary-grid">
                        <div>
                          <strong>Campeón</strong>
                          <p>{publicParticipantPrediction.champion || '—'}</p>
                        </div>
                        <div>
                          <strong>Máximo goleador</strong>
                          <p>{publicParticipantPrediction.topScorer || '—'}</p>
                        </div>
                        <div>
                          <strong>MVP</strong>
                          <p>{publicParticipantPrediction.mvp || '—'}</p>
                        </div>
                      </div>
                      <div className="review-badges">
                        <div>
                          <strong>Semifinalistas</strong>
                          <p>{publicParticipantPrediction.semifinalists.join(' · ') || '—'}</p>
                        </div>
                        <div>
                          <strong>Mejores terceros</strong>
                          <p>{publicParticipantPrediction.bestThirds.join(' · ') || '—'}</p>
                        </div>
                      </div>
                    </div>

                    <div className="meta-card">
                      <h3>Clasificados por grupo</h3>
                      <div className="group-picks-grid">
                        {groups.map((group) => (
                          <div className="group-pick" key={group}>
                            <h4>
                              Grupo <span translate="no">{group}</span>
                            </h4>
                            <p>
                              <strong>Primero:</strong>{' '}
                              {publicParticipantPrediction.groupWinners[group] ?? '—'}
                            </p>
                            <p>
                              <strong>Clasificados:</strong>{' '}
                              {(publicParticipantPrediction.groupQualified[group] ?? []).join(' · ') || '—'}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="meta-card">
                      <h3>Resultados de la fase de grupos</h3>
                      <p className="form-description">Repasa tus marcadores registrados</p>
                      <div className="prediction-board">
                        {groups.map((group) => (
                          <PredictionGroup
                            group={group}
                            key={group}
                            matches={tournamentState.matches.filter((match) => match.group === group)}
                            onChange={() => undefined}
                            pointsByMatch={scoringDetailsByParticipant[publicParticipantPrediction.participantId]?.matches}
                            predictions={Object.fromEntries(
                              publicParticipantPrediction.matches.map((match) => [match.matchId, match]),
                            )}
                            disabled
                          />
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </section>
        )}

        {activeTab === 'Pronosticos' && (
          <section>
            <header className="section-header">
              <div>
                <p className="eyebrow">Transparencia</p>
                <h2>Pronosticos visibles</h2>
              </div>
              <span className="fixture-count">
                {closedPredictionStages.length === 0
                  ? 'Sin fases cerradas'
                  : closedPredictionStages.join(' · ')}
              </span>
            </header>

            {closedPredictionStages.length === 0 ? (
              <div className="panel">
                <p>Los pronosticos de los participantes se mostraran cuando se cierre una fase.</p>
              </div>
            ) : (
              <div className="prediction-public-list">
                <div className="prediction-toolbar">
                  <label>
                    Vista
                    <select
                      onChange={(event) => setPublicPredictionView(event.target.value as 'participant' | 'match')}
                      value={publicPredictionView}
                    >
                      <option value="participant">Por participante</option>
                      <option value="match">Por partido</option>
                    </select>
                  </label>
                  <label>
                    Participante
                    <select
                      onChange={(event) => setSelectedPublicPredictionParticipantId(event.target.value)}
                      value={selectedPublicPredictionParticipantId}
                    >
                      <option value="">Elige participante</option>
                      {publicVisiblePredictionsByName.map((prediction) => {
                        const participant = participants.find((item) => item.id === prediction.participantId)
                        return (
                          <option key={prediction.participantId} value={prediction.participantId}>
                            {participant?.name ?? 'Participante'}
                          </option>
                        )
                      })}
                    </select>
                  </label>
                  <label>
                    Fase / grupo
                    <select
                      onChange={(event) => setSelectedPublicPredictionScope(event.target.value)}
                      value={selectedPublicPredictionScope}
                    >
                      <option value="all">Todo visible</option>
                      {closedPredictionStages.includes('Grupo') && groups.map((group) => (
                        <option key={group} value={`group-${group}`}>Grupo {group}</option>
                      ))}
                      {closedPredictionStages
                        .filter((stage) => stage !== 'Grupo')
                        .map((stage) => (
                          <option key={stage} value={stage}>{stageLabel(stage)}</option>
                        ))}
                    </select>
                  </label>
                  {publicPredictionView === 'match' && (
                    <label>
                      Partido
                      <select
                        onChange={(event) => setSelectedPublicMatchId(event.target.value)}
                        value={selectedPublicMatch?.id ?? ''}
                      >
                        {visiblePublicMatches.map((match) => (
                          <option key={match.id} value={match.id}>
                            {formatDate(match.date)} · {teamLabel(match.home)} - {teamLabel(match.away)}
                          </option>
                        ))}
                      </select>
                    </label>
                  )}
                </div>

                {publicPredictionView === 'participant' && !selectedPublicPredictionParticipantId && (
                  <div className="panel">
                    <p>Selecciona un participante para ver su pronostico.</p>
                  </div>
                )}

                {publicPredictionView === 'participant' && selectedPublicPredictionParticipantId && filteredPublicPredictions.length === 0 && (
                  <div className="panel">
                    <p>
                      No hay pronosticos visibles para este filtro. Comprueba que la fase este cerrada y que existan
                      porras definitivas.
                    </p>
                  </div>
                )}

                {publicPredictionView === 'match' && selectedPublicMatch && (
                  <PublicMatchPredictionsTable
                    match={selectedPublicMatch}
                    participants={participants}
                    predictions={publicVisiblePredictionsByName}
                    scoringDetailsByParticipant={scoringDetailsByParticipant}
                  />
                )}

                {publicPredictionView === 'match' && !selectedPublicMatch && (
                  <div className="panel">
                    <p>No hay partidos visibles para este filtro.</p>
                  </div>
                )}

                {publicPredictionView === 'participant' && filteredPublicPredictions.map((prediction) => {
                    const participant = participants.find((item) => item.id === prediction.participantId)
                    const visibleMatches = prediction.matches.filter((pick) => {
                      const match = resolvedTournamentState.matches.find((item) => item.id === pick.matchId)
                      return match ? closedPredictionStages.includes(match.stage) : false
                    })
                    const visiblePredictions = Object.fromEntries(
                      visibleMatches.map((pick) => [pick.matchId, pick]),
                    )

                    return (
                      <article className="panel" key={prediction.participantId}>
                        <div className="panel-title">
                          <h3>{participant?.name ?? 'Participante'}</h3>
                          <span>
                            {visibleMatches.length} marcadores visibles ·{' '}
                            {scoringDetailsByParticipant[prediction.participantId]?.bonuses.reduce(
                              (sum, bonus) => sum + bonus.points,
                              Object.values(scoringDetailsByParticipant[prediction.participantId]?.matches ?? {})
                                .reduce((sum, points) => sum + points, 0),
                            ) ?? 0}{' '}
                            pts
                          </span>
                        </div>
                        <ScoreSummary prediction={prediction} state={scoringTournamentState} />

                        {closedPredictionStages.includes('Grupo') && (
                          <>
                            {selectedPublicPredictionScope === 'all' && (
                              <section className="prediction-meta">
                              <div className="meta-card">
                                <h3>Bonus finales</h3>
                                <div className="meta-grid review-summary-grid">
                                  <div>
                                    <strong>Campeon</strong>
                                    <p>{prediction.champion || '-'}</p>
                                  </div>
                                  <div>
                                    <strong>Maximo goleador</strong>
                                    <p>{prediction.topScorer || '-'}</p>
                                  </div>
                                  <div>
                                    <strong>MVP</strong>
                                    <p>{prediction.mvp || '-'}</p>
                                  </div>
                                </div>
                                <div className="review-badges">
                                  <div>
                                    <strong>Semifinalistas</strong>
                                    <p>{prediction.semifinalists.join(' · ') || '-'}</p>
                                  </div>
                                  <div>
                                    <strong>Mejores terceros</strong>
                                    <p>{prediction.bestThirds.join(' · ') || '-'}</p>
                                  </div>
                                </div>
                                <ScoreBonusList bonuses={scoringDetailsByParticipant[prediction.participantId]?.bonuses ?? []} />
                              </div>
                              </section>
                            )}

                            <div className="group-picks-grid">
                              {visibleGroups.map((group) => (
                                <div className="group-pick" key={group}>
                                  <h4>Grupo <span translate="no">{group}</span></h4>
                                  <p><strong>Primero:</strong> {prediction.groupWinners[group] ?? '-'}</p>
                                  <p>
                                    <strong>Clasificados:</strong>{' '}
                                    {(prediction.groupQualified[group] ?? []).join(' · ') || '-'}
                                  </p>
                                </div>
                              ))}
                            </div>

                            <div className="prediction-board">
                              {visibleGroups.map((group) => (
                                <PredictionGroup
                                  disabled
                                  group={group}
                                  key={group}
                                  matches={tournamentState.matches.filter(
                                    (match) => match.stage === 'Grupo' && match.group === group,
                                  )}
                                  onChange={() => undefined}
                                  pointsByMatch={scoringDetailsByParticipant[prediction.participantId]?.matches}
                                  predictions={visiblePredictions}
                                />
                              ))}
                            </div>
                          </>
                        )}

                        {closedPredictionStages
                          .filter((stage) => visibleKnockoutStages.includes(stage))
                          .map((stage) => (
                            <div className="prediction-board" key={stage}>
                              <PredictionGroup
                                disabled
                                group={stage}
                                matches={resolvedTournamentState.matches.filter((match) => match.stage === stage)}
                                onChange={() => undefined}
                                pointsByMatch={scoringDetailsByParticipant[prediction.participantId]?.matches}
                                predictions={visiblePredictions}
                              />
                            </div>
                          ))}
                      </article>
                    )
                  })}
              </div>
            )}
          </section>
        )}

        {activeTab === 'Panel' && (
          <>
            <header className="section-header">
              <div>
                <p className="eyebrow">Estado general</p>
                <h2>Ranking y control del torneo</h2>
              </div>
              <div className="header-actions">
                <label>
                  Fase de pronosticos
                  <select
                    onChange={async (event) => {
                      const nextPhase = event.target.value
                      if (!isPredictionPhase(nextPhase)) return
                      const previousPhase = predictionPhase
                      const confirmed = window.confirm(
                        `Vas a cambiar la fase a "${nextPhase}". Esto puede hacer visibles pronosticos publicos. ¿Continuar?`,
                      )

                      if (!confirmed) {
                        event.target.value = previousPhase
                        return
                      }

                      const saved = await savePredictionPhase(nextPhase, adminPinInput)
                      if (saved) {
                        setPredictionPhase(nextPhase)
                        const refreshedPublicPredictions = await loadPublicPredictions()
                        setPublicPredictions(refreshedPublicPredictions)
                      } else {
                        event.target.value = previousPhase
                      }
                    }}
                    value={predictionPhase}
                  >
                    {predictionPhases.map((phase) => (
                      <option key={phase} value={phase}>{phase}</option>
                    ))}
                  </select>
                </label>
                <button
                  className="secondary-action"
                  onClick={async () => {
                    const nextState = applyResolvedRoundOf32(tournamentState, qualification)
                    setTournamentState(nextState)
                    const saved = await syncApi('/api/tournament', nextState, adminPinInput)
                    if (!saved) {
                      window.alert('No se pudieron guardar los cruces de dieciseisavos.')
                    }
                  }}
                  type="button"
                >
                  Aplicar cruces dieciseisavos
                </button>
                <button className="primary-action" type="button">Recalcular puntos</button>
              </div>
            </header>

            <section className="metric-grid" aria-label="Resumen">
              <Metric label="Jugadores validados" value={paidPlayers.length.toString()} />
              <Metric label="Pagos pendientes" value={pendingPlayers.length.toString()} />
              <Metric label="Partidos cerrados" value={completedMatches.length.toString()} />
              <Metric label="Porras bloqueadas" value={lockedPredictions.length.toString()} />
              <Metric label="Dieciseisavos cerradas" value={roundOf32PredictionStatus.closed.length.toString()} />
              <button
                className="metric metric-button"
                onClick={() => setShowRoundOf32Pending((current) => !current)}
                type="button"
              >
                <span>Dieciseisavos pendientes</span>
                <strong>{roundOf32PredictionStatus.pending.length}</strong>
              </button>
              <button
  className="metric metric-button"
  onClick={() => setActiveTab('Solicitudes')}
  type="button"
>
  <span>Solicitudes reapertura</span>
  <strong>{reopenRequests.length}</strong>
</button>
            </section>

            {showRoundOf32Pending && (
              <section className="panel pending-round-panel">
                <div className="panel-title">
                  <h3>Pendientes de dieciseisavos</h3>
                  <span>{roundOf32PredictionStatus.pending.length} participantes</span>
                </div>
                {roundOf32PredictionStatus.pending.length === 0 ? (
                  <p>Todos los participantes validados tienen cerrada la ronda.</p>
                ) : (
                  <div className="pending-chip-list">
                    {roundOf32PredictionStatus.pending.map((participant) => (
                      <button
                        className="pending-chip"
                        key={participant.id}
                        onClick={() => {
                          setSelectedKnockoutParticipantId(participant.id)
                          setActiveTab('Eliminatorias')
                        }}
                        type="button"
                      >
                        {participant.name}
                      </button>
                    ))}
                  </div>
                )}
              </section>
            )}

            <section className="content-grid">
              <div className="panel wide">
                <div className="panel-title">
                  <h3>Clasificacion</h3>
                  {liveScoreNotice ?? <span>desglose auditable</span>}
                </div>
                <div className="ranking-list">
                  {leaderboard.map((entry, index) => (
                    <article className="ranking-row" key={entry.participant.id}>
                      <strong>{index + 1}</strong>
                      <div>
                        <h4>{entry.participant.name}</h4>
                        <p>{entry.breakdown.map((item) => `${item.label}: ${item.points}`).join(' · ')}</p>
                      </div>
                      <b>{entry.total} pts</b>
                    </article>
                  ))}
                </div>
              </div>
              <div className="panel">
                <div className="panel-title">
                  <h3>Proximas tareas</h3>
                  <span>admin</span>
                </div>
                <ul className="task-list">
                  <li>Validar pagos pendientes.</li>
                  <li>Cerrar pronosticos de grupos antes del inicio.</li>
                  <li>Introducir marcadores oficiales tras cada partido.</li>
                  <li>Abrir dieciseisavos cuando FIFA publique cruces.</li>
                </ul>
              </div>
            </section>
          </>
        )}

{activeTab === 'Solicitudes' && (
  <section>
    <header className="section-header">
      <div>
        <p className="eyebrow">Administracion</p>
        <h2>Solicitudes de reapertura</h2>
      </div>
    </header>

    {reopenRequests.length === 0 ? (
      <div className="panel">
        <p>No hay solicitudes pendientes.</p>
      </div>
    ) : (
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Participante</th>
              <th>Estado</th>
              <th>Solicitud</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reopenRequests.map((prediction) => {
              const participant = participants.find(
                (p) => p.id === prediction.participantId,
              )

              return (
                <tr key={prediction.participantId}>
                  <td>{participant?.name ?? 'Participante'}</td>
                  <td>
                    {prediction.locked ? 'Definitiva' : 'Borrador'}
                  </td>
                  <td>Solicitada</td>
                  <td>
                    <div className="row-actions">
                      <button
                        className="small-action"
                        disabled={initialPredictionClosed && currentKnockoutStage === null}
                        onClick={async () => {
                          if (initialPredictionClosed && currentKnockoutStage === null) return
                          const nextPredictions = predictions.map((item) =>
                              item.participantId === prediction.participantId
                                ? {
                                    ...item,
                                    locked: false,
                                    reopenRequested: false,
                                  }
                                : item,
                          )
                          setPredictions(nextPredictions)
                          const saved = await updateAdminReopenRequest(prediction.participantId, true, adminPinInput)
                          if (!saved) {
                            window.alert('No se pudo guardar la reapertura. Revisa el PIN admin o la conexion.')
                          }
                        }}
                        type="button"
                      >
                        Reabrir edicion
                      </button>

                      <button
                        className="secondary-action"
                        onClick={async () => {
                          const nextPredictions = predictions.map((item) =>
                              item.participantId === prediction.participantId
                                ? {
                                    ...item,
                                    reopenRequested: false,
                                  }
                                : item,
                          )
                          setPredictions(nextPredictions)
                          const saved = await updateAdminReopenRequest(prediction.participantId, false, adminPinInput)
                          if (!saved) {
                            window.alert('No se pudo guardar el cambio. Revisa el PIN admin o la conexion.')
                          }
                        }}
                        type="button"
                      >
                        Ignorar
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )}
  </section>
)}

        {activeTab === 'Cuadro' && (
          <section>
            <header className="section-header">
              <div>
                <p className="eyebrow">Fase de grupos</p>
                <h2>Cuadro Mundial 2026</h2>
              </div>
              <span className="fixture-count">104 partidos</span>
            </header>
            <div className="worldcup-board">
              {groups.map((group) => (
                <GroupCard
                  group={group}
                  key={group}
                  matches={tournamentState.matches.filter((match) => match.group === group)}
                  qualifiedTeams={qualification.directQualified}
                  thirdQualifiedTeams={qualification.bestThirds.map((standing) => standing.team)}
                />
              ))}
            </div>
            <section className="qualification-summary">
              <header className="subsection-header">
                <p className="eyebrow">Clasificacion automatica</p>
                <h3>Equipos clasificados</h3>
              </header>
              <div className="qualification-grid">
                <QualificationList title="Primeros" items={qualification.groupWinners} />
                <QualificationList title="Segundos" items={qualification.groupRunnersUp} />
                <QualificationList
                  title="Mejores terceros"
                  items={qualification.bestThirds.map((standing) => ({
                    group: standing.group,
                    team: standing.team,
                    points: standing.points,
                    goalDifference: standing.goalDifference,
                  }))}
                />
              </div>
            </section>
            <section className="knockout-section">
              <header className="subsection-header">
                <p className="eyebrow">Eliminatorias</p>
                <h3>De dieciseisavos a la final</h3>
              </header>
              <div className="knockout-board">
                {knockoutStages.map((stage) => (
                  <div className="knockout-column" key={stage}>
                    <h4>{stageLabel(stage)}</h4>
                    {tournamentState.matches
                      .filter((match) => match.stage === stage)
                      .map((match) => (
                        <KnockoutCard
                          key={match.id}
                          match={match}
                          resolvedAway={resolveKnockoutSlot(match.away, qualification)}
                          resolvedHome={resolveKnockoutSlot(match.home, qualification)}
                        />
                      ))}
                  </div>
                ))}
              </div>
            </section>
          </section>
        )}

        {activeTab === 'Participantes' && (
          <section>
            <header className="section-header">
              <div>
                <p className="eyebrow">Registro</p>
                <h2>Participantes y pago manual</h2>
              </div>
              <button
                className="secondary-action"
                onClick={() => {
                  setParticipants((current) =>
                    current.filter((player) => !initialParticipants.some((initial) => initial.id === player.id)),
                  )
                  setEditingParticipantId(null)
                }}
                type="button"
              >
                Quitar ejemplos
              </button>
            </header>

            <form
              className="entry-form"
              onSubmit={(event) => {
                event.preventDefault()
                const name = participantForm.name.trim()
                const contact = participantForm.contact.trim()

                if (!name || !contact) {
                  return
                }

                setParticipants((current) => [
                  ...current,
                  {
                    id: crypto.randomUUID(),
                    name,
                    contact,
                    accessCode: createAccessCode(name),
                    status: participantForm.status,
                  },
                ])
                setParticipantForm({ name: '', contact: '', status: 'pendiente' })
              }}
            >
              <label>
                Nombre
                <input
                  onChange={(event) => setParticipantForm((form) => ({ ...form, name: event.target.value }))}
                  placeholder="Nombre del jugador"
                  required
                  value={participantForm.name}
                />
              </label>
              <label>
                Contacto
                <input
                  onChange={(event) => setParticipantForm((form) => ({ ...form, contact: event.target.value }))}
                  placeholder="Telefono o email"
                  required
                  value={participantForm.contact}
                />
              </label>
              <label>
                Estado
                <select
                  onChange={(event) =>
                    setParticipantForm((form) => ({
                      ...form,
                      status: event.target.value as ParticipantStatus,
                    }))
                  }
                  value={participantForm.status}
                >
                  <option value="pendiente">Pendiente</option>
                  <option value="validado">Validado</option>
                  <option value="retirado">Retirado</option>
                </select>
              </label>
              <button className="primary-action" type="submit">Dar de alta</button>
            </form>

            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Contacto</th>
                    <th>Codigo</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {participants.map((player) => (
                    <tr key={player.id}>
                      <td>
                        {editingParticipantId === player.id ? (
                          <input
                            aria-label={`Nombre de ${player.name}`}
                            onChange={(event) => {
                              const name = event.target.value
                              setParticipants((current) =>
                                current.map((item) => (item.id === player.id ? { ...item, name } : item)),
                              )
                            }}
                            value={player.name}
                          />
                        ) : (
                          player.name
                        )}
                      </td>
                      <td>
                        {editingParticipantId === player.id ? (
                          <input
                            aria-label={`Contacto de ${player.name}`}
                            onChange={(event) => {
                              const contact = event.target.value
                              setParticipants((current) =>
                                current.map((item) => (item.id === player.id ? { ...item, contact } : item)),
                              )
                            }}
                            value={player.contact}
                          />
                        ) : (
                          player.contact
                        )}
                      </td>
                      <td><code>{player.accessCode}</code></td>
                      <td>
                        <select
                          aria-label={`Estado de ${player.name}`}
                          className="inline-select"
                          onChange={(event) => {
                            const status = event.target.value as ParticipantStatus
                            setParticipants((current) =>
                              current.map((item) => (item.id === player.id ? { ...item, status } : item)),
                            )
                          }}
                          value={player.status}
                        >
                          <option value="pendiente">Pendiente</option>
                          <option value="validado">Validado</option>
                          <option value="retirado">Retirado</option>
                        </select>
                      </td>
                      <td>
                        <div className="row-actions">
                          <button
                            className="small-action"
                            onClick={async () => {
                              if (editingParticipantId === player.id) {
                                const saved = await saveParticipants()
                                if (!saved) return
                                setEditingParticipantId(null)
                                return
                              }

                              setEditingParticipantId(player.id)
                            }}
                            type="button"
                          >
                            {editingParticipantId === player.id ? 'Guardar' : 'Editar'}
                          </button>
                          <button
                            className="small-action"
                            onClick={() => setReviewParticipantId(player.id)}
                            type="button"
                          >
                            Revisar
                          </button>
                          <button
                            className="danger-action"
                            disabled={player.status === 'retirado'}
                            onClick={() => {
                              setParticipants((current) =>
                                current.map((item) =>
                                  item.id === player.id ? { ...item, status: 'retirado' } : item,
                                ),
                              )
                              setEditingParticipantId((current) => (current === player.id ? null : current))
                            }}
                            type="button"
                          >
                            Baja
                          </button>
                          <button
  className="delete-action"
  onClick={async () => {
    const hasPrediction = predictions.some(
      (prediction) => prediction.participantId === player.id,
    )

    if (hasPrediction) {
      window.alert(
        `No se puede eliminar a ${player.name} porque tiene una predicción asociada.`,
      )
      return
    }

    const confirmed = window.confirm(
      `¿Seguro que quieres eliminar a ${player.name}? Esta acción no se puede deshacer.`,
    )

    if (!confirmed) {
      return
    }

    setParticipants((current) =>
      current.filter((item) => item.id !== player.id),
    )
    setEditingParticipantId((current) =>
      current === player.id ? null : current,
    )
  }}
  type="button"
>
  Eliminar
</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {reviewParticipantId && (
              <PredictionReview
                onClose={() => setReviewParticipantId(null)}
                onToggleLocked={(locked) => {
                  setPredictions((current) =>
                    current.map((prediction) =>
                      prediction.participantId === reviewParticipantId
                        ? { ...prediction, locked, reopenRequested: false }
                        : prediction,
                    ),
                  )
                }}
                groupEditingClosed={initialPredictionClosed}
                reopenDisabled={initialPredictionClosed && currentKnockoutStage === null}
                participant={participants.find((participant) => participant.id === reviewParticipantId)}
                prediction={predictions.find((prediction) => prediction.participantId === reviewParticipantId)}
                tournamentState={tournamentState}
              />
            )}
          </section>
        )}

        {activeTab === 'Predicciones' && (
          <section>
            <header className="section-header">
              <div>
                <p className="eyebrow">Pre-torneo</p>
                <h2>Predicciones por participante</h2>
              </div>
              <div className="header-actions">
                <button
                  className="secondary-action"
                  onClick={() => {
                    setPredictions((current) => seedGroupPredictions(current, validatedParticipants))
                  }}
                  type="button"
                >
                  Cargar demo
                </button>
                <button
                  className="primary-action"
                  disabled={!selectedPredictionParticipantId || initialPredictionClosed}
                  onClick={() => {
                    const matches = Object.values(matchPredictions).filter(
                      (prediction) =>
                        Number.isFinite(prediction.homeScore) && Number.isFinite(prediction.awayScore),
                    )

                    setPredictions((current) => {
                      const existing = current.find(
                        (prediction) => prediction.participantId === selectedPredictionParticipantId,
                      )
                      const nextPrediction: PredictionSlip = {
                        participantId: selectedPredictionParticipantId,
                        locked: existing?.locked ?? true,
                        reopenRequested: existing?.reopenRequested ?? false,
                        submittedAt: existing?.submittedAt,
                        champion: predictionMeta.champion,
                        semifinalists: predictionMeta.semifinalists,
                        topScorer: predictionMeta.topScorer,
                        mvp: predictionMeta.mvp,
                        groupWinners: predictionMeta.groupWinners,
                        groupQualified: predictionMeta.groupQualified,
                        bestThirds: predictionMeta.bestThirds,
                        matches,
                      }

                      const exists = current.some(
                        (prediction) => prediction.participantId === selectedPredictionParticipantId,
                      )

                      return exists
                        ? current.map((prediction) =>
                            prediction.participantId === selectedPredictionParticipantId ? nextPrediction : prediction,
                          )
                        : [...current, nextPrediction]
                    })
                  }}
                  type="button"
                >
                  {selectedPredictionIsLocked ? 'Predicción bloqueada' : 'Guardar prediccion'}
                </button>
                <button
                  className="secondary-action"
                  disabled={
                    !selectedPredictionParticipantId ||
                    (Boolean(selectedPrediction?.locked) && initialPredictionClosed && currentKnockoutStage === null)
                  }
                  onClick={async () => {
                    const reopen = Boolean(selectedPrediction?.locked)
                    if (reopen && initialPredictionClosed && currentKnockoutStage === null) {
                      window.alert('La fase de grupos está cerrada. Para reabrir predicciones, cambia la fase a preGroups o espera a una fase eliminatoria abierta.')
                      return
                    }
                    const saved = await updateAdminReopenRequest(selectedPredictionParticipantId, reopen, adminPinInput)
                    if (!saved) {
                      window.alert(reopen ? 'No se pudo reabrir la prediccion.' : 'No se pudo marcar la prediccion como definitiva.')
                      return
                    }

                    setPredictions((current) =>
                      current.map((prediction) =>
                        prediction.participantId === selectedPredictionParticipantId
                          ? { ...prediction, locked: !prediction.locked, reopenRequested: false }
                          : prediction,
                      ),
                    )
                  }}
                  type="button"
                >
                  {selectedPrediction?.locked ? 'Reabrir edicion' : 'Marcar definitiva'}
                </button>
                <button
                  className="secondary-action"
                  disabled={!selectedPrediction || !selectedPredictionParticipantId}
                  onClick={() => {
                    const participant = participants.find((item) => item.id === selectedPredictionParticipantId)
                    if (!participant || !selectedPrediction) return

                    generatePredictionPdf({
                      participant,
                      prediction: selectedPrediction,
                      matches: getPrintableMatches(tournamentState.matches, selectedPrediction),
                      tournamentState,
                    })
                  }}
                  type="button"
                >
                  Descargar PDF
                </button>
<button
  className="secondary-action"
  disabled={!selectedPredictionParticipantId || !selectedPrediction?.locked}
  onClick={() => {
    setPredictions((current) =>
      current.map((prediction) =>
        prediction.participantId === selectedPredictionParticipantId
          ? { ...prediction, pdfReceived: !prediction.pdfReceived }
          : prediction,
      ),
    )
  }}
  type="button"
>
  {selectedPrediction?.pdfReceived ? 'PDF pendiente' : 'PDF recibido'}
</button>

</div>
            </header>

              
            <div className="prediction-toolbar">
              <label>
                Participante
                <select
                  onChange={(event) => setSelectedPredictionParticipantId(event.target.value)}
                  value={selectedPredictionParticipantId}
                >
                  <option value="">Seleccionar</option>
                  {sortParticipantsByName(validatedParticipants).map((participant) => (
                    <option key={participant.id} value={participant.id}>{participant.name}</option>
                  ))}
                </select>
              </label>
              <div className="prediction-summary">
                <strong>{Object.keys(matchPredictions).length}</strong>
                <span>marcadores rellenados</span>
              </div>
              <div className="prediction-summary">
                <strong>{selectedPrediction?.locked ? 'Definitiva' : selectedPrediction ? 'Borrador' : '-'}</strong>
                <span>estado de la porra</span>
              </div>

              {selectedPrediction?.submittedAt && (
  <div className="prediction-summary">
    <strong>
      {new Date(selectedPrediction.submittedAt).toLocaleDateString()}
    </strong>
    <span>fecha de envio</span>
  </div>
)}
              <div className="prediction-summary">
                <strong>
  {selectedPrediction?.reopenRequested
    ? 'Solicitada'
    : 'No solicitada'}
</strong>
<span>reapertura</span>
              </div>
<div className="prediction-summary">
  <strong>{selectedPrediction?.pdfReceived ? 'Recibido' : 'Pendiente'}</strong>
  <span>PDF</span>
</div>
            </div>

            <section className="prediction-meta">
              <div className="meta-card">
                <h3>Bonus finales</h3>
                <div className="meta-grid">
                 <TeamSelect
  disabled={selectedPredictionIsLocked}
  label="Campeon"
                   
                    onChange={(value) => setPredictionMeta((meta) => ({ ...meta, champion: value }))}
                    teams={allTeams}
                    value={predictionMeta.champion}
                  />
                  <label>
                    Maximo goleador
                    <input
                     disabled={selectedPredictionIsLocked} 
                     onChange={(event) =>
                        setPredictionMeta((meta) => ({ ...meta, topScorer: event.target.value }))
                      }
                      placeholder="Nombre del jugador"
                      value={predictionMeta.topScorer}
                    />
                  </label>
                  <label>
                    MVP
                    <input
                      disabled={selectedPredictionIsLocked}
                      onChange={(event) => setPredictionMeta((meta) => ({ ...meta, mvp: event.target.value }))}
                      placeholder="Nombre del jugador"
                      value={predictionMeta.mvp}
                    />
                  </label>
                </div>
                <MultiTeamPicker
  disabled={selectedPredictionIsLocked}
  label="Semifinalistas"
                  limit={4}
                  onChange={(teams) => setPredictionMeta((meta) => ({ ...meta, semifinalists: teams }))}
                  selected={predictionMeta.semifinalists}
                  teams={allTeams}
                />
                <MultiTeamPicker
  label="Mejores terceros"
  disabled={selectedPredictionIsLocked}
   limit={8}
  onChange={(teams) => {
  if (selectedPredictionIsLocked) {
    return
  }

  setPredictionMeta((meta) => ({
    ...meta,
    bestThirds: teams,
  }))
}}
  selected={predictionMeta.bestThirds}
  teams={allTeams}
/>
              </div>

              <div className="meta-card">
                <h3>Clasificados por grupo</h3>
                <div className="group-picks-grid">
                  {groups.map((group) => {
                    const groupTeams = teamsForGroup(tournamentState.matches, group)
                    return (
                      <div className="group-pick" key={group}>
                        <h4>
                          Grupo <span translate="no">{group}</span>
                        </h4>
                        <TeamSelect
  disabled={selectedPredictionIsLocked}
  label="Primero"
                          onChange={(value) => {
  if (selectedPredictionIsLocked) {
    return
  }

  setPredictionMeta((meta) => ({
    ...meta,
    groupWinners: {
      ...meta.groupWinners,
      [group]: value,
    },
  }))
}}
                          teams={groupTeams}
                          value={predictionMeta.groupWinners[group] ?? ''}
                        />
                        <MultiTeamPicker
  disabled={selectedPredictionIsLocked}
  label="Clasificados"
                          limit={2}
                          onChange={(teams) => {
  if (selectedPredictionIsLocked) {
    return
  }

  setPredictionMeta((meta) => ({
    ...meta,
    groupQualified: {
      ...meta.groupQualified,
      [group]: teams,
    },
  }))
}}
                          selected={predictionMeta.groupQualified[group] ?? []}
                          teams={groupTeams}
                        />
                      </div>
                    )
                  })}
                </div>
              </div>
            </section>

            <div className="prediction-board">
              {groups.map((group) => (
                <PredictionGroup
                  disabled={selectedPredictionIsLocked}

                  group={group}
                  key={group}
                  matches={tournamentState.matches.filter((match) => match.group === group)}
                  onChange={(matchId, side, value) => {
  if (selectedPredictionIsLocked) {
    return
  }

  const parsedValue = value === '' ? Number.NaN : Number(value)

setMatchPredictions((current) => {
                    const previous = current[matchId] ?? {
                        matchId,
                        homeScore: Number.NaN,
                        awayScore: Number.NaN,
                      }

                      return {
                        ...current,
                        [matchId]: {
                          ...previous,
                          [side]: parsedValue,
                        },
                      }
                    })
                  }}
                  predictions={matchPredictions}
                />
              ))}
            </div>
          </section>
        )}

        {activeTab === 'Eliminatorias' && (
          <section>
            <header className="section-header">
              <div>
                <p className="eyebrow">Ronda a ronda</p>
                <h2>Predicciones de eliminatorias</h2>
              </div>
              <div className="header-actions">
                <button
                  className="secondary-action"
                  onClick={async () => {
                    const adminPredictions = await loadAdminPredictions(adminPinInput)
                    if (adminPredictions) {
                      setPredictions(adminPredictions)
                    } else {
                      window.alert('No se pudieron cargar las predicciones.')
                    }
                  }}
                  type="button"
                >
                  Actualizar
                </button>
              <button
  className="primary-action"
  disabled={!selectedKnockoutParticipantId || !knockoutEditingEnabled}
                onClick={async () => {
                  const filledKnockoutPredictions = Object.values(knockoutPredictions).filter(
                    (prediction) =>
                      Number.isFinite(prediction.homeScore) && Number.isFinite(prediction.awayScore),
                  )

                    const participant = participants.find((item) => item.id === selectedKnockoutParticipantId)
                    if (!participant) return

                    const editableStage = currentKnockoutStage ?? activeKnockoutStage
                    const editableStagePredictions = filledKnockoutPredictions.filter((prediction) => {
                      const match = tournamentState.matches.find(
                        (item) => item.id === prediction.matchId,
                      )

                      return match?.stage === editableStage
                    })

                    const saved = await submitPublicKnockoutPredictions({
                      accessCode: participant.accessCode,
                      matches: editableStagePredictions,
                    })

                    if (!saved.ok || !saved.prediction) {
                      window.alert(saved.error)
                      return
                    }

                    setPredictions((current) => {
                      const existing = current.find(
                        (prediction) => prediction.participantId === selectedKnockoutParticipantId,
                      )
                      const savedPrediction = normalizePredictionSlip(saved.prediction)
                      const nextPrediction: PredictionSlip = {
                        participantId: selectedKnockoutParticipantId,
                        locked: savedPrediction.locked,
                        reopenRequested: savedPrediction.reopenRequested,
                        submittedAt: existing?.submittedAt,
                        verificationCode: savedPrediction.verificationCode,
                        champion: savedPrediction.champion,
                        semifinalists: savedPrediction.semifinalists,
                        topScorer: savedPrediction.topScorer,
                        mvp: savedPrediction.mvp,
                        groupWinners: savedPrediction.groupWinners,
                        groupQualified: savedPrediction.groupQualified,
                        bestThirds: savedPrediction.bestThirds,
                        matches: mergeStageMatchPredictions(
                          existing?.matches ?? [],
                          savedPrediction.matches,
                          tournamentState.matches,
                          editableStage,
                        ),
                      }

                    return existing
                      ? current.map((prediction) =>
                          prediction.participantId === selectedKnockoutParticipantId ? nextPrediction : prediction,
                        )
                      : [...current, nextPrediction]
                  })
                    window.alert('Ronda guardada.')
                }}
                type="button"
              >
                {knockoutEditingEnabled ? 'Guardar ronda' : 'Ronda cerrada'}
              </button>
              </div>
            </header>

            <div className="prediction-toolbar">
              <label>
                Participante
                <select
                  onChange={(event) => setSelectedKnockoutParticipantId(event.target.value)}
                  value={selectedKnockoutParticipantId}
                >
                  <option value="">Seleccionar</option>
                  {sortParticipantsByName(validatedParticipants).map((participant) => (
                    <option key={participant.id} value={participant.id}>{participant.name}</option>
                  ))}
                </select>
              </label>
              <label>
                Ronda
                <select
  disabled={currentKnockoutStage !== null}
  onChange={(event) =>
    setActiveKnockoutStage(event.target.value as (typeof knockoutStages)[number])
  }
  value={currentKnockoutStage ?? activeKnockoutStage}
>
                  {knockoutStages.map((stage) => (
                    <option key={stage} value={stage}>{stageLabel(stage)}</option>
                  ))}
                </select>
              </label>
              <div className="prediction-summary">
                <strong>
                  {
                    resolvedTournamentState.matches.filter((match) => match.stage === activeKnockoutStage).length
                  }
                </strong>
                <span>partidos de la ronda</span>
              </div>
            </div>

            <div className="knockout-prediction-list">
              {resolvedTournamentState.matches
                .filter(
  (match) =>
    match.stage ===
    (currentKnockoutStage ?? activeKnockoutStage),
)
                .map((match) => (
                  <KnockoutPredictionRow
                    key={match.id}
                    match={match}
                    onChange={(matchId, side, value) => {
                      const parsedValue = value === '' ? Number.NaN : Number(value)
                      setKnockoutPredictions((current) => {
                        const previous = current[matchId] ?? {
                          matchId,
                          homeScore: Number.NaN,
                          awayScore: Number.NaN,
                        }

                        return {
                          ...current,
                          [matchId]: {
                            ...previous,
                            [side]: parsedValue,
                          },
                        }
                      })
                    }}
                    onPenaltyWinnerChange={(matchId, penaltyWinner) => {
                      setKnockoutPredictions((current) => {
                        const previous = current[matchId] ?? {
                          matchId,
                          homeScore: Number.NaN,
                          awayScore: Number.NaN,
                        }

                        return {
                          ...current,
                          [matchId]: {
                            ...previous,
                            penaltyWinner,
                          },
                        }
                      })
                    }}
                    prediction={knockoutPredictions[match.id]}
                  />
                ))}
            </div>
          </section>
        )}

        {activeTab === 'Resultados' && (
          <section>
            <header className="section-header">
              <div>
                <p className="eyebrow">Panel admin</p>
                <h2>Resultados oficiales de grupos</h2>
              </div>
              <div className="header-actions">
                <button
                  className="secondary-action"
                  onClick={() => setTournamentState((current) => seedOfficialGroupResults(current))}
                  type="button"
                >
                  Cargar demo
                </button>
                <button
                  className="secondary-action"
                  onClick={resetOfficialResults}
                  type="button"
                >
                  Reiniciar resultados
                </button>
                <button
                  className="primary-action"
                  onClick={saveOfficialResults}
                  type="button"
                >
                  Guardar resultados
                </button>
              </div>
            </header>
            <div className="results-board">
              {groups.map((group) => (
                <article className="results-group" key={group}>
                  <h3>
                    Grupo <span translate="no">{group}</span>
                  </h3>
                  {tournamentState.matches
                    .filter((match) => match.stage === 'Grupo' && match.group === group)
                    .map((match) => (
                      <OfficialResultRow
                        key={match.id}
                        match={match}
                        onChange={(matchId, side, value) => {
                          const parsedValue = value === '' ? undefined : Number(value)
                          setTournamentState((current) => ({
                            ...current,
                            matches: current.matches.map((item) => {
                              if (item.id !== matchId) {
                                return item
                              }

                              const nextMatch = { ...item, [side]: parsedValue }
                              const hasResult =
                                nextMatch.homeScore !== undefined && nextMatch.awayScore !== undefined

                              return {
                                ...nextMatch,
                                status: hasResult
                                  ? nextMatch.status === 'programado'
                                    ? 'en_juego'
                                    : nextMatch.status
                                  : 'programado',
                              }
                            }),
                          }))
                        }}
                        onStatusChange={(matchId, status) => {
                          setTournamentState((current) => ({
                            ...current,
                            matches: current.matches.map((item) => (
                              item.id === matchId ? { ...item, status } : item
                            )),
                          }))
                        }}
                      />
                    ))}
                </article>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'Bonus' && (
          <section>
            <header className="section-header">
              <div>
                <p className="eyebrow">Panel admin</p>
                <h2>Bonus y normalizacion de nombres</h2>
              </div>
              <button
                className="primary-action"
                onClick={saveOfficialResults}
                type="button"
              >
                Guardar bonus
              </button>
            </header>

            <section className="content-grid">
              <div className="panel">
                <div className="panel-title">
                  <h3>Resultados actuales</h3>
                  <span>aplican a la clasificacion</span>
                </div>
                <div className="meta-grid">
                  <label>
                    Maximo goleador/es
                    <input
                      onChange={(event) => {
                        setTournamentState((current) => ({ ...current, topScorer: event.target.value }))
                      }}
                      placeholder="Kylian Mbappe, Harry Kane"
                      value={tournamentState.topScorer ?? ''}
                    />
                  </label>
                  <label>
                    MVP
                    <input
                      onChange={(event) => {
                        setTournamentState((current) => ({ ...current, mvp: event.target.value }))
                      }}
                      placeholder="Nombre oficial del MVP"
                      value={tournamentState.mvp ?? ''}
                    />
                  </label>
                </div>
              </div>

              <div className="panel">
                <div className="panel-title">
                  <h3>Normalizar respuestas</h3>
                  <span>{predictions.length} porras</span>
                </div>
                <NameVariantList
                  onApply={(from) => applyNameNormalization('topScorer', from)}
                  title="Maximo goleador"
                  variants={topScorerVariants}
                />
                <NameVariantList
                  onApply={(from) => applyNameNormalization('mvp', from)}
                  title="MVP"
                  variants={mvpVariants}
                />
              </div>
            </section>
          </section>
        )}

        {activeTab === 'Clasificacion' && (
          <section>
            <header className="section-header">
              <div>
                <p className="eyebrow">Ranking</p>
                <h2>Clasificacion de participantes</h2>
              </div>
              <div className="header-actions">
                {liveScoreNotice}
                <span className="fixture-count">{leaderboard.length} participantes</span>
              </div>
            </header>

            <div className="leaderboard-page">
              {leaderboard.map((entry, index) => {
                const expanded = expandedLeaderboardParticipantId === entry.participant.id

                return (
                  <article
                    className={expanded ? 'leaderboard-card leaderboard-card-expanded' : 'leaderboard-card'}
                    key={entry.participant.id}
                    onDoubleClick={() => {
                      setExpandedLeaderboardParticipantId(expanded ? null : entry.participant.id)
                    }}
                  >
                    <div className="leaderboard-rank">
                      <strong>{index + 1}</strong>
                    </div>
                    <div className="leaderboard-detail">
                      <h3>{entry.participant.name}</h3>
                      {expanded && (
                        <div className="score-breakdown">
                          {entry.breakdown.map((item) => (
                            <div className="score-pill" key={item.label}>
                              <span>{item.label}</span>
                              <strong>{item.points}</strong>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <strong className="leaderboard-total">{entry.total} pts</strong>
                  </article>
                )
              })}
            </div>
          </section>
        )}

        {activeTab === 'Reglas' && (
          <section>
            <header className="section-header">
              <div>
                <p className="eyebrow">Mundial 2026</p>
                <h2>Reglas de la porra</h2>
              </div>
            </header>
            <div className="rules-summary panel">
              <h3>Como funciona</h3>
              <p>
                Cada participante entra con su codigo personal, completa sus pronosticos del Mundial 2026 y puede
                guardarlos como borrador o enviarlos como definitivos. Los borradores se pueden editar; una porra
                definitiva queda bloqueada y solo se puede reabrir solicitandolo al administrador.
              </p>
              <p>
                La clasificacion se actualiza con los resultados reales introducidos en la aplicacion. Gana quien
                acumule mas puntos al finalizar el torneo.
              </p>
            </div>
            <div className="rules-grid">
              <Rule title="Fase de grupos" text="Signo 1-X-2: 1 punto. Resultado exacto: 3 puntos en total. Acertar los 6 signos de un grupo suma 10 puntos extra por grupo." />
              <Rule title="Eliminatorias" text="Se predice el marcador tras 120 minutos y, si hay empate, el ganador por penaltis. El signo 1-X-2 acertado suma 1 punto, el resultado exacto suma 3 puntos en total y acertar los penaltis suma 1 punto extra." />
              <Rule title="Bonus finales" text="Campeon: 40 puntos. Maximo goleador: 25 puntos. MVP: 25 puntos." />
              <Rule title="Premios" text="Habra premio para el 1er, 2o y 3er clasificado final. El importe de cada premio esta pendiente de confirmar." />
            </div>
            <div className="rules-table-grid">
              <article className="panel">
                <h3>Primeros de grupo</h3>
                <table className="rules-table">
                  <thead>
                    <tr>
                      <th>Primeros acertados</th>
                      <th>Puntos</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>12</td>
                      <td>30</td>
                    </tr>
                    <tr>
                      <td>11</td>
                      <td>26</td>
                    </tr>
                    <tr>
                      <td>10</td>
                      <td>23</td>
                    </tr>
                    <tr>
                      <td>9</td>
                      <td>21</td>
                    </tr>
                    <tr>
                      <td>8</td>
                      <td>18</td>
                    </tr>
                    <tr>
                      <td>7</td>
                      <td>15</td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td>13</td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>11</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>8</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>5</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>3</td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>1</td>
                    </tr>
                  </tbody>
                </table>
              </article>
              <article className="panel">
                <h3>Clasificados y terceros</h3>
                <table className="rules-table">
                  <thead>
                    <tr>
                      <th>Acierto</th>
                      <th>Puntos</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Equipo clasificado en su grupo</td>
                      <td>2 por equipo</td>
                    </tr>
                    <tr>
                      <td>Mejor tercero acertado</td>
                      <td>2 por equipo</td>
                    </tr>
                  </tbody>
                </table>
              </article>
              <article className="panel">
                <h3>Puntuacion base en eliminatorias</h3>
                <table className="rules-table">
                  <thead>
                    <tr>
                      <th>Acierto</th>
                      <th>Puntos</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Signo 1-X-2 acertado</td>
                      <td>1</td>
                    </tr>
                    <tr>
                      <td>Resultado exacto tras 120 minutos</td>
                      <td>3 en total</td>
                    </tr>
                    <tr>
                      <td>Ganador por penaltis acertado si se predijo empate</td>
                      <td>1 extra</td>
                    </tr>
                  </tbody>
                </table>
              </article>
              <article className="panel">
                <h3>Bonus por signos en eliminatorias</h3>
                <table className="rules-table">
                  <thead>
                    <tr>
                      <th>Aciertos</th>
                      <th>Puntos</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Dieciseisavos: 16 / 15 / 14 / 13 / 12 / 11 / 10 signos</td>
                      <td>24 / 22 / 20 / 18 / 16 / 14 / 12</td>
                    </tr>
                    <tr>
                      <td>Octavos: 8 / 7 / 6 / 5 signos</td>
                      <td>16 / 14 / 12 / 10</td>
                    </tr>
                    <tr>
                      <td>Cuartos: 4 / 3 signos</td>
                      <td>12 / 9</td>
                    </tr>
                    <tr>
                      <td>Semifinales: 2 signos</td>
                      <td>8</td>
                    </tr>
                    <tr>
                      <td>Final: signo acertado</td>
                      <td>5</td>
                    </tr>
                  </tbody>
                </table>
              </article>
              <article className="panel">
                <h3>Bonus por semifinalistas</h3>
                <table className="rules-table">
                  <thead>
                    <tr>
                      <th>Semifinalistas acertados</th>
                      <th>Puntos</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1 equipo</td>
                      <td>3</td>
                    </tr>
                    <tr>
                      <td>2 equipos</td>
                      <td>8</td>
                    </tr>
                    <tr>
                      <td>3 equipos</td>
                      <td>14</td>
                    </tr>
                    <tr>
                      <td>4 equipos</td>
                      <td>20</td>
                    </tr>
                  </tbody>
                </table>
              </article>
            </div>
          </section>
        )}
      </section>
    </main>
  )
}

function KnockoutCard({
  match,
  resolvedAway,
  resolvedHome,
}: {
  match: Match
  resolvedAway?: string
  resolvedHome?: string
}) {
  return (
    <article className="knockout-card">
      <div className="knockout-meta">
        <strong>{match.id.toUpperCase()}</strong>
        <span>{formatDate(match.date)} · {match.venue}</span>
      </div>
      <div className="knockout-team">
        <span>{teamLabel(resolvedHome ?? match.home)}</span>
        <b className={match.status === 'en_juego' ? 'live-score' : undefined}>{match.homeScore ?? '-'}</b>
      </div>
      {resolvedHome && <small className="resolved-slot">{match.home}</small>}
      <div className="knockout-team">
        <span>{teamLabel(resolvedAway ?? match.away)}</span>
        <b className={match.status === 'en_juego' ? 'live-score' : undefined}>{match.awayScore ?? '-'}</b>
      </div>
      {resolvedAway && <small className="resolved-slot">{match.away}</small>}
      {match.status === 'en_juego' && <small className="live-match-badge">En juego</small>}
    </article>
  )
}

function KnockoutPredictionRow({
  match,
  onChange,
  onPenaltyWinnerChange,
  prediction,
  disabled,
}: {
  match: Match
  onChange: (matchId: string, side: 'homeScore' | 'awayScore', value: string) => void
  onPenaltyWinnerChange: (matchId: string, penaltyWinner: string) => void
  prediction?: MatchPrediction
  disabled?: boolean
}) {
  const isDraw =
    prediction !== undefined &&
    Number.isFinite(prediction.homeScore) &&
    Number.isFinite(prediction.awayScore) &&
    prediction.homeScore === prediction.awayScore

  return (
    <article className="knockout-prediction-row">
      <div className="knockout-meta">
        <strong>{match.id.toUpperCase()}</strong>
        <span>{formatDate(match.date)} · {match.venue}</span>
      </div>
      <div className="knockout-score-editor">
        <span>{teamLabel(match.home)}</span>
        <input
          aria-label={`${match.home} goles tras 120 minutos`}
          disabled={disabled}
          min="0"
          onChange={(event) => onChange(match.id, 'homeScore', event.target.value)}
          type="number"
          value={Number.isNaN(prediction?.homeScore) || prediction?.homeScore === undefined ? '' : prediction.homeScore}
        />
        <span className="prediction-separator">-</span>
        <input
          aria-label={`${match.away} goles tras 120 minutos`}
          disabled={disabled}
          min="0"
          onChange={(event) => onChange(match.id, 'awayScore', event.target.value)}
          type="number"
          value={Number.isNaN(prediction?.awayScore) || prediction?.awayScore === undefined ? '' : prediction.awayScore}
        />
        <span>{teamLabel(match.away)}</span>
      </div>
      {isDraw && (
        <label className="penalty-picker">
          Ganador por penaltis
          <select
            disabled={disabled}
            onChange={(event) => onPenaltyWinnerChange(match.id, event.target.value)}
            value={prediction?.penaltyWinner ?? ''}
          >
            <option value="">Seleccionar</option>
            <option value={match.home}>{match.home}</option>
            <option value={match.away}>{match.away}</option>
          </select>
        </label>
      )}
    </article>
  )
}

function OfficialResultRow({
  match,
  onChange,
  onStatusChange,
}: {
  match: Match
  onChange: (matchId: string, side: 'homeScore' | 'awayScore', value: string) => void
  onStatusChange: (matchId: string, status: Match['status']) => void
}) {
  return (
    <div className="official-result-row">
      <time>{formatDate(match.date)}</time>
      <span>{teamLabel(match.home)}</span>
      <input
        aria-label={`Resultado oficial ${match.home}`}
        min="0"
        onChange={(event) => onChange(match.id, 'homeScore', event.target.value)}
        type="number"
        value={match.homeScore ?? ''}
      />
      <span className="prediction-separator">-</span>
      <input
        aria-label={`Resultado oficial ${match.away}`}
        min="0"
        onChange={(event) => onChange(match.id, 'awayScore', event.target.value)}
        type="number"
        value={match.awayScore ?? ''}
      />
      <span>{teamLabel(match.away)}</span>
      <select
        aria-label={`Estado ${match.home} contra ${match.away}`}
        onChange={(event) => onStatusChange(match.id, event.target.value as Match['status'])}
        value={match.status}
      >
        <option value="programado">Pendiente</option>
        <option value="en_juego">En juego</option>
        <option value="finalizado">Finalizado</option>
      </select>
    </div>
  )
}

function PredictionReview({
  groupEditingClosed,
  reopenDisabled,
  onClose,
  onToggleLocked,
  participant,
  prediction,
  tournamentState,
}: {
  groupEditingClosed: boolean
  reopenDisabled: boolean
  onClose: () => void
  onToggleLocked: (locked: boolean) => void
  participant?: Participant
  prediction?: PredictionSlip
  tournamentState: TournamentState
}) {
  const qualification = useMemo(
    () => buildQualification(tournamentState.matches),
    [tournamentState.matches],
  )

  const knockoutMatchPredictions = useMemo(() => {
    if (!prediction) return []
    return prediction.matches
      .map((matchPrediction) => {
        const match = tournamentState.matches.find((item) => item.id === matchPrediction.matchId)
        return match ? { match, matchPrediction } : null
      })
      .filter(
        (item): item is { match: Match; matchPrediction: typeof prediction.matches[number] } => Boolean(item),
      )
      .filter(({ match }) => match.stage !== 'Grupo' && match.stage !== 'Bonus')
  }, [prediction, tournamentState.matches])

  const completedMatches = prediction?.matches.filter(
    (match) => Number.isFinite(match.homeScore) && Number.isFinite(match.awayScore),
  ).length ?? 0

  if (!participant) {
    return null
  }

  return (
    <section className="review-panel">
      <header className="panel-title">
        <div>
          <h3>Revision de {participant.name}</h3>
          <span>{participant.contact}</span>
        </div>
        <div className="row-actions">
          {prediction && (
  <button
    className="small-action"
    onClick={() =>
      generatePredictionPdf({
          participant,
          prediction,
          matches: getPrintableMatches(tournamentState.matches, prediction),
          tournamentState,
        })
    }
    type="button"
  >
    Descargar PDF
  </button>
)}
          {prediction && (
  <button
    className="small-action"
    disabled={prediction.locked && (groupEditingClosed || reopenDisabled)}
    onClick={() => onToggleLocked(!prediction.locked)}
    type="button"
  >
    {prediction.locked
      ? 'Reabrir edicion'
      : 'Marcar definitiva'}
  </button>
)}


         <button className="small-action" onClick={onClose} type="button">Cerrar</button>
        </div>
      </header>
      {!prediction ? (
        <p className="muted-copy">Este participante aun no tiene prediccion guardada.</p>
      ) : (
        <>
          <div className="review-grid">
            <div className="score-pill">
              <span>Estado</span>
              <strong>{prediction.locked ? 'Definitiva' : 'Borrador'}</strong>
            </div>
            <div className="score-pill">
              <span>Reapertura</span>
              <strong>{prediction.reopenRequested ? 'Solicitada' : '-'}</strong>
            </div>
            <div className="score-pill">
              <span>Fecha envio</span>
              <strong>
                {prediction.submittedAt
                  ? new Date(prediction.submittedAt).toLocaleString()
                  : '-'}
              </strong>
            </div>
            <div className="score-pill">
              <span>Marcadores de grupo</span>
              <strong>{completedMatches}/72</strong>
            </div>
            <div className="score-pill">
              <span>Campeon</span>
              <strong>{prediction.champion || '-'}</strong>
            </div>
            <div className="score-pill">
              <span>Semifinalistas</span>
              <strong>{prediction.semifinalists.length}/4</strong>
            </div>
            <div className="score-pill">
              <span>Mejores terceros</span>
              <strong>{prediction.bestThirds.length}/8</strong>
            </div>
            <div className="score-pill">
              <span>Goleador</span>
              <strong>{prediction.topScorer || '-'}</strong>
            </div>
            <div className="score-pill">
              <span>MVP</span>
              <strong>{prediction.mvp || '-'}</strong>
            </div>
          </div>
          {knockoutMatchPredictions.length > 0 && (
            <section className="review-section knockout-review-section">
              <header className="subsection-header">
                <p className="eyebrow">Eliminatorias</p>
                <h3>Pronósticos eliminatorios</h3>
              </header>
              {knockoutStages.map((stage) => {
                const stageMatches = knockoutMatchPredictions.filter(
                  ({ match }) => match.stage === stage,
                )

                if (stageMatches.length === 0) {
                  return null
                }

                return (
                  <div className="knockout-review-stage" key={stage}>
                    <h4>{stageLabel(stage)}</h4>
                    {stageMatches.map(({ match, matchPrediction }) => (
                      <div className="knockout-review-row" key={match.id}>
                        <span>{teamLabel(resolveKnockoutSlot(match.home, qualification) ?? match.home)}</span>
                        <strong>
                          {matchPrediction.homeScore} - {matchPrediction.awayScore}
                        </strong>
                        <span>{teamLabel(resolveKnockoutSlot(match.away, qualification) ?? match.away)}</span>
                        {matchPrediction.penaltyWinner && (
                          <span className="penalty-label">
                            pen. {teamLabel(resolveKnockoutSlot(matchPrediction.penaltyWinner, qualification) ?? matchPrediction.penaltyWinner)}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )
              })}
            </section>
          )}
        </>
      )}
    </section>
  )
}

function NameVariantList({
  onApply,
  title,
  variants,
}: {
  onApply: (from: string) => void
  title: string
  variants: Array<{ value: string; count: number; normalized: string }>
}) {
  return (
    <div className="name-variant-list">
      <h4>{title}</h4>
      {variants.length === 0 ? (
        <p className="form-description">No hay respuestas registradas.</p>
      ) : (
        variants.map((variant) => (
          <div className="name-variant-row" key={`${title}-${variant.value}`}>
            <div>
              <strong>{variant.value}</strong>
              <span>{variant.count} respuesta{variant.count === 1 ? '' : 's'} · {variant.normalized}</span>
            </div>
            <button
              className="small-action"
              onClick={() => onApply(variant.value)}
              type="button"
            >
              Aplicar
            </button>
          </div>
        ))
      )}
    </div>
  )
}

function PublicMatchPredictionsTable({
  match,
  participants,
  predictions,
  scoringDetailsByParticipant,
}: {
  match: Match
  participants: Participant[]
  predictions: PredictionSlip[]
  scoringDetailsByParticipant: Record<string, ReturnType<typeof scorePredictionDetails>>
}) {
  const rows = predictions
    .map((prediction) => {
      const participant = participants.find((item) => item.id === prediction.participantId)
      const pick = prediction.matches.find((item) => item.matchId === match.id)

      return {
        participantName: participant?.name ?? 'Participante',
        pick,
        points: scoringDetailsByParticipant[prediction.participantId]?.matches[match.id],
      }
    })
    .filter((row) => row.pick)
    .sort((a, b) => a.participantName.localeCompare(b.participantName))

  return (
    <div className="table-wrap public-match-table">
      <div className="panel-title">
        <h3>{teamLabel(match.home)} - {teamLabel(match.away)}</h3>
        <span>{rows.length} pronosticos</span>
      </div>
      <table>
        <thead>
          <tr>
            <th>Participante</th>
            <th>Pronostico</th>
            <th>Puntos</th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={3}>No hay pronosticos visibles para este partido.</td>
            </tr>
          ) : rows.map((row) => (
            <tr key={`${match.id}-${row.participantName}`}>
              <td>{row.participantName}</td>
              <td>
                <strong>{row.pick?.homeScore}</strong>
                {' - '}
                <strong>{row.pick?.awayScore}</strong>
                {row.pick?.penaltyWinner && <span> · pen. {teamLabel(row.pick.penaltyWinner)}</span>}
              </td>
              <td>{row.points === undefined ? '-' : row.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function GroupCard({
  group,
  matches,
  qualifiedTeams,
  thirdQualifiedTeams,
}: {
  group: string
  matches: Match[]
  qualifiedTeams: string[]
  thirdQualifiedTeams: string[]
}) {
  const standings = buildGroupStandings(matches)

  return (
    <article className="group-card">
      <div
        aria-label={`Grupo ${group}`}
        className={`group-letter group-${group.toLowerCase()}`}
        translate="no"
      >
        {group}
      </div>
      <div className="group-body">
        <div className="fixture-panel">
          <div className="mini-header">
            <span>Fecha</span>
            <span>Partido</span>
          </div>
          {matches.map((match) => (
            <div className="fixture-row" key={match.id}>
              <time>{formatDate(match.date)}</time>
              <div className="fixture-teams">
                <span>{teamLabel(match.home)}</span>
                <b className={match.status === 'en_juego' ? 'live-score' : undefined}>
                  {match.homeScore === undefined ? '-' : match.homeScore}
                </b>
                <small>vs</small>
                <b className={match.status === 'en_juego' ? 'live-score' : undefined}>
                  {match.awayScore === undefined ? '-' : match.awayScore}
                </b>
                <span>{teamLabel(match.away)}</span>
              </div>
              {match.status === 'en_juego' && <small className="live-match-badge">En juego</small>}
            </div>
          ))}
        </div>
        <div className="standings-panel">
          <h3>
            Grupo <span translate="no">{group}</span>
          </h3>
          <table className="standings-table">
            <thead>
              <tr>
                <th>Pos</th>
                <th>Seleccion</th>
                <th>Pts</th>
                <th>J</th>
                <th>GF</th>
                <th>GC</th>
              </tr>
            </thead>
            <tbody>
              {standings.map((standing, index) => {
                const isDirect = qualifiedTeams.includes(standing.team)
                const isBestThird = thirdQualifiedTeams.includes(standing.team)

                return (
                <tr className={isDirect ? 'qualified-row' : isBestThird ? 'third-row' : undefined} key={standing.team}>
                  <td>{index + 1}</td>
                  <td>{teamLabel(standing.team)}</td>
                  <td>{standing.points}</td>
                  <td>{standing.played}</td>
                  <td>{standing.goalsFor}</td>
                  <td>{standing.goalsAgainst}</td>
                </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </article>
  )
}

function buildGroupStandings(matches: Match[]) {
  const standings = new Map<string, TeamStanding>()

  matches.forEach((match) => {
    ensureStanding(standings, match.home)
    ensureStanding(standings, match.away)

    if (!liveScoreStatuses.has(match.status) || match.homeScore === undefined || match.awayScore === undefined) {
      return
    }

    const home = standings.get(match.home)!
    const away = standings.get(match.away)!
    home.played += 1
    away.played += 1
    home.goalsFor += match.homeScore
    home.goalsAgainst += match.awayScore
    away.goalsFor += match.awayScore
    away.goalsAgainst += match.homeScore

    if (match.homeScore > match.awayScore) {
      home.won += 1
      away.lost += 1
      home.points += 3
    } else if (match.homeScore < match.awayScore) {
      away.won += 1
      home.lost += 1
      away.points += 3
    } else {
      home.drawn += 1
      away.drawn += 1
      home.points += 1
      away.points += 1
    }

    home.goalDifference = home.goalsFor - home.goalsAgainst
    away.goalDifference = away.goalsFor - away.goalsAgainst
  })

  return Array.from(standings.values()).sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points
    if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference
    if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor
    return a.team.localeCompare(b.team)
  })
}

function buildQualification(matches: Match[]) {
  const groupResults = groups.map((group) => {
    const standings = buildGroupStandings(
      matches.filter((match) => match.stage === 'Grupo' && match.group === group),
    ).map((standing) => ({ ...standing, group }))

    return { group, standings }
  })

  const groupWinners: QualifiedItem[] = []
  const groupRunnersUp: QualifiedItem[] = []
  const thirds: GroupTeamStanding[] = []

  groupResults.forEach(({ group, standings }) => {
    const hasPlayedMatches = standings.some((standing) => standing.played > 0)

    if (!hasPlayedMatches) {
      return
    }

    if (standings[0]) groupWinners.push({ group, team: standings[0].team })
    if (standings[1]) groupRunnersUp.push({ group, team: standings[1].team })
    if (standings[2]) thirds.push(standings[2])
  })

  const bestThirds = thirds
    .sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points
      if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference
      if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor
      return a.team.localeCompare(b.team)
    })
    .slice(0, 8)
  const thirdAssignments = assignThirdPlacedSlots(bestThirds)

  return {
    groupWinners,
    groupRunnersUp,
    bestThirds,
    thirdAssignments,
    directQualified: [...groupWinners, ...groupRunnersUp].map((item) => item.team),
  }
}

function resolveKnockoutSlot(slot: string, qualification: ReturnType<typeof buildQualification>) {
  const directMatch = slot.match(/^([12])([A-L])$/)

  if (directMatch) {
    const [, position, group] = directMatch
    const source = position === '1' ? qualification.groupWinners : qualification.groupRunnersUp
    return source.find((item) => item.group === group)?.team
  }

  const thirdMatch = slot.match(/^3([A-L/]+)$/)

  if (thirdMatch) {
    return qualification.thirdAssignments[slot]
  }

  return undefined
}

function assignThirdPlacedSlots(bestThirds: GroupTeamStanding[]) {
  const slots = [
    '3A/B/C/D/F',
    '3C/D/F/G/H',
    '3C/E/F/H/I',
    '3E/H/I/J/K',
    '3A/E/H/I/J',
    '3B/E/F/I/J',
    '3E/F/G/I/J',
    '3D/E/I/J/L',
  ]
  const slotPriorities: Record<string, string[]> = {
    '3A/B/C/D/F': ['D'],
    '3C/D/F/G/H': ['F'],
    '3C/E/F/H/I': ['E'],
    '3E/H/I/J/K': ['K'],
    '3A/E/H/I/J': ['I'],
    '3B/E/F/I/J': ['B'],
    '3E/F/G/I/J': ['J'],
    '3D/E/I/J/L': ['L'],
  }
  const assignments: Record<string, string> = {}
  const usedTeams = new Set<string>()

  slots.forEach((slot) => {
    const eligibleGroups = slot.replace('3', '').split('/')
    const priorityGroups = slotPriorities[slot] ?? []
    const selectedThird = bestThirds.find(
      (standing) => priorityGroups.includes(standing.group) && !usedTeams.has(standing.team),
    ) ?? bestThirds.find(
      (standing) => eligibleGroups.includes(standing.group) && !usedTeams.has(standing.team),
    )

    if (!selectedThird) {
      return
    }

    assignments[slot] = selectedThird.team
    usedTeams.add(selectedThird.team)
  })

  return assignments
}

function seedGroupPredictions(current: PredictionSlip[], players: Participant[]) {
  const groupMatches = initialTournamentState.matches.filter((match) => match.stage === 'Grupo')
  const seededPredictions = players.slice(0, 2).map((player, playerIndex) => {
    const matchPredictions = groupMatches.map((match, matchIndex) => ({
      matchId: match.id,
      ...demoResult(matchIndex, playerIndex + 1),
    }))
    const predictedMatches = groupMatches.map((match) => {
      const prediction = matchPredictions.find((item) => item.matchId === match.id)!
      return {
        ...match,
        homeScore: prediction.homeScore,
        awayScore: prediction.awayScore,
        status: 'finalizado' as const,
      }
    })
    const predictedQualification = buildQualification(predictedMatches)
    const offset = playerIndex * 5

    return {
      participantId: player.id,
      locked: true,
      reopenRequested: false,
      champion: allTeams[(offset + 1) % allTeams.length],
      semifinalists: [
        allTeams[(offset + 1) % allTeams.length],
        allTeams[(offset + 7) % allTeams.length],
        allTeams[(offset + 13) % allTeams.length],
        allTeams[(offset + 19) % allTeams.length],
      ],
      topScorer: playerIndex === 0 ? 'Kylian Mbappe' : 'Harry Kane',
      mvp: playerIndex === 0 ? 'Pedri' : 'Lionel Messi',
      groupWinners: Object.fromEntries(
        predictedQualification.groupWinners.map((item) => [item.group, item.team]),
      ),
      groupQualified: Object.fromEntries(
        groups.map((group) => [
          group,
          [
            ...predictedQualification.groupWinners.filter((item) => item.group === group).map((item) => item.team),
            ...predictedQualification.groupRunnersUp.filter((item) => item.group === group).map((item) => item.team),
          ],
        ]),
      ),
      bestThirds: predictedQualification.bestThirds.map((item) => item.team),
      matches: matchPredictions,
    } satisfies PredictionSlip
  })

  const seededIds = new Set(seededPredictions.map((prediction) => prediction.participantId))
  return [
    ...current.filter((prediction) => !seededIds.has(prediction.participantId)),
    ...seededPredictions,
  ]
}

function validatePublicForm(form: {
  accessCode: string
  name: string
  contact: string
  champion: string
  topScorer: string
  mvp: string
  semifinalists: string[]
  groupWinners: Record<string, string>
  groupQualified: Record<string, string[]>
  bestThirds: string[]
  matches: Record<string, MatchPrediction>
}, participant?: Participant) {
  const errors: string[] = []
  const groupMatches = initialTournamentState.matches.filter((match) => match.stage === 'Grupo')
  const completeMatches = groupMatches.filter((match) => {
    const prediction = form.matches[match.id]
    return (
      prediction &&
      Number.isFinite(prediction.homeScore) &&
      Number.isFinite(prediction.awayScore)
    )
  })

  if (!form.accessCode.trim()) errors.push('Codigo de acceso')
  if (form.accessCode.trim() && !participant) errors.push('Codigo de acceso valido')
  if (!form.champion) errors.push('Campeon')
  if (!form.topScorer.trim()) errors.push('Maximo goleador')
  if (!form.mvp.trim()) errors.push('MVP')
  if (form.semifinalists.length !== 4) errors.push('4 semifinalistas')
  if (form.bestThirds.length !== 8) errors.push('8 mejores terceros')
  if (completeMatches.length !== groupMatches.length) {
    errors.push(`Marcadores de grupos completos (${completeMatches.length}/${groupMatches.length})`)
  }

  groups.forEach((group) => {
    if (!form.groupWinners[group]) {
      errors.push(`Primero del grupo ${group}`)
    }

    if ((form.groupQualified[group] ?? []).length !== 2) {
      errors.push(`2 clasificados del grupo ${group}`)
    }
  })

  return errors
}

function demoResult(index: number, seed: number) {
  const patterns = [
    [2, 0],
    [1, 1],
    [0, 2],
    [3, 1],
    [1, 0],
    [2, 2],
    [0, 1],
    [4, 2],
    [2, 3],
    [3, 0],
    [1, 2],
    [0, 0],
  ]
  const [homeScore, awayScore] = patterns[(index * 5 + seed * 7) % patterns.length]
  return { homeScore, awayScore }
}

function createAccessCode(name: string) {
  const firstName = name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .trim()
    .split(/\s+/)[0] ?? 'Jugador'
  const normalizedName = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase()
  const suffix = Math.floor(1000 + Math.random() * 9000).toString()
  return `${normalizedName}${suffix}`
}

function normalizeAccessCode(accessCode: string) {
  return accessCode
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[\s-]/g, '')
    .toUpperCase()
}

function normalizeParticipantAccessCode(participant: Participant): Participant {
  if (participant.accessCode && !participant.accessCode.toUpperCase().startsWith('PORRA')) {
    return participant
  }

  return {
    ...participant,
    accessCode: createAccessCode(participant.name),
  }
}

function generatePredictionPdf({
  participant,
  prediction,
  matches,
  tournamentState,
}: {
  participant: Participant
  prediction: PredictionSlip
  matches: Match[]
  tournamentState: TournamentState
}) {
  const doc = new jsPDF()
  const autoTableDoc = doc as AutoTableDocument

  // Build qualification data to resolve knockout slots
  const qualification = buildQualification(tournamentState.matches)

doc.setFontSize(20)
doc.text('Porra Mundial 2026', 14, 20)

doc.setFontSize(11)
doc.text(
  `Codigo de verificacion: ${prediction.verificationCode || 'SIN CODIGO'}`,
  20,
  35,
)

doc.setFontSize(12)
doc.text(`Participante: ${participant.name}`, 20, 45)
doc.text(`Codigo: ${participant.accessCode}`, 20, 55)
doc.text(`Fecha: ${new Date().toLocaleString()}`, 20, 65)

doc.setFontSize(14)
doc.text('Predicciones finales', 14, 85)
  const groupRows = groups.map((group) => {
    const first = prediction.groupWinners[group] || '-'
    const second = (prediction.groupQualified[group] ?? []).find((team) => team !== first)

    return [group, first, second || '-']
  })
  const groupFirsts = groupRows.map(([group, first]) => `${group}: ${first}`).join(' | ')
  const groupSeconds = groupRows.map(([group, , second]) => `${group}: ${second}`).join(' | ')
  const summaryRows = [
    ['Campeon', prediction.champion || '-'],
    ['Maximo goleador', prediction.topScorer || '-'],
    ['MVP', prediction.mvp || '-'],
    ['Semifinalistas', prediction.semifinalists.join(', ') || '-'],
    ['Mejores terceros', prediction.bestThirds.join(', ') || '-'],
    ['Primeros de grupo', groupFirsts || '-'],
    ['Segundos de grupo', groupSeconds || '-'],
  ]

  autoTable(doc, {
    startY: 72,
    head: [['Concepto', 'Prediccion']],
    body: summaryRows,
  })

  autoTable(doc, {
    startY: (autoTableDoc.lastAutoTable?.finalY ?? 72) + 12,
    head: [['Grupo', 'Primero', 'Segundo']],
    body: groupRows,
    styles: {
      fontSize: 8,
    },
  })

  const tableRows = matches.map((match) => {
    const predictionMatch = prediction.matches.find(
      (item) => item.matchId === match.id,
    )

    // Resolve knockout team names from qualification data
    let homeTeam = match.home
    let awayTeam = match.away
    
    if (match.stage !== 'Grupo' && match.stage !== 'Bonus') {
      const resolvedHome = resolveKnockoutSlot(match.home, qualification)
      const resolvedAway = resolveKnockoutSlot(match.away, qualification)
      homeTeam = resolvedHome || match.home
      awayTeam = resolvedAway || match.away
    }

    let scoreDisplay = `${predictionMatch?.homeScore ?? '-'} - ${predictionMatch?.awayScore ?? '-'}`
    
    // Add penalty winner info if applicable
    if (
      predictionMatch &&
      Number.isFinite(predictionMatch.homeScore) &&
      Number.isFinite(predictionMatch.awayScore) &&
      predictionMatch.homeScore === predictionMatch.awayScore &&
      predictionMatch.penaltyWinner
    ) {
      const resolvedPenaltyWinner = resolveKnockoutSlot(predictionMatch.penaltyWinner, qualification)
      scoreDisplay += ` (${resolvedPenaltyWinner ?? predictionMatch.penaltyWinner})`
    }

    return [
      match.group || stageLabel(match.stage),
      homeTeam,
      scoreDisplay,
      awayTeam,
    ]
  })

  autoTable(doc, {
    startY: (autoTableDoc.lastAutoTable?.finalY ?? 72) + 12,
    head: [['Etapa', 'Local', 'Resultado', 'Visitante']],
    body: tableRows,
    styles: {
      fontSize: 8,
    },
  })

  const finalY = (autoTableDoc.lastAutoTable?.finalY ?? 72) + 15

  doc.setFontSize(11)
  doc.text(
    'Este documento es el comprobante oficial de la prediccion enviada.',
    14,
    finalY,
  )

  doc.text(
    'Por seguridad debes enviarlo al administrador.',
    14,
    finalY + 8,
  )

  const fileName = `Porra_${participant.name.replace(/\s+/g, '_')}.pdf`

  doc.save(fileName)
}

function getPrintableMatches(allMatches: Match[], prediction?: PredictionSlip) {
  const now = new Date()
  const predictedMatchIds = new Set(prediction?.matches.map((match) => match.matchId) ?? [])

  return allMatches.filter((m) =>
    m.stage === 'Grupo' || m.stage === 'Bonus' || predictedMatchIds.has(m.id) || (m.date && new Date(m.date) <= now),
  )
}

async function syncApi(path: string, body: unknown, adminPin?: string) {
  try {
    const response = await fetch(path, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(adminPin ? { 'x-admin-pin': adminPin } : {}),
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const text = await response.text()
      console.warn(`No se pudo sincronizar ${path}: HTTP ${response.status}`, text)
      return null
    }

    return response.json()
  } catch (error) {
    console.error(`No se pudo sincronizar ${path}`, error)
    return null
  }
}

async function saveTournamentState(state: TournamentState, adminPin?: string): Promise<{
  ok: true
  data: { matches?: Match[]; topScorer?: string; mvp?: string }
} | {
  ok: false
  error: string
}> {
  try {
    const response = await fetch('/api/tournament', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(adminPin ? { 'x-admin-pin': adminPin } : {}),
      },
      body: JSON.stringify(state),
    })
    const text = await response.text()

    if (!response.ok) {
      return {
        ok: false,
        error: `HTTP ${response.status}: ${text || response.statusText}`,
      }
    }

    return {
      ok: true,
      data: text ? JSON.parse(text) : {},
    }
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : 'Error de red desconocido',
    }
  }
}

async function saveParticipantsState(participants: Participant[], adminPin?: string): Promise<{
  ok: true
  data: { participants?: Participant[] }
} | {
  ok: false
  error: string
}> {
  try {
    const response = await fetch('/api/participants', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(adminPin ? { 'x-admin-pin': adminPin } : {}),
      },
      body: JSON.stringify(participants),
    })
    const text = await response.text()

    if (!response.ok) {
      return {
        ok: false,
        error: `HTTP ${response.status}: ${text || response.statusText}`,
      }
    }

    return {
      ok: true,
      data: text ? JSON.parse(text) : {},
    }
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : 'Error de red desconocido',
    }
  }
}

async function verifyAdminPin(pin: string) {
  try {
    const response = await fetch('/api/admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pin }),
    })

    return response.ok
  } catch (error) {
    console.error('No se pudo verificar el PIN admin', error)
    return false
  }
}

async function loadAdminPredictions(adminPin: string) {
  try {
    const response = await fetch('/api/predictions', {
      cache: 'no-store',
      headers: { 'x-admin-pin': adminPin },
    })

    if (!response.ok) {
      return null
    }

    const predictions = await response.json()
    return Array.isArray(predictions) ? predictions.map(normalizePredictionSlip) : null
  } catch (error) {
    console.error('No se pudieron cargar predicciones admin', error)
    return null
  }
}

async function loadAdminParticipants(adminPin: string) {
  try {
    const response = await fetch('/api/participants', {
      cache: 'no-store',
      headers: { 'x-admin-pin': adminPin },
    })

    if (!response.ok) return null
    const participants = await response.json()
    return Array.isArray(participants) ? participants.map(normalizeParticipantAccessCode) : null
  } catch (error) {
    console.error('No se pudieron cargar participantes admin', error)
    return null
  }
}

async function loadPublicPredictions() {
  try {
    const response = await fetch('/api/predictions/public', { cache: 'no-store' })
    if (!response.ok) return []
    const predictions = await response.json()
    return Array.isArray(predictions) ? predictions.map(normalizePredictionSlip) : []
  } catch (error) {
    console.error('No se pudieron cargar predicciones publicas', error)
    return []
  }
}

async function loadTournamentMatches() {
  try {
    const response = await fetch('/api/tournament', { cache: 'no-store' })
    if (!response.ok) return null

    const tournament = await response.json()
    return Array.isArray(tournament.matches) ? tournament.matches : null
  } catch (error) {
    console.error('No se pudo cargar torneo', error)
    return null
  }
}

async function lookupParticipant(accessCode: string) {
  try {
    const response = await fetch('/api/participants/lookup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ accessCode }),
    })

    if (!response.ok) return null
    return normalizeParticipantAccessCode(await response.json())
  } catch (error) {
    console.error('No se pudo buscar el participante', error)
    return null
  }
}

async function fetchMyPrediction(accessCode: string) {
  try {
    const response = await fetch('/api/predictions/me', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ accessCode }),
    })

    if (!response.ok) return null
    const result = await response.json() as { participant: Participant; prediction: Partial<PredictionSlip> | null }
    return {
      participant: result.participant,
      prediction: result.prediction ? normalizePredictionSlip(result.prediction) : null,
    }
  } catch (error) {
    console.error('No se pudo cargar la prediccion del participante', error)
    return null
  }
}

async function submitPublicPrediction(body: {
  accessCode: string
  displayName: string
  locked: boolean
  champion: string
  semifinalists: string[]
  topScorer: string
  mvp: string
  groupWinners: Record<string, string>
  groupQualified: Record<string, string[]>
  bestThirds: string[]
  matches: MatchPrediction[]
}): Promise<{ ok: true; prediction: PredictionSlip } | { ok: false; error: string }> {
  try {
    const response = await fetch('/api/predictions/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const text = await response.text()
      if (response.status === 409) {
        return { ok: false, error: 'Esta porra ya esta bloqueada. Si necesitas modificarla, solicita reapertura.' }
      }

      return { ok: false, error: `No se pudo guardar la porra. HTTP ${response.status}: ${text}` }
    }

    const result = await response.json()
    return { ok: true, prediction: result.prediction }
  } catch (error) {
    console.error('No se pudo guardar la prediccion publica', error)
    return { ok: false, error: 'No se pudo conectar con el servidor para guardar la porra.' }
  }
}

async function submitPublicKnockoutPredictions(
  payload: unknown,
): Promise<{ ok: true; prediction: PredictionSlip | null } | { ok: false; error: string }> {
  try {
    const response = await fetch('/api/predictions/knockout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const text = await response.text()
      return { ok: false, error: `No se pudo guardar la ronda. HTTP ${response.status}: ${text}` }
    }

    const result = await response.json()
    return { ok: true, prediction: result.prediction }
  } catch (error) {
    console.error('No se pudieron guardar las eliminatorias publicas', error)
    return { ok: false, error: 'No se pudo conectar con el servidor para guardar la ronda.' }
  }
}

async function normalizePredictionNames(
  field: 'topScorer' | 'mvp',
  from: string,
  to: string,
  adminPin: string,
): Promise<{ predictions: PredictionSlip[]; updated: number } | null> {
  try {
    const response = await fetch('/api/predictions/admin-normalize-names', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(adminPin ? { 'x-admin-pin': adminPin } : {}),
      },
      body: JSON.stringify({ field, from, to }),
    })

    if (!response.ok) {
      const text = await response.text()
      throw new Error(`HTTP ${response.status}: ${text}`)
    }

    const result = await response.json()
    return Array.isArray(result.predictions)
      ? { predictions: result.predictions, updated: Number(result.updated ?? 0) }
      : null
  } catch (error) {
    console.error('No se pudieron normalizar nombres', error)
    return null
  }
}

async function requestPredictionReopen(accessCode: string): Promise<{ prediction: PredictionSlip } | null> {
  try {
    const response = await fetch('/api/predictions/reopen', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ accessCode }),
    })

    if (!response.ok) {
      const text = await response.text()
      throw new Error(`HTTP ${response.status}: ${text}`)
    }

    return response.json()
  } catch (error) {
    console.error('No se pudo solicitar la reapertura', error)
    return null
  }
}

async function updateAdminReopenRequest(participantId: string, reopen: boolean, adminPin: string) {
  try {
    const response = await fetch('/api/predictions/admin-reopen', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(adminPin ? { 'x-admin-pin': adminPin } : {}),
      },
      body: JSON.stringify({ participantId, reopen }),
    })

    if (!response.ok) {
      const text = await response.text()
      throw new Error(`HTTP ${response.status}: ${text}`)
    }

    return response.json()
  } catch (error) {
    console.error('No se pudo actualizar la solicitud de reapertura', error)
    return null
  }
}

async function savePredictionPhase(predictionPhase: PredictionPhase, adminPin: string) {
  try {
    const response = await fetch('/api/settings/prediction-phase', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(adminPin ? { 'x-admin-pin': adminPin } : {}),
      },
      body: JSON.stringify({ predictionPhase }),
    })

    if (!response.ok) {
      const text = await response.text()
      throw new Error(`HTTP ${response.status}: ${text}`)
    }

    return true
  } catch (error) {
    console.error('No se pudo guardar la fase de pronosticos', error)
    window.alert('No se pudo guardar la fase. Revisa el PIN admin.')
    return false
  }
}

async function resetTournamentResults(adminPin: string): Promise<{ matches: Match[] } | null> {
  try {
    const response = await fetch('/api/tournament/reset-results', {
      method: 'POST',
      headers: {
        ...(adminPin ? { 'x-admin-pin': adminPin } : {}),
      },
    })

    if (!response.ok) {
      const text = await response.text()
      throw new Error(`HTTP ${response.status}: ${text}`)
    }

    const result = await response.json()
    return Array.isArray(result.matches) ? { matches: result.matches } : null
  } catch (error) {
    console.error('No se pudo reiniciar resultados', error)
    return null
  }
}

function seedOfficialGroupResults(state: TournamentState): TournamentState {
  return {
    ...state,
    matches: state.matches.map((match, index) => {
      if (match.stage !== 'Grupo') {
        return match
      }

      return {
        ...match,
        ...demoResult(index, 9),
        status: 'finalizado',
      }
    }),
  }
}

function QualificationList({
  title,
  items,
}: {
  title: string
  items: Array<QualifiedItem | (QualifiedItem & { points: number; goalDifference: number })>
}) {
  return (
    <article className="qualification-card">
      <h4>{title}</h4>
      <div className="qualification-items">
        {items.map((item) => (
          <div className="qualification-item" key={`${item.group}-${item.team}`}>
            <span>Grupo {item.group}</span>
            <strong>{teamLabel(item.team)}</strong>
            {'points' in item && (
              <small>{item.points} pts · DG {item.goalDifference}</small>
            )}
          </div>
        ))}
      </div>
    </article>
  )
}

function ensureStanding(standings: Map<string, TeamStanding>, team: string) {
  if (standings.has(team)) {
    return
  }

  standings.set(team, {
    team,
    played: 0,
    won: 0,
    drawn: 0,
    lost: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    goalDifference: 0,
    points: 0,
  })
}

function PredictionGroup({
  group,
  matches,
  onChange,
  pointsByMatch = {},
  predictions,
  disabled = false,
}: {
  group: string
  matches: Match[]
  onChange: (matchId: string, side: 'homeScore' | 'awayScore', value: string) => void
  pointsByMatch?: Record<string, number>
  predictions: Record<string, MatchPrediction>
  disabled?: boolean
}) {
  return (
    <article className="prediction-group">
      <h3>
        Grupo <span translate="no">{group}</span>
      </h3>
      <div className="prediction-fixtures">
        {matches.map((match) => {
          const prediction = predictions[match.id]
          const points = pointsByMatch[match.id] ?? 0

          return (
            <div className={`prediction-row ${scoreClassName(points)}`} key={match.id}>
              <time>{formatDate(match.date)}</time>
              <span>{teamLabel(match.home)}</span>
              <input
                aria-label={`${match.home} goles contra ${match.away}`}
                min="0"
                disabled={disabled}
                onChange={(event) => onChange(match.id, 'homeScore', event.target.value)}
                type="number"
                value={Number.isNaN(prediction?.homeScore) || prediction?.homeScore === undefined ? '' : prediction.homeScore}
              />
              <span className="prediction-separator">-</span>
              <input
                aria-label={`${match.away} goles contra ${match.home}`}
                min="0"
                disabled={disabled}
                onChange={(event) => onChange(match.id, 'awayScore', event.target.value)}
                type="number"
                value={Number.isNaN(prediction?.awayScore) || prediction?.awayScore === undefined ? '' : prediction.awayScore}
              />
              <span>{teamLabel(match.away)}</span>
              {points > 0 && <strong className="prediction-points">+{points}</strong>}
            </div>
          )
        })}
      </div>
    </article>
  )
}

function scoreClassName(points: number) {
  if (points >= 6) return 'prediction-row-score-high'
  if (points >= 3) return 'prediction-row-score-medium'
  if (points > 0) return 'prediction-row-score-low'
  return ''
}

function ScoreBonusList({ bonuses }: { bonuses: ScoreBreakdown[] }) {
  if (bonuses.length === 0) {
    return null
  }

  return (
    <div className="score-bonus-list">
      {bonuses.map((bonus) => (
        <span key={bonus.label}>{bonus.label} +{bonus.points}</span>
      ))}
    </div>
  )
}

function ScoreSummary({ prediction, state }: { prediction: PredictionSlip; state: TournamentState }) {
  const breakdown = scorePredictionDetails(prediction, state)
  const matchPoints = Object.values(breakdown.matches).reduce((sum, points) => sum + points, 0)
  const bonusPoints = breakdown.bonuses.reduce((sum, bonus) => sum + bonus.points, 0)

  return (
    <div className="score-summary">
      <span>Partidos: <strong>{matchPoints}</strong></span>
      <span>Bonus: <strong>{bonusPoints}</strong></span>
      <span>Total: <strong>{matchPoints + bonusPoints}</strong></span>
    </div>
  )
}

function TeamSelect({
  disabled = false,
  label,
  onChange,
  teams,
  value,
}: {
  disabled?: boolean
  label: string
  onChange: (value: string) => void
  teams: string[]
  value: string
}) {
  return (
    <label>
      {label}
      <select disabled={disabled} onChange={(event) => onChange(event.target.value)} value={value}>
        <option value="">Seleccionar</option>
        {teams.map((team) => (
          <option key={team} value={team}>{team}</option>
        ))}
      </select>
    </label>
  )
}

function MultiTeamPicker({
  disabled = false,
  label,
  limit,
  onChange,
  selected,
  teams,
}: {
  disabled?: boolean
  label: string
  limit: number
  onChange: (teams: string[]) => void
  selected: string[]
  teams: string[]
}) {
  return (
    <fieldset className="multi-picker">
      <legend>{label} <span>{selected.length}/{limit}</span></legend>
      <div className="multi-options">
        {teams.map((team) => {
          const checked = selected.includes(team)
          return (
            <label className="check-option" key={team}>
              
                <input
  checked={checked}
  disabled={disabled || (!checked && selected.length >= limit)}
                onChange={(event) => {
                  if (event.target.checked) {
                    onChange([...selected, team])
                    return
                  }

                  onChange(selected.filter((item) => item !== team))
                }}
                type="checkbox"
              />
              {teamLabel(team)}
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}

function teamsForGroup(matches: Match[], group: string): string[] {
  return Array.from(
    new Set(
      matches
        .filter((match) => match.group === group)
        .flatMap((match) => [match.home, match.away]),
    ),
  )
}

function teamLabel(team: string) {
  return (
    <span className="team-label">
      <span className="flag" aria-hidden="true">{flags[team] ?? '🏳️'}</span>
      {team}
    </span>
  )
}

function formatDate(date?: string) {
  if (!date) return '-'
  const [, month, day] = date.split('-')
  return `${day}/${month}`
}

function hasCompleteStagePredictions(prediction: PredictionSlip, matches: Match[], stage: Match['stage']) {
  const stageMatches = matches.filter((match) => match.stage === stage)
  if (stageMatches.length === 0) return false

  return stageMatches.every((match) => {
    const pick = prediction.matches.find((item) => item.matchId === match.id)
    return Boolean(
      pick &&
      Number.isFinite(pick.homeScore) &&
      Number.isFinite(pick.awayScore),
    )
  })
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <article className="metric">
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  )
}

function Rule({ title, text }: { title: string; text: string }) {
  return (
    <article className="panel">
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  )
}

export default App
