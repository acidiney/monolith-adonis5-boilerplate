import {UniqueEntityID} from 'app/core/domain'
import {Selected, SyncUserNotificationWithTransactionRepository} from 'app/modules/admin/common/usecases'
import Database from '@ioc:Adonis/Lucid/Database'
import {TransactionClient} from '@adonisjs/lucid/build/src/TransactionClient'
import {NotificationType} from 'app/modules/@shared/domain/types'

export class SyncUserNotificationWithTransactionRepositoryImpl implements SyncUserNotificationWithTransactionRepository
  <TransactionClient> {
  private readonly tableName = 'core_notifications_users'
  public async sync (userId: UniqueEntityID, notifications: Selected[], trx: TransactionClient): Promise<void> {
    await Database
      .insertQuery()
      .table(this.tableName)
      .useTransaction(trx)
      .insert(notifications.map((n) => ({
        id: new UniqueEntityID().toString(),
        user_id: userId.toString(),
        notification_id: n.notificationId.toString(),
        type: n.type,
      })))
  }

  public async removeAll (userId: UniqueEntityID, type: NotificationType, trx: TransactionClient): Promise<void> {
    await Database
      .query()
      .from(this.tableName)
      .useTransaction(trx)
      .where({
        user_id: userId.toString(),
        type: type,
      })
      .delete()
  }
}
