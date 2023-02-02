import { Mapper, UniqueEntityID } from 'app/core/domain'
import { UserModel } from 'app/infra/models'
import { UserEntity } from 'app/modules/auth/domain/entities/user-entity'

export class UserMapper extends Mapper<UserEntity, UserModel> {
  public toDomain (userModel: UserModel): UserEntity {
    return UserEntity.hydrate(new UniqueEntityID(userModel.id), {
      password: userModel.password,
      fullName: userModel.fullName,
      email: userModel.email,
    })
  }

  public toPersistence (userEntity: UserEntity): UserModel {
    const userModel = new UserModel()

    userModel.id = userEntity.id.toString()
    userModel.email = userEntity.email
    userModel.password = userEntity.password

    return userModel
  }
}
