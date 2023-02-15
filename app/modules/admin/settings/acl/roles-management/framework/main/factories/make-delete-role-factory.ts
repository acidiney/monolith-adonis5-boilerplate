import {DeleteRoleUseCaseImpl} from 'app/modules/admin/settings/acl/roles-management/usecases'
import {RoleMapper, UserMapper} from 'app/modules/@shared/framework/infra/db/mappers'
import {EventDispatcher} from 'app/core/domain'
import {
  FindAssociatedUsersToRoleRepositoryImpl,
  FindRoleBySlugRepositoryImpl, UpdateRoleRepositoryImpl,
} from 'app/modules/admin/settings/acl/roles-management/framework/infra'
import {
  DeleteRoleController,
} from 'app/modules/admin/settings/acl/roles-management/framework/main/controllers/delete-role-controller'

export const makeDeleteRoleFactory = (): DeleteRoleController => {
  return new DeleteRoleController(
    new DeleteRoleUseCaseImpl(
      new FindRoleBySlugRepositoryImpl(new RoleMapper()),
      new FindAssociatedUsersToRoleRepositoryImpl(new UserMapper()),
      new UpdateRoleRepositoryImpl(new RoleMapper()),
      EventDispatcher.getInstance(),
    ),
  )
}
