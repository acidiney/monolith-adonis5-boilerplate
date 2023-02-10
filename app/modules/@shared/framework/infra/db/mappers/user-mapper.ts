import {UserModel} from 'app/modules/@shared/framework/infra/db/models'
import {Mapper, UniqueEntityID} from 'app/core/domain'
import {UserEntity} from 'app/modules/@shared/domain/entities/user-entity'
import {Email} from 'app/modules/@shared/domain/value-objects/email'
import {StatusEnum} from 'app/modules/@shared/domain/types'
import {DateAdapter} from 'app/modules/@shared/domain/ports'

export class UserMapper extends Mapper<UserEntity, UserModel> {
  constructor (
    private readonly dateAdapter: DateAdapter
  ) {
    super()
  }

  public toDomain (userModel: UserModel):UserEntity {
    const emailOrError = Email.create(userModel.email)

    if (emailOrError.isLeft()) {
      throw new Error(emailOrError.value.errorMessage)
    }

    const userEntity = UserEntity.hydrate(new UniqueEntityID(userModel.id), {
      password: userModel.password,
      firstName: userModel.firstName,
      lastName: userModel.lastName,
      email: emailOrError.value,
      lastLoginAt: userModel.lastLoginAt?.toJSDate(),
      status: userModel.statusId,
      roleId: new UniqueEntityID(userModel.roleId),
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
    let userModel

    const user = await UserModel.findBy('id', userEntity.id.toString())

    if (user) {
      userModel = user
    }

    if (!user) {
      userModel = new UserModel()
      userModel.id = userEntity.id.toString()
    }

    userModel.email = userEntity.email
    userModel.password = userEntity.password
    userModel.firstName = userEntity.firstName
    userModel.lastName = userEntity.lastName

    userModel.roleId = userEntity.roleId

    userModel.statusId = userEntity.status || StatusEnum.ACTIVE
    userModel.lastLoginAt = this.dateAdapter.toDatePersistence(userEntity.lastLoginAt)

    return userModel
  }
}
