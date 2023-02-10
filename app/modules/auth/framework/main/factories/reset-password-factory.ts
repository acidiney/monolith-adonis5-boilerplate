import {EventDispatcher} from 'app/core/domain'
import {
  FindTokenRepositoryImpl,
  FindUserIdRepositoryImpl,
  UpdateUserRepositoryImpl,
} from 'app/modules/auth/framework/infra/db/repositories'
import {ResetPasswordUseCaseImpl} from 'app/modules/auth/usecases'
import {UserMapper} from 'app/modules/shared/framework/infra/mappers/user-mapper'
import {TokenMapper} from 'app/modules/auth/framework/infra/db/mappers/token-mapper'
import {ResetPasswordController} from 'app/modules/auth/framework/main/controllers/reset-password-controller'
import {UpdateTokenRepositoryImpl} from 'app/modules/auth/framework/infra/db/repositories/update-token-repository-impl'

export const makeResetPasswordFactory = (): ResetPasswordController => {
  const tokenMapper = new TokenMapper()
  const userMapper = new UserMapper()

  return new ResetPasswordController(
    new ResetPasswordUseCaseImpl(
      new FindTokenRepositoryImpl(tokenMapper),
      new FindUserIdRepositoryImpl(userMapper),
      new UpdateUserRepositoryImpl(userMapper),
      new UpdateTokenRepositoryImpl(tokenMapper),
      EventDispatcher.getInstance()
    )
  )
}
