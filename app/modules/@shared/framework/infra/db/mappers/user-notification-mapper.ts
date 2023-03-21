import {Mapper, UniqueEntityID} from 'app/core/domain'
import {NotificationEntity} from 'app/modules/@shared/domain/entities/notification-entity'
import {CoreNotificationEventSchema} from 'app/modules/@shared/framework/infra/db/models/core-notification-event-model'

export class UserNotificationMapper implements Mapper<NotificationEntity, CoreNotificationEventSchema> {
  public toDomain (data: CoreNotificationEventSchema): NotificationEntity {
    return NotificationEntity.hydrate(new UniqueEntityID(data.hash), {
      icon: data.icon,
      userId: new UniqueEntityID(data.userId),
      readAt: data.readAt,
      subject: data.title,
      routePath: data.routePath,
      message: data.message,
      eventType: data.eventType,
      event: data.event,
    }, {
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    })
  }

  public toPersistence (_data: NotificationEntity):
  Promise<CoreNotificationEventSchema> | CoreNotificationEventSchema {
    throw new Error('Need to be implemented!')
  }
}
