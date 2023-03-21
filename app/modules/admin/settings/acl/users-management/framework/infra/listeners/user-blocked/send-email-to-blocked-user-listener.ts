import { join } from 'path'
import { Edge } from 'edge.js'
import I18n from '@ioc:Adonis/Addons/I18n'
import { Handler } from 'app/infra/listeners/handler'
import { BroadcastMessageContract } from 'app/modules/@shared/domain/ports'
import { BroadcastMessageRepositoryImpl, CoreUserModel } from 'app/modules/@shared/framework/infra'
import { SendEmailProps } from 'app/modules/@shared/framework/infra/jobs/core-send-email-job'
import { UserBlockedEvent } from '../../../../domain/events/user-blocked-event'
import { CoreBroadcastEnum } from 'app/modules/@shared/domain/types'

export class SendEmailToBlockedUserListener extends Handler<UserBlockedEvent> {
  constructor (
    private readonly broadcastMessage: BroadcastMessageContract = new BroadcastMessageRepositoryImpl()
  ) {
    super()
  }

  public async handle (event: UserBlockedEvent): Promise<void> {
    const user = await CoreUserModel.findOrFail(event.eventData.userId.toString())

    const edge = new Edge()

    edge.mount(join(__dirname, '..', '..', './resources'))

    const html = await edge.render(`${user.defaultLang}/user-blocked`)

    this.broadcastMessage.publish<SendEmailProps>('core.shared', {
      type: CoreBroadcastEnum.SEND_EMAIL,
      message: {
        to: user.email,
        content: html,
        subject: I18n.locale(user.defaultLang).formatMessage('admin.settings.user-blocked-subject'),
        lang: user.defaultLang,
      },
      meta: {
        userId: user.id,
      },
    })
  }
}
