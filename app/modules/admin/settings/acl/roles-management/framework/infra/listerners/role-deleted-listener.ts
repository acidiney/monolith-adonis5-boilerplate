import {IHandler} from 'app/core/domain'
import {RoleDeleted} from 'app/modules/admin/settings/acl/roles-management/domain/events/role-deleted-event'

export class RoleDeletedListener implements IHandler<RoleDeleted> {
  public handle (event: RoleDeleted): void {
    console.log(event)
  }
}
