import {AggregateRoot } from 'app/core/domain'
import {UserEntity} from 'app/modules/@shared/domain/entities/user-entity'
import {RoleEntity} from 'app/modules/admin/settings/acl/roles-management/domain/entities/role-entity'

export interface UserRoleProps {
  user: UserEntity,
  role: RoleEntity
}

export class UserRoleAggregate extends AggregateRoot<UserRoleProps> {
  public get user (): UserEntity {
    return this.props.user
  }

  public get role (): RoleEntity {
    return this.props.role
  }

  public static hydrate (props: UserRoleProps): UserRoleAggregate {
    return new UserRoleAggregate(props)
  }
}
