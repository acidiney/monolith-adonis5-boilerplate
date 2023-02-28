import {DomainError, Result} from 'app/core/domain'

export class RoleHaveAssociatedUsersError extends Result<DomainError> {
  constructor (roleName?: string) {
    super(false, {
      message: roleName ?
        'admin.acl.roles.role_have_users_associated_with_name': 'admin.acl.roles.role_have_users_associated',
      error: RoleHaveAssociatedUsersError.name,
      payload: roleName ? { roleName } : null,
    })
  }
}
