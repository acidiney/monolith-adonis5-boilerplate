import { FindUsernameRepository } from 'app/modules/auth/usecases'
import { UserEntity } from 'app/modules/@shared/domain/entities/user-entity'
import { UniqueEntityID } from 'app/core/domain'
import {Email} from 'app/modules/@shared/domain/value-objects/email'
import {StatusEnum} from 'app/modules/@shared/domain/types'

export const makeFindUsernameRepositoryStub = (): FindUsernameRepository => {
  return new (class implements FindUsernameRepository {
    public async findUsername (_username: string): Promise<UserEntity | undefined> {
      const email = Email.create('valid@email.com')

      if (email.isLeft()) {
        throw new Error()
      }

      const userEntity = UserEntity.hydrate(new UniqueEntityID('valid_id'), {
        email: email.value,
        password: 'valid_password',
        firstName: 'valid',
        lastName: 'user',
        status: StatusEnum.ACTIVE,
        defaultLang: 'pt',
        roleId: new UniqueEntityID('valid_role_id'),
      })

      if (userEntity.isLeft()) {
        throw new Error(userEntity.value.errorMessage)
      }

      return userEntity.value
    }
  })()
}
