
import {IDomainEvent, UniqueEntityID} from 'app/core/domain'

interface SentResetPasswordEventProps {
  userId: UniqueEntityID
}

export class SentResetPasswordEvent implements IDomainEvent<SentResetPasswordEventProps> {
  public dateTimeOccurred: Date

  public readonly eventData: SentResetPasswordEventProps
  constructor (protected readonly _eventData: SentResetPasswordEventProps) {
    this.dateTimeOccurred = new Date()
    this.eventData = _eventData
  }

  public eventId (): UniqueEntityID {
    return new UniqueEntityID()
  }
}
