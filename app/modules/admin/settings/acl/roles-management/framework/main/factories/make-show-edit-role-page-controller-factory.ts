import {
  ShowEditRolePageController,
} from 'app/modules/admin/settings/acl/roles-management/framework/main/controllers/show-edit-role-page-controller'
import {
  FindPermissionsRepositoryImpl,
  FindRoleBySlugRepositoryImpl, GenerateUniqueIdAdapterImpl, PermissionMapper,
} from 'app/modules/admin/settings/acl/roles-management/framework/infra'
import {RoleMapper, UserMapper} from 'app/modules/@shared/framework/infra/db/mappers'
import {
  FindUserIdRepositoryImpl,
} from 'app/modules/@shared/framework/infra/db/repositories/find-user-id-repository-impl'
import {DateAdapterImpl} from 'app/modules/@shared/framework/infra/adapters/date-adapter-impl'
import {
  FindPermissionsUseCaseImpl,
} from 'app/modules/admin/settings/acl/roles-management/usecases/find-permissions/find-permissions-usecase-impl'
import {FindRoleUseCaseImpl} from 'app/modules/admin/settings/acl/roles-management/usecases'

export const makeShowEditRolePageControllerFactory = (): ShowEditRolePageController => {
  return new ShowEditRolePageController(
    new FindPermissionsUseCaseImpl(
      new FindPermissionsRepositoryImpl(new PermissionMapper()),
      new GenerateUniqueIdAdapterImpl()
    ),
    new FindRoleUseCaseImpl(
      new FindRoleBySlugRepositoryImpl(new RoleMapper()),
      new FindUserIdRepositoryImpl(new UserMapper()),
      new DateAdapterImpl()
    ),
  )
}
