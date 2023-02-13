import {RoleEntity} from 'app/modules/admin/settings/acl/roles-management/domain/entities/role-entity'

export interface FindRoleByNameRepository {
  findByName: (name: string) => Promise<RoleEntity | undefined>
}
