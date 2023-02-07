import {
  ListUsersController,
} from '../controllers/list-users-controller'
import {ListUsersUseCaseImpl}
  from 'app/modules/admin/settings/acl/users-management/usecases/list-users/list-users-usecase-impl'
import {
  ListUsersRepositoryImpl,
} from 'app/modules/admin/settings/acl/users-management/framework/infra/db/repositories/list-users-repository-impl'
import {DateAdapterImpl} from 'app/infra/adapters/date-adapter-impl'

export const makeListUsersFactory = (): ListUsersController => {
  return new ListUsersController(
    new ListUsersUseCaseImpl(
      new ListUsersRepositoryImpl(),
      new DateAdapterImpl()
    )
  )
}
