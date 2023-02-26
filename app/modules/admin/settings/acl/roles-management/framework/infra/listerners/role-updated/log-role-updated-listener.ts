import { Handler } from 'app/infra/listeners/handler'
import { RoleUpdatedEvent } from '../../../../domain/events'

export class LogRoleUpdatedListener extends Handler<RoleUpdatedEvent> {
  public async handle (event: RoleUpdatedEvent): Promise<void> {
    console.log('should implement log for this action!', event)
  }
}
