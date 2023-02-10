import {EventDispatcher} from 'app/core/domain'
import {
  UserCreatedListener,
} from 'app/modules/admin/settings/acl/users-management/framework/infra/listeners'
import {UserCreatedEvent} from 'app/modules/admin/settings/acl/users-management/domain/events/user-created-event'

EventDispatcher
  .getInstance()
  .register(UserCreatedEvent.name, new UserCreatedListener())
