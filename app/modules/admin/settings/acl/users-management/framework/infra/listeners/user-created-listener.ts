import {IHandler} from 'app/core/domain'
import {
  UserCreatedEvent,
} from 'app/modules/admin/settings/acl/users-management/domain/events/user-created-event'

export class UserCreatedListener implements IHandler<UserCreatedEvent> {
  public handle (event: UserCreatedEvent): void {
    // do something, like, send e-mail or log

    console.log(event.eventData)
  }
}
