import { Either, IEventDispatcher, left, right, UniqueEntityID } from 'app/core/domain'
import { TransactionAdapter } from 'app/core/ports'
import { DeleteBulkRolesUseCase, DeleteBulkRolesUseCaseInput } from '../../domain'
import { RoleHaveAssociatedUsersError, RoleNotFoundError } from '../../domain/errors'
import { BulkRolesDeletedEvent } from '../../domain/events/bulk-roles-deleted-event'
import
{ FindAssociatedUsersRepository, DeleteBulkRolesWithTransactionRespository, FindRoleBySlugRepository } from './ports'

export class DeleteBulkRolesUseCaseImpl implements DeleteBulkRolesUseCase {
  constructor (
    private readonly transactionAdapter: TransactionAdapter,
    private readonly findAssociatedUsersRepository: FindAssociatedUsersRepository,
    private readonly findRoleBySlugRepository: FindRoleBySlugRepository,
    private readonly deleteBulkRolesWithTransaction: DeleteBulkRolesWithTransactionRespository,
    private readonly eventDispatcher: IEventDispatcher,
  ){}

  private async applyValidations (roleSlugs: string[]):
  Promise<Either<RoleNotFoundError | RoleHaveAssociatedUsersError, UniqueEntityID[]>> {
    const roleIds: UniqueEntityID[] = []

    for (const role of roleSlugs) {
      const roleEntity = await this.findRoleBySlugRepository.find(role)
      if (!roleEntity) {
        return left(new RoleNotFoundError(role))
      }

      const usersArray = await this.findAssociatedUsersRepository.findAssociatedUsers(roleEntity.id)

      if (usersArray.length) {
        return left(new RoleHaveAssociatedUsersError(roleEntity.name))
      }

      roleIds.push(roleEntity.id)
    }

    return right(roleIds)
  }

  public async perform (input: DeleteBulkRolesUseCaseInput):
  Promise<Either<RoleNotFoundError | RoleHaveAssociatedUsersError, boolean>> {
    const roleIdsOrError = await this.applyValidations(input.roles)

    if (roleIdsOrError.isLeft()) {
      return left(roleIdsOrError.value)
    }

    await this.transactionAdapter.useTransaction(async (trx) => {
      await this.deleteBulkRolesWithTransaction.deleteWithTransaction(roleIdsOrError.value, trx)
    })

    await this.eventDispatcher.publish(
      new BulkRolesDeletedEvent({
        roles: roleIdsOrError.value,
      })
    )

    return right(true)
  }
}
