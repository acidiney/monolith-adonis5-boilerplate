/*
 * Copyright (c) 2023.
 * ITGest Angola
 */

import {DomainError, Result} from 'app/core/domain'

export namespace UserNameErrors {
  export class UserFirstNameRequiredError extends Result<DomainError> {
    constructor () {
      super(false, {
        message: 'admin.acl.user.first_name.required',
        error: UserFirstNameRequiredError.name,
      })
    }
  }

  export class UserLastNameRequiredError extends Result<DomainError> {
    constructor () {
      super(false, {
        message: 'admin.acl.user.last_name.required',
        error: UserLastNameRequiredError.name,
      })
    }
  }
}
