import { UniqueEntityID } from 'App/core/domain'

export interface IDomainEvent {
  dateTimeOccurred: Date
  eventData: any
  eventId: () => UniqueEntityID
}
