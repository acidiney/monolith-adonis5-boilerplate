import {DomainEvent} from 'app/core/domain'
import {NotificationType} from 'app/modules/@shared/domain/types'

interface NotificationUpdatedProps {
  action: 'removeAll' | 'sync',
  type: NotificationType
}

export class NotificationsUpdatedEvent extends DomainEvent<NotificationUpdatedProps> {}
