import {ListUsersRepository} from 'app/modules/admin/settings/acl/users/usecases/list-users/props'
import {ListUsersUseCaseInput, ListUsersUseCaseOutput} from 'app/modules/admin/settings/acl/users/domain'
import {UserModel} from 'app/infra/models'

export class ListUsersRepositoryImpl implements ListUsersRepository {
  public async findAll (input: ListUsersUseCaseInput): Promise<ListUsersUseCaseOutput> {
    const usersPaginated = await UserModel
      .query()
      .paginate(input.page, input.perPage)

    return {
      total: usersPaginated.total,
      perPage: usersPaginated.perPage,
      page: usersPaginated.currentPage,
      data: usersPaginated.all() as any,
    }
  }
}
