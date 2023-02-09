import {IDomainEvent, UniqueEntityID} from 'app/core/domain'

export interface UserCreatedProps {
  userId: UniqueEntityID
  password: string
}

export class UserCreatedEvent implements IDomainEvent<UserCreatedProps> {
  public dateTimeOccurred: Date
  public eventData: UserCreatedProps

  constructor (private prop: UserCreatedProps) {
    this.eventData = this.prop
    this.dateTimeOccurred = new Date()
  }

  public eventId (): UniqueEntityID {
    return new UniqueEntityID()
  }
}
