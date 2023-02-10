import {
  ListRolesController,
} from '../controllers/list-roles-controller'
import {ListRolesUseCaseImpl}
  from 'app/modules/admin/settings/acl/roles-management/usecases/list-roles/list-roles-usecase-impl'
import {
  ListRolesRepositoryImpl,
} from 'app/modules/admin/settings/acl/roles-management/framework/infra/db/repositories/list-roles-repository-impl'
import {DateAdapterImpl} from 'app/modules/@shared/framework/infra/adapters/date-adapter-impl'

export const makeListRolesFactory = (): ListRolesController => {
  return new ListRolesController(
    new ListRolesUseCaseImpl(
      new ListRolesRepositoryImpl(),
      new DateAdapterImpl()
    )
  )
}
