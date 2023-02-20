import { Handler } from 'app/infra/listeners/handler'
import { UserRestoredEvent } from '../../../domain/events/user-restored-event'

export class UserRestoredListener extends Handler<UserRestoredEvent> {
  public handle (event: UserRestoredEvent): void {
    // do something, like, send e-mail or log

    console.log(event.eventData)
  }
}
