import { UniqueEntityID } from '../unique-entity-id'
import { IDomainEvent } from './idomain-event'

export abstract class DomainEvent<T> implements IDomainEvent {
  public readonly eventData: T
  public readonly dateTimeOccurred: Date

  constructor (
    _eventData: T
  ) {
    this.eventData = _eventData
    this.dateTimeOccurred = new Date()
  }

  public eventId (): UniqueEntityID {
    return new UniqueEntityID()
  }
}
