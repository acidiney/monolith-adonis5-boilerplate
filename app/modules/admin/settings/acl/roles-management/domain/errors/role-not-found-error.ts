/*
 * Copyright (c) 2023.
 * ITGest Angola
 */

import {DomainError, Result} from 'app/core/domain'

export class RoleNotFoundError extends Result<DomainError> {
  constructor (roleName?: string) {
    super(false, {
      message: roleName ? 'admin.acl.role.not_found_with_role_name' : 'admin.acl.role.not_found',
      error: RoleNotFoundError.name,
      payload: roleName ? { roleName } : null,
    })
  }
}
