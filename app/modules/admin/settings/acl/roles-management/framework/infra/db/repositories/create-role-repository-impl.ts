import {CreateRoleRepository} from 'app/modules/admin/settings/acl/roles-management/usecases/create-role/ports'
import {RoleEntity} from 'app/modules/admin/settings/acl/roles-management/domain/entities/role-entity'
import {RoleMapper} from 'app/modules/@shared/framework/infra/db/mappers'

export class CreateRoleRepositoryImpl implements CreateRoleRepository {
  constructor (private readonly roleMapper: RoleMapper) {}
  public async persist (roleEntity: RoleEntity): Promise<void> {
    const roleModel = await this.roleMapper.toPersistence(roleEntity)

    await roleModel.save()
  }
}
