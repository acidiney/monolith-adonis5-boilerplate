import { UniqueEntityID } from 'app/core/domain'
import { IndicatorSize } from '../../../domain'

export interface IndicatorDasboard {
  indicatorId: UniqueEntityID,
  dashboardId: UniqueEntityID,
  options?: {

  },
  meta: {
    size: IndicatorSize,
    order: number
  }
}

export interface PersistIndicatorsIntoDashboardWithTransactionRepository {
  persistWithTransaction(input: IndicatorDasboard[], trx): Promise<boolean>
}
