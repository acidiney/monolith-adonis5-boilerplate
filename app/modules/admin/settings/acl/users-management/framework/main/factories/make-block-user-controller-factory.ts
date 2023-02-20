import { EventDispatcher } from 'app/core/domain'

import { UserMapper } from 'app/modules/@shared/framework/infra/db/mappers'
import { DateAdapterImpl } from 'app/modules/@shared/framework/infra/adapters/date-adapter-impl'
import { FindUsernameRepositoryImpl, UpdateUserRepositoryImpl } from 'app/modules/@shared/framework/infra'

import { BlockUserController } from '../controllers/block-user-controller'
import { BlockUserUseCaseImpl } from '../../../usecases/block-user/block-user-usecase-impl'

export const makeBlockUserControllerFactory = (): BlockUserController => {
  const userMapper = new UserMapper(new DateAdapterImpl())

  return new BlockUserController(
    new BlockUserUseCaseImpl(
      new FindUsernameRepositoryImpl(userMapper),
      new UpdateUserRepositoryImpl(userMapper),
      EventDispatcher.getInstance()
    )
  )
}
