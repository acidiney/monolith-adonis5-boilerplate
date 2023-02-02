import {DomainError, Result} from 'app/core/domain'

export class TokenRevokedError extends Result<DomainError> {
  constructor () {
    super(false, {
      message: 'auth.reset_password.token.revoked',
      error: TokenRevokedError.name,
    })
  }
}
