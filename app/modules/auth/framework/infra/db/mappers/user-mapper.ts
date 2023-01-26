import { Mapper, UniqueEntityID } from 'app/core/domain'
import { UserModel } from 'app/infra/models'
import { UserEntity } from 'app/modules/auth/domain/entities/user-entity'

export class UserMapper extends Mapper<UserEntity, UserModel> {
  public toDomain (data: UserModel): UserEntity {
    return UserEntity.hydrate(new UniqueEntityID(data.id), data.fullName, data.email)
  }

  public toPersistence (_data: UserEntity): UserModel {
    throw new Error('Method not implemented.')
  }
}
