import { UserModel } from 'app/infra/models'
import { UserEntity } from 'app/domain/entities/user-entity'
import { UserMapper } from '../../../../../../infra/mappers/user-mapper'
import {UniqueEntityID} from 'app/core/domain'
import {FindUserIdRepository} from 'app/modules/auth/usecases/shared/ports/find-user-id-repository'

export class FindUserIdRepositoryImpl implements FindUserIdRepository {
  constructor (
    private readonly userMapper: UserMapper = new UserMapper()
  ) {}

  public async findUserId (userId: UniqueEntityID): Promise<UserEntity | undefined> {
    const user = await UserModel.findBy('id', userId.toString())

    if (!user) {
      return
    }

    return this.userMapper.toDomain(user)
  }
}
