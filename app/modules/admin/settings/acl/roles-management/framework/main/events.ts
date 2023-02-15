import {EventDispatcher} from 'app/core/domain'
import {RoleDeleted} from 'app/modules/admin/settings/acl/roles-management/domain/events/role-deleted-event'
import {RoleDeletedListener} from 'app/modules/admin/settings/acl/roles-management/framework/infra'

EventDispatcher
  .getInstance()
  .register(RoleDeleted.name, new RoleDeletedListener())
