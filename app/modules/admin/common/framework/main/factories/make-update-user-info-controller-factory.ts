import { EventDispatcher } from 'app/core/domain'
import { DateAdapterImpl } from 'app/modules/@shared/framework/infra/adapters/date-adapter-impl'
import { UserMapper } from 'app/modules/@shared/framework/infra/db/mappers'
import { UploadServiceImpl } from 'app/modules/@shared/framework/infra/services/upload-service-impl'
import { FindUserIdRepositoryImpl, UpdateUserRepositoryImpl } from 'app/modules/auth/framework/infra/db/repositories'
import { UpdateUserInfoUseCaseImpl } from '../../../usecases'
import { UpdateUserInfoController } from '../controllers/update-user-info'

export const makeUpdateUserInfoControllerFactory = (): UpdateUserInfoController => {
  const userMapper = new UserMapper(new DateAdapterImpl())

  return new UpdateUserInfoController(
    new UploadServiceImpl(),
    new UpdateUserInfoUseCaseImpl(
      new FindUserIdRepositoryImpl(userMapper),
      new UpdateUserRepositoryImpl(userMapper),
      EventDispatcher.getInstance()
    )
  )
}
