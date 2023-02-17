import {IDomainEvent, UniqueEntityID} from 'app/core/domain'
import {NotificationType} from 'app/modules/@shared/domain/types'

interface NotificationUpdatedProps {
  userId: UniqueEntityID
  action: 'removeAll' | 'sync',
  type: NotificationType
}

export class NotificationsUpdatedEvent implements IDomainEvent<NotificationUpdatedProps> {
  public readonly dateTimeOccurred: Date
  public readonly eventData: NotificationUpdatedProps

  constructor (
    _eventData: NotificationUpdatedProps
  ) {
    this.eventData = _eventData
    this.dateTimeOccurred = new Date()
  }

  public eventId (): UniqueEntityID {
    return new UniqueEntityID()
  }
}
