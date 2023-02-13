import {DomainError, Result} from 'app/core/domain'

export class PermissionAreMissingError extends Result<DomainError> {
  constructor () {
    super(false, {
      message: 'admin.acl.role.create_role.missing_permissions',
      error: PermissionAreMissingError.name,
    })
  }
}
