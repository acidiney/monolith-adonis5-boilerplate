import {RoleEntity} from 'app/modules/admin/settings/acl/roles-management/domain/entities/role-entity'
import {
  ListRolesDropdownUseCaseInput,
} from 'app/modules/admin/settings/acl/roles-management/domain/usecases/list-roles-dropdown'

export interface ListAllRolesRepository {
  findAll(input: ListRolesDropdownUseCaseInput): Promise<RoleEntity[]>
}
