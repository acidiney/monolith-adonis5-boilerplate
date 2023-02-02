import {UpdateUserRepository} from 'app/modules/auth/usecases/reset-password/ports'
import {UserEntity} from 'app/modules/auth/domain'

export const makeUpdateUserRepositoryStub = (): UpdateUserRepository => {
  return new (class implements UpdateUserRepository{
    public async update (_user:UserEntity): Promise<void> {
      // do nothing
    }
  })()
}
