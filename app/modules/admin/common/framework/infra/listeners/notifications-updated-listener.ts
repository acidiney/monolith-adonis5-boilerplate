import {IHandler} from 'app/core/domain'
import {NotificationsUpdatedEvent} from 'app/modules/admin/common/domain'

export class NotificationsUpdatedListener implements IHandler<NotificationsUpdatedEvent> {
  public handle (event: NotificationsUpdatedEvent): void {
    console.log(event)
  }
}
