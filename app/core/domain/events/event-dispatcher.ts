import { IEventDispatcher, IHandler, IDomainEvent } from 'App/core/domain'

interface IEventHandlers {
  [eventName: string]: Array<IHandler<IDomainEvent>>
}

export class EventDispatcher implements IEventDispatcher {
  private _eventHandlers: IEventHandlers = {}
  private static instance: EventDispatcher

  public eventHandlers (): IEventHandlers {
    return this._eventHandlers
  }

  public publish<T>(event: T): void {
    const eventName = (event as any).constructor.name
    if (this._eventHandlers[eventName]) {
      this._eventHandlers[eventName].forEach((eventHandler) => eventHandler.handle(event as any))
    }
  }

  public register (eventName: string, handler: IHandler<IDomainEvent>): EventDispatcher {
    if (!this._eventHandlers[eventName]) {
      this._eventHandlers[eventName] = []
    }
    this._eventHandlers[eventName].push(handler)

    return this
  }

  public unregister (eventName: string, handler: IHandler<IDomainEvent>): EventDispatcher {
    if (this._eventHandlers[eventName]) {
      const index = this._eventHandlers[eventName].indexOf(handler)
      if (index > -1) {
        this._eventHandlers[eventName].splice(index, 1)
      }
    }
    return this
  }

  public unregisterAll (): EventDispatcher {
    this._eventHandlers = {}
    return this
  }

  public static getInstance (): EventDispatcher {
    if (!this.instance) {
      this.instance = new EventDispatcher()
    }

    return this.instance
  }
}
