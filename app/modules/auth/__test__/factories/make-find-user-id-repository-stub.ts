import { UserEntity } from 'app/modules/auth/domain/entities/user-entity'
import { UniqueEntityID } from 'app/core/domain'
import {FindUserIdRepository} from 'app/modules/auth/usecases/shared/ports/find-user-id-repository'

export const makeFindUserIdRepositoryStub = (): FindUserIdRepository => {
  return new (class implements FindUserIdRepository {
    public async findUserId (id: UniqueEntityID): Promise<UserEntity | undefined> {
      return UserEntity.hydrate(id, {
        email: 'valid_user_id',
        password: 'valid_password',
        fullName: 'valid_full_name',
      })
    }
  })()
}
