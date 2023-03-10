import {CoreUserModel} from 'app/modules/@shared/framework/infra/db/models'
import {Mapper} from 'app/core/domain'
import {UserRoleAggregate} from 'app/modules/@shared/domain/aggregates/user-role-aggregate'
import {UserMapper} from 'app/modules/@shared/framework/infra/db/mappers/user-mapper'
import {RoleMapper} from 'app/modules/@shared/framework/infra/db/mappers/role-mapper'
import {DateAdapterImpl} from 'app/modules/@shared/framework/infra/adapters/date-adapter-impl'

export class UserRoleMapper extends Mapper<UserRoleAggregate, CoreUserModel> {
  constructor (
    private readonly userMapper: UserMapper = new UserMapper(new DateAdapterImpl()),
    private readonly roleMapper: RoleMapper = new RoleMapper()
  ) {
    super()
  }

  public toDomain (userModel: CoreUserModel): UserRoleAggregate {
    const userEntity = this.userMapper.toDomain(userModel)

    const roleEntity = this.roleMapper.toDomain(userModel.role)

    return UserRoleAggregate.hydrate({ user: userEntity, role: roleEntity })
  }

  public toPersistence (_userEntity: UserRoleAggregate): CoreUserModel {
    throw new Error('toPersistence on user-role-mapper not implemented!')
  }
}
