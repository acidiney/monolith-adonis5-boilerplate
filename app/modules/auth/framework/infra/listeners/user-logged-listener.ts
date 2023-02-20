import Logger from '@ioc:Adonis/Core/Logger'

import {IHandler} from 'app/core/domain'
import {UserLoggedEvent} from 'app/modules/auth/domain/events/user-logged-event'
import {FindUserIdRepository} from 'app/modules/@shared/usecases/ports/find-user-id-repository'
import {UserModel} from 'app/modules/@shared/framework/infra/db/models'
import { Handler } from 'app/infra/listeners/handler'

export class UserLoggedListener extends Handler<UserLoggedEvent> {
  constructor (
    private readonly findUserIdRepository: FindUserIdRepository,
  ) {
    super()
  }

  public override async handle (event: UserLoggedEvent): Promise<void> {
    const user = await this.findUserIdRepository.findUserId(event.eventData.userId)

    if (!user) {
      Logger.error('User Logged "not found"!')
      return
    }

    console.log(super.userId())

    Logger.info(`User "${user.fullName}" logged!`)

    user.userLogged(event.dateTimeOccurred)

    await UserModel
      .query()
      .where('id', user.id.toString())
      .update('last_login', user.lastLoginAt)
  }
}
