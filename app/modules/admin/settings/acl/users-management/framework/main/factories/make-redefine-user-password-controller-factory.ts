import { EventDispatcher } from 'app/core/domain'

import { UserMapper } from 'app/modules/@shared/framework/infra/db/mappers'
import { DateAdapterImpl } from 'app/modules/@shared/framework/infra/adapters/date-adapter-impl'
import { FindUsernameRepositoryImpl, UpdateUserRepositoryImpl } from 'app/modules/@shared/framework/infra'

import { RedefinePasswordUseCaseImpl } from '../../../usecases'
import { RedefineUserPasswordController } from '../controllers/redefine-user-password-controller'
import { GenerateRandomPasswordServiceImpl } from '../../infra/services/generate-random-password-service'

export const makeRedefineUserPasswordControllerFactory = (): RedefineUserPasswordController => {
  const userMapper = new UserMapper(new DateAdapterImpl())

  return new RedefineUserPasswordController(
    new RedefinePasswordUseCaseImpl(
      new FindUsernameRepositoryImpl(userMapper),
      new GenerateRandomPasswordServiceImpl(),
      new UpdateUserRepositoryImpl(userMapper),
      EventDispatcher.getInstance()
    )
  )
}
