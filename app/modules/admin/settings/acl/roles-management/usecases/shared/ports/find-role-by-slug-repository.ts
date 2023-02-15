import {RoleEntity} from 'app/modules/admin/settings/acl/roles-management/domain/entities/role-entity'

export interface FindRoleBySlugRepository {
  find (roleSlug: string) : Promise<RoleEntity | undefined>
}
