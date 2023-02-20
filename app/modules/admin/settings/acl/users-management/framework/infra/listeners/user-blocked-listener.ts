import { Handler } from 'app/infra/listeners/handler'
import { UserBlockedEvent } from '../../../domain/events/user-blocked-event'

export class UserBlockedListener extends Handler<UserBlockedEvent> {
  public handle (event: UserBlockedEvent): void {
    // do something, like, send e-mail or log

    console.log(event.eventData)
  }
}
