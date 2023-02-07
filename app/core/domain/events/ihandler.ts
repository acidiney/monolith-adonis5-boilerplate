import { IDomainEvent } from './idomain-event'

export interface IHandler<T extends IDomainEvent = IDomainEvent> {
  handle: (event: T) => void
}
