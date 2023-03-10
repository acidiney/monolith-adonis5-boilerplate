import { Handler } from 'app/infra/listeners/handler'
import { UserBlockedEvent } from '../../../../domain/events/user-blocked-event'
import Event from '@ioc:Adonis/Core/Event'
import { CoreUserModel } from 'app/modules/@shared/framework/infra/db/models'

export class EmitRealtimeMessageToBlockedUserListener extends Handler<UserBlockedEvent> {
  public async handle (event: UserBlockedEvent): Promise<void> {
    const ctx = super.ctx()

    if (!ctx) {
      return
    }

    const user = await CoreUserModel.findOrFail(event.eventData.userId.toString())
    const adminUser = await CoreUserModel.findOrFail(ctx.auth.user?.id)

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
