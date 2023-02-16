import {EventDispatcher} from 'app/core/domain'
import {NotificationsUpdatedEvent} from 'app/modules/admin/common/domain'
import {NotificationsUpdatedListener} from 'app/modules/admin/common/framework/infra'

EventDispatcher
  .getInstance()
  .register(NotificationsUpdatedEvent.name, new NotificationsUpdatedListener())
