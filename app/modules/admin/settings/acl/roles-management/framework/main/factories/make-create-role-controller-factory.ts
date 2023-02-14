import {
  CreateRoleController,
} from '../controllers/create-role-controller'
import {
  CreateRoleUseCaseImpl,
} from 'app/modules/admin/settings/acl/roles-management/usecases/create-role/create-role-usecase-impl'
import {RoleMapper} from 'app/modules/@shared/framework/infra/db/mappers'
import {
  FindRoleByNameRepositoryImpl,
  CreateRoleRepositoryImpl,
} from 'app/modules/admin/settings/acl/roles-management/framework/infra/db'
import {EventDispatcher} from 'app/core/domain'

export const makeCreateRoleControllerFactory = (): CreateRoleController => {
  const roleMapper = new RoleMapper()

  return new CreateRoleController(
    new CreateRoleUseCaseImpl(
      new FindRoleByNameRepositoryImpl(roleMapper),
      new CreateRoleRepositoryImpl(roleMapper),
      EventDispatcher.getInstance()
    )
  )
}
