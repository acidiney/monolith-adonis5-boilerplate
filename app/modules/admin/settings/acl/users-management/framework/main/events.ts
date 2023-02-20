import {EventDispatcher} from 'app/core/domain'
import {
  UserBlockedListener,
  UserCreatedListener, UserDeletedListener, UserPasswordRestoredListener, UserRestoredListener,
} from 'app/modules/admin/settings/acl/users-management/framework/infra/listeners'
import {UserCreatedEvent} from 'app/modules/admin/settings/acl/users-management/domain/events/user-created-event'
import { UserDeletedEvent } from '../../domain/events/user-deleted-event'
import { UserRestoredEvent } from '../../domain/events/user-restored-event'
import { UserBlockedEvent } from '../../domain/events/user-blocked-event'
import { UserPasswordRestoredEvent } from '../../domain/events/user-password-restored-event'

EventDispatcher
  .getInstance()
  .register(UserCreatedEvent.name, new UserCreatedListener())
  .register(UserDeletedEvent.name, new UserDeletedListener())
  .register(UserRestoredEvent.name, new UserRestoredListener())
  .register(UserBlockedEvent.name, new UserBlockedListener())
  .register(UserPasswordRestoredEvent.name, new UserPasswordRestoredListener())
