import { EventDispatcher } from 'App/core/domain/events/event-dispatcher'
import { IHandle } from 'App/core/domain/events/ihandle'
import { IDomainEvent } from 'App/core/domain/events/idomain-event'
import { UniqueEntityID } from 'App/core/domain'

const makeFakeHandler = (): IHandle<IDomainEvent> => {
  return new (class implements IHandle<IDomainEvent> {
    handle(_event: IDomainEvent): void {
      console.log('Mocking event...')
    }
  })()
}

describe('Domain events tests', () => {
  it('should register an event handler', () => {
    const eventDispatcher = new EventDispatcher()
    const eventHandler = makeFakeHandler()

    eventDispatcher.register('ProductCreatedEvent', eventHandler)

    expect(eventDispatcher.eventHandlers.ProductCreatedEvent).toBeDefined()
    expect(eventDispatcher.eventHandlers.ProductCreatedEvent.length).toBe(1)
    expect(eventDispatcher.eventHandlers.ProductCreatedEvent[0]).toEqual(eventHandler)
  })

  it('should unregister an event handler', () => {
    const eventDispatcher = new EventDispatcher()
    const eventHandler = makeFakeHandler()

    eventDispatcher.register('ProductCreatedEvent', eventHandler)

    expect(eventDispatcher.eventHandlers.ProductCreatedEvent[0]).toEqual(eventHandler)

    eventDispatcher.unregister('ProductCreatedEvent', eventHandler)

    expect(eventDispatcher.eventHandlers.ProductCreatedEvent).toBeDefined()
    expect(eventDispatcher.eventHandlers.ProductCreatedEvent.length).toBe(0)
  })

  it('should unregister all event handlers', () => {
    const eventDispatcher = new EventDispatcher()
    const eventHandler = makeFakeHandler()

    eventDispatcher.register('ProductCreatedEvent', eventHandler)
    eventDispatcher.register('ProductCreatedEvent', eventHandler)

    expect(eventDispatcher.eventHandlers.ProductCreatedEvent.length).toBe(2)

    eventDispatcher.unregisterAll()

    expect(eventDispatcher.eventHandlers.ProductCreatedEvent).toBeUndefined()
  })

  it('should publish an event', () => {
    const eventDispatcher = new EventDispatcher()
    const eventHandler = makeFakeHandler()
    const handleSpy = jest.spyOn(eventHandler, 'handle')

    eventDispatcher.register('ProductCreatedEvent', eventHandler)
    expect(eventDispatcher.eventHandlers.ProductCreatedEvent.length).toBe(1)

    const event = new (class ProductCreatedEvent implements IDomainEvent {
      dateTimeOccurred: Date
      eventData: any

      constructor() {
        this.dateTimeOccurred = new Date()
        this.eventData = {
          name: 'valid_event',
          description: 'Valid Event Mock',
        }
      }

      eventId(): UniqueEntityID {
        return new UniqueEntityID()
      }
    })()

    eventDispatcher.publish(event)

    expect(handleSpy).toHaveBeenCalled()
  })
})
