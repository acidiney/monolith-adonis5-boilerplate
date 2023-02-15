import {RoleEntity} from 'app/modules/admin/settings/acl/roles-management/domain/entities/role-entity'

export interface UpdateRoleRepository {
  update (roleEntity: RoleEntity) : Promise<void>
}
