import {
  ShowCreateRolePageController,
} from 'app/modules/admin/settings/acl/roles-management/framework/main/controllers/show-create-role-page-controller'
import {
  FindPermissionsUseCaseImpl,
} from 'app/modules/admin/settings/acl/roles-management/usecases/find-permissions/find-permissions-usecase-impl'

import {PermissionMapper, FindPermissionsRepositoryImpl, GenerateUniqueIdAdapterImpl}
  from 'app/modules/admin/settings/acl/roles-management/framework/infra'

export const makeShowCreateRolePageControllerFactory = (): ShowCreateRolePageController => {
  return new ShowCreateRolePageController(
    new FindPermissionsUseCaseImpl(
      new FindPermissionsRepositoryImpl(
        new PermissionMapper()
      ),
      new GenerateUniqueIdAdapterImpl()
    )
  )
}
