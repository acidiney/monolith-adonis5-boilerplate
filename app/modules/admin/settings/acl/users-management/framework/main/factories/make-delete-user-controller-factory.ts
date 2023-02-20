import { EventDispatcher } from 'app/core/domain'

import { UserMapper } from 'app/modules/@shared/framework/infra/db/mappers'
import { DateAdapterImpl } from 'app/modules/@shared/framework/infra/adapters/date-adapter-impl'
import { FindUsernameRepositoryImpl, UpdateUserRepositoryImpl } from 'app/modules/@shared/framework/infra'

import { DeleteUserController } from '../controllers/delete-user-controller'
import { DeleteUserUseCaseImpl } from '../../../usecases'

export const makeDeleteUserControllerFactory = (): DeleteUserController => {
  const userMapper = new UserMapper(new DateAdapterImpl())

  return new DeleteUserController(
    new DeleteUserUseCaseImpl(
      new FindUsernameRepositoryImpl(userMapper),
      new UpdateUserRepositoryImpl(userMapper),
      EventDispatcher.getInstance()
    )
  )
}
