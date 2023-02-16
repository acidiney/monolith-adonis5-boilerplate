import Database from '@ioc:Adonis/Lucid/Database'
import { UniqueEntityID } from 'app/core/domain'
import { NotificationModel } from 'app/modules/@shared/framework/infra/db/models/notification-model'
import { NotificationEntity } from 'app/modules/admin/common/domain'
import { FindNotificationsRepository } from 'app/modules/admin/common/usecases'
import { NotificationMapper } from '../mappers'

export class FindNotificationsRepositoryImpl implements FindNotificationsRepository {
  constructor (
    private readonly notificationMapper: NotificationMapper
  ) {}

  public async findActiveNotifications (userId: string): Promise<NotificationEntity[]> {
    const activeNotifications = await Database
      .query()
      .from('core_notifications as cn')
      .select('cn.id', 'cn.notification_key as name', 'cnu.type')
      .innerJoin('core_notifications_users as cnu', 'cnu.notification_id', 'cn.id')
      .whereNull('cn.deleted_at')
      .andWhere('cnu.user_id', userId)
      .exec()

    return activeNotifications.map((aN) => {
      return NotificationEntity.hydrate(new UniqueEntityID(aN.id), {
        type: aN.type,
        name: aN.name,
      })
    })
  }

  public async findAll (): Promise<NotificationEntity[]> {
    const notifications = await NotificationModel
      .query()
      .whereNull('deleted_at')
      .exec()

    return notifications.map(this.notificationMapper.toDomain)
  }
}
