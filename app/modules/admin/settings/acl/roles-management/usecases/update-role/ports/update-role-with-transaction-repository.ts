import { RoleEntity } from '../../../domain/entities/role-entity'

export interface UpdateRoleWithTransactionRepository<T> {
  updateWithTransaction(roleEntity: RoleEntity, trx: T): Promise<void>
}
