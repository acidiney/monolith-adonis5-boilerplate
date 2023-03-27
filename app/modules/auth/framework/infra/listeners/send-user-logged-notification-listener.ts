import {Handler} from 'app/infra/listeners/handler'
import {UserLoggedEvent} from 'app/modules/auth/domain/events/user-logged-event'
import {BroadcastMessageContract} from 'app/modules/@shared/domain/ports'
import {CoreBroadcastEnum} from 'app/modules/@shared/domain/types'

export class SendUserLoggedNotificationListener extends Handler<UserLoggedEvent> {
  constructor (
    private readonly broadcastMessage: BroadcastMessageContract,
  ) {
    super()
  }
  public async handle (event: UserLoggedEvent): Promise<void> {
    await this.broadcastMessage.publish('core.shared', {
      type: CoreBroadcastEnum.NOTIFY,
      message: {
        title: this.ctx()?.i18n.formatMessage('auth.new_user_login'),
        message: this.ctx()?.i18n.formatMessage('auth.new_user_login_description',
          { ip: this.ctx()?.request.ip }),
      },
      meta: {
        userId: event.eventData.userId.toString(),
      },
    })
  }
}
