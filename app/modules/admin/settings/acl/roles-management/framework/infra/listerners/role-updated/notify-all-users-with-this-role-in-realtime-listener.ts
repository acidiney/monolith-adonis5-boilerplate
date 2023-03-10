import { Handler } from 'app/infra/listeners/handler'
import { CoreRoleModel } from 'app/modules/@shared/framework/infra/db/models'
import { RoleUpdatedEvent } from '../../../../domain/events'

import Event from '@ioc:Adonis/Core/Event'

export class NotifyAllUsersWithThisRoleInRealtimeListener extends Handler<RoleUpdatedEvent> {
  public async handle (event: RoleUpdatedEvent): Promise<void> {
    const role = await CoreRoleModel
      .query()
      .preload('users')
      .where('id', event.eventData.roleId.toString())
      .firstOrFail()

    const ctx = super.ctx()

    if (!ctx) {
      return
    }

    void Event.emit('alert:realtime:broadcast:only', {
      users: role.users.map((u) => u.slug),
      title: ctx.i18n.formatMessage('admin.acl.role.updated'),
      message: ctx.i18n.formatMessage('admin.acl.role.updated-description'),
      type: 'info',
      eventName: 'ROLE_UPDATED',
      icon: 'message',
    })
  }
}
