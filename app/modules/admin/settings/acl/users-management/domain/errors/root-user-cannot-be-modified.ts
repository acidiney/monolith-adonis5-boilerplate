/*
 * Copyright (c) 2023.
 * ITGest Angola
 */

import {DomainError, Result} from 'app/core/domain'

export class RootUserCannotBeModified extends Result<DomainError> {
  constructor () {
    super(false, {
      message: 'admin.acl.user.cannot_modify_root',
      error: RootUserCannotBeModified.name,
    })
  }
}
