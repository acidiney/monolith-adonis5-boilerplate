import { DomainError, Result } from 'app/core/domain'

export class UserNotFoundError extends Result<DomainError> {
  constructor () {
    super(false, {
      message: 'shared.user.not_found',
      error: UserNotFoundError.name,
    })
  }
}
