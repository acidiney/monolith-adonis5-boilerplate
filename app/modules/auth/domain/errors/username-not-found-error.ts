import { DomainError, Result } from 'app/core/domain'

export class UserNameNotFoundError extends Result<DomainError> {
  constructor () {
    super(false, {
      message: 'auth.username.not_found',
      error: UserNameNotFoundError.name,
    })
  }
}
