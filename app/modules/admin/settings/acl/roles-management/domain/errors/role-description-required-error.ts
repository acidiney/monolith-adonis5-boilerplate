/*
 * Copyright (c) 2023.
 * ITGest Angola
 */

import {DomainError, Result} from 'app/core/domain'

export class RoleDescriptionRequiredError extends Result<DomainError> {
  constructor () {
    super(false, {
      message: 'admin.acl.role.create_role.desc.required',
      error: RoleDescriptionRequiredError.name,
    })
  }
}
