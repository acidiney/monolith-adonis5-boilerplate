import {ListUsersRepository} from 'app/modules/admin/settings/acl/users-management/usecases/list-users/props'
import {ListUsersUseCaseInput} from 'app/modules/admin/settings/acl/users-management/domain'
import {UserModel} from 'app/modules/@shared/framework/infra/db/models'
import {UserEntity} from 'app/domain/entities/user-entity'
import {Pagination} from 'app/core/ports'
import {UserMapper} from 'app/modules/@shared/framework/infra/db/mappers/user-mapper'

export class ListUsersRepositoryImpl implements ListUsersRepository {
  constructor (
    private readonly userMapper: UserMapper = new UserMapper()
  ) {
  }

  public async findAll (input: ListUsersUseCaseInput): Promise<Pagination<UserEntity>> {
    const usersPaginated = await UserModel
      .query()
      .whereNull('deleted_at')
      .preload('role')
      .paginate(input.page, input.perPage)

    return {
      total: usersPaginated.total,
      perPage: usersPaginated.perPage,
      page: usersPaginated.currentPage,
      data: usersPaginated.all().map(this.userMapper.toDomain),
    }
  }
}
