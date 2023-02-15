import {CreateRoleUseCase, CreateRoleUseCaseInput} from 'app/modules/admin/settings/acl/roles-management/domain'
import {Either, IEventDispatcher, left, right, UniqueEntityID} from 'app/core/domain'
import {
  RoleAlreadyExistError,
} from 'app/modules/admin/settings/acl/roles-management/domain/errors'
import {RoleEntity} from 'app/modules/admin/settings/acl/roles-management/domain/entities/role-entity'
import {
  CreateRoleWithTransactionRepository,
  FindRoleByNameRepository,
} from 'app/modules/admin/settings/acl/roles-management/usecases/create-role/ports'
import {RoleCreatedEvent} from 'app/modules/admin/settings/acl/roles-management/domain/events'
import {TransactionAdapter} from 'app/core/ports'

export class CreateRoleUseCaseImpl implements CreateRoleUseCase {
  constructor (
    private readonly findRoleByNameRepository: FindRoleByNameRepository,
    private readonly createRoleRepository: CreateRoleWithTransactionRepository<any>,
    private readonly transactionAdapter: TransactionAdapter,
    private readonly eventDispatcher: IEventDispatcher
  ) {
  }

  public async perform (input: CreateRoleUseCaseInput): Promise<Either<RoleAlreadyExistError, boolean>> {
    const roleEntityOrError = RoleEntity.create({
      name: input.name,
      description: input.description,
      permissions: input.permissions.map(p => new UniqueEntityID(p)),
      user: new UniqueEntityID(input.userId),
    })

    if (roleEntityOrError.isLeft()) {
      return left(roleEntityOrError.value)
    }

    const roleAlreadyExists = await this.findRoleByNameRepository.findByName(roleEntityOrError.value.name)

    if (roleAlreadyExists) {
      return left(new RoleAlreadyExistError())
    }

    await this.transactionAdapter.useTransaction((trx) =>
      this.createRoleRepository.persist(roleEntityOrError.value, trx)
    )

    await this.eventDispatcher.publish(new RoleCreatedEvent({
      roleId: roleEntityOrError.value.id,
    }))

    return right(true)
  }
}
