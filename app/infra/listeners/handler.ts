import { IDomainEvent, IHandler, UniqueEntityID } from 'app/core/domain'
import HttpContext from '@ioc:Adonis/Core/HttpContext'

export abstract class Handler<T extends IDomainEvent> implements IHandler {
  public abstract handle (event: T): void

  public userId (): UniqueEntityID | undefined {
    const ctx = HttpContext.get()
    return ctx?.auth.user?.id ? new UniqueEntityID(ctx.auth.user.id) : undefined
  }
}
