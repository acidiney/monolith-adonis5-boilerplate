import {
  CreateRoleWithTransactionRepository,
} from 'app/modules/admin/settings/acl/roles-management/usecases/create-role/ports'
import {RoleEntity} from 'app/modules/admin/settings/acl/roles-management/domain/entities/role-entity'
export const makeCreateRoleRepositoryStub = (): CreateRoleWithTransactionRepository<any> => {
  return new (class implements CreateRoleWithTransactionRepository<any> {
    public async persistWithTransaction (_roleEntity: RoleEntity): Promise<void> {
      //
    }
  })()
}
