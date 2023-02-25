import HttpContext from '@ioc:Adonis/Core/HttpContext'

import { Handler } from 'app/infra/listeners/handler'
import { UserBlockedEvent } from '../../../domain/events/user-blocked-event'
import Event from '@ioc:Adonis/Core/Event'
import { UserModel } from 'app/modules/@shared/framework/infra/db/models'

export class UserBlockedListener extends Handler<UserBlockedEvent> {
  public async handle (event: UserBlockedEvent): Promise<void> {
    // do something, like, send e-mail or log
    const ctx = HttpContext.get()

    if (!ctx) {
      return
    }

    const user = await UserModel.findOrFail(event.eventData.userId.toString())
    const adminUser = await UserModel.findOrFail(super.userId()?.toString())

    // send a realtime notification
    await Event.emit('alert:realtime:broadcast:only', {
      users: [
        user.slug,
      ],
      message: ctx.i18n.formatMessage('admin.acl.users.realtime.user.blocked_description',
        { adminName: adminUser.fullName }
      ),
      title: ctx.i18n.formatMessage('admin.acl.users.realtime.user.blocked'),
      type: 'error',
      eventName: 'USER_BLOCKED',
    })
  }
}
