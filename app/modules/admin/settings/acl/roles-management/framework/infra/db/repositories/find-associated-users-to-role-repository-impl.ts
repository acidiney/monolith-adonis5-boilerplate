import {FindAssociatedUsersRepository} from 'app/modules/admin/settings/acl/roles-management/usecases'
import {UniqueEntityID} from 'app/core/domain'
import {UserEntity} from 'app/modules/@shared/domain/entities/user-entity'
import {UserMapper} from 'app/modules/@shared/framework/infra/db/mappers'
import {UserModel} from 'app/modules/@shared/framework/infra/db/models'

export class FindAssociatedUsersToRoleRepositoryImpl implements FindAssociatedUsersRepository {
  constructor (private readonly userMapper: UserMapper) {}

  public async findAssociatedUsers (roleId: UniqueEntityID): Promise<UserEntity[]> {
    const users = await UserModel
      .query()
      .where('roleId', roleId.toString())
      .andWhereNull('deleted_at')
      .exec()

    return users.map(this.userMapper.toDomain)
  }
}
