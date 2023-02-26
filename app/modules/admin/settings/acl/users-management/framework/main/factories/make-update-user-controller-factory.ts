import { EventDispatcher } from 'app/core/domain'
import { FindUsernameEmailRepositoryImpl,
  FindUsernameRepositoryImpl,
  UpdateUserRepositoryImpl } from 'app/modules/@shared/framework/infra'
import { UpdateUserUseCaseImpl } from '../../../usecases'
import { UpdateUserController } from '../controllers/update-user-controller'

export const makeUpdateUserControllerFactory = (): UpdateUserController => {
  return new UpdateUserController(
    new UpdateUserUseCaseImpl(
      new FindUsernameRepositoryImpl(),
      new UpdateUserRepositoryImpl(),
      new FindUsernameEmailRepositoryImpl(),
      EventDispatcher.getInstance()
    )
  )
}
