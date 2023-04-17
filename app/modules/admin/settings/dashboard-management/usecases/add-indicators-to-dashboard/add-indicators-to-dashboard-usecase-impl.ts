import { Either, EventDispatcher, left, right } from 'app/core/domain'
import {
  AddIndicatorsToDashboard,
  AddIndicatorsToDashboardUseCase,
  AddIndicatorsToDashboardUseCaseInput,
  DashboardErrors,
} from '../../domain'
import { FindDashboardRepository, PersistIndicatorsIntoDashboardWithTransactionRepository } from './ports'
import { TransactionAdapter } from 'app/core/ports'

export class AddIndicatorsToDashboardUseCaseImpl
implements AddIndicatorsToDashboardUseCase {
  constructor (
    private readonly findDashboardRepository: FindDashboardRepository,
    private readonly persistIndicatorsIntoDashboardWithTransactionRepository:
    PersistIndicatorsIntoDashboardWithTransactionRepository,
    private readonly transactionAdapter: TransactionAdapter,
    private readonly eventDispatcher: EventDispatcher
  ) {}

  public async perform (
    input: AddIndicatorsToDashboardUseCaseInput
  ): Promise<
    Either<
      | AddIndicatorsToDashboard.IndicatorNotFoundError
      | DashboardErrors.DashboardNotFound,
      boolean
    >
  > {
    const dashboard = await this.findDashboardRepository.find(input.dashboardId)

    if (!dashboard) {
      return left(new DashboardErrors.DashboardNotFound())
    }

    if (!input.indicators.length) {
      return left(new AddIndicatorsToDashboard.NeedToHaveAtLeastOneIndicatorError())
    }

    const output = await this.transactionAdapter.useTransaction<boolean>((trx) => {
      this.persistIndicatorsIntoDashboardWithTransactionRepository.persistWithTransaction(
        input.indicators.map((indicator) => ({
          indicatorId: indicator.id,
          dashboardId: input.dashboardId,
          meta: {
            size: indicator.size,
            order: indicator.order,
          },
        })), trx
      )
    })

    if (!output) {
      return left(new AddIndicatorsToDashboard.IndicatorNotFoundError())
    }

    return right(true)
  }
}
