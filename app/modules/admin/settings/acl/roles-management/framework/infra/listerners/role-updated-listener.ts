import { Handler } from 'app/infra/listeners/handler'
import { RoleUpdatedEvent } from '../../../domain/events'

export class RoleUpdatedListener extends Handler<RoleUpdatedEvent> {
  public handle (event: RoleUpdatedEvent): void {
    console.log(event)
  }
}
