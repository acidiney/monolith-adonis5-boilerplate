/*
 * Copyright (c) 2023.
 * ITGest Angola
 */

import {DomainError, Result} from 'app/core/domain'

export class RoleNotFoundError extends Result<DomainError> {
  constructor () {
    super(false, {
      message: 'admin.acl.role.not_found',
      error: RoleNotFoundError.name,
    })
  }
}
