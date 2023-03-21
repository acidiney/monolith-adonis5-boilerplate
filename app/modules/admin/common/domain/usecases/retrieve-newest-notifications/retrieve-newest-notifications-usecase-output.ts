import {EventType} from 'app/modules/@shared/domain/entities/notification-entity'

export interface RetrieveNewestNotificationsUseCaseOutput {
  message?: string,
  title: string

  eventType: EventType

  routePath?: string
  icon?: string
  createdAtText: string
  createdAt: string
  hash: string
  event: string
}
