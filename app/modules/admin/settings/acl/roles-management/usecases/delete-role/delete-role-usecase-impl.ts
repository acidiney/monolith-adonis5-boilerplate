import {Either, IEventDispatcher, left, right, UniqueEntityID} from 'app/core/domain'
import {
  RoleHaveAssociatedUsersError,
  RoleNotFoundError,
} from 'app/modules/admin/settings/acl/roles-management/domain/errors'
import {DeleteRoleUseCase, DeleteRoleUseCaseInput} from 'app/modules/admin/settings/acl/roles-management/domain'
import {RoleDeleted} from 'app/modules/admin/settings/acl/roles-management/domain/events/role-deleted-event'
import {
  FindAssociatedUsersRepository,
  FindRoleBySlugRepository,
  UpdateRoleRepository,
} from 'app/modules/admin/settings/acl/roles-management/usecases/delete-role/ports'

export class DeleteRoleUseCaseImpl implements DeleteRoleUseCase {
  constructor (
    private readonly findRoleBySlugRepository: FindRoleBySlugRepository,
    private readonly findAssociatedUsersRepository: FindAssociatedUsersRepository,
    private readonly updateRoleRepository: UpdateRoleRepository,
    private readonly eventDispatcher: IEventDispatcher
  ) {
  }

  public async perform (input: DeleteRoleUseCaseInput):
  Promise<Either<RoleNotFoundError | RoleHaveAssociatedUsersError, boolean>> {
    const roleEntity = await this.findRoleBySlugRepository.find(input.roleId)

    if (!roleEntity) {
      return left(new RoleNotFoundError())
    }

    const associatedUsers = await this.findAssociatedUsersRepository.findAssociatedUsers(roleEntity.id)

    if (associatedUsers.length) {
      return left(new RoleHaveAssociatedUsersError())
    }

    roleEntity.delete()

    await this.updateRoleRepository.update(roleEntity)

    this.eventDispatcher.publish(new RoleDeleted({
      roleId: new UniqueEntityID(input.roleId),
      userId: new UniqueEntityID(input.userId),
    }))

    return right(true)
  }
}
