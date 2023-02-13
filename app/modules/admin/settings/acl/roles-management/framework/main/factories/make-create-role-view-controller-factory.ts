import {
  CreateRoleViewController,
} from 'app/modules/admin/settings/acl/roles-management/framework/main/controllers/create-role-view-controller'
import {
  FindPermissionsUseCaseImpl,
} from 'app/modules/admin/settings/acl/roles-management/usecases/find-permissions/find-permissions-usecase-impl'

import {PermissionMapper, FindPermissionsRepositoryImpl, GenerateUniqueIdAdapterImpl}
  from 'app/modules/admin/settings/acl/roles-management/framework/infra'

export const makeCreateRoleViewControllerFactory = (): CreateRoleViewController => {
  return new CreateRoleViewController(
    new FindPermissionsUseCaseImpl(
      new FindPermissionsRepositoryImpl(
        new PermissionMapper()
      ),
      new GenerateUniqueIdAdapterImpl()
    )
  )
}
