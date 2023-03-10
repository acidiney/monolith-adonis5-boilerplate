import { Mapper, UniqueEntityID } from 'app/core/domain'
import { CoreNotificationModel } from 'app/modules/@shared/framework/infra/db/models/core-notification-model'
import { NotificationEntity } from 'app/modules/admin/common/domain'

export class NotificationMapper implements Mapper<NotificationEntity, CoreNotificationModel> {
  public toDomain (notificationModel: CoreNotificationModel): NotificationEntity {
    return NotificationEntity.hydrate(new UniqueEntityID(notificationModel.id), {
      name: notificationModel.notificationKey,
    })
  }
  public toPersistence (_notificationEntity: NotificationEntity):
  CoreNotificationModel | Promise<CoreNotificationModel> {
    throw new Error('(toPersistence) Method not implemented.')
  }
}
