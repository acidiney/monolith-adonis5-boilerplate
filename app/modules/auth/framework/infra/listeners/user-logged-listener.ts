import Logger from '@ioc:Adonis/Core/Logger'

import {IHandler} from 'app/core/domain'
import {UserLoggedEvent} from 'app/modules/auth/domain/events/user-logged-event'
import {FindUserIdRepository} from 'app/modules/auth/usecases/shared/ports/find-user-id-repository'
import {UpdateUserRepository} from 'app/modules/auth/usecases/reset-password/ports'

export class UserLoggedListener implements IHandler<UserLoggedEvent> {
  constructor (
    private readonly findUserIdRepository: FindUserIdRepository,
    private readonly updateUserRepository: UpdateUserRepository
  ) {
  }

  public async handle (event: UserLoggedEvent): Promise<void> {
    const user = await this.findUserIdRepository.findUserId(event.eventData.userId)

    if (!user) {
      Logger.error('User Logged "not found"!')
      return
    }

    Logger.info(`User "${user.fullName}" logged at ${event.dateTimeOccurred}!`)

    user.userLogged(event.dateTimeOccurred)

    await this.updateUserRepository.update(user)
  }
}
