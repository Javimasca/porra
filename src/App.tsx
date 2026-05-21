import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { participants as initialParticipants, predictions as initialPredictions, tournamentState as initialTournamentState } from './data/mockData'
import { buildLeaderboard } from './domain/scoring'
import type { Match, MatchPrediction, Participant, ParticipantStatus, PredictionSlip, TournamentState } from './domain/types'

const publicTabs = ['Formulario', 'Cuadro', 'Clasificacion'] as const
const adminTabs = ['Panel', 'Cuadro', 'Participantes', 'Predicciones', 'Eliminatorias', 'Resultados', 'Clasificacion', 'Reglas'] as const
const tabs = [...publicTabs, ...adminTabs] as const
type Tab = (typeof tabs)[number]
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
const adminPin = '2026'
const groups = 'ABCDEFGHIJKL'.split('')
const knockoutStages = ['Ronda de 32', 'Octavos', 'Cuartos', 'Semifinal', 'Final'] as const
const allTeams = Array.from(
  new Set(initialTournamentState.matches
    .filter((match) => match.stage === 'Grupo')
    .flatMap((match) => [match.home, match.away])),
).sort((a, b) => a.localeCompare(b))
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
    return JSON.parse(savedPredictions) as PredictionSlip[]
  } catch {
    return initialPredictions
  }
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

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('Formulario')
  const [mode, setMode] = useState<'publico' | 'admin'>('publico')
  const [adminPinInput, setAdminPinInput] = useState('')
  const [adminError, setAdminError] = useState('')
  const [apiReady, setApiReady] = useState(false)
  const [participants, setParticipants] = useState<Participant[]>(loadParticipants)
  const [predictions, setPredictions] = useState<PredictionSlip[]>(loadPredictions)
  const [tournamentState, setTournamentState] = useState<TournamentState>(loadTournamentState)
  const [editingParticipantId, setEditingParticipantId] = useState<string | null>(null)
  const [reviewParticipantId, setReviewParticipantId] = useState<string | null>(null)
  const [selectedPredictionParticipantId, setSelectedPredictionParticipantId] = useState('')
  const [selectedKnockoutParticipantId, setSelectedKnockoutParticipantId] = useState('')
  const [activeKnockoutStage, setActiveKnockoutStage] = useState<(typeof knockoutStages)[number]>('Ronda de 32')
  const [matchPredictions, setMatchPredictions] = useState<Record<string, MatchPrediction>>({})
  const [knockoutPredictions, setKnockoutPredictions] = useState<Record<string, MatchPrediction>>({})
  const [publicFormStep, setPublicFormStep] = useState<'code-input' | 'form' | 'confirmation'>('code-input')
  const [publicFormConfirmation, setPublicFormConfirmation] = useState<{
    participantName: string
    timestamp: Date
  } | null>(null)
  const [publicForm, setPublicForm] = useState({
    accessCode: '',
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
    (participant) => participant.accessCode.toUpperCase() === publicForm.accessCode.trim().toUpperCase(),
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
        const [participantsResponse, predictionsResponse, tournamentResponse] = await Promise.all([
          fetch('/api/participants'),
          fetch('/api/predictions'),
          fetch('/api/tournament'),
        ])

        if (!participantsResponse.ok || !predictionsResponse.ok || !tournamentResponse.ok) {
          throw new Error('API unavailable')
        }

        const [apiParticipants, apiPredictions, apiTournament] = await Promise.all([
          participantsResponse.json(),
          predictionsResponse.json(),
          tournamentResponse.json(),
        ])

        if (Array.isArray(apiParticipants) && apiParticipants.length > 0) {
          setParticipants(apiParticipants.map(normalizeParticipantAccessCode))
        }

        if (Array.isArray(apiPredictions) && apiPredictions.length > 0) {
          setPredictions(apiPredictions)
        }

        if (Array.isArray(apiTournament.matches) && apiTournament.matches.length > 0) {
          setTournamentState({
            ...initialTournamentState,
            matches: apiTournament.matches.map((match: Match) => ({
              ...match,
              date: match.date ? String(match.date).slice(0, 10) : undefined,
            })),
          })
        }
      } catch {
        // LocalStorage remains the development fallback when DATABASE_URL is not configured.
      } finally {
        setApiReady(true)
      }
    }

    loadFromApi()
  }, [])

  useEffect(() => {
    localStorage.setItem(participantsStorageKey, JSON.stringify(participants))
    if (apiReady) {
      syncApi('/api/participants', participants)
    }
  }, [apiReady, participants])

  useEffect(() => {
    localStorage.setItem(predictionsStorageKey, JSON.stringify(predictions))
    if (apiReady) {
      syncApi('/api/predictions', predictions)
    }
  }, [apiReady, predictions])

  useEffect(() => {
    localStorage.setItem(tournamentStorageKey, JSON.stringify(tournamentState))
    if (apiReady) {
      syncApi('/api/tournament', tournamentState)
    }
  }, [apiReady, tournamentState])

  useEffect(() => {
    if (!selectedPredictionParticipantId) {
      setMatchPredictions({})
      return
    }

    const savedPrediction = predictions.find(
      (prediction) => prediction.participantId === selectedPredictionParticipantId,
    )

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
  }, [predictions, selectedPredictionParticipantId])

  useEffect(() => {
    if (!selectedKnockoutParticipantId) {
      setKnockoutPredictions({})
      return
    }

    const savedPrediction = predictions.find(
      (prediction) => prediction.participantId === selectedKnockoutParticipantId,
    )

    setKnockoutPredictions(
      Object.fromEntries((savedPrediction?.matches ?? []).map((prediction) => [prediction.matchId, prediction])),
    )
  }, [predictions, selectedKnockoutParticipantId])

  const paidPlayers = participants.filter((player) => player.status === 'validado')
  const pendingPlayers = participants.filter((player) => player.status === 'pendiente')
  const completedMatches = tournamentState.matches.filter((match) => match.status === 'finalizado')
  const lockedPredictions = predictions.filter((prediction) => prediction.locked)
  const validatedParticipants = participants.filter((participant) => participant.status === 'validado')
  const qualification = useMemo(() => buildQualification(tournamentState.matches), [tournamentState.matches])
  const scoringTournamentState = useMemo(
    () => ({
      ...tournamentState,
      groupWinners: Object.fromEntries(
        qualification.groupWinners.map((item) => [item.group, item.team]),
      ),
      groupQualified: Object.fromEntries(
        groups.map((group) => [
          group,
          [
            ...qualification.groupWinners.filter((item) => item.group === group).map((item) => item.team),
            ...qualification.groupRunnersUp.filter((item) => item.group === group).map((item) => item.team),
            ...qualification.bestThirds.filter((item) => item.group === group).map((item) => item.team),
          ],
        ]),
      ),
      bestThirds: qualification.bestThirds.map((item) => item.team),
    }),
    [qualification, tournamentState],
  )
  const leaderboard = useMemo(
    () => buildLeaderboard(participants, predictions, scoringTournamentState),
    [participants, predictions, scoringTournamentState],
  )
  const visibleTabs = mode === 'publico' ? publicTabs : adminTabs

  return (
    <main className="app-shell">
      <aside className="sidebar" aria-label="Navegacion principal">
        <div>
          <p className="eyebrow">Porra Mundial 2026</p>
          <h1>Admin de la porra</h1>
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
            onClick={() => {
              if (adminPinInput !== adminPin) {
                setAdminError('PIN incorrecto')
                return
              }

              setAdminError('')
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

      <section className="workspace">
        {activeTab === 'Formulario' && (
          <section>
            <header className="section-header">
              <div>
                <p className="eyebrow">Envía tu porra</p>
                <h2>Predicción del Mundial 2026</h2>
              </div>
            </header>

            {publicFormStep === 'code-input' && (
              <div className="form-intake">
                <div className="meta-card public-form-welcome">
                  <h3>¿Ya tienes código de acceso?</h3>
                  <p className="form-description">Introdúcelo para ver o enviar tu predicción</p>
                  <label>
                    Tu código de acceso
                    <input
                      autoFocus
                      onChange={(event) => setPublicForm((form) => ({ ...form, accessCode: event.target.value }))}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' && publicParticipant) {
                          setPublicFormStep('form')
                        }
                      }}
                      placeholder="Ej: Javier2086"
                      value={publicForm.accessCode}
                    />
                  </label>
                  {publicParticipant ? (
                    <button
                      className="primary-action"
                      onClick={() => {
                        setPublicFormStep('form')
                      }}
                      style={{ marginTop: '16px' }}
                      type="button"
                    >
                      Continuar
                    </button>
                  ) : publicForm.accessCode.trim() ? (
                    <div className="validation-panel" style={{ marginTop: '16px' }}>
                      <strong>Código no encontrado</strong>
                      <p>Verifica que el código sea correcto e intenta de nuevo</p>
                    </div>
                  ) : null}
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

                {!publicParticipantPrediction ? (
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
                          ← Usar otro código
                        </button>
                      </div>
                    </div>

                    {publicFormErrors.length > 0 && (
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
                    </div>

                    <div className="meta-card">
                      <h3>Predicción pre-torneo</h3>
                      <div className="meta-grid">
                        <TeamSelect
                          label="Campeón"
                          onChange={(value) => setPublicForm((form) => ({ ...form, champion: value }))}
                          teams={allTeams}
                          value={publicForm.champion}
                        />
                        <label>
                          Máximo goleador
                          <input
                            onChange={(event) =>
                              setPublicForm((form) => ({ ...form, topScorer: event.target.value }))
                            }
                            placeholder="Nombre del jugador"
                            value={publicForm.topScorer}
                          />
                        </label>
                        <label>
                          MVP del torneo
                          <input
                            onChange={(event) =>
                              setPublicForm((form) => ({ ...form, mvp: event.target.value }))
                            }
                            placeholder="Nombre del jugador"
                            value={publicForm.mvp}
                          />
                        </label>
                      </div>
                      <MultiTeamPicker
                        label="Semifinalistas (4 equipos)"
                        limit={4}
                        onChange={(teams) => setPublicForm((form) => ({ ...form, semifinalists: teams }))}
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
                              <h4>Grupo {group}</h4>
                              <TeamSelect
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
                                label="Clasificados"
                                limit={3}
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
                      <button
                        className="primary-action"
                        disabled={publicFormErrors.length > 0}
                        onClick={() => {
                          const participantId = publicParticipant.id
                          const displayName = publicForm.alias.trim() || publicParticipant.name
                          const matches = Object.values(publicForm.matches).filter(
                            (prediction) =>
                              Number.isFinite(prediction.homeScore) && Number.isFinite(prediction.awayScore),
                          )

                          setParticipants((current) =>
                            current.map((participant) =>
                              participant.id === participantId
                                ? { ...participant, name: displayName }
                                : participant,
                            ),
                          )
                          setPredictions((current) => {
                            const nextPrediction = {
                              participantId,
                              locked: true,
                              champion: publicForm.champion,
                              semifinalists: publicForm.semifinalists,
                              topScorer: publicForm.topScorer,
                              mvp: publicForm.mvp,
                              groupWinners: publicForm.groupWinners,
                              groupQualified: publicForm.groupQualified,
                              bestThirds: publicForm.bestThirds,
                              matches,
                            }

                            return current.some((prediction) => prediction.participantId === participantId)
                              ? current.map((prediction) =>
                                  prediction.participantId === participantId ? nextPrediction : prediction,
                                )
                              : [...current, nextPrediction]
                          })

                          setPublicFormConfirmation({
                            participantName: displayName,
                            timestamp: new Date(),
                          })

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
                        Enviar mi predicción
                      </button>
                      <button
                        className="secondary-action"
                        onClick={() => {
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
                  <div className="meta-card public-form-greeting">
                    <div className="greeting-content">
                      <p className="eyebrow">Predicción enviada</p>
                      <h3>Tu porra ya está registrada, {publicParticipant.name}</h3>
                      <p className="form-description">
                        {publicParticipantPrediction.locked
                          ? 'Tu predicción está bloqueada y no puede ser modificada.'
                          : 'Tu predicción está pendiente de revisión.'}
                      </p>
                    </div>
                    <div className="greeting-actions">
                      <button
                        className="secondary-action"
                        onClick={() => {
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
                        ← Enviar otra predicción
                      </button>
                    </div>
                  </div>
                )}
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
              <button className="primary-action" type="button">Recalcular puntos</button>
            </header>

            <section className="metric-grid" aria-label="Resumen">
              <Metric label="Jugadores validados" value={paidPlayers.length.toString()} />
              <Metric label="Pagos pendientes" value={pendingPlayers.length.toString()} />
              <Metric label="Partidos cerrados" value={completedMatches.length.toString()} />
              <Metric label="Porras bloqueadas" value={lockedPredictions.length.toString()} />
            </section>

            <section className="content-grid">
              <div className="panel wide">
                <div className="panel-title">
                  <h3>Clasificacion</h3>
                  <span>desglose auditable</span>
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
                  <li>Abrir ronda de 32 cuando FIFA publique cruces.</li>
                </ul>
              </div>
            </section>
          </>
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
                    <h4>{stage === 'Ronda de 32' ? 'Dieciseisavos' : stage}</h4>
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
                            onClick={() => {
                              setEditingParticipantId((current) => (current === player.id ? null : player.id))
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
                            onClick={() => {
                              setParticipants((current) => current.filter((item) => item.id !== player.id))
                              setEditingParticipantId((current) => (current === player.id ? null : current))
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
                participant={participants.find((participant) => participant.id === reviewParticipantId)}
                prediction={predictions.find((prediction) => prediction.participantId === reviewParticipantId)}
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
                  disabled={!selectedPredictionParticipantId}
                  onClick={() => {
                    const matches = Object.values(matchPredictions).filter(
                      (prediction) =>
                        Number.isFinite(prediction.homeScore) && Number.isFinite(prediction.awayScore),
                    )

                    setPredictions((current) => {
                      const nextPrediction: PredictionSlip = {
                        participantId: selectedPredictionParticipantId,
                        locked: true,
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
                  Guardar prediccion
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
                  {validatedParticipants.map((participant) => (
                    <option key={participant.id} value={participant.id}>{participant.name}</option>
                  ))}
                </select>
              </label>
              <div className="prediction-summary">
                <strong>{Object.keys(matchPredictions).length}</strong>
                <span>marcadores rellenados</span>
              </div>
            </div>

            <section className="prediction-meta">
              <div className="meta-card">
                <h3>Bonus finales</h3>
                <div className="meta-grid">
                  <TeamSelect
                    label="Campeon"
                    onChange={(value) => setPredictionMeta((meta) => ({ ...meta, champion: value }))}
                    teams={allTeams}
                    value={predictionMeta.champion}
                  />
                  <label>
                    Maximo goleador
                    <input
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
                      onChange={(event) => setPredictionMeta((meta) => ({ ...meta, mvp: event.target.value }))}
                      placeholder="Nombre del jugador"
                      value={predictionMeta.mvp}
                    />
                  </label>
                </div>
                <MultiTeamPicker
                  label="Semifinalistas"
                  limit={4}
                  onChange={(teams) => setPredictionMeta((meta) => ({ ...meta, semifinalists: teams }))}
                  selected={predictionMeta.semifinalists}
                  teams={allTeams}
                />
                <MultiTeamPicker
                  label="Mejores terceros"
                  limit={8}
                  onChange={(teams) => setPredictionMeta((meta) => ({ ...meta, bestThirds: teams }))}
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
                        <h4>Grupo {group}</h4>
                        <TeamSelect
                          label="Primero"
                          onChange={(value) =>
                            setPredictionMeta((meta) => ({
                              ...meta,
                              groupWinners: { ...meta.groupWinners, [group]: value },
                            }))
                          }
                          teams={groupTeams}
                          value={predictionMeta.groupWinners[group] ?? ''}
                        />
                        <MultiTeamPicker
                          label="Clasificados"
                          limit={3}
                          onChange={(teams) =>
                            setPredictionMeta((meta) => ({
                              ...meta,
                              groupQualified: { ...meta.groupQualified, [group]: teams },
                            }))
                          }
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
                  group={group}
                  key={group}
                  matches={tournamentState.matches.filter((match) => match.group === group)}
                  onChange={(matchId, side, value) => {
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
              <button
                className="primary-action"
                disabled={!selectedKnockoutParticipantId}
                onClick={() => {
                  const filledKnockoutPredictions = Object.values(knockoutPredictions).filter(
                    (prediction) =>
                      Number.isFinite(prediction.homeScore) && Number.isFinite(prediction.awayScore),
                  )

                  setPredictions((current) => {
                    const existing = current.find(
                      (prediction) => prediction.participantId === selectedKnockoutParticipantId,
                    )
                    const groupPredictions = existing?.matches.filter((prediction) => {
                      const match = tournamentState.matches.find((item) => item.id === prediction.matchId)
                      return match?.stage === 'Grupo'
                    }) ?? []
                    const nextPrediction: PredictionSlip = {
                      participantId: selectedKnockoutParticipantId,
                      locked: existing?.locked ?? true,
                      champion: existing?.champion ?? '',
                      semifinalists: existing?.semifinalists ?? [],
                      topScorer: existing?.topScorer ?? '',
                      mvp: existing?.mvp ?? '',
                      groupWinners: existing?.groupWinners ?? {},
                      groupQualified: existing?.groupQualified ?? {},
                      bestThirds: existing?.bestThirds ?? [],
                      matches: [...groupPredictions, ...filledKnockoutPredictions],
                    }

                    return existing
                      ? current.map((prediction) =>
                          prediction.participantId === selectedKnockoutParticipantId ? nextPrediction : prediction,
                        )
                      : [...current, nextPrediction]
                  })
                }}
                type="button"
              >
                Guardar ronda
              </button>
            </header>

            <div className="prediction-toolbar">
              <label>
                Participante
                <select
                  onChange={(event) => setSelectedKnockoutParticipantId(event.target.value)}
                  value={selectedKnockoutParticipantId}
                >
                  <option value="">Seleccionar</option>
                  {validatedParticipants.map((participant) => (
                    <option key={participant.id} value={participant.id}>{participant.name}</option>
                  ))}
                </select>
              </label>
              <label>
                Ronda
                <select
                  onChange={(event) =>
                    setActiveKnockoutStage(event.target.value as (typeof knockoutStages)[number])
                  }
                  value={activeKnockoutStage}
                >
                  {knockoutStages.map((stage) => (
                    <option key={stage} value={stage}>{stage === 'Ronda de 32' ? 'Dieciseisavos' : stage}</option>
                  ))}
                </select>
              </label>
              <div className="prediction-summary">
                <strong>
                  {
                    tournamentState.matches.filter((match) => match.stage === activeKnockoutStage).length
                  }
                </strong>
                <span>partidos de la ronda</span>
              </div>
            </div>

            <div className="knockout-prediction-list">
              {tournamentState.matches
                .filter((match) => match.stage === activeKnockoutStage)
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
                  onClick={() => setTournamentState(initialTournamentState)}
                  type="button"
                >
                  Reiniciar resultados
                </button>
              </div>
            </header>
            <div className="results-board">
              {groups.map((group) => (
                <article className="results-group" key={group}>
                  <h3>Grupo {group}</h3>
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
                                status: hasResult ? 'finalizado' : 'programado',
                              }
                            }),
                          }))
                        }}
                      />
                    ))}
                </article>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'Clasificacion' && (
          <section>
            <header className="section-header">
              <div>
                <p className="eyebrow">Ranking</p>
                <h2>Clasificacion de participantes</h2>
              </div>
              <span className="fixture-count">{leaderboard.length} participantes</span>
            </header>

            <div className="leaderboard-page">
              {leaderboard.map((entry, index) => (
                <article className="leaderboard-card" key={entry.participant.id}>
                  <div className="leaderboard-rank">
                    <strong>{index + 1}</strong>
                    <span>{entry.total} pts</span>
                  </div>
                  <div className="leaderboard-detail">
                    <h3>{entry.participant.name}</h3>
                    <p>{entry.participant.contact}</p>
                    <div className="score-breakdown">
                      {entry.breakdown.map((item) => (
                        <div className="score-pill" key={item.label}>
                          <span>{item.label}</span>
                          <strong>{item.points}</strong>
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'Reglas' && (
          <section>
            <header className="section-header">
              <div>
                <p className="eyebrow">Mundial 2026</p>
                <h2>Reglas adaptadas</h2>
              </div>
            </header>
            <div className="rules-grid">
              <Rule title="Fase de grupos" text="Signo 1-X-2: 1 punto. Resultado exacto: 3 puntos. Pleno de signos del grupo: 10 puntos." />
              <Rule title="Clasificados" text="Primeros de grupo con tabla progresiva. Segundos por grupo. Mejores terceros por equipo clasificado, sin exigir el grupo exacto." />
              <Rule title="Eliminatorias" text="Ronda de 32 incluida. Se predice marcador tras 120 minutos y ganador por penaltis si hay empate." />
              <Rule title="Bonus finales" text="Campeon: 40. Semifinalistas: 3, 8, 14 o 20. Maximo goleador: 25. MVP: 25." />
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
        <b>{match.homeScore ?? '-'}</b>
      </div>
      {resolvedHome && <small className="resolved-slot">{match.home}</small>}
      <div className="knockout-team">
        <span>{teamLabel(resolvedAway ?? match.away)}</span>
        <b>{match.awayScore ?? '-'}</b>
      </div>
      {resolvedAway && <small className="resolved-slot">{match.away}</small>}
    </article>
  )
}

function KnockoutPredictionRow({
  match,
  onChange,
  onPenaltyWinnerChange,
  prediction,
}: {
  match: Match
  onChange: (matchId: string, side: 'homeScore' | 'awayScore', value: string) => void
  onPenaltyWinnerChange: (matchId: string, penaltyWinner: string) => void
  prediction?: MatchPrediction
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
          min="0"
          onChange={(event) => onChange(match.id, 'homeScore', event.target.value)}
          type="number"
          value={Number.isNaN(prediction?.homeScore) || prediction?.homeScore === undefined ? '' : prediction.homeScore}
        />
        <span className="prediction-separator">-</span>
        <input
          aria-label={`${match.away} goles tras 120 minutos`}
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
}: {
  match: Match
  onChange: (matchId: string, side: 'homeScore' | 'awayScore', value: string) => void
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
      <small>{match.status === 'finalizado' ? 'Finalizado' : 'Pendiente'}</small>
    </div>
  )
}

function PredictionReview({
  onClose,
  participant,
  prediction,
}: {
  onClose: () => void
  participant?: Participant
  prediction?: PredictionSlip
}) {
  if (!participant) {
    return null
  }

  const completedMatches = prediction?.matches.filter(
    (match) => Number.isFinite(match.homeScore) && Number.isFinite(match.awayScore),
  ).length ?? 0

  return (
    <section className="review-panel">
      <header className="panel-title">
        <div>
          <h3>Revision de {participant.name}</h3>
          <span>{participant.contact}</span>
        </div>
        <button className="small-action" onClick={onClose} type="button">Cerrar</button>
      </header>
      {!prediction ? (
        <p className="muted-copy">Este participante aun no tiene prediccion guardada.</p>
      ) : (
        <div className="review-grid">
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
      )}
    </section>
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
      <div className={`group-letter group-${group.toLowerCase()}`}>{group}</div>
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
                <b>{match.homeScore === undefined ? '-' : match.homeScore}</b>
                <small>vs</small>
                <b>{match.awayScore === undefined ? '-' : match.awayScore}</b>
                <span>{teamLabel(match.away)}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="standings-panel">
          <h3>Grupo {group}</h3>
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

    if (match.status !== 'finalizado' || match.homeScore === undefined || match.awayScore === undefined) {
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
  const assignments: Record<string, string> = {}
  const usedTeams = new Set<string>()

  slots.forEach((slot) => {
    const eligibleGroups = slot.replace('3', '').split('/')
    const third = bestThirds.find(
      (standing) => eligibleGroups.includes(standing.group) && !usedTeams.has(standing.team),
    )

    if (!third) {
      return
    }

    assignments[slot] = third.team
    usedTeams.add(third.team)
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
            ...predictedQualification.bestThirds.filter((item) => item.group === group).map((item) => item.team),
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

    if ((form.groupQualified[group] ?? []).length !== 3) {
      errors.push(`3 clasificados del grupo ${group}`)
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

function normalizeParticipantAccessCode(participant: Participant): Participant {
  if (participant.accessCode && !participant.accessCode.toUpperCase().startsWith('PORRA')) {
    return participant
  }

  return {
    ...participant,
    accessCode: createAccessCode(participant.name),
  }
}

function syncApi(path: string, body: unknown) {
  fetch(path, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).catch(() => {
    // Keep the localStorage copy as fallback while working without a database.
  })
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
  predictions,
}: {
  group: string
  matches: Match[]
  onChange: (matchId: string, side: 'homeScore' | 'awayScore', value: string) => void
  predictions: Record<string, MatchPrediction>
}) {
  return (
    <article className="prediction-group">
      <h3>Grupo {group}</h3>
      <div className="prediction-fixtures">
        {matches.map((match) => {
          const prediction = predictions[match.id]

          return (
            <div className="prediction-row" key={match.id}>
              <time>{formatDate(match.date)}</time>
              <span>{teamLabel(match.home)}</span>
              <input
                aria-label={`${match.home} goles contra ${match.away}`}
                min="0"
                onChange={(event) => onChange(match.id, 'homeScore', event.target.value)}
                type="number"
                value={Number.isNaN(prediction?.homeScore) || prediction?.homeScore === undefined ? '' : prediction.homeScore}
              />
              <span className="prediction-separator">-</span>
              <input
                aria-label={`${match.away} goles contra ${match.home}`}
                min="0"
                onChange={(event) => onChange(match.id, 'awayScore', event.target.value)}
                type="number"
                value={Number.isNaN(prediction?.awayScore) || prediction?.awayScore === undefined ? '' : prediction.awayScore}
              />
              <span>{teamLabel(match.away)}</span>
            </div>
          )
        })}
      </div>
    </article>
  )
}

function TeamSelect({
  label,
  onChange,
  teams,
  value,
}: {
  label: string
  onChange: (value: string) => void
  teams: string[]
  value: string
}) {
  return (
    <label>
      {label}
      <select onChange={(event) => onChange(event.target.value)} value={value}>
        <option value="">Seleccionar</option>
        {teams.map((team) => (
          <option key={team} value={team}>{team}</option>
        ))}
      </select>
    </label>
  )
}

function MultiTeamPicker({
  label,
  limit,
  onChange,
  selected,
  teams,
}: {
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
                disabled={!checked && selected.length >= limit}
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
