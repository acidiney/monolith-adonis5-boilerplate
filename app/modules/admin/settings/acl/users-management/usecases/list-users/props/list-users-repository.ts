import {ListUsersUseCaseInput} from 'app/modules/admin/settings/acl/users-management/domain'
import {Pagination} from 'app/core/ports'
import {UserEntity} from 'app/domain/entities/user-entity'

export interface ListUsersRepository {
  findAll(input: ListUsersUseCaseInput): Promise<Pagination<UserEntity>>
}
