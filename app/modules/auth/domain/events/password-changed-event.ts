import {IDomainEvent, UniqueEntityID} from 'app/core/domain'

interface PasswordChangedProps {
  userId: UniqueEntityID
  success: boolean
  error?: string
}

export class PasswordChangedEvent implements IDomainEvent<PasswordChangedProps> {
  public dateTimeOccurred: Date

  public readonly eventData: PasswordChangedProps
  constructor (protected readonly _eventData: PasswordChangedProps) {
    this.dateTimeOccurred = new Date()
    this.eventData = _eventData
  }

  public eventId (): UniqueEntityID {
    return new UniqueEntityID()
  }
}
