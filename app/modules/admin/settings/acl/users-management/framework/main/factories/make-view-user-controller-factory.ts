import { DateAdapterImpl } from 'app/modules/@shared/framework/infra/adapters/date-adapter-impl'
import { UserRoleMapper } from 'app/modules/@shared/framework/infra/db/mappers'
import { FindUserUseCaseImpl } from '../../../usecases'
import { FindUsernameWithRoleRepositoryImpl } from '../../infra/db/repositories/find-username-with-role-repository-impl'
import { ViewUserController } from '../controllers/view-user-controller'

export const makeViewUserControllerFactory = (): ViewUserController => {
  return new ViewUserController(
    new FindUserUseCaseImpl(
      new FindUsernameWithRoleRepositoryImpl(new UserRoleMapper()),
      new DateAdapterImpl()
    )
  )
}
