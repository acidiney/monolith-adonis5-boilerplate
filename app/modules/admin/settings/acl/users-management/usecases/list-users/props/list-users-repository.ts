import {ListUsersUseCaseInput} from 'app/modules/admin/settings/acl/users-management/domain'
import {Pagination} from 'app/core/ports'
import {UserRoleAggregate} from 'app/modules/@shared/domain/aggregates/user-role-aggregate'

export interface ListUsersRepository {
  findAll(input: ListUsersUseCaseInput): Promise<Pagination<UserRoleAggregate>>
}
