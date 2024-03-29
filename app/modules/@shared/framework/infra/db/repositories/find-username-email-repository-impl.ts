import { CoreUserModel } from 'app/modules/@shared/framework/infra/db/models'
import { UserEntity } from 'app/modules/@shared/domain/entities/user-entity'
import { FindUsernameRepository } from 'app/modules/auth/usecases'
import { UserMapper } from '../mappers/user-mapper'

export class FindUsernameEmailRepositoryImpl implements FindUsernameRepository {
  constructor (
    private readonly userMapper: UserMapper = new UserMapper()
  ) {}

  public async findUsername (username: string): Promise<UserEntity | undefined> {
    const user = await CoreUserModel
      .query()
      .preload('role')
      .where('email', username)
      .first()

    if (!user) {
      return
    }

    return this.userMapper.toDomain(user)
  }
}
