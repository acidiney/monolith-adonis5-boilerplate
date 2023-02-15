import { RoleEntity } from 'app/modules/admin/settings/acl/roles-management/domain/entities/role-entity'
import { RoleMapper } from 'app/modules/@shared/framework/infra/db/mappers'
import {UpdateRoleRepository} from 'app/modules/admin/settings/acl/roles-management/usecases'

export class UpdateRoleRepositoryImpl implements UpdateRoleRepository {
  constructor (
    private readonly roleMapper: RoleMapper
  ) {}

  public async update (roleEntity: RoleEntity): Promise<void> {
    const roleModel = await this.roleMapper.toPersistence(roleEntity)

    await roleModel.save()
  }
}
