import {EventDispatcher} from 'app/core/domain'
import {RoleDeleted} from 'app/modules/admin/settings/acl/roles-management/domain/events/role-deleted-event'

import {RoleCreatedListener, RoleDeletedListener, RoleUpdatedListener}
  from 'app/modules/admin/settings/acl/roles-management/framework/infra'

import {RoleCreatedEvent, RoleUpdatedEvent} from 'app/modules/admin/settings/acl/roles-management/domain/events'

EventDispatcher
  .getInstance()
  .register(RoleDeleted.name, new RoleDeletedListener())
  .register(RoleCreatedEvent.name, new RoleCreatedListener())
  .register(RoleUpdatedEvent.name, new RoleUpdatedListener())
