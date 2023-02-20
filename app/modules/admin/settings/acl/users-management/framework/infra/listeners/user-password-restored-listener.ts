import { Handler } from 'app/infra/listeners/handler'
import { UserPasswordRestoredEvent } from '../../../domain/events/user-password-restored-event'

export class UserPasswordRestoredListener extends Handler<UserPasswordRestoredEvent> {
  public handle (event: UserPasswordRestoredEvent): void {
    // do something, like, send e-mail or log

    console.log(event.eventData)
  }
}
