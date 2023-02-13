import {CreateRoleUseCase, CreateRoleUseCaseInput} from 'app/modules/admin/settings/acl/roles-management/domain'
import {Either, IEventDispatcher, left, right, UniqueEntityID} from 'app/core/domain'
import {
  RoleAlreadyExistError,
} from 'app/modules/admin/settings/acl/roles-management/domain/errors'
import {RoleEntity} from 'app/modules/admin/settings/acl/roles-management/domain/entities/role-entity'
import {
  CreateRoleRepository,
  FindRoleByNameRepository,
} from 'app/modules/admin/settings/acl/roles-management/usecases/create-role/ports'
import {RoleCreatedEvent} from 'app/modules/admin/settings/acl/roles-management/domain/events'

export class CreateRoleUseCaseImpl implements CreateRoleUseCase {
  constructor (
    private readonly findRoleByNameRepository: FindRoleByNameRepository,
    private readonly createRoleRepository: CreateRoleRepository,
    private readonly eventDispatcher: IEventDispatcher
  ) {
  }

  public async perform (input: CreateRoleUseCaseInput): Promise<Either<RoleAlreadyExistError, boolean>> {
    const roleEntityOrError = RoleEntity.create(
      input.name,
      input.description,
      input.permissions.map(p => new UniqueEntityID(p)))

    if (roleEntityOrError.isLeft()) {
      return left(roleEntityOrError.value)
    }

    const roleAlreadyExists = await this.findRoleByNameRepository.findByName(roleEntityOrError.value.name)

    if (roleAlreadyExists) {
      return left(new RoleAlreadyExistError())
    }

    await this.createRoleRepository.persist(roleEntityOrError.value)

    await this.eventDispatcher.publish(new RoleCreatedEvent({
      roleId: roleEntityOrError.value.id,
    }))

    return right(true)
  }
}
