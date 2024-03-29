import { Handler } from 'app/infra/listeners/handler'
import { UserUpdatedEvent } from '../../../domain/events/user-updated-event'
import Event from '@ioc:Adonis/Core/Event'
import { CoreUserModel } from 'app/modules/@shared/framework/infra'

export class UserUpdatedListener extends Handler<UserUpdatedEvent> {
  constructor () {
    super()
  }

  public async handle (event: UserUpdatedEvent): Promise<void> {
    // do something, like, send e-mail or log
    const ctx = super.ctx()

    if (!ctx) {
      return
    }

    const user = await CoreUserModel.findOrFail(event.eventData.userId.toString())

    // send a realtime notification
    await Event.emit('alert:realtime:broadcast:only', {
      users: [
        user.slug,
      ],
      title: ctx.i18n.formatMessage('admin.acl.users.realtime.user.updated'),
      message: ctx.i18n.formatMessage('shared.please_reload_page'),
      type: 'info',
      eventName: 'USER_UPDATED',
    })
  }
}
