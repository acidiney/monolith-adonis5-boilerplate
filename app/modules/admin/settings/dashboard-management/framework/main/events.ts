import { EventDispatcher } from 'app/core/domain'
import { DashboardCreatedEvent } from '../../domain/events/dashboard-created'
import { EmitDashboardCreatedNotificationListener }
  from '../infra/listeners/dashboard-created/emit-dashboard-created-notification-listener'
import { BroadcastMessageRepositoryImpl } from 'app/modules/@shared/framework/infra'

EventDispatcher
  .getInstance()
  .register(DashboardCreatedEvent.name,
    new EmitDashboardCreatedNotificationListener(new BroadcastMessageRepositoryImpl())
  )
