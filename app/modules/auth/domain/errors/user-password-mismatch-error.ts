import { DomainError, Result } from 'app/core/domain'

export class UserPasswordMismatchError extends Result<DomainError> {
  constructor () {
    super(false, {
      message: 'auth.password_mismatch',
      error: UserPasswordMismatchError.name,
    })
  }
}
