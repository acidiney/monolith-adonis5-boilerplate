import {DomainError, Result} from 'app/core/domain'

export class SamePasswordError extends Result<DomainError> {
  constructor () {
    super(false, {
      message: 'auth.same_password_error',
      error: SamePasswordError.name,
    })
  }
}
