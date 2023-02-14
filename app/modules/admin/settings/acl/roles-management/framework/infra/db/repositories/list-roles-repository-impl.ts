import {RoleModel} from 'app/modules/@shared/framework/infra/db/models'
import {Pagination} from 'app/core/ports'
import {ListRolesRepository} from 'app/modules/admin/settings/acl/roles-management/usecases/list-roles/props'
import {ListRolesUseCaseInput} from 'app/modules/admin/settings/acl/roles-management/domain'
import {RoleEntity} from 'app/modules/admin/settings/acl/roles-management/domain/entities/role-entity'
import {RoleMapper} from 'app/modules/@shared/framework/infra/db/mappers'

export class ListRolesRepositoryImpl implements ListRolesRepository {
  constructor (
    private readonly roleMapper: RoleMapper = new RoleMapper()
  ) {
  }

  public async findAll (input: ListRolesUseCaseInput): Promise<Pagination<RoleEntity>> {
    let query = RoleModel
      .query()
      .whereNull('deleted_at')
      .andWhere((q) => {
        if (!input.isRoot) {
          q.whereNot('slug', 'root')
        }
      })
      .clone()

    if (input.orderByDirection && input.orderBy) {
      query = query
        .orderBy(input.orderBy, input.orderByDirection)
    }

    const rolesPaginated = await query
      .preload('permissions')
      .paginate(input.page, input.perPage)

    return {
      total: rolesPaginated.total,
      perPage: rolesPaginated.perPage,
      page: rolesPaginated.currentPage,
      data: rolesPaginated.all().map(this.roleMapper.toDomain),
    }
  }
}
