import { CoreUserModel } from 'app/modules/@shared/framework/infra/db/models'
import { UserEntity } from 'app/modules/@shared/domain/entities/user-entity'
import { FindUsernameRepository } from 'app/modules/auth/usecases'
import { UserMapper } from 'app/modules/@shared/framework/infra/db/mappers'
import { StatusEnum } from 'app/modules/@shared/domain/types'

export class FindUserToAuthenticateRepositoryImpl implements FindUsernameRepository {
  constructor (
    private readonly userMapper: UserMapper = new UserMapper()
  ) {}

  public async findUsername (email: string): Promise<UserEntity | undefined> {
    const user = await CoreUserModel
      .query()
      .preload('role')
      .where({
        email,
        statusId: StatusEnum.ACTIVE,
      })
      .andWhereNull('deleted_at')
      .first()

    if (!user) {
      return
    }

    return this.userMapper.toDomain(user)
  }
}
