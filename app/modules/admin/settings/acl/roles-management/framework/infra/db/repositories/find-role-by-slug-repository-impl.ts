import { RoleEntity } from 'app/modules/admin/settings/acl/roles-management/domain/entities/role-entity'
import { RoleModel } from 'app/modules/@shared/framework/infra/db/models'
import { RoleMapper } from 'app/modules/@shared/framework/infra/db/mappers'
import {FindRoleBySlugRepository} from 'app/modules/admin/settings/acl/roles-management/usecases'

export class FindRoleBySlugRepositoryImpl implements FindRoleBySlugRepository {
  constructor (
    private readonly roleMapper: RoleMapper
  ) {}
  public async find (slug: string): Promise<RoleEntity | undefined> {
    const roleModel = await RoleModel
      .query()
      .preload('permissions')
      .where('slug', slug)
      .first()

    if (!roleModel) {
      return
    }

    return this.roleMapper.toDomain(roleModel)
  }
}
