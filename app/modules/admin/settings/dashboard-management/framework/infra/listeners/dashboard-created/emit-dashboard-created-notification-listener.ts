import { Handler } from 'app/infra/listeners/handler'
import { DashboardCreatedEvent } from '../../../../domain'
import { BroadcastMessageContract } from 'app/modules/@shared/domain/ports'

import { SaveNotificationProps }
  from 'app/modules/@shared/framework/infra/inbox-processor/save-notification-processor'
import { CoreBroadcastEnum } from 'app/modules/@shared/domain/types'

export class EmitDashboardCreatedNotificationListener extends Handler<DashboardCreatedEvent> {
  constructor (private readonly broadcastMessage: BroadcastMessageContract) {
    super()
  }

  public async handle (_event: DashboardCreatedEvent): Promise<void> {
    const ctx = this.ctx()

    if (!ctx) {
      throw new Error()
    }

    await this.broadcastMessage.publish<SaveNotificationProps>('core.shared', {
      type: CoreBroadcastEnum.NOTIFY_ALL,
      message: {
        title: ctx.i18n.formatMessage(''),
        message: ctx.i18n.formatMessage(''),
        content: '',
        routePath: '',
        event: 'DASHBOARD_CREATED',
        eventType: 'success',
        notificationType: 'notifications.dashboard-management.dashboard-created',
      },
      meta: {
        userId: this.ctx()?.auth.user?.id ?? null,
      },
    })
  }
}
