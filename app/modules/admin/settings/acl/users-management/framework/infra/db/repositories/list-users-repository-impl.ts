import {ListUsersRepository} from 'app/modules/admin/settings/acl/users-management/usecases/list-users/props'
import {ListUsersUseCaseInput} from 'app/modules/admin/settings/acl/users-management/domain'
import {UserModel} from 'app/modules/@shared/framework/infra/db/models'
import {Pagination} from 'app/core/ports'
import {UserRoleMapper} from 'app/modules/@shared/framework/infra/db/mappers'
import {UserRoleAggregate} from 'app/modules/@shared/domain/aggregates/user-role-aggregate'

export class ListUsersRepositoryImpl implements ListUsersRepository {
  constructor (
    private readonly userRoleMapper: UserRoleMapper = new UserRoleMapper()
  ) {
  }

  public async findAll (input: ListUsersUseCaseInput): Promise<Pagination<UserRoleAggregate>> {
    const usersPaginated = await UserModel
      .query()
      .whereNull('deleted_at')
      .preload('role')
      .paginate(input.page, input.perPage)

    return {
      total: usersPaginated.total,
      perPage: usersPaginated.perPage,
      page: usersPaginated.currentPage,
      data: usersPaginated.all().map((uR) => this.userRoleMapper.toDomain(uR)),
    }
  }
}
