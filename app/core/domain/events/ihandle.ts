import { IDomainEvent } from './idomain-event'

export interface IHandle<T extends IDomainEvent = IDomainEvent> {
  handle: (event: T) => void
}
