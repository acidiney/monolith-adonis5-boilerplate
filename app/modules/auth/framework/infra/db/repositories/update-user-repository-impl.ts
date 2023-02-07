import {UserEntity} from 'app/modules/auth/domain'
import {UserMapper} from 'app/infra/mappers/user-mapper'
import {UpdateUserRepository} from 'app/modules/auth/usecases/reset-password/ports'

export class UpdateUserRepositoryImpl implements UpdateUserRepository {
  constructor (
    private readonly userMapper: UserMapper
  ) {
  }
  public async update (user: UserEntity): Promise<void> {
    const userModel = await this.userMapper.toPersistence(user)

    await userModel.save()
  }
}
