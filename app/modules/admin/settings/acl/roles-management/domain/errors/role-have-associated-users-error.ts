import {DomainError, Result} from 'app/core/domain'

export class RoleHaveAssociatedUsersError extends Result<DomainError> {
  constructor () {
    super(false, {
      message: 'admin.acl.roles.role_have_users_associated',
      error: RoleHaveAssociatedUsersError.name,
    })
  }
}
