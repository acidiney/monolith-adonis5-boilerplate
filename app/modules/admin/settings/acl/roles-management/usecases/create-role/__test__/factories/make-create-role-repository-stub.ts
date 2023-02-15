import {
  CreateRoleWithTransactionRepository,
} from 'app/modules/admin/settings/acl/roles-management/usecases/create-role/ports'
import {RoleEntity} from 'app/modules/admin/settings/acl/roles-management/domain/entities/role-entity'
export const makeCreateRoleRepositoryStub = (): CreateRoleWithTransactionRepository => {
  return new (class implements CreateRoleWithTransactionRepository {
    public async persist (_roleEntity: RoleEntity): Promise<void> {
      //
    }
  })()
}
