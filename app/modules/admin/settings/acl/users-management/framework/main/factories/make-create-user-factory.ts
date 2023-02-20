import {
  CreateUserController,
} from 'app/modules/admin/settings/acl/users-management/framework/main/controllers/create-user-controller'
import {
  CreateUserUseCaseImpl,
} from 'app/modules/admin/settings/acl/users-management/usecases/create-user/create-user-usecase-impl'
import { FindUsernameEmailRepositoryImpl } from 'app/modules/auth/framework/infra/db/repositories'
import {
  GenerateRandomPasswordServiceImpl,
} from 'app/modules/admin/settings/acl/users-management/framework/infra/services/generate-random-password-service'
import {
  PersistUserRepositoryImpl,
} from 'app/modules/admin/settings/acl/users-management/framework/infra/db/repositories/persist-user-repository-impl'
import {EventDispatcher} from 'app/core/domain'

export const makeCreateUserFactory = (): CreateUserController => {
  return new CreateUserController(
    new CreateUserUseCaseImpl(
      new FindUsernameEmailRepositoryImpl(),
      new GenerateRandomPasswordServiceImpl(),
      new PersistUserRepositoryImpl(),
      EventDispatcher.getInstance()
    )
  )
}
