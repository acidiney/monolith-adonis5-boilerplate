import { EventDispatcher } from 'app/core/domain'

import { UserMapper } from 'app/modules/@shared/framework/infra/db/mappers'
import { DateAdapterImpl } from 'app/modules/@shared/framework/infra/adapters/date-adapter-impl'
import { FindUsernameRepositoryImpl, UpdateUserRepositoryImpl } from 'app/modules/@shared/framework/infra'

import { UnblockUserController } from '../controllers/unblock-user-controller'
import { UnblockBlockUserUseCaseImpl } from '../../../usecases/unblock-user/unblock-user-usecase-impl'

export const makeUnblockUserControllerFactory = (): UnblockUserController => {
  const userMapper = new UserMapper(new DateAdapterImpl())

  return new UnblockUserController(
    new UnblockBlockUserUseCaseImpl(
      new FindUsernameRepositoryImpl(userMapper),
      new UpdateUserRepositoryImpl(userMapper),
      EventDispatcher.getInstance()
    )
  )
}
