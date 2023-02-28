import { UniqueEntityID } from 'app/core/domain'

export interface DeleteBulkRolesWithTransactionRespository {
  deleteWithTransaction(roleId: UniqueEntityID[], trx: any): Promise<void>
}
