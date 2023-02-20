import { Handler } from 'app/infra/listeners/handler'
import { UserDeletedEvent } from '../../../domain/events/user-deleted-event'

export class UserDeletedListener extends Handler<UserDeletedEvent> {
  public handle (event: UserDeletedEvent): void {
    // do something, like, send e-mail or log

    console.log(event.eventData)
  }
}
