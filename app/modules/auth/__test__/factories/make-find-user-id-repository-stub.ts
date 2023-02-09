import {UserEntity} from 'app/domain/entities/user-entity'
import {UniqueEntityID} from 'app/core/domain'
import {FindUserIdRepository} from 'app/modules/auth/usecases/shared/ports/find-user-id-repository'
import {Email} from 'app/domain/value-objects/email'
import {StatusEnum} from 'app/domain/types'

export const makeFindUserIdRepositoryStub = (): FindUserIdRepository => {
  return new (class implements FindUserIdRepository {
    public async findUserId (id: UniqueEntityID): Promise<UserEntity | undefined> {
      const email = Email.create('valid_user_id@email.com')

      if (email.isLeft()) {
        throw new Error()
      }

      const userEntity = UserEntity.hydrate(id, {
        email: email.value,
        password: 'valid_password',
        firstName: 'valid',
        lastName: 'user',
        status: StatusEnum.ACTIVE,
      })

      if (userEntity.isLeft()) {
        throw new Error(userEntity.value.errorMessage)
      }

      return userEntity.value
    }
  })()
}
