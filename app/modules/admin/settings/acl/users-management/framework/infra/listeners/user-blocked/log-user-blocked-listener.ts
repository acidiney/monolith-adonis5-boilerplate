import { Handler } from 'app/infra/listeners/handler'
import { UserBlockedEvent } from '../../../../domain/events/user-blocked-event'

export class LogUserBlockedListener extends Handler<UserBlockedEvent> {
  public async handle (event: UserBlockedEvent): Promise<void> {
    console.log('implement log', event)
  }
}
