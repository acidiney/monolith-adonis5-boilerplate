import {FindRoleByNameRepository} from 'app/modules/admin/settings/acl/roles-management/usecases/create-role/ports'
import {RoleEntity} from 'app/modules/admin/settings/acl/roles-management/domain/entities/role-entity'
import {UniqueEntityID} from 'app/core/domain'

export const makeFindRoleByNameRepositoryStub = (): FindRoleByNameRepository => {
  return new (class implements FindRoleByNameRepository {
    public async findByName (name: string): Promise<RoleEntity> {
      return RoleEntity.hydrate(new UniqueEntityID('valid_role_id'), {
        name,
        description: 'valid_desc',
        internal: false,
        permissions: [new UniqueEntityID('valid_permission_id')],
      })
    }
  })()
}
