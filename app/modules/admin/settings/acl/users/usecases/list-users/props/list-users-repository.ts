import {ListUsersUseCaseInput, ListUsersUseCaseOutput} from 'app/modules/admin/settings/acl/users/domain'

export interface ListUsersRepository {
  findAll(input: ListUsersUseCaseInput): Promise<ListUsersUseCaseOutput>
}
