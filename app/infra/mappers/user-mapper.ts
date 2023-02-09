import * as luxon from 'luxon'
import { UserModel } from 'app/infra/models'
import { Mapper, UniqueEntityID } from 'app/core/domain'
import { UserEntity } from 'app/domain/entities/user-entity'
import {Email} from 'app/domain/value-objects/email'

export class UserMapper extends Mapper<UserEntity, UserModel> {
  public toDomain (userModel: UserModel): UserEntity {
    const emailOrError = Email.create(userModel.email)

    if (emailOrError.isLeft()) {
      throw new Error(emailOrError.value.errorMessage)
    }

    console.log()
    const userEntity = UserEntity.hydrate(new UniqueEntityID(userModel.id), {
      password: userModel.password,
      firstName: userModel.firstName,
      lastName: userModel.lastName,
      email: emailOrError.value,
      lastLoginAt: userModel.lastLoginAt?.toJSDate(),
      status: userModel.statusId,
      slug: userModel.slug,
    }, {
      createdAt: userModel.createdAt.toJSDate(),
      updatedAt: userModel.updatedAt.toJSDate(),
    })

    if (userEntity.isLeft()) {
      throw new Error(userEntity.value.errorMessage)
    }
    return userEntity.value
  }

  public async toPersistence (userEntity: UserEntity): Promise<UserModel> {
    const userModel = await UserModel.findOrFail(userEntity.id.toString())

    userModel.email = userEntity.email
    userModel.password = userEntity.password
    userModel.lastLoginAt = userEntity.lastLoginAt && luxon.DateTime.fromJSDate(userEntity.lastLoginAt)

    return userModel
  }
}
