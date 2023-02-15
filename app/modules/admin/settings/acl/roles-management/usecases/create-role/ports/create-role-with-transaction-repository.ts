import {RoleEntity} from 'app/modules/admin/settings/acl/roles-management/domain/entities/role-entity'

export interface CreateRoleWithTransactionRepository <T>{
  persist (roleEntity: RoleEntity, trx: T): Promise<void>
}
