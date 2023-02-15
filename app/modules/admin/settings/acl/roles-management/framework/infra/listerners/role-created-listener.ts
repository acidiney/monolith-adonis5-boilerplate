import {IHandler} from 'app/core/domain'
import {RoleCreatedEvent} from 'app/modules/admin/settings/acl/roles-management/domain/events'
import Logger from '@ioc:Adonis/Core/Logger'

export class RoleCreatedListener implements IHandler<RoleCreatedEvent> {
  public handle (event: RoleCreatedEvent): void {
    Logger.info(`Nova Role Criada ${event.eventData.roleId.toString()}`)
  }
}
