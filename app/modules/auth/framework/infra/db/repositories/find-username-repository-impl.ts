import { UserModel } from 'app/infra/models'
import { UserEntity } from 'app/modules/auth/domain/entities/user-entity'
import { FindUsernameRepository } from 'app/modules/auth/usecases'
import { UserMapper } from '../mappers/user-mapper'

export class FindUsernameRepositoryImpl implements FindUsernameRepository {
  constructor (
    private readonly userMapper: UserMapper = new UserMapper()
  ) {}

  public async findUsername (username: string): Promise<UserEntity | undefined> {
    const user = await UserModel.findBy('email', username)

    if (!user) {
      return
    }

    return this.userMapper.toDomain(user)
  }
}
