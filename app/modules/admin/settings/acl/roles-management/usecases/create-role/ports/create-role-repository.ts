import {RoleEntity} from 'app/modules/admin/settings/acl/roles-management/domain/entities/role-entity'

export interface CreateRoleRepository {
  persist (roleEntity: RoleEntity): Promise<void>
}
