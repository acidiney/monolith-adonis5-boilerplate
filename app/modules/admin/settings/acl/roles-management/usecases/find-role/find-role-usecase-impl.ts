import {
  FindRoleUseCase,
  FindRoleUseCaseInput,
  FindRoleUseCaseOutput,
} from 'app/modules/admin/settings/acl/roles-management/domain'
import {RoleNotFoundError} from 'app/modules/admin/settings/acl/roles-management/domain/errors'
import {Either, left, right} from 'app/core/domain'
import {FindRoleBySlugRepository} from './ports'
import {DateAdapter} from 'app/modules/@shared/domain/ports'
import {FindUserIdRepository} from 'app/modules/@shared/usecases/ports/find-user-id-repository'

export class FindRoleUseCaseImpl implements FindRoleUseCase {
  constructor (
    private readonly findRoleBySlugRepository: FindRoleBySlugRepository,
    private readonly findUserByIdRepository: FindUserIdRepository,
    private readonly dateAdapter: DateAdapter
  ) {
  }

  public async perform (input: FindRoleUseCaseInput): Promise<Either<RoleNotFoundError, FindRoleUseCaseOutput>> {
    const roleEntity = await this.findRoleBySlugRepository.find(input.roleSlug)

    if (!roleEntity) {
      return left(new RoleNotFoundError())
    }

    const user = roleEntity.user && await this.findUserByIdRepository.findUserId(roleEntity.user)

    return right({
      name: roleEntity.name,
      description: roleEntity.description,
      slug: roleEntity.slug,
      internal: roleEntity.isInternal,
      permissions: roleEntity.permissions.map(p => p.toString()),
      updatedAtText: this.dateAdapter.toRelative(roleEntity.updatedAt),
      updatedAt: this.dateAdapter.format(roleEntity.updatedAt),
      user: user && {
        fullName: user.fullName,
        slug: user.slug,
      },
    })
  }
}
