import {PersistUserRepository} from 'app/modules/admin/settings/acl/users-management/usecases/create-user/ports'
import {UserEntity} from 'app/modules/@shared/domain/entities/user-entity'
import {UserMapper} from 'app/modules/@shared/framework/infra/db/mappers/user-mapper'

export class PersistUserRepositoryImpl implements PersistUserRepository {
  constructor (
    private readonly userMapper: UserMapper = new UserMapper()
  ) {
  }

  public async persist (user: UserEntity): Promise<string> {
    const userModel = await this.userMapper.toPersistence(user)

    await userModel.save()

    return userModel.slug
  }
}
