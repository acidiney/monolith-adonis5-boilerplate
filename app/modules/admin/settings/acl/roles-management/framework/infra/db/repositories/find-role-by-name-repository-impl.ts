import { FindRoleByNameRepository } from 'app/modules/admin/settings/acl/roles-management/usecases/create-role/ports'
import { RoleEntity } from 'app/modules/admin/settings/acl/roles-management/domain/entities/role-entity'
import { RoleModel } from 'app/modules/@shared/framework/infra/db/models'
import { RoleMapper } from 'app/modules/@shared/framework/infra/db/mappers'

export class FindRoleByNameRepositoryImpl implements FindRoleByNameRepository {
  constructor (
    private readonly roleMapper: RoleMapper
  ) {}
  public async findByName (name: string): Promise<RoleEntity | undefined> {
    const roleModel = await RoleModel
      .query()
      .preload('permissions')
      .where('name', name)
      .first()

    if (!roleModel) {
      return
    }

    return this.roleMapper.toDomain(roleModel)
  }
}
