import {
  ListUsersUseCase,
  ListUsersUseCaseInput,
  ListUsersUseCaseOutput,
} from 'app/modules/admin/settings/acl/users/domain'
import {
  ListUsersRepository,
} from './props'

export class ListUsersUseCaseImpl implements ListUsersUseCase {
  constructor (
    private readonly listUsersRepository: ListUsersRepository
  ) {
  }

  public async perform (input: ListUsersUseCaseInput): Promise<ListUsersUseCaseOutput> {
    return this.listUsersRepository.findAll(input)
  }
}
