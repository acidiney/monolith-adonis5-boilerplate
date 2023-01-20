import { IEventDispatcher, IHandle, IDomainEvent } from 'App/core/domain'

interface IEventHandlers {
  [eventName: string]: Array<IHandle<IDomainEvent>>
}

export class EventDispatcher implements IEventDispatcher {
  private _eventHandlers: IEventHandlers = {}
  private static instance: EventDispatcher

  get eventHandlers(): IEventHandlers {
    return this._eventHandlers
  }

  publish<T>(event: T): void {
    const eventName = event.constructor.name
    if (this._eventHandlers[eventName]) {
      this._eventHandlers[eventName].forEach((eventHandler) => eventHandler.handle(event as any))
    }
  }

  register(eventName: string, handler: IHandle<IDomainEvent>): void {
    if (!this._eventHandlers[eventName]) {
      this._eventHandlers[eventName] = []
    }
    this._eventHandlers[eventName].push(handler)
  }

  unregister(eventName: string, handler: IHandle<IDomainEvent>): void {
    if (this._eventHandlers[eventName]) {
      const index = this._eventHandlers[eventName].indexOf(handler)
      if (index > -1) {
        this._eventHandlers[eventName].splice(index, 1)
      }
    }
  }

  unregisterAll(): void {
    this._eventHandlers = {}
  }

  static getInstance(): EventDispatcher {
    if (!this.instance) {
      this.instance = new EventDispatcher()
    }

    return this.instance
  }
}
