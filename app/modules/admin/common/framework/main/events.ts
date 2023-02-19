import {EventDispatcher} from 'app/core/domain'
import {NotificationsUpdatedEvent, UserInfoUpdatedEvent} from 'app/modules/admin/common/domain'
import {NotificationsUpdatedListener, UserInfoUpdatedListener} from 'app/modules/admin/common/framework/infra'

EventDispatcher
  .getInstance()
  .register(NotificationsUpdatedEvent.name, new NotificationsUpdatedListener())
  .register(UserInfoUpdatedEvent.name, new UserInfoUpdatedListener())
