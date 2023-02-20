import {RoleCreatedEvent} from 'app/modules/admin/settings/acl/roles-management/domain/events'
import Logger from '@ioc:Adonis/Core/Logger'
import { Handler } from 'app/infra/listeners/handler'

export class RoleCreatedListener extends Handler<RoleCreatedEvent> {
  public handle (event: RoleCreatedEvent): void {
    Logger.info(`Nova Role Criada ${event.eventData.roleId.toString()}`)
  }
}
