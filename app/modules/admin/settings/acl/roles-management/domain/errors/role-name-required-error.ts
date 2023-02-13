/*
 * Copyright (c) 2023.
 * ITGest Angola
 */

import {DomainError, Result} from 'app/core/domain'

export class RoleNameRequiredError extends Result<DomainError> {
  constructor () {
    super(false, {
      message: 'admin.acl.role.create_role.name.required',
      error: RoleNameRequiredError.name,
    })
  }
}
