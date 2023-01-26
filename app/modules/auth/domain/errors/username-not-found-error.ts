import { DomainError, Result } from 'app/core/domain'

export class UserNameNotFoundError extends Result<DomainError> {
  constructor () {
    super(false, {
      message: 'username.not_found',
      error: UserNameNotFoundError.name,
    })
  }
}
