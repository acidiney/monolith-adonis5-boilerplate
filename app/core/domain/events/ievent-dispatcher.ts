import { IDomainEvent } from './idomain-event'
import { IHandle } from './ihandle'

export interface IEventDispatcher {
  publish: <T extends IDomainEvent>(event: T) => void
  register: <T extends IDomainEvent>(eventName: string, handler: IHandle<T>) => void
  unregister: <T extends IDomainEvent>(eventName: string, handler: IHandle<T>) => void
  unregisterAll: () => void
}
