import { IDomainEvent, IHandler } from 'app/core/domain'
import { HttpContext } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export abstract class Handler<T extends IDomainEvent> implements IHandler {
  public abstract handle (event: T): void

  public ctx (): HttpContextContract | null {
    return HttpContext.get()
  }
}
