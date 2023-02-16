import { Mapper, UniqueEntityID } from 'app/core/domain'
import { NotificationModel } from 'app/modules/@shared/framework/infra/db/models/notification-model'
import { NotificationEntity } from 'app/modules/admin/common/domain'

export class NotificationMapper implements Mapper<NotificationEntity, NotificationModel> {
  public toDomain (notificationModel: NotificationModel): NotificationEntity {
    return NotificationEntity.hydrate(new UniqueEntityID(notificationModel.id), {
      name: notificationModel.notificationKey,
    })
  }
  public toPersistence (notificationEntity: NotificationEntity): NotificationModel | Promise<NotificationModel> {
    throw new Error('(toPersistence) Method not implemented.')
  }
}
