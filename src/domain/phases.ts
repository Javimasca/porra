import type { Stage } from './types'

export type PredictionPhase =
  | 'preGroups'
  | 'groupsClosed'
  | 'Ronda de 32'
  | 'Octavos'
  | 'Cuartos'
  | 'Semifinal'
  | 'Final'
  | 'closed'

const stageOrder: Stage[] = ['Grupo', 'Ronda de 32', 'Octavos', 'Cuartos', 'Semifinal', 'Final']
export const predictionPhases: PredictionPhase[] = [
  'preGroups',
  'groupsClosed',
  'Ronda de 32',
  'Octavos',
  'Cuartos',
  'Semifinal',
  'Final',
  'closed',
]

export function isPredictionPhase(value: unknown): value is PredictionPhase {
  return typeof value === 'string' && predictionPhases.includes(value as PredictionPhase)
}

export function getClosedPredictionStages(phase: PredictionPhase): Stage[] {
  if (phase === 'preGroups') return []
  if (phase === 'groupsClosed') return ['Grupo']
  if (phase === 'closed') return stageOrder

  const activeIndex = stageOrder.indexOf(phase)
  return activeIndex > 0 ? stageOrder.slice(0, activeIndex) : ['Grupo']
}
