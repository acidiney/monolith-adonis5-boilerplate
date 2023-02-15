import Database from '@ioc:Adonis/Lucid/Database'
import {RoleEntity} from 'app/modules/admin/settings/acl/roles-management/domain/entities/role-entity'
import {RoleMapper} from 'app/modules/@shared/framework/infra/db/mappers'
import {TransactionClient} from '@adonisjs/lucid/build/src/TransactionClient'
import {CreateRoleWithTransactionRepository}
  from 'app/modules/admin/settings/acl/roles-management/usecases/create-role/ports'
import {UniqueEntityID} from 'app/core/domain'

export class CreateRoleWithTransactionRepositoryImpl implements CreateRoleWithTransactionRepository<TransactionClient> {
  constructor (private readonly roleMapper: RoleMapper) {}
  public async persistWithTransaction (roleEntity: RoleEntity, trx: TransactionClient): Promise<void> {
    const roleModel = await this.roleMapper.toPersistence(roleEntity)

    roleModel.useTransaction(trx)
    await roleModel.save()

    await Database
      .insertQuery()
      .useTransaction(trx)
      .table('core_role_permissions')
      .insert(roleEntity.permissions.map(p => p.toString()).map((p) => ({
        id: new UniqueEntityID().toString(),
        permission_id: p,
        role_id: roleEntity.id.toString(),
      })))
  }
}
