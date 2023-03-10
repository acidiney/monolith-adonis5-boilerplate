import { UniqueEntityID } from 'app/core/domain'
import { CoreRoleModel } from 'app/modules/@shared/framework/infra/db/models'
import { DeleteBulkRolesWithTransactionRespository }

  from './../../../../usecases'

export class DeleteBulkRolesWithTransactionRespositoryImpl implements DeleteBulkRolesWithTransactionRespository {
  public async deleteWithTransaction (roleIds: UniqueEntityID[], trx: any): Promise<void> {
    await CoreRoleModel
      .query()
      .whereIn('id', roleIds.map((r) => r.toString()))
      .useTransaction(trx)
      .update({
        deleted_at: new Date(),
      })
  }
}
