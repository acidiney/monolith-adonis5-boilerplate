import { SyncUserNotificationWithTransactionRepository } from './ports'
import {
  InvalidNotificationTypeError, NotificationsUpdatedEvent,
  UpdateUserNotificationsUseCase,
  UpdateUserNotificationsUseCaseInput,
} from 'app/modules/admin/common/domain'
import {Either, IEventDispatcher, left, right, UniqueEntityID} from 'app/core/domain'
import {NotificationEnum} from 'app/modules/@shared/domain/types'
import {TransactionAdapter} from 'app/core/ports'

export class UpdateUserNotificationsUseCaseImpl implements UpdateUserNotificationsUseCase {
  constructor (
    private readonly transactionAdapter: TransactionAdapter,
    private readonly syncUserNotificationWithTransactionRepository: SyncUserNotificationWithTransactionRepository<any>,
    private readonly eventDispatcher: IEventDispatcher
  ) {}

  public async perform (input: UpdateUserNotificationsUseCaseInput):
  Promise<Either<InvalidNotificationTypeError, boolean>> {
    if (!NotificationEnum[input.type]) {
      return left(new InvalidNotificationTypeError())
    }

    await this.transactionAdapter.useTransaction(async (trx) => {
      await this.syncUserNotificationWithTransactionRepository
        .removeAll(new UniqueEntityID(input.userId), input.type, trx)

      if (input.selectedNotificationIds.length) {
        await this.syncUserNotificationWithTransactionRepository.sync(
          new UniqueEntityID(input.userId),
          input.selectedNotificationIds.map((n) => ({
            notificationId: new UniqueEntityID(n),
            type: input.type,
          })),
          trx
        )
      }
    })

    await this.eventDispatcher.publish(new NotificationsUpdatedEvent({
      userId: new UniqueEntityID(input.userId),
      action: !input.selectedNotificationIds.length ? 'removeAll' : 'sync',
      type: input.type,
    }))

    return right(true)
  }
}
