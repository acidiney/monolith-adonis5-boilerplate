import {UniqueEntityID} from 'app/core/domain'
import {NotificationType} from 'app/modules/@shared/domain/types'

export interface Selected {
  notificationId: UniqueEntityID
  type: NotificationType
}

export interface SyncUserNotificationWithTransactionRepository<T> {
  sync (userId: UniqueEntityID, notifications: Selected[], trx: T): Promise<void>
  removeAll (userId: UniqueEntityID, type: NotificationType, trx: T): Promise<void>
}
