import {DomainError, Result} from 'app/core/domain'

export class TokenNotFoundError extends Result<DomainError> {
  constructor () {
    super(false, {
      message: 'auth.reset_password.token.not_found',
      error: TokenNotFoundError.name,
    })
  }
}
