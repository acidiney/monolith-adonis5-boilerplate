import { TransactionAdapter } from 'app/core/ports'
import { Either, IEventDispatcher, left, right, UniqueEntityID } from 'app/core/domain'

import {
  UpdateRoleUseCase,
  UpdateRoleUseCaseInput,
  RoleUpdatedEvent,
  RoleUpdatedProps,
  NonRootCannotModifyError,
  RoleNotFoundError,
} from '../../domain'

import { FindRoleBySlugRepository, UpdateRoleWithTransactionRepository } from './ports'

export class UpdateRoleUseCaseImpl implements UpdateRoleUseCase {
  constructor (
    private readonly findRoleBySlugRepository: FindRoleBySlugRepository,
    private readonly updateRoleWithTransactionRepository: UpdateRoleWithTransactionRepository<any>,
    private readonly transactionAdapter: TransactionAdapter,
    private readonly eventDispatcher: IEventDispatcher
  ) { }

  public async perform (input: UpdateRoleUseCaseInput):
  Promise<Either<RoleNotFoundError | NonRootCannotModifyError, boolean>> {
    const roleEntity = await this.findRoleBySlugRepository.find(input.roleSlug)

    if (!roleEntity) {
      return left(new RoleNotFoundError())
    }

    if (roleEntity.isInternal && !input.isRoot) {
      return left(new NonRootCannotModifyError())
    }

    const roleEventProps: RoleUpdatedProps = {
      roleId: roleEntity.id,
      older: {
        name: roleEntity.name,
        description: roleEntity.description,
        permissions: roleEntity.permissions,
      },
    }

    if (!roleEntity.isInternal) {
      roleEntity.changeDescription(input.description)
      roleEntity.changeName(input.name)
    }

    roleEntity.updatePermissions(input.permissions.map(p => new UniqueEntityID(p)))

    const validation = roleEntity.validate()

    if (validation.isLeft()) {
      return left(validation.value)
    }

    await this.transactionAdapter.useTransaction((trx) =>
      this.updateRoleWithTransactionRepository.updateWithTransaction(roleEntity, trx)
    )

    await this.eventDispatcher.publish(new RoleUpdatedEvent(roleEventProps))

    return right(true)
  }
}
