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
    await this.broadcastMessage.publish<SaveNotificationProps>('core.shared', {
      type: CoreBroadcastEnum.NOTIFY,
      message: {
        title: 'auth.new_user_login',
        message:'auth.new_user_login_description',
        routePath: '',
        event: 'USER_LOGGED',
        eventType: 'success',
        notificationType: 'notifications.core.auth.login',
      },
      meta: {
        userId: event.eventData.userId.toString(),
      },
    })
  }
}
