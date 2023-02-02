import { DomainError, Result } from 'app/core/domain'

export class UserNotFoundError extends Result<DomainError> {
  constructor () {
    super(false, {
      message: 'auth.user.not_found',
      error: UserNotFoundError.name,
    })
  }
}
