import { DomainError, Result } from 'app/core/domain'

export class PasswordMismatchError extends Result<DomainError> {
  constructor () {
    super(false, {
      message: 'auth.password_mismatch',
      error: PasswordMismatchError.name,
    })
  }
}
