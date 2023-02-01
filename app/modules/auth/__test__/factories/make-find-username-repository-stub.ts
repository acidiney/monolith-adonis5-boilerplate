import { FindUsernameRepository } from 'app/modules/auth/usecases'
import { UserEntity } from 'app/modules/auth/domain/entities/user-entity'
import { UniqueEntityID } from 'app/core/domain'

export const makeFindUsernameRepositoryStub = (): FindUsernameRepository => {
  return new (class implements FindUsernameRepository {
    public async findUsername (username: string): Promise<UserEntity | undefined> {
      return UserEntity.hydrate(new UniqueEntityID('valid_user_id'), {
        email: username,
        password: 'valid_password',
        fullName: 'valid_full_name',
      })
    }
  })()
}
