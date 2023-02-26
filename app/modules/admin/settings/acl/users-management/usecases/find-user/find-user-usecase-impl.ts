import { Either, left, right } from 'app/core/domain'
import { DateAdapter } from 'app/modules/@shared/domain/ports'
import { UserNotFoundError } from 'app/modules/auth/domain'
import { FindUserUseCase, FindUserUseCaseInput, FindUserUseCaseOutput } from '../../domain'

import { FindUsernameWithRoleRepository } from './ports'
export class FindUserUseCaseImpl implements FindUserUseCase {
  constructor (
    private readonly findUsernameRepository: FindUsernameWithRoleRepository,
    private readonly dateAdapter: DateAdapter
  ) {}

  public async perform (input: FindUserUseCaseInput): Promise<Either<UserNotFoundError, FindUserUseCaseOutput>> {
    const root = await this.findUsernameRepository.findUsername(input.username)

    if (!root) {
      return left(new UserNotFoundError())
    }

    return right({
      avatar: root.user.avatar,
      slug: root.user.slug,
      fullName: root.user.fullName,
      updatedAt: this.dateAdapter.format(root.user.updatedAt),
      updatedAtText: this.dateAdapter.toRelative(root.user.updatedAt),
      lastLoginAt: this.dateAdapter.format(root.user.lastLoginAt),
      lastLoginText: this.dateAdapter.toRelative(root.user.lastLoginAt),
      email: root.user.email,
      status: root.user.status,
      role: {
        name: root.role.name,
        isRoot: root.user.isRoot,
        description: root.role.description,
        internal: root.role.isInternal,
      },
    })
  }
}
