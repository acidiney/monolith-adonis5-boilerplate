import {Pagination} from 'app/core/ports'
import {UniqueEntityID} from 'app/core/domain'
import {NotificationEntity} from 'app/modules/@shared/domain/entities/notification-entity'
import {RetrieveUserNotificationsRepository, Options} from 'app/modules/admin/common/usecases'
import {UserNotificationMapper} from 'app/modules/@shared/framework/infra/db/mappers/user-notification-mapper'
import {CoreNotificationEventModel} from 'app/modules/@shared/framework/infra/db/models/core-notification-event-model'

export class RetrieveUserNewestNotificationsRepositoryImpl implements RetrieveUserNotificationsRepository {
  private readonly collection = CoreNotificationEventModel

  constructor (
    private readonly userNotificationMapper: UserNotificationMapper = new UserNotificationMapper()
  ) {
  }

  private compute (options: { userId: UniqueEntityID, hideOpenedNotifications: boolean }): any {
    const mountWhere = {
      userId: options.userId.toString(),
      readAt: null,
    } as any

    if (!options.hideOpenedNotifications) {
      mountWhere.readAt = {
        $ne: null,
      }
    }

    return mountWhere
  }

  public async findAll (userId: UniqueEntityID, options: Options):
  Promise<NotificationEntity[] | Pagination<NotificationEntity>> {
    const mountWhere = this.compute({ userId, hideOpenedNotifications: options.hideOpenedNotifications })

    const notifications = await this.collection.find(mountWhere)
      .sort('createdAt', options.orderDirection)
      .skip(options.perPage * (options.page - 1))
      .limit(options.perPage)
      .toArray()

    if (options.withPagination) {
      const totalRecords = await this.collection.countDocuments(mountWhere)

      return {
        total: totalRecords,
        perPage: options.perPage,
        page: options.page,
        data: notifications.map(this.userNotificationMapper.toDomain),
      }
    }

    return notifications.map(this.userNotificationMapper.toDomain)
  }
}
