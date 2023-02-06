import {
  ListUsersController,
} from '../controllers/list-users-controller'
import {ListUsersUseCaseImpl} from 'app/modules/admin/settings/acl/users/usecases/list-users/list-users-usecase-impl'
import {
  ListUsersRepositoryImpl,
} from 'app/modules/admin/settings/acl/users/framework/infra/db/repositories/list-users-repository-impl'

export const makeListUsersFactory = (): ListUsersController => {
  return new ListUsersController(
    new ListUsersUseCaseImpl(
      new ListUsersRepositoryImpl()
    )
  )
}
