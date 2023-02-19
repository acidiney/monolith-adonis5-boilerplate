import {IHandler} from 'app/core/domain'
import {UserInfoUpdatedEvent} from 'app/modules/admin/common/domain'

export class UserInfoUpdatedListener implements IHandler<UserInfoUpdatedEvent> {
  public handle (event: UserInfoUpdatedEvent): void {
    console.log(event)
  }
}
