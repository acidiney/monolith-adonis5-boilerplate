import {UniqueEntityID} from 'app/core/domain'
import {NotificationEntity} from 'app/modules/@shared/domain/entities/notification-entity'
import {Pagination} from 'app/core/ports'

export interface Options {
  hideOpenedNotifications: boolean
  orderDirection: 'asc' | 'desc'
  page: number
  perPage: number
  withPagination: boolean
}

export interface RetrieveUserNotificationsRepository {
  findAll(userId: UniqueEntityID, options: Options): Promise<NotificationEntity[] | Pagination<NotificationEntity>>
}
