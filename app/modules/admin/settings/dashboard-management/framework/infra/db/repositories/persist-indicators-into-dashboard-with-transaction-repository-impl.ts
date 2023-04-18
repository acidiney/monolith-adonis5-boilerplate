import {
  IndicatorDasboard,
  PersistIndicatorsIntoDashboardWithTransactionRepository,
} from '../../../../usecases/add-indicators-to-dashboard'

export class PersistIndicatorsIntoDashboardWithTransactionRepositoryImpl
implements PersistIndicatorsIntoDashboardWithTransactionRepository {
  public async persistWithTransaction (
    _input: IndicatorDasboard[],
    _trx: any
  ): Promise<boolean> {
    throw new Error('Method not implemented.')
  }
}
