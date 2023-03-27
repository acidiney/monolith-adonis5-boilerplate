import {Handler} from 'app/infra/listeners/handler'
import {UserLoggedEvent} from 'app/modules/auth/domain/events/user-logged-event'
import {BroadcastMessageContract} from 'app/modules/@shared/domain/ports'
import {CoreBroadcastEnum} from 'app/modules/@shared/domain/types'
import { SaveNotificationProps } from 'app/modules/@shared/framework/infra/inbox-processor/save-notification-processor'

export class SendUserLoggedNotificationListener extends Handler<UserLoggedEvent> {
  constructor (
    private readonly broadcastMessage: BroadcastMessageContract,
  ) {
    super()
  }
  public async handle (event: UserLoggedEvent): Promise<void> {
    const ctx = this.ctx()

    if (!ctx) {
      throw new Error('Context does not exists!')
    }

    await this.broadcastMessage.publish<SaveNotificationProps>('core.shared', {
      type: CoreBroadcastEnum.NOTIFY,
      message: {
        title: ctx.i18n.formatMessage('auth.new_user_login'),
        message: ctx.i18n.formatMessage('auth.new_user_login_description',
          { ip: ctx.request.ip }),
        routePath: '',
        event: 'USER_LOGGED',
        eventType: 'success',
      },
      meta: {
        userId: event.eventData.userId.toString(),
      },
    })
  }
}
