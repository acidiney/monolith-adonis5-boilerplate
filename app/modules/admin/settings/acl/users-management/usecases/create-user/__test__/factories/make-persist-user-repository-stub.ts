import {PersistUserRepository} from 'app/modules/admin/settings/acl/users-management/usecases/create-user/ports'
import {UserEntity} from 'app/modules/@shared/domain/entities/user-entity'

export const makePersistUserRepositoryStub = (): PersistUserRepository => {
  return new (class implements PersistUserRepository {
    public async persist (_user: UserEntity): Promise<string> {
      //
      return 'slug'
    }
  })()
}
