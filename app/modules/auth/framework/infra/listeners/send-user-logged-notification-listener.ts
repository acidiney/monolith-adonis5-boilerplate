import {Handler} from 'app/infra/listeners/handler'
import {UserLoggedEvent} from 'app/modules/auth/domain/events/user-logged-event'
import {BroadcastMessageContract, EmailAdapter} from 'app/modules/@shared/domain/ports'
import {CoreBroadcastEnum} from 'app/modules/@shared/domain/types'
import { SaveNotificationProps } from 'app/modules/@shared/framework/infra/inbox-processor/save-notification-processor'
import { CoreUserModel } from 'app/modules/@shared/framework/infra'

export class SendUserLoggedNotificationListener extends Handler<UserLoggedEvent> {
  constructor (
    private readonly broadcastMessage: BroadcastMessageContract,
    private readonly emailAdapter: EmailAdapter
  ) {
    super()
  }
  public async handle (event: UserLoggedEvent): Promise<void> {
    const user = await CoreUserModel.findOrFail(event.eventData.userId.toString())

    await this.broadcastMessage.publish<SaveNotificationProps>('core.shared', {
      type: CoreBroadcastEnum.NOTIFY,
      message: {
        title: 'auth.new_user_login',
        message:'auth.new_user_login_description',
        content: await this.emailAdapter.render(`${user.defaultLang}/user-logged`, {}),
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
