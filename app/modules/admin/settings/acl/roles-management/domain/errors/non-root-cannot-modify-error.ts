/*
 * Copyright (c) 2023.
 * ITGest Angola
 */

import {DomainError, Result} from 'app/core/domain'

export class NonRootCannotModifyError extends Result<DomainError> {
  constructor () {
    super(false, {
      message: 'admin.acl.role.no_previlegies',
      error: NonRootCannotModifyError.name,
    })
  }
}
