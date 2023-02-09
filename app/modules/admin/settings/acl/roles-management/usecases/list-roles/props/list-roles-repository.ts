import {Pagination} from 'app/core/ports'
import {RoleEntity} from 'app/modules/admin/settings/acl/roles-management/domain/entities/role-entity'
import {ListRolesUseCaseInput} from 'app/modules/admin/settings/acl/roles-management/domain'

export interface ListRolesRepository {
  findAll(input: ListRolesUseCaseInput): Promise<Pagination<RoleEntity>>
}
