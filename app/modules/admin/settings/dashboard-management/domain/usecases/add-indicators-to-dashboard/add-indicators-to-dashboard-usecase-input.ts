import { UniqueEntityID } from 'app/core/domain'

export type IndicatorSize = 'small' | 'medium' | 'large'

export interface Indicator {
  id: UniqueEntityID,
  label?: string,
  description?: string,
  size: IndicatorSize,
  order: number

  // TODO: Add more properties
}

export interface AddIndicatorsToDashboardUseCaseInput {
  indicators: Indicator[],
  dashboardId: UniqueEntityID
}
