import { Handler } from 'app/infra/listeners/handler'
import {RoleDeleted} from 'app/modules/admin/settings/acl/roles-management/domain/events/role-deleted-event'

export class RoleDeletedListener extends Handler<RoleDeleted> {
  public handle (event: RoleDeleted): void {
    console.log(event)
  }
}
