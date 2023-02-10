import {RoleModel} from 'app/modules/@shared/framework/infra/db/models'
import {Pagination} from 'app/core/ports'
import {ListRolesRepository} from 'app/modules/admin/settings/acl/roles-management/usecases/list-roles/props'
import {RoleMapper} from 'app/modules/admin/settings/acl/roles-management/framework/infra/db/mappers/role-mapper'
import {ListRolesUseCaseInput} from 'app/modules/admin/settings/acl/roles-management/domain'
import {RoleEntity} from 'app/modules/admin/settings/acl/roles-management/domain/entities/role-entity'

export class ListRolesRepositoryImpl implements ListRolesRepository {
  constructor (
    private readonly roleMapper: RoleMapper = new RoleMapper()
  ) {
  }

  public async findAll (input: ListRolesUseCaseInput): Promise<Pagination<RoleEntity>> {
    const rolesPaginated = await RoleModel
      .query()
      .whereNull('deleted_at')
      .andWhere((q) => {
        if (!input.isRoot) {
          q.whereNot('slug', 'root')
        }
      })
      .paginate(input.page, input.perPage)

    return {
      total: rolesPaginated.total,
      perPage: rolesPaginated.perPage,
      page: rolesPaginated.currentPage,
      data: rolesPaginated.all().map(this.roleMapper.toDomain),
    }
  }
}
