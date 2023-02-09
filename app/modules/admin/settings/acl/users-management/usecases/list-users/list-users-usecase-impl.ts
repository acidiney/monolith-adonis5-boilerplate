import {
  ListUsersUseCase,
  ListUsersUseCaseInput,
  ListUsersUseCaseOutput, User,
} from 'app/modules/admin/settings/acl/users-management/domain'
import {
  ListUsersRepository,
} from './props'
import {DateAdapter} from 'app/domain/ports'

export class ListUsersUseCaseImpl implements ListUsersUseCase {
  constructor (
    private readonly listUsersRepository: ListUsersRepository,
    private readonly dateAdapter: DateAdapter
  ) {
  }

  public async perform (input: ListUsersUseCaseInput): Promise<ListUsersUseCaseOutput> {
    return this.listUsersRepository.findAll(input)
      .then((pagination) => ({
        ...pagination,
        data: pagination.data?.map(u => ({
          updatedAt: this.dateAdapter.format(u.updatedAt),
          updatedAtText: this.dateAdapter.toRelative(u.updatedAt),
          fullName: u.fullName,
          lastLoginAt: this.dateAdapter.format(u.lastLoginAt),
          email: u.email,
          lastLoginAtText: this.dateAdapter.toRelative(u.lastLoginAt),
          slug: u.slug,
          status: u.status,
          roleText: u.role,
        }) as User),
      }))
  }
}
