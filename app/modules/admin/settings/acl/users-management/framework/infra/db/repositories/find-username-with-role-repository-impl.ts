import { UserRoleAggregate } from 'app/modules/@shared/domain/aggregates/user-role-aggregate'
import { UserRoleMapper } from 'app/modules/@shared/framework/infra/db/mappers'
import { CoreUserModel } from 'app/modules/@shared/framework/infra/db/models'
import { FindUsernameWithRoleRepository } from '../../../../usecases'

export class FindUsernameWithRoleRepositoryImpl implements FindUsernameWithRoleRepository {
  constructor (
    private readonly userRoleMapper: UserRoleMapper = new UserRoleMapper()
  ) {}

  public async findUsername (username: string): Promise<UserRoleAggregate | undefined> {
    const user = await CoreUserModel
      .query()
      .preload('role', (builder) => {
        builder.preload('permissions')
      })
      .where('slug', username)
      .first()

    if (!user) {
      return
    }

    return this.userRoleMapper.toDomain(user)
  }
}
