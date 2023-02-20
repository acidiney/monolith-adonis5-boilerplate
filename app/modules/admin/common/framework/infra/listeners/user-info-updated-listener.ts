import { Handler } from 'app/infra/listeners/handler'
import {UserInfoUpdatedEvent} from 'app/modules/admin/common/domain'

export class UserInfoUpdatedListener extends Handler<UserInfoUpdatedEvent> {
  public handle (event: UserInfoUpdatedEvent): void {
    console.log(event)
  }
}
