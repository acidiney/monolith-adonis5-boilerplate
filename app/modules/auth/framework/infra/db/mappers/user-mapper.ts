import * as luxon from 'luxon'
import { UserModel } from 'app/infra/models'
import { Mapper, UniqueEntityID } from 'app/core/domain'
import { UserEntity } from 'app/domain/entities/user-entity'

export class UserMapper extends Mapper<UserEntity, UserModel> {
  public toDomain (userModel: UserModel): UserEntity {
    return UserEntity.hydrate(new UniqueEntityID(userModel.id), {
      password: userModel.password,
      fullName: userModel.fullName,
      email: userModel.email,
      lasLoginAt: userModel.lastLoginAt && userModel.lastLoginAt.toJSDate(),
    })
  }

  public async toPersistence (userEntity: UserEntity): Promise<UserModel> {
    const userModel = await UserModel.findOrFail(userEntity.id.toString())

    userModel.email = userEntity.email
    userModel.password = userEntity.password
    userModel.lastLoginAt = luxon.DateTime.fromJSDate(userEntity.lastLoginAt)

    return userModel
  }
}
