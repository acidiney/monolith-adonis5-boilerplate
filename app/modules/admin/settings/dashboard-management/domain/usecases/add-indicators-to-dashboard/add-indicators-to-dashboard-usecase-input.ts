import { UniqueEntityID } from 'app/core/domain'

export type IndicatorSize = 'small' | 'medium' | 'large'

interface Indicator {
  id: UniqueEntityID,
  label?: string | null,
  description?: string | null,
  size: IndicatorSize,
  order: number

  // TODO: Add more properties
}

export interface AddIndicatorsToDashboardUseCaseInput {
  indicators: Indicator[],
  dashboardId: UniqueEntityID
}
