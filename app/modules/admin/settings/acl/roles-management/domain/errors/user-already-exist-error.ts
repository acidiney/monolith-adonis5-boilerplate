/*
 * Copyright (c) 2023.
 * ITGest Angola
 */

import {DomainError, Result} from 'app/core/domain'

export class UserAlreadyExistError extends Result<DomainError> {
  constructor () {
    super(false, {
      message: 'admin.acl.user.already_exist',
      error: UserAlreadyExistError.name,
    })
  }
}
