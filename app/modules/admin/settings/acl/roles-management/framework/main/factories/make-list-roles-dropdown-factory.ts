import {ListRolesDropdownUseCaseImpl} from 'app/modules/admin/settings/acl/roles-management/usecases'
import {ListAllRolesDropdownRepositoryImpl} from 'app/modules/admin/settings/acl/roles-management/framework/infra'
import {
  ListRolesDropdownControllerController,
} from 'app/modules/admin/settings/acl/roles-management/framework/main/controllers'

export const makeListDropdownRolesFactory = (): ListRolesDropdownControllerController => {
  return new ListRolesDropdownControllerController(
    new ListRolesDropdownUseCaseImpl(
      new ListAllRolesDropdownRepositoryImpl(),
    )
  )
}
