import { Mapper, UniqueEntityID } from 'app/core/domain'
import { UserModel } from 'app/infra/models'
import { UserEntity } from 'app/domain/entities/user-entity'

export class UserMapper extends Mapper<UserEntity, UserModel> {
  public toDomain (userModel: UserModel): UserEntity {
    return UserEntity.hydrate(new UniqueEntityID(userModel.id), {
      password: userModel.password,
      fullName: userModel.fullName,
      email: userModel.email,
    })
  }

  public async toPersistence (userEntity: UserEntity): Promise<UserModel> {
    const userModel = await UserModel.findOrFail(userEntity.id.toString())

    userModel.email = userEntity.email
    userModel.password = userEntity.password

    return userModel
  }
}
