import {EventDispatcher} from 'app/core/domain'
import {RoleDeleted} from 'app/modules/admin/settings/acl/roles-management/domain/events/role-deleted-event'
import {RoleCreatedListener, RoleDeletedListener} from 'app/modules/admin/settings/acl/roles-management/framework/infra'
import {RoleCreatedEvent} from 'app/modules/admin/settings/acl/roles-management/domain/events'

EventDispatcher
  .getInstance()
  .register(RoleDeleted.name, new RoleDeletedListener())
  .register(RoleCreatedEvent.name, new RoleCreatedListener())

