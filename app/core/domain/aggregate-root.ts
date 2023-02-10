import { Entity } from './entity'
import { IDomainEvent } from './events/idomain-event'
import { UniqueEntityID } from './unique-entity-id'

export abstract class AggregateRoot<T> extends Entity<T> {
  private readonly _domainEvents: IDomainEvent[] = []

  public get id (): UniqueEntityID {
    return this._id
  }

  public get domainEvents (): IDomainEvent[] {
    return this._domainEvents
  }

  protected addDomainEvent (domainEvent: IDomainEvent): void {
    this._domainEvents.push(domainEvent)
    // DomainEvents.markAggregateForDispatch(this)
    this.logDomainEventAdded(domainEvent)
  }

  public clearEvents (): void {
    this._domainEvents.splice(0, this._domainEvents.length)
  }

  private logDomainEventAdded (domainEvent: IDomainEvent): void {
    const thisClass = Reflect.getPrototypeOf(this)
    const domainEventClass = Reflect.getPrototypeOf(domainEvent)
    console.info(
      '[Domain Event Created]:',
      thisClass?.constructor.name,
      '==>',
      domainEventClass?.constructor.name
    )
  }
}
