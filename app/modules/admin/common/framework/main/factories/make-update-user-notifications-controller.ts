import {
  UpdateUserNotificationsController,
} from 'app/modules/admin/common/framework/main/controllers/update-user-notifications-controller'
import {UpdateUserNotificationsUseCaseImpl} from 'app/modules/admin/common/usecases'
import {
  SyncUserNotificationWithTransactionRepositoryImpl,
} from 'app/modules/admin/common/framework/infra'
import {EventDispatcher} from 'app/core/domain'
import {TransactionAdapterImpl} from 'app/infra/db/adapters/transaction-adapter-impl'

export const makeUpdateUserNotificationsController = (): UpdateUserNotificationsController => {
  return new UpdateUserNotificationsController(
    new UpdateUserNotificationsUseCaseImpl(
      new TransactionAdapterImpl(),
      new SyncUserNotificationWithTransactionRepositoryImpl(),
      EventDispatcher.getInstance()
    )
  )
}
