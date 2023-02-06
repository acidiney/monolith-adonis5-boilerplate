import {IDomainEvent, UniqueEntityID} from 'app/core/domain'

interface UserLoggedProps {
  userId: UniqueEntityID
}

export class UserLoggedEvent implements IDomainEvent<UserLoggedProps> {
  public dateTimeOccurred: Date

  public readonly eventData: UserLoggedProps
  constructor (protected readonly _eventData: UserLoggedProps) {
    this.dateTimeOccurred = new Date()
    this.eventData = _eventData
  }

  public eventId (): UniqueEntityID {
    return new UniqueEntityID()
  }
}
