import { UniqueEntityID } from 'app/core/domain'

export interface IDomainEvent<T = any> {
  dateTimeOccurred: Date
  eventData: T
  eventId: () => UniqueEntityID
}
