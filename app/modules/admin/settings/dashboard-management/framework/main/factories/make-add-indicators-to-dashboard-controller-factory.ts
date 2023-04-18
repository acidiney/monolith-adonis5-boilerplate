import { AddIndicatorsToDashboardController } from '../controllers/add-indicators-to-dashboard-controller'

import {
  FindDashboardRepositoryImpl,
  PersistIndicatorsIntoDashboardWithTransactionRepositoryImpl,
} from '../../infra/db/repositories'
import { AddIndicatorsToDashboardUseCaseImpl } from '../../../usecases/add-indicators-to-dashboard'
import { TransactionAdapterImpl } from 'app/infra/db/adapters/transaction-adapter-impl'
import { EventDispatcher } from 'app/core/domain'

export const makeAddIndicatorsToDashboardControllerFactory =
  (): AddIndicatorsToDashboardController => {
    return new AddIndicatorsToDashboardController(
      new AddIndicatorsToDashboardUseCaseImpl(
        new FindDashboardRepositoryImpl(),
        new PersistIndicatorsIntoDashboardWithTransactionRepositoryImpl(),
        new TransactionAdapterImpl(),
        EventDispatcher.getInstance()
      )
    )
  }
