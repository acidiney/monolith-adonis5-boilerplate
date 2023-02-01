import {DomainError, Result} from 'app/core/domain'

export class TokenExpiredError extends Result<DomainError> {
  constructor () {
    super(false, {
      message: 'auth.reset_password.token.expired',
      error: TokenExpiredError.name,
    })
  }
}
