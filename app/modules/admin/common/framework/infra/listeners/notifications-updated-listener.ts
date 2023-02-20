import { Handler } from 'app/infra/listeners/handler'
import {NotificationsUpdatedEvent} from 'app/modules/admin/common/domain'

export class NotificationsUpdatedListener extends Handler<NotificationsUpdatedEvent> {
  public handle (event: NotificationsUpdatedEvent): void {
    console.log(event)
  }
}
