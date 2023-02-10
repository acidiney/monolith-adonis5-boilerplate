import {RoleModel} from 'app/modules/@shared/framework/infra/db/models'
import {RoleMapper} from 'app/modules/admin/settings/acl/roles-management/framework/infra/db/mappers/role-mapper'
import {RoleEntity} from 'app/modules/admin/settings/acl/roles-management/domain/entities/role-entity'
import {
  ListAllRolesRepository,
} from 'app/modules/admin/settings/acl/roles-management/usecases/list-roles-dropdown/props'
import {
  ListRolesDropdownUseCaseInput,
} from 'app/modules/admin/settings/acl/roles-management/domain/usecases/list-roles-dropdown'

export class ListAllRolesDropdownRepositoryImpl implements ListAllRolesRepository {
  constructor (
    private readonly roleMapper: RoleMapper = new RoleMapper()
  ) {
  }

  public async findAll (input: ListRolesDropdownUseCaseInput): Promise<RoleEntity[]> {
    const rolesPaginated = await RoleModel
      .query()
      .whereNull('deleted_at')
      .andWhere((q) => {
        if (!input.isRoot) {
          q.whereNot('slug', 'root')
        }
      })
      .exec()

    return rolesPaginated.map(this.roleMapper.toDomain)
  }
}
