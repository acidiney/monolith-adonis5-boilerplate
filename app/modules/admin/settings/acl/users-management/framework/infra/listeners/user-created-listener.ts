import { Handler } from 'app/infra/listeners/handler'
import {
  UserCreatedEvent,
} from 'app/modules/admin/settings/acl/users-management/domain/events/user-created-event'

export class UserCreatedListener extends Handler<UserCreatedEvent> {
  public handle (event: UserCreatedEvent): void {
    // do something, like, send e-mail or log

    console.log(event.eventData)
  }
}
