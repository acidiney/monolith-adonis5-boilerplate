import { EventDispatcher } from 'app/core/domain'
import { DateAdapterImpl } from 'app/modules/@shared/framework/infra/adapters/date-adapter-impl'
import { UserMapper } from 'app/modules/@shared/framework/infra/db/mappers'
import { FindUserIdRepositoryImpl }
  from 'app/modules/@shared/framework/infra/db/repositories/find-user-id-repository-impl'
import { UpdateUserRepositoryImpl }
  from 'app/modules/@shared/framework/infra/db/repositories/update-user-repository-impl'
import { VerifyPasswordMatchAdapterImpl } from 'app/modules/auth/framework/infra/adapters'
import { UpdatePasswordUseCaseImpl } from '../../../usecases/update-password'
import { UpdatePasswordController } from '../controllers/update-password-controller'

export const makeUpdatePasswordControllerFactory = (): UpdatePasswordController => {
  return new UpdatePasswordController(
    new UpdatePasswordUseCaseImpl(
      new FindUserIdRepositoryImpl(new UserMapper(new DateAdapterImpl())),
      new UpdateUserRepositoryImpl(new UserMapper(new DateAdapterImpl())),
      new VerifyPasswordMatchAdapterImpl(),
      EventDispatcher.getInstance()
    )
  )
}
