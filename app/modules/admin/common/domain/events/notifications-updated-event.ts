import {DomainEvent, UniqueEntityID} from 'app/core/domain'
import {NotificationType} from 'app/modules/@shared/domain/types'

interface NotificationUpdatedProps {
  userId: UniqueEntityID
  action: 'removeAll' | 'sync',
  type: NotificationType
}

export class NotificationsUpdatedEvent extends DomainEvent<NotificationUpdatedProps> {}
