import {
  UserCreatedEvent,
  UserDeletedEvent,
  UserBlockedEvent,
  UserUpdatedEvent,
  UserRestoredEvent,
  UserPasswordRestoredEvent,
} from '../../domain/events'
import { EventDispatcher } from 'app/core/domain'
import {
  UserUpdatedListener,
  UserCreatedListener,
  UserDeletedListener,
  UserRestoredListener,
  LogUserBlockedListener,
  UserPasswordRestoredListener,
  SendEmailToBlockedUserListener,
  EmitRealtimeMessageToBlockedUserListener,
} from 'app/modules/admin/settings/acl/users-management/framework/infra/listeners'
import { BroadcastMessageRepositoryImpl } from 'app/modules/@shared/framework/infra'

EventDispatcher
  .getInstance()
  .register(UserCreatedEvent.name, new UserCreatedListener())
  .register(UserDeletedEvent.name, new UserDeletedListener())
  .register(UserRestoredEvent.name, new UserRestoredListener())
  .register(UserBlockedEvent.name, new SendEmailToBlockedUserListener(new BroadcastMessageRepositoryImpl()))
  .register(UserBlockedEvent.name, new LogUserBlockedListener())
  .register(UserBlockedEvent.name, new EmitRealtimeMessageToBlockedUserListener())
  .register(UserPasswordRestoredEvent.name, new UserPasswordRestoredListener())
  .register(UserUpdatedEvent.name, new UserUpdatedListener())
